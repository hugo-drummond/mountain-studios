'use client'

import { useState, useEffect } from 'react'
import NavBar from '../components/site/NavBar'

const navLinks = [
  { label: 'About', href: '/about' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Start a Project', href: '/start-your-project' },
  { label: 'Contact', href: '/contact' },
]

export default function Home() {
  const [hasVisited, setHasVisited] = useState(true)

  useEffect(() => {
    const visited = sessionStorage.getItem('ms-visited')
    if (!visited) {
      setHasVisited(false)
      sessionStorage.setItem('ms-visited', '1')
    }
  }, [])

  const anim = (animation: string) => hasVisited ? 'none' : animation
  const startOpacity = hasVisited ? 1 : 0

  return (
    <>
      {/* Scrolling background */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', zIndex: 0 }}>
        <div id="bg" style={{ display: 'flex', height: '100%', animation: 'bg-scroll 60s linear infinite' }}>
          <img src="/images/bg.jpg" alt="" style={{ height: '100%', width: 'auto', minWidth: '100vw', objectFit: 'cover', flexShrink: 0 }} />
          <img src="/images/bg.jpg" alt="" style={{ height: '100%', width: 'auto', minWidth: '100vw', objectFit: 'cover', flexShrink: 0, transform: 'scaleX(-1)' }} />
          <img src="/images/bg.jpg" alt="" style={{ height: '100%', width: 'auto', minWidth: '100vw', objectFit: 'cover', flexShrink: 0 }} />
        </div>
      </div>

      {/* Radial gradient overlay */}
      <div style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1,
        background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.65) 100%)',
        animation: anim('overlay-fade 1.5s 1.5s forwards'), opacity: startOpacity,
      }} />

      <NavBar animate={!hasVisited} />

      {/* Content wrapper */}
      <div id="wrapper" style={{
        position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', minHeight: '100vh',
        animation: anim('wrapper-fade 3s forwards'), opacity: startOpacity,
      }}>
        <header style={{ textAlign: 'center', animation: anim('header-reveal 1s 2.25s forwards'), opacity: startOpacity }}>
          <h1 style={{
            fontFamily: 'var(--font-source-sans), "Source Sans 3", "Source Sans Pro", sans-serif',
            fontSize: 'clamp(2.75rem, 5.5vw, 4.75rem)', fontWeight: 300, letterSpacing: '0.35em',
            textTransform: 'uppercase', color: '#ffffff', margin: 0, lineHeight: 1.2,
            textShadow: '0 0 20px rgba(0,0,0,0.3)',
          }}>
            Mountain Studios
          </h1>
          <p style={{
            fontFamily: 'var(--font-source-sans), "Source Sans 3", "Source Sans Pro", sans-serif',
            fontSize: 'clamp(0.9rem, 1.6vw, 1.15rem)', fontWeight: 400, letterSpacing: '0.225em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.85)', marginTop: '1rem',
            lineHeight: 1.5, textShadow: '0 0 10px rgba(0,0,0,0.3)',
          }}>
            Web Design &nbsp;&bull;&nbsp; Cape Town &nbsp;&bull;&nbsp; One conversation. Done.
          </p>
        </header>

        <nav style={{ display: 'flex', gap: '0.75rem', marginTop: '2rem' }}>
          {navLinks.map((item, i) => (
            <a key={item.href} href={item.href} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '0.5rem 1.25rem', borderRadius: '9999px',
              border: '1px solid rgba(255,255,255,0.7)', color: 'rgba(255,255,255,0.9)',
              fontFamily: 'var(--font-source-sans), "Source Sans 3", sans-serif',
              fontSize: '0.8rem', fontWeight: 400, letterSpacing: '0.15em',
              textTransform: 'uppercase', textDecoration: 'none', transition: 'all 0.3s ease',
              animation: anim(`icon-reveal 0.75s ${2.5 + i * 0.25}s forwards`), opacity: startOpacity,
            }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.75)'; e.currentTarget.style.color = '#ffffff'; e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.075)' }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.7)'; e.currentTarget.style.color = 'rgba(255,255,255,0.9)'; e.currentTarget.style.backgroundColor = 'transparent' }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  )
}
