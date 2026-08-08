# Mountain Studios — Agency Backend

## Project Overview
- **Stack**: Next.js 14 App Router, TypeScript, Supabase, Anthropic SDK, Pexels API
- **Purpose**: Web design agency platform — clients fill a brief, system generates a single-page HTML website preview
- **Repo**: `hugodrummon/mountain-studios` (private)
- **Dev server**: `localhost:3000`

## Current status

**See [STATUS.md](STATUS.md)** for where the project stands, and [TODO.md](TODO.md) for
outstanding work. Do not record session state here — this file is for the durable facts
about the codebase that stay true between sessions.

## Notes

### Architecture
- `constants/business-types.ts` — the 153 business types, single source of truth. Both the intake
  form and the brief page import it. Every name here must have a matching preset in `content.ts`,
  keyed on the exact string; adding one without the other silently downgrades that business to
  LLM-generated copy.
- `content.ts` (17k lines) — static preset content keyed by exact business type name (e.g. `"Plumber"`, `"Lawyer / Attorney"`)
- `route.ts` POST handler checks `presetContent[businessType]` first; only calls Claude API if no preset exists
- 3 template builders: `buildVisualTemplate()`, `buildServiceTemplate()`, `buildPortfolioTemplate()` — all share `buildAboutSection()`, `buildContactSection()`, `buildNav()`, `buildFooter()`, `buildHead()`
- Category-to-variant mapping: `categoryVariant` record maps 15 `BusinessCategory` values to `'visual' | 'service' | 'portfolio'`
- Theme: `type Theme = 'dark' | 'light'` — service variant uses light except `tech-digital` which is dark
- `fetchStockImages()` accepts `ImageQueries` with per-section Pexels search queries; falls back to generic business type search

### Key Decisions
- **South Africa only.** No country picker, no geo-detection, no multi-currency. The UK region was formally dropped; `getLocationInfo()` returns a Cape Town address and nothing else.
- **No computed pricing.** The GBP price list, the FX engine (`lib/fx.ts`, `app/api/fx/*`, `worker/fx_worker.py`) and the parallel ZAR list in `constants/pricing.ts` are all deleted. Price is agreed per job and entered in rands by an admin on `send-brief`, which is the only writer of `briefs.final_price_local`; the 50% deposit derives from it. Floor R800, enforced server-side. `create-checkout` refuses to run without an amount, so do not remove that field.
- **Any SA business, not trades.** Trades are 1 of 15 categories and 17 of 153 types. Do not let trades lead in copy, placeholders or default lists.
- Pre-written content over AI generation: avoids latency, cost, and quality inconsistency. Claude fallback only for "Other" or custom types.
- South African copywriting voice: all 151 presets written with Cape Town context (SARS, CoC, NHBRC, SAPVIA, etc.)
- Unicode symbols for service icons instead of SVG icon library: keeps HTML self-contained with zero external dependencies
- Single HTML file output: entire preview is one self-contained HTML string with inline styles, Google Fonts link, and Pexels image URLs
- `heroBgImageQuery` for service variants: uses dark/moody background images instead of forcing bright stock photos on businesses like plumbers and electricians
- **15-category redesign**: replacing 3 generic variants with 15 category-specific templates inspired by real reference websites. Each category gets a distinct layout optimized for its business type (e.g. tabbed menus for food, membership cards for health, tabbed galleries for property).
- **Architect** belongs in `creative` category (not `property`) — portfolio-style template suits architects better.

### Design System
**READ `DESIGN_SYSTEM.md` before making ANY site page (home, about, contact, portfolio) changes.** It defines the Alpine Mist design language: gradient backgrounds, Noto Serif + Plus Jakarta Sans typography, glassmorphism cards, no-line rule, surface hierarchy. All Mountain Studios site pages must follow this system.

### QA Rules
**READ `QA_RULES.md` before making ANY template or content.ts changes.** It contains mandatory rules for images, layout, testimonials, and headings. Every image query must be tested against the "would a stranger know what business this is?" test.

### Debugging
- If images don't load: check `PEXELS_API_KEY` env var; falls back to picsum.photos placeholders
- If content shows raw descriptions: JSON parse failed; check `max_tokens` (currently 768) and JSON extraction retry logic
- All `npx tsc` errors are from `node_modules` — ignore them; our code compiles clean
- `next build` failure is from `/api/admin/leads/[id]/send-brief` needing `SUPABASE_URL` — unrelated to preview system
- **20MB message limit**: when sending many screenshots in a single Claude Code session, total message size can exceed 20MB. Compress screenshots or use WebFetch URLs instead.
