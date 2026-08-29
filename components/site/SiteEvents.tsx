'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import {
  visitorId,
  sessionId,
  track,
  flush,
  captureAttribution,
  markPageStart,
  getPageDurationSeconds,
  getMaxScrollDepth,
  trackScroll,
} from '@/lib/site-events'

// ---------------------------------------------------------------------------
// Site funnel tracking component.
//
// Mounted in the root layout so it works on every page. Responsibilities:
//
// 1. Mint visitor and session IDs on first mount
// 2. Capture utm_* / fbclid / gclid / referrer on first ever visit
// 3. Fire page_view on mount and pathname changes
// 4. Track scroll depth and time on page
// 5. Fire page_exit on pagehide with duration and max scroll
//
// Must never throw, never surface errors, and never block rendering.
// ---------------------------------------------------------------------------

export default function SiteEvents() {
  const pathname = usePathname()

  // Initialize visitor/session and fire first page_view
  useEffect(() => {
    try {
      // Ensure IDs are minted
      visitorId()
      sessionId()

      // Capture attribution once (on first visit ever)
      const attribution = captureAttribution()

      // If this is a fresh visitor with attribution, send the visitor record
      if (attribution) {
        track('_visitor_attribution', {
          props: attribution,
        })
      }

      // Reset page tracking for this view
      markPageStart()

      // Fire page_view (path is automatically added to all events)
      track('page_view')
    } catch {
      // Never surface.
    }
  }, [pathname])

  // Set up scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      trackScroll()
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        flush()
      }
    }

    // On page unload, fire page_exit and flush
    const handlePageHide = () => {
      try {
        const duration = getPageDurationSeconds()
        const maxScroll = getMaxScrollDepth()

        track('page_exit', {
          value: duration,
          props: {
            max_scroll: maxScroll,
          },
        })

        flush()
      } catch {
        // Never surface.
      }
    }

    // Add listeners
    window.addEventListener('scroll', handleScroll, { passive: true })
    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('pagehide', handlePageHide)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('pagehide', handlePageHide)
    }
  }, [])

  return null
}
