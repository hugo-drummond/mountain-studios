# Status

Last updated: 10 August 2026

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

## Homepage contact form

The form at `app/page.tsx` had a `name`, `email`, `phone` and `message` for ~2 months with
no backing store. Submitting rendered a thank-you but discarded everything typed. Every
enquiry since launch was lost. It now sends `POST /api/contact/submit`, which writes to
a new `mountainstudios.contact_messages` table and emails Ant. The message is independent
of `leads` — an enquiry carries no business name, category or area, and there is no way to
automatically assign it to a rep's territory. Each leg is caught separately; only losing
both legs at once is an error (partial writes still land).

## Founder photo

Added `public/images/team/hugo-drummond.jpg` to the About card on the homepage, replacing
the placeholder triangle.

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
(the image-generation proxy that sources stock photos), so do not remove it from Vercel.

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
  service_role;` in the migration. `contact_messages` hit this on 10 August.

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
- Buckets `rep-cvs` and `previews`, both private, service-role access only

