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
