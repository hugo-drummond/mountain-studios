# TODO

## Vercel environment variables

Set these in the Vercel project settings for mountain-studios. Names only —
values live in `.env.local` locally, never in this file.

**Blocking — the careers form fails in production without them**

- [ ] `CRM_SUPABASE_URL` — the CRM database (Frankies project). Missing means every
      application returns a 502 and the applicant is told to try again. Lost candidates.
- [ ] `CRM_SUPABASE_SERVICE_KEY` — same. Service role, bypasses RLS, must never be
      exposed to the browser or given a `NEXT_PUBLIC_` prefix.

**Blocking for the review table**

- [ ] `ADMIN_PASSWORD` — without it `/admin/applications` cannot be logged into at all.
      Applications still save; you just can't read them anywhere but the database.

**Not blocking, but nothing gets scored until it's done**

- [ ] `DEEPSEEK_API_KEY` — the key currently in `.env.local` is dead (401 from DeepSeek's
      own balance endpoint, confirmed 8 Aug 2026). Applications save fine and sit with
      `screened_at` null; opening the review table sweeps them up once a valid key exists.

**Already set, listed so nothing gets removed by accident**

- `AWS_REGION`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` — SES, used by the Get Started
  brief notification. The careers form deliberately sends no email.
- `ANTHROPIC_API_KEY`, `PEXELS_API_KEY` — preview generation.
- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`, `RECAPTCHA_SECRET_KEY`, `NEXT_PUBLIC_APP_URL`.

## Careers pipeline — deferred

- [ ] **Discord webhook for strong candidates.** `lib/screen-application.ts` scores every
      application and marks the good ones `strong`; `notified_at` exists on the table and is
      unused. Create the webhook in Discord server settings, add `DISCORD_WEBHOOK_URL`, and
      post an embed (name, city, score, one-line summary, link to the review table) when a
      strong verdict lands. Stamp `notified_at` so it can never double-post.
- [ ] **Confirm the retainer range.** `app/careers/sales-rep/page.tsx` states R350–R900 a
      month publicly. That number was invented — nothing in the repo records the real one.
      It sets what reps expect to earn and what they quote clients.
- [ ] **Delete the three test applications** in `mountainstudios.rep_applications`
      (asdf asdf, Thandeka Mokoena, Peter Nel) once the review table has been eyeballed.

## Known bugs

- [ ] **The homepage contact form sends nothing.** `app/page.tsx` — submitting sets a flag
      and renders a thank-you; the name, email, phone and message are discarded. Every
      enquiry ever typed into it is gone. Same bug `/api/brief/submit` was built to fix.
