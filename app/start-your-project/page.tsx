'use client'

import { useState, useEffect, useRef } from 'react'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { pagePrices, type PageType, type Region } from '../../constants/pricing'
import NavBar from '../../components/site/NavBar'
// Supabase import removed — images now use browser object URLs for preview

const TOTAL_STEPS = 9

const countries = [
  { name: 'South Africa', region: 'South Africa' as Region, flag: '🇿🇦' },
  { name: 'United Kingdom', region: 'United Kingdom' as Region, flag: '🇬🇧' },
  { name: 'United States', region: 'United States' as Region, flag: '🇺🇸' },
  { name: 'Australia', region: 'Australia' as Region, flag: '🇦🇺' },
  { name: 'Germany', region: 'Europe' as Region, flag: '🇩🇪' },
  { name: 'France', region: 'Europe' as Region, flag: '🇫🇷' },
  { name: 'Netherlands', region: 'Europe' as Region, flag: '🇳🇱' },
  { name: 'Ireland', region: 'Europe' as Region, flag: '🇮🇪' },
  { name: 'Canada', region: 'Other' as Region, flag: '🇨🇦' },
  { name: 'New Zealand', region: 'Other' as Region, flag: '🇳🇿' },
  { name: 'Portugal', region: 'Europe' as Region, flag: '🇵🇹' },
  { name: 'Spain', region: 'Europe' as Region, flag: '🇪🇸' },
  { name: 'Italy', region: 'Europe' as Region, flag: '🇮🇹' },
  { name: 'Switzerland', region: 'Europe' as Region, flag: '🇨🇭' },
  { name: 'Sweden', region: 'Europe' as Region, flag: '🇸🇪' },
  { name: 'Norway', region: 'Europe' as Region, flag: '🇳🇴' },
  { name: 'Denmark', region: 'Europe' as Region, flag: '🇩🇰' },
  { name: 'Belgium', region: 'Europe' as Region, flag: '🇧🇪' },
  { name: 'Austria', region: 'Europe' as Region, flag: '🇦🇹' },
  { name: 'United Arab Emirates', region: 'Other' as Region, flag: '🇦🇪' },
  { name: 'Singapore', region: 'Other' as Region, flag: '🇸🇬' },
  { name: 'Hong Kong', region: 'Other' as Region, flag: '🇭🇰' },
  { name: 'Japan', region: 'Other' as Region, flag: '🇯🇵' },
  { name: 'India', region: 'Other' as Region, flag: '🇮🇳' },
  { name: 'Brazil', region: 'Other' as Region, flag: '🇧🇷' },
  { name: 'Mexico', region: 'Other' as Region, flag: '🇲🇽' },
  { name: 'Nigeria', region: 'Other' as Region, flag: '🇳🇬' },
  { name: 'Kenya', region: 'Other' as Region, flag: '🇰🇪' },
  { name: 'Ghana', region: 'Other' as Region, flag: '🇬🇭' },
  { name: 'Namibia', region: 'South Africa' as Region, flag: '🇳🇦' },
  { name: 'Botswana', region: 'South Africa' as Region, flag: '🇧🇼' },
  { name: 'Mozambique', region: 'South Africa' as Region, flag: '🇲🇿' },
  { name: 'Zimbabwe', region: 'South Africa' as Region, flag: '🇿🇼' },
  { name: 'Mauritius', region: 'Other' as Region, flag: '🇲🇺' },
]

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

// Image limits per category — matches how many images each template actually uses
const categoryImageLimits: Record<BusinessCategory, number> = {
  'food-hospitality': 5,     // visual: hero + 3 service + 1 gallery
  'retail': 5,
  'health-wellness': 5,
  'fitness-sport': 5,
  'pets': 5,
  'events-entertainment': 5,
  'tech-digital': 2,         // service (dark): hero bg + 1
  'professional': 4,         // service: 2x2 image grid
  'trades-construction': 2,  // service: hero bg + 1
  'home-services': 2,
  'education': 2,
  'automotive': 2,
  'other': 3,
  'creative': 9,             // portfolio: hero + 3 service + 5 gallery
  'property': 4,             // property: hero + 3 service
}

type BusinessCategory =
  | 'food-hospitality' | 'retail' | 'trades-construction' | 'health-wellness'
  | 'professional' | 'creative' | 'fitness-sport' | 'home-services'
  | 'education' | 'automotive' | 'property' | 'events-entertainment'
  | 'tech-digital' | 'pets' | 'other'

interface BusinessTypeEntry {
  name: string
  category: BusinessCategory
  keywords: string[]
}

