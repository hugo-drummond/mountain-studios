// ---------------------------------------------------------------------------
// Extract website preview details from a chat transcript using DeepSeek.
//
// Reads the conversation history to pull out:
//   - The business name
//   - What type of business it is
//   - Which pages they want on their site
//
// Maps the business type to the closest preset from presetContent, and maps
// page names to the wizard's nine standard labels. Never throws — any error,
// timeout or unparseable reply returns null and logs.
// ---------------------------------------------------------------------------

import { similarity, normalise } from '@/lib/chatbot/questions'
import { presetContent } from '@/app/api/preview/generate/content'
import { crmAdmin } from '@/lib/crm'

const DEEPSEEK_URL = 'https://api.deepseek.com/v1/chat/completions'
const MODEL = 'deepseek-chat'
const REQUEST_TIMEOUT_MS = 20_000
const MAX_TOKENS = 200

type Role = 'user' | 'assistant'
interface Message {
  role: Role
  content: string
}

export interface PreviewBrief {
  businessName: string
  businessType: string
  pages: string[]
  matchedPreset: boolean
}

// The nine page labels the wizard offers, in order.
const WIZARD_LABELS = ['Home', 'About', 'Services', 'Portfolio / Gallery', 'Contact', 'Booking / Appointments', 'Blog', 'Shop / Products', 'Testimonials']

const TYPE_STOPWORDS = new Set(['business','businesses','company','small','my','our','we','i','run','the','a','an','local','own'])

function cleanType(s: string): string {
  let cleaned = normalise(s)
  if (!cleaned) return ''

  // Cut everything from the first standalone word 'in' onward
  const inMatch = cleaned.match(/\bin\b/)
  if (inMatch) {
    cleaned = cleaned.slice(0, inMatch.index).trim()
  }

  // If empty after cutting 'in', fall back to full normalised
  if (!cleaned) {
    cleaned = normalise(s) || ''
  }

  // Drop stopwords
  const tokens = cleaned.split(' ').filter(t => !TYPE_STOPWORDS.has(t))
  if (tokens.length === 0) {
    // Fall back to full normalised
    return normalise(s) || ''
  }

  return tokens.join(' ')
}

function keyParts(key: string): string[] {
  return key
    .split(/[/&]/)
    .map(part => normalise(part.trim()))
    .filter(part => part.length > 0)
}

function scoreKey(cleanedInput: string, key: string): number {
  let best = similarity(cleanedInput, normalise(key))

  const inputWords = new Set(cleanedInput.split(' '))

  for (const part of keyParts(key)) {
    best = Math.max(best, similarity(cleanedInput, part))

    // If every word of part is in inputWords and part has at least one word
    const partWords = part.split(' ')
    if (partWords.length > 0 && partWords.every(w => inputWords.has(w))) {
      best = Math.max(best, 0.95)
    }

    // If part is longer than 4 chars and is a substring of cleanedInput
    if (part.length > 4 && cleanedInput.includes(part)) {
      best = Math.max(best, 0.9)
    }
  }

  return best
}

// WHY: The naive whole-string Dice scored "plumbing business" higher against
// "Business Coach" than "Plumber", causing wrong template matches. The new
// algorithm cleans the input, scores each preset part separately, and rewards
// exact part matches and substring containment to handle multi-part types
// ("Hair Salon / Barber") and user phrasing ("I run a small plumbing business").
function nearestPresetKey(raw: string): string | null {
  const cleaned = cleanType(raw)
  if (!cleaned) return null

  let bestKey: string | null = null
  let bestScore = 0

  for (const key of Object.keys(presetContent)) {
    const score = scoreKey(cleaned, key)
    if (score > bestScore) {
      bestScore = score
      bestKey = key
    }
  }

  // 0.4 threshold for preset match
  return bestScore >= 0.4 ? bestKey : null
}

