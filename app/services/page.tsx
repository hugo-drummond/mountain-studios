'use client'

import PageShell from '@/components/site/PageShell'

const services = [
  {
    name: 'Web design',
    desc: 'Simple, good-looking websites for small South African businesses.',
    icon: (
      <svg width="80" height="80" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ stroke: '#1a1a2e', strokeWidth: 1.5 }}>
        <rect x="2" y="4" width="36" height="32" rx="2" />
        <line x1="2" y1="10" x2="38" y2="10" />
        <circle cx="6" cy="7" r="1" fill="#1a1a2e" />
        <circle cx="11" cy="7" r="1" fill="#1a1a2e" />
      </svg>
    ),
  },
  {
    name: 'Paid ads',
    desc: 'Google and Meta campaigns that bring in enquiries, not just clicks.',
    icon: (
      <svg width="80" height="80" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ stroke: '#1a1a2e', strokeWidth: 1.5 }}>
        <circle cx="20" cy="20" r="14" />
        <circle cx="20" cy="20" r="8" />
        <path d="M20 12V28M12 20H28" />
      </svg>
    ),
  },
  {
    name: 'AEO',
    desc: 'Getting your business named in AI search answers.',
    icon: (
      <svg width="80" height="80" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ stroke: '#1a1a2e', strokeWidth: 1.5 }}>
        <circle cx="18" cy="14" r="4" />
        <path d="M14 28L18 20L22 28" />
        <path d="M28 28C28 22.477 24.418 18 20 18" />
      </svg>
    ),
  },
  {
    name: 'Business automation',
    desc: 'Bookings, invoices and follow-ups that run themselves.',
    icon: (
      <svg width="80" height="80" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ stroke: '#1a1a2e', strokeWidth: 1.5 }}>
        <circle cx="12" cy="12" r="3" />
        <circle cx="28" cy="12" r="3" />
        <circle cx="12" cy="28" r="3" />
        <circle cx="28" cy="28" r="3" />
        <path d="M15 12H25M12 15V25M15 28H25M28 15V25" />
      </svg>
    ),
  },
]

export default function Services() {
  return (
    <PageShell
      eyebrow="WHAT WE DO"
      title={<>Four things, <em style={{ fontStyle: 'italic' }}>done properly.</em></>}
      sub="Everything we do is built to bring a small South African business more work."
    >
      <div style={{
        background: '#f4f2fa',
        padding: '4rem 2rem',
      }}>
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
          gap: '1.5rem',
        }}>
          {services.map((service) => (
            <div key={service.name} style={{
              background: '#fff',
              borderRadius: '14px',
              padding: '1.8rem',
              boxShadow: '0 18px 40px -22px rgba(26,26,46,0.35)',
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
            }}>
              <div style={{ flexShrink: 0, width: '80px' }}>
                {service.icon}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <h3 style={{
                  fontFamily: 'var(--font-source-sans), "Source Sans 3", sans-serif',
                  fontWeight: 700,
                  fontSize: '1.15rem',
                  color: '#1a1a2e',
                  margin: '0 0 0.75rem',
                }}>
                  {service.name}
                </h3>

                <p style={{
                  fontSize: '0.95rem',
                  color: '#5d6478',
                  lineHeight: 1.5,
                  margin: '0 0 1.5rem',
                  flex: 1,
                }}>
                  {service.desc}
                </p>

                <a href="#" style={{
                  background: '#7d3d4f',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '999px',
                  padding: '0.6rem 1.2rem',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  textDecoration: 'none',
                  width: 'fit-content',
                  display: 'inline-block',
                }}>
                  LEARN MORE →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  )
}
