'use client'

import { useState, useCallback } from 'react'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'

const font = 'var(--font-source-sans), "Source Sans 3", sans-serif'
const serif = 'Georgia, "Times New Roman", serif'

import SiteNav from '../../components/site/SiteNav'

const inputStyle: React.CSSProperties = {
  fontFamily: font, fontSize: '1rem', fontWeight: 400,
  background: 'none', border: 'none',
  borderBottom: '1px solid rgba(255,255,255,0.35)',
  color: '#fff', padding: '0.75rem 0', width: '100%',
  outline: 'none', transition: 'border-color 0.3s ease',
}

const labelStyle: React.CSSProperties = {
  fontFamily: font, fontSize: '0.75rem', fontWeight: 600,
  letterSpacing: '0.12em', textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.7)', marginBottom: '0.25rem', display: 'block',
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
      if (res.ok) setSent(true)
    } finally {
      setSubmitting(false)
    }
  }, [executeRecaptcha])

  return (
    <div style={{
      minHeight: '100vh', fontFamily: font,
      background: 'linear-gradient(180deg, #8e9fba 0%, #a8b8cc 40%, #d4b8c8 80%, #e8c8cf 100%)',
      display: 'flex', flexDirection: 'column',
    }}>
      <SiteNav />

      {/* Content */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        {!sent ? (
          <div style={{ width: '100%', maxWidth: '460px' }}>
            <h1 style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#fff', margin: '0 0 0.5rem', textAlign: 'center' }}>
              Get in Touch
            </h1>
            <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', textAlign: 'center', marginBottom: '2.5rem', lineHeight: 1.6 }}>
              Have a question or want to chat? Drop us a message.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div>
                <label style={labelStyle}>Name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)}
                  placeholder="Your name" required style={inputStyle}
                  onFocus={e => e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.7)'}
                  onBlur={e => e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.35)'}
                />
              </div>
              <div>
                <label style={labelStyle}>Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com" required style={inputStyle}
                  onFocus={e => e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.7)'}
                  onBlur={e => e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.35)'}
                />
              </div>
              <div>
                <label style={labelStyle}>Message</label>
                <textarea value={message} onChange={e => setMessage(e.target.value)}
                  placeholder="Tell us what you need..." required rows={4}
                  style={{ ...inputStyle, resize: 'vertical', minHeight: '100px' }}
                  onFocus={e => e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.7)'}
                  onBlur={e => e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.35)'}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '0.5rem' }}>
                <button type="submit" disabled={submitting} style={{
                  fontFamily: font, fontSize: '0.85rem', fontWeight: 600,
                  color: '#1a1a2e', background: '#fff', padding: '0.65rem 1.75rem',
                  borderRadius: '999px', border: 'none', cursor: 'pointer',
                  transition: 'opacity 0.2s', letterSpacing: '0.04em',
                }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >{submitting ? 'Sending...' : 'Send Message'}</button>
              </div>
            </form>
          </div>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#fff', margin: '0 0 1rem' }}>
              Message Sent
            </h1>
            <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.6, marginBottom: '2rem' }}>
              Thanks, {name}. We&apos;ll get back to you soon.
            </p>
            <a href="/" style={{
              fontFamily: font, fontSize: '0.85rem', fontWeight: 600,
              color: '#1a1a2e', background: '#fff', padding: '0.65rem 1.5rem',
              borderRadius: '999px', textDecoration: 'none',
            }}>Back to Home</a>
          </div>
        )}
      </div>
    </div>
  )
}
