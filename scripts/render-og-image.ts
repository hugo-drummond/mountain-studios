#!/usr/bin/env tsx
// ---------------------------------------------------------------------------
// Renders the site-wide Open Graph card to public/images/og-default.png.
//
// Run: npx tsx scripts/render-og-image.ts
//
// A build-time asset, not a runtime render — this script exists so the card can
// be regenerated from source rather than being an opaque binary nobody can
// edit. It is not called by the app and never runs on Vercel, so it uses local
// Chrome directly instead of the @sparticuz/chromium dance in
// lib/audit-report/render.ts.
//
// The card had to exist because app/layout.tsx has always declared
// twitter:card = summary_large_image while the site had no image of any kind,
// so every share on WhatsApp, LinkedIn and Facebook rendered a blank grey box.
//
// The three ridge paths below are copied verbatim from PageShell.tsx. They are
// the site's actual signature and the one thing that makes the card
// recognisable at thumbnail size — do not redraw them by hand here.
// ---------------------------------------------------------------------------

import { resolve } from 'path'
import { writeFileSync, accessSync } from 'fs'

const WIDTH = 1200
const HEIGHT = 630

const html = `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Source+Sans+3:wght@400;600;700&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: ${WIDTH}px;
    height: ${HEIGHT}px;
    overflow: hidden;
    position: relative;
    /* The site's own hero gradient, unchanged. */
    background: linear-gradient(180deg,#6f86a6 0%,#8f9ab6 30%,#ad9fbf 55%,#d0b5c6 78%,#e9cad0 100%);
    font-family: 'Source Sans 3', sans-serif;
  }
  .ridge { position: absolute; left: 0; bottom: 0; width: 100%; }
  .content {
    position: absolute;
    left: 76px;
    top: 112px;
    right: 76px;
  }
  .eyebrow {
    font-size: 19px;
    font-weight: 700;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    color: #ffffff;
    margin-bottom: 30px;
  }
  h1 {
    font-family: 'Playfair Display', Georgia, serif;
    font-weight: 400;
    font-size: 78px;
    line-height: 1.04;
    color: #1a1a2e;
    max-width: 830px;
    letter-spacing: -0.005em;
  }
  h1 em { font-style: italic; }
  .sub {
    margin-top: 30px;
    font-size: 26px;
    line-height: 1.45;
    color: #3d4358;
    max-width: 780px;
  }
  /* Wordmark sits on the darkest ridge layer, where there is real contrast
     against white rather than the pale middle of the gradient. */
  .footer {
    position: absolute;
    left: 76px;
    right: 76px;
    bottom: 46px;
    display: flex;
    align-items: baseline;
    justify-content: space-between;
  }
  .wordmark {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 34px;
    color: #ffffff;
  }
  .domain {
    font-size: 22px;
    font-weight: 600;
    letter-spacing: 0.06em;
    color: rgba(255,255,255,0.82);
  }
</style>
</head>
<body>
  <svg class="ridge" viewBox="0 0 1440 280" preserveAspectRatio="none" style="height: 300px;">
    <path d="M0,280 L0,200 Q120,168 240,184 Q360,200 480,170 Q600,140 720,156 Q840,172 960,146 Q1080,122 1200,150 Q1320,178 1440,164 L1440,280 Z" fill="rgba(26,26,46,0.18)" />
    <path d="M0,280 L0,226 Q150,196 300,216 Q450,236 600,202 Q750,168 900,192 Q1050,216 1200,196 Q1320,182 1440,206 L1440,280 Z" fill="rgba(26,26,46,0.30)" />
    <path d="M0,280 L0,250 Q180,226 360,240 Q540,254 720,230 Q900,206 1080,230 Q1260,254 1440,240 L1440,280 Z" fill="rgba(26,26,46,0.42)" />
  </svg>

  <div class="content">
    <div class="eyebrow">Cape Town · South Africa</div>
    <h1>See your website <em>before</em> you pay for it.</h1>
    <p class="sub">A free preview of a real site for your business, in about a minute.</p>
  </div>

  <div class="footer">
    <span class="wordmark">mountain studios</span>
    <span class="domain">mountainstudios.co.za</span>
  </div>
</body>
</html>`

async function main() {
  const executablePath =
    process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

  try {
    accessSync(executablePath)
  } catch {
    throw new Error(
      `Chrome not found at ${executablePath}. Set CHROME_PATH or install Google Chrome.`,
    )
  }

  const puppeteer = await import('puppeteer-core')
  const browser = await puppeteer.launch({
    headless: true,
    executablePath,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  const page = await browser.newPage()
  await page.setViewport({ width: WIDTH, height: HEIGHT, deviceScaleFactor: 1 })
  await page.setContent(html, { waitUntil: 'networkidle0' })
  // networkidle0 fires when the stylesheet lands, which is before the font
  // files it points at have been applied. Without this the card renders in
  // Times New Roman and looks nothing like the site.
  await page.evaluateHandle('document.fonts.ready')

  const buffer = await page.screenshot({ type: 'png' })
  await browser.close()

  const out = resolve(process.cwd(), 'public/images/og-default.png')
  writeFileSync(out, buffer)
  console.log(`Wrote ${out} (${(buffer.length / 1024).toFixed(0)}KB, ${WIDTH}x${HEIGHT})`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
