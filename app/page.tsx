'use client'

import { useState, useEffect, useRef } from 'react'
import SiteNav from '../components/site/SiteNav'

const serif = '"Noto Serif", Georgia, serif'
const sans = '"Plus Jakarta Sans", var(--font-source-sans), "Source Sans 3", sans-serif'

// Alpine Mist palette
const slate = '#535f77'
const rose = '#745762'
const surface = '#f9f9fe'
const surfaceAlt = '#f0edf8'
const onSurface = '#2e333a'
const dark = '#1a1e2e'

const portfolioItems = [
  { name: 'Alistair Drummond Architect', type: 'Architecture', img: '/images/portfolio/alistair-drummond.jpg', url: 'https://alistairdrummondarchitect.co.za/' },
  { name: 'Coimbra Bakery', type: 'Food & Bakery', img: '/images/portfolio/coimbra-bakery.jpg', url: 'https://coimbrabakery.co.za/' },
  { name: 'Pie in the Sky', type: 'Food & Bakery', img: '/images/portfolio/pie-in-the-sky.jpg', url: 'https://pie-in-the-sky.co.za/' },
  { name: 'Hout Bay Curtain Call', type: 'Interiors & Home', img: '/images/portfolio/houtbay-curtain-call.jpg', url: 'https://houtbaycurtaincall.co.za/' },
  { name: 'Bali Blinds', type: 'Interiors & Home', img: '/images/portfolio/bali-blinds.jpg', url: 'https://baliblinds.co.za/' },
  { name: "Ant's Awnings", type: 'Metal & Glass Awnings', img: '/images/portfolio/ants-awnings.jpg', url: 'https://antsawnings.co.za/' },
]

