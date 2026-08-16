import { NextRequest, NextResponse } from 'next/server'
import { crmAdmin } from '@/lib/crm'
import { sendMail } from '@/lib/ses'
import { rateLimit, tooManyRequests } from '@/lib/rate-limit'
import { verifyRecaptcha } from '@/lib/recaptcha'
import { runAudit } from '@/lib/audit/run'
import { waitUntil } from '@vercel/functions'

// ---------------------------------------------------------------------------
// POST /api/audit/submit
//
// Free website audit signup. Two destinations, and neither one is allowed to
// lose the lead:
//   1. the CRM (mountainstudios.audit_requests) to track the request
//   2. a lead row in mountainstudios.leads so a rep sees it
//   3. an email to Ant so he knows to send the audit report
//
// Each leg is caught separately. A lead that reaches one of them is worth
// more than a clean error response.
// ---------------------------------------------------------------------------

export const maxDuration = 300

const NOTIFY_TO = 'ant88835@gmail.com'

interface Payload {
  websiteUrl?: string
  email?: string
  recaptchaToken?: string
  website?: string
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function row(label: string, value?: string | null): string {
  if (!value) return ''
  return `<tr>
    <td style="padding:6px 16px 6px 0;color:#64748b;font-size:13px;vertical-align:top;white-space:nowrap;">${escapeHtml(label)}</td>
    <td style="padding:6px 0;color:#0f172a;font-size:14px;">${escapeHtml(value)}</td>
  </tr>`
}

export async function POST(req: NextRequest) {
  // Rate limit
  const rateLimitResult = await rateLimit(req, 'audit/submit')
  if (!rateLimitResult.ok) {
    return tooManyRequests()
  }

  let body: Payload
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ success: false, error: 'Could not read the form.' }, { status: 400 })
  }

  // Bots fill every field they find. A real user never sees this one.
  if (body.website) {
    return NextResponse.json({ success: true })
  }

  const websiteUrl = body.websiteUrl?.trim()
  const email = body.email?.trim()

  if (!websiteUrl || !email) {
    return NextResponse.json({ success: false, error: 'Please fill in all fields.' }, { status: 400 })
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ success: false, error: 'That email address does not look right.' }, { status: 400 })
  }

  // Normalize URL: prefix https:// if no scheme
  let normalizedUrl = websiteUrl
  if (!normalizedUrl.startsWith('http://') && !normalizedUrl.startsWith('https://')) {
    normalizedUrl = 'https://' + normalizedUrl
  }

  // Validate URL
  let hostname: string
  try {
    const parsed = new URL(normalizedUrl)
    hostname = parsed.hostname
    if (!hostname.includes('.')) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid website URL.' },
        { status: 400 }
      )
    }
  } catch {
    return NextResponse.json(
      { success: false, error: 'Please enter a valid website URL.' },
      { status: 400 }
    )
  }

  const storedEmail = email.slice(0, 200)
  const storedUrl = normalizedUrl.slice(0, 500)

  // reCAPTCHA verdict is logged but never blocks (advisory only)
  const recaptchaResult = await verifyRecaptcha(body.recaptchaToken)
  const recaptchaNote =
    !recaptchaResult.passed && !recaptchaResult.ourFault ? recaptchaResult.verdict : null

  if (!recaptchaResult.passed && !recaptchaResult.ourFault) {
    console.warn(
      `[audit/submit] reCAPTCHA verdict: ${recaptchaResult.verdict}`
    )
  }

  // Extract hostname for business_name
  const businessName = hostname.replace(/^www\./, '')

  let auditRequestId: string | null = null
  let auditError: string | null = null

  // Write 1: audit_requests table
  try {
    const { data, error } = await crmAdmin()
      .from('audit_requests')
      .insert({
        website_url: storedUrl,
        email: storedEmail,
        recaptcha_note: recaptchaNote,
        source: 'website',
        status: 'new',
      })
      .select('id')
      .single()

    if (error) throw error
    auditRequestId = data?.id ?? null
  } catch (err) {
    auditError = err instanceof Error ? err.message : String(err)
    console.error('[audit/submit] audit_requests insert failed:', auditError)
  }

  // Write 2: leads table (find-or-create on source='website' + email within 30 days)
  let leadId: string | null = null
  try {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()

    const { data: existing, error: queryError } = await crmAdmin()
      .from('leads')
      .select('id, business_name, notes')
      .eq('source', 'website')
      .eq('email', storedEmail)
      .gt('created_at', thirtyDaysAgo)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (queryError) throw queryError

    if (existing) {
      // Never overwrite what they already told us. Someone who came through the
      // Get Started wizard as "Halo Hair" and then asks for an audit must not be
      // renamed to "halohair.co.za" — the same guard brief/partial carries. The
      // hostname is only used when there is no real name on the row yet.
      //
      // The note is appended rather than replaced for the same reason: a rep
      // opening this lead has to be able to see that an audit was asked for,
      // without losing whatever was written about them before.
      const auditNote = `Free website audit requested for ${storedUrl}`
      const mergedNotes = existing.notes ? `${existing.notes}\n\n${auditNote}` : auditNote

      const { data: updated, error: updateError } = await crmAdmin()
        .from('leads')
        .update({
          business_name: existing.business_name || businessName,
          has_website: true,
          notes: mergedNotes.slice(0, 8_000),
        })
        .eq('id', existing.id)
        .select('id')
        .single()

      if (updateError) throw updateError
      leadId = updated?.id ?? null
    } else {
      // Create new lead
      const { data, error } = await crmAdmin()
        .from('leads')
        .insert({
          business_name: businessName,
          email: storedEmail,
          has_website: true,
          source: 'website',
          crm_status: 'new',
          category: null,
          search_area: null,
          assigned_to: null,
          notes: `Free website audit requested for ${storedUrl}`,
        })
        .select('id')
        .single()

      if (error) throw error
      leadId = data?.id ?? null
    }

    // Update audit_requests with the lead_id (best effort)
    if (auditRequestId && leadId) {
      await crmAdmin()
        .from('audit_requests')
        .update({ lead_id: leadId })
        .eq('id', auditRequestId)
    }
  } catch (err) {
    console.error('[audit/submit] leads operation failed:', err instanceof Error ? err.message : err)
  }

  // Write 3: send email to Ant
  let emailed = false
  try {
    const html = `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px;">
      <p style="font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#745762;margin:0 0 4px;">Free audit requested</p>
      <h1 style="font-size:22px;color:#0f172a;margin:0 0 4px;">${escapeHtml(businessName)}</h1>
      <p style="font-size:14px;color:#64748b;margin:0 0 20px;">Requested from the website</p>
      <table style="border-collapse:collapse;width:100%;">
        ${row('Website', storedUrl)}
        ${row('Email', storedEmail)}
      </table>
      <p style="font-size:13px;color:#64748b;margin:24px 0 0;">
        ${leadId
          ? `In the CRM: <a href="https://crm.mountainstudios.co.za/pipeline" style="color:#535f77;">crm.mountainstudios.co.za</a>`
          : `<strong style="color:#b91c1c;">Not saved to the CRM — add it by hand.</strong>`}
      </p>
      <p style="font-size:13px;color:#94a3b8;margin:8px 0 0;">Reply to this email to contact the prospect directly.</p>
    </div>`

    await sendMail({
      to: NOTIFY_TO,
      subject: `Free audit requested — ${businessName}`,
      html,
      replyTo: storedEmail,
    })
    emailed = true
  } catch (err) {
    console.error('[audit/submit] notification email failed:', err instanceof Error ? err.message : err)
  }

  if (!auditRequestId && !emailed) {
    // Both audit row AND email failed — say so, so the page keeps the form
    return NextResponse.json(
      { success: false, error: 'Could not submit your request. Please try again.' },
      { status: 502 },
    )
  }

  // Kick off audit server-side (best effort)
  // On Vercel, waitUntil() keeps the function alive in the background after the response returns.
  // Locally, waitUntil() does not keep a dev process alive reliably, so we fire-and-forget
  // without await to avoid blocking the response.
  if (auditRequestId) {
    if (process.env.VERCEL) {
      waitUntil(runAudit(auditRequestId).catch(err =>
        console.error('[audit/submit] Background audit failed:', err instanceof Error ? err.message : err)
      ))
    } else {
      // Local dev: fire the promise without await so the response returns immediately.
      // The dev server stays alive long enough for most audits to complete, and if it
      // doesn't, the audit row is still written and can be picked up by the sweep route.
      runAudit(auditRequestId).catch(err =>
        console.error('[audit/submit] Background audit failed:', err instanceof Error ? err.message : err)
      )
    }
  }

  return NextResponse.json({ success: true, auditRequestId })
}
