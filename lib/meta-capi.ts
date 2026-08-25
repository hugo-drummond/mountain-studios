import { createHash } from 'crypto'

// Meta Conversions API — events sent from the server rather than the browser.
//
// The preview claim is the strongest intent signal on the site, and it is the
// one action the pixel cannot see: it happens on /p/<token>, a stored client
// site that carries no tracking by design. Tagging somebody else's mock site
// to measure our own funnel would be wrong, so this reports it server-side.
//
// Silent when META_CAPI_TOKEN or META_PIXEL_ID is unset, and it swallows its
// own failures. It is called from a route whose real job is recording a claim
// and emailing a human; analytics must never be able to fail that.

const PIXEL_ID = process.env.META_PIXEL_ID || '1435033932015736'
const GRAPH_VERSION = 'v21.0'

// Meta requires user identifiers SHA-256 hashed, and normalised first, or the
// hash of "Hugo@Example.com " will never match the hash of "hugo@example.com".
function hash(value: string): string {
  return createHash('sha256').update(value.trim().toLowerCase()).digest('hex')
}

// Meta wants E.164 without the leading plus. A South African number typed as
// 0814972033 is 27814972033 — sending the local form matches nobody.
function normalisePhone(raw: string): string | null {
  const digits = (raw || '').replace(/\D/g, '')
  if (!digits) return null
  if (digits.startsWith('27')) return digits
  if (digits.startsWith('0')) return `27${digits.slice(1)}`
  return digits
}

export interface MetaEventInput {
  eventName: string
  eventSourceUrl?: string
  email?: string | null
  phone?: string | null
  fullName?: string | null
  clientIp?: string | null
  clientUserAgent?: string | null
  customData?: Record<string, unknown>
}

export async function sendMetaEvent(input: MetaEventInput): Promise<void> {
  const token = process.env.META_CAPI_TOKEN
  if (!token || !PIXEL_ID) return

  const userData: Record<string, unknown> = {}

  if (input.email) userData.em = [hash(input.email)]

  const phone = input.phone ? normalisePhone(input.phone) : null
  if (phone) userData.ph = [hash(phone)]

  if (input.fullName) {
    const parts = input.fullName.trim().split(/\s+/)
    if (parts[0]) userData.fn = [hash(parts[0])]
    if (parts.length > 1) userData.ln = [hash(parts[parts.length - 1])]
  }

  if (input.clientIp) userData.client_ip_address = input.clientIp
  if (input.clientUserAgent) userData.client_user_agent = input.clientUserAgent

  // No identifier means Meta cannot attribute it to anyone, and an event it
  // cannot match is noise in the dataset rather than a signal.
  if (Object.keys(userData).length === 0) return

  try {
    const res = await fetch(`https://graph.facebook.com/${GRAPH_VERSION}/${PIXEL_ID}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: [
          {
            event_name: input.eventName,
            event_time: Math.floor(Date.now() / 1000),
            action_source: 'website',
            ...(input.eventSourceUrl ? { event_source_url: input.eventSourceUrl } : {}),
            user_data: userData,
            ...(input.customData ? { custom_data: input.customData } : {}),
          },
        ],
        access_token: token,
      }),
    })

    // fetch does not throw on HTTP errors, so a rejected event would otherwise
    // vanish without trace — the exact failure shape this codebase keeps hitting.
    if (!res.ok) {
      const body = await res.text().catch(() => '')
      console.error(`[meta-capi] ${input.eventName} rejected (${res.status}):`, body.slice(0, 300))
    }
  } catch (err) {
    console.error('[meta-capi] send failed:', err instanceof Error ? err.message : err)
  }
}
