'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useParams } from 'next/navigation'
import NavBar from '../../../components/site/NavBar'
import PageEditorModal, { type PageSection } from '../../../components/site/PageEditorModal'
import { sortedBusinessTypes } from '../../../constants/business-types'
import type { Brief, PageSelection, SocialHandles } from '../../../types'
import { isValidEmail, normalizePhone, EMAIL_ERROR, PHONE_ERROR } from '../../../lib/validation'

const font = 'var(--font-source-sans), "Source Sans 3", sans-serif'

// ── Shared style helpers ────────────────────────────────────────────────────

const sectionLabel: React.CSSProperties = {
  fontSize: '0.75rem',
  fontWeight: 600,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.7)',
  fontFamily: font,
  marginBottom: '0.75rem',
}

const sectionHeading: React.CSSProperties = {
  fontWeight: 200,
  fontSize: 'clamp(2rem, 4vw, 3rem)',
  color: '#fff',
  margin: '0 0 0.5rem',
  fontFamily: font,
  borderLeft: '4px solid rgba(100,140,255,0.6)',
  paddingLeft: '1rem',
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid rgba(255,255,255,0.2)',
  color: '#fff',
  fontSize: '1rem',
  fontWeight: 300,
  padding: '0.6rem 0',
  outline: 'none',
  fontFamily: font,
}

const labelStyle: React.CSSProperties = {
  fontSize: '0.7rem',
  fontWeight: 600,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.75)',
  marginBottom: '0.35rem',
  display: 'block',
  fontFamily: font,
}

const glassCard: React.CSSProperties = {
  border: '1px solid rgba(255,255,255,0.15)',
  borderRadius: '12px',
  backdropFilter: 'blur(8px)',
  backgroundColor: 'rgba(255,255,255,0.03)',
  padding: '2rem',
}

const pillBase: React.CSSProperties = {
  borderRadius: '9999px',
  padding: '0.6rem 1.25rem',
  fontSize: '0.8rem',
  fontWeight: 600,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  cursor: 'pointer',
  fontFamily: font,
  transition: 'all 0.2s',
  border: '1px solid rgba(255,255,255,0.25)',
  background: 'transparent',
  color: 'rgba(255,255,255,0.8)',
}

const subDesc: React.CSSProperties = {
  fontSize: '0.95rem',
  color: 'rgba(255,255,255,0.85)',
  lineHeight: 1.6,
  margin: '0 0 2.5rem',
  fontFamily: font,
}

// ── Option lists ────────────────────────────────────────────────────────────

const DEFAULT_PAGES = [
  'Home', 'About', 'Services', 'Products', 'Contact',
  'Portfolio', 'Blog', 'FAQ', 'Testimonials', 'Pricing',
]

const STYLE_OPTIONS = [
  'Clean & Minimal', 'Bold & Modern', 'Elegant & Luxury', 'Playful & Friendly',
  'Industrial & Raw', 'Natural & Organic', 'Tech & Futuristic', 'Classic & Traditional',
]
const TONE_OPTIONS = [
  'Professional', 'Friendly & Warm', 'Playful', 'Luxurious', 'Technical', 'Bold & Direct',
]
// Was a 10-item list of its own that bottomed out at "Other" for anything not a
// restaurant, retailer, agency or trade. Uses the same 153 types as the intake
// form now, so a vet or an optician can actually name themselves.
const BUSINESS_TYPE_OPTIONS = sortedBusinessTypes.map((t) => t.name)

// South Africa only.
const REGION_OPTIONS = [
  'Cape Town', 'Johannesburg', 'Durban', 'Pretoria', 'Gqeberha',
  'Bloemfontein', 'East London', 'Mbombela', 'Polokwane', 'Kimberley',
  'Stellenbosch', 'George', 'Pietermaritzburg', 'Rustenburg', 'Other',
]
const CTA_OPTIONS = [
  'Book a Call', 'Buy Online', 'Get a Quote', 'Sign Up', 'Visit in Person', 'Learn More',
]

// ── Types ───────────────────────────────────────────────────────────────────

interface ServiceItem {
  name: string
  description: string
}

interface ReferenceSiteEntry {
  url: string
  notes: string
}

// ── Component ───────────────────────────────────────────────────────────────

