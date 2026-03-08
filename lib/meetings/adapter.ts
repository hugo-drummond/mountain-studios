import type { MeetingType, MeetingPlatform } from '@/types'

// ---------------------------------------------------------------------------
// Shared interfaces
// ---------------------------------------------------------------------------

export interface MeetingDetails {
  meeting_link: string
  calendar_event_id: string
  platform: MeetingPlatform
  meeting_time: Date
  meeting_end_time: Date
}

export interface CalendarInviteDetails {
  to_email: string
  to_name: string
  subject: string
  start: Date
  end: Date
  description: string
  location: string
  organizer_email: string
  organizer_name: string
}

// ---------------------------------------------------------------------------
// Abstract adapter interface
// ---------------------------------------------------------------------------

export interface MeetingAdapter {
  createMeeting(opts: {
    lead_id: string
    meeting_type: MeetingType
    slot: Date
    duration_mins: number
    title: string
    description: string
    attendee_email: string
    attendee_name: string
  }): Promise<MeetingDetails>

  getRecording(calendar_event_id: string): Promise<string | null>

  sendCalendarInvite(details: CalendarInviteDetails): Promise<boolean>

  getAvailableSlots(
    date_from: Date,
    date_to: Date,
    duration_mins: number,
  ): Promise<Date[]>
}
