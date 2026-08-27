import { NextRequest, NextResponse } from 'next/server'
import { rateLimit, tooManyRequests } from '@/lib/rate-limit'
import { verifyRecaptcha, blockedAsBot } from '@/lib/recaptcha'
import { startAudit } from '@/lib/audit/start'
import { isValidEmail } from '@/lib/validation'

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

// Hobby caps every serverless function at 60s and silently ignores anything
// higher, so this is the real ceiling, not a choice. It used to read 300,
// which read like headroom that does not exist. runAudit() logs
// [audit/timing] on every run — check the margin there before adding work.
export const maxDuration = 60

interface Payload {
  websiteUrl?: string
  email?: string
  recaptchaToken?: string
  website?: string
  /** Partner referral code, read from localStorage by the popup form. */
  refCode?: string
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

  // The honeypot is a weak signal, not a verdict. A real bot POSTs here
  // directly and never sees the field at all, while password managers fill it
  // for real customers — which silently binned a genuine enquiry and showed the
  // visitor a success screen. So it is recorded on the row, never used to
  // discard the submission. Google's verdict below is what actually blocks.
  const honeypotTripped = !!body.website
  if (honeypotTripped) {
    console.warn(
      `[audit/submit] honeypot tripped — url=${body.websiteUrl ?? ''} email=${body.email ?? ''} value=${String(body.website).slice(0, 80)}`,
    )
  }

  const websiteUrl = body.websiteUrl?.trim()
  const email = body.email?.trim()

  if (!websiteUrl || !email) {
    return NextResponse.json({ success: false, error: 'Please fill in all fields.' }, { status: 400 })
  }

  if (!isValidEmail(email)) {
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

  // Google's verdict is what blocks here. blockedAsBot() is an allowlist: only
  // a real judgement by Google refuses the request. A missing or unverifiable
  // token — ad blockers, privacy extensions, networks that cannot reach Google
  // — never blocks, so a genuine customer is never turned away.
  const recaptchaResult = await verifyRecaptcha(body.recaptchaToken)
  const recaptchaNote =
    !recaptchaResult.passed && !recaptchaResult.ourFault ? recaptchaResult.verdict : null

  if (!recaptchaResult.passed && !recaptchaResult.ourFault) {
    console.warn(
      `[audit/submit] reCAPTCHA verdict: ${recaptchaResult.verdict}`
    )
  }

  if (blockedAsBot(recaptchaResult)) {
    // Refused out loud, unlike the honeypot it replaces.
    return NextResponse.json(
      { success: false, error: 'Could not verify your request. Please try again.' },
      { status: 403 },
    )
  }

  const { auditRequestId, emailed } = await startAudit({
    websiteUrl: storedUrl,
    email: storedEmail,
    source: 'website',
    recaptchaNote: honeypotTripped
      ? `honeypot tripped${recaptchaNote ? ` \u2022 ${recaptchaNote}` : ''}`
      : recaptchaNote,
    originLabel: 'Requested from the website',
    refCode: body.refCode ?? null,
  })

  if (!auditRequestId && !emailed) {
    // Both the audit row and the email failed — say so, so the form stays up.
    return NextResponse.json(
      { success: false, error: 'Could not submit your request. Please try again.' },
      { status: 502 },
    )
  }

  return NextResponse.json({ success: true, auditRequestId })
}
