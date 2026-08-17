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

export default function Terms() {
  return (
    <PageShell
      eyebrow="TERMS OF SERVICE"
      title="The fine print."
      sub="Plain-language terms for working with Mountain Studios."
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
            These terms apply whenever you engage Mountain Studios (&ldquo;we&rdquo;, &ldquo;us&rdquo;) to design, build, host or maintain a website. By paying a deposit or signing a proposal with us, you accept them.
          </p>

          <h2 style={{ ...sectionHeading, marginTop: '1rem' }}>Payment</h2>
          <p style={paragraph}>
            Projects run on a deposit plus balance-on-completion basis. A deposit is due before work starts; the balance is due once the site is complete and ready to launch. The site goes live once the balance is paid.
          </p>

          <h2 style={sectionHeading}>Ownership</h2>
          <p style={paragraph}>
            You own the code and design of your site once it&rsquo;s paid for in full. Nothing about the build is licensed back to us or held over you — once the final invoice is settled, it&rsquo;s yours.
          </p>

          <h2 style={sectionHeading}>Cancellation</h2>
          <p style={paragraph}>
            If you cancel a project partway through, you&rsquo;re billed for the work completed up to that point, with your deposit credited against that amount. If the deposit covers the work done, nothing further is owed either way.
          </p>

          <h2 style={sectionHeading}>Hosting &amp; maintenance</h2>
          <p style={paragraph}>
            Ongoing hosting, small updates and technical maintenance are part of what we do after launch, for as long as you stay on with us. Details of what&rsquo;s included are agreed per project.
          </p>

          <h2 style={sectionHeading}>Liability</h2>
          <p style={paragraph}>
            Our total liability for any claim relating to a project is capped at the total fees you&rsquo;ve paid us for that project. We&rsquo;re not liable for indirect or consequential losses — lost profits, lost data, or business interruption.
          </p>

          <h2 style={sectionHeading}>Your responsibilities</h2>
          <p style={paragraph}>
            You&rsquo;re responsible for the accuracy of content, copy and images you supply, and for making sure you have the rights to use them. We&rsquo;re not liable for third-party claims arising from material you give us to publish.
          </p>

          <h2 style={sectionHeading}>Changes to these terms</h2>
          <p style={paragraph}>
            We may update these terms from time to time. The version live on this page at the time you sign a proposal or pay a deposit is the one that applies to your project.
          </p>

          <h2 style={sectionHeading}>Governing law</h2>
          <p style={paragraph}>
            These terms are governed by the laws of South Africa.
          </p>

          <h2 style={sectionHeading}>Questions</h2>
          <p style={{ ...paragraph, marginBottom: 0 }}>
            Email <a href="mailto:hello@mountainstudios.co.za" style={{ color: '#7d3d4f' }}>hello@mountainstudios.co.za</a>.
          </p>
        </div>
      </div>
    </PageShell>
  )
}