const businessTypeData: BusinessTypeEntry[] = [
  // Food & Hospitality
  { name: 'Restaurant', category: 'food-hospitality', keywords: ['eatery', 'diner', 'bistro', 'dining'] },
  { name: 'Café / Coffee Shop', category: 'food-hospitality', keywords: ['coffee', 'espresso', 'barista', 'tea room'] },
  { name: 'Bakery', category: 'food-hospitality', keywords: ['bread', 'pastry', 'cakes', 'patisserie'] },
  { name: 'Bar / Pub', category: 'food-hospitality', keywords: ['tavern', 'lounge', 'cocktail', 'nightclub', 'club'] },
  { name: 'Butcher / Deli', category: 'food-hospitality', keywords: ['meat', 'deli', 'charcuterie', 'butchery'] },
  { name: 'Catering', category: 'food-hospitality', keywords: ['caterer', 'event food', 'banquet', 'functions'] },
  { name: 'Fast Food / Takeaway', category: 'food-hospitality', keywords: ['takeout', 'quick service', 'drive-through', 'food truck'] },
  { name: 'Food Truck', category: 'food-hospitality', keywords: ['mobile food', 'street food', 'vendor'] },
  { name: 'Juice / Smoothie Bar', category: 'food-hospitality', keywords: ['juice bar', 'smoothies', 'health drinks', 'açai'] },
  { name: 'Pizza Shop', category: 'food-hospitality', keywords: ['pizzeria', 'pizza delivery'] },
  { name: 'Sushi / Asian Restaurant', category: 'food-hospitality', keywords: ['sushi bar', 'japanese', 'chinese', 'thai', 'asian cuisine'] },
  { name: 'Ice Cream / Gelato Shop', category: 'food-hospitality', keywords: ['ice cream parlour', 'frozen yogurt', 'dessert'] },
  { name: 'Wine Shop / Liquor Store', category: 'food-hospitality', keywords: ['bottle store', 'off-licence', 'wine merchant'] },
  { name: 'Guest House / B&B', category: 'food-hospitality', keywords: ['bed and breakfast', 'lodge', 'inn', 'accommodation', 'airbnb'] },
  { name: 'Hotel', category: 'food-hospitality', keywords: ['hospitality', 'resort', 'motel'] },

  // Retail
  { name: 'Clothing / Fashion Retail', category: 'retail', keywords: ['clothing', 'fashion', 'garments', 'boutique', 'apparel'] },
  { name: 'Food & Grocery Retail', category: 'retail', keywords: ['grocery', 'fresh produce', 'food store', 'market', 'superette'] },
  { name: 'General Retail Store', category: 'retail', keywords: ['shop', 'store', 'retailer', 'merchandise'] },
  { name: 'Boutique / Fashion Store', category: 'retail', keywords: ['clothing', 'fashion', 'apparel', 'dress shop', 'menswear', 'womenswear'] },
  { name: 'Florist', category: 'retail', keywords: ['flowers', 'flower shop', 'floral', 'bouquets'] },
  { name: 'Gift Shop', category: 'retail', keywords: ['gifts', 'souvenirs', 'novelties', 'presents'] },
  { name: 'Jeweller', category: 'retail', keywords: ['jewelry', 'jewellery', 'goldsmith', 'watches', 'accessories'] },
  { name: 'Furniture Store', category: 'retail', keywords: ['home furnishings', 'décor', 'upholstery'] },
  { name: 'Hardware Store', category: 'retail', keywords: ['tools', 'diy', 'building supplies'] },
  { name: 'Bookshop', category: 'retail', keywords: ['books', 'bookstore', 'stationery'] },
  { name: 'Pharmacy', category: 'retail', keywords: ['chemist', 'drugstore', 'dispensary', 'medicine'] },
  { name: 'Toy Store', category: 'retail', keywords: ['toys', 'games', 'kids', 'children'] },
  { name: 'Electronics Store', category: 'retail', keywords: ['tech store', 'gadgets', 'computers', 'phones'] },
  { name: 'Sports Store', category: 'retail', keywords: ['sporting goods', 'outdoor gear', 'athletics'] },
  { name: 'Art Gallery / Art Shop', category: 'retail', keywords: ['gallery', 'art dealer', 'paintings', 'prints'] },
  { name: 'Grocery / Supermarket', category: 'retail', keywords: ['grocer', 'supermarket', 'convenience store', 'mini mart'] },
  { name: 'Thrift / Second-hand Store', category: 'retail', keywords: ['thrift shop', 'consignment', 'vintage', 'pre-owned'] },
  { name: 'Garden Centre / Nursery', category: 'retail', keywords: ['plants', 'garden shop', 'seedlings', 'landscaping supplies'] },

  // Trades & Construction
  { name: 'Plumber', category: 'trades-construction', keywords: ['plumbing', 'pipes', 'drains', 'water', 'geyser'] },
  { name: 'Electrician', category: 'trades-construction', keywords: ['electrical', 'wiring', 'sparky', 'power'] },
  { name: 'Builder / General Contractor', category: 'trades-construction', keywords: ['construction', 'building', 'contractor', 'renovations'] },
  { name: 'Joiner / Carpenter', category: 'trades-construction', keywords: ['carpentry', 'woodwork', 'cabinetmaker', 'carpenter', 'wood'] },
  { name: 'Welder / Metalworker', category: 'trades-construction', keywords: ['welding', 'fabrication', 'steel', 'metal', 'ironwork'] },
  { name: 'Paving / Tiling', category: 'trades-construction', keywords: ['paver', 'tiler', 'tiles', 'flooring', 'brick'] },
  { name: 'Roofer', category: 'trades-construction', keywords: ['roofing', 'gutters', 'waterproofing', 'thatch'] },
  { name: 'Painter / Decorator', category: 'trades-construction', keywords: ['painting', 'decorating', 'wallpaper', 'house painter'] },
  { name: 'Glazier', category: 'trades-construction', keywords: ['glass', 'windows', 'windscreen', 'shopfront'] },
  { name: 'Locksmith', category: 'trades-construction', keywords: ['locks', 'keys', 'security', 'safes'] },
  { name: 'Plasterer', category: 'trades-construction', keywords: ['plastering', 'dry wall', 'skimming', 'ceilings'] },
  { name: 'Fencing Contractor', category: 'trades-construction', keywords: ['fences', 'gates', 'palisade', 'boundary'] },
  { name: 'Scaffolding', category: 'trades-construction', keywords: ['scaffolder', 'access equipment'] },
  { name: 'Demolition', category: 'trades-construction', keywords: ['demolishing', 'wrecking', 'clearing'] },
  { name: 'Solar / Renewable Energy', category: 'trades-construction', keywords: ['solar panels', 'solar installer', 'renewable', 'energy', 'inverter'] },
  { name: 'HVAC / Air Conditioning', category: 'trades-construction', keywords: ['aircon', 'heating', 'ventilation', 'cooling', 'refrigeration'] },
  { name: 'Borehole / Irrigation', category: 'trades-construction', keywords: ['drilling', 'water supply', 'sprinkler'] },

  // Health & Wellness
  { name: 'Dentist', category: 'health-wellness', keywords: ['dental', 'orthodontist', 'teeth', 'oral care'] },
  { name: 'Doctor / GP', category: 'health-wellness', keywords: ['physician', 'medical practice', 'clinic', 'general practitioner'] },
  { name: 'Physiotherapist', category: 'health-wellness', keywords: ['physio', 'physical therapy', 'rehabilitation'] },
  { name: 'Chiropractor', category: 'health-wellness', keywords: ['chiropractic', 'spine', 'back pain', 'adjustment'] },
  { name: 'Optometrist', category: 'health-wellness', keywords: ['eye care', 'glasses', 'optician', 'vision', 'contact lenses'] },
  { name: 'Hair Salon / Barber', category: 'health-wellness', keywords: ['hairdresser', 'barber shop', 'hair stylist', 'haircut', 'salon'] },
  { name: 'Beauty Salon / Spa', category: 'health-wellness', keywords: ['beauty', 'spa', 'facial', 'nails', 'waxing', 'skincare', 'aesthetics'] },
  { name: 'Massage Therapist', category: 'health-wellness', keywords: ['massage', 'therapeutic massage', 'deep tissue', 'relaxation'] },
  { name: 'Dietitian / Nutritionist', category: 'health-wellness', keywords: ['nutrition', 'diet', 'meal plan', 'healthy eating'] },
  { name: 'Psychologist / Therapist', category: 'health-wellness', keywords: ['counsellor', 'therapy', 'mental health', 'counseling'] },
  { name: 'Speech Therapist', category: 'health-wellness', keywords: ['speech pathologist', 'language therapy'] },
  { name: 'Occupational Therapist', category: 'health-wellness', keywords: ['OT', 'occupational therapy', 'rehab'] },
  { name: 'Audiologist', category: 'health-wellness', keywords: ['hearing', 'hearing aids', 'ear care'] },
  { name: 'Podiatrist', category: 'health-wellness', keywords: ['foot care', 'chiropodist', 'feet'] },
  { name: 'Alternative / Holistic Health', category: 'health-wellness', keywords: ['homeopathy', 'acupuncture', 'naturopath', 'reiki', 'herbalist'] },
  { name: 'Tattoo / Piercing Studio', category: 'health-wellness', keywords: ['tattoo artist', 'body art', 'piercing', 'ink'] },

  // Professional Services
  { name: 'Lawyer / Attorney', category: 'professional', keywords: ['legal', 'law firm', 'solicitor', 'advocate', 'legal services'] },
  { name: 'Accountant', category: 'professional', keywords: ['accounting', 'bookkeeper', 'tax', 'audit', 'bookkeeping'] },
  { name: 'Consultant', category: 'professional', keywords: ['consulting', 'advisory', 'management consultant', 'strategy'] },
  { name: 'Financial Advisor', category: 'professional', keywords: ['financial planner', 'wealth management', 'investment', 'broker'] },
  { name: 'Insurance Agent / Broker', category: 'professional', keywords: ['insurance', 'underwriter', 'cover', 'policy'] },
  { name: 'Recruitment / Staffing', category: 'professional', keywords: ['recruiter', 'HR', 'headhunter', 'employment agency'] },
  { name: 'Marketing Agency', category: 'professional', keywords: ['advertising', 'PR', 'public relations', 'branding', 'digital marketing'] },
  { name: 'Business Coach', category: 'professional', keywords: ['coaching', 'mentoring', 'executive coach', 'life coach'] },
  { name: 'Translation / Interpreting', category: 'professional', keywords: ['translator', 'interpreter', 'language services', 'localisation'] },
  { name: 'Notary / Commissioner of Oaths', category: 'professional', keywords: ['notary public', 'legal documents'] },
  { name: 'Debt Counsellor', category: 'professional', keywords: ['debt review', 'credit counselling', 'financial recovery'] },
  { name: 'Customs / Freight Broker', category: 'professional', keywords: ['logistics', 'shipping', 'import export', 'freight forwarding'] },

  // Creative
  { name: 'Photographer', category: 'creative', keywords: ['photography', 'photo studio', 'portrait', 'wedding photographer'] },
  { name: 'Videographer', category: 'creative', keywords: ['video production', 'filmmaker', 'cinematographer', 'drone'] },
  { name: 'Graphic Designer', category: 'creative', keywords: ['design', 'branding', 'logo', 'visual design', 'illustrator'] },
  { name: 'Interior Designer', category: 'creative', keywords: ['interior décor', 'home styling', 'space planning'] },
  { name: 'Copywriter / Content Creator', category: 'creative', keywords: ['writing', 'content', 'blogger', 'freelance writer'] },
  { name: 'Print Shop / Signage', category: 'creative', keywords: ['printing', 'signs', 'banners', 'branding materials', 'vinyl'] },
  { name: 'Music Producer / Studio', category: 'creative', keywords: ['recording studio', 'audio production', 'sound engineer'] },
  { name: 'Craft / Handmade Goods', category: 'creative', keywords: ['artisan', 'handmade', 'crafts', 'etsy', 'maker'] },
  { name: 'Fashion Designer', category: 'creative', keywords: ['clothing designer', 'seamstress', 'tailor', 'dressmaker', 'bespoke'] },
  { name: 'Animator / Motion Design', category: 'creative', keywords: ['animation', '3D', 'motion graphics', 'VFX'] },

  // Fitness & Sport
  { name: 'Personal Trainer', category: 'fitness-sport', keywords: ['PT', 'fitness coach', 'training', 'exercise'] },
  { name: 'Yoga Studio', category: 'fitness-sport', keywords: ['yoga', 'pilates', 'meditation', 'mindfulness'] },
  { name: 'Gym / Fitness Centre', category: 'fitness-sport', keywords: ['gymnasium', 'health club', 'fitness', 'crossfit'] },
  { name: 'Martial Arts', category: 'fitness-sport', keywords: ['karate', 'judo', 'MMA', 'boxing', 'taekwondo', 'self-defence'] },
  { name: 'Dance Studio', category: 'fitness-sport', keywords: ['dance school', 'ballet', 'contemporary', 'hip hop'] },
  { name: 'Swimming / Aquatics', category: 'fitness-sport', keywords: ['swim school', 'pool', 'aqua aerobics'] },
  { name: 'Golf Coach / Pro Shop', category: 'fitness-sport', keywords: ['golf', 'golf lessons', 'driving range'] },
  { name: 'Sports Coaching', category: 'fitness-sport', keywords: ['coach', 'athletics', 'sports academy', 'training camp'] },

  // Home Services
  { name: 'Cleaning Service', category: 'home-services', keywords: ['cleaner', 'maid', 'domestic', 'janitorial', 'house cleaning'] },
  { name: 'Landscaper / Gardener', category: 'home-services', keywords: ['landscaping', 'lawn care', 'garden maintenance', 'grass cutting', 'tree felling'] },
  { name: 'Pest Control', category: 'home-services', keywords: ['exterminator', 'fumigation', 'bugs', 'termites', 'rodent control'] },
  { name: 'Security Company', category: 'home-services', keywords: ['alarm', 'armed response', 'CCTV', 'surveillance', 'guarding'] },
  { name: 'Moving / Removals', category: 'home-services', keywords: ['movers', 'moving company', 'relocation', 'transport', 'removals'] },
  { name: 'Pool Service', category: 'home-services', keywords: ['pool cleaning', 'pool maintenance', 'pool repair'] },
  { name: 'Laundry / Dry Cleaning', category: 'home-services', keywords: ['laundromat', 'dry cleaner', 'ironing', 'wash and fold'] },
  { name: 'Appliance Repair', category: 'home-services', keywords: ['washing machine repair', 'fridge repair', 'appliance service', 'technician'] },
  { name: 'Handyman', category: 'home-services', keywords: ['odd jobs', 'maintenance', 'repairs', 'fix-it'] },
  { name: 'Upholstery / Curtains', category: 'home-services', keywords: ['reupholster', 'blinds', 'soft furnishings', 'curtain maker'] },
  { name: 'Waste Removal / Skip Hire', category: 'home-services', keywords: ['rubble removal', 'junk removal', 'waste disposal', 'skip'] },

  // Education
  { name: 'Music Teacher / School', category: 'education', keywords: ['music lessons', 'piano', 'guitar', 'singing', 'instrument'] },
  { name: 'Tutor', category: 'education', keywords: ['tutoring', 'maths tutor', 'private lessons', 'academic'] },
  { name: 'Driving School', category: 'education', keywords: ['driving lessons', 'driving instructor', 'learner'] },
  { name: 'Language School', category: 'education', keywords: ['language classes', 'english school', 'foreign language'] },
  { name: 'Preschool / Crèche', category: 'education', keywords: ['daycare', 'nursery school', 'childcare', 'early learning'] },
  { name: 'After-school / Enrichment', category: 'education', keywords: ['after-care', 'kids activities', 'holiday programme'] },
  { name: 'Training / Skills Academy', category: 'education', keywords: ['skills training', 'short course', 'certification', 'workshop'] },
  { name: 'Art / Craft Classes', category: 'education', keywords: ['art school', 'painting classes', 'pottery', 'ceramics'] },
  { name: 'Computer / Coding Classes', category: 'education', keywords: ['coding bootcamp', 'programming', 'IT training'] },
  { name: 'First Aid / Safety Training', category: 'education', keywords: ['CPR', 'health and safety', 'fire training'] },

  // Automotive
  { name: 'Auto Mechanic / Workshop', category: 'automotive', keywords: ['car repair', 'mechanic', 'auto repair', 'garage', 'service centre'] },
  { name: 'Panel Beater / Auto Body', category: 'automotive', keywords: ['body shop', 'spray painting', 'dent repair', 'accident repair'] },
  { name: 'Car Wash / Detailing', category: 'automotive', keywords: ['valet', 'car detailing', 'car cleaning', 'auto detailing'] },
  { name: 'Tyre Shop', category: 'automotive', keywords: ['tyres', 'tires', 'wheel alignment', 'balancing', 'puncture'] },
  { name: 'Car Dealership', category: 'automotive', keywords: ['car sales', 'used cars', 'vehicle dealer', 'auto dealer'] },
  { name: 'Auto Electrician', category: 'automotive', keywords: ['car electrics', 'vehicle wiring', 'starter motor'] },
  { name: 'Tow Truck / Roadside Assist', category: 'automotive', keywords: ['towing', 'breakdown', 'roadside assistance', 'recovery'] },
  { name: 'Motorcycle Shop', category: 'automotive', keywords: ['motorbike', 'scooter', 'motorcycle repair', 'bike shop'] },

  // Property
  { name: 'Real Estate Agent', category: 'property', keywords: ['estate agent', 'property sales', 'realtor', 'property management'] },
  { name: 'Architect', category: 'creative', keywords: ['architecture', 'building design', 'architectural plans'] },
  { name: 'Surveyor', category: 'property', keywords: ['land surveyor', 'quantity surveyor', 'property valuation'] },
  { name: 'Property Management', category: 'property', keywords: ['landlord', 'rental management', 'letting agent', 'body corporate'] },
  { name: 'Home Staging', category: 'property', keywords: ['property styling', 'show house', 'staging'] },
  { name: 'Town Planner', category: 'property', keywords: ['urban planning', 'zoning', 'land use'] },

  // Events & Entertainment
  { name: 'Event Planner', category: 'events-entertainment', keywords: ['event management', 'party planner', 'conference organiser', 'functions'] },
  { name: 'DJ / MC', category: 'events-entertainment', keywords: ['disc jockey', 'master of ceremonies', 'music entertainment'] },
  { name: 'Wedding Venue / Services', category: 'events-entertainment', keywords: ['wedding planner', 'bridal', 'ceremony', 'reception'] },
  { name: 'Photo Booth', category: 'events-entertainment', keywords: ['photo booth rental', 'selfie booth', 'event photos'] },
  { name: 'Party Supplies / Décor', category: 'events-entertainment', keywords: ['balloons', 'party hire', 'event décor', 'tables and chairs'] },
  { name: 'Entertainment / Performer', category: 'events-entertainment', keywords: ['magician', 'comedian', 'band', 'musician', 'entertainer'] },
  { name: 'Venue Hire', category: 'events-entertainment', keywords: ['function venue', 'conference centre', 'hall hire', 'event space'] },

  // Tech & Digital
  { name: 'Web Developer / Designer', category: 'tech-digital', keywords: ['web development', 'website', 'frontend', 'fullstack', 'web design'] },
  { name: 'IT Support / Services', category: 'tech-digital', keywords: ['tech support', 'computer repair', 'IT consulting', 'helpdesk', 'managed IT'] },
  { name: 'App Developer', category: 'tech-digital', keywords: ['mobile app', 'software developer', 'iOS', 'android', 'software'] },
  { name: 'Digital Marketing', category: 'tech-digital', keywords: ['SEO', 'SEM', 'social media marketing', 'PPC', 'online marketing'] },
  { name: 'E-commerce', category: 'tech-digital', keywords: ['online store', 'shopify', 'web shop', 'dropshipping'] },
  { name: 'Cybersecurity', category: 'tech-digital', keywords: ['security consulting', 'penetration testing', 'data protection'] },
  { name: 'Data Analytics / BI', category: 'tech-digital', keywords: ['data science', 'business intelligence', 'dashboards', 'reporting'] },

  // Pets
  { name: 'Dog Groomer', category: 'pets', keywords: ['pet grooming', 'dog wash', 'grooming salon', 'dog parlour'] },
  { name: 'Pet Shop', category: 'pets', keywords: ['pet store', 'pet supplies', 'aquarium', 'pet food'] },
  { name: 'Kennels / Cattery', category: 'pets', keywords: ['boarding', 'pet boarding', 'dog kennel', 'cat hotel', 'pet hotel'] },
  { name: 'Dog Walker / Pet Sitter', category: 'pets', keywords: ['dog walking', 'pet sitting', 'pet care', 'house sitting'] },
  { name: 'Dog Trainer', category: 'pets', keywords: ['obedience', 'puppy training', 'dog behaviour', 'pet training'] },
  { name: 'Pet Services', category: 'pets', keywords: ['animal care', 'pet transport', 'pet photography'] },
  { name: 'Veterinarian', category: 'pets', keywords: ['vet', 'animal doctor', 'pet health', 'animal hospital'] },

  // Other
  { name: 'Other', category: 'other', keywords: [] },
]

