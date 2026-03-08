import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { createNotification } from '@/lib/notifications'
import {
  sendBookingConfirmation,
  sendSecondMeetingConfirmation,
} from '@/lib/email'
import { getMeetingAdapter } from '@/lib/meetings'
import type { MeetingType, LeadStatus } from '@/types'
const config = require('@/config/config')

// ---------------------------------------------------------------------------
// POST /api/bookings/create
// ---------------------------------------------------------------------------

const DURATION_MAP: Record<MeetingType, number> = {
  discovery: config.meetings.discoveryDurationMins,
  brief_review: config.meetings.briefReviewDurationMins,
  progress_review: config.meetings.progressReviewDurationMins,
}

const STATUS_MAP: Partial<Record<MeetingType, LeadStatus>> = {
  discovery: 'booked',
  brief_review: 'meeting_two_booked',
  // progress_review: no status change
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      lead_id,
      slot_datetime,
      notes,
      meeting_type = 'discovery',
    } = body as {
      lead_id: string
      slot_datetime: string
      notes?: string
      meeting_type: MeetingType
    }

    // ── 1. Validate required fields ───────────────────────────────────────────
    if (!lead_id) {
      return NextResponse.json(
        { success: false, error: 'lead_id is required' },
        { status: 400 },
      )
    }

    if (!slot_datetime) {
      return NextResponse.json(
        { success: false, error: 'slot_datetime is required' },
        { status: 400 },
      )
    }

    if (!['discovery', 'brief_review', 'progress_review'].includes(meeting_type)) {
      return NextResponse.json(
        { success: false, error: 'Invalid meeting_type' },
        { status: 400 },
      )
    }

    // ── 2. Validate slot_datetime ─────────────────────────────────────────────
    const slotDate = new Date(slot_datetime)
    if (isNaN(slotDate.getTime())) {
      return NextResponse.json(
        { success: false, error: 'slot_datetime is not a valid ISO datetime' },
        { status: 400 },
      )
    }

    // ── 3. Fetch lead ─────────────────────────────────────────────────────────
    const { data: lead, error: leadError } = await supabaseAdmin
      .from('leads')
      .select('*')
      .eq('id', lead_id)
      .single()

    if (leadError || !lead) {
      return NextResponse.json(
        { success: false, error: 'Lead not found' },
        { status: 404 },
      )
    }

    // ── 4 & 5. Get adapter and create meeting ─────────────────────────────────
    const duration_mins = DURATION_MAP[meeting_type]
    const adapter = getMeetingAdapter()

    const meetingTypeLabel =
      meeting_type === 'discovery'
        ? 'Discovery Call'
        : meeting_type === 'brief_review'
          ? 'Brief Review'
          : 'Progress Review'

    const meetingDetails = await adapter.createMeeting({
      lead_id,
      meeting_type,
      slot: slotDate,
      duration_mins,
      title: `${meetingTypeLabel} — ${lead.business_name}`,
      description: notes ?? '',
      attendee_email: lead.email,
      attendee_name: lead.full_name ?? lead.business_name,
    })

    // ── 6. Insert meeting row ─────────────────────────────────────────────────
    const now = new Date().toISOString()

    const { data: meeting, error: meetingInsertError } = await supabaseAdmin
      .from('meetings')
      .insert({
        lead_id,
        meeting_time: meetingDetails.meeting_time.toISOString(),
        meeting_end_time: meetingDetails.meeting_end_time.toISOString(),
        calendar_event_id: meetingDetails.calendar_event_id ?? null,
        meeting_link: meetingDetails.meeting_link ?? null,
        platform: meetingDetails.platform ?? null,
        meeting_type,
        notes_from_client: notes ?? null,
        status: 'scheduled',
        transcript_processed: false,
        created_at: now,
      })
      .select()
      .single()

    if (meetingInsertError || !meeting) {
      console.error('[bookings/create] insert error:', meetingInsertError)
      return NextResponse.json(
        { success: false, error: 'Failed to create meeting record' },
        { status: 500 },
      )
    }

    // ── 7. Update lead status ─────────────────────────────────────────────────
    const newStatus = STATUS_MAP[meeting_type]
    if (newStatus) {
      await supabaseAdmin
        .from('leads')
        .update({ status: newStatus, updated_at: now })
        .eq('id', lead_id)
    }

    // ── 8. Send confirmation email ────────────────────────────────────────────
    const formattedTime = new Date(meetingDetails.meeting_time).toLocaleString(
      'en-GB',
      { timeZone: 'Africa/Johannesburg', dateStyle: 'full', timeStyle: 'short' },
    )

    if (meeting_type === 'discovery') {
      await sendBookingConfirmation(lead.email, {
        client_name: lead.full_name ?? lead.business_name,
        meeting_time: formattedTime,
        meeting_link: meetingDetails.meeting_link ?? '',
        meeting_type: meetingTypeLabel,
      })
    } else if (meeting_type === 'brief_review') {
      await sendSecondMeetingConfirmation(lead.email, {
        client_name: lead.full_name ?? lead.business_name,
        meeting_time: formattedTime,
        meeting_link: meetingDetails.meeting_link ?? '',
      })
    }

    // ── 9. Create notification ────────────────────────────────────────────────
    await createNotification({
      type: 'meeting_booked',
      title: `Meeting booked: ${meetingTypeLabel} — ${lead.business_name}`,
      body: `Scheduled for ${formattedTime}`,
      lead_id,
      metadata: {
        meeting_id: meeting.id,
        meeting_type,
        meeting_time: meetingDetails.meeting_time.toISOString(),
      },
    })

    // ── 10. Return ─────────────────────────────────────────────────────────────
    return NextResponse.json({
      success: true,
      data: { meeting },
    })
  } catch (err) {
    console.error('[bookings/create] unexpected error:', err)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 },
    )
  }
}
