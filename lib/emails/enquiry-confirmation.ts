// ---------------------------------------------------------------------------
// The "we got it" email.
//
// Sent to the person who filled in the Get Started wizard or the contact form.
// Until this existed both forms captured the enquiry and told the sender
// nothing — they got silence while Hugo got the lead.
//
// Deliberately one renderer for both forms: the promise made is the same, and
// two copies drift.
// ---------------------------------------------------------------------------

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export function renderEnquiryConfirmation(fullName: string): { subject: string; html: string } {
  // Both forms require a name, so this normally fires. Falls back to a bare
  // "Hi," rather than greeting somebody by an empty string.
  const first = (fullName || '').trim().split(/\s+/)[0]
  const greeting = first ? `Hi ${escapeHtml(first)},` : 'Hi,'

  const html = `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;">
    <p style="font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#745762;margin:0 0 16px;">Mountain Studios</p>
    <p style="font-size:15px;color:#334155;line-height:1.6;margin:0 0 20px;">${greeting}</p>
    <p style="font-size:15px;color:#334155;line-height:1.6;margin:0 0 24px;">Thanks for reaching out to us. We&rsquo;ll do some research and be in contact shortly for further information.</p>
    <p style="font-size:15px;color:#334155;line-height:1.6;margin:0 0 4px;">Thanks</p>
    <p style="font-size:15px;color:#334155;line-height:1.6;margin:0;">Hugo</p>
  </div>`

  return { subject: 'Thanks for reaching out to us', html }
}
