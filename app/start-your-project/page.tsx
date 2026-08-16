'use client'

import { useState, useEffect, useRef } from 'react'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { type PageType } from '../../constants/pricing'
import {
  businessTypeData,
  sortedBusinessTypes,
  popularTypes,
  type BusinessCategory,
  type BusinessTypeEntry,
} from '../../constants/business-types'
import NavBar from '../../components/site/NavBar'
import { storedRefCode } from '../../components/site/RefCapture'
// Supabase import removed — images now use browser object URLs for preview

// Steps run 1–7. There is no step 0 — the intro screen was removed, so the
// progress bar is step/TOTAL rather than (step+1)/TOTAL.
const TOTAL_STEPS = 7

// Spread across segments on purpose. This placeholder is the first concrete
// example a visitor reads, so a single fixed one ("Cape Town Plumbing") quietly
// tells every salon, accountant and vet that the product isn't for them.
const NAME_EXAMPLES = [
  'Sea Point Hair Studio',
  'Rosebank Accounting',
  'Table View Veterinary',
  'Claremont Coffee Roasters',
  'Umhlanga Guest House',
  'Menlyn Eyecare',
  'Sandton Leak Fix',
]

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

// Image limits per category — matches how many images each template actually uses
const categoryImageLimits: Record<BusinessCategory, number> = {
  'food-hospitality': 5,     // visual: hero + 3 service + 1 gallery
  'retail': 5,
  'health-wellness': 5,
  'fitness-sport': 5,
  'pets': 5,
  'events-entertainment': 5,
  'tech-digital': 2,         // service (dark): hero bg + 1
  'professional': 4,         // service: 2x2 image grid
  'trades-construction': 2,  // service: hero bg + 1
  'home-services': 2,
  'education': 2,
  'automotive': 2,
  'other': 3,
  'creative': 9,             // portfolio: hero + 3 service + 5 gallery
  'property': 4,             // property: hero + 3 service
}

const MAX_VISIBLE = 15

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


// Shared styles
const font = 'var(--font-source-sans), "Source Sans 3", sans-serif'
const gradient = 'linear-gradient(180deg, #8e9fba 0%, #a8b8cc 40%, #d4b8c8 80%, #e8c8cf 100%)'

const heading: React.CSSProperties = {
  fontFamily: font,
  fontSize: 'clamp(2rem, 4vw, 3rem)',
  fontWeight: 300,
  color: '#fff',
  margin: '0 0 2rem 0',
  lineHeight: 1.2,
  textShadow: '0 1px 4px rgba(0,0,0,0.1)',
}

const label: React.CSSProperties = {
  fontFamily: font,
  fontSize: '0.75rem',
  fontWeight: 600,
  letterSpacing: '0.1em',
  textTransform: 'uppercase' as const,
  color: 'rgba(255,255,255,0.85)',
  marginBottom: '0.5rem',
}

const pill = (active: boolean): React.CSSProperties => ({
  fontFamily: font,
  fontSize: '0.9rem',
  fontWeight: 500,
  padding: '0.6rem 1.25rem',
  borderRadius: '9999px',
  border: `1.5px solid ${active ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.4)'}`,
  backgroundColor: active ? 'rgba(255,255,255,0.12)' : 'transparent',
  color: '#fff',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
})

const btnPrimary: React.CSSProperties = {
  fontFamily: font,
  fontSize: '0.85rem',
  fontWeight: 600,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  padding: '0.65rem 1.5rem',
  borderRadius: '9999px',
  border: '1.5px solid rgba(255,255,255,0.5)',
  backgroundColor: 'transparent',
  color: '#fff',
  cursor: 'pointer',
  transition: 'border-color 0.2s',
}

const btnBack: React.CSSProperties = {
  fontFamily: font,
  fontSize: '0.85rem',
  fontWeight: 600,
  letterSpacing: '0.04em',
  background: 'none',
  border: '1.5px solid rgba(255,255,255,0.4)',
  borderRadius: '9999px',
  color: '#fff',
  cursor: 'pointer',
  padding: '0.65rem 1.5rem',
  transition: 'border-color 0.2s',
}

const inputStyle: React.CSSProperties = {
  fontFamily: font,
  fontSize: '1.5rem',
  fontWeight: 300,
  background: 'none',
  border: 'none',
  borderBottom: '1.5px solid rgba(255,255,255,0.5)',
  color: '#fff',
  padding: '0.5rem 0',
  width: '100%',
  outline: 'none',
  caretColor: '#fff',
}

