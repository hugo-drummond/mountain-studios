import { crmAdmin } from '@/lib/crm'

// ---------------------------------------------------------------------------
// The question log and the answer cache.
//
// Every question the bot is asked is written to mountainstudios.chat_questions,
// counted, and ranked. Once an answer on a row is approved by hand, that
// question stops going to DeepSeek and is served from here instead.
//
// Every function in this file is best-effort. If the table does not exist yet,
// or the database is unreachable, the lookup returns null and the log write is
// swallowed — /api/chat then behaves exactly as it did before any of this was
// added, which is to say it asks the model. The cache is an optimisation and is
// never allowed to become a dependency.
// ---------------------------------------------------------------------------

const TABLE = 'chat_questions'

// How alike two questions must be before one is answered with the other's
// answer. Dice coefficient over character trigrams, so 1 is identical and 0
// shares nothing.
//
// Set high on purpose. A missed match costs a fraction of a cent; a wrong match
// means confidently telling a visitor something that does not answer what they
// asked, which is the exact failure the gatekeeping exists to prevent. When in
// doubt, ask the model.
const MATCH_THRESHOLD = 0.72

// The approved set changes only when someone ticks a box in the admin, so it is
// held per serverless instance for a minute rather than read on every message.
const CACHE_TTL_MS = 60_000

export interface ApprovedAnswer {
  id: string
  question_norm: string
  answer: string
}

let cache: { at: number; rows: ApprovedAnswer[] } | null = null

// Lowercase, drop anything that is not a letter, digit or space, collapse the
// gaps. "How long does it take?" and "how long does it take" become the same
// string, which is what the unique index counts on.
export function normalise(question: string): string {
  return question
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function trigrams(text: string): Set<string> {
  const padded = `  ${text} `
  const out = new Set<string>()
  for (let i = 0; i < padded.length - 2; i++) out.add(padded.slice(i, i + 3))
  return out
}

// Dice coefficient: twice the shared trigrams over the total of both sets.
export function similarity(a: string, b: string): number {
  if (a === b) return 1
  if (!a || !b) return 0

  const left = trigrams(a)
  const right = trigrams(b)
  if (left.size === 0 || right.size === 0) return 0

  let shared = 0
  for (const gram of left) if (right.has(gram)) shared++

  return (2 * shared) / (left.size + right.size)
}

async function approvedAnswers(): Promise<ApprovedAnswer[]> {
  if (cache && Date.now() - cache.at < CACHE_TTL_MS) return cache.rows

  const { data, error } = await crmAdmin()
    .from(TABLE)
    .select('id, question_norm, answer')
    .eq('approved', true)
    .not('answer', 'is', null)

  if (error) throw error

  const rows = (data ?? []) as ApprovedAnswer[]
  cache = { at: Date.now(), rows }
  return rows
}

/**
 * The approved answer for this question, or null to ask the model.
 *
 * Only ever called on the first message of a conversation. Later on, "what
 * about for a bakery?" is meaningless without what came before it, and a fuzzy
 * match would happily serve the answer to some other question entirely.
 */
export async function findApprovedAnswer(question: string): Promise<{ id: string; answer: string } | null> {
  try {
    const norm = normalise(question)
    if (!norm) return null

    const rows = await approvedAnswers()

    let best: ApprovedAnswer | null = null
    let bestScore = 0

    for (const row of rows) {
      const score = similarity(norm, row.question_norm)
      if (score > bestScore) {
        bestScore = score
        best = row
      }
    }

    if (best && bestScore >= MATCH_THRESHOLD) {
      return { id: best.id, answer: best.answer }
    }
    return null
  } catch (err) {
    console.error('[chat] answer lookup failed:', err instanceof Error ? err.message : err)
    return null
  }
}

/**
 * Record that a question was asked.
 *
 * New question: insert it, with the model's reply as a starting draft for
 * whoever reviews it. Seen before: bump the count and the timestamp, and leave
 * the answer alone — an approved answer must never be overwritten by a later
 * model reply.
 */
export async function logQuestion(question: string, modelAnswer: string | null): Promise<void> {
  try {
    const norm = normalise(question)
    if (!norm) return

    const { data: existing, error: findError } = await crmAdmin()
      .from(TABLE)
      .select('id, asked_count')
      .eq('question_norm', norm)
      .maybeSingle()

    if (findError) throw findError

    if (existing) {
      const { error } = await crmAdmin()
        .from(TABLE)
        .update({ asked_count: existing.asked_count + 1, last_asked_at: new Date().toISOString() })
        .eq('id', existing.id)

      if (error) throw error
      return
    }

    const { error } = await crmAdmin()
      .from(TABLE)
      .insert({
        question: question.slice(0, 2_000),
        question_norm: norm,
        answer: modelAnswer,
        approved: false,
      })

    // Two visitors asking the same new question at the same moment both miss
    // the lookup above and both insert. The unique index on question_norm turns
    // the loser into a 23505, which is the index doing its job, not a failure.
    if (error && (error as { code?: string }).code !== '23505') throw error
  } catch (err) {
    console.error('[chat] question log failed:', err instanceof Error ? err.message : err)
  }
}

/** Counts a cache hit, so served-from-cache questions still rank in the admin. */
export async function bumpAskedCount(id: string): Promise<void> {
  try {
    const { data, error: findError } = await crmAdmin()
      .from(TABLE)
      .select('asked_count')
      .eq('id', id)
      .maybeSingle()

    if (findError) throw findError
    if (!data) return

    const { error } = await crmAdmin()
      .from(TABLE)
      .update({ asked_count: data.asked_count + 1, last_asked_at: new Date().toISOString() })
      .eq('id', id)

    if (error) throw error
  } catch (err) {
    console.error('[chat] asked_count bump failed:', err instanceof Error ? err.message : err)
  }
}

/** Drops the in-memory approved set so an admin edit takes effect immediately. */
export function invalidateCache(): void {
  cache = null
}
