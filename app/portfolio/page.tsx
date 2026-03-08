'use client'

import { useState } from 'react'
import NavBar from '../../components/site/NavBar'

const projects = [
  {
    name: 'Alistair Drummond Architect',
    category: 'Architecture',
    image: '/images/portfolio/alistair-drummond.jpg',
    url: 'https://alistairdrummondarchitect.co.za/',
  },
  {
    name: 'Coimbra Bakery',
    category: 'Food & Bakery',
    image: '/images/portfolio/coimbra-bakery.jpg',
    url: 'https://coimbrabakery.co.za/',
  },
  {
    name: 'Pie in the Sky',
    category: 'Food & Bakery',
    image: '/images/portfolio/pie-in-the-sky.jpg',
    url: 'https://pie-in-the-sky.co.za/',
  },
  {
    name: 'Hout Bay Curtain Call',
    category: 'Interiors & Home',
    image: '/images/portfolio/houtbay-curtain-call.jpg',
    url: 'https://houtbaycurtaincall.co.za/',
  },
  {
    name: 'Bali Blinds',
    category: 'Interiors & Home',
    image: '/images/portfolio/bali-blinds.jpg',
    url: 'https://baliblinds.co.za/',
  },
]

export default function PortfolioPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div
      style={{
        minHeight: '100vh',
        fontFamily: 'var(--font-source-sans), "Source Sans 3", sans-serif',
        position: 'relative',
      }}
    >
      {/* Scrolling mountain background */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', zIndex: 0 }}>
        <div style={{ display: 'flex', height: '100%', animation: 'bg-scroll 60s linear infinite' }}>
          <img src="/images/bg.jpg" alt="" style={{ height: '100%', width: 'auto', minWidth: '100vw', objectFit: 'cover', flexShrink: 0 }} />
          <img src="/images/bg.jpg" alt="" style={{ height: '100%', width: 'auto', minWidth: '100vw', objectFit: 'cover', flexShrink: 0, transform: 'scaleX(-1)' }} />
          <img src="/images/bg.jpg" alt="" style={{ height: '100%', width: 'auto', minWidth: '100vw', objectFit: 'cover', flexShrink: 0 }} />
        </div>
      </div>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.75) 100%)' }} />

      <div style={{ position: 'relative', zIndex: 2, padding: '3rem 2.5rem' }}>
      <NavBar />

      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2.5rem',
          paddingTop: '5rem',
        }}
      >
        <a
          href="/"
          style={{
            color: '#fff',
            textDecoration: 'none',
            fontSize: '1.5rem',
            fontWeight: 200,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
          }}
        >
          Mountain Studios
        </a>
        <a
          href="/"
          style={{
            color: 'rgba(255,255,255,0.6)',
            textDecoration: 'none',
            fontSize: '0.85rem',
            fontWeight: 400,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            transition: 'color 0.3s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
        >
          Close ✕
        </a>
      </div>

      {/* Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.25rem',
        }}
      >
        {projects.map((project, i) => (
          <a
            key={project.url}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{
              position: 'relative',
              display: 'block',
              borderRadius: '4px',
              overflow: 'hidden',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            {/* Image */}
            <img
              src={project.image}
              alt={project.name}
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                transition: 'transform 0.5s ease, filter 0.5s ease',
                transform: hoveredIndex === i ? 'scale(1.05)' : 'scale(1)',
                filter: hoveredIndex === i ? 'brightness(0.7)' : 'brightness(0.85)',
              }}
            />

            {/* Gradient overlay */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '50%',
                background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)',
                pointerEvents: 'none',
              }}
            />

            {/* Text */}
            <div
              style={{
                position: 'absolute',
                bottom: '1.25rem',
                left: '1.25rem',
                right: '1.25rem',
              }}
            >
              <h2
                style={{
                  color: '#fff',
                  fontSize: '1.25rem',
                  fontWeight: 400,
                  margin: 0,
                  lineHeight: 1.3,
                }}
              >
                {project.name}
              </h2>
              <p
                style={{
                  color: 'rgba(255,255,255,0.6)',
                  fontSize: '0.8rem',
                  fontWeight: 300,
                  margin: '0.25rem 0 0',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}
              >
                {project.category}
              </p>
            </div>
          </a>
        ))}
      </div>
      </div>
    </div>
  )
}
