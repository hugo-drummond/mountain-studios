import fs from 'fs'
import path from 'path'

const outDir = process.env.HOME + '/Desktop/qa-screenshots'

// One representative type per category template
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
  { businessName: 'FrameMotion', businessType: 'Animator / Motion Design', businessCategory: 'creative' },
]

async function run() {
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })

  let done = 0
  let failed = 0

  for (const sample of samples) {
    const label = sample.businessCategory + (sample.businessType === 'Animator / Motion Design' ? '-animator' : '')
    console.log(`Generating: ${label} (${sample.businessType})...`)

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
      if (!d.success) {
        console.log(`  FAIL: ${d.error}`)
        failed++
        continue
      }

      const fname = label.replace(/[^a-zA-Z0-9-]/g, '_').toLowerCase()
      fs.writeFileSync(path.join(outDir, `${fname}.html`), d.data.html)
      console.log(`  Saved: ${fname}.html`)
      done++
    } catch (e) {
      console.log(`  ERROR: ${e.message?.slice(0, 80)}`)
      failed++
    }
  }

  console.log(`\nDone. ${done} generated, ${failed} failed.`)
  console.log(`HTML files saved to: ${outDir}`)
}

run()
