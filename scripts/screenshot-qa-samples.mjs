import puppeteer from 'puppeteer-core'
import fs from 'fs'
import path from 'path'

const outDir = process.env.HOME + '/Desktop/qa-screenshots'

const samples = [
  { businessName: 'Cape Bistro', businessType: 'Restaurant', businessCategory: 'food-hospitality' },
  { businessName: 'Style & Co', businessType: 'Clothing / Fashion Retail', businessCategory: 'retail' },
  { businessName: 'Cape Plumbing', businessType: 'Plumber', businessCategory: 'trades-construction' },
  { businessName: 'Smile Dental', businessType: 'Dentist', businessCategory: 'health-wellness' },
  { businessName: 'Botha & Associates', businessType: 'Lawyer / Attorney', businessCategory: 'professional' },
  { businessName: 'Lens Studio', businessType: 'Photographer', businessCategory: 'creative' },
  { businessName: 'Peak Fitness', businessType: 'Gym / Fitness Centre', businessCategory: 'fitness-sport' },
  { businessName: 'Happy Paws', businessType: 'Dog Groomer', businessCategory: 'pets' },
  { businessName: 'Sparkle Clean', businessType: 'Cleaning Service', businessCategory: 'home-services' },
  { businessName: 'Bright Minds', businessType: 'Tutor', businessCategory: 'education' },
  { businessName: 'Rev Auto', businessType: 'Auto Mechanic / Workshop', businessCategory: 'automotive' },
  { businessName: 'Cape Properties', businessType: 'Real Estate Agent', businessCategory: 'property' },
  { businessName: 'Dream Events', businessType: 'Event Planner', businessCategory: 'events-entertainment' },
  { businessName: 'ByteWorks', businessType: 'Web Developer / Designer', businessCategory: 'tech-digital' },
  { businessName: 'FrameMotion', businessType: 'Animator / Motion Design', businessCategory: 'creative', label: 'creative-animator' },
]

async function run() {
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })

  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })

  let done = 0

  for (const sample of samples) {
    const label = sample.label || sample.businessCategory
    console.log(`${done + 1}/${samples.length} ${label} (${sample.businessType})...`)

    try {
      const r = await fetch('http://localhost:3000/api/preview/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...sample,
          pages: ['home', 'about', 'services', 'gallery', 'contact'],
          primaryColor: '#2563EB',
          secondaryColor: '#F59E0B',
          country: 'South Africa',
          images: []
        })
      })

      const d = await r.json()
      if (!d.success) { console.log(`  FAIL: ${d.error}`); continue }

      const page = await browser.newPage()
      await page.setViewport({ width: 1440, height: 900 })
      await page.setContent(d.data.html, { waitUntil: 'networkidle0', timeout: 20000 }).catch(() => {})
      await new Promise(r => setTimeout(r, 3000)) // wait for images

      const fname = label.replace(/[^a-zA-Z0-9-]/g, '_').toLowerCase()
      await page.screenshot({
        path: path.join(outDir, `${fname}.jpg`),
        fullPage: true,
        type: 'jpeg',
        quality: 85
      })
      await page.close()
      done++
      console.log(`  Saved: ${fname}.jpg`)
    } catch (e) {
      console.log(`  ERROR: ${e.message?.slice(0, 80)}`)
    }
  }

  await browser.close()
  console.log(`\nDone. ${done}/${samples.length} screenshots saved to ${outDir}`)
}

run()
