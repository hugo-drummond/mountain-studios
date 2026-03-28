'use client'

import SiteNav from '../../components/site/SiteNav'

const bodyFont = 'var(--font-source-sans), "Plus Jakarta Sans", "Source Sans 3", sans-serif'
const serifFont = '"Noto Serif", Georgia, "Times New Roman", serif'

const steps = [
  {
    num: '01',
    title: 'Start a Project',
    desc: "The journey begins with your spark. Reach out through our contact portal to share your vision, goals, and the mountain you want to climb next.",
    img: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
    style: 'photo' as const,
  },
  {
    num: '02',
    title: 'First Meeting',
    desc: "We sit down (virtually or physically) to align our frequencies. We'll dive deep into your brand's DNA and define what success looks like for your studio.",
    img: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=800',
    badge: 'Discovery Phase',
    style: 'glass' as const,
  },
  {
    num: '03',
    title: 'The Builder Exercise',
    desc: "Our signature collaborative workshop where we prototype the core foundations. It's a hands-on exploration of structure, flow, and digital architecture.",
    img: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
    bullets: ['UX Logic Mapping', 'Core Feature Prioritization'],
    style: 'bg' as const,
  },
  {
    num: '04',
    title: 'Second Meeting',
    desc: "Refinement and review. We present the evolved designs based on the Builder Exercise, ensuring every detail aligns with your studio's elevated standards.",
    style: 'icon' as const,
  },
  {
    num: '05',
    title: 'Your Website',
    desc: "The summit. We launch your bespoke digital experience, fully optimized and ready to represent Mountain Studios to the world.",
    style: 'cta' as const,
  },
]

