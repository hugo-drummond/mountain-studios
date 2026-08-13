'use client'

import PageShell from '@/components/site/PageShell'

export default function About() {
  return (
    <PageShell
      eyebrow="ABOUT MOUNTAIN STUDIOS"
      title={<>We build the website, then we <em style={{ fontStyle: 'italic' }}>stay for the boring part.</em></>}
      sub="Hosting, updates, the things most agencies hand back and forget."
    >
      <div style={{
        background: '#f4f2fa',
        padding: '4rem 2rem',
      }}>
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr',
          gap: '3rem',
          alignItems: 'start',
        }} className="page-shell-grid">
          {/* LEFT COLUMN */}
          <div>
            <h2 style={{
              fontFamily: 'var(--font-source-sans), "Source Sans 3", sans-serif',
              fontWeight: 700,
              fontSize: '1.6rem',
              color: '#1a1a2e',
              margin: '0 0 2rem',
            }}>
              How the studio works
            </h2>

            <p style={{
              fontSize: '1rem',
              color: '#5d6478',
              lineHeight: 1.7,
              margin: '0 0 1.5rem',
            }}>
              We're a small Cape Town studio. We learn how a business actually gets its customers before we design anything.
            </p>

            <p style={{
              fontSize: '1rem',
              color: '#5d6478',
              lineHeight: 1.7,
              margin: '0 0 1.5rem',
            }}>
              One person designs and builds your site start to finish — no handoffs, no account managers, no waiting a week for a reply.
            </p>

            <p style={{
              fontSize: '1rem',
              color: '#5d6478',
              lineHeight: 1.7,
              margin: 0,
            }}>
              After launch we stay on: hosting, updates, backups and small changes are part of the deal, not an invoice.
            </p>
          </div>

          {/* RIGHT COLUMN */}
          <div>
            <div style={{
              background: '#fff',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 18px 40px -22px rgba(26,26,46,0.35)',
              maxWidth: '360px',
              margin: '0 auto',
            }}>
              <div style={{
                background: '#d8d5e0',
                aspectRatio: '1',
                borderRadius: '8px',
                margin: '10px',
              }} />
              <div style={{
                padding: '1.5rem',
                textAlign: 'center',
              }}>
                <p style={{
                  fontSize: '0.85rem',
                  color: '#5d6478',
                  margin: 0,
                }}>
                  Hugo, founder
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  )
}
