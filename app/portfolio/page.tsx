'use client'

import { useState } from 'react'

const font = 'var(--font-source-sans), "Source Sans 3", sans-serif'
const serif = 'Georgia, "Times New Roman", serif'

import SiteNav from '../../components/site/SiteNav'

const projects = [
  { name: 'Alistair Drummond Architect', category: 'Architecture', image: '/images/portfolio/alistair-drummond.jpg', url: 'https://alistairdrummondarchitect.co.za/' },
  { name: 'Coimbra Bakery', category: 'Food & Bakery', image: '/images/portfolio/coimbra-bakery.jpg', url: 'https://coimbrabakery.co.za/' },
  { name: 'Pie in the Sky', category: 'Food & Bakery', image: '/images/portfolio/pie-in-the-sky.jpg', url: 'https://pie-in-the-sky.co.za/' },
  { name: 'Hout Bay Curtain Call', category: 'Interiors & Home', image: '/images/portfolio/houtbay-curtain-call.jpg', url: 'https://houtbaycurtaincall.co.za/' },
  { name: 'Bali Blinds', category: 'Interiors & Home', image: '/images/portfolio/bali-blinds.jpg', url: 'https://baliblinds.co.za/' },
]

export default function PortfolioPage() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <div style={{
      minHeight: '100vh', fontFamily: font,
      background: 'linear-gradient(180deg, #8e9fba 0%, #a8b8cc 40%, #d4b8c8 80%, #e8c8cf 100%)',
    }}>
      {/* Nav */}
      <SiteNav />

      {/* Header */}
      <section style={{ textAlign: 'center', padding: '4rem 2rem 3rem' }}>
        <h1 style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: '#fff', margin: 0 }}>
          Our Work
        </h1>
      </section>

      {/* Grid */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2.5rem 5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
          {projects.map((project, i) => (
            <a
              key={project.url}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                position: 'relative', display: 'block', borderRadius: '12px',
                overflow: 'hidden', textDecoration: 'none',
              }}
            >
              <img
                src={project.image}
                alt={project.name}
                style={{
                  width: '100%', height: 'auto', display: 'block',
                  transition: 'transform 0.5s ease, filter 0.5s ease',
                  transform: hovered === i ? 'scale(1.05)' : 'scale(1)',
                  filter: hovered === i ? 'brightness(0.65)' : 'brightness(0.85)',
                }}
              />
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%',
                background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)',
                pointerEvents: 'none',
              }} />
              <div style={{ position: 'absolute', bottom: '1.25rem', left: '1.25rem', right: '1.25rem' }}>
                <h2 style={{ color: '#fff', fontSize: '1.15rem', fontWeight: 400, margin: 0, lineHeight: 1.3 }}>
                  {project.name}
                </h2>
                <p style={{
                  color: 'rgba(255,255,255,0.6)', fontSize: '0.78rem', fontWeight: 400,
                  margin: '0.25rem 0 0', letterSpacing: '0.06em', textTransform: 'uppercase',
                }}>{project.category}</p>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}
