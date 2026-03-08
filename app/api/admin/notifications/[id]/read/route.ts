import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabase-admin'

// PATCH /api/admin/notifications/[id]/read
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const unauth = requireAdmin(req)
  if (unauth) return unauth

  const { id } = params

  try {
    const { error } = await supabaseAdmin
      .from('notifications')
      .update({ read: true })
      .eq('id', id)

    if (error) {
      console.error('[notifications/read] update error:', error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[notifications/read] unexpected error:', err)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
