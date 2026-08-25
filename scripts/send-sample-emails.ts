#!/usr/bin/env node

// Load .env.local manually since dotenv is not available
import fs from 'fs'
import path from 'path'

const envPath = path.join(process.cwd(), '.env.local')
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8')
  envContent.split('\n').forEach((line) => {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) return
    const [key, ...rest] = trimmed.split('=')
    if (key) process.env[key] = rest.join('=')
  })
}

import { sendMail, sendMailWithAttachment, NOTIFY_EMAIL } from '@/lib/ses'
import { renderEnquiryConfirmation } from '@/lib/emails/enquiry-confirmation'
import { renderAuditEmail, renderAuditCoverEmail } from '@/lib/audit/email'

// All emails go to this address
const RECIPIENT = 'hugodrum6@gmail.com'

// Test data
const testBusiness = 'Test Plumbing Co'
const testName = 'Test User'
const testEmail = 'test@example.com'
const testPhone = '+27123456789'
const testUrl = 'https://example.com'
const testMessage = 'This is a test enquiry message'

interface EmailResult {
  name: string
  sent: boolean
  messageId?: string
  error?: string
}

const results: EmailResult[] = []

// Helper to add a result
function logResult(name: string, sent: boolean, messageId?: string, error?: string) {
  results.push({ name, sent, messageId, error })
  const status = sent ? '✓ PASS' : '✗ FAIL'
  console.log(`${status}: ${name}${messageId ? ` (${messageId})` : ''}${error ? ` - ${error}` : ''}`)
}

