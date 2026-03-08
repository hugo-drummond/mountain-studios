import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

// ─── Iron-session config ──────────────────────────────────────────────────────

export const SESSION_OPTIONS = {
  cookieName: 'agency-admin-session',
  password: process.env.ADMIN_PASSWORD ?? 'fallback-dev-password-change-in-production',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax' as const,
    maxAge: 60 * 60 * 8, // 8 hours
  },
}

// ─── Password utilities ───────────────────────────────────────────────────────

const BCRYPT_ROUNDS = 12

/**
 * Hash a plain-text password with bcrypt.
 */
export async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, BCRYPT_ROUNDS)
}

/**
 * Compare a plain-text password against a bcrypt hash.
 */
export async function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash)
}

// ─── Session validation ───────────────────────────────────────────────────────

/**
 * Validate the admin session from a raw Request object.
 *
 * Strategy:
 *   1. Check x-admin-token header (used by API routes called from the dashboard).
 *   2. Return true if the token matches ADMIN_PASSWORD exactly.
 *
 * For cookie-based sessions (server components / middleware), use the
 * middleware check instead; this helper is for API route handlers that
 * receive a NextRequest / Request.
 *
 * Returns true if authenticated, false otherwise.
 */
export async function getAdminSession(req: Request): Promise<boolean> {
  const adminPassword = process.env.ADMIN_PASSWORD
  if (!adminPassword) return false

  // Header-based bearer token (API routes from dashboard)
  const token = req.headers.get('x-admin-token')
  if (token && token === adminPassword) return true

  // Authorization: Bearer <token>
  const authHeader = req.headers.get('authorization')
  if (authHeader?.startsWith('Bearer ')) {
    const bearer = authHeader.slice(7)
    if (bearer === adminPassword) return true
  }

  return false
}

// ─── withAdminAuth higher-order handler ──────────────────────────────────────

type RouteHandler = (req: NextRequest, ctx: { params: Record<string, string> }) => Promise<Response>

/**
 * Wrap a Next.js App Router route handler with admin authentication.
 * Returns 401 JSON if the request is not authenticated.
 */
export function withAdminAuth(handler: RouteHandler): RouteHandler {
  return async (req: NextRequest, ctx: { params: Record<string, string> }) => {
    const authenticated = await getAdminSession(req)

    if (!authenticated) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized', code: 'UNAUTHORIZED' },
        { status: 401 }
      )
    }

    return handler(req, ctx)
  }
}

// ─── requireAdmin inline guard ────────────────────────────────────────────────

/**
 * Inline guard for use at the top of route handlers.
 *
 * Usage:
 *   const unauth = requireAdmin(req)
 *   if (unauth) return unauth
 *
 * Returns a 401 NextResponse if the request is NOT authenticated.
 * Returns null if the request IS authenticated and may proceed.
 */
export function requireAdmin(req: NextRequest): NextResponse | null {
  const adminPassword = process.env.ADMIN_PASSWORD
  if (!adminPassword) {
    return NextResponse.json(
      { success: false, error: 'Server misconfiguration: ADMIN_PASSWORD not set', code: 'SERVER_ERROR' },
      { status: 500 }
    )
  }

  // x-admin-token header
  const token = req.headers.get('x-admin-token')
  if (token && token === adminPassword) return null

  // Authorization: Bearer <token>
  const authHeader = req.headers.get('authorization')
  if (authHeader?.startsWith('Bearer ')) {
    const bearer = authHeader.slice(7)
    if (bearer === adminPassword) return null
  }

  return NextResponse.json(
    { success: false, error: 'Unauthorized', code: 'UNAUTHORIZED' },
    { status: 401 }
  )
}
