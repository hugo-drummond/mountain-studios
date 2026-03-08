import nodemailer from 'nodemailer'
import fs from 'fs'
import path from 'path'
const config = require('@/config/config')

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface SendEmailOpts {
  to: string
  subject: string
  html: string
  replyTo?: string
}

export interface SendEmailResult {
  success: boolean
  messageId?: string
}

// ---------------------------------------------------------------------------
// Transporter
// ---------------------------------------------------------------------------

export function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

// ---------------------------------------------------------------------------
// Template loader
// ---------------------------------------------------------------------------

export function loadTemplate(name: string, vars: Record<string, string>): string {
  const templatePath = path.join(process.cwd(), 'emails', `${name}.html`)
  let html = fs.readFileSync(templatePath, 'utf-8')

  // Replace agency vars from config
  html = html
    .replace(/\{\{AGENCY_NAME\}\}/g, config.agency.name)
    .replace(/\{\{AGENCY_EMAIL\}\}/g, config.agency.email)
    .replace(/\{\{AGENCY_PHONE\}\}/g, config.agency.phone)

  // Replace caller-supplied vars
  for (const [key, value] of Object.entries(vars)) {
    html = html.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), value)
  }

  return html
}

// ---------------------------------------------------------------------------
// Core sender
// ---------------------------------------------------------------------------

export async function sendEmail(opts: SendEmailOpts): Promise<SendEmailResult> {
  try {
    const transporter = createTransporter()
    const info = await transporter.sendMail({
      from: `"${config.agency.name}" <${config.agency.email}>`,
      to: opts.to,
      subject: opts.subject,
      html: opts.html,
      replyTo: opts.replyTo,
    })
    return { success: true, messageId: info.messageId }
  } catch (err) {
    console.error('[sendEmail] error:', err)
    return { success: false }
  }
}

// ---------------------------------------------------------------------------
// Pre-built senders
// ---------------------------------------------------------------------------

export async function sendBookingConfirmation(
  to: string,
  vars: {
    client_name: string
    meeting_time: string
    meeting_link: string
    meeting_type: string
  },
): Promise<SendEmailResult> {
  const html = loadTemplate('booking_confirmation', vars)
  return sendEmail({ to, subject: `Your meeting is confirmed — ${vars.meeting_type}`, html })
}

export async function sendBriefInvitation(
  to: string,
  vars: { brief_url: string; client_name: string; deadline?: string },
): Promise<SendEmailResult> {
  const html = loadTemplate('brief_invitation', {
    brief_url: vars.brief_url,
    client_name: vars.client_name,
    deadline: vars.deadline ?? '',
  })
  return sendEmail({ to, subject: 'Your website brief is ready to complete', html })
}

export async function sendBriefReceipt(
  to: string,
  vars: {
    client_name: string
    business_name: string
    pages_summary: string
    next_steps: string
  },
): Promise<SendEmailResult> {
  const html = loadTemplate('brief_receipt', vars)
  return sendEmail({
    to,
    subject: `Brief received — ${vars.business_name}`,
    html,
  })
}

export async function sendSecondMeetingConfirmation(
  to: string,
  vars: { meeting_time: string; meeting_link: string; client_name: string },
): Promise<SendEmailResult> {
  const html = loadTemplate('second_meeting_confirmation', vars)
  return sendEmail({ to, subject: 'Your proposal review meeting is confirmed', html })
}

export async function sendDepositConfirmation(
  to: string,
  vars: {
    client_name: string
    amount: string
    currency: string
    reference: string
  },
): Promise<SendEmailResult> {
  const html = loadTemplate('deposit_confirmation', vars)
  return sendEmail({
    to,
    subject: `Deposit received — ${vars.currency} ${vars.amount}`,
    html,
  })
}

export async function sendFinalPaymentRequest(
  to: string,
  vars: {
    client_name: string
    business_name: string
    total_amount: string
    deposit_paid: string
    balance_due: string
    currency: string
    payment_url: string
    deadline: string
    project_summary: string
  },
): Promise<SendEmailResult> {
  const html = loadTemplate('final_payment_request', vars)
  return sendEmail({
    to,
    subject: `Final payment due — ${vars.business_name}`,
    html,
  })
}

export async function sendNurtureWelcome(
  to: string,
  vars: { client_name: string; unsubscribe_url: string },
): Promise<SendEmailResult> {
  const html = loadTemplate('nurture_welcome', vars)
  return sendEmail({ to, subject: `Welcome from ${config.agency.name}`, html })
}

export async function sendSiteGeneratedAlert(
  to: string,
  vars: {
    lead_name: string
    business_name: string
    preview_url: string
    github_url: string
  },
): Promise<SendEmailResult> {
  const html = loadTemplate('site_generated_alert', vars)
  return sendEmail({
    to,
    subject: `Site generated — ${vars.business_name}`,
    html,
    replyTo: config.agency.email,
  })
}

export async function sendProgressReviewInvitation(
  to: string,
  vars: {
    client_name: string
    meeting_time: string
    meeting_link: string
    preview_url: string
  },
): Promise<SendEmailResult> {
  const html = loadTemplate('progress_review_invitation', vars)
  return sendEmail({ to, subject: 'Your progress review meeting invitation', html })
}
