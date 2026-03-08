'use client'

import { useState, useEffect, useCallback } from 'react'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { pagePrices, type PageType, type Region, regionCurrencyMap, calculateQuote } from '../../constants/pricing'
import NavBar from '../../components/site/NavBar'

const TOTAL_STEPS = 9

const businessTypes = [
  'Restaurant', 'Café', 'Bakery', 'Bar / Pub', 'Retail Store', 'Plumber',
  'Electrician', 'Architect', 'Interior Designer', 'Real Estate Agent',
  'Photographer', 'Personal Trainer', 'Salon / Spa', 'Dentist', 'Doctor',
  'Lawyer', 'Accountant', 'Consultant', 'Construction', 'Landscaper',
  'Cleaning Service', 'Auto Mechanic', 'Event Planner', 'Florist',
  'Pet Services', 'Music Teacher', 'Yoga Studio', 'Tattoo Artist', 'Other',
]

const pageOptions: { key: PageType; label: string }[] = [
  { key: 'home', label: 'Home' },
  { key: 'about', label: 'About' },
  { key: 'services', label: 'Services' },
  { key: 'gallery', label: 'Portfolio / Gallery' },
  { key: 'contact', label: 'Contact' },
  { key: 'booking', label: 'Booking / Appointments' },
  { key: 'blog', label: 'Blog' },
  { key: 'ecommerce', label: 'Shop / Products' },
  { key: 'testimonials', label: 'Testimonials' },
]

const styleOptions = [
  { label: 'Clean & Minimal', icon: '▪' },
  { label: 'Bold & Modern', icon: '▰' },
  { label: 'Elegant & Luxury', icon: '✦' },
  { label: 'Playful & Friendly', icon: '◉' },
  { label: 'Industrial & Raw', icon: '⚙' },
  { label: 'Natural & Organic', icon: '🌿' },
  { label: 'Tech & Futuristic', icon: '◇' },
  { label: 'Classic & Traditional', icon: '❖' },
]

const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '14:00', '14:30', '15:00', '15:30', '16:00',
]

const referralOptions = ['Google Search', 'Social Media', 'Word of Mouth', 'Saw our work online', 'Other']

// Shared styles
const font = 'var(--font-source-sans), "Source Sans 3", sans-serif'
const bg = '#111118'
const accent = 'rgba(255,255,255,0.85)'

const heading: React.CSSProperties = {
  fontFamily: font,
  fontSize: 'clamp(2rem, 4vw, 3rem)',
  fontWeight: 200,
  color: '#fff',
  margin: '0 0 2rem 0',
  lineHeight: 1.2,
}

const label: React.CSSProperties = {
  fontFamily: font,
  fontSize: '0.75rem',
  fontWeight: 600,
  letterSpacing: '0.1em',
  textTransform: 'uppercase' as const,
  color: 'rgba(255,255,255,0.5)',
  marginBottom: '0.5rem',
}

const pill = (active: boolean): React.CSSProperties => ({
  fontFamily: font,
  fontSize: '0.9rem',
  fontWeight: 400,
  padding: '0.6rem 1.25rem',
  borderRadius: '9999px',
  border: `1px solid ${active ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.2)'}`,
  backgroundColor: active ? 'rgba(255,255,255,0.15)' : 'transparent',
  color: active ? '#fff' : 'rgba(255,255,255,0.8)',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
})

const btnPrimary: React.CSSProperties = {
  fontFamily: font,
  fontSize: '0.85rem',
  fontWeight: 400,
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  padding: '0.6rem 1.5rem',
  borderRadius: '9999px',
  border: '1px solid rgba(255,255,255,0.7)',
  backgroundColor: 'transparent',
  color: 'rgba(255,255,255,0.9)',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
}

const btnBack: React.CSSProperties = {
  fontFamily: font,
  fontSize: '0.85rem',
  fontWeight: 400,
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  background: 'none',
  border: '1px solid rgba(255,255,255,0.35)',
  borderRadius: '9999px',
  color: 'rgba(255,255,255,0.6)',
  cursor: 'pointer',
  padding: '0.6rem 1.5rem',
  transition: 'all 0.3s ease',
}

