# Status

Last updated: 24 August 2026 (preview offer card fixed and reworked; claim details now reach the lead; every public form verified end to end; rate limits raised for paid traffic; delete added to the CRM)

## Where things stand

Every public form was submitted on production on 24 August and the resulting row read back:
the wizard gate step and final brief, the contact form, the free audit popup, referral signup,
the chatbot both for plain capture and for running an audit, and the preview claim form. All
recorded correctly and all their emails arrived in the Primary inbox on a fresh Gmail. Test
data has been cleared.

Not yet verified: `/brief/[id]` and the brief invitation email that leads to it, the careers
application, `/momentbank`, and the daily audit sweep cron. The Meta Pixel is still not
installed, which is the one thing that actually gates advertising.
Refer to [TODO.md](TODO.md) for the list.

## Careers page — `/careers/sales-rep`

Live in the repo, pushed, deploying. The landing target for a LinkedIn job post.

- States the commission terms in full: 20% of each sale, 15% of the monthly retainer,
  and does not hide that the residual stops when a rep stops selling
- An earnings calculator lets a candidate work their own numbers rather than being shown
  a flattering example
- Application form writes to `mountainstudios.rep_applications` with a required PDF CV
  in the private `rep-cvs` bucket
- CV is now mandatory, and must be PDF. The requirement is verified by reading the first
  five bytes for the PDF magic number (`%PDF-`) rather than MIME type, because Android
  file pickers report `application/octet-stream` for genuine PDFs — falling back to
  extension checking would mean turning away real applicants. When uploaded, the file is
  stored as `application/pdf` so browsers open it instead of downloading it when a reviewer
  clicks to preview. The required-field check lives in the submit handler rather than the
  input itself: the input is positioned off-screen, and Chrome refuses to submit a form
  containing a required control it cannot focus.
- Linked from the homepage footer only. Not in the main nav

**Deliberately sends no notification email.** A public ad produces hundreds of
applications and most are junk; burying a real person in an inbox is worse than sending
nothing. Applications are reviewed in the CRM at crm.mountainstudios.co.za/applications
behind Supabase auth, not a shared admin password.

**Unresolved:** the page publicly states retainers run R350–R900 a month. That number was
invented — nothing in the repo records the real one, and it sets what reps expect to earn
and what they quote clients.

## Shared client previews

Built and tested end to end, committed. A rep saves a generated preview and gets a link
to paste into WhatsApp or their own email; the client opens their real site on their own
phone.

- Finished HTML stored as-is, so what the rep pitched is what the client sees later
- Unguessable token instead of a login, served `noindex`, expires after 30 days into a
  page that explains itself
- View counts ignore link-preview bots. WhatsApp fetches every URL the moment it is
  pasted, so counting those would tell a rep their client had opened the preview the
  instant they hit send
- "I want this website" stamps the preview, creates or qualifies the CRM lead, and emails
  `hello@`. Unlike applications this one notifies: a claim is rare and goes stale in hours
- Reviewed at `/admin/previews` with copy-link and revoke

**Reps send links themselves, from their own addresses.** Nothing mails on their behalf —
thirty people prospecting through the company's SES identity would put the domain's
sending reputation, and every invoice depending on it, behind their cold outreach. POPIA
consent for direct electronic marketing also sits with whoever sends.

Reps have no button yet: the CRM has no preview UI, though its `leads` table already has
`mockup_ready` and `mockup_url` waiting.

## Get Started wizard — lead capture timing

The wizard now writes a lead to the database at step 6, before the preview is built. Until
10 August, nothing was saved until the final step, so anyone who watched their site being
generated and then closed the tab left no trace — no lead, no record that they had been
interested.

When the user enters their business name, category, page selections, and style, `POST
/api/brief/partial` writes to `mountainstudios.leads` with status INCOMPLETE. Later, if
they finish and submit the email, `POST /api/brief/submit` updates that same row instead
of inserting a second one, identified by the id returned to the client on create. The
fallback — if the client-side id is lost — is a 30-day email match. This way, one person
maps to one lead whether or not they finish the wizard, and the CRM sees the moment they
started paying attention, not just the moment they finished.

## Homepage — rebuilt 13 August 2026

`app/page.tsx` was rewritten end to end against Hugo's mockups. The page now leads with
the thing that actually sells — the free preview — instead of the old "Web Design Done
Simply" hero. Order: top bar, hero with a business-name input, stats, reviews, packages,
work grid, R1,000 referral block, FAQ, final CTA, footer, and a floating pill. The free
audit sat between the work grid and the referral block until 16 August; it is now a popup
and lives nowhere on the page — see "Free audit popup" below.

- **The hero input is the funnel.** Typing a business name goes to
  `/start-your-project?name=<typed>`, and the wizard prefills step 1 from the query
  string. It reads `window.location.search` in an effect rather than `useSearchParams`,
  which would need a Suspense boundary and fails the Next 14 build without one.
- **The audit and referral forms were UI only when this section was written** — no API, no
  network call, so anyone who filled them in was lost. Both have had real backends since
  15 August, and the audit has since moved out of the page entirely.
- **Typography changed.** Playfair Display now sets every heading, alongside Source Sans 3
  for body. Registered in `app/layout.tsx` as `--font-playfair`.
- **`globals.css` placeholder trap.** A global `::placeholder { color: rgba(255,255,255,
  0.75) !important }` dated from when every input sat on a dark section. The new page is
  mostly white pills, so that rule made four placeholders invisible. It is now scoped to
  `.ms-dark`; anything dark that relies on white placeholder text must carry that class.
- Styling is inline, matching the rest of the file, with one `<style>` block at the bottom
  for keyframes and the `.ms-*` media queries.

**Deleted:** the About block (and with it the only use of `public/images/team/
hugo-drummond.jpg`) and the dark contact form. `POST /api/contact/submit`,
`mountainstudios.contact_messages` and the admin inbox are all still live — the homepage
just no longer writes to them. The homepage now captures nothing directly; every route to
a lead goes through the wizard.

**Placeholder content in the page, all marked TODO:** `WHATSAPP_NUMBER` is a dummy
(`27000000000`) and the top bar and footer still link to it (the chat pill no longer does
— see the chatbot section); the three reviews are placeholder text with a placeholder
count and Google link; footer social links are `#`.

## Homepage annotation pass + A/B test — 13 August 2026, afternoon

A second pass over the rebuilt homepage against Hugo's annotated screenshots, plus a
floating-CTA split test:

- **Nav pill** is now near-opaque white with navy text and a navy CTA button.
- **Mountains redrawn.** The jagged light peaks are now smooth rolling hills — three
  Q-curve SVG layers, viewBox 1440×280, fills `rgba(26,26,46,.18/.30/.42)` — in both the
  hero and the referral section. The referral hills are anchored to the section bottom so
  the sky above the heading stays clear.
- **Reviews section restyled as Google review widgets.** The summary card carries the
  coloured Google wordmark, "Mountain Studios", a large 4.9 beside gold stars, a
  "Read our XX Reviews" link and a black "Write a review" pill. Individual cards get an
  avatar circle with initial, name, a relative timestamp, stars, the review text and a
  "View on Google" footer with the Google G. Text is still placeholder; the links still
  go to `#` until real review URLs exist. **Superseded 16 August 2026** — real names and
  wording, and every dead link removed.
- **FAQ**: "FAQ" is now the section's large serif header ("Questions people actually ask."
  removed), and the pink highlight fills the whole open item, answer included.