function mapPagesToLabels(rawPages: string): string[] {
  if (!rawPages || rawPages.toUpperCase() === 'NONE') return []

  const extracted = rawPages
    .split(',')
    .map((p) => p.trim())
    .filter((p) => p.length > 0)

  const matched: string[] = []
  const seen = new Set<string>()

  for (const rawLabel of extracted) {
    const rawNorm = normalise(rawLabel)
    if (!rawNorm) continue

    let bestLabel: string | null = null
    let bestScore = 0

    for (const wizardLabel of WIZARD_LABELS) {
      const wizardNorm = normalise(wizardLabel)
      const score = similarity(rawNorm, wizardNorm)
      if (score > bestScore) {
        bestScore = score
        bestLabel = wizardLabel
      }
    }

    // 0.45 threshold for page name match
    if (bestLabel && bestScore >= 0.45 && !seen.has(bestLabel)) {
      matched.push(bestLabel)
      seen.add(bestLabel)
    }
  }

  // Ensure Home and Contact are always present
  if (!seen.has('Home')) {
    matched.unshift('Home')
    seen.add('Home')
  }
  if (!seen.has('Contact')) {
    matched.push('Contact')
    seen.add('Contact')
  }

  // Reorder to match wizard label order
  const result: string[] = []
  for (const label of WIZARD_LABELS) {
    if (seen.has(label)) result.push(label)
  }

  return result.length > 0 ? result : ['Home', 'About', 'Services', 'Contact']
}

export async function extractPreviewBrief(messages: Message[]): Promise<PreviewBrief | null> {
  try {
    const apiKey = process.env.DEEPSEEK_API_KEY
    if (!apiKey) {
      console.error('[preview-brief] Missing DEEPSEEK_API_KEY')
      return null
    }

    const transcript = messages
      .map((m) => `${m.role === 'user' ? 'Visitor' : 'Bot'}: ${m.content}`)
      .join('\n')
    if (!transcript.trim()) return null

    const systemPrompt = `You are extracting structured preview details from a website chatbot conversation. Read the transcript below and output exactly three lines and nothing else:

Business name: <the trading name the visitor gave, or NONE>
Business type: <trade or category as a short singular noun, the way it would appear in a directory — "plumber", "electrician", "hair salon", "guest house", "coffee shop". Do NOT echo the visitor's phrasing. "I run a small plumbing business" becomes "plumber". "We do landscaping and garden maintenance" becomes "landscaper". Two or three words at most. If you cannot tell what kind of business it is, write NONE>
Pages: <comma separated list of pages they said they want, or NONE>

Strict rules:
- Use only what the visitor actually said. Never invent a business name.
- If they never gave a name or type, write NONE.
- For pages, extract only what they explicitly mentioned wanting.
- No commentary, no extra text, exactly three lines.`

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
          temperature: 0.1,
          max_tokens: MAX_TOKENS,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: transcript },
          ],
        }),
      })

      if (!res.ok) {
        console.error('[preview-brief] DeepSeek returned', res.status, await res.text().catch(() => ''))
        return null
      }

      const data = await res.json()
      const content = data?.choices?.[0]?.message?.content
      if (typeof content !== 'string' || !content.trim()) return null

      // Parse the three lines
      const lines = content.trim().split('\n').map((l) => l.trim())
      const parsed: { businessName?: string; businessType?: string; pages?: string } = {}

      for (const line of lines) {
        if (line.startsWith('Business name:')) {
          const value = line.slice('Business name:'.length).trim()
          if (value && value.toUpperCase() !== 'NONE') parsed.businessName = value
        } else if (line.startsWith('Business type:')) {
          const value = line.slice('Business type:'.length).trim()
          if (value && value.toUpperCase() !== 'NONE') parsed.businessType = value
        } else if (line.startsWith('Pages:')) {
          const value = line.slice('Pages:'.length).trim()
          if (value && value.toUpperCase() !== 'NONE') parsed.pages = value
        }
      }

      // Both name and type are required
      if (!parsed.businessName || !parsed.businessType) return null

      // Try to match the business type to a preset
      const presetKey = nearestPresetKey(parsed.businessType)
      const matchedPreset = presetKey !== null

      return {
        businessName: parsed.businessName,
        businessType: matchedPreset ? presetKey : parsed.businessType,
        pages: mapPagesToLabels(parsed.pages || ''),
        matchedPreset,
      }
    } finally {
      clearTimeout(timer)
    }
  } catch (err) {
    console.error('[preview-brief] extraction failed:', err instanceof Error ? err.message : err)
    return null
  }
}
