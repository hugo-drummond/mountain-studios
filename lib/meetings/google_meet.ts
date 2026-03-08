import type { MeetingType, MeetingPlatform } from '@/types'
import type {
  MeetingAdapter,
  MeetingDetails,
  CalendarInviteDetails,
} from './adapter'

// ---------------------------------------------------------------------------
// Token cache
// ---------------------------------------------------------------------------

interface TokenCache {
  token: string
  expiresAt: number // epoch ms
}

let tokenCache: TokenCache | null = null

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getEnv(key: string): string {
  const value = process.env[key]
  if (!value) throw new Error(`[google_meet] Missing env var: ${key}`)
  return value
}

const GOOGLE_OAUTH_TOKEN_URL = 'https://oauth2.googleapis.com/token'
const CALENDAR_BASE = 'https://www.googleapis.com/calendar/v3'

// ---------------------------------------------------------------------------
// GoogleMeetAdapter
// ---------------------------------------------------------------------------

export class GoogleMeetAdapter implements MeetingAdapter {
  // -------------------------------------------------------------------------
  // Auth — OAuth2 with refresh token or service account
  // -------------------------------------------------------------------------

  async getAccessToken(): Promise<string> {
    const now = Date.now()

    if (tokenCache && tokenCache.expiresAt > now) {
      return tokenCache.token
    }

    const clientId = getEnv('GOOGLE_CLIENT_ID')
    const clientSecret = getEnv('GOOGLE_CLIENT_SECRET')
    const refreshToken = getEnv('GOOGLE_REFRESH_TOKEN')

    const body = new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    })

    const res = await fetch(GOOGLE_OAUTH_TOKEN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    })

    if (!res.ok) {
      const text = await res.text()
      throw new Error(`[google_meet] Token refresh failed ${res.status}: ${text}`)
    }

    const json = await res.json()
    const token: string = json.access_token
    const expiresIn: number = json.expires_in ?? 3600
    tokenCache = { token, expiresAt: now + (expiresIn - 300) * 1000 }
    return token
  }

  private async calendarFetch(
    path: string,
    opts: RequestInit = {},
  ): Promise<Response> {
    const token = await this.getAccessToken()
    return fetch(`${CALENDAR_BASE}${path}`, {
      ...opts,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...(opts.headers ?? {}),
      },
    })
  }

  // -------------------------------------------------------------------------
  // createMeeting
  // -------------------------------------------------------------------------

  async createMeeting(opts: {
    lead_id: string
    meeting_type: MeetingType
    slot: Date
    duration_mins: number
    title: string
    description: string
    attendee_email: string
    attendee_name: string
  }): Promise<MeetingDetails> {
    const calendarId = getEnv('GOOGLE_CALENDAR_ID')
    const endTime = new Date(opts.slot.getTime() + opts.duration_mins * 60 * 1000)

    // Generate a unique request ID for conference creation
    const requestId = `${opts.lead_id}-${Date.now()}`

    const res = await this.calendarFetch(
      `/calendars/${encodeURIComponent(calendarId)}/events?conferenceDataVersion=1&sendUpdates=all`,
      {
        method: 'POST',
        body: JSON.stringify({
          summary: opts.title,
          description: opts.description,
          start: { dateTime: opts.slot.toISOString(), timeZone: 'UTC' },
          end: { dateTime: endTime.toISOString(), timeZone: 'UTC' },
          attendees: [
            { email: opts.attendee_email, displayName: opts.attendee_name },
          ],
          conferenceData: {
            createRequest: {
              requestId,
              conferenceSolutionKey: { type: 'hangoutsMeet' },
            },
          },
        }),
      },
    )

    if (!res.ok) {
      const text = await res.text()
      throw new Error(`[google_meet] createEvent failed ${res.status}: ${text}`)
    }

    const event = await res.json()
    const meetLink: string =
      event.conferenceData?.entryPoints?.find(
        (ep: Record<string, string>) => ep.entryPointType === 'video',
      )?.uri ?? event.hangoutLink ?? ''

    return {
      meeting_link: meetLink,
      calendar_event_id: event.id as string,
      platform: 'google_meet' as MeetingPlatform,
      meeting_time: opts.slot,
      meeting_end_time: endTime,
    }
  }

  // -------------------------------------------------------------------------
  // getRecording
  // -------------------------------------------------------------------------

  async getRecording(calendar_event_id: string): Promise<string | null> {
    // Google Meet recordings land in Google Drive; the Calendar API does not
    // expose them directly. We return null — a Drive polling job should handle
    // this out-of-band.
    console.info(
      `[google_meet] getRecording: recording for event ${calendar_event_id} must be retrieved from Google Drive`,
    )
    return null
  }

  // -------------------------------------------------------------------------
  // sendCalendarInvite
  // -------------------------------------------------------------------------

  async sendCalendarInvite(details: CalendarInviteDetails): Promise<boolean> {
    // Google Calendar sends invites automatically (sendUpdates=all) when the
    // event is created. This method covers standalone/re-send scenarios via
    // a calendar event patch.
    const calendarId = getEnv('GOOGLE_CALENDAR_ID')

    try {
      const res = await this.calendarFetch(
        `/calendars/${encodeURIComponent(calendarId)}/events?sendUpdates=all`,
        {
          method: 'POST',
          body: JSON.stringify({
            summary: details.subject,
            description: details.description,
            location: details.location,
            start: { dateTime: details.start.toISOString(), timeZone: 'UTC' },
            end: { dateTime: details.end.toISOString(), timeZone: 'UTC' },
            attendees: [
              { email: details.to_email, displayName: details.to_name },
            ],
            organizer: {
              email: details.organizer_email,
              displayName: details.organizer_name,
            },
          }),
        },
      )

      return res.ok
    } catch (err) {
      console.error('[google_meet] sendCalendarInvite error:', err)
      return false
    }
  }

  // -------------------------------------------------------------------------
  // getAvailableSlots — freebusy query
  // -------------------------------------------------------------------------

  async getAvailableSlots(
    date_from: Date,
    date_to: Date,
    duration_mins: number,
  ): Promise<Date[]> {
    const calendarId = getEnv('GOOGLE_CALENDAR_ID')

    try {
      const res = await this.calendarFetch(
        '/freeBusy',
        {
          method: 'POST',
          body: JSON.stringify({
            timeMin: date_from.toISOString(),
            timeMax: date_to.toISOString(),
            timeZone: 'Africa/Johannesburg',
            items: [{ id: calendarId }],
          }),
        },
      )

      if (!res.ok) {
        console.error('[google_meet] freeBusy failed:', res.status)
        return generateWorkdaySlots(date_from, date_to, duration_mins, [])
      }

      const json = await res.json()
      const busyPeriods: Array<{ start: string; end: string }> =
        json.calendars?.[calendarId]?.busy ?? []

      const busyIntervals = busyPeriods.map((b) => ({
        start: new Date(b.start),
        end: new Date(b.end),
      }))

      return generateWorkdaySlots(date_from, date_to, duration_mins, busyIntervals)
    } catch (err) {
      console.error('[google_meet] getAvailableSlots error:', err)
      return []
    }
  }
}

// ---------------------------------------------------------------------------
// Slot generation helper
// ---------------------------------------------------------------------------

interface BusyInterval {
  start: Date
  end: Date
}

function generateWorkdaySlots(
  from: Date,
  to: Date,
  durationMins: number,
  busy: BusyInterval[],
): Date[] {
  const slots: Date[] = []
  const cursor = new Date(from)
  cursor.setSeconds(0, 0)

  while (cursor < to) {
    const day = cursor.getDay()
    if (day >= 1 && day <= 5) {
      const hour = cursor.getHours()
      if (hour >= 9 && hour < 17) {
        const slotEnd = new Date(cursor.getTime() + durationMins * 60 * 1000)
        const isBusy = busy.some((b) => cursor < b.end && slotEnd > b.start)
        if (!isBusy) {
          slots.push(new Date(cursor))
        }
      }
    }
    cursor.setMinutes(cursor.getMinutes() + durationMins)
  }

  return slots
}