// Sort alphabetically, "Other" always last
const sortedBusinessTypes = [
  ...businessTypeData.filter((t) => t.name !== 'Other').sort((a, b) => a.name.localeCompare(b.name)),
  businessTypeData.find((t) => t.name === 'Other')!,
]

// Popular types shown by default (alphabetical), before user searches
const popularTypeNames = new Set([
  'Accountant', 'Architect', 'Auto Mechanic / Workshop', 'Bakery',
  'Beauty Salon / Spa', 'Builder / General Contractor', 'Café / Coffee Shop',
  'Cleaning Service', 'Consultant', 'Dentist', 'Electrician', 'Event Planner',
  'Hair Salon / Barber', 'Landscaper / Gardener', 'Lawyer / Attorney',
  'Personal Trainer', 'Photographer', 'Plumber', 'Real Estate Agent',
  'Restaurant', 'Retail Store', 'Yoga Studio', 'Other',
])

const popularTypes = sortedBusinessTypes.filter((t) => popularTypeNames.has(t.name))

const MAX_VISIBLE = 15

const pageOptions: { key: PageType; label: string }[] = [
  { key: 'home', label: 'Home' },
  { key: 'about', label: 'About' },
  { key: 'services', label: 'Services' },
  { key: 'gallery', label: 'Portfolio / Gallery' },
  { key: 'contact', label: 'Contact' },
  { key: 'booking', label: 'Booking / Appointments' },
  { key: 'blog', label: 'Blog' },
  { key: 'ecommerce', label: 'Shop / Products' },
  { key: 'testimonials', label: 'Testimonials' },
]

