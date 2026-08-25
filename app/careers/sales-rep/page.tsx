'use client'

import { useState, useMemo } from 'react'
import SiteHeaderNav from '../../../components/site/SiteHeaderNav'

const font = 'var(--font-source-sans), "Source Sans 3", sans-serif'
const serif = 'Georgia, "Times New Roman", serif'

const WHATSAPP_NUMBER = '27645322093'
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`

// Rates from the signed-off job spec. They appear in the copy and drive the
// calculator, so they live in one place.
const SALE_RATE = 0.2
const RETAINER_RATE = 0.15
const PRICE_FLOOR = 800

// CONFIRM BEFORE PUSH. Nothing in the repo records what a retainer costs — the
// old price list was deleted and every job is priced by hand — so this is the
// one number on the page that is not sourced from the spec or the code.
const RETAINER_MIN = 350
const RETAINER_MAX = 900

const PROVINCES = [
  'Eastern Cape',
  'Free State',
  'Gauteng',
  'KwaZulu-Natal',
  'Limpopo',
  'Mpumalanga',
  'Northern Cape',
  'North West',
  'Western Cape',
]

const rand = (value: number) =>
  'R' + Math.round(value).toLocaleString('en-ZA')

type Status = 'idle' | 'sending' | 'sent' | 'ineligible' | 'error'

export default function SalesRepCareers() {
  // ── calculator ──
  const [dealPrice, setDealPrice] = useState(6000)
  const [retained, setRetained] = useState(8)

  const saleCut = dealPrice * SALE_RATE
  const monthlyLow = retained * RETAINER_MIN * RETAINER_RATE
  const monthlyHigh = retained * RETAINER_MAX * RETAINER_RATE

  // ── form ──
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')
  const [cvName, setCvName] = useState('')

  const provinceOptions = useMemo(
    () => PROVINCES.map(p => <option key={p} value={p}>{p}</option>),
    [],
  )

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!cvName) {
      setError('Attach your CV as a PDF.')
      setStatus('error')
      return
    }
    setStatus('sending')
    setError('')

    try {
      const res = await fetch('/api/careers/apply', {
        method: 'POST',
        body: new FormData(e.currentTarget),
      })
      const data = await res.json()

      if (!res.ok || !data.success) {
        setError(data.error || 'Something went wrong. Please try again.')
        setStatus('error')
        return
      }
      setStatus(data.eligible === false ? 'ineligible' : 'sent')
    } catch {
      setError('Could not reach us. Check your connection and try again.')
      setStatus('error')
    }
  }

  const WhatsAppIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004c-2.759 0-5.327 1.273-7.04 3.51-.422.54-.423 1.417.099 1.91 1.11 1.107 2.105 2.293 2.889 3.643 1.572 2.765 4.575 4.528 7.52 4.568h.004c4.141 0 7.506-3.36 7.506-7.499 0-4.139-3.365-7.492-7.506-7.492m0-2c5.206 0 9.445 4.224 9.445 9.407 0 5.182-4.239 9.407-9.445 9.407-2.147 0-4.203-.738-5.834-2.097L.464 23.971a1 1 0 0 0 1.406 1.406l3.357-3.358C6.734 23.343 9.236 24 12.051 24c5.206 0 9.445-4.225 9.445-9.408 0-5.182-4.239-9.407-9.445-9.407Z" />
    </svg>
  )

  return (
    <div style={{ background: '#f4f2fa', fontFamily: font }}>

      {/* ── TOP BAR ── */}
      <div style={{ background: '#171b2b', padding: '0.6rem 2rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'rgba(255,255,255,0.72)' }}>
        <a href={WHATSAPP_URL} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', textDecoration: 'none', color: 'rgba(255,255,255,0.72)', whiteSpace: 'nowrap' }}>
          <WhatsAppIcon />
          WhatsApp us<span style={{ display: 'none' }}> · Mon–Fri 9:00–17:00</span>
        </a>
        <a href="/refer/terms" style={{ textDecoration: 'none', color: 'rgba(255,255,255,0.72)' }}>Refer & earn up to R1000 →</a>
      </div>

      {/* ── HERO ── */}
      <div style={{
        background: 'linear-gradient(180deg,#6f86a6 0%,#8f9ab6 30%,#ad9fbf 55%,#d0b5c6 78%,#e9cad0 100%)',
        minHeight: '92vh', position: 'relative', overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ position: 'relative', zIndex: 10, flexShrink: 0 }}>
          <SiteHeaderNav />
        </div>

        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', padding: '3rem 2.5rem 6rem',
          position: 'relative', zIndex: 2, textAlign: 'center',
        }}>
          <h1 style={{
            fontFamily: serif, fontSize: 'clamp(2.2rem, 5.5vw, 4rem)',
            fontWeight: 300, color: '#fff', lineHeight: 1.1,
            margin: '0 0 1.25rem', maxWidth: '740px',
          }}>
            Sell websites. Keep <em style={{ fontStyle: 'italic' }}>a fifth</em> of every one.
          </h1>

          <p style={{
            fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)',
            color: 'rgba(255,255,255,0.75)', maxWidth: '520px',
            lineHeight: 1.75, marginBottom: '2.25rem',
          }}>
            Freelance sales representative · Remote, anywhere in South Africa · Commission only.
            No experience needed, and no one is going to clock you.
          </p>

          <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a href="#apply" style={{
              fontSize: '0.85rem', fontWeight: 600, color: '#1a1a2e', background: '#fff',
              padding: '0.75rem 2rem', borderRadius: '999px', textDecoration: 'none',
              letterSpacing: '0.06em', textTransform: 'uppercase', display: 'inline-block',
              transition: 'opacity 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >Apply now</a>
            <a href="#earn" style={{
              fontSize: '0.85rem', fontWeight: 600, color: '#fff', background: 'transparent',
              padding: '0.75rem 2rem', borderRadius: '999px', textDecoration: 'none',
              letterSpacing: '0.06em', textTransform: 'uppercase', display: 'inline-block',
              border: '1.5px solid rgba(255,255,255,0.5)', transition: 'border-color 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#fff'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'}
            >See what you earn</a>
          </div>
        </div>

        {/* Mountain silhouette — same three ridges as the homepage */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 1 }}>
          <svg viewBox="0 0 1440 400" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: 'auto' }}>
            <path d="M0,400 L0,320 L120,280 L240,310 L360,240 L440,260 L520,180 L580,200 L640,120 L680,140 L720,60 L760,80 L800,130 L860,160 L920,200 L1000,240 L1060,220 L1120,260 L1200,290 L1280,270 L1360,300 L1440,280 L1440,400 Z" fill="rgba(26,26,46,0.025)" />
            <path d="M0,400 L0,340 L100,310 L200,330 L320,270 L400,290 L480,220 L540,240 L620,160 L670,180 L740,100 L780,120 L840,170 L900,200 L980,250 L1060,230 L1140,270 L1220,300 L1320,280 L1440,310 L1440,400 Z" fill="rgba(26,26,46,0.045)" />
            <path d="M0,400 L0,360 L80,340 L180,355 L280,300 L380,320 L460,260 L530,280 L600,210 L660,230 L730,160 L770,180 L830,220 L910,260 L1000,290 L1100,270 L1200,300 L1300,320 L1440,340 L1440,400 Z" fill="rgba(26,26,46,0.07)" />
          </svg>
        </div>
      </div>

      {/* ── THE HOOK ── */}
      <div style={{ background: '#f9f9fe', padding: '7rem 2rem' }}>
        <div className="cr-split" style={{
          maxWidth: '960px', margin: '0 auto', display: 'grid',
          gridTemplateColumns: '1fr 1fr', gap: '4.5rem', alignItems: 'center',
        }}>
          <div>
            <p style={{
              fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: '#745762', marginBottom: '1.25rem',
            }}>Why this sells</p>
            <h2 style={{
              fontFamily: serif, fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
              fontWeight: 300, color: '#2e333a', lineHeight: 1.25, margin: '0 0 1.5rem',
            }}>
              You don&apos;t pitch a portfolio. You show them <em style={{ fontStyle: 'italic' }}>their own website.</em>
            </h2>
            <p style={{ fontSize: '1.05rem', color: '#535f77', lineHeight: 1.85, margin: '0 0 1.25rem' }}>
              Before a client commits to anything, we generate a live preview of their actual site —
              their business name, their trade, their photos, their contact details. You put it on the
              screen in front of them, on a phone in their shop if you like.
            </p>
            <p style={{ fontSize: '1.05rem', color: '#535f77', lineHeight: 1.85, margin: 0 }}>
              That turns the hardest conversation in sales into the easiest one. They are not buying a
              promise. They are looking at the thing and deciding whether they want to keep it.
            </p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{
              width: '100%', maxWidth: '340px', background: '#fff', borderRadius: '16px',
              boxShadow: '0 20px 25px -5px rgba(0,0,0,0.08)', overflow: 'hidden',
              transform: 'rotate(-1.5deg)',
            }}>
              <div style={{ background: '#f0eef6', padding: '0.6rem 1rem', display: 'flex', gap: '0.35rem' }}>
                {['#d4b8c8', '#b5a8c4', '#9aa4bc'].map(c => (
                  <span key={c} style={{ width: '9px', height: '9px', borderRadius: '999px', background: c }} />
                ))}
              </div>
              <div style={{ padding: '1.75rem 1.5rem 2rem' }}>
                <p style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#745762', margin: '0 0 0.5rem' }}>Preview ready</p>
                <p style={{ fontFamily: serif, fontSize: '1.4rem', fontWeight: 300, color: '#2e333a', margin: '0 0 1.25rem' }}>Naledi&apos;s Hair Studio</p>
                {[70, 100, 88, 46].map((w, i) => (
                  <div key={i} style={{ height: '9px', width: `${w}%`, background: '#f0eef6', borderRadius: '999px', marginBottom: '0.6rem' }} />
                ))}
                <div style={{ marginTop: '1.5rem', height: '90px', borderRadius: '10px', background: 'linear-gradient(135deg, #d6e3ff, #f6d0dd)' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── EARNINGS ── */}
      <div id="earn" style={{ background: '#f0eef6', padding: '7rem 2rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <p style={{
            fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em',
            textTransform: 'uppercase', color: '#745762', marginBottom: '0.75rem',
          }}>What you earn</p>
          <h2 style={{
            fontFamily: serif, fontSize: 'clamp(1.8rem, 3vw, 2.75rem)',
            fontWeight: 300, color: '#2e333a', lineHeight: 1.2, margin: '0 0 0.9rem',
          }}>
            Move the sliders. That&apos;s <em style={{ fontStyle: 'italic' }}>your money.</em>
          </h2>
          <p style={{ fontSize: '1.05rem', color: '#535f77', lineHeight: 1.8, margin: '0 0 3rem', maxWidth: '560px' }}>
            You negotiate the price with the client yourself. There is a floor of {rand(PRICE_FLOOR)} and
            no ceiling — if you can justify the value, you keep a fifth of whatever you agree.
          </p>

          <div style={{
            background: '#fff', borderRadius: '20px', padding: '2.5rem',
            boxShadow: '0 20px 25px -5px rgba(0,0,0,0.08)',
          }}>
            <div className="cr-calc" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>

              {/* Once-off */}
              <div>
                <label htmlFor="deal" style={{
                  display: 'block', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.16em',
                  textTransform: 'uppercase', color: '#745762', marginBottom: '1rem',
                }}>A website you sell for</label>
                <p style={{ fontFamily: serif, fontSize: '2rem', fontWeight: 300, color: '#2e333a', margin: '0 0 1rem' }}>
                  {rand(dealPrice)}
                </p>
                <input
                  id="deal" type="range" min={PRICE_FLOOR} max={25000} step={100}
                  value={dealPrice} onChange={e => setDealPrice(Number(e.target.value))}
                  className="cr-range"
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#8a93a8', marginTop: '0.4rem' }}>
                  <span>{rand(PRICE_FLOOR)} floor</span><span>R25 000</span>
                </div>

                <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#f9f9fe', borderRadius: '14px' }}>
                  <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#745762', margin: '0 0 0.4rem' }}>
                    Your 20%, once off
                  </p>
                  <p style={{ fontFamily: serif, fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 300, color: '#535f77', margin: 0, lineHeight: 1 }}>
                    {rand(saleCut)}
                  </p>
                </div>
              </div>

              {/* Recurring */}
              <div>
                <label htmlFor="retained" style={{
                  display: 'block', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.16em',
                  textTransform: 'uppercase', color: '#745762', marginBottom: '1rem',
                }}>Clients still on a retainer</label>
                <p style={{ fontFamily: serif, fontSize: '2rem', fontWeight: 300, color: '#2e333a', margin: '0 0 1rem' }}>
                  {retained} {retained === 1 ? 'client' : 'clients'}
                </p>
                <input
                  id="retained" type="range" min={0} max={30} step={1}
                  value={retained} onChange={e => setRetained(Number(e.target.value))}
                  className="cr-range"
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#8a93a8', marginTop: '0.4rem' }}>
                  <span>0</span><span>30</span>
                </div>

                <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#f9f9fe', borderRadius: '14px' }}>
                  <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#745762', margin: '0 0 0.4rem' }}>
                    Your 15%, every month
                  </p>
                  <p style={{ fontFamily: serif, fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 300, color: '#535f77', margin: 0, lineHeight: 1 }}>
                    {retained === 0 ? 'R0' : `${rand(monthlyLow)}–${rand(monthlyHigh)}`}
                  </p>
                </div>
              </div>
            </div>

            <p style={{ fontSize: '0.85rem', color: '#8a93a8', lineHeight: 1.7, margin: '2rem 0 0' }}>
              Clients who stay on for hosting, maintenance and updates pay a monthly retainer, typically
              between {rand(RETAINER_MIN)} and {rand(RETAINER_MAX)} depending on the plan. You earn 15% of
              it for as long as that client stays with us. Build a book of them and it compounds month over month.
            </p>
          </div>

          {/* The honest card — deliberately not buried */}
          <div style={{
            marginTop: '1.5rem', background: '#1e2333', borderRadius: '20px', padding: '2rem 2.5rem',
          }}>
            <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#d4b8c8', margin: '0 0 0.75rem' }}>
              Straight with you
            </p>
            <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.8, margin: 0 }}>
              The monthly cut runs for as long as the client stays <em style={{ fontStyle: 'italic' }}>and</em> you
              are still selling for us. It stops when you stop. There is no base salary, slow weeks are real,
              and the first sale takes the longest. If you need guaranteed income this month, this is not the right fit.
            </p>
          </div>
        </div>
      </div>

      {/* ── WHO THIS SUITS ── */}
      <div style={{ background: '#f9f9fe', padding: '7rem 2rem' }}>
        <div className="cr-split" style={{
          maxWidth: '960px', margin: '0 auto', display: 'grid',
          gridTemplateColumns: '1fr 1fr', gap: '4.5rem',
        }}>
          <div>
            <p style={{
              fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: '#745762', marginBottom: '0.75rem',
            }}>Who this suits</p>
            <h2 style={{
              fontFamily: serif, fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
              fontWeight: 300, color: '#2e333a', lineHeight: 1.25, margin: '0 0 2rem',
            }}>
              People who want to be paid for <em style={{ fontStyle: 'italic' }}>output, not attendance.</em>
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {[
                ['No sales experience required', 'If you can hold a conversation with a business owner and you’re willing to hear no a lot, you can do this. We’ll show you the rest.'],
                ['Side hustle friendly', 'Work it around a job, studies or another business. No minimum hours, no shift.'],
                ['Already dealing with business owners?', 'Insurance brokers, merchant services reps, signage and print sales, suppliers — you have the relationships already. This is an extra income stream on top of them.'],
              ].map(([title, body]) => (
                <div key={title}>
                  <p style={{ fontSize: '1rem', fontWeight: 700, color: '#2e333a', margin: '0 0 0.35rem' }}>{title}</p>
                  <p style={{ fontSize: '0.95rem', color: '#535f77', lineHeight: 1.75, margin: 0 }}>{body}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p style={{
              fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: '#745762', marginBottom: '1.5rem',
            }}>What you need</p>
            <div style={{ background: '#fff', borderRadius: '16px', padding: '2rem', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
              {[
                'Based in South Africa',
                'Your own smartphone or laptop, and data',
                'Conversational English — a second South African language is a real advantage',
                'Willing to work as an independent contractor: no salary, no benefits, your own tax',
                '18 or older',
              ].map((item, i, arr) => (
                <p key={item} style={{
                  fontSize: '0.95rem', color: '#535f77', lineHeight: 1.7,
                  margin: 0, padding: i === arr.length - 1 ? '0.9rem 0 0' : '0.9rem 0',
                  paddingTop: i === 0 ? 0 : '0.9rem',
                  background: 'none',
                }}>
                  <span style={{ color: '#745762', marginRight: '0.6rem' }}>▲</span>{item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── APPLY ── */}
      <div id="apply" style={{ background: '#1e2333', padding: '7rem 2rem' }}>
        <div style={{ maxWidth: '620px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p style={{
              fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: '#d4b8c8', marginBottom: '1rem',
            }}>Apply</p>
            <h2 style={{
              fontFamily: serif, fontSize: 'clamp(1.8rem, 3vw, 2.75rem)',
              fontWeight: 300, color: '#fff', lineHeight: 1.2, margin: '0 0 0.75rem',
            }}>
              Tell us who you <em style={{ fontStyle: 'italic' }}>are.</em>
            </h2>
            <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, margin: 0 }}>
              Two honest answers and your CV. That is the whole application.
            </p>
          </div>

          {status === 'sent' && (
            <div style={{ padding: '2.5rem', background: 'rgba(255,255,255,0.06)', borderRadius: '16px', textAlign: 'center' }}>
              <p style={{ fontFamily: serif, fontSize: '1.5rem', color: '#fff', fontWeight: 300, margin: '0 0 0.5rem' }}>
                <em>We&apos;ve got it.</em>
              </p>
              <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.5)', margin: 0 }}>
                If it&apos;s a fit, we&apos;ll be in touch.
              </p>
            </div>
          )}

          {status === 'ineligible' && (
            <div style={{ padding: '2.5rem', background: 'rgba(255,255,255,0.06)', borderRadius: '16px', textAlign: 'center' }}>
              <p style={{ fontFamily: serif, fontSize: '1.5rem', color: '#fff', fontWeight: 300, margin: '0 0 0.5rem' }}>
                <em>Application received.</em>
              </p>
              <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, margin: 0 }}>
                This role needs the legal right to work in South Africa, so we can&apos;t take it further right
                now. Your details are on file — if that changes, email hello@mountainstudios.co.za.
              </p>
            </div>
          )}

          {status !== 'sent' && status !== 'ineligible' && (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

              {/* Honeypot — off-screen, never seen, must stay empty */}
              <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true"
                style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }} />

              <Field label="Full name" name="full_name" required autoComplete="name" />
              <Field label="Email" name="email" type="email" required autoComplete="email" />
              <Field label="Phone / WhatsApp" name="phone" type="tel" required autoComplete="tel" />

              <div className="cr-form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                <div>
                  <Label htmlFor="province">Province</Label>
                  <select id="province" name="province" required defaultValue="" className="cr-input">
                    <option value="" disabled>Choose one</option>
                    {provinceOptions}
                  </select>
                </div>
                <Field label="City or town" name="city" required />
              </div>

              <div>
                <Label htmlFor="why_sales">You understand this position is commission only, with unlimited earning potential. Tell us why that appeals to you and what draws you to sales.</Label>
                <textarea id="why_sales" name="why_sales" rows={5} required className="cr-input" />
              </div>

              <div>
                <Label htmlFor="persuasion">Tell us about a time you sold something, or convinced someone to do something they didn&apos;t want to do.</Label>
                <textarea id="persuasion" name="persuasion" rows={5} required className="cr-input" />
              </div>

              <YesNo name="work_rights" legend="Are you a South African citizen, or do you have the legal right to work in South Africa?" />
              <YesNo name="has_laptop" legend="Do you have a laptop and a working internet connection?" />

              <div>
                <Label htmlFor="cv">CV — PDF, up to 5MB</Label>
                <label htmlFor="cv" style={{
                  display: 'block', cursor: 'pointer', fontSize: '0.95rem',
                  color: cvName ? '#fff' : 'rgba(255,255,255,0.4)',
                  background: 'rgba(255,255,255,0.07)', border: '1px dashed rgba(255,255,255,0.2)',
                  borderRadius: '10px', padding: '0.85rem 1.25rem',
                }}>
                  {cvName || 'Choose a PDF'}
                </label>
                <input
                  id="cv" name="cv" type="file" accept="application/pdf,.pdf"
                  onChange={e => {
                    const file = e.target.files?.[0]
                    if (file) {
                      if (!file.name.toLowerCase().endsWith('.pdf')) {
                        setError('Your CV must be a PDF.')
                        e.target.value = ''
                        setCvName('')
                        return
                      }
                      if (file.size > 5 * 1024 * 1024) {
                        setError('That CV is over 5MB. Attach a smaller one.')
                        e.target.value = ''
                        setCvName('')
                        return
                      }
                    }
                    setError('')
                    setCvName(file?.name ?? '')
                  }}
                  style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
                />
              </div>

              {error && (
                <p style={{ fontSize: '0.9rem', color: '#f2b8bd', margin: 0, lineHeight: 1.6 }}>{error}</p>
              )}

              <button type="submit" disabled={status === 'sending'} style={{
                fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
                background: '#fff', color: '#1e2333', border: 'none', borderRadius: '999px',
                padding: '0.9rem 2.25rem', cursor: status === 'sending' ? 'wait' : 'pointer',
                alignSelf: 'center', marginTop: '0.5rem',
                opacity: status === 'sending' ? 0.6 : 1, transition: 'opacity 0.2s',
              }}>
                {status === 'sending' ? 'Sending…' : 'Send application'}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div style={{ background: '#171b2b', color: 'rgba(255,255,255,0.55)', padding: '4rem 2rem 2rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
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
            <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', margin: 0 }}>Mon–Fri 9:00–17:00 SAST</p>
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
            <a href="/work" style={{ display: 'block', fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', textDecoration: 'none', marginBottom: '0.5rem' }}>Work</a>
            <a href="/refer/terms" style={{ display: 'block', fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', textDecoration: 'none', marginBottom: '0.5rem' }}>Refer</a>
            <a href="/about" style={{ display: 'block', fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', textDecoration: 'none', marginBottom: '0.5rem' }}>About</a>
            <a href="/careers/sales-rep" style={{ display: 'block', fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', textDecoration: 'none', marginBottom: '0.5rem' }}>Careers</a>
            <a href="/contact" style={{ display: 'block', fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', textDecoration: 'none', marginBottom: '0.5rem' }}>Contact</a>
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
            <a href="https://www.facebook.com/profile.php?id=61593052667215" target="_blank" rel="noopener noreferrer" style={{ display: 'block', fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', textDecoration: 'none', marginBottom: '0.5rem' }}>Facebook</a>
            <a href="https://www.linkedin.com/company/mountainstudioss/" target="_blank" rel="noopener noreferrer" style={{ display: 'block', fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', textDecoration: 'none', marginBottom: '0.5rem' }}>LinkedIn</a>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          paddingTop: '1.5rem',
          textAlign: 'center',
          fontSize: '0.75rem',
        }}>
          <p style={{ margin: '0 0 0.5rem' }}>
            © {new Date().getFullYear()} Mountain Studios ·{' '}
            <a href="/privacy" style={{ color: 'inherit' }}>Privacy</a> ·{' '}
            <a href="/terms" style={{ color: 'inherit' }}>Terms</a>
          </p>
          <p style={{ margin: 0, fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)' }}>
            This site is protected by reCAPTCHA and the Google{' '}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.55)' }}>Privacy Policy</a>{' '}
            and{' '}
            <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.55)' }}>Terms of Service</a>{' '}
            apply.
          </p>
        </div>
      </div>

      <style>{`
        .cr-input {
          /* font-family lives in globals.css. A quote or apostrophe of ANY
             kind inside this style literal serialises escaped on the server
             and bare on the client, which fails hydration and leaves the
             application form below with no event handlers attached. Keep
             this block free of  and  characters. */
          font-size: 1rem;
          width: 100%;
          box-sizing: border-box;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 10px;
          color: #fff;
          padding: 0.85rem 1.25rem;
          outline: none;
          resize: vertical;
        }
        .cr-input:focus-visible {
          border-color: rgba(255,255,255,0.5);
          box-shadow: 0 0 0 3px rgba(212,184,200,0.25);
        }
        select.cr-input { appearance: none; cursor: pointer; }
        select.cr-input option { color: #2e333a; }
        .cr-input::placeholder { color: rgba(255,255,255,0.3); }

        a:focus-visible, button:focus-visible, input:focus-visible, label:focus-visible {
          outline: 2px solid #d4b8c8;
          outline-offset: 3px;
        }

        .cr-range {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 4px;
          border-radius: 999px;
          background: #e4e0ee;
          outline: none;
          cursor: pointer;
        }
        .cr-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 22px;
          height: 22px;
          border-radius: 999px;
          background: #535f77;
          border: 3px solid #fff;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
          cursor: grab;
        }
        .cr-range::-moz-range-thumb {
          width: 22px;
          height: 22px;
          border-radius: 999px;
          background: #535f77;
          border: 3px solid #fff;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
          cursor: grab;
          border-color: #fff;
        }

        @media (max-width: 900px) {
          .cr-split, .cr-calc { grid-template-columns: 1fr !important; }
          .cr-split { gap: 3rem !important; }
          .cr-calc { gap: 2.5rem !important; }
        }
        @media (max-width: 560px) {
          .cr-form-row { grid-template-columns: 1fr !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: none !important; }
        }
      `}</style>
    </div>
  )
}

// ── form primitives ──

function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} style={{
      display: 'block', fontSize: '0.8rem', fontWeight: 600,
      color: 'rgba(255,255,255,0.7)', marginBottom: '0.5rem', lineHeight: 1.5,
    }}>{children}</label>
  )
}

function Field({
  label, name, type = 'text', required, autoComplete,
}: {
  label: string; name: string; type?: string; required?: boolean; autoComplete?: string
}) {
  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <input id={name} name={name} type={type} required={required} autoComplete={autoComplete} className="cr-input" />
    </div>
  )
}

function YesNo({ name, legend }: { name: string; legend: string }) {
  return (
    <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
      <legend style={{
        fontSize: '0.8rem', fontWeight: 600, color: 'rgba(255,255,255,0.7)',
        marginBottom: '0.6rem', lineHeight: 1.5, padding: 0,
      }}>{legend}</legend>
      <div style={{ display: 'flex', gap: '0.75rem' }}>
        {[['yes', 'Yes'], ['no', 'No']].map(([value, text]) => (
          <label key={value} style={{
            flex: 1, display: 'flex', alignItems: 'center', gap: '0.6rem',
            fontSize: '0.95rem', color: '#fff', cursor: 'pointer',
            background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '10px', padding: '0.75rem 1.25rem',
          }}>
            <input type="radio" name={name} value={value} required style={{ accentColor: '#d4b8c8' }} />
            {text}
          </label>
        ))}
      </div>
    </fieldset>
  )
}
