'use client'

import { useState, useEffect } from 'react'
import SiteNav from '../components/site/SiteNav'

const font = 'var(--font-source-sans), "Source Sans 3", sans-serif'
const serif = 'Georgia, "Times New Roman", serif'

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
      height: '100vh', position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
    }}>

      {/* Nav */}
      <div style={{ position: 'relative', zIndex: 10, flexShrink: 0, animation: anim('fadeIn 0.8s 0.3s forwards'), opacity: so }}>
        <SiteNav />
      </div>

      {/* Hero — fills remaining space */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: '0 2.5rem',
        position: 'relative', zIndex: 2, textAlign: 'center',
      }}>
        {/* Eyebrow */}
        <p style={{
          fontFamily: font, fontSize: '0.7rem', fontWeight: 600,
          letterSpacing: '0.25em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.5)', marginBottom: '1rem',
          animation: anim('fadeUp 0.8s 0.5s forwards'), opacity: so,
        }}>The Ethereal Atelier</p>

        {/* Heading */}
        <h1 style={{
          fontFamily: serif, fontSize: 'clamp(2.2rem, 5.5vw, 4rem)',
          fontWeight: 300, color: '#fff', lineHeight: 1.1,
          margin: '0 0 1.25rem', maxWidth: '700px',
          animation: anim('fadeUp 1s 0.6s forwards'), opacity: so,
        }}>
          Web Design Done{' '}
          <em style={{ fontStyle: 'italic' }}>Simply</em>
        </h1>

        {/* Subtitle */}
        <p style={{
          fontFamily: font, fontSize: 'clamp(0.85rem, 1.3vw, 1rem)',
          color: 'rgba(255,255,255,0.7)', maxWidth: '460px',
          lineHeight: 1.7, marginBottom: '2rem',
          animation: anim('fadeUp 1s 0.8s forwards'), opacity: so,
        }}>
          Crafting intentional digital experiences that breathe space and sophistication into your brand's unique narrative.
        </p>

        {/* CTA */}
        <div style={{ animation: anim('fadeUp 1s 1s forwards'), opacity: so }}>
          <a href="/start-your-project" style={{
            fontFamily: font, fontSize: '0.85rem', fontWeight: 600,
            color: '#1a1a2e', background: '#fff', padding: '0.75rem 2rem',
            borderRadius: '999px', textDecoration: 'none',
            letterSpacing: '0.06em', textTransform: 'uppercase',
            display: 'inline-block', transition: 'opacity 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >Start Your Project</a>
        </div>
      </div>

      {/* Floating glass card — bottom left */}
      <div className="ms-float-card" style={{
        position: 'absolute', bottom: '3rem', left: '-1rem',
        width: '220px', height: '280px', borderRadius: '16px',
        background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.2)',
        transform: 'rotate(3deg)', overflow: 'hidden', zIndex: 3,
        boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
        animation: anim('fadeIn 1.2s 1.2s forwards'), opacity: so,
      }}>
        <img src="https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
      </div>

      {/* Floating glass card — top right */}
      <div className="ms-float-card" style={{
        position: 'absolute', top: '18%', right: '-1.5rem',
        width: '260px', height: '320px', borderRadius: '16px',
        background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.2)',
        transform: 'rotate(-2deg)', overflow: 'hidden', zIndex: 3,
        boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
        animation: anim('fadeIn 1.2s 1.4s forwards'), opacity: so,
      }}>
        <img src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
      </div>

      {/* Mountain silhouette */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 1 }}>
        <svg viewBox="0 0 1440 400" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: 'auto' }}>
          <path d="M0,400 L0,320 L120,280 L240,310 L360,240 L440,260 L520,180 L580,200 L640,120 L680,140 L720,60 L760,80 L800,130 L860,160 L920,200 L1000,240 L1060,220 L1120,260 L1200,290 L1280,270 L1360,300 L1440,280 L1440,400 Z" fill="rgba(26,26,46,0.025)" />
          <path d="M0,400 L0,340 L100,310 L200,330 L320,270 L400,290 L480,220 L540,240 L620,160 L670,180 L740,100 L780,120 L840,170 L900,200 L980,250 L1060,230 L1140,270 L1220,300 L1320,280 L1440,310 L1440,400 Z" fill="rgba(26,26,46,0.045)" />
          <path d="M0,400 L0,360 L80,340 L180,355 L280,300 L380,320 L460,260 L530,280 L600,210 L660,230 L730,160 L770,180 L830,220 L910,260 L1000,290 L1100,270 L1200,300 L1300,320 L1440,340 L1440,400 Z" fill="rgba(26,26,46,0.07)" />
        </svg>
      </div>

      {/* Footer — pinned to bottom */}
      <div style={{
        position: 'relative', zIndex: 10, flexShrink: 0,
        padding: '1.25rem 2rem',
        borderTop: '1px solid rgba(255,255,255,0.1)',
      }}>
        <div style={{
          maxWidth: '1100px', margin: '0 auto',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '0.75rem',
        }}>
          <a href="/" style={{
            fontFamily: font, fontSize: '0.95rem', fontWeight: 700,
            color: '#fff', textDecoration: 'none', letterSpacing: '0.04em',
          }}>mountain studios</a>
          <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)', margin: 0 }}>
            © {new Date().getFullYear()} Mountain Studios. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '1.25rem' }}>
            {['Privacy Policy', 'Terms of Service'].map(t => (
              <a key={t} href="#" style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.75rem', textDecoration: 'none' }}>{t}</a>
            ))}
          </div>
        </div>
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
          .ms-float-card { display: none !important; }
        }
      `}</style>
    </div>
  )
}
