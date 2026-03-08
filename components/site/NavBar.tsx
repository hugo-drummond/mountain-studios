'use client'

import { useState } from 'react'

const navLinks = [
  { label: 'About', href: '/about' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Start a Project', href: '/cast-your-line' },
  { label: 'Contact', href: '/contact' },
]

const font = 'var(--font-source-sans), "Source Sans 3", sans-serif'

export default function NavBar({ animate = false }: { animate?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const anim = (animation: string) => animate ? animation : 'none'
  const startOpacity = animate ? 0 : 1

  return (
    <>
      {/* Logo */}
      <a
        href="/"
        style={{
          position: 'fixed',
          top: '-0.5rem',
          left: '-1.5rem',
          zIndex: 20,
          animation: anim('wrapper-fade 3s forwards'),
          opacity: startOpacity,
        }}
      >
        <img
          src="/images/logo.png"
          alt="Mountain Studios"
          style={{ height: '200px', width: 'auto' }}
        />
      </a>

      {/* Burger menu button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          position: 'fixed',
          top: '2rem',
          right: '2rem',
          zIndex: 20,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '8px',
          display: 'flex',
          flexDirection: 'column',
          gap: menuOpen ? '0px' : '6px',
          width: '44px',
          height: '44px',
          alignItems: 'center',
          justifyContent: 'center',
          animation: anim('wrapper-fade 3s forwards'),
          opacity: startOpacity,
        }}
      >
        <span
          style={{
            display: 'block',
            width: '28px',
            height: '1.5px',
            backgroundColor: 'rgba(255,255,255,0.9)',
            transition: 'all 0.3s ease',
            transform: menuOpen ? 'rotate(45deg) translateY(0.75px)' : 'none',
          }}
        />
        {!menuOpen && (
          <span
            style={{
              display: 'block',
              width: '28px',
              height: '1.5px',
              backgroundColor: 'rgba(255,255,255,0.9)',
              transition: 'all 0.3s ease',
            }}
          />
        )}
        <span
          style={{
            display: 'block',
            width: '28px',
            height: '1.5px',
            backgroundColor: 'rgba(255,255,255,0.9)',
            transition: 'all 0.3s ease',
            transform: menuOpen ? 'rotate(-45deg) translateY(-0.75px)' : 'none',
          }}
        />
      </button>

      {/* Fullscreen menu overlay */}
      <div
        onClick={() => setMenuOpen(false)}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 15,
          backgroundColor: 'rgba(0,0,0,0.92)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1.5rem',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
          transition: 'opacity 0.4s ease',
        }}
      >
        {navLinks.map((item, i) => (
          <a
            key={item.href}
            href={item.href}
            style={{
              color: 'rgba(255,255,255,0.85)',
              textDecoration: 'none',
              fontFamily: font,
              fontSize: '1.5rem',
              fontWeight: 300,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              padding: '0.5rem 1.5rem',
              borderRadius: '9999px',
              border: '1px solid rgba(255,255,255,0.3)',
              transition: 'all 0.3s ease',
              transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
              opacity: menuOpen ? 1 : 0,
              transitionDelay: menuOpen ? `${i * 0.1}s` : '0s',
            }}
            onClick={(e) => e.stopPropagation()}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.7)'
              e.currentTarget.style.color = '#ffffff'
              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.075)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'
              e.currentTarget.style.color = 'rgba(255,255,255,0.85)'
              e.currentTarget.style.backgroundColor = 'transparent'
            }}
          >
            {item.label}
          </a>
        ))}
      </div>
    </>
  )
}