const fieldInput: React.CSSProperties = {
  fontFamily: font,
  fontSize: '1rem',
  background: 'none',
  border: 'none',
  borderBottom: '1.5px solid rgba(255,255,255,0.5)',
  color: '#fff',
  padding: '0.5rem 0',
  width: '100%',
  outline: 'none',
  caretColor: '#fff',
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



const categoryColors: Record<BusinessCategory, { primary: string; secondary: string }> = {
  'food-hospitality':      { primary: '#9C4221', secondary: '#F0C896' },  // rich burnt sienna + warm peach — appetite, warmth, artisan
  'retail':                { primary: '#1B3A6B', secondary: '#D4A843' },  // rich navy + warm gold — trust, purchase intent, upmarket
  'trades-construction':   { primary: '#1D5C8A', secondary: '#E07B3C' },  // rich steel blue + amber — reliability, energy, industry
  'health-wellness':       { primary: '#2E7D6E', secondary: '#B8DFCF' },  // deep sage-teal + soft mint — calm, healing, clinical trust
  'professional':          { primary: '#0F2B52', secondary: '#C49A3C' },  // Oxford navy + antique gold — authority, prestige, trust
  'creative':              { primary: '#1A1A2E', secondary: '#E8956D' },  // deep charcoal-navy + warm coral — sophistication, creativity
  'fitness-sport':         { primary: '#111111', secondary: '#D42020' },  // near-black + crisp crimson — power, energy, performance
  'home-services':         { primary: '#1A6464', secondary: '#7DCFCA' },  // deep teal + light teal — clean, trustworthy, refreshing
  'education':             { primary: '#1A4B8A', secondary: '#F0B429' },  // warm royal blue + golden amber — focus, optimism, learning
  'automotive':            { primary: '#1A2030', secondary: '#C42828' },  // gunmetal navy + deep crimson — sophisticated, powerful
  'property':              { primary: '#162030', secondary: '#C49060' },  // midnight navy + warm copper — prestige, stability, luxury
  'events-entertainment':  { primary: '#3A1A58', secondary: '#D4AF5A' },  // deep plum + champagne gold — celebration, elegance
  'tech-digital':          { primary: '#0C1A2E', secondary: '#00B4A6' },  // deep tech navy + electric teal — innovation, precision
  'pets':                  { primary: '#3A6232', secondary: '#E8B040' },  // forest green + warm amber — nature, warmth, care
  'other':                 { primary: '#3A4F6B', secondary: '#B87878' },  // slate blue + dusty rose — refined, neutral, welcoming
}

const categoryStyles: Record<BusinessCategory, { style: string; visualBalance: number }> = {
  'food-hospitality':      { style: 'Elegant & Luxury',     visualBalance: 70 },
  'retail':                { style: 'Bold & Modern',         visualBalance: 75 },
  'trades-construction':   { style: 'Industrial & Raw',      visualBalance: 55 },
  'health-wellness':       { style: 'Clean & Minimal',       visualBalance: 45 },
  'professional':          { style: 'Classic & Traditional',  visualBalance: 35 },
  'creative':              { style: 'Bold & Modern',         visualBalance: 80 },
  'fitness-sport':         { style: 'Bold & Modern',         visualBalance: 70 },
  'home-services':         { style: 'Clean & Minimal',       visualBalance: 50 },
  'education':             { style: 'Playful & Friendly',    visualBalance: 55 },
  'automotive':            { style: 'Industrial & Raw',      visualBalance: 65 },
  'property':              { style: 'Elegant & Luxury',      visualBalance: 70 },
  'events-entertainment':  { style: 'Playful & Friendly',    visualBalance: 65 },
  'tech-digital':          { style: 'Tech & Futuristic',     visualBalance: 50 },
  'pets':                  { style: 'Playful & Friendly',    visualBalance: 70 },
  'other':                 { style: 'Clean & Minimal',       visualBalance: 50 },
}

export default function StartYourProject() {
  const [step, setStep] = useState(1)
  const [menuOpen, setMenuOpen] = useState(false)

  // Form data
  const [businessName, setBusinessName] = useState('')
  const [businessType, setBusinessType] = useState('')
  const [businessCategory, setBusinessCategory] = useState<BusinessCategory | ''>('')
  const [typeSearch, setTypeSearch] = useState('')
  const [selectedPages, setSelectedPages] = useState<PageType[]>(['home'])
  const [customPages, setCustomPages] = useState<string[]>([])
  const [customPageInput, setCustomPageInput] = useState('')
  const [visualBalance, setVisualBalance] = useState(50)
  const [selectedStyle, setSelectedStyle] = useState('')
  const [primaryColor, setPrimaryColor] = useState('#2563EB')
  const [secondaryColor, setSecondaryColor] = useState('#F59E0B')
  const [noColors, setNoColors] = useState(false)
  const [msVariant, setMsVariant] = useState<string | null>(null)

  // Populate business name from URL query parameter
  useEffect(() => {
    const n = new URLSearchParams(window.location.search).get('name')
    if (n) setBusinessName(n.slice(0, 80))
    const v = localStorage.getItem('ms_variant')
    if (v === 'site' || v === 'chat') setMsVariant(v)
  }, [])

  // Images
  const [uploadedImages, setUploadedImages] = useState<{ url: string; name: string }[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Preview
  const [previewHtml, setPreviewHtml] = useState<string | null>(null)
  const [previewLoading, setPreviewLoading] = useState(false)
  const [previewProgress, setPreviewProgress] = useState(0)
  const [previewError, setPreviewError] = useState(false)
  const previewRequested = useRef(false)

  // Index 0 on the server, randomised after hydration — picking at render time
  // would mismatch between server and client HTML.
  const [namePlaceholder, setNamePlaceholder] = useState(NAME_EXAMPLES[0])
  useEffect(() => {
    setNamePlaceholder(NAME_EXAMPLES[Math.floor(Math.random() * NAME_EXAMPLES.length)])
  }, [])

  // Step 6 email gate — capture before preview generates
  const [gateEmail, setGateEmail] = useState('')
  const [gateSubmitting, setGateSubmitting] = useState(false)
  const [gateError, setGateError] = useState('')
  const [leadId, setLeadId] = useState<string | null>(null)
  const [gateHoneypot, setGateHoneypot] = useState('')

  // Hydrate from sessionStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedEmail = sessionStorage.getItem('ms-lead-email')
      const storedLeadId = sessionStorage.getItem('ms-lead-id')
      if (storedEmail) setGateEmail(storedEmail)
      if (storedLeadId) setLeadId(storedLeadId)
    }
  }, [])

  // Contact
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [projectInfo, setProjectInfo] = useState('')
  const [contactSubmitted, setContactSubmitted] = useState(false)
  // Which button they pressed on the preview. Both go to the contact step, but
  // someone who said the preview was wrong is being asked a different question,
  // and the answer is worth more to us than their notes on a preview they liked.
  const [previewVerdict, setPreviewVerdict] = useState<'loved' | 'not_quite'>('loved')
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const weekdays = getWeekdays(new Date(), 2)

  const progress = (step / TOTAL_STEPS) * 100

  const { executeRecaptcha } = useGoogleReCaptcha()

  // Generate preview when entering Step 6 and email is captured
  useEffect(() => {
    if (step !== 6 || !gateEmail) {
      previewRequested.current = false
      return
    }
    if (previewRequested.current) return
    previewRequested.current = true
    setPreviewLoading(true)
    setPreviewProgress(0)
    setPreviewError(false)
    setPreviewHtml(null)

    // Attempt reCAPTCHA check if available, but the preview must never be gated
    // on its result. A customer on a network that cannot reach Google, or with
    // a privacy extension blocking it, is exactly the person we must not block
    // from the one thing this wizard does. The reCAPTCHA score is still useful
    // in logs for fraud detection, but must never stop the flow.
    ;(async () => {
      let recaptchaToken: string | undefined
      if (executeRecaptcha) {
        try {
          // Raced against a timeout because executeRecaptcha does not always
          // reject when Google is unreachable — it can simply never settle, and
          // an await that never returns is the same as a broken preview.
          recaptchaToken = await Promise.race([
            executeRecaptcha('preview_generate'),
            new Promise<undefined>(resolve => setTimeout(() => resolve(undefined), 5000)),
          ])
        } catch {
          // reCAPTCHA failure must not block the preview
        }
      }

      try {
        const r = await fetch('/api/preview/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            businessName,
            businessType,
            businessCategory,
            country: 'South Africa',
            pages: [...selectedPages.map(p => pageOptions.find(o => o.key === p)?.label || p), ...customPages],
            style: selectedStyle,
            primaryColor,
            secondaryColor,
            visualBalance,
            noColors,
            images: uploadedImages.map(img => img.url),
            recaptchaToken,
          }),
        })
        const res = await r.json()
        if (res.success) {
          setPreviewHtml(res.data.html)
        } else {
          setPreviewError(true)
        }
      } catch {
        setPreviewError(true)
      } finally {
        setPreviewLoading(false)
      }
    })()
  }, [step, gateEmail, businessName, businessType, selectedPages, customPages, selectedStyle, primaryColor, secondaryColor, visualBalance, noColors, uploadedImages, executeRecaptcha])

  // Capture email at step 6 before the preview generates
  async function handleSubmitGateEmail(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setGateSubmitting(true)
    setGateError('')

    const emailToSubmit = gateHoneypot.trim() ? '' : (e.currentTarget.querySelector('input[type="email"]') as HTMLInputElement)?.value?.trim() || ''

    // Client-side email validation
    if (!emailToSubmit || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailToSubmit)) {
      setGateError('That email address does not look right.')
      setGateSubmitting(false)
      return
    }

    try {
      let recaptchaToken: string | undefined
      if (executeRecaptcha) {
        try {
          recaptchaToken = await Promise.race([
            executeRecaptcha('brief_partial'),
            new Promise<undefined>((resolve) => setTimeout(() => resolve(undefined), 5000)),
          ])
        } catch {
          // Unreachable reCAPTCHA must not cost us the lead, or the person their preview.
        }
      }

      const res = await fetch('/api/brief/partial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: emailToSubmit,
          businessName,
          businessType,
          pages: [...selectedPages.map(p => pageOptions.find(o => o.key === p)?.label || p), ...customPages],
          style: selectedStyle,
          recaptchaToken,
          website: gateHoneypot,
          variant: msVariant,
          refCode: storedRefCode(),
        }),
      })

      const data = await res.json()

      // Store leadId if returned, but never block on failure
      if (data.leadId) {
        setLeadId(data.leadId)
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('ms-lead-id', data.leadId)
        }
      }
    } catch {
      // Network failure must not block the person. We would rather build the
      // preview and lose the lead than block a real person because the server
      // was unreachable.
    } finally {
      // CRITICAL: Always persist email and proceed, regardless of API outcome
      setGateEmail(emailToSubmit)
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('ms-lead-email', emailToSubmit)
      }
      setGateSubmitting(false)
    }
  }

  // Sends the finished brief to the CRM and to Hugo. The endpoint only fails
  // the request if BOTH destinations are unreachable, so anything short of that
  // still shows the thank-you screen rather than blocking someone who has
  // already done the work of filling the form in.
  async function handleSubmitContact() {
    setSubmitting(true)
    setSubmitError('')
    try {
      const r = await fetch('/api/brief/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email: gateEmail,
          phone,
          projectInfo,
          businessName,
          businessType,
          previewVerdict,
          pages: [...selectedPages, ...customPages],
          style: selectedStyle,
          primaryColor: noColors ? null : primaryColor,
          secondaryColor: noColors ? null : secondaryColor,
          leadId,
          variant: msVariant,
          refCode: storedRefCode(),
        }),
      })
      const res = await r.json()
      if (!res.success) {
        setSubmitError(res.error || 'Something went wrong. Please try again.')
        return
      }
      setContactSubmitted(true)
      // Clear sessionStorage on successful submit
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('ms-lead-email')
        sessionStorage.removeItem('ms-lead-id')
      }
    } catch {
      setSubmitError('Could not send that. Check your connection and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  // Simulated progress bar animation
  useEffect(() => {
    if (!previewLoading) return
    const start = Date.now()
    const duration = 8000 // 8 seconds to ~90%
    const interval = setInterval(() => {
      const elapsed = Date.now() - start
      // Ease-out curve: fast start, slows near 90%
      const raw = Math.min(elapsed / duration, 1)
      const progress = Math.min(90, raw * 90 * (2 - raw))
      setPreviewProgress(Math.round(progress))
    }, 200)
    return () => {
      clearInterval(interval)
      setPreviewProgress(100)
    }
  }, [previewLoading])

  async function handleImageUpload(files: FileList | null) {
    if (!files || files.length === 0) return
    const maxImages = businessCategory ? categoryImageLimits[businessCategory] : 5
    const remaining = maxImages - uploadedImages.length
    if (remaining <= 0) return

    const toUpload = Array.from(files).slice(0, remaining)
    const oversized = toUpload.filter(f => f.size > MAX_FILE_SIZE)
    if (oversized.length > 0) {
      alert(`Some files exceed 5MB and were skipped: ${oversized.map(f => f.name).join(', ')}`)
    }
    const valid = toUpload.filter(f => f.size <= MAX_FILE_SIZE)
    if (valid.length === 0) return

    // Convert to base64 data URLs — embeddable in HTML, no server storage needed
    const newImages: { url: string; name: string }[] = []
    for (const file of valid) {
      const dataUrl = await new Promise<string>((resolve) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result as string)
        reader.readAsDataURL(file)
      })
      newImages.push({ url: dataUrl, name: file.name })
    }
    setUploadedImages(prev => [...prev, ...newImages])
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  function removeImage(url: string) {
    setUploadedImages(prev => prev.filter(img => img.url !== url))
  }

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


  const filteredTypes = (() => {
    const q = typeSearch.toLowerCase().trim()
    if (!q) return popularTypes.map((t) => ({ entry: t, hint: '' }))

    const results: { entry: BusinessTypeEntry; hint: string }[] = []
    for (const entry of sortedBusinessTypes) {
      if (entry.name === 'Other') continue
      if (entry.name.toLowerCase().includes(q)) {
        results.push({ entry, hint: '' })
      } else {
        const matched = entry.keywords.find((k) => k.toLowerCase().includes(q))
        if (matched) {
          results.push({ entry, hint: matched })
        }
      }
    }
    if (results.length === 0) {
      return [{ entry: businessTypeData.find((t) => t.name === 'Other')!, hint: typeSearch.trim() }]
    }
    return results.slice(0, MAX_VISIBLE)
  })()

  return (
    <div style={{ minHeight: '100vh', fontFamily: font, background: gradient }}>
      <style>{`
        @media(max-width:640px){
          .syt-nav-links{display:none!important}
          .syt-cta-btn{display:none!important}
          .syt-burger-btn{display:flex!important}
        }
        .syt-burger-btn{display:none}
      `}</style>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      {/* Nav */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 20,
        display: 'flex', justifyContent: 'center', padding: '1.25rem 2.5rem',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          background: 'transparent', borderRadius: '999px',
          padding: '0.65rem 0.65rem 0.65rem 1.75rem',
          border: '1.5px solid rgba(255,255,255,0.5)',
        }}>
          <a href="/" style={{
            fontFamily: font, fontSize: '1.05rem', fontWeight: 700,
            color: '#fff', textDecoration: 'none', letterSpacing: '0.04em',
            marginRight: '1.5rem',
          }}>mountain studios</a>
          <div className="syt-nav-links" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {[['About', '/#about'], ['Portfolio', '/#portfolio'], ['Contact', '/#contact']].map(([label, href]) => (
              <a key={label} href={href} style={{
                fontFamily: font, fontSize: '0.85rem', fontWeight: 600,
                color: 'rgba(255,255,255,0.8)', textDecoration: 'none',
                letterSpacing: '0.06em', textTransform: 'uppercase',
                padding: '0.4rem 0.85rem', transition: 'color 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}
              >{label}</a>
            ))}
          </div>

          <a href="/start-your-project" className="syt-cta-btn" style={{
            fontFamily: font, fontSize: '0.85rem', fontWeight: 600,
            color: '#1a1a2e', textDecoration: 'none', letterSpacing: '0.04em',
            background: '#fff', padding: '0.6rem 1.5rem', borderRadius: '999px',
          }}>Get Started</a>
          <button className="syt-burger-btn" onClick={() => setMenuOpen(o => !o)} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            padding: '4px 8px', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: '1.4rem', lineHeight: 1,
          }}>☰</button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div onClick={() => setMenuOpen(false)} style={{
        position: 'fixed', inset: 0, zIndex: 30,
        background: 'rgba(0,0,0,0.92)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem',
        opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? 'auto' : 'none',
        transition: 'opacity 0.3s ease',
      }}>
        {[['About', '/#about'], ['Portfolio', '/#portfolio'], ['Contact', '/#contact'], ['Start a Project', '/start-your-project']].map(([label, href]) => (
          <a key={href} href={href} onClick={e => e.stopPropagation()} style={{
            color: 'rgba(255,255,255,0.85)', textDecoration: 'none',
            fontFamily: font, fontSize: '1.3rem', fontWeight: 300,
            letterSpacing: '0.2em', textTransform: 'uppercase' as const,
            padding: '0.5rem 1.5rem', borderRadius: '999px',
            border: '1px solid rgba(255,255,255,0.3)',
          }}>{label}</a>
        ))}
      </div>

      {/* Progress bar */}
      {!contactSubmitted && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '3px', backgroundColor: 'rgba(255,255,255,0.1)', zIndex: 10 }}>
          <div style={{ height: '100%', width: `${progress}%`, backgroundColor: 'rgba(255,255,255,0.7)', transition: 'width 0.4s ease' }} />
        </div>
      )}

      {/* Content area */}
      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '6rem 2rem 4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

        {/* Step 1: Business name — the wizard opens here. There is no intro
            screen: it cost a click and said nothing the first question doesn't. */}
        {step === 1 && (
          <>
            <h1 style={heading}>What&apos;s your business called?</h1>
            <input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder={`e.g. ${namePlaceholder}`}
              autoFocus
              style={inputStyle}
            />
            <Nav next={() => setStep(2)} disabled={!businessName.trim()} />
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
              {filteredTypes.map(({ entry, hint }) => {
                const isOtherFallback = entry.name === 'Other' && hint
                const displayName = isOtherFallback ? `Other ("${hint}")` : entry.name
                const selected = businessType === entry.name
                return (
                  <button
                    key={entry.name + hint}
                    onClick={() => {
                      setBusinessType(entry.name)
                      setBusinessCategory(entry.category)
                      const colors = categoryColors[entry.category]
                      if (colors) { setPrimaryColor(colors.primary); setSecondaryColor(colors.secondary) }
                      const styleMap = categoryStyles[entry.category]
                      if (styleMap) { setSelectedStyle(styleMap.style); setVisualBalance(styleMap.visualBalance) }
                    }}
                    style={{
                      fontFamily: font,
                      fontSize: '1rem',
                      fontWeight: 400,
                      padding: '0.75rem 1rem',
                      background: selected ? 'rgba(255,255,255,0.15)' : 'transparent',
                      border: selected ? '1px solid rgba(255,255,255,0.7)' : '1px solid transparent',
                      color: selected ? '#fff' : 'rgba(255,255,255,0.7)',
                      cursor: 'pointer',
                      textAlign: 'left',
                      borderRadius: '6px',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {displayName}
                    {hint && !isOtherFallback && (
                      <span style={{ color: 'rgba(255,255,255,0.4)', marginLeft: '0.5rem' }}>({hint})</span>
                    )}
                  </button>
                )
              })}
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
            <Nav back={() => setStep(2)} next={() => setStep(4)} disabled={selectedPages.length === 0} />
          </>
        )}

        {/* Step 4: Brand colours */}
        {step === 4 && (
          <>
            <h1 style={heading}>Do you have brand colours?</h1>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '2rem', opacity: noColors ? 0.3 : 1, pointerEvents: noColors ? 'none' : 'auto' }}>
              <div>
                <p style={label}>Primary</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <input type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} style={{ width: '48px', height: '48px', border: 'none', borderRadius: '6px', cursor: 'pointer', background: 'none' }} />
                  <input type="text" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} style={{ ...fieldInput, width: '90px', fontSize: '0.95rem' }} />
                </div>
              </div>
              <div>
                <p style={label}>Secondary</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <input type="color" value={secondaryColor} onChange={(e) => setSecondaryColor(e.target.value)} style={{ width: '48px', height: '48px', border: 'none', borderRadius: '6px', cursor: 'pointer', background: 'none' }} />
                  <input type="text" value={secondaryColor} onChange={(e) => setSecondaryColor(e.target.value)} style={{ ...fieldInput, width: '90px', fontSize: '0.95rem' }} />
                </div>
              </div>
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={noColors} onChange={(e) => setNoColors(e.target.checked)} style={{ accentColor: '#fff', width: '18px', height: '18px' }} />
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>I don&apos;t have colours yet — surprise me</span>
            </label>
            <Nav back={() => setStep(3)} next={() => setStep(5)} />
          </>
        )}

        {/* Step 5: Your Images */}
        {step === 5 && (() => {
          const maxImages = businessCategory ? categoryImageLimits[businessCategory] : 5
          return (
          <>
            <h1 style={heading}>Got any images you&apos;d like us to use?</h1>
            <p style={{ fontFamily: font, fontSize: '1rem', color: 'rgba(255,255,255,0.85)', marginBottom: '2rem', lineHeight: 1.6 }}>
              Logo, team photos, product shots — anything that represents your business.
              <br /><span style={{ fontSize: '0.85rem' }}>This step is optional. You can skip it if you don&apos;t have images ready.</span>
            </p>

            {/* Drop zone */}
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); e.currentTarget.style.borderColor = 'rgba(255,255,255,0.7)' }}
              onDragLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)' }}
              onDrop={(e) => { e.preventDefault(); e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; handleImageUpload(e.dataTransfer.files) }}
              style={{
                border: '2px dashed rgba(255,255,255,0.5)',
                borderRadius: '12px',
                padding: '2.5rem 1.5rem',
                textAlign: 'center',
                cursor: uploadedImages.length >= maxImages ? 'not-allowed' : 'pointer',
                transition: 'border-color 0.2s ease',
                opacity: uploadedImages.length >= maxImages ? 0.4 : 1,
                marginBottom: '1.5rem',
              }}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleImageUpload(e.target.files)}
                style={{ display: 'none' }}
                disabled={uploadedImages.length >= maxImages}
              />
              <>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem', opacity: 0.5 }}>📁</div>
                <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.95rem', fontFamily: font, margin: 0 }}>
                  Drag &amp; drop images here, or click to browse
                </p>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', fontFamily: font, marginTop: '0.5rem' }}>
                  Up to {maxImages} images, max 5MB each
                </p>
              </>
            </div>

            {/* Thumbnails */}
            {uploadedImages.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
                {uploadedImages.map((img) => (
                  <div key={img.url} style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden', aspectRatio: '1', border: '1px solid rgba(255,255,255,0.15)' }}>
                    <img src={img.url} alt={img.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <button
                      onClick={() => removeImage(img.url)}
                      style={{
                        position: 'absolute', top: '4px', right: '4px',
                        width: '24px', height: '24px', borderRadius: '50%',
                        background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(255,255,255,0.3)',
                        color: '#fff', cursor: 'pointer', fontSize: '14px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        lineHeight: 1,
                      }}
                    >
                      &times;
                    </button>
                    <div style={{
                      position: 'absolute', bottom: 0, left: 0, right: 0,
                      background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                      padding: '4px 6px',
                    }}>
                      <span style={{ color: '#fff', fontSize: '0.65rem', fontFamily: font, display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {img.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.8rem', fontFamily: font }}>
              {uploadedImages.length}/{maxImages} images uploaded
            </p>

            <Nav back={() => setStep(4)} next={() => setStep(6)} />
            <style>{`
              @keyframes spin { to { transform: rotate(360deg) } }
              @media (max-width: 640px) {
                .syt-nav-links { display: none !important; }
              }
            `}</style>
          </>
          )
        })()}

        {/* Step 6: Email gate, then site preview */}
        {step === 6 && !gateEmail && (
          <>
            <h1 style={heading}>Where should we send your preview?</h1>
            <p style={{ fontFamily: font, fontSize: '0.95rem', color: 'rgba(255,255,255,0.75)', marginBottom: '2rem', lineHeight: 1.5 }}>
              We are building it now. Leave your email and it is yours whether or not you go any further.
            </p>
            <form onSubmit={handleSubmitGateEmail} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div>
                <input
                  type="email"
                  required
                  autoComplete="email"
                  autoFocus
                  placeholder="your@email.com"
                  style={inputStyle}
                />
              </div>

              {/* Honeypot field — hidden from real users */}
              <input
                type="text"
                value={gateHoneypot}
                onChange={(e) => setGateHoneypot(e.target.value)}
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
              />

              {gateError && (
                <p style={{ color: '#fca5a5', fontSize: '0.9rem', fontFamily: font, margin: '0' }}>
                  {gateError}
                </p>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  type="submit"
                  disabled={gateSubmitting}
                  style={{ ...btnPrimary, opacity: gateSubmitting ? 0.4 : 1, cursor: gateSubmitting ? 'not-allowed' : 'pointer' }}
                >
                  {gateSubmitting ? 'Saving…' : 'Build my preview'}
                </button>
              </div>
            </form>
          </>
        )}

        {step === 6 && gateEmail && (
          <>
            <h1 style={{ ...heading, fontSize: 'clamp(1.5rem, 3vw, 2rem)', textAlign: 'center', marginBottom: '1rem' }}>
              Here&apos;s a preview of your site&apos;s Homepage.
            </h1>
            {previewHtml && !previewLoading && (
              <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.85)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '1rem', fontFamily: font }}>
                Click the preview to open in a new tab
              </p>
            )}
            <div
              onClick={() => {
                if (previewHtml && !previewLoading) {
                  const blob = new Blob([previewHtml], { type: 'text/html' })
                  const url = URL.createObjectURL(blob)
                  window.open(url, '_blank')
                }
              }}
              style={{
                width: '100%',
                margin: '0 auto 2rem',
                height: '360px',
                backgroundColor: 'rgba(255,255,255,0.05)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(20px)',
                position: 'relative',
                cursor: previewHtml && !previewLoading ? 'pointer' : 'default',
              }}
            >
              {previewLoading && (
                <div style={{ textAlign: 'center', width: '80%', maxWidth: '400px' }}>
                  <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1rem', fontFamily: font, marginBottom: '1rem', fontWeight: 500 }}>
                    {previewProgress < 30 ? 'Finding images for your site...' :
                     previewProgress < 70 ? 'Designing your website...' :
                     previewProgress < 90 ? 'Adding finishing touches...' :
                     'Almost there...'}
                  </p>
                  <div style={{
                    width: '100%', height: '8px', backgroundColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '4px', overflow: 'hidden',
                  }}>
                    <div style={{
                      width: `${previewProgress}%`, height: '100%',
                      background: 'linear-gradient(90deg, #7c3aed, #a78bfa)',
                      borderRadius: '4px',
                      transition: 'width 0.3s ease-out',
                    }} />
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', fontFamily: font, marginTop: '0.5rem' }}>
                    {previewProgress}%
                  </p>
                </div>
              )}
              {previewHtml && !previewLoading && (
                <iframe
                  srcDoc={previewHtml}
                  title={`Site preview for ${businessName}`}
                  referrerPolicy="no-referrer"
                  style={{
                    width: '200%',
                    height: '400%',
                    border: 'none',
                    borderRadius: '0',
                    transform: 'scale(0.5)',
                    transformOrigin: 'top left',
                    pointerEvents: 'none',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                  }}
                />
              )}
              {previewError && !previewLoading && (
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.95rem', fontFamily: font }}>
                  Preview unavailable — but you can still continue.
                </p>
              )}
            </div>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button
                onClick={() => { setPreviewVerdict('loved'); setStep(7) }}
                style={{ ...btnPrimary, display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                I love it
              </button>
              <button
                onClick={() => { setPreviewVerdict('not_quite'); setStep(7) }}
                style={{ ...btnPrimary, backgroundColor: 'transparent', border: '1px solid rgba(255,255,255,0.3)' }}
              >
                Not quite right
              </button>
            </div>

            {/* Expanded preview modal */}
          </>
        )}

        {/* Step 7: Contact info */}
        {step === 7 && !contactSubmitted && (
          <>
            <h1 style={heading}>
              {previewVerdict === 'not_quite' ? 'How can we improve?' : 'Last step — how do we reach you?'}
            </h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '1rem' }}>
              <div>
                <p style={label}>Full Name *</p>
                <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} autoFocus style={inputStyle} />
              </div>
              <div>
                <p style={label}>Email</p>
                <p style={{ fontFamily: font, fontSize: '1rem', color: '#fff', margin: '0.5rem 0 0 0', paddingBottom: '0.5rem', borderBottom: '1.5px solid rgba(255,255,255,0.3)' }}>
                  {gateEmail}
                </p>
                <button
                  onClick={() => {
                    setGateEmail('')
                    setLeadId(null)
                    if (typeof window !== 'undefined') {
                      sessionStorage.removeItem('ms-lead-email')
                      sessionStorage.removeItem('ms-lead-id')
                    }
                    setStep(6)
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'rgba(255,255,255,0.5)',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    fontFamily: font,
                    padding: '0.25rem 0',
                    marginTop: '0.5rem',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
                >
                  Not you?
                </button>
              </div>
              <div>
                <p style={label}>Phone (optional)</p>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} style={inputStyle} />
              </div>
              <div>
                <p style={label}>
                  {previewVerdict === 'not_quite' ? 'Let us know' : 'A bit about your website (optional)'}
                </p>
                <textarea
                  value={projectInfo}
                  onChange={(e) => setProjectInfo(e.target.value)}
                  rows={3}
                  style={{ ...inputStyle, fontSize: '1rem', resize: 'vertical', borderBottom: '1.5px solid rgba(255,255,255,0.5)' }}
                />
              </div>
            </div>
            {submitError && (
              <p style={{ color: '#fca5a5', fontSize: '0.9rem', fontFamily: font, marginTop: '1rem' }}>
                {submitError}
              </p>
            )}
            <Nav
              back={() => setStep(6)}
              next={handleSubmitContact}
              nextLabel={submitting ? 'Sending…' : 'Send →'}
              disabled={submitting || !fullName.trim() || !gateEmail.trim()}
            />
          </>
        )}

        {/* Step 7: Confirmation */}
        {step === 7 && contactSubmitted && (
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ ...heading, fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              We&apos;ll be in touch.
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1rem', lineHeight: 1.6, maxWidth: '420px', margin: '0 auto' }}>
              Thanks {fullName.split(' ')[0]}. We&apos;ll review your preview and reach out to {gateEmail} shortly.
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
