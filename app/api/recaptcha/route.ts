import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { token } = await request.json()

  if (!token) {
    return NextResponse.json({ success: false, error: 'No token provided' }, { status: 400 })
  }

  const secret = process.env.RECAPTCHA_SECRET_KEY
  if (!secret) {
    return NextResponse.json({ success: false, error: 'reCAPTCHA not configured' }, { status: 500 })
  }

  const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${secret}&response=${token}`,
  })

  const data = await res.json()

  if (data.success && data.score >= 0.5) {
    return NextResponse.json({ success: true, score: data.score })
  }

  return NextResponse.json({ success: false, score: data.score || 0 }, { status: 403 })
}
