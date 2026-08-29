'use client'

import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { executeRecaptcha, prewarmRecaptcha } from '@/lib/recaptcha-client'
import { storedRefCode } from './RefCapture'
import { visitorId, track, flush } from '@/lib/site-events'
import { trackMeta } from '@/lib/analytics'

// ---------------------------------------------------------------------------
// The chat widget: a launcher pill in the bottom-right corner and the panel it
// opens. Talks to /api/chat, which is where the gatekeeping and the lead
// capture live. This file holds no knowledge about the business at all — the
// greeting below is the only copy it owns.
//
// Styling is a single <style> block of ms-chat-* classes rather than Tailwind
// utilities. The palette is not in tailwind.config.ts, so every colour would
// have to be an arbitrary value, and arbitrary values assembled in JS are
// exactly what Tailwind's purge misses. Plain CSS cannot be purged.
//
// Deliberately not a chat-bubble UI. The site's own type is Playfair over a
// lilac-tinted paper, and two rows of opposing bubbles would look like it was
// bolted on from somewhere else. The visitor gets a solid navy chip, the studio
// answers as plain text behind a hairline rule, and the asymmetry does the work
// the bubbles would have done.
// ---------------------------------------------------------------------------

const GREETING =
  "Hi — I can help with anything about Mountain Studios: what we build, how it works, what's included. What are you after?"

// The pages the bot is allowed to link to — the same list it is given in
// lib/chatbot/knowledge.ts under "Pages on this site". A whitelist rather than a
// URL regex on purpose: the text is model output, so a link it invents must never
// become clickable, and nothing may point off this site.
const LINKABLE_PATHS = [
  '/services/web-design',
  '/services/paid-ads',
  '/services/business-automation',
  '/services/aeo',
  '/services',
  '/start-your-project',
  '/careers/sales-rep',
  '/refer/terms',
  '/contact',
  '/privacy',
  '/terms',
  '/about',
  '/work',
]

// Longest first, so /services/web-design is matched before /services.
const PATH_PATTERN = new RegExp(
  `(${LINKABLE_PATHS.slice().sort((a, b) => b.length - a.length).join('|')})(?![\\w/-])`,
  'g',
)

// Splits a reply into text and links without ever handing markup to the DOM.
function withLinks(text: string) {
  const out: (string | JSX.Element)[] = []
  let last = 0
  let m: RegExpExecArray | null
  PATH_PATTERN.lastIndex = 0
  while ((m = PATH_PATTERN.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index))
    out.push(
      <a key={`${m.index}-${m[0]}`} className="ms-chat-link" href={m[0]}>
        {m[0]}
      </a>,
    )
    last = m.index + m[0].length
  }
  if (last < text.length) out.push(text.slice(last))
  return out
}

// Three openers that map onto sections the bot definitely knows, so a visitor's
// first tap is always a question it can answer well.
const OPENERS = ["What does a site cost?", 'How long does it take?', "What's included?"]

// Status messages shown during preview build, one every 3.5 seconds.
const PREVIEW_STAGES = [
  'Setting up your pages…',
  'Writing your copy…',
  'Choosing images…',
  'Putting it together…',
  'Almost there…',
]

const STORAGE_KEY = 'ms-chat-v1'
const MAX_INPUT = 1000

// Where the "book a call" button sends people. A single named constant so the
// link is easy to swap later without hunting through the render tree.
const CALENDLY_URL = 'https://calendly.com/hugodrum6/introduction-call'

// The widget is mounted in the root layout, which also wraps things that are
// not the marketing site. It must not appear on the admin screens, and it must
// never appear inside a generated client preview — a Mountain Studios bubble
// floating over someone else's mock site is the wrong thing entirely.
const HIDDEN_ON = ['/admin', '/p/', '/preview', '/temp']

// Anything on the site that wants to open the chat dispatches this. The
// homepage used to draw its own pill on one arm of an A/B test and this
// component stood down for it; that test is gone and the launcher below is now
// the only one on every page.
const OPEN_EVENT = 'ms-chat:open'

