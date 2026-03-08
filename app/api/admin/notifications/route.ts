import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabase-admin'

// GET /api/admin/notifications
// Returns notifications ordered by created_at desc, limit 100, joined with lead name/business.
export async function GET(req: NextRequest) {
  const unauth = requireAdmin(req)
  if (unauth) return unauth

  try {
    const { data, error } = await supabaseAdmin
      .from('notifications')
      .select(`
        id,
        created_at,
        type,
        title,
        body,
        lead_id,
        metadata,
        read,
        webhook_forwarded,
        webhook_response_code,
        leads (
          id,
          full_name,
          business_name,
          email
        )
      `)
      .order('created_at', { ascending: false })
      .limit(100)

    if (error) {
      console.error('[notifications] fetch error:', error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data: data ?? [] })
  } catch (err) {
    console.error('[notifications] unexpected error:', err)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
