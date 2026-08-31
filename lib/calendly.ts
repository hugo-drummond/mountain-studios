// ---------------------------------------------------------------------------
// The booking link. One place.
//
// This used to live in four: hardcoded in ChatWidget, and as an identical
// `process.env.CALENDLY_URL || ...` fallback repeated in shared-preview.ts,
// audit/email.ts and audit-report/render.ts. The chatbot's copy pointed at a
// real event; the other three pointed at `/30min`, which does not exist. On
// 31 Aug 2026 CALENDLY_URL was unset in Vercel, so in production the preview
// page's offer block, the audit email's call to action and the audit PDF's
// only call to action all led to "This Calendly URL is not valid."
//
// Note how that hid: /30min returns HTTP 200. Calendly renders the error in
// the browser, so curl, a link checker and the audit's own header checks all
// see a healthy page. The only way to catch it is to open it.
//
// CALENDLY_URL still overrides on the server. It cannot reach the chat widget —
// that is a client component, and Next only inlines NEXT_PUBLIC_* into the
// browser bundle — so the widget uses the default below. If the booking link
// ever changes, change it HERE; setting the environment variable alone would
// leave the chatbot pointing at the old one.
// ---------------------------------------------------------------------------

/** Used directly by client components, and as the server-side fallback. */
export const CALENDLY_DEFAULT_URL = 'https://calendly.com/hugodrum6/introduction-call'

/** Server-side resolver. CALENDLY_URL wins if it is set. */
export function calendlyUrl(): string {
  return process.env.CALENDLY_URL || CALENDLY_DEFAULT_URL
}
