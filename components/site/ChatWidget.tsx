'use client'

import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'

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

// Three openers that map onto sections the bot definitely knows, so a visitor's
// first tap is always a question it can answer well.
const OPENERS = ["What does a site cost?", 'How long does it take?', "What's included?"]

const STORAGE_KEY = 'ms-chat-v1'
const MAX_INPUT = 1000

// The widget is mounted in the root layout, which also wraps things that are
// not the marketing site. It must not appear on the admin screens, and it must
// never appear inside a generated client preview — a Mountain Studios bubble
// floating over someone else's mock site is the wrong thing entirely.
const HIDDEN_ON = ['/admin', '/p/', '/preview', '/temp']

// The homepage runs an A/B test (app/page.tsx). On the 'chat' arm it renders its
// own pill bottom-right, which used to be a WhatsApp link and now opens this
// widget instead. When that pill is on screen it owns the job, and this
// component must not draw a second launcher next to it.
//
// The handshake is localStorage rather than a React context because the pill
// lives in the page and this lives in the layout, so there is no shared tree to
// hang a provider on. It cannot be an event alone either: child effects run
// before parent effects, so the page would dispatch before this component was
// listening. localStorage is already written by then, so it is read on mount and
// on every navigation, with the event as the catch-up for a variant chosen after
// this component had already settled.
const OPEN_EVENT = 'ms-chat:open'
const VARIANT_EVENT = 'ms-chat:variant'

function pageOwnsLauncher(pathname: string | null): boolean {
  if (pathname !== '/') return false
  try {
    return localStorage.getItem('ms_variant') === 'chat'
  } catch {
    return false
  }
}

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
}

interface Stored {
  messages: Message[]
  leadId: string | null
}

