'use client'

import SiteNav from '../../components/site/SiteNav'

const font = 'var(--font-source-sans), "Source Sans 3", sans-serif'
const serif = 'Georgia, "Times New Roman", serif'

const steps = [
  {
    num: '01',
    title: 'Start a Project',
    desc: "The journey begins with your spark. Reach out through our contact portal to share your vision, goals, and the mountain you want to climb next.",
    img: '/images/start-form-preview.jpg',
    style: 'photo' as const,
  },
  {
    num: '02',
    title: 'First Meeting',
    desc: "We sit down (virtually or physically) to align our frequencies. We'll dive deep into your brand's DNA and define what success looks like for your studio.",
    img: '/images/video-call-meeting.jpg',
    badge: 'Discovery Phase',
    style: 'photo' as const,
  },
  {
    num: '03',
    title: 'The Builder Exercise',
    desc: "Our signature collaborative workshop where we prototype the core foundations. It's a hands-on exploration of structure, flow, and digital architecture.",
    img: '/images/brief-preview.jpg',
    bullets: ['UX Logic Mapping', 'Core Feature Prioritization'],
    style: 'bg' as const,
  },
  {
    num: '04',
    title: 'Second Meeting',
    desc: "Refinement and review. We present the evolved designs based on the Builder Exercise, ensuring every detail aligns with your studio's elevated standards.",
    img: '/images/whiteboard-wireframe.jpg',
    style: 'photo' as const,
  },
  {
    num: '05',
    title: 'Your Website',
    desc: "The summit. We launch your bespoke digital experience, fully optimized and ready to represent Mountain Studios to the world.",
    img: '/images/plumber-preview.jpg',
    style: 'photo' as const,
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
        {/* ═══ THE NEW STANDARD ═══ */}
        <section style={{ maxWidth: '900px', margin: '0 auto 4rem', padding: '0 2rem', textAlign: 'center' }}>
          <h1 style={{
            fontFamily: serif, fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 300,
            color: '#fff', lineHeight: 1.15, marginBottom: '0.5rem',
          }}>The New Standard</h1>
          <p style={{
            fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.5)', marginBottom: '2.5rem',
          }}>Why Mountain Studios Wins</p>

          {/* Comparison Card */}
          <div style={{
            background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)', borderRadius: '20px',
            border: '1px solid rgba(255,255,255,0.15)',
            display: 'grid', gridTemplateColumns: '1fr 1.2fr 1fr',
            overflow: 'hidden',
          }}>
            {/* AI Builders */}
            <div style={{ padding: '2rem 1.5rem', textAlign: 'left' }}>
              <h3 style={{ fontFamily: font, fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginBottom: '0.25rem' }}>AI Builders</h3>
              <p style={{ fontFamily: serif, fontSize: '0.8rem', fontStyle: 'italic', color: 'rgba(255,255,255,0.45)', marginBottom: '1.5rem' }}>Generic & Fragmented</p>
              {[
                { text: 'Live in minutes', good: true },
                { text: 'Unique design', good: false },
                { text: 'Human expert review', good: false },
                { text: 'Low initial cost', good: true },
              ].map(item => (
                <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.65rem' }}>
                  <span style={{ fontSize: '0.85rem', color: item.good ? '#6ee7b7' : '#f87171' }}>{item.good ? '✓' : '✗'}</span>
                  <span style={{ fontSize: '0.8rem', color: item.good ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.4)' }}>{item.text}</span>
                </div>
              ))}
            </div>

            {/* Mountain Studios — center, highlighted */}
            <div style={{
              padding: '2rem 1.5rem', textAlign: 'left',
              background: 'rgba(255,255,255,0.1)',
              borderLeft: '1px solid rgba(255,255,255,0.1)',
              borderRight: '1px solid rgba(255,255,255,0.1)',
            }}>
              <h3 style={{ fontFamily: font, fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#fff', marginBottom: '0.25rem' }}>Mountain Studios</h3>
              <p style={{ fontFamily: serif, fontSize: '0.8rem', fontStyle: 'italic', color: 'rgba(255,255,255,0.55)', marginBottom: '1.5rem' }}>The Sweet Spot</p>
              {[
                'Live in 72 hours',
                'Custom design system',
                'Dedicated developer',
                'Affordable fixed pricing',
              ].map(text => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.65rem' }}>
                  <span style={{ fontSize: '0.85rem', color: '#6ee7b7' }}>✓</span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#fff' }}>{text}</span>
                </div>
              ))}
            </div>

            {/* Agencies */}
            <div style={{ padding: '2rem 1.5rem', textAlign: 'left' }}>
              <h3 style={{ fontFamily: font, fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginBottom: '0.25rem' }}>Agencies</h3>
              <p style={{ fontFamily: serif, fontSize: '0.8rem', fontStyle: 'italic', color: 'rgba(255,255,255,0.45)', marginBottom: '1.5rem' }}>Expensive & Slow</p>
              {[
                { text: 'Months to launch', good: false },
                { text: 'Custom design', good: true },
                { text: 'Personal service', good: true },
                { text: 'High project minimums', good: false },
              ].map(item => (
                <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.65rem' }}>
                  <span style={{ fontSize: '0.85rem', color: item.good ? '#6ee7b7' : '#f87171' }}>{item.good ? '✓' : '✗'}</span>
                  <span style={{ fontSize: '0.8rem', color: item.good ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.4)' }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ VALUE PROPS ═══ */}
        <section style={{ maxWidth: '900px', margin: '0 auto 5rem', padding: '0 2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {[
              {
                icon: '🤝',
                title: 'The Sweet Spot of Affordability',
                desc: "By automating the heavy lifting, we've removed the massive overhead typical agencies pass on to you. You get high-end, responsive design and professional copywriting at a fraction of the market rate.",
              },
              {
                icon: '✉',
                title: 'The Personal Touch',
                desc: "You're not just a ticket number. Every client at Mountain Studios gets a direct line to a project manager who understands your business — be it a plumbing service, a local restaurant, or a boutique salon.",
              },
            ].map(v => (
              <div key={v.title} style={{
                background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)', borderRadius: '20px',
                padding: '2rem', border: '1px solid rgba(255,255,255,0.1)',
              }}>
                <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '1rem', opacity: 0.7 }}>{v.icon}</span>
                <h3 style={{ fontFamily: serif, fontSize: '1.15rem', fontWeight: 400, color: '#fff', marginBottom: '0.75rem' }}>{v.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, fontSize: '0.85rem' }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ HOW IT WORKS ═══ */}
        <header style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center', padding: '0 2rem', marginBottom: '5rem' }}>
          <h2 style={{
            fontFamily: serif, fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 300,
            color: '#fff', lineHeight: 1.15, marginBottom: '1rem',
          }}>How It Works</h2>
          <p style={{
            fontSize: '0.95rem', color: 'rgba(255,255,255,0.75)',
            maxWidth: '500px', margin: '0 auto', lineHeight: 1.7,
          }}>
            A streamlined journey from initial vision to a living, breathing digital masterpiece.
          </p>
        </header>

        {/* Process Steps */}
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2rem', position: 'relative' }}>
          {steps.map((step, i) => {
            const isReversed = i % 2 === 1

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
                  {step.style === 'bg' && step.img && (
                    <img src={step.img} alt="" style={{
                      width: '100%', height: '20rem', objectFit: 'cover', borderRadius: '16px',
                      boxShadow: '0 15px 40px rgba(0,0,0,0.15)',
                    }} />
                  )}
                </div>
              </section>
            )
          })}
        </div>

        {/* CTA */}
        <section style={{ textAlign: 'center', padding: '2rem 2rem 2.5rem' }}>
          <a href="/start-your-project" style={{
            display: 'inline-block', fontFamily: font, fontSize: '0.85rem', fontWeight: 600,
            color: '#1a1a2e', background: '#fff', padding: '0.85rem 2.5rem',
            borderRadius: '999px', textDecoration: 'none', letterSpacing: '0.04em',
          }}>Ready To Get Started</a>
        </section>
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
