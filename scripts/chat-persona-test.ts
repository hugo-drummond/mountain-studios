function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface TurnResult {
  turn: number
  sentences: number
  words: number
  emDashes: number
  bannedPhrases: string[]
  hasAnswers: boolean
  repeatedSentences: string[]
  rawMarkerLeaked: boolean
  reply: string
  hadMarker: boolean
  markers: string[]
  offerAudit: boolean
  auditRequest: boolean
  offerBooking: boolean
  offerPreview: boolean
  markerDisplay: string
  offerInProse: string | null
}

const BANNED_PHRASES = [
  "that's completely understandable",
  'that makes sense',
  'no problem at all',
  "most people can tell when something's not right",
  "what's realistic for you",
  "let's find what works for you",
  'is there anything else I can help with',
  'happy to help',
  'feel free to',
  "that's completely fine",
  'no pressure at all',
  "that's a good position to be in",
  'no need to decide now',
  'great first step',
  'good to hear from you',
]

const PERSONAS: Record<string, string[]> = {
  roofer: [
    "dont really see why i need a website my work comes from people i know mostly",
    'i do roofing mostly some building work too',
    'just my name really dont have a business name',
    'yeah ok go on',
    "so can i get my money back if i dont like it",
  ],
  'has-site': [
    "we already have a website",
    "its alright i suppose. dont really get many enquiries off it though",
    "no idea maybe 1 or 2 a month",
    "yeah go on then",
    "how much would it cost",
  ],
}

function extractMarkers(text: string): { text: string; markers: string[] } {
  const markerRegex = /\[\[([^\]]+)\]\]/g
  const markers: string[] = []
  let match

  while ((match = markerRegex.exec(text)) !== null) {
    markers.push(match[1])
  }

  const stripped = text.replace(/\[\[[^\]]*\]\]/g, '').trim()
  return { text: stripped, markers }
}

function countSentences(text: string): number {
  // Split on . ! ? followed by space or end of string
  // Don't count . inside decimals or URLs or abbreviations
  const sentences = text.match(/[.!?](?:\s|$)/g) || []
  return sentences.length
}

function countWords(text: string): number {
  return text.split(/\s+/).filter((w) => w.length > 0).length
}

function countEmDashes(text: string): number {
  return (text.match(/—/g) || []).length
}

function findBannedPhrases(text: string): string[] {
  const found: string[] = []
  const lower = text.toLowerCase()

  for (const phrase of BANNED_PHRASES) {
    if (lower.includes(phrase)) {
      if (!found.includes(phrase)) {
        found.push(phrase)
      }
    }
  }

  return found
}

function extractSentences(text: string): string[] {
  // Split on . ! ? followed by space or end
  const matches = text.match(/[^.!?]*[.!?]/g) || []
  return matches
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
    .map((s) => s.toLowerCase().replace(/\s+/g, ' '))
}

function findRepeatedSentences(
  text: string,
  previousReplies: string[]
): string[] {
  const currentSentences = extractSentences(text)
  const previousSentences = previousReplies
    .flatMap((r) => extractSentences(r))

  const repeated: string[] = []
  for (const sentence of currentSentences) {
    if (previousSentences.includes(sentence)) {
      if (!repeated.includes(sentence)) {
        repeated.push(sentence)
      }
    }
  }

  return repeated
}

function checkRawMarkerLeak(text: string): boolean {
  // After stripping, check if [[ or ]] still appears
  return text.includes('[[') || text.includes(']]')
}

