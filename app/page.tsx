'use client'

import { useState, useEffect } from 'react'

const WHATSAPP_NUMBER = '27000000000' // TODO: real number
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`

interface PortfolioItem {
  name: string
  type: string
  img: string
  url: string
  desc: string
}

const portfolioItems: PortfolioItem[] = [
  { name: 'Alistair Drummond Architect', type: 'Architecture', img: '/images/portfolio/ada.jpg', url: 'https://alistairdrummondarchitect.co.za/', desc: 'Bespoke residential designs in Cape Town.' },
  { name: 'Coimbra Bakery', type: 'Food & Bakery', img: '/images/portfolio/coimbra-bakery.jpg', url: 'https://coimbrabakery.co.za/', desc: 'Traditional Portuguese bakery and cafe.' },
  { name: 'Pie in the Sky', type: 'Food & Bakery', img: '/images/portfolio/pie-in-the-sky.jpg', url: 'https://pie-in-the-sky.co.za/', desc: 'Handcrafted pies and treats.' },
  { name: 'Hout Bay Curtain Call', type: 'Interiors & Home', img: '/images/portfolio/houtbay-curtain-call.jpg', url: 'https://houtbaycurtaincall.co.za/', desc: 'Custom window treatments and soft furnishings.' },
  { name: 'Bali Blinds', type: 'Interiors & Home', img: '/images/portfolio/bali-blinds.jpg', url: 'https://baliblinds.co.za/', desc: 'Premium blinds and shutters for modern living.' },
  { name: "Ant's Awnings", type: 'Metal & Glass Awnings', img: '/images/portfolio/ants-awnings.jpg', url: 'https://antsawnings.co.za/', desc: 'Durable aluminium and glass solutions.' },
]

interface ReviewItem {
  stars: number
  text?: string
  name?: string
  business?: string
  timeAgo?: string
}

const reviews: ReviewItem[] = [
  { stars: 5, text: 'Placeholder review — real Google review to be pasted here.', name: 'Sarah', business: 'CUSTOMER BUSINESS', timeAgo: '2 weeks ago' },
  { stars: 5, text: 'Placeholder review — real Google review to be pasted here.', name: 'Mark', business: 'CUSTOMER BUSINESS', timeAgo: '1 month ago' },
  { stars: 5, text: 'Placeholder review — real Google review to be pasted here.', name: 'Jessica', business: 'CUSTOMER BUSINESS', timeAgo: '3 weeks ago' },
]

interface FaqItem {
  q: string
  a: string
}

const faqItems: FaqItem[] = [
  { q: 'How long does it take?', a: 'Typically about 14 days from when we receive your content.' },
  { q: 'What does it cost?', a: 'Every site is priced on what it actually needs, so we quote per job rather than publish a menu. Tell us what you\'re after and you\'ll have a number the same week.' },
  { q: 'Do I own the website?', a: 'Yes. The site, the domain and the content are yours. Cancel the retainer and it stays yours.' },
  { q: 'What happens if I want changes later?', a: 'Small changes are part of the retainer. Bigger additions get quoted before we touch anything.' },
  { q: 'Who hosts it?', a: 'We do. Hosting, the SSL certificate and the domain are included in every package.' },
  { q: 'Do I need to write the content?', a: 'No. Send us what you have — photos, a menu, an old brochure — and we write the rest. You approve it before it goes live.' },
  { q: 'Do you do more than websites?', a: 'Yes. Bookings, payments, Google Business setup and the automations that sit behind them.' },
  { q: 'What if I already have a website?', a: 'Then start with the free audit above. If it only needs fixing, we\'ll say so.' },
]

export default function Home() {
  const [name, setName] = useState('')
  const [nameFinal, setNameFinal] = useState('')
  const [auditUrl, setAuditUrl] = useState('')
  const [auditDone, setAuditDone] = useState(false)
  const [referName, setReferName] = useState('')
  const [referEmail, setReferEmail] = useState('')
  const [referPhone, setReferPhone] = useState('')
  const [referDone, setReferDone] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [variant, setVariant] = useState<'site' | 'chat' | null>(null)

  const WhatsAppIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004c-2.759 0-5.327 1.273-7.04 3.51-.422.54-.423 1.417.099 1.91 1.11 1.107 2.105 2.293 2.889 3.643 1.572 2.765 4.575 4.528 7.52 4.568h.004c4.141 0 7.506-3.36 7.506-7.499 0-4.139-3.365-7.492-7.506-7.492m0-2c5.206 0 9.445 4.224 9.445 9.407 0 5.182-4.239 9.407-9.445 9.407-2.147 0-4.203-.738-5.834-2.097L.464 23.971a1 1 0 0 0 1.406 1.406l3.357-3.358C6.734 23.343 9.236 24 12.051 24c5.206 0 9.445-4.225 9.445-9.408 0-5.182-4.239-9.407-9.445-9.407Z" />
    </svg>
  )

  const handleBusinessNameSubmit = (value: string) => {
    if (value.trim()) {
      window.location.href = '/start-your-project?name=' + encodeURIComponent(value.trim())
    }
  }

  const handleAuditSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setAuditDone(true)
  }

  const handleReferSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setReferDone(true)
  }

  useEffect(() => {
    const v = new URLSearchParams(window.location.search).get('v')
    let chosen: 'site' | 'chat'
    if (v === '1') chosen = 'site'
    else if (v === '2') chosen = 'chat'
    else {
      const stored = localStorage.getItem('ms_variant')
      chosen = stored === 'site' || stored === 'chat' ? stored : (Math.random() < 0.5 ? 'site' : 'chat')
    }
    localStorage.setItem('ms_variant', chosen)
    setVariant(chosen)
    // Tells ChatWidget to re-check whether this page is drawing the launcher.
    // It reads the localStorage value above on its own too; this is the catch-up
    // for a variant picked after the widget had already settled, e.g. arriving
    // here by client-side navigation from another page.
    window.dispatchEvent(new Event('ms-chat:variant'))
  }, [])

  const StarRating = ({ count }: { count: number }) => (
    <div style={{ display: 'flex', gap: '0.2rem' }}>
      {Array(count).fill(0).map((_, i) => (
        <span key={i} style={{ color: '#F5B301', fontSize: '1rem' }}>★</span>
      ))}
    </div>
  )

  return (
    <div style={{ background: '#f4f2fa', fontFamily: 'var(--font-source-sans), "Source Sans 3", sans-serif', margin: 0, overflow: 'hidden' }}>

      {/* TOP BAR */}
      <div style={{ background: '#171b2b', padding: '0.6rem 2rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'rgba(255,255,255,0.72)' }}>
        <a href={WHATSAPP_URL} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', textDecoration: 'none', color: 'rgba(255,255,255,0.72)', whiteSpace: 'nowrap' }}>
          <WhatsAppIcon />
          WhatsApp us<span className="ms-hours"> · Mon–Fri 8:00–17:00</span>
        </a>
        <a href="#refer" style={{ textDecoration: 'none', color: 'rgba(255,255,255,0.72)' }}>Refer & earn R1000 →</a>
      </div>

      {/* HERO SECTION */}
      <div style={{
        background: 'linear-gradient(180deg,#6f86a6 0%,#8f9ab6 30%,#ad9fbf 55%,#d0b5c6 78%,#e9cad0 100%)',
        position: 'relative',
        overflow: 'hidden',
        padding: '0 0 8rem',
      }}>

        {/* NAV */}
        <nav style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '1.5rem 2rem 0',
          position: 'relative',
          zIndex: 5,
        } as React.CSSProperties}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          background: 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          border: '1px solid rgba(255,255,255,0.35)',
          borderRadius: '999px',
          padding: '0.55rem 0.55rem 0.55rem 1.75rem',
          gap: '0.4rem',
        } as React.CSSProperties}>
          <a href="/" style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: '1.15rem', color: '#1a1a2e', textDecoration: 'none', marginRight: '1rem', fontWeight: 400, whiteSpace: 'nowrap' }}>mountain studios</a>
          <div className="ms-nav-links" style={{ display: 'flex', gap: '0.4rem' }}>
            {[{ label: 'WORK', href: '/work' }, { label: 'SERVICES', href: '/services' }, { label: 'PRICING', href: '#pricing' }, { label: 'REFER', href: '#refer' }, { label: 'ABOUT', href: '/about' }, { label: 'CONTACT', href: '/contact' }].map(link => (
              <a key={link.href} href={link.href} style={{
                fontSize: '0.78rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#1a1a2e',
                textDecoration: 'none',
              }}>
                {link.label}
              </a>
            ))}
          </div>
          <a href="/start-your-project" className="ms-nav-cta" style={{
            background: '#1a1a2e',
            color: '#fff',
            padding: '0.6rem 1.4rem',
            borderRadius: '999px',
            textDecoration: 'none',
            fontSize: '0.78rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            whiteSpace: 'nowrap',
          }}>SEE YOUR SITE FREE</a>
          <button className="ms-burger" aria-label="Open menu" onClick={() => setMenuOpen(true)} style={{
            display: 'none',
            background: 'none',
            border: 'none',
            color: '#fff',
            cursor: 'pointer',
            fontSize: '1.4rem',
          }}>☰</button>
        </div>
        </nav>

        {menuOpen && (
          <div onClick={() => setMenuOpen(false)} style={{
            position: 'fixed', inset: 0, zIndex: 200,
            background: 'rgba(10,12,22,0.96)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: '1.25rem',
          }}>
            <button onClick={() => setMenuOpen(false)} aria-label="Close menu" style={{
              position: 'absolute', top: '1.25rem', right: '1.5rem',
              background: 'none', border: 'none', color: '#fff',
              fontSize: '2rem', cursor: 'pointer', lineHeight: 1,
            }}>&times;</button>
            {[{ label: 'WORK', href: '/work' }, { label: 'SERVICES', href: '/services' }, { label: 'PRICING', href: '#pricing' }, { label: 'REFER', href: '#refer' }, { label: 'ABOUT', href: '/about' }, { label: 'CONTACT', href: '/contact' }].map(link => (
              <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)} style={{
                fontSize: '1.1rem', fontWeight: 600, letterSpacing: '0.12em',
                textTransform: 'uppercase', color: '#fff', textDecoration: 'none',
                padding: '0.7rem 2rem', borderRadius: '999px',
                border: '1px solid rgba(255,255,255,0.25)',
              }}>{link.label}</a>
            ))}
            <a href="/start-your-project" style={{
              fontSize: '1.05rem', fontWeight: 700, color: '#1a1a2e', background: '#fff',
              padding: '0.75rem 2rem', borderRadius: '999px', textDecoration: 'none',
              letterSpacing: '0.06em', textTransform: 'uppercase',
            }}>See your site free</a>
          </div>
        )}

        {/* HERO CONTENT */}
        <div style={{
          maxWidth: '780px',
          margin: 'auto',
          padding: '5rem 2rem 0',
          textAlign: 'center',
          position: 'relative',
          zIndex: 2,
        }}>
          <p style={{
            fontSize: '1rem',
            fontWeight: 700,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#fff',
            marginBottom: '1rem',
          }}>WEB DESIGN · CAPE TOWN · SOUTH AFRICA</p>

          <h1 style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: 'clamp(2.4rem,5.6vw,4.2rem)',
            fontWeight: 400,
            color: '#20263a',
            lineHeight: 1.05,
            margin: '1rem 0 1.25rem',
          }}>
            See your new website <em style={{ fontStyle: 'italic' }}>before you</em> pay for it.
          </h1>

          <p style={{
            fontSize: '1.02rem',
            color: '#3d4358',
            maxWidth: '640px',
            margin: '0 auto 2rem',
          }}>
            Type your business name. We'll build you a real preview, free, in about a minute.
          </p>

          <form style={{
            display: 'flex',
            gap: '0.6rem',
            justifyContent: 'center',
            margin: '2rem 0 1.25rem',
            flexWrap: 'wrap',
          }} onSubmit={(e) => { e.preventDefault(); handleBusinessNameSubmit(name) }}>
            <input
              id="hero-name-input"
              type="text"
              placeholder="What's your business called?"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                padding: '0.95rem 1.6rem',
                borderRadius: '999px',
                border: 'none',
                width: '320px',
                fontSize: '1rem',
                outline: 'none',
                boxShadow: '0 8px 24px -12px rgba(0,0,0,0.35)',
              }}
            />
            <button type="submit" style={{
              padding: '0.95rem 1.6rem',
              borderRadius: '999px',
              border: 'none',
              background: '#fff',
              color: '#1a1a2e',
              fontSize: '1rem',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 8px 24px -12px rgba(0,0,0,0.35)',
            }}>SHOW ME →</button>
          </form>

          <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '1.05rem', fontWeight: 600, color: '#2e333a', margin: 0 }}>
            <span style={{ color: '#c9a445', fontSize: '0.8rem', letterSpacing: '0.1em' }}>★★★★★</span>
            4.9 on Google · 50+ sites built · Live in 14 days
          </p>
        </div>

        {/* FLOATING DEVICE CARDS */}
        <div className="ms-float" style={{
          position: 'absolute',
          top: '21%',
          left: '2rem',
          width: '280px',
          transform: 'rotate(-7deg)',
          zIndex: 1,
        }}>
          <div style={{ background: '#fff', borderRadius: '18px', padding: '10px', boxShadow: '0 30px 60px -25px rgba(26,26,46,0.45)' }}>
            <div style={{ borderRadius: '10px', overflow: 'hidden', background: '#fff', border: '1px solid #eceaf2' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 10px' }}>
                <span style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: '0.55rem', color: '#2e333a', whiteSpace: 'nowrap' }}>Alistair Drummond</span>
                <span style={{ display: 'flex', gap: '5px' }}>
                  {[18, 14, 16].map((w, i) => <span key={i} style={{ width: w, height: 3, borderRadius: 2, background: '#d8d3e2', display: 'inline-block' }} />)}
                </span>
              </div>
              <img src="/images/portfolio/alistair-drummond.jpg" alt="" style={{ width: '100%', height: '140px', objectFit: 'cover', display: 'block' }} />
              <div style={{ padding: '10px 12px 12px', textAlign: 'center' }}>
                <p style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: '0.62rem', color: '#2e333a', margin: '0 0 6px' }}>Bespoke residential architecture</p>
                <span style={{ display: 'block', height: 3, borderRadius: 2, background: '#eceaf2', margin: '0 auto 4px', width: '84%' }} />
                <span style={{ display: 'block', height: 3, borderRadius: 2, background: '#eceaf2', margin: '0 auto', width: '68%' }} />
              </div>
            </div>
          </div>
        </div>
        <div className="ms-float" style={{
          position: 'absolute',
          top: '36%',
          right: '2rem',
          width: '300px',
          transform: 'rotate(6deg)',
          zIndex: 1,
        }}>
          <div style={{ background: '#fff', borderRadius: '18px', padding: '10px', boxShadow: '0 30px 60px -25px rgba(26,26,46,0.45)' }}>
            <div style={{ borderRadius: '10px', overflow: 'hidden', background: '#fff', border: '1px solid #eceaf2' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 10px' }}>
                <span style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: '0.55rem', color: '#2e333a', whiteSpace: 'nowrap' }}>Coimbra Bakery</span>
                <span style={{ display: 'flex', gap: '5px' }}>
                  {[16, 20, 14].map((w, i) => <span key={i} style={{ width: w, height: 3, borderRadius: 2, background: '#d8d3e2', display: 'inline-block' }} />)}
                </span>
              </div>
              <p style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: '0.72rem', color: '#2e333a', margin: '6px 0', textAlign: 'center' }}>Artisan bakery in Cape Town</p>
              <img src="/images/portfolio/coimbra-bakery.jpg" alt="" style={{ width: '100%', height: '150px', objectFit: 'cover', display: 'block' }} />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '4px', padding: '4px' }}>
                <img src="/images/portfolio/coimbra-bakery.jpg" alt="" style={{ width: '100%', height: '44px', objectFit: 'cover', objectPosition: 'left center', display: 'block', borderRadius: '3px' }} />
                <img src="/images/portfolio/coimbra-bakery.jpg" alt="" style={{ width: '100%', height: '44px', objectFit: 'cover', objectPosition: 'center 80%', display: 'block', borderRadius: '3px' }} />
                <img src="/images/portfolio/coimbra-bakery.jpg" alt="" style={{ width: '100%', height: '44px', objectFit: 'cover', objectPosition: 'right center', display: 'block', borderRadius: '3px' }} />
              </div>
            </div>
          </div>
        </div>

        {/* STATS BAR */}
        <div className="ms-stats" style={{
          maxWidth: '1000px',
          margin: '6rem auto 0',
          display: 'grid',
          gridTemplateColumns: 'repeat(4,1fr)',
          gap: '2rem',
          textAlign: 'center',
          position: 'relative',
          zIndex: 2,
        }}>
          {[
            { num: '50+', label: 'WEBSITES BUILT' },
            { num: '5', label: 'YEARS IN BUSINESS' },
            { num: '4.9', label: 'GOOGLE RATING' },
            { num: '14', label: 'DAYS TO LAUNCH' },
          ].map((stat, i) => (
            <div key={i}>
              <div style={{
                fontFamily: 'var(--font-playfair), Georgia, serif',
                fontSize: 'clamp(2.4rem,4.5vw,3.4rem)',
                fontWeight: 400,
                color: '#20263a',
              }}>
                {stat.num}
              </div>
              <div style={{
                fontSize: '0.72rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.16em',
                color: '#4a5166',
                marginTop: '0.4rem',
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* MOUNTAIN RIDGE */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 1 }}>
          <svg viewBox="0 0 1440 280" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: 'auto' }}>
            <path d="M0,280 L0,200 Q120,168 240,184 Q360,200 480,170 Q600,140 720,156 Q840,172 960,146 Q1080,122 1200,150 Q1320,178 1440,164 L1440,280 Z" fill="rgba(26,26,46,0.18)" />
            <path d="M0,280 L0,226 Q150,196 300,216 Q450,236 600,202 Q750,168 900,192 Q1050,216 1200,196 Q1320,182 1440,206 L1440,280 Z" fill="rgba(26,26,46,0.30)" />
            <path d="M0,280 L0,250 Q180,226 360,240 Q540,254 720,230 Q900,206 1080,230 Q1260,254 1440,240 L1440,280 Z" fill="rgba(26,26,46,0.42)" />
          </svg>
        </div>
      </div>

      {/* REVIEWS SECTION */}
      <div id="reviews" style={{ background: '#f7f6fb', padding: '8rem 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p style={{
            fontSize: '1rem',
            fontWeight: 700,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#7d6470',
            marginBottom: '1rem',
          }}>REVIEWS</p>
          <h2 style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: 'clamp(1.9rem,3.2vw,2.9rem)',
            fontWeight: 400,
            color: '#2e333a',
            margin: '0 0 1rem',
          }}>What our clients are saying.</h2>
        </div>

        {/* TODO: replace with real Google reviews — placeholder copy */}
        <div className="ms-cards-4" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4,1fr)',
          gap: '2rem',
          maxWidth: '1240px',
          margin: 'auto',
        }}>
          {/* Google Reviews Summary Card */}
          <div style={{
            background: '#fff',
            borderRadius: '14px',
            padding: '2.5rem',
            minHeight: '280px',
            boxShadow: '0 18px 40px -22px rgba(26,26,46,0.35)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}>
            {/* Google wordmark */}
            <div style={{ fontSize: '1.6rem', fontWeight: 600, marginBottom: '0.5rem', fontFamily: 'sans-serif' }}>
              <span style={{ color: '#4285F4' }}>G</span>
              <span style={{ color: '#EA4335' }}>o</span>
              <span style={{ color: '#FBBC05' }}>o</span>
              <span style={{ color: '#4285F4' }}>g</span>
              <span style={{ color: '#34A853' }}>l</span>
              <span style={{ color: '#EA4335' }}>e</span>
            </div>
            {/* Mountain Studios */}
            <div style={{ fontWeight: 700, fontSize: '1.35rem', color: '#1a1a2e', marginBottom: '1rem' }}>Mountain Studios</div>
            {/* Rating and stars */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', justifyContent: 'center', marginBottom: '1rem' }}>
              <div style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: '2.5rem', color: '#2e333a' }}>4.9</div>
              <StarRating count={5} />
            </div>
            {/* All reviews button */}
            <button style={{
              background: '#000',
              color: '#fff',
              border: 'none',
              borderRadius: '999px',
              padding: '0.8rem 2rem',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: '0.95rem',
              marginTop: 'auto',
              width: 'fit-content',
            }}>
              All reviews
            </button>
          </div>

          {/* Customer Review Cards */}
          {reviews.map((review, i) => {
            const avatarColors = ['#8a6f63', '#5b7a8c', '#7a8a5b'];
            const initials = review.name?.charAt(0).toUpperCase() || '?';
            return (
              <div key={i} style={{
                background: '#fff',
                borderRadius: '14px',
                padding: '2.5rem',
                minHeight: '280px',
                boxShadow: '0 18px 40px -22px rgba(26,26,46,0.35)',
                display: 'flex',
                flexDirection: 'column',
              }}>
                {/* Header: avatar + name + time */}
                <div style={{ display: 'flex', gap: '0.8rem', marginBottom: '1rem' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    background: avatarColors[i],
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    color: '#fff',
                    fontWeight: 600,
                    fontSize: '1.1rem',
                  }}>
                    {initials}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, color: '#1a1a2e', fontSize: '0.95rem', margin: '0 0 0.2rem' }}>
                      {review.name}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#6b7280', margin: 0 }}>
                      {review.timeAgo}
                    </div>
                  </div>
                </div>
                {/* Stars */}
                <div style={{ marginBottom: '0.8rem' }}>
                  <StarRating count={5} />
                </div>
                {/* Review text */}
                <p style={{
                  fontSize: '0.95rem',
                  color: '#2e333a',
                  lineHeight: 1.6,
                  margin: '0 0 1rem',
                  flex: 1,
                }}>
                  {review.text}
                </p>
                {/* Footer: Google logo + View on Google */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem', color: '#6b7280' }}>
                  <svg width="18" height="18" viewBox="0 0 48 48" style={{ flexShrink: 0 }}>
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                  </svg>
                  <span>View on Google</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* PACKAGES SECTION */}
      <div id="pricing" style={{ background: '#f4f2fa', padding: '8rem 2rem 5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p style={{
            fontSize: '0.7rem',
            fontWeight: 700,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#7d6470',
            marginBottom: '1rem',
          }}>PACKAGES</p>
          <h2 style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: 'clamp(1.9rem,3.2vw,2.9rem)',
            fontWeight: 400,
            color: '#2e333a',
            margin: 0,
          }}>Three ways to do this.</h2>
        </div>

        <div className="ms-cards-3" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3,1fr)',
          gap: '2.25rem',
          maxWidth: '1080px',
          margin: 'auto',
          alignItems: 'stretch',
        }}>
          {[
            { name: 'ESSENTIALS', tagline: 'One page. Everything a customer needs to call you.', bullets: ['Mobile-ready', 'Google Maps', 'Contact form', 'Hosting'] },
            { name: 'STUDIO', tagline: 'Up to 6 pages, built around how you actually sell.', bullets: ['Everything in Essentials', 'Copywriting', 'Google Business', '6 pages'] },
            { name: 'COMPLETE', tagline: 'Everything in Studio, plus booking, payments and automation.', bullets: ['Everything in Studio', 'Bookings', 'Payments', 'Automations', 'Priority support'] },
          ].map((pkg, i) => (
            <div key={i} style={{
              background: '#fff',
              borderRadius: '14px',
              padding: '2.75rem 2.5rem',
              boxShadow: '0 18px 40px -22px rgba(26,26,46,0.35)',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              transform: i === 1 ? 'translateY(-1.25rem)' : 'none',
            }}>
              {i === 1 && (
                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: '#e3d6dd',
                  color: '#7d3d4f',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  padding: '0.35rem 0.9rem',
                  borderRadius: '999px',
                  textTransform: 'uppercase',
                }}>
                  MOST CHOSEN
                </div>
              )}
              <p style={{
                fontSize: '0.7rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.22em',
                color: '#2e333a',
                margin: '0 0 0.5rem',
              }}>
                {pkg.name}
              </p>
              <p style={{
                fontSize: '0.92rem',
                color: '#5d6478',
                marginBottom: '1.25rem',
              }}>
                {pkg.tagline}
              </p>
              <ul style={{
                listStyle: 'none',
                margin: '0 0 1.5rem 0',
                padding: 0,
              }}>
                {pkg.bullets.map((bullet, j) => (
                  <li key={j} style={{
                    fontSize: '0.92rem',
                    color: '#5d6478',
                    lineHeight: 2,
                  }}>
                    • {bullet}
                  </li>
                ))}
              </ul>
              <button onClick={() => handleBusinessNameSubmit('')} style={{
                marginTop: 'auto',
                background: '#7d3d4f',
                color: '#fff',
                border: 'none',
                padding: '0.85rem',
                borderRadius: '999px',
                fontSize: '0.78rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                cursor: 'pointer',
                width: '100%',
                textAlign: 'center',
              }}>
                GET A PRICE
              </button>
            </div>
          ))}
        </div>

        <p style={{
          fontSize: '0.85rem',
          color: '#5d6478',
          textAlign: 'center',
          marginTop: '2.5rem',
          maxWidth: '700px',
          margin: '2.5rem auto 0',
        }}>
          Every package includes hosting, an SSL certificate and a domain. You own the site. Cancel the retainer and it stays yours.
        </p>
      </div>

      {/* WORK SECTION */}
      <div id="work" style={{ background: '#f4f2fa', padding: '3rem 2rem 8rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: '2.6rem',
            fontWeight: 400,
            color: '#2e333a',
            textAlign: 'center',
            margin: '0 0 2rem',
          }}>SEE THE BRANDS WE'VE BUILT</h2>
          <div style={{
            textAlign: 'center',
            marginBottom: '2.5rem',
          }}>
            <a href="#work" style={{
              fontSize: '0.9rem',
              color: '#7d3d4f',
              textDecoration: 'none',
            }}>See all work →</a>
          </div>

          <div className="ms-cards-3" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3,1fr)',
            gap: '1.75rem',
            maxWidth: '1100px',
            margin: 'auto',
          }}>
            {portfolioItems.map((item) => (
              <a key={item.name} href={item.url} target="_blank" rel="noopener noreferrer" style={{
                textDecoration: 'none',
                display: 'block',
                transition: 'transform 0.3s ease',
              }}
                onMouseEnter={(e) => (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-4px)'}
                onMouseLeave={(e) => (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)'}
              >
                <div style={{
                  background: '#fff',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  boxShadow: '0 18px 40px -22px rgba(26,26,46,0.35)',
                }}>
                  <div style={{ background: '#f2f0f6', padding: '10px 10px 0' }}>
                    <div style={{ background: '#fff', borderRadius: '8px 8px 0 0', overflow: 'hidden', border: '1px solid #eceaf2', borderBottom: 'none' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 9px' }}>
                        <span style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: '0.52rem', color: '#2e333a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</span>
                        <span style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
                          {[14, 18, 12].map((w, j) => <span key={j} style={{ width: w, height: 3, borderRadius: 2, background: '#d8d3e2', display: 'inline-block' }} />)}
                        </span>
                      </div>
                      <img src={item.img} alt={item.name} style={{ width: '100%', height: '150px', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '3px', padding: '4px 4px 0' }}>
                        <img src={item.img} alt="" style={{ width: '100%', height: '38px', objectFit: 'cover', objectPosition: 'left bottom', display: 'block', borderRadius: '2px' }} />
                        <img src={item.img} alt="" style={{ width: '100%', height: '38px', objectFit: 'cover', objectPosition: 'center 70%', display: 'block', borderRadius: '2px' }} />
                        <img src={item.img} alt="" style={{ width: '100%', height: '38px', objectFit: 'cover', objectPosition: 'right bottom', display: 'block', borderRadius: '2px' }} />
                      </div>
                    </div>
                  </div>
                  <div style={{ padding: '1.4rem 1.5rem' }}>
                    <p style={{
                      fontFamily: 'var(--font-playfair), Georgia, serif',
                      fontSize: '1.15rem',
                      color: '#2e333a',
                      margin: 0,
                      fontWeight: 400,
                    }}>
                      {item.name}
                    </p>
                    <p style={{
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.14em',
                      color: '#7d6470',
                      marginTop: '0.35rem',
                      margin: '0.35rem 0 0',
                    }}>
                      {item.type}
                    </p>
                    <p style={{
                      fontSize: '0.9rem',
                      color: '#5d6478',
                      lineHeight: 1.55,
                      marginTop: '0.6rem',
                      margin: '0.6rem 0 0',
                    }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* FREE AUDIT SECTION */}
      <div style={{ background: '#efedf7', padding: '7rem 2rem' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{
            fontSize: '0.7rem',
            fontWeight: 700,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#7d6470',
            marginBottom: '1rem',
          }}>FREE AUDIT</p>
          <h2 style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: 'clamp(1.7rem,3vw,2.4rem)',
            color: '#2e333a',
            margin: '0 0 0.75rem',
            fontWeight: 400,
          }}>Get a free website audit now.</h2>
          <p style={{
            fontSize: '1rem',
            color: '#5d6478',
            marginTop: '0.75rem',
          }}>Paste your website. We'll send you a full audit in minutes — free.</p>

          {auditDone ? (
            <p style={{
              fontSize: '0.9rem',
              color: '#5d6478',
              marginTop: '2rem',
            }}>Got it. Your audit is on the way.</p>
          ) : (
            <form onSubmit={handleAuditSubmit} style={{
              display: 'flex',
              background: '#fff',
              borderRadius: '999px',
              padding: '0.4rem 0.4rem 0.4rem 1.6rem',
              marginTop: '2rem',
              alignItems: 'center',
              boxShadow: '0 8px 24px -12px rgba(0,0,0,0.35)',
            }}>
              <input
                type="text"
                placeholder="yourbusiness.co.za"
                value={auditUrl}
                onChange={(e) => setAuditUrl(e.target.value)}
                style={{
                  border: 'none',
                  outline: 'none',
                  flex: 1,
                  fontSize: '1rem',
                  background: 'transparent',
                }}
              />
              <button type="submit" style={{
                background: '#7d3d4f',
                color: '#fff',
                border: 'none',
                padding: '0.85rem 1.4rem',
                borderRadius: '999px',
                fontSize: '0.78rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                cursor: 'pointer',
              }}>
                AUDIT MY SITE →
              </button>
            </form>
          )}
        </div>
      </div>

      {/* REFER SECTION */}
      <div id="refer" style={{
        background: 'linear-gradient(180deg,#6f86a6 0%,#8f9ab6 30%,#ad9fbf 55%,#d0b5c6 78%,#e9cad0 100%)',
        position: 'relative',
        overflow: 'hidden',
        padding: '3rem 2rem 0',
      }}>
        <div style={{
          maxWidth: '880px',
          margin: 'auto',
          textAlign: 'center',
          position: 'relative',
          zIndex: 2,
        }}>
          <h2 style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: 'clamp(1.7rem,3vw,2.4rem)',
            color: '#20263a',
            fontWeight: 400,
            margin: '0 0 1rem',
            lineHeight: 1.2,
          }}>
            Know a business that needs a website?<br />We'll pay you <em style={{ fontStyle: 'italic' }}>R1000</em>.
          </h2>

          <div className="ms-cards-3" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3,1fr)',
            gap: '2rem',
            marginTop: '2.5rem',
            textAlign: 'center',
          }}>
            {['Give us your details, we send you your link.', 'Forward it to anyone who needs a site.', 'They sign and pay a deposit — you get R1000.'].map((text, i) => (
              <div key={i}>
                <div style={{
                  fontFamily: 'var(--font-playfair), Georgia, serif',
                  fontSize: '1.9rem',
                  color: '#7d3d4f',
                  opacity: 0.75,
                  margin: '0 0 0.5rem',
                  fontWeight: 700,
                }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <p style={{
                  fontSize: '0.88rem',
                  color: '#3d4358',
                  lineHeight: 1.5,
                  margin: 0,
                  fontWeight: 600,
                }}>
                  {text}
                </p>
              </div>
            ))}
          </div>

          {referDone ? (
            <p style={{
              fontSize: '0.9rem',
              color: '#3d4358',
              marginTop: '2.5rem',
            }}>Got it. We'll send your link shortly.</p>
          ) : (
            <form onSubmit={handleReferSubmit} style={{
              display: 'flex',
              gap: '0.6rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginTop: '2.5rem',
            }}>
              <input
                type="text"
                placeholder="Your name"
                value={referName}
                onChange={(e) => setReferName(e.target.value)}
                style={{
                  width: '190px',
                  padding: '0.85rem 1.4rem',
                  borderRadius: '999px',
                  border: 'none',
                  fontSize: '1rem',
                  outline: 'none',
                }}
              />
              <input
                type="email"
                placeholder="Your email"
                value={referEmail}
                onChange={(e) => setReferEmail(e.target.value)}
                style={{
                  width: '190px',
                  padding: '0.85rem 1.4rem',
                  borderRadius: '999px',
                  border: 'none',
                  fontSize: '1rem',
                  outline: 'none',
                }}
              />
              <input
                type="tel"
                placeholder="Your mobile"
                value={referPhone}
                onChange={(e) => setReferPhone(e.target.value)}
                style={{
                  width: '190px',
                  padding: '0.85rem 1.4rem',
                  borderRadius: '999px',
                  border: 'none',
                  fontSize: '1rem',
                  outline: 'none',
                }}
              />
              <button type="submit" style={{
                background: '#fff',
                color: '#1a1a2e',
                border: 'none',
                padding: '0.85rem 1.4rem',
                borderRadius: '999px',
                fontSize: '1rem',
                fontWeight: 700,
                cursor: 'pointer',
              }}>
                GET MY LINK →
              </button>
            </form>
          )}

          <p style={{
            fontSize: '0.78rem',
            color: '#4a5166',
            marginTop: '1rem',
          }}>
            No limit on how many you refer. Full terms →
          </p>
        </div>

        {/* MOUNTAIN RIDGE */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 1 }}>
          <svg viewBox="0 0 1440 280" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: 'auto' }}>
            <path d="M0,280 L0,200 Q120,168 240,184 Q360,200 480,170 Q600,140 720,156 Q840,172 960,146 Q1080,122 1200,150 Q1320,178 1440,164 L1440,280 Z" fill="rgba(26,26,46,0.18)" />
            <path d="M0,280 L0,226 Q150,196 300,216 Q450,236 600,202 Q750,168 900,192 Q1050,216 1200,196 Q1320,182 1440,206 L1440,280 Z" fill="rgba(26,26,46,0.30)" />
            <path d="M0,280 L0,250 Q180,226 360,240 Q540,254 720,230 Q900,206 1080,230 Q1260,254 1440,240 L1440,280 Z" fill="rgba(26,26,46,0.42)" />
          </svg>
        </div>
      </div>

      {/* FAQ SECTION */}
      <div style={{ background: '#efedf7', padding: '7rem 2rem' }}>
        <div style={{ maxWidth: '760px', margin: 'auto' }}>
          <h2 style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: '3rem',
            fontWeight: 400,
            color: '#2e333a',
            textAlign: 'center',
            margin: '0 0 3rem',
          }}>FAQ</h2>

          <div>
            {faqItems.map((item, i) => (
              <div key={i} style={{
                marginBottom: '2px',
                background: openFaq === i ? '#f0e6ec' : '#fff',
                borderRadius: openFaq === i ? '8px' : '0',
              }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '1.15rem 1.4rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    color: '#2e333a',
                  }}
                >
                  {item.q}
                  <span>{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && (
                  <div style={{
                    background: 'transparent',
                    padding: '0 1.4rem 1.25rem',
                    fontSize: '0.9rem',
                    color: '#5d6478',
                    lineHeight: 1.6,
                  }}>
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FINAL CTA SECTION */}
      <div style={{ background: '#f4f2fa', padding: '7rem 2rem' }}>
        <div style={{ maxWidth: '760px', margin: 'auto', textAlign: 'center' }}>
          <p style={{ fontSize: '0.9rem', color: '#5d6478', marginBottom: '0.5rem' }}>Still just looking?</p>
          <h2 style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: 'clamp(1.7rem,3vw,2.4rem)',
            color: '#2e333a',
            fontWeight: 400,
            margin: '0 0 2rem',
          }}>
            See what yours could look like. <em style={{ fontStyle: 'italic' }}>It's free.</em>
          </h2>
          <form style={{
            display: 'flex',
            gap: '0.6rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }} onSubmit={(e) => { e.preventDefault(); handleBusinessNameSubmit(nameFinal) }}>
            <input
              type="text"
              placeholder="What's your business called?"
              value={nameFinal}
              onChange={(e) => setNameFinal(e.target.value)}
              style={{
                padding: '0.95rem 1.6rem',
                borderRadius: '999px',
                border: 'none',
                width: '320px',
                fontSize: '1rem',
                outline: 'none',
                boxShadow: '0 8px 24px -12px rgba(0,0,0,0.35)',
              }}
            />
            <button type="submit" style={{
              padding: '0.95rem 1.6rem',
              borderRadius: '999px',
              border: 'none',
              background: '#7d3d4f',
              color: '#fff',
              fontSize: '1rem',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 8px 24px -12px rgba(0,0,0,0.35)',
            }}>SHOW ME →</button>
          </form>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ background: '#171b2b', color: 'rgba(255,255,255,0.55)', padding: '4rem 2rem 2rem' }}>
        <div className="ms-footer" style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: '3rem',
          maxWidth: '1100px',
          margin: '0 auto 3rem',
        }}>
          <div>
            <div style={{ marginBottom: '1rem' }}>
              <span style={{ fontSize: '1.2rem' }}>▲</span>
              <span style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: '1.1rem', color: '#fff', marginLeft: '0.5rem', fontWeight: 400 }}>mountain studios</span>
            </div>
            <p style={{ fontSize: '0.85rem', margin: '0 0 0.5rem' }}>Websites for South African businesses.</p>
            <p style={{ fontSize: '0.85rem', margin: 0 }}>Cape Town, South Africa</p>
          </div>

          <div>
            <p style={{
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.4)',
              marginBottom: '1rem',
              margin: '0 0 1rem',
            }}>GET IN TOUCH</p>
            <a href={WHATSAPP_URL} style={{ display: 'block', fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', textDecoration: 'none', marginBottom: '0.5rem' }}>WhatsApp us</a>
            <a href="mailto:hello@mountainstudios.co.za" style={{ display: 'block', fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', textDecoration: 'none', marginBottom: '0.5rem' }}>hello@mountainstudios.co.za</a>
            <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', margin: 0 }}>Mon–Fri 8:00–17:00</p>
          </div>

          <div>
            <p style={{
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.4)',
              marginBottom: '1rem',
              margin: '0 0 1rem',
            }}>PAGES</p>
            <a href="#work" style={{ display: 'block', fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', textDecoration: 'none', marginBottom: '0.5rem' }}>Work</a>
            <a href="#pricing" style={{ display: 'block', fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', textDecoration: 'none', marginBottom: '0.5rem' }}>Pricing</a>
            <a href="#refer" style={{ display: 'block', fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', textDecoration: 'none', marginBottom: '0.5rem' }}>Refer</a>
            <a href="#reviews" style={{ display: 'block', fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', textDecoration: 'none', marginBottom: '0.5rem' }}>About</a>
            <a href="/careers/sales-rep" style={{ display: 'block', fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', textDecoration: 'none', marginBottom: '0.5rem' }}>Careers</a>
          </div>

          <div>
            <p style={{
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.4)',
              marginBottom: '1rem',
              margin: '0 0 1rem',
            }}>FOLLOW</p>
            <a href="#" style={{ display: 'block', fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', textDecoration: 'none', marginBottom: '0.5rem' }}>Instagram {/* TODO: real social URLs */}</a>
            <a href="#" style={{ display: 'block', fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', textDecoration: 'none', marginBottom: '0.5rem' }}>Facebook</a>
            <a href="#" style={{ display: 'block', fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', textDecoration: 'none', marginBottom: '0.5rem' }}>LinkedIn</a>
            <a href="#" style={{ display: 'block', fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', textDecoration: 'none', marginBottom: '0.5rem' }}>Google</a>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          paddingTop: '1.5rem',
          textAlign: 'center',
          fontSize: '0.75rem',
        }}>
          © {new Date().getFullYear()} Mountain Studios · Privacy · Terms
        </div>
      </div>

      {/* FLOATING CTA — A/B test: 'site' pill vs 'chat' bubble */}
      {variant === 'site' && (
        <button
          onClick={() => {
            try { (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag?.('event', 'float_cta_click', { variant: 'site' }) } catch { }
            const input = document.getElementById('hero-name-input')
            if (input) { input.scrollIntoView({ behavior: 'smooth', block: 'center' }); (input as HTMLInputElement).focus({ preventScroll: true }) }
          }}
          style={{
            position: 'fixed',
            bottom: '1.5rem',
            right: '1.5rem',
            zIndex: 100,
            background: '#7d3d4f',
            color: '#fff',
            padding: '0.95rem 1.7rem',
            borderRadius: '999px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '0.82rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            boxShadow: '0 12px 30px -10px rgba(0,0,0,0.5)',
          }}
        >SEE YOUR NEW SITE →</button>
      )}
      {variant === 'chat' && (
        // Opens the on-site chatbot (components/site/ChatWidget). This used to
        // be a wa.me link on WHATSAPP_NUMBER, which is still the placeholder
        // 27000000000 — half of the homepage's visitors were being sent to a
        // number that does not exist. The widget hides its own launcher while
        // this pill is on screen, so there is only ever one.
        <button
          onClick={() => {
            try { (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag?.('event', 'float_cta_click', { variant: 'chat' }) } catch { }
            window.dispatchEvent(new Event('ms-chat:open'))
          }}
          style={{
            position: 'fixed',
            bottom: '1.5rem',
            right: '1.5rem',
            zIndex: 100,
            background: '#7d3d4f',
            color: '#fff',
            padding: '0.85rem 1.5rem',
            borderRadius: '999px',
            border: 'none',
            cursor: 'pointer',
            display: 'inline-flex',
            gap: '0.5rem',
            alignItems: 'center',
            fontFamily: 'inherit',
            fontSize: '0.85rem',
            fontWeight: 600,
            boxShadow: '0 12px 30px -10px rgba(0,0,0,0.5)',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4 3h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9.4L4 21.6V5a2 2 0 0 1 0-2zm0 2v12.4L8.6 15H20V5H4z" />
            <circle cx="8.5" cy="10" r="1.1" /><circle cx="12" cy="10" r="1.1" /><circle cx="15.5" cy="10" r="1.1" />
          </svg>
          Chat with us
        </button>
      )}

      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @media (max-width: 1100px) { .ms-cards-4 { grid-template-columns: repeat(2,1fr) !important } }
        @media (max-width: 900px) {
          .ms-float { display:none !important }
          .ms-cards-3, .ms-cards-4 { grid-template-columns: 1fr !important }
          .ms-stats { grid-template-columns: repeat(2,1fr) !important }
          .ms-footer { grid-template-columns: 1fr 1fr !important }
        }
        @media (max-width: 768px) {
          .ms-nav-links, .ms-nav-cta { display:none !important }
          .ms-burger { display:flex !important }
          .ms-footer { grid-template-columns: 1fr !important }
        }
        @media (max-width: 600px) {
          .ms-hours { display:none !important }
        }
        @media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important } }
        :focus-visible { outline: 2px solid #7d3d4f; outline-offset: 2px }
      `}</style>
    </div>
  )
}
