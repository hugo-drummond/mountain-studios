import { NextRequest, NextResponse } from 'next/server'
import { crmAdmin } from '@/lib/crm'
import { sendMail } from '@/lib/ses'

// ---------------------------------------------------------------------------
// POST /api/brief/submit
//
// The end of the Get Started wizard. Until now the final step just set a flag
// and rendered the thank-you screen — every name, email and phone number ever
// entered was thrown away.
//
// Two destinations, and neither one is allowed to lose the lead:
//   1. the CRM (Frankies, mountainstudios.leads) so it appears on the board
//   2. an email to Hugo so he knows without watching the board
//
// Both legs are caught individually. A lead that reaches one of them is worth
// far more than a clean error response, and the person who filled the form in
// must never see a failure caused by our mailbox.
// ---------------------------------------------------------------------------

const NOTIFY_TO = 'ant88835@gmail.com'

interface Payload {
  fullName?: string
  email?: string
  phone?: string
  projectInfo?: string
  businessName?: string
  businessType?: string
  previewVerdict?: 'loved' | 'not_quite'
  pages?: string[]
  style?: string
  primaryColor?: string
  secondaryColor?: string
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
  let body: Payload
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON body' }, { status: 400 })
  }

  const fullName = body.fullName?.trim()
  const email = body.email?.trim()
  const businessName = body.businessName?.trim()

  if (!fullName || !email) {
    return NextResponse.json({ success: false, error: 'Name and email are required' }, { status: 400 })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ success: false, error: 'Invalid email format' }, { status: 400 })
  }

  const phone = body.phone?.trim() || null
  const projectInfo = body.projectInfo?.trim() || null
  const businessType = body.businessType?.trim() || null
  const notQuite = body.previewVerdict === 'not_quite'
  const pages = Array.isArray(body.pages) ? body.pages.filter((p) => typeof p === 'string') : []

  // business_name is the only NOT NULL column on leads, and someone could in
  // principle reach the contact step without one.
  const leadName = businessName || `${fullName} (no business name given)`

  const verdictLine = notQuite ? 'Said the preview was not quite right' : 'Said they loved the preview'
  const notes = [
    `Website enquiry — ${verdictLine.toLowerCase()}.`,
    `Contact: ${fullName}${phone ? ` · ${phone}` : ''}`,
    pages.length ? `Pages wanted: ${pages.join(', ')}` : null,
    body.style ? `Style: ${body.style}` : null,
    projectInfo ? `\n${notQuite ? 'How we can improve' : 'About their site'}:\n${projectInfo}` : null,
  ]
    .filter(Boolean)
    .join('\n')

  let leadId: string | null = null
  let crmError: string | null = null

  try {
    const { data, error } = await crmAdmin()
      .from('leads')
      .insert({
        business_name: leadName,
        category: businessType,
        email,
        phone,
        notes,
        // Distinguishes an inbound enquiry from the ~1,800 scraped rows. The CRM
        // board keys its "Warm lead" badge off this value.
        source: 'website',
        has_website: false,
        crm_status: 'new',
        // Left null on purpose: search_area drives request_leads(), and an
        // inbound lead should be assigned by hand rather than dropped into a
        // rep's territory batch.
        search_area: null,
        assigned_to: null,
      })
      .select('id')
      .single()

    if (error) throw error
    leadId = data?.id ?? null
  } catch (err) {
    crmError = err instanceof Error ? err.message : String(err)
    console.error('[brief/submit] CRM insert failed:', crmError)
  }

  let emailed = false
  try {
    const html = `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px;">
      <p style="font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#745762;margin:0 0 4px;">New website enquiry</p>
      <h1 style="font-size:22px;color:#0f172a;margin:0 0 4px;">${escapeHtml(leadName)}</h1>
      <p style="font-size:14px;color:#64748b;margin:0 0 20px;">${escapeHtml(verdictLine)}</p>
      <table style="border-collapse:collapse;width:100%;">
        ${row('Name', fullName)}
        ${row('Email', email)}
        ${row('Phone', phone)}
        ${row('Business type', businessType)}
        ${row('Pages', pages.length ? pages.join(', ') : null)}
        ${row('Style', body.style)}
        ${row('Colours', body.primaryColor ? `${body.primaryColor}${body.secondaryColor ? ` / ${body.secondaryColor}` : ''}` : null)}
      </table>
      ${projectInfo ? `<div style="margin-top:20px;padding:16px;background:#f6f5fb;border-radius:10px;">
        <p style="font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#745762;margin:0 0 8px;">${notQuite ? 'How we can improve' : 'About their site'}</p>
        <p style="font-size:14px;color:#0f172a;margin:0;white-space:pre-wrap;">${escapeHtml(projectInfo)}</p>
      </div>` : ''}
      <p style="font-size:13px;color:#64748b;margin:24px 0 0;">
        ${leadId
          ? `In the CRM: <a href="https://crm.mountainstudios.co.za/pipeline" style="color:#535f77;">crm.mountainstudios.co.za</a>`
          : `<strong style="color:#b91c1c;">Not saved to the CRM — add it by hand.</strong>`}
      </p>
      <p style="font-size:13px;color:#94a3b8;margin:8px 0 0;">Reply to this email to answer ${escapeHtml(fullName.split(' ')[0])} directly.</p>
    </div>`

    await sendMail({
      to: NOTIFY_TO,
      subject: `New website enquiry — ${leadName}`,
      html,
      replyTo: email,
    })
    emailed = true
  } catch (err) {
    console.error('[brief/submit] notification email failed:', err instanceof Error ? err.message : err)
  }

  if (!leadId && !emailed) {
    // Both destinations gone. Say so, so the wizard can keep the person on the
    // form rather than thanking them for something we did not receive.
    return NextResponse.json(
      { success: false, error: 'Could not record your enquiry. Please try again.' },
      { status: 502 },
    )
  }

  return NextResponse.json({ success: true, leadId, emailed })
}
