import { NextRequest, NextResponse } from 'next/server'
import { createHash } from 'crypto'

const COOKIE_NAME = 'agency_admin'
// Must match app/api/admin/auth/login/route.ts and app/admin/layout.tsx. This
// middleware previously hashed the password without the salt, so the value it
// expected could never equal the one login sets — every /admin request bounced
// back to the login page it had just come from.
const SALT = 'agency-salt'

/**
 * Derive the expected cookie value as sha256(ADMIN_PASSWORD + SALT).
 * Returns an empty string if ADMIN_PASSWORD is not set (will always fail auth).
 */
function expectedCookieValue(): string {
  const password = process.env.ADMIN_PASSWORD
  if (!password) return ''
  return createHash('sha256').update(password + SALT).digest('hex')
}

/**
 * Check whether the incoming request carries a valid admin session cookie.
 */
function isAuthenticated(req: NextRequest): boolean {
  const cookieValue = req.cookies.get(COOKIE_NAME)?.value
  if (!cookieValue) return false
  const expected = expectedCookieValue()
  if (!expected) return false
  // Constant-time comparison to avoid timing attacks
  return timingSafeEqual(cookieValue, expected)
}

/**
 * Simple constant-time string comparison (same length check + XOR).
 * Avoids early-exit that could leak timing information.
 */
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }
  return diff === 0
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Only protect /admin routes
  if (!pathname.startsWith('/admin')) {
    return NextResponse.next()
  }

  // Allow login page through unconditionally
  if (pathname === '/admin/login' || pathname.startsWith('/admin/login/')) {
    return NextResponse.next()
  }

  // Handle the login POST action — set cookie and redirect to /admin
  // The actual POST handling lives in the /admin/login route, but we support
  // a dedicated middleware path (/admin/login/authenticate) for form submissions
  // that want the cookie set at the edge.
  if (pathname === '/admin/login/authenticate' && req.method === 'POST') {
    return NextResponse.next()
  }

  // Protect all other /admin/* paths
  if (!isAuthenticated(req)) {
    const loginUrl = req.nextUrl.clone()
    loginUrl.pathname = '/admin/login'
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}

// ─── Edge-compatible cookie setter ───────────────────────────────────────────
// Exported so the /admin/login route handler can call it without duplicating logic.

/**
 * Build a Set-Cookie response that stores sha256(password) in the admin cookie.
 * Used by the /admin/login POST handler after verifying the submitted password.
 *
 * @param password  The plain-text ADMIN_PASSWORD value to hash and store.
 * @param redirectTo  Where to redirect after setting the cookie (default: /admin).
 */
export function buildLoginResponse(password: string, redirectTo = '/admin'): NextResponse {
  const hash = createHash('sha256').update(password + SALT).digest('hex')

  const response = NextResponse.redirect(
    new URL(redirectTo, process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000')
  )

  response.cookies.set(COOKIE_NAME, hash, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 8, // 8 hours
  })

  return response
}

/**
 * Build a response that clears the admin session cookie (logout).
 */
export function buildLogoutResponse(redirectTo = '/admin/login'): NextResponse {
  const response = NextResponse.redirect(
    new URL(redirectTo, process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000')
  )

  response.cookies.delete(COOKIE_NAME)

  return response
}
