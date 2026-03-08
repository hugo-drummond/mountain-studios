import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

// ---------------------------------------------------------------------------
// GET /api/leads/[id]
// ---------------------------------------------------------------------------

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params

    // ── Fetch lead ────────────────────────────────────────────────────────────
    const { data: lead, error: leadError } = await supabaseAdmin
      .from('leads')
      .select('*')
      .eq('id', id)
      .single()

    if (leadError || !lead) {
      return NextResponse.json(
        { success: false, error: 'Lead not found' },
        { status: 404 },
      )
    }

    // ── Fetch associated meetings ─────────────────────────────────────────────
    const { data: meetings, error: meetingsError } = await supabaseAdmin
      .from('meetings')
      .select('*')
      .eq('lead_id', id)
      .order('meeting_time', { ascending: true })

    if (meetingsError) {
      console.error('[leads/[id]] meetings fetch error:', meetingsError)
    }

    // ── Fetch brief if exists ─────────────────────────────────────────────────
    const { data: brief, error: briefError } = await supabaseAdmin
      .from('briefs')
      .select('*')
      .eq('lead_id', id)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (briefError) {
      console.error('[leads/[id]] brief fetch error:', briefError)
    }

    return NextResponse.json({
      success: true,
      data: {
        ...lead,
        meetings: meetings ?? [],
        brief: brief ?? null,
      },
    })
  } catch (err) {
    console.error('[leads/[id]] unexpected error:', err)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 },
    )
  }
}
