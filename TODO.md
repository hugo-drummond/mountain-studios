# TODO

## Test it yourself

Everything below has been tested by script and against the database. None of it has
been used by a person yet. Work through it once before any of this goes near a real
applicant or prospect.

**Careers page** — `/careers/sales-rep`

- [ ] Read it on your phone, not just a laptop. It is going on LinkedIn and most
      applicants will only ever see it at 375px wide.
- [ ] Drag both calculator sliders. Check the numbers read the way you'd say them out
      loud, and that dragging clients to zero showing R0 feels honest rather than bleak.
- [ ] Submit a real application as if you were a candidate, PDF CV attached. Then check the
      row landed in the database.
- [ ] Answer "no" to the work-rights question and confirm the rejection wording is one
      you're happy to put in front of a real person.
- [ ] Decide whether the retainer range (R350–R900) stays. It is invented — see below.

**Shared previews**

- [ ] Generate a preview, share it, and open the link on your own phone.
- [ ] Paste the link into a WhatsApp chat with yourself. The card should show the business
      name, and the view count must stay at zero until you actually tap it. This is the
      part most worth checking by hand — it is the thing reps will trust.
- [ ] Tap "I want this website" and confirm the lead appears in the CRM and the email
      arrives at hello@.
- [ ] Revoke a link and confirm it dies for the client.

## Vercel environment variables

Set these in the Vercel project settings for mountain-studios. Names only —
values live in `.env.local` locally, never in this file.

**Blocking — the careers form fails in production without them**

- [ ] `CRM_SUPABASE_URL` — the CRM database (Frankies project). Missing means every
      application returns a 502 and the applicant is told to try again. Lost candidates.
- [ ] `CRM_SUPABASE_SERVICE_KEY` — same. Service role, bypasses RLS, must never be
      exposed to the browser or given a `NEXT_PUBLIC_` prefix.

**Blocking for shared previews, once the CRM calls the share endpoint**

- [ ] `PREVIEW_SHARE_KEY` — any long random string, the same value in both this project
      and the CRM. Without it only an admin-cookie session can create share links. A
      local dev value is already in `.env.local`; production needs its own.

**Blocking for the admin area**

- [ ] `ADMIN_PASSWORD` — without it `/admin` cannot be logged into at all. This now
      gates previews and notifications; the applications review table has moved to the
      CRM and has its own Supabase login.

**Already set, listed so nothing gets removed by accident**

- `AWS_REGION`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` — SES, used by the Get Started
  brief notification. The careers form deliberately sends no email.
- `ANTHROPIC_API_KEY`, `PEXELS_API_KEY` — preview generation.
- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`, `RECAPTCHA_SECRET_KEY`, `NEXT_PUBLIC_APP_URL`.

## Careers pipeline — deferred

- [ ] **Confirm the retainer range.** `app/careers/sales-rep/page.tsx` states R350–R900 a
      month publicly. That number was invented — nothing in the repo records the real one.
      It sets what reps expect to earn and what they quote clients.
- [ ] **Delete the three test applications** in `mountainstudios.rep_applications`
      (asdf asdf, Thandeka Mokoena, Peter Nel) if they still exist.

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

## Known bugs

- [ ] **The homepage contact form sends nothing.** `app/page.tsx` — submitting sets a flag
      and renders a thank-you; the name, email, phone and message are discarded. Every
      enquiry ever typed into it is gone. Same bug `/api/brief/submit` was built to fix.
