import { NextRequest, NextResponse } from 'next/server'
import { crmAdmin } from '@/lib/crm'
import { sendMail, NOTIFY_EMAIL } from '@/lib/ses'
import { renderEnquiryConfirmation } from '@/lib/emails/enquiry-confirmation'
import { rateLimit, tooManyRequests } from '@/lib/rate-limit'
import { verifyRecaptcha } from '@/lib/recaptcha'
import { isValidEmail, normalizePhone } from '@/lib/validation'

// ---------------------------------------------------------------------------
// POST /api/contact/submit
//
// The "Get in touch" form on the homepage. Until now every submission was
// thrown away — the form just set a flag and showed a thank-you message
// without saving anything or telling anyone.
//
// Two destinations, and neither one is allowed to lose the message:
//   1. the CRM (mountainstudios.contact_messages) so it appears on the board
//   2. an email to Ant so he knows to reply within a day
//
// Both legs are caught separately. A message that reaches one of them is far
// more valuable than a clean error, and the person who filled the form must
// never see a failure caused by our mailbox. The page promises a reply within
// a day, which is why the email exists at all — a message saved to the CRM
// but unseen is worse than silence.
// ---------------------------------------------------------------------------

const NOTIFY_TO = NOTIFY_EMAIL
const MIN_MESSAGE_LENGTH = 10

interface Payload {
  full_name?: string
  email?: string
  phone?: string
  message?: string
  website?: string
  recaptchaToken?: string
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
  // Rate limit — advisory endpoint (logs reCAPTCHA verdict but never blocks)
  const rateLimitResult = await rateLimit(req, 'contact/submit')
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
    // See the note in audit/submit.
    console.warn(
      `[contact/submit] honeypot tripped — value=${String(body.website).slice(0, 80)}`,
    )
    return NextResponse.json({ success: true })
  }

  // reCAPTCHA verdict is logged but never blocks (advisory only)
  const recaptchaResult = await verifyRecaptcha(body.recaptchaToken)
  if (!recaptchaResult.passed && !recaptchaResult.ourFault) {
    console.warn(
      `[contact/submit] reCAPTCHA verdict: ${recaptchaResult.verdict}`
    )
  }

  const fullName = body.full_name?.trim()
  const email = body.email?.trim()
  const message = body.message?.trim()
  const phone = body.phone?.trim()

  if (!fullName || !email || !message) {
    return NextResponse.json({ success: false, error: 'Please fill in all fields.' }, { status: 400 })
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ success: false, error: 'That email address does not look right.' }, { status: 400 })
  }

  if (message.length < MIN_MESSAGE_LENGTH) {
    return NextResponse.json(
      { success: false, error: 'Tell us a little more about what you need.' },
      { status: 400 },
    )
  }

  // Validate and normalize phone if provided (malformed phone should not block submission)
  let storedPhone: string | null = null
  if (phone) {
    const phoneResult = normalizePhone(phone)
    if (phoneResult.ok) {
      storedPhone = phoneResult.e164
    } else {
      console.warn(`[contact/submit] malformed phone rejected: raw=${phone}`)
      storedPhone = phone.slice(0, 50)
    }
  }

  // Cap stored lengths so a bot cannot post a novel
  const storedName = fullName.slice(0, 200)
  const storedEmail = email.slice(0, 200)
  const storedMessage = message.slice(0, 5000)

  let messageId: string | null = null
  let crmError: string | null = null

  try {
    const { data, error } = await crmAdmin()
      .from('contact_messages')
      .insert({
        full_name: storedName,
        email: storedEmail,
        phone: storedPhone,
        message: storedMessage,
        status: 'new',
        source: 'website',
      })
      .select('id')
      .single()

    if (error) throw error
    messageId = data?.id ?? null
  } catch (err) {
    crmError = err instanceof Error ? err.message : String(err)
    console.error('[contact/submit] CRM insert failed:', crmError)
  }

  let emailed = false
  try {
    const html = `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px;">
      <p style="font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#745762;margin:0 0 4px;">New enquiry from website</p>
      <h1 style="font-size:22px;color:#0f172a;margin:0 0 4px;">${escapeHtml(storedName)}</h1>
      <p style="font-size:14px;color:#64748b;margin:0 0 20px;">Sent from the homepage contact form</p>
      <table style="border-collapse:collapse;width:100%;">
        ${row('Name', storedName)}
        ${row('Email', storedEmail)}
        ${row('Phone', storedPhone)}
      </table>
      <div style="margin-top:20px;padding:16px;background:#f6f5fb;border-radius:10px;">
        <p style="font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#745762;margin:0 0 8px;">Message</p>
        <p style="font-size:14px;color:#0f172a;margin:0;white-space:pre-wrap;">${escapeHtml(storedMessage)}</p>
      </div>
      <p style="font-size:13px;color:#64748b;margin:24px 0 0;">
        ${messageId
          ? `In the CRM: <a href="https://crm.mountainstudios.co.za/messages" style="color:#535f77;">crm.mountainstudios.co.za/messages</a>`
          : `<strong style="color:#b91c1c;">Not saved to the CRM — add it by hand.</strong>`}
      </p>
      <p style="font-size:13px;color:#94a3b8;margin:8px 0 0;">Reply to this email to answer ${escapeHtml(storedName.split(' ')[0])} directly.</p>
    </div>`

    await sendMail({
      to: NOTIFY_TO,
      subject: `New enquiry from ${storedName}`,
      html,
      replyTo: storedEmail,
    })
    emailed = true
  } catch (err) {
    console.error('[contact/submit] notification email failed:', err instanceof Error ? err.message : err)
  }

  // Tell the sender we got it. Separate from the notification above on
  // purpose: this one failing must not fail the enquiry, which is already
  // recorded. Logged rather than swallowed so a silent outage is findable.
  let confirmationSent = false
  try {
    const confirmation = renderEnquiryConfirmation(storedName)
    await sendMail({
      to: storedEmail,
      subject: confirmation.subject,
      html: confirmation.html,
    })
    confirmationSent = true
  } catch (err) {
    console.error('[contact/submit] confirmation email failed:', err instanceof Error ? err.message : err)
  }

  if (!messageId && !emailed) {
    // Both destinations gone. Say so, so the page can keep the form filled in
    // rather than thanking the person for a message we did not receive.
    return NextResponse.json(
      { success: false, error: 'Could not send your message. Please try again.' },
      { status: 502 },
    )
  }

  return NextResponse.json({ success: true, confirmationSent })
}
