'use client'

import { usePathname } from 'next/navigation'
import { executeRecaptcha, prewarmRecaptcha } from '@/lib/recaptcha-client'
import { storedRefCode } from './RefCapture'
import { useCallback, useEffect, useRef, useState } from 'react'
import { trackMeta } from '@/lib/analytics'
import { isValidEmail, EMAIL_ERROR } from '@/lib/validation'

// ---------------------------------------------------------------------------
// The free-audit offer, moved off the homepage and into a popup.
//
// It fires on whichever comes first:
//   * 30 seconds on the site, or
//   * the pointer leaving through the top of the window (exit intent)
//
// Exit intent is desktop-only — a touchscreen has no pointer to leave — so the
// timer is what covers phones, and the two together mean nobody is asked in
// their first few seconds.
//
// Shown once per visit. Dismissed, it stays gone until they come back another
// day; submitted, it never appears again on that device. The timer lives in the
// root layout and so survives client-side navigation: thirty seconds means
// thirty seconds on the site, not thirty on each page.
//
// The form posts to the same POST /api/audit/submit as before, with the same
// honeypot and the same `audit_submit` reCAPTCHA action. Only the packaging
// changed.
// ---------------------------------------------------------------------------

const DWELL_MS = 30_000

// Re-arm delay used when the moment is wrong — currently only when the chat
// panel is open, because two overlays at once is nobody's idea of a good time.
const RETRY_MS = 15_000

// Session: dismissed for this visit. Device: they submitted, never ask again.
const SEEN_KEY = 'ms-audit-seen'
const DONE_KEY = 'ms-audit-done'

// The admin screens and generated client previews are where a Mountain Studios
// popup over someone else's mock site would be actively damaging.
const HIDDEN_ON = ['/admin', '/p/', '/preview', '/temp']

// Engaged, not off-limits. Someone mid-conversation or mid-wizard should not be
// interrupted by a timer — but if they are leaving anyway, the popup is the last
// chance to catch them, so exit intent still fires here.
const ENGAGED_ON = ['/start-your-project']

const CHECK_GROUPS = [
  {
    title: 'Security',
    items: [
      { name: 'Encryption', desc: 'The safe padlock, or a red warning.' },
      { name: 'Browser Protection', desc: 'Settings that stop browsers flagging you as untrusted.' },
    ],
  },
  {
    title: 'Page Speed',
    items: [
      { name: 'Mobile', desc: 'Whether it actually works on a phone.' },
      { name: 'Desktop', desc: 'How fast it loads. Slow sites lose visitors.' },
    ],
  },
  {
    title: 'Accessibility',
    items: [
      { name: 'Accessibility', desc: 'Usable with poor eyesight or colour blindness.' },
    ],
  },
]

function stored(storage: 'session' | 'local', key: string): boolean {
  try {
    return (storage === 'session' ? sessionStorage : localStorage).getItem(key) === '1'
  } catch {
    // Private mode or blocked storage. Better to show it than to crash.
    return false
  }
}

function remember(storage: 'session' | 'local', key: string): void {
  try {
    ;(storage === 'session' ? sessionStorage : localStorage).setItem(key, '1')
  } catch {
    // Nothing to do. Worst case they see it again next page load.
  }
}

