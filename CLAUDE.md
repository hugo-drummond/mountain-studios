# Mountain Studios — Agency Backend

## Project Overview
- **Stack**: Next.js 14 App Router, TypeScript, Supabase, Anthropic SDK, Pexels API
- **Purpose**: Web design agency platform — clients fill a brief, system generates a single-page HTML website preview
- **Repo**: `hugodrummon/mountain-studios` (private)
- **Dev server**: `localhost:3000`

## Last Session (2026-03-17)

### What was done
1. **Merged all 8 batch content files** into `app/api/preview/generate/content.ts` — now contains **151 pre-written business types** across 15 categories. No Claude API fallback needed for any standard business type.
2. **Batch files merged**: batch1 (food-hospitality, 15), batch2 (retail, 15), batch3 (health-wellness, 15), batch4 (fitness-pets-events, 22), batch5 (trades-construction, 17), batch6 (professional + home-services, 23), patch-batch7-missing (6), batch7 (education-auto-tech-other, 20 new), batch8 (creative-property, 18 including Print Shop/Signage)
3. **New fields added to PresetContent interface**: `processSteps` (service variant), `heroBgImageQuery` (dark hero bg for service businesses), `icon` on services (mapped to Unicode symbols), `contactHours` (2-column contact section)
4. **Icon mapping system**: 50+ Lucide/Feather icon names mapped to Unicode symbols for service template cards (e.g. `droplet` -> water drop, `zap` -> lightning, `shield` -> shield)
5. **heroBgImageQuery support**: Service variant hero backgrounds now use targeted dark/moody Pexels queries instead of generic business type searches
6. **About section layout fix**: Moved `aboutText` paragraphs from right column to left column, directly below `aboutMission`. Left column: heading + mission + text. Right column: stats grid + testimonial.
7. **Squashed all WIP auto-save commits** into a single clean commit and force-pushed to GitHub.

### What's working
- All 3 template variants render correctly: **visual** (photo-heavy), **service** (icon cards + process steps), **portfolio** (gallery-focused)
- 151/151 business types have pre-written content with targeted Pexels image queries per section
- Contact section: 2-column layout with trading hours (when `contactHours` exists), single-column centered (when absent)
- Testimonial cards with star ratings render in about section
- Badge pills, heroAccent, ctaNote all render in hero sections
- Stats with sublabels render correctly
- Service template: light theme (most categories) and dark theme (tech-digital only)
- Download HTML and Save as PDF buttons functional

### What's partially working
- `next build` fails on an unrelated route (`/api/admin/leads/[id]/send-brief`) due to missing `SUPABASE_URL` env var at build time — not related to preview system
- TypeScript `npx tsc --noEmit` shows errors only in `node_modules` (Next.js/Anthropic SDK type mismatches) — our code is clean
- Claude AI fallback for unknown business types works but generates less polished content than presets

## Next Steps (Priority Order)

1. **Test all 15 categories** — generate a preview for one type from each category and verify layout, images, and content render correctly:
   - Visual: Restaurant, Boutique/Fashion Store, Dentist, Personal Trainer, Dog Groomer, Event Planner
   - Service: Plumber, Lawyer/Attorney, Cleaning Service, Music Teacher, Car Dealership, Web Developer/Designer, Other
   - Portfolio: Photographer, Real Estate Agent
2. **Mobile responsiveness** — all templates use CSS grid with fixed columns; needs media queries or responsive breakpoints for mobile/tablet
3. **Portfolio variant `projectCaptions`** — batch8 creative types include `projectCaptions` array but verify the portfolio template actually renders them in the gallery
4. **OG image support** — all presets have `ogImageQuery` but it's not used anywhere yet; could generate an OG meta tag
5. **User-uploaded images** — verify user images override stock images correctly in all 3 variants
6. **PDF generation quality** — test Save as PDF across different template variants
7. **Build fix** — resolve `SUPABASE_URL` env var issue in admin route so `next build` succeeds

## Blockers

- **None currently** — all content is merged, all templates render, dev server works

## Notes

### Architecture
- `content.ts` (14k lines) — static preset content keyed by exact business type name (e.g. `"Plumber"`, `"Lawyer / Attorney"`)
- `route.ts` POST handler checks `presetContent[businessType]` first; only calls Claude API if no preset exists
- 3 template builders: `buildVisualTemplate()`, `buildServiceTemplate()`, `buildPortfolioTemplate()` — all share `buildAboutSection()`, `buildContactSection()`, `buildNav()`, `buildFooter()`, `buildHead()`
- Category-to-variant mapping: `categoryVariant` record maps 15 `BusinessCategory` values to `'visual' | 'service' | 'portfolio'`
- Theme: `type Theme = 'dark' | 'light'` — service variant uses light except `tech-digital` which is dark
- `fetchStockImages()` accepts `ImageQueries` with per-section Pexels search queries; falls back to generic business type search

### Key Decisions
- Pre-written content over AI generation: avoids latency, cost, and quality inconsistency. Claude fallback only for "Other" or custom types.
- South African copywriting voice: all 151 presets written with Cape Town context (SARS, CoC, NHBRC, SAPVIA, etc.)
- Unicode symbols for service icons instead of SVG icon library: keeps HTML self-contained with zero external dependencies
- Single HTML file output: entire preview is one self-contained HTML string with inline styles, Google Fonts link, and Pexels image URLs
- `heroBgImageQuery` for service variants: uses dark/moody background images instead of forcing bright stock photos on businesses like plumbers and electricians

### Debugging
- If images don't load: check `PEXELS_API_KEY` env var; falls back to picsum.photos placeholders
- If content shows raw descriptions: JSON parse failed; check `max_tokens` (currently 768) and JSON extraction retry logic
- All `npx tsc` errors are from `node_modules` — ignore them; our code compiles clean
- `next build` failure is from `/api/admin/leads/[id]/send-brief` needing `SUPABASE_URL` — unrelated to preview system