const inputStyle: React.CSSProperties = {
  fontFamily: font,
  fontSize: '1.5rem',
  fontWeight: 300,
  background: 'none',
  border: 'none',
  borderBottom: '1px solid rgba(255,255,255,0.5)',
  color: '#fff',
  padding: '0.5rem 0',
  width: '100%',
  outline: 'none',
}

const fieldInput: React.CSSProperties = {
  fontFamily: font,
  fontSize: '1rem',
  background: 'none',
  border: 'none',
  borderBottom: '1px solid rgba(255,255,255,0.3)',
  color: '#fff',
  padding: '0.5rem 0',
  width: '100%',
  outline: 'none',
}

function getWeekdays(startDate: Date, weeks: number): Date[] {
  const days: Date[] = []
  const d = new Date(startDate)
  // Start from next Monday
  while (d.getDay() !== 1) d.setDate(d.getDate() + 1)
  for (let w = 0; w < weeks; w++) {
    for (let i = 0; i < 5; i++) {
      days.push(new Date(d))
      d.setDate(d.getDate() + 1)
    }
    d.setDate(d.getDate() + 2) // skip weekend
  }
  return days
}

function formatCurrency(amount: number, currency: string): string {
  const symbols: Record<string, string> = { ZAR: 'R', USD: '$', GBP: '£', EUR: '€', AUD: 'A$' }
  const sym = symbols[currency] || '$'
  return `${sym}${Math.round(amount).toLocaleString()}`
}

