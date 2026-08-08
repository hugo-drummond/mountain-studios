import { randomBytes } from 'crypto'

// ---------------------------------------------------------------------------
// Shared client previews.
//
// A rep generates a client's website, saves it, and gets a link they can paste
// into WhatsApp or their own email. The client opens their real site on their
// own phone rather than looking at it over the rep's shoulder.
//
// Reps send the link themselves, from their own address. Nothing here sends
// mail on their behalf: thirty people cold-mailing prospects through the
// company's SES identity would put the domain's reputation — and every invoice
// and brief that depends on it — behind their prospecting.
// ---------------------------------------------------------------------------

export const PREVIEW_BUCKET = 'previews'

// Base58: no 0/O/I/l, so a token read aloud down a phone line survives.
const ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
const TOKEN_LENGTH = 16

/**
 * ~93 bits of entropy. These links carry a business's details and are not
 * behind a login, so the token is the only thing standing between a stranger
 * and someone's preview. It has to be unguessable, not merely unique.
 */
export function makeToken(): string {
  const bytes = randomBytes(TOKEN_LENGTH)
  let out = ''
  for (let i = 0; i < TOKEN_LENGTH; i++) {
    out += ALPHABET[bytes[i] % ALPHABET.length]
  }
  return out
}

/**
 * Link-preview fetchers, not people.
 *
 * This matters more than it looks. WhatsApp, iMessage and Slack all fetch a URL
 * the moment it is pasted, to build their preview card. Counting those would
 * tell a rep "your client opened it" the instant they hit send — the view count
 * would be a lie precisely when they are relying on it to decide who to chase.
 */
const BOT_PATTERN =
  /bot|crawler|spider|preview|whatsapp|facebookexternalhit|slack|discord|telegram|twitter|linkedin|skype|embedly|quora|pinterest|vkshare|redditbot|applebot|curl|wget|python-requests|headless|lighthouse|pagespeed|monitor|uptime/i