const styleOptions = [
  { label: 'Clean & Minimal', icon: '▪' },
  { label: 'Bold & Modern', icon: '▰' },
  { label: 'Elegant & Luxury', icon: '✦' },
  { label: 'Playful & Friendly', icon: '◉' },
  { label: 'Industrial & Raw', icon: '⚙' },
  { label: 'Natural & Organic', icon: '🌿' },
  { label: 'Tech & Futuristic', icon: '◇' },
  { label: 'Classic & Traditional', icon: '❖' },
]


// Shared styles
const font = 'var(--font-source-sans), "Source Sans 3", sans-serif'
const gradient = 'linear-gradient(180deg, #8e9fba 0%, #a8b8cc 40%, #d4b8c8 80%, #e8c8cf 100%)'

const heading: React.CSSProperties = {
  fontFamily: font,
  fontSize: 'clamp(2rem, 4vw, 3rem)',
  fontWeight: 300,
  color: '#fff',
  margin: '0 0 2rem 0',
  lineHeight: 1.2,
  textShadow: '0 1px 4px rgba(0,0,0,0.1)',
}

const label: React.CSSProperties = {
  fontFamily: font,
  fontSize: '0.75rem',
  fontWeight: 600,
  letterSpacing: '0.1em',
  textTransform: 'uppercase' as const,
  color: 'rgba(255,255,255,0.85)',
  marginBottom: '0.5rem',
}

const pill = (active: boolean): React.CSSProperties => ({
  fontFamily: font,
  fontSize: '0.9rem',
  fontWeight: 500,
  padding: '0.6rem 1.25rem',
  borderRadius: '9999px',
  border: `1.5px solid ${active ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.4)'}`,
  backgroundColor: active ? 'rgba(255,255,255,0.12)' : 'transparent',
  color: '#fff',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
})

const btnPrimary: React.CSSProperties = {
  fontFamily: font,
  fontSize: '0.85rem',
  fontWeight: 600,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  padding: '0.65rem 1.5rem',
  borderRadius: '9999px',
  border: '1.5px solid rgba(255,255,255,0.5)',
  backgroundColor: 'transparent',
  color: '#fff',
  cursor: 'pointer',
  transition: 'border-color 0.2s',
}

const btnBack: React.CSSProperties = {
  fontFamily: font,
  fontSize: '0.85rem',
  fontWeight: 600,
  letterSpacing: '0.04em',
  background: 'none',
  border: '1.5px solid rgba(255,255,255,0.4)',
  borderRadius: '9999px',
  color: '#fff',
  cursor: 'pointer',
  padding: '0.65rem 1.5rem',
  transition: 'border-color 0.2s',
}

