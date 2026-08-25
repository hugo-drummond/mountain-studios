import { NextRequest, NextResponse } from 'next/server'
import { crmAdmin } from '@/lib/crm'

// Limits are stored here rather than in the database so they can be tuned on a
// deploy instead of requiring a migration. This trades off flexibility for
// simplicity — the most common tuning (bumping a limit up or down) is a
// one-line change and a redeploy, not a database migration that must run on
// every replica.
//
// These are keyed per IP, and an IP is not a person. An office behind one NAT
// is one IP, and a South African mobile network puts very large numbers of
// users behind shared CGNAT addresses — so paid traffic arriving on mobile
// collides with itself. A refused submission is an enquiry nobody ever hears
// about, so the forms that cost nothing to serve are set high enough that a
// real person can never reach them, while the routes that spend money on every
// call stay deliberately tight. reCAPTCHA is not a second line of defence
// here: blockedAsBot() is an allowlist, so a request with no token is allowed
// through, and these numbers are what actually stands between an open endpoint
// and a bill.
export const LIMITS = Object.freeze({
  // Costs money on every call — DeepSeek plus image lookups.
  'preview/generate': { limit: 8, windowSeconds: 3600 },
  'preview/email': { limit: 10, windowSeconds: 3600 },
  // Costs money on every call — two PageSpeed requests, a headless Chrome
  // render and a send. Shared by three ways in: the popup form, the chatbot
  // handing over a site and an email, and the audit page.
  'audit/submit': { limit: 20, windowSeconds: 3600 },
  'audit/run': { limit: 10, windowSeconds: 3600 },
  // A database row and an email or two. Cheap to serve, and the one most
  // likely to be reached by a real customer on a shared mobile IP.
  'contact/submit': { limit: 25, windowSeconds: 3600 },
  'referral/submit': { limit: 25, windowSeconds: 3600 },
  // Higher than the rest on purpose: this one is a beacon, not a form. A
  // partner's link landing on a busy office network is many people through one
  // IP, and a refused visit is a referral that silently never gets counted.
  'referral/visit': { limit: 60, windowSeconds: 3600 },
  'careers/apply': { limit: 5, windowSeconds: 3600 },
  'brief/partial': { limit: 10, windowSeconds: 3600 },
  'brief/submit': { limit: 10, windowSeconds: 3600 },
  'chat': { limit: 30, windowSeconds: 600 },
} as const)

export type RouteName = keyof typeof LIMITS

// Extracts the client's IP address from the request.
// First tries x-forwarded-for (load balancer / proxy), then x-real-ip (nginx),
// falls back to 'unknown' if neither header is present. The unknown fallback is
// intentional: when the IP is unknown, rate limiting is still applied (all
// unknown clients are bucketed together), and the limit is checked fairly.
export function clientKey(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  )
}

// Checks rate limit for a client on a specific route.
// Calls the database RPC to bump and return the hit counter for the current
// window. The limit config is looked up locally.
//
// FAIL OPEN: If the RPC errors for any reason, logs a warning and returns ok:true.
// Our database being unreachable is our fault, and turning away a real customer
// over our infrastructure failure is worse than letting a bot through. A
// misconfigured database should never punish actual users.
export async function rateLimit(
  req: NextRequest,
  route: RouteName,
): Promise<{ ok: boolean; hits: number; limit: number }> {
  const config = LIMITS[route]
  const key = clientKey(req)

  try {
    const { data, error } = await crmAdmin().rpc('bump_rate_limit', {
      p_key: key,
      p_route: route,
      p_window_seconds: config.windowSeconds,
    })

    if (error) throw error

    const hits = typeof data === 'number' ? data : 0
    return { ok: hits <= config.limit, hits, limit: config.limit }
  } catch (err) {
    console.warn(
      '[rate-limit] RPC failed, failing open to preserve availability:',
      err instanceof Error ? err.message : err,
    )
    return { ok: true, hits: 0, limit: config.limit }
  }
}

// Returns a 429 Too Many Requests response with a human-readable message.
export function tooManyRequests(message?: string): NextResponse {
  return NextResponse.json(
    { error: message ?? 'Too many requests. Give it a minute and try again.' },
    { status: 429 },
  )
}
