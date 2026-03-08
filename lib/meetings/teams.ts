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
  if (!value) throw new Error(`[teams] Missing env var: ${key}`)
  return value
}

function graphBase(): string {
  return 'https://graph.microsoft.com/v1.0'
}

// ---------------------------------------------------------------------------
// TeamssMeetingAdapter
// ---------------------------------------------------------------------------

export class TeamsMeetingAdapter implements MeetingAdapter {
  // -------------------------------------------------------------------------
  // Auth
  // -------------------------------------------------------------------------

  async getAccessToken(): Promise<string> {
    const now = Date.now()

    if (tokenCache && tokenCache.expiresAt > now) {
      return tokenCache.token
    }

    const tenantId = getEnv('TEAMS_TENANT_ID')
    const clientId = getEnv('TEAMS_CLIENT_ID')
    const clientSecret = getEnv('TEAMS_CLIENT_SECRET')

    const body = new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
      scope: 'https://graph.microsoft.com/.default',
    })

    const res = await fetch(
      `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      },
    )

    if (!res.ok) {
      const text = await res.text()
      throw new Error(`[teams] Token fetch failed ${res.status}: ${text}`)
    }

    const json = await res.json()
    const token: string = json.access_token
    // Cache for 55 minutes (tokens typically valid 60 min)
    tokenCache = { token, expiresAt: now + 55 * 60 * 1000 }
    return token
  }

  private async graphFetch(
    path: string,
    opts: RequestInit = {},
  ): Promise<Response> {
    const token = await this.getAccessToken()
    return fetch(`${graphBase()}${path}`, {
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
    const userId = getEnv('TEAMS_USER_ID')
    const endTime = new Date(opts.slot.getTime() + opts.duration_mins * 60 * 1000)

    // 1. Create the online meeting
    const meetingRes = await this.graphFetch(
      `/users/${userId}/onlineMeetings`,
      {
        method: 'POST',
        body: JSON.stringify({
          startDateTime: opts.slot.toISOString(),
          endDateTime: endTime.toISOString(),
          subject: opts.title,
        }),
      },
    )

    if (!meetingRes.ok) {
      const text = await meetingRes.text()
      throw new Error(`[teams] createOnlineMeeting failed ${meetingRes.status}: ${text}`)
    }

    const meeting = await meetingRes.json()
    const meetingLink: string = meeting.joinWebUrl

    // 2. Create a calendar event with the attendee
    const eventRes = await this.graphFetch(
      `/users/${userId}/calendar/events`,
      {
        method: 'POST',
        body: JSON.stringify({
          subject: opts.title,
          body: { contentType: 'HTML', content: opts.description },
          start: { dateTime: opts.slot.toISOString(), timeZone: 'UTC' },
          end: { dateTime: endTime.toISOString(), timeZone: 'UTC' },
          location: { displayName: meetingLink },
          onlineMeeting: { joinUrl: meetingLink },
          attendees: [
            {
              emailAddress: {
                address: opts.attendee_email,
                name: opts.attendee_name,
              },
              type: 'required',
            },
          ],
          isOnlineMeeting: true,
          onlineMeetingProvider: 'teamsForBusiness',
        }),
      },
    )

    if (!eventRes.ok) {
      const text = await eventRes.text()
      throw new Error(`[teams] createCalendarEvent failed ${eventRes.status}: ${text}`)
    }

    const event = await eventRes.json()

    return {
      meeting_link: meetingLink,
      calendar_event_id: event.id as string,
      platform: 'teams' as MeetingPlatform,
      meeting_time: opts.slot,
      meeting_end_time: endTime,
    }
  }

  // -------------------------------------------------------------------------
  // getRecording
  // -------------------------------------------------------------------------

  async getRecording(calendar_event_id: string): Promise<string | null> {
    const userId = getEnv('TEAMS_USER_ID')

    try {
      const res = await this.graphFetch(
        `/users/${userId}/calendar/events/${calendar_event_id}/attachments`,
      )

      if (!res.ok) return null

      const json = await res.json()
      // Look for a recording attachment (OneDrive / SharePoint link)
      const attachments: Array<Record<string, unknown>> = json.value ?? []
      const recording = attachments.find(
        (a) =>
          typeof a.name === 'string' &&
          a.name.toLowerCase().includes('recording'),
      )

      if (recording && typeof recording.contentLocation === 'string') {
        return recording.contentLocation
      }

      return null
    } catch (err) {
      console.error('[teams] getRecording error:', err)
      return null
    }
  }

  // -------------------------------------------------------------------------
  // sendCalendarInvite
  // -------------------------------------------------------------------------

  async sendCalendarInvite(details: CalendarInviteDetails): Promise<boolean> {
    const userId = getEnv('TEAMS_USER_ID')

    const res = await this.graphFetch(`/users/${userId}/sendMail`, {
      method: 'POST',
      body: JSON.stringify({
        message: {
          subject: details.subject,
          body: {
            contentType: 'HTML',
            content: `
              <p>${details.description}</p>
              <p><strong>When:</strong> ${details.start.toISOString()}</p>
              <p><strong>Location:</strong> ${details.location}</p>
            `,
          },
          toRecipients: [
            {
              emailAddress: {
                address: details.to_email,
                name: details.to_name,
              },
            },
          ],
        },
        saveToSentItems: true,
      }),
    })

    return res.ok
  }

  // -------------------------------------------------------------------------
  // getAvailableSlots
  // -------------------------------------------------------------------------

  async getAvailableSlots(
    date_from: Date,
    date_to: Date,
    duration_mins: number,
  ): Promise<Date[]> {
    const userId = getEnv('TEAMS_USER_ID')

    const res = await this.graphFetch(`/users/${userId}/calendar/getSchedule`, {
      method: 'POST',
      body: JSON.stringify({
        schedules: [process.env.TEAMS_USER_ID],
        startTime: {
          dateTime: date_from.toISOString(),
          timeZone: 'Africa/Johannesburg',
        },
        endTime: {
          dateTime: date_to.toISOString(),
          timeZone: 'Africa/Johannesburg',
        },
        availabilityViewInterval: duration_mins,
      }),
    })

    if (!res.ok) {
      console.error('[teams] getSchedule failed:', res.status)
      return []
    }

    const json = await res.json()
    const scheduleItems: Array<Record<string, unknown>> =
      (json.value?.[0]?.scheduleItems as Array<Record<string, unknown>>) ?? []

    // Build busy intervals
    const busyIntervals = scheduleItems
      .filter((item) => item.status !== 'free')
      .map((item) => ({
        start: new Date((item.start as Record<string, string>).dateTime + 'Z'),
        end: new Date((item.end as Record<string, string>).dateTime + 'Z'),
      }))

    return generateWorkdaySlots(date_from, date_to, duration_mins, busyIntervals)
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
    const day = cursor.getDay() // 0=Sun, 6=Sat
    if (day >= 1 && day <= 5) {
      // Monday–Friday
      const hour = cursor.getHours()
      if (hour >= 9 && hour < 17) {
        const slotEnd = new Date(cursor.getTime() + durationMins * 60 * 1000)
        const isBusy = busy.some(
          (b) => cursor < b.end && slotEnd > b.start,
        )
        if (!isBusy) {
          slots.push(new Date(cursor))
        }
      }
    }
    cursor.setMinutes(cursor.getMinutes() + durationMins)
  }

  return slots
}
