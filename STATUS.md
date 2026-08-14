# Status

Last updated: 14 August 2026 (chat CTA resize)

## Where things stand

The rep hiring page, client previews, and contact capture are built and live. The Get Started
wizard and homepage now write leads to the database. All core infrastructure has been tested
end to end in production, and test data is being cleared. Most work is done; what remains is
a single Vercel configuration (reCAPTCHA v3 key pair registration) and manual cleanup.
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
work grid, free audit, R1,000 referral block, FAQ, final CTA, footer, and a floating
WhatsApp chat pill.

- **The hero input is the funnel.** Typing a business name goes to
  `/start-your-project?name=<typed>`, and the wizard prefills step 1 from the query
  string. It reads `window.location.search` in an effect rather than `useSearchParams`,
  which would need a Suspense boundary and fails the Next 14 build without one.
- **The audit and referral forms are UI only.** No API, no network call — submitting sets
  a local flag and swaps in a line of text. They exist so the page reads complete; nothing
  is captured yet, so anyone who fills them in is lost.
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
  go to `#` until real review URLs exist.
- **FAQ**: "FAQ" is now the section's large serif header ("Questions people actually ask."
  removed), and the pink highlight fills the whole open item, answer included.
- **Work section**: "SEE THE BRANDS WE'VE BUILT" is a proper centred serif heading.
- **A/B test.** The floating bottom-right button is a 50/50 split: variant `site` is a
  "SEE YOUR NEW SITE →" pill that scrolls to and focuses the hero input; variant `chat` is
  a "Chat with us" pill which, since 14 August, opens the on-site chatbot — it was a
  WhatsApp link to the dummy number until then. Assignment is sticky via
  `localStorage.ms_variant`, `?v=1|2` overrides for preview, clicks fire the GA event
  `float_cta_click`, and the wizard stamps `Homepage variant: …` into the lead's notes via
  both brief endpoints — win rate is a count of leads by that line. No schema change.

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
  careers sections were cut on Hugo's annotation. The photo is a grey placeholder even
  though `public/images/team/hugo-drummond.jpg` exists — swap pending.
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

## Preview template redesign — in progress, paused

Carried over from the sessions before this one. Replacing the three generic variants
(`visual`, `service`, `portfolio`) with fifteen category-specific templates, each modelled
on a real reference site so a restaurant does not get the same layout as a law firm.

Method: collect a reference site per category, extract its homepage structure, then build
that category as its own template function. All share `buildNav()`, `buildFooter()`,
`buildHead()`, `buildAboutSection()` and `buildContactSection()`; the POST handler picks
the builder by category.

**Reference sites collected**

- `food-hospitality` — crafto.themezaa.com/restaurant: full-screen hero, stats row, split
  about, tabbed menu, card carousel, testimonials
- `retail` — taiping.co.nz: red accent nav, stats row, 50/50 about, 50/50 locations,
  2×2 department cards, brand logos
- `health-wellness` — iveeapp.com: pastel blue, 50/50 hero, navy stats row, services
  accordion, membership cards, team carousel, testimonial colour cards
- `property` — 505statestreet.com: minimal pill nav, full-bleed hero, centred statement,
  tabbed amenity galleries, floor plan tabs, day/night toggle

**Built:** `buildPropertyTemplate()` only.

**Still needs a reference site and a template:** fitness-sport, pets,
events-entertainment, creative, trades-construction, professional, home-services,
education, automotive, tech-digital (plain.com — screenshots incomplete), other.

**Also outstanding on previews:** templates use fixed-column CSS grid with no breakpoints,
so they need mobile work. Portfolio `projectCaptions` rendering is unverified, `ogImageQuery`
exists on presets but is unused, and PDF generation quality is untested across variants.

## Database (project `pqudglvwdfsnmckqswnk`, schema `mountainstudios`)

- `rep_applications` — applications plus the model's score, verdict, summary and flags
- `shared_previews` — token, expiry, view counts, claim details
- `chat_questions` — chatbot question log and approved-answer cache. Created 14 August,
  recording. `service_role` grant is explicit in the migration, not inherited
- Buckets `rep-cvs` and `previews`, both private, service-role access only

