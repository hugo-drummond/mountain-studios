# TODO

<!-- Read STATUS.md first. This file has twice carried items that were already
     done — the contact and referral "no backend" lines survived months after both
     forms were live, and were quoted back as fact. Before acting on anything here,
     check it against reality: submit the form and read the row. -->

## Outstanding

Most of the infrastructure is built and live. The following work remains before
handing this over to the reps.

**Careers page** — `/careers/sales-rep`

- [ ] Read it on your phone, not just a laptop. It is going on LinkedIn.
- [ ] Drag both calculator sliders. Check the numbers read honestly.
- [ ] Answer "no" to the work-rights question and confirm the rejection wording is OK.
- [ ] Decide whether the retainer range (R350–R900) stays. It is invented.
- [ ] **Submit the form end to end with a real CV file** and confirm the application lands in the CRM and
      the PDF is readable on preview. The form was written and never exercised in a real browser; validation
      now uses email+phone shared rules.

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
- [x] **Referral form has no backend.** Wrong since at least August — `POST /api/referral/submit`
      writes `referral_partners` and generates the code. Submitted and read back from the
      database on 25 August 2026: partner `Jed`, code `KDUZY96B`, confirmation email in Primary.
- [x] **`/work`, `/about`, `/services`, `/contact` built 13 August** on a shared
      `PageShell`. `/pricing` and `/refer` are still homepage anchors.
- [x] **Four individual service pages built 14 August**, see [STATUS.md](STATUS.md):
      `/services/web-design`, `/services/paid-ads`, `/services/aeo`,
      `/services/business-automation`.
- [ ] **`/services` "LEARN MORE →" buttons still `href="#"`.** Point them at the four new
      service pages now that they exist.
- [ ] **`lib/chatbot/knowledge.ts` doesn't know the service pages exist.** The bot can
      describe the four services but can't point a visitor at their own page for one.
- [x] **Contact page form has no backend.** Also wrong — it has been wired for some time.
      Submitted and read back on 25 August 2026: a `contact_messages` row, a confirmation to the
      sender and a notification to Hugo, both delivered to Primary.
- [x] **`/work` "VIEW THE SITE" buttons.** Verified 13 August — they already point at the
      real client domains. The `#` note was stale.
- [x] **`/contact` contact-number field is not captured.** Captured — `handleSubmit` posts
      name, email, phone and message, and the phone arrives on the row. Verified 25 August 2026.
- [x] **About photo is a grey placeholder.** Done 17 August —
      `public/images/team/hugo-drummond.jpg` is now in the card as a `next/image` `fill`
      with `objectFit: cover`.
- [x] **The chat pill is a real chat widget.** Done 14 August — the `chat` A/B arm opens
      the on-site chatbot instead of linking to the dummy WhatsApp number.
- [ ] The reCAPTCHA badge sits under the floating pill in the bottom-right corner. The
      chatbot's own launcher was put bottom-left to stay clear of both.

**Free audit popup** — live and tested on production, 16 August 2026, see [STATUS.md](STATUS.md)

The audit is no longer a homepage section. It fires after 30 seconds on the site or on exit
intent, once per visit, on every page.

- [ ] **Watch whether the volume of audit requests goes up or down.** The old section only
      reached people who scrolled to it, but a popup is easier to dismiss on reflex.
      `audit_requests` rows per week is the number to compare.
- [x] **A way to open it on demand.** Done 16 August — the chatbot offers the audit when it
      is genuinely relevant and its button opens the popup, bypassing the once-per-visit
      rule. Still the only route back after a dismissal; a link in the nav or footer would
      be the obvious second one.
- [ ] **Re-run these four after any chatbot prompt or knowledge edit.** They are the ones
      that broke, each in a different way:
      1. vague complaint, then `url + email` in one message → audit runs
      2. website first, email two messages later → audit runs
      3. website given, no email yet → does NOT run, keeps asking
      4. quote request with url + email in the first message → does NOT run
- [ ] **Check the rate limit before anything else when an audit does not arrive.**
      `select key, hits, window_start from mountainstudios.rate_limits where route =
      'audit/submit'`. It is 15/hour per IP and shared with the popup form. Testing has hit
      it before and the symptom looks nothing like a limit.
