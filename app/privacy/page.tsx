'use client'

import PageShell from '@/components/site/PageShell'

const sectionHeading: React.CSSProperties = {
  fontFamily: 'var(--font-source-sans), "Source Sans 3", sans-serif',
  fontWeight: 700,
  fontSize: '1.3rem',
  color: '#1a1a2e',
  margin: '2.5rem 0 1rem',
}

const paragraph: React.CSSProperties = {
  fontSize: '1rem',
  color: '#5d6478',
  lineHeight: 1.7,
  margin: '0 0 1rem',
}

const list: React.CSSProperties = {
  margin: '0 0 1rem',
  padding: '0 0 0 1.2rem',
  fontSize: '1rem',
  color: '#5d6478',
  lineHeight: 1.7,
}

export default function Privacy() {
  return (
    <PageShell
      eyebrow="PRIVACY POLICY"
      title="What we collect, and why."
      sub="How Mountain Studios handles your information."
    >
      <div style={{
        background: '#f4f2fa',
        padding: '4rem 2rem',
      }}>
        <div style={{
          maxWidth: '760px',
          margin: '0 auto',
        }}>
          <p style={{ ...paragraph, marginTop: 0 }}>
            This policy explains what personal information Mountain Studios collects through this website, what we do with it, and what rights you have over it. It is written to meet South Africa&rsquo;s Protection of Personal Information Act (POPIA).
          </p>

          <h2 style={{ ...sectionHeading, marginTop: '1rem' }}>What we collect</h2>
          <p style={paragraph}>We only collect what you actually give us, plus basic technical data needed to run the site.</p>
          <ul style={list}>
            <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: '#1a1a2e' }}>Contact details you submit</strong> — your name, email address and phone number, when you use the contact form, request a free website audit, start a project brief, sign up as a referral partner, apply for a role, or leave your details with our chat assistant.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: '#1a1a2e' }}>What you tell us about your business</strong> — anything you type into a form or the chat about your business, your website, or what you need built.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: '#1a1a2e' }}>Website address for audits</strong> — if you request a free audit, we fetch and analyse the public pages of the site you give us.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: '#1a1a2e' }}>Usage and analytics data</strong> — pages visited and general usage patterns, via Google Analytics.</li>
            <li><strong style={{ color: '#1a1a2e' }}>Technical data for security</strong> — your IP address and browser user agent, used for rate limiting, spam prevention and referral-link tracking. Where we record a referral link being opened, the IP address and user agent are hashed, not stored in the clear.</li>
          </ul>

          <h2 style={sectionHeading}>Why we collect it</h2>
          <ul style={list}>
            <li style={{ marginBottom: '0.5rem' }}>To reply to your enquiry and quote on work.</li>
            <li style={{ marginBottom: '0.5rem' }}>To produce and send the free audit report you asked for.</li>
            <li style={{ marginBottom: '0.5rem' }}>To build the website preview you requested.</li>
            <li style={{ marginBottom: '0.5rem' }}>To track referrals and pay referral partners what they&rsquo;re owed.</li>
            <li style={{ marginBottom: '0.5rem' }}>To consider job applications.</li>
            <li>To keep the site working and stop automated abuse.</li>
          </ul>

          <h2 style={sectionHeading}>Marketing</h2>
          <p style={paragraph}>
            We contact you about the enquiry you made. We don&rsquo;t sell your details, and we don&rsquo;t add you to bulk marketing lists off the back of a contact form. If we ever start sending marketing email, it will be with your consent and every message will carry a way to opt out.
          </p>

          <h2 style={sectionHeading}>Who processes your data</h2>
          <p style={paragraph}>We use a small number of third-party services to run the site. They process data on our behalf:</p>
          <ul style={list}>
            <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: '#1a1a2e' }}>Supabase</strong> — database hosting, where enquiries and project briefs are stored.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: '#1a1a2e' }}>Amazon Web Services (SES)</strong> — sending and receiving our email.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: '#1a1a2e' }}>Vercel</strong> — website hosting.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: '#1a1a2e' }}>Google</strong> — Analytics, reCAPTCHA (spam prevention), and PageSpeed Insights for audit reports.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: '#1a1a2e' }}>DeepSeek</strong> — powers our chat assistant. Contact details you type into the chat are stripped out before the conversation is sent to DeepSeek.</li>
            <li><strong style={{ color: '#1a1a2e' }}>Meta (Facebook)</strong> — advertising measurement. Our pages carry the Meta pixel. Where you submit a form, your name, email address and phone number are hashed before being sent to Meta, so we can measure which adverts led to enquiries.</li>
          </ul>
          <p style={paragraph}>
            Some of these providers process data outside South Africa. We only use providers that offer an adequate level of protection, as POPIA requires.
          </p>

          <h2 style={sectionHeading}>How long we keep it</h2>
          <p style={paragraph}>
            We keep enquiry and client records for as long as we&rsquo;re working with you, and afterwards for as long as we need them for our own business and legal records. If you ask us to delete your information and we&rsquo;re not required to keep it, we will.
          </p>

          <h2 style={sectionHeading}>Your rights</h2>
          <p style={paragraph}>Under POPIA you can ask us to:</p>
          <ul style={list}>
            <li style={{ marginBottom: '0.5rem' }}>Tell you what personal information we hold about you.</li>
            <li style={{ marginBottom: '0.5rem' }}>Correct anything that&rsquo;s wrong.</li>
            <li style={{ marginBottom: '0.5rem' }}>Delete it, where we&rsquo;re not obliged to keep it.</li>
            <li>Stop using it for a particular purpose.</li>
          </ul>
          <p style={paragraph}>
            Email <a href="mailto:hello@mountainstudios.co.za" style={{ color: '#7d3d4f' }}>hello@mountainstudios.co.za</a> and we&rsquo;ll action it. You also have the right to complain to the Information Regulator of South Africa.
          </p>

          <h2 style={sectionHeading}>Cookies and analytics</h2>
          <p style={paragraph}>
            Google Analytics sets cookies to measure how the site is used. Google reCAPTCHA runs on our forms to block automated abuse. The Meta pixel sets cookies so we can measure which of our adverts lead to enquiries, and show relevant adverts on Facebook and Instagram. Your browser settings can block these, and the site will still work.
          </p>

          <h2 style={sectionHeading}>Security</h2>
          <p style={paragraph}>
            Data is held in access-controlled systems and transmitted over encrypted connections. No system is perfectly secure, but we take reasonable steps to protect what you give us.
          </p>

          <h2 style={sectionHeading}>Changes to this policy</h2>
          <p style={paragraph}>
            We may update this policy from time to time. The version on this page is the one that applies.
          </p>

          <h2 style={sectionHeading}>Contact</h2>
          <p style={{ ...paragraph, marginBottom: 0 }}>
            Questions about this policy, or about your information: <a href="mailto:hello@mountainstudios.co.za" style={{ color: '#7d3d4f' }}>hello@mountainstudios.co.za</a>.
          </p>
        </div>
      </div>
    </PageShell>
  )
}
