// ---------------------------------------------------------------------------
// Turns a chat transcript into a short, sales-ready summary for Hugo, so a
// lead's notes read like a briefing instead of a wall of back-and-forth he
// has to skim to find the one number or the one sentence that mattered.
//
// One extra DeepSeek call, made only after the lead is already saved via the
// regular path — this is enrichment on top of a save that already succeeded,
// never a dependency of it. Same rule as callDeepSeek() in
// app/api/chat/route.ts: this function must NEVER throw. Any missing key,
// timeout, bad response, or empty reply becomes null, and the caller just
// skips the notes update.
// ---------------------------------------------------------------------------

const DEEPSEEK_URL = 'https://api.deepseek.com/v1/chat/completions'
const MODEL = 'deepseek-chat'
const REQUEST_TIMEOUT_MS = 20_000
const MAX_TOKENS = 500
const MAX_SUMMARY_CHARS = 1_200

type Role = 'user' | 'assistant'
interface Message {
  role: Role
  content: string
}

const SYSTEM_PROMPT = `You are extracting a structured sales summary from a website chatbot conversation for Mountain Studios. Read the transcript below and output plain text only, in exactly this field order, one field per line, in exactly this shape:

LEAD SUMMARY
Name:
Business type:
Location:
Existing website:
Digital experience:
Pages wanted:
Features wanted:
Assets they have:
Primary goal:
Services discussed:
Our estimate given:
Their stated website budget:
Their monthly marketing budget:
Timeline:
Lead status:

Strict rules, follow all of them:

- Fill a field ONLY from what the visitor actually said in the transcript. Never infer, never guess, never pad out an answer with something plausible. If the information was not given, leave that line out of the output entirely — do not write the label with nothing after it, do not write "not mentioned" or "unknown". Just omit the line.
- "Our estimate given" is the figure the BOT quoted to the visitor during the conversation. It is NOT the customer's budget under any circumstances. Never put a price the bot quoted into "Their stated website budget" or "Their monthly marketing budget". Those two budget fields may only be filled with a number or range the VISITOR stated themselves, in their own words, as what they are willing or able to spend.
- "Digital experience" captures how much the visitor has already done online before this conversation — e.g. "never done anything online", "runs Google Ads already", "has an old site nobody updates", "handles their own social media". This is not a technical spec — it is what Hugo needs to know about how to sell to this person.
- "Primary goal" is the underlying business reason the visitor wants a website or marketing help, not the technical request. "Wants more customers finding him on Google" is a goal. "5 pages with a gallery" is not a goal — that belongs under "Pages wanted" and "Features wanted".
- "Lead status" must be exactly one of these six values, verbatim, chosen by how far the conversation actually got: researching, interested, wants preview, wants quote, ready to speak to Hugo, call booked.
- Keep the entire summary under 1200 characters.
- No commentary, no preamble, no markdown headings or formatting beyond the literal "LEAD SUMMARY" line at the top. Plain text only.`

export async function extractLeadProfile(messages: Message[]): Promise<string | null> {
  try {
    const apiKey = process.env.DEEPSEEK_API_KEY
    if (!apiKey) {
      console.error('[lead-profile] Missing DEEPSEEK_API_KEY')
      return null
    }

    const transcript = messages
      .map((m) => `${m.role === 'user' ? 'Visitor' : 'Bot'}: ${m.content}`)
      .join('\n')
    if (!transcript.trim()) return null

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
          // Low, not zero. This is extraction, not conversation — the model
          // should read what was said, not add personality to it.
          temperature: 0.1,
          max_tokens: MAX_TOKENS,
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: transcript },
          ],
        }),
      })

      if (!res.ok) {
        console.error('[lead-profile] DeepSeek returned', res.status, await res.text().catch(() => ''))
        return null
      }

      const data = await res.json()
      const content = data?.choices?.[0]?.message?.content
      if (typeof content !== 'string' || !content.trim()) return null

      return content.trim().slice(0, MAX_SUMMARY_CHARS)
    } finally {
      clearTimeout(timer)
    }
  } catch (err) {
    // Never throw. A failure here must not affect the lead that was already
    // saved by the caller.
    console.error('[lead-profile] extraction failed:', err instanceof Error ? err.message : err)
    return null
  }
}
