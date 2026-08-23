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

// The offer block's booking link. Kept out of the preview email on purpose —
// a bare Calendly URL in the body pushed that mail out of Gmail's Primary tab
// on its own. On the page it costs nothing.
const CALENDLY_URL = process.env.CALENDLY_URL || 'https://calendly.com/hugodrum6/30min'

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
</script>
<style>
#ms-offer{position:fixed;top:50%;left:50%;width:540px;max-width:calc(100vw - 32px);max-height:calc(100vh - 32px);overflow:auto;z-index:2147483646;box-sizing:border-box;background:#fff;border:1px solid rgba(30,35,51,.08);border-radius:27px;padding:39px 39px 33px;box-shadow:0 30px 90px rgba(20,18,30,.3);font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;opacity:0;transform:translate(-50%,-50%) translateY(14px);visibility:hidden;transition:opacity .42s cubic-bezier(.16,1,.3,1),transform .42s cubic-bezier(.16,1,.3,1),visibility 0s .42s}
#ms-offer.ms-offer-on{opacity:1;transform:translate(-50%,-50%);visibility:visible;transition-delay:0s}
#ms-offer .ms-o-eyebrow{margin:0 0 15px;font-size:16px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:#745762}
#ms-offer .ms-o-lead{margin:0 0 18px;font-family:Georgia,'Times New Roman',serif;font-weight:300;font-size:39px;line-height:1.2;letter-spacing:-.01em;color:#1e2333}
#ms-offer .ms-o-body{margin:0 0 30px;font-size:21px;line-height:1.6;color:#64748b}
#ms-offer .ms-o-actions{display:flex;align-items:center;gap:24px;flex-wrap:wrap}
#ms-offer .ms-o-claim{flex:1 1 auto;background:#1e2333;color:#fff;border:none;border-radius:999px;padding:20px 33px;font-size:22px;font-weight:600;font-family:inherit;cursor:pointer;transition:background .18s ease}
#ms-offer .ms-o-claim:hover{background:#2e3550}
#ms-offer .ms-o-call{font-size:21px;color:#535f77;text-decoration:underline;text-underline-offset:3px;white-space:nowrap}
#ms-offer .ms-o-call:hover{color:#1e2333}
#ms-offer .ms-o-close{position:absolute;top:18px;right:18px;width:45px;height:45px;padding:0;border:none;background:none;color:#94a3b8;font-size:30px;line-height:1;border-radius:50%;font-family:inherit;cursor:pointer}
#ms-offer .ms-o-close:hover{color:#1e2333;background:#f4f3f8}
#ms-offer button:focus-visible,#ms-offer a:focus-visible{outline:2px solid #745762;outline-offset:2px}
@media (max-width:560px){#ms-offer{max-width:calc(100vw - 24px);padding:32px 26px 26px;border-radius:22px}#ms-offer .ms-o-eyebrow{font-size:13px;margin-bottom:12px}#ms-offer .ms-o-lead{font-size:31px;margin-bottom:14px}#ms-offer .ms-o-body{font-size:17px;margin-bottom:24px}#ms-offer .ms-o-actions{gap:16px}#ms-offer .ms-o-claim{flex:1 1 100%;font-size:19px;padding:17px 28px}#ms-offer .ms-o-call{font-size:17px}#ms-offer .ms-o-close{top:14px;right:14px;width:38px;height:38px;font-size:26px}}
@media (prefers-reduced-motion:reduce){#ms-offer{transform:translate(-50%,-50%);transition:opacity .01s,visibility 0s}}
</style>
<div id="ms-offer" role="region" aria-label="Offer from Mountain Studios">
  <button type="button" class="ms-o-close" id="ms-offer-close" aria-label="Dismiss">&times;</button>
  <p class="ms-o-eyebrow">${name}</p>
  <p class="ms-o-lead">This one&rsquo;s yours for R2000.</p>
  <p class="ms-o-body">We finish it off and hand it over, tweaks included. Happy to walk you through it first.</p>
  <div class="ms-o-actions">
    <button type="button" class="ms-o-claim" id="ms-offer-claim">I want this website</button>
    <a class="ms-o-call" id="ms-offer-call" href="${escapeHtml(CALENDLY_URL)}" target="_blank" rel="noopener">Book 15 minutes</a>
  </div>
</div>
<script>
(function(){
  var card=document.getElementById('ms-offer');
  if(!card)return;
  var pill=document.getElementById('ms-cta');
  var modal=document.getElementById('ms-modal');
  var KEY='ms-offer-${opts.token}';
  var shown=false;
  var dwell;

  // Per token, per visit. A different preview on the same device is a
  // different conversation and gets asked again.
  //
  // Recorded when they act on it — dismiss, claim, or book — never merely
  // because it appeared. Someone who scrolled past mid-read and reloaded has
  // decided nothing, and stamping them on display meant the offer was spent
  // without ever being read.
  function seen(){try{return sessionStorage.getItem(KEY)==='1';}catch(e){return false;}}
  function remember(){try{sessionStorage.setItem(KEY,'1');}catch(e){}}

  function teardown(){window.removeEventListener('scroll',onScroll);clearTimeout(dwell);}

  function show(){
    if(shown||seen())return;
    // Never talk over the claim form.
    if(modal&&modal.style.display==='flex')return;
    shown=true;teardown();
    if(pill)pill.style.display='none';
    card.classList.add('ms-offer-on');
  }

  function hide(){remember();card.classList.remove('ms-offer-on');if(pill)pill.style.display='';}

  function depth(){
    var total=Math.max(document.documentElement.scrollHeight,document.body?document.body.scrollHeight:0);
    if(total<=0)return 0;
    return (window.pageYOffset+window.innerHeight)/total;
  }

  function onScroll(){if(window.pageYOffset>0&&depth()>=0.5)show();}

  // Wired before anything can return early. A card on screen must be
  // clickable no matter how it got there — handlers left unattached behind an
  // early return is a dead dialog the visitor cannot even close.
  document.getElementById('ms-offer-close').onclick=hide;
  document.getElementById('ms-offer-call').onclick=function(){remember();};
  document.getElementById('ms-offer-claim').onclick=function(){
    hide();
    if(modal)modal.style.display='flex';
  };
  document.addEventListener('keydown',function(e){
    if(e.key==='Escape'&&card.classList.contains('ms-offer-on'))hide();
  });

  if(seen())return;
  window.addEventListener('scroll',onScroll,{passive:true});
  // A preview short enough that half is already on screen would never cross
  // the scroll threshold. Time covers it rather than letting the offer
  // silently never appear.
  dwell=setTimeout(show,45000);
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
