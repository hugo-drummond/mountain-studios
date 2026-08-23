import { NextRequest, NextResponse } from 'next/server'
import { crmAdmin } from '@/lib/crm'
import { sendMail } from '@/lib/ses'
import { makeToken, PREVIEW_BUCKET } from '@/lib/shared-preview'
import { rateLimit, tooManyRequests } from '@/lib/rate-limit'
import { verifyRecaptcha, blockedAsBot } from '@/lib/recaptcha'

// ---------------------------------------------------------------------------
// POST /api/preview/email
//
// The Get Started wizard generates a preview and shows it via a throwaway
// blob: URL that dies the moment the tab closes — the visitor gets nothing to
// come back to. This persists the same way /api/preview/share does (same
// bucket, same shared_previews table) and emails the visitor their own durable
// link, so the preview survives the session.
//
// Unlike /api/preview/share, this is visitor-facing: no admin cookie, no share
// key. It's gated by rate limit + reCAPTCHA the same way preview/generate is.
// ---------------------------------------------------------------------------

const MAX_HTML_BYTES = 10 * 1024 * 1024
const TTL_DAYS = 30
const REPLY_TO = process.env.PREVIEW_REPLY_TO || 'hugodrum6@gmail.com'

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function baseUrl(req: NextRequest): string {
  const configured = process.env.NEXT_PUBLIC_APP_URL
  if (configured) return configured.replace(/\/$/, '')
  return new URL(req.url).origin
}

const NOTIFY_TO = 'ant88835@gmail.com'

// Every exit from this route must leave a trace on the lead. The R2000 pitch
// email broke for two days behind a 403 that wrote nothing anywhere, and the
// only way anyone found out was noticing an absence. Read-modify-write is
// safe enough at this volume and needs no migration.
async function stampLead(leadId: string | null, line: string): Promise<void> {
  if (!leadId) return
  try {
    const { data } = await crmAdmin()
      .from('leads')
      .select('notes')
      .eq('id', leadId)
      .maybeSingle()

    const existing = data?.notes ? `${data.notes}\n` : ''
    await crmAdmin()
      .from('leads')
      .update({ notes: `${existing}${line}` })
      .eq('id', leadId)
  } catch (err) {
    // Never let the trace-writing itself break the route it is observing.
    console.error('[preview/email] could not stamp lead:', err instanceof Error ? err.message : err)
  }
}

// Only alerts when a lead row exists. A bot hitting this endpoint directly
// carries no leadId, so this stays quiet for exactly the traffic that would
// otherwise make it noise.
async function alertFailure(leadId: string | null, reason: string, email: string): Promise<void> {
  if (!leadId) return
  try {
    await sendMail({
      to: NOTIFY_TO,
      subject: `Preview email FAILED — ${reason}`,
      html: `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;">
        <p style="font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#745762;margin:0 0 16px;">Preview email failed</p>
        <p style="font-size:15px;color:#334155;line-height:1.6;margin:0 0 20px;">${escapeHtml(reason)}</p>
        <div style="font-size:13px;color:#94a3b8;margin:0 0 16px;">
          <p style="margin:0 0 8px;"><strong>Visitor email:</strong> ${escapeHtml(email)}</p>
          <p style="margin:0;"><strong>Lead ID:</strong> ${escapeHtml(leadId)}</p>
        </div>
        <p style="font-size:13px;color:#94a3b8;margin:0;">The visitor did not get their preview link or the R2000 pitch.</p>
      </div>`,
    })
  } catch (err) {
    console.error('[preview/email] failure alert could not be sent:', err instanceof Error ? err.message : err)
  }
}


