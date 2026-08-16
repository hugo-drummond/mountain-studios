import { SESv2Client, SendEmailCommand } from '@aws-sdk/client-sesv2'

// Sends through the SES API rather than SMTP.
//
// lib/email.ts is nodemailer over SMTP, and its SMTP_* variables are unset in
// production. The SES SMTP password only exists inside Supabase's SMTP settings
// and reads back masked, so it cannot be recovered — but the AWS keys for the
// same account are available, and the API needs nothing else.
//
// mountainstudios.co.za is a verified SES identity with DKIM and a custom MAIL
// FROM, and the account is out of the sandbox (50,000/day), so this can send to
// any address.
const FROM = 'Mountain Studios <hello@mountainstudios.co.za>'

let _client: SESv2Client | null = null

function client(): SESv2Client {
  if (_client) return _client

  const region = process.env.AWS_REGION
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

  if (!region || !accessKeyId || !secretAccessKey) {
    throw new Error('Missing AWS_REGION, AWS_ACCESS_KEY_ID or AWS_SECRET_ACCESS_KEY.')
  }

  _client = new SESv2Client({ region, credentials: { accessKeyId, secretAccessKey } })
  return _client
}

export async function sendMail({
  to,
  subject,
  html,
  replyTo,
}: {
  to: string
  subject: string
  html: string
  replyTo?: string
}): Promise<string | undefined> {
  const res = await client().send(
    new SendEmailCommand({
      FromEmailAddress: FROM,
      Destination: { ToAddresses: [to] },
      ReplyToAddresses: replyTo ? [replyTo] : undefined,
      Content: {
        Simple: {
          Subject: { Data: subject, Charset: 'UTF-8' },
          Body: { Html: { Data: html, Charset: 'UTF-8' } },
        },
      },
    }),
  )

  return res.MessageId
}

// Encode subject for RFC 2047 so accented characters don't corrupt the header
function encodeRfc2047Subject(subject: string): string {
  // Check if the subject contains only ASCII characters
  if (/^[\x00-\x7F]*$/.test(subject)) {
    return subject
  }

  // Encode the subject in UTF-8 using base64
  const buffer = Buffer.from(subject, 'utf-8')
  const base64 = buffer.toString('base64')
  return `=?UTF-8?B?${base64}?=`
}

// Wrap base64 at 76 characters per line (RFC 2045)
function wrapBase64(base64: string): string {
  const chunks = []
  for (let i = 0; i < base64.length; i += 76) {
    chunks.push(base64.slice(i, i + 76))
  }
  return chunks.join('\r\n')
}

export async function sendMailWithAttachment(opts: {
  to: string
  subject: string
  html: string
  replyTo?: string
  attachment: { filename: string; content: Buffer; contentType: string }
}): Promise<string | undefined> {
  const boundary = `boundary_${Date.now()}_${Math.random().toString(36).slice(2)}`

  // Build the MIME message
  const headers = [
    `From: ${FROM}`,
    `To: ${opts.to}`,
    `Subject: ${encodeRfc2047Subject(opts.subject)}`,
    `MIME-Version: 1.0`,
    ...(opts.replyTo ? [`Reply-To: ${opts.replyTo}`] : []),
    `Content-Type: multipart/mixed; boundary="${boundary}"`,
  ].join('\r\n')

  // HTML body part.
  //
  // Base64 rather than 8bit: the audit email is full of em-dashes and curly
  // quotes, and an 8bit part carrying raw UTF-8 is not reliably delivered
  // through a raw-MIME send. Base64 is 7-bit clean, so nothing can mangle it.
  const bodyPart = [
    `--${boundary}`,
    `Content-Type: text/html; charset=UTF-8`,
    `Content-Transfer-Encoding: base64`,
    '',
    wrapBase64(Buffer.from(opts.html, 'utf8').toString('base64')),
  ].join('\r\n')

  // Attachment part (base64-encoded)
  const base64Content = opts.attachment.content.toString('base64')
  const wrappedBase64 = wrapBase64(base64Content)
  const attachmentPart = [
    `--${boundary}`,
    `Content-Type: ${opts.attachment.contentType}`,
    `Content-Disposition: attachment; filename="${opts.attachment.filename}"`,
    `Content-Transfer-Encoding: base64`,
    '',
    wrappedBase64,
  ].join('\r\n')

  // Closing boundary
  const closing = `--${boundary}--`

  // Combine all parts
  const mimeMessage = [headers, '', bodyPart, attachmentPart, closing].join('\r\n')

  // Send via Raw content
  const res = await client().send(
    new SendEmailCommand({
      FromEmailAddress: FROM,
      Destination: { ToAddresses: [opts.to] },
      Content: {
        Raw: {
          Data: Buffer.from(mimeMessage, 'utf-8'),
        },
      },
    }),
  )

  return res.MessageId
}
