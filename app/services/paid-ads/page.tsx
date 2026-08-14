import type { Metadata } from 'next'
import PageShell from '@/components/site/PageShell'
import DeviceMockup from '@/components/site/DeviceMockup'

const TITLE = 'Paid Ads — Mountain Studios'
const DESCRIPTION =
  'Google and Meta campaigns for South African businesses that bring in enquiries, not just clicks.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
}

const features = [
  {
    name: 'Google & Meta',
    desc: 'Campaigns run where your customers are already searching and scrolling — Google Search and Meta (Facebook & Instagram).',
    icon: (
      <svg width="34" height="34" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ stroke: '#1a1a2e', strokeWidth: 1.5 }}>
        <circle cx="20" cy="20" r="14" />
        <circle cx="20" cy="20" r="8" />
        <path d="M20 12V28M12 20H28" />
      </svg>
    ),
  },
  {
    name: 'Built for enquiries',
    desc: "Campaigns are pointed at getting your phone to ring or your inbox to fill up — not just at driving clicks.",
    icon: (
      <svg width="34" height="34" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ stroke: '#1a1a2e', strokeWidth: 1.5 }}>
        <path d="M8 26L8 12C8 10.895 8.895 10 10 10L30 10C31.105 10 32 10.895 32 12L32 22C32 23.105 31.105 24 30 24L14 24L8 30V26Z" />
      </svg>
    ),
  },
  {
    name: 'One person, start to finish',
    desc: 'No handoffs, no account managers. The person who sets up your campaigns is the person who runs them.',
    icon: (
      <svg width="34" height="34" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ stroke: '#1a1a2e', strokeWidth: 1.5 }}>
        <circle cx="20" cy="13" r="7" />
        <path d="M6 34C6 25.716 12.268 20 20 20C27.732 20 34 25.716 34 34" />
      </svg>
    ),
  },
]

export default function PaidAdsPage() {
  return (
    <PageShell
      eyebrow="SERVICES"
      title={<>Ads that bring <em style={{ fontStyle: 'italic' }}>enquiries.</em></>}
      sub="Google and Meta campaigns built for South African businesses — aimed at getting people to call, not just to click."
      heroImage={<DeviceMockup src="/images/portfolio/bali-blinds.jpg" alt="Bali Blinds, a website built by Mountain Studios" />}
      heroCta={{ label: 'See your site free', href: '/start-your-project' }}
    >
      <div style={{ padding: '5rem 2rem 2rem' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{
            fontSize: '0.85rem',
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#7d3d4f',
            margin: '0 0 1rem',
          }}>WHAT YOU GET</p>

          <h2 style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
            fontWeight: 400,
            color: '#1a1a2e',
            margin: '0 0 1.25rem',
            lineHeight: 1.15,
          }}>
            Campaigns run by the person who built them.
          </h2>

          <p style={{ fontSize: '1.02rem', color: '#3d4358', lineHeight: 1.6, margin: 0 }}>
            Google and Meta campaigns, set up and managed for small South African businesses — built to
            bring in enquiries, not just clicks. Enquiries through your site get a reply within one
            business day.
          </p>
        </div>
      </div>

      <div style={{ padding: '3rem 2rem 5rem' }}>
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
          gap: '1.5rem',
        }}>
          {features.map((feature) => (
            <div key={feature.name} style={{
              background: '#fff',
              borderRadius: '14px',
              padding: '2rem 1.75rem',
              boxShadow: '0 18px 40px -22px rgba(26,26,46,0.35)',
              display: 'flex',
              gap: '1.1rem',
            }}>
              <div style={{ flexShrink: 0 }}>{feature.icon}</div>

              <div>
                <h3 style={{
                  fontFamily: 'var(--font-source-sans), "Source Sans 3", sans-serif',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  color: '#1a1a2e',
                  margin: '0 0 0.75rem',
                }}>
                  {feature.name}
                </h3>
                <p style={{ fontSize: '0.92rem', color: '#5d6478', lineHeight: 1.55, margin: 0 }}>
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  )
}
