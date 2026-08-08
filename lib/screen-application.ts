import { crmAdmin } from './crm'

// ---------------------------------------------------------------------------
// DeepSeek screening for /careers/sales-rep applications.
//
// A public job ad on LinkedIn pulls in hundreds of applications and most are
// not real. Nobody's inbox is on the receiving end of that, so every
// application is read by a model first and the verdict is stored on the row.
//
// This is a filter for attention, not a decision. Nothing is ever deleted or
// rejected on the model's say-so — a junk verdict just sorts it to the bottom
// of the review table, where a person can still read it.
// ---------------------------------------------------------------------------

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY
const TIMEOUT_MS = 20000

export type Verdict = 'strong' | 'maybe' | 'junk'

export interface Screening {
  score: number
  verdict: Verdict
  summary: string
  flags: string[]
}

const SYSTEM_PROMPT = `You screen applications for a commission-only freelance sales role in South Africa. The company sells websites to small businesses. Reps earn 20% of each sale and 15% of the client's monthly retainer. There is no salary and no experience is required.

You are reading two free-text answers:
1. Why they want to work in sales and what appeals about this role.
2. A time they sold something or convinced someone to do something they didn't want to do.

Judge four things:
- JUNK: gibberish, keyboard mash, copy-paste filler, an obviously AI-written non-answer, or content unrelated to the questions.
- SALES INSTINCT: does the second answer describe a real, specific occasion with a person, a resistance and an outcome? Vague claims about being "good with people" are weak. A small, ordinary, concrete story is strong.
- EFFORT: did they actually answer what was asked, with specifics rather than platitudes?
- RED FLAGS: expecting a salary, benefits or fixed hours; thinking this is employment; wanting guaranteed income; misreading the role entirely.

No experience is NOT a red flag — the role is advertised as needing none. Simple or non-native English is NOT a red flag; judge substance, not polish. A short but specific answer beats a long vague one.

Return ONLY valid JSON, no markdown fences and no commentary:
{
  "score": 0-100,
  "verdict": "strong" | "maybe" | "junk",
  "summary": "one sentence, max 20 words, on whether this person is worth a call and why",
  "flags": ["short phrases naming any concern, empty array if none"]
}

Score bands: 70-100 strong (worth a call), 35-69 maybe (borderline), 0-34 junk (bot, gibberish or a total non-answer).`

interface Answers {
  full_name: string
  city: string
  province: string
  why_sales: string
  persuasion: string
  work_rights: boolean
  has_laptop: boolean
}

function extractJson(raw: string): Record<string, unknown> | null {
  const cleaned = raw.replace(/```json\s*/gi, '').replace(/```/g, '').trim()
  try {
    return JSON.parse(cleaned)
  } catch {
    // The model occasionally wraps the object in a sentence.
    const start = cleaned.indexOf('{')
    const end = cleaned.lastIndexOf('}')
    if (start === -1 || end <= start) return null
    try {
      return JSON.parse(cleaned.slice(start, end + 1))
    } catch {
      return null
    }
  }
}

function coerce(parsed: Record<string, unknown>): Screening | null {
  const rawScore = Number(parsed.score)
  if (!Number.isFinite(rawScore)) return null
  const score = Math.max(0, Math.min(100, Math.round(rawScore)))

  // The band is derived from the score rather than trusted from the model, so
  // the two can never disagree in the review table.
  const verdict: Verdict = score >= 70 ? 'strong' : score >= 35 ? 'maybe' : 'junk'

  const summary = typeof parsed.summary === 'string' ? parsed.summary.slice(0, 300) : ''
  const flags = Array.isArray(parsed.flags)
    ? parsed.flags.filter((f): f is string => typeof f === 'string').slice(0, 8)
    : []

  return { score, verdict, summary, flags }
}

export async function screenAnswers(answers: Answers): Promise<Screening | null> {
  if (!DEEPSEEK_API_KEY) {
    console.error('[screen] DEEPSEEK_API_KEY is not set — application left unscored')
    return null
  }

  const userContent = [
    `Name: ${answers.full_name}`,
    `Location: ${answers.city}, ${answers.province}`,
    `Legal right to work in SA: ${answers.work_rights ? 'yes' : 'no'}`,
    `Laptop and internet: ${answers.has_laptop ? 'yes' : 'no'}`,
    '',
    'ANSWER 1 — Why sales, and why this role:',
    answers.why_sales.slice(0, 4000),
    '',
    'ANSWER 2 — A time they sold or convinced someone:',
    answers.persuasion.slice(0, 4000),
  ].join('\n')

  for (let attempt = 0; attempt < 2; attempt++) {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
    try {
      const res = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          temperature: 0.1,
          max_tokens: 400,
          response_format: { type: 'json_object' },
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: userContent },
          ],
        }),
        signal: controller.signal,
      })

      if (!res.ok) throw new Error(`DeepSeek returned ${res.status}`)

      const data = await res.json()
      const raw = data?.choices?.[0]?.message?.content
      if (typeof raw !== 'string') throw new Error('No content in DeepSeek response')

      const parsed = extractJson(raw)
      const screening = parsed ? coerce(parsed) : null
      if (screening) return screening

      throw new Error('Could not parse a screening out of the response')
    } catch (err) {
      console.error(`[screen] attempt ${attempt + 1} failed:`, err instanceof Error ? err.message : err)
    } finally {
      clearTimeout(timer)
    }
  }

  return null
}

/**
 * Screen one stored application and write the verdict back to its row.
 *
 * Never throws. A failure leaves screened_at null, which is exactly the state
 * the rescan endpoint looks for, so the application gets picked up next time
 * rather than being lost.
 */
export async function screenApplication(id: string): Promise<Screening | null> {
  try {
    const { data, error } = await crmAdmin()
      .from('rep_applications')
      .select('full_name, city, province, why_sales, persuasion, work_rights, has_laptop')
      .eq('id', id)
      .single()

    if (error) throw error
    if (!data) return null

    const screening = await screenAnswers(data as Answers)
    if (!screening) return null

    await crmAdmin()
      .from('rep_applications')
      .update({
        ai_score: screening.score,
        ai_verdict: screening.verdict,
        ai_summary: screening.summary,
        ai_flags: screening.flags,
        screened_at: new Date().toISOString(),
      })
      .eq('id', id)

    // TODO: post strong candidates to Discord here once DISCORD_WEBHOOK_URL
    // exists. notified_at is on the table and unused until then.

    return screening
  } catch (err) {
    console.error('[screen] screening failed for', id, err instanceof Error ? err.message : err)
    return null
  }
}
