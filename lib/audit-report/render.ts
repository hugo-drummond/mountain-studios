import { readFileSync } from 'fs';
import { resolve } from 'path';
import type { AuditReport, Bucket, SecurityHeader } from '../audit/types';
import { FONT_FACE_CSS } from './fonts';

// Color mapping for buckets
const BUCKET_COLORS: Record<Bucket | 'grey', string> = {
  green: '#2f8a4d',
  amber: '#ad7a1f',
  red: '#b13a3a',
  grey: '#9aa0ab',
};

// Status word mapping
const BUCKET_WORDS: Record<Bucket | 'grey', string> = {
  green: 'GOOD',
  amber: 'NEEDS WORK',
  red: 'URGENT',
  grey: 'NOT CHECKED',
};

// Encryption-specific status words
const ENCRYPTION_WORDS: Record<'pass' | 'fail' | 'error', string> = {
  pass: 'SECURE',
  fail: 'NOT SECURE',
  error: 'NOT CHECKED',
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const day = date.getUTCDate();
  const month = date.toLocaleString('en-ZA', { month: 'long', timeZone: 'UTC' });
  const year = date.getUTCFullYear();
  return `${day} ${month} ${year}`;
}

interface CheckValues {
  statusClass: Bucket | 'grey';
  statusWord: string;
  color: string;
  dashoffset: string;
  scoreLabel: string;
}

function deriveCheckValues(check: any, checkType: 'mobile' | 'desktop' | 'accessibility' | 'encryption' | 'protection'): CheckValues {
  if (check.status === 'error') {
    return {
      statusClass: 'grey',
      statusWord: 'NOT CHECKED',
      color: '#9aa0ab',
      dashoffset: '326.7',
      scoreLabel: '—',
    };
  }

  let number = 0;
  let label = '';
  let bucket: Bucket | 'grey' = 'grey';

  switch (checkType) {
    case 'mobile':
    case 'desktop':
    case 'accessibility':
      number = check.score ?? 0;
      label = String(number);
      bucket = check.bucket ?? 'grey';
      break;

    case 'encryption':
      number = check.pass ? 100 : 0;
      label = check.pass ? 'Pass' : 'Fail';
      bucket = check.pass ? 'green' : 'red';
      // Use encryption-specific status words
      const encryptionStatus = check.pass ? 'pass' : 'fail';
      return {
        statusClass: bucket,
        statusWord: ENCRYPTION_WORDS[encryptionStatus],
        color: BUCKET_COLORS[bucket],
        dashoffset: check.pass ? '0' : '326.7',
        scoreLabel: label,
      };
      break;

    case 'protection':
      const presentCount = check.present?.length ?? 0;
      number = Math.round((presentCount / 5) * 100);
      label = `${presentCount}/5`;
      bucket = check.bucket ?? 'grey';
      break;
  }

  const dashoffset = (326.7 * (1 - number / 100)).toFixed(1);

  return {
    statusClass: bucket,
    statusWord: BUCKET_WORDS[bucket],
    color: BUCKET_COLORS[bucket],
    dashoffset,
    scoreLabel: label,
  };
}

