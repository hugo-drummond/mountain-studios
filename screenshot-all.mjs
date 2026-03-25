import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const types = `Restaurant|food-hospitality
Café / Coffee Shop|food-hospitality
Bakery|food-hospitality
Bar / Pub|food-hospitality
Butcher / Deli|food-hospitality
Catering|food-hospitality
Fast Food / Takeaway|food-hospitality
Food Truck|food-hospitality
Juice / Smoothie Bar|food-hospitality
Pizza Shop|food-hospitality
Sushi / Asian Restaurant|food-hospitality
Ice Cream / Gelato Shop|food-hospitality
Wine Shop / Liquor Store|food-hospitality
Guest House / B&B|food-hospitality
Hotel|food-hospitality
Clothing / Fashion Retail|retail
Food & Grocery Retail|retail
General Retail Store|retail
Boutique / Fashion Store|retail
Florist|retail
Gift Shop|retail
Jeweller|retail
Furniture Store|retail
Hardware Store|retail
Bookshop|retail
Pharmacy|retail
Toy Store|retail
Electronics Store|retail
Sports Store|retail
Art Gallery / Art Shop|retail
Grocery / Supermarket|retail
Thrift / Second-hand Store|retail
Garden Centre / Nursery|retail
Plumber|trades-construction
Electrician|trades-construction
Builder / General Contractor|trades-construction
Joiner / Carpenter|trades-construction
Welder / Metalworker|trades-construction
Paving / Tiling|trades-construction
Roofer|trades-construction
Painter / Decorator|trades-construction
Glazier|trades-construction
Locksmith|trades-construction
Plasterer|trades-construction
Fencing Contractor|trades-construction
Scaffolding|trades-construction
Demolition|trades-construction
Solar / Renewable Energy|trades-construction
HVAC / Air Conditioning|trades-construction
Borehole / Irrigation|trades-construction
Dentist|health-wellness
Doctor / GP|health-wellness
Physiotherapist|health-wellness
Chiropractor|health-wellness
Optometrist|health-wellness
Hair Salon / Barber|health-wellness
Beauty Salon / Spa|health-wellness
Massage Therapist|health-wellness
Dietitian / Nutritionist|health-wellness
Psychologist / Therapist|health-wellness
Speech Therapist|health-wellness
Occupational Therapist|health-wellness
Audiologist|health-wellness
Podiatrist|health-wellness
Alternative / Holistic Health|health-wellness
Tattoo / Piercing Studio|health-wellness
Lawyer / Attorney|professional
Accountant|professional
Consultant|professional
Financial Advisor|professional
Insurance Agent / Broker|professional
Recruitment / Staffing|professional
Marketing Agency|professional
Business Coach|professional
Translation / Interpreting|professional
Notary / Commissioner of Oaths|professional
Debt Counsellor|professional
Customs / Freight Broker|professional
Photographer|creative
Videographer|creative
Graphic Designer|creative
Interior Designer|creative
Copywriter / Content Creator|creative
Print Shop / Signage|creative
Music Producer / Studio|creative
Craft / Handmade Goods|creative
Fashion Designer|creative
Animator / Motion Design|creative
Architect|creative
Personal Trainer|fitness-sport
Yoga Studio|fitness-sport
Gym / Fitness Centre|fitness-sport
Martial Arts|fitness-sport
Dance Studio|fitness-sport
Swimming / Aquatics|fitness-sport
Golf Coach / Pro Shop|fitness-sport
Sports Coaching|fitness-sport
Cleaning Service|home-services
Landscaper / Gardener|home-services
Pest Control|home-services
Security Company|home-services
Moving / Removals|home-services
Pool Service|home-services
Laundry / Dry Cleaning|home-services
Appliance Repair|home-services
Handyman|home-services
Upholstery / Curtains|home-services
Waste Removal / Skip Hire|home-services
Music Teacher / School|education
Tutor|education
Driving School|education
Language School|education
Preschool / Crèche|education
After-school / Enrichment|education
Training / Skills Academy|education
Art / Craft Classes|education
Computer / Coding Classes|education
First Aid / Safety Training|education
Auto Mechanic / Workshop|automotive
Panel Beater / Auto Body|automotive
Car Wash / Detailing|automotive
Tyre Shop|automotive
Car Dealership|automotive
Auto Electrician|automotive
Tow Truck / Roadside Assist|automotive
Motorcycle Shop|automotive
Real Estate Agent|property
Surveyor|property
Property Management|property
Home Staging|property
Town Planner|property
Event Planner|events-entertainment
DJ / MC|events-entertainment
Wedding Venue / Services|events-entertainment
Photo Booth|events-entertainment
Party Supplies / Décor|events-entertainment
Entertainment / Performer|events-entertainment
Venue Hire|events-entertainment
Web Developer / Designer|tech-digital
IT Support / Services|tech-digital
App Developer|tech-digital
Digital Marketing|tech-digital
E-commerce|tech-digital
Cybersecurity|tech-digital
Data Analytics / BI|tech-digital
Dog Groomer|pets
Pet Shop|pets
Kennels / Cattery|pets
Dog Walker / Pet Sitter|pets
Dog Trainer|pets
Pet Services|pets
Veterinarian|pets`.split('\n').map(l => { const [name, cat] = l.split('|'); return { name: name.trim(), cat: cat.trim() }; });

const outDir = process.env.HOME + '/Desktop/qa-screenshots';

async function run() {
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  let done = 0;
  let failed = 0;

  for (const { name, cat } of types) {
    try {
      const r = await fetch('http://localhost:3002/api/preview/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName: name.split('/')[0].trim().split(' ').slice(0, 2).join(' '),
          businessType: name,
          businessCategory: cat,
          pages: ['home', 'about', 'services', 'gallery', 'contact'],
          primaryColor: '#2563EB',
          secondaryColor: '#F59E0B',
          country: 'South Africa',
          images: []
        })
      });
      const d = await r.json();
      if (!d.success) { console.log('✗ FAIL:', name); failed++; done++; continue; }

      const page = await browser.newPage();
      await page.setViewport({ width: 1440, height: 900 });
      await page.setContent(d.data.html, { waitUntil: 'networkidle0', timeout: 15000 }).catch(() => {});
      
      // Wait for images to load
      await new Promise(r => setTimeout(r, 2000));

      const fname = name.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
      await page.screenshot({
        path: path.join(outDir, `${cat}__${fname}.jpg`),
        fullPage: true, type: "jpeg", quality: 80
      });
      await page.close();

      done++;
      if (done % 10 === 0) console.log(`Progress: ${done}/${types.length}`);
    } catch (e) {
      console.log('✗ ERROR:', name, e.message?.slice(0, 80));
      failed++;
      done++;
    }
  }

  await browser.close();
  console.log(`\nDone. ${done} generated, ${failed} failed.`);
  console.log(`Screenshots saved to: ${outDir}`);
}

run();
