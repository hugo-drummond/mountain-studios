import { NextRequest, NextResponse } from 'next/server'
import { crmAdmin } from '@/lib/crm'
import { SYSTEM_PROMPT, FALLBACK_REPLY } from '@/lib/chatbot/knowledge'
import { bumpAskedCount, findApprovedAnswer, logQuestion } from '@/lib/chatbot/questions'
import { normaliseWebsiteUrl, startAudit } from '@/lib/audit/start'
import { rateLimit } from '@/lib/rate-limit'
import { verifyRecaptcha, blockedAsBot } from '@/lib/recaptcha'

// ---------------------------------------------------------------------------
// POST /api/chat
//
// The site's chatbot. Two jobs, in this order:
//   1. answer the visitor's question, using only lib/chatbot/knowledge.ts
//   2. get their email and phone number into the CRM
//
// Deliberately boring in three places:
//
//   * No streaming. A single JSON response is one thing that can fail instead
//     of a stream that can half-fail and leave the widget stuck mid-sentence.
//   * No JSON mode on the model. The reply is plain text, and the email and
//     phone are pulled out of what the *visitor* typed with a regex. A model
//     that returns malformed JSON would cost us the lead; a regex over a phone
//     number cannot.
//   * Stateless. The client posts the whole conversation each turn. Nothing to
//     expire, nothing to store, no session table to go stale.
//
// The lead save is best-effort and never fails the response — same rule as
// /api/brief/submit. A visitor must never see an error caused by our database.
// ---------------------------------------------------------------------------

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const DEEPSEEK_URL = 'https://api.deepseek.com/v1/chat/completions'
const MODEL = 'deepseek-chat'

// A chat reply is two or three sentences. Anything longer means the model has
// started writing an essay, and cutting it off is the right outcome.
const MAX_TOKENS = 400
const REQUEST_TIMEOUT_MS = 20_000

// Guard rails on what the client may post back to us.
const MAX_MESSAGES = 24
const MAX_CHARS_PER_MESSAGE = 1_000

type Role = 'user' | 'assistant'
interface Message {
  role: Role
  content: string
}

interface Payload {
  messages?: unknown
  leadId?: unknown
  recaptchaToken?: unknown
}

const EMAIL_RE = /[^\s@<>()[\],;:]+@[^\s@<>()[\],;:]+\.[a-z]{2,}/gi

function findEmail(text: string): string | null {
  const match = text.match(EMAIL_RE)
  return match ? match[match.length - 1].toLowerCase().replace(/[.,;:]+$/, '') : null
}

// South African numbers only, and strictly. The conversation is full of other
// numbers — "14 days", "R1000", "50+ sites" — and a loose match would file a
// price as a phone number. A candidate only counts if it normalises to a real
// SA shape: 0XXXXXXXXX (10 digits) or 27XXXXXXXXX (11 digits).
const PHONE_CANDIDATE_RE = /(?:\+|\b00)?\d[\d\s().-]{7,}\d/g

function findPhone(text: string): string | null {
  const candidates = text.match(PHONE_CANDIDATE_RE)
  if (!candidates) return null

  for (const raw of candidates.reverse()) {
    let digits = raw.replace(/\D/g, '')
    if (digits.startsWith('00')) digits = digits.slice(2)

    if (digits.startsWith('27') && digits.length === 11) return `+${digits}`
    if (digits.startsWith('0') && digits.length === 10) return digits
  }
  return null
}

// The visitor's email and number go to the CRM, not to DeepSeek. Once we have
// them, they are stripped out of the transcript before it leaves the country.
// The placeholder is left in on purpose: the model still needs to know it has
// already been given the details so it stops asking for them.
function redact(text: string): string {
  return text
    .replace(EMAIL_RE, '[email provided]')
    .replace(PHONE_CANDIDATE_RE, (m) => (findPhone(m) ? '[phone provided]' : m))
}

function parseMessages(input: unknown): Message[] {
  if (!Array.isArray(input)) return []
  return input
    .filter(
      (m): m is Message =>
        !!m &&
        typeof m === 'object' &&
        (m as Message).role !== undefined &&
        ((m as Message).role === 'user' || (m as Message).role === 'assistant') &&
        typeof (m as Message).content === 'string' &&
        (m as Message).content.trim().length > 0,
    )
    .slice(-MAX_MESSAGES)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS_PER_MESSAGE) }))
}