export async function POST(req: NextRequest) {
  const rateLimitResult = await rateLimit(req, 'preview/email')
  if (!rateLimitResult.ok) {
    return tooManyRequests()
  }

  let html: string
  let businessName: string
  let email: string
  let leadId: string | null
  let recaptchaToken: string | undefined
  try {
    const body = await req.json()
    html = typeof body.html === 'string' ? body.html : ''
    businessName = typeof body.businessName === 'string' ? body.businessName.trim() : ''
    email = typeof body.email === 'string' ? body.email.trim() : ''
    leadId = typeof body.leadId === 'string' && body.leadId ? body.leadId : null
    recaptchaToken = typeof body.recaptchaToken === 'string' ? body.recaptchaToken : undefined
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON body' }, { status: 400 })
  }

  if (!html || !businessName || !email) {
    await stampLead(leadId, 'Preview email FAILED — missing required fields.')
    return NextResponse.json(
      { success: false, error: 'html, businessName and email are required' },
      { status: 400 },
    )
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    await stampLead(leadId, 'Preview email FAILED — invalid email format.')
    return NextResponse.json({ success: false, error: 'Invalid email format' }, { status: 400 })
  }
  if (Buffer.byteLength(html, 'utf8') > MAX_HTML_BYTES) {
    await stampLead(leadId, 'Preview email FAILED — preview too large to email.')
    await alertFailure(leadId, 'preview too large to email', email)
    return NextResponse.json({ success: false, error: 'Preview is too large to email' }, { status: 413 })
  }

  // Same allowlist as preview/generate: a missing token is not a bot signal
  // (ad blockers and privacy extensions send none), only a real negative
  // verdict from Google blocks.
  const recaptchaResult = await verifyRecaptcha(recaptchaToken)
  if (blockedAsBot(recaptchaResult)) {
    await stampLead(leadId, `Preview email FAILED — blocked as bot (${recaptchaResult.verdict}).`)
    await alertFailure(leadId, `blocked as bot (${recaptchaResult.verdict})`, email)
    return NextResponse.json(
      { success: false, error: 'Request blocked. Refresh the page and try again.' },
      { status: 403 },
    )
  }

  const token = makeToken()
  const path = `${token}.html`
  const expiresAt = new Date(Date.now() + TTL_DAYS * 24 * 60 * 60 * 1000).toISOString()

  try {
    const upload = await crmAdmin()
      .storage.from(PREVIEW_BUCKET)
      .upload(path, new Blob([html], { type: 'text/html' }), { contentType: 'text/html', upsert: false })
    if (upload.error) throw upload.error

    const { error } = await crmAdmin().from('shared_previews').insert({
      token,
      business_name: businessName,
      lead_id: leadId,
      html_path: path,
      created_by: 'wizard',
      expires_at: expiresAt,
    })
    if (error) {
      // Don't leave an orphaned file behind if the row failed.
      await crmAdmin().storage.from(PREVIEW_BUCKET).remove([path])
      throw error
    }
  } catch (err) {
    const errMsg = err instanceof Error ? err.message : err
    console.error('[preview/email] could not save preview:', errMsg)
    await stampLead(leadId, `Preview email FAILED — could not save the preview: ${errMsg}.`)
    await alertFailure(leadId, 'could not save the preview', email)
    return NextResponse.json({ success: false, error: 'Could not save the preview' }, { status: 502 })
  }

  const url = `${baseUrl(req)}/p/${token}`

  // Tested one variable at a time against a fresh Gmail address. The original
  // Spam verdict was an http://localhost link, not the copy. A bare Calendly
  // URL in the body then pushed it out of Primary on its own, so it is gone —
  // the R2000 price is in its place and did not cost the Primary placement.
  const emailHtml = `<p>Hi,</p>
<p>We put together a preview of your website:</p>
<p><a href="${url}">${url}</a></p>
<p>If you like it, we can finish it off and hand it over for R2000, tweaks included.</p>
<p>Have a look and let me know what you think &mdash; just reply to this email.</p>
<p>Hugo</p>
<p>The link stays live for 30 days.</p>`

  const emailText = `Hi,

We put together a preview of your website:

${url}

If you like it, we can finish it off and hand it over for R2000, tweaks included.

Have a look and let me know what you think — just reply to this email.

Hugo

The link stays live for 30 days.`

  try {
    await sendMail({
      to: email,
      subject: `Your website preview — ${businessName}`,
      html: emailHtml,
      text: emailText,
      replyTo: REPLY_TO,
      fromName: 'Hugo Drummond',
    })
  } catch (err) {
    const errMsg = err instanceof Error ? err.message : err
    console.error('[preview/email] send failed:', errMsg)
    // The preview is saved even though the email failed, but the point of this
    // endpoint is the email — never report success for a mail that did not go.
    await stampLead(leadId, `Preview email FAILED — SES rejected the send: ${errMsg}.`)
    await alertFailure(leadId, 'SES rejected the send', email)
    return NextResponse.json({ success: false, error: 'Could not send the email', url }, { status: 502 })
  }

  await stampLead(leadId, 'Preview email sent.')
  return NextResponse.json({ success: true, url })
}
