import { NextRequest, NextResponse } from 'next/server'
import { waitUntil } from '@vercel/functions'
import { crmAdmin } from '@/lib/crm'
import { attachReferralToLead } from '@/lib/referral'
import { SYSTEM_PROMPT, FALLBACK_REPLY } from '@/lib/chatbot/knowledge'
import { bumpAskedCount, findApprovedAnswer, logQuestion } from '@/lib/chatbot/questions'
import { extractLeadProfile } from '@/lib/chatbot/lead-profile'
import { normaliseWebsiteUrl } from '@/lib/audit/start'
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

// Matches the bot asking for the business name, however it phrased it.
const ASKED_FOR_NAME =
  /\b(business (is )?called|what'?s it called|what do you trade as|trade as\?|name do you go by|business name|name of (the|your) business)\b/i

// The standing prompt tells it to answer the visitor's question before asking for
// the name, and never to ask twice running. It does not obey: in testing it asked
// on five consecutive turns while real questions went unanswered, which is what
// makes it feel like a form with a required field. A directive scoped to one turn
// is obeyed where a rule buried in a long prompt is not.
const NO_NAME_THIS_TURN =
  'THIS MESSAGE ONLY: your previous message already asked for the business name and they did not give it. Do not ask for it again in this message, in any form or wording — not reworded, not "what do you trade as", not slipped into a sentence. Answer what they have actually said instead. You may ask again in a later message once you have dealt with what is on their mind.'

// The directive above is the polite ask; this is the guarantee. DeepSeek ignored
// the instruction on every turn of a seven-turn test, so the repeated question is
// removed from the reply itself. Only ever runs when the previous assistant turn
// already asked, so a first ask is never touched.
function stripTrailingNameQuestion(text: string): string {
  const trimmed = text.trimEnd()
  if (!trimmed.endsWith('?')) return text

  // The final sentence is all that can carry the repeat.
  const end = trimmed.length - 1
  const start = Math.max(
    trimmed.lastIndexOf('.', end - 1),
    trimmed.lastIndexOf('!', end - 1),
    trimmed.lastIndexOf('?', end - 1),
    trimmed.lastIndexOf('\n', end - 1),
  )
  const lastSentence = trimmed.slice(start + 1)
  if (!ASKED_FOR_NAME.test(lastSentence)) return text

  const head = trimmed.slice(0, start + 1)

  // Usually the question is tacked onto a sentence worth keeping — "I can build
  // you a preview — what's the business called?". Cut at the dash so the offer
  // survives; only drop the whole sentence when the question is the sentence.
  const dash = Math.max(lastSentence.lastIndexOf('—'), lastSentence.lastIndexOf(' - '))
  if (dash > 0 && ASKED_FOR_NAME.test(lastSentence.slice(dash))) {
    const kept = lastSentence.slice(0, dash).replace(/[\s—–-]+$/, '').trimEnd()
    if (kept) return `${head}${kept}.`
  }

  const out = head.replace(/[\s—–-]+$/, '').trimEnd()
  return out || text
}

type Role = 'user' | 'assistant'
interface Message {
  role: Role
  content: string
}

interface Payload {
  messages?: unknown
  leadId?: unknown
  recaptchaToken?: unknown
  refCode?: unknown
  previewToken?: unknown
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

async function callDeepSeek(messages: Message[], turnDirective?: string): Promise<string | null> {
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
        messages: [
          {
            role: 'system',
            content: turnDirective ? `${SYSTEM_PROMPT}\n\n${turnDirective}` : SYSTEM_PROMPT,
          },
          ...messages,
        ],
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

// The model ends a message with [[BOOK]] when it wants to put the "book a
// call" button under it. Same reasoning as AUDIT_MARKER: a marker rather than
// matching on wording, and just as generous about case, spacing and stray
// markdown punctuation.
const BOOK_MARKER = /[`*_]*\[\[\s*book\s*\]\][`*_]*/gi

// The model ends a message with [[PREVIEW]] when it wants to put the "build my
// preview" button under it. Same reasoning and generosity as the others.
const PREVIEW_MARKER = /[`*_]*\[\[\s*preview\s*\]\][`*_]*/gi

function extractAuditMarkers(reply: string): {
  reply: string
  offerAudit: boolean
  runAudit: boolean
  offerBooking: boolean
  offerPreview: boolean
} {
  const runAudit = RUN_AUDIT_MARKER.test(reply)
  RUN_AUDIT_MARKER.lastIndex = 0

  let text = reply.replace(RUN_AUDIT_MARKER, '')

  const offerAudit = AUDIT_MARKER.test(text)
  AUDIT_MARKER.lastIndex = 0
  text = text.replace(AUDIT_MARKER, '')

  const offerBooking = BOOK_MARKER.test(text)
  BOOK_MARKER.lastIndex = 0
  text = text.replace(BOOK_MARKER, '')

  const offerPreview = PREVIEW_MARKER.test(text)
  PREVIEW_MARKER.lastIndex = 0
  text = text.replace(PREVIEW_MARKER, '')

  return {
    reply: text.replace(/\n{3,}/g, '\n\n').trim(),
    offerAudit,
    runAudit,
    offerBooking,
    offerPreview,
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

function buildNotes(
  profile: string | null,
  email: string | null,
  phone: string | null,
  messages: Message[],
  previewToken: string | null = null,
): string {
  const transcript = messages
    .map((m) => `${m.role === 'user' ? 'Them' : 'Bot'}: ${m.content}`)
    .join('\n')

  return [
    profile,
    profile ? '' : null,
    'Chatbot enquiry from the website.',
    email ? `Email: ${email}` : null,
    phone ? `Phone: ${phone}` : null,
    previewToken ? `Preview: https://mountainstudios.co.za/p/${previewToken}` : null,
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
  previewToken: string | null = null,
): Promise<string | null> {
  try {
    const notes = buildNotes(null, email, phone, messages, previewToken)
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
  const previewToken = typeof body.previewToken === 'string' && body.previewToken ? body.previewToken : null

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

  // Only the assistant's own last turn matters: if it asked for the business name
  // and the visitor still has not given it, this turn must not ask again.
  const lastAssistant = [...messages].reverse().find((m) => m.role === 'assistant')
  const askedLastTurn = lastAssistant ? ASKED_FOR_NAME.test(lastAssistant.content) : false

  let raw: string | null
  let fromCache = false
  if (cached) {
    raw = cached.answer
    fromCache = true
    await bumpAskedCount(cached.id)
  } else {
    const outbound = messages.map((m) => ({ ...m, content: redact(m.content) }))
    raw = await callDeepSeek(outbound, askedLastTurn ? NO_NAME_THIS_TURN : undefined)
  }

  // Both paths, so an approved answer can carry [[AUDIT]] too — writing the
  // marker into a canned answer by hand is a supported way to make a stock
  // reply offer the audit.
  const markers = raw
    ? extractAuditMarkers(raw)
    : { reply: null as string | null, offerAudit: false, runAudit: false, offerBooking: false, offerPreview: false }
  const reply = markers.reply && askedLastTurn ? stripTrailingNameQuestion(markers.reply) : markers.reply
  let offerAudit = markers.offerAudit
  const offerBooking = markers.offerBooking
  const offerPreview = markers.offerPreview

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

  // The model is not reliable enough to be the trigger. Handed a message
  // containing both a website and an email it has, in testing, replied "what's
  // the best email address to send the report to?" — the address being in the
  // sentence it was answering. Every signal it controls was absent, so nothing
  // ran and the visitor was asked for something they had already given.
  //
  // So the visitor's own words count too: they said "audit", and they handed
  // over a site and an address. That is intent, whether or not the model
  // noticed it.
  // Consent comes from the visitor, not from the model and not from the bot
  // having offered. Either they used the word themselves, or they said yes to
  // an offer the bot just made.
  //
  // Neither marker is consulted here. Told to signal a run "the moment you have
  // both details", the model duly signalled one for somebody who had handed
  // over a site and an address while asking for a quote — which would have sent
  // a stranger a report they never asked for.
  const lastVisitorMessage = messages[messages.length - 1].content
  // Any assistant turn, not just the last one. Details often arrive one at a
  // time — the website, then the email two messages later, by which point the
  // most recent reply is only "thanks, what's your email?" and mentions no
  // audit at all. Checking the last message alone left that conversation
  // stuck asking forever.
  const assistantRaisedAudit = messages.some(
    (m) => m.role === 'assistant' && /\baudit\b/i.test(m.content),
  )

  const saidYes = /^\s*(yes|yeah|yep|yup|sure|ok|okay|please|go ahead|do it|sounds good)\b/i.test(
    lastVisitorMessage,
  )

  // Handing over a website or an email right after the bot raised the audit is
  // consent, and it is how most people actually answer. Requiring the word
  // "audit" or a message starting with "yes" meant someone who replied
  // "ant@example.com - https://theirsite.com" — exactly what was asked for —
  // was told the email was still needed and nothing ran.
  const suppliedDetails = !!findEmail(lastVisitorMessage) || !!findWebsite(lastVisitorMessage)

  const visitorWantsAudit =
    /\baudits?\b/i.test(fromVisitor) || (assistantRaisedAudit && (saidYes || suppliedDetails))

  const shouldRun = haveDetails && visitorWantsAudit

  // The audit is NOT started here. It is handed back to the widget, which posts
  // it to /api/audit/submit — the same endpoint the popup form uses.
  //
  // This route tried to start it directly and neither way worked. Rendering the
  // PDF in-process needs the 66MB headless browser in the chat function, which
  // made its cold start too slow for the model to answer at all and took the
  // chatbot down. Handing off to /api/audit/run over HTTP left the row stuck at
  // status='new' — the server-to-server call never landed, and the visitor got
  // nothing whatsoever.
  //
  // /api/audit/submit already does all of this correctly from a browser, every
  // day, for the popup. Use the path that works rather than a third variant.
  const auditRequest = shouldRun && target && email ? { websiteUrl: target.url, email } : null

  // Anything that wanted an audit and has nothing to hand over — missing site,
  // missing email — falls back to the button so there is still a way through.
  //
  // claimsRunning is in here because the correction below tells them to use the
  // button. It shipped without it and produced a reply that pointed at a button
  // which was never rendered.
  if (!auditRequest && (markers.runAudit || shouldRun || claimsRunning)) offerAudit = true

  // The reply promised something that did not happen. Saying nothing would
  // leave them waiting for an email that is not coming, which is the whole
  // failure this change exists to fix.
  // We are running an audit the model did not announce — usually because it
  // failed to spot the email it was just given and asked for it again. Say so,
  // or the reply asks a question the widget is simultaneously answering.
  const announcedReply =
    auditRequest && !claimsRunning && reply
      ? `${reply}\n\nActually — I've got both already. The report is on its way to that inbox.`
      : reply

  // The reply promised something we have nothing to hand over for. Saying
  // nothing would leave them waiting for an email that is not coming.
  const correctedReply =
    claimsRunning && !auditRequest && announcedReply
      ? `${announcedReply}\n\nActually — I couldn't get that started just now. Use the button below and it'll go through properly.`
      : announcedReply

  let leadId = incomingLeadId
  if (email || phone) {
    // Saved with the reply included, so the transcript in the CRM ends on what
    // the bot actually said rather than trailing off mid-conversation.
    const full = correctedReply
      ? [...messages, { role: 'assistant' as const, content: correctedReply }]
      : messages
    leadId = await saveLead(incomingLeadId, email, phone, full, previewToken)
    // A chat that produced contact details is a lead like any other, and the
    // visitor may well have arrived on a partner's link.
    await attachReferralToLead(leadId, body.refCode)

    // Enrich the notes with a sales-ready summary in the background. This is
    // pure enrichment on top of a save that already succeeded — the visitor's
    // response must never wait on it, and any failure here is swallowed and
    // logged, never surfaced. Same fire-and-forget pattern as the audit
    // kickoff in lib/audit/start.ts.
    if (leadId) {
      const id = leadId
      const token = previewToken
      const run = async () => {
        try {
          const profile = await extractLeadProfile(full)
          if (!profile) return

          const notes = buildNotes(profile, email, phone, full, token)
          const { error } = await crmAdmin().from('leads').update({ notes }).eq('id', id)
          if (error) throw error
        } catch (err) {
          console.error(
            '[chat] lead profile enrichment failed:',
            err instanceof Error ? err.message : err,
          )
        }

        // Attach preview to the lead
        if (token) {
          try {
            const { error } = await crmAdmin()
              .from('shared_previews')
              .update({ lead_id: id })
              .eq('token', token)
              .is('lead_id', null)
            if (error) throw error
          } catch (err) {
            console.error(
              '[chat] preview attachment failed:',
              err instanceof Error ? err.message : err,
            )
          }
        }
      }

      if (process.env.VERCEL) waitUntil(run())
      else run()
    }
  }

  return NextResponse.json({
    reply: correctedReply ?? FALLBACK_REPLY,
    leadId,
    offerAudit,
    auditRequest,
    offerBooking,
    offerPreview,
  })
}
