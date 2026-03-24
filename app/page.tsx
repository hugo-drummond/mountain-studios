'use client'

import { useState, useEffect } from 'react'

const font = 'var(--font-source-sans), "Source Sans 3", sans-serif'

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
  const so = hasVisited ? 1 : 0

  return (
    <div style={{
      background: 'linear-gradient(180deg, #7b8fad 0%, #9aa4bc 35%, #b5a8c4 60%, #d4b8c8 80%, #e8c8cf 100%)',
      minHeight: '100vh', position: 'relative', overflow: 'hidden',
    }}>

      {/* Nav */}
      <nav style={{
        display: 'flex', justifyContent: 'center',
        padding: '1.25rem 2.5rem', position: 'relative', zIndex: 10,
        animation: anim('fadeIn 0.8s 0.3s forwards'), opacity: so,
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          background: 'transparent',
          borderRadius: '999px', padding: '0.65rem 0.65rem 0.65rem 1.75rem',
          border: '1.5px solid rgba(255,255,255,0.5)',
        }}>
          <a href="/" style={{
            fontFamily: font, fontSize: '1.05rem', fontWeight: 700,
            color: '#fff', textDecoration: 'none', letterSpacing: '0.04em',
            marginRight: '1.5rem',
          }}>
            mountain studios
          </a>
          {['About', 'Contact', 'Portfolio'].map(label => (
            <a key={label} href={`/${label.toLowerCase()}`} style={{
              fontFamily: font, fontSize: '0.85rem', fontWeight: 600,
              color: 'rgba(255,255,255,0.8)', textDecoration: 'none',
              letterSpacing: '0.06em', textTransform: 'uppercase',
              transition: 'color 0.2s',
              padding: '0.4rem 0.85rem',
            }}
              onMouseEnter={e => e.currentTarget.style.color = '#fff'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}
            >
              {label}
            </a>
          ))}
          <a href="/start-your-project" style={{
            fontFamily: font, fontSize: '0.85rem', fontWeight: 600,
            color: '#1a1a2e', textDecoration: 'none', letterSpacing: '0.04em',
            background: '#fff', padding: '0.6rem 1.5rem', borderRadius: '999px',
            transition: 'opacity 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            Get Started
          </a>
        </div>
      </nav>

      {/* Hero */}
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'flex-end', minHeight: 'calc(100vh - 80px)',
        padding: '0 2.5rem 12vh', position: 'relative', zIndex: 2,
      }}>
        <h1 style={{
          fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 'clamp(2rem, 4vw, 3.2rem)',
          fontWeight: 400, color: '#fff', textAlign: 'center',
          lineHeight: 1.15, margin: 0, maxWidth: '700px',
          animation: anim('fadeUp 1s 0.6s forwards'), opacity: so,
        }}>
          Websites that work as hard as you do.
        </h1>
        <p style={{
          fontFamily: font, fontSize: '0.85rem', fontWeight: 400,
          color: 'rgba(26,26,46,0.5)', textAlign: 'center',
          letterSpacing: '0.12em', textTransform: 'uppercase',
          marginTop: '1.25rem',
          animation: anim('fadeUp 1s 0.9s forwards'), opacity: so,
        }}>
          Web Design &middot; Cape Town &middot; One conversation. Done.
        </p>
      </div>

      {/* Mountain silhouette */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 1 }}>
        <svg viewBox="0 0 1440 500" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: '45vh' }}>
          <path d="M0,500 L0,420 L200,415 L400,400 L600,380 L750,340 L850,280 L950,220 L1020,180 L1080,150 L1140,140 L1250,140 L1350,130 L1440,110 L1440,500 Z" fill="rgba(26,26,46,0.06)" />
          <path d="M0,500 L0,450 L250,445 L500,435 L700,410 L830,370 L930,300 L1010,250 L1070,210 L1120,190 L1180,180 L1280,180 L1380,170 L1440,155 L1440,500 Z" fill="rgba(26,26,46,0.11)" />
        </svg>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0 }
          to { opacity: 1 }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px) }
          to { opacity: 1; transform: translateY(0) }
        }
        @media (max-width: 768px) {
          nav > div:last-child { display: none !important; }
        }
      `}</style>
    </div>
  )
}
