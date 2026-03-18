# Mountain Studios — Agency Backend

## Project Overview
- **Stack**: Next.js 14 App Router, TypeScript, Supabase, Anthropic SDK, Pexels API
- **Purpose**: Web design agency platform — clients fill a brief, system generates a single-page HTML website preview
- **Repo**: `hugodrummon/mountain-studios` (private)
- **Dev server**: `localhost:3000`

## Last Session (2026-03-18, session 2)

### What was done
1. **Built `buildPropertyTemplate()`** — dedicated property template inspired by 505statestreet.com. Structure: pill-button nav → full-bleed hero (headline bottom-left) → atmospheric full-width photo → large serif statement → alternating 60/40 service splits (zigzag) → lifestyle photo overlay → stats row → asymmetric gallery grid → 50/50 about + image → contact form → giant brand name footer. Wired into POST handler (`if (category === 'property')` before the variant switch).
2. **Reference site for tech-digital** — plain.com selected, screenshots partially collected (session hit context limit before completion).

### What's working
- All 3 template variants render correctly: **visual** (photo-heavy), **service** (icon cards + process steps), **portfolio** (gallery-focused)
- 151/151 business types have pre-written content with targeted Pexels image queries per section
- Preview opens directly in new browser tab on click
- Navbar logo renders as a proper uppercase wordmark with heading font
- heroAccent and aboutMission text now readable in all themes
- Contact section: 2-column layout with trading hours (when `contactHours` exists), single-column centered (when absent)
- Testimonial cards with star ratings render in about section
- Badge pills, heroAccent, ctaNote all render in hero sections
- Stats with sublabels render correctly
- Service template: light theme (most categories) and dark theme (tech-digital only)

### What's partially working
- `next build` fails on an unrelated route (`/api/admin/leads/[id]/send-brief`) due to missing `SUPABASE_URL` env var at build time — not related to preview system
- TypeScript `npx tsc --noEmit` shows errors only in `node_modules` (Next.js/Anthropic SDK type mismatches) — our code is clean
- Claude AI fallback for unknown business types works but generates less polished content than presets

## Next Steps (Priority Order)

### 1. Complete 15-category template redesign (IN PROGRESS)
Collecting a reference website per category, extracting the homepage structure, then rebuilding each category as its own template function. This replaces the current 3-variant system with 15 distinct layouts.

**Reference sites collected so far:**
- **food-hospitality** — [crafto.themezaa.com/restaurant](https://crafto.themezaa.com/restaurant/): full-screen hero + stats row + split about + tabbed menu + card carousel + testimonials
- **retail** — [taiping.co.nz](https://www.taiping.co.nz/): red accent nav + hero + stats row + 50/50 split about + 50/50 locations + 2x2 department cards + brand logos + footer
- **health-wellness** — [iveeapp.com](https://www.iveeapp.com/): pastel blue palette + 50/50 hero + mission split + navy stats row + services accordion with card carousel + membership cards with bullet lists + team carousel + testimonial color cards + contact cards
- **property** — [505statestreet.com](https://505statestreet.com/): minimal nav with pill buttons + full-bleed hero + centered statement + tabbed amenity galleries + floor plan tabs + day/night toggle + sustainability icons + CTA

**Template functions built:**
- **property** — `buildPropertyTemplate()` in route.ts (505 State Street–inspired)

**Still need reference sites + templates for (10 remaining):**
- fitness-sport
- pets
- events-entertainment
- creative
- trades-construction
- professional
- home-services
- education
- automotive
- tech-digital (reference: plain.com — screenshots incomplete, need to re-capture)
- other

**Implementation plan:**
1. Collect all 15 reference site structures
2. Create `buildFoodHospitalityTemplate()`, `buildRetailTemplate()`, etc. — one function per category
3. All share `buildNav()`, `buildFooter()`, `buildHead()`, `buildAboutSection()`, `buildContactSection()`
4. Update POST handler to call category-specific builder
5. Test one business type per category

### 2. Mobile responsiveness
All templates use CSS grid with fixed columns; needs media queries or responsive breakpoints for mobile/tablet.

### 3. Other pending items
- Portfolio variant `projectCaptions` — verify rendering in gallery
- OG image support — presets have `ogImageQuery` but not used yet
- User-uploaded images — verify override works in all variants
- PDF generation quality — test across variants
- Build fix — resolve `SUPABASE_URL` env var issue in admin route

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
- **15-category redesign**: replacing 3 generic variants with 15 category-specific templates inspired by real reference websites. Each category gets a distinct layout optimized for its business type (e.g. tabbed menus for food, membership cards for health, tabbed galleries for property).
- **Architect** belongs in `creative` category (not `property`) — portfolio-style template suits architects better.

### Debugging
- If images don't load: check `PEXELS_API_KEY` env var; falls back to picsum.photos placeholders
- If content shows raw descriptions: JSON parse failed; check `max_tokens` (currently 768) and JSON extraction retry logic
- All `npx tsc` errors are from `node_modules` — ignore them; our code compiles clean
- `next build` failure is from `/api/admin/leads/[id]/send-brief` needing `SUPABASE_URL` — unrelated to preview system
- **20MB message limit**: when sending many screenshots in a single Claude Code session, total message size can exceed 20MB. Compress screenshots or use WebFetch URLs instead.
