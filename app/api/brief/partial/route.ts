import { NextRequest, NextResponse } from 'next/server'
import { crmAdmin } from '@/lib/crm'

// ---------------------------------------------------------------------------
// POST /api/brief/partial
//
// The Get Started wizard collects business name, type, pages, style, and
// colours, then generates a preview. Until now if someone watched their
// preview build and then left, we lost them completely — no email, no row in
// the CRM, no trace.
//
// This endpoint captures an email at step 6, before the preview builds, and
// writes a partial lead with what we know so far. The final /brief/submit
// at step 7 will UPDATE that same row rather than duplicate it. One person,
// one row, even if they abandon and come back.
// ---------------------------------------------------------------------------

async function verifyRecaptcha(token?: string): Promise<boolean> {
  // The site key is bound to the live domain, so reCAPTCHA never returns a
  // usable token in local development. The preview flow already waves localhost
  // through for exactly this reason; without the same escape hatch here, the
  // capture path could not be exercised outside production.
  if (process.env.NODE_ENV !== 'production') {
    return true
  }

  const secret = process.env.RECAPTCHA_SECRET_KEY
  if (!secret) {
    // reCAPTCHA must not block a real person. If the secret is unset, allow
    // the write through — same posture the wizard takes for preview generation.
    return true
  }

  // A missing token in production is a script, not a person: the wizard always
  // attempts one. A real visitor whose reCAPTCHA is blocked still gets their
  // preview, we just do not capture them — losing a lead beats blocking one.
  if (!token) {
    return false
  }

  try {
    const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${secret}&response=${token}`,
    })

    const data = await res.json()

    // Only an actual low-score verdict from Google blocks. If the request itself
    // throws (network failure on our side), allow through.
    return data.success && data.score >= 0.5
  } catch {
    // Network failure on our side. Allow through, don't block the person.
    return true
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

  // reCAPTCHA verification. This endpoint writes into leads, which holds
  // every lead, and it is callable by anyone. Must verify the request.
  const recaptchaValid = await verifyRecaptcha(body.recaptchaToken)
  if (!recaptchaValid) {
    return NextResponse.json(
      { success: false, error: 'Could not verify that request.' },
      { status: 403 },
    )
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

  // Build notes
  const notes = [
    'INCOMPLETE — got as far as the preview, has not sent the brief.',
    storedPages.length ? `Pages wanted: ${storedPages.join(', ')}` : null,
    storedStyle ? `Style: ${storedStyle}` : null,
  ]
    .filter(Boolean)
    .join('\n')

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