export default function BriefPage() {
  const { id } = useParams<{ id: string }>()

  // Data state
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [brief, setBrief] = useState<Brief | null>(null)
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'error' | 'idle'>('idle')

  // Section 01: Business Details
  const [businessName, setBusinessName] = useState('')
  const [businessType, setBusinessType] = useState('')
  const [style, setStyle] = useState('')
  const [region, setRegion] = useState('')
  const [tagline, setTagline] = useState('')
  const [tone, setTone] = useState('')
  const [primaryColour, setPrimaryColour] = useState('#6C5CE7')
  const [secondaryColour, setSecondaryColour] = useState('#00CEC9')
  const [noColours, setNoColours] = useState(false)
  const [contentVisualRatio, setContentVisualRatio] = useState(50)

  // Section 02: Target Audience & Goals
  const [targetAudience, setTargetAudience] = useState('')
  const [ctaGoals, setCtaGoals] = useState<string[]>([])

  // Section 03: Pages
  const [selectedPages, setSelectedPages] = useState<PageSelection[]>([
    { name: 'Home', sections: 3, is_custom: false },
  ])
  const [pageSectionsData, setPageSectionsData] = useState<Record<string, PageSection[]>>({})
  const [services, setServices] = useState<ServiceItem[]>([{ name: '', description: '' }])

  // Section 04: Brand, Social & Contact
  const [socialHandles, setSocialHandles] = useState<SocialHandles>({})
  const [extraSocials, setExtraSocials] = useState<string[]>([])
  const [contactEmail, setContactEmail] = useState('')
  const [contactPhone, setContactPhone] = useState('')
  const [contactAddress, setContactAddress] = useState('')
  const [businessHours, setBusinessHours] = useState('')
  const [contactEmailError, setContactEmailError] = useState('')
  const [contactPhoneError, setContactPhoneError] = useState('')
  const [contactTouched, setContactTouched] = useState({ email: false, phone: false })

  // Section 05: Additional Details
  const [additionalNotes, setAdditionalNotes] = useState('')
  const [referenceSites, setReferenceSites] = useState<ReferenceSiteEntry[]>([
    { url: '', notes: '' }, { url: '', notes: '' }, { url: '', notes: '' },
  ])

  // Decision
  const [decisionStatus, setDecisionStatus] = useState<'proceed' | 'not_ready' | null>(null)

  // UI state
  const [editingPage, setEditingPage] = useState<string | null>(null)
  const [customPageName, setCustomPageName] = useState('')

  // Debounce timer ref
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // ── Load brief data ─────────────────────────────────────────────────────

  useEffect(() => {
    if (!id) return
    fetch(`/api/briefs/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error(`${r.status}`)
        return r.json()
      })
      .then((res) => {
        if (!res.success) {
          setError(res.error || 'Brief not found')
          setLoading(false)
          return
        }
        const b: Brief = res.data.brief
        const lead = res.data.lead
        setBrief(b)

        // Business details — brief fields with lead fallbacks
        setBusinessName(b.business_name || lead?.business_name || '')
        setBusinessType(b.business_type || lead?.business_type || '')
        setStyle(b.style || lead?.style || '')
        setRegion(b.region || lead?.region || '')

        // Colours — from brief, then lead, then defaults
        const pc = b.primary_colour || lead?.primary_colour
        const sc = b.secondary_colour || lead?.secondary_colour
        if (pc) setPrimaryColour(pc)
        if (sc) setSecondaryColour(sc)
        if (!pc && !sc) setNoColours(true)

        // Content-visual ratio — from lead (not stored in brief)
        if (lead?.content_visual_ratio != null) {
          setContentVisualRatio(lead.content_visual_ratio)
        }

        // Pages — brief pages, then lead pages_selected
        if (b.pages && b.pages.length > 0) {
          setSelectedPages(b.pages)
        } else if (lead?.pages_selected && lead.pages_selected.length > 0) {
          setSelectedPages(lead.pages_selected)
        }

        // Social handles
        if (b.social_handles) setSocialHandles(b.social_handles)

        // Reference sites
        if (b.reference_sites) {
          const sites = b.reference_sites.map((url: string) => ({ url, notes: '' }))
          while (sites.length < 3) sites.push({ url: '', notes: '' })
          setReferenceSites(sites)
        }

        if (b.additional_notes) setAdditionalNotes(b.additional_notes)

        // New brief fields
        if (b.tagline) setTagline(b.tagline)
        if (b.tone) setTone(b.tone)
        if (b.target_audience) setTargetAudience(b.target_audience)
        if (b.cta_goals && b.cta_goals.length > 0) setCtaGoals(b.cta_goals)
        if (b.services && b.services.length > 0) setServices(b.services)
        if (b.page_sections_data) setPageSectionsData(b.page_sections_data as Record<string, PageSection[]>)
        if (b.contact_address) setContactAddress(b.contact_address)
        if (b.business_hours) setBusinessHours(b.business_hours)
        if (b.content_visual_ratio != null) setContentVisualRatio(b.content_visual_ratio)

        // Reference site notes — merge back into referenceSites entries
        if (b.reference_site_notes) {
          const notes = b.reference_site_notes as Record<string, string>
          setReferenceSites((prev) => prev.map((r) => ({ ...r, notes: notes[r.url] || r.notes })))
        }

        // Contact details — brief > lead
        setContactEmail(b.contact_email || lead?.email || '')
        setContactPhone(b.contact_phone || lead?.phone || '')

        // Restore extra social fields if values exist
        const extras: string[] = []
        if (b.social_handles?.twitter) extras.push('twitter')
        if (b.social_handles?.linkedin) extras.push('linkedin')
        if (b.social_handles?.tiktok) extras.push('tiktok')
        setExtraSocials(extras)
        setLoading(false)
      })
      .catch(() => {
        // Preview mode — render page with defaults so it can be tested without API
        setLoading(false)
      })
  }, [id])

  // ── Auto-save ───────────────────────────────────────────────────────────

  const autosave = useCallback(() => {
    if (!id) return
    setSaveStatus('saving')
    const refNotes: Record<string, string> = {}
    referenceSites.forEach((r) => { if (r.url && r.notes) refNotes[r.url] = r.notes })

    const payload: Record<string, unknown> = {
      business_name: businessName,
      business_type: businessType,
      style,
      region,
      primary_colour: noColours ? null : primaryColour,
      secondary_colour: noColours ? null : secondaryColour,
      pages: selectedPages,
      social_handles: socialHandles,
      reference_sites: referenceSites.map((r) => r.url).filter(Boolean),
      reference_site_notes: refNotes,
      additional_notes: additionalNotes,
      tagline,
      tone,
      target_audience: targetAudience,
      cta_goals: ctaGoals,
      services: services.filter((s) => s.name),
      page_sections_data: pageSectionsData,
      contact_email: contactEmail,
      contact_phone: contactPhone,
      contact_address: contactAddress,
      business_hours: businessHours,
      content_visual_ratio: contentVisualRatio,
    }
    fetch(`/api/briefs/${id}/autosave`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then((r) => r.json())
      .then((res) => {
        setSaveStatus(res.success ? 'saved' : 'error')
        if (res.success && res.data?.brief) setBrief(res.data.brief)
      })
      .catch(() => setSaveStatus('error'))
  }, [id, businessName, businessType, style, region, primaryColour, secondaryColour, noColours, selectedPages, socialHandles, referenceSites, additionalNotes, tagline, tone, targetAudience, ctaGoals, services, pageSectionsData, contactEmail, contactPhone, contactAddress, businessHours, contentVisualRatio])

  const debouncedSave = useCallback(() => {
    if (saveTimer.current) clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(autosave, 500)
  }, [autosave])

  // Trigger autosave on field changes (skip initial load)
  const isInitialLoad = useRef(true)
  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false
      return
    }
    if (!loading && brief) debouncedSave()
  }, [businessName, businessType, style, region, primaryColour, secondaryColour, noColours, selectedPages, socialHandles, referenceSites, additionalNotes, tagline, tone, targetAudience, ctaGoals, services, pageSectionsData, contactEmail, contactPhone, contactAddress, businessHours, contentVisualRatio, debouncedSave, loading, brief])

  // ── Page toggles ────────────────────────────────────────────────────────

  const isPageSelected = (name: string) => selectedPages.some((p) => p.name === name)

  const togglePage = (name: string) => {
    if (name === 'Home') return
    if (isPageSelected(name)) {
      setSelectedPages((prev) => prev.filter((p) => p.name !== name))
    } else {
      setSelectedPages((prev) => [...prev, { name, sections: 3, is_custom: false }])
    }
  }

  const addCustomPage = () => {
    const trimmed = customPageName.trim()
    if (!trimmed || isPageSelected(trimmed)) return
    setSelectedPages((prev) => [...prev, { name: trimmed, sections: 3, is_custom: true }])
    setCustomPageName('')
  }

  // ── Page editor ─────────────────────────────────────────────────────────

  const handlePageSectionsSave = (pageName: string, sections: PageSection[]) => {
    setPageSectionsData((prev) => ({ ...prev, [pageName]: sections }))
    setSelectedPages((prev) =>
      prev.map((p) => (p.name === pageName ? { ...p, sections: Math.max(1, sections.length) } : p)),
    )
  }

  // ── Services ──────────────────────────────────────────────────────────────

  const addService = () => setServices((prev) => [...prev, { name: '', description: '' }])
  const removeService = (i: number) => setServices((prev) => prev.filter((_, idx) => idx !== i))
  const updateService = (i: number, field: keyof ServiceItem, value: string) => {
    setServices((prev) => prev.map((s, idx) => idx === i ? { ...s, [field]: value } : s))
  }

  // ── CTA toggles ──────────────────────────────────────────────────────────

  const toggleCta = (cta: string) => {
    setCtaGoals((prev) => prev.includes(cta) ? prev.filter((c) => c !== cta) : [...prev, cta])
  }

  // ── Pricing ─────────────────────────────────────────────────────────────


  // ── Summary stats ───────────────────────────────────────────────────────

  const totalSections = selectedPages.reduce((sum, p) => sum + p.sections, 0)
  const imageCount = Object.values(pageSectionsData).reduce(
    (sum, sections) => sum + sections.filter((s) => s.image_description).length,
    0,
  )
  const socialCount = Object.values(socialHandles).filter(Boolean).length

  // ── Submit ──────────────────────────────────────────────────────────────

  const handleSubmit = async (decision: 'proceed' | 'not_ready') => {
    setDecisionStatus(decision)
    if (!id) return

    await fetch(`/api/briefs/${id}/autosave`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ decision_status: decision }),
    })

    if (decision === 'proceed') {
      const res = await fetch(`/api/briefs/${id}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          business_name: businessName,
          business_type: businessType,
          style,
          primary_colour: noColours ? null : primaryColour,
          secondary_colour: noColours ? null : secondaryColour,
          pages: selectedPages,
          social_handles: socialHandles,
          reference_sites: referenceSites.map((r) => r.url).filter(Boolean),
          additional_notes: additionalNotes,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setBrief(data.data.brief)
      }
    }
  }

  // ── Social field helpers ────────────────────────────────────────────────

  const addSocialField = () => {
    const available = ['twitter', 'linkedin', 'tiktok'].filter(
      (s) => !extraSocials.includes(s),
    )
    if (available.length > 0) setExtraSocials((prev) => [...prev, available[0]])
  }

  const updateSocial = (key: keyof SocialHandles, value: string) => {
    setSocialHandles((prev) => ({ ...prev, [key]: value }))
  }

  // ── Reference sites ─────────────────────────────────────────────────────

  const updateRefSite = (i: number, field: keyof ReferenceSiteEntry, value: string) => {
    setReferenceSites((prev) => prev.map((r, idx) => idx === i ? { ...r, [field]: value } : r))
  }

  // ── Render ──────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: font, color: 'rgba(255,255,255,0.7)', backgroundColor: '#0a0a0f' }}>
        Loading brief...
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: font, color: 'rgba(255,100,100,0.8)', backgroundColor: '#0a0a0f' }}>
        {error}
      </div>
    )
  }

  const isSubmitted = brief?.status === 'submitted' || brief?.status === 'reviewed'

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

        {/* Save status indicator */}
        <div style={{
          position: 'fixed', top: '2rem', left: '50%', transform: 'translateX(-50%)', zIndex: 30,
          fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
          color: saveStatus === 'saving' ? 'rgba(255,255,255,0.7)' : saveStatus === 'saved' ? 'rgba(100,200,100,0.6)' : saveStatus === 'error' ? 'rgba(255,100,100,0.6)' : 'transparent',
          fontFamily: font, transition: 'color 0.3s',
        }}>
          {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? 'Saved' : saveStatus === 'error' ? 'Save failed' : ''}
        </div>

        {/* ═══════════════════════════════════════════════════════════════════
            HERO
           ═══════════════════════════════════════════════════════════════════ */}
        <section style={{ textAlign: 'center', padding: '12rem 2rem 6rem', maxWidth: '700px', margin: '0 auto' }}>
          <p style={{ ...sectionLabel, marginBottom: '1rem' }}>WEBSITE BRIEF</p>
          <h1 style={{ fontWeight: 200, fontSize: 'clamp(3rem, 6vw, 4.5rem)', color: '#fff', margin: '0 0 1rem', fontFamily: font }}>
            Your Brief.
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, margin: '0 0 3rem', fontFamily: font }}>
            Review and refine every detail of your website build. All changes auto-save.
          </p>
          <p style={{ ...sectionLabel, letterSpacing: '0.15em' }}>SCROLL TO EXPLORE ↓</p>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 01: BUSINESS DETAILS
           ═══════════════════════════════════════════════════════════════════ */}
        <section style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 2rem' }}>
          <p style={sectionLabel}>SECTION 01</p>
          <h2 style={sectionHeading}>Business Details</h2>
          <p style={subDesc}>Confirm the basics about your business.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '2.5rem' }}>
            <div>
              <label style={labelStyle}>Business Name</label>
              <input type="text" value={businessName} onChange={(e) => setBusinessName(e.target.value)} style={inputStyle} disabled={isSubmitted} />
            </div>
            <div>
              <label style={labelStyle}>Business Type</label>
              <select value={businessType} onChange={(e) => setBusinessType(e.target.value)} style={{ ...inputStyle, cursor: 'pointer', appearance: 'none' }} disabled={isSubmitted}>
                <option value="" style={{ backgroundColor: '#1a1a2e' }}>Select...</option>
                {BUSINESS_TYPE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt} style={{ backgroundColor: '#1a1a2e' }}>{opt}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Style Preference</label>
              <select value={style} onChange={(e) => setStyle(e.target.value)} style={{ ...inputStyle, cursor: 'pointer', appearance: 'none' }} disabled={isSubmitted}>
                <option value="" style={{ backgroundColor: '#1a1a2e' }}>Select...</option>
                {STYLE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt} style={{ backgroundColor: '#1a1a2e' }}>{opt}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Region</label>
              <select value={region} onChange={(e) => setRegion(e.target.value)} style={{ ...inputStyle, cursor: 'pointer', appearance: 'none' }} disabled={isSubmitted}>
                <option value="" style={{ backgroundColor: '#1a1a2e' }}>Select...</option>
                {REGION_OPTIONS.map((opt) => (
                  <option key={opt} value={opt} style={{ backgroundColor: '#1a1a2e' }}>{opt}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Tagline */}
          <div style={{ marginBottom: '2.5rem' }}>
            <label style={labelStyle}>Tagline / Slogan</label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="e.g. One conversation. Done."
              style={inputStyle}
              disabled={isSubmitted}
            />
          </div>

          {/* Tone of Voice */}
          <div style={{ marginBottom: '2.5rem' }}>
            <label style={labelStyle}>Tone of Voice</label>
            <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', margin: '0 0 0.75rem', fontFamily: font }}>
              How should your website sound?
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {TONE_OPTIONS.map((t) => {
                const active = tone === t
                return (
                  <button key={t} onClick={() => setTone(t)} disabled={isSubmitted} style={{
                    ...pillBase,
                    border: active ? '1px solid rgba(100,140,255,0.5)' : '1px solid rgba(255,255,255,0.2)',
                    backgroundColor: active ? 'rgba(100,140,255,0.12)' : 'transparent',
                    color: active ? 'rgba(200,220,255,0.9)' : 'rgba(255,255,255,0.7)',
                  }}>
                    {t}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Brand Colours */}
          <div style={{ marginBottom: '2.5rem' }}>
            <label style={labelStyle}>Brand Colours</label>
            <div style={{ display: 'flex', gap: '2.5rem', marginBottom: '1rem', opacity: noColours ? 0.3 : 1, pointerEvents: noColours ? 'none' : 'auto' }}>
              <div>
                <p style={{ ...labelStyle, fontSize: '0.65rem', marginBottom: '0.5rem' }}>Primary</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <input type="color" value={primaryColour} onChange={(e) => setPrimaryColour(e.target.value)} disabled={isSubmitted} style={{ width: '40px', height: '40px', border: 'none', borderRadius: '6px', cursor: 'pointer', background: 'none' }} />
                  <input type="text" value={primaryColour} onChange={(e) => setPrimaryColour(e.target.value)} disabled={isSubmitted} style={{ ...inputStyle, width: '100px', fontSize: '0.9rem' }} />
                </div>
              </div>
              <div>
                <p style={{ ...labelStyle, fontSize: '0.65rem', marginBottom: '0.5rem' }}>Secondary</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <input type="color" value={secondaryColour} onChange={(e) => setSecondaryColour(e.target.value)} disabled={isSubmitted} style={{ width: '40px', height: '40px', border: 'none', borderRadius: '6px', cursor: 'pointer', background: 'none' }} />
                  <input type="text" value={secondaryColour} onChange={(e) => setSecondaryColour(e.target.value)} disabled={isSubmitted} style={{ ...inputStyle, width: '100px', fontSize: '0.9rem' }} />
                </div>
              </div>
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={noColours} onChange={(e) => setNoColours(e.target.checked)} disabled={isSubmitted} style={{ accentColor: '#fff', width: '16px', height: '16px' }} />
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', fontFamily: font }}>I don&apos;t have colours yet — surprise me</span>
            </label>
          </div>

          {/* Content vs Visual ratio */}
          <div>
            <label style={labelStyle}>Content vs Visual Balance</label>
            <input
              type="range"
              min={0} max={100}
              value={contentVisualRatio}
              onChange={(e) => setContentVisualRatio(Number(e.target.value))}
              disabled={isSubmitted}
              style={{ width: '100%', accentColor: '#fff' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.4rem' }}>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem', fontFamily: font }}>Mostly Text</span>
              <span style={{ color: '#fff', fontSize: '0.8rem', fontWeight: 600, fontFamily: font }}>{contentVisualRatio}% Visual</span>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem', fontFamily: font }}>Mostly Images</span>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 02: TARGET AUDIENCE & GOALS
           ═══════════════════════════════════════════════════════════════════ */}
        <section style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 2rem' }}>
          <p style={sectionLabel}>SECTION 02</p>
          <h2 style={sectionHeading}>Target Audience & Goals</h2>
          <p style={subDesc}>Who is this website for and what should it achieve?</p>

          <div style={{ marginBottom: '2.5rem' }}>
            <label style={labelStyle}>Who are your ideal customers?</label>
            <textarea
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder="e.g. Young professionals aged 25-40 in Cape Town looking for premium home renovation services..."
              rows={4}
              style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.7 }}
              disabled={isSubmitted}
            />
          </div>

          <div>
            <label style={labelStyle}>What should visitors do on your site?</label>
            <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', margin: '0 0 0.75rem', fontFamily: font }}>
              Select all that apply.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {CTA_OPTIONS.map((cta) => {
                const active = ctaGoals.includes(cta)
                return (
                  <button key={cta} onClick={() => toggleCta(cta)} disabled={isSubmitted} style={{
                    ...pillBase,
                    border: active ? '1px solid rgba(100,140,255,0.5)' : '1px solid rgba(255,255,255,0.2)',
                    backgroundColor: active ? 'rgba(100,140,255,0.12)' : 'transparent',
                    color: active ? 'rgba(200,220,255,0.9)' : 'rgba(255,255,255,0.7)',
                  }}>
                    {active ? '✓ ' : '+ '}{cta}
                  </button>
                )
              })}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 03: PAGES & CONTENT
           ═══════════════════════════════════════════════════════════════════ */}
        <section style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 2rem' }}>
          <p style={sectionLabel}>SECTION 03</p>
          <h2 style={sectionHeading}>Pages & Content</h2>
          <p style={subDesc}>Select pages and define their content. Click a page card to edit its sections.</p>

          {/* Page toggle pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.5rem' }}>
            {DEFAULT_PAGES.map((name) => {
              const active = isPageSelected(name)
              const isHome = name === 'Home'
              return (
                <button key={name} onClick={() => togglePage(name)} disabled={isSubmitted} style={{
                  ...pillBase,
                  border: active ? '1px solid rgba(100,140,255,0.5)' : '1px solid rgba(255,255,255,0.2)',
                  backgroundColor: active ? 'rgba(100,140,255,0.12)' : 'transparent',
                  color: active ? 'rgba(200,220,255,0.9)' : 'rgba(255,255,255,0.7)',
                  opacity: isHome ? 0.8 : 1,
                }}>
                  {isHome ? '' : active ? '✓ ' : '+ '}{name}
                </button>
              )
            })}
          </div>

          {/* Add custom page */}
          {!isSubmitted && (
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '2.5rem' }}>
              <input
                type="text" value={customPageName}
                onChange={(e) => setCustomPageName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addCustomPage()}
                placeholder="Custom page name"
                style={{ ...inputStyle, maxWidth: '250px' }}
              />
              <button onClick={addCustomPage} style={{ ...pillBase, fontSize: '0.75rem', padding: '0.5rem 1rem', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.15)' }}>
                Add Custom Page +
              </button>
            </div>
          )}

          {/* Page cards grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
            {selectedPages.map((page) => (
              <div
                key={page.name}
                onClick={() => !isSubmitted && setEditingPage(page.name)}
                style={{ ...glassCard, padding: '1.25rem', cursor: isSubmitted ? 'default' : 'pointer', transition: 'all 0.2s' }}
                onMouseEnter={(e) => { if (!isSubmitted) e.currentTarget.style.borderColor = 'rgba(100,140,255,0.4)' }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)' }}
              >
                <h3 style={{ fontWeight: 300, fontSize: '1rem', color: '#fff', margin: '0 0 0.5rem', fontFamily: font }}>
                  {page.name}
                  {page.is_custom && <span style={{ fontSize: '0.65rem', color: 'rgba(100,140,255,0.6)', marginLeft: '0.5rem' }}>CUSTOM</span>}
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', margin: 0, fontFamily: font }}>
                  {page.sections} section{page.sections !== 1 ? 's' : ''}
                </p>
              </div>
            ))}
          </div>

          {/* Key Services / Products */}
          {(isPageSelected('Services') || isPageSelected('Products')) && (
            <div>
              <label style={labelStyle}>Key Services / Products</label>
              <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', margin: '0 0 1rem', fontFamily: font }}>
                List the main offerings that should appear on your site.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {services.map((svc, i) => (
                  <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                      <input
                        type="text" value={svc.name}
                        onChange={(e) => updateService(i, 'name', e.target.value)}
                        placeholder="Service / product name"
                        style={inputStyle}
                        disabled={isSubmitted}
                      />
                      <input
                        type="text" value={svc.description}
                        onChange={(e) => updateService(i, 'description', e.target.value)}
                        placeholder="Short description (1–2 sentences)"
                        style={{ ...inputStyle, fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', marginTop: '0.5rem' }}
                        disabled={isSubmitted}
                      />
                    </div>
                    {services.length > 1 && !isSubmitted && (
                      <button onClick={() => removeService(i)} style={{ background: 'none', border: 'none', color: 'rgba(255,100,100,0.5)', fontSize: '1.1rem', cursor: 'pointer', padding: '0.6rem 0 0' }}>✕</button>
                    )}
                  </div>
                ))}
              </div>
              {!isSubmitted && (
                <button onClick={addService} style={{ background: 'none', border: 'none', color: 'rgba(100,140,255,0.7)', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', fontFamily: font, padding: '0.75rem 0 0' }}>
                  + Add another
                </button>
              )}
            </div>
          )}
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 04: BRAND, SOCIAL & CONTACT
           ═══════════════════════════════════════════════════════════════════ */}
        <section style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 2rem' }}>
          <p style={sectionLabel}>SECTION 04</p>
          <h2 style={sectionHeading}>Brand, Social & Contact</h2>
          <p style={subDesc}>Your logo, social profiles, and contact information for the website.</p>

          {/* Logo upload zone (placeholder) */}
          <div style={{
            border: '1px dashed rgba(255,255,255,0.2)', borderRadius: '12px', padding: '2.5rem',
            textAlign: 'center', marginBottom: '2.5rem', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', fontFamily: font,
          }}>
            <p style={{ margin: '0 0 0.5rem', fontSize: '1.5rem' }}>◎</p>
            <p style={{ margin: 0 }}>Logo upload coming soon</p>
            <p style={{ margin: '0.25rem 0 0', fontSize: '0.75rem', color: 'rgba(255,255,255,0.25)' }}>PNG, SVG or JPEG — max 5MB</p>
          </div>

          {/* Social handles */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
            <div>
              <label style={labelStyle}>Instagram Handle</label>
              <input type="text" value={socialHandles.instagram || ''} onChange={(e) => updateSocial('instagram', e.target.value)} placeholder="@yourbusiness" style={inputStyle} disabled={isSubmitted} />
            </div>
            <div>
              <label style={labelStyle}>Facebook URL</label>
              <input type="text" value={socialHandles.facebook || ''} onChange={(e) => updateSocial('facebook', e.target.value)} placeholder="https://facebook.com/yourbusiness" style={inputStyle} disabled={isSubmitted} />
            </div>
            {extraSocials.includes('twitter') && (
              <div>
                <label style={labelStyle}>Twitter / X</label>
                <input type="text" value={socialHandles.twitter || ''} onChange={(e) => updateSocial('twitter', e.target.value)} placeholder="@handle" style={inputStyle} disabled={isSubmitted} />
              </div>
            )}
            {extraSocials.includes('linkedin') && (
              <div>
                <label style={labelStyle}>LinkedIn</label>
                <input type="text" value={socialHandles.linkedin || ''} onChange={(e) => updateSocial('linkedin', e.target.value)} placeholder="https://linkedin.com/company/..." style={inputStyle} disabled={isSubmitted} />
              </div>
            )}
            {extraSocials.includes('tiktok') && (
              <div>
                <label style={labelStyle}>TikTok</label>
                <input type="text" value={socialHandles.tiktok || ''} onChange={(e) => updateSocial('tiktok', e.target.value)} placeholder="@handle" style={inputStyle} disabled={isSubmitted} />
              </div>
            )}
            {!isSubmitted && extraSocials.length < 3 && (
              <button onClick={addSocialField} style={{ background: 'none', border: 'none', color: 'rgba(100,140,255,0.7)', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', fontFamily: font, textAlign: 'left', padding: 0 }}>
                + Add social link
              </button>
            )}
          </div>

          {/* Contact Details */}
          <div>
            <label style={{ ...labelStyle, marginBottom: '1rem' }}>Contact Details for Website</label>
            <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', margin: '-0.5rem 0 1.25rem', fontFamily: font }}>
              These will appear on your Contact page and footer.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              <div>
                <label style={labelStyle}>Email</label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  onBlur={() => {
                    setContactTouched({ ...contactTouched, email: true })
                    if (contactEmail.trim() && !isValidEmail(contactEmail)) {
                      setContactEmailError(EMAIL_ERROR)
                    } else {
                      setContactEmailError('')
                    }
                  }}
                  placeholder="hello@yourbusiness.com"
                  style={{
                    ...inputStyle,
                    borderBottomColor: contactEmailError && contactTouched.email ? '#ff6b6b' : undefined,
                  }}
                  disabled={isSubmitted}
                />
                {contactEmailError && contactTouched.email && (
                  <p style={{ fontSize: '0.75rem', color: '#ff6b6b', margin: '0.35rem 0 0', fontFamily: font, lineHeight: 1.5 }}>
                    {contactEmailError}
                  </p>
                )}
              </div>
              <div>
                <label style={labelStyle}>Phone</label>
                <input
                  type="tel"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  onBlur={() => {
                    setContactTouched({ ...contactTouched, phone: true })
                    if (contactPhone.trim() && !normalizePhone(contactPhone).ok) {
                      setContactPhoneError(PHONE_ERROR)
                    } else {
                      setContactPhoneError('')
                    }
                  }}
                  placeholder="+27 21 000 0000"
                  style={{
                    ...inputStyle,
                    borderBottomColor: contactPhoneError && contactTouched.phone ? '#ff6b6b' : undefined,
                  }}
                  disabled={isSubmitted}
                />
                {contactPhoneError && contactTouched.phone && (
                  <p style={{ fontSize: '0.75rem', color: '#ff6b6b', margin: '0.35rem 0 0', fontFamily: font, lineHeight: 1.5 }}>
                    {contactPhoneError}
                  </p>
                )}
              </div>
              <div>
                <label style={labelStyle}>Address</label>
                <input type="text" value={contactAddress} onChange={(e) => setContactAddress(e.target.value)} placeholder="123 Main Rd, Cape Town" style={inputStyle} disabled={isSubmitted} />
              </div>
              <div>
                <label style={labelStyle}>Business Hours</label>
                <input type="text" value={businessHours} onChange={(e) => setBusinessHours(e.target.value)} placeholder="Mon–Fri 9am–5pm" style={inputStyle} disabled={isSubmitted} />
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 05: ADDITIONAL DETAILS
           ═══════════════════════════════════════════════════════════════════ */}
        <section style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 2rem' }}>
          <p style={sectionLabel}>SECTION 05</p>
          <h2 style={sectionHeading}>Additional Details</h2>
          <p style={subDesc}>Anything else we should know.</p>

          <div style={{ marginBottom: '2.5rem' }}>
            <label style={labelStyle}>Final Instructions</label>
            <textarea
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              placeholder="Any specific requirements, preferences, or instructions..."
              rows={5}
              style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.7 }}
              disabled={isSubmitted}
            />
          </div>

          <div>
            <label style={labelStyle}>Reference Websites</label>
            <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', margin: '0 0 1rem', fontFamily: font }}>
              Websites you like — and what you like or dislike about them.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {referenceSites.map((ref, i) => (
                <div key={i}>
                  <input
                    type="url" value={ref.url}
                    onChange={(e) => updateRefSite(i, 'url', e.target.value)}
                    placeholder={`https://example${i + 1}.com`}
                    style={inputStyle}
                    disabled={isSubmitted}
                  />
                  <input
                    type="text" value={ref.notes}
                    onChange={(e) => updateRefSite(i, 'notes', e.target.value)}
                    placeholder="What do you like / dislike about this site?"
                    style={{ ...inputStyle, fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', marginTop: '0.35rem', borderBottomColor: 'rgba(255,255,255,0.1)' }}
                    disabled={isSubmitted}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 06: REVIEW & NEXT STEPS
           ═══════════════════════════════════════════════════════════════════ */}
        <section style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 2rem 8rem' }}>
          <p style={sectionLabel}>SECTION 06</p>
          <h2 style={sectionHeading}>Review & Next Steps</h2>
          <p style={subDesc}>Summary of your brief. We&apos;ll quote on it directly.</p>

          {/* Summary card */}
          <div style={{ ...glassCard, marginBottom: '1.5rem' }}>
            <h3 style={{ fontWeight: 300, fontSize: '1.1rem', color: '#fff', margin: '0 0 1.5rem', fontFamily: font }}>Summary</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              {[
                ['Business', businessName || '—'],
                ['Type', businessType || '—'],
                ['Style', style || '—'],
                ['Tone', tone || '—'],
                ['Region', region || '—'],
                ['Pages', `${selectedPages.length}`],
                ['Total Sections', `${totalSections}`],
                ['Services Listed', `${services.filter((s) => s.name).length}`],
                ['Images Described', `${imageCount}`],
                ['Social Links', `${socialCount}`],
                ['CTA Goals', ctaGoals.length > 0 ? ctaGoals.join(', ') : '—'],
                ['Tagline', tagline || '—'],
              ].map(([label, value]) => (
                <div key={label}>
                  <p style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', margin: '0 0 0.25rem', fontFamily: font }}>{label}</p>
                  <p style={{ fontSize: '1rem', color: '#fff', margin: 0, fontWeight: 300, fontFamily: font }}>{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Decision cards */}
          {!isSubmitted && (
            <>
              <h3 style={{ fontWeight: 200, fontSize: '1.5rem', color: '#fff', margin: '0 0 1.5rem', textAlign: 'center', fontFamily: font }}>
                Ready to proceed?
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                <button
                  onClick={() => handleSubmit('proceed')}
                  disabled={decisionStatus !== null}
                  style={{
                    ...glassCard, cursor: decisionStatus !== null ? 'default' : 'pointer', textAlign: 'center',
                    border: decisionStatus === 'proceed' ? '1px solid rgba(100,200,100,0.5)' : '1px solid rgba(100,140,255,0.3)',
                    backgroundColor: decisionStatus === 'proceed' ? 'rgba(100,200,100,0.08)' : 'rgba(100,140,255,0.05)',
                    transition: 'all 0.3s',
                  }}
                >
                  <h4 style={{ fontWeight: 300, fontSize: '1.1rem', color: '#fff', margin: '0 0 0.5rem', fontFamily: font }}>
                    {decisionStatus === 'proceed' ? '✓ Submitted' : 'Proceed'}
                  </h4>
                  <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', margin: 0, fontFamily: font }}>Pay deposit & book review meeting</p>
                </button>
                <button
                  onClick={() => handleSubmit('not_ready')}
                  disabled={decisionStatus !== null}
                  style={{
                    ...glassCard, cursor: decisionStatus !== null ? 'default' : 'pointer', textAlign: 'center',
                    border: decisionStatus === 'not_ready' ? '1px solid rgba(255,200,100,0.4)' : '1px solid rgba(255,255,255,0.15)',
                    backgroundColor: decisionStatus === 'not_ready' ? 'rgba(255,200,100,0.06)' : 'rgba(255,255,255,0.03)',
                    transition: 'all 0.3s',
                  }}
                >
                  <h4 style={{ fontWeight: 300, fontSize: '1.1rem', color: '#fff', margin: '0 0 0.5rem', fontFamily: font }}>
                    {decisionStatus === 'not_ready' ? '✓ Noted' : 'Not Ready Yet'}
                  </h4>
                  <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', margin: 0, fontFamily: font }}>Book a follow-up call to discuss</p>
                </button>
              </div>
            </>
          )}

          {isSubmitted && (
            <div style={{ ...glassCard, textAlign: 'center', border: '1px solid rgba(100,200,100,0.3)', backgroundColor: 'rgba(100,200,100,0.05)' }}>
              <h3 style={{ fontWeight: 200, fontSize: '1.5rem', color: '#fff', margin: '0 0 0.5rem', fontFamily: font }}>Brief Submitted</h3>
              <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', margin: 0, fontFamily: font }}>
                Thank you! We&apos;ll review your brief and be in touch shortly.
              </p>
            </div>
          )}
        </section>
      </div>

      {/* Page Editor Modal */}
      {editingPage && (
        <PageEditorModal
          pageName={editingPage}
          sections={pageSectionsData[editingPage] || []}
          onSave={(sections) => handlePageSectionsSave(editingPage, sections)}
          onClose={() => setEditingPage(null)}
        />
      )}
    </div>
  )
}