- **Work section**: "SEE THE BRANDS WE'VE BUILT" is a proper centred serif heading.
- **A/B test — retired 16 August 2026**, see "Header, chatbot launcher and reviews pass" below.
  Every visitor now gets the chat launcher. Kept here for what it was:
  The floating bottom-right button is a 50/50 split: variant `site` is a
  "SEE YOUR NEW SITE →" pill that scrolls to and focuses the hero input; variant `chat` is
  a "Chat with us" pill which, since 14 August, opens the on-site chatbot — it was a
  WhatsApp link to the dummy number until then. Assignment is sticky via
  `localStorage.ms_variant`, `?v=1|2` overrides for preview, clicks fire the GA event
  `float_cta_click`, and the wizard stamps `Homepage variant: …` into the lead's notes via
  both brief endpoints — win rate is a count of leads by that line. No schema change.

## Service pages — 14 August 2026

Four individual service pages built as one repeated template, replacing the dead
"LEARN MORE →" links on `/services`: `/services/web-design`, `/services/paid-ads`,
`/services/aeo`, `/services/business-automation`.

- **`PageShell` gained two optional props, `heroImage` and `heroCta`.** When passed, the
  hero switches from the original centred single-column layout to a two-column one — copy
  and a CTA button on the left, `heroImage` on the right, using the existing
  `page-shell-grid` class so it collapses to one column on mobile the same way `/about` and
  `/work` already do. Neither prop is passed on `/about`, `/work`, `/services` or `/contact`,
  so all four render exactly as before.
- **New `components/site/DeviceMockup.tsx`** — a CSS laptop frame around a screenshot,
  reused across all four pages. Each page shows a different real portfolio screenshot
  (Coimbra Bakery, Bali Blinds, Pie in the Sky, Hout Bay Curtain Call) rather than a
  generic mockup.
- **Each page ships its own `generateMetadata`** — the first per-page SEO titles/descriptions
  anywhere on the site. Every other subpage is still `'use client'` with no metadata of its
  own and inherits the single root-layout title.
- **Copy is grounded in `lib/chatbot/knowledge.ts`.** Web design has three solid feature
  points to draw on (mobile-first, ~14-day build, one person start to finish, what's
  included). Paid ads, AEO and business automation only have one line each in the knowledge
  base, so their feature cards stay deliberately conservative — no invented tactics,
  stats or process detail beyond what that file and the "How we work" section actually say.
- Hero CTA on all four routes to `/start-your-project`, the existing working wizard —
  `PageShell`'s own bottom CTA band is unchanged and still just redirects home on submit
  (see the `page-shell-grid` trap note above; that band was never wired to an endpoint).

**Not done:** `lib/chatbot/knowledge.ts` still only knows about `/services` as one page —
the bot cannot point a visitor at an individual service page. `/services`'s own
"LEARN MORE →" buttons are still `href="#"`, not yet pointed at these four routes.

## Chat CTA resized — 14 August 2026

The `chat` A/B pill (`app/page.tsx`) was easy to miss at its original size. Doubled every
dimension (padding, font size, icon, gap) and changed the copy from "Chat with us" to
"Chat with us - we reply instantly" to push clicks. `site` variant and the widget panel it
opens (`components/site/ChatWidget.tsx`) are unchanged.

## Standalone pages — 13 August 2026

Four new routes built from Hugo's page mockups, all on a shared shell
(`components/site/PageShell.tsx`: top bar, six-link nav pill, gradient hero with the
rolling-hills SVG, "See what yours could look like" CTA band, footer). The homepage does
not use the shell; its markup is still self-contained.

- **`/about`** — "We build the website, then we stay for the boring part." plus a single
  "How the studio works" section with a photo card. The mockup's story timeline and
  careers sections were cut on Hugo's annotation. The photo card carries the real founder
  photo since 17 August (`public/images/team/hugo-drummond.jpg`, `next/image` `fill`).
- **`/work`** — case-study list of all six portfolio brands with category, name, blurb
  and a "VIEW THE SITE" button. Buttons go to `#`; no live client URLs are recorded
  anywhere in the repo yet.
- **`/services`** — the four offer cards (Web design, Paid ads, AEO, Business
  automation), kept compact per the annotation; the mockup's "How it runs" process
  section was cut.
