import { NextRequest, NextResponse } from 'next/server'
import { crmAdmin } from '@/lib/crm'
import { verifyRecaptcha } from '@/lib/recaptcha'
import { rateLimit, tooManyRequests } from '@/lib/rate-limit'

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

interface Payload {
  email?: string
  businessName?: string
  businessType?: string
  pages?: string[]
  style?: string
  recaptchaToken?: string
  website?: string
  variant?: string
}

export async function POST(req: NextRequest) {
  // Rate limit
  const rateLimitResult = await rateLimit(req, 'brief/partial')
  if (!rateLimitResult.ok) {
    return tooManyRequests()
  }

  let body: Payload
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON body' }, { status: 400 })
  }

  // Bots fill every field they find. A real user never sees this one.
  if (body.website) {
    // See the note in audit/submit.
    console.warn(
      `[brief/partial] honeypot tripped — value=${String(body.website).slice(0, 80)}`,
    )
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

  // Check reCAPTCHA outcome
  const recaptchaResult = await verifyRecaptcha(body.recaptchaToken)

  // Whitelist variant
  const variantLabel = body.variant === 'site' ? 'SEE YOUR NEW SITE pill' : body.variant === 'chat' ? 'Chat button' : null

  // Build notes
  const noteLines = [
    'INCOMPLETE — got as far as the preview, has not sent the brief.',
    storedPages.length ? `Pages wanted: ${storedPages.join(', ')}` : null,
    storedStyle ? `Style: ${storedStyle}` : null,
    variantLabel ? `Homepage variant: ${variantLabel}` : null,
  ]
    .filter(Boolean)

  // Split reCAPTCHA outcomes: configuration failures go to the server log,
  // visitor verdicts go to the sales note.
  if (!recaptchaResult.passed) {
    if (recaptchaResult.ourFault) {
      // Our setup failed. This is a fact about our infrastructure, not the lead.
      console.warn(
        `[brief/partial] reCAPTCHA is misconfigured, leads are being saved unverified: ${recaptchaResult.verdict}`
      )
    } else {
      // Visitor-related verdict. Says what actually happened rather than just
      // "unverified". A lead Google scored 0.2 and a lead we could not check at
      // all deserve different reactions.
      noteLines.push(`Unverified — reCAPTCHA ${recaptchaResult.verdict}.`)
    }
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