// The launcher is an icon alone. The invitation lives in a bubble above it,
// which is dismissible — once someone has said no to it, it stays gone for the
// visit rather than following them from page to page.
const BUBBLE_TEXT = 'Chat with us — we reply instantly'
const BUBBLE_DISMISSED_KEY = 'ms-chat-bubble-dismissed'
const BUBBLE_DELAY_MS = 1600

const PREVIEW_READY = "That's it — have a scroll through it. What do you think? Anything you'd change?"

interface Message {
  role: 'user' | 'assistant'
  content: string
  // Set on an assistant message when the bot offered the free audit. Renders a
  // button under it that opens the audit popup. Never sent back to the server —
  // parseMessages there ignores anything beyond role and content.
  offerAudit?: boolean
  // The audit is actually running. Confirmed by the server, never by the
  // model's own say-so.
  auditStarted?: boolean
  // Set on an assistant message when the bot offered a call with Hugo.
  // Renders a button under it that opens Calendly in a new tab. Never sent
  // back to the server — parseMessages there ignores anything beyond role and
  // content.
  offerBooking?: boolean
  // Set on an assistant message when the bot offered to build a preview.
  // Renders a button under it that opens the preview in an overlay.
  offerPreview?: boolean
}

// `retryable` decides whether the button is worth offering. It points at the
// same endpoint, so a rate-limited visitor must not be sent there — they would
// just fail again.
type AuditOutcome = { ok: true } | { ok: false; retryable: boolean; message: string }

interface Stored {
  messages: Message[]
  leadId: string | null
  previewToken?: string | null
}

