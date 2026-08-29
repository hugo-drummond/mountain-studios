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
export function decorate(html: string, opts: { token: string; businessName: string; claimed: boolean; offer?: boolean; cta?: boolean }): string {
  const name = escapeHtml(opts.businessName)
  const showOffer = opts.offer !== false
  const showCta = opts.cta !== false

  const head = `
<meta name="robots" content="noindex, nofollow, noarchive">
<meta property="og:title" content="${name} — your new website">
<meta property="og:description" content="A preview of what your website could look like. Built by Mountain Studios.">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">`

  const cta = opts.claimed || !showCta ? '' : `
<div id="ms-cta" style="position:fixed;left:50%;transform:translateX(-50%);bottom:20px;z-index:2147483647;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <button id="ms-cta-open" style="background:#1e2333;color:#fff;border:none;border-radius:999px;padding:14px 28px;font-size:15px;font-weight:600;cursor:pointer;box-shadow:0 8px 30px rgba(0,0,0,.35);">
    I want this website
  </button>
</div>
<div id="ms-modal" role="dialog" aria-modal="true" aria-labelledby="ms-modal-title" style="display:none;position:fixed;inset:0;z-index:2147483647;background:rgba(10,12,20,.75);align-items:center;justify-content:center;padding:20px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="position:relative;background:#fff;border-radius:18px;padding:28px;max-width:400px;width:100%;box-shadow:0 30px 80px rgba(0,0,0,.4);">
    <button type="button" id="ms-form-close" aria-label="Close" style="position:absolute;top:12px;right:12px;width:34px;height:34px;padding:0;border:none;background:none;color:#94a3b8;font-size:26px;line-height:1;border-radius:50%;font-family:inherit;cursor:pointer;">&times;</button>
    <h2 id="ms-modal-title" style="margin:0 0 6px;font-size:20px;color:#1e2333;font-weight:600;">Let&rsquo;s get it live</h2>
    <p id="ms-modal-sub" style="margin:0 0 18px;font-size:14px;color:#64748b;line-height:1.6;">Leave your details and we&rsquo;ll be in touch about ${name}.</p>
    <form id="ms-form">
      <input id="ms-name" required placeholder="Your name" style="width:100%;box-sizing:border-box;font-size:15px;padding:12px 14px;margin-bottom:10px;border:1px solid #e2e0ea;border-radius:10px;outline:none;">
      <input id="ms-phone" required placeholder="Phone number" inputmode="tel" style="width:100%;box-sizing:border-box;font-size:15px;padding:12px 14px;margin-bottom:14px;border:1px solid #e2e0ea;border-radius:10px;outline:none;">
      <p id="ms-error" style="display:none;margin:0 0 10px;font-size:13px;color:#b91c1c;"></p>
      <button type="submit" id="ms-submit" style="width:100%;background:#1e2333;color:#fff;border:none;border-radius:999px;padding:13px;font-size:15px;font-weight:600;cursor:pointer;">Send my details</button>
    </form>
    <div id="ms-done" style="display:none;text-align:center;padding:4px 0 6px;">
      <p style="margin:0 0 10px;font-size:27px;color:#1e2333;font-weight:600;line-height:1.2;">Got it.</p>
      <p style="margin:0 0 24px;font-size:15px;color:#64748b;line-height:1.6;">We&rsquo;ll be in touch shortly.</p>
      <p style="margin:0 0 10px;font-size:15px;color:#1e2333;line-height:1.6;">Want to get things live sooner?</p>
      <a id="ms-calendly-book" href="${escapeHtml(CALENDLY_URL)}" target="_blank" rel="noopener" style="display:inline-block;font-size:19px;font-weight:600;color:#1e2333;text-decoration:underline;text-underline-offset:4px;">Book 15 minutes</a>
    </div>
  </div>
</div>
<script>
(function(){
  var modal=document.getElementById('ms-modal');
  var open=document.getElementById('ms-cta-open');
  var form=document.getElementById('ms-form');
  var err=document.getElementById('ms-error');
  var submit=document.getElementById('ms-submit');
  // The stored page is somebody else's site. Its CSS can outrank an inline
  // style, so every change to the dialog's visibility is set !important.
  function openForm(){
    modal.style.setProperty('display','flex','important');
    modal.style.setProperty('visibility','visible','important');
    modal.style.setProperty('opacity','1','important');
    modal.style.setProperty('pointer-events','auto','important');
  }
  function closeForm(){modal.style.setProperty('display','none','important');}
  window.msOpenPreviewForm=openForm;
  open.onclick=openForm;
  document.getElementById('ms-form-close').onclick=closeForm;
  modal.onclick=function(e){if(e.target===modal)closeForm();};
  form.onsubmit=function(e){
    e.preventDefault();
    submit.disabled=true;submit.textContent='Sending…';err.style.display='none';
    fetch('/api/preview/${opts.token}/claim',{
      method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        name:document.getElementById('ms-name').value,
        phone:document.getElementById('ms-phone').value,
        note:''
      })
    }).then(function(r){return r.json();}).then(function(d){
      if(!d.success)throw new Error(d.error||'Something went wrong.');
      form.style.setProperty('display','none','important');
      document.getElementById('ms-modal-title').style.setProperty('display','none','important');
      document.getElementById('ms-modal-sub').style.setProperty('display','none','important');
      document.getElementById('ms-done').style.setProperty('display','block','important');
      document.getElementById('ms-cta').style.setProperty('display','none','important');
    }).catch(function(e){
      err.textContent=e.message||'Could not send. Please try again.';
      err.style.display='block';
      submit.disabled=false;submit.textContent='Send my details';
    });
  };
  // Read the ids lib/site-events.ts wrote. Same origin, so localStorage is
  // shared with the React app even though this page is a raw document and
  // SiteEvents never mounts here. The KEYS MUST MATCH that file: 'ms_vid' and
  // 'ms_sid', each holding {id, at}. Someone who opened this straight from the
  // email has neither, which is normal — the click is still counted, just not
  // attributed to a browser we have seen before.
  function msRead(store,key){
    try{
      var raw=store.getItem(key);
      if(!raw)return null;
      var parsed=JSON.parse(raw);
      return parsed&&parsed.id?parsed.id:null;
    }catch(err){return null;}
  }
  var calendlyLink=document.getElementById('ms-calendly-book');
  if(calendlyLink){
    calendlyLink.onclick=function(){
      try{
        var payload={source:'preview',events:[{event:'calendly_click',props:{from:'preview',token:'${opts.token}'}}]};
        var vid=msRead(localStorage,'ms_vid');if(vid)payload.visitorId=vid;
        var sid=msRead(sessionStorage,'ms_sid');if(sid)payload.sessionId=sid;
        var body=JSON.stringify(payload);
        // The link opens a new tab and this document may be torn down; a plain
        // fetch can be cancelled mid-flight, sendBeacon cannot.
        if(typeof navigator!=='undefined'&&navigator.sendBeacon){
          navigator.sendBeacon('/api/site-event',new Blob([body],{type:'application/json'}));
        }else{
          fetch('/api/site-event',{method:'POST',headers:{'Content-Type':'application/json'},body:body,keepalive:true}).catch(function(){});
        }
      }catch(err){}
    };
  }
})();
</script>${showOffer ? `
<style>
#ms-offer{position:fixed;top:50%;left:50%;width:540px;max-width:calc(100vw - 32px);max-height:calc(100vh - 32px);overflow:auto;z-index:2147483646;box-sizing:border-box;background:#fff;border:1px solid rgba(30,35,51,.08);border-radius:27px;padding:39px 39px 33px;box-shadow:0 30px 90px rgba(20,18,30,.3);font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;opacity:0;transform:translate(-50%,-50%) translateY(14px);visibility:hidden;transition:opacity .42s cubic-bezier(.16,1,.3,1),transform .42s cubic-bezier(.16,1,.3,1),visibility 0s .42s}
#ms-offer.ms-offer-on{opacity:1;transform:translate(-50%,-50%);visibility:visible;transition-delay:0s}
#ms-offer .ms-o-eyebrow{margin:0 0 15px;font-size:16px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:#745762}
#ms-offer .ms-o-lead{margin:0 0 18px;font-family:Georgia,'Times New Roman',serif;font-weight:300;font-size:39px;line-height:1.2;letter-spacing:-.01em;color:#1e2333}
#ms-offer .ms-o-body{margin:0 0 30px;font-size:21px;line-height:1.6;color:#64748b}
#ms-offer .ms-o-actions{display:block}
#ms-offer .ms-o-claim{display:block;width:100%;background:#1e2333;color:#fff;border:none;border-radius:999px;padding:20px 33px;font-size:22px;font-weight:600;font-family:inherit;cursor:pointer;transition:background .18s ease}
#ms-offer .ms-o-claim:hover{background:#2e3550}
#ms-offer .ms-o-close{position:absolute;top:18px;right:18px;width:45px;height:45px;padding:0;border:none;background:none;color:#94a3b8;font-size:30px;line-height:1;border-radius:50%;font-family:inherit;cursor:pointer}
#ms-offer .ms-o-close:hover{color:#1e2333;background:#f4f3f8}
#ms-offer button:focus-visible,#ms-offer a:focus-visible{outline:2px solid #745762;outline-offset:2px}
/* The stored page is a generated client site, and its stylesheet sets
   pointer-events:none on a button while it is pressed. That makes the button
   transparent to hit-testing between mousedown and mouseup, so the browser
   fires click on the parent element and the button's own handler never runs.
   Measured on a live preview: pointer-events went auto -> none -> auto across
   one press, and the click landed on .ms-o-actions. Every control injected
   here has to opt out of that rule explicitly. */
#ms-offer button,#ms-offer button:active,#ms-cta button,#ms-cta button:active,#ms-modal button,#ms-modal button:active,#ms-modal a,#ms-modal a:active{pointer-events:auto!important}
@media (max-width:560px){#ms-offer{max-width:calc(100vw - 24px);padding:32px 26px 26px;border-radius:22px}#ms-offer .ms-o-eyebrow{font-size:13px;margin-bottom:12px}#ms-offer .ms-o-lead{font-size:31px;margin-bottom:14px}#ms-offer .ms-o-body{font-size:17px;margin-bottom:24px}#ms-offer .ms-o-claim{font-size:19px;padding:17px 28px}#ms-offer .ms-o-close{top:14px;right:14px;width:38px;height:38px;font-size:26px}}
@media (prefers-reduced-motion:reduce){#ms-offer{transform:translate(-50%,-50%);transition:opacity .01s,visibility 0s}}
</style>
<div id="ms-offer" role="region" aria-label="Offer from Mountain Studios">
  <button type="button" class="ms-o-close" id="ms-offer-close" aria-label="Dismiss">&times;</button>
  <p class="ms-o-eyebrow">${name}</p>
  <p class="ms-o-lead">This one&rsquo;s yours for R2000.</p>
  <p class="ms-o-body">We finish it off and hand it over, tweaks included. Happy to walk you through it first.</p>
  <div class="ms-o-actions">
    <button type="button" class="ms-o-claim" id="ms-offer-claim">Yes, I want it</button>
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
  function openForm(){
    if(!modal)return;
    if(window.msOpenPreviewForm){window.msOpenPreviewForm();return;}
    modal.style.setProperty('display','flex','important');
    modal.style.setProperty('visibility','visible','important');
    modal.style.setProperty('opacity','1','important');
    modal.style.setProperty('pointer-events','auto','important');
  }
  document.getElementById('ms-offer-claim').onclick=function(){hide();openForm();};
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
</script>` : ''}`

  // Its own IIFE and its own const, deliberately outside the offer block. The
  // CTA pill and the offer card are both omitted for chatbot-built previews,
  // and scroll depth and dwell still matter on those — they are the only
  // signal of whether anyone actually read the thing.
  const tracker = `
<script>
(function(){
  try{
    var token='${opts.token}';
    function msRead(store,key){
      try{
        var raw=store.getItem(key);
        if(!raw)return null;
        var parsed=JSON.parse(raw);
        return parsed&&parsed.id?parsed.id:null;
      }catch(err){return null;}
    }
    var visitorId=msRead(localStorage,'ms_vid');
    // The session id MUST be the one lib/site-events.ts uses — key 'ms_sid',
    // shape {id, at:<epoch ms>}. An earlier version minted its own under
    // 'ms-sid-<token>', which produced a second session id on the same origin
    // and meant preview events could never join to the rest of that visit.
    // Minted here when absent, because a preview opened straight from the
    // email is a real session that nothing else has started yet.
    var sessionId=msRead(sessionStorage,'ms_sid');
    if(!sessionId){
      try{
        sessionId=(typeof crypto!=='undefined'&&crypto.randomUUID)
          ?crypto.randomUUID()
          :'v-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,10);
        sessionStorage.setItem('ms_sid',JSON.stringify({id:sessionId,at:Date.now()}));
      }catch(e){sessionId=null;}
    }
    var maxScroll=0;
    var pageStartTime=new Date().getTime();
    function depth(){
      var total=Math.max(document.documentElement.scrollHeight,document.body?document.body.scrollHeight:0);
      if(total<=0)return 0;
      return(window.pageYOffset+window.innerHeight)/total;
    }
    function track(event,fields){
      try{
        var payload={source:'preview',events:[{event:event}]};
        if(fields){
          if(fields.value_num!==undefined)payload.events[0].value_num=fields.value_num;
          if(fields.props)payload.events[0].props=fields.props;
        }
        if(visitorId)payload.visitorId=visitorId;
        if(sessionId)payload.sessionId=sessionId;
        var body=JSON.stringify(payload);
        if(typeof navigator!=='undefined'&&navigator.sendBeacon){
          navigator.sendBeacon('/api/site-event',new Blob([body],{type:'application/json'}));
        }else{
          fetch('/api/site-event',{method:'POST',headers:{'Content-Type':'application/json'},body:body,keepalive:true}).catch(function(){});
        }
      }catch(err){}
    }
    function onScroll(){
      var d=depth();
      if(d>maxScroll)maxScroll=d;
    }
    window.addEventListener('scroll',onScroll,{passive:true});
    window.addEventListener('pagehide',function(){
      track('preview_scroll',{value_num:Math.round(maxScroll*100)});
      var seconds=Math.round((new Date().getTime()-pageStartTime)/1000);
      track('preview_dwell',{value_num:seconds});
    });
    var offerCard=document.getElementById('ms-offer');
    if(offerCard){
      var offerShown=false;
      try{
        var observer=new MutationObserver(function(mutations){
          try{
            for(var i=0;i<mutations.length;i++){
              var m=mutations[i];
              if(m.type==='attributes'&&m.attributeName==='class'){
                var hasClass=offerCard.classList.contains('ms-offer-on');
                if(hasClass&&!offerShown){
                  offerShown=true;
                  var d=depth();
                  var trigger=d>=0.5?'scroll':'dwell';
                  track('offer_shown',{props:{trigger:trigger}});
                }else if(!hasClass&&offerShown){
                  offerShown=false;
                  track('offer_dismissed');
                }
              }
            }
          }catch(err){}
        });
        observer.observe(offerCard,{attributes:true});
      }catch(err){}
    }
  }catch(err){}
})();
</script>
`


  // Fall back to appending if the document is not shaped as expected, so a
  // template change can never silently drop the CTA.
  const withHead = html.includes('</head>') ? html.replace('</head>', `${head}\n</head>`) : head + html
  const injected = cta + tracker
  return withHead.includes('</body>') ? withHead.replace('</body>', `${injected}\n</body>`) : withHead + injected
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
