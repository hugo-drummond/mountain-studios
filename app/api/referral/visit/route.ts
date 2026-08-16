import { NextRequest, NextResponse } from 'next/server'
import { crmAdmin } from '@/lib/crm'
import { rateLimit, tooManyRequests, clientKey } from '@/lib/rate-limit'
import { normaliseRefCode, refCodeExists, visitorHash } from '@/lib/referral'

// ---------------------------------------------------------------------------
// POST /api/referral/visit
//
// Someone opened a partner's link. One row per person per code per day — the
// unique index does the deduplication, so a partner refreshing their own link
// does not inflate their own numbers.
//
// No reCAPTCHA. This writes a counter, sends nothing and exposes nothing, and a
// token round trip on every landing would slow down the page for a row nobody
// reads in real time. Bad codes are rejected by shape before any query runs.
//
// Always answers 200. The response is not read by anything — the caller is a
// fire-and-forget beacon on page load — and a visitor must never see a failure
// from a counter.
// ---------------------------------------------------------------------------

const ok = () => NextResponse.json({ ok: true })

export async function POST(req: NextRequest) {
  const limit = await rateLimit(req, 'referral/visit')
  if (!limit.ok) return tooManyRequests()

  let body: { ref?: unknown; path?: unknown; referrer?: unknown }
  try {
    body = await req.json()
  } catch {
    return ok()
  }

  const code = normaliseRefCode(body.ref)
  if (!code) return ok()

  try {
    if (!(await refCodeExists(code))) return ok()

    const ip = clientKey(req)
    const userAgent = req.headers.get('user-agent') ?? ''

    // Host only. A full referrer URL can carry someone else's query string,
    // which is their data, not ours to keep.
    let referrerHost: string | null = null
    if (typeof body.referrer === 'string' && body.referrer) {
      try {
        referrerHost = new URL(body.referrer).hostname.slice(0, 200)
      } catch {
        referrerHost = null
      }
    }

    const landingPath =
      typeof body.path === 'string' ? body.path.split('?')[0].slice(0, 200) : null

    const { error } = await crmAdmin()
      .from('referral_visits')
      .insert({
        ref_code: code,
        landing_path: landingPath,
        referrer_host: referrerHost,
        visitor_hash: visitorHash(ip, userAgent, code),
      })

    // 23505 is the once-a-day index doing its job, not a failure.
    if (error && (error as { code?: string }).code !== '23505') throw error
  } catch (err) {
    console.error('[referral/visit] failed:', err instanceof Error ? err.message : err)
  }

  return ok()
}
