import type { Metadata } from 'next'
import { OG_IMAGES, TWITTER_IMAGES } from '@/lib/og'
import PageShell from '@/components/site/PageShell'
import JsonLd from '@/components/site/JsonLd'
import { serviceSchema, breadcrumbSchema } from '@/lib/schema'
import DeviceMockup from '@/components/site/DeviceMockup'

const TITLE = 'Web Design — Mountain Studios'
const DESCRIPTION =
  'Simple, good-looking websites for South African businesses. One person designs and builds your site start to finish, live in about 14 days.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/services/web-design' },
  openGraph: { title: TITLE, description: DESCRIPTION , images: OG_IMAGES },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION , images: TWITTER_IMAGES },
}

const SCHEMA = serviceSchema({
  name: 'Web design',
  description: DESCRIPTION,
  path: '/services/web-design',
  serviceType: 'Web design and development',
})

const BREADCRUMBS = breadcrumbSchema([
  { name: 'Services', path: '/services' },
  { name: 'Web design', path: '/services/web-design' },
])

const features = [
  {
    name: 'Mobile-first',
    desc: 'Most of your customers arrive on a phone. Every site is built and checked on mobile before it ever gets a desktop pass.',
    icon: (
      <svg width="34" height="34" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ stroke: '#1a1a2e', strokeWidth: 1.5 }}>
        <rect x="11" y="4" width="18" height="32" rx="2.5" />
        <line x1="11" y1="28" x2="29" y2="28" />
        <circle cx="20" cy="32" r="1.2" fill="#1a1a2e" />
      </svg>
    ),
  },
  {
    name: 'Live in ~14 days',
    desc: 'From the day we have your content — photos, a menu, an old brochure — your site is typically live within two weeks.',
    icon: (
      <svg width="34" height="34" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ stroke: '#1a1a2e', strokeWidth: 1.5 }}>
        <circle cx="20" cy="20" r="16" />
        <path d="M20 11V20L26 24" />
      </svg>
    ),
  },
  {
    name: 'One person, start to finish',
    desc: 'No handoffs, no account managers. The person who designs your site is the person who builds it and answers your emails.',
    icon: (
      <svg width="34" height="34" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ stroke: '#1a1a2e', strokeWidth: 1.5 }}>
        <circle cx="20" cy="13" r="7" />
        <path d="M6 34C6 25.716 12.268 20 20 20C27.732 20 34 25.716 34 34" />
      </svg>
    ),
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
            You supply the content — the words and images for each page — and we design the site around
            it, with your approval before it goes live. Hosting, the SSL certificate and the domain are included, and updates,
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
      <JsonLd data={SCHEMA} />
      <JsonLd data={BREADCRUMBS} />
    </PageShell>
  )
}
