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
              I started Mountain Studios with one goal in mind: to provide great value to businesses small and large. I do this by providing a smooth onboarding process, a collaborative design and build phase, and a great site delivered time and time again.
            </p>

            <p style={{
              fontSize: '1rem',
              color: '#5d6478',
              lineHeight: 1.7,
              margin: '0 0 1.5rem',
            }}>
              I&rsquo;m not happy with the result till you&rsquo;re happy with the result.
            </p>

            <p style={{
              fontSize: '1rem',
              color: '#5d6478',
              lineHeight: 1.7,
              margin: 0,
            }}>
              After launch we&rsquo;re happy to look after your site. Hosting, backups and changes are our speciality!
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
