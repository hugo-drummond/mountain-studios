import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { createNotification } from '@/lib/notifications'
import { sendProgressReviewInvitation } from '@/lib/email'
import { requireAdmin } from '@/lib/auth'
const config = require('@/config/config')

// ---------------------------------------------------------------------------
// POST /api/admin/leads/[id]/schedule-progress-review
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
    const {
      slot_datetime,
      preview_url,
      notes,
    } = body as {
      slot_datetime: string
      preview_url?: string
      notes?: string
    }

    if (!slot_datetime) {
      return NextResponse.json(
        { success: false, error: 'slot_datetime is required' },
        { status: 400 },
      )
    }

    // ── 1. Fetch lead ─────────────────────────────────────────────────────────
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

    if (lead.status !== 'building') {
      return NextResponse.json(
        {
          success: false,
          error: `Lead status must be 'building' to schedule a progress review. Current status: '${lead.status}'`,
        },
        { status: 400 },
      )
    }

    // ── 2 & 3. Calculate meeting end time ─────────────────────────────────────
    const durationMins: number = config.meetings.progressReviewDurationMins ?? 30
    const startTime = new Date(slot_datetime)
    const endTime = new Date(startTime.getTime() + durationMins * 60 * 1000)

    // ── 4. Insert meeting row ─────────────────────────────────────────────────
    const { data: meeting, error: meetingInsertError } = await supabaseAdmin
      .from('meetings')
      .insert({
        lead_id: id,
        meeting_type: 'progress_review',
        meeting_time: startTime.toISOString(),
        meeting_end_time: endTime.toISOString(),
        status: 'scheduled',
        notes_from_client: notes ?? null,
        transcript_processed: false,
      })
      .select()
      .single()

    if (meetingInsertError || !meeting) {
      console.error('[schedule-progress-review] meeting insert error:', meetingInsertError)
      return NextResponse.json(
        { success: false, error: 'Failed to create meeting' },
        { status: 500 },
      )
    }

    // ── 5. Send progress review invitation email ──────────────────────────────
    const meetingLink = meeting.meeting_link ?? ''
    const formattedTime = startTime.toLocaleString('en-GB', {
      dateStyle: 'full',
      timeStyle: 'short',
      timeZone: config.agency.timezone ?? 'UTC',
    })

    await sendProgressReviewInvitation(lead.email, {
      client_name: lead.full_name ?? lead.business_name,
      meeting_time: formattedTime,
      meeting_link: meetingLink,
      preview_url: preview_url ?? '',
    })

    // ── 6. Create notification ────────────────────────────────────────────────
    await createNotification({
      type: 'meeting_booked',
      title: `Progress review scheduled: ${lead.business_name}`,
      body: `Progress review booked for ${lead.email} at ${formattedTime}`,
      lead_id: id,
      metadata: {
        meeting_id: meeting.id,
        meeting_time: startTime.toISOString(),
        preview_url: preview_url ?? null,
      },
    })

    // ── 7. Return ─────────────────────────────────────────────────────────────
    return NextResponse.json({
      success: true,
      data: { meeting },
    })
  } catch (err) {
    console.error('[schedule-progress-review] unexpected error:', err)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 },
    )
  }
}
