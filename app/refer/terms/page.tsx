'use client'

import PageShell from '@/components/site/PageShell'
import ReferralForm from '@/components/site/ReferralForm'

export default function ReferTerms() {
  return (
    <PageShell
      eyebrow="REFERRAL PROGRAM"
      title={<>Refer a business. Get up to <em style={{ fontStyle: 'italic' }}>R1000</em>.</>}
      sub="How the program works, in full."
      ctaOverride={<ReferralForm />}
    >
      <div style={{
        background: '#f4f2fa',
        padding: '4rem 2rem',
      }}>
        <div style={{
          maxWidth: '760px',
          margin: '0 auto',
        }}>
          <h2 style={{
            fontFamily: 'var(--font-source-sans), "Source Sans 3", sans-serif',
            fontWeight: 700,
            fontSize: '1.6rem',
            color: '#1a1a2e',
            margin: '0 0 2rem',
          }}>
            How it works
          </h2>

          <ol style={{
            margin: '0 0 3rem',
            padding: '0 0 0 1.2rem',
            fontSize: '1rem',
            color: '#5d6478',
            lineHeight: 1.7,
          }}>
            <li style={{ marginBottom: '0.75rem' }}>Give us your details and we email you a unique referral link.</li>
            <li style={{ marginBottom: '0.75rem' }}>Forward it to any business that needs a website.</li>
            <li>They book a meeting with Hugo and sign with us — you earn 25% of every instalment they pay, up to R1000 total.</li>
          </ol>

          <h2 style={{
            fontFamily: 'var(--font-source-sans), "Source Sans 3", sans-serif',
            fontWeight: 700,
            fontSize: '1.6rem',
            color: '#1a1a2e',
            margin: '0 0 2rem',
          }}>
            Terms
          </h2>

          <ul style={{
            margin: 0,
            padding: '0 0 0 1.2rem',
            fontSize: '1rem',
            color: '#5d6478',
            lineHeight: 1.7,
          }}>
            <li style={{ marginBottom: '1rem' }}>
              <strong style={{ color: '#1a1a2e' }}>Payout.</strong> A referral only counts once the business books a meeting with Hugo — passing on a name or a number earns nothing on its own. From there you earn 25% of every instalment they pay, up to R1000 total per referred business, paid via EFT as each instalment comes in. For example, a R400 build paid in three R200, R100, R100 instalments earns you R50, then R25, then R25.
            </li>
            <li style={{ marginBottom: '1rem' }}>
              <strong style={{ color: '#1a1a2e' }}>No limit.</strong> Refer as many businesses as you like — there&apos;s no cap on how much you can earn.
            </li>
            <li style={{ marginBottom: '1rem' }}>
              <strong style={{ color: '#1a1a2e' }}>Your link doesn&apos;t expire.</strong> Use it whenever a referral comes up.
            </li>
            <li>
              <strong style={{ color: '#1a1a2e' }}>Questions?</strong> Email <a href="mailto:hello@mountainstudios.co.za" style={{ color: '#7d3d4f' }}>hello@mountainstudios.co.za</a>.
            </li>
          </ul>
        </div>
      </div>
    </PageShell>
  )
}