const inputStyle: React.CSSProperties = {
  fontFamily: font,
  fontSize: '1.5rem',
  fontWeight: 300,
  background: 'none',
  border: 'none',
  borderBottom: '1.5px solid rgba(255,255,255,0.5)',
  color: '#fff',
  padding: '0.5rem 0',
  width: '100%',
  outline: 'none',
  caretColor: '#fff',
}

const fieldInput: React.CSSProperties = {
  fontFamily: font,
  fontSize: '1rem',
  background: 'none',
  border: 'none',
  borderBottom: '1.5px solid rgba(255,255,255,0.5)',
  color: '#fff',
  padding: '0.5rem 0',
  width: '100%',
  outline: 'none',
  caretColor: '#fff',
}

function getWeekdays(startDate: Date, weeks: number): Date[] {
  const days: Date[] = []
  const d = new Date(startDate)
  // Start from next Monday
  while (d.getDay() !== 1) d.setDate(d.getDate() + 1)
  for (let w = 0; w < weeks; w++) {
    for (let i = 0; i < 5; i++) {
      days.push(new Date(d))
      d.setDate(d.getDate() + 1)
    }
    d.setDate(d.getDate() + 2) // skip weekend
  }
  return days
}



const categoryColors: Record<BusinessCategory, { primary: string; secondary: string }> = {
  'food-hospitality':      { primary: '#9C4221', secondary: '#F0C896' },  // rich burnt sienna + warm peach — appetite, warmth, artisan
  'retail':                { primary: '#1B3A6B', secondary: '#D4A843' },  // rich navy + warm gold — trust, purchase intent, upmarket
  'trades-construction':   { primary: '#1D5C8A', secondary: '#E07B3C' },  // rich steel blue + amber — reliability, energy, industry
  'health-wellness':       { primary: '#2E7D6E', secondary: '#B8DFCF' },  // deep sage-teal + soft mint — calm, healing, clinical trust
  'professional':          { primary: '#0F2B52', secondary: '#C49A3C' },  // Oxford navy + antique gold — authority, prestige, trust
  'creative':              { primary: '#1A1A2E', secondary: '#E8956D' },  // deep charcoal-navy + warm coral — sophistication, creativity
  'fitness-sport':         { primary: '#111111', secondary: '#D42020' },  // near-black + crisp crimson — power, energy, performance
  'home-services':         { primary: '#1A6464', secondary: '#7DCFCA' },  // deep teal + light teal — clean, trustworthy, refreshing
  'education':             { primary: '#1A4B8A', secondary: '#F0B429' },  // warm royal blue + golden amber — focus, optimism, learning
  'automotive':            { primary: '#1A2030', secondary: '#C42828' },  // gunmetal navy + deep crimson — sophisticated, powerful
  'property':              { primary: '#162030', secondary: '#C49060' },  // midnight navy + warm copper — prestige, stability, luxury
  'events-entertainment':  { primary: '#3A1A58', secondary: '#D4AF5A' },  // deep plum + champagne gold — celebration, elegance
  'tech-digital':          { primary: '#0C1A2E', secondary: '#00B4A6' },  // deep tech navy + electric teal — innovation, precision
  'pets':                  { primary: '#3A6232', secondary: '#E8B040' },  // forest green + warm amber — nature, warmth, care
  'other':                 { primary: '#3A4F6B', secondary: '#B87878' },  // slate blue + dusty rose — refined, neutral, welcoming
}

const categoryStyles: Record<BusinessCategory, { style: string; visualBalance: number }> = {
  'food-hospitality':      { style: 'Elegant & Luxury',     visualBalance: 70 },
  'retail':                { style: 'Bold & Modern',         visualBalance: 75 },
  'trades-construction':   { style: 'Industrial & Raw',      visualBalance: 55 },
  'health-wellness':       { style: 'Clean & Minimal',       visualBalance: 45 },
  'professional':          { style: 'Classic & Traditional',  visualBalance: 35 },
  'creative':              { style: 'Bold & Modern',         visualBalance: 80 },
  'fitness-sport':         { style: 'Bold & Modern',         visualBalance: 70 },
  'home-services':         { style: 'Clean & Minimal',       visualBalance: 50 },
  'education':             { style: 'Playful & Friendly',    visualBalance: 55 },
  'automotive':            { style: 'Industrial & Raw',      visualBalance: 65 },
  'property':              { style: 'Elegant & Luxury',      visualBalance: 70 },
  'events-entertainment':  { style: 'Playful & Friendly',    visualBalance: 65 },
  'tech-digital':          { style: 'Tech & Futuristic',     visualBalance: 50 },
  'pets':                  { style: 'Playful & Friendly',    visualBalance: 70 },
  'other':                 { style: 'Clean & Minimal',       visualBalance: 50 },
}