export default function AuditPopup() {
  const pathname = usePathname()

  const [open, setOpen] = useState(false)
  const [url, setUrl] = useState('')
  const [email, setEmail] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [emailTouched, setEmailTouched] = useState(false)

  const urlRef = useRef<HTMLInputElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  // Read inside the handlers rather than through state: the trigger effect runs
  // once and must not be town down and rebuilt every time the route changes.
  const pathRef = useRef(pathname)
  pathRef.current = pathname

  const canShow = useCallback((): boolean => {
    const path = pathRef.current
    if (path && HIDDEN_ON.some((prefix) => path.startsWith(prefix))) return false
    if (stored('local', DONE_KEY) || stored('session', SEEN_KEY)) return false
    return true
  }, [])

  const isEngaged = useCallback((): boolean => {
    const path = pathRef.current
    if (path && ENGAGED_ON.some((prefix) => path.startsWith(prefix))) return true
    if (document.querySelector('.ms-chat-panel')) return true
    if (document.querySelector('.ms-chat-preview-overlay')) return true
    return false
  }, [])

  useEffect(() => {
    if (stored('local', DONE_KEY) || stored('session', SEEN_KEY)) return

    let dwellTimer: ReturnType<typeof setTimeout>
    let retryTimer: ReturnType<typeof setTimeout>
    let fired = false

    const fire = (fromExitIntent: boolean) => {
      if (fired) return
      if (!canShow()) return
      if (!fromExitIntent && isEngaged()) {
        // Wrong moment rather than wrong visitor — come back to it instead of
        // throwing the trigger away.
        clearTimeout(retryTimer)
        retryTimer = setTimeout(() => fire(false), RETRY_MS)
        return
      }
      fired = true
      remember('session', SEEN_KEY)
      setOpen(true)
    }

    dwellTimer = setTimeout(() => fire(false), DWELL_MS)

    // Exit intent: the pointer crosses the top edge of the window. A null
    // relatedTarget means it left the document rather than moving between two
    // elements inside it.
    const onMouseOut = (e: MouseEvent) => {
      if (e.clientY <= 0 && !e.relatedTarget) fire(true)
    }
    document.addEventListener('mouseout', onMouseOut)

    return () => {
      clearTimeout(dwellTimer)
      clearTimeout(retryTimer)
      document.removeEventListener('mouseout', onMouseOut)
    }
  }, [canShow, isEngaged])

  // Asked for deliberately — currently the chatbot's "Run my free audit"
  // button. This bypasses every guard on the automatic triggers: someone who
  // just clicked a button to see this must always get it, whether or not they
  // already dismissed it this visit. Only the hidden routes still apply.
  useEffect(() => {
    const onOpen = () => {
      const path = pathRef.current
      if (path && HIDDEN_ON.some((prefix) => path.startsWith(prefix))) return
      remember('session', SEEN_KEY)
      setDone(false)
      setError('')
      setOpen(true)
    }
    window.addEventListener('ms-audit:open', onOpen)
    return () => window.removeEventListener('ms-audit:open', onOpen)
  }, [])

  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    if (!open) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)

    // Straight to the field they have to fill in. On a phone this would summon
    // the keyboard over the offer they have not read yet, so only on a pointer.
    if (window.matchMedia('(min-width: 641px)').matches) urlRef.current?.focus()
    else closeRef.current?.focus()

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
    }
  }, [open, close])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setEmailError('')

    // Validate email
    if (!isValidEmail(email)) {
      setEmailError(EMAIL_ERROR)
      setEmailTouched(true)
      return
    }

    setLoading(true)

    // The honeypot is judged server-side only. Deciding it here meant a password
    // manager filling the hidden field showed the visitor a success screen and
    // never sent the request — no row, no email, no trace anywhere.
    try {
      let recaptchaToken: string | undefined
      if (executeRecaptcha) {
        try {
          recaptchaToken = await Promise.race([
            executeRecaptcha('audit_submit'),
            new Promise<undefined>((resolve) => setTimeout(() => resolve(undefined), 5000)),
          ])
        } catch {
          // reCAPTCHA failure is not critical.
        }
      }

      const res = await fetch('/api/audit/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          websiteUrl: url,
          email,
          recaptchaToken,
          website: honeypot,
          refCode: storedRefCode(),
        }),
      })

      const data = await res.json().catch(() => null)

      if (res.ok) {
        setDone(true)
        setUrl('')
        setEmail('')
        remember('local', DONE_KEY)
        trackMeta('Lead', { content_name: 'Free website audit' })
      } else {
        // Show what the server actually said. It knows whether the URL failed to
        // parse, the email was malformed, or they have simply tried too many
        // times — "something went wrong" tells someone with a typo nothing, and
        // they retype the same thing and fail again.
        setError(typeof data?.error === 'string' ? data.error : 'Something went wrong. Please try again.')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!open) return null

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <div className="ms-audit-backdrop" onClick={close}>
        <div
          className="ms-audit-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="ms-audit-title"
          onClick={(e) => e.stopPropagation()}
        >
          <button ref={closeRef} type="button" className="ms-audit-close" onClick={close} aria-label="Close">
            &#215;
          </button>

          <p className="ms-audit-eyebrow">Free audit</p>
          <h2 id="ms-audit-title" className="ms-audit-title">Get a free website audit</h2>
          <p className="ms-audit-sub">Paste your website. We&apos;ll send you a full audit in minutes.</p>

          <div className="ms-audit-groups">
            {CHECK_GROUPS.map((group) => (
              <div key={group.title} className="ms-audit-group">
                <h3 className="ms-audit-group-title">{group.title}</h3>
                {group.items.map((item) => (
                  <div key={item.name} className="ms-audit-item">
                    <span className="ms-audit-item-name">{item.name}</span>
                    <span className="ms-audit-item-desc">{item.desc}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {done ? (
            <p className="ms-audit-done">Got it. Your audit is on the way.</p>
          ) : (
            <form onFocusCapture={() => prewarmRecaptcha()} onSubmit={submit}>
              {error && <p className="ms-audit-error">{error}</p>}

              <div className="ms-audit-fields" style={{ flexDirection: emailError && emailTouched ? 'column' : undefined }}>
                <input
                  ref={urlRef}
                  type="text"
                  className="ms-audit-input"
                  placeholder="yourbusiness.co.za"
                  aria-label="Your website address"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
                {/* Without this the two fields read as one long input. */}
                <span className="ms-audit-divider" aria-hidden={emailError && emailTouched ? 'true' : 'false'} style={{ display: emailError && emailTouched ? 'none' : undefined }} />
                <div style={{ flex: emailError && emailTouched ? undefined : 1, minWidth: 0, display: 'flex', flexDirection: 'column', width: emailError && emailTouched ? '100%' : undefined }}>
                  <input
                    type="email"
                    className="ms-audit-input"
                    placeholder="your@email.com"
                    aria-label="Your email address"
                    value={email}
                    onChange={(e) => {
                      const value = e.target.value
                      setEmail(value)
                      if (emailError && isValidEmail(value)) setEmailError('')
                    }}
                    onBlur={() => {
                      setEmailTouched(true)
                      if (email.trim() && !isValidEmail(email)) {
                        setEmailError(EMAIL_ERROR)
                      } else {
                        setEmailError('')
                      }
                    }}
                    style={{
                      borderBottom: emailError && emailTouched ? '2px solid #dc2626' : undefined,
                      backgroundColor: emailError && emailTouched ? '#fff5f5' : undefined,
                    }}
                  />
                  {emailError && emailTouched && (
                    <p style={{ fontSize: '0.75rem', color: '#dc2626', margin: '0.35rem 0 0', lineHeight: 1.5 }}>
                      {emailError}
                    </p>
                  )}
                </div>
                <button type="submit" className="ms-audit-submit" disabled={loading || !!(emailTouched && emailError)}>
                  {loading ? 'Saving…' : 'AUDIT MY SITE →'}
                </button>
              </div>

              <input
                type="text"
                name="_hp_url"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                // display:none, not an off-screen position: password managers
                // treat an off-screen input as a normal visible field and
                // autofill it, which is how a real customer ended up flagged as
                // a bot.
                style={{ display: 'none' }}
                autoComplete="off"
                aria-hidden="true"
                tabIndex={-1}
                // Password managers fill unnamed off-screen text inputs. These
                // opt 1Password, LastPass and Dashlane out by name.
                data-lpignore="true"
                data-1p-ignore=""
                data-form-type="other"
              />
            </form>
          )}

          
        </div>
      </div>
    </>
  )
}

// Plain CSS in one injected block rather than Tailwind utilities: the palette
// is not in tailwind.config.ts, so every colour would be an arbitrary value,
// and arbitrary values are what the purge misses. Plain CSS cannot be purged.
const CSS = `
.ms-audit-backdrop {
  position: fixed; inset: 0; z-index: 10000;
  display: flex; align-items: center; justify-content: center; padding: 20px;
  background: rgba(26, 26, 46, .55); backdrop-filter: blur(3px);
  animation: ms-audit-fade .2s ease;
}
@keyframes ms-audit-fade { from { opacity: 0 } to { opacity: 1 } }

.ms-audit-modal {
  position: relative;
  width: 100%; max-width: 720px; max-height: calc(100vh - 40px); overflow-y: auto;
  padding: 44px 40px 32px;
  background: #f4f2fa; border-radius: 18px;
  box-shadow: 0 30px 80px rgba(26, 26, 46, .4);
  font-family: var(--font-source-sans), "Source Sans 3", sans-serif;
  text-align: center;
  animation: ms-audit-rise .28s cubic-bezier(.2,.8,.2,1);
}
@keyframes ms-audit-rise {
  from { opacity: 0; transform: translateY(16px) scale(.98) }
  to   { opacity: 1; transform: none }
}

.ms-audit-close {
  position: absolute; top: 12px; right: 14px;
  width: 34px; height: 34px; border: 0; border-radius: 50%;
  background: transparent; color: #8d8799; font-size: 26px; line-height: 1;
  cursor: pointer; transition: color .18s ease, background .18s ease;
}
.ms-audit-close:hover { color: #2e333a; background: rgba(26,26,46,.06) }
.ms-audit-close:focus-visible { outline: 2px solid #7d3d4f; outline-offset: 2px }

.ms-audit-eyebrow {
  margin: 0 0 10px; font-size: .7rem; font-weight: 700;
  letter-spacing: .22em; text-transform: uppercase; color: #7d6470;
}
.ms-audit-title {
  margin: 0 0 10px; font-family: var(--font-playfair), Georgia, serif;
  font-size: clamp(1.6rem, 3.4vw, 2.2rem); font-weight: 400; color: #2e333a; line-height: 1.15;
}
.ms-audit-sub { margin: 0; font-size: 1rem; color: #5d6478 }

.ms-audit-groups {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px;
  margin: 28px 0; text-align: left;
}
.ms-audit-group {
  background: #fff; border-radius: 14px; padding: 18px 16px;
  box-shadow: 0 12px 30px -18px rgba(26,26,46,.3);
}
.ms-audit-group-title {
  margin: 0 0 12px; font-size: .95rem; font-weight: 700; color: #2e333a;
}
.ms-audit-item { margin-bottom: 12px }
.ms-audit-item:last-child { margin-bottom: 0 }
.ms-audit-item-name {
  display: block; font-size: .84rem; font-weight: 600; color: #7d3d4f; margin-bottom: 2px;
}
.ms-audit-item-desc {
  display: block; font-size: .78rem; color: #5d6478; line-height: 1.45;
}

.ms-audit-error { margin: 0 0 12px; font-size: .9rem; color: #dc2626 }

.ms-audit-fields {
  display: flex; align-items: center; gap: 10px;
  background: #fff; border-radius: 999px; padding: 6px 6px 6px 20px;
  box-shadow: 0 8px 24px -12px rgba(0,0,0,.35);
}
.ms-audit-input {
  flex: 1; min-width: 0; border: 0; outline: none; background: transparent;
  font-family: inherit; font-size: 1rem; color: #2e333a; padding: 10px 0;
}
.ms-audit-divider { flex: none; width: 1px; height: 24px; background: #e3e0ea }
.ms-audit-input::placeholder { color: #8d8799 }
.ms-audit-input:focus { outline: none }
.ms-audit-fields:focus-within { box-shadow: 0 0 0 2px #7d3d4f, 0 8px 24px -12px rgba(0,0,0,.35) }

.ms-audit-submit {
  flex: none; border: 0; border-radius: 999px; padding: 14px 22px;
  background: #7d3d4f; color: #fff; cursor: pointer;
  font-family: inherit; font-size: .78rem; font-weight: 700;
  letter-spacing: .08em; text-transform: uppercase; white-space: nowrap;
  transition: background .18s ease;
}
.ms-audit-submit:hover:not(:disabled) { background: #6b3343 }
.ms-audit-submit:disabled { opacity: .7; cursor: not-allowed }
.ms-audit-submit:focus-visible { outline: 2px solid #1a1a2e; outline-offset: 2px }

.ms-audit-done { margin: 24px 0 0; font-size: 1rem; color: #2e333a }
.ms-audit-foot { margin: 16px 0 0; font-size: .78rem; color: #8d8799 }

@media (max-width: 640px) {
  .ms-audit-modal { padding: 40px 22px 26px; max-height: calc(100dvh - 40px) }
  /* Names only on a phone. With the descriptions in, the submit button lands
     two screens down and the whole point of the popup is buried. */
  .ms-audit-groups { grid-template-columns: 1fr; gap: 8px; margin: 20px 0 }
  .ms-audit-group {
    display: flex; flex-wrap: wrap; align-items: baseline; gap: 6px 10px; padding: 12px 14px;
  }
  .ms-audit-group-title { margin: 0; flex: none }
  .ms-audit-item { margin: 0 }
  .ms-audit-item-desc { display: none }
  .ms-audit-item-name { font-size: .8rem; margin: 0 }
  /* A 999px radius is a pill only while this is one row tall. Stacked, it
     curves the whole card into a lozenge and the button reads as if it is
     falling out of it. */
  .ms-audit-fields {
    flex-direction: column; align-items: stretch; gap: 0;
    padding: 6px; border-radius: 18px;
  }
  .ms-audit-input { padding: 13px 14px }
  .ms-audit-divider { width: auto; height: 1px; align-self: stretch }
  .ms-audit-submit { width: 100%; margin-top: 6px }
}

@media (prefers-reduced-motion: reduce) {
  .ms-audit-backdrop, .ms-audit-modal { animation: none }
}
`