export default function Home() {
  const [hasVisited, setHasVisited] = useState(true)
  const [visibleCount, setVisibleCount] = useState(3)
  const [contactName, setContactName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactPhone, setContactPhone] = useState('')
  const [contactMessage, setContactMessage] = useState('')
  const [contactSent, setContactSent] = useState(false)
  const portfolioRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const visited = sessionStorage.getItem('ms-visited')
    if (!visited) {
      setHasVisited(false)
      sessionStorage.setItem('ms-visited', '1')
    }
  }, [])

  const anim = (a: string) => hasVisited ? 'none' : a
  const so = hasVisited ? 1 : 0

  const visibleItems = portfolioItems.slice(0, visibleCount)
  const hasMore = visibleCount < portfolioItems.length

  return (
    <div style={{ background: surface, fontFamily: sans, overflowX: 'hidden' }}>

      {/* ── HERO ── */}
      <div style={{
        background: 'linear-gradient(160deg, #c8d8f0 0%, #d6e3ff 25%, #e8d4e8 55%, #f6d0dd 80%, #f9d8d0 100%)',
        minHeight: '100vh', position: 'relative', overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
      }}>
        {/* Grain overlay */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0, opacity: 0.035, pointerEvents: 'none',
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
          backgroundRepeat: 'repeat', backgroundSize: '256px',
        }} />

        {/* Large decorative serif numeral */}
        <div style={{
          position: 'absolute', right: '5%', top: '50%', transform: 'translateY(-55%)',
          fontFamily: serif, fontSize: 'clamp(18rem, 28vw, 36rem)', fontWeight: 300,
          color: 'rgba(83,95,119,0.06)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
          zIndex: 1, letterSpacing: '-0.04em', fontStyle: 'italic',
        }}>M</div>

        <div style={{ position: 'relative', zIndex: 10, flexShrink: 0, animation: anim('fadeIn 0.8s 0.2s forwards'), opacity: so }}>
          <SiteNav />
        </div>

        {/* Hero content — left-aligned editorial */}
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: '0 clamp(2rem, 8vw, 8rem)', position: 'relative', zIndex: 2,
          maxWidth: '1200px', width: '100%',
        }}>
          <p className="ms-hero-label" style={{
            fontFamily: sans, fontSize: '0.68rem', fontWeight: 700,
            letterSpacing: '0.3em', textTransform: 'uppercase',
            color: slate, marginBottom: '2rem', opacity: 0.75,
            animation: anim('fadeUp 0.7s 0.4s forwards'), opacity: so,
          }}>Cape Town · Web Design Studio</p>

          <h1 className="ms-hero-h1" style={{
            fontFamily: serif, fontSize: 'clamp(3rem, 7vw, 6rem)',
            fontWeight: 300, color: onSurface, lineHeight: 1.05,
            margin: '0 0 2rem', maxWidth: '780px',
            animation: anim('fadeUp 1s 0.55s forwards'), opacity: so,
          }}>
            Websites built<br />
            for businesses<br />
            <em style={{ fontStyle: 'italic', color: rose }}>worth finding.</em>
          </h1>

          <p className="ms-hero-body" style={{
            fontFamily: sans, fontSize: 'clamp(0.9rem, 1.2vw, 1.05rem)',
            color: slate, maxWidth: '420px', lineHeight: 1.8,
            marginBottom: '3rem',
            animation: anim('fadeUp 1s 0.7s forwards'), opacity: so,
          }}>
            We design and build intentional digital presences for Cape Town&apos;s independent businesses — from first brief to live site.
          </p>

          <div className="ms-hero-cta" style={{ display: 'flex', gap: '1rem', alignItems: 'center', animation: anim('fadeUp 1s 0.85s forwards'), opacity: so }}>
            <a href="/start-your-project" style={{
              fontFamily: sans, fontSize: '0.8rem', fontWeight: 700,
              color: '#fff', background: onSurface, padding: '0.9rem 2.25rem',
              borderRadius: '999px', textDecoration: 'none',
              letterSpacing: '0.08em', textTransform: 'uppercase',
              display: 'inline-block', transition: 'background 0.25s',
            }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.background = rose}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.background = onSurface}
            >Start Your Project</a>
            <a href="#portfolio" style={{
              fontFamily: sans, fontSize: '0.8rem', fontWeight: 600,
              color: slate, textDecoration: 'none',
              letterSpacing: '0.06em', textTransform: 'uppercase',
              borderBottom: `1px solid ${slate}`, paddingBottom: '1px',
              transition: 'color 0.2s, border-color 0.2s',
            }}
              onMouseEnter={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.color = rose; a.style.borderColor = rose }}
              onMouseLeave={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.color = slate; a.style.borderColor = slate }}
            >View Our Work</a>
          </div>
        </div>

        {/* Float card — bottom right */}
        <div className="ms-float-card" style={{
          position: 'absolute', bottom: '4rem', right: '6%',
          width: '200px', height: '260px', borderRadius: '18px',
          background: 'rgba(255,255,255,0.35)', backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.5)',
          transform: 'rotate(-2.5deg)', overflow: 'hidden', zIndex: 3,
          boxShadow: '0 24px 64px rgba(83,95,119,0.15)',
          animation: anim('fadeIn 1.2s 1.1s forwards'), opacity: so,
        }}>
          <img src="https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }} />
        </div>

        {/* Float card — upper left offset */}
        <div className="ms-float-card" style={{
          position: 'absolute', top: '22%', right: '18%',
          width: '155px', height: '195px', borderRadius: '14px',
          background: 'rgba(255,255,255,0.25)', backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.4)',
          transform: 'rotate(1.5deg)', overflow: 'hidden', zIndex: 3,
          boxShadow: '0 16px 48px rgba(83,95,119,0.12)',
          animation: anim('fadeIn 1.2s 1.3s forwards'), opacity: so,
        }}>
          <img src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
        </div>

        {/* Stat badge */}
        <div className="ms-float-card" style={{
          position: 'absolute', bottom: '6rem', left: 'clamp(2rem, 6vw, 6rem)',
          background: 'rgba(255,255,255,0.45)', backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.5)',
          borderRadius: '14px', padding: '1.25rem 1.75rem',
          zIndex: 3, boxShadow: '0 8px 32px rgba(83,95,119,0.1)',
          animation: anim('fadeIn 1.2s 1.5s forwards'), opacity: so,
        }}>
          <p style={{ fontFamily: serif, fontSize: '2rem', fontWeight: 300, color: onSurface, margin: 0, fontStyle: 'italic', lineHeight: 1 }}>50+</p>
          <p style={{ fontFamily: sans, fontSize: '0.65rem', fontWeight: 700, color: rose, margin: '0.35rem 0 0', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Sites Built</p>
        </div>

        {/* Bottom fade */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '120px', zIndex: 2,
          background: `linear-gradient(to bottom, transparent, ${surface})`,
        }} />
      </div>

      {/* ── ABOUT ── */}
      <div id="about" style={{ background: surface, padding: 'clamp(5rem, 8vw, 8rem) clamp(2rem, 6vw, 6rem)' }}>
        <div className="ms-about-grid" style={{
          maxWidth: '1100px', margin: '0 auto',
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(3rem, 6vw, 7rem)', alignItems: 'start',
        }}>

          {/* Text col */}
          <div style={{ paddingTop: '1rem' }}>
            <p style={{
              fontFamily: sans, fontSize: '0.68rem', fontWeight: 700,
              letterSpacing: '0.28em', textTransform: 'uppercase',
              color: rose, marginBottom: '2rem',
            }}>About Us</p>

            <p style={{
              fontFamily: serif, fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)',
              fontWeight: 300, color: onSurface, lineHeight: 1.35,
              margin: '0 0 2rem',
            }}>
              Two friends who turned a side project into a studio.
            </p>

            <p style={{ fontFamily: sans, fontSize: '1rem', color: slate, lineHeight: 1.85, margin: '0 0 1.1rem' }}>
              Mountain Studios was started by Hugo and Nathan. What began as building websites for friends quickly grew into a fully-fledged business.
            </p>
            <p style={{ fontFamily: sans, fontSize: '1rem', color: slate, lineHeight: 1.85, margin: '0 0 2.75rem' }}>
              With more than 5 years and 50 websites developed between us, we&apos;re proud to help Cape Town&apos;s independent businesses build their digital presence.
            </p>

            {/* Stats row */}
            <div style={{ display: 'flex', gap: '2.5rem', marginBottom: '2.75rem' }}>
              {[['50+', 'Websites'], ['5+', 'Years'], ['2', 'Founders']].map(([n, l]) => (
                <div key={l}>
                  <p style={{ fontFamily: serif, fontSize: '2rem', fontWeight: 300, color: rose, margin: 0, fontStyle: 'italic', lineHeight: 1 }}>{n}</p>
                  <p style={{ fontFamily: sans, fontSize: '0.65rem', fontWeight: 700, color: slate, margin: '0.3rem 0 0', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{l}</p>
                </div>
              ))}
            </div>

            <a href="/start-your-project" style={{
              fontFamily: sans, fontSize: '0.78rem', fontWeight: 700,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: '#fff', background: slate,
              padding: '0.8rem 2rem', borderRadius: '999px',
              textDecoration: 'none', display: 'inline-block',
              transition: 'background 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.background = rose}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.background = slate}
            >Work With Us</a>
          </div>

          {/* Founder portraits — offset stagger */}
          <div style={{ position: 'relative', paddingTop: '2rem' }}>
            <div className="ms-founders-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              {[
                { name: 'Hugo', role: 'Co-founder', offset: '0', rotate: '-1.5deg' },
                { name: 'Nathan', role: 'Co-founder', offset: '2.5rem', rotate: '1.5deg' },
              ].map(({ name, role, offset, rotate }) => (
                <div key={name} style={{
                  marginTop: offset,
                  borderRadius: '18px', overflow: 'hidden',
                  background: '#fff',
                  boxShadow: '0 20px 48px rgba(83,95,119,0.1)',
                  transform: `rotate(${rotate})`,
                  transition: 'transform 0.4s ease, box-shadow 0.4s ease',
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'rotate(0deg) scale(1.01)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 28px 60px rgba(83,95,119,0.18)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = `rotate(${rotate})`; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 20px 48px rgba(83,95,119,0.1)' }}
                >
                  <div style={{
                    height: '260px', background: `linear-gradient(145deg, ${surfaceAlt} 0%, #e4dff4 100%)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <span style={{
                      fontFamily: serif, fontSize: '5rem', fontWeight: 300,
                      color: slate, opacity: 0.12, fontStyle: 'italic', userSelect: 'none',
                    }}>{name[0]}</span>
                  </div>
                  <div style={{ padding: '1rem 1.25rem 1.25rem' }}>
                    <p style={{ fontFamily: serif, fontSize: '1.1rem', fontWeight: 300, color: onSurface, margin: '0 0 0.2rem', fontStyle: 'italic' }}>{name}</p>
                    <p style={{ fontFamily: sans, fontSize: '0.65rem', fontWeight: 700, color: rose, margin: 0, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── PORTFOLIO ── */}
      <div id="portfolio" ref={portfolioRef} style={{ background: surfaceAlt, padding: 'clamp(5rem, 8vw, 8rem) clamp(2rem, 6vw, 6rem)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <p style={{
                fontFamily: sans, fontSize: '0.68rem', fontWeight: 700,
                letterSpacing: '0.28em', textTransform: 'uppercase',
                color: rose, marginBottom: '0.75rem',
              }}>Our Work</p>
              <h2 style={{
                fontFamily: serif, fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                fontWeight: 300, color: onSurface, margin: 0, lineHeight: 1.15,
              }}>
                Selected <em style={{ fontStyle: 'italic' }}>Projects</em>
              </h2>
            </div>
            <a href="/portfolio" style={{
              fontFamily: sans, fontSize: '0.75rem', fontWeight: 700,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: slate, textDecoration: 'none',
              borderBottom: `1px solid ${slate}`, paddingBottom: '2px',
              transition: 'color 0.2s, border-color 0.2s',
            }}
              onMouseEnter={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.color = rose; a.style.borderColor = rose }}
              onMouseLeave={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.color = slate; a.style.borderColor = slate }}
            >View All →</a>
          </div>

          {/* Magazine grid */}
          {visibleItems.length > 0 && (
            <div className="ms-portfolio-mag" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
              {/* Feature card */}
              {visibleItems[0] && (
                <a href={visibleItems[0].url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
                  <div style={{
                    borderRadius: '20px', overflow: 'hidden', background: '#fff',
                    boxShadow: '0 24px 48px rgba(83,95,119,0.1)',
                    transition: 'box-shadow 0.35s ease, transform 0.35s ease',
                  }}
                    onMouseEnter={e => { const d = e.currentTarget as HTMLDivElement; d.style.boxShadow = '0 32px 64px rgba(83,95,119,0.18)'; d.style.transform = 'translateY(-3px)' }}
                    onMouseLeave={e => { const d = e.currentTarget as HTMLDivElement; d.style.boxShadow = '0 24px 48px rgba(83,95,119,0.1)'; d.style.transform = 'translateY(0)' }}
                  >
                    <div style={{ height: '380px', overflow: 'hidden', position: 'relative' }}>
                      <img src={visibleItems[0].img} alt={visibleItems[0].name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
                        onMouseEnter={e => (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.04)'}
                        onMouseLeave={e => (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'}
                      />
                    </div>
                    <div style={{ padding: '1.5rem 1.75rem' }}>
                      <p style={{ fontFamily: sans, fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: rose, margin: '0 0 0.4rem' }}>{visibleItems[0].type}</p>
                      <p style={{ fontFamily: serif, fontSize: '1.35rem', fontWeight: 300, color: onSurface, margin: 0 }}>{visibleItems[0].name}</p>
                    </div>
                  </div>
                </a>
              )}

              {/* Second card stacked */}
              {visibleItems[1] && (
                <a href={visibleItems[1].url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block', alignSelf: 'start', marginTop: '2rem' }}>
                  <div style={{
                    borderRadius: '20px', overflow: 'hidden', background: '#fff',
                    boxShadow: '0 20px 40px rgba(83,95,119,0.09)',
                    transition: 'box-shadow 0.35s ease, transform 0.35s ease',
                  }}
                    onMouseEnter={e => { const d = e.currentTarget as HTMLDivElement; d.style.boxShadow = '0 28px 56px rgba(83,95,119,0.16)'; d.style.transform = 'translateY(-3px)' }}
                    onMouseLeave={e => { const d = e.currentTarget as HTMLDivElement; d.style.boxShadow = '0 20px 40px rgba(83,95,119,0.09)'; d.style.transform = 'translateY(0)' }}
                  >
                    <div style={{ height: '280px', overflow: 'hidden' }}>
                      <img src={visibleItems[1].img} alt={visibleItems[1].name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
                        onMouseEnter={e => (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.04)'}
                        onMouseLeave={e => (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'}
                      />
                    </div>
                    <div style={{ padding: '1.25rem 1.5rem' }}>
                      <p style={{ fontFamily: sans, fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: rose, margin: '0 0 0.35rem' }}>{visibleItems[1].type}</p>
                      <p style={{ fontFamily: serif, fontSize: '1.1rem', fontWeight: 300, color: onSurface, margin: 0 }}>{visibleItems[1].name}</p>
                    </div>
                  </div>
                </a>
              )}
            </div>
          )}

          {/* Remaining 3-col grid */}
          {visibleItems.length > 2 && (
            <div className="ms-portfolio-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
              {visibleItems.slice(2).map((item) => (
                <a key={item.name} href={item.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
                  <div style={{
                    borderRadius: '18px', overflow: 'hidden', background: '#fff',
                    boxShadow: '0 16px 36px rgba(83,95,119,0.08)',
                    transition: 'box-shadow 0.35s ease, transform 0.35s ease',
                  }}
                    onMouseEnter={e => { const d = e.currentTarget as HTMLDivElement; d.style.boxShadow = '0 24px 52px rgba(83,95,119,0.15)'; d.style.transform = 'translateY(-3px)' }}
                    onMouseLeave={e => { const d = e.currentTarget as HTMLDivElement; d.style.boxShadow = '0 16px 36px rgba(83,95,119,0.08)'; d.style.transform = 'translateY(0)' }}
                  >
                    <div style={{ height: '220px', overflow: 'hidden' }}>
                      <img src={item.img} alt={item.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
                        onMouseEnter={e => (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.04)'}
                        onMouseLeave={e => (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'}
                      />
                    </div>
                    <div style={{ padding: '1.1rem 1.35rem' }}>
                      <p style={{ fontFamily: sans, fontSize: '0.63rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: rose, margin: '0 0 0.3rem' }}>{item.type}</p>
                      <p style={{ fontFamily: serif, fontSize: '1rem', fontWeight: 300, color: onSurface, margin: 0 }}>{item.name}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}

          {hasMore && (
            <div style={{ textAlign: 'center', paddingTop: '2.5rem' }}>
              <button
                onClick={() => setVisibleCount(c => c + 3)}
                style={{
                  fontFamily: sans, fontSize: '0.75rem', fontWeight: 700,
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  background: 'transparent', border: `1.5px solid ${slate}`,
                  color: slate, width: '52px', height: '52px', borderRadius: '999px',
                  cursor: 'pointer', transition: 'all 0.2s',
                  fontSize: '1.2rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                }}
                onMouseEnter={e => { const b = e.currentTarget; b.style.background = slate; b.style.color = '#fff' }}
                onMouseLeave={e => { const b = e.currentTarget; b.style.background = 'transparent'; b.style.color = slate }}
                aria-label="Load more"
              >↓</button>
            </div>
          )}
        </div>
      </div>

      {/* ── CONTACT ── */}
      <div id="contact" style={{ background: dark, padding: 'clamp(5rem, 8vw, 8rem) clamp(2rem, 6vw, 6rem)', position: 'relative', overflow: 'hidden' }}>

        {/* Background serif watermark */}
        <div style={{
          position: 'absolute', right: '-2%', bottom: '-10%',
          fontFamily: serif, fontSize: 'clamp(14rem, 22vw, 28rem)', fontWeight: 300,
          color: 'rgba(255,255,255,0.025)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
          fontStyle: 'italic', letterSpacing: '-0.03em',
        }}>ms</div>

        <div style={{ maxWidth: '680px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <p style={{
            fontFamily: sans, fontSize: '0.68rem', fontWeight: 700,
            letterSpacing: '0.28em', textTransform: 'uppercase',
            color: '#d4b8c8', marginBottom: '1.5rem',
          }}>Get In Touch</p>

          <h2 style={{
            fontFamily: serif, fontSize: 'clamp(2.25rem, 4vw, 3.5rem)',
            fontWeight: 300, color: '#fff', lineHeight: 1.15,
            margin: '0 0 1rem',
          }}>
            Let&apos;s build something<br />
            <em style={{ fontStyle: 'italic', color: '#d4b8c8' }}>worth visiting.</em>
          </h2>

          <p style={{ fontFamily: sans, fontSize: '0.95rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.75, marginBottom: '3.5rem' }}>
            Tell us about your business and we&apos;ll get back to you within 24 hours.
          </p>

          {contactSent ? (
            <div style={{ padding: '3rem', background: 'rgba(255,255,255,0.04)', borderRadius: '20px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.08)' }}>
              <p style={{ fontFamily: serif, fontSize: '1.75rem', color: '#fff', fontWeight: 300, margin: '0 0 0.5rem', fontStyle: 'italic' }}>Message received.</p>
              <p style={{ fontFamily: sans, fontSize: '0.9rem', color: 'rgba(255,255,255,0.4)', margin: 0 }}>We&apos;ll be in touch shortly.</p>
            </div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setContactSent(true) }}
              style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {[
                { type: 'text', placeholder: 'Your name', value: contactName, setter: setContactName, required: true },
                { type: 'email', placeholder: 'Email address', value: contactEmail, setter: setContactEmail, required: true },
                { type: 'tel', placeholder: 'Phone number', value: contactPhone, setter: setContactPhone, required: false },
              ].map(({ type, placeholder, value, setter, required }) => (
                <div key={placeholder} style={{ borderBottom: '1px solid rgba(255,255,255,0.12)', marginBottom: '0' }}>
                  <input
                    type={type} placeholder={placeholder} value={value}
                    onChange={e => setter(e.target.value)} required={required}
                    style={{
                      fontFamily: sans, fontSize: '1rem', fontWeight: 300,
                      background: 'transparent', border: 'none', outline: 'none',
                      color: '#fff', padding: '1.25rem 0', width: '100%',
                      caretColor: '#d4b8c8',
                    }}
                  />
                </div>
              ))}
              <div style={{ borderBottom: '1px solid rgba(255,255,255,0.12)', marginBottom: '2.5rem' }}>
                <textarea
                  placeholder="A bit about your website" value={contactMessage}
                  onChange={e => setContactMessage(e.target.value)} rows={3} required
                  style={{
                    fontFamily: sans, fontSize: '1rem', fontWeight: 300,
                    background: 'transparent', border: 'none', outline: 'none',
                    color: '#fff', padding: '1.25rem 0', width: '100%',
                    resize: 'none', caretColor: '#d4b8c8',
                  }}
                />
              </div>
              <div>
                <button type="submit" style={{
                  fontFamily: sans, fontSize: '0.78rem', fontWeight: 700,
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  background: '#fff', color: dark,
                  border: 'none', borderRadius: '999px',
                  padding: '0.9rem 2.5rem', cursor: 'pointer',
                  transition: 'background 0.25s, color 0.25s',
                }}
                  onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = '#d4b8c8'; b.style.color = dark }}
                  onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = '#fff'; b.style.color = dark }}
                >Send Message</button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div style={{ background: '#0f111a', padding: '1.75rem clamp(2rem, 6vw, 6rem)' }}>
        <div style={{
          maxWidth: '1200px', margin: '0 auto',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '0.75rem',
        }}>
          <a href="/" style={{
            fontFamily: serif, fontSize: '1rem', fontWeight: 300,
            color: 'rgba(255,255,255,0.7)', textDecoration: 'none',
            letterSpacing: '0.04em', fontStyle: 'italic',
          }}>mountain studios</a>
          <p style={{ fontFamily: sans, fontSize: '0.72rem', color: 'rgba(255,255,255,0.2)', margin: 0, letterSpacing: '0.04em' }}>
            © {new Date().getFullYear()} Mountain Studios · Cape Town
          </p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {['Privacy Policy', 'Terms of Service'].map(t => (
              <a key={t} href="#" style={{ fontFamily: sans, color: 'rgba(255,255,255,0.2)', fontSize: '0.72rem', textDecoration: 'none', letterSpacing: '0.04em', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.2)'}
              >{t}</a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');

        @keyframes fadeIn {
          from { opacity: 0 }
          to { opacity: 1 }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px) }
          to { opacity: 1; transform: translateY(0) }
        }

        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.25); }
        input:focus, textarea:focus { border-color: rgba(212,184,200,0.5) !important; }

        @media (max-width: 768px) {
          .ms-float-card { display: none !important; }
          .ms-hero-h1 { font-size: clamp(2.5rem, 8vw, 4rem) !important; }
          .ms-portfolio-mag { grid-template-columns: 1fr !important; }
          .ms-portfolio-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .ms-about-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .ms-founders-grid { grid-template-columns: 1fr 1fr !important; }
          .ms-portfolio-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
