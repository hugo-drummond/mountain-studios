'use client'

import { useState, useEffect } from 'react'
import SiteNav from '../components/site/SiteNav'

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

      <div style={{ position: 'relative', zIndex: 10, animation: anim('fadeIn 0.8s 0.3s forwards'), opacity: so }}>
        <SiteNav />
      </div>

      {/* Hero */}
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'flex-end', minHeight: 'calc(100vh - 80px)',
        padding: '0 2.5rem 20vh', position: 'relative', zIndex: 2,
      }}>
        <h1 style={{
          fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 'clamp(2rem, 4vw, 3.2rem)',
          fontWeight: 300, color: '#fff', textAlign: 'center',
          lineHeight: 1.15, margin: 0, maxWidth: '700px',
          animation: anim('fadeUp 1s 0.6s forwards'), opacity: so,
        }}>
          Web Design Done Simply.
        </h1>
      </div>

      {/* Mountain silhouette */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 1 }}>
        <svg viewBox="0 0 1440 400" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: 'auto' }}>
          <path d="M0,400 L0,320 L120,280 L240,310 L360,240 L440,260 L520,180 L580,200 L640,120 L680,140 L720,60 L760,80 L800,130 L860,160 L920,200 L1000,240 L1060,220 L1120,260 L1200,290 L1280,270 L1360,300 L1440,280 L1440,400 Z" fill="rgba(26,26,46,0.025)" />
          <path d="M0,400 L0,340 L100,310 L200,330 L320,270 L400,290 L480,220 L540,240 L620,160 L670,180 L740,100 L780,120 L840,170 L900,200 L980,250 L1060,230 L1140,270 L1220,300 L1320,280 L1440,310 L1440,400 Z" fill="rgba(26,26,46,0.045)" />
          <path d="M0,400 L0,360 L80,340 L180,355 L280,300 L380,320 L460,260 L530,280 L600,210 L660,230 L730,160 L770,180 L830,220 L910,260 L1000,290 L1100,270 L1200,300 L1300,320 L1440,340 L1440,400 Z" fill="rgba(26,26,46,0.07)" />
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
