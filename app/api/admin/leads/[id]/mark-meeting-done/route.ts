import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { createNotification } from '@/lib/notifications'
import { requireAdmin } from '@/lib/auth'

// ---------------------------------------------------------------------------
// POST /api/admin/leads/[id]/mark-meeting-done
// ---------------------------------------------------------------------------

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  // ── Admin auth ────────────────────────────────────────────────────────────
  const unauth = requireAdmin(req)
  if (unauth) return unauth

  try {
    const { id } = params
    const body = await req.json()
    const { meeting_id, meeting_type } = body as {
      meeting_id: string
      meeting_type: 'discovery' | 'brief_review'
    }

    // ── Validate inputs ───────────────────────────────────────────────────────
    if (!meeting_id) {
      return NextResponse.json(
        { success: false, error: 'meeting_id is required' },
        { status: 400 },
      )
    }

    if (!meeting_type || !['discovery', 'brief_review'].includes(meeting_type)) {
      return NextResponse.json(
        { success: false, error: "meeting_type must be 'discovery' or 'brief_review'" },
        { status: 400 },
      )
    }

    // ── 1. Fetch meeting, verify it belongs to this lead ──────────────────────
    const { data: meeting, error: meetingError } = await supabaseAdmin
      .from('meetings')
      .select('*')
      .eq('id', meeting_id)
      .eq('lead_id', id)
      .single()

    if (meetingError || !meeting) {
      return NextResponse.json(
        { success: false, error: 'Meeting not found or does not belong to this lead' },
        { status: 404 },
      )
    }

    // ── 2. Update meeting status → 'completed' ────────────────────────────────
    const { data: updatedMeeting, error: meetingUpdateError } = await supabaseAdmin
      .from('meetings')
      .update({ status: 'completed' })
      .eq('id', meeting_id)
      .select()
      .single()

    if (meetingUpdateError) {
      console.error('[mark-meeting-done] meeting update error:', meetingUpdateError)
      return NextResponse.json(
        { success: false, error: 'Failed to update meeting status' },
        { status: 500 },
      )
    }

    // ── Fetch lead for business_name ──────────────────────────────────────────
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

    // ── 3. Branch on meeting_type ─────────────────────────────────────────────
    if (meeting_type === 'discovery') {
      const { data: updatedLead } = await supabaseAdmin
        .from('leads')
        .update({ status: 'meeting_one_done' })
        .eq('id', id)
        .select()
        .single()

      await createNotification({
        type: 'meeting_completed',
        title: `Discovery call complete: ${lead.business_name}`,
        body: `Discovery meeting marked complete for ${lead.email}`,
        lead_id: id,
        metadata: { meeting_id },
      })

      return NextResponse.json({
        success: true,
        data: {
          lead: updatedLead ?? lead,
          meeting: updatedMeeting,
          next_action: 'send_brief',
        },
      })
    }

    // meeting_type === 'brief_review'
    const { data: updatedLead } = await supabaseAdmin
      .from('leads')
      .update({ status: 'meeting_two_done' })
      .eq('id', id)
      .select()
      .single()

    await createNotification({
      type: 'meeting_completed',
      title: `Brief review complete: ${lead.business_name}`,
      body: `Brief review meeting marked complete for ${lead.email}`,
      lead_id: id,
      metadata: { meeting_id },
    })

    return NextResponse.json({
      success: true,
      data: {
        lead: updatedLead ?? lead,
        meeting: updatedMeeting,
        next_action: 'choose_outcome',
        outcomes: ['proceed', 'nurture'],
      },
    })
  } catch (err) {
    console.error('[mark-meeting-done] unexpected error:', err)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 },
    )
  }
}
