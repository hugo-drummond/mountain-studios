// The score threshold is deliberately low. reCAPTCHA v3 is harsh on a site it
// has barely seen, and a new key on low traffic routinely scores real people
// around 0.3. Nothing is blocked on this either way — it only decides whether
// the row carries a warning — so the cost of being generous is a note we did
// not need, and the cost of being strict is doubting every genuine lead.
const RECAPTCHA_MIN_SCORE = 0.3

// Distinguishes configuration/infrastructure failures from visitor verdicts.
// Principle: A misconfiguration on our side is a fact about us, not about the lead.
// Configuration failures belong in the server log, not in the sales note.
function isOurFault(verdict: string): boolean {
  return (
    verdict.startsWith('no secret configured') ||
    verdict.startsWith('no score returned') ||
    verdict.startsWith('could not reach Google')
  )
}

export interface RecaptchaResult {
  verdict: string
  passed: boolean
  ourFault: boolean
}

// Returns a human-readable verdict, not a boolean. What went wrong matters:
// "we could not check" and "Google says this is a bot" are different facts
// about a lead, and collapsing them makes the note useless for triage.
export async function verifyRecaptcha(token?: string): Promise<RecaptchaResult> {
  // The site key is bound to the live domain, so reCAPTCHA never returns a
  // usable token in local development. Treat as passed to allow local testing.
  let verdict: string
  if (process.env.NODE_ENV !== 'production') {
    verdict = 'passed'
  } else {
    const secret = process.env.RECAPTCHA_SECRET_KEY
    if (!secret) {
      verdict = 'no secret configured'
    } else if (!token) {
      verdict = 'no token from the browser'
    } else {
      try {
        const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `secret=${secret}&response=${token}`,
        })
        const data = await res.json()

        if (data.success === true) {
          // v3 always returns a score. Its absence means a v2 key is registered
          // against a v3 call, which is a configuration fault, not a verdict.
          if (typeof data.score !== 'number') {
            verdict = 'no score returned — is the key reCAPTCHA v3?'
          } else {
            verdict = data.score >= RECAPTCHA_MIN_SCORE ? 'passed' : `scored ${data.score}`
          }
        } else {
          const codes = Array.isArray(data['error-codes']) ? data['error-codes'].join(', ') : 'no reason given'
          verdict = `rejected by Google (${codes})`
        }
      } catch (err) {
        verdict = `could not reach Google (${err instanceof Error ? err.message : 'unknown'})`
      }
    }
  }

  const ourFault = isOurFault(verdict)
  const passed = verdict === 'passed'

  return { verdict, passed, ourFault }
}

// The test the expensive endpoints use — preview generation, the site scraper
// and the chatbot, each of which spends real money on every call.
//
// An allowlist of blocking verdicts, not "anything that is not a pass". Two
// reasons, and both have already cost a real customer on this site:
//
//   * A missing token is NOT a bot signal. The browser races executeRecaptcha
//     against a 5-second timeout and sends nothing when it loses, so an ad
//     blocker, a privacy extension or a network that cannot reach Google all
//     arrive here with no token — exactly the visitor the wizard exists for.
//     On 10 August arming reCAPTCHA broke the preview for a live customer
//     within minutes; blocking on a missing token would do it again.
//   * Written as a denylist, any verdict string added later would block by
//     default. As an allowlist, a new verdict lets people through until
//     somebody decides otherwise, which is the safe direction to fail in.
//
// What is left is a genuine judgement by Google about this specific visitor:
// a score below the threshold, or an outright rejection. Everything else is
// held off by the rate limit, which is what actually stops a headless bot —
// one that never loads reCAPTCHA at all has no token to judge.
export function blockedAsBot(result: RecaptchaResult): boolean {
  if (result.passed || result.ourFault) return false
  return result.verdict.startsWith('scored ') || result.verdict.startsWith('rejected by Google')
}
