# Status

Last updated: 8 August 2026

## Where things stand

Two things were built this session, both complete in code and unused by a person:
a hiring page for the 30 freelance sales rep seats, and shareable client previews.

Neither has been exercised by a real user. Nothing is blocked on code — what remains
is environment variables and a pass of manual testing. All of it is listed in 
[TODO.md](TODO.md), which was created this session as the single place for outstanding work;
it also carries the Vercel variables and a hand-testing checklist.

## Careers page — `/careers/sales-rep`

Live in the repo, pushed, deploying. The landing target for a LinkedIn job post.

- States the commission terms in full: 20% of each sale, 15% of the monthly retainer,
  and does not hide that the residual stops when a rep stops selling
- An earnings calculator lets a candidate work their own numbers rather than being shown
  a flattering example
- Application form writes to `mountainstudios.rep_applications` with a required PDF CV in
  the private `rep-cvs` bucket
- Linked from the homepage footer only. Not in the main nav

**Deliberately sends no notification email.** A public ad produces hundreds of
applications and most are junk; burying a real person in an inbox is worse than sending
nothing. Applications are reviewed in the CRM at crm.mountainstudios.co.za/applications.

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

## Fixed along the way

- **Admin was completely unreachable.** `middleware.ts` hashed the password without the
  salt the login route adds, so every `/admin` request bounced back to the login page it
  had just come from. An unused helper in the same file had the identical bug.
- **Stale database reads.** Next's App Router caches `fetch` by default and supabase-js
  talks over `fetch`, so a row read once was served from cache indefinitely — revoked
  previews kept opening, and the admin tables would have frozen at whatever they first
  displayed. Fixed at the client in `lib/crm.ts`, so every CRM reader is covered.
- **Missing table grants.** New tables in the `mountainstudios` schema do not inherit
  `service_role` privileges; the first application submit failed on this.

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

## Known and untouched

The homepage contact form at `app/page.tsx` sends nothing. Submitting sets a flag and
renders a thank-you; the name, email, phone and message are discarded. Every enquiry ever
typed into it is gone.