- [ ] **Never add a route to `outputFileTracingIncludes`.** Adding `/api/chat` put the 66MB
      browser in the chat function and took the chatbot down — its cold start went past the
      DeepSeek timeout so every message returned the fallback apology. A new caller hands
      off to `/api/audit/submit` instead.
- [ ] **Watch for the bot promising an audit it did not start.** A phrasing that slips past
      `CLAIMS_RUNNING` in `app/api/chat/route.ts` would put the original silent-loss bug
      back.
- [ ] Exit intent cannot work on phones (no pointer to leave), so mobile visitors only ever
      get the 30-second trigger. Worth checking the mobile/desktop split of audit requests
      before assuming the timer is enough.

**Website audit engine** — end to end and verified in production, 16 August 2026

- [ ] Delete the test row in `audit_requests` tagged `source='audit-engine-test'`, and the
      antsawnings / jumpstart-uk test rows from 15-16 August. Retire the test lead to
      `crm_status='dead'` rather than deleting it — deleting destroys the scraper's dedupe.
- [x] Remove `/api/audit/diagnose` — deleted 28 Aug 2026. `scripts/audit-report-preview.ts` still
      covers local renderer testing.
- [x] `/api/audit/run` is gated on `Bearer CRON_SECRET` plus a rate limit, so a bare uuid can no
      longer re-run an audit or re-send the email.
- [ ] Decide whether the mobile screenshot gets surfaced anywhere. It is captured and stored, but
      neither emailed nor placed in the PDF.
- [ ] **The "In short" paragraph and the CTA under it can disagree.** `generateSummaryText()` in
      `lib/audit-report/render.ts` hardcodes "Speed, browser protection and accessibility" for any
      amber report, while `generateCtaPitch()` below it names the two checks that actually scored
      worst. Make the paragraph read from the same ranking.
- [x] The report cover shows the bare hostname (`jumpstart-uk.com`). **Decided 28 Aug 2026 (Hugo):
      leave it.** The URL is the name — it is what the prospect recognises, and it is the one value
      we always have. Do not add `<title>`/schema business-name scraping for this.
- [ ] **Watch for reports going out without their PDF.** The fallback now records the reason
      on the report: `select report->'delivery' from mountainstudios.audit_requests where
      report->'delivery' is not null;`. Any rows there mean someone got the plain written
      email instead of the branded PDF. One transient failure did this on 16 August and
      nobody would have known if Hugo had not noticed the missing attachment by eye.
- [ ] **`createBucket` and `.upload()` return their errors rather than throwing.** The
      `try/catch` around bucket creation in `lib/audit/run.ts` has therefore never fired,
      and a failed upload would not be caught at all — it would go on to attach a PDF that
      was never stored. Worth checking `up.error` explicitly.
- [ ] Sweep cron runs **daily** — the most Hobby allows. On Pro it could run every 15 minutes,
      which is the difference between a failed report being rescued within the hour or the day.

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

- [x] `GOOGLE_PSI_API_KEY` — PageSpeed Insights. Set in `.env.local` and in Vercel.
- [x] `CRON_SECRET` — gates `/api/audit/sweep` and `/api/audit/diagnose`. Vercel Cron sends it
      automatically as a bearer token once the variable exists. The sweep refuses to run at all
      when it is unset, rather than running unauthenticated.
- [ ] `CALENDLY_URL` — optional, and normally leave it unset. The booking link lives in
      `lib/calendly.ts`, which is the single source for all four consumers (chat widget,
      preview offer block, audit email, audit PDF). Default is
      `https://calendly.com/hugodrum6/introduction-call`.
      **Setting this variable does NOT change the chat widget** — a client component cannot
      read a non-`NEXT_PUBLIC_` variable — so a new booking link goes in the file, not here,
      or the chatbot keeps sending people to the old one.
      Until 31 Aug 2026 the default was `/30min`, which does not exist. Note that a dead
      Calendly event still returns **HTTP 200** and renders its error client-side, so curl
      and link checkers call it healthy — open it in a browser.

**Blocking for funnel tracking, once events matter**

- [ ] `SITE_EVENT_SALT` — any long random string, salts the IP + user agent hash on
      `site_events` and `site_visitors`. Unset it falls back to a default salt, which means
      the hash is guessable and stops being the privacy control it exists to be. Set it once
      and never rotate it — changing it makes every existing row stop matching new ones.

