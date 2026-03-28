'use client'

import SiteNav from '../../components/site/SiteNav'

const font = 'var(--font-source-sans), "Source Sans 3", sans-serif'
const serif = 'Georgia, "Times New Roman", serif'

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
    <div style={{
      minHeight: '100vh', fontFamily: font,
      background: 'linear-gradient(180deg, #7b8fad 0%, #9aa4bc 35%, #b5a8c4 60%, #d4b8c8 80%, #e8c8cf 100%)',
    }}>
      <SiteNav />

      <main style={{ paddingTop: '4rem', paddingBottom: '6rem', overflow: 'hidden' }}>
        {/* Hero */}
        <header style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center', padding: '0 2rem', marginBottom: '5rem' }}>
          <h1 style={{
            fontFamily: serif, fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 300,
            color: '#fff', lineHeight: 1.15, marginBottom: '1rem',
          }}>How It Works</h1>
          <p style={{
            fontSize: '0.95rem', color: 'rgba(255,255,255,0.75)',
            maxWidth: '500px', margin: '0 auto', lineHeight: 1.7,
          }}>
            A streamlined journey from initial vision to a living, breathing digital masterpiece. We've refined our process to be as collaborative as it is creative.
          </p>
        </header>

        {/* Process Steps */}
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2rem', position: 'relative' }}>
          {steps.map((step, i) => {
            const isReversed = i % 2 === 1
            const isLast = step.style === 'cta'

            if (isLast) {
              return (
                <section key={step.num} style={{
                  position: 'relative', maxWidth: '700px', margin: '6rem auto 0',
                  padding: '4rem 2rem', textAlign: 'center',
                }}>
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <span style={{ fontFamily: serif, fontStyle: 'italic', color: 'rgba(255,255,255,0.2)', fontSize: '3.5rem', display: 'block' }}>{step.num}</span>
                    <h2 style={{ fontFamily: serif, fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 300, color: '#fff', marginBottom: '1rem' }}>{step.title}</h2>
                    <p style={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, fontSize: '0.95rem', maxWidth: '500px', margin: '0 auto 2rem' }}>{step.desc}</p>
                    <a href="/start-your-project" style={{
                      display: 'inline-block', fontFamily: font, fontSize: '0.85rem', fontWeight: 600,
                      color: '#1a1a2e', background: '#fff', padding: '0.65rem 1.5rem',
                      borderRadius: '999px', textDecoration: 'none',
                    }}>Launch Your Journey</a>
                  </div>
                  <div style={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    width: '120%', height: '120%', background: 'rgba(255,255,255,0.06)',
                    filter: 'blur(80px)', borderRadius: '50%', zIndex: 0,
                  }} />
                </section>
              )
            }

            return (
              <section key={step.num} style={{
                display: 'flex', flexDirection: isReversed ? 'row-reverse' : 'row',
                alignItems: 'center', gap: 'clamp(2rem, 4vw, 5rem)',
                marginBottom: '6rem', position: 'relative',
                ...(step.style === 'bg' ? { padding: '2.5rem 2rem' } : {}),
              }}>
                {step.style === 'bg' && (
                  <div style={{
                    position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.06)',
                    borderRadius: '1rem', transform: 'rotate(-1deg) scale(1.05)', zIndex: -1,
                    backdropFilter: 'blur(4px)',
                  }} />
                )}

                {/* Text */}
                <div style={{ flex: 1 }}>
                  <span style={{ fontFamily: serif, fontStyle: 'italic', color: 'rgba(255,255,255,0.2)', fontSize: '3.5rem', display: 'block' }}>{step.num}</span>
                  <h2 style={{ fontFamily: serif, fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)', fontWeight: 300, color: '#fff', marginBottom: '0.75rem' }}>{step.title}</h2>
                  <p style={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, fontSize: '0.9rem', marginBottom: '1rem' }}>{step.desc}</p>
                  {step.badge && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.6)', paddingTop: '0.25rem' }}>
                      <span style={{ fontSize: '0.85rem' }}>&#128197;</span>
                      <span style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{step.badge}</span>
                    </div>
                  )}
                  {step.bullets && (
                    <ul style={{ listStyle: 'none', padding: 0, margin: '0.75rem 0 0', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {step.bullets.map(b => (
                        <li key={b} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.75)', fontSize: '0.9rem' }}>
                          <span style={{ color: 'rgba(255,255,255,0.5)' }}>&#10003;</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Image */}
                <div style={{ flex: 1, width: '100%', maxWidth: '480px' }}>
                  {step.style === 'photo' && step.img && (
                    <div style={{
                      aspectRatio: '4/3', borderRadius: '16px', overflow: 'hidden',
                      boxShadow: '0 20px 50px rgba(0,0,0,0.2)', transform: 'rotate(1deg)',
                    }}>
                      <img src={step.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  )}
                  {step.style === 'glass' && step.img && (
                    <div style={{
                      background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(16px)',
                      WebkitBackdropFilter: 'blur(16px)', padding: '0.75rem', borderRadius: '16px',
                      boxShadow: '0 15px 40px rgba(0,0,0,0.15)', transform: 'rotate(-2deg)',
                      border: '1px solid rgba(255,255,255,0.2)',
                    }}>
                      <img src={step.img} alt="" style={{ width: '100%', borderRadius: '12px' }} />
                    </div>
                  )}
                  {step.style === 'bg' && step.img && (
                    <img src={step.img} alt="" style={{
                      width: '100%', height: '20rem', objectFit: 'cover', borderRadius: '16px',
                      boxShadow: '0 15px 40px rgba(0,0,0,0.15)',
                    }} />
                  )}
                  {step.style === 'icon' && (
                    <div style={{
                      background: 'rgba(255,255,255,0.08)', aspectRatio: '16/9', borderRadius: '16px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      position: 'relative', overflow: 'hidden',
                      border: '1px solid rgba(255,255,255,0.15)',
                      backdropFilter: 'blur(8px)',
                    }}>
                      <span style={{ fontSize: '3rem', opacity: 0.3 }}>&#128249;</span>
                      <div style={{
                        position: 'absolute', bottom: '0.75rem', right: '0.75rem',
                        fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.1em',
                        textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)',
                      }}>Design Presentation</div>
                    </div>
                  )}
                </div>
              </section>
            )
          })}
        </div>
      </main>

      {/* Footer — matching home page style */}
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
          section[style*="flex-direction"] {
            flex-direction: column !important;
          }
        }
      `}</style>
    </div>
  )
}
