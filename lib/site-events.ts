'use client'

// ---------------------------------------------------------------------------
// Client-side funnel tracking helper.
//
// Every call is wrapped in try/catch and returns void. A failed track call
// must never surface as an error and can never block a form submit or a page
// render. Pattern is exactly lib/analytics.ts:trackMeta — the pixel is blocked
// by ad blockers for a large share of visitors, and the same principle applies
// to a counter.
//
// No server-only code imported here. This file is imported in the root layout,
// which is a client component, and nothing in it must be server-only.
// ---------------------------------------------------------------------------

const VISITOR_KEY = 'ms_vid'
const SESSION_KEY = 'ms_sid'
const VISIT_SENT_KEY = 'ms_attribution_sent'

/**
 * Generate a random UUID v4-like string using browser crypto.
 */
function randomUUID(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }

  // Fallback: generate 16 random bytes and format as UUID v4
  try {
    const bytes = new Uint8Array(16)
    crypto.getRandomValues(bytes)

    // Set version to 4 (bits 12-15 of 7th byte)
    bytes[6] = (bytes[6] & 0x0f) | 0x40

    // Set variant to RFC 4122 (bits 6-7 of 9th byte)
    bytes[8] = (bytes[8] & 0x3f) | 0x80

    // Format as UUID string
    return (
      Array.from(bytes.slice(0, 4)).map((b) => b.toString(16).padStart(2, '0')).join('') +
      '-' +
      Array.from(bytes.slice(4, 6)).map((b) => b.toString(16).padStart(2, '0')).join('') +
      '-' +
      Array.from(bytes.slice(6, 8)).map((b) => b.toString(16).padStart(2, '0')).join('') +
      '-' +
      Array.from(bytes.slice(8, 10)).map((b) => b.toString(16).padStart(2, '0')).join('') +
      '-' +
      Array.from(bytes.slice(10, 16)).map((b) => b.toString(16).padStart(2, '0')).join('')
    )
  } catch {
    // Last resort: generate a random string
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0
      const v = c === 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  }
}

interface StoredId {
  id: string
  at: number
}

interface QueuedEvent {
  event: string
  step?: number
  value?: number
  label?: string
  props?: Record<string, unknown>
}

interface EventPayload {
  visitorId: string
  sessionId: string
  attribution?: Record<string, unknown> | null
  events: Array<{
    event: string
    step?: number | null
    value_num?: number | null
    label?: string | null
    props?: Record<string, unknown>
  }>
}

let _visitorId: string | null = null
let _sessionId: string | null = null
let _attributionSent = false
let _pendingAttribution: Record<string, unknown> | null = null
let _eventQueue: QueuedEvent[] = []
let _flushTimeout: NodeJS.Timeout | null = null
let _maxScrollDepth = 0
let _pageStartTime = 0
let _currentPath: string = typeof window !== 'undefined' ? window.location.pathname : '/'
let _exitEmitted = false

/**
 * Get or mint the visitor ID (localStorage, UUIDv4).
 * Never throws. Private mode throws on read as well as write.
 */
export function visitorId(): string {
  if (_visitorId) return _visitorId

  try {
    const stored = localStorage.getItem(VISITOR_KEY)
    if (stored) {
      const parsed = JSON.parse(stored) as StoredId
      if (parsed?.id) {
        _visitorId = parsed.id
        return _visitorId
      }
    }

    // Mint new ID
    const newId = randomUUID()
    localStorage.setItem(VISITOR_KEY, JSON.stringify({ id: newId, at: Date.now() }))
    _visitorId = newId
    return newId
  } catch {
    // Private mode or storage unavailable. Generate ephemeral ID that
    // will survive the session but not be persisted.
    if (!_visitorId) {
      _visitorId = randomUUID()
    }
    return _visitorId
  }
}

/**
 * Get or mint the session ID (sessionStorage, UUIDv4).
 * One per tab-visit. Never throws.
 */
export function sessionId(): string {
  if (_sessionId) return _sessionId

  try {
    const stored = sessionStorage.getItem(SESSION_KEY)
    if (stored) {
      const parsed = JSON.parse(stored) as StoredId
      if (parsed?.id) {
        _sessionId = parsed.id
        return _sessionId
      }
    }

    // Mint new ID
    const newId = randomUUID()
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({ id: newId, at: Date.now() }))
    _sessionId = newId
    return newId
  } catch {
    // Private mode or storage unavailable. Generate ephemeral ID.
    if (!_sessionId) {
      _sessionId = randomUUID()
    }
    return _sessionId
  }
}

/**
 * Queue an event. Wrapped in try/catch, never throws.
 */
export function track(
  event: string,
  fields?: {
    step?: number
    value?: number
    label?: string
    props?: Record<string, unknown>
  },
): void {
  try {
    if (!event) return

    const queued: QueuedEvent = { event }
    if (fields?.step !== undefined) queued.step = fields.step
    if (fields?.value !== undefined) queued.value = fields.value
    if (fields?.label !== undefined) queued.label = fields.label
    if (fields?.props) queued.props = fields.props

    // Keep max 100 events; drop oldest beyond that
    _eventQueue.push(queued)
    if (_eventQueue.length > 100) {
      _eventQueue = _eventQueue.slice(-100)
    }

    // Debounce flush: 2 seconds
    if (_flushTimeout) clearTimeout(_flushTimeout)
    _flushTimeout = setTimeout(() => flush(), 2000)
  } catch {
    // Never surface.
  }
}

