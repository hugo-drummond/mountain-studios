'use client'

import NavBar from '../../components/site/NavBar'

const font = 'var(--font-source-sans), "Source Sans 3", sans-serif'

const steps = [
  {
    num: '01',
    title: 'Start a Project',
    desc: "Fill out our project form. Tell us about your business, your goals, and what you're building. This is where everything begins — the more honest you are here, the better your website will be.",
  },
  {
    num: '02',
    title: 'First Meeting',
    desc: "We get on a call to dig deeper. We'll ask questions you might not expect — about your customers, your competitors, and the feeling you want your website to create. No slides. Just a real conversation.",
  },
  {
    num: '03',
    title: 'The Builder Exercise',
    desc: "This is our secret weapon. You'll complete a focused exercise that helps us extract your vision — your content, your priorities, your voice. You do it independently, which means the output is genuinely yours.",
  },
  {
    num: '04',
    title: 'Second Meeting',
    desc: "We present the direction. You'll see the structure, flow, and design concept before we build. This is your moment to shape it. Once we align here, we move fast.",
  },
  {
    num: '05',
    title: 'Your Website',
    desc: 'We build it. You launch it. A finished, polished website — designed with intention and built to last. No endless revision cycles. No disappearing into feedback loops. Just done.',
  },
]

const reasons = [
  {
    title: 'Your input matters more than our opinions',
    desc: 'The Builder Exercise exists because nobody knows your business better than you. Rather than us guessing and you correcting, we create the conditions for you to show us. The result is a website that actually sounds like you.',
  },
  {
    title: 'Constraints create better outcomes',
    desc: 'Unlimited revisions sound generous. In practice, they lead to decision fatigue, drifting briefs, and websites that get watered down by too many opinions. Our process protects the original vision from the noise.',
  },
  {
    title: "You'll know what's happening at every step",
    desc: "There are no black boxes here. Each stage has a clear purpose and a defined output. You always know where we are, what comes next, and what's expected of you.",
  },
]

export default function About() {
  return (
    <div style={{ minHeight: '100vh', fontFamily: font, position: 'relative' }}>
      {/* Scrolling mountain background */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', zIndex: 0 }}>
        <div style={{ display: 'flex', height: '100%', animation: 'bg-scroll 60s linear infinite' }}>
          <img src="/images/bg.jpg" alt="" style={{ height: '100%', width: 'auto', minWidth: '100vw', objectFit: 'cover', flexShrink: 0 }} />
          <img src="/images/bg.jpg" alt="" style={{ height: '100%', width: 'auto', minWidth: '100vw', objectFit: 'cover', flexShrink: 0, transform: 'scaleX(-1)' }} />
          <img src="/images/bg.jpg" alt="" style={{ height: '100%', width: 'auto', minWidth: '100vw', objectFit: 'cover', flexShrink: 0 }} />
        </div>
      </div>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.75) 100%)' }} />

      <div style={{ position: 'relative', zIndex: 2 }}>
        <NavBar />

        {/* Hero */}
        <section style={{ textAlign: 'center', padding: '10rem 2rem 4rem', maxWidth: '700px', margin: '0 auto' }}>
          <h1 style={{ fontWeight: 200, fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: '#fff', margin: '0 0 1rem' }}>
            How It Works
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.9)', lineHeight: 1.6, margin: 0 }}>
            Five steps. One clear path.
          </p>
          <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, marginTop: '1rem', maxWidth: '550px', marginLeft: 'auto', marginRight: 'auto' }}>
            Every Mountain Studios project follows the same deliberate sequence. There&apos;s no guesswork, no scope creep, and no going in circles. Here&apos;s exactly what to expect.
          </p>
        </section>

        {/* Flowchart */}
        <section style={{ maxWidth: '600px', margin: '0 auto', padding: '0 2rem 6rem', position: 'relative' }}>
          {steps.map((step, i) => (
            <div key={step.num} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {/* Step card */}
              <div style={{
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '12px',
                padding: '2rem',
                width: '100%',
                backgroundColor: 'rgba(0,0,0,0.3)',
                backdropFilter: 'blur(8px)',
              }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '2rem', fontWeight: 200, color: 'rgba(255,255,255,0.3)' }}>{step.num}</span>
                  <h2 style={{ fontWeight: 200, fontSize: '1.5rem', color: '#fff', margin: 0 }}>{step.title}</h2>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.7, margin: 0 }}>
                  {step.desc}
                </p>
              </div>

              {/* Connector line + arrow */}
              {i < steps.length - 1 && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '50px', justifyContent: 'center' }}>
                  <div style={{ width: '1px', height: '30px', backgroundColor: 'rgba(255,255,255,0.25)' }} />
                  <div style={{
                    width: 0, height: 0,
                    borderLeft: '6px solid transparent',
                    borderRight: '6px solid transparent',
                    borderTop: '8px solid rgba(255,255,255,0.25)',
                  }} />
                </div>
              )}
            </div>
          ))}
        </section>

        {/* Why This Works */}
        <section style={{ maxWidth: '700px', margin: '0 auto', padding: '0 2rem 6rem', textAlign: 'center' }}>
          <h2 style={{ fontWeight: 200, fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#fff', margin: '0 0 0.5rem' }}>
            Why This Works
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, marginBottom: '3rem' }}>
            Structure is a feature, not a limitation.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'left' }}>
            {reasons.map((r) => (
              <div
                key={r.title}
                style={{
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '12px',
                  padding: '1.75rem',
                  backgroundColor: 'rgba(0,0,0,0.3)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <h3 style={{ fontWeight: 300, fontSize: '1.1rem', color: '#fff', margin: '0 0 0.75rem' }}>{r.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.7, margin: 0 }}>{r.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ textAlign: 'center', padding: '0 2rem 8rem', maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontWeight: 200, fontSize: 'clamp(2rem, 4vw, 2.5rem)', color: '#fff', margin: '0 0 0.5rem' }}>
            Ready When You Are
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.7, marginBottom: '2.5rem' }}>
            Your website is five steps away. The form takes ten minutes. The first meeting takes an hour. The rest, we handle. Start today and see how fast clarity moves.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="/cast-your-line"
              style={{
                padding: '0.6rem 1.5rem',
                borderRadius: '9999px',
                border: '1px solid rgba(255,255,255,0.7)',
                color: 'rgba(255,255,255,0.9)',
                fontSize: '0.85rem',
                fontWeight: 400,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
              }}
            >
              Start a Project
            </a>
            <a
              href="/portfolio"
              style={{
                padding: '0.6rem 1.5rem',
                borderRadius: '9999px',
                border: '1px solid rgba(255,255,255,0.35)',
                color: 'rgba(255,255,255,0.85)',
                fontSize: '0.85rem',
                fontWeight: 400,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
              }}
            >
              View Portfolio
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}
