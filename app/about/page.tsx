'use client'

import SiteNav from '../../components/site/SiteNav'

const font = 'var(--font-source-sans), "Source Sans 3", sans-serif'
const serif = 'Georgia, "Times New Roman", serif'

const steps = [
  {
    num: '01',
    title: 'Start a Project',
    desc: "Fill out our project form. Tell us about your business, your goals, and what you're building. The more honest you are here, the better your website will be.",
  },
  {
    num: '02',
    title: 'First Meeting',
    desc: "We get on a call to dig deeper — about your customers, your competitors, and the feeling you want your website to create. No slides. Just a real conversation.",
  },
  {
    num: '03',
    title: 'The Builder Exercise',
    desc: "Our secret weapon. You'll complete a focused exercise that helps us extract your vision — your content, your priorities, your voice. The output is genuinely yours.",
  },
  {
    num: '04',
    title: 'Second Meeting',
    desc: "We present the direction. You'll see the structure, flow, and design concept before we build. Once we align here, we move fast.",
  },
  {
    num: '05',
    title: 'Your Website',
    desc: 'We build it. You launch it. A finished, polished website — designed with intention and built to last. No endless revision cycles. Just done.',
  },
]

const reasons = [
  {
    title: 'Your input matters more than our opinions',
    desc: 'The Builder Exercise exists because nobody knows your business better than you. The result is a website that actually sounds like you.',
  },
  {
    title: 'Constraints create better outcomes',
    desc: 'Unlimited revisions lead to decision fatigue and watered-down websites. Our process protects the original vision from the noise.',
  },
  {
    title: "You'll know what's happening at every step",
    desc: "No black boxes. Each stage has a clear purpose and a defined output. You always know where we are and what comes next.",
  },
]

export default function About() {
  return (
    <div style={{
      minHeight: '100vh', fontFamily: font,
      background: 'linear-gradient(180deg, #8e9fba 0%, #a8b8cc 40%, #d4b8c8 80%, #e8c8cf 100%)',
    }}>
      <SiteNav />

      {/* Hero */}
      <section style={{ textAlign: 'center', padding: '6rem 2rem 4rem', maxWidth: '700px', margin: '0 auto' }}>
        <h1 style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: '#fff', margin: '0 0 1rem' }}>
          How It Works
        </h1>
        <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, maxWidth: '500px', margin: '0 auto' }}>
          Five steps. One clear path. No guesswork, no scope creep, and no going in circles.
        </p>
      </section>

      {/* Steps */}
      <section style={{ maxWidth: '600px', margin: '0 auto', padding: '0 2rem 5rem' }}>
        {steps.map((step, i) => (
          <div key={step.num} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{
              border: '1px solid rgba(255,255,255,0.3)', borderRadius: '16px',
              padding: '2rem', width: '100%', background: 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(8px)',
            }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '1.8rem', fontWeight: 300, color: 'rgba(255,255,255,0.35)' }}>{step.num}</span>
                <h2 style={{ fontFamily: serif, fontWeight: 300, fontSize: '1.4rem', color: '#fff', margin: 0 }}>{step.title}</h2>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, margin: 0 }}>{step.desc}</p>
            </div>
            {i < steps.length - 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '40px', justifyContent: 'center' }}>
                <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.25)' }} />
                <div style={{ width: 0, height: 0, borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: '6px solid rgba(255,255,255,0.25)' }} />
              </div>
            )}
          </div>
        ))}
      </section>

      {/* Why This Works */}
      <section style={{ maxWidth: '700px', margin: '0 auto', padding: '0 2rem 5rem', textAlign: 'center' }}>
        <h2 style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: '#fff', margin: '0 0 0.5rem' }}>
          Why This Works
        </h2>
        <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, marginBottom: '2.5rem' }}>
          Structure is a feature, not a limitation.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', textAlign: 'left' }}>
          {reasons.map(r => (
            <div key={r.title} style={{
              border: '1px solid rgba(255,255,255,0.25)', borderRadius: '16px',
              padding: '1.75rem', background: 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(8px)',
            }}>
              <h3 style={{ fontWeight: 500, fontSize: '1rem', color: '#fff', margin: '0 0 0.5rem' }}>{r.title}</h3>
              <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, margin: 0 }}>{r.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ textAlign: 'center', padding: '0 2rem 6rem', maxWidth: '600px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', color: '#fff', margin: '0 0 0.75rem' }}>
          Ready When You Are
        </h2>
        <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: '2rem' }}>
          Your website is five steps away. Start today and see how fast clarity moves.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <a href="/start-your-project" style={{
            fontFamily: font, fontSize: '0.85rem', fontWeight: 600,
            color: '#1a1a2e', background: '#fff', padding: '0.65rem 1.5rem',
            borderRadius: '999px', textDecoration: 'none', transition: 'opacity 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >Start a Project</a>
          <a href="/portfolio" style={{
            fontFamily: font, fontSize: '0.85rem', fontWeight: 600,
            color: '#fff', padding: '0.65rem 1.5rem', borderRadius: '999px',
            border: '1.5px solid rgba(255,255,255,0.4)', textDecoration: 'none',
            transition: 'border-color 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.7)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'}
          >View Portfolio</a>
        </div>
      </section>
    </div>
  )
}
