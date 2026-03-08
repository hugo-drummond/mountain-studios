import type { MeetingAdapter } from './adapter'
import { TeamsMeetingAdapter } from './teams'
import { ZoomMeetingAdapter } from './zoom'
import { GoogleMeetAdapter } from './google_meet'

export function getMeetingAdapter(): MeetingAdapter {
  const platform = process.env.MEETING_PLATFORM || 'teams'
  switch (platform) {
    case 'teams':
      return new TeamsMeetingAdapter()
    case 'zoom':
      return new ZoomMeetingAdapter()
    case 'google_meet':
      return new GoogleMeetAdapter()
    default:
      return new TeamsMeetingAdapter()
  }
}

export type { MeetingAdapter, MeetingDetails, CalendarInviteDetails } from './adapter'
