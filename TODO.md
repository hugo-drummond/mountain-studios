# TODO

## Outstanding

Most of the infrastructure is built and live. The following work remains before
handing this over to the reps.

**Careers page** — `/careers/sales-rep`

- [ ] Read it on your phone, not just a laptop. It is going on LinkedIn.
- [ ] Drag both calculator sliders. Check the numbers read honestly.
- [ ] Answer "no" to the work-rights question and confirm the rejection wording is OK.
- [ ] Decide whether the retainer range (R350–R900) stays. It is invented.

**Shared previews**

- [ ] Generate a preview, share it, and open the link on your own phone.
- [ ] Paste the link into WhatsApp. View count must stay zero until you tap it. This is
      most worth checking by hand — it is what reps will trust.
- [ ] Tap "I want this website" and confirm the lead appears in the CRM and email at hello@.
- [ ] Revoke a link and confirm it dies.

**Homepage** — rebuilt 13 August 2026, see [STATUS.md](STATUS.md)

Content Hugo owes before this page is honest:

- [ ] **WhatsApp number.** `WHATSAPP_NUMBER` at the top of `app/page.tsx` is `27000000000`.
      The top bar and the footer still point at it, so both are dead links; `/contact`
      has its own copy of the same dummy. The floating chat pill no longer uses it — it
      opens the chatbot. The chatbot's knowledge base deliberately says nothing about
      WhatsApp until this is real; `lib/chatbot/knowledge.ts` carries the line to paste
      back in.
- [ ] **Real Google reviews.** Three cards say "Placeholder review". The score card's
      button now reads "All reviews" and has no link at all — it needs the Google
      reviews URL.
- [ ] **Footer social links.** Instagram, Facebook, LinkedIn and Google are all `#`.
- [x] **Work grid images.** Done 13 August — all six are Playwright screenshots of the
      live client sites at 1440×810, and the tilted hero cards show them unadorned. The
      composed browser mockups are gone.

Still to build:

- [x] **Audit form has no backend.** Now runs four checks and emails the report. 15 August 2026.
- [ ] **Referral form has no backend.** Same — name, email and mobile go nowhere, and no
      referral link is generated.
- [x] **`/work`, `/about`, `/services`, `/contact` built 13 August** on a shared
      `PageShell`. `/pricing` and `/refer` are still homepage anchors.
- [x] **Four individual service pages built 14 August**, see [STATUS.md](STATUS.md):
      `/services/web-design`, `/services/paid-ads`, `/services/aeo`,
      `/services/business-automation`.
- [ ] **`/services` "LEARN MORE →" buttons still `href="#"`.** Point them at the four new
      service pages now that they exist.
- [ ] **`lib/chatbot/knowledge.ts` doesn't know the service pages exist.** The bot can
      describe the four services but can't point a visitor at their own page for one.
- [ ] **Contact page form has no backend.** It shows a thank-you and sends nothing.
      `POST /api/contact/submit` + `contact_messages` + the CRM inbox are live — wire it.
- [x] **`/work` "VIEW THE SITE" buttons.** Verified 13 August — they already point at the
      real client domains. The `#` note was stale.
- [ ] **`/contact` contact-number field is not captured.** "Your business" became "Your
      contact number" on 13 August, but `handleSubmit` still only flips a flag.
- [ ] **About photo is a grey placeholder.** `public/images/team/hugo-drummond.jpg`
      exists — swap it in.
- [x] **The chat pill is a real chat widget.** Done 14 August — the `chat` A/B arm opens
      the on-site chatbot instead of linking to the dummy WhatsApp number.
- [ ] The reCAPTCHA badge sits under the floating pill in the bottom-right corner. The
      chatbot's own launcher was put bottom-left to stay clear of both.

**Website audit engine**

- [ ] Delete the test row in `audit_requests` tagged `source='audit-engine-test'`.
- [ ] Decide whether `/api/audit/run` should keep returning the full report — anyone holding the
      row's uuid can read it.
- [ ] Decide whether the mobile screenshot gets surfaced anywhere. It is captured and stored, but
      not emailed.

**Chatbot** — built and live 14 August 2026, see [STATUS.md](STATUS.md)

- [x] **Run `supabase/migrations/chat_questions.sql`.** Done 14 August, pasted into the
      Supabase SQL editor. Verified against a real question through the live widget: the
      row is there, `approved: false`, `asked_count: 1`. There is no DB password or
      connection string in either repo, so any future migration here is also a paste job.
- [ ] **`/admin/chat-questions` has never been opened.** `ADMIN_PASSWORD` is not in
      `.env.local`, so `/admin` cannot be logged into on this Mac at all. The route
      compiles and gates correctly; the page itself is unverified in a browser.
- [ ] **Read what people actually ask** and fix the knowledge base where it comes up
      short. The table is recording now; that ranked list is the point of the log.
- [ ] **Approve the first answers.** Nothing is served from the cache until a row is
      ticked at `/admin/chat-questions` — every question still costs a model call until
      then. The model's own reply is seeded into each row as a draft to edit.