async function main() {
  console.log('Sending sample emails to', RECIPIENT, '\n')

  // 1. Contact confirmation
  try {
    const confirmation = renderEnquiryConfirmation(testName)
    const messageId = await sendMail({
      to: RECIPIENT,
      subject: `[SAMPLE] ${confirmation.subject}`,
      html: confirmation.html,
    })
    logResult('Contact confirmation', !!messageId, messageId)
  } catch (err) {
    logResult('Contact confirmation', false, undefined, err instanceof Error ? err.message : String(err))
  }

  // 2. Website/wizard confirmation (same template as #1)
  try {
    const confirmation = renderEnquiryConfirmation(testName)
    const messageId = await sendMail({
      to: RECIPIENT,
      subject: `[SAMPLE] ${confirmation.subject}`,
      html: confirmation.html,
    })
    logResult('Website/wizard confirmation', !!messageId, messageId)
  } catch (err) {
    logResult('Website/wizard confirmation', false, undefined, err instanceof Error ? err.message : String(err))
  }

  // 3. Preview link email
  try {
    const emailText = `Hi,

We put together a preview of your website:

${testUrl}/p/sample-token-123

Have a look and let me know what you think — just reply to this email.

Hugo

The link stays live for 30 days.`

    const messageId = await sendMail({
      to: RECIPIENT,
      subject: `[SAMPLE] preview for ${testBusiness}`,
      text: emailText,
      replyTo: 'hugo@mountainstudios.co.za',
      from: 'Hugo Drummond <hugo@mountainstudios.co.za>',
    })
    logResult('Preview link email', !!messageId, messageId)
  } catch (err) {
    logResult('Preview link email', false, undefined, err instanceof Error ? err.message : String(err))
  }

  // 4. Audit report
  try {
    const mockReport = {
      url: 'https://example.com',
      ranAt: new Date().toISOString(),
      checks: {
        ssl: { status: 'ok', pass: true },
        headers: { status: 'ok', present: ['X-Frame-Options', 'X-Content-Type-Options'], missing: [], missingDetail: [] },
        mobile: { status: 'ok', score: 85 },
        desktop: { status: 'ok', score: 92 },
        accessibility: { status: 'ok', score: 78, failures: [] },
      },
    } as any

    const auditEmail = renderAuditCoverEmail(mockReport, testBusiness)
    const messageId = await sendMail({
      to: RECIPIENT,
      subject: `[SAMPLE] ${auditEmail.subject}`,
      html: auditEmail.html,
    })
    logResult('Audit report (without PDF)', !!messageId, messageId)
  } catch (err) {
    logResult('Audit report (without PDF)', false, undefined, err instanceof Error ? err.message : String(err))
  }

  // 5. Referral welcome
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://mountainstudios.co.za'
    const refCode = 'ABC12345'
    const referralLink = `${baseUrl}/?ref=${refCode}`

    const html = `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px;">
      <p style="font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#745762;margin:0 0 4px;">Welcome, Partner!</p>
      <h1 style="font-size:22px;color:#0f172a;margin:0 0 4px;">Your referral link is ready</h1>
      <p style="font-size:14px;color:#64748b;margin:0 0 20px;">Share this link with your network</p>
      <div style="margin:20px 0;padding:16px;background:#f6f5fb;border-radius:10px;">
        <p style="font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#745762;margin:0 0 8px;">Your Referral Link</p>
        <p style="font-size:14px;color:#0f172a;margin:0;word-break:break-all;"><a href="${referralLink}" style="color:#2563eb;">${referralLink}</a></p>
      </div>
      <p style="font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#745762;margin:28px 0 12px;">Terms</p>
      <ul style="font-size:14px;color:#334155;line-height:1.7;margin:0 0 20px;padding:0 0 0 18px;">
        <li style="margin-bottom:10px;"><strong style="color:#0f172a;">Payout.</strong> 25% of the deal up to R1000 per referred business, paid via EFT once they&rsquo;ve signed and paid their deposit.</li>
        <li style="margin-bottom:10px;"><strong style="color:#0f172a;">No limit.</strong> Refer as many businesses as you like &mdash; there&rsquo;s no cap on how much you can earn.</li>
        <li style="margin-bottom:10px;"><strong style="color:#0f172a;">Your link doesn&rsquo;t expire.</strong> Use it whenever a referral comes up.</li>
        <li><strong style="color:#0f172a;">Questions?</strong> Email <a href="mailto:hello@mountainstudios.co.za" style="color:#7d3d4f;">hello@mountainstudios.co.za</a>.</li>
      </ul>
      <p style="font-size:13px;color:#64748b;margin:0 0 20px;">Full terms: <a href="${baseUrl}/refer/terms" style="color:#7d3d4f;">${baseUrl}/refer/terms</a></p>
      <p style="font-size:13px;color:#64748b;margin:20px 0 0;">Thank you for helping us grow!</p>
    </div>`

    const messageId = await sendMail({
      to: RECIPIENT,
      subject: '[SAMPLE] Your referral link is ready',
      html,
      replyTo: 'hello@mountainstudios.co.za',
    })
    logResult('Referral welcome', !!messageId, messageId)
  } catch (err) {
    logResult('Referral welcome', false, undefined, err instanceof Error ? err.message : String(err))
  }

  // 6. Booking confirmation
  try {
    const html = `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px;">
      <p style="font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#745762;margin:0 0 4px;">Mountain Studios</p>
      <h1 style="font-size:22px;color:#0f172a;margin:0 0 4px;">Your meeting is confirmed</h1>
      <p style="font-size:15px;color:#334155;line-height:1.6;margin:0 0 20px;">Hi ${testName},</p>
      <p style="font-size:15px;color:#334155;line-height:1.6;margin:0 0 20px;">Your discovery call is booked for Tuesday 25 Aug at 14:00 SAST.</p>
      <p style="font-size:15px;color:#334155;line-height:1.6;margin:0 0 4px;">We'll send the Zoom link shortly before the meeting.</p>
      <p style="font-size:15px;color:#334155;line-height:1.6;margin:0 0 24px;">Hugo</p>
    </div>`

    const messageId = await sendMail({
      to: RECIPIENT,
      subject: '[SAMPLE] Your meeting is confirmed — Discovery call',
      html,
    })
    logResult('Booking confirmation', !!messageId, messageId)
  } catch (err) {
    logResult('Booking confirmation', false, undefined, err instanceof Error ? err.message : String(err))
  }

  // 7. Deposit confirmation
  try {
    const html = `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px;">
      <p style="font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#745762;margin:0 0 4px;">Mountain Studios</p>
      <h1 style="font-size:22px;color:#0f172a;margin:0 0 4px;">Deposit received</h1>
      <p style="font-size:15px;color:#334155;line-height:1.6;margin:0 0 20px;">Hi ${testName},</p>
      <p style="font-size:15px;color:#334155;line-height:1.6;margin:0 0 20px;">We've received your deposit of R1000. We'll start working on your website immediately.</p>
      <p style="font-size:15px;color:#334155;line-height:1.6;margin:0 0 4px;">Chat soon.</p>
      <p style="font-size:15px;color:#334155;line-height:1.6;margin:0;">Hugo</p>
    </div>`

    const messageId = await sendMail({
      to: RECIPIENT,
      subject: '[SAMPLE] Deposit received — ZAR 1000',
      html,
    })
    logResult('Deposit confirmation', !!messageId, messageId)
  } catch (err) {
    logResult('Deposit confirmation', false, undefined, err instanceof Error ? err.message : String(err))
  }

  // 8. Brief invitation
  try {
    const html = `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px;">
      <p style="font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#745762;margin:0 0 4px;">Mountain Studios</p>
      <h1 style="font-size:22px;color:#0f172a;margin:0 0 4px;">Your website brief is ready to complete</h1>
      <p style="font-size:15px;color:#334155;line-height:1.6;margin:0 0 20px;">Hi ${testName},</p>
      <p style="font-size:15px;color:#334155;line-height:1.6;margin:0 0 20px;">We've prepared a brief for your new website. Just take a few minutes to fill in your details and we'll get started.</p>
      <p style="font-size:15px;color:#334155;line-height:1.6;margin:0 0 20px;">
        <a href="${testUrl}/brief/abc123" style="background:#7d3d4f;color:#fff;text-decoration:none;padding:12px 24px;border-radius:6px;display:inline-block;">Complete your brief</a>
      </p>
      <p style="font-size:13px;color:#64748b;">Deadline: 1 September 2026</p>
    </div>`

    const messageId = await sendMail({
      to: RECIPIENT,
      subject: '[SAMPLE] Your website brief is ready to complete',
      html,
    })
    logResult('Brief invitation', !!messageId, messageId)
  } catch (err) {
    logResult('Brief invitation', false, undefined, err instanceof Error ? err.message : String(err))
  }

  // 9. Brief receipt
  try {
    const html = `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px;">
      <p style="font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#745762;margin:0 0 4px;">Mountain Studios</p>
      <h1 style="font-size:22px;color:#0f172a;margin:0 0 4px;">Brief received</h1>
      <p style="font-size:15px;color:#334155;line-height:1.6;margin:0 0 20px;">Hi ${testName},</p>
      <p style="font-size:15px;color:#334155;line-height:1.6;margin:0 0 20px;">We've received your brief for ${testBusiness}. Your website will have: Homepage, About, Services, Contact.</p>
      <p style="font-size:15px;color:#334155;line-height:1.6;margin:0 0 20px;">Next, we'll design your site and show you the preview within 5 days.</p>
      <p style="font-size:15px;color:#334155;line-height:1.6;margin:0;">Hugo</p>
    </div>`

    const messageId = await sendMail({
      to: RECIPIENT,
      subject: `[SAMPLE] Brief received — ${testBusiness}`,
      html,
    })
    logResult('Brief receipt', !!messageId, messageId)
  } catch (err) {
    logResult('Brief receipt', false, undefined, err instanceof Error ? err.message : String(err))
  }

  // 10. Progress review invite
  try {
    const html = `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px;">
      <p style="font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#745762;margin:0 0 4px;">Mountain Studios</p>
      <h1 style="font-size:22px;color:#0f172a;margin:0 0 4px;">Your progress review meeting invitation</h1>
      <p style="font-size:15px;color:#334155;line-height:1.6;margin:0 0 20px;">Hi ${testName},</p>
      <p style="font-size:15px;color:#334155;line-height:1.6;margin:0 0 20px;">We're ready to show you the progress on your website. You're booked in for Thursday 27 Aug at 10:00 SAST.</p>
      <p style="font-size:15px;color:#334155;line-height:1.6;margin:0 0 20px;">
        <a href="${testUrl}/preview/abc123" style="background:#7d3d4f;color:#fff;text-decoration:none;padding:12px 24px;border-radius:6px;display:inline-block;">View your preview</a>
      </p>
      <p style="font-size:15px;color:#334155;line-height:1.6;margin:0;">Talk soon.</p>
    </div>`

    const messageId = await sendMail({
      to: RECIPIENT,
      subject: '[SAMPLE] Your progress review meeting invitation',
      html,
    })
    logResult('Progress review invite', !!messageId, messageId)
  } catch (err) {
    logResult('Progress review invite', false, undefined, err instanceof Error ? err.message : String(err))
  }

  // 11. Nurture welcome
  try {
    const html = `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px;">
      <p style="font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#745762;margin:0 0 4px;">Mountain Studios</p>
      <h1 style="font-size:22px;color:#0f172a;margin:0 0 4px;">Welcome from Mountain Studios</h1>
      <p style="font-size:15px;color:#334155;line-height:1.6;margin:0 0 20px;">Hi ${testName},</p>
      <p style="font-size:15px;color:#334155;line-height:1.6;margin:0 0 20px;">Thanks for getting in touch. We send helpful tips about building a website that brings in business. You'll hear from us about once a week.</p>
      <p style="font-size:15px;color:#334155;line-height:1.6;margin:0 0 4px;">Hugo</p>
      <p style="font-size:13px;color:#64748b;margin:20px 0 0;">
        <a href="${testUrl}/unsubscribe?email=${RECIPIENT}" style="color:#535f77;">Unsubscribe</a>
      </p>
    </div>`

    const messageId = await sendMail({
      to: RECIPIENT,
      subject: '[SAMPLE] Welcome from Mountain Studios',
      html,
    })
    logResult('Nurture welcome', !!messageId, messageId)
  } catch (err) {
    logResult('Nurture welcome', false, undefined, err instanceof Error ? err.message : String(err))
  }

  // 12. New enquiry from {name}
  try {
    const html = `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px;">
      <p style="font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#745762;margin:0 0 4px;">New enquiry from website</p>
      <h1 style="font-size:22px;color:#0f172a;margin:0 0 4px;">${testName}</h1>
      <p style="font-size:14px;color:#64748b;margin:0 0 20px;">Sent from the homepage contact form</p>
      <table style="border-collapse:collapse;width:100%;">
        <tr>
          <td style="padding:6px 16px 6px 0;color:#64748b;font-size:13px;vertical-align:top;white-space:nowrap;">Name</td>
          <td style="padding:6px 0;color:#0f172a;font-size:14px;">${testName}</td>
        </tr>
        <tr>
          <td style="padding:6px 16px 6px 0;color:#64748b;font-size:13px;vertical-align:top;white-space:nowrap;">Email</td>
          <td style="padding:6px 0;color:#0f172a;font-size:14px;">${testEmail}</td>
        </tr>
        <tr>
          <td style="padding:6px 16px 6px 0;color:#64748b;font-size:13px;vertical-align:top;white-space:nowrap;">Phone</td>
          <td style="padding:6px 0;color:#0f172a;font-size:14px;">${testPhone}</td>
        </tr>
      </table>
      <div style="margin-top:20px;padding:16px;background:#f6f5fb;border-radius:10px;">
        <p style="font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#745762;margin:0 0 8px;">Message</p>
        <p style="font-size:14px;color:#0f172a;margin:0;white-space:pre-wrap;">${testMessage}</p>
      </div>
    </div>`

    const messageId = await sendMail({
      to: RECIPIENT,
      subject: `[SAMPLE] New enquiry from ${testName}`,
      html,
      replyTo: testEmail,
    })
    logResult('New enquiry alert', !!messageId, messageId)
  } catch (err) {
    logResult('New enquiry alert', false, undefined, err instanceof Error ? err.message : String(err))
  }

  // 13. New website enquiry
  try {
    const html = `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px;">
      <p style="font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#745762;margin:0 0 4px;">New website enquiry</p>
      <h1 style="font-size:22px;color:#0f172a;margin:0 0 4px;">${testBusiness}</h1>
      <p style="font-size:14px;color:#64748b;margin:0 0 20px;">Said they loved the preview</p>
      <table style="border-collapse:collapse;width:100%;">
        <tr>
          <td style="padding:6px 16px 6px 0;color:#64748b;font-size:13px;vertical-align:top;white-space:nowrap;">Name</td>
          <td style="padding:6px 0;color:#0f172a;font-size:14px;">${testName}</td>
        </tr>
        <tr>
          <td style="padding:6px 16px 6px 0;color:#64748b;font-size:13px;vertical-align:top;white-space:nowrap;">Email</td>
          <td style="padding:6px 0;color:#0f172a;font-size:14px;">${testEmail}</td>
        </tr>
        <tr>
          <td style="padding:6px 16px 6px 0;color:#64748b;font-size:13px;vertical-align:top;white-space:nowrap;">Phone</td>
          <td style="padding:6px 0;color:#0f172a;font-size:14px;">${testPhone}</td>
        </tr>
      </table>
    </div>`

    const messageId = await sendMail({
      to: RECIPIENT,
      subject: `[SAMPLE] New website enquiry — ${testBusiness}`,
      html,
      replyTo: testEmail,
    })
    logResult('New website enquiry alert', !!messageId, messageId)
  } catch (err) {
    logResult('New website enquiry alert', false, undefined, err instanceof Error ? err.message : String(err))
  }

  // 14. Partial brief alert (wizard lead, incomplete)
  try {
    const html = `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px;">
      <p style="font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#745762;margin:0 0 4px;">Wizard lead — brief not finished</p>
      <h1 style="font-size:22px;color:#0f172a;margin:0 0 4px;">${testBusiness}</h1>
      <p style="font-size:14px;color:#64748b;margin:0 0 20px;">Captured at the email step, before the preview. They have not sent the brief.</p>
      <table style="border-collapse:collapse;width:100%;">
        <tr>
          <td style="padding:6px 16px 6px 0;color:#64748b;font-size:13px;vertical-align:top;white-space:nowrap;">Email</td>
          <td style="padding:6px 0;color:#0f172a;font-size:14px;">${testEmail}</td>
        </tr>
        <tr>
          <td style="padding:6px 16px 6px 0;color:#64748b;font-size:13px;vertical-align:top;white-space:nowrap;">Business name</td>
          <td style="padding:6px 0;color:#0f172a;font-size:14px;">${testBusiness}</td>
        </tr>
      </table>
    </div>`

    const messageId = await sendMail({
      to: RECIPIENT,
      subject: `[SAMPLE] Wizard lead — ${testBusiness}`,
      html,
      replyTo: testEmail,
    })
    logResult('Partial brief alert', !!messageId, messageId)
  } catch (err) {
    logResult('Partial brief alert', false, undefined, err instanceof Error ? err.message : String(err))
  }

  // 15. Preview claimed
  try {
    const html = `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px;">
      <p style="font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#745762;margin:0 0 4px;">Preview claimed</p>
      <h1 style="font-size:22px;color:#0f172a;margin:0 0 16px;">${testBusiness}</h1>
      <p style="font-size:15px;color:#0f172a;margin:0 0 4px;"><strong>${testName}</strong></p>
      <p style="font-size:15px;color:#0f172a;margin:0 0 16px;"><a href="tel:${testPhone}" style="color:#535f77;">${testPhone}</a></p>
      <p style="font-size:13px;color:#64748b;margin:0;">They tapped this while looking at their own preview. Call while it's warm.</p>
    </div>`

    const messageId = await sendMail({
      to: RECIPIENT,
      subject: `[SAMPLE] Preview claimed — ${testBusiness}`,
      html,
    })
    logResult('Preview claimed alert', !!messageId, messageId)
  } catch (err) {
    logResult('Preview claimed alert', false, undefined, err instanceof Error ? err.message : String(err))
  }

  // 16. Free audit requested
  try {
    const html = `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px;">
      <p style="font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#745762;margin:0 0 4px;">Free audit requested</p>
      <h1 style="font-size:22px;color:#0f172a;margin:0 0 4px;">${testBusiness}</h1>
      <p style="font-size:14px;color:#64748b;margin:0 0 20px;">Requested from the website</p>
      <table style="border-collapse:collapse;width:100%;">
        <tr>
          <td style="padding:6px 16px 6px 0;color:#64748b;font-size:13px;vertical-align:top;white-space:nowrap;">Website</td>
          <td style="padding:6px 0;color:#0f172a;font-size:14px;">${testUrl}</td>
        </tr>
        <tr>
          <td style="padding:6px 16px 6px 0;color:#64748b;font-size:13px;vertical-align:top;white-space:nowrap;">Email</td>
          <td style="padding:6px 0;color:#0f172a;font-size:14px;">${testEmail}</td>
        </tr>
      </table>
    </div>`

    const messageId = await sendMail({
      to: RECIPIENT,
      subject: `[SAMPLE] Free audit requested — ${testBusiness}`,
      html,
      replyTo: testEmail,
    })
    logResult('Free audit requested alert', !!messageId, messageId)
  } catch (err) {
    logResult('Free audit requested alert', false, undefined, err instanceof Error ? err.message : String(err))
  }

  // 17. Site generated alert
  try {
    const html = `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px;">
      <p style="font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#745762;margin:0 0 4px;">Site generated</p>
      <h1 style="font-size:22px;color:#0f172a;margin:0 0 4px;">${testBusiness}</h1>
      <p style="font-size:14px;color:#64748b;margin:0 0 20px;">Their new website is ready</p>
      <p style="font-size:15px;color:#334155;line-height:1.6;margin:0 0 20px;">Preview: <a href="${testUrl}/preview/abc123" style="color:#535f77;">${testUrl}/preview/abc123</a></p>
      <p style="font-size:15px;color:#334155;line-height:1.6;margin:0 0 20px;">GitHub: <a href="https://github.com/example" style="color:#535f77;">https://github.com/example</a></p>
    </div>`

    const messageId = await sendMail({
      to: RECIPIENT,
      subject: `[SAMPLE] Site generated — ${testBusiness}`,
      html,
      replyTo: 'hello@mountainstudios.co.za',
    })
    logResult('Site generated alert', !!messageId, messageId)
  } catch (err) {
    logResult('Site generated alert', false, undefined, err instanceof Error ? err.message : String(err))
  }

  // Print summary
  console.log('\n=== SUMMARY ===')
  console.log(`Total: ${results.length}`)
  console.log(`Passed: ${results.filter((r) => r.sent).length}`)
  console.log(`Failed: ${results.filter((r) => !r.sent).length}`)

  // Print table
  console.log('\n=== RESULTS TABLE ===')
  console.log(
    'Email Type | Sent? | MessageID/Error',
  )
  console.log('-'.repeat(80))
  results.forEach((r) => {
    const status = r.sent ? 'YES' : 'NO'
    const detail = r.messageId || r.error || '(no details)'
    console.log(`${r.name.padEnd(40)} | ${status.padEnd(5)} | ${detail}`)
  })
}

main().catch(console.error)