export default function StartYourProject() {
  const [step, setStep] = useState(0)

  // Form data
  const [businessName, setBusinessName] = useState('')
  const [businessType, setBusinessType] = useState('')
  const [businessCategory, setBusinessCategory] = useState<BusinessCategory | ''>('')
  const [typeSearch, setTypeSearch] = useState('')
  const [selectedPages, setSelectedPages] = useState<PageType[]>(['home'])
  const [customPages, setCustomPages] = useState<string[]>([])
  const [customPageInput, setCustomPageInput] = useState('')
  const [visualBalance, setVisualBalance] = useState(50)
  const [selectedStyle, setSelectedStyle] = useState('')
  const [primaryColor, setPrimaryColor] = useState('#2563EB')
  const [secondaryColor, setSecondaryColor] = useState('#F59E0B')
  const [noColors, setNoColors] = useState(false)

  // Images
  const [uploadedImages, setUploadedImages] = useState<{ url: string; name: string }[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Preview
  const [previewHtml, setPreviewHtml] = useState<string | null>(null)
  const [previewLoading, setPreviewLoading] = useState(false)
  const [previewProgress, setPreviewProgress] = useState(0)
  const [previewError, setPreviewError] = useState(false)
  const previewRequested = useRef(false)

  const [selectedCountry, setSelectedCountry] = useState('')
  const [countrySearch, setCountrySearch] = useState('')
  const [geoDetected, setGeoDetected] = useState(false)

  // Auto-detect country from IP
  useEffect(() => {
    if (selectedCountry) return
    const codeToName: Record<string, string> = {
      ZA: 'South Africa', GB: 'United Kingdom', US: 'United States', AU: 'Australia',
      DE: 'Germany', FR: 'France', NL: 'Netherlands', IE: 'Ireland', CA: 'Canada',
      NZ: 'New Zealand', PT: 'Portugal', ES: 'Spain', IT: 'Italy', CH: 'Switzerland',
      SE: 'Sweden', NO: 'Norway', DK: 'Denmark', BE: 'Belgium', AT: 'Austria',
      AE: 'United Arab Emirates', SG: 'Singapore', HK: 'Hong Kong', JP: 'Japan',
      IN: 'India', BR: 'Brazil', MX: 'Mexico', NG: 'Nigeria', KE: 'Kenya',
      GH: 'Ghana', NA: 'Namibia', BW: 'Botswana', MZ: 'Mozambique', ZW: 'Zimbabwe',
      MU: 'Mauritius',
    }
    fetch('https://api.country.is', { signal: AbortSignal.timeout(8000) })
      .then(r => r.json())
      .then(data => {
        const name = codeToName[data.country]
        if (name) {
          const match = countries.find(c => c.name === name)
          if (match) {
            setSelectedCountry(match.name)
            setCountrySearch(match.name)
            setGeoDetected(true)
          }
        }
      })
      .catch(() => {})
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Contact
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [projectInfo, setProjectInfo] = useState('')
  const [contactSubmitted, setContactSubmitted] = useState(false)

  const weekdays = getWeekdays(new Date(), 2)

  const progress = ((step + 1) / TOTAL_STEPS) * 100

  const { executeRecaptcha } = useGoogleReCaptcha()

  // Generate preview when entering Step 6
  useEffect(() => {
    if (step !== 7) {
      previewRequested.current = false
      return
    }
    if (previewRequested.current) return
    previewRequested.current = true
    setPreviewLoading(true)
    setPreviewProgress(0)
    setPreviewError(false)
    setPreviewHtml(null)

    // reCAPTCHA v3 check then generate
    ;(async () => {
      if (executeRecaptcha) {
        try {
          const token = await executeRecaptcha('preview_generate')
          const check = await fetch('/api/recaptcha', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token }),
          })
          if (!check.ok && window.location.hostname !== 'localhost') {
            setPreviewError(true)
            setPreviewLoading(false)
            return
          }
        } catch {
          // allow on recaptcha failure so real users aren't blocked
        }
      }

      try {
        const r = await fetch('/api/preview/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            businessName,
            businessType,
            businessCategory,
            country: selectedCountry,
            pages: [...selectedPages.map(p => pageOptions.find(o => o.key === p)?.label || p), ...customPages],
            style: selectedStyle,
            primaryColor,
            secondaryColor,
            visualBalance,
            noColors,
            images: uploadedImages.map(img => img.url),
          }),
        })
        const res = await r.json()
        if (res.success) {
          setPreviewHtml(res.data.html)
        } else {
          setPreviewError(true)
        }
      } catch {
        setPreviewError(true)
      } finally {
        setPreviewLoading(false)
      }
    })()
  }, [step, businessName, businessType, selectedPages, customPages, selectedStyle, primaryColor, secondaryColor, visualBalance, noColors, uploadedImages, executeRecaptcha])

  // Simulated progress bar animation
  useEffect(() => {
    if (!previewLoading) return
    const start = Date.now()
    const duration = 8000 // 8 seconds to ~90%
    const interval = setInterval(() => {
      const elapsed = Date.now() - start
      // Ease-out curve: fast start, slows near 90%
      const raw = Math.min(elapsed / duration, 1)
      const progress = Math.min(90, raw * 90 * (2 - raw))
      setPreviewProgress(Math.round(progress))
    }, 200)
    return () => {
      clearInterval(interval)
      setPreviewProgress(100)
    }
  }, [previewLoading])

  async function handleImageUpload(files: FileList | null) {
    if (!files || files.length === 0) return
    const maxImages = businessCategory ? categoryImageLimits[businessCategory] : 5
    const remaining = maxImages - uploadedImages.length
    if (remaining <= 0) return

    const toUpload = Array.from(files).slice(0, remaining)
    const oversized = toUpload.filter(f => f.size > MAX_FILE_SIZE)
    if (oversized.length > 0) {
      alert(`Some files exceed 5MB and were skipped: ${oversized.map(f => f.name).join(', ')}`)
    }
    const valid = toUpload.filter(f => f.size <= MAX_FILE_SIZE)
    if (valid.length === 0) return

    // Convert to base64 data URLs — embeddable in HTML, no server storage needed
    const newImages: { url: string; name: string }[] = []
    for (const file of valid) {
      const dataUrl = await new Promise<string>((resolve) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result as string)
        reader.readAsDataURL(file)
      })
      newImages.push({ url: dataUrl, name: file.name })
    }
    setUploadedImages(prev => [...prev, ...newImages])
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  function removeImage(url: string) {
    setUploadedImages(prev => prev.filter(img => img.url !== url))
  }

  function togglePage(page: PageType) {
    setSelectedPages((prev) =>
      prev.includes(page) ? prev.filter((p) => p !== page) : [...prev, page]
    )
  }

  function addCustomPage() {
    if (customPageInput.trim() && !customPages.includes(customPageInput.trim())) {
      setCustomPages([...customPages, customPageInput.trim()])
      setCustomPageInput('')
    }
  }


  const filteredTypes = (() => {
    const q = typeSearch.toLowerCase().trim()
    if (!q) return popularTypes.map((t) => ({ entry: t, hint: '' }))

    const results: { entry: BusinessTypeEntry; hint: string }[] = []
    for (const entry of sortedBusinessTypes) {
      if (entry.name === 'Other') continue
      if (entry.name.toLowerCase().includes(q)) {
        results.push({ entry, hint: '' })
      } else {
        const matched = entry.keywords.find((k) => k.toLowerCase().includes(q))
        if (matched) {
          results.push({ entry, hint: matched })
        }
      }
    }
    if (results.length === 0) {
      return [{ entry: businessTypeData.find((t) => t.name === 'Other')!, hint: typeSearch.trim() }]
    }
    return results.slice(0, MAX_VISIBLE)
  })()

  return (
    <div style={{ minHeight: '100vh', fontFamily: font, background: gradient }}>
      <style>{`@media(max-width:640px){.syt-nav-links{display:none!important}}`}</style>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      {/* Nav */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 20,
        display: 'flex', justifyContent: 'center', padding: '1.25rem 2.5rem',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          background: 'transparent', borderRadius: '999px',
          padding: '0.65rem 0.65rem 0.65rem 1.75rem',
          border: '1.5px solid rgba(255,255,255,0.5)',
        }}>
          <a href="/" style={{
            fontFamily: font, fontSize: '1.05rem', fontWeight: 700,
            color: '#fff', textDecoration: 'none', letterSpacing: '0.04em',
            marginRight: '1.5rem',
          }}>mountain studios</a>
          <div className="syt-nav-links" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {[['About', '/#about'], ['Portfolio', '/#portfolio'], ['Contact', '/#contact']].map(([label, href]) => (
              <a key={label} href={href} style={{
                fontFamily: font, fontSize: '0.85rem', fontWeight: 600,
                color: 'rgba(255,255,255,0.8)', textDecoration: 'none',
                letterSpacing: '0.06em', textTransform: 'uppercase',
                padding: '0.4rem 0.85rem', transition: 'color 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}
              >{label}</a>
            ))}
          </div>

          <a href="/start-your-project" style={{
            fontFamily: font, fontSize: '0.85rem', fontWeight: 600,
            color: '#1a1a2e', textDecoration: 'none', letterSpacing: '0.04em',
            background: '#fff', padding: '0.6rem 1.5rem', borderRadius: '999px',
          }}>Get Started</a>
        </div>
      </nav>

      {/* Progress bar */}
      {step > 0 && step < 9 && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '3px', backgroundColor: 'rgba(255,255,255,0.1)', zIndex: 10 }}>
          <div style={{ height: '100%', width: `${progress}%`, backgroundColor: 'rgba(255,255,255,0.7)', transition: 'width 0.4s ease' }} />
        </div>
      )}

      {/* Content area */}
      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '6rem 2rem 4rem', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

        {/* Step 0: Intro */}
        {step === 0 && (
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ ...heading, fontSize: 'clamp(2.5rem, 5vw, 3.5rem)' }}>
              Let&apos;s build your website.
            </h1>
            <p style={{ fontFamily: font, fontSize: '1.1rem', color: 'rgba(255,255,255,0.9)', marginBottom: '2.5rem', lineHeight: 1.6 }}>
              Fill out this short form for a free preview of your site<br />and an instant quote. Takes 2 minutes.
            </p>
            <button onClick={() => setStep(1)} style={{ ...btnPrimary, padding: '0.75rem 2rem' }}>
              Let&apos;s Go &nbsp;→
            </button>
          </div>
        )}

        {/* Step 1: Business name */}
        {step === 1 && (
          <>
            <h1 style={heading}>What&apos;s your business called?</h1>
            <input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder={`e.g. ${(() => {
                const cityMap: Record<string, string> = {
                  'South Africa': 'Cape Town', 'United Kingdom': 'London', 'United States': 'New York',
                  'Australia': 'Sydney', 'Germany': 'Berlin', 'France': 'Paris', 'Netherlands': 'Amsterdam',
                  'Ireland': 'Dublin', 'Canada': 'Toronto', 'New Zealand': 'Auckland',
                  'United Arab Emirates': 'Dubai', 'Singapore': 'Singapore',
                }
                const city = cityMap[selectedCountry] || 'Cape Town'
                return `${city} Plumbing`
              })()}`}
              autoFocus
              style={inputStyle}
            />
            <Nav back={() => setStep(0)} next={() => setStep(2)} disabled={!businessName.trim()} />
          </>
        )}

        {/* Step 2: Business type */}
        {step === 2 && (
          <>
            <h1 style={heading}>What type of business is it?</h1>
            <input
              type="text"
              value={typeSearch}
              onChange={(e) => setTypeSearch(e.target.value)}
              placeholder="Search business type..."
              autoFocus
              style={{ ...fieldInput, fontSize: '1.1rem', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.2)' }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', maxHeight: '300px', overflowY: 'auto' }}>
              {filteredTypes.map(({ entry, hint }) => {
                const isOtherFallback = entry.name === 'Other' && hint
                const displayName = isOtherFallback ? `Other ("${hint}")` : entry.name
                const selected = businessType === entry.name
                return (
                  <button
                    key={entry.name + hint}
                    onClick={() => {
                      setBusinessType(entry.name)
                      setBusinessCategory(entry.category)
                      const colors = categoryColors[entry.category]
                      if (colors) { setPrimaryColor(colors.primary); setSecondaryColor(colors.secondary) }
                      const styleMap = categoryStyles[entry.category]
                      if (styleMap) { setSelectedStyle(styleMap.style); setVisualBalance(styleMap.visualBalance) }
                    }}
                    style={{
                      fontFamily: font,
                      fontSize: '1rem',
                      fontWeight: 400,
                      padding: '0.75rem 1rem',
                      background: selected ? 'rgba(255,255,255,0.15)' : 'transparent',
                      border: selected ? '1px solid rgba(255,255,255,0.7)' : '1px solid transparent',
                      color: selected ? '#fff' : 'rgba(255,255,255,0.7)',
                      cursor: 'pointer',
                      textAlign: 'left',
                      borderRadius: '6px',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {displayName}
                    {hint && !isOtherFallback && (
                      <span style={{ color: 'rgba(255,255,255,0.4)', marginLeft: '0.5rem' }}>({hint})</span>
                    )}
                  </button>
                )
              })}
            </div>
            <Nav back={() => setStep(1)} next={() => setStep(3)} disabled={!businessType} />
          </>
        )}

        {/* Step 3: Pages needed */}
        {step === 3 && (
          <>
            <h1 style={heading}>Which pages do you need?</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
              {pageOptions.map((p) => (
                <button
                  key={p.key}
                  onClick={() => togglePage(p.key)}
                  style={pill(selectedPages.includes(p.key))}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Custom pages */}
            {customPages.map((cp) => (
              <div key={cp} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>{cp}</span>
                <button onClick={() => setCustomPages(customPages.filter((c) => c !== cp))} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', fontSize: '1rem' }}>×</button>
              </div>
            ))}

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
              <input
                type="text"
                value={customPageInput}
                onChange={(e) => setCustomPageInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addCustomPage()}
                placeholder="Add custom page..."
                style={{ ...fieldInput, flex: 1 }}
              />
              <button onClick={addCustomPage} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '50%', width: '32px', height: '32px', color: '#fff', cursor: 'pointer', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
            </div>

            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', marginTop: '1rem' }}>
              Total pages selected: {selectedPages.length + customPages.length}
            </p>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem' }}>
              Base price increases with each additional page
            </p>
            <Nav back={() => setStep(2)} next={() => setStep(4)} disabled={selectedPages.length === 0} />
          </>
        )}

        {/* Step 4: Where are you based? */}
        {step === 4 && (() => {
          const filtered = countrySearch.trim()
            ? countries.filter(c => c.name.toLowerCase().includes(countrySearch.toLowerCase())).slice(0, 8)
            : countries.slice(0, 12)
          return (
          <>
            <h1 style={heading}>Where are you based?</h1>
            <input
              type="text"
              value={countrySearch}
              onChange={(e) => setCountrySearch(e.target.value)}
              placeholder="Start typing your country..."
              autoFocus
              style={inputStyle}
            />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1.5rem' }}>
              {filtered.map(c => (
                <button
                  key={c.name}
                  onClick={() => { setSelectedCountry(c.name); setCountrySearch(c.name) }}
                  style={pill(selectedCountry === c.name)}
                >
                  {c.flag} {c.name}
                </button>
              ))}
            </div>
            {selectedCountry && geoDetected && (
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.85rem', marginTop: '1rem' }}>
                We detected you&apos;re in {selectedCountry}
              </p>
            )}
            <Nav back={() => setStep(3)} next={() => setStep(5)} disabled={!selectedCountry} />
          </>
          )
        })()}

        {/* Step 5: Brand colours */}
        {step === 5 && (
          <>
            <h1 style={heading}>Do you have brand colours?</h1>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '2rem', opacity: noColors ? 0.3 : 1, pointerEvents: noColors ? 'none' : 'auto' }}>
              <div>
                <p style={label}>Primary</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <input type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} style={{ width: '48px', height: '48px', border: 'none', borderRadius: '6px', cursor: 'pointer', background: 'none' }} />
                  <input type="text" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} style={{ ...fieldInput, width: '90px', fontSize: '0.95rem' }} />
                </div>
              </div>
              <div>
                <p style={label}>Secondary</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <input type="color" value={secondaryColor} onChange={(e) => setSecondaryColor(e.target.value)} style={{ width: '48px', height: '48px', border: 'none', borderRadius: '6px', cursor: 'pointer', background: 'none' }} />
                  <input type="text" value={secondaryColor} onChange={(e) => setSecondaryColor(e.target.value)} style={{ ...fieldInput, width: '90px', fontSize: '0.95rem' }} />
                </div>
              </div>
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={noColors} onChange={(e) => setNoColors(e.target.checked)} style={{ accentColor: '#fff', width: '18px', height: '18px' }} />
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>I don&apos;t have colours yet — surprise me</span>
            </label>
            <Nav back={() => setStep(4)} next={() => setStep(6)} />
          </>
        )}

        {/* Step 6: Your Images */}
        {step === 6 && (() => {
          const maxImages = businessCategory ? categoryImageLimits[businessCategory] : 5
          return (
          <>
            <h1 style={heading}>Got any images you&apos;d like us to use?</h1>
            <p style={{ fontFamily: font, fontSize: '1rem', color: 'rgba(255,255,255,0.85)', marginBottom: '2rem', lineHeight: 1.6 }}>
              Logo, team photos, product shots — anything that represents your business.
              <br /><span style={{ fontSize: '0.85rem' }}>This step is optional. You can skip it if you don&apos;t have images ready.</span>
            </p>

            {/* Drop zone */}
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); e.currentTarget.style.borderColor = 'rgba(255,255,255,0.7)' }}
              onDragLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)' }}
              onDrop={(e) => { e.preventDefault(); e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; handleImageUpload(e.dataTransfer.files) }}
              style={{
                border: '2px dashed rgba(255,255,255,0.5)',
                borderRadius: '12px',
                padding: '2.5rem 1.5rem',
                textAlign: 'center',
                cursor: uploadedImages.length >= maxImages ? 'not-allowed' : 'pointer',
                transition: 'border-color 0.2s ease',
                opacity: uploadedImages.length >= maxImages ? 0.4 : 1,
                marginBottom: '1.5rem',
              }}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleImageUpload(e.target.files)}
                style={{ display: 'none' }}
                disabled={uploadedImages.length >= maxImages}
              />
              <>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem', opacity: 0.5 }}>📁</div>
                <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.95rem', fontFamily: font, margin: 0 }}>
                  Drag &amp; drop images here, or click to browse
                </p>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', fontFamily: font, marginTop: '0.5rem' }}>
                  Up to {maxImages} images, max 5MB each
                </p>
              </>
            </div>

            {/* Thumbnails */}
            {uploadedImages.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
                {uploadedImages.map((img) => (
                  <div key={img.url} style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden', aspectRatio: '1', border: '1px solid rgba(255,255,255,0.15)' }}>
                    <img src={img.url} alt={img.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <button
                      onClick={() => removeImage(img.url)}
                      style={{
                        position: 'absolute', top: '4px', right: '4px',
                        width: '24px', height: '24px', borderRadius: '50%',
                        background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(255,255,255,0.3)',
                        color: '#fff', cursor: 'pointer', fontSize: '14px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        lineHeight: 1,
                      }}
                    >
                      &times;
                    </button>
                    <div style={{
                      position: 'absolute', bottom: 0, left: 0, right: 0,
                      background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                      padding: '4px 6px',
                    }}>
                      <span style={{ color: '#fff', fontSize: '0.65rem', fontFamily: font, display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {img.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.8rem', fontFamily: font }}>
              {uploadedImages.length}/{maxImages} images uploaded
            </p>

            <Nav back={() => setStep(5)} next={() => setStep(7)} />
            <style>{`
              @keyframes spin { to { transform: rotate(360deg) } }
              @media (max-width: 640px) {
                .syt-nav-links { display: none !important; }
              }
            `}</style>
          </>
          )
        })()}

        {/* Step 7: Site preview */}
        {step === 7 && (
          <>
            <h1 style={{ ...heading, fontSize: 'clamp(1.5rem, 3vw, 2rem)', textAlign: 'center', marginBottom: '1rem' }}>
              Here&apos;s a preview of your site&apos;s Homepage.
            </h1>
            {previewHtml && !previewLoading && (
              <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.85)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '1rem', fontFamily: font }}>
                Click the preview to open in a new tab
              </p>
            )}
            <div
              onClick={() => {
                if (previewHtml && !previewLoading) {
                  const blob = new Blob([previewHtml], { type: 'text/html' })
                  const url = URL.createObjectURL(blob)
                  window.open(url, '_blank')
                }
              }}
              style={{
                width: '90vw',
                maxWidth: '1100px',
                margin: '0 auto 2rem',
                height: '360px',
                backgroundColor: 'rgba(255,255,255,0.05)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(20px)',
                position: 'relative',
                cursor: previewHtml && !previewLoading ? 'pointer' : 'default',
              }}
            >
              {previewLoading && (
                <div style={{ textAlign: 'center', width: '80%', maxWidth: '400px' }}>
                  <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1rem', fontFamily: font, marginBottom: '1rem', fontWeight: 500 }}>
                    {previewProgress < 30 ? 'Finding images for your site...' :
                     previewProgress < 70 ? 'Designing your website...' :
                     previewProgress < 90 ? 'Adding finishing touches...' :
                     'Almost there...'}
                  </p>
                  <div style={{
                    width: '100%', height: '8px', backgroundColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '4px', overflow: 'hidden',
                  }}>
                    <div style={{
                      width: `${previewProgress}%`, height: '100%',
                      background: 'linear-gradient(90deg, #7c3aed, #a78bfa)',
                      borderRadius: '4px',
                      transition: 'width 0.3s ease-out',
                    }} />
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', fontFamily: font, marginTop: '0.5rem' }}>
                    {previewProgress}%
                  </p>
                </div>
              )}
              {previewHtml && !previewLoading && (
                <iframe
                  srcDoc={previewHtml}
                  title={`Site preview for ${businessName}`}
                  referrerPolicy="no-referrer"
                  style={{
                    width: '200%',
                    height: '400%',
                    border: 'none',
                    borderRadius: '0',
                    transform: 'scale(0.5)',
                    transformOrigin: 'top left',
                    pointerEvents: 'none',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                  }}
                />
              )}
              {previewError && !previewLoading && (
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.95rem', fontFamily: font }}>
                  Preview unavailable — but you can still continue.
                </p>
              )}
            </div>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button
                onClick={() => setStep(8)}
                style={{ ...btnPrimary, display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                I love it
              </button>
              <button
                onClick={() => setStep(8)}
                style={{ ...btnPrimary, backgroundColor: 'transparent', border: '1px solid rgba(255,255,255,0.3)' }}
              >
                Not quite right
              </button>
            </div>

            {/* Expanded preview modal */}
          </>
        )}

        {/* Step 8: Contact info */}
        {step === 8 && !contactSubmitted && (
          <>
            <h1 style={heading}>Last step — how do we reach you?</h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '1rem' }}>
              <div>
                <p style={label}>Full Name *</p>
                <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} autoFocus style={inputStyle} />
              </div>
              <div>
                <p style={label}>Email *</p>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
              </div>
              <div>
                <p style={label}>Phone (optional)</p>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} style={inputStyle} />
              </div>
              <div>
                <p style={label}>A bit about your website (optional)</p>
                <textarea
                  value={projectInfo}
                  onChange={(e) => setProjectInfo(e.target.value)}
                  rows={3}
                  style={{ ...inputStyle, fontSize: '1rem', resize: 'vertical', borderBottom: '1.5px solid rgba(255,255,255,0.5)' }}
                />
              </div>
            </div>
            <Nav
              back={() => setStep(7)}
              next={() => setContactSubmitted(true)}
              nextLabel="Send →"
              disabled={!fullName.trim() || !email.trim()}
            />
          </>
        )}

        {/* Step 8: Confirmation */}
        {step === 8 && contactSubmitted && (
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ ...heading, fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              We&apos;ll be in touch.
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1rem', lineHeight: 1.6, maxWidth: '420px', margin: '0 auto' }}>
              Thanks {fullName.split(' ')[0]}. We&apos;ll review your preview and reach out to {email} shortly.
            </p>
          </div>
        )}
      </div>
      </div>
    </div>
  )
}

function Nav({ back, next, disabled, nextLabel }: { back?: () => void; next?: () => void; disabled?: boolean; nextLabel?: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '3rem' }}>
      {back ? (
        <button onClick={back} style={btnBack}>← Back</button>
      ) : <div />}
      {next && (
        <button
          onClick={next}
          disabled={disabled}
          style={{ ...btnPrimary, opacity: disabled ? 0.4 : 1, cursor: disabled ? 'not-allowed' : 'pointer' }}
        >
          {nextLabel || 'Continue →'}
        </button>
      )}
    </div>
  )
}