/**
 * Track scroll depth as a percentage (0-100). Call from scroll event listeners.
 */
export function trackScroll(): void {
  try {
    if (typeof window === 'undefined') return

    const scrollTop = window.scrollY || 0
    const docHeight = document.documentElement.scrollHeight - window.innerHeight

    if (docHeight <= 0) return

    const scrollPercent = Math.min(100, Math.max(0, Math.round((scrollTop / docHeight) * 100)))
    _maxScrollDepth = Math.max(_maxScrollDepth, scrollPercent)
  } catch {
    // Never surface.
  }
}

/**
 * Flush queued events. Wrapped in try/catch, never throws.
 * Uses sendBeacon when available (not an optimization here — a calendly_click
 * immediately followed by window.open would race a plain fetch against a tab
 * switch and lose the event). Falls back to fetch with keepalive.
 *
 * Max 25 events per request to keep the payload bounded.
 */
export function flush(): void {
  try {
    if (_flushTimeout) {
      clearTimeout(_flushTimeout)
      _flushTimeout = null
    }

    if (_eventQueue.length === 0) return

    // Batch in chunks of max 25 events
    const batch = _eventQueue.splice(0, 25)

    // Map to server format
    const vid = visitorId()
    const sid = sessionId()

    const payload: EventPayload = {
      visitorId: vid,
      sessionId: sid,
      attribution: _pendingAttribution,
      events: batch.map((e) => ({
        event: e.event,
        step_num: e.step ?? null,
        value_num: e.value ?? null,
        label: e.label ?? null,
        props: {
          path: _currentPath,
          ...(e.props ?? {}),
        },
      })),
    }
    _pendingAttribution = null

    // Send via sendBeacon if available, else fetch with keepalive
    const endpoint = '/api/site-event'
    const body = JSON.stringify(payload)

    if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
      navigator.sendBeacon(endpoint, body)
    } else {
      void fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
        keepalive: true,
      }).catch(() => {
        // A counter must never surface as an error.
      })
    }

    // If more events queued, schedule another flush
    if (_eventQueue.length > 0) {
      if (_flushTimeout) clearTimeout(_flushTimeout)
      _flushTimeout = setTimeout(() => flush(), 2000)
    }
  } catch {
    // Never surface.
  }
}

/**
 * Capture attribution params from URL on first ever visit.
 * Called once by SiteEvents.tsx on mount.
 */
export function captureAttribution(): Record<string, unknown> | null {
  try {
    // Check if already sent in this session
    if (_attributionSent) return null

    const params = new URLSearchParams(window.location.search)
    const attribution: Record<string, unknown> = {}
    let hasAny = false

    // utm_* params
    const utm = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']
    for (const key of utm) {
      const val = params.get(key)
      if (val) {
        attribution[key] = val
        hasAny = true
      }
    }

    // Click IDs
    const clickIds = ['fbclid', 'gclid', 'ttclid', 'msclkid', 'li_fat_id']
    for (const key of clickIds) {
      const val = params.get(key)
      if (val) {
        attribution[key] = val
        hasAny = true
      }
    }

    // Referrer (host only, not full URL — never store query strings)
    try {
      if (document.referrer) {
        const url = new URL(document.referrer)
        attribution.referrer_host = url.host
        hasAny = true
      }
    } catch {
      // Invalid referrer URL, skip it
    }

    _attributionSent = true
    if (hasAny) _pendingAttribution = attribution
    return hasAny ? attribution : null
  } catch {
    _attributionSent = true
    return null
  }
}

/**
 * Mark page entry time and update current path. Call this when initializing page tracking.
 */
export function markPageStart(): void {
  _pageStartTime = Date.now()
  _maxScrollDepth = 0
  _exitEmitted = false
  if (typeof window !== 'undefined') {
    _currentPath = window.location.pathname
  }
}

/**
 * Get seconds spent on current page for page_exit event.
 */
export function getPageDurationSeconds(): number {
  if (_pageStartTime === 0) return 0
  return Math.round((Date.now() - _pageStartTime) / 1000)
}

/**
 * Get max scroll depth percentage.
 */
export function getMaxScrollDepth(): number {
  return _maxScrollDepth
}

/**
 * Fire page_exit exactly once for the page being left.
 *
 * Called from two places: the route-change cleanup in SiteEvents.tsx, and the
 * pagehide listener for the last page of a session. Before this existed only
 * pagehide fired, so a single event covered everything from the last
 * markPageStart() until the tab closed -- one page reported a 2h13m dwell and
 * 131 page views produced only 95 exits.
 *
 * `path` must be passed on route change: by the time the cleanup runs,
 * window.location has already moved to the next page.
 */
export function emitPageExit(path?: string): void {
  try {
    if (_exitEmitted) return
    _exitEmitted = true

    track('page_exit', {
      value: getPageDurationSeconds(),
      props: {
        max_scroll: getMaxScrollDepth(),
        path: path ?? _currentPath,
      },
    })
  } catch {
    // Never surface.
  }
}