export default function ChatWidget() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [bubble, setBubble] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [leadId, setLeadId] = useState<string | null>(null)
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const [previewToken, setPreviewToken] = useState<string | null>(null)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [buildingPreview, setBuildingPreview] = useState(false)
  const [previewStage, setPreviewStage] = useState(0)

  const launcherRef = useRef<HTMLButtonElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const previewFillRef = useRef<HTMLDivElement>(null)

  // Survive a hard reload. Client-side navigation already keeps this component
  // mounted, since it lives in the root layout.
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY)
      if (!raw) return
      const saved = JSON.parse(raw) as Stored
      if (Array.isArray(saved.messages)) setMessages(saved.messages)
      if (typeof saved.leadId === 'string') setLeadId(saved.leadId)
      if (typeof saved.previewToken === 'string') setPreviewToken(saved.previewToken)
    } catch {
      // A corrupt entry is not worth a broken widget.
    }
    try {
      const token = sessionStorage.getItem('ms-chat-preview-v1')
      if (typeof token === 'string') setPreviewToken(token)
    } catch {
      // Private mode or quota.
    }
  }, [])

  useEffect(() => {
    if (messages.length === 0) return
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ messages, leadId } satisfies Stored))
    } catch {
      // Private mode, quota, whatever. The chat still works in memory.
    }
  }, [messages, leadId])

  // Pin to the newest message.
  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, sending, open])

  // Opening the chat is the single chokepoint for every route in — the pill,
  // the bubble, and the OPEN_EVENT other components fire — so reCAPTCHA is
  // warmed here rather than in each of them.
  useEffect(() => {
    if (open) {
      inputRef.current?.focus()
      prewarmRecaptcha()
    }
  }, [open])

  // Anything on the site that wants to open the chat goes through this event.
  useEffect(() => {
    const onOpen = () => setOpen(true)
    window.addEventListener(OPEN_EVENT, onOpen)
    return () => window.removeEventListener(OPEN_EVENT, onOpen)
  }, [])

  // The bubble arrives a beat after the page settles, so it reads as an offer
  // rather than part of the page furniture. Dismissed or answered, it is done
  // for the visit.
  useEffect(() => {
    let dismissed = false
    try {
      dismissed = sessionStorage.getItem(BUBBLE_DISMISSED_KEY) === '1'
    } catch {
      // Private mode. Show it.
    }
    if (dismissed) return
    const t = setTimeout(() => setBubble(true), BUBBLE_DELAY_MS)
    return () => clearTimeout(t)
  }, [])

  const dismissBubble = useCallback(() => {
    setBubble(false)
    try {
      sessionStorage.setItem(BUBBLE_DISMISSED_KEY, '1')
    } catch {
      // Nothing to do — it just reappears on the next page.
    }
  }, [])

  const close = useCallback(() => {
    setOpen(false)
    launcherRef.current?.focus()
  }, [])

  // Hands over to AuditPopup. The chat panel closes first — the popup is a
  // modal and would otherwise land on top of an open conversation.
  const openAudit = useCallback(() => {
    setOpen(false)
    window.dispatchEvent(new Event('ms-audit:open'))
  }, [])

  // Opens Calendly in a new tab. No visitor data is ever appended to the URL.
  const openBooking = useCallback(() => {
    // Track the click with sendBeacon before opening, since the tab switch races the fetch
    track('calendly_click', { props: { from: 'chat' } })
    flush()
    window.open(CALENDLY_URL, '_blank', 'noopener,noreferrer')
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, close])

  useEffect(() => {
    if (previewOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [previewOpen])

  // Advance preview build status message every 3.5 seconds, stopping at the last one.
  // Clear the interval when the build finishes or the component unmounts.
  useEffect(() => {
    if (!buildingPreview) return

    setPreviewStage(0)
    const interval = setInterval(() => {
      setPreviewStage((prev) => (prev < PREVIEW_STAGES.length - 1 ? prev + 1 : prev))
    }, 3500)

    return () => clearInterval(interval)
  }, [buildingPreview])

  // Fires the audit through /api/audit/submit — the endpoint the popup form
  // posts to. It writes the rows, emails Ant and renders the PDF in the one
  // function that ships the headless browser, so there is no second code path
  // to keep working.
  const submitAudit = useCallback(
    async (websiteUrl: string, email: string): Promise<AuditOutcome> => {
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
          body: JSON.stringify({ websiteUrl, email, recaptchaToken, refCode: storedRefCode(), visitorId: visitorId() }),
        })

        if (res.ok) {
          trackMeta('Lead', { content_name: 'Free website audit (chat)' })
          return { ok: true }
        }

        // Say what actually went wrong. "I couldn't get that started" sent
        // someone to a button that hits the very same limit they had just
        // exceeded, so the next thing they saw was the same failure again.
        if (res.status === 429) {
          return {
            ok: false,
            retryable: false,
            message:
              "You've run a few audits already in the last hour, so that one didn't go through. Give it an hour and it'll work again.",
          }
        }

        const data = await res.json().catch(() => null)
        return {
          ok: false,
          retryable: true,
          message:
            typeof data?.error === 'string'
              ? data.error
              : "I couldn't get that started just now.",
        }
      } catch {
        return { ok: false, retryable: true, message: "I couldn't get that started just now." }
      }
    },
    [executeRecaptcha],
  )

  const submitPreview = useCallback(
    async (transcript: Message[]) => {
      try {
        const res = await fetch('/api/preview/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: transcript, leadId }),
        })

        if (!res.ok) {
          return { ok: false }
        }

        const data = await res.json().catch(() => null)
        if (data?.token && typeof data.token === 'string') {
          setPreviewToken(data.token)
          try {
            sessionStorage.setItem('ms-chat-preview-v1', data.token)
          } catch {
            // Private mode or quota.
          }
          setPreviewOpen(true)
          return { ok: true }
        }

        return { ok: false }
      } catch {
        return { ok: false }
      }
    },
    [leadId],
  )

  const send = useCallback(
    async (text: string) => {
      const content = text.trim().slice(0, MAX_INPUT)
      if (!content || sending) return

      const next = [...messages, { role: 'user' as const, content }]
      setMessages(next)
      setInput('')
      setSending(true)

      try {
        let recaptchaToken: string | undefined
        // Get reCAPTCHA token only on the first message
        if (next.length === 1 && executeRecaptcha) {
          try {
            recaptchaToken = await Promise.race([
              executeRecaptcha('chat_first_message'),
              new Promise<undefined>((resolve) => setTimeout(() => resolve(undefined), 5000)),
            ])
          } catch {
            // reCAPTCHA failure is not critical
          }
        }

        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: next, leadId, previewToken, recaptchaToken, refCode: storedRefCode(), visitorId: visitorId() }),
        })
        const data = await res.json().catch(() => null)

        // Handle 403 responses with returned error message
        if (res.status === 403 && typeof data?.error === 'string') {
          setMessages([...next, { role: 'assistant', content: data.error }])
          if (typeof data?.leadId === 'string') {
            setLeadId(data.leadId)
            track('lead_identified', { props: { leadId: data.leadId, via: 'chat' } })
          }
        } else {
          // The route answers with a usable `reply` on every path it controls,
          // including 429. This branch is for the ones it does not: a network
          // drop, a cold start that times out, a gateway page.
          const reply =
            typeof data?.reply === 'string' && data.reply.trim()
              ? data.reply.trim()
              : "Sorry — that didn't go through. Try me again, or email hello@mountainstudios.co.za."

          // The bot gathered a website and an email and wants the audit run.
          // The chat route deliberately does not start it — it posts here, to
          // the same endpoint the popup form uses, because that is the one path
          // proven to render and email a PDF on production.
          const request = data?.auditRequest
          let outcome: AuditOutcome | null = null
          if (request?.websiteUrl && request?.email) {
            outcome = await submitAudit(request.websiteUrl, request.email)
          }

          const started = outcome?.ok === true
          const failure = outcome && !outcome.ok ? outcome : null

          setMessages([
            ...next,
            {
              role: 'assistant',
              content: failure ? `${reply}\n\n${failure.message}` : reply,
              // A started audit wins: the button would invite them to ask for
              // the same thing twice. And a failure that the button cannot fix
              // must not show one — it posts to the same endpoint.
              offerAudit: started
                ? false
                : failure
                  ? failure.retryable
                  : data?.offerAudit === true,
              auditStarted: started,
              offerBooking: data?.offerBooking === true,
              offerPreview: data?.offerPreview === true,
            },
          ])
          if (typeof data?.leadId === 'string') {
            setLeadId(data.leadId)
            track('lead_identified', { props: { leadId: data.leadId, via: 'chat_audit' } })
          }
        }
      } catch {
        setMessages([
          ...next,
          {
            role: 'assistant',
            content:
              "Sorry — that didn't go through. Try me again, or email hello@mountainstudios.co.za.",
          },
        ])
      } finally {
        setSending(false)
        inputRef.current?.focus()
      }
    },
    [messages, leadId, previewToken, sending, executeRecaptcha, submitAudit],
  )

  // After every hook, so the rules of hooks hold on the routes that hide it.
  if (pathname && HIDDEN_ON.some((prefix) => pathname.startsWith(prefix))) return null

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {bubble && !open && (
        <div className="ms-chat-bubble">
          <button
            type="button"
            className="ms-chat-bubble-text"
            onClick={() => {
              dismissBubble()
              setOpen(true)
            }}
          >
            {BUBBLE_TEXT}
          </button>
          <button
            type="button"
            className="ms-chat-bubble-close"
            onClick={dismissBubble}
            aria-label="Dismiss"
          >
            &#215;
          </button>
        </div>
      )}

      <button
        ref={launcherRef}
        type="button"
        className="ms-chat-launcher"
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label={open ? 'Close chat' : 'Chat with us'}
        onClick={() => {
          dismissBubble()
          setOpen((v) => !v)
        }}
      >
        <span className="ms-chat-dot" aria-hidden="true" />
        {open ? (
          <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true">
            <path d="M4 3h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9.4L4 21.6V5a2 2 0 0 1 0-2zm0 2v12.4L8.6 15H20V5H4z" />
            <circle cx="8.5" cy="10" r="1.1" />
            <circle cx="12" cy="10" r="1.1" />
            <circle cx="15.5" cy="10" r="1.1" />
          </svg>
        )}
      </button>

      {open && (
        <div
          className="ms-chat-panel"
          role="dialog"
          aria-modal="false"
          aria-label="Chat with Mountain Studios"
        >
          <header className="ms-chat-head">
            <div>
              <p className="ms-chat-eyebrow">Mountain Studios</p>
              <p className="ms-chat-title">Ask us anything</p>
            </div>
            <button type="button" className="ms-chat-close" onClick={close} aria-label="Close chat">
              &#215;
            </button>
          </header>

          <div className="ms-chat-log" ref={scrollRef} aria-live="polite">
            <p className="ms-chat-said">{withLinks(GREETING)}</p>

            {messages.map((m, i) =>
              m.role === 'user' ? (
                <p key={i} className="ms-chat-asked">
                  {m.content}
                </p>
              ) : (
                <div key={i}>
                  <p className="ms-chat-said">{withLinks(m.content)}</p>
                  {m.offerAudit && (
                    <button type="button" className="ms-chat-audit" onClick={openAudit}>
                      Run my free audit →
                    </button>
                  )}
                  {m.auditStarted && (
                    <p className="ms-chat-audit-running">Audit running — the report is on its way.</p>
                  )}
                  {m.offerBooking && (
                    <button type="button" className="ms-chat-audit" onClick={openBooking}>
                      Pick a time →
                    </button>
                  )}
                  {m.offerPreview && (
                    buildingPreview ? (
                      <div className="ms-chat-progress">
                        <div className="ms-chat-progress-label">
                          {PREVIEW_STAGES[previewStage]}
                        </div>
                        <div className="ms-chat-progress-track">
                          <div ref={previewFillRef} className="ms-chat-progress-fill" />
                        </div>
                      </div>
                    ) : (
                      <button
                        type="button"
                        className="ms-chat-audit"
                        onClick={async () => {
                          setBuildingPreview(true)
                          setPreviewStage(0)
                          const result = await submitPreview(messages)

                          if (result.ok) {
                            if (previewFillRef.current) {
                              previewFillRef.current.classList.add('is-done')
                            }
                            // The preview succeeded and the overlay is now open. Append a message
                            // so the model learns the preview was actually opened — this is the only
                            // signal it gets that the overlay exists, and it must appear instantly
                            // rather than after a round-trip.
                            setMessages([
                              ...messages,
                              { role: 'assistant', content: PREVIEW_READY },
                            ])
                          }

                          setBuildingPreview(false)

                          if (!result.ok) {
                            setMessages([
                              ...messages,
                              {
                                role: 'assistant',
                                content:
                                  "Your preview couldn't be built right now. Try visiting the Get Started page instead.",
                              },
                            ])
                          }
                        }}
                      >
                        Build my preview →
                      </button>
                    )
                  )}
                </div>
              ),
            )}

            {sending && (
              <p className="ms-chat-typing" aria-label="Typing">
                <span /><span /><span />
              </p>
            )}

            {messages.length === 0 && !sending && (
              <div className="ms-chat-openers">
                {OPENERS.map((q) => (
                  <button key={q} type="button" className="ms-chat-opener" onClick={() => send(q)}>
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            className="ms-chat-form"
            onSubmit={(e) => {
              e.preventDefault()
              send(input)
            }}
          >
            <textarea
              ref={inputRef}
              className="ms-chat-input"
              rows={1}
              value={input}
              maxLength={MAX_INPUT}
              placeholder="Type your question"
              aria-label="Your message"
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  send(input)
                }
              }}
            />
            <button type="submit" className="ms-chat-send" disabled={!input.trim() || sending}>
              Send
            </button>
          </form>

          <p className="ms-chat-foot">Replies within one business day · hello@mountainstudios.co.za</p>
        </div>
      )}

      {previewOpen && previewToken && (
        <div className="ms-chat-preview-overlay">
          <div className="ms-chat-preview-bar">
            <span>Your preview</span>
            <button
              type="button"
              onClick={() => setPreviewOpen(false)}
              aria-label="Close preview"
            >
              Close ✕
            </button>
          </div>
          <iframe
            className="ms-chat-preview-frame"
            src={'/p/' + previewToken}
            title="Website preview"
          />
        </div>
      )}
    </>
  )
}