**Notification recipients**

- [ ] `NOTIFY_EMAIL` — internal recipients for notifications from contact form, brief submit, audit startup,
      and preview claim. Defaults to `hugodrum6@gmail.com` if unset. Set in Vercel when the default is
      no longer wanted.

**Already set, listed so nothing gets removed by accident**

- `AWS_REGION`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` — SES, used by the Get Started
  brief notification and contact form email. The careers form deliberately sends no email.
- `ANTHROPIC_API_KEY`, `PEXELS_API_KEY` — preview generation.
- `NEXT_PUBLIC_APP_URL`, `DEEPSEEK_API_KEY` — the latter is used by `/api/preview/scrape`
  (stock photo proxy) and by the chatbot at `/api/chat`, not the deleted screening
  endpoint. Removing it takes the chatbot down.

## Data cleanup

- [x] **Clear test leads.** Done 25 August 2026, matched on exact test addresses rather than
      name patterns. Inbound leads, contact messages and audit requests all back to zero; the
      1,770 scraped leads and `anton@ultimitspit.co.za` untouched.
- [x] **Clear test contact messages.** Done — the table is empty as of 25 August 2026.
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

## Funnel tracking — 29 August 2026

Tiers 1 is live end to end and the dashboard is up. The remaining work is Tier 2 and the
SES config set. **The plan is committed at `~/mountainstudios-crm/docs/funnel-tracking-plan.md`
— read it before picking any of this up.**

Done: `013_site_events.sql` and `014_funnel_functions.sql` applied and verified, the
client and server event helpers, `/api/site-event`, `SiteEvents` in the layout,
`visitor_id` stamped on the four lead-creating routes with retroactive event stitching,
the Tier 1 call sites, the preview-page tracker, and `/funnel` in the CRM.

- [ ] **`pg_cron` is not installed on this Supabase project.** The `site_events` 180-day
      prune was never scheduled, and neither were the two jobs in the CRM's
      `010_mail_cron.sql`. Both migrations swallow the failure as a warning and read as if
      the jobs exist. Install the extension or delete the claim from both files.
- [ ] **Tier 2 events, and the wizard is the one that matters.** `wizard_step` (1–7 with
      seconds per step), `chat_opened`, `chat_message` with the turn index, and
      `chat_offer_shown` / `chat_offer_taken` with the offer type in `props.label`.
      Until these exist, three sections of `/funnel` are empty and the wizard drop-off —
      the actual question this was built to answer — cannot be seen.
- [ ] Store the template variant on `shared_previews` and echo it from the preview
      tracker, so `site_previews` can split scroll, dwell and offers by template instead
      of reporting them on one `(all previews)` row.
- [ ] Nothing verifies that a real browser session produces a clean funnel. Walk the
      wizard end to end in a browser and read `site_funnel` back.
- [ ] SES configuration set so bounces and complaints can be attributed to site mail.
      **Open and click tracking must be off** — link rewriting and a tracking pixel are
      exactly what cost the preview email its Primary placement on 23 August. An empty
      `ConfigurationSetName` is rejected by SES and would kill every notification email at
      once, so the `lib/ses.ts` guard matters.

## Chatbot — 29 August 2026

- [ ] **Re-test the tone rules after any edit to `knowledge.ts`.** Length (two sentences,
      ~30 words), no warm-up opener, varied sentence shape, no "anything else?" close.
      Every one of these regressed at least once while being written.
- [ ] Re-test the three existing-website paths: "nobody phones us" must offer the preview,
      "slow on phones" must offer the audit, "it works and I'm happy" must be left alone.
- [ ] Re-test the referral branch: a referrer must never be offered a preview and must be
      sent to `/refer/terms`.
- [ ] The business-name repeat is held down by code in `app/api/chat/route.ts`, not by the
      prompt. If that strip is ever removed the prompt alone will not hold it.
- [ ] Consider whether the chatbot belongs on `/p/[token]` asking "what do you think?".
      Deferred 29 August — the page is a raw document, not the React app, so it would mean
      a second injected vanilla-JS widget competing with the offer card already there.
