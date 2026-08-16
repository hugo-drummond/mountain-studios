'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

// ---------------------------------------------------------------------------
// Catches `?ref=CODE` from a partner's link, remembers it, and tells the server
// the link was opened.
//
// Mounted in the root layout so it works on every page: a partner is as likely
// to share /work or a service page as the homepage.
//
// localStorage rather than a cookie. Nothing server-rendered needs to read it —
// the code travels with the form submission itself — and a first-party cookie
// on every request to every asset would be a cost paid for nothing.
// ---------------------------------------------------------------------------

const STORAGE_KEY = 'ms_ref'
const VISIT_SENT_KEY = 'ms_ref_visit_sent'

// Ninety days. Long enough for someone to think about a website over a month or
// two, short enough that a code cannot follow a browser around for a year and
// pay out on a lead the partner had nothing to do with.
const TTL_MS = 90 * 24 * 60 * 60 * 1000

const REF_CODE_PATTERN = /^[ABCDEFGHJKMNPQRSTUVWXYZ23456789]{8}$/

interface Stored {
  code: string
  at: number
}

/**
 * The referral code this visitor arrived on, or null. Read by every form that
 * can create a lead. Expired entries are cleared rather than returned.
 */
export function storedRefCode(): string | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Stored
    if (!parsed?.code || !REF_CODE_PATTERN.test(parsed.code)) return null
    if (Date.now() - parsed.at > TTL_MS) {
      localStorage.removeItem(STORAGE_KEY)
      return null
    }
    return parsed.code
  } catch {
    return null
  }
}

export default function RefCapture() {
  const pathname = usePathname()

  useEffect(() => {
    // window.location, not useSearchParams: that hook forces every page under
    // this layout into client-side rendering unless it is wrapped in Suspense,
    // and this component renders nothing that could justify the cost. The
    // effect only ever runs in the browser, where the query string is right
    // there.
    const raw = new URLSearchParams(window.location.search).get('ref')
    if (!raw) return

    const code = raw.trim().toUpperCase()
    if (!REF_CODE_PATTERN.test(code)) return

    // First touch wins here too, matching what the server does when it stamps
    // the lead. Overwriting on arrival would quietly hand the payout to
    // whichever partner the visitor happened to click last.
    let existing: string | null = null
    try {
      existing = storedRefCode()
      if (!existing) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ code, at: Date.now() } satisfies Stored))
      }
    } catch {
      // Private mode. The visit below is still worth recording.
    }

    // Once per session per code: a partner clicking through their own link all
    // afternoon should be one visit, and the database has the same rule keyed
    // per day for anyone who closes the tab between clicks.
    try {
      if (sessionStorage.getItem(VISIT_SENT_KEY) === code) return
      sessionStorage.setItem(VISIT_SENT_KEY, code)
    } catch {
      // No sessionStorage — fall through, the daily index still deduplicates.
    }

    void fetch('/api/referral/visit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ref: code, path: pathname, referrer: document.referrer || null }),
      keepalive: true,
    }).catch(() => {
      // A counter must never surface as an error to a visitor.
    })
  }, [pathname])

  return null
}
