import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabase-admin'

// POST /api/admin/notifications/mark-all-read
export async function POST(req: NextRequest) {
  const unauth = requireAdmin(req)
  if (unauth) return unauth

  try {
    const { error } = await supabaseAdmin
      .from('notifications')
      .update({ read: true })
      .eq('read', false)

    if (error) {
      console.error('[notifications/mark-all-read] error:', error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[notifications/mark-all-read] unexpected error:', err)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
