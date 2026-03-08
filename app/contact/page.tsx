'use client'

import { useState, useCallback } from 'react'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import NavBar from '../../components/site/NavBar'

const font = 'var(--font-source-sans), "Source Sans 3", sans-serif'

const inputStyle: React.CSSProperties = {
  fontFamily: font,
  fontSize: '1rem',
  fontWeight: 400,
  background: 'none',
  border: 'none',
  borderBottom: '1px solid rgba(255,255,255,0.3)',
  color: '#fff',
  padding: '0.75rem 0',
  width: '100%',
  outline: 'none',
  transition: 'border-color 0.3s ease',
}

const labelStyle: React.CSSProperties = {
  fontFamily: font,
  fontSize: '0.75rem',
  fontWeight: 400,
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.9)',
  marginBottom: '0.25rem',
  display: 'block',
}

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const { executeRecaptcha } = useGoogleReCaptcha()

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    if (!executeRecaptcha) return
    setSubmitting(true)
    try {
      const token = await executeRecaptcha('contact_form')
      const res = await fetch('/api/recaptcha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      })
      if (res.ok) {
        setSent(true)
      }
    } finally {
      setSubmitting(false)
    }
  }, [executeRecaptcha])

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

      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <NavBar />

        {!sent ? (
          <div style={{ width: '100%', maxWidth: '500px', padding: '0 2rem' }}>
            <h1 style={{ fontWeight: 200, fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#fff', margin: '0 0 0.5rem', textAlign: 'center' }}>
              Get in Touch
            </h1>
            <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.9)', textAlign: 'center', marginBottom: '3rem', lineHeight: 1.6 }}>
              Have a question or want to chat? Drop us a message.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div>
                <label style={labelStyle}>Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  required
                  style={inputStyle}
                  onFocus={(e) => e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.7)'}
                  onBlur={(e) => e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.3)'}
                />
              </div>

              <div>
                <label style={labelStyle}>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  style={inputStyle}
                  onFocus={(e) => e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.7)'}
                  onBlur={(e) => e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.3)'}
                />
              </div>

              <div>
                <label style={labelStyle}>Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us what you need..."
                  required
                  rows={4}
                  style={{
                    ...inputStyle,
                    resize: 'vertical',
                    minHeight: '100px',
                  }}
                  onFocus={(e) => e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.7)'}
                  onBlur={(e) => e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.3)'}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                <button
                  type="submit"
                  style={{
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
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.075)'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.9)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.7)'
                  }}
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '0 2rem' }}>
            <h1 style={{ fontWeight: 200, fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#fff', margin: '0 0 1rem' }}>
              Message Sent
            </h1>
            <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.9)', lineHeight: 1.6, marginBottom: '2rem' }}>
              Thanks, {name}. We&apos;ll get back to you soon.
            </p>
            <a
              href="/"
              style={{
                fontFamily: font,
                fontSize: '0.85rem',
                fontWeight: 400,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                padding: '0.6rem 1.5rem',
                borderRadius: '9999px',
                border: '1px solid rgba(255,255,255,0.7)',
                color: 'rgba(255,255,255,0.9)',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
              }}
            >
              Back to Home
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
