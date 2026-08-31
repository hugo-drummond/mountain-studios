'use client'

import { useState } from 'react'
import Image from 'next/image'
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
        {/* The heading level used to jump straight from the hero h1 to the
            card h3s, and the page carried no sentence a search engine or an AI
            assistant could quote. Both fixed by one real h2 and a direct
            answer under it. */}
        <div style={{ maxWidth: '900px', margin: '0 auto 2.5rem' }}>
          <h2 style={{
            fontFamily: 'var(--font-source-sans), "Source Sans 3", sans-serif',
            fontSize: '1.35rem',
            fontWeight: 700,
            color: '#1a1a2e',
            margin: '0 0 0.9rem',
          }}>What kind of businesses do we build for?</h2>
          <p style={{ fontSize: '1.02rem', color: '#5d6478', lineHeight: 1.7, margin: 0 }}>
            Any South African business or organisation, of any size. The sites below are live right now and cover architecture, bakeries and food, curtains and blinds, and aluminium and glass awnings — and we build for churches, clubs, schools and community groups too. A website does not have to be for a business.
          </p>
        </div>

        <div
          className={`ms-work-grid${showAll ? ' ms-work-grid--all' : ''}`}
          style={{
            maxWidth: '900px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '2rem',
          }}
        >
          {/* Every item is rendered, always. This used to slice the array to
              three, which meant half the case studies — names, trades and
              descriptions, the most concrete evidence on the site — never
              reached the served HTML at all. "See More" now reveals what is
              already in the document rather than fetching it into existence.

              Which three are hidden is a CSS concern, so it is expressed as one
              class on the grid plus an :nth-child rule in globals.css rather
              than a `display` recomputed per item on every render. */}
          {portfolioItems.map((item) => (
            <a key={item.name} href={item.url} target="_blank" rel="noopener noreferrer" style={{
              textDecoration: 'none',
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
                  position: 'relative',
                }}>
                  <Image
                    src={item.img}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: 'cover', objectPosition: 'top center' }}
                  />
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
