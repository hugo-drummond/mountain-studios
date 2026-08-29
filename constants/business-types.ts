// Single source of truth for the business types Mountain Studios supports.
//
// Mountain Studios sells to any South African business — salons, accountants,
// opticians, retailers, law firms, guest houses, restaurants, gyms, vets, and
// trades. Every name here has hand-authored preset content in
// app/api/preview/generate/content.ts, keyed on the exact string, so the two
// lists must stay one-to-one. Adding a name without adding a preset silently
// downgrades that business to LLM-generated copy.

export type BusinessCategory =
  | 'food-hospitality' | 'retail' | 'trades-construction' | 'health-wellness'
  | 'professional' | 'creative' | 'fitness-sport' | 'home-services'
  | 'education' | 'automotive' | 'property' | 'events-entertainment'
  | 'tech-digital' | 'pets' | 'other'

export interface BusinessTypeEntry {
  name: string
  category: BusinessCategory
  keywords: string[]
}

export const businessTypeData: BusinessTypeEntry[] = [
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
export const sortedBusinessTypes = [
  ...businessTypeData.filter((t) => t.name !== 'Other').sort((a, b) => a.name.localeCompare(b.name)),
  businessTypeData.find((t) => t.name === 'Other')!,
]

// Popular types shown by default (alphabetical), before the user searches.
// Deliberately spread roughly one per category: this list is the only sense of
// "who we build for" a visitor gets before they type, so it must not read as a
// trades directory. Trades are two entries here, not a quarter of the list.
export const popularTypeNames = new Set([
  'Accountant',                 // professional
  'Auto Mechanic / Workshop',   // automotive
  'Café / Coffee Shop',         // food-hospitality
  'Cleaning Service',           // home-services
  'Dentist',                    // health-wellness
  'Electrician',                // trades-construction
  'Event Planner',              // events-entertainment
  'General Retail Store',       // retail
  'Guest House / B&B',          // food-hospitality
  'Gym / Fitness Centre',       // fitness-sport
  'Hair Salon / Barber',        // health-wellness
  'Lawyer / Attorney',          // professional
  'Optometrist',                // health-wellness
  'Pharmacy',                   // retail
  'Photographer',               // creative
  'Plumber',                    // trades-construction
  'Real Estate Agent',          // property
  'Restaurant',                 // food-hospitality
  'Tutor',                      // education
  'Veterinarian',               // pets
  'Web Developer / Designer',   // tech-digital
  'Other',
])

export const popularTypes = sortedBusinessTypes.filter((t) => popularTypeNames.has(t.name))

export const categoryColors: Record<BusinessCategory, { primary: string; secondary: string }> = {
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

// The preset key and the wizard's dropdown label are the same string, so an
// exact match is the whole lookup. Anything unrecognised is 'other', which is
// the same fallback the generator already applies.
export function categoryForType(name: string): BusinessCategory {
  const entry = businessTypeData.find((e) => e.name === name)
  return entry ? entry.category : 'other'
}
