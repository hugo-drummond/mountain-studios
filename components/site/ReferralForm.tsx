'use client'

import { useState } from 'react'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'

// Standalone referral signup form for the CTA band on non-homepage pages
// (currently /refer/terms). Same endpoint and honeypot handling as the
// homepage #refer form in app/page.tsx — kept separate rather than shared
// because the homepage version is wired into that page's own local state
// and JSX, not extracted as a component.
export default function ReferralForm() {
  const { executeRecaptcha } = useGoogleReCaptcha()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [honeypot, setHoneypot] = useState('')
  const [refCode, setRefCode] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      let recaptchaToken: string | undefined
      if (executeRecaptcha) {
        try {
          recaptchaToken = await Promise.race([
            executeRecaptcha('referral_submit'),
            new Promise<undefined>((resolve) => setTimeout(() => resolve(undefined), 5000)),
          ])
        } catch {
          // reCAPTCHA failure is not critical
        }
      }

      const res = await fetch('/api/referral/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: name,
          email,
          phone,
          recaptchaToken,
          website: honeypot,
        }),
      })

      const data = await res.json().catch(() => null)
      if (res.ok && data?.success && data?.refCode) {
        setDone(true)
        setRefCode(data.refCode)
        setName('')
        setEmail('')
        setPhone('')
      } else {
        setError(typeof data?.error === 'string' ? data.error : 'Something went wrong. Please try again.')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const fieldStyle: React.CSSProperties = {
    width: '190px',
    padding: '0.85rem 1.4rem',
    borderRadius: '999px',
    border: 'none',
    fontSize: '1rem',
    outline: 'none',
  }

  return (
    <>
      <h2 style={{
        fontFamily: 'var(--font-playfair), Georgia, serif',
        fontSize: 'clamp(1.7rem,3vw,2.4rem)',
        color: '#1a1a2e',
        fontWeight: 400,
        margin: '0 0 2rem',
      }}>
        Get your link. <em style={{ fontStyle: 'italic' }}>Start earning.</em>
      </h2>

      {done ? (
        <div style={{ marginBottom: '2.5rem' }}>
          <p style={{ fontSize: '0.9rem', color: '#3d4358', margin: '0 0 1rem' }}>
            Got it. We&rsquo;ll email your link shortly.
          </p>
          {refCode && (
            <div style={{
              background: 'rgba(255,255,255,0.3)',
              borderRadius: '8px',
              padding: '1rem',
              fontSize: '0.85rem',
              color: '#3d4358',
              maxWidth: '420px',
              margin: '0 auto',
            }}>
              <p style={{ margin: '0 0 0.5rem', fontWeight: 600 }}>Your referral link:</p>
              <p style={{ margin: 0, wordBreak: 'break-all', fontFamily: 'monospace', fontSize: '0.8rem' }}>
                https://mountainstudios.co.za/?ref={refCode}
              </p>
            </div>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
          {error && (
            <p style={{ fontSize: '0.9rem', color: '#dc2626', marginBottom: '1rem', textAlign: 'center' }}>
              {error}
            </p>
          )}
          <div style={{ display: 'flex', gap: '0.6rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <input type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} style={fieldStyle} />
            <input type="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} style={fieldStyle} />
            <input type="tel" placeholder="Your mobile" value={phone} onChange={(e) => setPhone(e.target.value)} style={fieldStyle} />
            <button type="submit" disabled={loading} style={{
              background: '#fff',
              color: '#1a1a2e',
              border: 'none',
              padding: '0.85rem 1.4rem',
              borderRadius: '999px',
              fontSize: '1rem',
              fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
            }}>
              {loading ? 'Saving…' : 'GET MY LINK →'}
            </button>
          </div>
          <input
            type="text"
            name="_hp_url"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            style={{ display: 'none' }}
            autoComplete="off"
            aria-hidden="true"
            tabIndex={-1}
            data-lpignore="true"
            data-1p-ignore=""
            data-form-type="other"
          />
        </form>
      )}
    </>
  )
}
