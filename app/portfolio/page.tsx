'use client'

import SiteNav from '../../components/site/SiteNav'

const font = 'var(--font-source-sans), "Source Sans 3", sans-serif'
const serif = 'Georgia, "Times New Roman", serif'

const projects = [
  { name: 'Alistair Drummond Architect', category: 'Architecture', image: '/images/portfolio/alistair-drummond.jpg', url: 'https://alistairdrummondarchitect.co.za/' },
  { name: 'Coimbra Bakery', category: 'Food & Bakery', image: '/images/portfolio/coimbra-bakery.jpg', url: 'https://coimbrabakery.co.za/' },
  { name: 'Pie in the Sky', category: 'Food & Bakery', image: '/images/portfolio/pie-in-the-sky.jpg', url: 'https://pie-in-the-sky.co.za/' },
  { name: 'Hout Bay Curtain Call', category: 'Interiors & Home', image: '/images/portfolio/houtbay-curtain-call.jpg', url: 'https://houtbaycurtaincall.co.za/' },
  { name: 'Bali Blinds', category: 'Interiors & Home', image: '/images/portfolio/bali-blinds.jpg', url: 'https://baliblinds.co.za/' },
]

// Stagger heights for masonry effect
const cardHeights = ['340px', '380px', '320px', '360px', '340px', '380px']
const cardOffsets = ['0', '2.5rem', '0', '1.5rem', '3rem', '0.5rem']

export default function PortfolioPage() {
  return (
    <div style={{
      minHeight: '100vh', fontFamily: font,
      background: 'linear-gradient(180deg, #7b8fad 0%, #9aa4bc 35%, #b5a8c4 60%, #d4b8c8 80%, #e8c8cf 100%)',
    }}>
      <SiteNav />

      {/* Header */}
      <section style={{ textAlign: 'center', padding: '4rem 2rem 3rem', maxWidth: '600px', margin: '0 auto' }}>
        <p style={{
          fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.5)', marginBottom: '0.75rem',
        }}>Portfolio</p>
        <h1 style={{
          fontFamily: serif, fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 300,
          color: '#fff', lineHeight: 1.15, marginBottom: '1rem',
        }}>
          Selected <em style={{ fontStyle: 'italic' }}>Works</em>
        </h1>
        <p style={{
          fontSize: '0.9rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7,
        }}>
          A curation of architectural precision and digital elegance, crafted for brands that value intentionality.
        </p>
      </section>

      {/* Staggered Grid */}
      <section style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 2rem 5rem' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem',
        }}>
          {projects.map((project, i) => (
            <a
              key={project.url}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: 'none', display: 'block',
                marginTop: cardOffsets[i % cardOffsets.length],
              }}
            >
              <div style={{
                borderRadius: '16px', overflow: 'hidden',
                height: cardHeights[i % cardHeights.length],
                boxShadow: '0 10px 40px rgba(0,0,0,0.12)',
                transition: 'transform 0.4s ease, box-shadow 0.4s ease',
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.2)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.12)'
                }}
              >
                <img
                  src={project.image}
                  alt={project.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
              <div style={{ padding: '0.75rem 0.25rem 0' }}>
                <h2 style={{
                  fontFamily: serif, fontSize: '1rem', fontWeight: 400,
                  color: '#fff', margin: 0, lineHeight: 1.3,
                }}>{project.name}</h2>
                <p style={{
                  fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.1em',
                  textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)',
                  margin: '0.2rem 0 0',
                }}>{project.category}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '3rem 2rem 2rem',
        background: 'rgba(26,26,46,0.07)',
        borderTop: '1px solid rgba(255,255,255,0.1)',
      }}>
        <div style={{
          maxWidth: '1100px', margin: '0 auto',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '1rem',
        }}>
          <a href="/" style={{
            fontFamily: font, fontSize: '1.05rem', fontWeight: 700,
            color: '#fff', textDecoration: 'none', letterSpacing: '0.04em',
          }}>mountain studios</a>
          <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', margin: 0 }}>
            © {new Date().getFullYear()} Mountain Studios. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {['Privacy Policy', 'Terms of Service'].map(t => (
              <a key={t} href="#" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', textDecoration: 'none' }}>{t}</a>
            ))}
          </div>
        </div>
      </footer>

      <style>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: repeat(3"] {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 480px) {
          div[style*="grid-template-columns: repeat(3"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