export default function ChatWidget() {
  const pathname = usePathname()
  const { executeRecaptcha } = useGoogleReCaptcha()
  const [open, setOpen] = useState(false)
  const [externalLauncher, setExternalLauncher] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [leadId, setLeadId] = useState<string | null>(null)
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)

  const launcherRef = useRef<HTMLButtonElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Survive a hard reload. Client-side navigation already keeps this component
  // mounted, since it lives in the root layout.
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY)
      if (!raw) return
      const saved = JSON.parse(raw) as Stored
      if (Array.isArray(saved.messages)) setMessages(saved.messages)
      if (typeof saved.leadId === 'string') setLeadId(saved.leadId)
    } catch {
      // A corrupt entry is not worth a broken widget.
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

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  // Whoever owns the launcher on this route, and anything else that wants to
  // open the chat, goes through the same event.
  useEffect(() => {
    const recheck = () => setExternalLauncher(pageOwnsLauncher(pathname))
    recheck()

    const onOpen = () => setOpen(true)
    window.addEventListener(OPEN_EVENT, onOpen)
    window.addEventListener(VARIANT_EVENT, recheck)
    return () => {
      window.removeEventListener(OPEN_EVENT, onOpen)
      window.removeEventListener(VARIANT_EVENT, recheck)
    }
  }, [pathname])

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

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, close])

  // Fires the audit through /api/audit/submit — the endpoint the popup form
  // posts to. It writes the rows, emails Ant and renders the PDF in the one
  // function that ships the headless browser, so there is no second code path
  // to keep working.
  const submitAudit = useCallback(async (websiteUrl: string, email: string): Promise<boolean> => {
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
        body: JSON.stringify({ websiteUrl, email, recaptchaToken }),
      })
      return res.ok
    } catch {
      return false
    }
  }, [executeRecaptcha])

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
          body: JSON.stringify({ messages: next, leadId, recaptchaToken }),
        })
        const data = await res.json().catch(() => null)

        // Handle 403 responses with returned error message
        if (res.status === 403 && typeof data?.error === 'string') {
          setMessages([...next, { role: 'assistant', content: data.error }])
          if (typeof data?.leadId === 'string') setLeadId(data.leadId)
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
          let started = false
          if (request?.websiteUrl && request?.email) {
            started = await submitAudit(request.websiteUrl, request.email)
          }

          setMessages([
            ...next,
            {
              role: 'assistant',
              content: started
                ? reply
                : request
                  ? `${reply}\n\nActually — I couldn't get that started. Use the button below and it'll go through properly.`
                  : reply,
              // A started audit wins: the button would invite them to ask for
              // the same thing twice.
              offerAudit: (data?.offerAudit === true || (!!request && !started)) && !started,
              auditStarted: started,
            },
          ])
          if (typeof data?.leadId === 'string') setLeadId(data.leadId)
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
    [messages, leadId, sending, executeRecaptcha, submitAudit],
  )

  // After every hook, so the rules of hooks hold on the routes that hide it.
  if (pathname && HIDDEN_ON.some((prefix) => pathname.startsWith(prefix))) return null

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {!externalLauncher && (
        <button
          ref={launcherRef}
          type="button"
          className="ms-chat-launcher"
          aria-expanded={open}
          aria-haspopup="dialog"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="ms-chat-dot" aria-hidden="true" />
          <span className="ms-chat-launcher-label">{open ? 'Close' : 'Ask us'}</span>
        </button>
      )}

      {open && (
        // The panel grows out of whichever button opened it: bottom-left from
        // this component's own launcher, bottom-right from the homepage's
        // "Chat with us" pill on the chat variant.
        <div
          className={`ms-chat-panel${externalLauncher ? ' ms-chat-panel--right' : ''}`}
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
            <p className="ms-chat-said">{GREETING}</p>

            {messages.map((m, i) =>
              m.role === 'user' ? (
                <p key={i} className="ms-chat-asked">
                  {m.content}
                </p>
              ) : (
                <div key={i}>
                  <p className="ms-chat-said">{m.content}</p>
                  {m.offerAudit && (
                    <button type="button" className="ms-chat-audit" onClick={openAudit}>
                      Run my free audit →
                    </button>
                  )}
                  {m.auditStarted && (
                    <p className="ms-chat-audit-running">Audit running — the report is on its way.</p>
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
    </>
  )
}

// Palette and faces are the site's own: near-black navy, lilac-tinted paper,
// wine accent, Playfair over Source Sans. The variables are set on <body> in
// app/layout.tsx, with a stack behind them in case this ever renders outside it.
const CSS = `
/* Bottom-LEFT on purpose. The homepage already parks a sticky "SEE YOUR NEW
   SITE" pill in the bottom-right, and the reCAPTCHA badge sits under it. That
   pill is the primary conversion action on the page and the chat should not be
   competing with it for the same 200 pixels. */
.ms-chat-launcher {
  position: fixed; left: 20px; bottom: 20px; z-index: 9998;
  display: inline-flex; align-items: center; gap: 9px;
  padding: 13px 22px 13px 18px; border: 0; border-radius: 999px;
  background: #1a1a2e; color: #f4f2fa; cursor: pointer;
  font-family: var(--font-source-sans), "Source Sans 3", sans-serif;
  font-size: 15px; font-weight: 600; letter-spacing: .01em;
  box-shadow: 0 6px 28px rgba(26, 26, 46, .28);
  transition: transform .22s cubic-bezier(.2,.8,.2,1), box-shadow .22s ease;
}
.ms-chat-launcher:hover { transform: translateY(-2px); box-shadow: 0 10px 34px rgba(26, 26, 46, .34); }
.ms-chat-launcher:focus-visible { outline: 2px solid #7d3d4f; outline-offset: 3px; }

.ms-chat-dot {
  width: 8px; height: 8px; border-radius: 50%; background: #e9cad0;
  box-shadow: 0 0 0 0 rgba(233, 202, 208, .7); animation: ms-chat-pulse 2.8s ease-out infinite;
}
@keyframes ms-chat-pulse {
  0%   { box-shadow: 0 0 0 0 rgba(233, 202, 208, .55); }
  70%  { box-shadow: 0 0 0 9px rgba(233, 202, 208, 0); }
  100% { box-shadow: 0 0 0 0 rgba(233, 202, 208, 0); }
}

.ms-chat-panel {
  position: fixed; left: 20px; bottom: 84px; z-index: 9999;
  display: flex; flex-direction: column;
  width: 372px; max-width: calc(100vw - 40px); height: 540px; max-height: calc(100vh - 120px);
  background: #f4f2fa; border: 1px solid #d8d3e2; border-radius: 16px; overflow: hidden;
  font-family: var(--font-source-sans), "Source Sans 3", sans-serif;
  box-shadow: 0 24px 64px rgba(26, 26, 46, .22);
  transform-origin: bottom left; animation: ms-chat-in .26s cubic-bezier(.2,.8,.2,1);
}

/* Opened by the homepage's "Chat with us" pill, which is bottom-right, so the
   panel unfolds from there instead of the opposite corner. Bottom stays at
   84px, which clears the pill. */
.ms-chat-panel--right {
  /* 24px, not the 20px used elsewhere, to line the panel's right edge up with
     the homepage pill's — that sits at 1.5rem. */
  left: auto; right: 24px; transform-origin: bottom right;
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
  /* Full screen on a phone whichever corner it was opened from, so the
     --right modifier's offsets have to be cleared explicitly. */
  .ms-chat-panel, .ms-chat-panel--right {
    left: 0; right: auto; bottom: 0; width: 100vw; max-width: 100vw;
    height: 100dvh; max-height: 100dvh; border: 0; border-radius: 0;
  }
  .ms-chat-launcher { left: 14px; bottom: 14px; }
}

@media (prefers-reduced-motion: reduce) {
  .ms-chat-panel, .ms-chat-launcher, .ms-chat-dot, .ms-chat-typing span {
    animation: none; transition: none;
  }
  .ms-chat-launcher:hover { transform: none; }
}
`