- **`/contact`** — WhatsApp / email / hours column beside a contact form, with a stats
  band underneath (50+ sites, 4.9 rating, 14 days — the real homepage stats, not the
  mockup's filler). **The form is front-end only**: submit shows a thank-you and sends
  nothing. `POST /api/contact/submit`, `mountainstudios.contact_messages` and the CRM
  inbox are all still live and could be wired straight in.

The nav on every page (homepage included) now reads WORK · SERVICES · PRICING · REFER ·
ABOUT · CONTACT, with PRICING and REFER still homepage anchors.

**The client supplies the content — corrected 17 August 2026.** Three surfaces promised the
opposite: the homepage FAQ answer on turnaround, the "What you get" paragraph on
`/services/web-design`, and a bullet in `lib/chatbot/knowledge.ts`, which meant the bot repeated
the promise on demand. All three now say the words and images for each page come from the client
and we design around them. A copy claim that lives in the chatbot knowledge file is a promise the
bot will make in conversation — anything about scope has to be changed in both places at once.

## Screenshot pass — 13 August 2026, evening

Commit `499140e`, live and verified. A third round against Hugo's annotations, and the
first pass where the site shows real client work rather than composed stand-ins.

**Client screenshots are real now.** All six portfolio images were captured from the live
sites with Playwright at a 1440×810 viewport and written over the old files in
`public/images/portfolio/`. `alistair-drummond.jpg` is a copy of `ada.jpg` used by the hero
mock. Alistair Drummond's hero rotates its image, so that shot differs between captures.

**Home.** Stars are `#F5B301` everywhere. The Google card lost its "Read our XX Reviews"
link and its button now reads "All reviews" — still with no href. Referral steps are bolder
and every `R1,000` reads `R1000`, top bar included. The work strip is a three-brand
shortlist driven by `FEATURED_ON_HOME` in a 1440px section; **the CSS-composed browser
mockups are gone** — a 16:9 screenshot is now the card's first element, cards are equal
height and the copy is pinned to the bottom. Both floating hero cards are image-only inside
a 5px frame.

**`/work`.** The page carried an `img` field it never rendered — a grey box stood in for
every case study. It now renders the screenshot at 16:9, and shows three cards behind a
"See More" reveal rather than all six. The "VIEW THE SITE" buttons were already pointed at
the real client domains, contrary to the note above.

**`/services`.** Cards are horizontal: an 80px icon in a fixed left column, copy and button
right, both vertically centred. The grid uses `minmax(min(420px, 100%), 1fr)` — the plain
`minmax(420px, 1fr)` it started with overflowed a 375px viewport.

**`/contact`.** The info column and the form are one card divided by a rule, the stats band
underneath is deleted, and "Your business" is now a `tel` "Your contact number". The form
still posts nowhere, so that number is not captured.

### Traps this pass uncovered

- `page-shell-grid` is shared by `PageShell`, `/about` and `/work`. A media query scoped to
  it from a single page leaks into the others — `/contact` has its own `contact-card-grid`
  and `contact-form-col` for that reason.
- A `>` inside a `<style>{`…`}</style>` template literal causes a hydration mismatch: React
  escapes it to `&gt;` server-side and not on the client. Put a class on the child instead
  of using a child combinator. (A separate, pre-existing mismatch fires on `/about` too.)
- **There is no ESLint config in this repo**, so `npx next lint` drops into its interactive
  setup prompt and cannot be used as a check. `npx tsc --noEmit` is the pre-push gate here.

## Chatbot — built and live, 14 August 2026

An on-site assistant that answers visitors' questions and works towards their email and
phone number. Runs on DeepSeek (`deepseek-chat`), which costs roughly half a cent per
conversation.

**It is gatekept.** `lib/chatbot/knowledge.ts` holds the entire knowledge base *and* the
system prompt as plain strings, and the whole file goes into every request. Nothing is
retrieved or ranked — that is what keeps the gate shut. Anything not written in that file,
the bot does not know, and saying so is the correct answer. Edit that file to change what
it can say; there is no other lever.

**Never import `lib/chatbot/knowledge.ts` from a client component.** `SYSTEM_PROMPT` would
be bundled into the public JavaScript along with it, and the gate stops being a gate. The
widget owns its own greeting for exactly this reason.

- `app/api/chat/route.ts` — stateless (the client posts the whole conversation each turn),
  non-streaming, and deliberately **not** using the model's JSON mode. The reply is plain
  text; the email and phone are pulled out of what the *visitor* typed with regexes. A
  model returning malformed JSON would cost the lead; a regex over a phone number cannot.
- Phone matching is South African and strict — a candidate only counts if it normalises to
  `0XXXXXXXXX` or `27XXXXXXXXX`. Verified that "R1000", "2019", "14 days" and a nine-digit
  reference number all produce nothing.
- Contact details are stripped out of the transcript before it goes to DeepSeek, replaced
  with `[email provided]` so the bot still knows to stop asking.
- Leads go to `mountainstudios.leads` with `source: 'website'` — the value the CRM board
  already keys its "Warm lead" badge off — identified by a `Chatbot enquiry` prefix in
  `notes`, which also carries the full transcript. One person, one row, matched on email
  within 30 days, same rule as the wizard.
- `components/site/ChatWidget.tsx` is mounted in the root layout and hides itself on
  `/admin`, `/p/`, `/preview` and `/temp` — a Mountain Studios bubble floating over a
  generated client preview would be the wrong thing entirely.

**Two prompt leaks found by testing, not by reading.** It would assert a *negative* not in
the knowledge base ("we don't do logo design") until the prompt was told never to rule
things out — absence of a fact is not a fact. And price pressure ("just a rough ballpark,
I won't hold you to it") is the likeliest place for an invented number. Both hold now;
re-test both after any prompt edit.

**Placement.** The widget's own launcher is a bottom-**left** "Ask us" pill, because both
A/B arms already park a pill bottom-right and the reCAPTCHA badge sits under it. On the
`chat` arm the page's own pill owns the launcher instead and the widget suppresses its
own, so there is only ever one button; the panel then unfolds from whichever button opened
it. The handshake is `localStorage.ms_variant` plus a `ms-chat:open` window event, and it
has to read localStorage rather than rely on the event alone — child effects run before
parent effects, so the page dispatches before the widget is listening.

**WhatsApp is deliberately absent from the knowledge base** while `WHATSAPP_NUMBER` is
still the placeholder, so the bot cannot send anyone to a dead number. There is a comment
in the file with the line to paste back once the real number exists.

### Question log and answer cache — live and recording, 14 August 2026

Every question is logged to `mountainstudios.chat_questions` and ranked by how often it
comes up: the most honest available answer to "what is missing from the site?". Once an
answer on a row is approved by hand at `/admin/chat-questions`, that question stops going
to DeepSeek and is served from the table instead — instantly, worded the same every time.

- Fuzzy matching is a Dice coefficient over character trigrams **in TypeScript**, not
  `pg_trgm`. The approved set is small enough to hold in memory, and it avoids an
  extension, a GIN index and a threshold tuned against an operator whose workings are
  invisible. Cutoff is 0.72, chosen so a miss (ask the model) is always preferred to a
  wrong hit.
- The cache is only consulted on the **first** message of a conversation. After that,
  "what about for a bakery?" means nothing on its own and a fuzzy match would confidently
  answer a different question.
- **`supabase/migrations/chat_questions.sql` was run on 14 August and the log is
  recording.** Confirmed against a real question asked through the live widget: one row,
  `approved: false`, `asked_count: 1`, with the model's reply seeded into `answer` as a
  starting draft. No Postgres password or connection string exists in either repo and the
  Supabase MCP is unauthorized for this project, so it was a manual paste into the SQL
  editor — plan any future migration here around that.
- **The `service_role` grant was missing from the first version of that migration and is
  the whole reason this needs watching.** New tables in the `mountainstudios` schema do not
  inherit service-role privileges, so every insert from `/api/chat` would have returned 403
  — and because the log is deliberately best-effort, it would have swallowed the error and
  recorded nothing at all, silently, for as long as nobody checked. `rep_applications` hit
  this on its first submit and `contact_messages` hit it again on 10 August. Any new table
  in this schema needs its grant written into the migration.

## reCAPTCHA — v2 registered, v3 calls made, verification broken

`NEXT_PUBLIC_RECAPTCHA_SITE_KEY` and `RECAPTCHA_SECRET_KEY` were set up for reCAPTCHA
v2, but every `executeRecaptcha()` call in the codebase uses v3 endpoints and reads
`data.score` (which v2 never returns). So `data.score >= 0.5` is always `undefined >=
0.5`, which is always false. Any token, valid or not, triggers a 403. Rather than fail
the whole flow, reCAPTCHA is now advisory: the preview never checks it, the brief-submit
calls never return 403, and both `executeRecaptcha()` calls race a 5-second timeout
(because Google can simply never settle when unreachable, leaving the UI stuck). When it
times out or fails our side, the error goes to the server log. When a visitor's token is
rejected or scores too low, the verdict goes into the lead's notes. **The honeypot is the
only real bot defence until a v3 key pair is registered and deployed.** This is
unresolved, not a workaround — it is reCAPTCHA silently broken and neutralised.

## DeepSeek screening removed

`lib/screen-application.ts` and `/api/careers/screen` have been deleted. The columns
`ai_score`, `ai_verdict`, `ai_summary`, `ai_flags` and `screened_at` remain on
`rep_applications`, dormant. `DEEPSEEK_API_KEY` is still used by `/api/preview/scrape`
(the image-generation proxy that sources stock photos) and, since 14 August, by the
chatbot at `/api/chat` — so do not remove it from Vercel.

## Applications review table moved to the CRM

`/admin/applications` here, plus `components/admin/ApplicationsTable.tsx` and all of
`/api/admin/applications/**`, are deleted. Applications are now reviewed at
`crm.mountainstudios.co.za/applications` behind Supabase auth (the CRM's own login),
not the shared `ADMIN_PASSWORD`.

## Fixed along the way

- **Admin was completely unreachable.** `middleware.ts` hashed the password without the
  salt the login route adds, so every `/admin` request bounced back to the login page it
  had just come from. An unused helper in the same file had the identical bug.
- **Stale database reads.** Next's App Router caches `fetch` by default and supabase-js
  talks over `fetch`, so a row read once was served from cache indefinitely — revoked
  previews kept opening, and the admin tables would have frozen at whatever they first
  displayed. Fixed at the client in `lib/crm.ts`, so every CRM reader is covered.
- **Missing table grants.** New tables in the `mountainstudios` schema do not inherit
  `service_role` privileges; the first application submit failed on this. The fix is
  explicit: `grant select, insert, update on mountainstudios.contact_messages to
  service_role;` in the migration. `contact_messages` hit this on 10 August, and
  `chat_questions` was written without it on 14 August — caught before the migration was
  run, but it would have failed silently. **Three times now. Write the grant into every
  new migration in this schema.**

## Preview templates — fifteen built, mobile pass done

Replaced the three generic variants (`visual`, `service`, `portfolio`) with fifteen
category-specific templates so a restaurant does not get the same layout as a law firm.
Fourteen are category-specific; `other` falls through to `buildServiceTemplate()`. All
share `buildNav()`, `buildFooter()`, `buildHead()`, `buildAboutSection()` and
`buildContactSection()`; the POST handler picks the builder by category. The reference
standard is antsawnings.co.za — itself a generated template, hand-edited.

**All twenty-two `buildXTemplate()` functions live inside
`app/api/preview/generate/route.ts`** — ~6,300 lines, and `POST` is the only export. The
`templates/` directory at the repo root is dead: nothing imports it and nothing has since
8 June. Do not edit it and expect a change.

**Testing trap.** Copy presets in `content.ts` are keyed on the exact wizard dropdown
label from `constants/business-types.ts` — "Bakery", "Lawyer / Attorney", "Boutique /
Fashion Store". Free text ("bakery", "plumber") matches nothing, silently falls through to
a generic fallback, and makes all fifteen look identically bland. Always test with a real
label or you are reviewing the fallback, not the template.

**Rendering one without a refactor.** `POST /api/preview/generate` with `businessName`,
`businessType` (a real label) and `businessCategory`. No `recaptchaToken` is needed —
`blockedAsBot()` is an allowlist. The rate limit is 5/hour keyed on the `x-forwarded-for`
header, so send a unique one per request, and use a counter rather than `$RANDOM`, which
collides and returns 429s. The dev server dies on hot-reload of a file this size; restart
it, and never run `next build` while it is up — both write `.next` and React silently
stops hydrating. `npx next lint` does not work here at all (no ESLint config, it opens an
interactive prompt). `npx tsc --noEmit` is the only usable check.

**Colour**

- `accentOnDark(primary, secondary, fallback)`. Templates used to write
  `primaryColor || '#vivid'`, but `categoryColors` supplies near-black primaries, so the
  vivid fallback never fired and accents came out invisible. It now falls back to the
  category's vivid secondary.
- **`getLuminance` here is perceived brightness** (`0.299R + 0.587G + 0.114B`), not WCAG
  relative luminance. A threshold written on the WCAG scale is a silent no-op. The cut is
  0.19 / 0.25.
- All fifteen templates are light. `tech-digital`, `fitness`, `events` and `automotive`
  were converted.
- A hero sitting on a photo needs its own `onPhoto` / `onPhotoMuted` / `onPhotoBorder`
  tokens — a dark-gradient photo hero stays dark whatever the page theme is, so page-level
  tokens do not reach it. `fitness` and `automotive` carry them; copy that pattern.

**Mobile**

Shared rules live in `buildCssVars`, in its `@media (max-width: 768px)` block. They apply
to every template, so a change there has to be re-rendered against all fifteen.

- Heroes fill the phone screen (`min-height:100svh`, with `100vh` as the fallback line —
  `svh`, not `dvh`, so the hero does not resize mid-gesture when the address bar hides).
- Absolutely-positioned layers are exempt from the 1.25rem side gutter. The gutter is for
  text columns; applied to a full-bleed layer it was insetting hero photos to 389px on a
  429px screen and leaving grey bands down both edges.
- Hero content clears the fixed nav via a 5.5rem top pad — applied to the content layer
  only, never to a photo layer. `.ms-hero-photo` is excluded by name: that rule outranks
  the split-hero block on specificity and was putting an 88px grey band above every hero
  photo.
- The nav logo truncates with an ellipsis instead of wrapping. A long business name on two
  lines doubles the fixed nav's height, which is what pushed hero content off-screen.
- Per-template: tech-digital hero type scale, events + property CTA alignment,
  professional hero eyebrow, fitness h1 size, automotive hero top padding, retail
  badge/nav overlap.

**Split heroes on mobile** — health-wellness, creative, education, retail, home-services

These five pair an image column with a text column. On a phone the image column used to
overlap the copy, hide it, or be switched off entirely, one per template.

- Inline-declared grids now collapse:
  `section:first-of-type[style*="grid-template-columns"]` plus a second selector one level
  down, because **education declares its grid on a nested div, not on the section**. The
  older `.ms-grid` rule never reached any of them.
- The image column then becomes a full-bleed background with the copy on top: a scrim, and
  the text forced white. `.ms-hero-photo` and `.ms-hero-text` are the hooks, and both are
  already on the right elements in all five.
- Badges and gradient overlays *inside* the image column are hidden on mobile. They are
  positioned for a half-width desktop column and land on top of the copy once it goes
  full-bleed.
- Ghost CTAs declare `background:transparent`, so the "keeps its own background" exclusion
  skipped them and they held their ink text and border on a dark photo. Handled explicitly.
- Education's image side is a 2×2 of three tiles, not one photo — only the tall left photo
  becomes the background, its decorative clip-path panel is hidden, and its grid wrapper is
  forced `position:static` so the photo binds to the section rather than the wrapper.
- Retail's nav is transparent until it picks up `.scrolled`, so its ink logo and burger
  stopped reading over the now-dark hero. White until scrolled, on mobile only.

Worth knowing when reading old notes: retail, home-services and creative previously showed
**no hero photo at all** on a phone. They do now — that part was a visual change, not a
bug fix.

**Still outstanding on previews:** Portfolio `projectCaptions` rendering is unverified,
`ogImageQuery` exists on presets but is unused, and PDF generation quality is untested
across variants. See [TODO.md](TODO.md) for the open template items.

## Website audit engine — 15 August 2026

The free audit form now runs a real audit. `app/api/audit/submit` is unchanged and still owns
lead capture; it just returns the new row's `auditRequestId`. The homepage fires
`app/api/audit/run` after a successful submit, and that route does the work.

Four deterministic checks, no LLM anywhere:

- **SSL** — HTTPS fetch, certificate validity. Distinguishes a broken certificate from no HTTPS.
- **Security headers** — presence of Strict-Transport-Security, X-Content-Type-Options,
  X-Frame-Options, Content-Security-Policy, Referrer-Policy. Green 4–5, amber 2–3, red 0–1.
- **Mobile speed** — PageSpeed Insights `strategy=mobile`, score plus `finalScreenshot`.
- **Desktop speed** — the same API, `strategy=desktop`.

Speed scores bucket red under 50, amber 50–89, green 90 and up. All four run in parallel through
`Promise.allSettled` with their own timeouts, so one failure never blocks the other three — the
run is recorded as `partial` instead. Report copy is canned in `lib/audit/copy.ts` and keyed off
pass/fail and bucket. Nothing is generated.

Results are written to the existing `audit_requests.report` jsonb column, so no migration was
needed. `status` moves `new → running → done | partial | failed`. On `done` or `partial` the
black-and-white report email goes to the person who asked for it and `report_sent_at` is stamped.
`ssl_valid`, `pagespeed_mobile` and `pagespeed_desktop` are mirrored onto the linked `leads` row
for CRM scoring.

Verified end to end against mountainstudios.co.za on 15 August 2026: all four checks returned, the
report stored, the email delivered.

### Traps in the audit engine

- **`GOOGLE_PSI_API_KEY` is a new environment variable.** Without it PageSpeed Insights still
  answers, but unauthenticated, on a tiny shared quota that returns 429 under any real traffic. It
  is set locally. It must also be set in Vercel or production audits will quietly degrade to
  "Speed test temporarily unavailable".
- The run is **triggered by the browser**, not by the server. Vercel kills work that outlives a
  response, and two PageSpeed calls take 20–60s, so running it inside `audit/submit` would risk
  timing out lead capture. The cost is that closing the tab straight after submitting leaves the
  row at `status='new'`. It is re-runnable — POST the id to `/api/audit/run` again.
- A run that dies mid-flight leaves `status='running'`, which blocks retries. `{"force": true}` on
  the run route bypasses both that lock and the completed-report short circuit.
- Supabase client calls **return** `{ error }`, they do not throw. A `try`/`catch` around an
  `.update()` catches nothing — check the returned error or write failures pass silently.
- The mobile screenshot is stored in the report but **left out of the email**: Gmail strips
  `data:` URI images.
- This section's own description above says "four checks" and is stale — `lib/audit/types.ts`
  and the live cards on the homepage now carry a fifth, Accessibility. See the report note below.

## The PDF fallback was silent — 16 August 2026

The istore report arrived as the plain written email with no PDF attached. Worth writing down
because of how it hid: the PDF **rendered fine and uploaded fine** — a 712KB file is sitting in the
`audit-reports` bucket for that request. The failure was in the send, and the `catch` around the
whole attachment path quietly fell back to `renderAuditEmail()`, the long written version. The row
still stamped `report_sent_at`. Nothing errored, nothing was flagged, and the only record of the
reason was a server log nobody reads.

**Every step passed when replayed by hand afterwards** — render, upload, cover render, and the SES
raw-MIME send with the same 712KB attachment. So it was transient, and one attempt was enough to
permanently downgrade the deliverable.

The real cause turned out to be the one thing the local replay could not reproduce: on production
the chat route had no browser at all, because `outputFileTracingIncludes` in `next.config.js` is
keyed by route and only lists `/api/audit/**`. Locally the renderer uses the Mac's own Chrome, so
every local test passed and proved nothing. The recorded reason said it outright:
`The input directory "/var/task/node_modules/@sparticuz/chromium/bin" does not exist.`

Two changes, both in `lib/audit/run.ts`:

- **The attachment send is tried twice**, 1.5s apart, before falling back. The PDF *is* the
  deliverable; the written email is a consolation prize.
- **The fallback records why**, onto the report as a `delivery` block with the reason and a
  timestamp. Check it with
  `select report->'delivery' from mountainstudios.audit_requests where id = '…'` — absent means the
  PDF went out.

Two things worth noticing here. `createBucket` and `.upload()` both **return** their errors rather
than throwing, so the `try/catch` around the bucket creation has never once fired and an upload
failure would not have been caught at all. And this is the second silent-loss bug found in one day,
after the chatbot dropping audit requests — the pattern is a `catch` that degrades the outcome
without recording that it did.

## Free audit popup — live 16 August 2026, tested on production

The audit offer used to be a section mid-homepage, which meant it only ever reached people who
scrolled that far and never reached anyone on `/work`, `/services` or `/about` at all. It is now
`components/site/AuditPopup.tsx`, mounted in the root layout, and the homepage section is gone.

**It fires on whichever comes first:**

- 30 seconds on the site. Measured at 30,855 ms from page load.
- Exit intent — `mouseout` with `clientY <= 0` and a null `relatedTarget`, meaning the pointer
  left through the top of the window rather than moving between two elements.

Exit intent is desktop-only, because a touchscreen has no pointer to leave. The dwell timer is what
covers phones, and neither trigger fires in a visitor's first seconds.

**The timer lives in the root layout, so it never restarts on navigation.** Thirty seconds means
thirty seconds on the site, not thirty on each page — otherwise someone browsing quickly would
never see it.

- **Once per visit.** `sessionStorage['ms-audit-seen']` is set the moment it opens, so it cannot
  reappear later in the same visit. Verified.
- **Never again once they submit.** `localStorage['ms-audit-done']`.
- Suppressed on `/admin`, `/p/`, `/preview` and `/temp` — the same list as the chatbot, and for the
  same reason: a Mountain Studios popup over a generated client preview would be actively damaging.
- **It will not open over an in-progress chatbot conversation.** Two overlays at once is nobody's
  idea of a good time. It re-arms and retries in 15 seconds rather than throwing the trigger away.
- Escape, the backdrop and the × all close it; the body scroll is locked while it is open and
  restored after.

**Mounted inside `RecaptchaProvider`, unlike `ChatWidget` which sits beside it.** The form calls
`executeRecaptcha('audit_submit')` and gets `undefined` without that context — the submit would
still work, but every one would arrive unscored.

**On phones the per-check descriptions are hidden**, leaving the check names only. With them in,
the submit button landed roughly two screens down inside the modal. It is now 577px tall in an
812px viewport, so the button is visible without scrolling.

Nothing behind it changed: same `POST /api/audit/submit`, same honeypot, same `audit_submit`
reCAPTCHA action, same everything downstream.

### The chatbot runs the audit itself — 16 August 2026

**The bug this fixed is worth remembering.** The bot could describe the audit and open the form,
but had no way to run one — and it did not know that. So it improvised: it invited people to type
their website and email into the chat, and then dropped both on the floor. A real request for
istore.co.za was lost exactly this way. No row, no email, no trace, and the person left watching an
inbox for a report that was never coming. Nothing errored, nothing logged, and it would have gone
on silently forever.

**`/api/chat` does not start audits.** It returns the website and email it extracted as
`auditRequest`, and the **widget posts them to `/api/audit/submit`** — the same endpoint the popup
form uses. Two attempts to start it from the chat function both failed on production, in different
ways, and both are worth knowing before anyone tries a third:

1. **Rendering in-process** needed the 66MB headless browser in the chat Lambda
   (`outputFileTracingIncludes` is keyed by route). Its cold start went past the 20s DeepSeek
   timeout and *every* chat message returned the fallback apology. The chatbot was down.
2. **Handing off to `/api/audit/run` over HTTP** left rows stuck at `status='new'` — the
   server-to-server call never landed, so the visitor got nothing at all.

`/api/audit/submit` already does this correctly from a browser every day. Use it. **Do not add a
route to `outputFileTracingIncludes`** — Chrome belongs in exactly one place.

**The model decides nothing.** It will reply "what's the best email address?" to a message
containing the email, emitting no signal at all; told instead to signal whenever it has both
details, it signalled for someone who supplied a site and an address while asking for a *quote*.
So the route decides, from the visitor's own words:

> An audit runs when the visitor has given **both** a website and an email, **and** has actually
> asked for one — they used the word "audit" themselves, or they said yes to an offer, **or they
> handed over the details after the bot raised it**.

- Supplying the details *is* consent. Requiring the word "audit" meant someone answering
  `ant@example.com - https://theirsite.com` — exactly what was asked for — was told the email was
  still needed and nothing ran.
- Details arrive one at a time, so **any** assistant turn mentioning the audit counts, not just the
  most recent. Checking only the last one left "website now, email two messages later" asking
  forever.
- The bot merely *offering* is not consent. Someone who wants a quote must not be sent a report.
- Website and email always come from **what the visitor typed**, never the model's reply. The
  extractor strips emails before looking for a website, or `hugo@gmail.com` audits `gmail.com`.
- Charged against the **`audit/submit` limit**, shared with the popup form and keyed per IP.
- `audit_requests.source` is `'chatbot'` when the route creates the row; going through
  `/api/audit/submit` it is `'website'`. The lead row is always `source='website'` so the CRM
  board's "Warm lead" badge and the find-or-create dedupe keep working.

Verified on production from a real browser: a vague complaint followed by `url + email` in one
message produced a report with its PDF 19 seconds later. Details split across two messages also
runs. A quote request with details in the first message starts nothing.

### The rate limit is shared, and it is the likeliest reason an audit "just fails"

`audit/submit` is **15 an hour per IP** (raised from 5 on 16 August). One counter is shared by the
popup form, the chatbot handover and anything else that starts an audit, and it is keyed on IP — an
office behind one NAT is a single visitor as far as it is concerned.

This is worth checking first whenever an audit does not arrive:

```sql
select key, hits, window_start from mountainstudios.rate_limits
where route = 'audit/submit' order by window_start desc;
```

It cost an afternoon once already. Repeated testing pushed one IP to 6 against a limit of 5, the
endpoint returned 429, and the widget reported a flat "I couldn't get that started" — then offered
a button that posts to the very endpoint that had just refused, so following the advice failed
identically. The widget now reads the status: a 429 says so in plain words and shows **no** button,
because the button cannot help.

### The chatbot can offer and open it

Moving the audit into a popup left it unreachable on demand — dismiss it and there was no route
back. The bot now closes that hole.

**The model ends a message with `[[AUDIT]]` when it wants to offer the audit.** `/api/chat` strips
the marker and returns `offerAudit: true`; the widget renders a "Run my free audit →" button under
that message, which closes the chat and dispatches `ms-audit:open`.

- **A marker, not phrase matching.** Reading the reply's wording would fire on "we offer a free
  audit" said in passing and miss every rewording of it. The strip is generous about case, spacing,
  surrounding punctuation and stray backticks — a marker leaking into visible text is far worse
  than one that fails to fire.
- **Stripped before the question log writes its draft answer**, so a marker can never be baked into
  a canned reply and served to a later visitor as literal text.
- **Cached answers run through the same strip**, which means writing `[[AUDIT]]` into an approved
  answer by hand at `/admin/chat-questions` is a supported way to make a stock reply offer the
  audit.
- **An explicit open bypasses the once-per-visit rule.** Someone who has just clicked a button to
  see the form must always get it, dismissed earlier or not. Only the hidden-route check still
  applies.

The prompt restricts the offer to cases where it genuinely helps — they already have a site, they
ask about the audit, or they name a problem the audit actually measures (slow, broken on a phone,
"not secure" warning, hard to read). Verified against the live model: it offers on "my site is slow
on phones" and "do you check existing sites?", and stays quiet on a new-business enquiry and on a
pricing question. **Re-test those four after any edit to the prompt or the knowledge base.**

## Website audit report — live end to end, 16 August 2026

Someone fills in the free-audit form — since 16 August that is the popup, not a homepage section —
and a branded PDF lands in their inbox about a minute later. No further involvement, no browser
required, no manual step.

**The chain.** `/api/audit/submit` writes the rows, returns immediately, and starts the audit
server-side with `waitUntil` from `@vercel/functions`. `lib/audit/run.ts` runs five checks,
`lib/audit-report/render.ts` fills `template.html` and renders it with headless Chrome, the PDF is
stored in the private `audit-reports` bucket keyed on the request's uuid, and
`sendMailWithAttachment` in `lib/ses.ts` emails it as a raw-MIME attachment. `report_sent_at` is
stamped only once a send actually succeeds.

**Five checks, three sections.** Page Speed (mobile + desktop), Security (Encryption + Browser
Protection), Accessibility. The accessibility score rides along on the mobile PageSpeed call —
`category` is a repeatable query param, so it costs no extra request — and failing Lighthouse
audits are mapped to plain-English findings, capped at three.

**Cover art** is `public/images/audit-report/cover-mountain.png`, inlined as a data URI. Fonts are
embedded base64 in `lib/audit-report/fonts.ts`, deliberately not a Google Fonts `@import`: a cold
function with no network would otherwise email a prospect a report set in Arial.

<callout icon="🐛" color="red_bg">
**Four things broke here that all looked fine locally.** Each cost a deploy to find.
- `outputFileTracingIncludes` lives under `experimental` in Next 14. At the top level it is
  silently ignored and the template and cover art never reach the bundle.
- Webpack relocates `@sparticuz/chromium` into a chunk, so it cannot find its own `bin/`.
  It must be in `serverComponentsExternalPackages`.
- Even external, the 66MB browser never ships: nothing imports those `.br` files, so tracing
  cannot see them. They need listing explicitly.
- `page.pdf()` resolves to a **Uint8Array**, and `Uint8Array#toString('base64')` ignores its
  argument and returns `"37,80,68,70,..."`. A 720KB report arrived as 2.5MB of decimal text that
  no reader could open. The type is right and the length is plausible, so nothing upstream can
  catch it — only a real email exposes it.
</callout>

**Local rendering uses the Mac's own Chrome**, because `@sparticuz/chromium` ships a Linux binary.
That split is why every one of the above passed local testing. `scripts/audit-report-preview.ts`
renders a fake report to `~/Desktop` without touching the database or sending anything;
`/api/audit/diagnose` does the same on the server, gated on `CRON_SECRET`.

**The report is the deliverable.** The email is a short covering note. The long written version in
`renderAuditEmail()` is kept only as the fallback for a failed render, where it has to stand alone.

**The cover names the audited site, from its URL.** It used to prefer the linked lead's
`business_name`, and leads are matched on email — so a second audit from the same address produced
a report titled with the first site's name.

### Report layout and CTA pass — 17 August 2026

Hugo's annotations on the first production report. All of it is `lib/audit-report/template.html`
plus the fill logic in `lib/audit-report/render.ts`.

- The cover's "Free Website Audit" tag is gone; pages 2 and 3 keep their "Page X of 3".
- The title block sits at `top: 95mm` instead of `38mm`, and the eyebrow and business name are
  roughly double their old size.
- Card and summary `box-shadow`s are gone — at 6mm blur on a pink page they read as dark bands
  behind each card rather than as shadows.
- The Browser Protection card now names the headers it did not find, from
  `checks.headers.missing`. Saying "2/5" without saying which two was the point of the check.
- "What happens next" (the three-step list) is cut.
- The summary block gained a CTA paragraph above the button. It names the **two weakest checks**
  — worst bucket first, then lowest score, at most two, one if only one is weak — and quotes the
  once-off R2000 fix. `generateCtaPitch()` in `render.ts`.

<callout icon="🐛" color="red_bg">
**A bare domain is one unbreakable word.** Doubling the cover name to a fixed 80px clipped
`mountainstudios.co.za` mid-word against the cover's `overflow: hidden` — nothing wrapped because
there is no space to wrap on, and the PDF still rendered without error. `coverNameFontSize()` now
steps the size down by character count (80px ≤14, then 62/50/40/32px) and the rule carries
`overflow-wrap: anywhere` as a last resort. Any future change to the cover type size has to be
checked against a long domain, not against "Example Business Co."
</callout>

Still open: `generateSummaryText()` hardcodes "Speed, browser protection and accessibility", so the
"In short" paragraph can name a check the CTA below it did not pick.

**Backstop.** `/api/audit/sweep` plus a daily Vercel cron finishes any report that never sent —
crashed function, PSI outage, deploy mid-run. Hobby only allows daily granularity. It refuses to
run when `CRON_SECRET` is unset rather than running unauthenticated.

## Honeypots do not decide anything, 16 August 2026

The audit and referral forms judged their honeypot **in the browser**: anything in the hidden field
and the handler showed the success screen and never sent the request. Password managers fill hidden
off-screen inputs, so a real visitor could submit, be told it worked, and produce no row, no email
and no trace in any table. Confirmed in the wild — a submission that reached the rate limiter and
then vanished.

<callout icon="🐛" color="red_bg">
**A honeypot catches the wrong side of this trade.** A real bot POSTs at the endpoint directly and
never renders the page, so it never sees the field. The only people it reliably catches are
customers with password managers. It is now recorded on the row via `recaptcha_note` and never used
to discard anything, and it is hidden with `display:none` — autofill treats an off-screen input as
an ordinary visible field.
</callout>

What actually blocks bots now is `blockedAsBot()`, enforced on audit and referral submit as it
already was on chat and the preview routes. Those two verified the token and then only logged the
verdict. It stays an allowlist: only a real judgement by Google refuses a request, so a missing or
unverifiable token — ad blockers, privacy extensions, networks that cannot reach Google — never
blocks a customer. Refusals return 403 instead of a fake success.

## Header, chatbot launcher and reviews pass — 16 August 2026, evening

A pass over the marketing site's furniture from Hugo's annotated screenshots. Nothing behind
any form changed.

- **Header is one component again.** `components/site/SiteHeaderNav.tsx` is now used by both
  the homepage and `PageShell`, which had each carried their own copy of the nav and had
  drifted apart. Six flat links became two hover/click dropdowns — **About** (About us, Work,
  Services, Reviews) and **Resources** (Refer & earn R1000, Free site audit, See your site
  free) — and **Contact** takes the pill that "SEE YOUR SITE FREE" used to hold. Every href is
  absolute (`/#refer`, not `#refer`) so a hash target resolves from `/work` and `/about` too.
  "Free site audit" dispatches `ms-audit:open`, which is the second route back to the audit
  after a dismissal that the popup write-up asked for. The dropdown trigger **opens rather
  than toggles** — hover has already opened it by the time a mouse user presses — and a
  transparent `::before` bridges the gap under the trigger, or the pointer crosses dead space
  and the menu closes mid-reach.
- **Chat launcher is an icon alone**, a 60px wine circle bottom-right with the presence dot on
  its rim. The invitation moved into a dismissible bubble above it ("Chat with us — we reply
  instantly"), which appears 1.6s in and stays gone for the visit once closed
  (`sessionStorage.ms-chat-bubble-dismissed`).
- **The homepage A/B test is gone.** Both arms removed: no `ms_variant`, no `SEE YOUR NEW SITE`
  pill, no `ms-chat:variant` handshake, and `ChatWidget` no longer stands down for a launcher
  drawn by the page. `app/start-your-project/page.tsx` still reads `localStorage.ms_variant`
  and posts `variant` with each submit — nothing writes that key any more, so it is always
  null. Harmless, worth deleting when the brief payload is next touched.
- **reCAPTCHA badge hidden** in `app/globals.css` (`visibility: hidden`, never `display`).
  Google permits this **only** while the notice it carries is on the page, so both footers now
  read "This site is protected by reCAPTCHA…" with the two policy links. Delete that text and
  the site breaks the reCAPTCHA terms.
- **Reviews** carry the real names and wording — Alistair, Ant, Kathleen. The "All reviews"
  button and the three "View on Google" footers are gone: every one of them linked to `#`, and
  no Google reviews URL exists yet. Cards cropped to suit (`2rem` padding, no `min-height`).
- **Packages and pricing removed everywhere.** The homepage PACKAGES section (`id="pricing"`,
  the three ESSENTIALS/STUDIO/COMPLETE cards and their GET A PRICE buttons) is deleted, the
  nav and both footers no longer link to it, and `lib/chatbot/knowledge.ts` now says there are
  **no packages or tiers** rather than naming three. Quote-per-job wording is unchanged.
- **Nav alignment.** Every child of the pill is a flex box with `line-height: 1`. Left as
  inline text the Playfair wordmark carried its own tall line box and sat visibly higher than
  the Source Sans links; flex centres the box, not the glyphs. Ink centres now sit within half
  a pixel of each other. Hero content dropped from `5rem` to `8rem` top padding.

<callout icon="🐛" color="red_bg">
**A quote inside a `<style>` template literal breaks hydration exactly like a `>` does.**
`content: ''` in the hover bridge serialised as `content: &#x27;&#x27;` on the server and
`content: ''` on the client. React threw the server tree away and re-rendered — the page looked
perfect and `tsc` passed throughout. The rule is not "avoid `>`", it is **do not put CSS in a
text child of `<style>`**: use `dangerouslySetInnerHTML` with the CSS in a constant, as
`ChatWidget` already did.
</callout>

## Referral attribution — live 16 August 2026

Codes were being issued and emailed and nothing watched them: `?ref=CODE` was read by no
page, `leads` had no referral column, and who was owed R1000 was worked out by hand. The
loop is closed in three pieces.

- **The open.** `components/site/RefCapture.tsx` sits in the root layout — a partner is as
  likely to share `/work` as the homepage — catches `?ref=`, keeps it in `localStorage` for
  90 days and beacons `/api/referral/visit`. One row per visitor per code per day, enforced
  by a unique index, so a partner refreshing their own link does not inflate their own
  numbers. **No IP or user agent is stored**, only a salted hash of them, salted with the
  code so the same person on two partners' links cannot be lined up.
- **The lead.** The four public paths that can create one — audit popup, chatbot, wizard
  step 1, wizard submit — send the stored code. `lib/referral.ts` checks it against a real
  partner and writes `leads.referred_by_code` **only when it is null**. First touch wins:
  arrive on Alice's link, come back on Bob's, enquire, and it is Alice's referral. That is
  the version a partner can be told in one sentence.
- **What is owed.** A trigger writes a R1000 `referral_payouts` row when a referred lead
  reaches `crm_status='closed'`, unique on `lead_id`. In the database, not application
  code, for the same reason the lead→client close hook is: `crm_status` is written from
  five places and three are browser-direct calls that never reach a server route.

The CRM's `/referrals` reads `mountainstudios.referral_summary` — opens, leads, closes,
owed, paid per partner — with a rewards table underneath that marks each R1000 paid or
unpaid. The counts are computed in the view rather than in the route: PostgREST caps a
plain `select` at 1000 rows against 1,770 leads, so counting them in TypeScript would come
out silently short for every partner.

Migration `supabase/migrations/referral_attribution.sql`, applied via
`SUPABASE_MANAGEMENT_TOKEN`. Verified end to end against production with a seeded partner —
visit recorded, junk code ignored, repeat visit deduplicated, a second code did not
override the first, one close produced exactly one unpaid R1000 — and every test row
deleted afterwards.

<callout icon="⚠️" color="orange_bg">
**A referral must never take down the form it arrived on.** `attachReferralToLead()` never
throws: an unknown code, a dead partner or a failed update is logged and swallowed. The
lead is the thing that matters; the attribution is a nice-to-have on top of it.
</callout>

## Preview offer card and claim — 24 August 2026

The card carrying the R2000 offer asked twice: a claim button beside a Calendly link, where
the button read as navigation but actually opened a form. It is now one full-width button,
**Yes, I want it**, and the booking link moved to the screen after submitting, so nothing is
lost if the visitor never books. The form itself is down to name and phone — the optional
"anything you'd change" note and the "Not right now" button are gone, replaced by a small
close control in the corner. On success the form's heading and subtitle hide, so **Got it.**
leads rather than sitting under a prompt for details already given.

<callout>

**The click was being eaten by the client's own stylesheet.** For two days the button looked
completely dead: nothing happened on click, no console error. Every check said it was fine —
the handler was attached, the button was topmost at its own centre, `pointer-events` computed
as `auto`, nothing overlapped it, and a programmatic `.click()` opened the form correctly.

Instrumenting the raw events was what found it. `pointerdown` and `mousedown` hit the button;
`pointerup`, `mouseup` and `click` all landed on its **parent**. The stored page is a
generated client site, and its stylesheet sets `pointer-events: none` on a pressed button — a
double-click guard. Measured across one press, ours went `auto` → `none` → `auto`, so mid-press
it was transparent to hit-testing and the browser fired `click` on the parent instead.

The fix is one CSS rule opting every injected control out of it, `!important`, covering the
offer card, the pill, and the dialog's own buttons — the form's submit would have failed the
same way one step later.

**Two earlier fixes were pushed at causes that had not been measured** (an inline style being
outranked, then a capture-phase handler swallowing the click) and neither did anything. The
capture-phase one could never have worked: it walked up from the event target, and the target
was the button's parent, not a child. Instrument first.

</callout>

**The claim now reaches the lead.** It previously wrote `crm_status` and `mockup_ready` and
nothing else, so on any preview that already had a lead — which is every wizard preview — the
name and number the person typed reached `shared_previews` and the notification email but
never the CRM screen a rep works. A rep saw "qualified, mockup ready" and had nothing to call.

Every number is kept rather than chosen between: the first number found goes to `phone`, a
second and different one to `director_phone`, and the notes carry the full claim in all cases.
Comparison is on digits only, so one number formatted two ways is not stored twice.

**The website preview is now the same page as the emailed one.** Clicking the preview in the
wizard opened a `blob:` URL of the raw generated HTML, which never passes through `decorate()`
and so carried no offer card at all — the R2000 pitch existed only on the emailed link.
`/api/preview/email` already returned the saved url; the wizard was discarding the response and
reading only `res.ok`. It now opens `/p/<token>`, so there is one implementation and no way for
the two to drift.

That route also no longer waits on SES before replying. The link exists the moment the row is
written, and waiting on the send meant a prompt click fell back to the blob — the people
keenest to look were the ones who never saw the offer. Delivery is detached with `waitUntil`,
not abandoned: the same `sent`/`FAILED` stamp on the lead and the same failure alert still run.

## No automated reply on "not quite right" — 24 August 2026

Someone who says the preview missed has just told us what is wrong with it, and a template
thanking them for getting in touch answers that criticism by ignoring it. The confirmation is
skipped on that path only; the notification still fires, carries their comments and replies
straight to them.

Worth being deliberate about: those people now get **nothing** until a human replies. The
acknowledgement was what covered the gap between submitting and hearing back, so a slow day
now reads as silence to the person who just said the work missed.

## Rate limits — raised for paid traffic, 24 August 2026

Limits are keyed per IP, and an IP is not a person. A South African mobile network puts very
large numbers of users behind shared CGNAT addresses, so paid traffic arriving on mobile
collides with itself — and a refused submission is an enquiry nobody ever hears about. Five an
hour on the contact form was the sharpest edge of that, right as ad spend starts.

What costs nothing to serve is now well clear of any real person; what spends money on every
call stays tight.

| Route | Was | Now | Why |
| --- | --- | --- | --- |
| `contact/submit` | 5 | 25 | a row and two emails |
| `referral/submit` | 5 | 25 | a row and an email |
| `preview/email` | 5 | 10 | storage and a send |
| `preview/generate` | 5 | 8 | DeepSeek and image lookups |
| `audit/submit` | 15 | 20 | two PageSpeed calls, a Chrome render, a send |

reCAPTCHA cannot cover the difference: `blockedAsBot()` is an allowlist, so a request carrying
no token is allowed through, and these numbers are what actually stands between an open
endpoint and a bill.

`/api/preview/scrape` is deleted. It had no caller in either repo, took any URL it was handed,
fetched it and paid DeepSeek to read it.

## Deleting leads — the rule kept, the prohibition dropped (CRM repo)

Deleting a scraped lead used to be refused outright, because the row is what stops the scraper
re-adding it: `run.js` upserts on `google_place_id`, so a plain delete undoes itself on the
next run over that area. That reasoning only ever covered scraped leads. Of 1,783 leads, 1,770
are scraped and 13 are inbound — and an inbound lead has no place id, so nothing recreates it.

`mountainstudios.suppressed_places` now records the place id of any scraped lead that is
deleted, `run.js` filters against it before the upsert, and the delete route refuses to remove
the row if the tombstone did not land — deleting anyway would look like the button silently
not working when the lead reappeared days later.

Delete is on the Lead List, Bad Data and Audits, per row and over a multi-select, both going
through one route that takes a list of ids so the suppression step cannot be present in one
path and missing from the other. Deleting an audit also removes its PDF, stored as `<id>.pdf`
and unreachable once the row is gone. Admin only, through the service client: `authenticated`
holds no DELETE grant.

`Mark dead` stays alongside `Delete` on Bad Data. Retiring is right for a lead worth keeping
out of the pool but not worth destroying; deleting is for rows that should never have existed.
The 503 `email_crawl_empty` rows still have phone numbers — neither button is right for those.

## Still open — 24 August 2026

- **Meta Pixel is not installed.** GA4 (`G-RCLN88JPLC`) is in the root layout and nothing else
  is. This is the one item that genuinely gates advertising.
- The referral payout trigger `leads_referral_payout` needs
  `alter table mountainstudios.leads disable trigger leads_referral_payout;` run by hand before
  the referral page copy can honestly change to "25% of the deal up to R1000".
- The wizard's brief confirmation email needs rewriting — it sends and arrives correctly, the
  copy is the problem.
- `/brief/[id]` and its invitation email have never been verified end to end.
- `/momentbank` writes to `creator_leads` and appears in no document. Decide whether it belongs
  on this domain.
- The bottom pill still reads "I want this website" while the card says "Yes, I want it" — the
  same action under two names.
- Emails are still HTML-only with no `text/plain` part, and the apex still has no SPF record.
- `/api/audit/run` is unauthenticated: anyone holding a row's uuid can re-run an audit and
  re-trigger its email.

**`TODO.md` is stale** and contradicts this file: it still claims the contact form and the
referral form have no backend. Both are live and were verified against the database on
24 August.

## Database (project `pqudglvwdfsnmckqswnk`, schema `mountainstudios`)

- `rep_applications` — applications plus the model's score, verdict, summary and flags
- `shared_previews` — token, expiry, view counts, claim details
- `chat_questions` — chatbot question log and approved-answer cache. Created 14 August,
  recording. `service_role` grant is explicit in the migration, not inherited
- `suppressed_places` — google_place_id of every scraped lead deliberately deleted. Read by
  `run.js` before its upsert; without that filter a deleted lead returns on the next scrape
- Buckets `rep-cvs`, `previews` and `audit-reports`, all private, service-role access only