export default function CastYourLine() {
  const [step, setStep] = useState(0)

  // Form data
  const [businessName, setBusinessName] = useState('')
  const [businessType, setBusinessType] = useState('')
  const [typeSearch, setTypeSearch] = useState('')
  const [selectedPages, setSelectedPages] = useState<PageType[]>(['home'])
  const [customPages, setCustomPages] = useState<string[]>([])
  const [customPageInput, setCustomPageInput] = useState('')
  const [visualBalance, setVisualBalance] = useState(50)
  const [selectedStyle, setSelectedStyle] = useState('')
  const [primaryColor, setPrimaryColor] = useState('#6C5CE7')
  const [secondaryColor, setSecondaryColor] = useState('#00CEC9')
  const [noColors, setNoColors] = useState(false)

  // Quote
  const [quoteData, setQuoteData] = useState<ReturnType<typeof calculateQuote> | null>(null)
  const currency = 'ZAR' // default for now

  // Booking
  const [selectedDay, setSelectedDay] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState('')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [referral, setReferral] = useState('')
  const [sendCopy, setSendCopy] = useState(true)
  const [booked, setBooked] = useState(false)

  const weekdays = getWeekdays(new Date(), 2)

  const progress = ((step + 1) / TOTAL_STEPS) * 100

  function togglePage(page: PageType) {
    setSelectedPages((prev) =>
      prev.includes(page) ? prev.filter((p) => p !== page) : [...prev, page]
    )
  }

  function addCustomPage() {
    if (customPageInput.trim() && !customPages.includes(customPageInput.trim())) {
      setCustomPages([...customPages, customPageInput.trim()])
      setCustomPageInput('')
    }
  }

  function generateQuote() {
    const allPages = [...selectedPages, ...customPages.map(() => 'other' as PageType)]
    const quote = calculateQuote(allPages, 1.0, 1.0) // ZAR default
    setQuoteData(quote)
  }

  const { executeRecaptcha } = useGoogleReCaptcha()

  const handleBook = useCallback(async () => {
    if (!executeRecaptcha) return
    try {
      const token = await executeRecaptcha('booking_form')
      const res = await fetch('/api/recaptcha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      })
      if (res.ok) {
        setBooked(true)
        setStep(8)
      }
    } catch {
      // silently fail for now
    }
  }, [executeRecaptcha])

  const filteredTypes = businessTypes.filter((t) =>
    t.toLowerCase().includes(typeSearch.toLowerCase())
  )

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
      {/* Dark overlay for readability */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.75) 100%)' }} />

      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <NavBar />

      {/* Progress bar */}
      {step > 0 && step < 8 && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '3px', backgroundColor: 'rgba(255,255,255,0.1)', zIndex: 10 }}>
          <div style={{ height: '100%', width: `${progress}%`, backgroundColor: 'rgba(255,255,255,0.7)', transition: 'width 0.4s ease' }} />
        </div>
      )}

      {/* Content area */}
      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '6rem 2rem 4rem', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

        {/* Step 0: Intro */}
        {step === 0 && (
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ ...heading, fontSize: 'clamp(2.5rem, 5vw, 3.5rem)' }}>
              Let&apos;s build your website.
            </h1>
            <p style={{ fontFamily: font, fontSize: '1.1rem', color: 'rgba(255,255,255,0.6)', marginBottom: '2.5rem', lineHeight: 1.6 }}>
              Fill out this short form for a free preview of your site<br />and an instant quote. Takes 2 minutes.
            </p>
            <button onClick={() => setStep(1)} style={{ ...btnPrimary, padding: '0.75rem 2rem' }}>
              Let&apos;s Go &nbsp;→
            </button>
          </div>
        )}

        {/* Step 1: Business name */}
        {step === 1 && (
          <>
            <h1 style={heading}>What&apos;s your business called?</h1>
            <input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="e.g. Cape Town Pools"
              autoFocus
              style={inputStyle}
            />
            <Nav back={() => setStep(0)} next={() => setStep(2)} disabled={!businessName.trim()} />
          </>
        )}

        {/* Step 2: Business type */}
        {step === 2 && (
          <>
            <h1 style={heading}>What type of business is it?</h1>
            <input
              type="text"
              value={typeSearch}
              onChange={(e) => setTypeSearch(e.target.value)}
              placeholder="Search business type..."
              autoFocus
              style={{ ...fieldInput, fontSize: '1.1rem', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.2)' }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', maxHeight: '300px', overflowY: 'auto' }}>
              {filteredTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setBusinessType(type)}
                  style={{
                    fontFamily: font,
                    fontSize: '1rem',
                    fontWeight: 400,
                    padding: '0.75rem 1rem',
                    background: businessType === type ? 'rgba(255,255,255,0.15)' : 'transparent',
                    border: businessType === type ? '1px solid rgba(255,255,255,0.7)' : '1px solid transparent',
                    color: businessType === type ? '#fff' : 'rgba(255,255,255,0.7)',
                    cursor: 'pointer',
                    textAlign: 'left',
                    borderRadius: '6px',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {type}
                </button>
              ))}
            </div>
            <Nav back={() => setStep(1)} next={() => setStep(3)} disabled={!businessType} />
          </>
        )}

        {/* Step 3: Pages needed */}
        {step === 3 && (
          <>
            <h1 style={heading}>Which pages do you need?</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
              {pageOptions.map((p) => (
                <button
                  key={p.key}
                  onClick={() => togglePage(p.key)}
                  style={pill(selectedPages.includes(p.key))}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Custom pages */}
            {customPages.map((cp) => (
              <div key={cp} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>{cp}</span>
                <button onClick={() => setCustomPages(customPages.filter((c) => c !== cp))} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', fontSize: '1rem' }}>×</button>
              </div>
            ))}

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
              <input
                type="text"
                value={customPageInput}
                onChange={(e) => setCustomPageInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addCustomPage()}
                placeholder="Add custom page..."
                style={{ ...fieldInput, flex: 1 }}
              />
              <button onClick={addCustomPage} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '50%', width: '32px', height: '32px', color: '#fff', cursor: 'pointer', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
            </div>

            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', marginTop: '1rem' }}>
              Total pages selected: {selectedPages.length + customPages.length}
            </p>
            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem' }}>
              Base price increases with each additional page
            </p>
            <Nav back={() => setStep(2)} next={() => setStep(4)} disabled={selectedPages.length === 0} />
          </>
        )}

        {/* Step 4: Style & visual balance */}
        {step === 4 && (
          <>
            <h1 style={heading}>How much of your site should be content vs visual?</h1>
            <div style={{ marginBottom: '2.5rem' }}>
              <input
                type="range"
                min={0}
                max={100}
                value={visualBalance}
                onChange={(e) => setVisualBalance(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#fff' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem' }}>Mostly Text</span>
                <span style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 600 }}>{visualBalance}% Visual, {100 - visualBalance}% Content</span>
                <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem' }}>Mostly Images &amp; Visuals</span>
              </div>
            </div>

            <h2 style={{ ...heading, fontSize: 'clamp(1.5rem, 3vw, 2rem)', marginBottom: '1.5rem' }}>
              What style feels right for your brand?
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem' }}>
              {styleOptions.map((s) => (
                <button
                  key={s.label}
                  onClick={() => setSelectedStyle(s.label)}
                  style={{
                    fontFamily: font,
                    padding: '1.25rem 0.5rem',
                    borderRadius: '8px',
                    border: `1px solid ${selectedStyle === s.label ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.15)'}`,
                    backgroundColor: selectedStyle === s.label ? 'rgba(255,255,255,0.15)' : 'transparent',
                    color: '#fff',
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{s.icon}</div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 400 }}>{s.label}</div>
                </button>
              ))}
            </div>
            <Nav back={() => setStep(3)} next={() => setStep(5)} disabled={!selectedStyle} />
          </>
        )}

        {/* Step 5: Brand colours */}
        {step === 5 && (
          <>
            <h1 style={heading}>Do you have brand colours?</h1>
            <div style={{ display: 'flex', gap: '3rem', marginBottom: '2rem', opacity: noColors ? 0.3 : 1, pointerEvents: noColors ? 'none' : 'auto' }}>
              <div>
                <p style={label}>Primary</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <input type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} style={{ width: '48px', height: '48px', border: 'none', borderRadius: '6px', cursor: 'pointer', background: 'none' }} />
                  <input type="text" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} style={{ ...fieldInput, width: '120px', fontSize: '0.95rem' }} />
                </div>
              </div>
              <div>
                <p style={label}>Secondary</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <input type="color" value={secondaryColor} onChange={(e) => setSecondaryColor(e.target.value)} style={{ width: '48px', height: '48px', border: 'none', borderRadius: '6px', cursor: 'pointer', background: 'none' }} />
                  <input type="text" value={secondaryColor} onChange={(e) => setSecondaryColor(e.target.value)} style={{ ...fieldInput, width: '120px', fontSize: '0.95rem' }} />
                </div>
              </div>
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={noColors} onChange={(e) => setNoColors(e.target.checked)} style={{ accentColor: '#fff', width: '18px', height: '18px' }} />
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>I don&apos;t have colours yet — surprise me</span>
            </label>
            <Nav back={() => setStep(4)} next={() => setStep(6)} />
          </>
        )}

        {/* Step 6: Site preview placeholder */}
        {step === 6 && (
          <>
            <div style={{
              width: '100%',
              aspectRatio: '16 / 10',
              backgroundColor: 'rgba(255,255,255,0.05)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '2.5rem',
            }}>
              <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '1rem' }}>Site preview placeholder</span>
            </div>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button
                onClick={() => { generateQuote(); setStep(7); }}
                style={{ ...btnPrimary, display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                ✅ I love it — show me the quote
              </button>
              <button
                onClick={() => setStep(4)}
                style={{ ...btnPrimary, backgroundColor: 'transparent', border: '1px solid rgba(255,255,255,0.3)' }}
              >
                ❌ Not quite right
              </button>
            </div>
          </>
        )}

        {/* Step 7: Quote / Estimate */}
        {step === 7 && quoteData && (
          <>
            <h1 style={heading}>Here&apos;s your estimate.</h1>
            <div style={{ marginBottom: '2rem' }}>
              {/* Base website */}
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <span style={{ color: '#fff', fontSize: '1rem' }}>Base website</span>
                <span style={{ color: '#fff', fontSize: '1rem' }}>{formatCurrency(quoteData.items[0]?.localPrice || 0, currency)}</span>
              </div>
              {quoteData.items.length > 1 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <span style={{ color: '#fff', fontSize: '1rem' }}>Additional pages ({quoteData.items.length - 1})</span>
                  <span style={{ color: '#fff', fontSize: '1rem' }}>{formatCurrency(quoteData.items.slice(1).reduce((s, i) => s + i.localPrice, 0), currency)}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0', marginTop: '0.5rem' }}>
                <span style={{ color: '#fff', fontSize: '1.25rem', fontWeight: 700 }}>Total</span>
                <span style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 700 }}>{formatCurrency(quoteData.totalLocal, currency)}</span>
              </div>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', marginBottom: '2rem' }}>
              This is an estimate. Final quote confirmed in your discovery call.
            </p>
            <Nav back={() => setStep(6)} next={() => setStep(8)} nextLabel="Book Your Free Discovery Call →" />
          </>
        )}

        {/* Step 8: Booking OR Confirmation */}
        {step === 8 && !booked && (
          <>
            <h1 style={heading}>Pick a time that works.</h1>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
              {/* Left: Day + Time */}
              <div>
                <p style={label}>Select a day</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.4rem', marginBottom: '1.5rem' }}>
                  {weekdays.map((d) => {
                    const isSelected = selectedDay?.toDateString() === d.toDateString()
                    return (
                      <button
                        key={d.toISOString()}
                        onClick={() => setSelectedDay(d)}
                        style={{
                          fontFamily: font,
                          padding: '0.5rem 0.25rem',
                          borderRadius: '6px',
                          border: `1px solid ${isSelected ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.15)'}`,
                          backgroundColor: isSelected ? 'rgba(255,255,255,0.15)' : 'transparent',
                          color: '#fff',
                          cursor: 'pointer',
                          fontSize: '0.75rem',
                          textAlign: 'center',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        <div style={{ fontWeight: 600 }}>{d.toLocaleDateString('en-GB', { weekday: 'short' })}</div>
                        <div style={{ fontSize: '0.7rem', opacity: 0.7 }}>{d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}</div>
                      </button>
                    )
                  })}
                </div>

                <p style={label}>Select a time</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.4rem' }}>
                  {timeSlots.map((t) => (
                    <button
                      key={t}
                      onClick={() => setSelectedTime(t)}
                      style={{
                        fontFamily: font,
                        padding: '0.5rem',
                        borderRadius: '6px',
                        border: `1px solid ${selectedTime === t ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.15)'}`,
                        backgroundColor: selectedTime === t ? 'rgba(255,255,255,0.15)' : 'transparent',
                        color: '#fff',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right: Contact details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <p style={label}>Full Name *</p>
                  <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} style={fieldInput} />
                </div>
                <div>
                  <p style={label}>Email *</p>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={fieldInput} />
                </div>
                <div>
                  <p style={label}>Phone (optional)</p>
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} style={fieldInput} />
                </div>
                <div>
                  <p style={label}>How did you hear about us?</p>
                  <select
                    value={referral}
                    onChange={(e) => setReferral(e.target.value)}
                    style={{ ...fieldInput, backgroundColor: bg, borderBottom: '1px solid rgba(255,255,255,0.3)' }}
                  >
                    <option value="">Select...</option>
                    {referralOptions.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input type="checkbox" checked={sendCopy} onChange={(e) => setSendCopy(e.target.checked)} style={{ accentColor: '#fff', width: '18px', height: '18px' }} />
                  <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem' }}>Send me a copy of my quote</span>
                </label>
              </div>
            </div>
            <Nav
              back={() => setStep(7)}
              next={handleBook}
              nextLabel="Confirm & Book My Call →"
              disabled={!selectedDay || !selectedTime || !fullName.trim() || !email.trim()}
            />
          </>
        )}

        {/* Step 8 (booked): Confirmation */}
        {step === 8 && booked && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
            <h1 style={{ ...heading, fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              You&apos;re booked!
            </h1>
            {selectedDay && (
              <p style={{ color: '#fff', fontSize: '1.05rem', marginBottom: '0.25rem' }}>
                Date: <strong>{selectedDay.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</strong>
              </p>
            )}
            <p style={{ color: '#fff', fontSize: '1.05rem', marginBottom: '1.5rem' }}>
              Time: <strong>{selectedTime}</strong>
            </p>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', lineHeight: 1.6, maxWidth: '450px', margin: '0 auto 1rem' }}>
              We&apos;ll walk through your preview, refine the design direction, and lock in the final scope together.
            </p>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>
              We&apos;ll send a confirmation to {email}
            </p>
          </div>
        )}
      </div>
      </div>
    </div>
  )
}

function Nav({ back, next, disabled, nextLabel }: { back?: () => void; next?: () => void; disabled?: boolean; nextLabel?: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '3rem' }}>
      {back ? (
        <button onClick={back} style={btnBack}>← Back</button>
      ) : <div />}
      {next && (
        <button
          onClick={next}
          disabled={disabled}
          style={{ ...btnPrimary, opacity: disabled ? 0.4 : 1, cursor: disabled ? 'not-allowed' : 'pointer' }}
        >
          {nextLabel || 'Continue →'}
        </button>
      )}
    </div>
  )
}
