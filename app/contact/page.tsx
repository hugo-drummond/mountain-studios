'use client'

import { useState } from 'react'
import { executeRecaptcha, prewarmRecaptcha } from '@/lib/recaptcha-client'
import PageShell from '@/components/site/PageShell'
import { trackMeta } from '@/lib/analytics'
import { isValidEmail, normalizePhone, EMAIL_ERROR, PHONE_ERROR } from '@/lib/validation'

const WHATSAPP_NUMBER = '27645322093'
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [emailError, setEmailError] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [touched, setTouched] = useState({ email: false, phone: false })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setEmailError('')
    setPhoneError('')

    // Validate email
    if (!isValidEmail(formData.email)) {
      setEmailError(EMAIL_ERROR)
      setTouched({ ...touched, email: true })
      return
    }

    // Validate phone if provided
    if (formData.phone.trim()) {
      const phoneResult = normalizePhone(formData.phone)
      if (!phoneResult.ok) {
        setPhoneError(PHONE_ERROR)
        setTouched({ ...touched, phone: true })
        return
      }
    }

    // Validate message length
    if (formData.message.trim().length < 10) {
      setError('Message must be at least 10 characters.')
      return
    }

    setLoading(true)

    // Honeypot check
    const isBot = honeypot.trim() !== ''
    if (isBot) {
      setLoading(false)
      setSubmitted(true)
      return
    }

    try {
      let recaptchaToken: string | undefined
      if (executeRecaptcha) {
        try {
          recaptchaToken = await Promise.race([
            executeRecaptcha('contact_submit'),
            new Promise<undefined>((resolve) => setTimeout(() => resolve(undefined), 5000)),
          ])
        } catch {
          // reCAPTCHA failure is not critical
        }
      }

      const res = await fetch('/api/contact/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          recaptchaToken,
          website: honeypot,
        }),
      })

      const data = await res.json().catch(() => null)

      if (res.ok) {
        setSubmitted(true)
        setFormData({ name: '', email: '', phone: '', message: '' })
        trackMeta('Contact', { content_name: 'Contact form' })
      } else {
        // The route returns a usable sentence for every rejection it makes.
        // Replacing it with "something went wrong" leaves someone with a typo
        // no way to work out what to change.
        setError(
          typeof data?.error === 'string' ? data.error : 'Something went wrong. Please try again.',
        )
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const CircleIcon = ({ children }: { children: React.ReactNode }) => (
    <div style={{
      width: '44px',
      height: '44px',
      borderRadius: '50%',
      background: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 8px 16px -8px rgba(26,26,46,0.15)',
      flexShrink: 0,
    }}>
      {children}
    </div>
  )

  return (
    <PageShell
      eyebrow="CONTACT"
      title={<>Talk to <em style={{ fontStyle: 'italic' }}>a real</em> person.</>}
      sub="WhatsApp is fastest. Email works too."
    >
      <div style={{
        background: '#f4f2fa',
        padding: '4rem 2rem',
      }}>
        {/* MAIN CONTACT SECTION */}
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto 4rem',
          background: '#fff',
          borderRadius: '14px',
          boxShadow: '0 18px 40px -22px rgba(26,26,46,0.35)',
          display: 'grid',
          gridTemplateColumns: '1fr 1.1fr',
          gap: 0,
        }} className="page-shell-grid contact-card-grid">
          {/* LEFT COLUMN - CONTACT INFO */}
          <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
            {/* INFO ROWS — kept together and pushed to the bottom, level with the form's textarea */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: '2rem', paddingBottom: '0.5rem' }}>
            {/* WhatsApp */}
            <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'flex-start' }}>
              <CircleIcon>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#1a1a2e">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
                </svg>
              </CircleIcon>
              <div>
                <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#1a1a2e', margin: '0 0 0.4rem' }}>WHATSAPP</p>
                <p style={{ fontSize: '1rem', color: '#5d6478', margin: 0 }}>Message us — fastest reply</p>
              </div>
            </div>

            {/* EMAIL */}
            <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'flex-start' }}>
              <CircleIcon>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1a1a2e" strokeWidth="1.5">
                  <path d="M3 8l9 5 9-5M3 8v10a2 2 0 002 2h14a2 2 0 002-2V8m0 0l-9 5-9-5" />
                </svg>
              </CircleIcon>
              <div>
                <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#1a1a2e', margin: '0 0 0.4rem' }}>EMAIL</p>
                <a href="mailto:hello@mountainstudios.co.za" style={{ fontSize: '1rem', color: '#5d6478', margin: 0, textDecoration: 'none' }}>hello@mountainstudios.co.za</a>
              </div>
            </div>

            {/* HOURS */}
            <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'flex-start' }}>
              <CircleIcon>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1a1a2e" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </svg>
              </CircleIcon>
              <div>
                <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#1a1a2e', margin: '0 0 0.4rem' }}>HOURS</p>
                <p style={{ fontSize: '1rem', color: '#5d6478', margin: 0 }}>Mon–Fri 9:00–17:00 SAST</p>
              </div>
            </div>

            </div>

            {/* WHATSAPP BUTTON */}
            <a href={WHATSAPP_URL} style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              background: '#7d3d4f',
              color: '#fff',
              padding: '0.9rem 1.6rem',
              borderRadius: '999px',
              textDecoration: 'none',
              fontSize: '0.85rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginTop: 'auto',
              alignSelf: 'flex-start',
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
              </svg>
              MESSAGE US ON WHATSAPP
            </a>
          </div>

          {/* RIGHT COLUMN - FORM */}
          <div className="contact-form-col" style={{
            borderLeft: '1px solid #e3e0ea',
            paddingLeft: '2rem',
            paddingRight: '2rem',
            paddingTop: '2rem',
            paddingBottom: '2rem',
          }}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                  <p style={{ fontSize: '1rem', color: '#5d6478', margin: 0 }}>Thanks — we'll reply within one business day.</p>
                </div>
              ) : (
                <form onFocusCapture={() => prewarmRecaptcha()} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {error && (
                    <p style={{
                      fontSize: '0.9rem',
                      color: '#dc2626',
                      margin: '0 0 0.5rem',
                    }}>
                      {error}
                    </p>
                  )}
                  <input
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      border: '1px solid #e3e0ea',
                      borderRadius: '999px',
                      padding: '0.85rem 1.2rem',
                      fontSize: '0.95rem',
                      outline: 'none',
                      fontFamily: 'inherit',
                    }}
                  />
                  <div>
                    <input
                      type="email"
                      placeholder="Your email"
                      value={formData.email}
                      onChange={(e) => {
                        const value = e.target.value
                        setFormData({ ...formData, email: value })
                        if (emailError && isValidEmail(value)) setEmailError('')
                      }}
                      onBlur={() => {
                        setTouched({ ...touched, email: true })
                        if (formData.email.trim() && !isValidEmail(formData.email)) {
                          setEmailError(EMAIL_ERROR)
                        } else {
                          setEmailError('')
                        }
                      }}
                      style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        border: emailError && touched.email ? '1px solid #dc2626' : '1px solid #e3e0ea',
                        borderRadius: '999px',
                        padding: '0.85rem 1.2rem',
                        fontSize: '0.95rem',
                        outline: 'none',
                        fontFamily: 'inherit',
                      }}
                    />
                    {emailError && touched.email && (
                      <p style={{ fontSize: '0.85rem', color: '#dc2626', margin: '0.35rem 0 0', marginLeft: '1.2rem' }}>
                        {emailError}
                      </p>
                    )}
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="Your contact number"
                      value={formData.phone}
                      onChange={(e) => {
                        const value = e.target.value
                        setFormData({ ...formData, phone: value })
                        if (phoneError && (!value.trim() || normalizePhone(value).ok)) setPhoneError('')
                      }}
                      onBlur={() => {
                        setTouched({ ...touched, phone: true })
                        if (formData.phone.trim() && !normalizePhone(formData.phone).ok) {
                          setPhoneError(PHONE_ERROR)
                        } else {
                          setPhoneError('')
                        }
                      }}
                      style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        border: phoneError && touched.phone ? '1px solid #dc2626' : '1px solid #e3e0ea',
                        borderRadius: '999px',
                        padding: '0.85rem 1.2rem',
                        fontSize: '0.95rem',
                        outline: 'none',
                        fontFamily: 'inherit',
                      }}
                    />
                    {phoneError && touched.phone && (
                      <p style={{ fontSize: '0.85rem', color: '#dc2626', margin: '0.35rem 0 0', marginLeft: '1.2rem' }}>
                        {phoneError}
                      </p>
                    )}
                  </div>
                  <textarea
                    placeholder="How can we help?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{
                      border: '1px solid #e3e0ea',
                      borderRadius: '16px',
                      padding: '0.85rem 1.2rem',
                      fontSize: '0.95rem',
                      outline: 'none',
                      fontFamily: 'inherit',
                      minHeight: '120px',
                      resize: 'vertical',
                    }}
                  />
                  <input
                    type="text"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    style={{
                      position: 'absolute',
                      left: '-9999px',
                    }}
                    autoComplete="off"
                    aria-hidden="true"
                    tabIndex={-1}
                  />
                  <button type="submit" disabled={loading || !!(touched.email && emailError) || !!(touched.phone && phoneError)} style={{
                    background: '#7d3d4f',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '999px',
                    padding: '0.9rem 1.6rem',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    cursor: loading || !!(touched.email && emailError) || !!(touched.phone && phoneError) ? 'not-allowed' : 'pointer',
                    opacity: loading || !!(touched.email && emailError) || !!(touched.phone && phoneError) ? 0.7 : 1,
                    alignSelf: 'flex-start',
                  }}>
                    {loading ? 'Sending…' : 'SEND MESSAGE →'}
                  </button>
                </form>
              )}
            </div>
        </div>

        <style>{`
          @media (max-width: 767px) {
            .contact-card-grid {
              grid-template-columns: 1fr !important;
              gap: 0 !important;
            }
            .contact-form-col {
              border-left: none !important;
              border-top: 1px solid #e3e0ea;
              padding-left: 2rem !important;
              padding-right: 2rem !important;
              padding-top: 2rem !important;
              padding-bottom: 2rem !important;
            }
          }
        `}</style>
      </div>
    </PageShell>
  )
}
