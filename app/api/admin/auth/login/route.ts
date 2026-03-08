import { NextRequest, NextResponse } from 'next/server'
import { createHash } from 'crypto'

const COOKIE_NAME = 'agency_admin'
const SALT = 'agency-salt'

function makeCookieValue(password: string): string {
  return createHash('sha256').update(password + SALT).digest('hex')
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { password } = body as { password?: string }

    const adminPassword = process.env.ADMIN_PASSWORD
    if (!adminPassword) {
      return NextResponse.json(
        { success: false, error: 'Server misconfiguration' },
        { status: 500 }
      )
    }

    if (!password || password !== adminPassword) {
      return NextResponse.json(
        { success: false, error: 'Invalid password' },
        { status: 401 }
      )
    }

    const cookieValue = makeCookieValue(adminPassword)

    const response = NextResponse.json({ success: true })
    response.cookies.set(COOKIE_NAME, cookieValue, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 86400 * 7,
    })

    return response
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid request' },
      { status: 400 }
    )
  }
}