async function callDeepSeek(messages: Message[]): Promise<string | null> {
  const apiKey = process.env.DEEPSEEK_API_KEY
  if (!apiKey) {
    console.error('[chat] Missing DEEPSEEK_API_KEY')
    return null
  }

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  try {
    const res = await fetch(DEEPSEEK_URL, {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        // Low but not zero. The bot is allowed to sound like a person; it is
        // not allowed to be creative about the facts, and the prompt handles
        // that far better than the temperature does.
        temperature: 0.3,
        max_tokens: MAX_TOKENS,
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
      }),
    })

    if (!res.ok) {
      console.error('[chat] DeepSeek returned', res.status, await res.text().catch(() => ''))
      return null
    }

    const data = await res.json()
    const content = data?.choices?.[0]?.message?.content
    return typeof content === 'string' && content.trim() ? content.trim() : null
  } catch (err) {
    console.error('[chat] DeepSeek call failed:', err instanceof Error ? err.message : err)
    return null
  } finally {
    clearTimeout(timer)
  }
}

const INTERROGATIVES =
  /^(what|how|do|does|did|can|could|is|are|was|will|would|why|when|where|who|which|any|tell me|i need|i want)\b/i

// What earns a row in chat_questions. The point of that table is a ranked list
// of what people want to know, and it stops being that the moment it fills up
// with "yes please", "ok thanks" and half a phone number.
//
// The opening message always counts — it is what brought them to the chat.
// After that a message has to look like an actual question, and anything
// carrying contact details is dropped outright: those belong in the lead's
// notes and nowhere else.
function worthLogging(text: string, firstMessage: boolean): boolean {
  if (findEmail(text) || findPhone(text)) return false

  const trimmed = text.trim()
  if (trimmed.length < 8) return false
  if (firstMessage) return true

  return trimmed.endsWith('?') || (INTERROGATIVES.test(trimmed) && trimmed.split(/\s+/).length >= 3)
}

// The model ends a message with [[AUDIT]] when it wants to put the free-audit
// button under it. Deliberately a marker rather than reading the reply's
// wording: matching on phrases would fire on "we offer a free audit" said in
// passing and miss every rewording of it.
//
// Generous on purpose — case, spacing, surrounding punctuation and a stray
// backtick all vary between generations, and a marker that leaks into the
// visible text is worse than one that fails to fire.
const AUDIT_MARKER = /[`*_]*\[\[\s*audit\s*\]\][`*_]*/gi

// The stronger of the two: the visitor has given a website and an email in the
// chat and wants the audit run now. Checked before [[AUDIT]] because the offer
// marker's pattern also matches inside this one.
const RUN_AUDIT_MARKER = /[`*_]*\[\[\s*run[_\s-]*audit\s*\]\][`*_]*/gi

function extractAuditMarkers(reply: string): {
  reply: string
  offerAudit: boolean
  runAudit: boolean
} {
  const runAudit = RUN_AUDIT_MARKER.test(reply)
  RUN_AUDIT_MARKER.lastIndex = 0

  let text = reply.replace(RUN_AUDIT_MARKER, '')

  const offerAudit = AUDIT_MARKER.test(text)
  AUDIT_MARKER.lastIndex = 0
  text = text.replace(AUDIT_MARKER, '')

  return {
    reply: text.replace(/\n{3,}/g, '\n\n').trim(),
    offerAudit,
    runAudit,
  }
}

