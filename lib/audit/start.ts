import { crmAdmin } from '@/lib/crm'
import { attachReferralToLead } from '@/lib/referral'
import { sendMail } from '@/lib/ses'
import { runAudit } from '@/lib/audit/run'
import { waitUntil } from '@vercel/functions'

// ---------------------------------------------------------------------------
// Starting an audit, from anywhere.
//
// Lifted out of app/api/audit/submit so the chatbot can start one too. The
// chatbot used to invite people to type their website and email into the chat
// and then did nothing whatsoever with them — the bot could describe the audit
// but had no way to run it, so every request made that way was silently lost.
//
// Both callers do their own rate limiting, reCAPTCHA and validation first. This
// module is only the part after the request has been accepted: write the rows,
// tell Ant, kick off the run.
//
// Every leg is caught separately. A request that reaches one destination is
// worth far more than a clean error.
// ---------------------------------------------------------------------------

const NOTIFY_TO = 'ant88835@gmail.com'

export interface StartAuditInput {
  /** Already normalised and validated — use normaliseWebsiteUrl() first. */
  websiteUrl: string
  email: string
  /** Free text on audit_requests.source: where the request came from. */
  source: string
  /** Anything worth recording about how it was judged. Nullable. */
  recaptchaNote?: string | null
  /** Shown in the notification email so Ant knows which surface it came from. */
  originLabel?: string
  /** Partner referral code the visitor arrived on, if any. Validated downstream. */
  refCode?: string | null
  /**
   * How to start the run.
   *
   * 'inline' renders the PDF in the calling function. Only safe from a route
   * that ships the headless browser — see outputFileTracingIncludes in
   * next.config.js, which lists /api/audit/** and nothing else.
   *
   * 'http' hands off to /api/audit/run instead. Any other caller must use this.
   * Adding the browser to a second route is not the answer: it is 66MB, and
   * putting it in the chat function made cold starts slow enough that the chat
   * could not answer at all.
   */
  trigger?: 'inline' | 'http'
}

export interface StartAuditResult {
  auditRequestId: string | null
  leadId: string | null
  emailed: boolean
}

/**
 * Normalise and validate a website address.
 *
 * Returns null when it is not usable, so callers can decide what to say. Adds
 * https:// when there is no scheme, and insists on a dot in the hostname —
 * "localhost" and a bare word are both rejected.
 */
export function normaliseWebsiteUrl(raw: string): { url: string; hostname: string } | null {
  const trimmed = raw.trim()
  if (!trimmed) return null

  const withScheme =
    trimmed.startsWith('http://') || trimmed.startsWith('https://') ? trimmed : `https://${trimmed}`

  try {
    const parsed = new URL(withScheme)
    if (!parsed.hostname.includes('.')) return null
    return { url: withScheme.slice(0, 500), hostname: parsed.hostname }
  } catch {
    return null
  }
}

// Where to reach our own /api/audit/run. VERCEL_URL is the deployment's own
// host and is always right on a preview or production build; the public app URL
// is the local and fallback answer.
function appOrigin(): string {
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
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

export async function startAudit(input: StartAuditInput): Promise<StartAuditResult> {
  const storedUrl = input.websiteUrl.slice(0, 500)
  const storedEmail = input.email.slice(0, 200)
  const businessName = (normaliseWebsiteUrl(storedUrl)?.hostname ?? storedUrl).replace(/^www\./, '')
  const originLabel = input.originLabel ?? 'Requested from the website'

  let auditRequestId: string | null = null
  let emailed = false
  let leadId: string | null = null

  // Write 1: the audit request itself.
  try {
    const { data, error } = await crmAdmin()
      .from('audit_requests')
      .insert({
        website_url: storedUrl,
        email: storedEmail,
        recaptcha_note: input.recaptchaNote ?? null,
        source: input.source,
        status: 'new',
      })
      .select('id')
      .single()

    if (error) throw error
    auditRequestId = data?.id ?? null
  } catch (err) {
    console.error('[audit/start] audit_requests insert failed:', err instanceof Error ? err.message : err)
  }

  // Write 2: the lead. Find-or-create on source='website' + email within 30
  // days. The source filter stays 'website' whatever surface this came from —
  // it is what the CRM board keys its "Warm lead" badge off, and changing it
  // here would make the same person show up twice.
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

    if (auditRequestId && leadId) {
      await crmAdmin().from('audit_requests').update({ lead_id: leadId }).eq('id', auditRequestId)
    }

    // Both surfaces that reach here — the popup form and the chatbot — can
    // carry a partner code, and either can be the first thing a referred
    // visitor does.
    await attachReferralToLead(leadId, input.refCode)
  } catch (err) {
    console.error('[audit/start] leads operation failed:', err instanceof Error ? err.message : err)
  }

  // Write 3: tell Ant.
  try {
    const html = `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px;">
      <p style="font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#745762;margin:0 0 4px;">Free audit requested</p>
      <h1 style="font-size:22px;color:#0f172a;margin:0 0 4px;">${escapeHtml(businessName)}</h1>
      <p style="font-size:14px;color:#64748b;margin:0 0 20px;">${escapeHtml(originLabel)}</p>
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
    console.error('[audit/start] notification email failed:', err instanceof Error ? err.message : err)
  }

  // Kick the audit off in the background.
  //
  // On Vercel, waitUntil() keeps the function alive after the response returns.
  // Locally it does not reliably keep a dev process alive, so the promise is
  // fired without await instead — the row is written either way, and the sweep
  // route finishes anything that never completed.
  if (auditRequestId) {
    const id = auditRequestId

    const run =
      input.trigger === 'http'
        ? () =>
            fetch(`${appOrigin()}/api/audit/run`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ auditRequestId: id }),
            }).then(
              (res) => {
                if (!res.ok) console.error('[audit/start] audit/run returned', res.status)
              },
              (err) =>
                console.error(
                  '[audit/start] could not reach audit/run:',
                  err instanceof Error ? err.message : err,
                ),
            )
        : () =>
            runAudit(id).catch((err) =>
              console.error(
                '[audit/start] background audit failed:',
                err instanceof Error ? err.message : err,
              ),
            )

    if (process.env.VERCEL) waitUntil(run())
    else run()
  }

  return { auditRequestId, leadId, emailed }
}
