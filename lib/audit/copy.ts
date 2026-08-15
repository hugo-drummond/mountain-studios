import type { Bucket, SecurityHeader } from './types';

export function scoreBucket(score: number): Bucket {
  if (score >= 90) return 'green';
  if (score >= 50) return 'amber';
  return 'red';
}

export const SSL_COPY = {
  pass: {
    headline: 'SSL certificate valid',
    body: "Your site is served over HTTPS with a valid certificate. Visitor connections are encrypted and browsers won't show a security warning.",
  },
  invalid: {
    headline: 'SSL certificate problem',
    body: "Your HTTPS certificate isn't valid, so most browsers will show a full-page security warning before anyone reaches your content. Google also demotes sites that trip this. It's usually a same-day fix.",
  },
  no_https: {
    headline: 'No secure HTTPS connection',
    body: "We couldn't open your site over HTTPS. Browsers label HTTP-only sites 'Not secure' in the address bar, and anything typed into a form on the page travels in plain text.",
  },
  error: {
    headline: "We couldn't complete the SSL check",
    body: "Your site didn't respond in time, so we can't call this a pass or a fail. Worth a manual look — it may also mean the site is slow or intermittently down.",
  },
} as const;

export const HEADER_LABELS: Record<SecurityHeader, string> = {
  'strict-transport-security': 'Strict-Transport-Security — forces browsers to always use HTTPS',
  'x-content-type-options': 'X-Content-Type-Options — stops browsers guessing file types',
  'x-frame-options': 'X-Frame-Options — stops other sites framing yours for clickjacking',
  'content-security-policy': 'Content-Security-Policy — limits what scripts are allowed to run',
  'referrer-policy': 'Referrer-Policy — controls what you leak to other sites when visitors click away',
};

export const HEADERS_COPY = {
  green: {
    headline: 'Security headers in good shape',
    body: 'Your server sends most of the recommended security headers. This is better than the majority of small business sites we scan.',
  },
  amber: {
    headline: 'Some security headers missing',
    body: 'Your server sends some of the recommended security headers but not all. Each missing one leaves a known browser-level attack open that a few lines of server config would close.',
  },
  red: {
    headline: 'Security headers missing',
    body: 'Your server sends almost none of the recommended security headers. Visitors are exposed to clickjacking, content-sniffing and downgrade attacks that are cheap to prevent.',
  },
  error: {
    headline: "We couldn't read your security headers",
    body: "Your site didn't return a response we could read, so this check is inconclusive rather than failed.",
  },
} as const;

export const MOBILE_COPY = {
  green: {
    headline: 'Mobile speed is strong',
    body: 'Your site loads fast on a mobile connection. Keep it that way — speed is one of the few ranking factors you fully control.',
  },
  amber: {
    headline: 'Mobile speed needs work',
    body: "Your site is slower than it should be on a phone. Most visitors arrive on mobile, and every extra second of load time costs you enquiries before anyone sees your work.",
  },
  red: {
    headline: 'Mobile speed is costing you enquiries',
    body: 'Your site is slow on a phone. Over half of mobile visitors abandon a page that takes more than three seconds, so a large share of your traffic is leaving before the page renders.',
  },
} as const;

export const DESKTOP_COPY = {
  green: {
    headline: 'Desktop speed is strong',
    body: 'Your site loads fast on desktop. No action needed here.',
  },
  amber: {
    headline: 'Desktop speed needs work',
    body: 'Your site is slower than it should be on desktop. Usually oversized images and render-blocking scripts — both fixable without a rebuild.',
  },
  red: {
    headline: 'Desktop speed is poor',
    body: 'Your site is slow even on a desktop connection with a proper broadband link. That points at heavy page weight or a struggling host.',
  },
} as const;

export const GENERIC_ERROR_COPY = {
  headline: "We couldn't complete this check",
  body: "Something went wrong on our side while running this check. It isn't a pass or a fail — we'll re-run it.",
} as const;

export const PSI_ERROR_COPY = {
  timeout: {
    headline: "Speed test didn't finish",
    body: "Google's speed test timed out on your site. That often means the page itself is very slow to respond, but we won't score it on an incomplete run.",
  },
  rate_limit: {
    headline: 'Speed test temporarily unavailable',
    body: "Google's speed test hit its rate limit while we were running your audit. Nothing to do with your site — we'll re-run this one.",
  },
  unreachable: {
    headline: "Google couldn't load your site",
    body: "Google's speed test couldn't load your page at all. That usually means the site is down, blocking automated visitors, or the address needs correcting.",
  },
  api_error: {
    headline: 'Speed test unavailable',
    body: "We couldn't get a speed score this time. This is a problem on our side, not yours — we'll re-run it.",
  },
  blocked: {
    headline: 'Address could not be checked',
    body: "The address supplied isn't a public website we can test. Reply with the full address and we'll run it again.",
  },
} as const;
