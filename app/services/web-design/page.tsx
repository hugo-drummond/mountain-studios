import type { Metadata } from 'next'
import PageShell from '@/components/site/PageShell'
import DeviceMockup from '@/components/site/DeviceMockup'

const TITLE = 'Web Design — Mountain Studios'
const DESCRIPTION =
  'Simple, good-looking websites for South African businesses. One person designs and builds your site start to finish, live in about 14 days.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
}

const features = [
  {
    name: 'Mobile-first',
    desc: 'Most of your customers arrive on a phone. Every site is built and checked on mobile before it ever gets a desktop pass.',
  },
  {
    name: 'Live in ~14 days',
    desc: 'From the day we have your content — photos, a menu, an old brochure — your site is typically live within two weeks.',
  },
  {
    name: 'One person, start to finish',
    desc: 'No handoffs, no account managers. The person who designs your site is the person who builds it and answers your emails.',
  },
]

export default function WebDesignPage() {
  return (
    <PageShell
      eyebrow="SERVICES"
      title={<>A website that <em style={{ fontStyle: 'italic' }}>does its job.</em></>}
      sub="Simple, good-looking, and built around how your customers actually find and call you — not a template with your logo dropped in."
      heroImage={<DeviceMockup src="/images/portfolio/coimbra-bakery.jpg" alt="Coimbra Bakery, a website built by Mountain Studios" />}
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
            Built by hand, not assembled from a template.
          </h2>

          <p style={{ fontSize: '1.02rem', color: '#3d4358', lineHeight: 1.6, margin: 0 }}>
            You don&apos;t need to write the content — send what you have and we write the rest, you approve
            it before it goes live. Hosting, the SSL certificate and the domain are included, and updates,
            backups and small changes are part of the monthly retainer, not a separate invoice. The site,
            the domain and the content are yours — if you ever cancel, the site stays yours.
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
            }}>
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
          ))}
        </div>
      </div>
    </PageShell>
  )
}