// Palette and faces are the site's own: near-black navy, lilac-tinted paper,
// wine accent, Playfair over Source Sans. The variables are set on <body> in
// app/layout.tsx, with a stack behind them in case this ever renders outside it.
const CSS = `
/* Bottom-RIGHT, the corner the eye already goes to for help, and now the only
   thing parked there — the homepage's competing "SEE YOUR NEW SITE" pill and
   the reCAPTCHA badge are both gone. The launcher carries no words: the
   invitation is the bubble above it, which can be dismissed on its own. */
.ms-chat-launcher {
  position: fixed; right: 24px; bottom: 24px; z-index: 9998;
  display: inline-flex; align-items: center; justify-content: center;
  width: 60px; height: 60px; padding: 0; border: 0; border-radius: 50%;
  background: #7d3d4f; color: #f4f2fa; cursor: pointer;
  box-shadow: 0 10px 30px rgba(26, 26, 46, .32);
  transition: transform .22s cubic-bezier(.2,.8,.2,1), box-shadow .22s ease, background .18s ease;
}
.ms-chat-launcher:hover { background: #6b3343; transform: translateY(-2px); box-shadow: 0 14px 36px rgba(26, 26, 46, .38); }
.ms-chat-launcher:focus-visible { outline: 2px solid #1a1a2e; outline-offset: 3px; }

/* Presence, not decoration: it says someone is at the other end. Sits on the
   rim of the button rather than beside a label. */
.ms-chat-dot {
  position: absolute; top: 5px; right: 5px;
  width: 10px; height: 10px; border-radius: 50%;
  background: #e9cad0; border: 2px solid #7d3d4f;
  animation: ms-chat-pulse 2.8s ease-out infinite;
}
@keyframes ms-chat-pulse {
  0%   { box-shadow: 0 0 0 0 rgba(233, 202, 208, .55); }
  70%  { box-shadow: 0 0 0 9px rgba(233, 202, 208, 0); }
  100% { box-shadow: 0 0 0 0 rgba(233, 202, 208, 0); }
}

/* The bubble sits above the launcher and is two controls in one shell: the
   text opens the chat, the cross retires the bubble for the visit. */
.ms-chat-bubble {
  position: fixed; right: 24px; bottom: 96px; z-index: 9998;
  display: flex; align-items: flex-start; gap: 4px;
  max-width: min(300px, calc(100vw - 48px));
  padding: 12px 10px 12px 16px;
  background: #fff; border: 1px solid #e3e0ea; border-radius: 14px;
  box-shadow: 0 14px 34px rgba(26, 26, 46, .18);
  font-family: var(--font-source-sans), "Source Sans 3", sans-serif;
  animation: ms-chat-bubble-in .28s cubic-bezier(.2,.8,.2,1);
}
/* The tail, pointing down at the launcher. Two stacked triangles so the
   hairline border carries through it. */
.ms-chat-bubble::after,
.ms-chat-bubble::before {
  content: ''; position: absolute; right: 22px; width: 0; height: 0;
  border-left: 8px solid transparent; border-right: 8px solid transparent;
}
.ms-chat-bubble::before { bottom: -9px; border-top: 9px solid #e3e0ea; }
.ms-chat-bubble::after  { bottom: -8px; border-top: 9px solid #fff; }

.ms-chat-bubble-text {
  padding: 0; border: 0; background: none; cursor: pointer; text-align: left;
  color: #2e333a; font-family: inherit; font-size: 14.5px; font-weight: 600; line-height: 1.4;
}
.ms-chat-bubble-text:hover { color: #7d3d4f; }
.ms-chat-bubble-text:focus-visible { outline: 2px solid #7d3d4f; outline-offset: 2px; }

.ms-chat-bubble-close {
  flex: none; width: 22px; height: 22px; margin-top: -2px;
  border: 0; border-radius: 50%; background: transparent; color: #8d8799;
  font-size: 17px; line-height: 1; cursor: pointer; transition: color .18s ease;
}
.ms-chat-bubble-close:hover { color: #2e333a; }
.ms-chat-bubble-close:focus-visible { outline: 2px solid #7d3d4f; outline-offset: 1px; }

@keyframes ms-chat-bubble-in {
  from { opacity: 0; transform: translateY(8px) scale(.96); }
  to   { opacity: 1; transform: none; }
}

.ms-chat-panel {
  position: fixed; right: 24px; bottom: 96px; z-index: 9999;
  display: flex; flex-direction: column;
  width: 372px; max-width: calc(100vw - 48px); height: 540px; max-height: calc(100vh - 132px);
  background: #f4f2fa; border: 1px solid #d8d3e2; border-radius: 16px; overflow: hidden;
  font-family: var(--font-source-sans), "Source Sans 3", sans-serif;
  box-shadow: 0 24px 64px rgba(26, 26, 46, .22);
  transform-origin: bottom right; animation: ms-chat-in .26s cubic-bezier(.2,.8,.2,1);
}
@keyframes ms-chat-in {
  from { opacity: 0; transform: translateY(10px) scale(.97); }
  to   { opacity: 1; transform: none; }
}

.ms-chat-head {
  display: flex; align-items: flex-start; justify-content: space-between; gap: 12px;
  padding: 16px 16px 14px 20px; background: #1a1a2e; color: #f4f2fa;
}
.ms-chat-eyebrow {
  margin: 0 0 3px; font-size: 10px; font-weight: 700;
  letter-spacing: .14em; text-transform: uppercase; color: #ad9fbf;
}
.ms-chat-title {
  margin: 0; font-family: var(--font-playfair), Georgia, serif;
  font-size: 19px; font-style: italic; font-weight: 400; line-height: 1.1;
}
.ms-chat-close {
  flex: none; width: 30px; height: 30px; margin: -3px -4px 0 0;
  border: 0; border-radius: 50%; background: transparent; color: #ad9fbf;
  font-size: 22px; line-height: 1; cursor: pointer; transition: color .18s ease;
}
.ms-chat-close:hover { color: #f4f2fa; }
.ms-chat-close:focus-visible { outline: 2px solid #e9cad0; outline-offset: 1px; }

.ms-chat-log { flex: 1; overflow-y: auto; padding: 20px; }

/* The studio's turn: plain text on paper, held by a hairline wine rule. */
.ms-chat-said {
  margin: 0 0 18px; padding-left: 14px; border-left: 2px solid #7d3d4f;
  color: #2e333a; font-size: 15px; line-height: 1.55; white-space: pre-wrap;
}

/* A whitelisted page path in the bot's reply becomes a clickable link. */
.ms-chat-link {
  color: #7d3d4f; text-decoration: underline; text-decoration-thickness: 1px;
  text-underline-offset: 2px; cursor: pointer;
  transition: color .18s ease;
}
.ms-chat-link:hover { color: #6b3343; }
.ms-chat-link:focus-visible { outline: 2px solid #7d3d4f; outline-offset: 1px; }

/* The visitor's turn: a solid chip, pulled right. */
.ms-chat-asked {
  max-width: 84%; margin: 0 0 18px auto; padding: 10px 14px;
  border-radius: 14px 14px 3px 14px; background: #1a1a2e; color: #f4f2fa;
  font-size: 15px; line-height: 1.5; white-space: pre-wrap;
}

/* Offered by the bot, sits under the message that offered it. Solid wine so it
   reads as the one thing to do, rather than another opener chip. */
.ms-chat-audit {
  display: inline-block; margin: -6px 0 18px 14px; padding: 10px 16px;
  border: 0; border-radius: 999px; background: #7d3d4f; color: #f4f2fa; cursor: pointer;
  font-family: inherit; font-size: 13.5px; font-weight: 600;
  transition: background .18s ease;
}
/* Only ever rendered when the server confirmed the audit actually started. */
.ms-chat-audit-running {
  margin: -6px 0 18px 14px; padding: 8px 14px;
  border-left: 2px solid #7d3d4f; background: rgba(125, 61, 79, .07);
  border-radius: 0 8px 8px 0;
  color: #7d3d4f; font-size: 13px; font-weight: 600;
}

.ms-chat-audit:hover { background: #6b3343; }
.ms-chat-audit:focus-visible { outline: 2px solid #1a1a2e; outline-offset: 2px; }

.ms-chat-typing { display: flex; gap: 5px; margin: 0 0 18px; padding-left: 16px; }
.ms-chat-typing span {
  width: 6px; height: 6px; border-radius: 50%; background: #7d3d4f;
  animation: ms-chat-blink 1.3s ease-in-out infinite;
}
.ms-chat-typing span:nth-child(2) { animation-delay: .18s; }
.ms-chat-typing span:nth-child(3) { animation-delay: .36s; }
@keyframes ms-chat-blink { 0%, 60%, 100% { opacity: .25; } 30% { opacity: 1; } }

.ms-chat-openers { display: flex; flex-wrap: wrap; gap: 8px; padding-left: 14px; }
.ms-chat-opener {
  padding: 8px 14px; border: 1px solid #d0b5c6; border-radius: 999px;
  background: transparent; color: #7d3d4f; cursor: pointer;
  font-family: inherit; font-size: 13.5px; transition: background .18s ease, color .18s ease;
}
.ms-chat-opener:hover { background: #7d3d4f; color: #f4f2fa; }
.ms-chat-opener:focus-visible { outline: 2px solid #7d3d4f; outline-offset: 2px; }

.ms-chat-form {
  display: flex; align-items: flex-end; gap: 8px;
  padding: 12px; border-top: 1px solid #e3e0ea; background: #eceaf2;
}
.ms-chat-input {
  flex: 1; max-height: 96px; padding: 10px 12px; border: 1px solid #d8d3e2; border-radius: 10px;
  background: #fff; color: #2e333a; font-family: inherit; font-size: 15px; line-height: 1.4;
  resize: none;
}
.ms-chat-input::placeholder { color: #8d8799; }
.ms-chat-input:focus { outline: 2px solid #7d3d4f; outline-offset: -1px; border-color: #7d3d4f; }

.ms-chat-send {
  flex: none; padding: 11px 18px; border: 0; border-radius: 10px;
  background: #7d3d4f; color: #f4f2fa; cursor: pointer;
  font-family: inherit; font-size: 14px; font-weight: 600;
  transition: background .18s ease;
}
.ms-chat-send:hover:not(:disabled) { background: #6b3343; }
.ms-chat-send:disabled { background: #c3bcd0; cursor: not-allowed; }
.ms-chat-send:focus-visible { outline: 2px solid #1a1a2e; outline-offset: 2px; }

.ms-chat-foot {
  margin: 0; padding: 9px 12px 11px; background: #eceaf2; border-top: 1px solid #e3e0ea;
  color: #5d6478; font-size: 11px; letter-spacing: .02em; text-align: center;
}

@media (max-width: 480px) {
  .ms-chat-panel {
    left: 0; right: 0; bottom: 0; width: 100vw; max-width: 100vw;
    height: 100dvh; max-height: 100dvh; border: 0; border-radius: 0;
  }
  .ms-chat-launcher { right: 16px; bottom: 16px; }
  .ms-chat-bubble { right: 16px; bottom: 88px; }
  .ms-chat-bubble::before, .ms-chat-bubble::after { right: 20px; }
}

@media (prefers-reduced-motion: reduce) {
  .ms-chat-panel, .ms-chat-launcher, .ms-chat-dot, .ms-chat-bubble, .ms-chat-typing span {
    animation: none; transition: none;
  }
  .ms-chat-launcher:hover { transform: none; }
}

.ms-chat-preview-overlay{position:fixed;inset:0;z-index:9990;display:flex;flex-direction:column;background:rgba(10,22,40,.88)}
.ms-chat-preview-bar{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:10px 16px;background:#0A1628;color:#fff;font-size:14px;letter-spacing:.02em;flex:0 0 auto}
.ms-chat-preview-bar button{background:transparent;border:1px solid rgba(255,255,255,.4);color:#fff;border-radius:999px;padding:6px 14px;font-size:13px;cursor:pointer}
.ms-chat-preview-bar button:hover{background:rgba(255,255,255,.12)}
.ms-chat-preview-frame{flex:1 1 auto;width:100%;border:0;background:#fff}

.ms-chat-progress{margin-top:12px}
.ms-chat-progress-label{font-size:13px;opacity:.7;margin-bottom:7px}
.ms-chat-progress-track{height:4px;border-radius:999px;background:rgba(10,22,40,.12);overflow:hidden}
.ms-chat-progress-fill{height:100%;width:4%;border-radius:999px;background:#7d3d4f;animation:ms-chat-fill 20s cubic-bezier(.15,.75,.25,1) forwards}
@keyframes ms-chat-fill{from{width:4%}to{width:92%}}
.ms-chat-progress-fill.is-done{animation:none;width:100%;transition:width .3s ease}
@media (prefers-reduced-motion:reduce){.ms-chat-progress-fill{animation:none;width:60%}}
`
