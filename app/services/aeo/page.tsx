import type { Metadata } from 'next'
import PageShell from '@/components/site/PageShell'
import DeviceMockup from '@/components/site/DeviceMockup'

const TITLE = 'AEO — Answer Engine Optimisation — Mountain Studios'
const DESCRIPTION =
  'Getting your South African business named in AI search answers — ChatGPT, Google AI Overviews and the rest.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/services/aeo' },
  openGraph: { title: TITLE, description: DESCRIPTION },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
}

const features = [
  {
    name: 'Built for AI search',
    desc: 'Your site is structured so AI assistants can read it clearly and confidently name your business in their answers.',
    icon: (
      <svg width="34" height="34" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ stroke: '#1a1a2e', strokeWidth: 1.5 }}>
        <circle cx="18" cy="14" r="4" />
        <path d="M14 28L18 20L22 28" />
        <path d="M28 28C28 22.477 24.418 18 20 18" />
      </svg>
    ),
  },
  {
    name: 'Named, not just listed',
    desc: 'The goal is your business coming up as an answer — someone asks an AI assistant a question, and yours is the name it gives.',
    icon: (
      <svg width="34" height="34" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ stroke: '#1a1a2e', strokeWidth: 1.5 }}>
        <path d="M8 28L8 14C8 12.895 8.895 12 10 12L30 12C31.105 12 32 12.895 32 14L32 24C32 25.105 31.105 26 30 26L14 26L8 32V28Z" />
      </svg>
    ),
  },
  {
    name: 'One person, start to finish',
    desc: 'No handoffs, no account managers. The person who does the work is the person who answers your emails.',
    icon: (
      <svg width="34" height="34" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ stroke: '#1a1a2e', strokeWidth: 1.5 }}>
        <circle cx="20" cy="13" r="7" />
        <path d="M6 34C6 25.716 12.268 20 20 20C27.732 20 34 25.716 34 34" />
      </svg>
    ),
  },
]

export default function AeoPage() {
  return (
    <PageShell
      eyebrow="SERVICES"
      title={<>Get named in <em style={{ fontStyle: 'italic' }}>AI answers.</em></>}
      sub="Answer engine optimisation — getting your South African business named when people ask AI assistants for a recommendation."
      heroImage={<DeviceMockup src="/images/portfolio/pie-in-the-sky.jpg" alt="Pie in the Sky, a website built by Mountain Studios" />}
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
            Search is changing. Your site should keep up.
          </h2>

          <p style={{ fontSize: '1.02rem', color: '#3d4358', lineHeight: 1.6, margin: 0 }}>
            More people are asking AI assistants for recommendations instead of scrolling search results.
            AEO is about making sure your business is the name they get back.
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
