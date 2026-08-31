#!/usr/bin/env tsx
/**
 * Offline smoke test for the preview generator's template builders.
 *
 * app/api/preview/generate/route.ts contains 18 pure `function build<X>Template(data): string`
 * builders plus buildHead()/buildCssVars(), none of them exported — Next.js rejects
 * arbitrary named exports from a route.ts file, and we must not modify that file at all.
 *
 * The seam: read route.ts as text, rewrite its one relative import so the copy still
 * resolves, append an `export { ... }` for the builders we discover by regex (never a
 * hardcoded list — a renamed or newly added builder is picked up automatically), write
 * the patched copy to a throwaway file, dynamically import it, then delete the file.
 * The original route.ts on disk is never touched.
 *
 * Temp file location: the task suggested node_modules/.cache/ or os.tmpdir() as
 * examples. Both were tried and rejected before settling on this approach — see the
 * comment above TMP_DIR below for why.
 *
 * Run with: npx tsx scripts/smoke-previews.ts
 */

import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { pathToFileURL } from 'node:url'

import { presetContent } from '../app/api/preview/generate/content'
import { businessTypeData } from '../constants/business-types'

const ROOT = path.resolve(__dirname, '..')
const ROUTE_FILE = path.join(ROOT, 'app/api/preview/generate/route.ts')
const CONTENT_ABS = path.join(ROOT, 'app/api/preview/generate/content') // extensionless, same as the original `./content` import

// ---------------------------------------------------------------------------
// Result bookkeeping
// ---------------------------------------------------------------------------

interface FailureEntry {
  template: string
  fixture: string
  check: string
  detail: string
}

const failures: FailureEntry[] = []
const totalByTemplate = new Map<string, number>()
const passByTemplate = new Map<string, number>()

function recordFail(template: string, fixture: string, check: string, detail: string) {
  failures.push({ template, fixture, check, detail })
}

// ---------------------------------------------------------------------------
// Step 1-5: load the builders from a patched, throwaway copy of route.ts
// ---------------------------------------------------------------------------

