'use client'

import { useState } from 'react'
import SiteNav from '../../components/site/SiteNav'

const font = 'var(--font-source-sans), "Source Sans 3", sans-serif'
const serif = 'Georgia, "Times New Roman", serif'

const glassCard: React.CSSProperties = {
  background: 'rgba(255,255,255,0.1)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border: '1px solid rgba(255,255,255,0.15)',
  borderRadius: '16px',
  padding: '2rem',
}

const fieldInput: React.CSSProperties = {
  fontFamily: font, fontSize: '0.95rem',
  background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: '12px', color: '#fff', padding: '0.85rem 1rem', width: '100%',
  outline: 'none', transition: 'border-color 0.3s',
}

const fieldLabel: React.CSSProperties = {
  fontFamily: font, fontSize: '0.65rem', fontWeight: 700,
  letterSpacing: '0.15em', textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.5)', marginBottom: '0.5rem', display: 'block',
}

const sectionNum: React.CSSProperties = {
  fontFamily: serif, fontStyle: 'italic', fontSize: '4rem',
  color: 'rgba(255,255,255,0.12)', lineHeight: 1, marginBottom: '0.25rem',
}

const sectionHeading: React.CSSProperties = {
  fontFamily: serif, fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 300,
  color: '#fff', marginBottom: '0.5rem',
}

const sectionDesc: React.CSSProperties = {
  fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7,
}

const pageOptions = [
  'Home', 'About', 'Services', 'Products', 'Contact',
  'Portfolio', 'Blog', 'FAQ', 'Testimonials',
]

