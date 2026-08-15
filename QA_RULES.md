# QA Rules for Generated Website Previews

These rules apply to every generated HTML preview. Memorise them before making any template or content changes.

## Image Rules

### Pexels is a PHOTOGRAPHY platform
- It has real photos of real things: people, rooms, buildings, food, animals, tools, vehicles
- It does NOT have: screenshots, software UIs, animation frames, digital art, logos, illustrations, app mockups
- **Never write queries for things that don't exist as photographs** (e.g. "animation timeline software" or "Shopify dashboard")
- Instead, photograph the PERSON doing the work: "designer working at desk with computer monitors" not "UI design wireframe mockup"

### Every image must pass this test:
1. **Would a stranger know what business this is from the image alone?** If the image could belong to any random business, it fails.
2. **Is the subject of the photo the actual business activity?** A wheat field fails for a plumber. A sunset fails for a tyre shop. An abstract shape fails for everything.
3. **No nature/landscape photos** unless the business IS nature (landscaper, garden centre, safari).
4. **No generic stock photos** of people in suits shaking hands, corporate meeting rooms, or coffee cups — unless the business is literally a coffee shop or consulting firm.

### Pexels query writing rules:
- Start with the SUBJECT: the person, the product, or the workspace
- Add the SETTING: workshop, kitchen, salon, gym, office, garden
- Add a DETAIL: tools in hand, close-up, bright lighting, modern interior
- Example: "plumber lying under kitchen sink fitting copper pipe wrench"
- Minimum 6 words per query
- Test mentally: "Would someone upload this photo to Pexels with this description?"

## Template Layout Rules

### Navigation
- 4 or fewer nav links: show inline links + CTA button. No burger menu.
- 5+ nav links: CTA button + burger menu icon.
- On mobile: always show burger, hide inline links.

### Section ordering (all templates)
- Hero section is ALWAYS first
- Stats/trust bar comes early (top third)
- Services/offerings in the middle
- Testimonials, about, and team sections go in the LOWER half
- "Meet the Team" / service showcase cards must be ABOVE "See All Projects" / portfolio grid
- Contact section is ALWAYS last (before footer)

### Mobile (≤768px)
- The shared mobile rules live in `buildCssVars`, in its `@media (max-width: 768px)` block. They hit **every** template, so any change there must be re-rendered against all fifteen before it ships.
- Multi-column grids collapse to one column. A grid only collapses if it carries `.ms-grid` or is declared inline on the hero section (or one level below it) — a grid that is neither stays multi-column on a phone and crushes its text.
- Hero fills the screen: `min-height:100svh`. Use `svh`, never `dvh` — `dvh` resizes the hero mid-scroll when the address bar hides.
- The 1.25rem side gutter is for text columns only. Never apply it to a full-bleed layer: it insets a hero photo to 389px on a 429px screen and leaves grey bands down both edges.
- Content clears the fixed nav with a 5.5rem top pad — content layers only, never a photo layer.
- **Split heroes** (image column + text column: health-wellness, creative, education, retail, home-services) put the photo full-bleed behind the copy, with a scrim and white type. `.ms-hero-photo` and `.ms-hero-text` are the hooks. Anything positioned inside the image column for the desktop layout — badges, gradient overlays — must be hidden, or it lands on top of the copy.
- Text forced white must account for ghost CTAs. They declare `background:transparent`, so a "skip anything with its own background" exclusion skips them too and leaves ink text on a dark photo.
- A transparent nav over a photo hero needs its logo and burger inverted until it picks up its scrolled background.

### Testimonials
- Every testimonial must have a real-sounding name + role (e.g. "Sarah M., Homeowner")
- Never use service names, placeholder text, or "model C" as reviewer names
- Each of the 3 testimonials on a page must be unique — different quote, different name
- Heading should say "Clients" not "Patients" (unless it's a medical practice)

### Headings
- Section headings must match the business type (not hardcoded generic text)
- "3 Simple Steps To Get Your Child Back On Track" is WRONG for driving schools, training academies, language schools
- Use `content.servicesHeading`, `content.galleryHeading`, `content.stepsHeading` from content.ts — never hardcode

### Content matching
- Stats must have clear labels (not just "10" or "0" with no context)
- Service descriptions must match the business type (no cross-contamination between types)
- CTA button text should be specific to the industry ("Book a Table" not "Get Started")

## Common Pexels failures by category

These categories consistently return bad results. Use these proven query patterns:

| Category | BAD query (returns garbage) | GOOD query (returns relevant photos) |
|----------|---------------------------|--------------------------------------|
| Tech/Digital | "cybersecurity dashboard" | "person typing on laptop dark room multiple monitors" |
| Animation | "animation timeline software" | "creative person drawing on graphics tablet at desk" |
| Music Production | "mixing console DAW" | "person wearing headphones at desk with speakers studio" |
| Print/Signage | "large format printer banner" | "person holding large printed poster workshop" |
| Education | "online learning platform" | "teacher standing at whiteboard students classroom" |
| Automotive | "engine diagnostic scan tool" | "mechanic under car bonnet working with wrench garage" |

## How to verify changes

All twenty-two `buildXTemplate()` functions live in `app/api/preview/generate/route.ts`. The `templates/` directory at the repo root is dead — nothing imports it.

After changing any image queries or template code:

1. Start the dev server. **Never run `next build` while it is running** — both write `.next`, and React then silently stops hydrating: the page still looks right and no event handler fires. The dev server also dies on hot-reload of a file this size; just restart it.
2. POST to `/api/preview/generate` with `businessName`, `businessType` and `businessCategory`. No `recaptchaToken` is needed — `blockedAsBot()` is an allowlist.
3. **`businessType` must be an exact wizard dropdown label** from `constants/business-types.ts` — "Bakery", "Lawyer / Attorney", "Boutique / Fashion Store". Free text ("bakery", "plumber") matches no preset in `content.ts`, silently falls back to generic copy, and makes every template look identically bland. Testing with free text tells you nothing about the template.
4. The rate limit is 5/hour keyed on the `x-forwarded-for` header. Send a unique one per request, and use a counter — `$RANDOM` collides and you get 429s.
5. Open the generated HTML in a browser at **both** 1440×900 and 429×725. Most template rules are desktop-only or mobile-only; one width proves nothing about the other.
6. Screenshot after the page has settled. These templates fade content in on load, so a capture taken immediately shows ghosted text and reads as a contrast bug that isn't there.
7. Check EVERY image on the page — not just the hero.
8. If any image shows nature, landscapes, abstract art, or unrelated products: the query failed.
9. `npx tsc --noEmit` is the only usable check in this repo. **`npx next lint` does not work** — there is no ESLint config, so it opens an interactive prompt and hangs.
10. Shared CSS (anything in `buildCssVars`) means a change to one template is a change to all fifteen. Re-render all of them.