// The model is not reliable about emitting [[RUN_AUDIT]]. Told to use it, it
// will still cheerfully write "the report is on its way" and emit nothing,
// which is the exact bug this whole change exists to fix — the visitor waits
// for an email that was never going to arrive.
//
// So the marker is treated as one signal among several rather than the
// mechanism. If the reply claims the audit is running and the visitor really
// has given a website and an email, the claim is made true instead of being
// left as a lie.
const CLAIMS_RUNNING =
  /\b(on (its|it's) way|running (the|your) audit|audit is running|started (the|your) audit|report (is|will be) (on its way|sent|emailed)|sending (it|the report)|getting it going|land(s|ing)? in your inbox)\b/i

// A website in the visitor's own words. Emails are removed first, or the domain
// half of "hugo@gmail.com" reads as a perfectly good website and every visitor
// who gave an address would get gmail.com audited.
//
// Requires a dot and a plausible TLD, so "Mon-Fri" and a bare word are both
// ignored. The last match wins: someone who corrects themselves means the
// second one.
const WEBSITE_RE =
  /\b(?:https?:\/\/)?(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,24}\b(?:\/[^\s]*)?/gi

function findWebsite(text: string): string | null {
  const withoutEmails = text.replace(EMAIL_RE, ' ')
  EMAIL_RE.lastIndex = 0

  const matches = withoutEmails.match(WEBSITE_RE)
  if (!matches) return null

  for (const raw of matches.reverse()) {
    const cleaned = raw.replace(/[.,;:!?)]+$/, '')
    if (normaliseWebsiteUrl(cleaned)) return cleaned
  }
  return null
}

function buildNotes(email: string | null, phone: string | null, messages: Message[]): string {
  const transcript = messages
    .map((m) => `${m.role === 'user' ? 'Them' : 'Bot'}: ${m.content}`)
    .join('\n')

  return [
    'Chatbot enquiry from the website.',
    email ? `Email: ${email}` : null,
    phone ? `Phone: ${phone}` : null,
    '',
    '--- chat transcript ---',
    transcript,
  ]
    .filter((line) => line !== null)
    .join('\n')
    .slice(0, 8_000)
}

// Mirrors saveLead() in /api/brief/submit: one person, one row. The widget
// hands back the leadId it was given, so a conversation that carries on after
// the email is captured keeps updating the same row rather than making a new
// one every message.
async function saveLead(
  leadId: string | null,
  email: string | null,
  phone: string | null,
  messages: Message[],
): Promise<string | null> {
  try {
    const notes = buildNotes(email, phone, messages)
    const label = email || phone || 'unknown'

    const fields: Record<string, unknown> = {
      business_name: `Website chat — ${label}`,
      notes,
    }
    if (email) fields.email = email
    if (phone) fields.phone = phone

    if (leadId) {
      const { data, error } = await crmAdmin()
        .from('leads')
        .update(fields)
        .eq('id', leadId)
        .select('id')
        .maybeSingle()

      if (error) throw error
      if (data) return data.id
      // Stale id from sessionStorage. Fall through and find or create a row.
    }

    // An email is the only thing we can reliably match an existing lead on.
    if (email) {
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()

      const { data: existing, error: queryError } = await crmAdmin()
        .from('leads')
        .select('id')
        .eq('source', 'website')
        .eq('email', email)
        .gt('created_at', thirtyDaysAgo)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle()

      if (queryError) throw queryError

      if (existing) {
        const { data, error } = await crmAdmin()
          .from('leads')
          .update(fields)
          .eq('id', existing.id)
          .select('id')
          .single()

        if (error) throw error
        return data?.id ?? null
      }
    }

    const { data, error } = await crmAdmin()
      .from('leads')
      .insert({
        ...fields,
        category: null,
        // 'website' rather than a new 'chatbot' value on purpose: this is the
        // value the CRM board already keys its "Warm lead" badge off, and the
        // notes say where it came from. A new value would need the board to
        // know about it first.
        source: 'website',
        has_website: false,
        crm_status: 'new',
        // Inbound leads are assigned by hand, not dropped into a rep's
        // territory batch. Same reasoning as /api/brief/submit.
        search_area: null,
        assigned_to: null,
      })
      .select('id')
      .single()

    if (error) throw error
    return data?.id ?? null
  } catch (err) {
    console.error('[chat] CRM save failed:', err instanceof Error ? err.message : err)
    return null
  }
}

export async function POST(req: NextRequest) {
  // Rate limit — centralized per-IP rate limiter. Replaces the per-instance
  // in-memory map (which counted separately on each cold start and was mostly theatre).
  const rateLimitResult = await rateLimit(req, 'chat')
  if (!rateLimitResult.ok) {
    return NextResponse.json(
      { reply: "You're going a bit fast for me. Give it a minute and try again." },
      { status: 429 },
    )
  }

  let body: Payload
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const messages = parseMessages(body.messages)
  if (messages.length === 0 || messages[messages.length - 1].role !== 'user') {
    return NextResponse.json({ error: 'No message to reply to' }, { status: 400 })
  }

  const incomingLeadId = typeof body.leadId === 'string' && body.leadId ? body.leadId : null

  // reCAPTCHA check only on the opening message — the first turn of a conversation.
  // Once they're engaged, throwing them out over a low score is worse than the cost
  // of the messages that follow. Rate limit covers the rest of the conversation.
  if (messages.length === 1) {
    const recaptchaResult = await verifyRecaptcha(
      typeof body.recaptchaToken === 'string' ? body.recaptchaToken : undefined
    )
    if (blockedAsBot(recaptchaResult)) {
      return NextResponse.json(
        { reply: 'Request blocked. Refresh the page and try again.' },
        { status: 403 }
      )
    }
  }

  // Only ever read contact details out of what the visitor typed. Anything the
  // bot said is its own output and must not be treated as a captured detail.
  const fromVisitor = messages
    .filter((m) => m.role === 'user')
    .map((m) => m.content)
    .join('\n')

  const email = findEmail(fromVisitor)
  const phone = findPhone(fromVisitor)

  const question = messages[messages.length - 1].content

  // The cache is only consulted on the opening message. From the second message
  // on, the question depends on what was said before it — "what about for a
  // bakery?" means nothing on its own — and a fuzzy match would cheerfully
  // answer a different question. See lib/chatbot/questions.ts.
  const firstMessage = messages.length === 1
  const cached = firstMessage ? await findApprovedAnswer(question) : null

  let raw: string | null
  let fromCache = false
  if (cached) {
    raw = cached.answer
    fromCache = true
    await bumpAskedCount(cached.id)
  } else {
    const outbound = messages.map((m) => ({ ...m, content: redact(m.content) }))
    raw = await callDeepSeek(outbound)
  }

  // Both paths, so an approved answer can carry [[AUDIT]] too — writing the
  // marker into a canned answer by hand is a supported way to make a stock
  // reply offer the audit.
  const markers = raw
    ? extractAuditMarkers(raw)
    : { reply: null as string | null, offerAudit: false, runAudit: false }
  const reply = markers.reply
  let offerAudit = markers.offerAudit

  // After stripping, so a marker never lands in a draft answer and gets served
  // to a later visitor as literal text. Logged whether or not the model
  // answered — a question that made it fall over is one of the more useful rows
  // in the table.
  if (!fromCache && worthLogging(question, firstMessage)) await logQuestion(question, reply)

  // Whether to actually run one. The website and the email are always read out
  // of what the *visitor* typed, never out of the model's reply, so a
  // hallucinated address can never send a stranger a report.
  const website = findWebsite(fromVisitor)
  const target = website ? normaliseWebsiteUrl(website) : null
  const haveDetails = Boolean(target && email)

  // Three ways in, because the model cannot be trusted to pick one:
  //   * it emitted [[RUN_AUDIT]] — what it is supposed to do
  //   * it emitted [[AUDIT]] but we already have both details, so a button
  //     asking for them again is just friction
  //   * it claimed the audit was running. Make that true rather than leave it
  //     a lie.
  const claimsRunning = raw ? CLAIMS_RUNNING.test(raw) : false
  const shouldRun = haveDetails && (markers.runAudit || markers.offerAudit || claimsRunning)

  let auditStarted = false
  if (shouldRun && target && email) {
    // The audit's own limit, not the chat's. Chat allows 30 messages per 10
    // minutes; audits are 5 an hour for very good reasons — each one runs two
    // PageSpeed calls and a headless Chrome render, and emails a PDF.
    const auditLimit = await rateLimit(req, 'audit/submit')
    if (auditLimit.ok) {
      const result = await startAudit({
        websiteUrl: target.url,
        email,
        source: 'chatbot',
        originLabel: 'Requested through the site chatbot',
      })
      auditStarted = result.auditRequestId !== null
    }
  }

  // Anything that wanted to run and didn't — missing details, rate limited,
  // insert failed — falls back to the button so there is still a way through.
  if (!auditStarted && (markers.runAudit || shouldRun)) offerAudit = true

  // The reply promised something that did not happen. Saying nothing would
  // leave them waiting for an email that is not coming, which is the whole
  // failure this change exists to fix.
  const correctedReply =
    claimsRunning && !auditStarted && reply
      ? `${reply}\n\nActually — I couldn't get that started just now. Use the button below and it'll go through properly.`
      : reply

  let leadId = incomingLeadId
  if (email || phone) {
    // Saved with the reply included, so the transcript in the CRM ends on what
    // the bot actually said rather than trailing off mid-conversation.
    const full = correctedReply
      ? [...messages, { role: 'assistant' as const, content: correctedReply }]
      : messages
    leadId = await saveLead(incomingLeadId, email, phone, full)
  }

  return NextResponse.json({
    reply: correctedReply ?? FALLBACK_REPLY,
    leadId,
    offerAudit,
    auditStarted,
  })
}