export default function TempPage() {
  const [selectedPages, setSelectedPages] = useState<string[]>(['Home', 'About', 'Services'])
  const [businessName, setBusinessName] = useState('')
  const [style, setStyle] = useState('Modern')
  const [primaryColor, setPrimaryColor] = useState('#535f77')
  const [secondaryColor, setSecondaryColor] = useState('#d4b8c8')
  const [notes, setNotes] = useState('')
  const [ref1, setRef1] = useState('')
  const [ref2, setRef2] = useState('')
  const [ref3, setRef3] = useState('')
  const [instagram, setInstagram] = useState('')
  const [facebook, setFacebook] = useState('')

  const togglePage = (page: string) => {
    setSelectedPages(prev =>
      prev.includes(page) ? prev.filter(p => p !== page) : [...prev, page]
    )
  }

  return (
    <div style={{
      minHeight: '100vh', fontFamily: font,
      background: 'linear-gradient(180deg, #7b8fad 0%, #9aa4bc 35%, #b5a8c4 60%, #d4b8c8 80%, #e8c8cf 100%)',
    }}>
      <SiteNav />

      {/* Half-size header */}
      <header style={{
        textAlign: 'center', padding: '3rem 2rem 2rem',
        maxWidth: '600px', margin: '0 auto',
      }}>
        <h1 style={{
          fontFamily: serif, fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 300,
          color: '#fff', lineHeight: 1.15, marginBottom: '0.75rem',
        }}>Your <em>Brief</em></h1>
        <p style={{
          fontSize: '0.9rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7,
        }}>
          Review and refine every detail of your website build. Shape your digital vision.
        </p>
      </header>

      <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 2rem 5rem' }}>

        {/* ═══ 01: Business Details ═══ */}
        <section style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '3rem', marginBottom: '5rem', alignItems: 'start' }}>
          <div>
            <div style={sectionNum}>01</div>
            <h2 style={sectionHeading}>Business Details</h2>
            <p style={sectionDesc}>Defining the core identity of your brand through visual style and colour theory.</p>
          </div>
          <div style={glassCard}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={fieldLabel}>Business Name</label>
              <input type="text" value={businessName} onChange={e => setBusinessName(e.target.value)}
                placeholder="e.g. Cape Town Plumbing" style={fieldInput} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div>
                <label style={fieldLabel}>Style Preference</label>
                <select value={style} onChange={e => setStyle(e.target.value)}
                  style={{ ...fieldInput, cursor: 'pointer', appearance: 'none' as const }}>
                  {['Modern', 'Classic', 'Bold', 'Minimal', 'Creative'].map(s => (
                    <option key={s} value={s} style={{ background: '#333', color: '#fff' }}>{s}</option>
                  ))}
                </select>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={fieldLabel}>Primary</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', ...fieldInput, padding: '0.5rem 0.75rem' }}>
                    <input type="color" value={primaryColor} onChange={e => setPrimaryColor(e.target.value)}
                      style={{ width: '28px', height: '28px', borderRadius: '50%', border: 'none', cursor: 'pointer', padding: 0 }} />
                    <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>{primaryColor.toUpperCase()}</span>
                  </div>
                </div>
                <div>
                  <label style={fieldLabel}>Secondary</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', ...fieldInput, padding: '0.5rem 0.75rem' }}>
                    <input type="color" value={secondaryColor} onChange={e => setSecondaryColor(e.target.value)}
                      style={{ width: '28px', height: '28px', borderRadius: '50%', border: 'none', cursor: 'pointer', padding: 0 }} />
                    <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>{secondaryColor.toUpperCase()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 02: Site Architecture ═══ */}
        <section style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '3rem', marginBottom: '5rem', alignItems: 'start' }}>
          <div>
            <div style={sectionNum}>02</div>
            <h2 style={sectionHeading}>Site Architecture</h2>
            <p style={sectionDesc}>Map out the pages that will form your digital ecosystem.</p>
          </div>
          <div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
              {pageOptions.map(page => {
                const active = selectedPages.includes(page)
                return (
                  <button key={page} onClick={() => togglePage(page)} style={{
                    fontFamily: font, fontSize: '0.8rem', fontWeight: 600,
                    padding: '0.5rem 1.25rem', borderRadius: '999px', cursor: 'pointer',
                    transition: 'all 0.2s', border: active ? '1.5px solid rgba(255,255,255,0.5)' : '1.5px solid rgba(255,255,255,0.15)',
                    background: active ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.05)',
                    color: active ? '#fff' : 'rgba(255,255,255,0.5)',
                  }}>
                    {page} {active && '✓'}
                  </button>
                )
              })}
            </div>
            <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>
              {selectedPages.length} page{selectedPages.length !== 1 ? 's' : ''} selected
            </p>
          </div>
        </section>

        {/* ═══ 03: Brand & Social ═══ */}
        <section style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '3rem', marginBottom: '5rem', alignItems: 'start' }}>
          <div>
            <div style={sectionNum}>03</div>
            <h2 style={sectionHeading}>Brand & Social</h2>
            <p style={sectionDesc}>Establish your visual presence and connect your digital touchpoints.</p>
          </div>
          <div style={glassCard}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={fieldLabel}>Brand Assets</label>
              <div style={{
                border: '1.5px dashed rgba(255,255,255,0.2)', borderRadius: '12px',
                padding: '2rem', textAlign: 'center', color: 'rgba(255,255,255,0.4)',
                cursor: 'pointer', transition: 'border-color 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'}
              >
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>&#9729;</div>
                <p style={{ fontSize: '0.85rem', fontWeight: 600 }}>Upload Logo</p>
                <p style={{ fontSize: '0.7rem', marginTop: '0.25rem' }}>PNG or SVG, transparent background preferred</p>
              </div>
            </div>
            <div>
              <label style={fieldLabel}>Social Links</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <input type="text" value={instagram} onChange={e => setInstagram(e.target.value)}
                  placeholder="Instagram handle" style={fieldInput} />
                <input type="text" value={facebook} onChange={e => setFacebook(e.target.value)}
                  placeholder="Facebook page URL" style={fieldInput} />
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 04: Contextual Notes ═══ */}
        <section style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '3rem', marginBottom: '5rem', alignItems: 'start' }}>
          <div>
            <div style={sectionNum}>04</div>
            <h2 style={sectionHeading}>Contextual Notes</h2>
            <p style={sectionDesc}>Final instructions and inspirations to guide the creative process.</p>
          </div>
          <div style={glassCard}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={fieldLabel}>Final Instructions</label>
              <textarea value={notes} onChange={e => setNotes(e.target.value)}
                placeholder="Tell us anything else we should know..."
                rows={5} style={{ ...fieldInput, resize: 'vertical' }} />
            </div>
            <div>
              <label style={fieldLabel}>Reference Websites</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <input type="url" value={ref1} onChange={e => setRef1(e.target.value)}
                  placeholder="Reference URL 01" style={fieldInput} />
                <input type="url" value={ref2} onChange={e => setRef2(e.target.value)}
                  placeholder="Reference URL 02" style={fieldInput} />
                <input type="url" value={ref3} onChange={e => setRef3(e.target.value)}
                  placeholder="Reference URL 03" style={fieldInput} />
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 05: Review ═══ */}
        <section style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={sectionNum}>05</div>
          <h2 style={{ ...sectionHeading, textAlign: 'center' }}>Review & Next Steps</h2>
          <p style={{ ...sectionDesc, maxWidth: '400px', margin: '0 auto 2.5rem' }}>
            Verify your project details before we begin.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', maxWidth: '600px', margin: '0 auto' }}>
            <button style={{
              ...glassCard, cursor: 'pointer', textAlign: 'center', border: '1px solid rgba(255,255,255,0.2)',
              transition: 'all 0.2s', padding: '2rem',
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>&#128176;</div>
              <h3 style={{ fontFamily: serif, fontSize: '1.1rem', fontWeight: 400, color: '#fff', marginBottom: '0.35rem' }}>Proceed to Build</h3>
              <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>Pay 50% deposit to lock your slot</p>
            </button>
            <button style={{
              ...glassCard, cursor: 'pointer', textAlign: 'center', border: '1px solid rgba(255,255,255,0.2)',
              transition: 'all 0.2s', padding: '2rem',
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>&#128222;</div>
              <h3 style={{ fontFamily: serif, fontSize: '1.1rem', fontWeight: 400, color: '#fff', marginBottom: '0.35rem' }}>Not Ready Yet?</h3>
              <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>Book a strategy call with our team</p>
            </button>
          </div>
        </section>
      </main>

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
          section[style*="grid-template-columns: 1fr 2fr"] {
            grid-template-columns: 1fr !important;
          }
        }
        input::placeholder, textarea::placeholder, select {
          color: rgba(255,255,255,0.3);
        }
      `}</style>
    </div>
  )
}
