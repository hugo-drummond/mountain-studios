import { NextRequest, NextResponse } from 'next/server'
import { crmAdmin } from '@/lib/crm'
import { sendMail } from '@/lib/ses'
import { rateLimit, tooManyRequests } from '@/lib/rate-limit'
import { verifyRecaptcha } from '@/lib/recaptcha'
import { randomBytes } from 'crypto'

// ---------------------------------------------------------------------------
// POST /api/referral/submit
//
// Partner referral signup. One person, one row. SELECT first to avoid duplicates,
// then INSERT or return existing ref_code.
//
// The unique index on email is the only thing that holds under a race condition,
// so it is treated as the fallback deduplication when a double-submit lands at
// the same instant.
// ---------------------------------------------------------------------------

interface Payload {
  fullName?: string
  email?: string
  phone?: string
  recaptchaToken?: string
  website?: string
}

// Alphabet for ref codes: no O/0/I/1 (ambiguous when read aloud or typed)
const REF_ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'
const REF_CODE_LENGTH = 8

// crypto.randomBytes, not Math.random or a hash of the clock. A referral code
// is the thing that will decide who gets paid R1000, so a code that can be
// guessed from the time it was issued is a code someone else can claim. It
// costs nothing to make it unguessable.
//
// 31 is not a factor of 256, so a plain `% 31` would make the first nine
// letters marginally likelier than the rest. Bytes landing in the short tail
// are rejected and redrawn instead.
function generateRefCode(): string {
  const limit = Math.floor(256 / REF_ALPHABET.length) * REF_ALPHABET.length
  let code = ''
  while (code.length < REF_CODE_LENGTH) {
    for (const byte of randomBytes(REF_CODE_LENGTH)) {
      if (byte >= limit) continue
      code += REF_ALPHABET[byte % REF_ALPHABET.length]
      if (code.length === REF_CODE_LENGTH) break
    }
  }
  return code
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export async function POST(req: NextRequest) {
  // Rate limit
  const rateLimitResult = await rateLimit(req, 'referral/submit')
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
    return NextResponse.json({ success: true, refCode: '' })
  }

  const fullName = body.fullName?.trim()
  const email = body.email?.trim()

  if (!fullName || !email) {
    return NextResponse.json({ success: false, error: 'Please fill in all fields.' }, { status: 400 })
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ success: false, error: 'That email address does not look right.' }, { status: 400 })
  }

  const storedName = fullName.slice(0, 200)
  // Lowercased on the way in, because the unique index is on lower(email).
  // Stored as typed, the SELECT below would miss `Hugo@x.com` against a stored
  // `hugo@x.com`, the insert would then trip the index, and the person would be
  // shown an error for filling their own form in twice.
  const storedEmail = email.slice(0, 200).toLowerCase()
  const storedPhone = body.phone?.trim()?.slice(0, 50) || null

  // reCAPTCHA verdict is logged but never blocks (advisory only)
  const recaptchaResult = await verifyRecaptcha(body.recaptchaToken)
  const recaptchaNote =
    !recaptchaResult.passed && !recaptchaResult.ourFault ? recaptchaResult.verdict : null

  if (!recaptchaResult.passed && !recaptchaResult.ourFault) {
    console.warn(
      `[referral/submit] reCAPTCHA verdict: ${recaptchaResult.verdict}`
    )
  }

  try {
    // Check if partner already exists on this email
    const { data: existing, error: queryError } = await crmAdmin()
      .from('referral_partners')
      .select('ref_code')
      .eq('email', storedEmail)
      .maybeSingle()

    if (queryError) throw queryError

    if (existing) {
      // Partner already registered — return their existing code
      return NextResponse.json({ success: true, refCode: existing.ref_code })
    }

    // Generate new ref code
    const refCode = generateRefCode()

    // Attempt insert
    let partnerId: string | null = null
    let insertError: string | null = null

    try {
      const { data, error } = await crmAdmin()
        .from('referral_partners')
        .insert({
          full_name: storedName,
          email: storedEmail,
          phone: storedPhone,
          ref_code: refCode,
          recaptcha_note: recaptchaNote,
          status: 'active',
        })
        .select('id, ref_code')
        .single()

      if (error) throw error
      partnerId = data?.id ?? null

      // Send welcome email with referral link
      if (partnerId) {
        try {
          const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://mountainstudios.co.za'
          const referralLink = `${baseUrl}/?ref=${refCode}`

          const html = `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px;">
            <p style="font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#745762;margin:0 0 4px;">Welcome, Partner!</p>
            <h1 style="font-size:22px;color:#0f172a;margin:0 0 4px;">Your referral link is ready</h1>
            <p style="font-size:14px;color:#64748b;margin:0 0 20px;">Share this link with your network</p>
            <div style="margin:20px 0;padding:16px;background:#f6f5fb;border-radius:10px;">
              <p style="font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#745762;margin:0 0 8px;">Your Referral Link</p>
              <p style="font-size:14px;color:#0f172a;margin:0;word-break:break-all;"><a href="${escapeHtml(referralLink)}" style="color:#2563eb;">${escapeHtml(referralLink)}</a></p>
            </div>
            <p style="font-size:13px;color:#64748b;margin:20px 0 0;">Thank you for helping us grow!</p>
          </div>`

          await sendMail({
            to: storedEmail,
            subject: 'Your referral link is ready',
            html,
            // A real mailbox, deliberately. Every address at the apex is SES's
            // since 11 Aug and anything resolving to no mailbox is dropped at
            // ingest, so a `noreply@` reply-to would silently bin a partner
            // writing back to ask how the link works. hello@ is a shared
            // mailbox that exists and is read in the CRM at /mail.
            replyTo: 'hello@mountainstudios.co.za',
          })

          // Update link_sent_at on success
          await crmAdmin()
            .from('referral_partners')
            .update({ link_sent_at: new Date().toISOString() })
            .eq('id', partnerId)
        } catch (err) {
          // Email failed but partner was created. Log and continue.
          // link_sent_at stays null — the CRM shows the link never went out.
          console.error('[referral/submit] email failed:', err instanceof Error ? err.message : err)
        }
      }

      return NextResponse.json({ success: true, refCode })
    } catch (err) {
      // supabase-js returns a PostgrestError carrying the SQL state on `.code`.
      // It is NOT in the message, so matching on the message text would mean
      // this branch never ran and a double submit returned a 502 instead.
      const code = (err as { code?: string } | null)?.code

      if (code === '23505') {
        // Race condition: another request inserted this email between our SELECT and INSERT.
        // Re-fetch and return their code.
        const { data: raceExisting, error: raceQueryError } = await crmAdmin()
          .from('referral_partners')
          .select('ref_code')
          .eq('email', storedEmail)
          .maybeSingle()

        if (raceQueryError) throw raceQueryError
        if (raceExisting) {
          return NextResponse.json({ success: true, refCode: raceExisting.ref_code })
        }
      }

      // Not a race condition — re-throw
      throw err
    }
  } catch (err) {
    console.error('[referral/submit] failed:', err instanceof Error ? err.message : err)
    return NextResponse.json(
      { success: false, error: 'Could not register your referral. Please try again.' },
      { status: 502 },
    )
  }
}
