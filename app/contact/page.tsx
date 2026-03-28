'use client'

import { useState, useCallback } from 'react'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'

const font = 'var(--font-source-sans), "Source Sans 3", sans-serif'
const serif = 'Georgia, "Times New Roman", serif'

import SiteNav from '../../components/site/SiteNav'

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

  const fieldLabel: React.CSSProperties = {
    fontFamily: font, fontSize: '0.7rem', fontWeight: 600,
    letterSpacing: '0.15em', textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.5)', marginBottom: '0.5rem', display: 'block',
  }

  const fieldInput: React.CSSProperties = {
    fontFamily: font, fontSize: '0.95rem', fontWeight: 400,
    background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '12px', color: '#fff', padding: '0.85rem 1rem', width: '100%',
    outline: 'none', transition: 'border-color 0.3s, background 0.3s',
    backdropFilter: 'blur(8px)',
  }

  return (
    <div style={{
      minHeight: '100vh', fontFamily: font,
      background: 'linear-gradient(180deg, #7b8fad 0%, #9aa4bc 35%, #b5a8c4 60%, #d4b8c8 80%, #e8c8cf 100%)',
      display: 'flex', flexDirection: 'column',
    }}>
      <SiteNav />

      {/* Content */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 2rem' }}>
        {!sent ? (
          <div style={{ width: '100%', maxWidth: '560px' }}>
            {/* Eyebrow */}
            <p style={{
              fontFamily: font, fontSize: '0.7rem', fontWeight: 600,
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.5)', textAlign: 'center', marginBottom: '0.75rem',
            }}>Connect With Us</p>

            {/* Heading */}
            <h1 style={{
              fontFamily: serif, fontWeight: 300,
              fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: '#fff',
              textAlign: 'center', margin: '0 0 0.75rem', lineHeight: 1.15,
            }}>
              Get in <em style={{ fontStyle: 'italic' }}>Touch</em>
            </h1>

            {/* Subtitle */}
            <p style={{
              fontSize: '0.9rem', color: 'rgba(255,255,255,0.65)',
              textAlign: 'center', marginBottom: '2.5rem', lineHeight: 1.6,
              maxWidth: '400px', margin: '0 auto 2.5rem',
            }}>
              Whether you have a vision or just want to explore possibilities, our atelier is open for dialogue.
            </p>

            {/* Glass Form Card */}
            <div style={{
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
              borderRadius: '20px', padding: '2.5rem',
              border: '1px solid rgba(255,255,255,0.15)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
            }}>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {/* Name + Email row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                  <div>
                    <label style={fieldLabel}>Name</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)}
                      placeholder="Elias Thorne" required style={fieldInput}
                      onFocus={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)'; e.currentTarget.style.background = 'rgba(255,255,255,0.12)' }}
                      onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)' }}
                    />
                  </div>
                  <div>
                    <label style={fieldLabel}>Email</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                      placeholder="elias@studio.com" required style={fieldInput}
                      onFocus={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)'; e.currentTarget.style.background = 'rgba(255,255,255,0.12)' }}
                      onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)' }}
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label style={fieldLabel}>Message</label>
                  <textarea value={message} onChange={e => setMessage(e.target.value)}
                    placeholder="Tell us about your next masterpiece..." required rows={5}
                    style={{ ...fieldInput, resize: 'vertical', minHeight: '120px' }}
                    onFocus={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)'; e.currentTarget.style.background = 'rgba(255,255,255,0.12)' }}
                    onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)' }}
                  />
                </div>

                {/* Submit */}
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '0.5rem' }}>
                  <button type="submit" disabled={submitting} style={{
                    fontFamily: font, fontSize: '0.8rem', fontWeight: 600,
                    color: '#1a1a2e', background: 'rgba(255,255,255,0.85)',
                    padding: '0.75rem 2rem', borderRadius: '999px', border: 'none',
                    cursor: 'pointer', letterSpacing: '0.1em', textTransform: 'uppercase',
                    transition: 'opacity 0.2s, background 0.2s',
                    backdropFilter: 'blur(8px)',
                  }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,1)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.85)'}
                  >{submitting ? 'Sending...' : 'Send Message  →'}</button>
                </div>
              </form>
            </div>
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

      {/* Footer */}
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
        @media (max-width: 640px) {
          div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
        input::placeholder, textarea::placeholder {
          color: rgba(255,255,255,0.3);
        }
      `}</style>
    </div>
  )
}
