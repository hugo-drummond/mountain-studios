// Meta Pixel event helper.
//
// Every call site is a form's success branch, so this must never throw. The
// pixel is blocked by ad blockers and privacy extensions for a large share of
// real visitors, and `fbq` simply will not exist for them — an unguarded call
// would turn a successful enquiry into an error the person sees.
//
// Events fire only where the server has confirmed the write. This site once
// shipped seven forms that showed a success screen and saved nothing; an event
// fired on click rather than on confirmation would report conversions that
// never happened, and the bidding would be done against fiction.

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

export function trackMeta(event: string, params?: Record<string, unknown>): void {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') return
  try {
    window.fbq('track', event, params)
  } catch {
    // A broken pixel is not the visitor's problem and must not surface.
  }
}
