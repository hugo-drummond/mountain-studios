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
const CALENDLY_URL = process.env.CALENDLY_URL || 'https://calendly.com/hugodrum6/30min'

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

/**
 * The wizard does not ask for a person's name until the step AFTER this email
 * sends, so there is usually nothing to greet them by. A scraped lead may
 * already carry a director_name, so look it up and use the first name when it
 * is there. Falls back to a bare "Hi," rather than guessing.
 */
async function firstNameForLead(leadId: string | null): Promise<string> {
  if (!leadId) return ''
  try {
    const { data } = await crmAdmin()
      .from('leads')
      .select('director_name')
      .eq('id', leadId)
      .single()
    const full = typeof data?.director_name === 'string' ? data.director_name.trim() : ''
    return full ? full.split(/\s+/)[0] : ''
  } catch {
    // Never let a missing name stop the email going out.
    return ''
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
    return NextResponse.json(
      { success: false, error: 'html, businessName and email are required' },
      { status: 400 },
    )
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ success: false, error: 'Invalid email format' }, { status: 400 })
  }
  if (Buffer.byteLength(html, 'utf8') > MAX_HTML_BYTES) {
    return NextResponse.json({ success: false, error: 'Preview is too large to email' }, { status: 413 })
  }

  // Same allowlist as preview/generate: a missing token is not a bot signal
  // (ad blockers and privacy extensions send none), only a real negative
  // verdict from Google blocks.
  const recaptchaResult = await verifyRecaptcha(recaptchaToken)
  if (blockedAsBot(recaptchaResult)) {
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
    console.error('[preview/email] could not save preview:', err instanceof Error ? err.message : err)
    return NextResponse.json({ success: false, error: 'Could not save the preview' }, { status: 502 })
  }

  const url = `${baseUrl(req)}/p/${token}`
  const firstName = escapeHtml(await firstNameForLead(leadId))
  const greeting = firstName ? `Hi ${firstName},` : 'Hi,'

  const emailHtml = `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;">
    <p style="font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#745762;margin:0 0 16px;">Mountain Studios</p>
    <p style="font-size:15px;color:#334155;line-height:1.6;margin:0 0 20px;">${greeting}</p>
    <p style="font-size:15px;color:#334155;line-height:1.6;margin:0 0 24px;">We put together this preview of your future website.</p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
      <tr><td>
        <a href="${url}" style="display:inline-block;background:#1e2333;color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;padding:14px 28px;border-radius:999px;">Open your website</a>
      </td></tr>
    </table>
    <p style="font-size:15px;color:#334155;line-height:1.6;margin:0 0 24px;">If you like it and want to turn your website visitors into paying customers, it can be yours for R2000 after a few tweaks &mdash; click the link below for a 15 minute meeting.</p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 28px;">
      <tr><td>
        <a href="${escapeHtml(CALENDLY_URL)}" style="display:inline-block;background:#ffffff;color:#1e2333;text-decoration:none;font-size:14px;font-weight:600;padding:13px 27px;border-radius:999px;border:1px solid #1e2333;">Book 15 minutes</a>
      </td></tr>
    </table>
    <p style="font-size:15px;color:#334155;line-height:1.6;margin:0 0 4px;">Looking forward to hearing from you</p>
    <p style="font-size:15px;color:#334155;line-height:1.6;margin:0 0 24px;">Hugo</p>
    <p style="font-size:13px;color:#94a3b8;margin:24px 0 0;">Your website stays live at this link for 30 days.</p>
  </div>`

  try {
    await sendMail({
      to: email,
      subject: `Your website preview — ${businessName}`,
      html: emailHtml,
    })
  } catch (err) {
    console.error('[preview/email] send failed:', err instanceof Error ? err.message : err)
    // The preview is saved even though the email failed, but the point of this
    // endpoint is the email — never report success for a mail that did not go.
    return NextResponse.json({ success: false, error: 'Could not send the email', url }, { status: 502 })
  }

  return NextResponse.json({ success: true, url })
}
