'use client'

// reCAPTCHA v3, loaded on demand instead of on every page load.
//
// Why this exists: GoogleReCaptchaProvider used to wrap the whole app in
// app/layout.tsx, so Google's script loaded for every visitor of every page.
// It cost 939KB across three requests (the main script plus the anchor and
// bframe iframes each pull their own copy) and 816ms of main-thread work —
// about a third of the homepage's total weight, and the single largest
// contributor to Total Blocking Time. Only six forms ever mint a token.
//
// The provider could not simply be rendered conditionally: mounting it
// mid-tree changes the component type at that position, so React unmounts and
// remounts every child and any half-filled form loses its state. Replacing the
// library with a plain script loader avoids the question entirely.
//
// This degrades exactly the way the old setup already did for anyone running
// an ad blocker: no token, which blockedAsBot() in lib/recaptcha.ts treats as
// "unscored", not as a bot. That allowlist is what keeps this safe — see the
// long note there before changing anything here.

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''
const SCRIPT_ID = 'recaptcha-v3'

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void
      execute: (siteKey: string, opts: { action: string }) => Promise<string>
    }
  }
}

let loader: Promise<boolean> | null = null

/**
 * Injects Google's script once and caches the attempt. Safe to call on every
 * keystroke or focus event. Call it as soon as a visitor touches a form so the
 * script is already there by the time they press submit — otherwise the load
 * lands inside the caller's 5-second race and the token is lost to the timeout.
 *
 * Never rejects. A blocked or unreachable script is an ordinary outcome here,
 * not an error, and callers must not have to try/catch a prewarm.
 */
export function prewarmRecaptcha(): Promise<boolean> {
  if (typeof window === 'undefined' || !SITE_KEY) return Promise.resolve(false)
  if (loader) return loader

  loader = new Promise<boolean>((resolve) => {
    if (document.getElementById(SCRIPT_ID)) {
      resolve(true)
      return
    }
    const script = document.createElement('script')
    script.id = SCRIPT_ID
    script.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`
    script.async = true
    script.defer = true
    script.onload = () => resolve(true)
    script.onerror = () => {
      // Clear the cache so a later submit can retry. A failure here is usually
      // permanent (an extension blocking the host) but can be a transient
      // network drop, and caching that forever would silence reCAPTCHA for the
      // rest of the session.
      loader = null
      resolve(false)
    }
    document.head.appendChild(script)
  })

  return loader
}

/**
 * Mints a fresh token. Returns undefined rather than throwing when reCAPTCHA is
 * unavailable, which is the shape every existing call site already handles.
 *
 * One token per call, by construction. A v3 token can be verified exactly once:
 * the wizard previously minted one and spent it on both /api/preview/generate
 * and /api/preview/email, Google returned timeout-or-duplicate for the second,
 * and the preview email sent nothing for two days. Every call here goes to
 * grecaptcha.execute() and gets its own token, so that failure cannot recur —
 * but call this once per endpoint, never reuse the resolved string.
 */
export async function executeRecaptcha(action: string): Promise<string | undefined> {
  const loaded = await prewarmRecaptcha()
  if (!loaded || !window.grecaptcha) return undefined

  try {
    await new Promise<void>((resolve) => window.grecaptcha!.ready(resolve))
    return await window.grecaptcha.execute(SITE_KEY, { action })
  } catch {
    return undefined
  }
}
