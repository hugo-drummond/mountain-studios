'use client'

import { useState, useEffect, useRef } from 'react'

const navLinks = [
  { label: 'About', href: '/about' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Start a Project', href: '/start-your-project' },
  { label: 'Contact', href: '/contact' },
]

const font = 'var(--font-source-sans), "Source Sans 3", sans-serif'

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hasVisited, setHasVisited] = useState(true)

  useEffect(() => {
    const visited = sessionStorage.getItem('ms-visited')
    if (!visited) {
      setHasVisited(false)
      sessionStorage.setItem('ms-visited', '1')
    }
  }, [])

  // Particle animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let particles: { x: number; y: number; vx: number; vy: number; r: number; o: number }[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Create particles in a flowing shape
    const count = 180
    const cx = canvas.width * 0.55
    const cy = canvas.height * 0.45
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + Math.random() * 0.5
      const radius = 120 + Math.random() * 180
      particles.push({
        x: cx + Math.cos(angle) * radius + (Math.random() - 0.5) * 60,
        y: cy + Math.sin(angle) * radius * 0.7 + (Math.random() - 0.5) * 60,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        r: 1.2 + Math.random() * 1.8,
        o: 0.15 + Math.random() * 0.55,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 55) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(255,255,255,${0.06 * (1 - dist / 55)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${p.o})`
        ctx.fill()

        p.x += p.vx
        p.y += p.vy

        // Gentle drift
        p.vx += (Math.random() - 0.5) * 0.01
        p.vy += (Math.random() - 0.5) * 0.01
        p.vx *= 0.99
        p.vy *= 0.99
      }

      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  const anim = (animation: string) => hasVisited ? 'none' : animation
  const startOpacity = hasVisited ? 1 : 0

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, zIndex: 1 }}
      />

      {/* Nav - logo only */}
      <nav style={{
        position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center',
        padding: '2rem 3rem',
        animation: anim('fadeIn 1s 0.5s forwards'), opacity: startOpacity,
      }}>
        <a href="/" style={{
          fontFamily: font, fontSize: '0.85rem', fontWeight: 700,
          color: '#fff', textDecoration: 'none', letterSpacing: '0.15em',
          textTransform: 'uppercase', lineHeight: 1.3,
        }}>
          MOUNTAIN<br />STUDIOS
        </a>
      </nav>

      {/* Hero */}
      <div style={{
        position: 'relative', zIndex: 2, minHeight: 'calc(100vh - 200px)',
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-start',
        padding: '15vh 3rem 0',
        maxWidth: '1100px', margin: '0 auto', width: '100%',
      }}>
        {/* Split headline */}
        <div style={{ animation: anim('fadeUp 1s 1s forwards'), opacity: startOpacity }}>
          <h1 style={{
            fontFamily: font, fontSize: 'clamp(2rem, 4.5vw, 4.2rem)',
            fontWeight: 300, color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase',
            lineHeight: 1.05, margin: 0, letterSpacing: '0.04em',
          }}>
            Building websites
            <br />that
          </h1>
        </div>

        <div style={{
          textAlign: 'right', marginTop: '-0.25rem',
          animation: anim('fadeUp 1s 1.3s forwards'), opacity: startOpacity,
        }}>
          <h1 style={{
            fontFamily: font, fontSize: 'clamp(2rem, 4.5vw, 4.2rem)',
            fontWeight: 300, color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase',
            lineHeight: 1.05, margin: 0, letterSpacing: '0.04em',
          }}>
            move the
            <br />needle forward
          </h1>
        </div>

        {/* Nav links */}
        <div style={{
          display: 'flex', gap: '0.75rem', marginTop: '3rem', justifyContent: 'center',
          animation: anim('fadeIn 1s 1.6s forwards'), opacity: startOpacity,
        }}>
          {navLinks.map(link => (
            <a key={link.href} href={link.href} style={{
              fontFamily: font, fontSize: '0.8rem', fontWeight: 400,
              color: 'rgba(255,255,255,0.8)', textDecoration: 'none',
              letterSpacing: '0.12em', textTransform: 'uppercase',
              padding: '0.55rem 1.4rem', borderRadius: '9999px',
              border: '1px solid rgba(255,255,255,0.35)',
              transition: 'all 0.3s ease',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.7)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.075)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)'; e.currentTarget.style.color = 'rgba(255,255,255,0.8)'; e.currentTarget.style.backgroundColor = 'transparent' }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* Bottom section */}
      <div style={{
        position: 'relative', zIndex: 2, padding: '3rem',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        display: 'grid', gridTemplateColumns: '1fr 2fr auto',
        gap: '2rem', alignItems: 'start',
        animation: anim('fadeIn 1s 1.8s forwards'), opacity: startOpacity,
      }}>
        <a href="/contact" style={{
          fontFamily: font, fontSize: '0.75rem', fontWeight: 500,
          color: 'rgba(255,255,255,0.5)', textDecoration: 'none',
          letterSpacing: '0.1em', textTransform: 'uppercase',
          display: 'flex', alignItems: 'center', gap: '0.5rem',
        }}
          onMouseEnter={e => e.currentTarget.style.color = '#fff'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
        >
          <span style={{ display: 'inline-block', width: '8px', height: '8px', border: '1px solid rgba(255,255,255,0.4)', marginRight: '0.25rem' }} />
          Contact us
        </a>

        <p style={{
          fontFamily: 'monospace', fontSize: '0.8rem', fontWeight: 400,
          color: 'rgba(255,255,255,0.5)', lineHeight: 1.8,
          textTransform: 'uppercase', letterSpacing: '0.04em',
          maxWidth: '600px', margin: 0,
        }}>
          Mountain Studios is a web design agency based in Cape Town.
          We build premium, conversion-focused websites for small businesses.
          One conversation. One brief. Done. No jargon, no committees,
          no waiting months for a homepage.
        </p>

        <div style={{
          fontFamily: font, fontSize: '4rem', fontWeight: 300,
          color: 'rgba(255,255,255,0.08)', lineHeight: 1,
        }}>
          &#x275D;&#x275D;
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 768px) {
          nav > div { display: none !important; }
        }
      `}</style>
    </div>
  )
}
