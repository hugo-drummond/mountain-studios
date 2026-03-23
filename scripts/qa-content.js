#!/usr/bin/env node
/**
 * Content QA Script — uses Ollama (llama3.1:8b) to scan all 153 business types
 * for text issues, then outputs a report for Claude to fix.
 *
 * Usage: node scripts/qa-content.js
 * Output: scripts/qa-report.json
 */

const fs = require('fs')
const path = require('path')

const CONTENT_PATH = path.join(__dirname, '..', 'app', 'api', 'preview', 'generate', 'content.ts')
const REPORT_PATH = path.join(__dirname, 'qa-report.json')
const OLLAMA_URL = 'http://localhost:11434/api/generate'
const MODEL = 'llama3.1:8b'

async function queryOllama(prompt) {
  const res = await fetch(OLLAMA_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: MODEL,
      prompt,
      stream: false,
      options: { temperature: 0.1, num_predict: 1024 }
    })
  })
  const data = await res.json()
  return data.response || ''
}

function extractContent() {
  const raw = fs.readFileSync(CONTENT_PATH, 'utf8')

  // Find the presetContent object
  const startMatch = raw.match(/export const presetContent[^{]*\{/)
  if (!startMatch) throw new Error('Could not find presetContent')

  const startIdx = startMatch.index + startMatch[0].length

  // Parse each business type manually by finding top-level keys
  const types = {}
  const lines = raw.split('\n')
  let currentType = null
  let depth = 0
  let buffer = ''
  let inPreset = false

  for (const line of lines) {
    if (line.includes('export const presetContent')) { inPreset = true; continue }
    if (!inPreset) continue

    // Detect new top-level type
    const typeMatch = line.match(/^\s{2}"([^"]+)":\s*\{/)
    if (typeMatch && depth === 0) {
      if (currentType && buffer) {
        try {
          types[currentType] = JSON.parse('{' + buffer + '}')
        } catch {}
      }
      currentType = typeMatch[1]
      buffer = ''
      depth = 0
    }

    if (currentType) {
      buffer += line + '\n'
      depth += (line.match(/\{/g) || []).length
      depth -= (line.match(/\}/g) || []).length

      if (depth <= 0 && buffer.length > 50) {
        try {
          types[currentType] = JSON.parse('{' + buffer.replace(/,\s*\}/, '}').replace(/,\s*$/, '') + '}')
        } catch {}
        if (types[currentType]) {
          currentType = null
          buffer = ''
          depth = 0
        }
      }
    }
  }

  return types
}

function buildTextSummary(name, data) {
  const d = data[name] || data
  const services = (d.services || []).map(s => `- ${s.name}: ${s.description}`).join('\n')
  const stats = (d.stats || []).map(s => `${s.value} ${s.label}${s.sublabel ? ' (' + s.sublabel + ')' : ''}`).join(', ')
  const process = (d.processSteps || []).map(s => `Step ${s.step}: ${s.title} — ${s.description}`).join('\n')

  return `BUSINESS TYPE: ${name}

HERO:
- Eyebrow: ${d.heroEyebrow || ''}
- Tagline: ${d.tagline || ''}
- Subtitle: ${d.heroSubtitle || ''}
- Accent: ${d.heroAccent || ''}
- CTA Primary: ${d.ctaPrimary || ''}
- CTA Secondary: ${d.ctaSecondary || ''}
- CTA Note: ${d.ctaNote || ''}
- Badge: ${d.badge || ''}

SERVICES HEADING: ${d.servicesHeading || ''}
SERVICES:
${services}

GALLERY HEADING: ${d.galleryHeading || ''}

ABOUT:
- Heading: ${d.aboutHeading || ''}
- Mission: ${d.aboutMission || ''}
- Text: ${d.aboutText || ''}

STATS: ${stats}

CONTACT HEADING: ${d.contactHeading || ''}
${d.contactHours ? 'HOURS: ' + d.contactHours : ''}

${process ? 'PROCESS STEPS:\n' + process : ''}

${d.testimonial ? 'TESTIMONIAL: "' + d.testimonial.quote + '" — ' + d.testimonial.author : ''}`
}

async function main() {
  console.log('Extracting content from content.ts...')
  const raw = fs.readFileSync(CONTENT_PATH, 'utf8')

  // Simple extraction: find all business type names
  const typeNames = []
  const typeRegex = /^\s{2}"([^"]+)":\s*\{/gm
  let match
  while ((match = typeRegex.exec(raw)) !== null) {
    if (match[1] !== 'testimonial') typeNames.push(match[1])
  }

  console.log(`Found ${typeNames.length} business types`)

  // Extract each type's text content using a simpler approach
  const report = []
  let processed = 0

  for (const typeName of typeNames) {
    processed++
    process.stdout.write(`\r[${processed}/${typeNames.length}] Scanning: ${typeName}...                    `)

    // Extract this type's block from raw text
    const typeStart = raw.indexOf(`"${typeName}": {`)
    if (typeStart === -1) continue

    // Find the end of this type's block
    let depth = 0
    let blockEnd = typeStart
    let foundFirst = false
    for (let i = typeStart; i < raw.length; i++) {
      if (raw[i] === '{') { depth++; foundFirst = true }
      if (raw[i] === '}') depth--
      if (foundFirst && depth === 0) { blockEnd = i + 1; break }
    }

    const block = raw.slice(typeStart, blockEnd)

    // Extract key text fields
    const extract = (field) => {
      const m = block.match(new RegExp(`"${field}":\\s*"([^"]*(?:\\\\.[^"]*)*)"`, 's'))
      return m ? m[1].replace(/\\n/g, '\n').replace(/\\"/g, '"').replace(/\\u([0-9a-f]{4})/gi, (_, c) => String.fromCharCode(parseInt(c, 16))) : ''
    }

    const textContent = `BUSINESS TYPE: ${typeName}
Eyebrow: ${extract('heroEyebrow')}
Tagline: ${extract('tagline')}
Subtitle: ${extract('heroSubtitle')}
Accent: ${extract('heroAccent')}
CTA Primary: ${extract('ctaPrimary')}
CTA Secondary: ${extract('ctaSecondary')}
Badge: ${extract('badge')}
Services Heading: ${extract('servicesHeading')}
About Heading: ${extract('aboutHeading')}
About Mission: ${extract('aboutMission')}
About Text: ${extract('aboutText')}
Contact Heading: ${extract('contactHeading')}
Gallery Heading: ${extract('galleryHeading')}`

    const prompt = `You are a website copywriting QA reviewer. Review the following website text for a "${typeName}" business.

Check for:
1. Grammar or spelling errors
2. Phrases that are repeated across different sections (e.g. same sentence in hero and about)
3. Text that doesn't make sense for this business type
4. Awkward or unnatural phrasing
5. Generic filler text that could apply to any business
6. Section headings that don't fit (e.g. "What We Offer" for an art gallery)

ONLY report actual issues. If the text looks good, respond with "NO ISSUES".
Be specific — quote the exact problematic text and suggest a fix.

---
${textContent}
---

Issues found (be brief and specific):`

    try {
      const response = await queryOllama(prompt)
      const trimmed = response.trim()

      if (trimmed && !trimmed.toUpperCase().includes('NO ISSUES') && trimmed.length > 20) {
        report.push({
          type: typeName,
          issues: trimmed
        })
      }
    } catch (err) {
      console.error(`\nError scanning ${typeName}:`, err.message)
    }
  }

  console.log(`\n\nDone. Found issues in ${report.length} business types.`)
  fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2))
  console.log(`Report saved to: ${REPORT_PATH}`)
}

main().catch(console.error)
