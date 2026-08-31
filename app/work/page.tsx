'use client'

import { useState } from 'react'
import PageShell from '@/components/site/PageShell'

const portfolioItems = [
  { name: 'Alistair Drummond Architect', type: 'Architecture', img: '/images/portfolio/ada.jpg', url: 'https://alistairdrummondarchitect.co.za/', desc: 'Bespoke residential designs in Cape Town.' },
  { name: 'Coimbra Bakery', type: 'Food & Bakery', img: '/images/portfolio/coimbra-bakery.jpg', url: 'https://coimbrabakery.co.za/', desc: 'Traditional Portuguese bakery and cafe.' },
  { name: 'Pie in the Sky', type: 'Food & Bakery', img: '/images/portfolio/pie-in-the-sky.jpg', url: 'https://pie-in-the-sky.co.za/', desc: 'Handcrafted pies and treats.' },
  { name: 'Hout Bay Curtain Call', type: 'Interiors & Home', img: '/images/portfolio/houtbay-curtain-call.jpg', url: 'https://houtbaycurtaincall.co.za/', desc: 'Custom window treatments and soft furnishings.' },
  { name: "Ant's Awnings", type: 'Metal & Glass Awnings', img: '/images/portfolio/ants-awnings.jpg', url: 'https://antsawnings.co.za/', desc: 'Durable aluminium and glass solutions.' },
  { name: 'Bali Blinds', type: 'Interiors & Home', img: '/images/portfolio/bali-blinds.jpg', url: 'https://baliblinds.co.za/', desc: 'Premium blinds and shutters for modern living.' },
]

export default function Work() {
  const [showAll, setShowAll] = useState(false)
  const displayedItems = showAll ? portfolioItems : portfolioItems.slice(0, 3)

  return (
    <PageShell
      eyebrow="CASE STUDIES"
      title={<>The brands <em style={{ fontStyle: 'italic' }}>we&apos;ve</em> built.</>}
      sub="Real businesses. Real sites. Go and look at them."
    >
      <div style={{
        background: '#f4f2fa',
        padding: '4rem 2rem',
      }}>
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '2rem',
        }}>
          {displayedItems.map((item) => (
            <a key={item.name} href={item.url} target="_blank" rel="noopener noreferrer" style={{
              textDecoration: 'none',
              display: 'block',
              transition: 'transform 0.3s ease',
            }}>
              <div style={{
                background: '#fff',
                borderRadius: '14px',
                overflow: 'hidden',
                boxShadow: '0 18px 40px -22px rgba(26,26,46,0.35)',
                display: 'grid',
                gridTemplateColumns: '1.2fr 1fr',
                gap: '1.5rem',
                padding: '1.1rem',
              }} className="page-shell-grid">
                {/* IMAGE AREA */}
                <div style={{
                  background: '#d8d5e0',
                  borderRadius: '8px',
                  aspectRatio: '16/9',
                  overflow: 'hidden',
                }}>
                  <img src={item.img} alt={item.name} style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'top center',
                    display: 'block',
                  }} />
                </div>

                {/* CONTENT AREA */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}>
                  <p style={{
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.14em',
                    color: '#7d3d4f',
                    margin: '0 0 0.5rem',
                  }}>
                    {item.type}
                  </p>

                  <h3 style={{
                    fontFamily: 'var(--font-playfair), Georgia, serif',
                    fontSize: '1.8rem',
                    fontWeight: 400,
                    color: '#1a1a2e',
                    margin: '0 0 0.75rem',
                  }}>
                    {item.name}
                  </h3>

                  <p style={{
                    fontSize: '1rem',
                    color: '#5d6478',
                    lineHeight: 1.6,
                    margin: '0 0 1.5rem',
                  }}>
                    {item.desc}
                  </p>

                  <button style={{
                    background: '#7d3d4f',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '999px',
                    padding: '0.7rem 1.6rem',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    cursor: 'pointer',
                    width: 'fit-content',
                  }}>
                    VIEW THE SITE →
                  </button>
                </div>
              </div>
            </a>
          ))}

          {!showAll && (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '1rem',
            }}>
              <button
                onClick={() => setShowAll(true)}
                style={{
                  background: '#7d3d4f',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '999px',
                  padding: '0.85rem 2rem',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  cursor: 'pointer',
                }}
              >
                See More
              </button>
            </div>
          )}
        </div>
      </div>
    </PageShell>
  )
}
