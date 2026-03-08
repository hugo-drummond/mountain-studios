import { NextRequest, NextResponse } from 'next/server'
import { getMeetingAdapter } from '@/lib/meetings'
import type { MeetingType, BookingSlot } from '@/types'
const config = require('@/config/config')

// ---------------------------------------------------------------------------
// GET /api/bookings/slots?meeting_type=discovery&lead_id=xxx
// ---------------------------------------------------------------------------

const DURATION_MAP: Record<MeetingType, number> = {
  discovery: config.meetings.discoveryDurationMins,
  brief_review: config.meetings.briefReviewDurationMins,
  progress_review: config.meetings.progressReviewDurationMins,
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const meeting_type = (searchParams.get('meeting_type') ?? 'discovery') as MeetingType

    if (!['discovery', 'brief_review', 'progress_review'].includes(meeting_type)) {
      return NextResponse.json(
        { success: false, error: 'Invalid meeting_type' },
        { status: 400 },
      )
    }

    const duration_mins = DURATION_MAP[meeting_type]

    // ── Build date range: tomorrow 9am → 14 days from now 5pm (SAST) ─────────
    // Africa/Johannesburg = UTC+2
    const SAST_OFFSET_MS = 2 * 60 * 60 * 1000

    const nowUtc = Date.now()

    // Tomorrow in SAST
    const tomorrowSast = new Date(nowUtc + SAST_OFFSET_MS)
    tomorrowSast.setUTCDate(tomorrowSast.getUTCDate() + 1)
    tomorrowSast.setUTCHours(9, 0, 0, 0)
    const date_from = new Date(tomorrowSast.getTime() - SAST_OFFSET_MS)

    // 14 days from now at 5pm SAST
    const endSast = new Date(nowUtc + SAST_OFFSET_MS)
    endSast.setUTCDate(endSast.getUTCDate() + 14)
    endSast.setUTCHours(17, 0, 0, 0)
    const date_to = new Date(endSast.getTime() - SAST_OFFSET_MS)

    // ── Get slots from adapter ────────────────────────────────────────────────
    const adapter = getMeetingAdapter()
    const slotDates = await adapter.getAvailableSlots(date_from, date_to, duration_mins)

    // ── Filter out weekends (in SAST) ─────────────────────────────────────────
    const slots: BookingSlot[] = slotDates
      .filter((slotDate) => {
        const sastDate = new Date(slotDate.getTime() + SAST_OFFSET_MS)
        const day = sastDate.getUTCDay() // 0=Sun, 6=Sat
        return day >= 1 && day <= 5
      })
      .map((slotDate) => {
        const end = new Date(slotDate.getTime() + duration_mins * 60 * 1000)
        return {
          datetime: slotDate.toISOString(),
          end_datetime: end.toISOString(),
          available: true,
        }
      })

    return NextResponse.json({
      success: true,
      data: { slots },
    })
  } catch (err) {
    console.error('[bookings/slots] unexpected error:', err)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 },
    )
  }
}
