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
  if (!value) throw new Error(`[zoom] Missing env var: ${key}`)
  return value
}

// ---------------------------------------------------------------------------
// ZoomMeetingAdapter
// ---------------------------------------------------------------------------

export class ZoomMeetingAdapter implements MeetingAdapter {
  // -------------------------------------------------------------------------
  // Auth — Server-to-Server OAuth
  // -------------------------------------------------------------------------

  async getAccessToken(): Promise<string> {
    const now = Date.now()

    if (tokenCache && tokenCache.expiresAt > now) {
      return tokenCache.token
    }

    const clientId = getEnv('ZOOM_CLIENT_ID')
    const clientSecret = getEnv('ZOOM_CLIENT_SECRET')
    const accountId = getEnv('ZOOM_ACCOUNT_ID')

    const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

    const res = await fetch(
      `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${accountId}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${credentials}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    )

    if (!res.ok) {
      const text = await res.text()
      throw new Error(`[zoom] Token fetch failed ${res.status}: ${text}`)
    }

    const json = await res.json()
    const token: string = json.access_token
    const expiresIn: number = json.expires_in ?? 3600
    // Cache with 55-minute safety margin
    tokenCache = { token, expiresAt: now + Math.min(expiresIn - 300, 55 * 60) * 1000 }
    return token
  }

  private async zoomFetch(
    path: string,
    opts: RequestInit = {},
  ): Promise<Response> {
    const token = await this.getAccessToken()
    return fetch(`https://api.zoom.us/v2${path}`, {
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
    const endTime = new Date(opts.slot.getTime() + opts.duration_mins * 60 * 1000)

    const res = await this.zoomFetch('/users/me/meetings', {
      method: 'POST',
      body: JSON.stringify({
        topic: opts.title,
        type: 2, // Scheduled
        start_time: opts.slot.toISOString().replace('.000Z', 'Z'),
        duration: opts.duration_mins,
        agenda: opts.description,
        settings: {
          join_before_host: false,
          waiting_room: true,
          registrants_email_notification: true,
        },
      }),
    })

    if (!res.ok) {
      const text = await res.text()
      throw new Error(`[zoom] createMeeting failed ${res.status}: ${text}`)
    }

    const meeting = await res.json()

    return {
      meeting_link: meeting.join_url as string,
      calendar_event_id: String(meeting.id),
      platform: 'zoom' as MeetingPlatform,
      meeting_time: opts.slot,
      meeting_end_time: endTime,
    }
  }

  // -------------------------------------------------------------------------
  // getRecording
  // -------------------------------------------------------------------------

  async getRecording(calendar_event_id: string): Promise<string | null> {
    try {
      const res = await this.zoomFetch(
        `/meetings/${calendar_event_id}/recordings`,
      )

      if (res.status === 404) return null
      if (!res.ok) return null

      const json = await res.json()
      const recordings: Array<Record<string, unknown>> =
        json.recording_files ?? []

      const mp4 = recordings.find(
        (r) => r.file_type === 'MP4' && r.status === 'completed',
      )

      return mp4
        ? (mp4.play_url as string) ?? (mp4.download_url as string) ?? null
        : null
    } catch (err) {
      console.error('[zoom] getRecording error:', err)
      return null
    }
  }

  // -------------------------------------------------------------------------
  // sendCalendarInvite
  // -------------------------------------------------------------------------

  async sendCalendarInvite(details: CalendarInviteDetails): Promise<boolean> {
    // Zoom does not have a direct send-email Graph equivalent.
    // We generate an ICS payload and would normally deliver via nodemailer.
    // For completeness we log and return true; the calling layer should use
    // the email lib for actual delivery when Zoom is the platform.
    console.info(
      `[zoom] sendCalendarInvite: ICS delivery should be handled by email lib for ${details.to_email}`,
    )
    return true
  }

  // -------------------------------------------------------------------------
  // getAvailableSlots — simple grid, no freebusy check for Zoom
  // -------------------------------------------------------------------------

  async getAvailableSlots(
    date_from: Date,
    date_to: Date,
    duration_mins: number,
  ): Promise<Date[]> {
    return generateWorkdaySlots(date_from, date_to, duration_mins)
  }
}

// ---------------------------------------------------------------------------
// Slot generation helper — Mon-Fri 9am-5pm, 30-min intervals
// ---------------------------------------------------------------------------

function generateWorkdaySlots(
  from: Date,
  to: Date,
  durationMins: number,
): Date[] {
  const slots: Date[] = []
  const interval = 30 // Zoom uses 30-min grid
  const cursor = new Date(from)
  cursor.setSeconds(0, 0)

  // Align to next 30-min boundary
  const rem = cursor.getMinutes() % interval
  if (rem !== 0) {
    cursor.setMinutes(cursor.getMinutes() + (interval - rem))
  }

  while (cursor < to) {
    const day = cursor.getDay()
    if (day >= 1 && day <= 5) {
      const hour = cursor.getHours()
      const slotEndHour =
        cursor.getHours() + Math.floor((cursor.getMinutes() + durationMins) / 60)
      if (hour >= 9 && slotEndHour <= 17) {
        slots.push(new Date(cursor))
      }
    }
    cursor.setMinutes(cursor.getMinutes() + interval)
  }

  return slots
}
