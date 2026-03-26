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

After changing any image queries or template code:
1. Run the dev server: `npm run dev`
2. POST to `/api/preview/generate` with a test business type
3. Open the generated HTML in a browser
4. Check EVERY image on the page — not just the hero
5. If any image shows nature, landscapes, abstract art, or unrelated products: the query failed
