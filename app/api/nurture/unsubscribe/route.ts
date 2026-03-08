import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

// ---------------------------------------------------------------------------
// GET /api/nurture/unsubscribe?lead_id=xxx&token=yyy
// token = base64(lead_id)
// ---------------------------------------------------------------------------

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const lead_id = searchParams.get('lead_id')
    const token = searchParams.get('token')

    if (!lead_id || !token) {
      return new NextResponse(
        '<html><body><h2>Invalid unsubscribe link.</h2></body></html>',
        {
          status: 400,
          headers: { 'Content-Type': 'text/html; charset=utf-8' },
        },
      )
    }

    // ── Verify token = base64(lead_id) ────────────────────────────────────────
    let decoded: string
    try {
      decoded = Buffer.from(token, 'base64').toString('utf-8')
    } catch {
      return new NextResponse(
        '<html><body><h2>Invalid unsubscribe token.</h2></body></html>',
        {
          status: 400,
          headers: { 'Content-Type': 'text/html; charset=utf-8' },
        },
      )
    }

    if (decoded !== lead_id) {
      return new NextResponse(
        '<html><body><h2>Invalid unsubscribe token.</h2></body></html>',
        {
          status: 400,
          headers: { 'Content-Type': 'text/html; charset=utf-8' },
        },
      )
    }

    // ── Update nurture_list ───────────────────────────────────────────────────
    const { error } = await supabaseAdmin
      .from('nurture_list')
      .update({
        subscribed: false,
        unsubscribed_at: new Date().toISOString(),
      })
      .eq('lead_id', lead_id)

    if (error) {
      console.error('[nurture/unsubscribe] update error:', error)
      return new NextResponse(
        '<html><body><h2>Something went wrong. Please try again or contact us.</h2></body></html>',
        {
          status: 500,
          headers: { 'Content-Type': 'text/html; charset=utf-8' },
        },
      )
    }

    return new NextResponse(
      `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Unsubscribed</title>
  <style>
    body { font-family: sans-serif; max-width: 480px; margin: 80px auto; text-align: center; color: #333; }
    h1 { font-size: 1.5rem; margin-bottom: 1rem; }
    p { color: #666; }
  </style>
</head>
<body>
  <h1>You have been unsubscribed successfully.</h1>
  <p>You will no longer receive marketing emails from us.</p>
</body>
</html>`,
      {
        status: 200,
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      },
    )
  } catch (err) {
    console.error('[nurture/unsubscribe] unexpected error:', err)
    return new NextResponse(
      '<html><body><h2>Internal server error.</h2></body></html>',
      {
        status: 500,
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      },
    )
  }
}