async function runTest(label?: string, persona: string = 'roofer'): Promise<void> {
  const baseUrl = process.env.CHAT_TEST_URL || 'https://mountainstudios.co.za'
  const results: TurnResult[] = []
  const messages: Message[] = []
  const allPreviousReplies: string[] = []

  const turns = PERSONAS[persona]
  if (!turns) {
    console.error(`Unknown persona: ${persona}`)
    console.error(`Available personas: ${Object.keys(PERSONAS).join(', ')}`)
    process.exit(1)
  }

  console.log('Chat Persona Test')
  if (label) {
    console.log(`Label: ${label}`)
  }
  console.log(`Base URL: ${baseUrl}`)
  console.log(`Persona: ${persona}\n`)

  for (let i = 0; i < turns.length; i++) {
    const turn = i + 1
    const visitorMessage = turns[i]

    // Add visitor message
    messages.push({ role: 'user', content: visitorMessage })

    // Call API
    console.log(`Turn ${turn}: sending request...`)
    let response
    try {
      const res = await fetch(`${baseUrl}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages }),
      })

      if (!res.ok) {
        const text = await res.text()
        if (res.status === 429) {
          console.error(`Turn ${turn}: Rate limited (429)`)
          console.error('Response body:', text)
          process.exit(1)
        } else {
          console.error(`Turn ${turn}: HTTP ${res.status}`)
          console.error('Response body:', text)
          process.exit(1)
        }
      }

      response = await res.json()
    } catch (err) {
      console.error(`Turn ${turn}: Request failed:`, err)
      process.exit(1)
    }

    const reply = response.reply || ''

    // Extract offer booleans from response
    const offerAudit = response.offerAudit || false
    const auditRequest = response.auditRequest || false
    const offerBooking = response.offerBooking || false
    const offerPreview = response.offerPreview || false

    // Extract markers and strip them
    const { text: stripped, markers } = extractMarkers(reply)
    const hadMarker = markers.length > 0

    // Build marker display from booleans
    const markerParts: string[] = []
    if (offerPreview) markerParts.push('PREVIEW')
    if (offerBooking) markerParts.push('BOOK')
    if (offerAudit) markerParts.push('AUDIT')
    if (auditRequest) markerParts.push('RUN_AUDIT')
    const markerDisplay = markerParts.length > 0 ? markerParts.join(', ') : '—'

    // Check for offers mentioned in prose without a boolean
    const proseOfferKeywords = [
      'preview',
      'pick a time',
      'book a',
      'booking page',
      'free audit',
      '15-minute',
      '15 minute',
    ]
    let offerInProse: string | null = null
    if (!offerAudit && !auditRequest && !offerBooking && !offerPreview) {
      const lowerReply = stripped.toLowerCase()
      for (const keyword of proseOfferKeywords) {
        if (lowerReply.includes(keyword)) {
          offerInProse = keyword
          break
        }
      }
    }

    // Measure the stripped text
    const sentences = countSentences(stripped)
    const words = countWords(stripped)
    const emDashes = countEmDashes(stripped)
    const bannedPhrases = findBannedPhrases(stripped)
    const hasAnswers = stripped.includes('/answers')
    const repeatedSentences = findRepeatedSentences(
      stripped,
      allPreviousReplies
    )
    const rawMarkerLeaked = checkRawMarkerLeak(stripped)

    const result: TurnResult = {
      turn,
      sentences,
      words,
      emDashes,
      bannedPhrases,
      hasAnswers,
      repeatedSentences,
      rawMarkerLeaked,
      reply: stripped,
      hadMarker,
      markers,
      offerAudit,
      auditRequest,
      offerBooking,
      offerPreview,
      markerDisplay,
      offerInProse,
    }

    results.push(result)
    allPreviousReplies.push(stripped)

    // Add assistant message to conversation history
    messages.push({ role: 'assistant', content: reply })

    if (i < turns.length - 1) {
      await sleep(1000)
    }
  }

  // Output results
  console.log('\n' + '='.repeat(80))
  console.log('RESULTS TABLE')
  console.log('='.repeat(80))
  console.log(
    'Turn | Sentences | Words | Em-dashes | Banned Phrases | /answers | Repeated | Raw Marker | Marker'
  )
  console.log('-'.repeat(105))

  for (const result of results) {
    const bannedCount = result.bannedPhrases.length
    const repeatCount = result.repeatedSentences.length
    const answers = result.hasAnswers ? 'yes' : '—'
    const rawMarker = result.rawMarkerLeaked ? 'YES' : '—'
    const marker = result.markerDisplay

    console.log(
      `${result.turn}    | ${result.sentences.toString().padStart(9)} | ${result.words.toString().padStart(5)} | ${result.emDashes.toString().padStart(9)} | ${bannedCount.toString().padStart(14)} | ${answers.padStart(8)} | ${repeatCount.toString().padStart(8)} | ${rawMarker.padStart(10)} | ${marker}`
    )
  }

  console.log('\n' + '='.repeat(80))
  console.log('FULL REPLIES')
  console.log('='.repeat(80))

  for (const result of results) {
    console.log(`\nTurn ${result.turn}:`)
    console.log(result.reply)
  }

  console.log('\n' + '='.repeat(80))
  console.log('SUMMARY')
  console.log('='.repeat(80))

  // Offer summary - list all offers that fired
  const offerSummary: string[] = []
  for (const result of results) {
    const offers: string[] = []
    if (result.offerPreview) offers.push('PREVIEW')
    if (result.offerBooking) offers.push('BOOK')
    if (result.offerAudit) offers.push('AUDIT')
    if (result.auditRequest) offers.push('RUN_AUDIT')
    if (offers.length > 0) {
      offerSummary.push(`turn${result.turn} ${offers.join(', ')}`)
    }
  }
  if (offerSummary.length > 0) {
    console.log(`Offers: ${offerSummary.join(', ')}`)
  } else {
    console.log('Offers: NONE FIRED')
  }

  // Offer-in-prose check
  const proseOffers: string[] = []
  for (const result of results) {
    if (result.offerInProse) {
      proseOffers.push(`turn${result.turn}: WARN - offer mentioned in prose without button: "${result.offerInProse}"`)
    }
  }
  if (proseOffers.length > 0) {
    for (const warn of proseOffers) {
      console.log(warn)
    }
  }

  const maxSentences = Math.max(...results.map((r) => r.sentences))
  const maxWords = Math.max(...results.map((r) => r.words))
  const meanWords = Math.round(
    results.reduce((sum, r) => sum + r.words, 0) / results.length
  )

  const allBannedPhrases = new Map<string, number>()
  for (const result of results) {
    for (const phrase of result.bannedPhrases) {
      allBannedPhrases.set(
        phrase,
        (allBannedPhrases.get(phrase) || 0) + 1
      )
    }
  }

  const totalBannedHits = Array.from(allBannedPhrases.values()).reduce(
    (a, b) => a + b,
    0
  )
  const totalAnswers = results.filter((r) => r.hasAnswers).length
  const totalRepeated = results.reduce((sum, r) => sum + r.repeatedSentences.length, 0)
  const totalRawMarkers = results.filter((r) => r.rawMarkerLeaked).length

  console.log(`Max sentences: ${maxSentences}`)
  console.log(`Max words: ${maxWords}`)
  console.log(`Mean words: ${meanWords}`)
  console.log(`Total banned phrase hits: ${totalBannedHits}`)

  if (allBannedPhrases.size > 0) {
    for (const [phrase, count] of allBannedPhrases) {
      const turns = results
        .filter((r) => r.bannedPhrases.includes(phrase))
        .map((r) => `turn ${r.turn}`)
        .join(', ')
      console.log(`  - "${phrase}": ${count} (${turns})`)
    }
  }

  console.log(`Total /answers mentions: ${totalAnswers}`)

  if (totalAnswers > 0) {
    const turns = results
      .filter((r) => r.hasAnswers)
      .map((r) => `turn ${r.turn}`)
      .join(', ')
    console.log(`  - Mentioned in: ${turns}`)
  }

  console.log(`Total repeated sentences: ${totalRepeated}`)

  if (totalRepeated > 0) {
    for (const result of results) {
      if (result.repeatedSentences.length > 0) {
        console.log(`  - Turn ${result.turn}: ${result.repeatedSentences.length} repeated`)
      }
    }
  }

  console.log(`Total raw markers leaked: ${totalRawMarkers}`)

  // Check thresholds
  console.log('\n' + '='.repeat(80))
  console.log('THRESHOLDS')
  console.log('='.repeat(80))

  const threshold1 = results.every((r) => r.sentences <= 3)
  const threshold2 = results.every((r) => r.words <= 45)
  const threshold3 = totalBannedHits === 0
  const threshold4 = totalAnswers === 0
  const threshold5 = totalRepeated === 0
  const threshold6 = totalRawMarkers === 0

  console.log(`Every reply <= 3 sentences: ${threshold1 ? 'PASS' : 'FAIL'}`)
  console.log(`Every reply <= 45 words: ${threshold2 ? 'PASS' : 'FAIL'}`)
  console.log(`Zero banned phrases: ${threshold3 ? 'PASS' : 'FAIL'}`)
  console.log(`Zero /answers mentions: ${threshold4 ? 'PASS' : 'FAIL'}`)
  console.log(`Zero repeated sentences: ${threshold5 ? 'PASS' : 'FAIL'}`)
  console.log(`Zero raw markers: ${threshold6 ? 'PASS' : 'FAIL'}`)

  const allPass = threshold1 && threshold2 && threshold3 && threshold4 && threshold5 && threshold6

  console.log('\n' + '='.repeat(80))
  if (allPass) {
    console.log('OVERALL: PASS')
  } else {
    console.log('OVERALL: FAIL')
  }
  console.log('='.repeat(80))

  if (!allPass) {
    process.exit(1)
  }
}

// Parse arguments
let label: string | undefined
let persona: string = 'roofer'
const args = process.argv.slice(2)
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--label' && i + 1 < args.length) {
    label = args[i + 1]
  } else if (args[i] === '--persona' && i + 1 < args.length) {
    persona = args[i + 1]
  }
}

runTest(label, persona).catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
