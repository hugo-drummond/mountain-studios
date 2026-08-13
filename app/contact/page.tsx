'use client'

import { useState } from 'react'
import PageShell from '@/components/site/PageShell'

const WHATSAPP_NUMBER = '27000000000'
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
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
            {/* INFO ROWS — spread to fill the card so the last row lines up with the form's textarea */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
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
                <p style={{ fontSize: '1rem', color: '#5d6478', margin: 0 }}>Mon–Fri 8:00–17:00 SAST</p>
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
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
                  <input
                    type="email"
                    placeholder="Your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      border: '1px solid #e3e0ea',
                      borderRadius: '999px',
                      padding: '0.85rem 1.2rem',
                      fontSize: '0.95rem',
                      outline: 'none',
                      fontFamily: 'inherit',
                    }}
                  />
                  <input
                    type="tel"
                    placeholder="Your contact number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{
                      border: '1px solid #e3e0ea',
                      borderRadius: '999px',
                      padding: '0.85rem 1.2rem',
                      fontSize: '0.95rem',
                      outline: 'none',
                      fontFamily: 'inherit',
                    }}
                  />
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
                  <button type="submit" style={{
                    background: '#7d3d4f',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '999px',
                    padding: '0.9rem 1.6rem',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    cursor: 'pointer',
                    alignSelf: 'flex-start',
                  }}>
                    SEND MESSAGE →
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
