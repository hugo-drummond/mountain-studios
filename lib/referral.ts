import { createHash } from 'crypto'
import { crmAdmin } from '@/lib/crm'

// ---------------------------------------------------------------------------
// Referral attribution.
//
// The partner form issues a code and emails a link (/api/referral/submit).
// Everything here is the other half: recording that a link was opened, and
// stamping the code onto the lead the visitor eventually becomes. What is owed
// follows from that in the database — a trigger writes a referral_payouts row
// the moment a referred lead is marked closed.
//
// Codes are 8 characters from a 31-letter alphabet with no O/0/I/1. Anything
// that does not look like one is dropped before it reaches the database, so a
// query string full of junk costs one regex rather than a round trip.
// ---------------------------------------------------------------------------

const REF_CODE_PATTERN = /^[ABCDEFGHJKMNPQRSTUVWXYZ23456789]{8}$/

export function normaliseRefCode(value: unknown): string | null {
  if (typeof value !== 'string') return null
  const code = value.trim().toUpperCase()
  return REF_CODE_PATTERN.test(code) ? code : null
}

// A code is only worth anything if a partner holds it. Checking here means an
// invented code never reaches `leads.referred_by_code`, where it would sit as a
// foreign key violation or, worse, as a plausible-looking attribution.
export async function refCodeExists(code: string): Promise<boolean> {
  const { data, error } = await crmAdmin()
    .from('referral_partners')
    .select('ref_code')
    .eq('ref_code', code)
    .maybeSingle()

  if (error) {
    console.error('[referral] partner lookup failed:', error.message)
    return false
  }
  return !!data
}

// Identifies a returning visitor for the day without storing who they are. The
// salt is the code itself, so the same person on two different partners' links
// hashes differently and the hashes cannot be lined up across partners.
export function visitorHash(ip: string, userAgent: string, code: string): string {
  return createHash('sha256').update(`${code}:${ip}:${userAgent}`).digest('hex').slice(0, 32)
}

/**
 * Stamps a referral code onto a lead. First touch wins: the update is
 * conditional on the column still being null, so a visitor who arrives on one
 * partner's link and later returns on another stays with the first.
 *
 * Never throws. A referral that fails to attach must not take down the form
 * that was actually being submitted — the lead is the thing that matters.
 */
export async function attachReferralToLead(
  leadId: string | null | undefined,
  rawCode: unknown,
): Promise<void> {
  if (!leadId) return
  const code = normaliseRefCode(rawCode)
  if (!code) return

  try {
    if (!(await refCodeExists(code))) return

    const { error } = await crmAdmin()
      .from('leads')
      .update({ referred_by_code: code, referred_at: new Date().toISOString() })
      .eq('id', leadId)
      .is('referred_by_code', null)

    if (error) throw error
  } catch (err) {
    console.error('[referral] attach failed:', err instanceof Error ? err.message : err)
  }
}
