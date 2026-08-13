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
      The top bar and the floating chat pill both point at it, so both are dead links.
- [ ] **Real Google reviews.** Three cards say "Placeholder review". The score card says
      "XX Google reviews" and its "Read on Google" button goes to `#`.
- [ ] **Footer social links.** Instagram, Facebook, LinkedIn and Google are all `#`.
- [ ] **Work grid images.** Three of the six are photographs, not site screenshots
      (`ada.jpg`, `coimbra-bakery.jpg`, `pie-in-the-sky.jpg`), and the two tilted hero
      cards reuse the first two. The mockups show screenshots throughout.

Still to build:

- [ ] **Audit form has no backend.** Submitting shows a thank-you and drops the URL.
      Needs somewhere to write, or the section should come down.
- [ ] **Referral form has no backend.** Same — name, email and mobile go nowhere, and no
      referral link is generated.
- [ ] **`/work`, `/pricing`, `/refer`, `/about` do not exist.** Nav and footer point at
      homepage anchors for now, and the nav's fourth link reads REVIEWS because there is
      no About section left to anchor to.
- [ ] **The chat pill is a WhatsApp link, not a chat widget.** Deliberate for now.
- [ ] The reCAPTCHA badge sits under the chat pill in the bottom-right corner.

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

**Already set, listed so nothing gets removed by accident**

- `AWS_REGION`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` — SES, used by the Get Started
  brief notification and contact form email. The careers form deliberately sends no email.
- `ANTHROPIC_API_KEY`, `PEXELS_API_KEY` — preview generation.
- `NEXT_PUBLIC_APP_URL`, `DEEPSEEK_API_KEY` — the latter is used by `/api/preview/scrape`
  (stock photo proxy), not the deleted screening endpoint.

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

