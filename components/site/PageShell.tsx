'use client'

import { useState } from 'react'

const WHATSAPP_NUMBER = '27000000000'
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`

export default function PageShell({
  eyebrow,
  title,
  sub,
  children,
}: {
  eyebrow: string
  title: React.ReactNode
  sub: string
  children: React.ReactNode
}) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const WhatsAppIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004c-2.759 0-5.327 1.273-7.04 3.51-.422.54-.423 1.417.099 1.91 1.11 1.107 2.105 2.293 2.889 3.643 1.572 2.765 4.575 4.528 7.52 4.568h.004c4.141 0 7.506-3.36 7.506-7.499 0-4.139-3.365-7.492-7.506-7.492m0-2c5.206 0 9.445 4.224 9.445 9.407 0 5.182-4.239 9.407-9.445 9.407-2.147 0-4.203-.738-5.834-2.097L.464 23.971a1 1 0 0 0 1.406 1.406l3.357-3.358C6.734 23.343 9.236 24 12.051 24c5.206 0 9.445-4.225 9.445-9.408 0-5.182-4.239-9.407-9.445-9.407Z" />
    </svg>
  )

  const navLinks = [
    { label: 'WORK', href: '/work' },
    { label: 'SERVICES', href: '/services' },
    { label: 'PRICING', href: '/#pricing' },
    { label: 'REFER', href: '/#refer' },
    { label: 'ABOUT', href: '/about' },
    { label: 'CONTACT', href: '/contact' },
  ]

  const handleCTA = (e: React.FormEvent) => {
    e.preventDefault()
    window.location.href = '/'
  }

  return (
    <div style={{ background: '#f4f2fa', fontFamily: 'var(--font-source-sans), "Source Sans 3", sans-serif', margin: 0, overflow: 'hidden' }}>
      {/* TOP BAR */}
      <div style={{ background: '#171b2b', padding: '0.6rem 2rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'rgba(255,255,255,0.72)' }}>
        <a href={WHATSAPP_URL} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', textDecoration: 'none', color: 'rgba(255,255,255,0.72)', whiteSpace: 'nowrap' }}>
          <WhatsAppIcon />
          WhatsApp us<span style={{ display: 'none' }}> · Mon–Fri 8:00–17:00</span>
        </a>
        <a href="/#refer" style={{ textDecoration: 'none', color: 'rgba(255,255,255,0.72)' }}>Refer & earn R1,000 →</a>
      </div>

      {/* HERO SECTION */}
      <div style={{
        background: 'linear-gradient(180deg,#6f86a6 0%,#8f9ab6 30%,#ad9fbf 55%,#d0b5c6 78%,#e9cad0 100%)',
        position: 'relative',
        overflow: 'hidden',
        padding: '0 0 8rem',
      }}>
        {/* NAV */}
        <nav style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '1.5rem 2rem 0',
          position: 'relative',
          zIndex: 5,
        } as React.CSSProperties}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            background: 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            border: '1px solid rgba(255,255,255,0.35)',
            borderRadius: '999px',
            padding: '0.55rem 0.55rem 0.55rem 1.75rem',
            gap: '0.4rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
          } as React.CSSProperties}>
            <a href="/" style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: '1.15rem', color: '#1a1a2e', textDecoration: 'none', marginRight: '1rem', fontWeight: 400, whiteSpace: 'nowrap' }}>mountain studios</a>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {navLinks.map(link => (
                <a key={link.href} href={link.href} style={{
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: '#1a1a2e',
                  textDecoration: 'none',
                }}>
                  {link.label}
                </a>
              ))}
            </div>
            <a href="/" style={{
              background: '#1a1a2e',
              color: '#fff',
              padding: '0.6rem 1.4rem',
              borderRadius: '999px',
              textDecoration: 'none',
              fontSize: '0.7rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              whiteSpace: 'nowrap',
            }}>SEE YOUR SITE FREE</a>
            <button onClick={() => setMenuOpen(true)} style={{
              display: 'none',
              background: 'none',
              border: 'none',
              color: '#fff',
              cursor: 'pointer',
              fontSize: '1.4rem',
            }}>☰</button>
          </div>
        </nav>

        {menuOpen && (
          <div onClick={() => setMenuOpen(false)} style={{
            position: 'fixed', inset: 0, zIndex: 200,
            background: 'rgba(10,12,22,0.96)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: '1.25rem',
          }}>
            <button onClick={() => setMenuOpen(false)} style={{
              position: 'absolute', top: '1.25rem', right: '1.5rem',
              background: 'none', border: 'none', color: '#fff',
              fontSize: '2rem', cursor: 'pointer', lineHeight: 1,
            }}>&times;</button>
            {navLinks.map(link => (
              <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)} style={{
                fontSize: '1.1rem', fontWeight: 600, letterSpacing: '0.12em',
                textTransform: 'uppercase', color: '#fff', textDecoration: 'none',
                padding: '0.7rem 2rem', borderRadius: '999px',
                border: '1px solid rgba(255,255,255,0.25)',
              }}>{link.label}</a>
            ))}
            <a href="/" style={{
              fontSize: '1.05rem', fontWeight: 700, color: '#1a1a2e', background: '#fff',
              padding: '0.75rem 2rem', borderRadius: '999px', textDecoration: 'none',
              letterSpacing: '0.06em', textTransform: 'uppercase',
            }}>See your site free</a>
          </div>
        )}

        {/* HERO CONTENT */}
        <div style={{
          maxWidth: '780px',
          margin: 'auto',
          padding: '5rem 2rem 0',
          textAlign: 'center',
          position: 'relative',
          zIndex: 2,
        }}>
          <p style={{
            fontSize: '1rem',
            fontWeight: 700,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#fff',
            marginBottom: '1rem',
          }}>{eyebrow}</p>

          <h1 style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)',
            fontWeight: 400,
            color: '#1a1a2e',
            lineHeight: 1.05,
            margin: '1rem 0 1.25rem',
          }}>
            {title}
          </h1>

          <p style={{
            fontSize: '1.02rem',
            color: '#3d4358',
            maxWidth: '640px',
            margin: '0 auto 0',
          }}>
            {sub}
          </p>
        </div>

        {/* MOUNTAIN RIDGE */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 1 }}>
          <svg viewBox="0 0 1440 280" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: 'auto' }}>
            <path d="M0,280 L0,200 Q120,168 240,184 Q360,200 480,170 Q600,140 720,156 Q840,172 960,146 Q1080,122 1200,150 Q1320,178 1440,164 L1440,280 Z" fill="rgba(26,26,46,0.18)" />
            <path d="M0,280 L0,226 Q150,196 300,216 Q450,236 600,202 Q750,168 900,192 Q1050,216 1200,196 Q1320,182 1440,206 L1440,280 Z" fill="rgba(26,26,46,0.30)" />
            <path d="M0,280 L0,250 Q180,226 360,240 Q540,254 720,230 Q900,206 1080,230 Q1260,254 1440,240 L1440,280 Z" fill="rgba(26,26,46,0.42)" />
          </svg>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ background: '#f4f2fa' }}>
        {children}
      </div>

      {/* CTA BAND */}
      <div style={{
        background: 'linear-gradient(180deg,#6f86a6 0%,#8f9ab6 30%,#ad9fbf 55%,#d0b5c6 78%,#e9cad0 100%)',
        position: 'relative',
        overflow: 'hidden',
        padding: '3rem 2rem 0',
      }}>
        <div style={{
          maxWidth: '760px',
          margin: 'auto',
          textAlign: 'center',
          position: 'relative',
          zIndex: 2,
        }}>
          <h2 style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: 'clamp(1.7rem,3vw,2.4rem)',
            color: '#1a1a2e',
            fontWeight: 400,
            margin: '0 0 2rem',
          }}>
            See what yours could look like. <em style={{ fontStyle: 'italic' }}>It's free.</em>
          </h2>

          {submitted ? (
            <p style={{ fontSize: '0.9rem', color: '#3d4358', marginBottom: '2rem' }}>Thanks — we'll be in touch shortly.</p>
          ) : (
            <form style={{
              display: 'flex',
              gap: '0.6rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: '2rem',
            }} onSubmit={handleCTA}>
              <input
                type="text"
                placeholder="What's your business called?"
                style={{
                  padding: '0.95rem 1.6rem',
                  borderRadius: '999px',
                  border: 'none',
                  width: '320px',
                  fontSize: '1rem',
                  outline: 'none',
                  boxShadow: '0 8px 24px -12px rgba(0,0,0,0.35)',
                }}
              />
              <button type="submit" style={{
                padding: '0.95rem 1.6rem',
                borderRadius: '999px',
                border: 'none',
                background: '#fff',
                color: '#1a1a2e',
                fontSize: '1rem',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 8px 24px -12px rgba(0,0,0,0.35)',
              }}>SHOW ME →</button>
            </form>
          )}
        </div>

        {/* MOUNTAIN RIDGE */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 1 }}>
          <svg viewBox="0 0 1440 280" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: 'auto' }}>
            <path d="M0,280 L0,200 Q120,168 240,184 Q360,200 480,170 Q600,140 720,156 Q840,172 960,146 Q1080,122 1200,150 Q1320,178 1440,164 L1440,280 Z" fill="rgba(26,26,46,0.18)" />
            <path d="M0,280 L0,226 Q150,196 300,216 Q450,236 600,202 Q750,168 900,192 Q1050,216 1200,196 Q1320,182 1440,206 L1440,280 Z" fill="rgba(26,26,46,0.30)" />
            <path d="M0,280 L0,250 Q180,226 360,240 Q540,254 720,230 Q900,206 1080,230 Q1260,254 1440,240 L1440,280 Z" fill="rgba(26,26,46,0.42)" />
          </svg>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ background: '#171b2b', color: 'rgba(255,255,255,0.55)', padding: '4rem 2rem 2rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
          maxWidth: '1100px',
          margin: '0 auto 3rem',
        }}>
          <div>
            <div style={{ marginBottom: '1rem' }}>
              <span style={{ fontSize: '1.2rem' }}>▲</span>
              <span style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: '1.1rem', color: '#fff', marginLeft: '0.5rem', fontWeight: 400 }}>mountain studios</span>
            </div>
            <p style={{ fontSize: '0.85rem', margin: '0 0 0.5rem' }}>Websites for South African businesses.</p>
            <p style={{ fontSize: '0.85rem', margin: 0 }}>Cape Town, South Africa</p>
          </div>

          <div>
            <p style={{
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.4)',
              marginBottom: '1rem',
              margin: '0 0 1rem',
            }}>GET IN TOUCH</p>
            <a href={WHATSAPP_URL} style={{ display: 'block', fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', textDecoration: 'none', marginBottom: '0.5rem' }}>WhatsApp us</a>
            <a href="mailto:hello@mountainstudios.co.za" style={{ display: 'block', fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', textDecoration: 'none', marginBottom: '0.5rem' }}>hello@mountainstudios.co.za</a>
            <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', margin: 0 }}>Mon–Fri 8:00–17:00 SAST</p>
          </div>

          <div>
            <p style={{
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.4)',
              marginBottom: '1rem',
              margin: '0 0 1rem',
            }}>PAGES</p>
            <a href="/work" style={{ display: 'block', fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', textDecoration: 'none', marginBottom: '0.5rem' }}>Work</a>
            <a href="/#pricing" style={{ display: 'block', fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', textDecoration: 'none', marginBottom: '0.5rem' }}>Pricing</a>
            <a href="/#refer" style={{ display: 'block', fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', textDecoration: 'none', marginBottom: '0.5rem' }}>Refer</a>
            <a href="/about" style={{ display: 'block', fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', textDecoration: 'none', marginBottom: '0.5rem' }}>About</a>
            <a href="/careers/sales-rep" style={{ display: 'block', fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', textDecoration: 'none', marginBottom: '0.5rem' }}>Careers</a>
            <a href="/contact" style={{ display: 'block', fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', textDecoration: 'none', marginBottom: '0.5rem' }}>Contact</a>
          </div>

          <div>
            <p style={{
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.4)',
              marginBottom: '1rem',
              margin: '0 0 1rem',
            }}>FOLLOW</p>
            <a href="#" style={{ display: 'block', fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', textDecoration: 'none', marginBottom: '0.5rem' }}>Instagram</a>
            <a href="#" style={{ display: 'block', fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', textDecoration: 'none', marginBottom: '0.5rem' }}>Facebook</a>
            <a href="#" style={{ display: 'block', fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', textDecoration: 'none', marginBottom: '0.5rem' }}>LinkedIn</a>
            <a href="#" style={{ display: 'block', fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', textDecoration: 'none', marginBottom: '0.5rem' }}>Google</a>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          paddingTop: '1.5rem',
          textAlign: 'center',
          fontSize: '0.75rem',
        }}>
          © {new Date().getFullYear()} Mountain Studios · Privacy · Terms
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .page-shell-grid { grid-template-columns: 1fr !important }
        }
        @media (max-width: 768px) {
          .ms-nav-links, .ms-nav-cta { display:none !important }
        }
        @media (max-width: 600px) {
          .ms-hours { display:none !important }
        }
      `}</style>
    </div>
  )
}