export function isBot(userAgent: string | null): boolean {
  if (!userAgent) return true
  return BOT_PATTERN.test(userAgent)
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/**
 * Inject the share-card tags, the noindex rule and the client-facing CTA into
 * the stored page at serve time.
 *
 * Done here rather than at save time so the stored file stays exactly what the
 * generator produced — the CTA can be changed later without rewriting every
 * preview ever saved.
 */
export function decorate(html: string, opts: { token: string; businessName: string; claimed: boolean }): string {
  const name = escapeHtml(opts.businessName)

  const head = `
<meta name="robots" content="noindex, nofollow, noarchive">
<meta property="og:title" content="${name} — your new website">
<meta property="og:description" content="A preview of what your website could look like. Built by Mountain Studios.">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">`

  const cta = opts.claimed
    ? ''
    : `
<div id="ms-cta" style="position:fixed;left:50%;transform:translateX(-50%);bottom:20px;z-index:2147483647;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <button id="ms-cta-open" style="background:#1e2333;color:#fff;border:none;border-radius:999px;padding:14px 28px;font-size:15px;font-weight:600;cursor:pointer;box-shadow:0 8px 30px rgba(0,0,0,.35);">
    I want this website
  </button>
</div>
<div id="ms-modal" role="dialog" aria-modal="true" aria-labelledby="ms-modal-title" style="display:none;position:fixed;inset:0;z-index:2147483647;background:rgba(10,12,20,.75);align-items:center;justify-content:center;padding:20px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="background:#fff;border-radius:18px;padding:28px;max-width:400px;width:100%;box-shadow:0 30px 80px rgba(0,0,0,.4);">
    <h2 id="ms-modal-title" style="margin:0 0 6px;font-size:20px;color:#1e2333;font-weight:600;">Let&rsquo;s get it live</h2>
    <p style="margin:0 0 18px;font-size:14px;color:#64748b;line-height:1.6;">Leave your details and we&rsquo;ll be in touch about ${name}.</p>
    <form id="ms-form">
      <input id="ms-name" required placeholder="Your name" style="width:100%;box-sizing:border-box;font-size:15px;padding:12px 14px;margin-bottom:10px;border:1px solid #e2e0ea;border-radius:10px;outline:none;">
      <input id="ms-phone" required placeholder="Phone number" inputmode="tel" style="width:100%;box-sizing:border-box;font-size:15px;padding:12px 14px;margin-bottom:10px;border:1px solid #e2e0ea;border-radius:10px;outline:none;">
      <textarea id="ms-note" rows="3" placeholder="Anything you'd change? (optional)" style="width:100%;box-sizing:border-box;font-size:15px;padding:12px 14px;margin-bottom:14px;border:1px solid #e2e0ea;border-radius:10px;outline:none;resize:vertical;"></textarea>
      <p id="ms-error" style="display:none;margin:0 0 10px;font-size:13px;color:#b91c1c;"></p>
      <button type="submit" id="ms-submit" style="width:100%;background:#1e2333;color:#fff;border:none;border-radius:999px;padding:13px;font-size:15px;font-weight:600;cursor:pointer;">Send my details</button>
      <button type="button" id="ms-cancel" style="width:100%;background:none;border:none;color:#94a3b8;font-size:13px;padding:12px 0 0;cursor:pointer;">Not right now</button>
    </form>
    <div id="ms-done" style="display:none;text-align:center;padding:8px 0;">
      <p style="margin:0 0 6px;font-size:18px;color:#1e2333;font-weight:600;">Got it.</p>
      <p style="margin:0;font-size:14px;color:#64748b;line-height:1.6;">We&rsquo;ll be in touch shortly.</p>
    </div>
  </div>
</div>
<script>
(function(){
  var modal=document.getElementById('ms-modal');
  var open=document.getElementById('ms-cta-open');
  var cancel=document.getElementById('ms-cancel');
  var form=document.getElementById('ms-form');
  var err=document.getElementById('ms-error');
  var submit=document.getElementById('ms-submit');
  open.onclick=function(){modal.style.display='flex';};
  cancel.onclick=function(){modal.style.display='none';};
  modal.onclick=function(e){if(e.target===modal)modal.style.display='none';};
  form.onsubmit=function(e){
    e.preventDefault();
    submit.disabled=true;submit.textContent='Sending…';err.style.display='none';
    fetch('/api/preview/${opts.token}/claim',{
      method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        name:document.getElementById('ms-name').value,
        phone:document.getElementById('ms-phone').value,
        note:document.getElementById('ms-note').value
      })
    }).then(function(r){return r.json();}).then(function(d){
      if(!d.success)throw new Error(d.error||'Something went wrong.');
      form.style.display='none';
      document.getElementById('ms-done').style.display='block';
      document.getElementById('ms-cta').style.display='none';
    }).catch(function(e){
      err.textContent=e.message||'Could not send. Please try again.';
      err.style.display='block';
      submit.disabled=false;submit.textContent='Send my details';
    });
  };
})();
</script>`

  // Fall back to appending if the document is not shaped as expected, so a
  // template change can never silently drop the CTA.
  const withHead = html.includes('</head>') ? html.replace('</head>', `${head}\n</head>`) : head + html
  return withHead.includes('</body>') ? withHead.replace('</body>', `${cta}\n</body>`) : withHead + cta
}

export function expiredPage(businessName: string): string {
  return `<!doctype html>
<html lang="en-ZA"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Preview expired — Mountain Studios</title></head>
<body style="margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#f9f9fe;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;padding:24px;">
  <div style="max-width:420px;text-align:center;">
    <p style="font-size:12px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:#745762;margin:0 0 12px;">Mountain Studios</p>
    <h1 style="font-family:Georgia,serif;font-weight:300;font-size:28px;color:#2e333a;margin:0 0 12px;">This preview has expired</h1>
    <p style="font-size:15px;color:#535f77;line-height:1.7;margin:0 0 24px;">
      The preview for ${escapeHtml(businessName)} is no longer available. If you&rsquo;d still like to see it, we&rsquo;ll happily put it back up.
    </p>
    <a href="mailto:hello@mountainstudios.co.za" style="display:inline-block;background:#535f77;color:#fff;text-decoration:none;font-size:14px;font-weight:600;padding:12px 28px;border-radius:999px;">Get in touch</a>
  </div>
</body></html>`
}
