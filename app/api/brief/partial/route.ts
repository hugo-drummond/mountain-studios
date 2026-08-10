import { NextRequest, NextResponse } from 'next/server'
import { crmAdmin } from '@/lib/crm'

// ---------------------------------------------------------------------------
// POST /api/brief/partial
//
// The Get Started wizard collects business name, type, pages, style, and
// colours, then generates a preview. This endpoint captures an email at step 6,
// before the preview builds, and writes a partial lead with what we know so far.
// The final /brief/submit at step 7 will UPDATE that same row rather than
// duplicate it. One person, one row, even if they abandon and come back.
//
// Security model:
// - Honeypot field is the actual bot defence — it is a hard block (returns no lead).
// - Email validation is a hard block (400 response).
// - reCAPTCHA is deliberately advisory, not a gate. A customer whose browser
//   cannot reach Google is exactly the customer we are trying not to lose.
//   reCAPTCHA result is used to label the row, not block the save. A junk row
//   that is flagged is cheaper than a real lead that is silently discarded.
// ---------------------------------------------------------------------------

// The score threshold is deliberately low. reCAPTCHA v3 is harsh on a site it
// has barely seen, and a new key on low traffic routinely scores real people
// around 0.3. Nothing is blocked on this either way — it only decides whether
// the row carries a warning — so the cost of being generous is a note we did
// not need, and the cost of being strict is doubting every genuine lead.
const RECAPTCHA_MIN_SCORE = 0.3

// Returns a human-readable verdict, not a boolean. What went wrong matters:
// "we could not check" and "Google says this is a bot" are different facts
// about a lead, and collapsing them makes the note useless for triage.
async function verifyRecaptcha(token?: string): Promise<string> {
  // The site key is bound to the live domain, so reCAPTCHA never returns a
  // usable token in local development. Treat as passed to allow local testing.
  if (process.env.NODE_ENV !== 'production') {
    return 'passed'
  }

  const secret = process.env.RECAPTCHA_SECRET_KEY
  if (!secret) return 'no secret configured'
  if (!token) return 'no token from the browser'

  try {
    const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${secret}&response=${token}`,
    })
    const data = await res.json()

    if (data.success === true) {
      // v3 always returns a score. Its absence means a v2 key is registered
      // against a v3 call, which is a configuration fault, not a verdict.
      if (typeof data.score !== 'number') return 'no score returned — is the key reCAPTCHA v3?'
      return data.score >= RECAPTCHA_MIN_SCORE ? 'passed' : `scored ${data.score}`
    }

    const codes = Array.isArray(data['error-codes']) ? data['error-codes'].join(', ') : 'no reason given'
    return `rejected by Google (${codes})`
  } catch (err) {
    return `could not reach Google (${err instanceof Error ? err.message : 'unknown'})`
  }
}

interface Payload {
  email?: string
  businessName?: string
  businessType?: string
  pages?: string[]
  style?: string
  recaptchaToken?: string
  website?: string
}

export async function POST(req: NextRequest) {
  let body: Payload
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON body' }, { status: 400 })
  }

  // Bots fill every field they find. A real user never sees this one.
  if (body.website) {
    return NextResponse.json({ success: true, leadId: null })
  }

  const email = body.email?.trim()

  if (!email) {
    return NextResponse.json({ success: false, error: 'Email is required' }, { status: 400 })
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ success: false, error: 'Invalid email format' }, { status: 400 })
  }

  // Cap stored lengths to prevent bot abuse
  const storedEmail = email.slice(0, 200)
  const storedBusinessName = body.businessName?.trim()?.slice(0, 200) || null
  const storedBusinessType = body.businessType?.trim()?.slice(0, 100) || null
  const storedStyle = body.style?.trim()?.slice(0, 50) || null
  const storedPages = Array.isArray(body.pages)
    ? body.pages.filter((p) => typeof p === 'string').slice(0, 20).map((p) => p.slice(0, 60))
    : []

  // business_name is NOT NULL on leads. If none given, use email + status.
  const leadName = storedBusinessName || `${storedEmail} (wizard, no business name yet)`

  // Check reCAPTCHA outcome and append to notes if not passed
  const recaptchaOutcome = await verifyRecaptcha(body.recaptchaToken)

  // Build notes
  const noteLines = [
    'INCOMPLETE — got as far as the preview, has not sent the brief.',
    storedPages.length ? `Pages wanted: ${storedPages.join(', ')}` : null,
    storedStyle ? `Style: ${storedStyle}` : null,
  ]
    .filter(Boolean)

  // Says what actually happened rather than just "unverified". A lead Google
  // scored 0.2 and a lead we could not check at all deserve different reactions.
  if (recaptchaOutcome !== 'passed') {
    noteLines.push(`Unverified — reCAPTCHA ${recaptchaOutcome}.`)
  }

  const notes = noteLines.join('\n')

  let leadId: string | null = null
  let crmError: string | null = null

  try {
    // Check for existing row with same email, created in last 30 days, newest first.
    // Do not create a duplicate — someone who abandons and comes back is one lead.
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
      // A returning visitor must never cost us what they told us the first time.
      // Only update notes if they're empty or already indicate incompleteness.
      // And never overwrite a real business_name with the wizard placeholder.
      const shouldUpdateNotes =
        !existing.notes || existing.notes.startsWith('INCOMPLETE')
      const updatedBusinessName =
        existing.business_name && !existing.business_name.includes('(wizard, no business name yet)')
          ? existing.business_name
          : leadName

      const { data: updated, error: updateError } = await crmAdmin()
        .from('leads')
        .update({
          business_name: updatedBusinessName,
          category: storedBusinessType,
          ...(shouldUpdateNotes && { notes }),
        })
        .eq('id', existing.id)
        .select('id')
        .single()

      if (updateError) throw updateError
      leadId = updated?.id ?? null
    } else {
      // Insert a new row
      const { data, error } = await crmAdmin()
        .from('leads')
        .insert({
          business_name: leadName,
          category: storedBusinessType,
          email: storedEmail,
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
    }
  } catch (err) {
    crmError = err instanceof Error ? err.message : String(err)
    console.error('[brief/partial] CRM operation failed:', crmError)
    // A failed partial save must NEVER stop the preview from generating or
    // block the person's progress. Return success with null leadId so the
    // wizard continues.
  }

  return NextResponse.json({ success: true, leadId })
}
