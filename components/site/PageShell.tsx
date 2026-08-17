'use client'

import { useState } from 'react'
import SiteHeaderNav from './SiteHeaderNav'

const WHATSAPP_NUMBER = '27000000000'
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`

export default function PageShell({
  eyebrow,
  title,
  sub,
  heroImage,
  heroCta,
  ctaOverride,
  children,
}: {
  eyebrow: string
  title: React.ReactNode
  sub: string
  heroImage?: React.ReactNode
  heroCta?: { label: string; href: string }
  // Replaces the default "See what yours could look like" CTA band content
  // (heading + form) with something else — e.g. the referral signup form on
  // /refer/terms. Rendered inside the same gradient band / mountain ridge.
  ctaOverride?: React.ReactNode
  children: React.ReactNode
}) {
  const [submitted, setSubmitted] = useState(false)

  const WhatsAppIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004c-2.759 0-5.327 1.273-7.04 3.51-.422.54-.423 1.417.099 1.91 1.11 1.107 2.105 2.293 2.889 3.643 1.572 2.765 4.575 4.528 7.52 4.568h.004c4.141 0 7.506-3.36 7.506-7.499 0-4.139-3.365-7.492-7.506-7.492m0-2c5.206 0 9.445 4.224 9.445 9.407 0 5.182-4.239 9.407-9.445 9.407-2.147 0-4.203-.738-5.834-2.097L.464 23.971a1 1 0 0 0 1.406 1.406l3.357-3.358C6.734 23.343 9.236 24 12.051 24c5.206 0 9.445-4.225 9.445-9.408 0-5.182-4.239-9.407-9.445-9.407Z" />
    </svg>
  )

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
        <a href="/refer/terms" style={{ textDecoration: 'none', color: 'rgba(255,255,255,0.72)' }}>Refer & earn R1000 →</a>
      </div>

      {/* HERO SECTION */}
      <div style={{
        background: 'linear-gradient(180deg,#6f86a6 0%,#8f9ab6 30%,#ad9fbf 55%,#d0b5c6 78%,#e9cad0 100%)',
        position: 'relative',
        overflow: 'hidden',
        padding: '0 0 8rem',
      }}>
        {/* NAV */}
        <SiteHeaderNav />

        {/* HERO CONTENT */}
        {heroImage ? (
          <div className="page-shell-grid" style={{
            maxWidth: '1180px',
            margin: 'auto',
            padding: '4rem 2rem 6rem',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '3rem',
            alignItems: 'center',
            position: 'relative',
            zIndex: 2,
          }}>
            <div style={{ textAlign: 'left' }}>
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
                fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)',
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
                maxWidth: '460px',
                margin: '0 0 1.75rem',
              }}>
                {sub}
              </p>

              {heroCta && (
                <a href={heroCta.href} style={{
                  display: 'inline-block',
                  background: '#7d3d4f',
                  color: '#fff',
                  padding: '0.95rem 1.8rem',
                  borderRadius: '999px',
                  textDecoration: 'none',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  boxShadow: '0 14px 30px -14px rgba(125,61,79,0.6)',
                }}>{heroCta.label}</a>
              )}
            </div>

            <div>{heroImage}</div>
          </div>
        ) : (
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
        )}

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
          {ctaOverride ? ctaOverride : (
            <>
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
            </>
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
            <a href="https://www.facebook.com/profile.php?id=61593052667215" target="_blank" rel="noopener noreferrer" style={{ display: 'block', fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', textDecoration: 'none', marginBottom: '0.5rem' }}>Facebook</a>
            <a href="https://www.linkedin.com/company/mountainstudioss/" target="_blank" rel="noopener noreferrer" style={{ display: 'block', fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', textDecoration: 'none', marginBottom: '0.5rem' }}>LinkedIn</a>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          paddingTop: '1.5rem',
          textAlign: 'center',
          fontSize: '0.75rem',
        }}>
          <p style={{ margin: '0 0 0.5rem' }}>© {new Date().getFullYear()} Mountain Studios · Privacy · Terms</p>
          {/* Required wording. The reCAPTCHA badge is hidden in globals.css,
              which Google permits only while this notice is on the page. */}
          <p style={{ margin: 0, fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)' }}>
            This site is protected by reCAPTCHA and the Google{' '}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.55)' }}>Privacy Policy</a>{' '}
            and{' '}
            <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.55)' }}>Terms of Service</a>{' '}
            apply.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .page-shell-grid { grid-template-columns: 1fr !important }
        }
        @media (max-width: 600px) {
          .ms-hours { display:none !important }
        }
      `}</style>
    </div>
  )
}
