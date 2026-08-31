import type { Metadata } from 'next'
import PageShell from '@/components/site/PageShell'
import DeviceMockup from '@/components/site/DeviceMockup'

const TITLE = 'Business Automation — Mountain Studios'
const DESCRIPTION =
  'Bookings, invoices and follow-ups that run themselves — automation for South African businesses.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/services/business-automation' },
  openGraph: { title: TITLE, description: DESCRIPTION },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
}

const features = [
  {
    name: 'Bookings that run themselves',
    desc: 'Customers book straight into your calendar, no back-and-forth messages needed.',
    icon: (
      <svg width="34" height="34" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ stroke: '#1a1a2e', strokeWidth: 1.5 }}>
        <rect x="6" y="8" width="28" height="26" rx="2.5" />
        <line x1="6" y1="16" x2="34" y2="16" />
        <line x1="13" y1="5" x2="13" y2="11" />
        <line x1="27" y1="5" x2="27" y2="11" />
      </svg>
    ),
  },
  {
    name: 'Invoices, handled',
    desc: 'Invoices and follow-ups go out on their own, so nothing sits waiting on you to remember it.',
    icon: (
      <svg width="34" height="34" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ stroke: '#1a1a2e', strokeWidth: 1.5 }}>
        <path d="M11 5H29V35L24 32L20 35L16 32L11 35V5Z" />
        <line x1="16" y1="14" x2="24" y2="14" />
        <line x1="16" y1="20" x2="24" y2="20" />
      </svg>
    ),
  },
  {
    name: 'One person, start to finish',
    desc: 'No handoffs, no account managers. The person who builds your automations is the person who answers your emails.',
    icon: (
      <svg width="34" height="34" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ stroke: '#1a1a2e', strokeWidth: 1.5 }}>
        <circle cx="20" cy="13" r="7" />
        <path d="M6 34C6 25.716 12.268 20 20 20C27.732 20 34 25.716 34 34" />
      </svg>
    ),
  },
]

export default function BusinessAutomationPage() {
  return (
    <PageShell
      eyebrow="SERVICES"
      title={<>Follow-ups that <em style={{ fontStyle: 'italic' }}>run themselves.</em></>}
      sub="Bookings, invoices and follow-ups automated, so your South African business keeps moving without you chasing every step."
      heroImage={<DeviceMockup src="/images/portfolio/houtbay-curtain-call.jpg" alt="Hout Bay Curtain Call, a website built by Mountain Studios" />}
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
            The busywork, taken off your plate.
          </h2>

          <p style={{ fontSize: '1.02rem', color: '#3d4358', lineHeight: 1.6, margin: 0 }}>
            Bookings, invoices and follow-ups set up to run on their own, so you spend less time chasing
            admin and more time running the business.
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