export function fillTemplate(report: AuditReport, opts: { businessName: string }): string {
  const templatePath = resolve(process.cwd(), 'lib/audit-report/template.html');
  let template = readFileSync(templatePath, 'utf-8');

  // Inject fonts
  template = template.replace('{{font_face_css}}', FONT_FACE_CSS);

  // Inject cover image as data URI
  const coverImagePath = resolve(process.cwd(), 'public/images/audit-report/cover-mountain.png');
  const coverImageBuffer = readFileSync(coverImagePath);
  const coverImageBase64 = coverImageBuffer.toString('base64');
  const coverImageDataUri = `data:image/png;base64,${coverImageBase64}`;
  template = template.replace('{{cover_image_path}}', coverImageDataUri);

  // Derive check values
  const mobileValues = deriveCheckValues(report.checks.mobile, 'mobile');
  const desktopValues = deriveCheckValues(report.checks.desktop, 'desktop');
  const encryptionValues = deriveCheckValues(report.checks.ssl, 'encryption');
  const protectionValues = deriveCheckValues(report.checks.headers, 'protection');
  const a11yValues = deriveCheckValues(report.checks.accessibility, 'accessibility');

  // Fill mobile check placeholders
  template = template.replace(/{{mobile_status_class}}/g, mobileValues.statusClass);
  template = template.replace(/{{mobile_status_word}}/g, mobileValues.statusWord);
  template = template.replace(/{{mobile_color}}/g, mobileValues.color);
  template = template.replace(/{{mobile_dashoffset}}/g, mobileValues.dashoffset);
  template = template.replace(/{{mobile_score_label}}/g, mobileValues.scoreLabel);

  // Fill desktop check placeholders
  template = template.replace(/{{desktop_status_class}}/g, desktopValues.statusClass);
  template = template.replace(/{{desktop_status_word}}/g, desktopValues.statusWord);
  template = template.replace(/{{desktop_color}}/g, desktopValues.color);
  template = template.replace(/{{desktop_dashoffset}}/g, desktopValues.dashoffset);
  template = template.replace(/{{desktop_score_label}}/g, desktopValues.scoreLabel);

  // Fill encryption check placeholders
  template = template.replace(/{{encryption_status_class}}/g, encryptionValues.statusClass);
  template = template.replace(/{{encryption_status_word}}/g, encryptionValues.statusWord);
  template = template.replace(/{{encryption_color}}/g, encryptionValues.color);
  template = template.replace(/{{encryption_dashoffset}}/g, encryptionValues.dashoffset);
  template = template.replace(/{{encryption_score_label}}/g, encryptionValues.scoreLabel);

  // Fill protection check placeholders
  template = template.replace(/{{protection_status_class}}/g, protectionValues.statusClass);
  template = template.replace(/{{protection_status_word}}/g, protectionValues.statusWord);
  template = template.replace(/{{protection_color}}/g, protectionValues.color);
  template = template.replace(/{{protection_dashoffset}}/g, protectionValues.dashoffset);
  template = template.replace(/{{protection_score_label}}/g, protectionValues.scoreLabel);

  // Fill accessibility check placeholders
  template = template.replace(/{{a11y_status_class}}/g, a11yValues.statusClass);
  template = template.replace(/{{a11y_status_word}}/g, a11yValues.statusWord);
  template = template.replace(/{{a11y_color}}/g, a11yValues.color);
  template = template.replace(/{{a11y_dashoffset}}/g, a11yValues.dashoffset);
  template = template.replace(/{{a11y_score_label}}/g, a11yValues.scoreLabel);

  // Fill metadata
  template = template.replace('{{business_name}}', escapeHtml(opts.businessName));
  template = template.replace('{{website_url}}', escapeHtml(report.url));
  template = template.replace('{{report_date}}', escapeHtml(formatDate(report.ranAt)));

  // Generate summary text
  const summaryText = generateSummaryText(report);
  template = template.replace('{{summary_text}}', escapeHtml(summaryText));

  // Generate summary bullets
  const summaryBullets = generateSummaryBullets(report);
  template = template.replace('{{summary_bullets}}', summaryBullets);

  // Fill Calendly URL
  // Default rather than required: an unset env var must not silently turn the
  // report's only call to action into a dead link. CALENDLY_URL still overrides.
  const calendlyUrl = process.env.CALENDLY_URL || 'https://calendly.com/hugodrum6/30min';
  template = template.replace('{{calendly_url}}', escapeHtml(calendlyUrl));

  return template;
}

function generateSummaryText(report: AuditReport): string {
  // Find the worst finding
  const allBuckets: (Bucket | 'grey')[] = [];

  if (report.checks.mobile.status === 'ok') allBuckets.push(report.checks.mobile.bucket);
  if (report.checks.desktop.status === 'ok') allBuckets.push(report.checks.desktop.bucket);
  if (report.checks.ssl.status === 'ok') allBuckets.push(report.checks.ssl.pass ? 'green' : 'red');
  if (report.checks.headers.status === 'ok') allBuckets.push(report.checks.headers.bucket);

  const hasRed = allBuckets.includes('red');
  const hasAmber = allBuckets.includes('amber');
  const hasGreen = allBuckets.includes('green');
  const allGreen = !hasRed && !hasAmber && allBuckets.length === 5;

  if (allGreen) {
    return 'Your site is passing all the checks we ran. You\'re in better shape than most small business websites. A rebuild would let you add e-commerce, bookings, or better SEO, but your fundamentals are sound.';
  }

  if (hasRed) {
    return 'Your site has some urgent issues that are costing you visitors right now. The good news: most of these are fixable without a redesign. Let\'s talk about what matters most to fix first.';
  }

  if (hasAmber) {
    return 'Your site is functional but there are some quick wins worth tackling. Speed, browser protection and accessibility are all cheaper to improve than you might think, and each one makes the site easier to use for the people already visiting.';
  }

  return 'Your site audit is complete. Let\'s discuss what these results mean for your business.';
}

