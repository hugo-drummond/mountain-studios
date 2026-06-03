'use client'

import { useState } from 'react'

const font = 'var(--font-source-sans), "Source Sans 3", sans-serif'

const isLocal = typeof window !== 'undefined' && window.location.hostname === 'localhost'

const navLinks = [
  { label: 'About', href: '/#about' },
  { label: 'Portfolio', href: '/#portfolio' },
  ...(isLocal ? [{ label: 'Temp', href: '/temp' }] : []),
  { label: 'Contact', href: '/#contact' },
]

export default function SiteNav() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <nav style={{
        display: 'flex', justifyContent: 'center', padding: '1.25rem 2.5rem',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          background: 'transparent', borderRadius: '999px',
          padding: '0.65rem 0.65rem 0.65rem 1.75rem',
          border: '1.5px solid rgba(255,255,255,0.5)',
        }}>
          <a href="/" style={{
            fontFamily: font, fontSize: '1.05rem', fontWeight: 700,
            color: '#fff', textDecoration: 'none', letterSpacing: '0.04em',
            marginRight: '1.5rem',
          }}>mountain studios</a>

          {/* Desktop links */}
          <div className="ms-site-links" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {navLinks.map(link => (
              <a key={link.href} href={link.href} style={{
                fontFamily: font, fontSize: '0.85rem', fontWeight: 600,
                color: 'rgba(255,255,255,0.8)', textDecoration: 'none',
                letterSpacing: '0.06em', textTransform: 'uppercase',
                padding: '0.4rem 0.85rem', transition: 'color 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}
              >{link.label}</a>
            ))}
            <a href="/start-your-project" style={{
              fontFamily: font, fontSize: '0.85rem', fontWeight: 600,
              color: '#1a1a2e', textDecoration: 'none', letterSpacing: '0.04em',
              background: '#fff', padding: '0.6rem 1.5rem', borderRadius: '999px',
              transition: 'opacity 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >Get Started</a>
          </div>

          {/* Burger button */}
          <button
            className="ms-site-burger"
            onClick={() => setOpen(true)}
            style={{
              display: 'none', background: 'none', border: 'none', cursor: 'pointer',
              padding: '6px', flexDirection: 'column', gap: '5px',
            }}
          >
            <span style={{ display: 'block', width: '22px', height: '2px', background: '#fff' }} />
            <span style={{ display: 'block', width: '22px', height: '2px', background: '#fff' }} />
            <span style={{ display: 'block', width: '22px', height: '2px', background: '#fff' }} />
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 200,
            background: 'rgba(0,0,0,0.95)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: '1.25rem',
          }}
        >
          <button
            onClick={() => setOpen(false)}
            style={{
              position: 'absolute', top: '1.5rem', right: '1.5rem',
              background: 'none', border: 'none', color: '#fff',
              fontSize: '2rem', cursor: 'pointer', lineHeight: 1,
            }}
          >&times;</button>
          {navLinks.map(link => (
            <a key={link.href} href={link.href} onClick={e => e.stopPropagation()} style={{
              fontFamily: font, fontSize: '1.2rem', fontWeight: 400,
              color: '#fff', textDecoration: 'none',
              letterSpacing: '0.1em', textTransform: 'uppercase',
              padding: '0.75rem 2rem', borderRadius: '999px',
              border: '1px solid rgba(255,255,255,0.2)', transition: 'border-color 0.3s',
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'}
            >{link.label}</a>
          ))}
          <a href="/start-your-project" onClick={e => e.stopPropagation()} style={{
            fontFamily: font, fontSize: '1.2rem', fontWeight: 600,
            color: '#1a1a2e', textDecoration: 'none', background: '#fff',
            padding: '0.75rem 2rem', borderRadius: '999px',
          }}>Get Started</a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .ms-site-links { display: none !important; }
          .ms-site-burger { display: flex !important; }
        }
      `}</style>
    </>
  )
}
