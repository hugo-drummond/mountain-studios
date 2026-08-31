import type { Metadata } from 'next'
import { OG_IMAGES, TWITTER_IMAGES } from '@/lib/og'
import PageShell from '@/components/site/PageShell'
import JsonLd from '@/components/site/JsonLd'
import { ANSWERS } from './answers'
import { breadcrumbSchema, SITE_URL } from '@/lib/schema'

const TITLE = 'Answers — Straight Answers About Websites in South Africa'
const DESCRIPTION =
  'What a website costs, how long it takes, who owns it, and whether you need one at all. Plain answers to the questions South African business owners actually ask.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/answers' },
  openGraph: { title: TITLE, description: DESCRIPTION , images: OG_IMAGES },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION , images: TWITTER_IMAGES },
}

const ITEM_LIST = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Answers',
  itemListElement: ANSWERS.map((a, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    url: `${SITE_URL}/answers/${a.slug}`,
    name: a.question,
  })),
}

export default function AnswersHub() {
  return (
    <PageShell
      eyebrow="ANSWERS"
      title={<>The questions people <em style={{ fontStyle: 'italic' }}>actually ask.</em></>}
      sub="Prices, timelines and ownership, answered straight. No forms, no call required."
    >
      <div style={{ background: '#f4f2fa', padding: '4rem 2rem 5rem' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          {ANSWERS.map((a) => (
            <a
              key={a.slug}
              href={`/answers/${a.slug}`}
              style={{
                display: 'block',
                background: '#fff',
                borderRadius: '12px',
                padding: '1.6rem 1.7rem',
                marginBottom: '1rem',
                textDecoration: 'none',
                boxShadow: '0 14px 34px -26px rgba(26,26,46,0.5)',
              }}
            >
              <h2
                style={{
                  fontFamily: 'var(--font-playfair), Georgia, serif',
                  fontSize: '1.45rem',
                  fontWeight: 400,
                  color: '#1a1a2e',
                  margin: '0 0 0.6rem',
                }}
              >
                {a.question}
              </h2>
              <p style={{ fontSize: '0.98rem', color: '#5d6478', lineHeight: 1.65, margin: 0 }}>
                {a.metaDescription}
              </p>
            </a>
          ))}
        </div>
      </div>

      <JsonLd data={ITEM_LIST} />
      <JsonLd data={breadcrumbSchema([{ name: 'Answers', path: '/answers' }])} />
    </PageShell>
  )
}