function generateSummaryBullets(report: AuditReport): string {
  const bullets: string[] = [];

  // Add bullets for failing/amber checks only
  if (report.checks.mobile.status === 'ok' && report.checks.mobile.bucket !== 'green') {
    bullets.push('<li>Mobile speed needs work — visitors on phones are abandoning before the page loads</li>');
  }

  if (report.checks.desktop.status === 'ok' && report.checks.desktop.bucket !== 'green') {
    bullets.push('<li>Desktop speed is slower than it should be — every extra second costs you enquiries</li>');
  }

  if (report.checks.ssl.status === 'ok' && !report.checks.ssl.pass) {
    bullets.push('<li>SSL certificate problem — browsers are warning visitors your site isn\'t secure</li>');
  }

  if (report.checks.headers.status === 'ok' && report.checks.headers.bucket !== 'green') {
    const missingCount = report.checks.headers.missing?.length ?? 0;
    bullets.push(`<li>Browser protections missing — ${missingCount} known browser-level attacks are unprotected</li>`);
  }

  if (report.checks.accessibility.status === 'ok' && report.checks.accessibility.bucket !== 'green') {
    bullets.push('<li>Accessibility needs work — customers with poor eyesight or colour blindness will struggle to use the site</li>');
  }

  // If no bullets (all green), add a passing bullet
  if (bullets.length === 0) {
    bullets.push('<li>All checks passed — your site is in solid shape</li>');
  }

  return bullets.slice(0, 5).join('\n          ');
}

export async function renderReportPdf(report: AuditReport, opts: { businessName: string }): Promise<Buffer> {
  const html = fillTemplate(report, opts);

  // Determine which browser to use
  let browser: any;
  let page: any;

  try {
    // Try to load chromium from @sparticuz/chromium first (for Vercel/Lambda)
    let chromium: any;
    let executablePath: string | undefined;
    let args: string[] | undefined;
    let usingLocalChrome = false;

    // @sparticuz/chromium ships a Linux binary, so it is only usable on the
    // serverless host. Branch on the environment rather than on whether the
    // import happened to work: on a Mac its executablePath() returns a path to
    // a Linux binary that cannot launch.
    const isServerless = !!(process.env.AWS_LAMBDA_FUNCTION_VERSION || process.env.VERCEL);

    if (isServerless) {
      // @sparticuz/chromium puts its whole API on the default export — the
      // namespace object only carries { default, inflate, setupLambdaEnvironment }.
      // Reading executablePath off the namespace yields undefined, which used to
      // throw below and silently degrade every production report to a
      // no-attachment email. Unwrap the default first.
      const mod: any = await import('@sparticuz/chromium');
      chromium = mod.default ?? mod;

      if (typeof chromium.executablePath === 'function') {
        // executablePath is async in recent versions
        executablePath = await chromium.executablePath();
      } else if (chromium.executablePath) {
        // Fallback for older versions
        executablePath = chromium.executablePath;
      }

      args = chromium.args;

      if (!executablePath) {
        throw new Error(
          '@sparticuz/chromium returned no executablePath — the PDF cannot be rendered on this host',
        );
      }

      console.error('[PDF Render] Using @sparticuz/chromium at', executablePath);
    } else {
      usingLocalChrome = true;
    }

    if (!executablePath || usingLocalChrome) {
      if (process.env.AWS_LAMBDA_FUNCTION_VERSION || process.env.VERCEL) {
        throw new Error('@sparticuz/chromium must be installed for production environments');
      }

      // Use local Chrome path
      executablePath =
        process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

      // Verify the path exists
      try {
        const { accessSync } = await import('fs');
        accessSync(executablePath);
        console.error('[PDF Render] Using local Chrome at', executablePath);
      } catch {
        throw new Error(
          `Chrome not found at ${executablePath}. Set CHROME_PATH environment variable or install Google Chrome.`,
        );
      }
    }

    const puppeteer = await import('puppeteer-core');
    browser = await puppeteer.launch({
      headless: true,
      executablePath,
      args: args || ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });

    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    });

    // page.pdf() resolves to a Uint8Array on current puppeteer. Calling
    // .toString('base64') on one of those ignores the argument and returns
    // "37,80,68,70,..." instead of base64 — which sails through every type
    // check and arrives as a multi-megabyte corrupt attachment. Normalise here
    // so no caller can hit it.
    return Buffer.isBuffer(pdf) ? pdf : Buffer.from(pdf);
  } finally {
    if (page) {
      await page.close();
    }
    if (browser) {
      await browser.close();
    }
  }
}