export default function About() {
  return (
    <div style={{ minHeight: '100vh', fontFamily: bodyFont }}>
      <link href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      <SiteNav />

      <main style={{
        background: 'linear-gradient(135deg, #d6e3ff 0%, #f9f9fe 50%, #f6d0dd 100%)',
        minHeight: '100vh',
        paddingTop: '8rem',
        paddingBottom: '6rem',
        overflow: 'hidden',
      }}>
        {/* Hero */}
        <header style={{ maxWidth: '56rem', margin: '0 auto', textAlign: 'center', padding: '0 2rem', marginBottom: '6rem' }}>
          <h1 style={{
            fontFamily: serifFont, fontSize: 'clamp(3rem, 7vw, 4.5rem)', fontWeight: 700,
            color: '#2e333a', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '1.5rem',
          }}>How It Works</h1>
          <p style={{
            fontFamily: bodyFont, fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: '#5b5f68',
            maxWidth: '40rem', margin: '0 auto', lineHeight: 1.7, opacity: 0.8,
          }}>
            A streamlined journey from initial vision to a living, breathing digital masterpiece. We've refined our process to be as collaborative as it is creative.
          </p>
        </header>

        {/* Process Steps */}
        <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 2rem', position: 'relative' }}>
          {steps.map((step, i) => {
            const isReversed = i % 2 === 1
            const isLast = step.style === 'cta'

            if (isLast) {
              return (
                <section key={step.num} style={{
                  position: 'relative', maxWidth: '64rem', margin: '8rem auto 0',
                  padding: '6rem 2rem', textAlign: 'center',
                }}>
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <span style={{ fontFamily: serifFont, fontStyle: 'italic', color: '#745762', fontSize: '4rem', opacity: 0.2, display: 'block' }}>{step.num}</span>
                    <h2 style={{ fontFamily: serifFont, fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 700, color: '#2e333a', marginBottom: '1.5rem' }}>{step.title}</h2>
                    <p style={{ color: '#5b5f68', lineHeight: 1.7, fontSize: '1.2rem', maxWidth: '36rem', margin: '0 auto 2.5rem' }}>{step.desc}</p>
                    <a href="/start-your-project" style={{
                      display: 'inline-block', fontFamily: bodyFont, fontSize: '1rem', fontWeight: 600,
                      color: '#f9f9f9', background: '#5e5f60', padding: '1rem 2.5rem',
                      borderRadius: '999px', textDecoration: 'none',
                      boxShadow: '0 8px 30px rgba(94,95,96,0.2)',
                    }}>Launch Your Journey</a>
                  </div>
                  <div style={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    width: '100%', height: '100%', background: 'rgba(214,227,255,0.2)',
                    filter: 'blur(100px)', borderRadius: '50%', zIndex: 0,
                  }} />
                </section>
              )
            }

            return (
              <section key={step.num} style={{
                display: 'flex', flexDirection: isReversed ? 'row-reverse' : 'row',
                alignItems: 'center', gap: 'clamp(3rem, 5vw, 6rem)',
                marginBottom: '8rem', position: 'relative',
                ...(step.style === 'bg' ? { padding: '3rem 2rem', position: 'relative' as const } : {}),
              }}>
                {step.style === 'bg' && (
                  <div style={{
                    position: 'absolute', inset: 0, background: '#f2f3fa',
                    borderRadius: '1rem', transform: 'rotate(-1deg) scale(1.05)', zIndex: -1,
                  }} />
                )}

                {/* Text */}
                <div style={{ flex: 1 }}>
                  <span style={{ fontFamily: serifFont, fontStyle: 'italic', color: '#745762', fontSize: '4rem', opacity: 0.2, display: 'block' }}>{step.num}</span>
                  <h2 style={{ fontFamily: serifFont, fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 600, color: '#2e333a', marginBottom: '1rem' }}>{step.title}</h2>
                  <p style={{ color: '#5b5f68', lineHeight: 1.7, fontSize: '1.1rem', marginBottom: '1.5rem' }}>{step.desc}</p>
                  {step.badge && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#535f77', paddingTop: '0.5rem' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: '1.2rem' }}>calendar_today</span>
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase' as const }}>{step.badge}</span>
                    </div>
                  )}
                  {step.bullets && (
                    <ul style={{ listStyle: 'none', padding: 0, margin: '1rem 0 0', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {step.bullets.map(b => (
                        <li key={b} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#5b5f68' }}>
                          <span className="material-symbols-outlined" style={{ color: '#5e5f60', fontVariationSettings: "'FILL' 1", fontSize: '1.2rem' }}>check_circle</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Image */}
                <div style={{ flex: 1, width: '100%', maxWidth: '36rem' }}>
                  {step.style === 'photo' && step.img && (
                    <div style={{
                      aspectRatio: '4/3', borderRadius: '1rem', overflow: 'hidden',
                      boxShadow: '0 25px 50px rgba(0,0,0,0.15)', transform: 'rotate(1deg)',
                    }}>
                      <img src={step.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  )}
                  {step.style === 'glass' && step.img && (
                    <div style={{
                      background: 'rgba(255,255,255,0.4)', backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)', padding: '1rem', borderRadius: '1rem',
                      boxShadow: '0 15px 40px rgba(0,0,0,0.1)', transform: 'rotate(-2deg)',
                      border: '1px solid rgba(255,255,255,0.2)',
                    }}>
                      <img src={step.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '0.5rem' }} />
                    </div>
                  )}
                  {step.style === 'bg' && step.img && (
                    <img src={step.img} alt="" style={{
                      width: '100%', height: '24rem', objectFit: 'cover', borderRadius: '1rem',
                      boxShadow: '0 15px 40px rgba(83,95,119,0.1)',
                    }} />
                  )}
                  {step.style === 'icon' && (
                    <div style={{
                      background: '#dfe2ec', aspectRatio: '16/9', borderRadius: '1rem',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      position: 'relative', overflow: 'hidden',
                    }}>
                      <div style={{
                        position: 'absolute', inset: 0,
                        background: 'linear-gradient(135deg, rgba(83,95,119,0.1) 0%, transparent 100%)',
                      }} />
                      <span className="material-symbols-outlined" style={{ fontSize: '4rem', color: '#aeb2bb' }}>video_chat</span>
                      <div style={{
                        position: 'absolute', bottom: '1rem', right: '1rem',
                        fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.15em',
                        textTransform: 'uppercase' as const, color: 'rgba(94,95,104,0.4)',
                      }}>Design Presentation</div>
                    </div>
                  )}
                </div>
              </section>
            )
          })}
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        width: '100%', borderTop: '1px solid rgba(0,0,0,0.06)',
        padding: '3rem 2rem', background: '#fafafa',
      }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          maxWidth: '80rem', margin: '0 auto', flexWrap: 'wrap', gap: '1rem',
        }}>
          <span style={{ fontFamily: serifFont, fontSize: '1.1rem', color: '#374151' }}>Mountain Studios</span>
          <p style={{ fontSize: '0.85rem', color: '#9ca3af' }}>© {new Date().getFullYear()} Mountain Studios. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="#" style={{ color: '#9ca3af', fontSize: '0.85rem', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="#" style={{ color: '#9ca3af', fontSize: '0.85rem', textDecoration: 'none' }}>Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