async function loadBuilders(): Promise<{
  mod: Record<string, (data: unknown) => string> & {
    buildCssVars: (fonts: { headingFamily: string }, primaryColor: string, secondaryColor: string, theme?: 'dark' | 'light') => string
    getLocationInfo: () => { address: string; city: string; postcode: string; country: string; phone: string }
  }
  builderNames: string[]
  routeSrc: string
}> {
  const routeSrc = fs.readFileSync(ROUTE_FILE, 'utf8')

  const IMPORT_NEEDLE = `from './content'`
  const occurrences = routeSrc.split(IMPORT_NEEDLE).length - 1
  if (occurrences !== 1) {
    console.error(
      `Expected exactly one \`${IMPORT_NEEDLE}\` in route.ts, found ${occurrences}. ` +
      `Refusing to guess which one to rewrite — bailing without touching route.ts.`,
    )
    process.exit(1)
  }
  let patched = routeSrc.replace(IMPORT_NEEDLE, `from ${JSON.stringify(CONTENT_ABS)}`)

  const builderNames = [...patched.matchAll(/^function (build\w*Template)\(/gm)].map((m) => m[1])
  if (builderNames.length === 0) {
    console.error('No builder functions matched /^function (build\\w*Template)\\(/m in route.ts — bailing without touching the file.')
    process.exit(1)
  }

  const extraExports = ['buildHead', 'buildCssVars', 'getLocationInfo']
  for (const name of extraExports) {
    if (!new RegExp(`^function ${name}\\(`, 'm').test(patched)) {
      console.error(`Expected helper \`${name}\` not found as a top-level function in route.ts — bailing.`)
      process.exit(1)
    }
  }

  patched += `\n\nexport { ${[...builderNames, ...extraExports].join(', ')} }\n`

  // node_modules/.cache/ and os.tmpdir() (the two examples in the task) were both
  // tried first and both fail: route.ts imports `@/lib/rate-limit` etc, and tsx
  // resolves that alias via tsconfig `paths`, walking up from the importing file to
  // find tsconfig.json. A file under node_modules/ is deliberately excluded from that
  // walk (confirmed: `Cannot find module '@/lib/rate-limit'` from inside
  // node_modules/.cache), and os.tmpdir() sits outside the repo entirely so no
  // tsconfig.json is ever found. A location inside the repo but outside node_modules
  // resolves `@/*` correctly — verified directly before writing this script. This
  // still satisfies the hard requirement ("outside app/"); it just isn't literally
  // one of the two suggested examples.
  const tmpDir = path.join(ROOT, '.smoke-tmp')
  fs.mkdirSync(tmpDir, { recursive: true })
  const tmpFile = path.join(tmpDir, `route-smoke-${crypto.randomUUID()}.ts`)
  fs.writeFileSync(tmpFile, patched, 'utf8')

  try {
    const mod = await import(pathToFileURL(tmpFile).href)
    return { mod, builderNames, routeSrc }
  } finally {
    fs.rmSync(tmpFile, { force: true })
    try {
      fs.rmdirSync(tmpDir) // only succeeds if empty — fine either way
    } catch {
      /* leftover from a concurrent run, or not empty; not our problem */
    }
  }
}

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

function makeContent() {
  return {
    heroEyebrow: 'CAPE TOWN OWNED & OPERATED',
    tagline: 'Built for <em>real</em> results',
    heroSubtitle: 'A hands-on team that treats every project like it is the only one on the books.',
    ctaPrimary: 'Get a Quote',
    ctaSecondary: 'See Our Work',
    servicesHeading: 'What We Offer',
    services: [
      { name: 'Consultation', description: 'A no-obligation chat about what you actually need, not what is easiest to sell.', tags: ['Featured', 'Popular'], icon: 'star', serviceImageQuery: 'consultation meeting table' },
      { name: 'Full Installation', description: 'Complete end-to-end delivery, handled by the same crew from first visit to final sign-off.', tags: ['Popular'], icon: 'tool', serviceImageQuery: 'installation work in progress' },
      { name: 'Ongoing Support', description: 'A maintenance plan so small issues get fixed before they become expensive ones.', tags: ['Trusted'], icon: 'shield', serviceImageQuery: 'maintenance check' },
      { name: 'Emergency Callout', description: 'Same-day response for the problems that cannot wait for a scheduled slot.', tags: ['24/7'], icon: 'bolt', serviceImageQuery: 'urgent repair callout' },
      { name: 'Custom Design', description: 'A plan drawn up around your space and your budget, not a one size template.', tags: ['Bespoke'], icon: 'edit', serviceImageQuery: 'custom design sketch' },
      { name: 'Site Assessment', description: 'A proper walkthrough before any quote goes out, so the number on paper matches the job.', tags: ['Free'], icon: 'map', serviceImageQuery: 'site inspection' },
      { name: 'Warranty Cover', description: 'Every job backed by a written warranty, not a verbal promise.', tags: ['Guaranteed'], icon: 'lock', serviceImageQuery: 'warranty paperwork handover' },
    ],
    galleryHeading: 'Recent Work',
    aboutHeading: 'Built on <em>trust</em>',
    aboutText:
      'We started this business because too many jobs in this industry get handed to a subcontractor nobody met and nobody follows up on.\n\n' +
      'Today the same small crew that quotes the job is the crew that finishes it, which is the only way we know how to keep standards up as we grow.',
    stats: [
      { value: '12+', label: 'Years Trading', sublabel: 'since 2012' },
      { value: '480+', label: 'Projects Completed', sublabel: 'and counting' },
      { value: '98%', label: 'Client Satisfaction', sublabel: 'repeat and referral' },
      { value: '24/7', label: 'Emergency Line', sublabel: 'always answered' },
      { value: '15', label: 'Team Members', sublabel: 'all local' },
    ],
    contactHeading: 'Ready to start?',
    contactHours: 'Mon-Fri 8am-5pm, Sat 8am-1pm',
    processSteps: [
      { step: '1', title: 'Get in Touch', description: 'Send through what you need and we come back with next steps within a day.' },
      { step: '2', title: 'We Plan', description: 'A site visit and a written quote, no surprises once work begins.' },
      { step: '3', title: 'We Deliver', description: 'The job is done, checked, and signed off with you before we call it finished.' },
    ],
    stepsHeading: 'How It Works',
    projectCaptions: ['Featured Project', 'Recent Work', 'Client Project', 'Latest Design', 'Signature Build', 'Flagship Site', 'Weekend Turnaround', 'Repeat Client'],
    heroAccent: 'Rated 4.9 out of 5 by local clients',
    ctaNote: 'Free quote, no obligation',
    badge: 'Verified Local Business',
    aboutMission: 'We believe the smallest jobs deserve the same attention as the biggest ones.',
    testimonial: { quote: 'They turned up on time, did what they said, and the price matched the quote.', author: 'M. Adams', rating: 5 },
    testimonials: [
      { quote: 'They turned up on time, did what they said, and the price matched the quote.', author: 'M. Adams', rating: 5 },
      { quote: 'Honestly the easiest contractor experience we have had.', author: 'T. Naidoo', rating: 5 },
      { quote: 'Responsive, tidy, and the work has held up two years later.', author: 'S. van Wyk', rating: 4 },
      { quote: 'Would recommend to anyone who wants it done properly the first time.', author: 'L. Botha', rating: 5 },
    ],
    imageMood: 'warm, natural light, hands-on craftsmanship',
    heroImageQuery: 'team at work on site',
    aboutImageQuery: 'team portrait workshop',
    galleryImageQueries: ['finished project wide shot', 'detail close up', 'team on site', 'before and after', 'client handover', 'tools of the trade', 'workshop interior'],
    features: [
      { name: 'Licensed & Insured', description: 'Fully licensed with public liability cover on every job.', imageQuery: 'certificate documents' },
      { name: 'Local Crew', description: 'Based in Cape Town, not a call centre three provinces away.', imageQuery: 'team van branded' },
      { name: 'Fixed Pricing', description: 'The quote you get is the price you pay, no line item surprises later.', imageQuery: 'invoice paperwork' },
    ],
  }
}

function makeStockImages(seed: string) {
  return {
    hero: `https://picsum.photos/seed/${seed}-hero/1200/600`,
    about: `https://picsum.photos/seed/${seed}-about/600/400`,
    cards: Array.from({ length: 14 }, (_, i) => `https://picsum.photos/seed/${seed}-card${i}/600/400`),
    avatar: `https://picsum.photos/seed/${seed}-avatar/200/200`,
  }
}

function makeImages(seed: string, count: number): string[] {
  return Array.from({ length: count }, (_, i) => `https://picsum.photos/seed/${seed}-scraped${i}/1200/800`)
}

const COLOR_PAIRS = [
  { label: 'dark-navy', primaryColor: '#0F2B52', secondaryColor: '#C49A3C' },
  { label: 'light-pastel', primaryColor: '#F2C94C', secondaryColor: '#56CCF2' },
]

const PAGE_SETS = [
  // Matches only About + Contact keywords -> inline nav (<=4 links), no gallery/testimonials/blog links.
  { label: 'core-pages', pages: ['Home', 'About', 'Contact'] },
  // Matches Services + Gallery + About + Testimonials + Blog + Contact -> burger nav (5+ links).
  { label: 'full-pages', pages: ['Home', 'Services', 'Gallery', 'About', 'Testimonials', 'Blog', 'Contact'] },
]

const IMAGE_SETS = [
  // The real default when a preview is built from preset content with no scrape — stock images only.
  { label: 'no-scraped-images', images: [] as string[] },
  { label: 'scraped-images', images: makeImages('fixture', 20) },
]

// A representative BusinessCategory per builder — realistic fixtures and correct
// fontPairings/getFallbackTestimonials category lookups. businessCategory is not
// actually read by any builder body today (confirmed by grep), so this only affects
// realism, not correctness; an unmapped/new builder falls back to 'other', which every
// category-keyed lookup in route.ts also falls back to.
const CATEGORY_BY_BUILDER: Record<string, string> = {
  buildVisualTemplate: 'other',
  buildServiceTemplate: 'other',
  buildPortfolioTemplate: 'creative',
  buildFoodHospitalityTemplate: 'food-hospitality',
  buildRetailTemplate: 'retail',
  buildPetsTemplate: 'pets',
  buildHealthWellnessTemplate: 'health-wellness',
  buildFitnessTemplate: 'fitness-sport',
  buildEducationTemplate: 'education',
  buildProfessionalTemplate: 'professional',
  buildTechDigitalTemplate: 'tech-digital',
  buildTradesTemplate: 'trades-construction',
  buildHomeServicesTemplate: 'home-services',
  buildAutomotiveTemplate: 'automotive',
  buildPropertyTemplate: 'property',
  buildCreativeTemplate: 'creative',
  buildDesignStudioTemplate: 'creative',
  buildEventsTemplate: 'events-entertainment',
}

// ---------------------------------------------------------------------------
// Per-fixture structural assertions
// ---------------------------------------------------------------------------

const FORBIDDEN_LITERALS = ['undefined', 'NaN', '[object Object]', '${']
const INPUT_ZOOM_OVERRIDE = 'input, textarea, select { font-size: 16px !important; }'

function assertStructure(template: string, fixture: string, html: string, cssVarNames: string[]) {
  totalByTemplate.set(template, (totalByTemplate.get(template) || 0) + 1)
  let ok = true
  const need = (cond: boolean, check: string, detail: string) => {
    if (!cond) {
      recordFail(template, fixture, check, detail)
      ok = false
    }
  }

  need(html.length > 0, 'non-empty', 'output was an empty string')
  need(html.includes('<!DOCTYPE html>'), 'doctype', 'missing "<!DOCTYPE html>"')
  need(html.includes('<html'), 'html-tag', 'missing "<html"')
  need(html.includes('<head'), 'head-tag', 'missing "<head"')
  need(html.includes('</body>'), 'body-close', 'missing "</body>"')
  need(html.includes('</html>'), 'html-close', 'missing "</html>"')
  need(html.includes('<meta name="viewport"'), 'viewport-meta', 'missing \'<meta name="viewport"\'')

  for (const bad of FORBIDDEN_LITERALS) {
    const idx = html.indexOf(bad)
    if (idx !== -1) {
      const snippet = html.slice(Math.max(0, idx - 50), idx + bad.length + 50).replace(/\s+/g, ' ')
      need(false, `no-literal:${bad}`, `found literal "${bad}" — context: ...${snippet}...`)
    }
  }

  const divOpen = (html.match(/<div\b/g) || []).length
  const divClose = (html.match(/<\/div>/g) || []).length
  need(divOpen === divClose, 'div-balance', `<div> count ${divOpen} !== </div> count ${divClose}`)

  const secOpen = (html.match(/<section\b/g) || []).length
  const secClose = (html.match(/<\/section>/g) || []).length
  need(secOpen === secClose, 'section-balance', `<section> count ${secOpen} !== </section> count ${secClose}`)

  // Input zoom invariant.
  const overridePresent = html.includes(INPUT_ZOOM_OVERRIDE)
  const inputTagRe = /<(input|textarea|select)\b[^>]*>/gi
  let m: RegExpExecArray | null
  while ((m = inputTagRe.exec(html))) {
    const tag = m[0]
    const fsMatch = tag.match(/font-size:\s*([\d.]+)(px|rem)/)
    if (fsMatch) {
      const val = parseFloat(fsMatch[1])
      const px = fsMatch[2] === 'rem' ? val * 16 : val
      if (px < 16 && !overridePresent) {
        need(false, 'input-zoom', `<${m[1]}> has inline ${fsMatch[0]} (${px}px, <16px) and no global override is present — context: ...${tag.slice(0, 120)}...`)
      }
    }
  }
  need(overridePresent, 'input-zoom-override-present', `missing the global override rule: ${INPUT_ZOOM_OVERRIDE}`)

  for (const varName of cssVarNames) {
    need(html.includes(`${varName}:`), `css-var:${varName}`, `missing CSS custom property declaration "${varName}:" from buildCssVars()`)
  }

  if (ok) passByTemplate.set(template, (passByTemplate.get(template) || 0) + 1)
}

// ---------------------------------------------------------------------------
// Preset coverage: every business-types.ts label must have preset content
// ---------------------------------------------------------------------------

function checkPresetCoverage(): { total: number; missing: string[] } {
  const missing = businessTypeData.filter((e) => !(e.name in presetContent)).map((e) => e.name)
  return { total: businessTypeData.length, missing }
}

// ---------------------------------------------------------------------------
// Dispatch coverage: parse the if/else chain + switch(variant) fallback at the
// bottom of POST, and cross-check against BusinessCategory and the discovered
// builder list.
// ---------------------------------------------------------------------------

function extractBracedBlock(text: string, startMarker: string): string | null {
  const idx = text.indexOf(startMarker)
  if (idx === -1) return null
  const braceStart = text.indexOf('{', idx)
  if (braceStart === -1) return null
  let depth = 0
  for (let i = braceStart; i < text.length; i++) {
    if (text[i] === '{') depth++
    else if (text[i] === '}') {
      depth--
      if (depth === 0) return text.slice(braceStart + 1, i)
    }
  }
  return null
}

interface DispatchReport {
  allCategories: string[]
  categoryResolution: Record<string, string | null>
  unresolvedCategories: string[]
  orphanedBuilders: string[]
  setBranches: { setName: string; builder: string }[]
  issues: string[]
}

function parseDispatch(routeSrc: string, definedBuilders: string[]): DispatchReport {
  const issues: string[] = []

  // 1. The BusinessCategory union member list.
  const catBlockStart = routeSrc.indexOf('type BusinessCategory =')
  const catBlockEnd = catBlockStart === -1 ? -1 : routeSrc.indexOf('\n\n', catBlockStart)
  const categoryBlock = catBlockStart !== -1 && catBlockEnd !== -1 ? routeSrc.slice(catBlockStart, catBlockEnd) : ''
  const allCategories = [...categoryBlock.matchAll(/'([\w-]+)'/g)].map((m) => m[1])
  if (allCategories.length === 0) issues.push('Could not parse the `type BusinessCategory =` union — dispatch coverage skipped for categories.')

  // 2. categoryVariant: Record<BusinessCategory, TemplateVariant> = { ... }
  const categoryVariant: Record<string, string> = {}
  const variantBlock = extractBracedBlock(routeSrc, 'const categoryVariant: Record<BusinessCategory, TemplateVariant> = ')
  if (variantBlock) {
    for (const m of variantBlock.matchAll(/'([\w-]+)':\s*'(\w+)'/g)) categoryVariant[m[1]] = m[2]
  } else {
    issues.push('Could not locate the `categoryVariant` map to parse.')
  }

  // 3. The dispatch block at the bottom of POST: from `let htmlString: string` to the
  //    event-tracking comment right after it's decided.
  const dStart = routeSrc.indexOf('let htmlString: string')
  const dEnd = routeSrc.indexOf('// Track preview generation')
  const dispatchBlock = dStart !== -1 && dEnd !== -1 && dEnd > dStart ? routeSrc.slice(dStart, dEnd) : ''
  if (!dispatchBlock) issues.push('Could not locate the dispatch block (`let htmlString: string` … `// Track preview generation`) in route.ts.')

  // 3a. if / else-if branches: `category === 'x'` or `SET.has(effectiveBusinessType)`.
  const categoryToBuilder: Record<string, string> = {}
  const setBranches: { setName: string; builder: string }[] = []
  // The condition text itself may contain one level of nested parens (e.g.
  // `SET.has(effectiveBusinessType)`), so `[^)]+` alone is not enough — it stops at
  // the first inner `)` and the whole match silently fails. Allow one balanced
  // paren group inside the condition.
  for (const im of dispatchBlock.matchAll(/(?:else )?if \(((?:[^()]|\([^()]*\))+)\)\s*\{\s*htmlString = (build\w+Template)\(/g)) {
    const cond = im[1].trim()
    const builder = im[2]
    const catMatch = cond.match(/^category === '([\w-]+)'$/)
    const setMatch = cond.match(/^(\w+)\.has\(effectiveBusinessType\)$/)
    if (catMatch) categoryToBuilder[catMatch[1]] = builder
    else if (setMatch) setBranches.push({ setName: setMatch[1], builder })
    else issues.push(`Dispatch branch with an unrecognised condition "${cond}" -> ${builder} (not attributed to any category).`)
  }

  // 3b. switch (variant) { case 'x': ... case 'y': default: ... } fallback, with fallthrough.
  const variantToBuilder: Record<string, string> = {}
  const switchBlock = extractBracedBlock(dispatchBlock, 'switch (variant) ')
  if (switchBlock) {
    let pendingLabels: string[] = []
    for (const line of switchBlock.split('\n')) {
      const caseMatch = line.match(/^\s*case '(\w+)':\s*$/)
      const defaultMatch = line.match(/^\s*default:\s*$/)
      const assignMatch = line.match(/^\s*htmlString = (build\w+Template)\(/)
      if (caseMatch) pendingLabels.push(caseMatch[1])
      else if (defaultMatch) pendingLabels.push('__default__')
      else if (assignMatch) {
        for (const label of pendingLabels) variantToBuilder[label] = assignMatch[1]
        pendingLabels = []
      }
    }
  } else {
    issues.push('Could not locate the `switch (variant) { ... }` fallback block to parse.')
  }

  // 4. Resolve each category: explicit branch wins, otherwise fall through its variant.
  const categoryResolution: Record<string, string | null> = {}
  for (const cat of allCategories) {
    if (categoryToBuilder[cat]) {
      categoryResolution[cat] = categoryToBuilder[cat]
      continue
    }
    const variant = categoryVariant[cat]
    const builder = (variant && variantToBuilder[variant]) || variantToBuilder['__default__'] || null
    categoryResolution[cat] = builder
  }
  const unresolvedCategories = allCategories.filter((c) => !categoryResolution[c])

  // 5. A builder is reachable if some category actually resolves to it, or a
  //    businessType-Set branch calls it directly. Builders only ever assigned inside
  //    the switch under a variant that no category's resolution actually reaches
  //    (e.g. a variant fully shadowed by explicit category branches) are orphaned.
  const reachedBuilders = new Set<string>([
    ...Object.values(categoryResolution).filter((b): b is string => !!b),
    ...setBranches.map((b) => b.builder),
  ])
  const orphanedBuilders = definedBuilders.filter((b) => !reachedBuilders.has(b))

  return { allCategories, categoryResolution, unresolvedCategories, orphanedBuilders, setBranches, issues }
}

// ---------------------------------------------------------------------------
// Reporting
// ---------------------------------------------------------------------------

function printTable(builderNames: string[]) {
  const nameWidth = Math.max(8, ...builderNames.map((n) => n.length))
  console.log('\n' + '='.repeat(nameWidth + 28))
  console.log('PER-TEMPLATE RESULTS')
  console.log('='.repeat(nameWidth + 28))
  console.log(`${'TEMPLATE'.padEnd(nameWidth)}  FIXTURES  STATUS`)
  for (const name of builderNames) {
    const total = totalByTemplate.get(name) || 0
    const pass = passByTemplate.get(name) || 0
    const status = pass === total && total > 0 ? 'PASS' : 'FAIL'
    console.log(`${name.padEnd(nameWidth)}  ${String(pass).padStart(2)}/${String(total).padEnd(5)}  ${status}`)
  }
}

async function main() {
  const { mod, builderNames, routeSrc } = await loadBuilders()

  const cssVarNames = [
    ...new Set(
      [...mod.buildCssVars({ headingFamily: "'SmokeTest', serif" }, '#123456', '#654321', 'dark').matchAll(/--([a-zA-Z0-9-]+):/g)].map(
        (m) => `--${m[1]}`,
      ),
    ),
  ]
  if (cssVarNames.length === 0) {
    console.error('buildCssVars() produced no `--var:` declarations to check against — bailing, something is very wrong.')
    process.exit(1)
  }

  const locationInfo = mod.getLocationInfo()

  console.log(`Discovered ${builderNames.length} builder(s): ${builderNames.join(', ')}`)
  console.log(`buildCssVars() exposes ${cssVarNames.length} custom properties: ${cssVarNames.join(', ')}`)

  // ---- per-builder x fixture-matrix run ----
  for (const builderName of builderNames) {
    const builderFn = mod[builderName]
    const category = CATEGORY_BY_BUILDER[builderName] || 'other'
    for (const colors of COLOR_PAIRS) {
      for (const pageSet of PAGE_SETS) {
        for (const imgSet of IMAGE_SETS) {
          const fixtureLabel = `${colors.label} / ${pageSet.label} / ${imgSet.label}`
          const data = {
            content: makeContent(),
            businessName: 'Karoo & Co. Trading',
            businessCategory: category,
            primaryColor: colors.primaryColor,
            secondaryColor: colors.secondaryColor,
            pages: pageSet.pages,
            images: imgSet.images,
            stockImages: makeStockImages(`${builderName}-${colors.label}-${pageSet.label}-${imgSet.label}`),
            variant: 'service',
            locationInfo,
          }

          let html: string
          try {
            html = builderFn(data)
          } catch (err) {
            totalByTemplate.set(builderName, (totalByTemplate.get(builderName) || 0) + 1)
            const detail = err instanceof Error ? `${err.message}\n${err.stack}` : String(err)
            recordFail(builderName, fixtureLabel, 'threw', detail)
            continue
          }

          assertStructure(builderName, fixtureLabel, html, cssVarNames)
        }
      }
    }
  }

  printTable(builderNames)

  // ---- preset coverage ----
  const preset = checkPresetCoverage()
  console.log('\n' + '='.repeat(40))
  console.log('PRESET COVERAGE (constants/business-types.ts -> content.ts)')
  console.log('='.repeat(40))
  console.log(`${preset.total} business types checked, ${preset.missing.length} missing preset content.`)
  if (preset.missing.length > 0) {
    for (const name of preset.missing) {
      recordFail('preset-coverage', name, 'missing-preset', `presetContent["${name}"] does not exist — this business type silently falls through to generic LLM/fallback copy`)
      console.log(`  MISSING: "${name}"`)
    }
  } else {
    console.log('  All business types have preset content. OK.')
  }

  // ---- dispatch coverage ----
  const dispatch = parseDispatch(routeSrc, builderNames)
  console.log('\n' + '='.repeat(40))
  console.log('DISPATCH COVERAGE (POST handler routing)')
  console.log('='.repeat(40))
  for (const issue of dispatch.issues) {
    recordFail('dispatch-coverage', 'parser', 'parse-issue', issue)
    console.log(`  PARSE ISSUE: ${issue}`)
  }
  console.log(`${dispatch.allCategories.length} BusinessCategory value(s) checked.`)
  for (const cat of dispatch.allCategories) {
    const resolved = dispatch.categoryResolution[cat]
    console.log(`  ${cat.padEnd(22)} -> ${resolved ?? 'UNRESOLVED'}`)
  }
  if (dispatch.unresolvedCategories.length > 0) {
    for (const cat of dispatch.unresolvedCategories) {
      recordFail('dispatch-coverage', cat, 'category-no-branch', `BusinessCategory "${cat}" does not resolve to any builder (no explicit branch and no reachable switch/variant fallback)`)
    }
  }
  console.log(`businessType-keyed branches: ${dispatch.setBranches.map((b) => `${b.setName} -> ${b.builder}`).join(', ') || '(none found)'}`)
  if (dispatch.orphanedBuilders.length > 0) {
    for (const b of dispatch.orphanedBuilders) {
      const line = routeSrc.slice(0, routeSrc.indexOf(`function ${b}(`)).split('\n').length
      recordFail('dispatch-coverage', b, 'orphaned-builder', `${b}() is defined at route.ts:${line} but is never reachable from the POST dispatch chain`)
      console.log(`  ORPHANED: ${b}() — defined but never called from dispatch (route.ts:${line})`)
    }
  } else {
    console.log('  Every defined builder is reachable from dispatch. OK.')
  }

  // ---- summary ----
  const totalFixtureChecks = [...totalByTemplate.values()].reduce((a, b) => a + b, 0)
  const passFixtureChecks = [...passByTemplate.values()].reduce((a, b) => a + b, 0)

  if (failures.length > 0) {
    console.log('\n' + '='.repeat(40))
    console.log('FAILURES')
    console.log('='.repeat(40))
    for (const f of failures) {
      console.log(`\n[${f.template}] fixture: ${f.fixture}`)
      console.log(`  check: ${f.check}`)
      console.log(`  ${f.detail}`)
    }
  }

  console.log('\n' + '='.repeat(40))
  console.log('SUMMARY')
  console.log('='.repeat(40))
  console.log(`Templates: ${builderNames.length}. Fixture renders: ${totalFixtureChecks} (${passFixtureChecks} passed). Preset coverage: ${preset.total - preset.missing.length}/${preset.total}. Dispatch: ${dispatch.allCategories.length - dispatch.unresolvedCategories.length}/${dispatch.allCategories.length} categories resolved, ${builderNames.length - dispatch.orphanedBuilders.length}/${builderNames.length} builders reachable.`)
  console.log(`Total failures: ${failures.length}`)

  if (failures.length > 0) {
    process.exit(1)
  }
}

main().catch((err) => {
  console.error('Smoke test crashed:', err)
  process.exit(1)
})
