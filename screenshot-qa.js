const puppeteer = require('puppeteer-core');
const fs = require('fs');

const types = [
  ['Restaurant','food-hospitality'],
  ['Clothing / Fashion Retail','retail'],
  ['Plumber','trades-construction'],
  ['Dentist','health-wellness'],
  ['Lawyer / Attorney','professional'],
  ['Photographer','creative'],
  ['Gym / Fitness Centre','fitness-sport'],
  ['Cleaning Service','home-services'],
  ['Tutor','education'],
  ['Auto Mechanic / Workshop','automotive'],
  ['Real Estate Agent','property'],
  ['Event Planner','events-entertainment'],
  ['E-commerce','tech-digital'],
  ['Dog Groomer','pets'],
  ['Art Gallery / Art Shop','retail'],
];

async function run() {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  });
  
  const dir = '/tmp/qa-screenshots';
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  
  for (const [type, cat] of types) {
    const fname = type.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
    console.log(`Generating: ${type}...`);
    
    try {
      const r = await fetch('http://localhost:3002/api/preview/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName: 'TestBiz',
          businessType: type,
          businessCategory: cat,
          pages: ['home','about','services','gallery','contact'],
          primaryColor: '#2563EB',
          secondaryColor: '#F59E0B',
          country: 'South Africa',
          images: []
        })
      });
      const d = await r.json();
      if (!d.success) { console.log('  FAILED:', d.error); continue; }
      
      const page = await browser.newPage();
      await page.setViewport({ width: 1440, height: 900 });
      await page.setContent(d.data.html, { waitUntil: 'networkidle0', timeout: 20000 }).catch(() => {});
      
      const screenshotPath = `${dir}/${fname}.png`;
      await page.screenshot({ path: screenshotPath, fullPage: true });
      await page.close();
      
      const kb = Math.round(fs.statSync(screenshotPath).size / 1024);
      console.log(`  ✓ ${screenshotPath} (${kb}KB)`);
    } catch (e) {
      console.log(`  ERROR: ${e.message}`);
    }
  }
  
  await browser.close();
  console.log('\nDone!');
}

run();