- [ ] **Re-test the two known prompt leaks after any edit to the prompt**: ask it to rule
      something out ("do you do logo design?") and push it for a price ("just a rough
      ballpark"). Both are correct now and both are the first things to regress.

## Vercel environment variables

Set these in the Vercel project settings for mountain-studios. Names only —
values live in `.env.local` locally, never in this file.

**Blocking — reCAPTCHA is silently broken without this**

- [ ] Register a **v3** key pair at google.com/recaptcha/admin for `mountainstudios.co.za`.
      The current keys are v2 and do not return a score. Replace both `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
      and `RECAPTCHA_SECRET_KEY` in Vercel. Until then, the honeypot is the only bot defence.

**Blocking — the careers and contact forms fail in production without them**

- [ ] `CRM_SUPABASE_URL` — the CRM database. Missing means every application/contact
      returns a 502. Lost applicants and enquiries.
- [ ] `CRM_SUPABASE_SERVICE_KEY` — service role, bypasses RLS, must never be exposed
      to the browser or given a `NEXT_PUBLIC_` prefix.

**Blocking for shared previews, once the CRM calls the share endpoint**

- [ ] `PREVIEW_SHARE_KEY` — any long random string, the same value in both this project
      and the CRM. Without it only an admin-cookie session can create share links. A
      local dev value is already in `.env.local`; production needs its own.

**Blocking for the admin area**

- [ ] `ADMIN_PASSWORD` — without it `/admin` cannot be logged into. This now gates
      previews and the contact message inbox; applications review has its own Supabase
      login in the CRM.

**Blocking for the website audit engine**

- [ ] `GOOGLE_PSI_API_KEY` — PageSpeed Insights. Set in `.env.local`, NOT yet in Vercel.
      Without it the speed checks fall back to an unauthenticated quota and start returning
      429, and every audit email goes out saying "Speed test temporarily unavailable".

**Already set, listed so nothing gets removed by accident**

- `AWS_REGION`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` — SES, used by the Get Started
  brief notification and contact form email. The careers form deliberately sends no email.
- `ANTHROPIC_API_KEY`, `PEXELS_API_KEY` — preview generation.
- `NEXT_PUBLIC_APP_URL`, `DEEPSEEK_API_KEY` — the latter is used by `/api/preview/scrape`
  (stock photo proxy) and by the chatbot at `/api/chat`, not the deleted screening
  endpoint. Removing it takes the chatbot down.

## Data cleanup

- [ ] **Clear test leads.** Delete from `mountainstudios.leads` where `source='website'`:
      21 rows with business names containing PROBE/TEST/Bot Co and emails with probe/test.
      Keep: `Halo Hair / karen@gmail.com` and `Berts / bert@gmail.com` (genuine).
- [ ] **Clear test contact messages.** Delete from `mountainstudios.contact_messages`:
      2 rows (`Grant check`, `TEST - Claude, ignore`).
- [ ] **Clear test rep applications.** Delete from `mountainstudios.rep_applications`:
      3 older test rows (asdf asdf, Thandeka Mokoena, Peter Nel) plus 3 `TEST - delete me` rows.
- [ ] **Confirm the retainer range.** `app/careers/sales-rep/page.tsx` states R350–R900 a
      month publicly. That number was invented — nothing in the repo records the real one.

## Shared previews — deferred

- [ ] **Generate + share button in the CRM.** The link infrastructure is built
      (`/api/preview/share` → `/p/{token}`), but reps have no button. The CRM's `leads`
      table already has `mockup_ready` and `mockup_url` waiting to be filled.
- [ ] **Prefilled WhatsApp / email draft.** A button that opens the rep's own WhatsApp or
      mail client with the message and link written. Reps send from their own address on
      purpose — thirty people cold-mailing through the company SES identity would put the
      domain's reputation behind their prospecting, and POPIA consent for direct marketing
      is the sender's problem, not ours.
- [ ] **Purge expired previews from storage.** Expiry hides the page but leaves the HTML
      in the `previews` bucket forever. Needs a sweep that deletes files for rows expired
      more than ~90 days. Note storage rows cannot be deleted with SQL — the Storage API
      is the only way.

## Preview templates

All fifteen are built and light, and the mobile pass including the five split heroes is
done — see [STATUS.md](STATUS.md). What is left:

- [ ] **Hugo's call: the "GOOGLE PARTNER AGENCY" badge in `tech-digital`.** It is a named
      third-party certification, printed on a prospect's own preview of their site.
      Invented stats and testimonials are a decided-and-settled thing; a specific
      accreditation claim is a different category and needs a yes or no.
- [ ] **`automotive` `.auto-badge` is unreadable.** It hardcodes `rgba(230,59,30,…)`
      against a `#C42828` accent, so the hero eyebrow has almost no contrast. Its fourth
      stat also sits off the baseline of the other three.
- [ ] **`pets` hero stat pill overflows both screen edges on a phone.**
      `.pts-hero-stats` is centred with `width:max-content`, so it is wider than the
      viewport and the outer labels are clipped. Pre-existing, not from the mobile pass.
- [ ] **Section rhythm is still mixed** — 100/110/120px across templates where the
      reference standard holds a consistent 80px.
- [ ] **Hero falls back to `picsum.photos/seed/<type>-hero/600/400` when Pexels fails.**
      A random photo stretched full-bleed, and now that split heroes use the photo as a
      background it is more visible than it was. Intermittent; seen once as an aerial of
      San Francisco on a dog groomer. Needs a real per-category fallback image.

