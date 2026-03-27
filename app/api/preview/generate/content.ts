// Auto-generated from batch content files
// Business-type-specific pre-written content for website previews

export interface PresetContent {
  heroEyebrow: string
  heroAccent: string
  tagline: string
  heroSubtitle: string
  ctaPrimary: string
  ctaSecondary: string
  ctaNote: string
  badge: string
  servicesHeading: string
  services: { name: string; description: string; tags: string[]; icon?: string; serviceImageQuery: string }[]
  galleryHeading: string
  aboutHeading: string
  aboutText: string
  aboutMission: string
  stats: { value: string; label: string; sublabel: string }[]
  contactHeading: string
  contactHours?: string
  processSteps?: { step: string; title: string; description: string }[]
  stepsHeading?: string
  projectCaptions?: string[]
  testimonial: { quote: string; author: string; rating: number }
  testimonials?: { quote: string; author: string; rating: number }[]
  imageMood: string
  heroImageQuery: string
  heroBgImageQuery?: string
  ogImageQuery: string
  aboutImageQuery: string
  galleryImageQueries: string[]
  features?: { name: string; description: string; imageQuery?: string }[]
}

export const presetContent: Record<string, PresetContent> = {
  "Restaurant": {
    "heroEyebrow": "CAPE TOWN FINE DINING",
    "heroAccent": "Voted Best New Restaurant 2023",
    "tagline": "Where every plate tells a <em>story</em>",
    "heroSubtitle": "Seasonal menus crafted from local ingredients, served in an atmosphere worth dressing up for.",
    "ctaPrimary": "Reserve a Table",
    "ctaSecondary": "View Menu",
    "ctaNote": "Instant confirmation \u00b7 Free cancellation up to 24hrs",
    "badge": "TripAdvisor Certificate of Excellence",
    "servicesHeading": "Our Offerings",
    "services": [
      {
        "name": "\u00c0 La Carte Dining",
        "description": "Seasonal dishes crafted daily by our executive chef using locally sourced produce.",
        "tags": [
          "Fine Dining",
          "Seasonal Menu"
        ],
        "serviceImageQuery": "fine dining main course plated garnished white plate restaurant table"
      },
      {
        "name": "Private Functions",
        "description": "Exclusive venue hire for corporate dinners, birthdays, and intimate celebrations of any size.",
        "tags": [
          "Private Hire",
          "Events"
        ],
        "serviceImageQuery": "private dining room long table elegant place settings chandelier event"
      },
      {
        "name": "Wine Pairing",
        "description": "Curated Cape wine pairings selected by our in-house sommelier for every course.",
        "tags": [
          "Sommelier",
          "Cape Wines"
        ],
        "serviceImageQuery": "sommelier pouring red wine into glass at restaurant table candlelight"
      },
      {
        "name": "Sunday Brunch",
        "description": "A leisurely weekend spread of eggs Benedict, freshly baked pastries, and bottomless mimosas.",
        "tags": [
          "Brunch",
          "Weekend"
        ],
        "serviceImageQuery": "brunch table spread eggs benedict pastries fresh juice sunny morning restaurant"
      }
    ],
    "galleryHeading": "From Our Kitchen",
    "aboutHeading": "Food crafted with <em>passion</em>",
    "aboutText": "We opened our doors with one belief: that a great meal is about more than food. It's about the hands that grew the ingredients, the chef who transforms them, and the moment shared at the table.\n\nEvery dish changes with the seasons. We work directly with local farms and fisheries to bring you something honest, beautiful, and deeply South African.",
    "aboutMission": "We believe a table set with intention can change the whole tenor of an evening.",
    "stats": [
      {
        "value": "12+",
        "label": "Years Open",
        "sublabel": "since 2012"
      },
      {
        "value": "18",
        "label": "Seasonal Dishes",
        "sublabel": "updated quarterly"
      },
      {
        "value": "300+",
        "label": "Wines Listed",
        "sublabel": "cellar & by-the-glass"
      },
      {
        "value": "96%",
        "label": "Guest Return Rate",
        "sublabel": "from 800+ reviews"
      }
    ],
    "contactHeading": "Ready to book your table?",
    "testimonial": {
      "quote": "Best dining experience in Cape Town. Every course was a revelation.",
      "author": "Alex M., Verified Client",
      "rating": 5
    },
    "imageMood": "warm, moody, intimate",
    "heroImageQuery": "elegant restaurant dining table candlelight wine glasses white tablecloth intimate evening setting",
    "ogImageQuery": "fine dining plated dish garnished white plate restaurant table overhead",
    "aboutImageQuery": "chef plating gourmet dish kitchen pass restaurant line professional",
    "galleryImageQueries": [
      "restaurant interior warm ambient lighting booth seating pendant lamps",
      "seared steak fillet plated with garnish fine dining presentation",
      "chef hands finishing dish with tweezers restaurant kitchen close-up",
      "restaurant outdoor terrace table set for dinner evening golden hour"
    ],
    "contactHours": "Mon\u2013Sat: 12:00\u201322:30 \u00b7 Sun: 12:00\u201321:00 \u00b7 Closed Tuesdays"
  },
  "Caf\u00e9 / Coffee Shop": {
    "heroEyebrow": "SPECIALTY COFFEE CAPE TOWN",
    "heroAccent": "Single-origin beans roasted in-house",
    "tagline": "Your daily ritual, <em>perfected</em>",
    "heroSubtitle": "Exceptional espresso, freshly baked goods, and a corner seat with your name on it.",
    "ctaPrimary": "Find Us",
    "ctaSecondary": "Our Menu",
    "ctaNote": "Open 7 days \u00b7 Free WiFi \u00b7 Dogs welcome",
    "badge": "Specialty Coffee Association Member",
    "servicesHeading": "What We Brew",
    "services": [
      {
        "name": "Specialty Espresso Bar",
        "description": "Single-origin and seasonal espresso blends pulled by baristas who genuinely care.",
        "tags": [
          "Single Origin",
          "Flat White"
        ],
        "serviceImageQuery": "barista pulling espresso shot from machine steam cafe counter close-up"
      },
      {
        "name": "All-Day Brunch",
        "description": "House-baked pastries, toasted sandwiches, and grain bowls made fresh every morning.",
        "tags": [
          "Brunch",
          "Baked Fresh"
        ],
        "serviceImageQuery": "cafe display cabinet croissants pastries sandwiches glass counter bakery"
      },
      {
        "name": "Retail Beans",
        "description": "Take home our house roast whole-bean or ground, freshly bagged and labelled each week.",
        "tags": [
          "Take-Home",
          "Gift Bags"
        ],
        "serviceImageQuery": "roasted coffee beans bag scoop wooden table cafe retail packaging"
      },
      {
        "name": "Meeting & Co-Working Space",
        "description": "Free WiFi, plug points at every table, and a quiet corner perfect for laptops and small meetings.",
        "tags": [
          "WiFi",
          "Co-Working"
        ],
        "serviceImageQuery": "person working laptop cafe table coffee cup cosy co-working space natural light"
      }
    ],
    "galleryHeading": "Life at the Counter",
    "aboutHeading": "Coffee that <em>connects</em> people",
    "aboutText": "We started as a small roastery with a single espresso machine and a conviction that great coffee deserves to be brewed slowly and served with care. That hasn't changed.\n\nToday we're a neighbourhood staple \u2014 a place people choose to start their morning, take a meeting, or simply sit and think. We're proud of that.",
    "aboutMission": "We believe the best caf\u00e9 is one that feels like it was made specifically for this neighbourhood.",
    "stats": [
      {
        "value": "8+",
        "label": "Years Brewing",
        "sublabel": "since 2016"
      },
      {
        "value": "6",
        "label": "Origins Stocked",
        "sublabel": "rotating quarterly"
      },
      {
        "value": "400+",
        "label": "Regulars Per Week",
        "sublabel": "and counting"
      },
      {
        "value": "4.9\u2605",
        "label": "Google Rating",
        "sublabel": "from 620+ reviews"
      }
    ],
    "contactHeading": "Want to know our hours or location?",
    "testimonial": {
      "quote": "Best flat white in the city. The pastries disappear fast \u2014 arrive early.",
      "author": "Jordan K., Verified Client",
      "rating": 5
    },
    "imageMood": "bright, cosy, textured",
    "heroImageQuery": "latte art rosetta pattern coffee cup wooden table cafe warm morning light",
    "ogImageQuery": "latte art cappuccino ceramic cup saucer cafe table overhead",
    "aboutImageQuery": "barista pouring steamed milk latte art behind cafe counter apron",
    "galleryImageQueries": [
      "cosy cafe interior wooden tables pendant lights warm brick walls",
      "barista pouring latte art into cup at espresso machine close-up",
      "fresh croissant on plate next to cappuccino cafe table morning",
      "iced coffee glass cold brew straw cafe counter summer daylight"
    ],
    "contactHours": "Mon\u2013Fri: 07:00\u201317:00 \u00b7 Sat\u2013Sun: 08:00\u201315:00"
  },
  "Bakery": {
    "heroEyebrow": "ARTISAN BAKED GOODS",
    "heroAccent": "Baked from scratch before sunrise",
    "tagline": "Bread the way your <em>grandmother</em> remembers",
    "heroSubtitle": "Long-fermented sourdoughs, buttery croissants, and celebration cakes made with real ingredients.",
    "ctaPrimary": "Order Online",
    "ctaSecondary": "Today's Bake",
    "ctaNote": "Pre-orders open daily at 6am \u00b7 Click & collect available",
    "badge": "Real Bread Campaign Certified",
    "servicesHeading": "Fresh From the Oven",
    "services": [
      {
        "name": "Sourdough & Artisan Loaves",
        "description": "Slow-fermented loaves with open crumb and crackling crust, baked on the stone daily.",
        "tags": [
          "Sourdough",
          "Stone-Baked"
        ],
        "serviceImageQuery": "artisan sourdough bread loaf crusty golden crust scoring pattern bakery shelf"
      },
      {
        "name": "Pastries & Viennoiserie",
        "description": "Laminated croissants, pain au chocolat, and morning pastries made with French butter.",
        "tags": [
          "Croissants",
          "French Butter"
        ],
        "serviceImageQuery": "golden flaky croissants rows on baking tray fresh from oven bakery"
      },
      {
        "name": "Custom Celebration Cakes",
        "description": "Bespoke layered cakes for birthdays, weddings, and events \u2014 designed and baked to order.",
        "tags": [
          "Custom Cakes",
          "Wedding Cakes"
        ],
        "serviceImageQuery": "elegant tiered white wedding cake decorated fresh flowers bakery table"
      },
      {
        "name": "Bread Subscriptions",
        "description": "Weekly loaf deliveries straight to your door — choose your favourites and we bake them fresh.",
        "tags": [
          "Subscription",
          "Weekly Delivery"
        ],
        "serviceImageQuery": "assorted fresh bread loaves in wicker basket rustic wooden counter bakery"
      }
    ],
    "galleryHeading": "This Morning's Bake",
    "aboutHeading": "Made slowly, with <em>intention</em>",
    "aboutText": "Every loaf we bake starts the night before. Our sourdoughs ferment for 18 hours \u2014 because good bread simply takes time. We use stoneground flour from local mills and butter from grass-fed herds.\n\nWe don't cut corners. We don't use improvers. We just bake the same honest way, every single day.",
    "aboutMission": "We believe bread made properly \u2014 slowly, simply, with good flour \u2014 is one of life's genuine pleasures.",
    "stats": [
      {
        "value": "6+",
        "label": "Years Baking",
        "sublabel": "since 2018"
      },
      {
        "value": "18hrs",
        "label": "Sourdough Ferment",
        "sublabel": "minimum cold proof"
      },
      {
        "value": "25+",
        "label": "Items Daily",
        "sublabel": "baked fresh each morning"
      },
      {
        "value": "97%",
        "label": "Sell-Out Rate",
        "sublabel": "most days before noon"
      }
    ],
    "contactHeading": "Want to place a custom order?",
    "testimonial": {
      "quote": "I drive 20 minutes just for their sourdough. Worth every kilometre every time.",
      "author": "Annika V., Verified Client",
      "rating": 5
    },
    "imageMood": "warm, golden, rustic",
    "heroImageQuery": "artisan sourdough bread loaves displayed on wooden bakery shelf warm morning light",
    "ogImageQuery": "fresh baked sourdough loaves arranged on wooden shelf bakery display",
    "aboutImageQuery": "baker kneading dough on flour-dusted wooden table hands close-up bakery kitchen",
    "galleryImageQueries": [
      "bakery display case glass counter rows of pastries croissants cupcakes warm lighting",
      "sourdough loaf sliced open crumb texture cutting board rustic bakery table",
      "fresh cinnamon rolls tray drizzled icing golden baked bakery kitchen",
      "bakery interior warm shelves stacked with fresh bread loaves counter morning"
    ],
    "contactHours": "Tue\u2013Fri: 07:00\u201315:00 \u00b7 Sat\u2013Sun: 07:00\u201312:00 \u00b7 Closed Mon"
  },
  "Bar / Pub": {
    "heroEyebrow": "YOUR LOCAL DONE RIGHT",
    "heroAccent": "16 taps, zero pretension",
    "tagline": "Cold pints, good people, great <em>nights</em>",
    "heroSubtitle": "A proper neighbourhood bar with craft beers on tap, live sport, and food worth staying for.",
    "ctaPrimary": "Book a Table",
    "ctaSecondary": "What's On",
    "ctaNote": "Walk-ins welcome \u00b7 Happy hour daily 4\u20136pm",
    "badge": "Craft Beer Association SA Member",
    "servicesHeading": "What We Pour",
    "services": [
      {
        "name": "Craft Beers on Tap",
        "description": "Sixteen rotating taps featuring local microbreweries, guest ales, and international lagers.",
        "tags": [
          "Craft Beer",
          "Local Breweries"
        ],
        "serviceImageQuery": "row of craft beer tap handles bar counter bartender pouring draught pint glass"
      },
      {
        "name": "Pub Kitchen",
        "description": "No-nonsense bar food: loaded burgers, nachos, and proper fish and chips done right.",
        "tags": [
          "Pub Grub",
          "Burgers"
        ],
        "serviceImageQuery": "loaded gourmet burger fries on wooden board pub table beer glass background"
      },
      {
        "name": "Live Sport & Events",
        "description": "Multiple big screens showing all major sports, plus quiz nights and live music evenings.",
        "tags": [
          "Live Sport",
          "Quiz Night"
        ],
        "serviceImageQuery": "crowd watching sport on big screen TV sports bar pub cheering pints"
      },
      {
        "name": "Cocktail Menu",
        "description": "Signature cocktails, classic mixes, and seasonal specials shaken and stirred by our bar team.",
        "tags": [
          "Cocktails",
          "Signature Drinks"
        ],
        "serviceImageQuery": "bartender garnishing colourful cocktails lined up on bar counter evening lighting"
      }
    ],
    "galleryHeading": "Nights at the Bar",
    "aboutHeading": "A pub that feels like <em>home</em>",
    "aboutText": "We opened because Cape Town needed a bar that didn't take itself too seriously. A place where the rugby is always on, the beer is cold, and the staff know your order by your second visit.\n\nWe're dog-friendly, support local brewers, and believe a great pub is the heartbeat of a neighbourhood.",
    "aboutMission": "We believe every neighbourhood deserves a bar where strangers become regulars within a week.",
    "stats": [
      {
        "value": "10+",
        "label": "Years Pouring",
        "sublabel": "since 2014"
      },
      {
        "value": "16",
        "label": "Taps on Rotation",
        "sublabel": "changed monthly"
      },
      {
        "value": "40+",
        "label": "Events Per Year",
        "sublabel": "sport, quiz & live music"
      },
      {
        "value": "4.8\u2605",
        "label": "Google Rating",
        "sublabel": "from 500+ reviews"
      }
    ],
    "contactHeading": "Want to host an event or function?",
    "testimonial": {
      "quote": "Best spot to watch the game. Great beers, brilliant staff, unbeatable vibe.",
      "author": "Riley O., Verified Client",
      "rating": 5
    },
    "imageMood": "dark, warm, lively",
    "heroImageQuery": "busy bar counter amber lighting cocktail glasses craft beer taps neon signs evening atmosphere",
    "ogImageQuery": "craft beer tap handles row bar counter amber lighting pub",
    "aboutImageQuery": "bartender shaking cocktail shaker behind bar counter moody evening light close-up",
    "galleryImageQueries": [
      "pub interior wooden bar counter stools warm pendant lighting evening crowd",
      "pint of craft beer golden ale on bar counter pub atmosphere close-up",
      "craft beer flight four tasting glasses on wooden paddle bar counter",
      "pub food platter nachos wings sharing board on table pints background"
    ],
    "contactHours": "Mon\u2013Thu: 12:00\u201300:00 \u00b7 Fri\u2013Sat: 12:00\u201302:00 \u00b7 Sun: 12:00\u201322:00"
  },
  "Butcher / Deli": {
    "heroEyebrow": "MASTER BUTCHER & DELI",
    "heroAccent": "Free-range, grass-fed, locally sourced",
    "tagline": "Meat worth <em>knowing</em> by name",
    "heroSubtitle": "Premium cuts, house-made charcuterie, and a deli counter that makes lunch a daily highlight.",
    "ctaPrimary": "Order Online",
    "ctaSecondary": "See This Week's Cuts",
    "ctaNote": "Bulk orders welcome \u00b7 Braai packs available",
    "badge": "SA Meat Industry Association Member",
    "servicesHeading": "At the Counter",
    "services": [
      {
        "name": "Premium Butchery",
        "description": "Free-range beef, lamb, and pork dry-aged and hand-cut to your exact specification.",
        "tags": [
          "Dry-Aged",
          "Free-Range"
        ],
        "serviceImageQuery": "fresh beef steak cuts displayed on butcher counter refrigerated glass case"
      },
      {
        "name": "House Charcuterie",
        "description": "Hand-crafted bacon, boerewors, biltong, and cured meats made in small batches in-house.",
        "tags": [
          "Biltong",
          "Boerewors"
        ],
        "serviceImageQuery": "cured meats salami biltong hanging in butcher shop deli display"
      },
      {
        "name": "Deli & Platters",
        "description": "Artisan cheeses, antipasti, and deli boards assembled fresh daily for entertaining.",
        "tags": [
          "Cheese Board",
          "Antipasti"
        ],
        "serviceImageQuery": "charcuterie grazing board cheese cured meats olives figs on wooden platter"
      },
      {
        "name": "Braai Packs & Marinades",
        "description": "Ready-to-braai packs with marinated chops, boerewors, and sosaties — just add fire.",
        "tags": [
          "Braai Packs",
          "Marinades"
        ],
        "serviceImageQuery": "marinated meat kebab skewers and sausages arranged on tray ready for barbecue grill"
      }
    ],
    "galleryHeading": "From the Block",
    "aboutHeading": "Butchery as a <em>craft</em>",
    "aboutText": "We've always believed you should know exactly where your meat comes from. Our suppliers are local farmers we visit personally \u2014 people who raise their animals properly and take pride in what they produce.\n\nEvery cut is handled by a qualified butcher. We dry-age our beef in-house, and we make everything in our deli from scratch.",
    "aboutMission": "We believe the best braai starts with meat raised right and cut by someone who knows their craft.",
    "stats": [
      {
        "value": "20+",
        "label": "Years Trading",
        "sublabel": "since 2004"
      },
      {
        "value": "15+",
        "label": "Local Farmers",
        "sublabel": "direct supply relationships"
      },
      {
        "value": "40+",
        "label": "Deli Lines",
        "sublabel": "made fresh weekly"
      },
      {
        "value": "4.9\u2605",
        "label": "Google Rating",
        "sublabel": "from 300+ reviews"
      }
    ],
    "contactHeading": "Want to place a bulk or event order?",
    "testimonial": {
      "quote": "The dry-aged rib-eye changed my life. The biltong is dangerously good.",
      "author": "Jamie S., Verified Client",
      "rating": 5
    },
    "imageMood": "rich, rustic, earthy",
    "heroImageQuery": "butcher shop counter fresh meat cuts steak chops displayed refrigerated glass case",
    "ogImageQuery": "premium marbled beef steak cuts displayed on butcher counter",
    "aboutImageQuery": "butcher in apron cutting meat with cleaver on wooden chopping block shop",
    "galleryImageQueries": [
      "deli counter display case cured meats cheeses salads behind glass butcher shop",
      "raw marbled ribeye steak cuts arranged on wooden board butcher paper",
      "handmade sausages and boerewors coils on butcher shop counter tray",
      "butcher shop interior refrigerated counter weighing scale tiles clean"
    ],
    "contactHours": "Mon\u2013Fri: 07:30\u201318:00 \u00b7 Sat: 07:30\u201314:00 \u00b7 Sun: 08:00\u201312:00"
  },
  "Catering": {
    "heroEyebrow": "PROFESSIONAL EVENT CATERING",
    "heroAccent": "From 20 to 2,000 guests",
    "tagline": "Food that makes your event <em>unforgettable</em>",
    "heroSubtitle": "Full-service catering for corporate events, weddings, and private functions with menus built around you.",
    "ctaPrimary": "Get a Quote",
    "ctaSecondary": "Our Menus",
    "ctaNote": "Free consultation \u00b7 Custom menus \u00b7 No minimum too small",
    "badge": "SA Chefs Association Accredited",
    "servicesHeading": "What We Offer",
    "services": [
      {
        "name": "Corporate Catering",
        "description": "Working lunches, boardroom breakfasts, and conference buffets delivered on time, every time.",
        "tags": [
          "Corporate",
          "Buffet"
        ],
        "serviceImageQuery": "corporate catering buffet spread platters sandwiches salads on long table conference event"
      },
      {
        "name": "Wedding & Private Events",
        "description": "Bespoke menus for weddings, birthdays, and milestone events with full table service.",
        "tags": [
          "Wedding",
          "Table Service"
        ],
        "serviceImageQuery": "wedding reception dinner table place settings flowers candles elegant white linen"
      },
      {
        "name": "Cocktail & Canape Parties",
        "description": "Sophisticated finger food and canape stations for launches, cocktail evenings, and networking.",
        "tags": [
          "Canapes",
          "Cocktail Events"
        ],
        "serviceImageQuery": "canapes finger food on silver serving tray passed at cocktail event party"
      },
      {
        "name": "Meal Prep & Drop-Off",
        "description": "Weekly meal prep packages delivered to your home or office — wholesome food without the cooking.",
        "tags": [
          "Meal Prep",
          "Drop-Off"
        ],
        "serviceImageQuery": "meal prep containers portioned healthy food stacked kitchen counter labelled"
      }
    ],
    "galleryHeading": "Events We've Fed",
    "aboutHeading": "Catering done with <em>precision</em>",
    "aboutText": "We've been feeding Cape Town's events for over a decade \u2014 from intimate 30-person dinners to corporate conferences with 1,500 guests. Our logistics are tight, our food is fresh, and we never drop the ball.\n\nEvery menu is built in consultation with you. We handle dietary requirements, theming, staffing, and equipment \u2014 you just enjoy the event.",
    "aboutMission": "We believe great catering is invisible \u2014 guests remember the food, never the logistics.",
    "stats": [
      {
        "value": "14+",
        "label": "Years Catering",
        "sublabel": "since 2010"
      },
      {
        "value": "600+",
        "label": "Events Catered",
        "sublabel": "including 80+ weddings"
      },
      {
        "value": "2,000",
        "label": "Max Guest Capacity",
        "sublabel": "with full service"
      },
      {
        "value": "98%",
        "label": "Client Return Rate",
        "sublabel": "from post-event surveys"
      }
    ],
    "contactHeading": "Planning an event? Let's talk food.",
    "testimonial": {
      "quote": "They fed 400 guests flawlessly. Every dietary need met, every course on time.",
      "author": "Priya N., Verified Client",
      "rating": 5
    },
    "imageMood": "elegant, abundant, professional",
    "heroImageQuery": "elegant catering buffet table platters trays garnished food at outdoor event venue",
    "ogImageQuery": "catering buffet spread platters chafing dishes elegant event table",
    "aboutImageQuery": "catering team chefs preparing plated dishes in commercial kitchen event prep",
    "galleryImageQueries": [
      "banquet table set with white plates cutlery wine glasses napkins catering event",
      "canapes appetizers arranged on slate platters catering cocktail party close-up",
      "long wedding reception table decorated flowers candles place settings outdoor",
      "dessert table display tiered cakes macarons pastries catering event elegant"
    ],
    "contactHours": "Mon\u2013Fri: 08:00\u201317:00 \u00b7 Consultations by appointment \u00b7 Events 7 days"
  },
  "Fast Food / Takeaway": {
    "heroEyebrow": "FAST. FRESH. FLAVOURFUL.",
    "heroAccent": "Ready in under 10 minutes",
    "tagline": "Real food, fast \u2014 no <em>compromises</em>",
    "heroSubtitle": "Freshly made meals, generous portions, and flavours that keep you coming back every week.",
    "ctaPrimary": "Order Now",
    "ctaSecondary": "View Menu",
    "ctaNote": "Pick-up & delivery \u00b7 Open late \u00b7 No hidden fees",
    "badge": "Food Safety Grade A Certified",
    "servicesHeading": "What's on the Menu",
    "services": [
      {
        "name": "Signature Meals",
        "description": "Our most-loved combos served hot, fresh, and exactly as they should be every time.",
        "tags": [
          "Signature",
          "Daily Fresh"
        ],
        "serviceImageQuery": "juicy cheeseburger meal with golden fries and drink on fast food tray close-up"
      },
      {
        "name": "Family Packs",
        "description": "Value-packed bundles designed to feed the whole family without breaking the budget.",
        "tags": [
          "Family Value",
          "Bulk Orders"
        ],
        "serviceImageQuery": "family takeaway meal boxes open on table burgers wraps fries sharing"
      },
      {
        "name": "Delivery & Collect",
        "description": "Order online for lightning-fast delivery or skip the queue with click-and-collect.",
        "tags": [
          "Delivery",
          "Click & Collect"
        ],
        "serviceImageQuery": "chicken wrap burrito wrapped in foil paper takeaway packaging counter"
      },
      {
        "name": "Loyalty & Rewards",
        "description": "Earn stamps on every order and get your tenth meal free — because regulars deserve a perk.",
        "tags": [
          "Loyalty Card",
          "Rewards"
        ],
        "serviceImageQuery": "brown paper takeaway bags lined up on fast food counter ready for collection"
      }
    ],
    "galleryHeading": "Hot Off the Grill",
    "aboutHeading": "Fast food with <em>real</em> ingredients",
    "aboutText": "We started because we were tired of fast food that tasted like a factory. Our menu is kept tight on purpose \u2014 we do a handful of things and we do them brilliantly.\n\nFresh produce arrives daily. Nothing sits in a freezer for weeks. That's not how we do things.",
    "aboutMission": "We believe fast food should actually taste like food \u2014 made by people who care what goes into it.",
    "stats": [
      {
        "value": "5+",
        "label": "Years Open",
        "sublabel": "since 2019"
      },
      {
        "value": "500+",
        "label": "Orders Per Day",
        "sublabel": "at peak"
      },
      {
        "value": "10min",
        "label": "Average Wait Time",
        "sublabel": "pick-up & dine-in"
      },
      {
        "value": "4.7\u2605",
        "label": "Delivery Rating",
        "sublabel": "on UberEats & Mr D"
      }
    ],
    "contactHeading": "Hungry? Here's how to order.",
    "testimonial": {
      "quote": "Fastest, tastiest takeaway in the area. The portions are outrageously generous.",
      "author": "Taylor D., Verified Client",
      "rating": 5
    },
    "imageMood": "bold, vibrant, appetising",
    "heroImageQuery": "smash burger loaded cheese bacon fries in takeaway container close-up appetising",
    "ogImageQuery": "loaded cheeseburger and golden fries in takeaway box fast food close-up",
    "aboutImageQuery": "fast food kitchen cook flipping burgers on flat grill busy preparation counter",
    "galleryImageQueries": [
      "fast food restaurant counter ordering screen menu board customers queueing",
      "double smash burger melted cheese sesame bun close-up hands holding",
      "crispy fried chicken wings on plate with dipping sauce coleslaw",
      "thick milkshake tall glass whipped cream straw fast food counter retro"
    ],
    "contactHours": "Mon\u2013Sun: 10:00\u201322:00 \u00b7 Delivery until 21:30"
  },
  "Food Truck": {
    "heroEyebrow": "STREET FOOD DONE SERIOUSLY",
    "heroAccent": "Find us at the markets this weekend",
    "tagline": "Chef-quality food from a <em>window</em>",
    "heroSubtitle": "Bold flavours, creative menus, and the best lunch queue you'll ever stand in.",
    "ctaPrimary": "Find Our Location",
    "ctaSecondary": "This Week's Menu",
    "ctaNote": "Updated weekly \u00b7 Follow us for daily locations",
    "badge": "Cape Town Street Food Collective",
    "servicesHeading": "On the Menu",
    "services": [
      {
        "name": "Weekly Signature Dish",
        "description": "A rotating headline dish built around seasonal ingredients and whatever's inspiring us.",
        "tags": [
          "Rotating Menu",
          "Seasonal"
        ],
        "serviceImageQuery": "food truck serving burger through window to customer outdoor street market"
      },
      {
        "name": "Market Weekends",
        "description": "Find us at Cape Town's best markets every Saturday and Sunday with our full menu.",
        "tags": [
          "Markets",
          "Weekend"
        ],
        "serviceImageQuery": "street tacos plated with salsa lime garnish served from food truck market stall"
      },
      {
        "name": "Private Events & Catering",
        "description": "Bring the truck to your corporate event, birthday, or street party \u2014 we handle everything.",
        "tags": [
          "Private Hire",
          "Events"
        ],
        "serviceImageQuery": "food truck parked at corporate event outdoor party string lights guests"
      },
      {
        "name": "Festival & Pop-Up Bookings",
        "description": "Book us for food festivals, pop-up markets, and neighbourhood events across the Western Cape.",
        "tags": [
          "Festivals",
          "Pop-Ups"
        ],
        "serviceImageQuery": "outdoor food festival market stalls food trucks crowd eating street food night"
      }
    ],
    "galleryHeading": "From the Window",
    "aboutHeading": "A kitchen on <em>wheels</em>",
    "aboutText": "We built a food truck because we wanted to cook proper food without the overhead of a restaurant. The menu changes constantly \u2014 we chase what's in season, what excites us, and what we'd want to eat on a Saturday morning.\n\nNo gimmicks. Just really good food served from a window.",
    "aboutMission": "We believe street food should surprise you \u2014 not just fill you.",
    "stats": [
      {
        "value": "4+",
        "label": "Years Rolling",
        "sublabel": "since 2020"
      },
      {
        "value": "50+",
        "label": "Markets Per Year",
        "sublabel": "Cape Town & surrounds"
      },
      {
        "value": "100+",
        "label": "Private Events",
        "sublabel": "corporate & private"
      },
      {
        "value": "4.9\u2605",
        "label": "Google Rating",
        "sublabel": "from 200+ reviews"
      }
    ],
    "contactHeading": "Want to book us for your event?",
    "testimonial": {
      "quote": "Waited 20 minutes in the queue and every second was worth it. Unreal food.",
      "author": "Cara B., Verified Client",
      "rating": 5
    },
    "imageMood": "vibrant, casual, energetic",
    "heroImageQuery": "colourful food truck serving window customers queuing at outdoor street food market sunny day",
    "ogImageQuery": "food truck serving window chef handing food to customer street market",
    "aboutImageQuery": "food truck chef cooking on flat grill inside truck serving window steam",
    "galleryImageQueries": [
      "colourful painted food truck parked at outdoor market with bunting and customers",
      "gourmet street food burger being served from food truck window hands",
      "food truck festival evening string lights crowd eating at standing tables",
      "handwritten chalkboard menu board outside food truck at market specials listed"
    ],
    "contactHours": "Sat\u2013Sun: 09:00\u201315:00 at markets \u00b7 Weekday locations on Instagram"
  },
  "Juice / Smoothie Bar": {
    "heroEyebrow": "COLD-PRESSED GOODNESS",
    "heroAccent": "No concentrates. No compromises.",
    "tagline": "Fuel your body with <em>intention</em>",
    "heroSubtitle": "Cold-pressed juices, superfood smoothies, and wellness shots made fresh to order every day.",
    "ctaPrimary": "Order Now",
    "ctaSecondary": "Our Menu",
    "ctaNote": "Ready in 5 minutes \u00b7 Delivery available \u00b7 Vegan-friendly",
    "badge": "Heart & Stroke Foundation Endorsed",
    "servicesHeading": "What We Press",
    "services": [
      {
        "name": "Cold-Pressed Juices",
        "description": "Slow-pressed daily using whole fruits and vegetables \u2014 no heat, no nutrients lost.",
        "tags": [
          "Cold-Pressed",
          "Raw"
        ],
        "serviceImageQuery": "cold pressed juice bottles green orange red lined up on counter fresh healthy"
      },
      {
        "name": "Superfood Smoothies",
        "description": "Blended bowls and smoothies packed with adaptogens, protein, and seasonal fruits.",
        "tags": [
          "Smoothie Bowl",
          "Protein"
        ],
        "serviceImageQuery": "acai smoothie bowl topped with granola banana slices blueberries coconut on table"
      },
      {
        "name": "Wellness Shots & Cleanses",
        "description": "Daily immunity shots and 3- to 5-day juice cleanses designed to reset your system.",
        "tags": [
          "Immunity Shots",
          "Cleanse"
        ],
        "serviceImageQuery": "juice cleanse detox bottles labelled colourful in row refrigerator shelf health bar"
      },
      {
        "name": "Açaí & Smoothie Bowls",
        "description": "Thick-blended açaí, pitaya, and green bowls topped with granola, seeds, and seasonal fruit.",
        "tags": [
          "Açaí Bowls",
          "Toppings"
        ],
        "serviceImageQuery": "pitaya dragon fruit smoothie bowl bright pink topped seeds fruit spoon close-up"
      }
    ],
    "galleryHeading": "Fresh Every Morning",
    "aboutHeading": "Real ingredients, real <em>results</em>",
    "aboutText": "We started pressing juices because we couldn't find anything that actually tasted like fruit \u2014 not a concentrate, not a powder, not a 'flavoured' drink. Just real produce, handled properly.\n\nEverything is made fresh daily. If we run out, we run out \u2014 that's just what fresh means.",
    "aboutMission": "We believe what you put in your body matters, and it should also taste extraordinary.",
    "stats": [
      {
        "value": "6+",
        "label": "Years Pressing",
        "sublabel": "since 2018"
      },
      {
        "value": "30+",
        "label": "Menu Items",
        "sublabel": "updated seasonally"
      },
      {
        "value": "200+",
        "label": "Bottles Daily",
        "sublabel": "pressed fresh each morning"
      },
      {
        "value": "98%",
        "label": "Customer Satisfaction",
        "sublabel": "from loyalty surveys"
      }
    ],
    "contactHeading": "Ready to start your wellness journey?",
    "testimonial": {
      "quote": "The green press is the only reason I survive Monday mornings. Genuinely life-changing.",
      "author": "Morgan H., Verified Client",
      "rating": 5
    },
    "imageMood": "fresh, bright, clean",
    "heroImageQuery": "colourful fresh juice glasses and smoothie bowls on juice bar counter with fruit display",
    "ogImageQuery": "row of colourful fresh smoothie glasses garnished fruit straws juice bar counter",
    "aboutImageQuery": "barista blending smoothie in commercial blender fresh fruit on counter juice bar",
    "galleryImageQueries": [
      "juice bar counter with fresh whole fruit display blender cutting board bright clean",
      "acai smoothie bowl topped with granola sliced banana blueberries coconut flakes",
      "green celery spinach juice in glass fresh cold pressed healthy close-up",
      "colourful smoothie juice bottles lined up in refrigerator display juice bar"
    ],
    "contactHours": "Mon\u2013Fri: 07:00\u201317:00 \u00b7 Sat: 08:00\u201314:00 \u00b7 Sun: 09:00\u201313:00"
  },
  "Pizza Shop": {
    "heroEyebrow": "WOOD-FIRED NEAPOLITAN PIZZA",
    "heroAccent": "90-second bake. 900\u00b0C oven.",
    "tagline": "Pizza the way Naples <em>intended</em>",
    "heroSubtitle": "72-hour fermented dough, San Marzano tomatoes, and fior di latte mozzarella from our wood-fired oven.",
    "ctaPrimary": "Order Now",
    "ctaSecondary": "Our Menu",
    "ctaNote": "Dine-in & takeaway \u00b7 Delivery within 5km \u00b7 Build your own",
    "badge": "Associazione Verace Pizza Napoletana",
    "servicesHeading": "What We Fire",
    "services": [
      {
        "name": "Classic Neapolitan Pizzas",
        "description": "Certified Neapolitan bases with San Marzano tomatoes, fresh basil, and premium toppings.",
        "tags": [
          "Neapolitan",
          "Wood-Fired"
        ],
        "serviceImageQuery": "neapolitan pizza margherita basil fresh oven"
      },
      {
        "name": "Specialty & Seasonal Pies",
        "description": "Monthly specials built around seasonal produce and creative flavour combinations.",
        "tags": [
          "Seasonal",
          "Creative"
        ],
        "serviceImageQuery": "gourmet specialty pizza fresh toppings prosciutto arugula close-up"
      },
      {
        "name": "Dine-In & Takeaway",
        "description": "Eat in our relaxed pizzeria or take away \u2014 every pizza made fresh on order.",
        "tags": [
          "Dine-In",
          "Takeaway"
        ],
        "serviceImageQuery": "calzone folded pizza plate Italian restaurant"
      },
      {
        "name": "Build Your Own Pizza",
        "description": "Choose your base, sauce, and toppings — we fire it in the oven exactly how you like it.",
        "tags": [
          "Custom",
          "Build Your Own"
        ],
        "serviceImageQuery": "pizza toppings ingredients dough preparation board"
      }
    ],
    "galleryHeading": "From the Oven",
    "aboutHeading": "Pizza made with <em>respect</em>",
    "aboutText": "Our dough takes 72 hours. Our oven runs at 900 degrees. The tomatoes come from San Marzano. These are not negotiable \u2014 they're the reason our pizza tastes different to everything else.\n\nWe are proudly fussy about ingredients, technique, and the belief that a great pizza doesn't need much.",
    "aboutMission": "We believe pizza is one of the world's perfect foods \u2014 and it deserves to be made perfectly.",
    "stats": [
      {
        "value": "9+",
        "label": "Years Firing",
        "sublabel": "since 2015"
      },
      {
        "value": "72hrs",
        "label": "Dough Ferment",
        "sublabel": "cold-proofed always"
      },
      {
        "value": "25+",
        "label": "Pizzas on Menu",
        "sublabel": "classic & seasonal"
      },
      {
        "value": "4.9\u2605",
        "label": "Google Rating",
        "sublabel": "from 750+ reviews"
      }
    ],
    "contactHeading": "Ready to order or make a booking?",
    "testimonial": {
      "quote": "Best pizza I've had outside of Naples. The margherita alone is worth the trip.",
      "author": "Marco F., Verified Client",
      "rating": 5
    },
    "imageMood": "rustic, warm, Italian",
    "heroImageQuery": "neapolitan pizza fresh from wood fired oven charred bubbles",
    "ogImageQuery": "neapolitan pizza fresh out oven charred bubbles",
    "aboutImageQuery": "pizza maker stretching dough near wood fired oven",
    "galleryImageQueries": [
      "pizza oven interior flames brick wood fired",
      "margherita pizza fresh basil mozzarella close-up",
      "pizza slices box takeaway delivery",
      "pizza restaurant interior tables red checked cloth"
    ],
    "contactHours": "Tue\u2013Sun: 11:30\u201322:00 \u00b7 Delivery until 21:30 \u00b7 Closed Mondays"
  },
  "Sushi / Asian Restaurant": {
    "heroEyebrow": "AUTHENTIC JAPANESE CUISINE",
    "heroAccent": "Sushi-grade fish flown in twice weekly",
    "tagline": "Precision on a <em>plate</em>",
    "heroSubtitle": "Handcrafted sushi, fresh sashimi, and izakaya-inspired dishes made with the patience the craft demands.",
    "ctaPrimary": "Reserve Now",
    "ctaSecondary": "View Menu",
    "ctaNote": "Dine-in & takeaway \u00b7 Omakase available \u00b7 Delivery in 30min",
    "badge": "Japanese Culinary Institute Trained",
    "servicesHeading": "At the Counter",
    "services": [
      {
        "name": "Nigiri & Sashimi",
        "description": "Sushi-grade fish prepared daily and sliced with the precision that Japanese tradition demands.",
        "tags": [
          "Nigiri",
          "Sashimi"
        ],
        "serviceImageQuery": "sushi nigiri salmon tuna rice plate"
      },
      {
        "name": "Specialty Rolls & Maki",
        "description": "Creative and traditional rolls built with premium fillings and hand-rolled rice.",
        "tags": [
          "Maki",
          "Specialty Rolls"
        ],
        "serviceImageQuery": "sushi maki rolls platter colourful fresh Japanese restaurant"
      },
      {
        "name": "Omakase Experience",
        "description": "Leave it to the chef \u2014 a curated multi-course omakase menu at the counter or at your table.",
        "tags": [
          "Omakase",
          "Chef's Choice"
        ],
        "serviceImageQuery": "omakase chef plating sushi counter Japanese fine dining"
      },
      {
        "name": "Bento & Lunch Boxes",
        "description": "Neatly portioned bento sets with rice, pickles, and your choice of protein — perfect for a quick lunch.",
        "tags": [
          "Bento",
          "Lunch Set"
        ],
        "serviceImageQuery": "bento box Japanese lunch rice compartments"
      }
    ],
    "galleryHeading": "From the Counter",
    "aboutHeading": "Sushi made with <em>mastery</em>",
    "aboutText": "Our head chef trained in Tokyo for seven years before bringing his craft to Cape Town. The fish is sourced from trusted suppliers twice a week. The rice is seasoned by hand to exactly the right temperature.\n\nThis is food that demands patience, and rewards it.",
    "aboutMission": "We believe sushi is the purest expression of a chef's respect for their ingredients.",
    "stats": [
      {
        "value": "11+",
        "label": "Years Open",
        "sublabel": "since 2013"
      },
      {
        "value": "2x",
        "label": "Weekly Fish Delivery",
        "sublabel": "sushi-grade imports"
      },
      {
        "value": "60+",
        "label": "Menu Items",
        "sublabel": "classic & creative"
      },
      {
        "value": "4.8\u2605",
        "label": "Google Rating",
        "sublabel": "from 900+ reviews"
      }
    ],
    "contactHeading": "Ready to make a reservation?",
    "testimonial": {
      "quote": "The omakase was transcendent. Best sushi in South Africa \u2014 nothing else comes close.",
      "author": "Yuki T., Verified Client",
      "rating": 5
    },
    "imageMood": "minimal, precise, elegant",
    "heroImageQuery": "sushi platter nigiri sashimi rolls wooden board",
    "ogImageQuery": "sushi plate nigiri maki rolls wasabi ginger",
    "aboutImageQuery": "sushi chef slicing fresh fish behind counter",
    "galleryImageQueries": [
      "sushi restaurant interior counter seats minimal Japanese",
      "sashimi platter fresh fish sliced ice",
      "ramen bowl noodles soup chopsticks steam",
      "maki rolls platter soy sauce chopsticks"
    ],
    "contactHours": "Mon\u2013Sun: 12:00\u201322:00 \u00b7 Last orders 21:30 \u00b7 Omakase by reservation"
  },
  "Ice Cream / Gelato Shop": {
    "heroEyebrow": "ARTISAN GELATO CAPE TOWN",
    "heroAccent": "Small-batch, churned fresh daily",
    "tagline": "Happiness in every <em>scoop</em>",
    "heroSubtitle": "Italian-method gelato and sorbet made in small batches using whole milk, real fruit, and no artificial flavours.",
    "ctaPrimary": "See Today's Flavours",
    "ctaSecondary": "Find Us",
    "ctaNote": "New flavours every week \u00b7 Vegan sorbets available",
    "badge": "Artigiano Gelato Certified",
    "servicesHeading": "In the Cabinet",
    "services": [
      {
        "name": "Classic Gelato",
        "description": "Italian-method gelato in timeless flavours: pistachio, stracciatella, hazelnut, and dark chocolate.",
        "tags": [
          "Italian Method",
          "Classic Flavours"
        ],
        "serviceImageQuery": "gelato scoops tray display cabinet flavours"
      },
      {
        "name": "Seasonal & Creative Flavours",
        "description": "Weekly rotating flavours built around fresh local fruit and unexpected flavour combinations.",
        "tags": [
          "Seasonal",
          "Creative"
        ],
        "serviceImageQuery": "colourful gelato scoops waffle cone fresh fruit toppings"
      },
      {
        "name": "Cakes & Catering",
        "description": "Gelato cakes and wholesale catering for events, restaurants, and corporate clients.",
        "tags": [
          "Gelato Cakes",
          "Wholesale"
        ],
        "serviceImageQuery": "ice cream cake layers frozen dessert sliced beautiful"
      },
      {
        "name": "Milkshakes & Floats",
        "description": "Thick hand-spun milkshakes and old-school ice cream floats made with any flavour in the cabinet.",
        "tags": [
          "Milkshakes",
          "Floats"
        ],
        "serviceImageQuery": "milkshake tall glass straw whipped cream"
      }
    ],
    "galleryHeading": "Today's Cabinet",
    "aboutHeading": "Gelato as it should <em>taste</em>",
    "aboutText": "We trained in Bologna, worked in a Milanese gelateria, and then came home to Cape Town to make gelato the same way. Whole milk, fresh cream, real fruit, nothing artificial.\n\nThe cabinet changes every week because the seasons change and fresh ingredients inspire new ideas. Come back often.",
    "aboutMission": "We believe a single perfect scoop of gelato is one of the simplest, most joyful things in the world.",
    "stats": [
      {
        "value": "7+",
        "label": "Years Churning",
        "sublabel": "since 2017"
      },
      {
        "value": "200+",
        "label": "Flavours Created",
        "sublabel": "since opening"
      },
      {
        "value": "18",
        "label": "Flavours Daily",
        "sublabel": "in the cabinet"
      },
      {
        "value": "4.9\u2605",
        "label": "Google Rating",
        "sublabel": "from 400+ reviews"
      }
    ],
    "contactHeading": "Want gelato at your event?",
    "testimonial": {
      "quote": "The pistachio is the real deal. My Italian grandmother would approve.",
      "author": "Sofia M., Verified Client",
      "rating": 5
    },
    "imageMood": "bright, joyful, colourful",
    "heroImageQuery": "gelato display cabinet colourful scoops metal trays",
    "ogImageQuery": "ice cream scoops colourful cone waffle",
    "aboutImageQuery": "gelato maker scooping from display cabinet into cone",
    "galleryImageQueries": [
      "gelato shop interior display case colourful flavours",
      "ice cream sundae glass toppings chocolate sauce",
      "waffle cone scoops ice cream hand close-up",
      "milkshake tall glass cream topping straw"
    ],
    "contactHours": "Mon\u2013Sun: 10:00\u201321:00 \u00b7 Extended hours Dec\u2013Feb"
  },
  "Wine Shop / Liquor Store": {
    "heroEyebrow": "CAPE WINE SPECIALISTS",
    "heroAccent": "600+ labels from Stellenbosch to Swartland",
    "tagline": "Wine chosen with <em>knowledge</em>, not guesswork",
    "heroSubtitle": "An expertly curated selection of South African and international wines, with advice worth trusting.",
    "ctaPrimary": "Shop Online",
    "ctaSecondary": "Book a Tasting",
    "ctaNote": "Free delivery over R600 \u00b7 Expert guidance always",
    "badge": "Cape Wine Master Guild Member",
    "servicesHeading": "What We Stock",
    "services": [
      {
        "name": "SA Fine Wine Collection",
        "description": "Over 400 South African labels spanning the Cape's finest estates and emerging producers.",
        "tags": [
          "Cape Wine",
          "Fine Wine"
        ],
        "serviceImageQuery": "wine bottles rack red white wooden shelf"
      },
      {
        "name": "Imported & Craft Spirits",
        "description": "A hand-picked range of imported wines, craft gins, whisky, and champagne from around the world.",
        "tags": [
          "Imports",
          "Craft Spirits"
        ],
        "serviceImageQuery": "whisky bourbon bottles shelf bar display"
      },
      {
        "name": "Wine Tastings & Gifting",
        "description": "Hosted in-store tastings and beautifully curated wine gift boxes for any occasion.",
        "tags": [
          "Tastings",
          "Gift Boxes"
        ],
        "serviceImageQuery": "wine tasting event glasses pouring cellar"
      },
      {
        "name": "Mixed Cases & Subscriptions",
        "description": "Curated mixed cases delivered monthly — discover new estates and varietals without the guesswork.",
        "tags": [
          "Mixed Cases",
          "Subscription"
        ],
        "serviceImageQuery": "wine case wooden box bottles packed gift"
      }
    ],
    "galleryHeading": "In the Cellar",
    "aboutHeading": "Wine bought with <em>conviction</em>",
    "aboutText": "We started this shop because we wanted a wine store where you could walk in without knowing anything and walk out with something genuinely worth opening. Our buyers visit estates personally and list what they believe in.\n\nWe stock South African wine with the pride it deserves \u2014 the Cape makes world-class wine, and we've built our shelves around that.",
    "aboutMission": "We believe every bottle on our shelf should be something we'd open ourselves.",
    "stats": [
      {
        "value": "15+",
        "label": "Years in Wine",
        "sublabel": "since 2009"
      },
      {
        "value": "600+",
        "label": "Labels in Stock",
        "sublabel": "SA & international"
      },
      {
        "value": "80+",
        "label": "Estates Represented",
        "sublabel": "many exclusive to us"
      },
      {
        "value": "4.8\u2605",
        "label": "Google Rating",
        "sublabel": "from 250+ reviews"
      }
    ],
    "contactHeading": "Looking for something specific?",
    "testimonial": {
      "quote": "They know wine properly. Walked in clueless and left with something extraordinary.",
      "author": "Claire D., Verified Client",
      "rating": 5
    },
    "imageMood": "rich, warm, sophisticated",
    "heroImageQuery": "wine bottles rack cellar wooden shelves display",
    "ogImageQuery": "wine bottles displayed wooden shelf cellar",
    "aboutImageQuery": "wine tasting event glasses being poured cellar barrel",
    "galleryImageQueries": [
      "wine shop interior bottles shelves wooden racks",
      "wine tasting glasses poured red white cellar",
      "whisky bottles displayed shelf bar amber",
      "craft gin bottles displayed shelf labels"
    ],
    "contactHours": "Mon\u2013Fri: 09:00\u201319:00 \u00b7 Sat: 09:00\u201317:00 \u00b7 Sun: 10:00\u201314:00"
  },
  "Guest House / B&B": {
    "heroEyebrow": "CAPE TOWN BED & BREAKFAST",
    "heroAccent": "Mountain views \u00b7 5-minute walk to the beach",
    "tagline": "Wake up somewhere that feels like <em>home</em>",
    "heroSubtitle": "Comfortable, characterful rooms and a breakfast table that sets the tone for your whole day.",
    "ctaPrimary": "Check Availability",
    "ctaSecondary": "Our Rooms",
    "ctaNote": "Best rates direct \u00b7 Free cancellation available",
    "badge": "Tourism Grading Council SA \u2014 4 Stars",
    "servicesHeading": "What We Offer",
    "services": [
      {
        "name": "En-Suite Rooms",
        "description": "Individually styled rooms with quality linen, DSTV, WiFi, and private bathrooms.",
        "tags": [
          "En-Suite",
          "Mountain View"
        ],
        "serviceImageQuery": "guest house bedroom double bed white linen"
      },
      {
        "name": "Full Cooked Breakfast",
        "description": "A proper South African breakfast made fresh every morning included in your rate.",
        "tags": [
          "Full Breakfast",
          "Home-Cooked"
        ],
        "serviceImageQuery": "breakfast spread table croissants fruit juice"
      },
      {
        "name": "Concierge & Local Tips",
        "description": "Personalised recommendations, activity bookings, and airport transfers arranged for you.",
        "tags": [
          "Concierge",
          "Airport Transfer"
        ],
        "serviceImageQuery": "guest house pool garden loungers outdoor"
      },
      {
        "name": "Self-Catering Cottage",
        "description": "A private garden cottage with kitchenette, braai area, and its own entrance for longer stays.",
        "tags": [
          "Self-Catering",
          "Garden Cottage"
        ],
        "serviceImageQuery": "cottage garden patio braai outdoor seating"
      }
    ],
    "galleryHeading": "Your Home Away",
    "aboutHeading": "Where guests become <em>friends</em>",
    "aboutText": "We've been welcoming travellers to our Cape Town home for over 15 years. It's a family-run guesthouse and that's never going to change \u2014 the warmth, the personal attention, the handwritten breakfast menus.\n\nWe know Cape Town inside out. Our guests leave better informed, better rested, and usually with a list of places to come back to.",
    "aboutMission": "We believe accommodation should feel personal \u2014 not like checking into a building.",
    "stats": [
      {
        "value": "15+",
        "label": "Years Hosting",
        "sublabel": "since 2009"
      },
      {
        "value": "8",
        "label": "Rooms Available",
        "sublabel": "all en-suite"
      },
      {
        "value": "50+",
        "label": "Countries Visited",
        "sublabel": "by our guests"
      },
      {
        "value": "9.4",
        "label": "Booking.com Score",
        "sublabel": "from 300+ reviews"
      }
    ],
    "contactHeading": "Ready to check availability?",
    "testimonial": {
      "quote": "Felt like staying with family. The breakfast alone is worth booking for.",
      "author": "James T., Verified Client",
      "rating": 5
    },
    "imageMood": "warm, inviting, Cape Dutch",
    "heroImageQuery": "guest house bedroom interior white linen pillows cosy",
    "ogImageQuery": "guest house exterior garden Cape Town",
    "aboutImageQuery": "bed and breakfast garden patio outdoor seating morning",
    "galleryImageQueries": [
      "guest house bedroom white sheets wooden headboard",
      "breakfast table set fruit pastries coffee morning",
      "guest house garden path flowers outdoor seating",
      "guest house bathroom freestanding bath towels"
    ],
    "contactHours": "Check-in: 14:00\u201320:00 \u00b7 Check-out: 07:00\u201310:30 \u00b7 Reception 24hrs"
  },
  "Hotel": {
    "heroEyebrow": "LUXURY CAPE TOWN HOTEL",
    "heroAccent": "Perfectly positioned in the City Bowl",
    "tagline": "Where the city meets <em>sanctuary</em>",
    "heroSubtitle": "Sophisticated rooms, attentive service, and a rooftop pool with views that remind you why you came.",
    "ctaPrimary": "Book Direct",
    "ctaSecondary": "Explore Rooms",
    "ctaNote": "Best rate guaranteed direct \u00b7 Flexible cancellation",
    "badge": "Tourism Grading Council SA \u2014 5 Stars",
    "servicesHeading": "The Hotel Experience",
    "services": [
      {
        "name": "Deluxe Rooms & Suites",
        "description": "Spacious rooms designed with African craft and modern comfort, some with private balconies.",
        "tags": [
          "Luxury Rooms",
          "City Views"
        ],
        "serviceImageQuery": "hotel suite bedroom luxury bed city view"
      },
      {
        "name": "Rooftop Pool & Bar",
        "description": "Heated rooftop pool and cocktail bar with panoramic views of Table Mountain and the Atlantic.",
        "tags": [
          "Rooftop Pool",
          "Table Mountain Views"
        ],
        "serviceImageQuery": "luxury hotel rooftop pool loungers panoramic city view sunset"
      },
      {
        "name": "Fine Dining Restaurant",
        "description": "In-house restaurant serving contemporary South African cuisine for breakfast, lunch, and dinner.",
        "tags": [
          "Restaurant",
          "Fine Dining"
        ],
        "serviceImageQuery": "fine dining hotel restaurant table set elegant evening ambience"
      },
      {
        "name": "Conference & Events",
        "description": "Fully equipped meeting rooms and event spaces with AV, catering, and dedicated coordination.",
        "tags": [
          "Conferences",
          "Business Events"
        ],
        "serviceImageQuery": "conference room long table projector screen setup"
      }
    ],
    "galleryHeading": "Life at the Hotel",
    "aboutHeading": "Luxury in its most <em>genuine</em> form",
    "aboutText": "We are a proudly South African hotel built on the principle that true luxury is about feeling, not just fixtures. Our staff are locals who love this city, and their enthusiasm for Cape Town is infectious.\n\nFrom the moment you arrive until the moment you reluctantly check out, every detail is considered.",
    "aboutMission": "We believe a great hotel doesn't just accommodate you \u2014 it makes you fall in love with the city.",
    "stats": [
      {
        "value": "18+",
        "label": "Years Operating",
        "sublabel": "since 2006"
      },
      {
        "value": "64",
        "label": "Rooms & Suites",
        "sublabel": "all sea or mountain facing"
      },
      {
        "value": "95%",
        "label": "Occupancy Rate",
        "sublabel": "peak season"
      },
      {
        "value": "9.2",
        "label": "Booking.com Score",
        "sublabel": "from 1,200+ reviews"
      }
    ],
    "contactHeading": "Ready to plan your Cape Town stay?",
    "testimonial": {
      "quote": "The rooftop pool at sunset with Table Mountain behind you. Nothing compares.",
      "author": "Sarah L., Verified Client",
      "rating": 5
    },
    "imageMood": "luxurious, airy, South African",
    "heroImageQuery": "luxury hotel room bed white linen city view window",
    "ogImageQuery": "luxury hotel room bed white linen city view",
    "aboutImageQuery": "hotel lobby interior modern reception desk marble",
    "galleryImageQueries": [
      "hotel room interior bed luxury pillows lamps",
      "hotel rooftop pool loungers city skyline view",
      "hotel restaurant dining table set fine dining",
      "hotel spa treatment room candles towels relaxation"
    ],
    "contactHours": "Check-in: 14:00 \u00b7 Check-out: 11:00 \u00b7 Front desk & concierge 24hrs"
  },
  "Clothing / Fashion Retail": {
    "heroEyebrow": "FASHION RETAIL CAPE TOWN",
    "heroAccent": "New season arrivals in store now",
    "tagline": "Style that speaks before you <em>do</em>",
    "heroSubtitle": "A curated collection of clothing, shoes, and accessories for people who care about how they show up in the world.",
    "ctaPrimary": "Shop Now",
    "ctaSecondary": "New Arrivals",
    "ctaNote": "Free shipping over R500 \u00b7 Easy returns within 14 days \u00b7 Gift wrapping available",
    "badge": "Cape Town Fashion Retailers Association",
    "servicesHeading": "What We Carry",
    "services": [
      {
        "name": "Tops & Blouses",
        "description": "Shirts, blouses, knits, and t-shirts from local and international designers — refreshed every season.",
        "tags": ["Women's", "Men's"],
        "serviceImageQuery": "folded colourful tops blouses stacked on table fashion retail store display"
      },
      {
        "name": "Bottoms & Skirts",
        "description": "Jeans, trousers, skirts, and shorts — tailored fits and relaxed cuts for every occasion.",
        "tags": ["Jeans", "Skirts"],
        "serviceImageQuery": "row of jeans denim trousers hanging on rack fashion retail store"
      },
      {
        "name": "Outerwear & Jackets",
        "description": "Coats, blazers, leather jackets, and layering pieces that carry you through every season.",
        "tags": ["Jackets", "Coats"],
        "serviceImageQuery": "leather jackets and blazers hanging on rail fashion store display warm lighting"
      },
      {
        "name": "Footwear & Accessories",
        "description": "Shoes, boots, bags, scarves, and jewellery — the finishing touches that complete every outfit.",
        "tags": ["Shoes", "Bags"],
        "serviceImageQuery": "women shoes boots and handbags displayed on shelves fashion retail store"
      }
    ],
    "galleryHeading": "In the Store",
    "aboutHeading": "Fashion with <em>intention</em>",
    "aboutText": "We opened this store because we believe clothing should make you feel something. Our rails are edited, not endless \u2014 every piece earned its place.\n\nWe work directly with designers and local labels. If it's on our floor, we chose it because we'd wear it ourselves.",
    "aboutMission": "We believe getting dressed should feel like an act of self-expression, not a chore.",
    "stats": [
      { "value": "11+", "label": "Years in Fashion", "sublabel": "since 2013" },
      { "value": "40+", "label": "Designers Stocked", "sublabel": "local & international" },
      { "value": "Monthly", "label": "New Arrivals", "sublabel": "seasonal collections" },
      { "value": "4.9\u2605", "label": "Google Rating", "sublabel": "from 400+ reviews" }
    ],
    "contactHeading": "Looking for something specific?",
    "testimonial": {
      "quote": "The styling advice alone is worth the visit. Left with a wardrobe I actually love.",
      "author": "Samantha K., Verified Client",
      "rating": 5
    },
    "imageMood": "stylish, warm, curated",
    "heroImageQuery": "woman browsing clothing rack boutique store warm lighting fashion retail interior",
    "ogImageQuery": "curated clothing rack dresses hanging boutique warm lighting",
    "aboutImageQuery": "fashion retail shop assistant styling mannequin warm interior display",
    "galleryImageQueries": [
      "women clothing store interior warm lighting racks organised dresses",
      "fashion accessories display handbags scarves jewellery shelf boutique",
      "fitting room mirror clothing store woman trying on dress",
      "clothing store window display mannequins styled outfits street view",
      "customer browsing denim jeans rack fashion retail store",
      "folded knitwear sweaters stacked shelves fashion retail display",
      "fashion retail store checkout counter shopping bags branded",
      "clothing store interior wide angle racks warm wooden floors"
    ],
    "features": [
      { "name": "Hand-Picked Curation", "description": "Every item on our rails is personally selected — we carry fewer pieces, but every single one earns its place. No filler, no fast fashion.", "imageQuery": "fashion buyer selecting garments from clothing rack curated boutique warm light" },
      { "name": "Complimentary Styling", "description": "Our in-store stylists work with you one-on-one to build outfits that suit your body, lifestyle, and budget — no appointment needed.", "imageQuery": "personal stylist helping woman choose outfit fitting room mirror clothing store" },
      { "name": "Alterations On-Site", "description": "Everything you buy can be tailored to fit perfectly. Our in-house seamstress ensures nothing leaves the store unless it looks like it was made for you.", "imageQuery": "seamstress pinning hem dress alteration sewing clothing store" }
    ],
    "contactHours": "Mon\u2013Fri: 09:00\u201318:00 \u00b7 Sat: 09:00\u201316:00 \u00b7 Sun: 10:00\u201314:00"
  },
  "Food & Grocery Retail": {
    "heroEyebrow": "FRESH GROCERY CAPE TOWN",
    "heroAccent": "Farm-fresh daily. Local first.",
    "tagline": "Groceries chosen with the same care you'd <em>choose</em> yourself",
    "heroSubtitle": "Fresh produce, artisan goods, and everyday essentials from local farms and trusted suppliers \u2014 no compromise on quality.",
    "ctaPrimary": "Shop Online",
    "ctaSecondary": "Visit Us",
    "ctaNote": "Same-day delivery available \u00b7 Fresh produce daily \u00b7 Loyalty rewards",
    "badge": "Cape Town Fresh Produce Market Member",
    "servicesHeading": "What We Stock",
    "services": [
      {
        "name": "Fresh Produce & Dairy",
        "description": "Locally sourced fruit, vegetables, free-range eggs, and artisan dairy delivered fresh every morning.",
        "tags": ["Fresh Produce", "Dairy"],
        "serviceImageQuery": "fresh produce fruit vegetables colourful display crates grocery store"
      },
      {
        "name": "Artisan & Specialty Goods",
        "description": "Craft breads, local honey, preserves, coffee, and specialty foods you won't find in chain stores.",
        "tags": ["Artisan", "Specialty"],
        "serviceImageQuery": "artisan bread loaves honey jars preserves specialty food shelf grocery"
      },
      {
        "name": "Everyday Essentials",
        "description": "Pantry staples, household goods, and everyday groceries at fair prices with no membership needed.",
        "tags": ["Pantry", "Household"],
        "serviceImageQuery": "pantry staples pasta rice canned goods organised grocery shelf"
      },
      {
        "name": "Online Ordering & Delivery",
        "description": "Order your weekly shop online and we deliver same-day — packed by the same team who stock the shelves.",
        "tags": [
          "Online Orders",
          "Same-Day Delivery"
        ],
        "serviceImageQuery": "online grocery order packed brown bags ready collection counter"
      }
    ],
    "galleryHeading": "Fresh from the Shelves",
    "aboutHeading": "Groceries done <em>properly</em>",
    "aboutText": "We started because our neighbourhood deserved a grocery store that actually cares about what it sells. Our produce comes from farms we've visited. Our suppliers are people we know by name.\n\nWe're not a supermarket \u2014 we're a grocery shop that treats food with the respect it deserves.",
    "aboutMission": "We believe fresh, honest food should be available to everyone \u2014 not just at farmers' markets on Saturdays.",
    "stats": [
      { "value": "8+", "label": "Years Trading", "sublabel": "since 2016" },
      { "value": "30+", "label": "Local Suppliers", "sublabel": "Western Cape farms" },
      { "value": "Daily", "label": "Fresh Deliveries", "sublabel": "produce & dairy" },
      { "value": "4.8\u2605", "label": "Google Rating", "sublabel": "from 350+ reviews" }
    ],
    "contactHeading": "Want to order for delivery?",
    "testimonial": {
      "quote": "The freshest tomatoes in Cape Town. Haven't bought produce from a chain since I found this place.",
      "author": "Karen P., Verified Client",
      "rating": 5
    },
    "imageMood": "fresh, natural, inviting",
    "heroImageQuery": "fresh produce fruit vegetables colourful display independent grocery store warm lighting",
    "ogImageQuery": "fresh fruit vegetables stacked crates grocery store display",
    "aboutImageQuery": "grocer in apron arranging fresh tomatoes produce shelf local store",
    "galleryImageQueries": [
      "grocery store interior aisles stocked shelves warm lighting",
      "fresh vegetables crates wooden display tomatoes peppers carrots market",
      "artisan deli counter meats cheeses olives grocery store glass case",
      "bakery section fresh bread loaves rolls crusty grocery display",
      "local honey jars preserves artisan products shelf grocery",
      "free range eggs dairy milk bottles displayed grocery refrigerator",
      "grocery store exterior storefront awning fresh produce street",
      "woman shopping selecting fresh fruit oranges apples grocery store"
    ],
    "features": [
      { "name": "Farm-Direct Freshness", "description": "We source produce directly from local farms and deliver it to our shelves the same morning. If it’s not fresh, it’s not on the floor.", "imageQuery": "farmer unloading fresh vegetable crates delivery morning grocery store" },
      { "name": "Every Item Quality-Checked", "description": "Our buyers personally taste-test and approve every product we stock. If we wouldn’t eat it ourselves, we don’t sell it to you.", "imageQuery": "grocer inspecting quality fresh produce tomatoes hands close up" },
      { "name": "Community-First Pricing", "description": "We keep our margins fair because we’d rather have loyal neighbours than one-time customers. Weekly specials that actually save you money.", "imageQuery": "family shopping fresh produce grocery store aisle pushing cart smiling" }
    ],
    "contactHours": "Mon\u2013Sat: 07:00\u201319:00 \u00b7 Sun: 08:00\u201315:00 \u00b7 Delivery Mon\u2013Sat"
  },
  "General Retail Store": {
    "heroEyebrow": "CAPE TOWN INDEPENDENT RETAIL",
    "heroAccent": "Curated with care, not algorithms",
    "tagline": "Shopping the way it was <em>meant</em> to be",
    "heroSubtitle": "A thoughtfully curated selection of products you won't find in a mall \u2014 plus people who actually know the stock.",
    "ctaPrimary": "Shop Now",
    "ctaSecondary": "Visit the Store",
    "ctaNote": "Free shipping over R500 \u00b7 Easy returns \u00b7 Gift wrapping available",
    "badge": "Cape Town Independent Retailers Association",
    "servicesHeading": "What We Carry",
    "services": [
      {
        "name": "In-Store Shopping",
        "description": "Browse our curated floor personally and get genuine recommendations from our team.",
        "tags": ["In-Store", "Expert Advice"],
        "serviceImageQuery": "curated retail products displayed wooden shelves homeware candles store warm"
      },
      {
        "name": "Online Store",
        "description": "Shop our full range online with fast dispatch and free delivery on orders over R500.",
        "tags": ["Online", "Fast Delivery"],
        "serviceImageQuery": "online shop products packaged boxes ready dispatch retail"
      },
      {
        "name": "Gift Wrapping & Cards",
        "description": "Complimentary gift wrapping and personalised cards on any in-store or online purchase.",
        "tags": ["Gift Wrap", "Personalised"],
        "serviceImageQuery": "gift wrapping ribbon tissue paper hands counter retail store"
      },
      {
        "name": "Loyalty Programme",
        "description": "Earn points on every purchase and unlock exclusive discounts, early access, and birthday treats.",
        "tags": [
          "Loyalty",
          "Rewards"
        ],
        "serviceImageQuery": "customer at retail counter branded shopping bags loyalty card purchase"
      }
    ],
    "galleryHeading": "In the Shop",
    "aboutHeading": "Retail with a <em>soul</em>",
    "aboutText": "We opened because we were tired of shopping in spaces that felt like warehouses. Our store is small by design \u2014 we'd rather stock 200 things we love than 2,000 things we don't.\n\nEvery product on our shelves was chosen for a reason. Ask us about any of them.",
    "aboutMission": "We believe the best retail experience is one where you leave with something that genuinely excites you.",
    "stats": [
      { "value": "9+", "label": "Years Trading", "sublabel": "since 2015" },
      { "value": "500+", "label": "Products Stocked", "sublabel": "curated & rotating" },
      { "value": "80+", "label": "Local Suppliers", "sublabel": "SA-made where possible" },
      { "value": "4.8\u2605", "label": "Google Rating", "sublabel": "from 300+ reviews" }
    ],
    "contactHeading": "Looking for something specific?",
    "testimonial": {
      "quote": "The staff actually know their products. It's a genuinely lovely place to shop.",
      "author": "Deborah M., Verified Client",
      "rating": 5
    },
    "imageMood": "warm, curated, inviting",
    "heroImageQuery": "independent retail shop interior curated products shelves warm lighting wooden display",
    "ogImageQuery": "curated retail store shelves products homeware warm interior",
    "aboutImageQuery": "shop owner arranging curated products display table independent store warm light",
    "galleryImageQueries": [
      "independent retail store interior shelves curated products warm wood",
      "gift wrapping station ribbon tissue paper retail counter hands",
      "retail store window display storefront charming street view awning",
      "curated homeware ceramics candles products displayed wooden shelf",
      "customer browsing products shelves independent retail store",
      "branded shopping bags retail counter purchase packaging",
      "retail store interior wide angle warm lighting products organised",
      "shop assistant recommending product to smiling customer retail store"
    ],
    "features": [
      { "name": "Genuinely Independent", "description": "We’re not a franchise and we don’t answer to a head office. Every product on our shelves was chosen by us, for our community.", "imageQuery": "independent shop owner standing proudly inside curated retail store" },
      { "name": "Staff Who Actually Know the Stock", "description": "Ask our team about any product and they’ll give you an honest answer. We train everyone to advise, not just ring up sales.", "imageQuery": "retail shop assistant helping customer select product from shelf advice" },
      { "name": "Hassle-Free Returns", "description": "Changed your mind? Bring it back. Our return policy is simple and fair because we’d rather keep your trust than keep your money.", "imageQuery": "friendly customer service exchange retail counter shopping bag" }
    ],
    "contactHours": "Mon\u2013Fri: 09:00\u201318:00 \u00b7 Sat: 09:00\u201315:00 \u00b7 Sun: 10:00\u201314:00"
  },
  "Boutique / Fashion Store": {
    "heroEyebrow": "INDEPENDENT FASHION CAPE TOWN",
    "heroAccent": "Designer pieces, not department store rails",
    "tagline": "Dress like you mean <em>it</em>",
    "heroSubtitle": "Independent and local designer clothing, accessories, and limited pieces for people who care about what they wear.",
    "ctaPrimary": "Shop the Edit",
    "ctaSecondary": "New In",
    "ctaNote": "Free shipping over R700 \u00b7 Easy exchanges \u00b7 Styling advice always",
    "badge": "SA Fashion Week Participating Retailer",
    "servicesHeading": "The Collection",
    "services": [
      {
        "name": "Women's & Men's Edit",
        "description": "Seasonally refreshed clothing curated from South African and international independent designers.",
        "tags": [
          "Local Designers",
          "Limited Pieces"
        ],
        "serviceImageQuery": "designer dresses hanging curated clothing rack boutique warm elegant lighting"
      },
      {
        "name": "Accessories & Jewellery",
        "description": "Curated bags, scarves, jewellery, and finishing pieces that complete any outfit.",
        "tags": [
          "Accessories",
          "Jewellery"
        ],
        "serviceImageQuery": "designer leather handbags gold jewellery necklaces displayed boutique glass shelf"
      },
      {
        "name": "Personal Styling",
        "description": "Book a one-on-one styling session to refresh your wardrobe with a professional eye.",
        "tags": [
          "Personal Styling",
          "Wardrobe Edit"
        ],
        "serviceImageQuery": "woman having personal styling consultation boutique fashion store mirror outfit"
      },
      {
        "name": "Trunk Shows & Pop-Ups",
        "description": "Seasonal trunk shows featuring guest designers and exclusive limited-edition capsule collections.",
        "tags": [
          "Trunk Shows",
          "Limited Edition"
        ],
        "serviceImageQuery": "fashion trunk show pop up event designer clothing displayed boutique guests"
      }
    ],
    "galleryHeading": "The Current Edit",
    "aboutHeading": "Fashion with <em>intention</em>",
    "aboutText": "We started this boutique with a simple idea: stock only what we'd wear ourselves. That means independent designers, thoughtful fabrics, and pieces that work harder than trends.\n\nWe buy small and restock often. If you see something you love, don't wait.",
    "aboutMission": "We believe getting dressed should feel like a creative act, not a chore.",
    "stats": [
      {
        "value": "11+",
        "label": "Years in Fashion",
        "sublabel": "since 2013"
      },
      {
        "value": "40+",
        "label": "Designers Stocked",
        "sublabel": "70% South African"
      },
      {
        "value": "300+",
        "label": "New Pieces Monthly",
        "sublabel": "rotating constantly"
      },
      {
        "value": "4.9\u2605",
        "label": "Google Rating",
        "sublabel": "from 400+ reviews"
      }
    ],
    "contactHeading": "Want to book a styling session?",
    "testimonial": {
      "quote": "Every single piece in this store is gorgeous. The curation is genuinely exceptional.",
      "author": "Casey N., Verified Client",
      "rating": 5
    },
    "imageMood": "elegant, minimal, editorial",
    "heroImageQuery": "elegant boutique interior clothing rack designer dresses minimal warm lighting hangers",
    "ogImageQuery": "boutique fashion store interior designer clothing rack elegant minimal",
    "aboutImageQuery": "boutique owner styling dress on mannequin elegant store interior",
    "galleryImageQueries": [
      "boutique interior minimal designer dresses hanging rack warm lighting",
      "designer leather handbags displayed glass shelf boutique store luxury",
      "woman trying on dress boutique fitting room mirror elegant curtain",
      "boutique storefront window display mannequin styled outfit evening",
      "silk scarves jewellery accessories displayed velvet tray boutique",
      "woman browsing designer clothing rack boutique store elegant interior",
      "boutique checkout counter tissue paper shopping bag branded luxury",
      "close up designer dress fabric texture hanger boutique rail"
    ],
    "features": [
      { "name": "Ruthless Edit", "description": "We stock fewer labels than a department store on purpose. Every designer on our rails was chosen because their work is exceptional — not because they paid for shelf space.", "imageQuery": "minimalist boutique interior carefully selected designer garments spaced rack" },
      { "name": "Private Styling Appointments", "description": "Book the store to yourself for an hour. Our stylists pull looks based on your body, colouring, and lifestyle — no upselling, just honest advice.", "imageQuery": "personal stylist selecting outfit for woman boutique private appointment" },
      { "name": "Pieces That Last", "description": "We prioritise quality fabrics and timeless cuts over trends. Most of what we carry will look just as good in five years as it does today.", "imageQuery": "luxury fabric cashmere wool clothing detail quality stitching close up" }
    ],
    "contactHours": "Mon\u2013Fri: 09:30\u201318:00 \u00b7 Sat: 09:00\u201315:00 \u00b7 Sun: 10:00\u201314:00"
  },
  "Florist": {
    "heroEyebrow": "CAPE TOWN FLORAL DESIGN",
    "heroAccent": "Fresh from the Joostenberg market weekly",
    "tagline": "Flowers arranged with genuine <em>artistry</em>",
    "heroSubtitle": "Seasonal blooms, hand-tied bouquets, and floral installations designed to stop people in their tracks.",
    "ctaPrimary": "Order Flowers",
    "ctaSecondary": "Weddings & Events",
    "ctaNote": "Same-day delivery available \u00b7 Subscriptions from R350/month",
    "badge": "South African Flower Union Member",
    "servicesHeading": "What We Create",
    "services": [
      {
        "name": "Fresh Bouquets & Arrangements",
        "description": "Hand-tied seasonal arrangements in your chosen palette \u2014 available same-day or to order.",
        "tags": [
          "Same-Day",
          "Hand-Tied"
        ],
        "serviceImageQuery": "hand tied fresh flower bouquet roses wrapped paper florist hands ribbon"
      },
      {
        "name": "Wedding & Event Florals",
        "description": "Full floral design for weddings, events, and corporate installations from brief to breakdown.",
        "tags": [
          "Wedding Flowers",
          "Event Design"
        ],
        "serviceImageQuery": "wedding bridal bouquet white roses greenery ceremony arch flowers"
      },
      {
        "name": "Weekly Flower Subscriptions",
        "description": "Seasonal blooms delivered to your home or office every week, styled in a signature vase.",
        "tags": [
          "Subscription",
          "Weekly Delivery"
        ],
        "serviceImageQuery": "weekly flower subscription arrangement vase fresh blooms home table"
      },
      {
        "name": "Dried & Preserved Florals",
        "description": "Long-lasting dried and preserved arrangements that hold their beauty for months without water.",
        "tags": [
          "Dried Flowers",
          "Preserved"
        ],
        "serviceImageQuery": "dried preserved flower arrangement pampas grass eucalyptus vase neutral tones"
      }
    ],
    "galleryHeading": "In Bloom",
    "aboutHeading": "Every arrangement, a small <em>masterpiece</em>",
    "aboutText": "We've been arranging flowers in Cape Town for over a decade, and we're still as obsessed with a perfect bloom as we were at the start. We source from local growers and the Joostenberg market, always following what's freshest.\n\nNo two arrangements are ever quite the same \u2014 the seasons make sure of that.",
    "aboutMission": "We believe flowers shouldn't just look beautiful \u2014 they should feel like they were made for that exact room.",
    "stats": [
      {
        "value": "12+",
        "label": "Years Arranging",
        "sublabel": "since 2012"
      },
      {
        "value": "200+",
        "label": "Weddings Floral'd",
        "sublabel": "since opening"
      },
      {
        "value": "80+",
        "label": "Subscription Clients",
        "sublabel": "weekly deliveries"
      },
      {
        "value": "4.9\u2605",
        "label": "Google Rating",
        "sublabel": "from 350+ reviews"
      }
    ],
    "contactHeading": "Planning a wedding or event?",
    "testimonial": {
      "quote": "They transformed our venue beyond anything I imagined. Every guest commented.",
      "author": "Nadine B., Verified Client",
      "rating": 5
    },
    "imageMood": "lush, romantic, botanical",
    "heroImageQuery": "florist shop interior colourful fresh flower buckets roses peonies tulips display warm lighting",
    "ogImageQuery": "hand tied flower bouquet roses eucalyptus wrapped kraft paper florist",
    "aboutImageQuery": "florist hands arranging fresh flower bouquet ribbon cutting table workshop",
    "galleryImageQueries": [
      "florist shop interior buckets fresh flowers roses colourful display",
      "bridal wedding bouquet white roses greenery ribbon soft light",
      "flower arrangement centrepiece vase dinner table elegant",
      "dried flower bouquet preserved pampas grass kraft paper wrap",
      "florist delivering wrapped bouquet to customer front door smiling",
      "colourful peony roses tulips close up fresh petals detail",
      "florist studio workbench ribbons secateurs stems flowers preparation",
      "flower subscription box weekly delivery arrangement vase home"
    ],
    "features": [
      { "name": "Seasonal, Never Forced", "description": "We only work with what’s blooming right now. That means every arrangement is genuinely fresh, naturally vibrant, and impossible to replicate.", "imageQuery": "seasonal fresh flowers bucket morning flower market colourful roses peonies" },
      { "name": "Same-Day Delivery You Can Trust", "description": "Order before noon and we’ll hand-deliver across Cape Town the same day. Every bouquet arrives exactly as it left our studio.", "imageQuery": "florist delivering fresh bouquet wrapped flowers to front door residential home" },
      { "name": "Wedding Specialists", "description": "We’ve designed flowers for over 200 weddings. From intimate elopements to grand receptions, we handle every stem from concept to cleanup.", "imageQuery": "wedding reception table flowers centrepiece roses candles elegant venue" }
    ],
    "contactHours": "Mon\u2013Fri: 08:00\u201317:00 \u00b7 Sat: 08:00\u201314:00 \u00b7 Sun: By appointment"
  },
  "Gift Shop": {
    "heroEyebrow": "GIFTS WORTH GIVING",
    "heroAccent": "Sourced from South African makers",
    "tagline": "Find the gift they'll actually <em>remember</em>",
    "heroSubtitle": "Thoughtfully curated gifts, locally made homeware, and personalised touches that make any occasion special.",
    "ctaPrimary": "Shop Gifts",
    "ctaSecondary": "Custom Orders",
    "ctaNote": "Gift wrapping included \u00b7 Same-day dispatch available",
    "badge": "Made in SA Stockist",
    "servicesHeading": "What We Offer",
    "services": [
      {
        "name": "Curated Gift Range",
        "description": "A lovingly curated selection of SA-made ceramics, candles, books, and lifestyle gifts.",
        "tags": [
          "SA-Made",
          "Curated"
        ],
        "serviceImageQuery": "curated gift shop shelves ceramics candles homeware lifestyle products warm"
      },
      {
        "name": "Custom Gift Boxes",
        "description": "Build a personalised gift box with your chosen products, branded or wrapped to order.",
        "tags": [
          "Gift Boxes",
          "Personalised"
        ],
        "serviceImageQuery": "custom gift box products arranged ribbon tissue paper branded packaging"
      },
      {
        "name": "Corporate Gifting",
        "description": "Bulk corporate gift orders with branded packaging, personalised notes, and delivery.",
        "tags": [
          "Corporate Gifts",
          "Bulk Orders"
        ],
        "serviceImageQuery": "corporate gift hampers branded packaging bulk order boxes stacked"
      },
      {
        "name": "Kids & Baby Gifts",
        "description": "Beautifully made toys, blankets, and keepsakes for new arrivals and little ones.",
        "tags": [
          "Baby Gifts",
          "Kids"
        ],
        "serviceImageQuery": "baby gift set soft blanket wooden toy rattle wrapped box"
      }
    ],
    "galleryHeading": "Worth Giving",
    "aboutHeading": "Gifts chosen with <em>care</em>",
    "aboutText": "We started this shop because we believe a gift should tell the recipient something \u2014 that you thought about them, found something meaningful, and chose it specifically. That's harder than it sounds.\n\nWe do the hard work for you. Every product in the shop was selected because it's genuinely brilliant.",
    "aboutMission": "We believe the right gift can say everything words can't.",
    "stats": [
      {
        "value": "7+",
        "label": "Years Gifting",
        "sublabel": "since 2017"
      },
      {
        "value": "400+",
        "label": "Products In-Store",
        "sublabel": "80% South African"
      },
      {
        "value": "1,200+",
        "label": "Gift Boxes Created",
        "sublabel": "custom & corporate"
      },
      {
        "value": "4.9\u2605",
        "label": "Google Rating",
        "sublabel": "from 280+ reviews"
      }
    ],
    "contactHeading": "Need help finding the perfect gift?",
    "testimonial": {
      "quote": "They helped me find the perfect anniversary gift in under 10 minutes. Absolute lifesavers.",
      "author": "Gareth P., Verified Client",
      "rating": 5
    },
    "imageMood": "warm, curated, celebratory",
    "heroImageQuery": "gift shop interior shelves scented candles ceramics mugs homeware curated warm display",
    "ogImageQuery": "curated gift shop interior candles homeware ceramics warm shelves",
    "aboutImageQuery": "hands wrapping gift box ribbon tissue paper gift shop counter",
    "galleryImageQueries": [
      "gift shop shelves candles ceramics handmade products warm display",
      "greeting cards display rack stationery colourful gift shop",
      "gift wrapping station ribbon bows tissue paper hands counter",
      "handmade pottery ceramics mugs display shelf gift shop",
      "curated gift hamper basket products wrapped ribbon bow",
      "scented candles jars displayed wooden shelf warm lighting gift",
      "baby gifts blanket soft toy wooden rattle gift shop display",
      "customer browsing gift shop shelves selecting present smiling"
    ],
    "features": [
      { "name": "Locally Sourced, Always", "description": "Over 80% of our products are made by South African artisans and small makers. When you buy here, you’re supporting real people, not factories.", "imageQuery": "handmade artisan ceramics candles products displayed local craft market stall" },
      { "name": "Gift Wrapping Included", "description": "Every purchase is wrapped beautifully at no extra charge. Walk out with something that’s ready to give — no last-minute scramble for paper and ribbon.", "imageQuery": "hands wrapping gift box elegant ribbon bow tissue paper close up" },
      { "name": "We’ll Help You Choose", "description": "Not sure what to get? Tell us who it’s for and we’ll suggest three perfect options. Our staff are genuinely great at this.", "imageQuery": "shop assistant helping customer choose gift from curated shelf display" }
    ],
    "contactHours": "Mon\u2013Fri: 09:00\u201318:00 \u00b7 Sat: 09:00\u201315:00 \u00b7 Sun: 10:00\u201314:00"
  },
  "Jeweller": {
    "heroEyebrow": "FINE JEWELLERY CAPE TOWN",
    "heroAccent": "Ethically sourced stones, handcrafted settings",
    "tagline": "Jewellery made to be worn <em>forever</em>",
    "heroSubtitle": "Bespoke engagement rings, heirloom commissions, and fine jewellery crafted by hand in our Cape Town studio.",
    "ctaPrimary": "Book a Consultation",
    "ctaSecondary": "View Collection",
    "ctaNote": "Free consultation \u00b7 Payment plans available \u00b7 Lifetime cleaning included",
    "badge": "Jewellery Council of South Africa Member",
    "servicesHeading": "Our Craft",
    "services": [
      {
        "name": "Bespoke Engagement Rings",
        "description": "Custom engagement rings designed with you, from stone selection to final setting \u2014 your vision, our hands.",
        "tags": [
          "Bespoke",
          "Engagement"
        ],
        "serviceImageQuery": "diamond engagement ring solitaire gold setting close up velvet cushion"
      },
      {
        "name": "Fine Jewellery Collection",
        "description": "Ready-to-wear and made-to-order pieces in gold, silver, and platinum with ethically sourced stones.",
        "tags": [
          "Fine Jewellery",
          "Ethical Stones"
        ],
        "serviceImageQuery": "fine jewellery collection gold necklaces bracelets rings display case velvet"
      },
      {
        "name": "Repairs & Remodelling",
        "description": "Restore inherited pieces or transform old jewellery into something new and wearable.",
        "tags": [
          "Repairs",
          "Heirloom Reset"
        ],
        "serviceImageQuery": "jeweller repairing gold ring polishing workbench tools magnifier"
      },
      {
        "name": "Engraving & Personalisation",
        "description": "Custom engraving on rings, pendants, and watches — dates, initials, or a message that matters.",
        "tags": [
          "Engraving",
          "Personalised"
        ],
        "serviceImageQuery": "engraved wedding ring inscription inside band close up jewellery personalised"
      }
    ],
    "galleryHeading": "From the Bench",
    "aboutHeading": "Jewellery as a <em>legacy</em>",
    "aboutText": "We have been making jewellery by hand in Cape Town for over two decades. Every piece that leaves our bench is made by a qualified goldsmith with skills passed down through apprenticeship \u2014 no shortcuts, no shortcuts.\n\nWe source our diamonds through the Kimberley Process and use only conflict-free stones. What you wear should feel good in every sense.",
    "aboutMission": "We believe the pieces you wear closest to your skin should be made with the utmost integrity.",
    "stats": [
      {
        "value": "22+",
        "label": "Years at the Bench",
        "sublabel": "since 2002"
      },
      {
        "value": "800+",
        "label": "Bespoke Pieces",
        "sublabel": "designed & crafted"
      },
      {
        "value": "300+",
        "label": "Engagement Rings",
        "sublabel": "and counting"
      },
      {
        "value": "4.9\u2605",
        "label": "Google Rating",
        "sublabel": "from 500+ reviews"
      }
    ],
    "contactHeading": "Ready to design something special?",
    "testimonial": {
      "quote": "She cried when she saw the ring. They took my sketches and made magic.",
      "author": "Michael A., Verified Client",
      "rating": 5
    },
    "imageMood": "luxurious, intimate, precise",
    "heroImageQuery": "fine jewellery display case diamond rings gold necklaces velvet tray warm spotlight",
    "ogImageQuery": "diamond engagement ring velvet box jewellery display elegant",
    "aboutImageQuery": "jeweller goldsmith hands crafting ring workbench magnifier loupe close up",
    "galleryImageQueries": [
      "jewellery store glass display case rings necklaces gold silver spotlight",
      "diamond engagement ring close up velvet cushion box elegant",
      "gold necklace pendant chain displayed velvet stand jewellery",
      "jeweller goldsmith workshop bench tools loupe lamp crafting",
      "woman trying on diamond ring jewellery store counter consultation",
      "loose gemstones diamonds sapphires displayed velvet tray inspection",
      "engraved wedding bands gold platinum close up jewellery",
      "jewellery store interior elegant display cases warm lighting"
    ],
    "features": [
      { "name": "Handcrafted In-House", "description": "Every piece is made by our goldsmiths in our Cape Town workshop. You can watch your ring being crafted — there’s no middleman and no mass production.", "imageQuery": "goldsmith hands crafting gold ring workbench tools flame close up" },
      { "name": "Ethically Sourced Stones", "description": "We trace every diamond and gemstone back to its origin. Conflict-free sourcing isn’t a marketing claim for us — it’s a non-negotiable.", "imageQuery": "loose diamonds gemstones sorted velvet tray jeweller loupe inspection" },
      { "name": "Lifetime Care Guarantee", "description": "Every piece includes complimentary cleaning, inspection, and minor repairs for life. We build relationships, not just jewellery.", "imageQuery": "jeweller polishing gold ring buffing wheel professional service" }
    ],
    "contactHours": "Mon\u2013Fri: 09:00\u201317:30 \u00b7 Sat: 09:00\u201313:00 \u00b7 Consultations by appointment"
  },
  "Furniture Store": {
    "heroEyebrow": "CONTEMPORARY FURNITURE CAPE TOWN",
    "heroAccent": "Solid wood. Lifetime guarantee.",
    "tagline": "Furniture that <em>outlasts</em> the trends",
    "heroSubtitle": "Locally crafted and curated contemporary furniture for living rooms, dining rooms, and bedrooms that feel like home.",
    "ctaPrimary": "Visit the Showroom",
    "ctaSecondary": "Shop Online",
    "ctaNote": "Free home delivery in Cape Town \u00b7 Custom sizes available",
    "badge": "SABS Standards Compliant",
    "servicesHeading": "What We Make",
    "services": [
      {
        "name": "Living & Dining Furniture",
        "description": "Sofas, dining tables, sideboards, and shelving crafted in solid wood and premium upholstery.",
        "tags": [
          "Solid Wood",
          "Handcrafted"
        ],
        "serviceImageQuery": "modern living room sofa armchair coffee table styled furniture showroom warm"
      },
      {
        "name": "Custom Orders",
        "description": "Bespoke furniture made to your dimensions, timber choice, and finish \u2014 designed in our workshop.",
        "tags": [
          "Custom",
          "Bespoke"
        ],
        "serviceImageQuery": "carpenter craftsman measuring wood custom furniture workshop bespoke"
      },
      {
        "name": "Interior Styling",
        "description": "Our in-house stylists help you select and arrange pieces that work for your specific space.",
        "tags": [
          "Styling",
          "Space Planning"
        ],
        "serviceImageQuery": "interior styled living room armchair lamp side table rug warm decor"
      },
      {
        "name": "Delivery & Assembly",
        "description": "White-glove delivery and assembly in your home — we place it exactly where you want it.",
        "tags": [
          "White-Glove",
          "Assembly"
        ],
        "serviceImageQuery": "furniture delivery men carrying wrapped sofa through front door home"
      }
    ],
    "galleryHeading": "In the Showroom",
    "aboutHeading": "Built to last a <em>lifetime</em>",
    "aboutText": "We make furniture in Cape Town using solid local timbers \u2014 kiaat, ash, and oak from sustainable sources. Every piece is assembled by hand in our workshop in Paarden Eiland and delivered directly to you.\n\nWe don't do flat-pack. We don't do MDF. We do furniture that your grandchildren will argue over who inherits.",
    "aboutMission": "We believe a piece of well-made furniture is one of the most satisfying purchases a person can make.",
    "stats": [
      {
        "value": "16+",
        "label": "Years Making",
        "sublabel": "since 2008"
      },
      {
        "value": "3,000+",
        "label": "Pieces Crafted",
        "sublabel": "since opening"
      },
      {
        "value": "15",
        "label": "Craftsmen",
        "sublabel": "in our workshop"
      },
      {
        "value": "Lifetime",
        "label": "Structural Guarantee",
        "sublabel": "on all custom pieces"
      }
    ],
    "contactHeading": "Want to visit the showroom or workshop?",
    "testimonial": {
      "quote": "The dining table is the most beautiful piece of furniture I've ever owned. Worth every cent.",
      "author": "Avery V., Verified Client",
      "rating": 5
    },
    "imageMood": "warm, natural, crafted",
    "heroImageQuery": "modern furniture showroom living room sofa dining table chairs warm lighting display",
    "ogImageQuery": "furniture showroom interior contemporary sofa dining table styled",
    "aboutImageQuery": "carpenter craftsman sanding solid wood dining table workshop sawdust",
    "galleryImageQueries": [
      "furniture showroom living room sofa coffee table rug styled warm",
      "solid wood dining table chairs set showroom overhead pendant light",
      "bedroom furniture wooden bed frame headboard side tables lamp",
      "outdoor patio furniture teak table chairs garden setting",
      "bookshelf sideboard solid wood furniture showroom display",
      "carpenter workshop wood shavings tools crafting furniture",
      "upholstered armchair fabric sofa cushions showroom detail",
      "furniture showroom interior wide angle contemporary styled rooms"
    ],
    "features": [
      { "name": "Solid Wood, No Chipboard", "description": "Every timber piece in our range is made from kiln-dried solid hardwood. We don’t sell veneered particleboard disguised as real furniture.", "imageQuery": "solid hardwood furniture grain texture close up quality craftsmanship detail" },
      { "name": "Lifetime Structural Guarantee", "description": "We guarantee the structural integrity of every piece we sell. If a joint fails, we’ll repair or replace it — no questions, no time limit.", "imageQuery": "carpenter inspecting dovetail joint solid wood furniture workshop" },
      { "name": "Custom Sizes Available", "description": "Need a dining table for an awkward space? We’ll build it to your exact dimensions. Custom orders delivered in 6–8 weeks.", "imageQuery": "craftsman measuring solid wood plank workshop custom furniture building" }
    ],
    "contactHours": "Mon\u2013Fri: 09:00\u201317:30 \u00b7 Sat: 09:00\u201314:00 \u00b7 Sun: By appointment"
  },
  "Hardware Store": {
    "heroEyebrow": "CAPE TOWN HARDWARE & TOOLS",
    "heroAccent": "Stocking 15,000+ lines since 1998",
    "tagline": "Everything you need to get the job <em>done</em>",
    "heroSubtitle": "Power tools, fixings, paint, plumbing supplies, and expert advice from staff who've used everything they sell.",
    "ctaPrimary": "Shop Online",
    "ctaSecondary": "Find In-Store",
    "ctaNote": "Same-day dispatch \u00b7 Trade accounts welcome \u00b7 Delivery available",
    "badge": "Builders Warehouse Authorised Stockist",
    "servicesHeading": "What We Stock",
    "services": [
      {
        "name": "Power Tools & Hand Tools",
        "description": "Professional and DIY tools from Bosch, Makita, DeWalt, and Stanley \u2014 with expert selection advice.",
        "tags": [
          "Power Tools",
          "Professional Grade"
        ],
        "serviceImageQuery": "power tools cordless drill impact driver display shelf hardware store"
      },
      {
        "name": "Fixings, Paint & Materials",
        "description": "Screws, bolts, paints, adhesives, and building materials stocked in depth for trade and retail.",
        "tags": [
          "Fixings",
          "Paint Range"
        ],
        "serviceImageQuery": "paint cans colour swatches mixing machine hardware store counter"
      },
      {
        "name": "Trade Accounts & Delivery",
        "description": "Open a trade account for invoiced orders, credit terms, and priority delivery to site.",
        "tags": [
          "Trade Accounts",
          "Delivery"
        ],
        "serviceImageQuery": "trade delivery van loading building materials timber hardware store"
      },
      {
        "name": "Key Cutting & Gas Refills",
        "description": "While-you-wait key cutting, gas bottle exchanges, and number plate making at the counter.",
        "tags": [
          "Key Cutting",
          "Gas Refills"
        ],
        "serviceImageQuery": "key cutting machine brass keys close up hardware store counter service"
      }
    ],
    "galleryHeading": "In the Store",
    "aboutHeading": "Your trade partner, <em>always</em>",
    "aboutText": "We opened our doors in 1998 and we've been supplying Cape Town's builders, plumbers, and weekend DIYers ever since. Our staff include qualified tradespeople \u2014 they don't just sell the drill, they know which bit you need.\n\nWe stock deep, not wide. If it's on our shelves, it's the right product for the job.",
    "aboutMission": "We believe a great hardware store is like a great tool \u2014 reliable, precise, and there when you need it.",
    "stats": [
      {
        "value": "26+",
        "label": "Years Trading",
        "sublabel": "since 1998"
      },
      {
        "value": "15,000+",
        "label": "Lines Stocked",
        "sublabel": "in-store & online"
      },
      {
        "value": "500+",
        "label": "Trade Accounts",
        "sublabel": "active in Cape Town"
      },
      {
        "value": "4.7\u2605",
        "label": "Google Rating",
        "sublabel": "from 600+ reviews"
      }
    ],
    "contactHeading": "Need advice or a trade account?",
    "testimonial": {
      "quote": "Only hardware store where the staff actually solve your problem before you leave.",
      "author": "Brett H., Verified Client",
      "rating": 5
    },
    "imageMood": "industrial, practical, reliable",
    "heroImageQuery": "hardware store interior aisles shelves power tools drills organised pegboard display",
    "ogImageQuery": "hardware store shelves tools drills organised display aisle",
    "aboutImageQuery": "hardware store aisle power tools pegboard organised shelves wide angle",
    "galleryImageQueries": [
      "hardware store shelves power tools drills impact drivers saws display",
      "paint cans colour swatches mixing station hardware store counter",
      "plumbing fittings copper pipes valves shelf hardware store",
      "nuts bolts screws nails organised small bins drawers hardware",
      "garden tools shovels rakes display outdoor hardware section",
      "electrical supplies cable wire switches hardware store shelf",
      "hardware store counter staff serving customer tools advice",
      "hardware store exterior storefront signage entrance"
    ],
    "features": [
      { "name": "Staff Who’ve Done the Job", "description": "Our counter staff are ex-tradespeople. They don’t just point you to an aisle — they’ll tell you exactly what you need and how to use it.", "imageQuery": "hardware store staff advising customer at counter showing tools expert" },
      { "name": "15,000+ Lines in Stock", "description": "If we don’t have it on the shelf, it probably doesn’t exist. We carry the widest range in the area so you never have to make two trips.", "imageQuery": "hardware store fully stocked shelves tools supplies aisle deep perspective" },
      { "name": "Trade Accounts Welcome", "description": "Builders, plumbers, and electricians get 30-day accounts, bulk pricing, and priority service. We know your time on site is money.", "imageQuery": "contractor loading building supplies timber pickup truck hardware store" }
    ],
    "contactHours": "Mon\u2013Fri: 07:00\u201317:30 \u00b7 Sat: 07:00\u201314:00 \u00b7 Sun: 08:00\u201312:00"
  },
  "Bookshop": {
    "heroEyebrow": "INDEPENDENT BOOKSHOP CAPE TOWN",
    "heroAccent": "Personally read and recommended",
    "tagline": "Books chosen by people who <em>love</em> them",
    "heroSubtitle": "A fiercely independent bookshop where every recommendation is genuine and every shelf is a conversation.",
    "ctaPrimary": "Browse Online",
    "ctaSecondary": "Visit the Shop",
    "ctaNote": "Free delivery over R400 \u00b7 Gift vouchers available \u00b7 Signed copies often in stock",
    "badge": "Independent Booksellers of SA Member",
    "servicesHeading": "What We Offer",
    "services": [
      {
        "name": "Curated Fiction & Non-Fiction",
        "description": "Thoughtfully stocked shelves across literary fiction, African literature, and serious non-fiction.",
        "tags": [
          "Literary Fiction",
          "African Lit"
        ],
        "serviceImageQuery": "books stacked display table new releases fiction bookshop warm lighting"
      },
      {
        "name": "Staff Picks & Events",
        "description": "Monthly staff recommendations, author evenings, and book club events in the store.",
        "tags": [
          "Staff Picks",
          "Author Events"
        ],
        "serviceImageQuery": "author book reading event audience seated independent bookshop evening"
      },
      {
        "name": "Special Orders & Gift Cards",
        "description": "Source any title in print within 48 hours, or let us choose for someone with a gift card.",
        "tags": [
          "Special Orders",
          "Gift Cards"
        ],
        "serviceImageQuery": "book gift wrapped brown paper ribbon bow bookshop counter"
      },
      {
        "name": "Children's Section",
        "description": "A dedicated kids corner with picture books, middle-grade fiction, and age-guided recommendations.",
        "tags": [
          "Children's Books",
          "Picture Books"
        ],
        "serviceImageQuery": "children picture books colourful illustrated shelf display bookshop kids section"
      }
    ],
    "galleryHeading": "In the Stacks",
    "aboutHeading": "Books that <em>matter</em>",
    "aboutText": "We are not a warehouse. We are a bookshop \u2014 the kind with a cat by the door, staff who have genuinely read the books they recommend, and a section of South African literature that makes us deeply proud.\n\nWe've been here for over a decade, surviving Amazon and algorithms and remaining exactly ourselves.",
    "aboutMission": "We believe an independent bookshop is a community's memory \u2014 and we intend to keep that memory alive.",
    "stats": [
      {
        "value": "14+",
        "label": "Years Open",
        "sublabel": "since 2010"
      },
      {
        "value": "8,000+",
        "label": "Titles In-Store",
        "sublabel": "hand-selected"
      },
      {
        "value": "60+",
        "label": "Events Per Year",
        "sublabel": "author, book club, launches"
      },
      {
        "value": "4.9\u2605",
        "label": "Google Rating",
        "sublabel": "from 500+ reviews"
      }
    ],
    "contactHeading": "Looking for a specific title or recommendation?",
    "testimonial": {
      "quote": "The staff recommended a book that changed the way I see the world. That's rare.",
      "author": "Catherine W., Verified Client",
      "rating": 5
    },
    "imageMood": "warm, literary, inviting",
    "heroImageQuery": "independent bookshop interior floor to ceiling bookshelves warm lighting cosy wood",
    "ogImageQuery": "bookshop interior shelves stacked books warm lighting wooden",
    "aboutImageQuery": "person reading book cosy armchair corner independent bookshop warm lamp",
    "galleryImageQueries": [
      "bookshop interior floor to ceiling bookshelves filled warm wood",
      "book display table new releases staff picks bookshop",
      "children books section colourful picture books bookshop low shelf",
      "stack of books reading glasses coffee cup wooden table",
      "author book signing event audience seated independent bookshop",
      "bookshop counter register friendly staff customer purchasing",
      "person browsing bookshelves hand selecting title bookshop",
      "bookshop window display books arranged storefront inviting warm"
    ],
    "features": [
      { "name": "Every Book Personally Read", "description": "Our staff recommendations aren’t algorithm-generated — they’re based on books we’ve actually read and loved. Ask us anything.", "imageQuery": "bookshop staff member recommending book to customer standing at shelves" },
      { "name": "Special Orders, No Fuss", "description": "Can’t find what you’re looking for? We’ll order any title in print and have it in-store within a week — no minimum spend, no extra charge.", "imageQuery": "bookshop counter staff member helping customer order book friendly" },
      { "name": "A Space to Stay", "description": "Comfortable chairs, good light, and no pressure to buy. We built this shop to be a place you want to spend time in, not just pass through.", "imageQuery": "cosy bookshop reading nook armchair lamp warm lighting books" }
    ],
    "contactHours": "Mon\u2013Fri: 09:00\u201318:00 \u00b7 Sat: 09:00\u201316:00 \u00b7 Sun: 10:00\u201314:00"
  },
  "Pharmacy": {
    "heroEyebrow": "YOUR TRUSTED PHARMACIST",
    "heroAccent": "Dispensing with care since 2001",
    "tagline": "Healthcare advice you can actually <em>trust</em>",
    "heroSubtitle": "Expert dispensing, chronic medication management, and health screenings from pharmacists who take time with every patient.",
    "ctaPrimary": "Transfer Your Script",
    "ctaSecondary": "Our Services",
    "ctaNote": "No appointment needed \u00b7 Chronic delivery available",
    "badge": "South African Pharmacy Council Registered",
    "servicesHeading": "What We Offer",
    "services": [
      {
        "name": "Dispensary & Prescriptions",
        "description": "Fast and accurate dispensing with medicine counselling and drug interaction checks on every script.",
        "tags": [
          "Dispensing",
          "Medicine Counselling"
        ],
        "serviceImageQuery": "pharmacist dispensing prescription medicine bottles counter pharmacy white coat"
      },
      {
        "name": "Chronic Medication Management",
        "description": "Streamlined chronic scripts, auto-refill reminders, and home delivery for regular medications.",
        "tags": [
          "Chronic Meds",
          "Home Delivery"
        ],
        "serviceImageQuery": "pharmacist preparing chronic medication blister pack dispensary counter"
      },
      {
        "name": "Health Screenings",
        "description": "Walk-in blood pressure, glucose, cholesterol, and BMI screenings with pharmacist consultation.",
        "tags": [
          "Blood Pressure",
          "Glucose"
        ],
        "serviceImageQuery": "pharmacist checking blood pressure patient health screening arm cuff"
      },
      {
        "name": "Vaccinations & Travel Health",
        "description": "Flu jabs, travel vaccinations, and immunisation records managed by our qualified pharmacists.",
        "tags": [
          "Vaccinations",
          "Travel Health"
        ],
        "serviceImageQuery": "pharmacist administering flu vaccination injection patient arm pharmacy"
      }
    ],
    "galleryHeading": "Your Health, Our Priority",
    "aboutHeading": "Pharmacy that puts <em>patients</em> first",
    "aboutText": "We are a community pharmacy that has been serving this neighbourhood since 2001. We know many of our patients by name. We know their scripts, their allergies, and their family medical histories.\n\nWe have never rushed a consultation. We never will.",
    "aboutMission": "We believe a pharmacist should be the most accessible healthcare professional in your community.",
    "stats": [
      {
        "value": "23+",
        "label": "Years Dispensing",
        "sublabel": "since 2001"
      },
      {
        "value": "4,000+",
        "label": "Active Patients",
        "sublabel": "in our system"
      },
      {
        "value": "5",
        "label": "Qualified Pharmacists",
        "sublabel": "on the floor daily"
      },
      {
        "value": "98%",
        "label": "Script Accuracy Rate",
        "sublabel": "zero substitution errors"
      }
    ],
    "contactHeading": "Need to transfer your prescription?",
    "testimonial": {
      "quote": "They remembered my daughter's allergy without me even mentioning it. That's real care.",
      "author": "Patricia L., Verified Client",
      "rating": 5
    },
    "imageMood": "clean, trustworthy, professional",
    "heroImageQuery": "pharmacy interior clean white shelves medicine boxes dispensary counter professional",
    "ogImageQuery": "pharmacy dispensary counter medicine shelves clean professional",
    "aboutImageQuery": "pharmacist in white coat dispensing medicine at counter patient consultation friendly",
    "galleryImageQueries": [
      "pharmacy interior clean organised shelves medicine health products",
      "pharmacist consulting patient at counter explaining medication friendly",
      "vitamins supplements health products display shelf pharmacy organised",
      "prescription medicine bottles labelled pharmacy dispensary shelf",
      "blood pressure monitoring pharmacist patient health screening",
      "pharmacy exterior storefront signage clean professional entrance",
      "pharmacist hands counting pills dispensing tray close up",
      "mother child pharmacy counter pharmacist smiling community"
    ],
    "features": [
      { "name": "Pharmacists Who Take Their Time", "description": "We don’t rush consultations. Every prescription is dispensed with a proper explanation — side effects, interactions, and what to expect.", "imageQuery": "pharmacist explaining medication instructions to patient counter consultation" },
      { "name": "Chronic Medication Management", "description": "We manage your repeat scripts proactively. Your medication is pre-packed and ready before you even walk in — no waiting, no chasing.", "imageQuery": "pharmacist preparing chronic medication blister pack dispensary organised" },
      { "name": "Trusted Since 2001", "description": "We’ve been dispensing in this community for over two decades. Three generations of families trust us with their health — that’s not by accident.", "imageQuery": "established community pharmacy storefront exterior professional signage" }
    ],
    "contactHours": "Mon\u2013Fri: 08:00\u201318:00 \u00b7 Sat: 08:30\u201313:00 \u00b7 Sun: 09:00\u201312:00"
  },
  "Toy Store": {
    "heroEyebrow": "TOYS THAT SPARK IMAGINATION",
    "heroAccent": "Educational, creative, screen-free",
    "tagline": "Play that <em>actually</em> develops children",
    "heroSubtitle": "Thoughtfully chosen toys, games, and creative kits that spark imagination and make screen time feel unnecessary.",
    "ctaPrimary": "Shop by Age",
    "ctaSecondary": "Gift Ideas",
    "ctaNote": "Gift wrapping included \u00b7 Age-guidance always available",
    "badge": "SABS Toy Safety Compliant Retailer",
    "servicesHeading": "What We Stock",
    "services": [
      {
        "name": "Educational & Creative Toys",
        "description": "Open-ended building sets, art kits, and STEM toys chosen for developmental value, not just fun.",
        "tags": [
          "Educational",
          "STEM"
        ],
        "serviceImageQuery": "educational STEM wooden building blocks toys colourful display shelf store"
      },
      {
        "name": "Games & Puzzles",
        "description": "Family board games, strategy puzzles, and cooperative games for every age and group size.",
        "tags": [
          "Board Games",
          "Puzzles"
        ],
        "serviceImageQuery": "board games puzzles stacked colourful boxes shelf toy store display"
      },
      {
        "name": "Birthday Gifting",
        "description": "Age-appropriate gift suggestions from our team \u2014 perfectly wrapped and ready to delight.",
        "tags": [
          "Birthday Gifts",
          "Wrapping"
        ],
        "serviceImageQuery": "children birthday gift wrapped colourful ribbon bow toy box present"
      },
      {
        "name": "Outdoor & Active Play",
        "description": "Trampolines, scooters, sandpits, and garden games that get kids moving and off screens.",
        "tags": [
          "Outdoor Toys",
          "Active Play"
        ],
        "serviceImageQuery": "outdoor toys children scooter balls garden play equipment bright"
      }
    ],
    "galleryHeading": "The Toy Box",
    "aboutHeading": "Toys chosen with <em>purpose</em>",
    "aboutText": "We don't stock everything. We stock the best \u2014 toys that are beautifully made, developmentally sound, and likely to be played with for years rather than discarded in weeks.\n\nOur staff are parents. They've tested most of what they recommend. That makes all the difference.",
    "aboutMission": "We believe play is how children learn to understand the world \u2014 and the right toys make that easier.",
    "stats": [
      {
        "value": "10+",
        "label": "Years Open",
        "sublabel": "since 2014"
      },
      {
        "value": "1,200+",
        "label": "Products Stocked",
        "sublabel": "all safety certified"
      },
      {
        "value": "0",
        "label": "Low-Quality Imports",
        "sublabel": "we say no to junk"
      },
      {
        "value": "4.8\u2605",
        "label": "Google Rating",
        "sublabel": "from 400+ reviews"
      }
    ],
    "contactHeading": "Need help choosing the right gift?",
    "testimonial": {
      "quote": "Best toy shop I've ever been in. My kids spent two hours just looking.",
      "author": "Karen S., Verified Client",
      "rating": 5
    },
    "imageMood": "bright, playful, warm",
    "heroImageQuery": "toy store interior colourful shelves stuffed animals wooden toys bright lighting display",
    "ogImageQuery": "colourful toy store shelves stuffed animals educational toys bright",
    "aboutImageQuery": "educational wooden building blocks puzzles colourful display toy store shelf",
    "galleryImageQueries": [
      "toy store interior bright colourful shelves stuffed animals teddy bears",
      "board games puzzles stacked neatly display shelf toy store",
      "educational building blocks construction toys display shelf colourful",
      "toy store window display dolls toy cars trains colourful",
      "child playing wooden train set toy store demonstration table",
      "art supplies crayons paint craft kits display toy store shelf",
      "outdoor toys scooter ball sports equipment toy store section",
      "parent child browsing toy store shelves choosing gift smiling"
    ],
    "features": [
      { "name": "Screen-Free by Design", "description": "We deliberately stock toys that develop creativity, motor skills, and imagination. You won’t find tablets or video games here — just real play.", "imageQuery": "children playing wooden educational blocks creative play floor bright room" },
      { "name": "Age-Appropriate Guidance", "description": "Every toy in our store is labelled with honest age recommendations. Our staff can match any child’s developmental stage to the perfect gift.", "imageQuery": "parent and child exploring educational toys section toy store staff helping" },
      { "name": "Try Before You Buy", "description": "Our play tables let kids test toys in-store. We’d rather your child loves what you take home than you guess from the box.", "imageQuery": "children playing demonstration table bright colourful toy store interactive" }
    ],
    "contactHours": "Mon\u2013Fri: 09:00\u201317:30 \u00b7 Sat: 09:00\u201315:00 \u00b7 Sun: 10:00\u201314:00"
  },
  "Electronics Store": {
    "heroEyebrow": "CAPE TOWN ELECTRONICS EXPERTS",
    "heroAccent": "Authorised dealers. Expert repairs.",
    "tagline": "Tech that actually <em>works</em> for you",
    "heroSubtitle": "The latest devices, expert advice, and repairs from technicians who understand what they're working on.",
    "ctaPrimary": "Shop Now",
    "ctaSecondary": "Book a Repair",
    "ctaNote": "Trade-ins accepted \u00b7 Interest-free finance available",
    "badge": "Samsung & Apple Authorised Reseller",
    "servicesHeading": "What We Do",
    "services": [
      {
        "name": "Smartphones & Laptops",
        "description": "Latest Apple, Samsung, and Lenovo devices \u2014 in stock, unboxed, and set up in-store before you leave.",
        "tags": [
          "Apple",
          "Samsung"
        ],
        "serviceImageQuery": "laptops smartphones tablets displayed table electronics store modern bright"
      },
      {
        "name": "Smart Home & Accessories",
        "description": "Smart speakers, routers, earbuds, and accessories from brands that actually last.",
        "tags": [
          "Smart Home",
          "Accessories"
        ],
        "serviceImageQuery": "smart home speakers wireless earbuds headphones accessories shelf electronics modern"
      },
      {
        "name": "Repairs & Trade-Ins",
        "description": "Screen repairs, battery replacements, and trade-ins completed by certified technicians.",
        "tags": [
          "Repairs",
          "Trade-Ins"
        ],
        "serviceImageQuery": "technician repairing smartphone screen tools tweezers electronics workbench close up"
      },
      {
        "name": "Setup & Installation",
        "description": "On-site setup for TVs, sound systems, home networks, and smart home devices — done properly.",
        "tags": [
          "Installation",
          "Home Setup"
        ],
        "serviceImageQuery": "TV mounted wall living room entertainment sound system setup installation"
      }
    ],
    "galleryHeading": "In the Store",
    "aboutHeading": "Electronics, properly <em>explained</em>",
    "aboutText": "We started as a repair shop and grew into a full electronics retailer because our customers kept asking us to. The repair mentality stuck: we sell things built to last, and we'll fix them if they don't.\n\nNo confusing upsells. No jargon. Just honest advice from people who live for this stuff.",
    "aboutMission": "We believe technology should simplify your life \u2014 and buying it shouldn't be complicated.",
    "stats": [
      {
        "value": "13+",
        "label": "Years Trading",
        "sublabel": "since 2011"
      },
      {
        "value": "200+",
        "label": "Devices Repaired Monthly",
        "sublabel": "certified technicians"
      },
      {
        "value": "50+",
        "label": "Brands Stocked",
        "sublabel": "authorised dealers"
      },
      {
        "value": "4.7\u2605",
        "label": "Google Rating",
        "sublabel": "from 800+ reviews"
      }
    ],
    "contactHeading": "Need a repair or ready to upgrade?",
    "testimonial": {
      "quote": "Fixed my laptop in 2 hours when everyone else quoted 5 days. Incredible service.",
      "author": "Simon R., Verified Client",
      "rating": 5
    },
    "imageMood": "clean, modern, technical",
    "heroImageQuery": "electronics store interior display table laptops smartphones tablets modern clean counter",
    "ogImageQuery": "electronics retail store laptops smartphones display counter modern",
    "aboutImageQuery": "electronics store shelf headphones wireless speakers gadgets modern display",
    "galleryImageQueries": [
      "electronics store interior modern displays smartphones laptops screens",
      "laptop computers open display table electronics store bright",
      "premium headphones wireless earbuds audio speakers shelf electronics store",
      "smartphone phone cases accessories chargers cables display rack store",
      "technician repairing smartphone screen tools electronics workshop close up",
      "smart home devices speakers displays electronics store shelf modern",
      "customer testing laptop electronics store staff demonstrating",
      "electronics store interior wide angle modern shelves displays tech"
    ],
    "features": [
      { "name": "Honest Tech Advice", "description": "We’ll recommend what you actually need, not the most expensive option. Our staff use the products they sell and give straight answers.", "imageQuery": "electronics store staff showing laptop to customer demonstrating features" },
      { "name": "In-House Repairs", "description": "Broken screen? Slow laptop? Our certified technicians fix it on-site, often same-day. No shipping it off and waiting weeks.", "imageQuery": "technician repairing laptop circuit board electronics workshop tools close up" },
      { "name": "Authorised Dealer Warranties", "description": "We’re authorised dealers for every brand we carry. That means full manufacturer warranties, genuine parts, and proper after-sales support.", "imageQuery": "electronics store branded display apple samsung authorised dealer modern" }
    ],
    "contactHours": "Mon\u2013Fri: 08:30\u201318:00 \u00b7 Sat: 09:00\u201315:00 \u00b7 Sun: 10:00\u201314:00"
  },
  "Sports Store": {
    "heroEyebrow": "CAPE TOWN SPORTS & OUTDOOR",
    "heroAccent": "Gear for real athletes and weekend warriors",
    "tagline": "Kit up. Get <em>out</em> there.",
    "heroSubtitle": "Performance sporting equipment, technical apparel, and expert advice from people who use everything they sell.",
    "ctaPrimary": "Shop Now",
    "ctaSecondary": "In-Store Fitting",
    "ctaNote": "Free returns \u00b7 Running gait analysis \u00b7 Demo weekends",
    "badge": "Asics & Nike Authorised Retailer",
    "servicesHeading": "Our Departments",
    "services": [
      {
        "name": "Running & Trail Gear",
        "description": "Expert shoe fitting, gait analysis, and technical kit for road runners and trail athletes.",
        "tags": [
          "Running Shoes",
          "Gait Analysis"
        ],
        "serviceImageQuery": "running shoes trainers colourful pairs wall display shelf sports store"
      },
      {
        "name": "Outdoor & Adventure",
        "description": "Hiking packs, trail apparel, and outdoor gear from Salomon, The North Face, and more.",
        "tags": [
          "Hiking",
          "Trail"
        ],
        "serviceImageQuery": "hiking backpacks outdoor jackets trail gear display shelf sports store"
      },
      {
        "name": "Team Sport Equipment",
        "description": "Rugby, cricket, soccer, and swimming gear for clubs, schools, and individuals.",
        "tags": [
          "Team Sport",
          "Cricket"
        ],
        "serviceImageQuery": "rugby balls cricket bats soccer boots team sports equipment display store shelf"
      },
      {
        "name": "Racket Restringing & Repairs",
        "description": "In-store racket restringing, ski servicing, and equipment repairs by qualified technicians.",
        "tags": [
          "Restringing",
          "Equipment Repair"
        ],
        "serviceImageQuery": "tennis racket restringing machine close up sports equipment repair service"
      }
    ],
    "galleryHeading": "Get Out There",
    "aboutHeading": "Sport taken <em>seriously</em>",
    "aboutText": "We are Cape Town outdoor and sport people who opened a shop to serve our community. Half our staff run ultras. Two played provincial cricket. One finished Ironman three times.\n\nYou get advice from people who actually train \u2014 not commission-chasing salespeople.",
    "aboutMission": "We believe the right gear doesn't just perform \u2014 it gives you the confidence to push further.",
    "stats": [
      {
        "value": "18+",
        "label": "Years in Sport",
        "sublabel": "since 2006"
      },
      {
        "value": "80+",
        "label": "Brands Stocked",
        "sublabel": "running to rugby"
      },
      {
        "value": "1,000+",
        "label": "Gait Analyses Done",
        "sublabel": "free in-store"
      },
      {
        "value": "4.8\u2605",
        "label": "Google Rating",
        "sublabel": "from 600+ reviews"
      }
    ],
    "contactHeading": "Want a fitting or expert advice?",
    "testimonial": {
      "quote": "The gait analysis changed my running. Right shoe, zero injuries since. Brilliant staff.",
      "author": "Candice J., Verified Client",
      "rating": 5
    },
    "imageMood": "energetic, technical, outdoors",
    "heroImageQuery": "sports store interior running shoes trainers display wall shelves colourful athletic",
    "ogImageQuery": "sports store running shoes athletic gear display shelves colourful",
    "aboutImageQuery": "sports store shoe wall display running trainers athletic colourful rows",
    "galleryImageQueries": [
      "running shoes trainers colourful wall display sports store shelves",
      "cricket bat rugby ball soccer boots sports equipment display store",
      "cycling jerseys helmets road bikes sports store display",
      "tennis rackets badminton squash racquet display sports store shelf",
      "fitness gym clothing athletic wear sports apparel display rack",
      "swimming goggles caps swimwear display sports store section",
      "sports store interior wide angle departments shoes equipment display",
      "customer trying on running shoes sports store staff fitting advice"
    ],
    "features": [
      { "name": "Staff Who Use the Gear", "description": "Our team are runners, cyclists, hikers, and surfers. We don’t sell anything we haven’t tested ourselves — ask us and we’ll tell you what’s actually worth it.", "imageQuery": "sports store staff athlete helping customer fit running shoes expert" },
      { "name": "Free Gait Analysis", "description": "Buy running shoes with us and we’ll do a complimentary gait analysis to match your stride to the right shoe. Proper fitting prevents injuries.", "imageQuery": "runner treadmill gait analysis sports store shoe fitting biomechanics" },
      { "name": "Demo Before You Commit", "description": "We host demo weekends for bikes, paddles, and gear. Try it in real conditions before spending your money — no obligation.", "imageQuery": "people testing cycling equipment outdoor sports demo event bikes" }
    ],
    "contactHours": "Mon\u2013Fri: 09:00\u201318:00 \u00b7 Sat: 09:00\u201316:00 \u00b7 Sun: 10:00\u201314:00"
  },
  "Grocery / Supermarket": {
    "heroEyebrow": "YOUR NEIGHBOURHOOD SUPERMARKET",
    "heroAccent": "Fresh produce in daily. Local where possible.",
    "tagline": "More than a shop \u2014 it's your <em>larder</em>",
    "heroSubtitle": "A well-stocked, community-first supermarket with a proper butchery, bakery, and produce section you can trust.",
    "ctaPrimary": "Shop Online",
    "ctaSecondary": "Weekly Specials",
    "ctaNote": "Delivery & click-collect \u00b7 Loyalty points on every purchase",
    "badge": "Fresh Produce Association of SA Member",
    "servicesHeading": "What We Stock",
    "services": [
      {
        "name": "Fresh Produce Daily",
        "description": "Locally sourced fruit and vegetables delivered fresh daily with strict quality control.",
        "tags": [
          "Local Produce",
          "Daily Delivery"
        ],
        "serviceImageQuery": "fresh produce aisle vegetables fruit colourful stacked display supermarket"
      },
      {
        "name": "In-Store Butchery & Bakery",
        "description": "Full-service butchery with custom cuts and a bakery baking fresh bread and pastries daily.",
        "tags": [
          "Butchery",
          "In-Store Bakery"
        ],
        "serviceImageQuery": "in store butcher counter fresh meat cuts display bakery bread loaves supermarket"
      },
      {
        "name": "Online Shopping & Delivery",
        "description": "Same-day delivery and next-morning click-and-collect for your full weekly shop.",
        "tags": [
          "Delivery",
          "Click & Collect"
        ],
        "serviceImageQuery": "grocery delivery brown bags packed fresh products doorstep home online order"
      },
      {
        "name": "Loyalty Card & Weekly Specials",
        "description": "Swipe your loyalty card for points on every shop and exclusive access to our weekly specials.",
        "tags": [
          "Loyalty Card",
          "Weekly Specials"
        ],
        "serviceImageQuery": "supermarket loyalty card customer checkout counter groceries shopping"
      }
    ],
    "galleryHeading": "In the Aisles",
    "aboutHeading": "Community grocery, done <em>properly</em>",
    "aboutText": "We are a proudly independent supermarket that has served this neighbourhood for over twenty years. We know our regulars, we stock what they ask for, and we support local producers wherever possible.\n\nWe are not a chain. We never will be. That's the point.",
    "aboutMission": "We believe your local supermarket should feel like a small extension of home.",
    "stats": [
      {
        "value": "20+",
        "label": "Years Trading",
        "sublabel": "since 2004"
      },
      {
        "value": "8,000+",
        "label": "Product Lines",
        "sublabel": "in-store"
      },
      {
        "value": "60+",
        "label": "Local Suppliers",
        "sublabel": "within 100km"
      },
      {
        "value": "4.6\u2605",
        "label": "Google Rating",
        "sublabel": "from 1,200+ reviews"
      }
    ],
    "contactHeading": "Want to set up grocery delivery?",
    "testimonial": {
      "quote": "Never going back to the chain stores. The produce quality and butchery here are next level.",
      "author": "Quinn M., Verified Client",
      "rating": 5
    },
    "imageMood": "fresh, abundant, community",
    "heroImageQuery": "supermarket fresh produce aisle colourful vegetables fruit display stacked abundant",
    "ogImageQuery": "supermarket interior produce aisle fresh vegetables fruit stocked shelves",
    "aboutImageQuery": "fresh produce vegetables fruit stacked wooden crates colourful market display",
    "galleryImageQueries": [
      "supermarket aisles fully stocked shelves products wide angle overhead",
      "fresh bakery section crusty bread loaves rolls supermarket display",
      "butcher counter fresh meat cuts steaks sausages supermarket display case",
      "fresh produce vegetables fruit colourful display supermarket aisle stacked",
      "deli counter prepared salads olives cheese supermarket glass case",
      "wine beer beverages aisle supermarket bottles shelves stocked",
      "frozen foods dairy refrigerated aisle supermarket shelves stocked",
      "customer shopping fresh produce selecting fruit supermarket aisle"
    ],
    "features": [
      { "name": "In-Store Butchery & Bakery", "description": "Our butcher cuts to order and our baker starts at 4am. You’re not buying pre-packaged — you’re buying fresh, made here, today.", "imageQuery": "butcher cutting fresh meat counter supermarket in store butchery apron" },
      { "name": "Local Supplier Partnerships", "description": "We work directly with farms and producers within 100km. That means fresher food, lower food miles, and money staying in the local economy.", "imageQuery": "farmer delivering fresh vegetable crates produce local supermarket receiving" },
      { "name": "Click & Collect in 2 Hours", "description": "Order online, pick up in-store within two hours. We pick your items with the same care you would — no substitutions without your approval.", "imageQuery": "customer collecting packed grocery bags click collect supermarket counter" }
    ],
    "contactHours": "Mon\u2013Sun: 07:30\u201320:00 \u00b7 Public holidays: 08:00\u201317:00"
  },
  "Thrift / Second-hand Store": {
    "heroEyebrow": "CURATED SECOND-HAND CAPE TOWN",
    "heroAccent": "Pre-loved. Sustainably sourced.",
    "tagline": "One person's past, your next <em>favourite</em>",
    "heroSubtitle": "Carefully curated vintage clothing, furniture, and collectibles \u2014 extraordinary finds at honest prices.",
    "ctaPrimary": "Browse Online",
    "ctaSecondary": "Visit the Store",
    "ctaNote": "New stock weekly \u00b7 Selling? We buy and consign",
    "badge": "Cape Town Circular Economy Network Member",
    "servicesHeading": "What We Sell",
    "services": [
      {
        "name": "Vintage & Pre-Loved Clothing",
        "description": "Curated vintage and second-hand clothing sorted by era, style, and condition for easy browsing.",
        "tags": [
          "Vintage",
          "Pre-Loved"
        ],
        "serviceImageQuery": "vintage clothing rack dresses jackets browsing thrift store colourful hangers"
      },
      {
        "name": "Furniture & Homeware",
        "description": "Solid second-hand furniture, ceramics, art, and homeware with genuine character and history.",
        "tags": [
          "Vintage Furniture",
          "Homeware"
        ],
        "serviceImageQuery": "vintage second hand furniture wooden table chairs lamp thrift store display"
      },
      {
        "name": "Buy, Sell & Consign",
        "description": "We buy quality items outright or take your pieces on consignment and handle the selling.",
        "tags": [
          "Buy & Sell",
          "Consignment"
        ],
        "serviceImageQuery": "person selling consigning vintage clothing items thrift store counter"
      },
      {
        "name": "Upcycled & Restored Pieces",
        "description": "Hand-restored furniture and upcycled fashion pieces given a second life by local makers.",
        "tags": [
          "Upcycled",
          "Restored"
        ],
        "serviceImageQuery": "upcycled restored painted vintage furniture chair table colourful"
      }
    ],
    "galleryHeading": "Recent Finds",
    "aboutHeading": "Fashion without the <em>footprint</em>",
    "aboutText": "We opened our thrift store because we believe that beautiful, quality objects deserve a second life. We hand-sort everything \u2014 nothing goes on the floor unless we'd keep it ourselves.\n\nShopping here is better for your wallet and better for the planet. That's not a marketing line \u2014 it's just true.",
    "aboutMission": "We believe the most sustainable garment is the one that already exists.",
    "stats": [
      {
        "value": "8+",
        "label": "Years Curating",
        "sublabel": "since 2016"
      },
      {
        "value": "500+",
        "label": "Items Added Weekly",
        "sublabel": "all hand-sorted"
      },
      {
        "value": "20,000+",
        "label": "Items Found Homes",
        "sublabel": "kept out of landfill"
      },
      {
        "value": "4.8\u2605",
        "label": "Google Rating",
        "sublabel": "from 350+ reviews"
      }
    ],
    "contactHeading": "Have items to sell or consign?",
    "testimonial": {
      "quote": "Found a perfect vintage Levi jacket for R150. The curation is brilliant \u2014 it's not chaos.",
      "author": "Mia C., Verified Client",
      "rating": 5
    },
    "imageMood": "eclectic, warm, nostalgic",
    "heroImageQuery": "thrift store interior vintage clothing racks colourful eclectic shelves warm lighting",
    "ogImageQuery": "curated thrift store vintage clothing racks eclectic display warm",
    "aboutImageQuery": "woman browsing vintage clothing rack thrift store hangers denim jackets",
    "galleryImageQueries": [
      "thrift store interior vintage clothing racks organised browse warm",
      "second hand vinyl records books shelf display thrift store eclectic",
      "vintage furniture lamp side table vase thrift store display",
      "retro denim jacket leather vintage clothing rack thrift store",
      "vintage dresses blouses floral pattern rack thrift store browse",
      "second hand homeware ceramics glassware shelf thrift store curated",
      "customer browsing vintage clothing rack thrift store smiling discover",
      "thrift store exterior storefront vintage sign welcoming entrance"
    ],
    "features": [
      { "name": "Curated, Not Cluttered", "description": "We sort through hundreds of items so you don’t have to. Only the best condition, most interesting pieces make it to our floor.", "imageQuery": "curated vintage clothing rack neatly organised colourful thrift store" },
      { "name": "Sustainable Shopping", "description": "Every purchase here keeps something out of landfill. Shopping second-hand is the most impactful thing you can do for the planet — and your wallet.", "imageQuery": "sustainable fashion pre-loved clothing rack eco friendly thrift store" },
      { "name": "New Stock Every Week", "description": "We refresh our inventory weekly with new donations and sourced finds. Regular visitors always find something they didn’t see last time.", "imageQuery": "new arrivals rack fresh vintage stock thrift store clothing tagged" }
    ],
    "contactHours": "Mon\u2013Sat: 09:00\u201317:00 \u00b7 Sun: 10:00\u201314:00"
  },
  "Garden Centre / Nursery": {
    "heroEyebrow": "CAPE TOWN PLANT NURSERY",
    "heroAccent": "Fynbos specialists since 1993",
    "tagline": "Grow something worth <em>tending</em>",
    "heroSubtitle": "Indigenous plants, garden design, and expert horticultural advice for every garden and every gardener.",
    "ctaPrimary": "Visit the Nursery",
    "ctaSecondary": "Shop Online",
    "ctaNote": "Delivery available \u00b7 Landscape design consultations free",
    "badge": "Landscaping SA Association Member",
    "servicesHeading": "What We Grow",
    "services": [
      {
        "name": "Indigenous & Fynbos Plants",
        "description": "The Western Cape's finest indigenous plant selection \u2014 fynbos, restios, proteas, and succulents.",
        "tags": [
          "Fynbos",
          "Indigenous"
        ],
        "serviceImageQuery": "indigenous potted plants succulents proteas displayed rows garden centre nursery"
      },
      {
        "name": "Garden Design & Planting",
        "description": "On-site garden design consultations and full planting plans from qualified horticulturists.",
        "tags": [
          "Garden Design",
          "Planting Plan"
        ],
        "serviceImageQuery": "landscape gardener planting flower bed garden design outdoor installation"
      },
      {
        "name": "Pots, Soil & Garden Supplies",
        "description": "Terracotta and designer pots, premium compost, fertilisers, and tools for every garden project.",
        "tags": [
          "Pots",
          "Compost"
        ],
        "serviceImageQuery": "terracotta pots compost bags garden tools display shelf nursery"
      },
      {
        "name": "Fruit Trees & Edible Garden",
        "description": "Citrus, stone fruit, herbs, and vegetable seedlings for growing your own food at home.",
        "tags": [
          "Fruit Trees",
          "Edible Garden"
        ],
        "serviceImageQuery": "fruit trees citrus lemon orange potted nursery display outdoor row"
      }
    ],
    "galleryHeading": "In the Nursery",
    "aboutHeading": "Gardens rooted in <em>knowledge</em>",
    "aboutText": "We have been growing plants in Cape Town since 1993 and we are unabashedly passionate about indigenous flora. The Western Cape is one of the world's six floral kingdoms \u2014 and we think that's worth celebrating in every garden.\n\nOur horticulturists can help with everything from a single pot to a complete garden overhaul.",
    "aboutMission": "We believe a garden connected to its local ecology is always more beautiful than one fighting against it.",
    "stats": [
      {
        "value": "31+",
        "label": "Years Growing",
        "sublabel": "since 1993"
      },
      {
        "value": "5,000+",
        "label": "Plant Varieties",
        "sublabel": "in stock seasonally"
      },
      {
        "value": "400+",
        "label": "Gardens Designed",
        "sublabel": "across Cape Town"
      },
      {
        "value": "4.9\u2605",
        "label": "Google Rating",
        "sublabel": "from 700+ reviews"
      }
    ],
    "contactHeading": "Want a garden design consultation?",
    "testimonial": {
      "quote": "They transformed my bare patch into a fynbos paradise. The expertise is exceptional.",
      "author": "Tony N., Verified Client",
      "rating": 5
    },
    "imageMood": "lush, natural, botanical",
    "heroImageQuery": "garden centre nursery outdoor potted plants flowers rows greenhouse lush green",
    "ogImageQuery": "garden centre nursery potted plants rows greenhouse outdoor lush",
    "aboutImageQuery": "nursery worker hands repotting plant soil terracotta pot garden centre",
    "galleryImageQueries": [
      "garden centre greenhouse interior plants rows shelves lush green",
      "potted succulents cacti displayed wooden table garden nursery outdoor",
      "terracotta pots garden tools watering cans display shelf nursery",
      "outdoor trees shrubs large plants garden centre yard display",
      "herb seedlings vegetable plants trays garden nursery spring",
      "protea indigenous fynbos plants potted display garden nursery",
      "customer selecting potted plant garden centre browsing greenery",
      "garden centre outdoor area gravel paths plants flowers sunlight"
    ],
    "features": [
      { "name": "Fynbos Specialists", "description": "We’ve specialised in indigenous Cape plants for 30 years. Our team can advise on water-wise gardens that thrive in our climate without constant irrigation.", "imageQuery": "indigenous fynbos protea plants potted display garden nursery outdoor" },
      { "name": "Grow Guarantee", "description": "If a plant you bought from us doesn’t survive within the first 90 days and you followed our care advice, we’ll replace it. No receipt needed.", "imageQuery": "healthy green potted plants thriving nursery greenhouse rows lush" },
      { "name": "Free Garden Design Consultations", "description": "Bring us your garden measurements and photos, and our horticulturist will sketch a planting plan for free. We want your garden to succeed.", "imageQuery": "landscape designer sketching garden plan plants layout consultation outdoor" }
    ],
    "contactHours": "Mon\u2013Fri: 07:30\u201317:30 \u00b7 Sat: 07:30\u201315:00 \u00b7 Sun: 09:00\u201313:00"
  },
  "Dentist": {
    "heroEyebrow": "CAPE TOWN DENTAL PRACTICE",
    "heroAccent": "Gentle dentistry for nervous patients too",
    "tagline": "The smile you've always <em>deserved</em>",
    "heroSubtitle": "General and cosmetic dentistry delivered with precision, warmth, and a genuine care for patient comfort.",
    "ctaPrimary": "Book an Appointment",
    "ctaSecondary": "Our Services",
    "ctaNote": "Same-day emergencies \u00b7 Medical aid accepted \u00b7 No waiting room guilt",
    "badge": "South African Dental Association Member",
    "servicesHeading": "Our Treatments",
    "services": [
      {
        "name": "General Dentistry",
        "description": "Comprehensive check-ups, fillings, extractions, and preventive care for the whole family.",
        "tags": [
          "Check-Ups",
          "Family Dentistry"
        ],
        "serviceImageQuery": "dentist performing checkup patient open mouth dental mirror examination overhead light"
      },
      {
        "name": "Cosmetic & Whitening",
        "description": "Professional whitening, veneers, bonding, and smile makeovers that look completely natural.",
        "tags": [
          "Whitening",
          "Veneers"
        ],
        "serviceImageQuery": "patient receiving teeth whitening treatment blue LED light dental chair bright clinic"
      },
      {
        "name": "Implants & Orthodontics",
        "description": "Dental implants, clear aligners, and orthodontic treatment from experienced specialists.",
        "tags": [
          "Implants",
          "Clear Aligners"
        ],
        "serviceImageQuery": "dentist showing dental implant model to patient jaw bone cross-section clinic desk"
      },
      {
        "name": "Children's Dentistry",
        "description": "Gentle, child-friendly dental care from first teeth through to teens — building habits that last a lifetime.",
        "tags": [
          "Paediatric",
          "Preventive Care"
        ],
        "serviceImageQuery": "child sitting in colorful dental chair smiling dentist showing toothbrush bright pediatric clinic"
      }
    ],
    "galleryHeading": "Smile Transformations",
    "aboutHeading": "Dentistry that puts <em>patients</em> first",
    "aboutText": "We know dentist anxiety is real. That's why we've built our practice around communication, comfort, and the principle that no one should dread coming to see us.\n\nOur team treats children, nervous adults, and complex cases with the same calm, unhurried approach. Your dental health matters to us \u2014 genuinely.",
    "aboutMission": "We believe a healthy mouth contributes to a healthy, confident life \u2014 and getting there shouldn't be stressful.",
    "stats": [
      {
        "value": "18+",
        "label": "Years Practising",
        "sublabel": "since 2006"
      },
      {
        "value": "5,000+",
        "label": "Active Patients",
        "sublabel": "families & individuals"
      },
      {
        "value": "6",
        "label": "Qualified Dentists",
        "sublabel": "including specialists"
      },
      {
        "value": "98%",
        "label": "Patient Satisfaction",
        "sublabel": "from post-visit surveys"
      }
    ],
    "contactHeading": "Ready to book your first appointment?",
    "testimonial": {
      "quote": "Finally a dentist who doesn't make you feel guilty. Kind, professional, no pain.",
      "author": "Felicity A., Verified Client",
      "rating": 5
    },
    "imageMood": "clean, calm, professional",
    "heroImageQuery": "dentist examining patient teeth reclining dental chair bright overhead light modern clinic white walls",
    "ogImageQuery": "smiling female dentist holding dental mirror professional portrait white coat clinic background",
    "aboutImageQuery": "friendly dentist talking to patient seated in dental chair explaining treatment warm modern practice",
    "galleryImageQueries": [
      "modern dental clinic reception area white counters potted plants bright waiting room",
      "dentist using dental mirror examining patient open mouth overhead light close-up",
      "dental hygienist cleaning patient teeth ultrasonic scaler dental chair bright room",
      "woman smiling bright white teeth after dental treatment happy result portrait"
    ],
    "contactHours": "Mon\u2013Fri: 08:00\u201317:00 \u00b7 Sat: 08:00\u201312:00 \u00b7 Emergencies by call"
  },
  "Doctor / GP": {
    "heroEyebrow": "YOUR FAMILY DOCTOR CAPE TOWN",
    "heroAccent": "Same-day appointments available",
    "tagline": "Healthcare built on a relationship you can <em>trust</em>",
    "heroSubtitle": "Comprehensive general practice care for individuals and families \u2014 unhurried consultations, honest advice.",
    "ctaPrimary": "Book Online",
    "ctaSecondary": "Our Services",
    "ctaNote": "Same-day sick visits \u00b7 Medical aid accepted \u00b7 Telehealth available",
    "badge": "Health Professions Council of SA Registered",
    "servicesHeading": "What We Treat",
    "services": [
      {
        "name": "General Consultations",
        "description": "Comprehensive consultations for acute illness, chronic conditions, and preventive health checks.",
        "tags": [
          "GP Consultations",
          "Chronic Care"
        ],
        "serviceImageQuery": "doctor consulting with patient across desk stethoscope computer screen medical office"
      },
      {
        "name": "Chronic Disease Management",
        "description": "Ongoing management of hypertension, diabetes, asthma, and other chronic conditions.",
        "tags": [
          "Diabetes",
          "Hypertension"
        ],
        "serviceImageQuery": "nurse taking blood pressure reading patient arm cuff monitor medical clinic"
      },
      {
        "name": "Occupational & Travel Health",
        "description": "Pre-employment medicals, travel vaccinations, and certificates for corporate and travel needs.",
        "tags": [
          "Travel Vaccines",
          "Medicals"
        ],
        "serviceImageQuery": "doctor administering vaccine injection patient upper arm syringe medical clinic room"
      },
      {
        "name": "Women's & Reproductive Health",
        "description": "Pap smears, contraception, antenatal screening, and menopause management with discretion and care.",
        "tags": [
          "Women's Health",
          "Antenatal"
        ],
        "serviceImageQuery": "female doctor discussing results with woman patient ultrasound screen medical consultation room"
      }
    ],
    "galleryHeading": "Your Health Matters",
    "aboutHeading": "A doctor who actually <em>listens</em>",
    "aboutText": "We are a family-oriented general practice built on long-term relationships. Many of our patients have been with us for over a decade \u2014 we know their history, their family, and what normal looks like for them.\n\nWe take time with every consultation. A 10-minute slot is not enough and we have never pretended otherwise.",
    "aboutMission": "We believe the best medicine starts with a doctor who knows you as a person, not a file number.",
    "stats": [
      {
        "value": "20+",
        "label": "Years Practising",
        "sublabel": "since 2004"
      },
      {
        "value": "3,500+",
        "label": "Registered Patients",
        "sublabel": "families & individuals"
      },
      {
        "value": "4",
        "label": "Qualified Doctors",
        "sublabel": "full & part-time"
      },
      {
        "value": "4.8\u2605",
        "label": "Google Rating",
        "sublabel": "from 400+ reviews"
      }
    ],
    "contactHeading": "Need to book an appointment?",
    "testimonial": {
      "quote": "Dr van Wyk remembered what we discussed six months ago. That's the kind of doctor you want.",
      "author": "Anton P., Verified Client",
      "rating": 5
    },
    "imageMood": "warm, clean, professional",
    "heroImageQuery": "friendly doctor in white coat greeting patient handshake modern medical practice reception bright clean",
    "ogImageQuery": "smiling doctor white coat stethoscope professional portrait medical practice background",
    "aboutImageQuery": "doctor sitting with patient having conversation across desk warm medical office natural light",
    "galleryImageQueries": [
      "modern medical practice waiting room comfortable chairs reception desk bright clean",
      "doctor examining patient with stethoscope chest heartbeat check medical room",
      "nurse drawing blood sample from patient arm tourniquet medical practice",
      "doctor reviewing medical results on computer screen consultation desk office"
    ],
    "contactHours": "Mon\u2013Fri: 08:00\u201317:30 \u00b7 Sat: 08:00\u201312:30 \u00b7 Emergencies: walk-in welcome"
  },
  "Physiotherapist": {
    "heroEyebrow": "PHYSIOTHERAPY CAPE TOWN",
    "heroAccent": "Evidence-based treatment. Real results.",
    "tagline": "Move better. Hurt <em>less</em>. Live more.",
    "heroSubtitle": "Expert physiotherapy for sports injuries, chronic pain, post-surgical rehab, and everything in between.",
    "ctaPrimary": "Book a Session",
    "ctaSecondary": "Our Treatments",
    "ctaNote": "Medical aid accepted \u00b7 After-hours available \u00b7 Home visits on request",
    "badge": "South African Society of Physiotherapy Member",
    "servicesHeading": "What We Treat",
    "services": [
      {
        "name": "Sports & Exercise Injury",
        "description": "Accurate diagnosis and evidence-based rehab for runners, cyclists, and athletes at every level.",
        "tags": [
          "Sports Rehab",
          "Runners"
        ],
        "serviceImageQuery": "physiotherapist applying kinesiology tape to athlete knee injury treatment table sports clinic"
      },
      {
        "name": "Chronic Pain & Back Care",
        "description": "Effective treatment for lower back pain, neck stiffness, and persistent musculoskeletal conditions.",
        "tags": [
          "Back Pain",
          "Neck"
        ],
        "serviceImageQuery": "physiotherapist hands performing manual therapy on patient lower back spine treatment bed clinic"
      },
      {
        "name": "Post-Surgical Rehabilitation",
        "description": "Structured post-op rehab programmes following orthopaedic and spinal surgery.",
        "tags": [
          "Post-Op Rehab",
          "Orthopaedic"
        ],
        "serviceImageQuery": "patient doing balance board exercise physio gym post-surgery rehabilitation therapist guiding"
      },
      {
        "name": "Women's Health Physio",
        "description": "Specialised pelvic floor rehabilitation, pre- and postnatal physio, and incontinence management.",
        "tags": [
          "Pelvic Floor",
          "Postnatal"
        ],
        "serviceImageQuery": "woman doing pelvic floor exercise on mat with Swiss ball physiotherapy clinic bright room"
      }
    ],
    "galleryHeading": "In the Practice",
    "aboutHeading": "Physio that gets you <em>moving</em>",
    "aboutText": "We are a team of passionate physiotherapists who believe that movement is medicine. Our approach combines hands-on manual therapy with targeted exercise rehabilitation and patient education.\n\nWe explain everything we do and why. An informed patient recovers faster \u2014 that's not opinion, it's evidence.",
    "aboutMission": "We believe your body is capable of remarkable recovery \u2014 our job is to guide it there.",
    "stats": [
      {
        "value": "14+",
        "label": "Years Practising",
        "sublabel": "since 2010"
      },
      {
        "value": "8,000+",
        "label": "Patients Treated",
        "sublabel": "since opening"
      },
      {
        "value": "5",
        "label": "Specialist Physios",
        "sublabel": "sports, neuro & women's health"
      },
      {
        "value": "94%",
        "label": "Patient Outcome Rate",
        "sublabel": "from clinical audit"
      }
    ],
    "contactHeading": "Want to get out of pain?",
    "testimonial": {
      "quote": "Ran my first marathon after three months of treatment. Absolute game-changer.",
      "author": "Brendan T., Verified Client",
      "rating": 5
    },
    "imageMood": "clinical, active, professional",
    "heroImageQuery": "physiotherapist helping patient stretch shoulder treatment bed bright modern physio clinic white walls",
    "ogImageQuery": "physiotherapist assisting patient arm stretch exercise treatment room bright professional",
    "aboutImageQuery": "physiotherapist guiding patient through leg stretch exercise on mat bright physio clinic equipment background",
    "galleryImageQueries": [
      "modern physiotherapy clinic room treatment beds exercise equipment bright windows",
      "patient balancing on exercise ball physiotherapist assisting physio gym rehabilitation",
      "physiotherapist applying ultrasound therapy probe to patient knee joint treatment close-up",
      "patient doing resistance band shoulder exercise guided by physiotherapist clinic room"
    ],
    "contactHours": "Mon\u2013Fri: 07:30\u201318:00 \u00b7 Sat: 08:00\u201313:00 \u00b7 By appointment"
  },
  "Chiropractor": {
    "heroEyebrow": "CHIROPRACTIC CARE CAPE TOWN",
    "heroAccent": "Drug-free pain relief that works",
    "tagline": "Your spine. Your <em>health</em>. Our expertise.",
    "heroSubtitle": "Skilled chiropractic adjustments and spinal health care that address the cause of your pain \u2014 not just the symptoms.",
    "ctaPrimary": "Book Now",
    "ctaSecondary": "What We Treat",
    "ctaNote": "Same-week appointments \u00b7 Medical aid accepted \u00b7 Family packages available",
    "badge": "Allied Health Professions Council SA Registered",
    "servicesHeading": "What We Treat",
    "services": [
      {
        "name": "Spinal Adjustments",
        "description": "Precise chiropractic adjustments to restore alignment and relieve nerve pressure effectively.",
        "tags": [
          "Adjustments",
          "Spinal Health"
        ],
        "serviceImageQuery": "chiropractor performing spinal adjustment hands pressing patient back lying on treatment table clinic"
      },
      {
        "name": "Back & Neck Pain",
        "description": "Effective treatment for lumbar disc issues, whiplash, headaches, and chronic neck tension.",
        "tags": [
          "Back Pain",
          "Neck Pain"
        ],
        "serviceImageQuery": "chiropractor adjusting patient neck cervical spine treatment side view hands clinical room"
      },
      {
        "name": "Paediatric & Family Chiropractic",
        "description": "Gentle chiropractic care for infants, children, and pregnant women using adapted techniques.",
        "tags": [
          "Family",
          "Paediatric"
        ],
        "serviceImageQuery": "chiropractor gently treating infant baby on padded table hands supporting small child clinic"
      },
      {
        "name": "Sports Chiropractic",
        "description": "Performance-focused chiropractic care for athletes including biomechanical assessment and injury prevention.",
        "tags": [
          "Sports Performance",
          "Biomechanics"
        ],
        "serviceImageQuery": "athlete running on treadmill gait analysis biomechanics assessment screen chiropractor observing clinic"
      }
    ],
    "galleryHeading": "In the Practice",
    "aboutHeading": "Spinal health, <em>properly</em> managed",
    "aboutText": "Our chiropractors understand that the spine is central to your overall wellbeing \u2014 not just your back pain. We take a whole-body approach to care, looking for the root cause of your discomfort rather than just treating the site of pain.\n\nWe see families, athletes, desk workers, and seniors. Everyone's spine deserves attention.",
    "aboutMission": "We believe optimal spinal health is the foundation of a body that functions at its best.",
    "stats": [
      {
        "value": "16+",
        "label": "Years Practising",
        "sublabel": "since 2008"
      },
      {
        "value": "12,000+",
        "label": "Adjustments Performed",
        "sublabel": "since opening"
      },
      {
        "value": "3",
        "label": "Qualified Chiropractors",
        "sublabel": "specialised & registered"
      },
      {
        "value": "97%",
        "label": "Patient Satisfaction",
        "sublabel": "from exit surveys"
      }
    ],
    "contactHeading": "Ready to sort out that back pain?",
    "testimonial": {
      "quote": "Five years of back pain resolved in six sessions. I wish I'd come sooner.",
      "author": "Susan V., Verified Client",
      "rating": 5
    },
    "imageMood": "clean, clinical, calming",
    "heroImageQuery": "chiropractor adjusting patient lying face down on treatment table modern bright chiropractic clinic",
    "ogImageQuery": "chiropractor in white coat with patient treatment table professional chiropractic clinic",
    "aboutImageQuery": "chiropractor explaining spine model to patient seated in consultation room warm professional",
    "galleryImageQueries": [
      "modern chiropractic treatment room padded table adjustable equipment bright clean walls",
      "anatomical spine model vertebrae on desk chiropractor office educational display",
      "chiropractor assessing patient posture standing side view alignment check clinical room",
      "patient receiving heat therapy warm pack on lower back treatment table chiropractic clinic"
    ],
    "contactHours": "Mon\u2013Fri: 08:00\u201318:00 \u00b7 Sat: 08:00\u201312:00 \u00b7 By appointment"
  },
  "Optometrist": {
    "heroEyebrow": "CAPE TOWN EYE CARE",
    "heroAccent": "Full eye health examinations, not just scripts",
    "tagline": "See the world in <em>perfect</em> clarity",
    "heroSubtitle": "Comprehensive eye examinations, designer frames, and contact lens fitting from experienced optometrists.",
    "ctaPrimary": "Book an Eye Test",
    "ctaSecondary": "Browse Frames",
    "ctaNote": "Medical aid accepted \u00b7 Kids welcome \u00b7 Same-week appointments",
    "badge": "South African Optometric Association Member",
    "servicesHeading": "What We Offer",
    "services": [
      {
        "name": "Comprehensive Eye Examinations",
        "description": "Full eye health and vision checks detecting prescription changes, glaucoma, and early conditions.",
        "tags": [
          "Eye Health",
          "Glaucoma Screening"
        ],
        "serviceImageQuery": "optometrist using phoropter refractor lenses patient looking through eye examination chair clinic"
      },
      {
        "name": "Designer Frames & Lenses",
        "description": "Curated selection of designer and independent frames with premium single-vision and varifocal lenses.",
        "tags": [
          "Designer Frames",
          "Varifocals"
        ],
        "serviceImageQuery": "rows of designer eyeglasses frames on illuminated display wall rack optical shop shelves"
      },
      {
        "name": "Contact Lens Fitting",
        "description": "Expert contact lens trials and fittings including daily, monthly, and specialty lenses.",
        "tags": [
          "Contact Lenses",
          "Dry Eye"
        ],
        "serviceImageQuery": "person inserting contact lens on fingertip into eye close-up optometry clinic"
      },
      {
        "name": "Children's Vision Screening",
        "description": "Early detection of lazy eye, squint, and learning-related vision issues in school-age children.",
        "tags": [
          "Paediatric Vision",
          "Screening"
        ],
        "serviceImageQuery": "young child reading eye test chart with optometrist pointing at letters pediatric vision screening"
      }
    ],
    "galleryHeading": "In the Practice",
    "aboutHeading": "Eye care that looks <em>further</em>",
    "aboutText": "We do more than measure your prescription. Our examinations look at your full ocular health \u2014 checking for early signs of glaucoma, macular degeneration, and systemic conditions that show up in the eye.\n\nAnd when it comes to frames, we stock independent designers alongside the brands you know. Looking good isn't secondary.",
    "aboutMission": "We believe great vision care starts with an examination that takes your whole health seriously.",
    "stats": [
      {
        "value": "17+",
        "label": "Years in Eye Care",
        "sublabel": "since 2007"
      },
      {
        "value": "4,500+",
        "label": "Patients in Practice",
        "sublabel": "families & professionals"
      },
      {
        "value": "300+",
        "label": "Frames In Stock",
        "sublabel": "designer & independent"
      },
      {
        "value": "4.8\u2605",
        "label": "Google Rating",
        "sublabel": "from 380+ reviews"
      }
    ],
    "contactHeading": "When did you last have an eye exam?",
    "testimonial": {
      "quote": "Detected early signs of glaucoma that nobody else had spotted. Literally sight-saving.",
      "author": "Raymond F., Verified Client",
      "rating": 5
    },
    "imageMood": "clean, precise, modern",
    "heroImageQuery": "optometrist examining patient through phoropter refractor lenses modern bright eye care clinic equipment",
    "ogImageQuery": "woman trying on eyeglasses frames in modern optometry practice optical shop display",
    "aboutImageQuery": "optometrist using slit lamp biomicroscope examining patient eyes close-up bright clinical room",
    "galleryImageQueries": [
      "modern optical shop eyeglasses frames display wall illuminated shelves glasses rows",
      "optometrist performing slit lamp eye examination patient chin rest biomicroscope clinical",
      "contact lens on fingertip close-up clear daily lens optometry clean",
      "child having eye test optometrist colorful chart letters bright pediatric room"
    ],
    "contactHours": "Mon\u2013Fri: 08:30\u201317:30 \u00b7 Sat: 08:30\u201313:00 \u00b7 By appointment"
  },
  "Hair Salon / Barber": {
    "heroEyebrow": "CAPE TOWN HAIR STUDIO",
    "heroAccent": "Colour specialists & precision cuts",
    "tagline": "Hair that makes you feel like <em>yourself</em>",
    "heroSubtitle": "Expert cuts, colour, and treatments in a salon where the stylists actually listen before they pick up scissors.",
    "ctaPrimary": "Book Online",
    "ctaSecondary": "Meet the Team",
    "ctaNote": "Online booking 24/7 \u00b7 Cancellation up to 4hrs before",
    "badge": "SAAHSP Registered Salon",
    "servicesHeading": "What We Do",
    "services": [
      {
        "name": "Precision Cuts & Styling",
        "description": "Expert cuts for all hair types \u2014 straight, curly, natural, and textured \u2014 with a consultation every time.",
        "tags": [
          "Precision Cut",
          "Natural Hair"
        ],
        "serviceImageQuery": "hairdresser cutting client wet hair with scissors comb precision sectioning salon chair mirror"
      },
      {
        "name": "Colour & Balayage",
        "description": "Full colour, balayage, ombre, and colour correction from experienced colourists using Wella and L'Or\u00e9al.",
        "tags": [
          "Balayage",
          "Colour Correction"
        ],
        "serviceImageQuery": "colorist applying balayage hair colour foils highlights client seated salon chair"
      },
      {
        "name": "Treatments & Keratin",
        "description": "Deep conditioning, Brazilian keratin, and scalp treatments to restore shine and manageability.",
        "tags": [
          "Keratin",
          "Scalp Treatment"
        ],
        "serviceImageQuery": "stylist applying keratin hair treatment flat iron smoothing client hair salon professional"
      },
      {
        "name": "Bridal & Event Styling",
        "description": "Wedding hair, updo styling, and event-ready looks with a trial session and on-location service.",
        "tags": [
          "Bridal Hair",
          "Updo"
        ],
        "serviceImageQuery": "bride getting elegant updo hairstyle flowers pins stylist hands wedding morning preparation"
      }
    ],
    "galleryHeading": "From the Chair",
    "aboutHeading": "Colour crafted. Cuts <em>considered</em>.",
    "aboutText": "We have a strict policy in this salon: no stylist touches your hair until they've had a proper conversation about what you want. That sounds basic. It shouldn't be a differentiator, but it is.\n\nOur team are constantly trained and honestly obsessed with getting it right for each individual client.",
    "aboutMission": "We believe a great haircut or colour can genuinely change how you carry yourself through a day.",
    "stats": [
      {
        "value": "13+",
        "label": "Years Open",
        "sublabel": "since 2011"
      },
      {
        "value": "8",
        "label": "Senior Stylists",
        "sublabel": "all 5+ years experience"
      },
      {
        "value": "600+",
        "label": "Clients Per Month",
        "sublabel": "repeat & new"
      },
      {
        "value": "4.9\u2605",
        "label": "Google Rating",
        "sublabel": "from 900+ reviews"
      }
    ],
    "contactHeading": "Ready to book your next appointment?",
    "testimonial": {
      "quote": "First colour I've ever had that actually looks exactly how I described it. Outstanding.",
      "author": "Vanessa O., Verified Client",
      "rating": 5
    },
    "imageMood": "stylish, warm, creative",
    "heroImageQuery": "stylish hair salon interior styling stations large mirrors warm lighting chairs modern decor",
    "ogImageQuery": "hairdresser styling client hair blow dry brush salon mirror warm lighting professional",
    "aboutImageQuery": "experienced stylist cutting client hair scissors precise technique salon chair mirror warm light",
    "galleryImageQueries": [
      "classic barber chair leather vintage mirror warm lighting barbershop interior",
      "hair colorist applying foil highlights client seated salon chair process",
      "client reclined at salon shampoo basin hair wash relaxing warm water",
      "stylist blow drying client hair round brush finishing salon mirror"
    ],
    "contactHours": "Mon\u2013Fri: 09:00\u201318:00 \u00b7 Sat: 08:30\u201316:00 \u00b7 Sun: 09:00\u201313:00"
  },
  "Beauty Salon / Spa": {
    "heroEyebrow": "CAPE TOWN BEAUTY & SPA",
    "heroAccent": "Over 40 treatments. One space.",
    "tagline": "The hour where everything <em>else</em> disappears",
    "heroSubtitle": "Expert beauty treatments, facial therapies, and full-body spa experiences in an environment designed for deep relaxation.",
    "ctaPrimary": "Book a Treatment",
    "ctaSecondary": "View Menu",
    "ctaNote": "Packages from R550 \u00b7 Gift vouchers available \u00b7 Couples welcome",
    "badge": "SAAHSP Registered Spa",
    "servicesHeading": "Our Treatments",
    "services": [
      {
        "name": "Facial Therapy",
        "description": "Results-driven facials using Environ, Dermalogica, and Cidesco protocols for every skin type.",
        "tags": [
          "Environ",
          "Anti-Ageing"
        ],
        "serviceImageQuery": "aesthetician applying facial treatment mask client lying spa bed warm dim lighting professional"
      },
      {
        "name": "Body Treatments & Wraps",
        "description": "Detoxifying wraps, exfoliation scrubs, and full-body treatments for skin renewal and relaxation.",
        "tags": [
          "Body Wraps",
          "Scrubs"
        ],
        "serviceImageQuery": "therapist applying body scrub exfoliation treatment client lying spa bed towels candles warm"
      },
      {
        "name": "Nails & Waxing",
        "description": "Gel manicures, pedicures, and professional waxing from therapists trained in detail.",
        "tags": [
          "Gel Nails",
          "Waxing"
        ],
        "serviceImageQuery": "nail technician applying gel polish manicure client hands under LED lamp salon close-up"
      },
      {
        "name": "Lash & Brow Artistry",
        "description": "Eyelash extensions, brow lamination, tinting, and microblading for effortlessly defined features.",
        "tags": [
          "Lash Extensions",
          "Brow Lamination"
        ],
        "serviceImageQuery": "lash technician applying individual eyelash extensions tweezers client lying down close-up salon"
      }
    ],
    "galleryHeading": "Your Escape Awaits",
    "aboutHeading": "Beauty that starts with <em>wellbeing</em>",
    "aboutText": "This isn't just a salon. We've built a space where the moment you walk through the door, the outside world becomes genuinely irrelevant. The lighting, the temperature, the quiet \u2014 it's all deliberate.\n\nOur therapists are trained beyond their certificates. They understand skin, they understand stress, and they understand that you deserve to leave better than you arrived.",
    "aboutMission": "We believe true beauty care is also a form of healthcare \u2014 and it deserves to be treated with that seriousness.",
    "stats": [
      {
        "value": "12+",
        "label": "Years in Beauty",
        "sublabel": "since 2012"
      },
      {
        "value": "40+",
        "label": "Treatments Offered",
        "sublabel": "facial, body & nails"
      },
      {
        "value": "10",
        "label": "Treatment Rooms",
        "sublabel": "including couples suite"
      },
      {
        "value": "4.9\u2605",
        "label": "Google Rating",
        "sublabel": "from 1,100+ reviews"
      }
    ],
    "contactHeading": "Ready to book your escape?",
    "testimonial": {
      "quote": "The hot stone massage was transcendent. I floated out of there. Will be back monthly.",
      "author": "Melissa H., Verified Client",
      "rating": 5
    },
    "imageMood": "serene, luxurious, warm",
    "heroImageQuery": "luxury spa treatment room massage bed white towels candles orchids warm ambient dim lighting",
    "ogImageQuery": "woman relaxing during facial treatment spa bed therapist hands skincare serene",
    "aboutImageQuery": "beauty therapist performing facial skincare treatment on client lying spa bed warm ambient professional",
    "galleryImageQueries": [
      "luxury spa reception area flowers candles ambient lighting white marble interior welcoming",
      "woman enjoying pedicure foot spa warm water soak treatment salon relaxing",
      "therapist placing hot stones on client back spa massage treatment warm room",
      "woman hands receiving professional manicure nail polish application salon close-up"
    ],
    "contactHours": "Mon\u2013Sat: 09:00\u201319:00 \u00b7 Sun: 10:00\u201316:00 \u00b7 Evening slots available"
  },
  "Massage Therapist": {
    "heroEyebrow": "THERAPEUTIC MASSAGE CAPE TOWN",
    "heroAccent": "Remedial, sports & relaxation specialists",
    "tagline": "Your body remembers every <em>kindness</em>",
    "heroSubtitle": "Professional massage therapy for stress relief, chronic tension, sports recovery, and structural pain management.",
    "ctaPrimary": "Book a Massage",
    "ctaSecondary": "Types of Massage",
    "ctaNote": "90-min & 60-min available \u00b7 Couples welcome \u00b7 Gift vouchers",
    "badge": "SA Massage Therapy Association Registered",
    "servicesHeading": "Our Treatments",
    "services": [
      {
        "name": "Remedial & Deep Tissue",
        "description": "Targeted deep tissue work to release chronic tension patterns and address postural imbalances.",
        "tags": [
          "Deep Tissue",
          "Remedial"
        ],
        "serviceImageQuery": "massage therapist performing deep tissue massage on client back hands pressing muscles treatment table"
      },
      {
        "name": "Swedish & Relaxation",
        "description": "Full-body relaxation massage using long, flowing strokes to reduce cortisol and restore calm.",
        "tags": [
          "Swedish",
          "Relaxation"
        ],
        "serviceImageQuery": "woman receiving Swedish relaxation massage face down table therapist long strokes back spa dim candles"
      },
      {
        "name": "Sports & Recovery",
        "description": "Pre- and post-event massage for athletes, with specific techniques for recovery and injury prevention.",
        "tags": [
          "Sports Recovery",
          "Athletes"
        ],
        "serviceImageQuery": "sports massage therapist working on athlete leg calf muscle recovery treatment table clinical"
      },
      {
        "name": "Prenatal & Postnatal Massage",
        "description": "Safe, supportive massage for expectant and new mothers — easing tension, swelling, and the demands of pregnancy.",
        "tags": [
          "Prenatal",
          "Postnatal"
        ],
        "serviceImageQuery": "pregnant woman receiving gentle prenatal massage side lying position cushions therapist hands"
      }
    ],
    "galleryHeading": "A Space to Unwind",
    "aboutHeading": "Massage as <em>medicine</em>",
    "aboutText": "Massage is not a luxury \u2014 it's maintenance. We treat it that way. Our therapists are trained in remedial, sports, and relaxation disciplines and are qualified to assess and work with chronic tension and injury.\n\nEvery session begins with a short consultation. We adapt to what your body needs on that specific day.",
    "aboutMission": "We believe regular bodywork is one of the most undervalued investments you can make in your own health.",
    "stats": [
      {
        "value": "10+",
        "label": "Years Practising",
        "sublabel": "since 2014"
      },
      {
        "value": "6",
        "label": "Registered Therapists",
        "sublabel": "remedial & sports trained"
      },
      {
        "value": "400+",
        "label": "Clients Per Month",
        "sublabel": "regular & new"
      },
      {
        "value": "4.9\u2605",
        "label": "Google Rating",
        "sublabel": "from 700+ reviews"
      }
    ],
    "contactHeading": "Ready to give your body the care it deserves?",
    "testimonial": {
      "quote": "Best massage I've ever had, and I've had many. She found tension I didn't know I carried.",
      "author": "Lee-Ann D., Verified Client",
      "rating": 5
    },
    "imageMood": "calm, warm, healing",
    "heroImageQuery": "massage therapist hands working on client shoulders back lying on treatment table warm dim spa candles",
    "ogImageQuery": "professional massage therapist massaging client back shoulders spa treatment table warm lighting",
    "aboutImageQuery": "massage therapist applying pressure to client upper back muscles treatment table warm professional spa room",
    "galleryImageQueries": [
      "massage treatment room white towels folded on table candles essential oil bottles warm ambient light",
      "hot stone massage therapist placing warm basalt stones along client spine back treatment",
      "aromatherapy massage therapist applying essential oil to client back hands warm spa",
      "reflexologist performing foot massage pressing pressure points client relaxing treatment chair"
    ],
    "contactHours": "Mon\u2013Fri: 08:00\u201319:00 \u00b7 Sat: 09:00\u201317:00 \u00b7 By appointment only"
  },
  "Dietitian / Nutritionist": {
    "heroEyebrow": "REGISTERED DIETITIAN CAPE TOWN",
    "heroAccent": "Evidence-based, no fads or gimmicks",
    "tagline": "Food should <em>nourish</em> you \u2014 not stress you",
    "heroSubtitle": "Personalised nutrition counselling for weight, chronic disease, gut health, sports performance, and everything in between.",
    "ctaPrimary": "Book a Consultation",
    "ctaSecondary": "Our Approach",
    "ctaNote": "Medical aid accepted \u00b7 Telehealth available \u00b7 No diet culture",
    "badge": "Association for Dietetics in SA Member",
    "servicesHeading": "What We Help With",
    "services": [
      {
        "name": "Weight & Metabolic Health",
        "description": "Sustainable, medically sound weight management without unsustainable restriction or quick fixes.",
        "tags": [
          "Weight Management",
          "Metabolic"
        ],
        "serviceImageQuery": "dietitian writing personalized meal plan notepad with healthy food items on desk consultation"
      },
      {
        "name": "Chronic Disease Nutrition",
        "description": "Medical nutrition therapy for diabetes, cardiovascular disease, kidney conditions, and cancer support.",
        "tags": [
          "Diabetes Nutrition",
          "Cardiac Diet"
        ],
        "serviceImageQuery": "patient checking blood glucose level finger prick monitor diabetes management nutrition healthcare"
      },
      {
        "name": "Sports & Performance Nutrition",
        "description": "Fuelling strategies for endurance athletes, team sport players, and gym-goers at every level.",
        "tags": [
          "Sports Nutrition",
          "Endurance"
        ],
        "serviceImageQuery": "athlete preparing protein smoothie blender fresh fruit banana berries sports nutrition kitchen"
      },
      {
        "name": "Gut Health & IBS Management",
        "description": "Low-FODMAP guidance, elimination protocols, and gut microbiome support for digestive conditions.",
        "tags": [
          "Gut Health",
          "Low-FODMAP"
        ],
        "serviceImageQuery": "fermented probiotic foods glass jars kefir sauerkraut kimchi yogurt on wooden table gut health"
      }
    ],
    "galleryHeading": "Your Nutrition Journey",
    "aboutHeading": "Nutrition that <em>changes</em> lives",
    "aboutText": "We are registered dietitians, not nutritionists selling supplements. There's a difference, and it matters enormously when someone's health is at stake.\n\nWe work from evidence, not trends. We don't do crash diets, cleanses, or protocols designed to sell products. We do sound, personalised nutrition that you can live with \u2014 for life.",
    "aboutMission": "We believe food should be a source of joy, not anxiety \u2014 and getting the balance right changes everything.",
    "stats": [
      {
        "value": "15+",
        "label": "Years in Practice",
        "sublabel": "since 2009"
      },
      {
        "value": "3,000+",
        "label": "Clients Counselled",
        "sublabel": "across all conditions"
      },
      {
        "value": "4",
        "label": "Registered Dietitians",
        "sublabel": "various specialities"
      },
      {
        "value": "92%",
        "label": "Client Goal Achievement",
        "sublabel": "at 3-month review"
      }
    ],
    "contactHeading": "Ready to get your nutrition sorted?",
    "testimonial": {
      "quote": "First practitioner who didn't just give me a meal plan. She changed my relationship with food.",
      "author": "Kim R., Verified Client",
      "rating": 5
    },
    "imageMood": "fresh, warm, nourishing",
    "heroImageQuery": "colorful fresh healthy food spread on table vegetables fruits salmon avocado grains bright kitchen natural light",
    "ogImageQuery": "registered dietitian in white coat consulting with client healthy food on desk professional office",
    "aboutImageQuery": "dietitian sitting with client at desk discussing nutrition plan food diary healthy foods visible consultation room",
    "galleryImageQueries": [
      "healthy meal prep containers organized colorful vegetables chicken rice balanced portions kitchen counter",
      "dietitian measuring client waist tape body composition assessment consultation room clinical",
      "acai smoothie bowl topped with fresh berries granola seeds chia breakfast bright table",
      "fresh fruit and vegetables colorful produce arranged on kitchen counter healthy eating ingredients"
    ],
    "contactHours": "Mon\u2013Fri: 08:00\u201317:00 \u00b7 Telehealth available evenings \u00b7 By appointment"
  },
  "Psychologist / Therapist": {
    "heroEyebrow": "REGISTERED PSYCHOLOGIST CAPE TOWN",
    "heroAccent": "A confidential space to think clearly",
    "tagline": "The help you <em>deserve</em> has always been here",
    "heroSubtitle": "Compassionate, evidence-based therapy for anxiety, depression, trauma, relationship challenges, and life transitions.",
    "ctaPrimary": "Request an Appointment",
    "ctaSecondary": "How It Works",
    "ctaNote": "Strict confidentiality \u00b7 Medical aid registered \u00b7 Telehealth available",
    "badge": "Health Professions Council SA Registered",
    "servicesHeading": "How We Can Help",
    "services": [
      {
        "name": "Individual Therapy",
        "description": "One-on-one sessions for anxiety, depression, trauma, and personal growth using CBT and other evidence-based methods.",
        "tags": [
          "CBT",
          "Trauma Therapy"
        ],
        "serviceImageQuery": "psychologist office two comfortable armchairs facing each other warm lamp soft lighting therapy conversation room"
      },
      {
        "name": "Couples Therapy",
        "description": "Structured sessions to improve communication, navigate conflict, and rebuild connection in relationships.",
        "tags": [
          "Couples",
          "Relationships"
        ],
        "serviceImageQuery": "couple sitting together on sofa in couples therapy session psychologist office warm professional"
      },
      {
        "name": "Child & Adolescent Therapy",
        "description": "Age-appropriate therapeutic support for children navigating school, family change, and emotional difficulty.",
        "tags": [
          "Child Therapy",
          "Adolescent"
        ],
        "serviceImageQuery": "child playing with toys sand tray in play therapy room colorful art supplies shelves child psychologist"
      },
      {
        "name": "Corporate & Workplace Wellness",
        "description": "EAP sessions, workplace stress debriefings, and organisational wellbeing programmes for businesses.",
        "tags": [
          "EAP",
          "Workplace Wellness"
        ],
        "serviceImageQuery": "group of employees seated in circle chairs corporate wellness workshop facilitator standing office meeting room"
      }
    ],
    "galleryHeading": "A Safe Space",
    "aboutHeading": "Mental health, taken <em>seriously</em>",
    "aboutText": "Asking for help is one of the most courageous things a person can do. We take that seriously. Our therapists are registered with the HPCSA and are committed to providing care that is warm, rigorous, and genuinely client-centred.\n\nYou don't need to be in crisis to benefit from therapy. Many of our most valuable work happens with people who simply want to understand themselves better.",
    "aboutMission": "We believe that everyone deserves access to skilled, compassionate psychological support \u2014 without judgement.",
    "stats": [
      {
        "value": "18+",
        "label": "Years in Practice",
        "sublabel": "since 2006"
      },
      {
        "value": "5",
        "label": "Registered Psychologists",
        "sublabel": "various specialities"
      },
      {
        "value": "1,500+",
        "label": "Clients Supported",
        "sublabel": "across all services"
      },
      {
        "value": "Strict",
        "label": "Confidentiality Policy",
        "sublabel": "HPCSA code of conduct"
      }
    ],
    "contactHeading": "Ready to take the first step?",
    "testimonial": {
      "quote": "Changed my life in eight sessions. The warmth and skill here are exceptional.",
      "author": "Name withheld by request",
      "rating": 5
    },
    "imageMood": "calm, safe, warm",
    "heroImageQuery": "calm psychologist therapy room interior comfortable sofa two armchairs warm table lamp green plants soft natural light",
    "ogImageQuery": "welcoming psychologist office comfortable armchair warm lamp books shelves plants professional therapy room",
    "aboutImageQuery": "psychologist listening attentively to client seated across from each other armchairs warm therapy office empathetic",
    "galleryImageQueries": [
      "psychology practice waiting room comfortable sofa plants soft warm lighting magazines peaceful",
      "person writing in therapy journal reflective pen notebook wooden desk self-care mindfulness",
      "sand tray therapy miniature figures arranged scene child therapy play room colorful",
      "meditation space cushion on floor candle peaceful calm corner mindfulness therapy room"
    ],
    "contactHours": "Mon\u2013Fri: 08:00\u201318:00 \u00b7 Sat: 08:00\u201313:00 \u00b7 Telehealth available"
  },
  "Speech Therapist": {
    "heroEyebrow": "SPEECH THERAPY CAPE TOWN",
    "heroAccent": "Children, adults & voice professionals",
    "tagline": "Every voice <em>deserves</em> to be heard",
    "heroSubtitle": "Expert speech, language, and swallowing therapy for children, adults, and individuals with neurological conditions.",
    "ctaPrimary": "Book an Assessment",
    "ctaSecondary": "Who We Help",
    "ctaNote": "Medical aid accepted \u00b7 School visits available \u00b7 Telehealth sessions",
    "badge": "South African Speech-Language-Hearing Association Member",
    "servicesHeading": "Who We Help",
    "services": [
      {
        "name": "Child Language & Literacy",
        "description": "Assessment and therapy for language delays, reading difficulties, and communication challenges in children.",
        "tags": [
          "Language Delay",
          "Literacy"
        ],
        "serviceImageQuery": "speech therapist showing picture cards to young child seated at table speech language therapy session bright room"
      },
      {
        "name": "Stuttering & Fluency",
        "description": "Evidence-based fluency therapy for children and adults to build confidence and communication ease.",
        "tags": [
          "Fluency",
          "Stuttering"
        ],
        "serviceImageQuery": "speech therapist holding mirror for child practicing mouth sounds articulation exercises therapy table"
      },
      {
        "name": "Voice & Swallowing",
        "description": "Therapy for voice disorders, dysphonia, and dysphagia following neurological events or injury.",
        "tags": [
          "Voice Therapy",
          "Dysphagia"
        ],
        "serviceImageQuery": "speech therapist demonstrating throat swallowing exercise with adult patient voice therapy clinical room"
      },
      {
        "name": "Augmentative & Alternative Communication",
        "description": "AAC device assessment, setup, and training for non-verbal or minimally verbal children and adults.",
        "tags": [
          "AAC",
          "Assistive Technology"
        ],
        "serviceImageQuery": "child using AAC communication tablet device with picture symbols touchscreen speech therapy assistive technology"
      }
    ],
    "galleryHeading": "In the Practice",
    "aboutHeading": "Communication that <em>transforms</em>",
    "aboutText": "Communication underpins everything \u2014 learning, relationships, employment, and confidence. When it's difficult, the effects ripple through every part of a person's life.\n\nOur therapists approach every patient with curiosity, patience, and deep clinical skill. We work collaboratively with schools, doctors, and families to get the best outcomes.",
    "aboutMission": "We believe every person \u2014 regardless of age or diagnosis \u2014 has the right to communicate fully and confidently.",
    "stats": [
      {
        "value": "14+",
        "label": "Years Practising",
        "sublabel": "since 2010"
      },
      {
        "value": "1,800+",
        "label": "Patients Treated",
        "sublabel": "children & adults"
      },
      {
        "value": "4",
        "label": "Registered Therapists",
        "sublabel": "paediatric & adult trained"
      },
      {
        "value": "4.9\u2605",
        "label": "Google Rating",
        "sublabel": "from 200+ reviews"
      }
    ],
    "contactHeading": "Want to book an initial assessment?",
    "testimonial": {
      "quote": "My son's reading improved by two grade levels in one year. The transformation is remarkable.",
      "author": "Helen P., Verified Client",
      "rating": 5
    },
    "imageMood": "warm, professional, encouraging",
    "heroImageQuery": "speech therapist working with young child at colorful table picture cards alphabet posters bright therapy room",
    "ogImageQuery": "speech therapist and child practicing sounds together smiling bright colorful therapy room professional",
    "aboutImageQuery": "speech therapist sitting with child using mirror practicing letter sounds mouth shapes bright therapy room",
    "galleryImageQueries": [
      "colorful speech therapy practice room small table chairs alphabet posters toys educational bright",
      "speech therapy articulation picture cards spread on table letter sounds flashcards colorful",
      "young child looking in mirror practicing mouth shapes sounds speech therapist guiding beside",
      "speech therapist using hand puppet storytelling with child language engagement therapy play session"
    ],
    "contactHours": "Mon\u2013Fri: 08:00\u201317:00 \u00b7 Sat: 08:00\u201312:00 \u00b7 By appointment"
  },
  "Occupational Therapist": {
    "heroEyebrow": "OCCUPATIONAL THERAPY CAPE TOWN",
    "heroAccent": "Enabling independence at every stage",
    "tagline": "Live, work, and play with <em>confidence</em>",
    "heroSubtitle": "Skilled occupational therapy for children's development, neurological rehabilitation, and workplace ergonomics.",
    "ctaPrimary": "Book an Assessment",
    "ctaSecondary": "How OT Works",
    "ctaNote": "Medical aid accepted \u00b7 School-based assessments \u00b7 Home visits available",
    "badge": "Occupational Therapy Association of SA Member",
    "servicesHeading": "What We Do",
    "services": [
      {
        "name": "Paediatric OT & Development",
        "description": "Sensory processing, fine motor, and developmental assessments and therapy for children of all ages.",
        "tags": [
          "Sensory Processing",
          "Fine Motor"
        ],
        "serviceImageQuery": "child on sensory integration swing occupational therapist guiding colorful OT gym climbing equipment"
      },
      {
        "name": "Neurological Rehabilitation",
        "description": "Post-stroke, brain injury, and neurological condition rehabilitation to restore daily function.",
        "tags": [
          "Post-Stroke",
          "Neuro Rehab"
        ],
        "serviceImageQuery": "occupational therapist helping stroke patient practice hand grip exercise daily living task rehabilitation clinic"
      },
      {
        "name": "Ergonomic & Workplace Assessment",
        "description": "Workstation assessments and recommendations to prevent and address occupational injury.",
        "tags": [
          "Ergonomics",
          "Workstation"
        ],
        "serviceImageQuery": "occupational therapist assessing office worker ergonomic workstation desk chair monitor posture adjustment"
      },
      {
        "name": "School Readiness Assessment",
        "description": "Comprehensive assessments for Grade R and Grade 1 readiness covering motor, perceptual, and social skills.",
        "tags": [
          "School Readiness",
          "Perceptual Skills"
        ],
        "serviceImageQuery": "occupational therapist assessing child pencil grip writing shapes worksheet school readiness test table"
      }
    ],
    "galleryHeading": "In the Practice",
    "aboutHeading": "Function restored, <em>life</em> reclaimed",
    "aboutText": "Occupational therapy is about enabling people to do the things that matter to them \u2014 whether that's a child writing confidently, an adult returning to work after injury, or an older person maintaining independence.\n\nWe assess holistically and treat practically. Our focus is always on meaningful functional outcomes.",
    "aboutMission": "We believe the ability to participate fully in your own life is a fundamental right \u2014 and restoring that is our purpose.",
    "stats": [
      {
        "value": "12+",
        "label": "Years in Practice",
        "sublabel": "since 2012"
      },
      {
        "value": "2,000+",
        "label": "Patients Assessed",
        "sublabel": "children & adults"
      },
      {
        "value": "3",
        "label": "Registered OTs",
        "sublabel": "paediatric & adult focus"
      },
      {
        "value": "4.8\u2605",
        "label": "Google Rating",
        "sublabel": "from 180+ reviews"
      }
    ],
    "contactHeading": "Want to book an occupational therapy assessment?",
    "testimonial": {
      "quote": "After stroke, OT gave my husband his independence back. Words cannot express what that means.",
      "author": "Linda M., Verified Client",
      "rating": 5
    },
    "imageMood": "warm, enabling, professional",
    "heroImageQuery": "occupational therapist working with child on sensory activities colorful OT clinic swings mats bright equipment",
    "ogImageQuery": "occupational therapist helping child with fine motor activity at table colorful bright therapy room",
    "aboutImageQuery": "occupational therapist guiding patient through hand exercise daily living task activity bright rehabilitation clinic",
    "galleryImageQueries": [
      "colorful occupational therapy sensory room child on swing ball pit climbing wall bright fun",
      "patient squeezing therapy putty hand grip strengthening exercise occupational therapy close-up",
      "child practicing pencil grip writing exercise occupational therapist guiding hand at table",
      "occupational therapist helping stroke patient in kitchen practicing daily living task pouring water rehabilitation"
    ],
    "contactHours": "Mon\u2013Fri: 08:00\u201317:00 \u00b7 Sat: 08:00\u201312:00 \u00b7 By appointment"
  },
  "Audiologist": {
    "heroEyebrow": "AUDIOLOGY CAPE TOWN",
    "heroAccent": "Hearing aids. Assessments. Real solutions.",
    "tagline": "Reconnect with the sounds that <em>matter</em>",
    "heroSubtitle": "Expert hearing assessments, tinnitus management, and hearing aid fitting from registered audiologists.",
    "ctaPrimary": "Book a Hearing Test",
    "ctaSecondary": "Hearing Aid Options",
    "ctaNote": "Medical aid accepted \u00b7 Free hearing screening \u00b7 Over 60s welcome",
    "badge": "South African Audiology Society Member",
    "servicesHeading": "Our Services",
    "services": [
      {
        "name": "Comprehensive Hearing Assessments",
        "description": "Full diagnostic audiological evaluations for adults and children to establish hearing threshold and health.",
        "tags": [
          "Hearing Test",
          "Diagnostic"
        ],
        "serviceImageQuery": "patient wearing headphones inside soundproof audiometry booth hearing test audiologist operating equipment"
      },
      {
        "name": "Hearing Aid Fitting",
        "description": "Expert fitting of Phonak, Oticon, and Signia hearing aids with trial periods and ongoing adjustment.",
        "tags": [
          "Hearing Aids",
          "Phonak"
        ],
        "serviceImageQuery": "audiologist fitting small hearing aid behind patient ear close-up hands adjusting device clinical"
      },
      {
        "name": "Tinnitus Management",
        "description": "Evidence-based tinnitus assessment and sound therapy programmes to reduce impact on daily life.",
        "tags": [
          "Tinnitus",
          "Sound Therapy"
        ],
        "serviceImageQuery": "audiologist counseling patient about tinnitus sound therapy headphones computer screen display clinical room"
      },
      {
        "name": "Paediatric Hearing Screening",
        "description": "Newborn and early childhood hearing screening using OAE and ABR technology for early intervention.",
        "tags": [
          "Newborn Screening",
          "Early Intervention"
        ],
        "serviceImageQuery": "audiologist performing newborn hearing screening OAE probe in baby ear infant test clinical"
      }
    ],
    "galleryHeading": "Hear Better. Live Better.",
    "aboutHeading": "Hearing care that <em>restores</em>",
    "aboutText": "Hearing loss affects communication, relationships, and cognitive health in ways that are often underestimated. We take it seriously \u2014 and we take the time to ensure that every patient receives the right solution, not just the most expensive one.\n\nOur audiologists are registered and continuously trained on the latest hearing technology.",
    "aboutMission": "We believe hearing well is fundamental to living well \u2014 and everyone deserves access to expert care.",
    "stats": [
      {
        "value": "19+",
        "label": "Years Practising",
        "sublabel": "since 2005"
      },
      {
        "value": "2,500+",
        "label": "Hearing Tests Done",
        "sublabel": "adults & paediatric"
      },
      {
        "value": "5",
        "label": "Hearing Aid Brands",
        "sublabel": "across all price ranges"
      },
      {
        "value": "97%",
        "label": "Patient Satisfaction",
        "sublabel": "from outcome surveys"
      }
    ],
    "contactHeading": "When last did you have a hearing test?",
    "testimonial": {
      "quote": "My father had avoided hearing aids for years. After fitting here, he cried \u2014 he could hear the birds.",
      "author": "Marie O., Verified Client",
      "rating": 5
    },
    "imageMood": "clean, calm, professional",
    "heroImageQuery": "audiologist examining patient ear with otoscope bright modern audiology clinic hearing test equipment visible",
    "ogImageQuery": "audiologist in white coat with patient performing hearing assessment clinical room modern equipment",
    "aboutImageQuery": "audiologist carefully fitting hearing aid behind elderly patient ear close-up warm clinical room",
    "galleryImageQueries": [
      "patient sitting inside soundproof booth headphones hearing test audiometry audiology clinic",
      "display case showing various hearing aid models small devices behind ear in ear clinical",
      "audiologist using otoscope to examine patient ear canal close-up clinical examination",
      "audiogram hearing test results graph displayed on computer screen audiologist reviewing clinical"
    ],
    "contactHours": "Mon\u2013Fri: 08:30\u201317:00 \u00b7 Sat: 08:30\u201312:00 \u00b7 By appointment"
  },
  "Podiatrist": {
    "heroEyebrow": "PODIATRY CAPE TOWN",
    "heroAccent": "Foot pain resolved. Feet back in action.",
    "tagline": "Your feet carry <em>everything</em> \u2014 look after them",
    "heroSubtitle": "Expert podiatric care for foot pain, nail conditions, diabetic feet, and sports-related lower limb concerns.",
    "ctaPrimary": "Book an Appointment",
    "ctaSecondary": "What We Treat",
    "ctaNote": "Medical aid accepted \u00b7 Diabetic foot care specialists",
    "badge": "Allied Health Professions Council SA Registered",
    "servicesHeading": "What We Treat",
    "services": [
      {
        "name": "Foot Pain & Biomechanics",
        "description": "Assessment and treatment of heel pain, plantar fasciitis, flat feet, and gait problems.",
        "tags": [
          "Plantar Fasciitis",
          "Orthotics"
        ],
        "serviceImageQuery": "podiatrist examining patient foot heel plantar fasciitis palpating sole treatment chair clinical room"
      },
      {
        "name": "Nail & Skin Conditions",
        "description": "Ingrown toenails, fungal infections, corns, and callus treatment by qualified podiatrists.",
        "tags": [
          "Ingrown Toenails",
          "Fungal"
        ],
        "serviceImageQuery": "podiatrist treating ingrown toenail with instruments patient foot elevated close-up clinical sterile"
      },
      {
        "name": "Diabetic Foot Care",
        "description": "Specialised regular care and risk assessment for diabetic patients to prevent complications.",
        "tags": [
          "Diabetic Foot",
          "Risk Assessment"
        ],
        "serviceImageQuery": "podiatrist performing diabetic foot screening monofilament sensation test patient foot clinical examination"
      },
      {
        "name": "Custom Orthotics",
        "description": "Precision-moulded orthotics designed from gait analysis data to correct alignment and relieve chronic pain.",
        "tags": [
          "Custom Orthotics",
          "Gait Analysis"
        ],
        "serviceImageQuery": "podiatrist making custom orthotic insole foam mould impression patient foot podiatry clinic"
      }
    ],
    "galleryHeading": "Back on Your Feet",
    "aboutHeading": "Podiatry with <em>expertise</em>",
    "aboutText": "Foot problems are among the most common and most ignored health issues \u2014 people limp through years of discomfort thinking it's normal. It isn't, and it doesn't have to be.\n\nOur podiatrists treat the full range of foot and lower limb conditions with skill and the equipment to match.",
    "aboutMission": "We believe pain-free movement is not a luxury \u2014 it's fundamental to quality of life at every age.",
    "stats": [
      {
        "value": "16+",
        "label": "Years in Practice",
        "sublabel": "since 2008"
      },
      {
        "value": "4,000+",
        "label": "Patients Treated",
        "sublabel": "acute & chronic"
      },
      {
        "value": "3",
        "label": "Registered Podiatrists",
        "sublabel": "all AHPCSA registered"
      },
      {
        "value": "96%",
        "label": "Pain Reduction",
        "sublabel": "at 6-week outcome"
      }
    ],
    "contactHeading": "Foot pain stopping you? Let's sort it.",
    "testimonial": {
      "quote": "Two years of heel pain resolved in four sessions. Why did I wait so long?",
      "author": "Dave L., Verified Client",
      "rating": 5
    },
    "imageMood": "clean, professional, clinical",
    "heroImageQuery": "podiatrist examining patient foot in treatment chair bright modern podiatry clinic instruments visible clean",
    "ogImageQuery": "podiatrist in gloves treating patient foot elevated in treatment chair professional clinical room",
    "aboutImageQuery": "podiatrist carefully examining patient foot sole with gloved hands treatment chair bright clinic room",
    "galleryImageQueries": [
      "modern podiatry treatment room adjustable chair bright lighting instruments tray clinical clean",
      "custom orthotic insoles displayed next to running shoes podiatry clinic fitting",
      "podiatry surgical instruments scalpel nail clippers forceps sterile tray close-up clinical",
      "patient walking on treadmill gait analysis screen podiatrist observing biomechanics assessment"
    ],
    "contactHours": "Mon\u2013Fri: 08:00\u201317:30 \u00b7 Sat: 08:00\u201312:00 \u00b7 By appointment"
  },
  "Alternative / Holistic Health": {
    "heroEyebrow": "HOLISTIC HEALTH CAPE TOWN",
    "heroAccent": "Mind. Body. Spirit. All connected.",
    "tagline": "Healing the whole person, not just the <em>symptom</em>",
    "heroSubtitle": "Integrative health treatments combining traditional wisdom with evidence-informed practice for genuine whole-body wellness.",
    "ctaPrimary": "Book a Consultation",
    "ctaSecondary": "Our Treatments",
    "ctaNote": "First consultation includes full assessment \u00b7 Gift vouchers available",
    "badge": "AHSA Registered Practitioner",
    "servicesHeading": "Our Modalities",
    "services": [
      {
        "name": "Acupuncture & TCM",
        "description": "Traditional Chinese acupuncture for pain, stress, hormonal balance, and chronic health conditions.",
        "tags": [
          "Acupuncture",
          "TCM"
        ],
        "serviceImageQuery": "acupuncture practitioner inserting thin needles into patient back meridian points lying treatment table close-up"
      },
      {
        "name": "Homeopathy & Naturopathy",
        "description": "Personalised constitutional treatment addressing the root causes of illness and imbalance.",
        "tags": [
          "Homeopathy",
          "Naturopathy"
        ],
        "serviceImageQuery": "naturopath consulting with patient herbal tincture bottles lined up on wooden shelf natural remedies clinic"
      },
      {
        "name": "Reflexology & Energy Work",
        "description": "Reflexology, Reiki, and energy therapy for stress relief, relaxation, and subtle body balance.",
        "tags": [
          "Reflexology",
          "Reiki"
        ],
        "serviceImageQuery": "reflexologist pressing pressure points on patient foot sole hands close-up treatment chair holistic clinic"
      },
      {
        "name": "Herbal Medicine & Nutrition",
        "description": "Custom herbal formulations and whole-food nutrition plans addressing inflammation, hormones, and fatigue.",
        "tags": [
          "Herbal Medicine",
          "Nutrition"
        ],
        "serviceImageQuery": "herbalist grinding dried herbs in mortar pestle tincture bottles glass jars natural medicine preparation wooden table"
      }
    ],
    "galleryHeading": "Your Healing Space",
    "aboutHeading": "Whole-body care, <em>deeply</em> held",
    "aboutText": "We believe that health is not merely the absence of disease \u2014 it's a state of active, dynamic balance. Our practitioners combine centuries-old healing traditions with contemporary understanding of the body and mind.\n\nThis is a gentle, thorough, and judgement-free practice. We meet each patient exactly where they are.",
    "aboutMission": "We believe the body has a profound capacity to heal itself \u2014 when it is truly listened to.",
    "stats": [
      {
        "value": "17+",
        "label": "Years in Practice",
        "sublabel": "since 2007"
      },
      {
        "value": "5",
        "label": "Qualified Practitioners",
        "sublabel": "multiple disciplines"
      },
      {
        "value": "2,000+",
        "label": "Patients Treated",
        "sublabel": "acute & chronic"
      },
      {
        "value": "4.8\u2605",
        "label": "Google Rating",
        "sublabel": "from 320+ reviews"
      }
    ],
    "contactHeading": "Ready to take a holistic approach?",
    "testimonial": {
      "quote": "After years of medical dead-ends, acupuncture here finally resolved my chronic migraines.",
      "author": "Yvonne B., Verified Client",
      "rating": 5
    },
    "imageMood": "calm, earthy, healing",
    "heroImageQuery": "holistic health practitioner performing acupuncture on patient lying treatment bed herbs plants natural light calm clinic",
    "ogImageQuery": "holistic health clinic interior herbal medicine jars shelves plants warm natural light peaceful treatment room",
    "aboutImageQuery": "holistic practitioner taking patient pulse wrist reading traditional Chinese medicine consultation desk warm clinic",
    "galleryImageQueries": [
      "acupuncture needles placed along patient back meridian lines lying on treatment table practitioner hands",
      "dried medicinal herbs in labeled glass jars on wooden apothecary shelf holistic clinic display",
      "cupping therapy glass cups placed on patient back creating suction marks treatment table holistic",
      "healing crystals gemstones arranged on treatment table amethyst quartz rose holistic therapy room"
    ],
    "contactHours": "Mon\u2013Fri: 08:00\u201318:00 \u00b7 Sat: 09:00\u201314:00 \u00b7 By appointment"
  },
  "Personal Trainer": {
    "heroEyebrow": "PERSONAL TRAINING CAPE TOWN",
    "heroAccent": "Results-driven. Science-backed.",
    "tagline": "The version of you that you've been <em>planning</em>",
    "heroSubtitle": "Personalised training programmes for fat loss, muscle building, performance, and feeling genuinely strong again.",
    "ctaPrimary": "Book a Free Consult",
    "ctaSecondary": "Our Programmes",
    "ctaNote": "First session free \u00b7 Home, gym & outdoor training available",
    "badge": "REPSSA Registered Personal Trainer",
    "servicesHeading": "How We Train",
    "services": [
      {
        "name": "1-on-1 Personal Training",
        "description": "Fully customised sessions designed around your goals, schedule, and training history \u2014 no generic plans.",
        "tags": [
          "Customised",
          "One-on-One"
        ],
        "serviceImageQuery": "one-on-one training session kettlebell squat gym floor"
      },
      {
        "name": "Online Coaching",
        "description": "Structured remote coaching with weekly check-ins, programming, and nutrition guidance.",
        "tags": [
          "Online Coaching",
          "Remote"
        ],
        "serviceImageQuery": "online coaching app workout plan phone screen tracking"
      },
      {
        "name": "Body Transformation",
        "description": "12-week transformation programmes combining training, nutrition, and accountability coaching.",
        "tags": [
          "12-Week",
          "Body Composition"
        ],
        "serviceImageQuery": "gym equipment weights dumbbells fitness studio professional"
      },
      {
        "name": "Small Group Training",
        "description": "High-energy sessions of 4–6 people combining strength and conditioning at a fraction of the one-on-one price.",
        "tags": [
          "Small Group",
          "Strength & Conditioning"
        ],
        "serviceImageQuery": "small group training kettlebell circuit barbell gym floor"
      }
    ],
    "galleryHeading": "Clients in Action",
    "aboutHeading": "Training that <em>works</em> for your life",
    "aboutText": "There is no such thing as a one-size-fits-all programme. We build everything around you \u2014 your goals, your schedule, your injuries, and what you actually enjoy doing.\n\nWe track, we adjust, and we hold you accountable without making it miserable. That's how results stick.",
    "aboutMission": "We believe the best training programme is the one you'll actually follow \u2014 built around your real life.",
    "stats": [
      {
        "value": "10+",
        "label": "Years Coaching",
        "sublabel": "since 2014"
      },
      {
        "value": "400+",
        "label": "Clients Trained",
        "sublabel": "all fitness levels"
      },
      {
        "value": "92%",
        "label": "12-Week Goal Achievement",
        "sublabel": "from client surveys"
      },
      {
        "value": "4.9\u2605",
        "label": "Google Rating",
        "sublabel": "from 300+ reviews"
      }
    ],
    "contactHeading": "Ready to book your free first session?",
    "testimonial": {
      "quote": "Lost 18kg in 5 months and kept it off for two years. This trainer changed my life.",
      "author": "Alicia F., Verified Client",
      "rating": 5
    },
    "imageMood": "energetic, motivating, dynamic",
    "heroImageQuery": "personal trainer coaching client barbell squat rack modern gym bright lights mirrors",
    "ogImageQuery": "personal trainer guiding client through exercise gym session bright modern",
    "aboutImageQuery": "personal trainer correcting client squat form hands-on coaching gym floor weights",
    "galleryImageQueries": [
      "client doing kettlebell swings personal training session gym floor bright lights",
      "woman doing barbell deadlift personal trainer spotting gym mirrors weights",
      "small group outdoor bootcamp training park pushups green grass sunny",
      "athlete stretching foam roller cool down gym floor after workout session"
    ],
    "contactHours": "Mon\u2013Fri: 06:00\u201319:00 \u00b7 Sat: 07:00\u201314:00 \u00b7 By appointment"
  },
  "Yoga Studio": {
    "heroEyebrow": "YOGA STUDIO CAPE TOWN",
    "heroAccent": "All bodies. All levels. All welcome.",
    "tagline": "Find your strength. Find your <em>stillness</em>.",
    "heroSubtitle": "Dynamic vinyasa, restorative yin, and breathwork classes in a space designed to quiet the noise of the day.",
    "ctaPrimary": "Book a Class",
    "ctaSecondary": "View Timetable",
    "ctaNote": "First class free \u00b7 Mats provided \u00b7 Beginners always welcome",
    "badge": "Yoga Alliance Registered Studio (RYS 200)",
    "servicesHeading": "Our Classes",
    "services": [
      {
        "name": "Vinyasa & Power Yoga",
        "description": "Dynamic flow classes building strength, flexibility, and breath awareness for all levels.",
        "tags": [
          "Vinyasa",
          "Power Yoga"
        ],
        "serviceImageQuery": "vinyasa flow class group warrior pose mats studio"
      },
      {
        "name": "Yin & Restorative Yoga",
        "description": "Slow, meditative practices targeting the connective tissues and nervous system restoration.",
        "tags": [
          "Yin Yoga",
          "Restorative"
        ],
        "serviceImageQuery": "yin yoga restorative class person lying bolster supported pose dim studio blankets props"
      },
      {
        "name": "Yoga Teacher Training",
        "description": "Internationally recognised 200-hour teacher training programmes for aspiring yoga instructors.",
        "tags": [
          "Teacher Training",
          "200hr"
        ],
        "serviceImageQuery": "yoga teacher training instructor demonstrating pose to students seated circle studio mats"
      },
      {
        "name": "Prenatal & Postnatal Yoga",
        "description": "Safe, nurturing classes designed specifically for expectant and new mothers at every trimester.",
        "tags": [
          "Prenatal Yoga",
          "Postnatal"
        ],
        "serviceImageQuery": "prenatal yoga class bolsters blankets gentle supported poses"
      }
    ],
    "galleryHeading": "In the Studio",
    "aboutHeading": "Yoga as a <em>practice</em>, not a performance",
    "aboutText": "Our studio was built for the people who've always wanted to try yoga but thought they weren't flexible enough, young enough, or bendy enough. You are exactly who we're for.\n\nOur teachers are registered, experienced, and passionate about making yoga accessible to everyone who walks through the door.",
    "aboutMission": "We believe yoga is not about what your body looks like in a pose \u2014 it's about what you discover in the trying.",
    "stats": [
      {
        "value": "11+",
        "label": "Years Open",
        "sublabel": "since 2013"
      },
      {
        "value": "25+",
        "label": "Classes Weekly",
        "sublabel": "all styles & levels"
      },
      {
        "value": "600+",
        "label": "Members",
        "sublabel": "regular & casual"
      },
      {
        "value": "4.9\u2605",
        "label": "Google Rating",
        "sublabel": "from 500+ reviews"
      }
    ],
    "contactHeading": "Ready to step on the mat?",
    "testimonial": {
      "quote": "I came for flexibility. I stayed for the community. This studio is something special.",
      "author": "Jess W., Verified Client",
      "rating": 5
    },
    "imageMood": "calm, warm, natural light",
    "heroImageQuery": "yoga class group warrior two pose bright airy studio wooden floor natural light large windows",
    "ogImageQuery": "yoga class group pose bright studio wooden floor mats natural light",
    "aboutImageQuery": "yoga instructor adjusting student downward dog pose hands-on studio warm light",
    "galleryImageQueries": [
      "bright yoga studio interior mats blocks bolsters props wooden floor natural light",
      "group yoga class downward dog pose students mats studio mirrors",
      "woman seated meditation cushion eyes closed candles incense calm studio",
      "woman headstand inversion pose yoga studio wall support wooden floor"
    ],
    "contactHours": "Mon\u2013Fri: 06:00\u201320:00 \u00b7 Sat: 07:00\u201315:00 \u00b7 Sun: 08:00\u201313:00"
  },
  "Gym / Fitness Centre": {
    "heroEyebrow": "CAPE TOWN FITNESS CENTRE",
    "heroAccent": "No contracts. No ego. Just results.",
    "tagline": "Train harder. Recover smarter. Repeat <em>consistently</em>.",
    "heroSubtitle": "A fully equipped gym with expert trainers, group fitness classes, and a culture that makes you want to show up.",
    "ctaPrimary": "Get a Day Pass",
    "ctaSecondary": "Membership Options",
    "ctaNote": "No lock-in contracts \u00b7 Guest passes available \u00b7 Free assessment included",
    "badge": "Biokineticists on Staff",
    "servicesHeading": "What We Offer",
    "services": [
      {
        "name": "Gym Floor & Equipment",
        "description": "Free weights, cable machines, cardio equipment, and a lifting platform maintained to professional standards.",
        "tags": [
          "Free Weights",
          "Cardio"
        ],
        "serviceImageQuery": "man lifting heavy barbell squat rack commercial gym weights"
      },
      {
        "name": "Group Fitness Classes",
        "description": "HIIT, cycling, boxing, and strength classes led by qualified instructors every day of the week.",
        "tags": [
          "HIIT",
          "Cycling"
        ],
        "serviceImageQuery": "group fitness class women exercising aerobics bright studio instructor"
      },
      {
        "name": "Personal Training & Biokinetics",
        "description": "Gym-based personal training and biokinetic rehabilitation sessions from certified professionals.",
        "tags": [
          "Personal Training",
          "Biokinetics"
        ],
        "serviceImageQuery": "personal trainer spotting client bench press gym session"
      },
      {
        "name": "Recovery & Wellness Zone",
        "description": "Sauna, cold plunge, foam rolling stations, and stretching area for serious post-workout recovery.",
        "tags": [
          "Sauna",
          "Cold Plunge"
        ],
        "serviceImageQuery": "wooden sauna interior hot stones steam dim lighting relaxation"
      }
    ],
    "galleryHeading": "In the Gym",
    "aboutHeading": "A gym you'll actually <em>love</em>",
    "aboutText": "We built this gym because we wanted a space that felt serious without feeling intimidating. The equipment is premium. The floors are clean. The coaches actually watch your form.\n\nNo contracts, no pushy upsells, no vibe that makes beginners feel unwelcome. Just a great facility and a genuinely good community.",
    "aboutMission": "We believe a gym should be the best part of your day \u2014 not something you dread.",
    "stats": [
      {
        "value": "8+",
        "label": "Years Open",
        "sublabel": "since 2016"
      },
      {
        "value": "1,200+",
        "label": "Active Members",
        "sublabel": "across memberships"
      },
      {
        "value": "30+",
        "label": "Group Classes Weekly",
        "sublabel": "included in membership"
      },
      {
        "value": "4.8\u2605",
        "label": "Google Rating",
        "sublabel": "from 700+ reviews"
      }
    ],
    "contactHeading": "Want to try us out first?",
    "testimonial": {
      "quote": "Finally a gym where the staff actually greet you and the equipment is always clean.",
      "author": "Damon L., Verified Client",
      "rating": 5
    },
    "imageMood": "energetic, clean, motivating",
    "heroImageQuery": "athletic man lifting heavy barbell deadlift gym dark dramatic lighting intense workout",
    "ogImageQuery": "woman running on treadmill gym bright modern fitness training cardio",
    "aboutImageQuery": "happy woman exercising gym weights training fitness smile",
    "galleryImageQueries": [
      "muscular man doing pull ups gym bar back muscles dark lighting",
      "women running on treadmills row bright modern gym cardio workout",
      "group fitness class people doing burpees gym studio instructor leading",
      "man and woman high fiving after workout gym floor happy sweaty"
    ],
    "contactHours": "Mon\u2013Fri: 05:30\u201321:00 \u00b7 Sat: 07:00\u201318:00 \u00b7 Sun: 08:00\u201314:00"
  },
  "Martial Arts": {
    "heroEyebrow": "MARTIAL ARTS CAPE TOWN",
    "heroAccent": "BJJ, Muay Thai & MMA under one roof",
    "tagline": "Discipline that follows you <em>everywhere</em>",
    "heroSubtitle": "Expert-led martial arts classes for self-defence, fitness, competition, and the mental strength that comes with training.",
    "ctaPrimary": "Book a Free Trial",
    "ctaSecondary": "Our Classes",
    "ctaNote": "First class free \u00b7 All ages from 5 years \u00b7 No experience needed",
    "badge": "SAMA Registered Instructors",
    "servicesHeading": "Our Disciplines",
    "services": [
      {
        "name": "Brazilian Jiu-Jitsu",
        "description": "Gi and no-gi BJJ classes from beginner to competition level taught by qualified black belt instructors.",
        "tags": [
          "BJJ",
          "Grappling"
        ],
        "serviceImageQuery": "brazilian jiu-jitsu grappling gi rolling mats sparring"
      },
      {
        "name": "Muay Thai & Kickboxing",
        "description": "Technical striking classes building pad work, clinch, and ring confidence for all levels.",
        "tags": [
          "Muay Thai",
          "Striking"
        ],
        "serviceImageQuery": "muay thai fighter throwing roundhouse kick pads trainer gym ring action shot"
      },
      {
        "name": "Kids Martial Arts",
        "description": "Age-specific classes building focus, confidence, and respect in children from 5 to 15 years.",
        "tags": [
          "Kids Classes",
          "Confidence"
        ],
        "serviceImageQuery": "children martial arts class kids in white gi uniforms bowing on dojo mats instructor"
      },
      {
        "name": "Self-Defence Workshops",
        "description": "Practical self-defence workshops for adults and teens — real-world techniques taught in a safe, controlled setting.",
        "tags": [
          "Self-Defence",
          "Women's Safety"
        ],
        "serviceImageQuery": "self-defence workshop arm grab escape technique demonstration"
      }
    ],
    "galleryHeading": "On the Mats",
    "aboutHeading": "Martial arts that <em>builds</em> character",
    "aboutText": "We have trained champions and complete beginners with equal care. The mats are a great equaliser \u2014 everyone taps, everyone struggles, everyone grows.\n\nOur instructors are experienced competitors and dedicated coaches who understand that most students aren't here to fight \u2014 they're here to become better versions of themselves.",
    "aboutMission": "We believe martial arts training is one of the most complete personal development tools a person can undertake.",
    "stats": [
      {
        "value": "14+",
        "label": "Years Open",
        "sublabel": "since 2010"
      },
      {
        "value": "300+",
        "label": "Active Students",
        "sublabel": "kids & adults"
      },
      {
        "value": "8",
        "label": "Qualified Instructors",
        "sublabel": "across all disciplines"
      },
      {
        "value": "40+",
        "label": "Competition Medals",
        "sublabel": "national & regional"
      }
    ],
    "contactHeading": "Ready to try your first class?",
    "testimonial": {
      "quote": "My confidence changed completely after six months. It's not just fighting \u2014 it's a mindset.",
      "author": "Chris B., Verified Client",
      "rating": 5
    },
    "imageMood": "intense, disciplined, powerful",
    "heroImageQuery": "martial arts dojo interior students training on mats heavy bags mirrors bright gym",
    "ogImageQuery": "martial arts class students sparring on mats dojo gym bright",
    "aboutImageQuery": "martial arts instructor demonstrating kick technique to students dojo mats training",
    "galleryImageQueries": [
      "martial arts students training dojo floor mats heavy bags wall mirrors bright gym",
      "brazilian jiu-jitsu grappling sparring on mats close-up two athletes gi",
      "muay thai kickboxing pad work knee strike gloves training gym ring",
      "children martial arts class kids in white uniforms drilling kicks pads dojo"
    ],
    "contactHours": "Mon\u2013Fri: 09:00\u201320:30 \u00b7 Sat: 08:00\u201314:00 \u00b7 Class times on schedule"
  },
  "Dance Studio": {
    "heroEyebrow": "DANCE STUDIO CAPE TOWN",
    "heroAccent": "Latin, ballroom, contemporary & jazz",
    "tagline": "Move your body like you've stopped <em>caring</em> who's watching",
    "heroSubtitle": "Professional dance tuition for all ages and levels \u2014 from beginner social dancing to competition-level training.",
    "ctaPrimary": "Book a Trial Class",
    "ctaSecondary": "Class Schedule",
    "ctaNote": "First class free \u00b7 No partner needed \u00b7 Adults & children welcome",
    "badge": "BATD Registered Dance Studio",
    "servicesHeading": "What We Teach",
    "services": [
      {
        "name": "Latin & Ballroom",
        "description": "Salsa, bachata, tango, and ballroom classes for social dancers and competitive couples at all levels.",
        "tags": [
          "Salsa",
          "Ballroom"
        ],
        "serviceImageQuery": "salsa latin dance partners spin studio warm lighting"
      },
      {
        "name": "Contemporary & Jazz",
        "description": "Contemporary, jazz, and hip-hop classes taught by professional dancers for technique and expression.",
        "tags": [
          "Contemporary",
          "Jazz"
        ],
        "serviceImageQuery": "contemporary jazz dance class students performing floor work studio bright mirrors"
      },
      {
        "name": "Children's Dance",
        "description": "Age-specific ballet, jazz, and creative movement classes for children from 3 to 17 years.",
        "tags": [
          "Ballet",
          "Children"
        ],
        "serviceImageQuery": "young children ballet class tutus at barre studio mirrors pink leotards"
      },
      {
        "name": "Wedding & First Dance Coaching",
        "description": "Private choreography sessions to prepare couples for their wedding first dance — any song, any style.",
        "tags": [
          "Wedding Dance",
          "Choreography"
        ],
        "serviceImageQuery": "wedding first dance choreography couple waltz studio rehearsal"
      }
    ],
    "galleryHeading": "In the Studio",
    "aboutHeading": "Dance as <em>joy</em>, not just technique",
    "aboutText": "We believe dance belongs to everyone \u2014 not just the naturally gifted or the highly trained. Our studio is built around the idea that learning to move is a gift you give yourself, at any age.\n\nOur teachers bring serious training and genuine warmth. Every class ends with people smiling.",
    "aboutMission": "We believe there is no better expression of freedom than a body that has learned to move with intention.",
    "stats": [
      {
        "value": "12+",
        "label": "Years Teaching",
        "sublabel": "since 2012"
      },
      {
        "value": "500+",
        "label": "Students Per Term",
        "sublabel": "kids & adults"
      },
      {
        "value": "15+",
        "label": "Class Styles",
        "sublabel": "across all levels"
      },
      {
        "value": "4.9\u2605",
        "label": "Google Rating",
        "sublabel": "from 400+ reviews"
      }
    ],
    "contactHeading": "Want to book your first class?",
    "testimonial": {
      "quote": "Took my first adult ballet class at 43. The best decision I've made in years.",
      "author": "Sandra K., Verified Client",
      "rating": 5
    },
    "imageMood": "expressive, warm, energetic",
    "heroImageQuery": "dancers in studio rehearsal mirror barre wooden floor bright spacious movement",
    "ogImageQuery": "dance class students practising in bright studio mirror barre wooden floor",
    "aboutImageQuery": "dance instructor teaching choreography to students in studio mirror warm lighting",
    "galleryImageQueries": [
      "ballet dancers practising at barre in bright studio mirror spotlights wooden floor",
      "ballet dancer pointe shoes relevé at barre close-up studio practice",
      "hip hop dance class students performing moves in studio bright energy",
      "latin ballroom dance couple tango hold in studio elegant lighting"
    ],
    "contactHours": "Mon\u2013Fri: 09:00\u201320:00 \u00b7 Sat: 08:00\u201316:00 \u00b7 Class schedule on website"
  },
  "Swimming / Aquatics": {
    "heroEyebrow": "SWIM SCHOOL CAPE TOWN",
    "heroAccent": "Infants to competitive swimmers",
    "tagline": "Water confidence that <em>lasts</em> a lifetime",
    "heroSubtitle": "Expert swimming lessons, squad training, and water safety programmes for babies, children, and adults.",
    "ctaPrimary": "Enrol Now",
    "ctaSecondary": "Our Programmes",
    "ctaNote": "Heated pool \u00b7 Small class sizes \u00b7 Sibling discounts",
    "badge": "ASASA Affiliated Swim School",
    "servicesHeading": "Our Programmes",
    "services": [
      {
        "name": "Learn-to-Swim (Ages 1\u201312)",
        "description": "Progressive learn-to-swim lessons from water confidence to independent stroke swimming.",
        "tags": [
          "Learn to Swim",
          "Water Safety"
        ],
        "serviceImageQuery": "young child swimming lesson with instructor in pool kickboard water splashing bright"
      },
      {
        "name": "Adult Swimming Lessons",
        "description": "Non-judgmental adult lessons for total beginners and those improving stroke technique.",
        "tags": [
          "Adult Lessons",
          "Beginner"
        ],
        "serviceImageQuery": "adult swimming lesson stroke technique lane pool goggles"
      },
      {
        "name": "Competitive Squad Training",
        "description": "Structured squad training for gaala swimmers and competitive athletes by qualified coaches.",
        "tags": [
          "Squad Training",
          "Competition"
        ],
        "serviceImageQuery": "competitive swimmers racing freestyle stroke indoor pool lanes splashing water action"
      },
      {
        "name": "Aqua Fitness & Rehabilitation",
        "description": "Low-impact water-based fitness and rehabilitation classes ideal for injury recovery and older adults.",
        "tags": [
          "Aqua Fitness",
          "Rehabilitation"
        ],
        "serviceImageQuery": "aqua fitness water aerobics noodles pool exercise class"
      }
    ],
    "galleryHeading": "In the Pool",
    "aboutHeading": "Swim safely. Swim <em>confidently</em>.",
    "aboutText": "Water safety is not optional \u2014 it's a life skill. We have been teaching Cape Town children to swim since 2007, and we approach every child with the patience and method their specific learning style requires.\n\nSmall classes, heated pool, qualified coaches. The results speak for themselves.",
    "aboutMission": "We believe every child in a water-surrounded country like South Africa deserves to feel safe and confident in water.",
    "stats": [
      {
        "value": "17+",
        "label": "Years Teaching",
        "sublabel": "since 2007"
      },
      {
        "value": "800+",
        "label": "Swimmers Per Term",
        "sublabel": "across all levels"
      },
      {
        "value": "4:1",
        "label": "Student-to-Coach Ratio",
        "sublabel": "learn-to-swim classes"
      },
      {
        "value": "98%",
        "label": "Parent Satisfaction",
        "sublabel": "from term-end surveys"
      }
    ],
    "contactHeading": "Ready to enrol your child?",
    "testimonial": {
      "quote": "My terrified 4-year-old loves swimming now. The coaches are endlessly patient.",
      "author": "Tamaryn J., Verified Client",
      "rating": 5
    },
    "imageMood": "fresh, bright, aquatic",
    "heroImageQuery": "bright indoor swimming pool blue water lane ropes overhead view clean modern facility",
    "ogImageQuery": "indoor swimming pool lanes blue water bright clean overhead modern facility",
    "aboutImageQuery": "swimming coach in water teaching young child stroke technique pool lesson",
    "galleryImageQueries": [
      "swimmer underwater view blue pool lane lines freestyle stroke action",
      "competitive swimmer diving off starting blocks splash indoor pool race",
      "toddler baby swimming lesson parent holding child warm indoor pool instructor",
      "aqua aerobics fitness class group exercising in pool with noodles bright"
    ],
    "contactHours": "Mon\u2013Fri: 06:00\u201319:00 \u00b7 Sat: 07:00\u201314:00 \u00b7 Sun: 08:00\u201312:00"
  },
  "Golf Coach / Pro Shop": {
    "heroEyebrow": "GOLF COACHING CAPE TOWN",
    "heroAccent": "PGA-qualified coaches. Launch monitor fitting.",
    "tagline": "Lower your score. Enjoy the game <em>more</em>.",
    "heroSubtitle": "Professional golf coaching, club fitting, and equipment from PGA-qualified instructors on-course and in the simulator.",
    "ctaPrimary": "Book a Lesson",
    "ctaSecondary": "Club Fitting",
    "ctaNote": "All handicaps welcome \u00b7 Gift vouchers available \u00b7 Simulator sessions",
    "badge": "PGA of South Africa Registered Professional",
    "servicesHeading": "What We Offer",
    "services": [
      {
        "name": "Golf Lessons & Coaching",
        "description": "Individual and group coaching for beginners to scratch golfers, using video analysis and launch data.",
        "tags": [
          "Golf Lessons",
          "Video Analysis"
        ],
        "serviceImageQuery": "golf swing lesson driving range tee shot instruction"
      },
      {
        "name": "Club Fitting",
        "description": "Custom club fitting using Trackman launch monitor data to optimise length, loft, and shaft flex.",
        "tags": [
          "Club Fitting",
          "Trackman"
        ],
        "serviceImageQuery": "golf club fitting bay person hitting ball launch monitor screen trackman indoor professional"
      },
      {
        "name": "Pro Shop & Equipment",
        "description": "Curated pro shop stocking Titleist, TaylorMade, and Callaway equipment and apparel.",
        "tags": [
          "Pro Shop",
          "Titleist"
        ],
        "serviceImageQuery": "golf pro shop interior display racks golf clubs bags shoes apparel merchandise bright"
      },
      {
        "name": "Short Game & Putting Clinics",
        "description": "Focused clinics on chipping, pitching, and putting — where most golfers lose the most strokes.",
        "tags": [
          "Short Game",
          "Putting"
        ],
        "serviceImageQuery": "golf putting green practice short game chipping flag hole"
      }
    ],
    "galleryHeading": "On the Range",
    "aboutHeading": "Golf played with <em>purpose</em>",
    "aboutText": "We have been coaching golfers at every level for over two decades. The biggest improvement most amateurs make isn't about talent \u2014 it's about correct fundamentals, practised consistently.\n\nOur coaches explain the why behind every change. We want you to understand your own swing.",
    "aboutMission": "We believe golf is best enjoyed by players who understand what they're doing and why it works.",
    "stats": [
      {
        "value": "20+",
        "label": "Years Coaching",
        "sublabel": "since 2004"
      },
      {
        "value": "1,500+",
        "label": "Students Coached",
        "sublabel": "beginners to scratch"
      },
      {
        "value": "4",
        "label": "PGA Professionals",
        "sublabel": "coaching & fitting"
      },
      {
        "value": "8",
        "label": "Average Handicap Drop",
        "sublabel": "in 3-month programme"
      }
    ],
    "contactHeading": "Ready to book your first lesson?",
    "testimonial": {
      "quote": "Dropped 6 shots in 8 lessons. The video analysis showed me things I'd never seen.",
      "author": "Neil G., Verified Client",
      "rating": 5
    },
    "imageMood": "green, classic, precision",
    "heroImageQuery": "golfer mid-swing driving range green fairway tee shot scenic course background",
    "ogImageQuery": "golfer teeing off driving range green fairway scenic course",
    "aboutImageQuery": "golf coach watching student swing technique driving range lesson one-on-one instruction",
    "galleryImageQueries": [
      "golf course aerial view fairway bunker green scenic landscape trees",
      "golf ball on tee close-up driver club grass morning dew sunrise",
      "golf club fitting session launch monitor screen data indoor bay professional",
      "golfer putting practice green hole flag pin short game close-up"
    ],
    "contactHours": "Mon\u2013Sun: 07:00\u201318:00 \u00b7 Lessons by appointment \u00b7 Pro shop open daily"
  },
  "Sports Coaching": {
    "heroEyebrow": "SPORTS COACHING CAPE TOWN",
    "heroAccent": "Multi-sport. Youth & adult programmes.",
    "tagline": "Coaching that builds more than <em>athletes</em>",
    "heroSubtitle": "Professional sports coaching across multiple disciplines \u2014 developing technique, fitness, and the mindset to compete.",
    "ctaPrimary": "Enquire Now",
    "ctaSecondary": "Our Programmes",
    "ctaNote": "School holiday camps available \u00b7 Group & individual sessions",
    "badge": "Sport and Recreation SA Accredited",
    "servicesHeading": "What We Coach",
    "services": [
      {
        "name": "Youth Sport Development",
        "description": "Multi-sport development programmes for ages 6\u201318 building fundamental movement skills and love of sport.",
        "tags": [
          "Youth Sport",
          "Multi-Sport"
        ],
        "serviceImageQuery": "youth multi-sport training field agility cones ladder drills"
      },
      {
        "name": "Individual Performance Coaching",
        "description": "Personalised coaching for competitive athletes looking to improve technique and tactical decision-making.",
        "tags": [
          "Performance",
          "Competitive"
        ],
        "serviceImageQuery": "athlete sprinting training on track starting blocks coach watching field action"
      },
      {
        "name": "School Holiday Camps",
        "description": "Structured multi-sport holiday camps for children combining fitness, fun, and foundational skill development.",
        "tags": [
          "Holiday Camps",
          "Skills"
        ],
        "serviceImageQuery": "children playing sports at holiday camp outdoor field running games group fun sunny"
      },
      {
        "name": "Strength & Conditioning Programmes",
        "description": "Periodised S&C programmes designed to complement sport-specific training and reduce injury risk.",
        "tags": [
          "Strength & Conditioning",
          "Injury Prevention"
        ],
        "serviceImageQuery": "athlete strength conditioning barbell squat rack gym weights training session professional"
      }
    ],
    "galleryHeading": "In Action",
    "aboutHeading": "Coaches who <em>inspire</em>",
    "aboutText": "We believe great coaching changes lives. Not just on the field \u2014 in the way young people learn to handle setbacks, work in teams, and develop the resilience that carries them far beyond sport.\n\nOur coaches are qualified, passionate, and committed to getting the best out of every athlete we work with.",
    "aboutMission": "We believe sport is one of the finest teachers a child can have \u2014 if coached by the right people.",
    "stats": [
      {
        "value": "12+",
        "label": "Years Coaching",
        "sublabel": "since 2012"
      },
      {
        "value": "1,000+",
        "label": "Young Athletes",
        "sublabel": "through our programmes"
      },
      {
        "value": "8",
        "label": "Qualified Coaches",
        "sublabel": "across disciplines"
      },
      {
        "value": "4.8\u2605",
        "label": "Google Rating",
        "sublabel": "from 250+ reviews"
      }
    ],
    "contactHeading": "Want to enrol your child or athlete?",
    "testimonial": {
      "quote": "My son found his confidence on the field and off it. Exceptional coaching team.",
      "author": "Mary T., Verified Client",
      "rating": 5
    },
    "imageMood": "active, outdoor, energetic",
    "heroImageQuery": "sports coaching session athletes training on green field cones agility drills outdoor sunny",
    "ogImageQuery": "coach training young athletes on sports field agility cones drills outdoor",
    "aboutImageQuery": "sports coach demonstrating technique to young athletes on field training session action",
    "galleryImageQueries": [
      "athletes running agility cone ladder drills on sports field outdoor training",
      "coach demonstrating throwing technique to athlete on field one-on-one close-up",
      "youth sports team huddle on field strategy discussion with coach outdoor",
      "children running relay race at sports holiday camp outdoor field sunny"
    ],
    "contactHours": "Mon\u2013Fri: 07:00\u201319:00 \u00b7 Sat: 07:00\u201314:00 \u00b7 Holiday camps seasonal"
  },
  "Dog Groomer": {
    "heroEyebrow": "DOG GROOMING CAPE TOWN",
    "heroAccent": "Stress-free grooming. Happy dogs.",
    "tagline": "Your dog, looking their absolute <em>best</em>",
    "heroSubtitle": "Professional dog grooming with patient, experienced groomers who understand anxious dogs and specific breed requirements.",
    "ctaPrimary": "Book a Groom",
    "ctaSecondary": "Our Services",
    "ctaNote": "Breed specialists \u00b7 Anxiety-friendly \u00b7 All sizes welcome",
    "badge": "SAPPSA Registered Groomer",
    "servicesHeading": "What We Offer",
    "services": [
      {
        "name": "Full Groom",
        "description": "Breed-specific bath, dry, clip, and styling \u2014 looking show-ready without the show stress.",
        "tags": [
          "Full Groom",
          "Breed Specific"
        ],
        "serviceImageQuery": "dog bath grooming tub shampoo wash"
      },
      {
        "name": "Bath & Brush",
        "description": "Thorough bath, blow-dry, brush-out, and ear cleaning for dogs between full grooms.",
        "tags": [
          "Bath & Brush",
          "De-shed"
        ],
        "serviceImageQuery": "dog blow dry brushing fluffy coat grooming table professional"
      },
      {
        "name": "Puppy's First Groom",
        "description": "Gentle, positive first grooming experiences to socialise puppies to the grooming process.",
        "tags": [
          "Puppy Groom",
          "First Visit"
        ],
        "serviceImageQuery": "cute puppy first grooming session gentle handling table"
      },
      {
        "name": "Teeth Cleaning & Oral Care",
        "description": "Non-anaesthetic teeth cleaning, breath treatment, and gum health checks to keep those chompers in top shape.",
        "tags": [
          "Dental",
          "Oral Care"
        ],
        "serviceImageQuery": "dog teeth clean white dental hygiene close-up mouth"
      },
          {
              "name": "Breed-Specific Styling",
              "description": "Poodle clips, Schnauzer trims, and breed-standard cuts by groomers who know your dog's coat type.",
              "tags": [
                  "Breed Cuts",
                  "Styling"
              ],
              "serviceImageQuery": "poodle grooming breed specific cut professional groomer"
          },
          {
              "name": "De-Shedding Treatment",
              "description": "Deep de-shedding blowout and undercoat removal for double-coated breeds like Huskies and Labradors.",
              "tags": [
                  "De-Shedding",
                  "Undercoat"
              ],
              "serviceImageQuery": "dog deshedding treatment groomer blowout husky fur"
          }
    ],
    "galleryHeading": "Happy, Clean Dogs",
    "aboutHeading": "Groomers who actually <em>love</em> dogs",
    "aboutText": "We only employ groomers who genuinely love dogs. That sounds obvious. It isn't. An anxious dog knows the difference between someone who's processing them and someone who cares.\n\nWe take time. We don't cage dry. We handle every dog the way we'd want our own dogs handled.",
    "aboutMission": "We believe grooming should be a positive experience \u2014 not something dogs fear or owners worry about.",
    "stats": [
      {
        "value": "9+",
        "label": "Years Grooming",
        "sublabel": "since 2015"
      },
      {
        "value": "200+",
        "label": "Dogs Groomed Monthly",
        "sublabel": "all breeds & sizes"
      },
      {
        "value": "50+",
        "label": "Breeds Groomed",
        "sublabel": "including doodles"
      },
      {
        "value": "4.9\u2605",
        "label": "Google Rating",
        "sublabel": "from 600+ reviews"
      }
    ],
    "contactHeading": "Ready to book your dog's groom?",
    "testimonial": {
      "quote": "My anxious rescue finally enjoyed a groom. They're magic with nervous dogs.",
      "author": "Bianca M., Verified Client",
      "rating": 5
    },
    "imageMood": "warm, friendly, clean",
    "heroImageQuery": "fluffy white dog sitting on grooming table freshly groomed bow tie professional salon bright",
    "ogImageQuery": "small fluffy white dog freshly groomed with bow tie on grooming table salon",
    "aboutImageQuery": "professional groomer gently brushing dog on grooming table salon bright clean",
    "galleryImageQueries": [
      "white poodle freshly groomed fluffy clean on grooming table professional salon",
      "golden retriever being bathed shampooed in grooming tub water suds salon",
      "small dog getting haircut scissors trimming on grooming table professional",
      "dog grooming salon interior bath stations dryers tables clean bright modern"
    ],
    "features": [
      { "name": "Calm, Fear-Free Environment", "description": "We use low-stress handling techniques so even anxious and rescue dogs feel safe. No rushing, no restraint \u2014 just patience.", "imageQuery": "calm dog being gently held by groomer relaxed pet salon" },
      { "name": "One Dog at a Time", "description": "Your dog gets our full attention. We don't double-book or cage-dry \u2014 every groom is hands-on from start to finish.", "imageQuery": "single dog on grooming table undivided attention professional" },
      { "name": "Skin & Coat Health Focus", "description": "We don't just make them look good. Every groom includes a skin check, ear clean, and nail trim so you leave with a healthier pet.", "imageQuery": "healthy shiny coat dog after grooming beautiful fur" }
    ],
    "contactHours": "Mon\u2013Fri: 08:00\u201317:00 \u00b7 Sat: 08:00\u201313:00 \u00b7 By appointment"
  },
  "Pet Shop": {
    "heroEyebrow": "PET SHOP CAPE TOWN",
    "heroAccent": "Premium food, toys & accessories",
    "tagline": "Everything your pet <em>deserves</em>",
    "heroSubtitle": "Premium pet food, toys, accessories, and expert advice for dogs, cats, birds, and small animals.",
    "ctaPrimary": "Shop Online",
    "ctaSecondary": "Visit the Store",
    "ctaNote": "Free delivery over R400 \u00b7 Loyalty rewards \u00b7 Bulk food orders",
    "badge": "NSPCA Endorsed Retailer",
    "servicesHeading": "What We Stock",
    "services": [
      {
        "name": "Premium Pet Nutrition",
        "description": "Raw, grain-free, and veterinary-recommended foods for dogs and cats across all life stages.",
        "tags": [
          "Raw Food",
          "Grain-Free"
        ],
        "serviceImageQuery": "dog food bags premium brands shelf pet shop"
      },
      {
        "name": "Toys, Beds & Accessories",
        "description": "Quality enrichment toys, orthopaedic beds, leads, collars, and everything your pet loves.",
        "tags": [
          "Enrichment Toys",
          "Beds"
        ],
        "serviceImageQuery": "pet toys accessories display shelf colourful"
      },
      {
        "name": "Small Animals & Birds",
        "description": "Responsibly sourced birds, fish, and small animals with enclosures, food, and expert setup advice.",
        "tags": [
          "Birds",
          "Fish"
        ],
        "serviceImageQuery": "aquarium fish tanks tropical pet shop"
      },
        {
          "name": "Grooming & Health Products",
          "description": "Flea and tick treatments, shampoos, supplements, and wellness products recommended by vets and pet nutritionists.",
          "tags": [
            "Health Products",
            "Supplements"
          ],
          "serviceImageQuery": "pet health supplements shampoo bottles grooming products shelf"
        },
          {
              "name": "Aquarium & Fish Supplies",
              "description": "Freshwater and marine tanks, filtration systems, fish food, and live fish from trusted breeders.",
              "tags": [
                  "Aquarium",
                  "Fish"
              ],
              "serviceImageQuery": "aquarium fish tank tropical fish pet shop display"
          },
          {
              "name": "Reptile & Exotic Pets",
              "description": "Terrariums, heating lamps, substrate, and specialised nutrition for reptiles and exotic pets.",
              "tags": [
                  "Reptile",
                  "Exotic"
              ],
              "serviceImageQuery": "reptile terrarium exotic pet shop gecko supplies"
          }
    ],
    "galleryHeading": "Pet Heaven",
    "aboutHeading": "Pets deserve the <em>best</em> \u2014 so do you",
    "aboutText": "We are a proper independent pet shop run by pet people. Every product on our shelves was chosen by someone who has a dog, cat, rabbit, or parrot at home. We stock what we feed our own animals.\n\nWe don't sell pet-shop puppies or kittens. If you're looking to adopt, we'll point you in the right direction.",
    "aboutMission": "We believe pets thrive when the people who love them have access to great products and honest advice.",
    "stats": [
      {
        "value": "13+",
        "label": "Years Open",
        "sublabel": "since 2011"
      },
      {
        "value": "2,000+",
        "label": "Products In-Store",
        "sublabel": "food, toys & more"
      },
      {
        "value": "50+",
        "label": "Premium Food Brands",
        "sublabel": "vet & nutritionist approved"
      },
      {
        "value": "4.8\u2605",
        "label": "Google Rating",
        "sublabel": "from 450+ reviews"
      }
    ],
    "contactHeading": "Looking for something for your pet?",
    "testimonial": {
      "quote": "Switched my dogs to raw food on their recommendation. Transformation in 6 weeks.",
      "author": "Lindi P., Verified Client",
      "rating": 5
    },
    "imageMood": "warm, friendly, colourful",
    "heroImageQuery": "cute puppy sitting in pet shop surrounded by colourful toys and accessories bright store",
    "ogImageQuery": "kitten and puppy together sitting on pet shop counter cute bright",
    "aboutImageQuery": "pet shop staff member helping customer choose dog food aisle products shelves bright store",
    "galleryImageQueries": [
      "colourful tropical fish swimming in aquarium tank pet shop display bright",
      "dog toys bones treats colourful display shelf pet shop interior bright",
      "premium pet food bags brands stacked on shelf pet store aisle varieties",
      "rabbit guinea pig small animal enclosure pet shop display bedding bright"
    ],
    "features": [
      { "name": "Expert Nutrition Advice", "description": "Our staff are trained in pet nutrition and can recommend the right food for your animal's age, breed, and health needs.", "imageQuery": "pet shop staff advising customer about dog food nutrition aisle products bright store" },
      { "name": "Loyalty Rewards That Add Up", "description": "Every purchase earns points toward free food, toys, and grooming. Regulars save hundreds a year without thinking about it.", "imageQuery": "happy customer carrying shopping bag leaving pet store with dog smiling bright" },
      { "name": "Ethically Sourced Products Only", "description": "We vet every brand we stock. No puppy mills, no harmful ingredients, no cheap imports \u2014 just products we'd use on our own pets.", "imageQuery": "premium natural organic pet food products display shelf pet shop bright quality" }
    ],
    "contactHours": "Mon\u2013Fri: 08:30\u201318:00 \u00b7 Sat: 08:30\u201315:00 \u00b7 Sun: 09:00\u201313:00"
  },
  "Kennels / Cattery": {
    "heroEyebrow": "PET BOARDING CAPE TOWN",
    "heroAccent": "SPCA-compliant. Individual runs.",
    "tagline": "A holiday for you. A home away from home for <em>them</em>.",
    "heroSubtitle": "Safe, clean, and caring boarding for dogs and cats with individual attention, exercise, and daily updates.",
    "ctaPrimary": "Check Availability",
    "ctaSecondary": "Our Facilities",
    "ctaNote": "Vaccination required \u00b7 Daily updates available \u00b7 Holiday periods book fast",
    "badge": "SAPPSA Registered Boarding Facility",
    "servicesHeading": "What We Offer",
    "services": [
      {
        "name": "Dog Boarding",
        "description": "Spacious individual runs with indoor sleeping and outdoor exercise, managed by animal-loving staff.",
        "tags": [
          "Individual Runs",
          "Daily Exercise"
        ],
        "serviceImageQuery": "dog boarding kennel room comfortable bed blanket"
      },
      {
        "name": "Cat Boarding",
        "description": "Private cat condos with perches, hiding spots, and daily interaction from our dedicated cattery staff.",
        "tags": [
          "Cat Condos",
          "Private"
        ],
        "serviceImageQuery": "cat boarding cattery room climbing tree cosy"
      },
      {
        "name": "Day Care",
        "description": "Full-day supervised dog daycare for working owners \u2014 your dog comes home tired and happy.",
        "tags": [
          "Day Care",
          "Socialisation"
        ],
        "serviceImageQuery": "dog daycare dogs playing together outdoor yard"
      },
        {
          "name": "Pet Transport & Collection",
          "description": "Safe, stress-free collection and drop-off service for pets who need a lift to and from boarding.",
          "tags": [
            "Pet Transport",
            "Collection"
          ],
          "serviceImageQuery": "pet transport crate carrier vehicle comfortable travel"
        },
          {
              "name": "Puppy & Kitten Socialisation",
              "description": "Supervised socialisation sessions for young pets to build confidence and good behaviour habits.",
              "tags": [
                  "Socialisation",
                  "Puppy"
              ],
              "serviceImageQuery": "puppy socialisation group play kennel daycare"
          },
          {
              "name": "Grooming Add-On",
              "description": "Optional bath, brush, and nail trim so your pet comes home looking and smelling fresh.",
              "tags": [
                  "Grooming",
                  "Bath"
              ],
              "serviceImageQuery": "dog bath grooming kennel wash clean happy"
          }
    ],
    "galleryHeading": "Home Away From Home",
    "aboutHeading": "Boarding you can leave <em>without worry</em>",
    "aboutText": "We built this facility because we couldn't find a kennel we trusted with our own dogs. Every run is cleaned twice daily. Every dog is walked. Every owner gets updates if they want them.\n\nWe are not a pet hotel with a marketing team. We are a family-run boarding facility that loves animals.",
    "aboutMission": "We believe you should be able to go away without spending the whole time worrying about your pet.",
    "stats": [
      {
        "value": "15+",
        "label": "Years Boarding",
        "sublabel": "since 2009"
      },
      {
        "value": "30",
        "label": "Dog Runs Available",
        "sublabel": "indoor & outdoor"
      },
      {
        "value": "20",
        "label": "Cat Condos",
        "sublabel": "individual & private"
      },
      {
        "value": "98%",
        "label": "Repeat Booking Rate",
        "sublabel": "from client history"
      }
    ],
    "contactHeading": "Planning a trip? Book early.",
    "testimonial": {
      "quote": "I've used them for 8 years. My dogs sprint to the door when we arrive. Best sign.",
      "author": "Andrew C., Verified Client",
      "rating": 5
    },
    "imageMood": "clean, caring, safe",
    "heroImageQuery": "happy dogs playing together running in large outdoor kennel boarding facility grassy yard sunny",
    "ogImageQuery": "group of dogs running playing in large outdoor kennel boarding yard grass sunny",
    "aboutImageQuery": "kennel staff member walking multiple dogs on leads in outdoor exercise area boarding facility",
    "galleryImageQueries": [
      "dogs playing fetch ball in large grassy kennel boarding yard outdoor sunny",
      "cat relaxing on climbing tree perch in cattery boarding room cosy warm",
      "dog sleeping peacefully on comfortable bed blanket in clean kennel suite",
      "clean spacious indoor kennel suite dog bed water bowl boarding facility"
    ],
    "features": [
      { "name": "24-Hour On-Site Supervision", "description": "Someone is always here. Day and night, your pet is never left alone \u2014 giving you genuine peace of mind while you're away.", "imageQuery": "kennel staff member sitting with dogs petting them in boarding facility care room" },
      { "name": "Daily Photo Updates", "description": "You'll receive photos and a short update every day so you can see exactly how your pet is doing.", "imageQuery": "happy dog playing with ball outdoors in kennel boarding yard grassy sunny" },
      { "name": "Individual Attention, Not Warehouse Care", "description": "We limit numbers deliberately. Each animal gets personal interaction, exercise time, and their own sleeping space.", "imageQuery": "spacious clean individual kennel suite with comfortable dog bed blanket water bowl" }
    ],
    "contactHours": "Mon\u2013Sun: 07:30\u201318:00 \u00b7 Drop-off & collection daily \u00b7 Emergency line available"
  },
  "Dog Walker / Pet Sitter": {
    "heroEyebrow": "DOG WALKING CAPE TOWN",
    "heroAccent": "GPS-tracked walks. Live updates.",
    "tagline": "Tail wags while you're at <em>work</em>",
    "heroSubtitle": "Reliable, caring dog walking, home pet sitting, and check-in visits from a team of genuine animal lovers.",
    "ctaPrimary": "Book a Walk",
    "ctaSecondary": "Our Services",
    "ctaNote": "GPS updates included \u00b7 Insured & vetted walkers \u00b7 Recurring slots available",
    "badge": "Pet Sitters International Certified",
    "servicesHeading": "What We Do",
    "services": [
      {
        "name": "Group & Solo Dog Walks",
        "description": "Daily group walks and solo walks with GPS tracking and a post-walk report card every time.",
        "tags": [
          "GPS Tracking",
          "Daily Walks"
        ],
        "serviceImageQuery": "dog walking group dogs park leashes path"
      },
      {
        "name": "Home Pet Sitting",
        "description": "We stay in your home while you're away \u2014 your pets stay comfortable in their own environment.",
        "tags": [
          "Home Sitting",
          "Overnight"
        ],
        "serviceImageQuery": "pet sitting cat home comfortable couch lap"
      },
      {
        "name": "Check-In Visits",
        "description": "Midday or after-work visits to feed, play, and keep your pet company on long working days.",
        "tags": [
          "Check-Ins",
          "Feeding"
        ],
        "serviceImageQuery": "puppy visit check-in home pet sitter"
      },
        {
          "name": "Pet Taxi & Transport",
          "description": "Safe, reliable pet transport to the vet, groomer, or airport — your furry friend travels in comfort while you carry on.",
          "tags": [
            "Pet Taxi",
            "Transport"
          ],
          "serviceImageQuery": "pet carrier crate travel comfortable blanket inside"
        },
          {
              "name": "Overnight Stays",
              "description": "Your pet sleeps in the comfort of their own home with our trusted sitter staying the night.",
              "tags": [
                  "Overnight",
                  "House Sitting"
              ],
              "serviceImageQuery": "pet sitter dog home couch overnight comfortable"
          },
          {
              "name": "Puppy Care Visits",
              "description": "Multiple short visits throughout the day for puppies who need feeding, toilet breaks, and socialisation.",
              "tags": [
                  "Puppy Care",
                  "Visits"
              ],
              "serviceImageQuery": "puppy care visit playing house young dog"
          }
    ],
    "galleryHeading": "Happy Walks",
    "aboutHeading": "Trusted with what <em>matters</em> most",
    "aboutText": "Your dog and your home are two of your most precious responsibilities. We understand that trust is earned slowly and we work hard to earn it.\n\nEvery walker is vetted, insured, and pet first-aid certified. We start with a free meet-and-greet before the first walk \u2014 always.",
    "aboutMission": "We believe your dog deserves to look forward to every single day, even the ones you can't be there for.",
    "stats": [
      {
        "value": "7+",
        "label": "Years Operating",
        "sublabel": "since 2017"
      },
      {
        "value": "150+",
        "label": "Dogs Walking Weekly",
        "sublabel": "across Cape Town"
      },
      {
        "value": "8",
        "label": "Vetted Dog Walkers",
        "sublabel": "all insured & certified"
      },
      {
        "value": "4.9\u2605",
        "label": "Google Rating",
        "sublabel": "from 350+ reviews"
      }
    ],
    "contactHeading": "Want to arrange a free meet and greet?",
    "testimonial": {
      "quote": "My dog went from anxious to the happiest animal on the planet. Life-changing service.",
      "author": "Kirsten L., Verified Client",
      "rating": 5
    },
    "imageMood": "warm, outdoor, active",
    "heroImageQuery": "dog walker with group of happy dogs on leads walking park path green trees sunny",
    "ogImageQuery": "group of dogs walking on leashes park trail with dog walker sunny green",
    "aboutImageQuery": "professional dog walker with pack of dogs on beach trail leads happy walking sunny",
    "galleryImageQueries": [
      "dog walker leading group of dogs on leashes park trail green trees sunny",
      "happy dog running off-leash in park field green grass playing ball sunny",
      "pet sitter sitting on couch at home with cat on lap relaxed cosy",
      "dog walker with dogs running on sandy beach waves water happy sunny"
    ],
    "features": [
      { "name": "GPS-Tracked Walks", "description": "Every walk is GPS-tracked and you get a map, distance, and duration sent straight to your phone when we're done.", "imageQuery": "dog walker with multiple dogs on leads walking park trail green trees outdoor exercise" },
      { "name": "Same Walker Every Time", "description": "Your dog builds a bond with one person, not a rotating roster. Consistency means less anxiety and better behaviour.", "imageQuery": "dog walker kneeling petting happy dog park bonding trust affection outdoors" },
      { "name": "Fully Insured & Background Checked", "description": "Every walker is vetted, insured, and trained in pet first aid. Your home keys and your pet are in safe hands.", "imageQuery": "professional pet sitter greeting dog at front door home visit keys uniform" }
    ],
    "contactHours": "Mon\u2013Fri: 06:30\u201318:00 \u00b7 Sat: 07:00\u201314:00 \u00b7 Weekend sitting by arrangement"
  },
  "Dog Trainer": {
    "heroEyebrow": "PROFESSIONAL DOG TRAINING",
    "heroAccent": "Force-free. Results-proven.",
    "tagline": "A well-trained dog is a <em>happy</em> dog",
    "heroSubtitle": "Positive reinforcement dog training for puppies, reactive dogs, and behavioural challenges \u2014 by qualified trainers.",
    "ctaPrimary": "Book an Assessment",
    "ctaSecondary": "Training Programmes",
    "ctaNote": "Free behaviour consultation \u00b7 Home visits \u00b7 Puppy classes Saturdays",
    "badge": "APDT SA Accredited Trainer",
    "servicesHeading": "What We Offer",
    "services": [
      {
        "name": "Puppy Preschool",
        "description": "Early socialisation and foundation training for puppies aged 8\u201316 weeks in a safe, positive environment.",
        "tags": [
          "Puppy Class",
          "Socialisation"
        ],
        "serviceImageQuery": "puppy training class obedience sit treats"
      },
      {
        "name": "Obedience & Manners",
        "description": "Recall, leash manners, sit, stay, and general obedience for adolescent and adult dogs.",
        "tags": [
          "Obedience",
          "Leash Manners"
        ],
        "serviceImageQuery": "dog obedience training leash heel walk outdoor park"
      },
      {
        "name": "Behaviour & Reactivity",
        "description": "Specialist work with reactive, fearful, or aggressive dogs using science-based desensitisation.",
        "tags": [
          "Reactivity",
          "Behaviour"
        ],
        "serviceImageQuery": "behavioural training dog calm relaxed command"
      },
        {
          "name": "Agility & Sport Training",
          "description": "Fun, high-energy agility courses and canine sport training for dogs who need more than just a walk around the block.",
          "tags": [
            "Agility",
            "Canine Sport"
          ],
          "serviceImageQuery": "dog agility weave poles tunnel course outdoor"
        },
          {
              "name": "Separation Anxiety Programme",
              "description": "Structured desensitisation protocols to help anxious dogs cope confidently when left alone.",
              "tags": [
                  "Separation Anxiety",
                  "Behaviour"
              ],
              "serviceImageQuery": "dog training separation anxiety calm relaxed home"
          },
          {
              "name": "Private In-Home Sessions",
              "description": "One-on-one training in your home to address specific behaviours in the environment where they occur.",
              "tags": [
                  "Private",
                  "In-Home"
              ],
              "serviceImageQuery": "dog trainer private session home one on one"
          }
    ],
    "galleryHeading": "Good Dogs in the Making",
    "aboutHeading": "Training built on <em>trust</em>",
    "aboutText": "We use only force-free, positive reinforcement methods \u2014 because it works better and it doesn't damage the relationship between you and your dog. That relationship is the whole point.\n\nWe've worked with aggressive dogs, traumatised rescues, stubborn adolescents, and anxious puppies. Every dog has a path forward.",
    "aboutMission": "We believe every dog is trainable \u2014 the question is finding the right approach for that specific animal.",
    "stats": [
      {
        "value": "11+",
        "label": "Years Training",
        "sublabel": "since 2013"
      },
      {
        "value": "1,500+",
        "label": "Dogs Trained",
        "sublabel": "puppies to seniors"
      },
      {
        "value": "4",
        "label": "APDT Certified Trainers",
        "sublabel": "force-free methods only"
      },
      {
        "value": "4.9\u2605",
        "label": "Google Rating",
        "sublabel": "from 500+ reviews"
      }
    ],
    "contactHeading": "Want to book a free behaviour consultation?",
    "testimonial": {
      "quote": "Our rescue went from biting guests to the most delightful family dog. Miraculous.",
      "author": "Fiona B., Verified Client",
      "rating": 5
    },
    "imageMood": "warm, outdoor, trust-building",
    "heroImageQuery": "dog sitting attentively looking up at trainer during outdoor training session park green grass",
    "ogImageQuery": "obedient dog performing sit stay command outdoors with trainer park training",
    "aboutImageQuery": "dog trainer rewarding golden retriever with treat during obedience session outdoor park",
    "galleryImageQueries": [
      "dog training class group of dogs and owners outdoor field park session",
      "puppy sitting looking up at trainer receiving treat reward obedience training outdoor",
      "dog jumping over agility course obstacle hurdle outdoor training competition",
      "dog walking at heel with trainer on leash park path obedience outdoor"
    ],
    "features": [
      { "name": "Science-Based, Force-Free Methods", "description": "We use positive reinforcement only. No choke chains, no dominance theory \u2014 just methods backed by veterinary behavioural science.", "imageQuery": "dog trainer using positive reinforcement treat reward training" },
      { "name": "Real-World Results", "description": "We train in your home, your neighbourhood, and around your triggers \u2014 not just in a sterile facility where everything is easy.", "imageQuery": "dog training outdoors real environment street neighbourhood walk" },
      { "name": "Owner Coaching Included", "description": "Your dog's behaviour is only as good as what happens between sessions. We coach you so the results stick long after training ends.", "imageQuery": "dog trainer coaching pet owner handling techniques demonstration" }
    ],
    "contactHours": "Mon\u2013Fri: 08:00\u201317:00 \u00b7 Sat: 08:00\u201314:00 \u00b7 By appointment only"
  },
  "Pet Services": {
    "heroEyebrow": "COMPREHENSIVE PET SERVICES",
    "heroAccent": "Grooming, training, boarding & more",
    "tagline": "One stop for everything your pet <em>needs</em>",
    "heroSubtitle": "A full-service pet care centre offering grooming, training, daycare, and accessories under one roof.",
    "ctaPrimary": "Book a Service",
    "ctaSecondary": "What We Offer",
    "ctaNote": "All breeds welcome \u00b7 Loyalty programme \u00b7 Bundle packages available",
    "badge": "NSPCA Endorsed Pet Services",
    "servicesHeading": "Our Services",
    "services": [
      {
        "name": "Grooming & Beauty",
        "description": "Full grooms, breed-specific trims, and pamper packages for dogs and cats by expert groomers.",
        "tags": [
          "Grooming",
          "Pamper"
        ],
        "serviceImageQuery": "dog being bathed in grooming tub shampoo suds"
      },
      {
        "name": "Daycare & Socialisation",
        "description": "Supervised full-day doggy daycare with outdoor play, socialisation, and enrichment activities.",
        "tags": [
          "Daycare",
          "Socialisation"
        ],
        "serviceImageQuery": "dogs playing together supervised daycare outdoor yard"
      },
      {
        "name": "Pet Accessories & Food",
        "description": "Premium food, toys, leads, and accessories \u2014 everything you need for a happy, healthy pet.",
        "tags": [
          "Premium Food",
          "Accessories"
        ],
        "serviceImageQuery": "premium pet food bowls toys accessories display"
      },
        {
          "name": "Obedience Training",
          "description": "Group and one-on-one obedience classes for puppies and adult dogs — positive methods, lasting results.",
          "tags": [
            "Obedience",
            "Training"
          ],
          "serviceImageQuery": "dog obedience class sit stay treat reward outdoor"
        },
          {
              "name": "Pet Photography",
              "description": "Professional studio and outdoor pet portraits to capture your furry family member at their best.",
              "tags": [
                  "Pet Photography",
                  "Portraits"
              ],
              "serviceImageQuery": "pet photography studio dog portrait professional shoot"
          },
          {
              "name": "Pet Transport & Relocation",
              "description": "Safe, comfortable pet transport for vet visits, airport transfers, and long-distance relocations.",
              "tags": [
                  "Transport",
                  "Relocation"
              ],
              "serviceImageQuery": "pet transport van vehicle comfortable dog travel"
          }
    ],
    "galleryHeading": "Happy Pets",
    "aboutHeading": "Pet care done <em>properly</em>",
    "aboutText": "We created a one-stop pet service centre because pet owners told us they were tired of driving across town for grooming, then training, then food. We pulled it all together under one roof.\n\nEvery member of our team is an animal lover first. The expertise followed.",
    "aboutMission": "We believe pets enrich our lives immeasurably \u2014 and they deserve care that reflects that.",
    "stats": [
      {
        "value": "10+",
        "label": "Years in Business",
        "sublabel": "since 2014"
      },
      {
        "value": "300+",
        "label": "Pets Served Weekly",
        "sublabel": "grooming, daycare & more"
      },
      {
        "value": "6",
        "label": "Services Under One Roof",
        "sublabel": "convenience guaranteed"
      },
      {
        "value": "4.8\u2605",
        "label": "Google Rating",
        "sublabel": "from 400+ reviews"
      }
    ],
    "contactHeading": "Want to book your pet in?",
    "testimonial": {
      "quote": "Daycare, groom, and training all in one place. My dog loves it there more than home.",
      "author": "Shane D., Verified Client",
      "rating": 5
    },
    "imageMood": "warm, welcoming, animal-loving",
    "heroImageQuery": "happy golden retriever puppy sitting looking at camera bright warm pet care facility",
    "ogImageQuery": "cat and dog sitting together looking at camera bright studio pet portrait",
    "aboutImageQuery": "pet care staff member playing with group of dogs in outdoor daycare yard sunny",
    "galleryImageQueries": [
      "fluffy white dog freshly groomed with bow tie on grooming table salon",
      "cat being gently brushed grooming session professional groomer close-up",
      "group of dogs running playing together in outdoor daycare yard happy sunny",
      "pet food treats toys accessories colourful display shelf pet shop bright"
    ],
    "features": [
      { "name": "All Services Under One Roof", "description": "Grooming, daycare, training, and retail in one place. One relationship, one location, and no running around town.", "imageQuery": "modern pet care facility interior grooming area daycare dogs bright clean spacious" },
      { "name": "Qualified, Passionate Staff", "description": "Everyone on our team is a trained animal handler and genuine animal lover. It's not a job for us \u2014 it's a calling.", "imageQuery": "pet care staff team members smiling holding dogs and cats in facility uniforms" },
      { "name": "Flexible Booking & Packages", "description": "Mix and match services, book online, and save with monthly packages designed around how often you actually need us.", "imageQuery": "person booking pet appointment on smartphone screen pet services app dog nearby" }
    ],
    "contactHours": "Mon\u2013Fri: 07:30\u201318:00 \u00b7 Sat: 08:00\u201315:00 \u00b7 Sun: 09:00\u201313:00"
  },
  "Veterinarian": {
    "heroEyebrow": "VETERINARY CLINIC CAPE TOWN",
    "heroAccent": "Wellness care, surgery & 24hr emergencies",
    "tagline": "The care your pet would choose, if they <em>could</em>",
    "heroSubtitle": "Compassionate, high-quality veterinary care for dogs, cats, and small animals \u2014 from routine check-ups to complex surgery.",
    "ctaPrimary": "Book an Appointment",
    "ctaSecondary": "Our Services",
    "ctaNote": "Emergency line available \u00b7 Vaccination reminders \u00b7 Pet insurance accepted",
    "badge": "South African Veterinary Council Registered",
    "servicesHeading": "What We Offer",
    "services": [
      {
        "name": "Wellness Exams & Vaccinations",
        "description": "Annual check-ups, core and lifestyle vaccinations, parasite control, and preventive health planning.",
        "tags": [
          "Vaccinations",
          "Wellness"
        ],
        "serviceImageQuery": "dog being examined with stethoscope on vet table"
      },
      {
        "name": "Soft Tissue & Orthopaedic Surgery",
        "description": "Desexing, mass removals, orthopaedic repairs, and abdominal surgery by experienced surgeons.",
        "tags": [
          "Surgery",
          "Desexing"
        ],
        "serviceImageQuery": "veterinary surgery operating room sterile instruments professional"
      },
      {
        "name": "Diagnostics & Imaging",
        "description": "In-house digital X-ray, ultrasound, and comprehensive blood pathology for fast accurate diagnosis.",
        "tags": [
          "X-Ray",
          "Ultrasound"
        ],
        "serviceImageQuery": "veterinary xray imaging room equipment"
      },
        {
          "name": "Dental Care & Oral Surgery",
          "description": "Professional dental scaling, polishing, extractions, and oral health assessments under anaesthesia.",
          "tags": [
            "Dental",
            "Oral Surgery"
          ],
          "serviceImageQuery": "veterinary dental instruments teeth cleaning equipment tray"
        },
          {
              "name": "Microchipping & Registration",
              "description": "ISO-standard microchip implantation and national database registration for permanent identification.",
              "tags": [
                  "Microchip",
                  "Registration"
              ],
              "serviceImageQuery": "veterinarian microchipping dog identification pet clinic"
          },
          {
              "name": "Nutritional Counselling",
              "description": "Personalised diet plans for weight management, allergies, and life-stage nutritional needs.",
              "tags": [
                  "Nutrition",
                  "Diet Plan"
              ],
              "serviceImageQuery": "veterinarian nutrition consultation pet food diet advice"
          }
    ],
    "galleryHeading": "In the Clinic",
    "aboutHeading": "Vets who treat animals like <em>family</em>",
    "aboutText": "We became vets because we love animals \u2014 and that never gets old. Our clinic invests in current diagnostics and surgical equipment because your pet deserves the same standard of care you'd expect for yourself.\n\nWe communicate clearly. We explain costs upfront. We treat your pet with the gentleness they deserve.",
    "aboutMission": "We believe every animal deserves skilled, compassionate care from people who are genuinely invested in their wellbeing.",
    "stats": [
      {
        "value": "18+",
        "label": "Years Practising",
        "sublabel": "since 2006"
      },
      {
        "value": "4,000+",
        "label": "Patients On File",
        "sublabel": "dogs, cats & small animals"
      },
      {
        "value": "6",
        "label": "Qualified Vets",
        "sublabel": "including surgical specialists"
      },
      {
        "value": "98%",
        "label": "Client Satisfaction",
        "sublabel": "from post-visit surveys"
      }
    ],
    "contactHeading": "Want to book your pet's check-up?",
    "testimonial": {
      "quote": "Our vet saved our cat's life. Brilliant diagnostics, compassionate care, honest pricing.",
      "author": "Yvette N., Verified Client",
      "rating": 5
    },
    "imageMood": "clean, caring, professional",
    "heroImageQuery": "veterinarian examining golden retriever dog on examination table in bright modern clinic stethoscope",
    "ogImageQuery": "veterinarian holding cat on examination table in bright clean clinic",
    "aboutImageQuery": "veterinarian gently examining puppy on clinic table stethoscope white coat bright room",
    "galleryImageQueries": [
      "veterinary clinic reception area modern clean bright interior counter waiting room",
      "veterinarian examining dog on consultation table clinic bright stethoscope white coat",
      "cat receiving vaccination injection at veterinary clinic vet hands close-up",
      "veterinary surgery operating room sterile equipment bright lights instruments table"
    ],
    "features": [
      { "name": "Gentle, Low-Stress Consultations", "description": "We take our time. Separate cat and dog waiting areas, calm handling, and treat rewards mean less fear for your pet.", "imageQuery": "veterinarian gently examining calm relaxed dog on consultation table in bright clinic room" },
      { "name": "In-House Lab & Digital X-Ray", "description": "Most diagnostics are done on-site within minutes. No waiting days for results or being sent across town for an X-ray.", "imageQuery": "veterinary clinic digital xray machine equipment modern diagnostic lab room bright" },
      { "name": "Transparent Pricing, No Surprises", "description": "We quote before we treat. You'll know the cost upfront and we'll always discuss options before proceeding with anything.", "imageQuery": "veterinarian explaining treatment plan to pet owner in consultation room with dog on table" }
    ],
    "contactHours": "Mon\u2013Fri: 08:00\u201318:00 \u00b7 Sat: 08:00\u201313:00 \u00b7 Emergency line 24hrs"
  },
  "Event Planner": {
    "heroEyebrow": "EVENT PLANNING CAPE TOWN",
    "heroAccent": "From vision to flawless execution",
    "tagline": "Your event, <em>perfectly</em> orchestrated",
    "heroSubtitle": "Full-service event planning for corporate events, private functions, and brand activations that people talk about long after.",
    "ctaPrimary": "Start Planning",
    "ctaSecondary": "Our Work",
    "ctaNote": "Free initial consultation \u00b7 Day-of coordination included",
    "badge": "SA Events Council Member",
    "servicesHeading": "What We Do",
    "services": [
      {
        "name": "Corporate Events",
        "description": "Conference management, product launches, gala dinners, and team events from brief to breakdown.",
        "tags": [
          "Corporate",
          "Gala Dinners"
        ],
        "serviceImageQuery": "corporate gala dinner table set elegant venue"
      },
      {
        "name": "Private Functions",
        "description": "Milestone birthdays, anniversaries, and celebration events designed around your personality and vision.",
        "tags": [
          "Private Functions",
          "Milestones"
        ],
        "serviceImageQuery": "birthday party decorated table balloons cake setup"
      },
      {
        "name": "Concept & Design",
        "description": "Event concept development, theme design, supplier coordination, and full creative direction.",
        "tags": [
          "Event Design",
          "Creative"
        ],
        "serviceImageQuery": "event mood board fabric swatches flowers design"
      },
        {
          "name": "Brand Activations & Launches",
          "description": "Product launches, brand activations, and experiential marketing events that generate buzz and deliver measurable ROI.",
          "tags": [
            "Brand Activation",
            "Product Launch"
          ],
          "serviceImageQuery": "product launch event display branded booth activation"
        },
          {
              "name": "Wedding Planning",
              "description": "Full-service wedding coordination from venue selection and vendor management to on-the-day direction.",
              "tags": [
                  "Weddings",
                  "Coordination"
              ],
              "serviceImageQuery": "wedding planning decoration table setup venue beautiful"
          },
          {
              "name": "Logistics & Production",
              "description": "Technical production management including staging, audio-visual, and vendor coordination for seamless events.",
              "tags": [
                  "Production",
                  "Logistics"
              ],
              "serviceImageQuery": "event production staging lighting setup conference"
          }
    ],
    "galleryHeading": "Events We've Created",
    "aboutHeading": "Events planned with <em>obsession</em>",
    "aboutText": "Event planning is fundamentally about making people feel something \u2014 welcomed, celebrated, impressed, moved. We obsess over the details that create those feelings.\n\nIn over a decade of events, we have never had a client's function fall apart. That's not luck \u2014 it's preparation, supplier relationships, and a relentless checklist.",
    "aboutMission": "We believe a great event is the sum of a thousand small decisions made correctly \u2014 and we make all of them.",
    "stats": [
      {
        "value": "14+",
        "label": "Years Planning",
        "sublabel": "since 2010"
      },
      {
        "value": "500+",
        "label": "Events Executed",
        "sublabel": "from 20 to 2,000 guests"
      },
      {
        "value": "100+",
        "label": "Trusted Suppliers",
        "sublabel": "venues, catering & AV"
      },
      {
        "value": "100%",
        "label": "Events Delivered",
        "sublabel": "not one cancelled"
      }
    ],
    "contactHeading": "Want to start planning your event?",
    "testimonial": {
      "quote": "200 guests and not a single thing went wrong. That doesn't happen without an exceptional team.",
      "author": "Tamara N., Verified Client",
      "rating": 5
    },
    "imageMood": "elegant, dramatic, celebratory",
    "heroImageQuery": "beautifully decorated banquet hall round tables white linen centrepieces warm lighting",
    "ogImageQuery": "elegant dinner event long table candles flowers evening gala",
    "aboutImageQuery": "woman event planner with clipboard checking table settings at formal dinner",
    "galleryImageQueries": [
      "wedding reception round tables gold chairs floral centrepieces",
      "corporate conference stage screen podium audience seated",
      "outdoor marquee tent string lights evening garden party",
      "close-up table setting wine glasses napkin folded candles"
    ],
    "contactHours": "Mon\u2013Fri: 09:00\u201317:00 \u00b7 Weekend consultations available \u00b7 By appointment"
  },
  "DJ / MC": {
    "heroEyebrow": "PROFESSIONAL DJ & MC",
    "heroAccent": "Weddings, corporate & private events",
    "tagline": "The right music at exactly the <em>right</em> moment",
    "heroSubtitle": "Professional DJ and MC services that read the room, manage the night, and keep every guest on the dance floor.",
    "ctaPrimary": "Check My Date",
    "ctaSecondary": "Music & Packages",
    "ctaNote": "Dates book fast \u00b7 Full sound & lighting included \u00b7 Show reel available",
    "badge": "DJSA Association Member",
    "servicesHeading": "What I Offer",
    "services": [
      {
        "name": "Wedding DJ & MC",
        "description": "Complete wedding DJ and MC service from ceremony through to last dance, with playlist consultation.",
        "tags": [
          "Wedding DJ",
          "MC"
        ],
        "serviceImageQuery": "DJ turntables mixer close-up coloured lights"
      },
      {
        "name": "Corporate Events",
        "description": "Background music, conference AV, gala dinner entertainment, and year-end party DJ sets.",
        "tags": [
          "Corporate",
          "Gala Dinner"
        ],
        "serviceImageQuery": "corporate gala dinner event DJ dance floor people dancing party lights"
      },
      {
        "name": "Sound & Lighting",
        "description": "Professional sound system and intelligent lighting rig \u2014 no venue hire headaches.",
        "tags": [
          "Sound System",
          "Lighting"
        ],
        "serviceImageQuery": "sound system speakers lighting rig event setup"
      },
        {
          "name": "Private Parties & Milestones",
          "description": "Birthday bashes, engagement parties, and milestone celebrations with custom playlists and a vibe that keeps the dancefloor packed.",
          "tags": [
            "Private Party",
            "Milestone"
          ],
          "serviceImageQuery": "birthday party dancefloor coloured lights confetti celebration"
        },
          {
              "name": "Festival & Outdoor Events",
              "description": "High-powered outdoor setups with festival-grade speakers, subs, and lighting rigs for large crowds.",
              "tags": [
                  "Festivals",
                  "Outdoor"
              ],
              "serviceImageQuery": "outdoor festival DJ setup stage crowd music"
          },
          {
              "name": "School & Matric Events",
              "description": "Age-appropriate matric dance, school event, and prom DJ packages with clean playlists.",
              "tags": [
                  "Matric Dance",
                  "School Events"
              ],
              "serviceImageQuery": "school matric dance event DJ lighting dance floor"
          }
    ],
    "galleryHeading": "On the Decks",
    "aboutHeading": "Music that <em>moves</em> people",
    "aboutText": "I've been DJing events in Cape Town for 15 years. In that time I've learned one thing above all others: the best DJs listen more than they play. Reading the crowd, adjusting the energy, knowing exactly when to drop the next track \u2014 that's the skill.\n\nEvery event is unique. Your playlist is never off the shelf.",
    "aboutMission": "I believe music has the power to make any gathering unforgettable \u2014 if the right person is behind the decks.",
    "stats": [
      {
        "value": "15+",
        "label": "Years DJing",
        "sublabel": "since 2009"
      },
      {
        "value": "400+",
        "label": "Events Played",
        "sublabel": "weddings & corporate"
      },
      {
        "value": "200+",
        "label": "Weddings",
        "sublabel": "and counting"
      },
      {
        "value": "5.0\u2605",
        "label": "Google Rating",
        "sublabel": "from 200+ reviews"
      }
    ],
    "contactHeading": "Is your date available? Let's chat.",
    "testimonial": {
      "quote": "Dance floor was packed from 9pm to midnight. He read the crowd perfectly. Phenomenal.",
      "author": "Ashleigh T., Verified Client",
      "rating": 5
    },
    "imageMood": "energetic, nightlife, electric",
    "heroImageQuery": "DJ hands on turntable mixer knobs coloured club lights close-up",
    "ogImageQuery": "DJ wearing headphones mixing music turntables neon purple lights",
    "aboutImageQuery": "DJ performing behind decks at wedding reception dance floor crowd",
    "galleryImageQueries": [
      "DJ booth turntable mixer laptop coloured LED lights nightclub",
      "packed dance floor people dancing party purple blue lights",
      "man with microphone MC speaking on stage audience event",
      "large speakers subwoofers lighting truss rig concert stage setup"
    ],
    "contactHours": "Available 7 days for events \u00b7 Consultations Mon\u2013Fri 10:00\u201318:00"
  },
  "Wedding Venue / Services": {
    "heroEyebrow": "WEDDING VENUE CAPE TOWN",
    "heroAccent": "Mountain backdrops. Ocean sunsets.",
    "tagline": "The day you imagined, finally <em>real</em>",
    "heroSubtitle": "A breathtaking Cape Town wedding venue with in-house coordination, catering, and everything to make your day perfect.",
    "ctaPrimary": "Book a Viewing",
    "ctaSecondary": "Packages & Pricing",
    "ctaNote": "Limited dates available \u00b7 Full coordination included \u00b7 Exclusive use",
    "badge": "SA Wedding Industry Award Winner",
    "servicesHeading": "What We Offer",
    "services": [
      {
        "name": "Venue Hire & Coordination",
        "description": "Exclusive use of our estate with a dedicated coordinator managing every detail from rehearsal to send-off.",
        "tags": [
          "Exclusive Use",
          "Coordination"
        ],
        "serviceImageQuery": "outdoor wedding ceremony setup white chairs floral arch garden estate"
      },
      {
        "name": "Catering & Bar",
        "description": "In-house catering with customisable menus, cocktail hour, and a fully staffed open bar service.",
        "tags": [
          "Catering",
          "Open Bar"
        ],
        "serviceImageQuery": "wedding reception catering food buffet display champagne glasses elegant"
      },
      {
        "name": "Ceremony & Chapel",
        "description": "A dedicated ceremony space \u2014 indoor chapel or outdoor garden \u2014 set to exactly your vision.",
        "tags": [
          "Garden Ceremony",
          "Chapel"
        ],
        "serviceImageQuery": "wedding chapel interior white wooden pews aisle natural light stained glass"
      },
        {
          "name": "Décor & Floral Styling",
          "description": "Full wedding décor and floral styling — table settings, ceremony arches, centrepieces, and everything your Pinterest board promised.",
          "tags": [
            "Wedding Décor",
            "Floral"
          ],
          "serviceImageQuery": "wedding floral centrepiece table setting candles elegant"
        },
          {
              "name": "Photography & Videography",
              "description": "Recommended photography and videography partners who know every angle of our beautiful venue.",
              "tags": [
                  "Photography",
                  "Videography"
              ],
              "serviceImageQuery": "wedding photographer couple venue beautiful garden"
          },
          {
              "name": "Honeymoon Accommodation",
              "description": "On-site or partner honeymoon suites and post-wedding accommodation for the bridal couple and guests.",
              "tags": [
                  "Honeymoon",
                  "Accommodation"
              ],
              "serviceImageQuery": "honeymoon suite romantic accommodation luxury bedroom"
          }
    ],
    "galleryHeading": "Your Day, Our Backdrop",
    "aboutHeading": "Weddings held with <em>reverence</em>",
    "aboutText": "We host a limited number of weddings each year because we believe every couple deserves our full attention. When you book with us, the date is yours \u2014 we prepare for it as if it's our own family's wedding.\n\nFrom the first viewing to the last dance, your coordinator is with you every step.",
    "aboutMission": "We believe your wedding day should exceed every expectation you had \u2014 and exceed it quietly, without you ever seeing the effort.",
    "stats": [
      {
        "value": "16+",
        "label": "Years Hosting",
        "sublabel": "since 2008"
      },
      {
        "value": "600+",
        "label": "Weddings Hosted",
        "sublabel": "all seasons"
      },
      {
        "value": "120",
        "label": "Max Guest Capacity",
        "sublabel": "seated & exclusive"
      },
      {
        "value": "4.9\u2605",
        "label": "Google Rating",
        "sublabel": "from 400+ reviews"
      }
    ],
    "contactHeading": "Want to come and see the venue?",
    "testimonial": {
      "quote": "Every single guest told us it was the most beautiful wedding they'd ever attended.",
      "author": "Caitlin & Ryan M., Verified Client",
      "rating": 5
    },
    "imageMood": "romantic, golden, Cape",
    "heroImageQuery": "outdoor wedding ceremony floral arch white chairs garden estate mountain backdrop",
    "ogImageQuery": "bride and groom walking down aisle outdoor garden wedding ceremony",
    "aboutImageQuery": "wedding coordinator arranging white roses floral centrepiece at reception table",
    "galleryImageQueries": [
      "bride walking down aisle outdoor ceremony garden arch flowers",
      "wedding reception hall long tables candles white linen chandelier",
      "three tier white wedding cake flowers on table reception",
      "bride groom first dance fairy lights wedding reception"
    ],
    "contactHours": "Mon\u2013Sun: 09:00\u201317:00 \u00b7 Venue viewings by appointment \u00b7 Events 7 days"
  },
  "Photo Booth": {
    "heroEyebrow": "PHOTO BOOTH HIRE CAPE TOWN",
    "heroAccent": "Instant prints. Unlimited fun.",
    "tagline": "Every party needs a photo <em>moment</em>",
    "heroSubtitle": "Premium open-air and enclosed photo booths with instant prints, digital sharing, and custom branding for any event.",
    "ctaPrimary": "Get a Quote",
    "ctaSecondary": "Booth Styles",
    "ctaNote": "Full setup & attendant included \u00b7 Same-day print outs \u00b7 Custom branding",
    "badge": "SA Events Council Supplier Member",
    "servicesHeading": "What We Offer",
    "services": [
      {
        "name": "Open-Air & Mirror Booth",
        "description": "Glam mirror and open-air booths with DSLR camera, ring light, and instant branded prints.",
        "tags": [
          "Mirror Booth",
          "Open Air"
        ],
        "serviceImageQuery": "woman posing in front of LED mirror photo booth at event party"
      },
      {
        "name": "360\u00b0 Video Booth",
        "description": "Spinning 360-degree slow-motion video platform for jaw-dropping social media content at any event.",
        "tags": [
          "360 Booth",
          "Slow Motion"
        ],
        "serviceImageQuery": "person standing on 360 degree video booth spinning platform at event"
      },
      {
        "name": "Custom Branding & Props",
        "description": "Fully branded booths with your logo, custom print overlays, and a themed prop box for guests.",
        "tags": [
          "Branded",
          "Prop Box"
        ],
        "serviceImageQuery": "photo booth print strips with custom overlay branding logo event"
      },
        {
          "name": "GIF & Boomerang Station",
          "description": "Interactive GIF and boomerang stations with instant social sharing — your guests post the party while they’re still at the party.",
          "tags": [
            "GIF Station",
            "Social Sharing"
          ],
          "serviceImageQuery": "friends taking GIF boomerang photo at party booth touchscreen"
        },
          {
              "name": "Green Screen & Virtual Backgrounds",
              "description": "Transport guests to Paris, the beach, or outer space with our chroma key green screen technology.",
              "tags": [
                  "Green Screen",
                  "Virtual"
              ],
              "serviceImageQuery": "people posing in front of green screen photo booth fun props"
          },
          {
              "name": "Social Media Sharing Station",
              "description": "Instant digital sharing via QR code, email, or direct upload to Instagram and WhatsApp.",
              "tags": [
                  "Social Media",
                  "Digital Sharing"
              ],
              "serviceImageQuery": "woman scanning QR code on photo booth screen sharing photos phone"
          }
    ],
    "galleryHeading": "In the Booth",
    "aboutHeading": "Memories made <em>instantly</em>",
    "aboutText": "We've been setting up photo booths at Cape Town's best events since 2015. In that time, we've learned that a great photo booth creates a moment that people seek out \u2014 it becomes a focal point, a conversation starter, and a tangible memory people take home.\n\nOur booths are maintained, our attendants are warm, and our prints are high quality.",
    "aboutMission": "We believe the best party favour is a print your guests keep on their fridge for years.",
    "stats": [
      {
        "value": "9+",
        "label": "Years Hiring",
        "sublabel": "since 2015"
      },
      {
        "value": "600+",
        "label": "Events Attended",
        "sublabel": "weddings, corp & private"
      },
      {
        "value": "50,000+",
        "label": "Prints Created",
        "sublabel": "and counting"
      },
      {
        "value": "4.9\u2605",
        "label": "Google Rating",
        "sublabel": "from 300+ reviews"
      }
    ],
    "contactHeading": "Need a photo booth for your event?",
    "testimonial": {
      "quote": "The queue for our booth never emptied all night. Guests are still sending me their prints.",
      "author": "Gaby S., Verified Client",
      "rating": 5
    },
    "imageMood": "fun, vibrant, celebratory",
    "heroImageQuery": "group of friends posing with funny props in photo booth at party",
    "ogImageQuery": "people laughing holding props mustache lips signs photo booth party",
    "aboutImageQuery": "photo strip printout four frames friends posing silly faces party",
    "galleryImageQueries": [
      "mirror photo booth glowing LED frame woman posing event",
      "group posing with oversized sunglasses props photo booth wedding",
      "printed photo strips scattered on table party event",
      "360 spinning video booth platform woman posing slow motion event"
    ],
    "contactHours": "Available 7 days for events \u00b7 Bookings & admin Mon\u2013Fri 09:00\u201317:00"
  },
  "Party Supplies / D\u00e9cor": {
    "heroEyebrow": "PARTY SUPPLIES CAPE TOWN",
    "heroAccent": "Balloons, d\u00e9cor & everything in between",
    "tagline": "Every party deserves a <em>wow</em> moment",
    "heroSubtitle": "Balloon installations, party supplies, and event d\u00e9cor for birthdays, baby showers, and corporate celebrations.",
    "ctaPrimary": "Shop Now",
    "ctaSecondary": "Custom Orders",
    "ctaNote": "Same-day collection \u00b7 Delivery available \u00b7 Custom themes on request",
    "badge": "QBN Qualified Balloon Artist",
    "servicesHeading": "What We Do",
    "services": [
      {
        "name": "Balloon Installations",
        "description": "Organic balloon arches, garlands, column towers, and ceiling installs for any theme and venue.",
        "tags": [
          "Balloon Arch",
          "Garlands"
        ],
        "serviceImageQuery": "balloon arch decoration party entrance colourful"
      },
      {
        "name": "Party Packs & Tableware",
        "description": "Coordinated party packs with tableware, banners, and d\u00e9cor items in hundreds of themes.",
        "tags": [
          "Party Packs",
          "Tableware"
        ],
        "serviceImageQuery": "themed birthday party table plates cups napkins banner colourful setup"
      },
      {
        "name": "Backdrop & D\u00e9cor Hire",
        "description": "Neon signs, foliage walls, sequin backdrops, and styled tablescapes available for event hire.",
        "tags": [
          "Backdrop Hire",
          "Neon Signs"
        ],
        "serviceImageQuery": "neon sign backdrop foliage wall event décor hire"
      },
        {
          "name": "Sweet Tables & Grazing Boards",
          "description": "Styled dessert tables, grazing boards, and candy bars that double as décor and keep guests coming back for more.",
          "tags": [
            "Sweet Table",
            "Grazing Board"
          ],
          "serviceImageQuery": "dessert table cupcakes macarons candy jars styled party display"
        },
          {
              "name": "Balloon Installations",
              "description": "Custom balloon arches, garlands, columns, and centrepieces for birthdays, weddings, and corporate events.",
              "tags": [
                  "Balloons",
                  "Installations"
              ],
              "serviceImageQuery": "large organic balloon garland arch pink white gold event entrance"
          },
          {
              "name": "Kids' Party Packages",
              "description": "All-inclusive themed party packages with plates, cups, banners, favours, and matching d\u00e9cor.",
              "tags": [
                  "Kids Parties",
                  "Themed"
              ],
              "serviceImageQuery": "children birthday party table superhero princess themed plates cups balloons"
          }
    ],
    "galleryHeading": "Party Moments",
    "aboutHeading": "D\u00e9cor that creates <em>memories</em>",
    "aboutText": "We believe every celebration deserves to look beautiful \u2014 from a toddler's backyard birthday to a corporate milestone event. We provide the wow factor that turns a gathering into a memory.\n\nOur balloon artists are trained and creative. Our stock is fresh. Our delivery team arrives on time.",
    "aboutMission": "We believe the aesthetic of a celebration sets the emotional tone for the whole event \u2014 and we take that seriously.",
    "stats": [
      {
        "value": "7+",
        "label": "Years Supplying",
        "sublabel": "since 2017"
      },
      {
        "value": "1,000+",
        "label": "Events Decorated",
        "sublabel": "birthdays to corporate"
      },
      {
        "value": "200+",
        "label": "Themes Available",
        "sublabel": "in-store & custom"
      },
      {
        "value": "4.9\u2605",
        "label": "Google Rating",
        "sublabel": "from 400+ reviews"
      }
    ],
    "contactHeading": "Planning a party? Let's talk d\u00e9cor.",
    "testimonial": {
      "quote": "The balloon arch was the centrepiece of the whole party. Every photo looked incredible.",
      "author": "Priya R., Verified Client",
      "rating": 5
    },
    "imageMood": "colourful, festive, joyful",
    "heroImageQuery": "colourful balloon arch garland pastel pink gold entrance party decoration",
    "ogImageQuery": "birthday party table setup balloons streamers confetti plates cups colourful",
    "aboutImageQuery": "woman arranging balloon garland installation for birthday party decoration",
    "galleryImageQueries": [
      "party supply shop interior shelves balloons banners plates cups",
      "pastel balloon arch organic garland entrance baby shower decoration",
      "kids birthday party table themed plates cups napkins banner",
      "birthday cake table balloons bunting confetti celebration setup"
    ],
    "contactHours": "Mon\u2013Fri: 09:00\u201317:30 \u00b7 Sat: 09:00\u201314:00 \u00b7 Same-day collection available"
  },
  "Entertainment / Performer": {
    "heroEyebrow": "ENTERTAINMENT & PERFORMANCE",
    "heroAccent": "Corporate, private & public events",
    "tagline": "Entertainment that <em>elevates</em> any occasion",
    "heroSubtitle": "Professional performers, live musicians, and entertainment acts that captivate audiences and elevate every event.",
    "ctaPrimary": "Book Now",
    "ctaSecondary": "View Acts",
    "ctaNote": "Full tech rider provided \u00b7 Corporate & private available \u00b7 Demo videos on request",
    "badge": "SA Guild of Entertainment Professionals",
    "servicesHeading": "What We Do",
    "services": [
      {
        "name": "Live Music & Bands",
        "description": "Professional live bands and solo musicians across jazz, pop, acoustic, and function genres.",
        "tags": [
          "Live Music",
          "Jazz"
        ],
        "serviceImageQuery": "jazz band performing live instruments stage lighting"
      },
      {
        "name": "Corporate Entertainment",
        "description": "Keynote entertainment, after-dinner acts, emcees, and brand activations for corporate events.",
        "tags": [
          "Corporate Acts",
          "Emcee"
        ],
        "serviceImageQuery": "comedian speaker performing on stage microphone corporate dinner audience laughing"
      },
      {
        "name": "Children's Entertainment",
        "description": "Magicians, face painters, balloon artists, and interactive performers for children's parties.",
        "tags": [
          "Magician",
          "Children's Parties"
        ],
        "serviceImageQuery": "face painting children party entertainer colourful"
      },
        {
          "name": "Wedding Entertainment",
          "description": "Ceremony musicians, cocktail hour acts, and reception entertainment tailored to your wedding day timeline.",
          "tags": [
            "Wedding Music",
            "Ceremony"
          ],
          "serviceImageQuery": "acoustic guitar musician performing wedding ceremony garden"
        },
          {
              "name": "MC & Hosting",
              "description": "Professional event hosting, compere services, and audience engagement for conferences and gala dinners.",
              "tags": [
                  "MC",
                  "Hosting"
              ],
              "serviceImageQuery": "MC event host microphone stage corporate gala dinner"
          },
          {
              "name": "Team Building Entertainment",
              "description": "Interactive group activities, game shows, and fun challenges designed for corporate team bonding.",
              "tags": [
                  "Team Building",
                  "Interactive"
              ],
              "serviceImageQuery": "team building entertainment corporate group activity fun"
          }
    ],
    "galleryHeading": "In Performance",
    "aboutHeading": "Entertainment that <em>lands</em>",
    "aboutText": "Great entertainment doesn't just fill time \u2014 it creates the emotional centrepiece of an event. We represent performers who understand that responsibility.\n\nOur roster includes award-winning musicians, corporate entertainers, and children's performers who bring professionalism, energy, and genuine talent to every booking.",
    "aboutMission": "We believe live performance creates shared moments that no other medium can replicate.",
    "stats": [
      {
        "value": "12+",
        "label": "Years in Entertainment",
        "sublabel": "since 2012"
      },
      {
        "value": "300+",
        "label": "Events Performed",
        "sublabel": "annual average"
      },
      {
        "value": "25+",
        "label": "Performers on Roster",
        "sublabel": "all professional"
      },
      {
        "value": "4.9\u2605",
        "label": "Google Rating",
        "sublabel": "from 280+ reviews"
      }
    ],
    "contactHeading": "Want to book entertainment for your event?",
    "testimonial": {
      "quote": "The jazz quartet had everyone spellbound. Perfect read of the room all evening.",
      "author": "Barbara C., Verified Client",
      "rating": 5
    },
    "imageMood": "vibrant, live, celebratory",
    "heroImageQuery": "live band singer guitarist performing on stage spotlights concert audience",
    "ogImageQuery": "performer singing into microphone on stage dramatic spotlight",
    "aboutImageQuery": "jazz band saxophone trumpet bass performing at corporate dinner event",
    "galleryImageQueries": [
      "singer performing on stage coloured lights audience watching concert",
      "magician performing card trick to amazed audience close-up",
      "live acoustic band guitarist singer performing wedding reception",
      "children party entertainer clown making balloon animals kids laughing"
    ],
    "contactHours": "Available 7 days for events \u00b7 Bookings Mon\u2013Fri 09:00\u201317:00"
  },
  "Venue Hire": {
    "heroEyebrow": "VENUE HIRE CAPE TOWN",
    "heroAccent": "Flexible spaces for every occasion",
    "tagline": "The space where your event comes <em>alive</em>",
    "heroSubtitle": "Versatile, well-equipped event spaces for corporate meetings, private functions, product launches, and celebrations.",
    "ctaPrimary": "Check Availability",
    "ctaSecondary": "View Spaces",
    "ctaNote": "Half-day & full-day rates \u00b7 Catering partners available \u00b7 AV included",
    "badge": "SA Events Council Venue Member",
    "servicesHeading": "Our Spaces",
    "services": [
      {
        "name": "Corporate Meeting Rooms",
        "description": "Boardrooms and breakaway rooms for 8 to 30 people, fully equipped with AV and high-speed WiFi.",
        "tags": [
          "Boardroom",
          "AV Equipped"
        ],
        "serviceImageQuery": "modern boardroom meeting room long table chairs projector screen glass walls"
      },
      {
        "name": "Event Hall & Function Room",
        "description": "Versatile main event space for 50 to 300 guests, configurable for dinners, launches, and mixers.",
        "tags": [
          "Event Hall",
          "Flexible Layout"
        ],
        "serviceImageQuery": "large function hall interior round tables set for dinner event chandeliers"
      },
      {
        "name": "Outdoor Terrace & Garden",
        "description": "Landscaped outdoor spaces with catering points, perfect for cocktail functions and sundowner events.",
        "tags": [
          "Outdoor",
          "Sundowner"
        ],
        "serviceImageQuery": "outdoor terrace garden fairy lights cocktail setting evening"
      },
        {
          "name": "Workshop & Training Rooms",
          "description": "Dedicated workshop spaces for team training, seminars, and breakaway sessions with modular furniture and fast WiFi.",
          "tags": [
            "Workshop",
            "Training Room"
          ],
          "serviceImageQuery": "seminar training room rows of chairs desks whiteboard projector"
        },
          {
              "name": "Catering & Bar Packages",
              "description": "In-house and preferred caterer menus with cash bar, tab bar, and full-service beverage options.",
              "tags": [
                  "Catering",
                  "Bar"
              ],
              "serviceImageQuery": "catering buffet table food platters chafing dishes event function hall"
          },
          {
              "name": "Audio-Visual & Tech Setup",
              "description": "Built-in projectors, PA systems, microphones, and high-speed Wi-Fi for presentations and events.",
              "tags": [
                  "AV Equipment",
                  "Projector"
              ],
              "serviceImageQuery": "conference room projector screen microphone podium AV setup presentation"
          }
    ],
    "galleryHeading": "Our Spaces",
    "aboutHeading": "Spaces made for <em>remarkable</em> events",
    "aboutText": "Our venue was built with events in mind \u2014 the acoustics, the lighting, the flow between spaces, the service points. None of it happened by accident.\n\nWe host everything from intimate 10-person strategy sessions to 300-guest gala dinners. Our team knows events and they know our spaces inside out.",
    "aboutMission": "We believe a great venue disappears into the background of a great event \u2014 and that takes very deliberate design.",
    "stats": [
      {
        "value": "13+",
        "label": "Years Hosting",
        "sublabel": "since 2011"
      },
      {
        "value": "700+",
        "label": "Events Hosted",
        "sublabel": "corporate & private"
      },
      {
        "value": "5",
        "label": "Configurable Spaces",
        "sublabel": "10 to 300 guests"
      },
      {
        "value": "4.8\u2605",
        "label": "Google Rating",
        "sublabel": "from 350+ reviews"
      }
    ],
    "contactHeading": "Ready to check your date?",
    "testimonial": {
      "quote": "The most flexible, well-run venue I've used in Cape Town. Staff go above and beyond.",
      "author": "Dina F., Verified Client",
      "rating": 5
    },
    "imageMood": "versatile, elegant, professional",
    "heroImageQuery": "large elegant function hall interior set round tables white linen chandeliers",
    "ogImageQuery": "empty conference venue interior rows of chairs stage projector screen",
    "aboutImageQuery": "event hall interior decorated for gala dinner tables chairs flowers lighting",
    "galleryImageQueries": [
      "modern boardroom interior long table leather chairs screen window",
      "conference room rows chairs projector screen podium corporate meeting",
      "outdoor garden venue terrace fairy string lights evening cocktails",
      "cocktail event venue lounge sofas high tables bar evening"
    ],
    "contactHours": "Mon\u2013Fri: 08:00\u201318:00 \u00b7 Sat: 08:00\u201317:00 \u00b7 Events & functions 7 days"
  },
  "Plumber": {
      "heroEyebrow": "PROFESSIONAL PLUMBING CAPE TOWN",
      "heroAccent": "Licensed. Insured. Same-day available.",
      "tagline": "Plumbing sorted before it becomes a <em>crisis</em>",
      "heroSubtitle": "Fast, reliable plumbing repairs, installations, and maintenance for residential and commercial properties.",
      "ctaPrimary": "Get a Quote",
      "ctaSecondary": "Our Services",
      "ctaNote": "Same-day callouts \u00b7 No call-out fee on accepted quotes \u00b7 12-month guarantee",
      "badge": "IOPSA Registered Plumber",
      "servicesHeading": "What We Fix",
      "services": [
          {
              "name": "Leak Detection & Repair",
              "description": "Fast leak location using non-invasive detection technology and permanent repair on the same visit.",
              "tags": [
                  "Leak Detection",
                  "Same Day"
              ],
              "icon": "droplet",
              "serviceImageQuery": "copper pipe repair under sink close up"
          },
          {
              "name": "Geyser Installation & Repair",
              "description": "New geyser installations, element replacements, thermostat repairs, and solar geyser conversions.",
              "tags": [
                  "Geyser",
                  "Solar Conversion"
              ],
              "icon": "flame",
              "serviceImageQuery": "new water heater geyser installed on wall"
          },
          {
              "name": "Drainage & Blockage Clearing",
              "description": "High-pressure drain jetting and CCTV inspection to clear and diagnose blocked drains fast.",
              "tags": [
                  "Drain Jetting",
                  "CCTV"
              ],
              "icon": "tool",
              "serviceImageQuery": "high pressure water jet drain cleaning"
          },
          {
              "name": "Bathroom & Kitchen Plumbing",
              "description": "Full plumbing rough-in and fit-out for new bathrooms and kitchens \u2014 basins, toilets, showers, and dishwasher points.",
              "tags": [
                  "Bathroom Plumbing",
                  "Kitchen Fit-Out"
              ],
              "icon": "grid",
              "serviceImageQuery": "modern bathroom basin taps shower mixer installed"
          },
          {
              "name": "Water Pressure Solutions",
              "description": "Pressure valve installation, pressure pump fitting, and municipal supply optimisation for consistent flow.",
              "tags": [
                  "Pressure Pumps",
                  "Water Supply"
              ],
              "serviceImageQuery": "water pressure gauge plumbing system close up"
          },
          {
              "name": "Gas Installations & Certificates",
              "description": "LP gas installations, compliance certificates, and gas hob and geyser connections to SANS 10087 standards.",
              "tags": [
                  "Gas CoC",
                  "LP Gas"
              ],
              "serviceImageQuery": "gas stove installation plumber connection"
          }
      ],
      "galleryHeading": "Work Done Right",
      "aboutHeading": "Plumbing done <em>properly</em>",
      "aboutText": "We're a family-run plumbing business that has been fixing Cape Town's leaks since 2005. No subcontractors, no surprises on the invoice, no excuses if something isn't right.\n\nEvery job is quoted upfront. Every job is guaranteed. We arrive when we say we will.",
      "aboutMission": "We believe a plumber should leave your home in better condition than they found it \u2014 every single time.",
      "stats": [
          {
              "value": "19+",
              "label": "Years Trading",
              "sublabel": "since 2005"
          },
          {
              "value": "6,000+",
              "label": "Jobs Completed",
              "sublabel": "residential & commercial"
          },
          {
              "value": "12mo",
              "label": "Workmanship Guarantee",
              "sublabel": "on all work"
          },
          {
              "value": "4.8\u2605",
              "label": "Google Rating",
              "sublabel": "from 600+ reviews"
          }
      ],
      "contactHeading": "Got a leak that needs fixing today?",
      "contactHours": "Mon\u2013Fri: 07:00\u201318:00 \u00b7 Sat: 08:00\u201314:00 \u00b7 Emergency callouts 24hrs",
      "processSteps": [
          {
              "step": "1",
              "title": "Call or Book Online",
              "description": "Contact us and describe the issue \u2014 we'll advise if it's urgent."
          },
          {
              "step": "2",
              "title": "We Assess & Quote",
              "description": "A qualified plumber arrives, diagnoses, and provides a fixed written quote."
          },
          {
              "step": "3",
              "title": "Work Completed",
              "description": "Job done same visit where possible, guaranteed for 12 months."
          }
      ],
      "testimonial": {
          "quote": "Found and fixed a slab leak in 2 hours that three other plumbers couldn't locate.",
          "author": "Warren B., Verified Client",
          "rating": 5
      },
      "imageMood": "professional, clean, reliable",
      "heroImageQuery": "plumber fitting copper pipes under kitchen sink close up hands tools professional",
      "heroBgImageQuery": "copper plumbing pipes fittings valves dark moody background",
      "ogImageQuery": "completed modern bathroom renovation double basin vanity taps",
      "aboutImageQuery": "plumber tightening pipe fitting wrench under sink residential working",
      "galleryImageQueries": [
          "modern bathroom renovation freestanding bathtub brass taps completed",
          "new geyser water heater installed wall mounted utility room",
          "kitchen mixer tap installed granite countertop undermount sink",
          "underfloor heating pipes laid screed floor installation"
      ],
      "features": [
        { "name": "Same-Day Callouts", "description": "Burst geyser at 7am? We'll be there. Most emergency jobs are attended within 2 hours, with parts on the van to fix it first visit.", "imageQuery": "plumber van arriving residential house tools equipment ready service" },
        { "name": "Upfront Pricing, No Surprises", "description": "You get a written quote before any work starts. No hourly creep, no hidden call-out fees \u2014 just honest pricing.", "imageQuery": "plumber showing written quote clipboard homeowner kitchen discussion" },
        { "name": "12-Month Workmanship Guarantee", "description": "Every job is guaranteed for a full year. If something we fitted or repaired fails, we come back and fix it at no cost.", "imageQuery": "completed bathroom plumbing renovation modern fixtures quality finish" }
      ]
  },
  "Electrician": {
      "heroEyebrow": "CERTIFIED ELECTRICIAN CAPE TOWN",
      "heroAccent": "CoC issued on every qualifying job",
      "tagline": "Electrical work done safely, first <em>time</em>",
      "heroSubtitle": "Licensed electrical installations, fault finding, and upgrades for residential and light commercial properties.",
      "ctaPrimary": "Get a Quote",
      "ctaSecondary": "Our Services",
      "ctaNote": "CoC included \u00b7 No hidden fees \u00b7 Emergency callouts available",
      "badge": "ECASA Registered Electrician",
      "servicesHeading": "What We Do",
      "services": [
          {
              "name": "Fault Finding & Repairs",
              "description": "Rapid electrical fault diagnosis and repair for tripping breakers, dead circuits, and wiring faults.",
              "tags": [
                  "Fault Finding",
                  "Emergency"
              ],
              "icon": "zap",
              "serviceImageQuery": "electrical distribution board circuit breakers close up"
          },
          {
              "name": "DB Board Upgrades",
              "description": "Full distribution board upgrades, RCBO installations, and consumer unit replacements with CoC.",
              "tags": [
                  "DB Board",
                  "RCBO"
              ],
              "icon": "cpu",
              "serviceImageQuery": "new distribution board installed neat wiring"
          },
          {
              "name": "Solar & Backup Power",
              "description": "Solar panel installations, inverter setups, and battery backup solutions with full compliance.",
              "tags": [
                  "Solar",
                  "Inverter"
              ],
              "icon": "sun",
              "serviceImageQuery": "solar panels installed on residential roof blue sky"
          },
          {
              "name": "Lighting Design & Installation",
              "description": "Recessed downlights, LED strip lighting, outdoor lighting, and dimmer circuits for residential and commercial spaces.",
              "tags": [
                  "LED Downlights",
                  "Dimmers"
              ],
              "icon": "settings",
              "serviceImageQuery": "recessed LED downlights installed modern ceiling"
          },
          {
              "name": "EV Charger Installation",
              "description": "Home and commercial EV charging point installation with dedicated circuits and surge protection.",
              "tags": [
                  "EV Charging",
                  "Green Energy"
              ],
              "serviceImageQuery": "electric vehicle charger wall mounted home garage"
          },
          {
              "name": "Electrical Compliance Certificates",
              "description": "Full electrical inspections and CoC issue for property transfers, insurance, and landlord compliance.",
              "tags": [
                  "CoC",
                  "Inspections"
              ],
              "serviceImageQuery": "electrician testing distribution board multimeter"
          }
      ],
      "galleryHeading": "Work That Passes Inspection",
      "aboutHeading": "Electricity handled with <em>precision</em>",
      "aboutText": "Unsafe electrical work kills people. We take that seriously \u2014 every installation is done to SANS standards, and every job carries a Certificate of Compliance.\n\nWe are a small, qualified team. You'll always deal with a registered electrician, never an unqualified assistant.",
      "aboutMission": "We believe electrical safety is non-negotiable \u2014 and cutting corners to save time is never worth the risk.",
      "stats": [
          {
              "value": "17+",
              "label": "Years Trading",
              "sublabel": "since 2007"
          },
          {
              "value": "5,000+",
              "label": "Jobs Completed",
              "sublabel": "residential & commercial"
          },
          {
              "value": "100%",
              "label": "CoC Issue Rate",
              "sublabel": "on all qualifying work"
          },
          {
              "value": "4.9\u2605",
              "label": "Google Rating",
              "sublabel": "from 500+ reviews"
          }
      ],
      "contactHeading": "Need a quote or emergency callout?",
      "contactHours": "Mon\u2013Fri: 07:00\u201318:00 \u00b7 Sat: 08:00\u201314:00 \u00b7 Emergency callouts 24hrs",
      "processSteps": [
          {
              "step": "1",
              "title": "Request a Quote",
              "description": "Tell us the job \u2014 we'll confirm availability and provide a written quote."
          },
          {
              "step": "2",
              "title": "Inspection & Scope",
              "description": "We inspect the site and confirm exact scope before starting any work."
          },
          {
              "step": "3",
              "title": "Work & CoC Issued",
              "description": "All work completed to SANS 10142, CoC issued on completion."
          }
      ],
      "testimonial": {
          "quote": "Sorted our DB board issue in one visit. CoC arrived the same day. Exceptional.",
          "author": "Dave H., Verified Client",
          "rating": 5
      },
      "imageMood": "precise, professional, safe",
      "heroImageQuery": "electrician installing recessed LED downlights modern home ceiling hands tools",
      "heroBgImageQuery": "electrical cables wire connectors dark moody background",
      "ogImageQuery": "neat residential distribution board RCBO switches wiring installed",
      "aboutImageQuery": "electrician wiring residential distribution board screwdriver close up working",
      "galleryImageQueries": [
          "new distribution board RCBO switches neatly wired residential",
          "solar panels installed residential rooftop blue sky house",
          "recessed LED downlights installed modern living room ceiling",
          "outdoor garden pathway bollard lights illuminated night landscaping"
      ],
      "features": [
        { "name": "CoC Issued on Every Job", "description": "Every qualifying installation comes with a Certificate of Compliance \u2014 essential for insurance, property sales, and peace of mind.", "imageQuery": "electrician testing residential DB board multimeter compliance" },
        { "name": "Clean, Respectful Workmanship", "description": "We wear boot covers, clean up after ourselves, and leave your walls looking like we were never there. The work is invisible \u2014 on purpose.", "imageQuery": "neat electrical wiring conduit installation residential wall clean" },
        { "name": "Load-Shedding & Backup Solutions", "description": "From inverters to full off-grid setups, we design and install backup power systems so your home keeps running when the grid doesn't.", "imageQuery": "home inverter battery backup system wall mounted garage installation" }
      ]
  },
  "Builder / General Contractor": {
      "heroEyebrow": "BUILDING CONTRACTOR CAPE TOWN",
      "heroAccent": "NHBRC registered. Fully insured.",
      "tagline": "Building done right, from the <em>foundation</em> up",
      "heroSubtitle": "Residential construction, renovations, and additions managed by an experienced NHBRC-registered building contractor.",
      "ctaPrimary": "Get a Quote",
      "ctaSecondary": "Recent Projects",
      "ctaNote": "Written contracts \u00b7 Regular progress reports \u00b7 5-year structural guarantee",
      "badge": "NHBRC Registered Home Builder",
      "servicesHeading": "What We Build",
      "services": [
          {
              "name": "New Builds & Extensions",
              "description": "Full residential construction and extensions managed end-to-end from council submission to handover.",
              "tags": [
                  "New Builds",
                  "Extensions"
              ],
              "icon": "home",
              "serviceImageQuery": "new house construction brick walls foundation site"
          },
          {
              "name": "Renovations & Remodels",
              "description": "Structural renovations, kitchen and bathroom remodels, and full interior gut-and-rebuild projects.",
              "tags": [
                  "Renovations",
                  "Kitchen Remodel"
              ],
              "icon": "tool",
              "serviceImageQuery": "kitchen renovation remodel white cabinets island"
          },
          {
              "name": "Structural Repairs",
              "description": "Foundation repairs, wall crack remediation, structural waterproofing, and lintel replacements.",
              "tags": [
                  "Foundation",
                  "Waterproofing"
              ],
              "icon": "shield",
              "serviceImageQuery": "concrete foundation repair waterproofing membrane"
          },
          {
              "name": "Boundary Walls & Retaining Structures",
              "description": "Plastered boundary walls, retaining walls, and gabion structures built to council spec with engineer sign-off where required.",
              "tags": [
                  "Boundary Walls",
                  "Retaining Walls"
              ],
              "icon": "maximize",
              "serviceImageQuery": "plastered boundary wall residential property completed"
          },
          {
              "name": "Paving & Landscaping",
              "description": "Driveways, pathways, and garden hardscaping to complete your outdoor living area.",
              "tags": [
                  "Paving",
                  "Outdoor"
              ],
              "serviceImageQuery": "paving driveway construction bricks being laid"
          },
          {
              "name": "Waterproofing & Damp-Proofing",
              "description": "Roof, balcony, and below-grade waterproofing using proven membrane and coating systems.",
              "tags": [
                  "Waterproofing",
                  "Damp-Proof"
              ],
              "serviceImageQuery": "waterproofing membrane being applied roof deck"
          }
      ],
      "galleryHeading": "Recent Builds",
      "aboutHeading": "Building that stands the <em>test</em> of time",
      "aboutText": "We have been building and renovating homes in Cape Town for over 20 years. A successful build depends on communication, qualified tradespeople, and an uncompromising commitment to the spec.\n\nWe provide written contracts, regular progress updates, and we don't disappear mid-project.",
      "aboutMission": "We believe a building contractor should be the client's advocate on site \u2014 not just the person holding the schedule.",
      "stats": [
          {
              "value": "20+",
              "label": "Years Building",
              "sublabel": "since 2004"
          },
          {
              "value": "350+",
              "label": "Projects Completed",
              "sublabel": "new builds & renovations"
          },
          {
              "value": "5yr",
              "label": "Structural Guarantee",
              "sublabel": "NHBRC registered"
          },
          {
              "value": "4.8\u2605",
              "label": "Google Rating",
              "sublabel": "from 300+ reviews"
          }
      ],
      "contactHeading": "Ready to start planning your build?",
      "contactHours": "Mon\u2013Fri: 07:00\u201317:30 \u00b7 Sat: 08:00\u201313:00 \u00b7 Site visits by appointment",
      "processSteps": [
          {
              "step": "1",
              "title": "Site Visit & Quote",
              "description": "We visit the site, review drawings or scope, and provide a detailed written quote."
          },
          {
              "step": "2",
              "title": "Contract & Schedule",
              "description": "Signed contract, payment schedule, and build programme issued before any work starts."
          },
          {
              "step": "3",
              "title": "Build & Handover",
              "description": "Construction managed daily with progress photos and formal handover on completion."
          }
      ],
      "testimonial": {
          "quote": "Finished on budget and two weeks early. Our new home is everything we hoped for.",
          "author": "Nicola & Brett P., Verified Client",
          "rating": 5
      },
      "imageMood": "solid, professional, crafted",
      "heroImageQuery": "beautiful new build modern house completed exterior landscaped garden",
      "heroBgImageQuery": "construction hard hat spirit level tools dark moody background",
      "ogImageQuery": "completed modern residential home exterior landscaped driveway",
      "aboutImageQuery": "builder carefully laying brick wall spirit level quality construction site",
      "galleryImageQueries": [
          "new build house completed exterior modern architecture landscaped",
          "renovated open plan kitchen island white cabinets living room",
          "house extension second storey addition completed render",
          "luxury bathroom renovation modern tiles vanity freestanding bath"
      ],
      "features": [
        { "name": "Fixed-Price Contracts", "description": "We quote a fixed price and stick to it. No cost overruns, no vague allowances \u2014 you know exactly what you're paying before we break ground.", "imageQuery": "builder reviewing building plans blueprints with homeowner table meeting" },
        { "name": "NHBRC Registered", "description": "We're registered with the National Home Builders Registration Council, which means your new build is backed by a structural warranty.", "imageQuery": "residential construction site progress quality brickwork new build" },
        { "name": "Weekly Progress Reports", "description": "Every Friday you get photos, a progress summary, and the schedule for the week ahead. You're never left wondering what's happening on site.", "imageQuery": "construction site progress photos clipboard documentation builder" }
      ]
  },
  "Joiner / Carpenter": {
      "heroEyebrow": "BESPOKE JOINERY CAPE TOWN",
      "heroAccent": "Custom built. Fitted to perfection.",
      "tagline": "Woodwork made to last more than a <em>lifetime</em>",
      "heroSubtitle": "Custom built-in cupboards, kitchen cabinetry, and bespoke furniture crafted in solid wood in our Cape Town workshop.",
      "ctaPrimary": "Get a Quote",
      "ctaSecondary": "Our Work",
      "ctaNote": "Free site measure \u00b7 Fixed price quotes \u00b7 3-year guarantee",
      "badge": "Master Joiner Guild of SA Member",
      "servicesHeading": "What We Build",
      "services": [
          {
              "name": "Built-In Cupboards & Wardrobes",
              "description": "Floor-to-ceiling fitted wardrobes and storage designed precisely for your specific space and lifestyle.",
              "tags": [
                  "Built-In",
                  "Wardrobes"
              ],
              "icon": "layers",
              "serviceImageQuery": "built in wardrobe white doors floor to ceiling bedroom"
          },
          {
              "name": "Kitchen Cabinetry",
              "description": "Custom kitchen cabinets, island units, and pantry storage made to your layout and chosen finish.",
              "tags": [
                  "Kitchen Cabinets",
                  "Custom"
              ],
              "icon": "grid",
              "serviceImageQuery": "custom wooden kitchen cabinets oak shaker style"
          },
          {
              "name": "Bespoke Furniture",
              "description": "One-off dining tables, desks, shelving units, and statement pieces made by hand in our workshop.",
              "tags": [
                  "Bespoke Furniture",
                  "Solid Wood"
              ],
              "icon": "box",
              "serviceImageQuery": "handmade solid wood dining table rustic"
          },
          {
              "name": "Timber Decking & Pergolas",
              "description": "Hardwood and composite decking, pergola structures, and outdoor timber features built to withstand the Cape climate.",
              "tags": [
                  "Decking",
                  "Pergolas"
              ],
              "icon": "sun",
              "serviceImageQuery": "timber deck pergola outdoor patio garden completed"
          },
          {
              "name": "Door & Window Frames",
              "description": "Custom wooden door frames, window frames, and architraves fitted and finished to exact specifications.",
              "tags": [
                  "Door Frames",
                  "Windows"
              ],
              "serviceImageQuery": "carpenter fitting wooden door frame workshop"
          },
          {
              "name": "Shelving & Storage Solutions",
              "description": "Floating shelves, pantry units, and custom storage systems designed for any room in your home.",
              "tags": [
                  "Shelving",
                  "Storage"
              ],
              "serviceImageQuery": "custom wooden shelving unit modern home interior"
          }
      ],
      "galleryHeading": "From Our Workshop",
      "aboutHeading": "Joinery crafted with <em>pride</em>",
      "aboutText": "Every piece we make is built in our workshop in Paarden Eiland. We use solid timber, quality hardware, and finishing methods that ensure your cabinetry lasts for decades \u2014 not years.\n\nWe measure twice, cut once, and install without shortcuts. That old way is still the best way.",
      "aboutMission": "We believe bespoke joinery should feel seamless \u2014 as if the space was always designed that way.",
      "stats": [
          {
              "value": "18+",
              "label": "Years in Joinery",
              "sublabel": "since 2006"
          },
          {
              "value": "1,200+",
              "label": "Projects Completed",
              "sublabel": "residential & commercial"
          },
          {
              "value": "3yr",
              "label": "Workmanship Guarantee",
              "sublabel": "on all installations"
          },
          {
              "value": "4.9\u2605",
              "label": "Google Rating",
              "sublabel": "from 400+ reviews"
          }
      ],
      "contactHeading": "Want a free site measure and quote?",
      "contactHours": "Mon\u2013Fri: 07:30\u201317:00 \u00b7 Sat: 08:00\u201313:00 \u00b7 Workshop visits by appointment",
      "processSteps": [
          {
              "step": "1",
              "title": "Free Site Measure",
              "description": "We visit to measure precisely and discuss your design preferences and material choices."
          },
          {
              "step": "2",
              "title": "Design & Quote",
              "description": "Detailed drawings and a fixed-price quote issued within 3 business days."
          },
          {
              "step": "3",
              "title": "Build & Install",
              "description": "Workshop build followed by professional installation and a full clean-up on completion."
          }
      ],
      "testimonial": {
          "quote": "The kitchen looks like it was built with the house. Perfect craftsmanship, exactly as quoted.",
          "author": "Pippa L., Verified Client",
          "rating": 5
      },
      "imageMood": "warm, crafted, precise",
      "heroImageQuery": "custom built-in wooden bookshelf living room warm oak shelving",
      "heroBgImageQuery": "wood shavings chisel plane carpentry tools dark workshop background",
      "ogImageQuery": "fitted wardrobe doors open organized shelving interior lighting",
      "aboutImageQuery": "carpenter hand planing timber plank workshop bench shavings craftsmanship",
      "galleryImageQueries": [
          "built-in wardrobe walk-in closet organized shelving drawers",
          "custom kitchen cabinetry wooden island shaker doors completed",
          "handmade solid wood desk home office bespoke furniture",
          "floating timber shelves mounted white wall living room books"
      ],
      "features": [
        { "name": "Bespoke, Made-to-Measure", "description": "Nothing is off the shelf. Every piece is designed around your space, your style, and your exact measurements.", "imageQuery": "custom fitted built-in wardrobe bespoke carpentry bedroom storage" },
        { "name": "Workshop & On-Site Capability", "description": "We build in our workshop for precision and install on-site for a perfect fit. Best of both worlds, no compromises.", "imageQuery": "carpenter woodworking workshop bench hand tools timber precision" },
        { "name": "Sustainably Sourced Timber", "description": "We use FSC-certified and locally milled timber wherever possible. Beautiful furniture shouldn't cost the planet.", "imageQuery": "natural hardwood timber grain texture quality material close up" }
      ]
  },
  "Welder / Metalworker": {
      "heroEyebrow": "FABRICATION & WELDING CAPE TOWN",
      "heroAccent": "MIG, TIG & structural welding specialists",
      "tagline": "Metal shaped to your exact <em>specification</em>",
      "heroSubtitle": "Custom metal fabrication, structural welding, and ornamental ironwork for residential, commercial, and industrial clients.",
      "ctaPrimary": "Get a Quote",
      "ctaSecondary": "Our Work",
      "ctaNote": "Workshop & on-site welding \u00b7 Drawings accepted \u00b7 Rush projects considered",
      "badge": "SA Institute of Welding Member",
      "servicesHeading": "What We Fabricate",
      "services": [
          {
              "name": "Custom Gates & Fencing",
              "description": "Bespoke driveway gates, garden fencing, and security panels designed and powder-coated to spec.",
              "tags": [
                  "Gates",
                  "Powder Coated"
              ],
              "icon": "shield",
              "serviceImageQuery": "ornamental iron driveway gate black powder coated"
          },
          {
              "name": "Structural Steelwork",
              "description": "Structural beams, columns, staircases, and mezzanine decks fabricated and installed on site.",
              "tags": [
                  "Structural",
                  "Staircases"
              ],
              "icon": "maximize",
              "serviceImageQuery": "steel staircase industrial modern wood treads"
          },
          {
              "name": "Ornamental & Decorative Iron",
              "description": "Balustrades, window grilles, pergola frames, and decorative metalwork made to your design.",
              "tags": [
                  "Balustrades",
                  "Grilles"
              ],
              "icon": "star",
              "serviceImageQuery": "wrought iron balustrade railing staircase decorative"
          },
          {
              "name": "Security Doors & Burglar Bars",
              "description": "Custom security gates, slam-lock doors, and clear-guard burglar bars fabricated and fitted to your openings.",
              "tags": [
                  "Security Gates",
                  "Burglar Bars"
              ],
              "icon": "lock",
              "serviceImageQuery": "steel security gate slam lock door installed"
          },
          {
              "name": "Balustrades & Handrails",
              "description": "Steel, stainless, and wrought iron balustrades for staircases, balconies, and mezzanines.",
              "tags": [
                  "Balustrades",
                  "Staircases"
              ],
              "serviceImageQuery": "steel balustrade handrail modern staircase interior"
          },
          {
              "name": "Industrial Fabrication",
              "description": "Custom steel frames, brackets, platforms, and structural components for commercial and industrial projects.",
              "tags": [
                  "Fabrication",
                  "Industrial"
              ],
              "serviceImageQuery": "industrial steel fabrication welding workshop sparks"
          }
      ],
      "galleryHeading": "From the Workshop",
      "aboutHeading": "Fabrication that <em>outlasts</em> everything",
      "aboutText": "Metal done properly lasts for generations. We fabricate using quality steel, stainless, and aluminium with certified welding techniques and finish every piece with industrial powder coating.\n\nWe work from drawings, sketches, or a clear brief. If it can be made from metal, we can make it.",
      "aboutMission": "We believe quality metalwork is the backbone of buildings and spaces that endure.",
      "stats": [
          {
              "value": "22+",
              "label": "Years Fabricating",
              "sublabel": "since 2002"
          },
          {
              "value": "3,000+",
              "label": "Projects Completed",
              "sublabel": "residential & commercial"
          },
          {
              "value": "5",
              "label": "Certified Welders",
              "sublabel": "structural & ornamental"
          },
          {
              "value": "4.8\u2605",
              "label": "Google Rating",
              "sublabel": "from 250+ reviews"
          }
      ],
      "contactHeading": "Ready to get your project quoted?",
      "contactHours": "Mon\u2013Fri: 07:00\u201317:00 \u00b7 Sat: 07:00\u201313:00 \u00b7 Workshop by appointment",
      "processSteps": [
          {
              "step": "1",
              "title": "Submit Brief or Drawings",
              "description": "Send us dimensions, sketches, or engineering drawings for an accurate quote."
          },
          {
              "step": "2",
              "title": "Quote & Approval",
              "description": "We quote within 2 days \u2014 approve and we schedule your job into production."
          },
          {
              "step": "3",
              "title": "Fabricate & Deliver",
              "description": "Built in our workshop, delivered and installed on site or ready for collection."
          }
      ],
      "testimonial": {
          "quote": "The staircase is the highlight of our home. Exactly spec'd, beautifully finished.",
          "author": "Ross D., Verified Client",
          "rating": 5
      },
      "imageMood": "industrial, precise, strong",
      "heroImageQuery": "custom ornamental steel driveway gate installed modern residential entrance",
      "heroBgImageQuery": "welder MIG welding sparks flying dark workshop close up",
      "ogImageQuery": "ornamental wrought iron gate entrance powder coated black installed",
      "aboutImageQuery": "welder wearing helmet MIG welding steel sparks flying workshop action",
      "galleryImageQueries": [
          "modern steel sliding gate driveway motor automated installed",
          "metal spiral staircase wood treads interior industrial design",
          "decorative wrought iron window security bars residential",
          "steel pergola frame outdoor patio structure powder coated"
      ],
      "features": [
        { "name": "Structural & Decorative Expertise", "description": "From load-bearing steel beams to ornamental balustrades, we handle both the heavy-duty and the fine detail.", "imageQuery": "ornamental wrought iron gate custom metalwork fabrication detail" },
        { "name": "Coded Welding Certified", "description": "Our welders hold coded certifications for structural steel, pressure vessels, and aluminium \u2014 meeting the highest safety standards.", "imageQuery": "welder protective helmet precision TIG welding stainless steel" },
        { "name": "On-Site Mobile Welding", "description": "We come to you with a fully equipped mobile rig. No need to remove or transport heavy items \u2014 we weld wherever the job is.", "imageQuery": "mobile welding service truck equipment tools on-site residential" }
      ]
  },
  "Paving / Tiling": {
      "heroEyebrow": "PAVING & TILING CAPE TOWN",
      "heroAccent": "Driveways, patios & interior floors",
      "tagline": "Surfaces that make the right first <em>impression</em>",
      "heroSubtitle": "Professional paving and tiling for driveways, patios, pool surrounds, and interior floors \u2014 done neatly and built to last.",
      "ctaPrimary": "Get a Quote",
      "ctaSecondary": "Our Work",
      "ctaNote": "Free measure & quote \u00b7 Material supply available \u00b7 5-year workmanship guarantee",
      "badge": "TASA Registered Tiling Contractor",
      "servicesHeading": "What We Lay",
      "services": [
          {
              "name": "Driveway & Pathway Paving",
              "description": "Concrete brick, natural stone, and permeable paving for driveways, paths, and parking areas.",
              "tags": [
                  "Driveways",
                  "Natural Stone"
              ],
              "icon": "map",
              "serviceImageQuery": "brick paved driveway herringbone pattern completed"
          },
          {
              "name": "Patio & Pool Surrounds",
              "description": "Outdoor tiling and paving for patios, braai areas, and pool surround installations.",
              "tags": [
                  "Patio",
                  "Pool Surround"
              ],
              "icon": "sun",
              "serviceImageQuery": "stone patio pool surround outdoor tiles sunny"
          },
          {
              "name": "Interior Floor Tiling",
              "description": "Large-format porcelain, ceramic, and natural stone tiling for kitchens, bathrooms, and living areas.",
              "tags": [
                  "Porcelain",
                  "Bathroom Tiling"
              ],
              "icon": "grid",
              "serviceImageQuery": "large format porcelain floor tiles modern living room"
          },
          {
              "name": "Wall Tiling & Splashbacks",
              "description": "Kitchen splashbacks, bathroom wall tiling, and decorative feature walls in mosaic, subway, or natural stone.",
              "tags": [
                  "Splashbacks",
                  "Wall Tiling"
              ],
              "icon": "square",
              "serviceImageQuery": "kitchen splashback subway tiles white wall installed"
          },
          {
              "name": "Stone & Natural Cladding",
              "description": "Natural stone cladding for feature walls, fireplaces, and building facades with expert installation.",
              "tags": [
                  "Stone Cladding",
                  "Feature Walls"
              ],
              "serviceImageQuery": "natural stone cladding feature wall installation"
          },
          {
              "name": "Grouting & Re-Grouting",
              "description": "Professional grout removal, colour-matched re-grouting, and epoxy grout application for lasting finishes.",
              "tags": [
                  "Re-Grouting",
                  "Restoration"
              ],
              "serviceImageQuery": "tile grouting bathroom floor professional finish"
          }
      ],
      "galleryHeading": "Surfaces We've Laid",
      "aboutHeading": "Paving and tiling done <em>once</em>, done right",
      "aboutText": "We've been laying surfaces across Cape Town for 16 years. A bad tiling or paving job looks fine for a year and falls apart the next winter. We prepare the substrate properly, use the correct adhesives, and lay with the care that lasts.\n\nEvery quote includes material recommendations. We only specify what we'd use on our own homes.",
      "aboutMission": "We believe the quality of the surface beneath you sets the foundation for everything built upon it.",
      "stats": [
          {
              "value": "16+",
              "label": "Years Laying",
              "sublabel": "since 2008"
          },
          {
              "value": "2,000+",
              "label": "Projects Completed",
              "sublabel": "interior & exterior"
          },
          {
              "value": "5yr",
              "label": "Workmanship Guarantee",
              "sublabel": "on all installations"
          },
          {
              "value": "4.8\u2605",
              "label": "Google Rating",
              "sublabel": "from 350+ reviews"
          }
      ],
      "contactHeading": "Need a free measure and quote?",
      "contactHours": "Mon\u2013Fri: 07:00\u201317:30 \u00b7 Sat: 07:30\u201313:00 \u00b7 Site visits by appointment",
      "processSteps": [
          {
              "step": "1",
              "title": "Free Site Measure",
              "description": "We measure the area and advise on best materials for your specific application."
          },
          {
              "step": "2",
              "title": "Fixed Quote Issued",
              "description": "Written quote with material and labour costs itemised \u2014 no surprises on the invoice."
          },
          {
              "step": "3",
              "title": "Professional Installation",
              "description": "Substrate prep, installation, grouting, and site clean-up \u2014 complete handover."
          }
      ],
      "testimonial": {
          "quote": "The driveway looks incredible and was finished in two days exactly as quoted.",
          "author": "Gail T., Verified Client",
          "rating": 5
      },
      "imageMood": "clean, precise, durable",
      "heroImageQuery": "freshly laid brick paved driveway herringbone pattern residential house entrance",
      "heroBgImageQuery": "paving brick stone tiles neatly arranged dark textured background",
      "ogImageQuery": "completed brick paved driveway residential house entrance neat",
      "aboutImageQuery": "tiler laying large porcelain floor tiles spacer close up hands working",
      "galleryImageQueries": [
          "herringbone brick paved driveway completed residential entrance",
          "outdoor stone patio tiled seating area garden furniture",
          "marble herringbone bathroom floor tiles modern vanity",
          "natural stone pool surround tiles completed blue water"
      ],
      "features": [
        { "name": "Laser-Level Precision", "description": "Every surface we lay is laser-levelled. No lippage, no uneven grout lines \u2014 just flawless finishes you can see from any angle.", "imageQuery": "perfectly laid porcelain floor tiles even grout lines close up" },
        { "name": "Full Prep Included", "description": "We handle everything from screed and waterproofing to cutting and grouting. You don't need to coordinate multiple trades.", "imageQuery": "tiler applying adhesive screed substrate preparation floor" },
        { "name": "Indoor & Outdoor Specialists", "description": "Porcelain, natural stone, clay pavers, cobble \u2014 we work with every material and surface, inside and out.", "imageQuery": "beautiful outdoor stone paved patio garden seating landscaping" }
      ]
  },
  "Roofer": {
      "heroEyebrow": "ROOFING SPECIALISTS CAPE TOWN",
      "heroAccent": "Cape winter-ready. Guaranteed.",
      "tagline": "Roofs that keep the Cape winter <em>outside</em>",
      "heroSubtitle": "Professional roof repairs, waterproofing, re-roofing, and gutters for residential and commercial properties.",
      "ctaPrimary": "Book an Inspection",
      "ctaSecondary": "Our Services",
      "ctaNote": "Free roof inspections \u00b7 Storm damage specialists \u00b7 10-year waterproofing guarantee",
      "badge": "NRCA SA Registered Roofing Contractor",
      "servicesHeading": "What We Do",
      "services": [
          {
              "name": "Roof Repairs & Maintenance",
              "description": "Leak repairs, broken tile replacement, ridge capping, and preventive maintenance inspections.",
              "tags": [
                  "Leak Repairs",
                  "Tiles"
              ],
              "icon": "home",
              "serviceImageQuery": "roof tile replacement repair close up clay tiles"
          },
          {
              "name": "Waterproofing & Coatings",
              "description": "Flat roof waterproofing, liquid membrane coatings, and parapet wall sealing with long-term guarantee.",
              "tags": [
                  "Waterproofing",
                  "Flat Roof"
              ],
              "icon": "shield",
              "serviceImageQuery": "flat roof waterproofing membrane coating applied"
          },
          {
              "name": "Full Re-Roofing",
              "description": "Complete roof strip and re-roof in IBR, Nutec, or clay tile with new battening and membrane.",
              "tags": [
                  "Re-Roofing",
                  "IBR"
              ],
              "icon": "layers",
              "serviceImageQuery": "new metal roof sheets installed house IBR"
          },
          {
              "name": "Gutters & Downpipes",
              "description": "Seamless aluminium gutters, PVC downpipes, and leaf guards installed, replaced, or repaired across all roof types.",
              "tags": [
                  "Gutters",
                  "Leaf Guards"
              ],
              "icon": "tool",
              "serviceImageQuery": "seamless aluminium gutter downpipe installed roof edge"
          },
          {
              "name": "Skylights & Roof Windows",
              "description": "Supply and install skylights, roof windows, and light tubes to bring natural light into dark spaces.",
              "tags": [
                  "Skylights",
                  "Natural Light"
              ],
              "serviceImageQuery": "skylight installation roof window natural light"
          },
          {
              "name": "Roof Inspections & Reports",
              "description": "Comprehensive roof condition reports for insurance claims, property sales, and planned maintenance.",
              "tags": [
                  "Inspections",
                  "Reports"
              ],
              "serviceImageQuery": "roofer inspecting tiles on residential roof"
          }
      ],
      "galleryHeading": "Roofs We've Fixed",
      "aboutHeading": "Roofing done before the <em>next</em> storm",
      "aboutText": "Cape Town winters are unforgiving. A compromised roof becomes a major problem the first time the south-easter hits with rain. We inspect, diagnose, and repair without drama.\n\nWe have been on Cape Town rooftops for 18 years. We know the common failure points and we fix them permanently.",
      "aboutMission": "We believe a sound roof is the most important investment you can make in a Cape Town property.",
      "stats": [
          {
              "value": "18+",
              "label": "Years Roofing",
              "sublabel": "since 2006"
          },
          {
              "value": "4,000+",
              "label": "Roofs Repaired",
              "sublabel": "residential & commercial"
          },
          {
              "value": "10yr",
              "label": "Waterproofing Guarantee",
              "sublabel": "on qualifying systems"
          },
          {
              "value": "4.8\u2605",
              "label": "Google Rating",
              "sublabel": "from 500+ reviews"
          }
      ],
      "contactHeading": "Want a free roof inspection?",
      "contactHours": "Mon\u2013Fri: 07:00\u201317:00 \u00b7 Sat: 07:30\u201313:00 \u00b7 Storm emergencies 24hrs",
      "processSteps": [
          {
              "step": "1",
              "title": "Free Roof Inspection",
              "description": "We inspect the full roof and identify all current and potential problem areas."
          },
          {
              "step": "2",
              "title": "Written Quote",
              "description": "Detailed written quote itemising all work \u2014 photos included to support findings."
          },
          {
              "step": "3",
              "title": "Repair & Certify",
              "description": "Work completed to spec with a written guarantee and photographic completion record."
          }
      ],
      "testimonial": {
          "quote": "Fixed a leak that had defeated two other roofers. No leaks through two Cape winters since.",
          "author": "Colin S., Verified Client",
          "rating": 5
      },
      "imageMood": "solid, professional, weatherproof",
      "heroImageQuery": "roofer installing new clay tiles on residential roof blue sky sunny",
      "heroBgImageQuery": "clay roof tiles stacked neatly dark moody background",
      "ogImageQuery": "completed new clay tile roof residential house blue sky",
      "aboutImageQuery": "roofer nailing tile battens on roof ridge working harness sunny day",
      "galleryImageQueries": [
          "new clay tile roof completed residential house aerial view",
          "flat roof waterproofing membrane white coating applied",
          "new corrugated metal IBR roof sheets installed building",
          "seamless aluminium gutters downpipes installed house fascia"
      ],
      "features": [
        { "name": "Full Waterproofing Guarantee", "description": "Every roof we touch comes with a written waterproofing guarantee. If it leaks within the warranty period, we fix it free.", "imageQuery": "completed new roof tiles waterproof quality residential house" },
        { "name": "Emergency Leak Response", "description": "Storm damage doesn't wait for business hours. We offer rapid-response leak repairs to protect your home when it matters most.", "imageQuery": "roofer repairing roof tiles storm damage emergency tarp" },
        { "name": "Drone Roof Inspections", "description": "We inspect your roof by drone before quoting \u2014 so you get an accurate assessment without anyone walking on fragile tiles.", "imageQuery": "drone flying inspecting residential rooftop tiles aerial technology" }
      ]
  },
  "Painter / Decorator": {
      "heroEyebrow": "PROFESSIONAL PAINTERS CAPE TOWN",
      "heroAccent": "Interior, exterior & decorative finishes",
      "tagline": "The transformation that costs less than you <em>think</em>",
      "heroSubtitle": "Professional interior and exterior painting with meticulous surface preparation and quality paints that last for years.",
      "ctaPrimary": "Get a Quote",
      "ctaSecondary": "Colour Consultation",
      "ctaNote": "Free quotes \u00b7 Dulux & Plascon specified \u00b7 Neat, clean teams every time",
      "badge": "Master Painters Association of SA Member",
      "servicesHeading": "What We Paint",
      "services": [
          {
              "name": "Interior Painting",
              "description": "Full interior repaints, ceiling whites, and feature walls with expert colour consultation included.",
              "tags": [
                  "Interior",
                  "Feature Walls"
              ],
              "icon": "edit",
              "serviceImageQuery": "freshly painted white living room interior bright walls"
          },
          {
              "name": "Exterior & Facade Painting",
              "description": "Weatherproof exterior painting and facade preparation using Plascon and Dulux exterior systems.",
              "tags": [
                  "Exterior",
                  "Weatherproof"
              ],
              "icon": "home",
              "serviceImageQuery": "freshly painted house exterior white facade"
          },
          {
              "name": "Decorative & Textured Finishes",
              "description": "Venetian plaster, exposed brick paint effects, and decorative textured finishes for feature areas.",
              "tags": [
                  "Venetian Plaster",
                  "Textured"
              ],
              "icon": "star",
              "serviceImageQuery": "venetian plaster textured wall finish grey warm"
          },
          {
              "name": "Roof & Floor Coatings",
              "description": "Protective roof paint coatings, epoxy garage floors, and deck sealing to extend surface life and appearance.",
              "tags": [
                  "Roof Coating",
                  "Epoxy Floor"
              ],
              "icon": "shield",
              "serviceImageQuery": "epoxy garage floor coating grey glossy finish"
          },
          {
              "name": "Wallpapering & Feature Walls",
              "description": "Expert wallpaper hanging including patterned, textured, and bespoke mural installations.",
              "tags": [
                  "Wallpaper",
                  "Feature Walls"
              ],
              "serviceImageQuery": "wallpaper installation feature wall modern bedroom"
          },
          {
              "name": "Colour Consultation",
              "description": "On-site colour consultations with sample boards to help you choose the perfect palette for every room.",
              "tags": [
                  "Colour Advice",
                  "Consultation"
              ],
              "serviceImageQuery": "paint colour swatches samples interior design consultation"
          }
      ],
      "galleryHeading": "Fresh Coats",
      "aboutHeading": "Painting that <em>transforms</em> a space",
      "aboutText": "A fresh coat of paint is the cheapest renovation you'll ever do, if it's done properly. The preparation is 80% of the job \u2014 filling, sanding, priming, masking. That's where we invest the time.\n\nOur teams are neat, reliable, and leave a site cleaner than they found it.",
      "aboutMission": "We believe colour and quality finish are the most impactful, cost-effective transformations a property can undergo.",
      "stats": [
          {
              "value": "15+",
              "label": "Years Painting",
              "sublabel": "since 2009"
          },
          {
              "value": "3,000+",
              "label": "Rooms Painted",
              "sublabel": "residential & commercial"
          },
          {
              "value": "10",
              "label": "Skilled Painters",
              "sublabel": "fully employed team"
          },
          {
              "value": "4.9\u2605",
              "label": "Google Rating",
              "sublabel": "from 400+ reviews"
          }
      ],
      "contactHeading": "Ready for a fresh start?",
      "contactHours": "Mon\u2013Fri: 07:00\u201317:30 \u00b7 Sat: 08:00\u201313:00 \u00b7 Quotes by appointment",
      "processSteps": [
          {
              "step": "1",
              "title": "Quote & Colour Consult",
              "description": "We visit, measure, and provide a colour consultation with your written quote."
          },
          {
              "step": "2",
              "title": "Preparation",
              "description": "All surfaces filled, sanded, primed, and masked before any top coat is applied."
          },
          {
              "step": "3",
              "title": "Paint & Finish",
              "description": "Two coats applied, touch-ups completed, site cleaned, and snag list signed off."
          }
      ],
      "testimonial": {
          "quote": "The preparation was more thorough than any painter I've used. The finish is flawless.",
          "author": "Elaine P., Verified Client",
          "rating": 5
      },
      "imageMood": "fresh, bright, clean",
      "heroImageQuery": "painter rolling white paint on living room wall roller tray interior bright",
      "heroBgImageQuery": "paint brushes rollers tins dark background decorating supplies",
      "ogImageQuery": "freshly painted white living room bright modern furniture",
      "aboutImageQuery": "professional painter cutting in with brush wall edge interior working",
      "galleryImageQueries": [
          "freshly painted bedroom sage green feature wall white trim",
          "house exterior freshly painted white facade trim gutters",
          "venetian plaster textured accent wall warm grey interior",
          "painted hallway staircase bright white transformation clean"
      ],
      "features": [
        { "name": "Proper Surface Preparation", "description": "We spend as much time prepping as painting. Cracks filled, surfaces sanded, primer applied \u2014 that's why our finishes last years, not months.", "imageQuery": "painter sanding wall surface preparation filling cracks masking tape" },
        { "name": "Colour Consultation Included", "description": "Not sure which colour to choose? We bring sample pots, test patches, and years of experience to help you get it right first time.", "imageQuery": "paint colour swatch cards fan deck samples interior wall consultation" },
        { "name": "Furniture & Floors Protected", "description": "We cover everything properly with dust sheets and masking before a single brush stroke. Your home is treated with respect.", "imageQuery": "painter dust sheets covering furniture floor masking tape preparation" }
      ]
  },
  "Glazier": {
      "heroEyebrow": "GLASS & GLAZING CAPE TOWN",
      "heroAccent": "Aluminium, frameless & shower enclosures",
      "tagline": "Glass fitted with absolute <em>precision</em>",
      "heroSubtitle": "Professional glazing, aluminium windows, frameless shower doors, and glass replacements for residential and commercial properties.",
      "ctaPrimary": "Get a Quote",
      "ctaSecondary": "Our Services",
      "ctaNote": "Safety glass always used \u00b7 24hr emergency boarding \u00b7 5-year installation guarantee",
      "badge": "GFASA Registered Glazing Contractor",
      "servicesHeading": "What We Install",
      "services": [
          {
              "name": "Frameless & Semi-Frameless Showers",
              "description": "Custom frameless shower enclosures, screens, and doors in toughened safety glass.",
              "tags": [
                  "Frameless Shower",
                  "Toughened Glass"
              ],
              "icon": "square",
              "serviceImageQuery": "frameless glass shower enclosure modern bathroom"
          },
          {
              "name": "Aluminium Windows & Doors",
              "description": "New aluminium window frames, sliding doors, and bi-fold installations for any size opening.",
              "tags": [
                  "Aluminium Windows",
                  "Sliding Doors"
              ],
              "icon": "maximize",
              "serviceImageQuery": "aluminium sliding doors large glass panels living room"
          },
          {
              "name": "Glass Repairs & Replacements",
              "description": "Broken window replacement, safety glass upgrades, and emergency boarding for all glass types.",
              "tags": [
                  "Emergency Repair",
                  "Safety Glass"
              ],
              "icon": "tool",
              "serviceImageQuery": "new glass window pane installed frame"
          },
          {
              "name": "Glass Balustrades & Pool Fencing",
              "description": "Frameless glass balustrades for balconies, staircases, and pool enclosures in toughened safety glass.",
              "tags": [
                  "Balustrades",
                  "Pool Fencing"
              ],
              "icon": "shield",
              "serviceImageQuery": "frameless glass balustrade balcony railing modern"
          },
          {
              "name": "Shopfront & Commercial Glazing",
              "description": "Storefronts, office partitions, and commercial glazing installations built to safety standards.",
              "tags": [
                  "Shopfronts",
                  "Commercial"
              ],
              "serviceImageQuery": "glass shopfront commercial storefront installation"
          },
          {
              "name": "Mirror Supply & Installation",
              "description": "Custom-cut mirrors for bathrooms, gyms, wardrobes, and decorative feature walls.",
              "tags": [
                  "Mirrors",
                  "Custom Cut"
              ],
              "serviceImageQuery": "large mirror installation bathroom vanity modern"
          }
      ],
      "galleryHeading": "Clear Results",
      "aboutHeading": "Glazing that <em>frames</em> your space",
      "aboutText": "Glass is one of the most transformative elements in a building \u2014 when installed well, it disappears. When installed badly, you notice it every day.\n\nOur glaziers are experienced with all glass types and every application. We use toughened safety glass as standard and template every frameless installation on site.",
      "aboutMission": "We believe great glazing should enhance light, space, and safety without ever drawing attention to itself.",
      "stats": [
          {
              "value": "21+",
              "label": "Years Glazing",
              "sublabel": "since 2003"
          },
          {
              "value": "4,500+",
              "label": "Installations",
              "sublabel": "residential & commercial"
          },
          {
              "value": "5yr",
              "label": "Installation Guarantee",
              "sublabel": "on all fitted work"
          },
          {
              "value": "4.8\u2605",
              "label": "Google Rating",
              "sublabel": "from 420+ reviews"
          }
      ],
      "contactHeading": "Need a quote or emergency boarding?",
      "contactHours": "Mon\u2013Fri: 07:30\u201317:30 \u00b7 Sat: 08:00\u201313:00 \u00b7 Emergency boarding 24hrs",
      "processSteps": [
          {
              "step": "1",
              "title": "Measure & Quote",
              "description": "We visit, measure all openings precisely, and provide a fixed written quote."
          },
          {
              "step": "2",
              "title": "Glass Cut & Prepared",
              "description": "All glass cut, tempered, and finished to exact dimensions in our workshop."
          },
          {
              "step": "3",
              "title": "Installation & Seal",
              "description": "Professional installation with silicone sealing, cleaning, and site sign-off."
          }
      ],
      "testimonial": {
          "quote": "The frameless shower transformed our bathroom. Perfectly fitted, not a drip anywhere.",
          "author": "Tamara H., Verified Client",
          "rating": 5
      },
      "imageMood": "clean, light, precise",
      "heroImageQuery": "glazier carrying large glass panel window installation residential suction cups",
      "heroBgImageQuery": "glass panes stacked dark reflective background glazing workshop",
      "ogImageQuery": "frameless glass shower door installed modern white bathroom",
      "aboutImageQuery": "glazier fitting aluminium window frame glass panel residential installation working",
      "galleryImageQueries": [
          "frameless glass shower enclosure walk-in modern bathroom installed",
          "aluminium sliding window frames installed modern house exterior",
          "glass bi-fold doors open garden patio natural light",
          "frameless glass balustrade balcony railing stainless steel modern"
      ],
      "features": [
        { "name": "Emergency Board-Up & Replacement", "description": "Broken window? We'll board up within hours and have your new glass fitted fast \u2014 keeping your home safe and weatherproof.", "imageQuery": "glazier measuring replacing window glass pane residential" },
        { "name": "Energy-Efficient Glass Options", "description": "We supply and fit low-E, double-glazed, and tinted glass that keeps your home cooler in summer and warmer in winter.", "imageQuery": "double glazed window unit installed residential energy efficient" },
        { "name": "Shower Glass & Custom Cut", "description": "From frameless shower doors to custom mirrors and glass balustrades, we measure, cut, and install to exact specifications.", "imageQuery": "frameless glass shower screen door fitted modern bathroom chrome" }
      ]
  },
  "Locksmith": {
      "heroEyebrow": "LOCKSMITH CAPE TOWN",
      "heroAccent": "Response within 30 minutes. Always.",
      "tagline": "Back inside \u2014 or better secured \u2014 in <em>minutes</em>",
      "heroSubtitle": "Emergency lockouts, high-security lock upgrades, and access control installations from a certified Cape Town locksmith.",
      "ctaPrimary": "Call Now",
      "ctaSecondary": "Our Services",
      "ctaNote": "30-min response \u00b7 Upfront pricing \u00b7 No call-out fee on accepted work",
      "badge": "Locksmith Association of SA Registered",
      "servicesHeading": "What We Do",
      "services": [
          {
              "name": "Emergency Lockouts",
              "description": "Locked out of your home, office, or vehicle? We're there within 30 minutes, 24 hours a day.",
              "tags": [
                  "24/7",
                  "30-min Response"
              ],
              "icon": "key",
              "serviceImageQuery": "door lock mechanism key cylinder close up"
          },
          {
              "name": "Lock Upgrades & Security",
              "description": "High-security deadbolts, insurance-approved locks, and gate locks fitted and coded to your spec.",
              "tags": [
                  "Deadbolts",
                  "High Security"
              ],
              "icon": "lock",
              "serviceImageQuery": "deadbolt high security lock installed front door"
          },
          {
              "name": "Access Control & Intercoms",
              "description": "Electric fences, keypad entry, intercom systems, and remote gate motors installed and serviced.",
              "tags": [
                  "Access Control",
                  "Gate Motors"
              ],
              "icon": "shield",
              "serviceImageQuery": "keypad access control panel gate entry system"
          },
          {
              "name": "Safe Supply & Installation",
              "description": "Home and office safes supplied, delivered, and bolted down \u2014 fireproof and insurance-rated options available.",
              "tags": [
                  "Safes",
                  "Fireproof"
              ],
              "icon": "box",
              "serviceImageQuery": "home safe vault fireproof installed wall mounted"
          },
          {
              "name": "Automotive Locksmith",
              "description": "Car key duplication, transponder programming, and emergency vehicle lockouts.",
              "tags": [
                  "Car Keys",
                  "Transponder"
              ],
              "serviceImageQuery": "locksmith programming car key transponder vehicle"
          },
          {
              "name": "CCTV & Surveillance",
              "description": "Camera systems, DVR setup, and remote monitoring integration for homes and businesses.",
              "tags": [
                  "CCTV",
                  "Surveillance"
              ],
              "serviceImageQuery": "security camera CCTV system installation wall"
          }
      ],
      "galleryHeading": "Secured & Sorted",
      "aboutHeading": "Security handled with <em>integrity</em>",
      "aboutText": "A locksmith comes to your home when you're vulnerable \u2014 locked out, anxious, or worried about security. We take that trust seriously. Our locksmiths are certified, uniformed, and have verifiable credentials.\n\nWe never suggest unnecessary work. We quote before we start. We leave the job neater than we found it.",
      "aboutMission": "We believe your home security should give you genuine peace of mind \u2014 not just the appearance of it.",
      "stats": [
          {
              "value": "12+",
              "label": "Years in Security",
              "sublabel": "since 2012"
          },
          {
              "value": "8,000+",
              "label": "Jobs Completed",
              "sublabel": "lockouts & installs"
          },
          {
              "value": "30min",
              "label": "Average Response Time",
              "sublabel": "Cape Town metro"
          },
          {
              "value": "4.9\u2605",
              "label": "Google Rating",
              "sublabel": "from 700+ reviews"
          }
      ],
      "contactHeading": "Locked out or need security help?",
      "contactHours": "Mon\u2013Sun: Available 24hrs \u00b7 Office hours 08:00\u201318:00 \u00b7 Emergency line always on",
      "processSteps": [
          {
              "step": "1",
              "title": "Call or WhatsApp",
              "description": "Tell us your location and situation \u2014 we dispatch the nearest available locksmith."
          },
          {
              "step": "2",
              "title": "We Arrive & Quote",
              "description": "Locksmith arrives, assesses, and quotes upfront before touching anything."
          },
          {
              "step": "3",
              "title": "Problem Solved",
              "description": "Job completed professionally \u2014 you're in, secured, or upgraded within the hour."
          }
      ],
      "testimonial": {
          "quote": "Arrived in 22 minutes at 11pm. Professional, calm, and didn't charge a fortune.",
          "author": "Ingrid V., Verified Client",
          "rating": 5
      },
      "imageMood": "trustworthy, secure, professional",
      "heroImageQuery": "secure front door brass handle high security deadbolt lock close up",
      "heroBgImageQuery": "lock cylinder key mechanism dark metallic background close up",
      "ogImageQuery": "high security deadbolt lock installed front door residential",
      "aboutImageQuery": "locksmith installing deadbolt lock front door screwdriver close up working",
      "galleryImageQueries": [
          "high security deadbolt lock installed solid wooden front door",
          "keypad access control entry system gate wall mounted installed",
          "smart digital lock keypad front door modern residential",
          "video intercom system screen mounted wall entrance gate"
      ],
      "features": [
        { "name": "24/7 Emergency Lockout Service", "description": "Locked out at midnight? We're on call around the clock. Most lockouts are resolved within 30 minutes of arrival.", "imageQuery": "locksmith arriving front door emergency lockout tools night service" },
        { "name": "Non-Destructive Entry", "description": "We pick locks, we don't break them. Our technicians use specialist tools to get you in without damaging your door or frame.", "imageQuery": "locksmith professional pick tools non-destructive entry door close up" },
        { "name": "Security Upgrade Specialists", "description": "From basic deadbolts to high-security mul-T-lock systems, we assess your home and recommend the right level of protection.", "imageQuery": "high security mul-T-lock deadbolt installation front door upgrade" }
      ]
  },
  "Plasterer": {
      "heroEyebrow": "PLASTERING CAPE TOWN",
      "heroAccent": "Smooth finishes. Solid walls. No cracks.",
      "tagline": "The finish that everything else <em>builds</em> on",
      "heroSubtitle": "Professional internal and external plastering, skimming, and repair work for new builds, renovations, and crack remediation.",
      "ctaPrimary": "Get a Quote",
      "ctaSecondary": "Our Services",
      "ctaNote": "Free site visit \u00b7 Fixed quotes \u00b7 3-year workmanship guarantee",
      "badge": "MBSA Registered Plastering Contractor",
      "servicesHeading": "What We Plaster",
      "services": [
          {
              "name": "Internal Skimming & Finishing",
              "description": "Fine skim coat plastering over existing walls to create smooth, paint-ready surfaces throughout.",
              "tags": [
                  "Skimming",
                  "Smooth Finish"
              ],
              "icon": "edit-2",
              "serviceImageQuery": "smooth plastered wall interior paint ready surface"
          },
          {
              "name": "External Plastering",
              "description": "External render and plaster for new builds and renovation facades \u2014 weather-resistant mixes.",
              "tags": [
                  "External Render",
                  "New Build"
              ],
              "icon": "home",
              "serviceImageQuery": "rendered exterior wall building facade smooth finish"
          },
          {
              "name": "Crack Repair & Remediation",
              "description": "Structural and cosmetic crack filling, resin injection, and surface preparation before painting.",
              "tags": [
                  "Crack Repair",
                  "Remediation"
              ],
              "icon": "tool",
              "serviceImageQuery": "wall crack filled repaired smooth surface"
          },
          {
              "name": "Cornice & Ceiling Work",
              "description": "Cornicing installation, ceiling board replacement, and decorative ceiling repairs for a polished overhead finish.",
              "tags": [
                  "Cornicing",
                  "Ceiling Board"
              ],
              "icon": "layers",
              "serviceImageQuery": "decorative cornice ceiling installed white room"
          },
          {
              "name": "Feature Walls & Mouldings",
              "description": "Decorative plaster mouldings, ceiling roses, and feature wall textures for period and modern properties.",
              "tags": [
                  "Mouldings",
                  "Decorative"
              ],
              "serviceImageQuery": "decorative plaster ceiling rose ornate moulding"
          },
          {
              "name": "Waterproof Plastering",
              "description": "Specialist waterproof plaster for bathrooms, pools, and damp-prone areas using approved systems.",
              "tags": [
                  "Waterproof",
                  "Pool Plaster"
              ],
              "serviceImageQuery": "waterproof plaster swimming pool shell construction"
          }
      ],
      "galleryHeading": "Surfaces We've Finished",
      "aboutHeading": "Plastering done <em>properly</em>",
      "aboutText": "The plastering is often the last thing clients notice when it's perfect and the first thing they see when it isn't. We've built our reputation on getting it perfect the first time \u2014 smooth, level, and crack-free.\n\nEvery job includes thorough surface preparation. We don't rush the drying time. That's not optional.",
      "aboutMission": "We believe a perfect plaster finish is the invisible foundation of every great interior.",
      "stats": [
          {
              "value": "14+",
              "label": "Years Plastering",
              "sublabel": "since 2010"
          },
          {
              "value": "1,800+",
              "label": "Projects Completed",
              "sublabel": "new builds & renovations"
          },
          {
              "value": "3yr",
              "label": "Workmanship Guarantee",
              "sublabel": "on all plastering work"
          },
          {
              "value": "4.8\u2605",
              "label": "Google Rating",
              "sublabel": "from 280+ reviews"
          }
      ],
      "contactHeading": "Need plastering work quoted?",
      "contactHours": "Mon\u2013Fri: 07:00\u201317:00 \u00b7 Sat: 07:30\u201313:00 \u00b7 Site visits by appointment",
      "processSteps": [
          {
              "step": "1",
              "title": "Site Visit & Quote",
              "description": "We assess the surfaces, identify any problem areas, and provide a written quote."
          },
          {
              "step": "2",
              "title": "Surface Preparation",
              "description": "All surfaces properly prepped \u2014 old plaster hacked off where needed, primed correctly."
          },
          {
              "step": "3",
              "title": "Apply & Cure",
              "description": "Plaster applied in correct coats, cured fully, and sanded to a smooth final finish."
          }
      ],
      "testimonial": {
          "quote": "Couldn't tell where the old plaster ended and the new started. Immaculate work.",
          "author": "Mariana K., Verified Client",
          "rating": 5
      },
      "imageMood": "clean, smooth, professional",
      "heroImageQuery": "plasterer applying smooth skim coat plaster white wall trowel working",
      "heroBgImageQuery": "plastering trowel hawk tools dark textured plaster background",
      "ogImageQuery": "smooth skim coat plaster finish interior white wall bright room",
      "aboutImageQuery": "plasterer smoothing skim coat wall trowel close up hands working",
      "galleryImageQueries": [
          "smooth freshly plastered interior room white walls ceiling bright",
          "rendered exterior building facade smooth finish completed",
          "repaired wall crack smooth plaster finish painted seamless",
          "newly plastered room walls ceiling ready for painting"
      ],
      "features": [
        { "name": "Seamless, Invisible Finishes", "description": "Our plastering blends so cleanly with existing walls that you won't be able to tell where the new work starts.", "imageQuery": "smooth plastered wall skim coat seamless finish close up" },
        { "name": "Decorative & Specialist Finishes", "description": "From smooth skim coats to textured feature walls and cornicing, we handle functional and decorative plastering equally well.", "imageQuery": "decorative plaster cornice ceiling moulding ornate detail installed" },
        { "name": "Crack Repair That Lasts", "description": "We don't just skim over cracks. We cut them out, mesh them, and replaster properly so they don't come back next winter.", "imageQuery": "plasterer applying mesh tape wall crack repair professional skim" }
      ]
  },
  "Fencing Contractor": {
      "heroEyebrow": "FENCING CAPE TOWN",
      "heroAccent": "Palisade, electric & timber fencing",
      "tagline": "Boundaries that protect without <em>compromising</em> kerb appeal",
      "heroSubtitle": "Professional fencing installation for residential and commercial properties \u2014 palisade, precast, electric, and timber.",
      "ctaPrimary": "Get a Quote",
      "ctaSecondary": "Fencing Types",
      "ctaNote": "Free measure & quote \u00b7 Supply & install \u00b7 5-year structural guarantee",
      "badge": "Security Industry Alliance Registered",
      "servicesHeading": "What We Install",
      "services": [
          {
              "name": "Palisade & Security Fencing",
              "description": "Steel palisade, anti-climb, and welded mesh fencing for residential and commercial boundaries.",
              "tags": [
                  "Palisade",
                  "Anti-Climb"
              ],
              "icon": "shield",
              "serviceImageQuery": "steel palisade fence installed residential boundary"
          },
          {
              "name": "Electric Fencing",
              "description": "Certified electric fence installations with energizers, warning signs, and compliance certificates.",
              "tags": [
                  "Electric Fence",
                  "Certificate"
              ],
              "icon": "zap",
              "serviceImageQuery": "electric fence wires installed wall top security"
          },
          {
              "name": "Timber & Precast Walls",
              "description": "Timber palisade fencing, precast concrete walls, and Vibracrete panels for privacy and security.",
              "tags": [
                  "Timber",
                  "Vibracrete"
              ],
              "icon": "align-left",
              "serviceImageQuery": "wooden timber fence panels garden boundary privacy"
          },
          {
              "name": "Driveway Gates & Automation",
              "description": "Sliding and swing gate supply, installation, and motor automation with remote controls and battery backup.",
              "tags": [
                  "Gate Motors",
                  "Sliding Gate"
              ],
              "icon": "cpu",
              "serviceImageQuery": "automated sliding gate motor installed driveway"
          },
          {
              "name": "Farm & Agricultural Fencing",
              "description": "Stock fencing, game camp fencing, and perimeter boundaries for farms and smallholdings.",
              "tags": [
                  "Farm Fencing",
                  "Agricultural"
              ],
              "serviceImageQuery": "farm fencing post wire rural agricultural boundary"
          },
          {
              "name": "Access Control & Intercoms",
              "description": "Gate motor installations, intercom systems, and remote access control for residential and commercial properties.",
              "tags": [
                  "Access Control",
                  "Gate Motors"
              ],
              "serviceImageQuery": "automatic gate motor intercom system residential"
          }
      ],
      "galleryHeading": "Fences We've Built",
      "aboutHeading": "Fencing that <em>actually</em> works",
      "aboutText": "We've been securing Cape Town properties since 2008. Every fence we install is designed to deter effectively while looking good from the street \u2014 security doesn't have to mean ugly.\n\nAll electric fencing comes with a Certificate of Compliance. All structural fencing carries a 5-year workmanship guarantee.",
      "aboutMission": "We believe effective perimeter security should give homeowners confidence \u2014 not anxiety every time they check the gate.",
      "stats": [
          {
              "value": "16+",
              "label": "Years Installing",
              "sublabel": "since 2008"
          },
          {
              "value": "3,500+",
              "label": "Properties Fenced",
              "sublabel": "residential & commercial"
          },
          {
              "value": "5yr",
              "label": "Structural Guarantee",
              "sublabel": "on all installations"
          },
          {
              "value": "4.7\u2605",
              "label": "Google Rating",
              "sublabel": "from 300+ reviews"
          }
      ],
      "contactHeading": "Want a free measure and quote?",
      "contactHours": "Mon\u2013Fri: 07:00\u201317:00 \u00b7 Sat: 08:00\u201313:00 \u00b7 Quotes by appointment",
      "processSteps": [
          {
              "step": "1",
              "title": "Free Site Measure",
              "description": "We measure the perimeter and advise on best fencing type for your needs."
          },
          {
              "step": "2",
              "title": "Quote & Material Order",
              "description": "Fixed quote issued \u2014 on approval we order materials and schedule installation."
          },
          {
              "step": "3",
              "title": "Install & Certificate",
              "description": "Professional installation, CoC for electric fencing, and formal handover."
          }
      ],
      "testimonial": {
          "quote": "The electric fence and palisade look great and finally give us real peace of mind.",
          "author": "Stefan J., Verified Client",
          "rating": 5
      },
      "imageMood": "secure, clean, residential",
      "heroImageQuery": "attractive black steel palisade fence installed modern residential property garden",
      "heroBgImageQuery": "steel palisade fence posts dark moody background close up",
      "ogImageQuery": "completed steel palisade fence residential property boundary neat garden",
      "aboutImageQuery": "fencing contractor installing steel fence post concrete foundation working",
      "galleryImageQueries": [
          "black steel palisade boundary fence residential property garden",
          "wooden timber fence panels garden boundary privacy neat",
          "automated sliding gate motor driveway residential installed",
          "precast concrete boundary wall residential property clean"
      ],
      "features": [
        { "name": "Security & Aesthetic Combined", "description": "Our fences don't just keep people out \u2014 they look good doing it. We design solutions that match your property's style.", "imageQuery": "modern attractive residential steel fence garden property landscaped" },
        { "name": "All Materials, One Contractor", "description": "Palisade, wooden, precast, mesh, glass \u2014 we work with every fencing material and recommend the best option for your site.", "imageQuery": "timber palisade fence panels residential garden attractive boundary" },
        { "name": "Free Site Survey & Quote", "description": "We measure your boundary, assess the terrain, and give you a fixed quote before any work begins. No obligation, no pressure.", "imageQuery": "fencing contractor measuring boundary tape measure property survey" }
      ]
  },
  "Scaffolding": {
      "heroEyebrow": "SCAFFOLDING HIRE CAPE TOWN",
      "heroAccent": "Residential, commercial & industrial",
      "tagline": "The platform your project <em>needs</em> to succeed",
      "heroSubtitle": "Safe, certified scaffolding erection, hire, and dismantling for construction, painting, roofing, and maintenance projects.",
      "ctaPrimary": "Get a Quote",
      "ctaSecondary": "Scaffold Types",
      "ctaNote": "Quick turnaround \u00b7 OHSA compliant \u00b7 Hire & erect packages",
      "badge": "SCAFFSA Registered Scaffolding Contractor",
      "servicesHeading": "What We Provide",
      "services": [
          {
              "name": "Residential Scaffolding",
              "description": "Safe access scaffolding for external painting, roofing, and renovation work on residential properties.",
              "tags": [
                  "Residential",
                  "Painting Access"
              ],
              "icon": "layers",
              "serviceImageQuery": "scaffolding erected around house exterior painting"
          },
          {
              "name": "Commercial & Industrial",
              "description": "Complex scaffolding systems for commercial buildings, industrial maintenance, and large-scale projects.",
              "tags": [
                  "Commercial",
                  "Industrial"
              ],
              "icon": "maximize",
              "serviceImageQuery": "scaffolding tall commercial building facade construction"
          },
          {
              "name": "Scaffold Hire & Erect",
              "description": "Full hire, delivery, erection, inspection, and dismantling service \u2014 fully OHSA compliant.",
              "tags": [
                  "Hire & Erect",
                  "OHSA"
              ],
              "icon": "tool",
              "serviceImageQuery": "scaffolding tubes boards platforms erected site"
          },
          {
              "name": "Suspended & Mobile Platforms",
              "description": "Mobile scaffold towers, roof edge protection, and suspended platform systems for specialist access requirements.",
              "tags": [
                  "Mobile Tower",
                  "Edge Protection"
              ],
              "icon": "box",
              "serviceImageQuery": "mobile scaffold tower platform wheels access"
          },
          {
              "name": "Event & Stage Scaffolding",
              "description": "Temporary stages, seating platforms, and event structures built to safety specifications.",
              "tags": [
                  "Event Stages",
                  "Temporary"
              ],
              "serviceImageQuery": "scaffolding event stage construction outdoor concert"
          },
          {
              "name": "Safety Inspections & Compliance",
              "description": "Regular scaffold inspections, load testing, and compliance documentation as required by OHS regulations.",
              "tags": [
                  "Safety",
                  "OHS Compliance"
              ],
              "serviceImageQuery": "scaffolding safety inspection worker checking structure"
          }
      ],
      "galleryHeading": "On the Scaffold",
      "aboutHeading": "Scaffolding built on <em>safety</em>",
      "aboutText": "Working at height without proper scaffolding is one of the leading causes of construction fatalities. We don't take shortcuts on structural integrity, load ratings, or compliance documentation \u2014 ever.\n\nOur teams are trained and certified. Every scaffold is inspected before handover to the client.",
      "aboutMission": "We believe every person working at height deserves a platform built by people who care about coming home.",
      "stats": [
          {
              "value": "11+",
              "label": "Years in Scaffolding",
              "sublabel": "since 2013"
          },
          {
              "value": "2,000+",
              "label": "Projects Scaffolded",
              "sublabel": "residential & commercial"
          },
          {
              "value": "100%",
              "label": "OHSA Compliance Rate",
              "sublabel": "zero citations"
          },
          {
              "value": "4.8\u2605",
              "label": "Google Rating",
              "sublabel": "from 200+ reviews"
          }
      ],
      "contactHeading": "Need scaffolding for your project?",
      "contactHours": "Mon\u2013Fri: 07:00\u201317:00 \u00b7 Sat: 07:00\u201313:00 \u00b7 Emergency quotes by phone",
      "processSteps": [
          {
              "step": "1",
              "title": "Quote & Site Survey",
              "description": "We survey the site and provide a full quote including erection, hire, and dismantling."
          },
          {
              "step": "2",
              "title": "Schedule & Deliver",
              "description": "Scaffold delivered and erected to your programme with OHSA compliance documentation."
          },
          {
              "step": "3",
              "title": "Inspect & Dismantle",
              "description": "Final inspection on completion, safe dismantling, and material collection."
          }
      ],
      "testimonial": {
          "quote": "Had the scaffold up by 7am as promised. Safe, solid, and dismantled cleanly on time.",
          "author": "Wayne C., Verified Client",
          "rating": 5
      },
      "imageMood": "industrial, safe, structured",
      "heroImageQuery": "scaffolding erected around house facade painting renovation blue sky",
      "heroBgImageQuery": "scaffolding steel tubes clamps dark construction background close up",
      "ogImageQuery": "scaffolding erected around residential building renovation access platforms",
      "aboutImageQuery": "workers assembling scaffolding tubes clamps connecting erecting building",
      "galleryImageQueries": [
          "scaffolding erected around residential house exterior painting renovation",
          "scaffolding commercial multi-storey building facade construction access",
          "scaffolding platform boards walkway safety rails workers",
          "completed building renovation scaffolding removed clean result"
      ],
      "features": [
        { "name": "Rapid Erect & Dismantle", "description": "We get scaffolding up fast and take it down the moment it's not needed. Your project isn't delayed and your site stays clear.", "imageQuery": "workers erecting scaffolding quickly building facade professional" },
        { "name": "Full OHSA Compliance", "description": "Every scaffold we erect meets Occupational Health & Safety Act standards. We supply inspection certificates and handover documentation.", "imageQuery": "scaffolding safety inspection worker checking clamps compliance" },
        { "name": "Flexible Hire Periods", "description": "Whether you need scaffolding for two days or two months, we offer flexible hire with no penalties for early return.", "imageQuery": "scaffolding residential house painting renovation access platforms" }
      ]
  },
  "Demolition": {
      "heroEyebrow": "DEMOLITION CONTRACTORS CAPE TOWN",
      "heroAccent": "Controlled, compliant & fully insured",
      "tagline": "Making space for what comes <em>next</em>",
      "heroSubtitle": "Professional demolition, strip-out, and rubble removal for residential renovations and commercial redevelopment projects.",
      "ctaPrimary": "Get a Quote",
      "ctaSecondary": "Our Services",
      "ctaNote": "Fully insured \u00b7 Council clearance assistance \u00b7 Rubble removal included",
      "badge": "MBSA Demolition Registered Contractor",
      "servicesHeading": "What We Demolish",
      "services": [
          {
              "name": "Residential Strip-Out",
              "description": "Complete internal strip-outs including walls, ceilings, flooring, and fixtures before renovation.",
              "tags": [
                  "Strip-Out",
                  "Renovation"
              ],
              "icon": "trash-2",
              "serviceImageQuery": "interior gutted stripped out room renovation walls"
          },
          {
              "name": "Structural Demolition",
              "description": "Controlled structural demolition of outbuildings, garages, pool surrounds, and extensions.",
              "tags": [
                  "Structural",
                  "Controlled"
              ],
              "icon": "tool",
              "serviceImageQuery": "excavator demolishing small building rubble site"
          },
          {
              "name": "Rubble Removal & Clearing",
              "description": "Complete site clearing, rubble removal, and skip hire after any demolition or building project.",
              "tags": [
                  "Rubble Removal",
                  "Site Clear"
              ],
              "icon": "truck",
              "serviceImageQuery": "rubble skip bin loaded bricks debris site"
          },
          {
              "name": "Asbestos Removal & Disposal",
              "description": "Licensed asbestos roof and ceiling removal with certified disposal and clearance certificates issued.",
              "tags": [
                  "Asbestos",
                  "Licensed Removal"
              ],
              "icon": "alert-triangle",
              "serviceImageQuery": "asbestos roof removal bagged sheets disposal site"
          },
          {
              "name": "Selective Interior Strip-Out",
              "description": "Precision interior demolition of kitchens, bathrooms, and offices while protecting surrounding structures.",
              "tags": [
                  "Interior",
                  "Selective"
              ],
              "serviceImageQuery": "interior demolition strip out kitchen renovation"
          },
          {
              "name": "Site Preparation & Earthworks",
              "description": "Land clearing, levelling, and trenching to prepare your site for new construction.",
              "tags": [
                  "Earthworks",
                  "Site Prep"
              ],
              "serviceImageQuery": "excavator earthworks site clearing construction preparation"
          }
      ],
      "galleryHeading": "Cleared for Development",
      "aboutHeading": "Demolition done <em>responsibly</em>",
      "aboutText": "Demolition looks simple from the outside. It isn't. Structural demolition requires engineering assessment, asbestos checks, council notification, and a sequence of work that avoids dangerous instability.\n\nWe handle the compliance, the sequence, and the clean-up. You get a clear site, ready to build.",
      "aboutMission": "We believe responsible demolition is as skilled a trade as any construction work \u2014 and we treat it that way.",
      "stats": [
          {
              "value": "13+",
              "label": "Years Demolishing",
              "sublabel": "since 2011"
          },
          {
              "value": "900+",
              "label": "Projects Completed",
              "sublabel": "residential & commercial"
          },
          {
              "value": "100%",
              "label": "Compliance Record",
              "sublabel": "no citations or incidents"
          },
          {
              "value": "4.7\u2605",
              "label": "Google Rating",
              "sublabel": "from 180+ reviews"
          }
      ],
      "contactHeading": "Need a demolition quotation?",
      "contactHours": "Mon\u2013Fri: 07:00\u201317:00 \u00b7 Sat: 07:00\u201313:00 \u00b7 Site visits by appointment",
      "processSteps": [
          {
              "step": "1",
              "title": "Site Assessment",
              "description": "We assess the structure, check for asbestos, and confirm council notification requirements."
          },
          {
              "step": "2",
              "title": "Quote & Compliance",
              "description": "Fixed price quote issued with all compliance steps documented and managed."
          },
          {
              "step": "3",
              "title": "Demolish & Clear",
              "description": "Controlled demolition, rubble removal, and site handed over clean and level."
          }
      ],
      "testimonial": {
          "quote": "They demolished the old outbuilding and cleared the site in one day. Spotless and professional.",
          "author": "Parker N., Verified Client",
          "rating": 5
      },
      "imageMood": "industrial, clear, professional",
      "heroImageQuery": "excavator demolishing small building controlled demolition rubble dust action",
      "heroBgImageQuery": "concrete rubble debris demolition dark background texture",
      "ogImageQuery": "cleared level site after demolition ready for construction clean",
      "aboutImageQuery": "excavator arm breaking concrete wall active demolition dust debris operator",
      "galleryImageQueries": [
          "interior completely stripped out gutted bare walls renovation ready",
          "excavator breaking concrete structure demolition rubble dust",
          "skip bin loaded rubble bricks debris site clearing truck",
          "cleared flat level site after demolition clean ready build"
      ],
      "features": [
        { "name": "Controlled, Surgical Demolition", "description": "We don't just knock things down. We remove exactly what needs to go and protect everything that doesn't \u2014 walls, floors, services, all of it.", "imageQuery": "selective interior strip-out demolition worker sledgehammer controlled" },
        { "name": "Waste Sorted & Recycled", "description": "We separate rubble, timber, metal, and recyclables on-site. Responsible disposal is included in every quote.", "imageQuery": "construction waste sorted recycling bins demolition site rubble" },
        { "name": "Council Permits Handled", "description": "If your demolition needs council approval, we handle the application and paperwork so you don't have to navigate the red tape.", "imageQuery": "building demolition permit planning documents clipboard site" }
      ]
  },
  "Solar / Renewable Energy": {
      "heroEyebrow": "SOLAR ENERGY CAPE TOWN",
      "heroAccent": "Load-shedding proof. 25-year panel warranty.",
      "tagline": "Energy independence starts with one <em>decision</em>",
      "heroSubtitle": "Custom solar and battery backup solutions designed to eliminate load-shedding and reduce your electricity bill permanently.",
      "ctaPrimary": "Get a Free Assessment",
      "ctaSecondary": "How It Works",
      "ctaNote": "Free energy audit \u00b7 Finance options available \u00b7 Installed within 2 weeks",
      "badge": "SAPVIA Registered Solar Installer",
      "servicesHeading": "What We Install",
      "services": [
          {
              "name": "Solar PV Systems",
              "description": "Grid-tied and hybrid solar panel systems designed to offset your full monthly electricity consumption.",
              "tags": [
                  "Grid-Tied",
                  "Hybrid"
              ],
              "icon": "sun",
              "serviceImageQuery": "solar panels array installed residential roof sunny"
          },
          {
              "name": "Battery Backup & Storage",
              "description": "Lithium battery storage systems keeping your home or business running through any load-shedding stage.",
              "tags": [
                  "Battery Storage",
                  "Load-Shedding"
              ],
              "icon": "battery-charging",
              "serviceImageQuery": "lithium battery wall mounted home energy storage"
          },
          {
              "name": "Inverter & UPS Systems",
              "description": "Standalone inverter installations for essential circuits \u2014 lights, internet, and appliances.",
              "tags": [
                  "Inverter",
                  "UPS"
              ],
              "icon": "zap",
              "serviceImageQuery": "solar inverter installed garage wall display screen"
          },
          {
              "name": "EV Charging Stations",
              "description": "Home and commercial electric vehicle charger installations wired into your existing solar or grid supply.",
              "tags": [
                  "EV Charger",
                  "Electric Vehicle"
              ],
              "icon": "battery-charging",
              "serviceImageQuery": "electric vehicle charger wall mounted home garage"
          },
          {
              "name": "Energy Audits & Consultation",
              "description": "Comprehensive energy usage analysis and customised recommendations to reduce your electricity bill.",
              "tags": [
                  "Energy Audit",
                  "Consultation"
              ],
              "serviceImageQuery": "energy audit consultant reviewing electricity meter readings"
          },
          {
              "name": "Solar Geyser Conversions",
              "description": "Retrofit existing electric geysers with solar heating panels for significant hot water savings.",
              "tags": [
                  "Solar Geyser",
                  "Hot Water"
              ],
              "serviceImageQuery": "solar geyser panel installed on residential roof"
          }
      ],
      "galleryHeading": "Live Off the Grid",
      "aboutHeading": "Energy sorted, <em>permanently</em>",
      "aboutText": "Load-shedding is not going away soon. We've been installing solar systems in Cape Town since 2010 and we've watched it go from a luxury to a necessity. Our systems are properly sized, correctly installed, and monitored remotely.\n\nWe are SAPVIA registered, use Tier 1 panels, and carry full professional indemnity insurance.",
      "aboutMission": "We believe energy independence isn't just financially smart \u2014 it's the most practical gift you can give your household.",
      "stats": [
          {
              "value": "14+",
              "label": "Years Installing",
              "sublabel": "since 2010"
          },
          {
              "value": "1,200+",
              "label": "Systems Installed",
              "sublabel": "residential & commercial"
          },
          {
              "value": "25yr",
              "label": "Panel Warranty",
              "sublabel": "Tier 1 manufacturers"
          },
          {
              "value": "4.9\u2605",
              "label": "Google Rating",
              "sublabel": "from 800+ reviews"
          }
      ],
      "contactHeading": "Want a free solar assessment?",
      "contactHours": "Mon\u2013Fri: 08:00\u201317:30 \u00b7 Sat: 09:00\u201313:00 \u00b7 Assessments by appointment",
      "processSteps": [
          {
              "step": "1",
              "title": "Free Energy Audit",
              "description": "We analyse your electricity bills and usage to size the optimal system for your needs."
          },
          {
              "step": "2",
              "title": "Design & Quote",
              "description": "Custom system design, equipment specification, and fixed installation quote provided."
          },
          {
              "step": "3",
              "title": "Install & Commission",
              "description": "Professional installation, COC issued, system commissioned, and remote monitoring set up."
          }
      ],
      "testimonial": {
          "quote": "Zero impact from load-shedding since installation. Best money I've spent on this house.",
          "author": "Adele F., Verified Client",
          "rating": 5
      },
      "imageMood": "clean, modern, sustainable",
      "heroImageQuery": "solar panels installed modern house roof blue sky sunny residential",
      "heroBgImageQuery": "solar panel cells close up dark blue photovoltaic background",
      "ogImageQuery": "residential rooftop solar panel array installed modern house",
      "aboutImageQuery": "solar installer technician mounting panel on residential roof harness working",
      "galleryImageQueries": [
          "solar panel rows installed residential rooftop sunny blue sky",
          "lithium battery storage unit wall mounted garage inverter",
          "solar inverter display screen monitoring energy output wall",
          "modern house exterior solar panels roof completed installation"
      ],
      "features": [
        { "name": "Custom System Design", "description": "We don't sell one-size-fits-all kits. Every system is designed around your roof, your usage patterns, and your budget.", "imageQuery": "solar panel system design roof layout blueprint planning residential" },
        { "name": "Grid-Tied & Off-Grid Options", "description": "Whether you want to feed back to the grid, go fully off-grid, or just survive load-shedding, we build the right solution.", "imageQuery": "solar panels battery storage home inverter installation residential" },
        { "name": "Monitoring & Aftercare", "description": "Every installation includes app-based monitoring so you can see exactly what you're generating, using, and saving in real time.", "imageQuery": "solar energy monitoring app smartphone dashboard production graphs" }
      ]
  },
  "HVAC / Air Conditioning": {
      "heroEyebrow": "AIR CONDITIONING CAPE TOWN",
      "heroAccent": "Supply, installation & maintenance",
      "tagline": "The perfect temperature, <em>always</em>",
      "heroSubtitle": "Professional air conditioning installation, servicing, and repair for homes, offices, and commercial spaces across Cape Town.",
      "ctaPrimary": "Get a Quote",
      "ctaSecondary": "Our Services",
      "ctaNote": "Daikin & Midea authorised \u00b7 Same-week install \u00b7 Annual service plans",
      "badge": "ACMV SA Registered HVAC Contractor",
      "servicesHeading": "What We Do",
      "services": [
          {
              "name": "Split Unit Installation",
              "description": "Supply and installation of Daikin, Midea, and LG split units for residential and light commercial use.",
              "tags": [
                  "Daikin",
                  "Split Units"
              ],
              "icon": "wind",
              "serviceImageQuery": "wall mounted split air conditioner unit white room"
          },
          {
              "name": "Servicing & Gas Recharge",
              "description": "Annual service, filter cleaning, refrigerant top-up, and fault diagnosis for all AC brands.",
              "tags": [
                  "Servicing",
                  "Maintenance"
              ],
              "icon": "settings",
              "serviceImageQuery": "air conditioner filter cleaning service open unit"
          },
          {
              "name": "Commercial HVAC",
              "description": "VRV and ducted systems for offices, retail spaces, and commercial buildings designed and installed.",
              "tags": [
                  "Commercial",
                  "Ducted"
              ],
              "icon": "cpu",
              "serviceImageQuery": "ceiling ducted air conditioning vent office interior"
          },
          {
              "name": "Heat Pump Water Heating",
              "description": "Energy-efficient heat pump geyser installations that cut water heating costs by up to 70% year-round.",
              "tags": [
                  "Heat Pump",
                  "Energy Saving"
              ],
              "icon": "thermometer",
              "serviceImageQuery": "heat pump water heater installed exterior wall unit"
          },
          {
              "name": "Ducted & VRV Systems",
              "description": "Centralised ducted systems and VRV/VRF installations for multi-room commercial buildings.",
              "tags": [
                  "Ducted",
                  "VRV"
              ],
              "serviceImageQuery": "ducted air conditioning system ceiling vent installation"
          },
          {
              "name": "Air Quality & Ventilation",
              "description": "Extraction fans, air purifiers, and mechanical ventilation systems for healthy indoor air.",
              "tags": [
                  "Ventilation",
                  "Air Quality"
              ],
              "serviceImageQuery": "ventilation system extraction fan ceiling mounted"
          }
      ],
      "galleryHeading": "Cool Work",
      "aboutHeading": "HVAC done <em>right</em>",
      "aboutText": "A poorly installed air conditioner costs more to run, breaks down more often, and never quite cools the room properly. We install to the manufacturer's specification every time \u2014 correct pipe sizing, proper drainage, and exact refrigerant charge.\n\nWe service what we install and are happy to service other brands too.",
      "aboutMission": "We believe your air conditioner should be forgotten about \u2014 running quietly, efficiently, and reliably in the background.",
      "stats": [
          {
              "value": "15+",
              "label": "Years in HVAC",
              "sublabel": "since 2009"
          },
          {
              "value": "3,000+",
              "label": "Units Installed",
              "sublabel": "residential & commercial"
          },
          {
              "value": "500+",
              "label": "Service Contracts",
              "sublabel": "active annual plans"
          },
          {
              "value": "4.8\u2605",
              "label": "Google Rating",
              "sublabel": "from 450+ reviews"
          }
      ],
      "contactHeading": "Need installation or a service call?",
      "contactHours": "Mon\u2013Fri: 08:00\u201317:30 \u00b7 Sat: 08:00\u201313:00 \u00b7 Emergency repairs available",
      "processSteps": [
          {
              "step": "1",
              "title": "Site Assessment",
              "description": "We assess the space, room size, and usage to specify the correct unit and capacity."
          },
          {
              "step": "2",
              "title": "Quote & Schedule",
              "description": "Written quote with unit spec and installation date confirmed within 24 hours."
          },
          {
              "step": "3",
              "title": "Install & Commission",
              "description": "Professional installation, system commissioned, and operation fully explained."
          }
      ],
      "testimonial": {
          "quote": "Installed two units in one morning. Running perfectly for two summers without a service call.",
          "author": "James M., Verified Client",
          "rating": 5
      },
      "imageMood": "clean, modern, cool",
      "heroImageQuery": "HVAC technician installing wall mounted split air conditioner unit residential",
      "heroBgImageQuery": "air conditioner condenser unit dark background HVAC cooling",
      "ogImageQuery": "wall mounted split air conditioner unit installed modern living room",
      "aboutImageQuery": "HVAC technician servicing split air conditioner unit open panel tools working",
      "galleryImageQueries": [
          "wall mounted split air conditioner installed modern living room",
          "ducted air conditioning ceiling vent grille office interior",
          "outdoor air conditioner condenser unit mounted wall bracket",
          "cassette ceiling air conditioning unit installed open plan office"
      ],
      "features": [
        { "name": "Energy-Efficient Systems", "description": "We recommend and install inverter-driven units that use up to 40% less electricity than standard systems \u2014 saving you money from day one.", "imageQuery": "modern inverter split air conditioner unit installed energy efficient" },
        { "name": "Maintenance Plans That Prevent Breakdowns", "description": "Our quarterly service plans keep your system running at peak efficiency and catch problems before they become expensive repairs.", "imageQuery": "HVAC technician cleaning air conditioner filter service maintenance" },
        { "name": "Ducted & Ductless Solutions", "description": "From concealed ducted systems for new builds to split units for retrofits, we design cooling solutions for every building type.", "imageQuery": "ducted air conditioning ceiling vent installed modern office building" }
      ]
  },
  "Borehole / Irrigation": {
      "heroEyebrow": "BOREHOLE & IRRIGATION CAPE TOWN",
      "heroAccent": "Your own water supply. Permanently.",
      "tagline": "Water independence before the next <em>drought</em>",
      "heroSubtitle": "Borehole drilling, pump installation, and irrigation system design for residential and agricultural properties.",
      "ctaPrimary": "Get a Free Assessment",
      "ctaSecondary": "How It Works",
      "ctaNote": "Free site assessment \u00b7 DWS compliant \u00b7 Finance options available",
      "badge": "Borehole Water Association of SA Member",
      "servicesHeading": "What We Do",
      "services": [
          {
              "name": "Borehole Drilling & Casing",
              "description": "Professional percussion and rotary borehole drilling with full DWS registration and steel casing.",
              "tags": [
                  "Borehole Drilling",
                  "DWS Registered"
              ],
              "icon": "chevrons-down",
              "serviceImageQuery": "borehole drilling rig operating residential yard"
          },
          {
              "name": "Pump & Pressure System",
              "description": "Submersible pump installation, pressure tank fitting, and water quality testing on completion.",
              "tags": [
                  "Submersible Pump",
                  "Pressure Tank"
              ],
              "icon": "droplet",
              "serviceImageQuery": "water pump pressure tank installed pump house"
          },
          {
              "name": "Irrigation System Design",
              "description": "Custom drip and spray irrigation systems for gardens, agriculture, and sports turf installations.",
              "tags": [
                  "Drip Irrigation",
                  "Garden"
              ],
              "icon": "cloud-rain",
              "serviceImageQuery": "garden sprinkler irrigation system watering green lawn"
          },
          {
              "name": "Water Filtration & Treatment",
              "description": "Whole-house filtration, UV sterilisation, and reverse osmosis systems to make borehole water safe for drinking.",
              "tags": [
                  "Water Filtration",
                  "UV Sterilisation"
              ],
              "icon": "filter",
              "serviceImageQuery": "water filtration system installed wall mounted home"
          },
          {
              "name": "Borehole Testing & Yield Analysis",
              "description": "Pump testing, water quality analysis, and yield assessments to maximise your groundwater resource.",
              "tags": [
                  "Testing",
                  "Water Quality"
              ],
              "serviceImageQuery": "borehole water testing analysis pump yield"
          },
          {
              "name": "Rainwater Harvesting",
              "description": "Tank installations, first-flush diverters, and pump systems to capture and reuse rainwater.",
              "tags": [
                  "Rainwater Tanks",
                  "Harvesting"
              ],
              "serviceImageQuery": "rainwater harvesting tank garden water collection"
          }
      ],
      "galleryHeading": "Water on Your Terms",
      "aboutHeading": "Water independence, <em>properly</em> done",
      "aboutText": "Cape Town's water restrictions aren't going away. We've been drilling boreholes and installing irrigation across the Western Cape since 2007, and we know the aquifers, the geology, and the compliance requirements inside out.\n\nEvery borehole is DWS registered. Every pump is correctly sized. Every client gets water quality test results.",
      "aboutMission": "We believe water independence is one of the most practical and valuable investments a Western Cape property owner can make.",
      "stats": [
          {
              "value": "17+",
              "label": "Years Drilling",
              "sublabel": "since 2007"
          },
          {
              "value": "1,400+",
              "label": "Boreholes Drilled",
              "sublabel": "Western Cape"
          },
          {
              "value": "90%+",
              "label": "Successful Strike Rate",
              "sublabel": "from site surveys"
          },
          {
              "value": "4.8\u2605",
              "label": "Google Rating",
              "sublabel": "from 350+ reviews"
          }
      ],
      "contactHeading": "Want to explore a borehole for your property?",
      "contactHours": "Mon\u2013Fri: 07:30\u201317:00 \u00b7 Sat: 08:00\u201313:00 \u00b7 Site assessments by appointment",
      "processSteps": [
          {
              "step": "1",
              "title": "Free Site Assessment",
              "description": "We survey the geology and advise on likely depth, yield, and water quality."
          },
          {
              "step": "2",
              "title": "Drill & Case",
              "description": "Borehole drilled, steel-cased, and DWS registered on completion."
          },
          {
              "step": "3",
              "title": "Pump & Test",
              "description": "Pump installed, yield tested, water quality analysed, and system handed over."
          }
      ],
      "testimonial": {
          "quote": "Struck water at 28m with excellent yield. Haven't used municipal water for the garden since.",
          "author": "Kobus V., Verified Client",
          "rating": 5
      },
      "imageMood": "natural, clean, resourceful",
      "heroImageQuery": "borehole drilling rig operating residential garden yard water extraction",
      "heroBgImageQuery": "water pump pipes underground dark earth background borehole",
      "ogImageQuery": "lush green garden lawn sprinkler irrigation system running healthy",
      "aboutImageQuery": "borehole drilling rig machine crew operating residential property working",
      "galleryImageQueries": [
          "borehole drilling rig operating residential garden property yard",
          "submersible water pump pressure tank installed pump house",
          "drip irrigation lines installed garden beds plants growing",
          "green lawn pop-up sprinkler system running residential garden"
      ],
      "features": [
        { "name": "Professional Yield Testing", "description": "We test every borehole for yield, water quality, and sustainability before you commit to a pump \u2014 so you know exactly what you're getting.", "imageQuery": "borehole water yield testing pump equipment extraction professional" },
        { "name": "Smart Irrigation Controllers", "description": "Our systems use weather-based smart controllers that adjust watering automatically \u2014 saving water and keeping your garden in perfect shape.", "imageQuery": "irrigation smart controller sprinkler system timer garden automated" },
        { "name": "Full Municipal Compliance", "description": "We handle all registration, water-use licensing, and backflow prevention so your borehole is fully legal and compliant.", "imageQuery": "borehole pump installation completed clean professional piping setup" }
      ]
  },
  "Lawyer / Attorney": {
      "heroEyebrow": "ATTORNEYS CAPE TOWN",
      "heroAccent": "Law Society of SA registered practice",
      "tagline": "Legal expertise when the stakes <em>matter</em>",
      "heroSubtitle": "Practical, results-driven legal advice for individuals and businesses across property, contracts, and dispute resolution.",
      "ctaPrimary": "Book a Consultation",
      "ctaSecondary": "Areas of Practice",
      "ctaNote": "First consultation R500 \u00b7 Transparent fee structures \u00b7 No legal jargon",
      "badge": "Law Society of South Africa Member",
      "servicesHeading": "Areas of Practice",
      "services": [
          {
              "name": "Property & Conveyancing",
              "description": "Residential and commercial property transfers, bonds, and sectional title transactions handled efficiently.",
              "tags": [
                  "Conveyancing",
                  "Property Transfer"
              ],
              "icon": "home",
              "serviceImageQuery": "property deed documents house keys on table with lawyer hand pointing at signature line"
          },
          {
              "name": "Contracts & Commercial Law",
              "description": "Drafting, reviewing, and enforcing commercial contracts, NDAs, and shareholder agreements.",
              "tags": [
                  "Contracts",
                  "Commercial"
              ],
              "icon": "file-text",
              "serviceImageQuery": "business person reviewing printed commercial contract with pen at office desk close up"
          },
          {
              "name": "Dispute Resolution & Litigation",
              "description": "Civil litigation, mediation, and dispute resolution for individuals and businesses in South Africa.",
              "tags": [
                  "Litigation",
                  "Mediation"
              ],
              "icon": "shield",
              "serviceImageQuery": "empty courtroom interior wooden judge bench chairs high ceiling formal"
          },
          {
              "name": "Wills & Estate Administration",
              "description": "Drafting of wills, appointment as executor, and full estate administration to ensure your wishes are carried out.",
              "tags": [
                  "Wills",
                  "Estate Admin"
              ],
              "icon": "clipboard",
              "serviceImageQuery": "last will and testament document with fountain pen glasses on wooden desk"
          }
      ],
      "galleryHeading": "Our Practice",
      "aboutHeading": "Law practised with <em>integrity</em>",
      "aboutText": "We are a boutique Cape Town law firm built on the principle that clients deserve honest advice \u2014 not advice designed to maximise billable hours. We explain the law clearly, set realistic expectations, and tell you when a matter isn't worth pursuing.\n\nOur attorneys have between 10 and 25 years of practice experience. You will always deal directly with a qualified attorney.",
      "aboutMission": "We believe the best legal advice solves your problem with the least possible disruption to your life.",
      "stats": [
          {
              "value": "22+",
              "label": "Years in Practice",
              "sublabel": "since 2002"
          },
          {
              "value": "3",
              "label": "Qualified Attorneys",
              "sublabel": "senior & specialist"
          },
          {
              "value": "1,500+",
              "label": "Matters Handled",
              "sublabel": "property, commercial, disputes"
          },
          {
              "value": "94%",
              "label": "Client Satisfaction",
              "sublabel": "from post-matter surveys"
          }
      ],
      "contactHeading": "Need legal advice? Let's talk.",
      "contactHours": "Mon\u2013Fri: 08:30\u201317:00 \u00b7 Sat: By appointment \u00b7 Urgent matters by phone",
      "processSteps": [
          {
              "step": "1",
              "title": "Initial Consultation",
              "description": "We discuss your matter, assess the merits, and advise on the best course of action."
          },
          {
              "step": "2",
              "title": "Mandate & Fee Agreement",
              "description": "Clear mandate and fee agreement signed before any billable work commences."
          },
          {
              "step": "3",
              "title": "Matter Resolved",
              "description": "We handle the matter to resolution, keeping you informed at every stage."
          }
      ],
      "testimonial": {
          "quote": "Handled our property transfer perfectly. Clear fees, no surprises, every question answered.",
          "author": "Mark & Susan T., Verified Client",
          "rating": 5
      },
      "imageMood": "professional, authoritative, trustworthy",
      "heroImageQuery": "lawyer in suit reading legal brief at mahogany desk with law books on shelf behind",
      "heroBgImageQuery": "dark dramatic closeup brass scales of justice on wooden desk with leather law books",
      "ogImageQuery": "senior attorney reviewing contract at polished wooden desk with gavel and open law book",
      "aboutImageQuery": "two attorneys in suits discussing case files across boardroom table with legal folders",
      "galleryImageQueries": [
          "law office interior dark wood bookshelves leather chairs framed certificates on wall",
          "lawyer hand signing legal contract with fountain pen on mahogany desk close up",
          "empty courtroom interior wooden judge bench witness stand formal",
          "open law book pages close up with brass scales of justice and reading glasses on desk"
      ]
  },
  "Accountant": {
      "heroEyebrow": "CHARTERED ACCOUNTANTS CAPE TOWN",
      "heroAccent": "SAICA registered. Tax Clearance guaranteed.",
      "tagline": "Numbers handled. Business <em>protected</em>.",
      "heroSubtitle": "Professional accounting, tax compliance, and financial reporting for small businesses, SMEs, and individuals.",
      "ctaPrimary": "Book a Consultation",
      "ctaSecondary": "Our Services",
      "ctaNote": "Free initial meeting \u00b7 Fixed monthly packages \u00b7 SARS compliant always",
      "badge": "SAICA Registered Chartered Accountant",
      "servicesHeading": "What We Do",
      "services": [
          {
              "name": "Bookkeeping & Financial Statements",
              "description": "Monthly bookkeeping, management accounts, and annual financial statements for your business.",
              "tags": [
                  "Bookkeeping",
                  "Management Accounts"
              ],
              "icon": "book",
              "serviceImageQuery": "accountant working on financial statements spreadsheet on laptop screen with printed reports beside"
          },
          {
              "name": "Tax Compliance & Returns",
              "description": "Company tax, VAT, PAYE, and personal tax returns filed accurately and on time, every time.",
              "tags": [
                  "Tax Returns",
                  "VAT"
              ],
              "icon": "file-text",
              "serviceImageQuery": "tax return documents with calculator pen and coffee on office desk overhead view"
          },
          {
              "name": "Payroll & HR Administration",
              "description": "Full payroll processing, IRP5 submissions, PAYE reconciliations, and UIF registration.",
              "tags": [
                  "Payroll",
                  "IRP5"
              ],
              "icon": "users",
              "serviceImageQuery": "payroll payslip printed documents stacked with calculator and pen on office desk"
          },
          {
              "name": "Company Registration & Compliance",
              "description": "New company registration with CIPC, BEE affidavits, annual returns, and SARS eFiling setup for startups and SMEs.",
              "tags": [
                  "CIPC Registration",
                  "Annual Returns"
              ],
              "icon": "check-square",
              "serviceImageQuery": "company registration certificate official documents with rubber stamp on office desk"
          }
      ],
      "galleryHeading": "Your Finances, Our Focus",
      "aboutHeading": "Accounting that <em>protects</em> your business",
      "aboutText": "SARS is not an adversary if your affairs are in order. We keep them in order. Our clients rarely hear from SARS \u2014 because we file correctly, on time, every time.\n\nWe work with small businesses, sole proprietors, and growing SMEs. We use cloud accounting to give you real-time financial visibility.",
      "aboutMission": "We believe accurate accounting is the foundation of every business decision worth making.",
      "stats": [
          {
              "value": "18+",
              "label": "Years in Practice",
              "sublabel": "since 2006"
          },
          {
              "value": "200+",
              "label": "Business Clients",
              "sublabel": "across Cape Town"
          },
          {
              "value": "0",
              "label": "Late Submissions",
              "sublabel": "in the last 5 years"
          },
          {
              "value": "4.9\u2605",
              "label": "Google Rating",
              "sublabel": "from 250+ reviews"
          }
      ],
      "contactHeading": "Want to get your finances in order?",
      "contactHours": "Mon\u2013Fri: 08:00\u201317:00 \u00b7 Sat: 09:00\u201312:00 (tax season) \u00b7 By appointment",
      "processSteps": [
          {
              "step": "1",
              "title": "Free Initial Meeting",
              "description": "We review your current financial position and identify compliance gaps."
          },
          {
              "step": "2",
              "title": "Engagement Letter",
              "description": "Clear scope, fixed fee, and engagement letter signed before any work begins."
          },
          {
              "step": "3",
              "title": "Ongoing Partnership",
              "description": "Monthly or quarterly service delivery with proactive deadline communication."
          }
      ],
      "testimonial": {
          "quote": "Haven't had a SARS problem in 4 years. My business finances finally make sense to me.",
          "author": "Brendan O., Verified Client",
          "rating": 5
      },
      "imageMood": "professional, precise, trustworthy",
      "heroImageQuery": "accountant at desk with calculator laptop and printed financial statements spreadsheets",
      "heroBgImageQuery": "dark moody close up of financial spreadsheet numbers on computer monitor blue glow",
      "ogImageQuery": "chartered accountant reviewing annual financial statements with calculator at wooden desk",
      "aboutImageQuery": "accounting team of three people reviewing financial reports around boardroom table with laptops",
      "galleryImageQueries": [
          "open bookkeeping ledger with handwritten entries calculator and pen on wooden desk",
          "tax return form documents stacked with calculator pen and reading glasses on desk",
          "printed annual financial report with bar charts and pie graphs on conference table",
          "accountant using cloud accounting software on laptop screen showing dashboard graphs"
      ]
  },
  "Consultant": {
      "heroEyebrow": "BUSINESS CONSULTANTS CAPE TOWN",
      "heroAccent": "Strategy. Execution. Measurable results.",
      "tagline": "The outside perspective that changes <em>everything</em>",
      "heroSubtitle": "Independent business consulting for strategy, operations, and growth \u2014 practical advice that translates directly into results.",
      "ctaPrimary": "Book a Discovery Call",
      "ctaSecondary": "How We Work",
      "ctaNote": "First call free \u00b7 No long-term retainer required \u00b7 Results-based options",
      "badge": "IMM Graduate School of Marketing Alumni",
      "servicesHeading": "What We Offer",
      "services": [
          {
              "name": "Business Strategy",
              "description": "Strategic planning, market positioning, and competitive analysis to clarify your direction and focus.",
              "tags": [
                  "Strategy",
                  "Market Analysis"
              ],
              "icon": "target",
              "serviceImageQuery": "business strategy whiteboard with flowchart diagrams arrows and colourful sticky notes in office"
          },
          {
              "name": "Operational Improvement",
              "description": "Process mapping, efficiency analysis, and implementation support to reduce costs and improve output.",
              "tags": [
                  "Operations",
                  "Efficiency"
              ],
              "icon": "settings",
              "serviceImageQuery": "printed workflow process map diagram with arrows spread on conference table with pen"
          },
          {
              "name": "Growth & Scale Advisory",
              "description": "Revenue growth strategy, market expansion planning, and investor-ready business development.",
              "tags": [
                  "Growth",
                  "Scale"
              ],
              "icon": "trending-up",
              "serviceImageQuery": "revenue growth line chart showing upward trend on laptop screen with coffee beside"
          },
          {
              "name": "Change Management & Restructuring",
              "description": "Organisational restructuring, workforce realignment, and change management support to navigate transitions smoothly.",
              "tags": [
                  "Restructuring",
                  "Change Management"
              ],
              "icon": "refresh-cw",
              "serviceImageQuery": "organisational chart diagram with boxes and lines restructured pinned to cork board"
          }
      ],
      "galleryHeading": "Our Approach",
      "aboutHeading": "Consulting built on <em>results</em>",
      "aboutText": "We have worked with businesses across Cape Town and the Western Cape for over 15 years \u2014 from startups needing their first strategy to established businesses stuck in a plateau. The common thread: clarity about what to do and the discipline to do it.\n\nWe don't produce reports. We produce change.",
      "aboutMission": "We believe every business has untapped potential \u2014 and the right outside perspective unlocks it faster than any internal effort.",
      "stats": [
          {
              "value": "15+",
              "label": "Years Consulting",
              "sublabel": "since 2009"
          },
          {
              "value": "120+",
              "label": "Businesses Advised",
              "sublabel": "SMEs to corporates"
          },
          {
              "value": "3.2x",
              "label": "Avg Revenue Growth",
              "sublabel": "in 24-month engagements"
          },
          {
              "value": "92%",
              "label": "Client Retention Rate",
              "sublabel": "year-on-year"
          }
      ],
      "contactHeading": "Ready for a free discovery call?",
      "contactHours": "Mon\u2013Fri: 08:00\u201318:00 \u00b7 Sat: By arrangement \u00b7 Virtual meetings available",
      "processSteps": [
          {
              "step": "1",
              "title": "Discovery Call",
              "description": "We listen, ask sharp questions, and honestly assess where we can add value."
          },
          {
              "step": "2",
              "title": "Diagnosis & Proposal",
              "description": "We map the key issues and propose a focused scope with clear deliverables."
          },
          {
              "step": "3",
              "title": "Implement & Measure",
              "description": "We work alongside your team to implement changes and track measurable outcomes."
          }
      ],
      "testimonial": {
          "quote": "In six months they helped us double revenue. The ROI on consulting fees was 15x.",
          "author": "David K., Verified Client",
          "rating": 5
      },
      "imageMood": "sharp, professional, strategic",
      "heroImageQuery": "business consultant presenting strategy on whiteboard with diagrams and sticky notes in meeting room",
      "heroBgImageQuery": "dark moody empty corporate boardroom long glass table leather chairs evening lighting",
      "ogImageQuery": "strategy planning whiteboard covered in colourful post-it notes and flow diagrams",
      "aboutImageQuery": "consultant in suit presenting strategy slides on screen to two clients in modern meeting room",
      "galleryImageQueries": [
          "strategy workshop whiteboard covered in colourful sticky notes diagrams and markers in office",
          "printed business plan executive summary document with graphs and charts on conference table",
          "KPI performance dashboard with bar charts and metrics displayed on large monitor screen",
          "business process flowchart diagram printed on large paper pinned to office wall"
      ]
  },
  "Financial Advisor": {
      "heroEyebrow": "CERTIFIED FINANCIAL PLANNER CAPE TOWN",
      "heroAccent": "FSB licensed. Fiduciary duty to you.",
      "tagline": "Your financial future, <em>planned</em> with precision",
      "heroSubtitle": "Independent financial planning for retirement, investments, insurance, and estate planning from a licensed CFP.",
      "ctaPrimary": "Book a Financial Review",
      "ctaSecondary": "Our Services",
      "ctaNote": "First review complimentary \u00b7 Fully independent \u00b7 No product bias",
      "badge": "FPI Certified Financial Planner (CFP\u00ae)",
      "servicesHeading": "What We Plan",
      "services": [
          {
              "name": "Retirement Planning",
              "description": "Comprehensive retirement needs analysis, preservation, and drawdown strategy to secure your future.",
              "tags": [
                  "Retirement Annuity",
                  "Preservation"
              ],
              "icon": "clock",
              "serviceImageQuery": "retirement planning nest egg concept golden egg in nest on financial documents desk"
          },
          {
              "name": "Investment Portfolio Management",
              "description": "Personalised investment portfolios aligned to your risk profile, timeline, and financial goals.",
              "tags": [
                  "Investments",
                  "Portfolio"
              ],
              "icon": "trending-up",
              "serviceImageQuery": "investment portfolio allocation pie chart displayed on tablet screen with printed reports"
          },
          {
              "name": "Risk & Estate Planning",
              "description": "Life cover, income protection, and estate planning to protect your family and preserve wealth.",
              "tags": [
                  "Life Cover",
                  "Estate"
              ],
              "icon": "shield",
              "serviceImageQuery": "estate planning documents last will with pen and family photo on desk"
          },
          {
              "name": "Tax-Efficient Savings & TFSA",
              "description": "Tax-free savings accounts, tax-efficient investment structures, and Section 12J planning for maximum after-tax growth.",
              "tags": [
                  "TFSA",
                  "Tax Efficiency"
              ],
              "icon": "percent",
              "serviceImageQuery": "savings growth compound interest chart on paper with calculator and coins stacked on desk"
          }
      ],
      "galleryHeading": "Your Financial Future",
      "aboutHeading": "Advice that puts <em>you</em> first",
      "aboutText": "We are an independent financial planning practice with no product mandates and no commission bias. Our advice is driven entirely by what is best for your specific financial situation.\n\nWe are CFP\u00ae certified and FSB licensed. We take our fiduciary duty to our clients seriously.",
      "aboutMission": "We believe financial security is not a luxury for the wealthy \u2014 it's a plan anyone can build with the right guidance.",
      "stats": [
          {
              "value": "20+",
              "label": "Years Planning",
              "sublabel": "since 2004"
          },
          {
              "value": "R2.1bn",
              "label": "Assets Under Advice",
              "sublabel": "client portfolios"
          },
          {
              "value": "300+",
              "label": "Active Financial Plans",
              "sublabel": "current clients"
          },
          {
              "value": "97%",
              "label": "Client Retention Rate",
              "sublabel": "year-on-year"
          }
      ],
      "contactHeading": "Ready to review your financial plan?",
      "contactHours": "Mon\u2013Fri: 08:30\u201317:00 \u00b7 By appointment only \u00b7 Teleconference available",
      "processSteps": [
          {
              "step": "1",
              "title": "Complimentary Review",
              "description": "We review your current financial position, goals, and gaps in your plan."
          },
          {
              "step": "2",
              "title": "Financial Plan Drafted",
              "description": "A comprehensive written financial plan with specific recommendations produced."
          },
          {
              "step": "3",
              "title": "Implement & Review",
              "description": "Recommendations implemented and reviewed annually to stay on track."
          }
      ],
      "testimonial": {
          "quote": "For the first time I actually understand where I stand and where I'm going financially.",
          "author": "Carol M., Verified Client",
          "rating": 5
      },
      "imageMood": "professional, trustworthy, confident",
      "heroImageQuery": "financial advisor in suit explaining investment portfolio charts on tablet to client at office desk",
      "heroBgImageQuery": "dark moody stock market candlestick charts and financial data on multiple monitors blue glow",
      "ogImageQuery": "certified financial planner reviewing retirement portfolio documents with calculator at polished desk",
      "aboutImageQuery": "financial planner in office explaining printed charts and graphs to couple sitting across desk",
      "galleryImageQueries": [
          "retirement savings concept glass jar with coins and small plant growing on wooden desk",
          "stock market investment candlestick chart on computer monitor trader desk setup",
          "life insurance policy document open on desk with pen and family photo frame beside",
          "printed financial plan document showing pie charts bar graphs and portfolio allocation on table"
      ]
  },
  "Insurance Agent / Broker": {
      "heroEyebrow": "INDEPENDENT INSURANCE BROKER",
      "heroAccent": "Access to 12 insurers. Best rate guaranteed.",
      "tagline": "Insured properly, not just <em>cheaply</em>",
      "heroSubtitle": "Independent insurance broking for personal, commercial, and specialist cover \u2014 we shop the market so you don't have to.",
      "ctaPrimary": "Get a Quote",
      "ctaSecondary": "Types of Cover",
      "ctaNote": "Free quote comparison \u00b7 No obligation \u00b7 Claims support included",
      "badge": "FSCA Licensed Insurance Broker",
      "servicesHeading": "Cover We Arrange",
      "services": [
          {
              "name": "Personal Lines Insurance",
              "description": "Home contents, buildings, vehicles, and valuables covered with the right policy from the right insurer.",
              "tags": [
                  "Home Contents",
                  "Vehicle"
              ],
              "icon": "home",
              "serviceImageQuery": "miniature house and car models under small umbrella on desk insurance protection concept"
          },
          {
              "name": "Business Insurance",
              "description": "Commercial property, liability, business interruption, and professional indemnity for any business size.",
              "tags": [
                  "Commercial",
                  "Liability"
              ],
              "icon": "briefcase",
              "serviceImageQuery": "modern commercial office building exterior glass facade with business signage"
          },
          {
              "name": "Claims Assistance",
              "description": "We manage your claims from submission to settlement \u2014 you never face the insurer alone.",
              "tags": [
                  "Claims Support",
                  "Settlement"
              ],
              "icon": "shield",
              "serviceImageQuery": "car accident fender bender damage assessment person inspecting bumper close up"
          },
          {
              "name": "Specialist & High-Value Cover",
              "description": "Tailored cover for high-value homes, art collections, jewellery, and classic vehicles that standard policies exclude.",
              "tags": [
                  "High-Value",
                  "Art & Jewellery"
              ],
              "icon": "star",
              "serviceImageQuery": "luxury watch collection and jewellery displayed in velvet lined case close up"
          }
      ],
      "galleryHeading": "Cover That Counts",
      "aboutHeading": "Insurance that actually <em>pays</em> out",
      "aboutText": "Cheap insurance isn't cheap when you claim and they decline. We place your cover carefully, read the policy wording, and ensure there are no gaps before something goes wrong.\n\nAs independent brokers, we represent you \u2014 not the insurer. That changes everything when a claim arises.",
      "aboutMission": "We believe insurance is only worth having if it actually pays when things go wrong \u2014 and we make sure yours does.",
      "stats": [
          {
              "value": "16+",
              "label": "Years Broking",
              "sublabel": "since 2008"
          },
          {
              "value": "12",
              "label": "Insurers Accessed",
              "sublabel": "for best market rate"
          },
          {
              "value": "500+",
              "label": "Clients Covered",
              "sublabel": "personal & commercial"
          },
          {
              "value": "98%",
              "label": "Claims Success Rate",
              "sublabel": "managed by our team"
          }
      ],
      "contactHeading": "Want a proper insurance review?",
      "contactHours": "Mon\u2013Fri: 08:30\u201317:00 \u00b7 Sat: 09:00\u201312:00 \u00b7 Claims line available after hours",
      "processSteps": [
          {
              "step": "1",
              "title": "Risk Review",
              "description": "We assess what you have, what you need, and where you're currently exposed."
          },
          {
              "step": "2",
              "title": "Market Comparison",
              "description": "We quote across 12 insurers and recommend the best cover at the best rate."
          },
          {
              "step": "3",
              "title": "Place & Manage",
              "description": "Cover placed, documents delivered, renewals and claims managed on your behalf."
          }
      ],
      "testimonial": {
          "quote": "Better cover for R400 less per month \u2014 and they actually helped when I claimed.",
          "author": "Nadia F., Verified Client",
          "rating": 5
      },
      "imageMood": "professional, reassuring, trustworthy",
      "heroImageQuery": "insurance broker in office explaining policy document to client with miniature house and car models on desk",
      "heroBgImageQuery": "dark moody red umbrella protecting miniature house model from rain dramatic lighting",
      "ogImageQuery": "insurance policy documents spread on desk with house and car miniature models and pen",
      "aboutImageQuery": "insurance broker in suit reviewing policy comparison documents with client couple across office desk",
      "galleryImageQueries": [
          "insurance policy comparison documents spread on desk with highlighter pen and calculator",
          "family suburban home exterior front garden driveway well-maintained property",
          "commercial warehouse building exterior loading dock trucks parked outside",
          "water damage flooded home interior insurance claim assessment scene"
      ]
  },
  "Recruitment / Staffing": {
      "heroEyebrow": "RECRUITMENT AGENCY CAPE TOWN",
      "heroAccent": "Permanent, contract & executive search",
      "tagline": "The right person, placed <em>right</em>",
      "heroSubtitle": "Specialist recruitment for permanent, contract, and executive roles \u2014 connecting Cape Town's best employers with top talent.",
      "ctaPrimary": "Submit a Brief",
      "ctaSecondary": "For Candidates",
      "ctaNote": "No placement, no fee \u00b7 3-month replacement guarantee \u00b7 Industry specialists",
      "badge": "APSO Registered Recruitment Agency",
      "servicesHeading": "How We Recruit",
      "services": [
          {
              "name": "Permanent Placement",
              "description": "End-to-end permanent recruitment from brief to onboarding with a 90-day replacement guarantee.",
              "tags": [
                  "Permanent",
                  "90-day Guarantee"
              ],
              "icon": "user-check",
              "serviceImageQuery": "printed CV resume document on desk with pen and recruiter hand highlighting qualifications"
          },
          {
              "name": "Contract & Temp Staffing",
              "description": "Rapid deployment of contract and temporary staff for project work, leave cover, and peaks.",
              "tags": [
                  "Contract",
                  "Temp"
              ],
              "icon": "clock",
              "serviceImageQuery": "busy open plan office with workers at desks computers and bright overhead lighting"
          },
          {
              "name": "Executive Search",
              "description": "Discreet headhunting and executive search for senior management and C-suite appointments.",
              "tags": [
                  "Executive Search",
                  "C-Suite"
              ],
              "icon": "star",
              "serviceImageQuery": "executive boardroom long polished table leather chairs glass windows city view"
          },
          {
              "name": "Psychometric & Skills Testing",
              "description": "Pre-employment psychometric assessments, competency testing, and cultural fit evaluations to de-risk every hire.",
              "tags": [
                  "Psychometrics",
                  "Skills Testing"
              ],
              "icon": "clipboard",
              "serviceImageQuery": "psychometric aptitude test assessment paper with pencil and answer sheet on desk"
          }
      ],
      "galleryHeading": "Connections Made",
      "aboutHeading": "Recruitment done with <em>care</em>",
      "aboutText": "We place people in jobs \u2014 but more than that, we place the right people in the right jobs. That distinction makes all the difference to the employer, the employee, and the longevity of the placement.\n\nOur consultants specialise by industry. They understand the roles they fill and the companies they fill them for.",
      "aboutMission": "We believe a great placement creates value for everyone involved \u2014 and that's only possible when recruiters truly understand both sides.",
      "stats": [
          {
              "value": "14+",
              "label": "Years Recruiting",
              "sublabel": "since 2010"
          },
          {
              "value": "1,800+",
              "label": "Placements Made",
              "sublabel": "permanent & contract"
          },
          {
              "value": "87%",
              "label": "12-Month Retention",
              "sublabel": "of permanent placements"
          },
          {
              "value": "4.8\u2605",
              "label": "Google Rating",
              "sublabel": "from 200+ reviews"
          }
      ],
      "contactHeading": "Have a vacancy or looking for a role?",
      "contactHours": "Mon\u2013Fri: 08:00\u201317:30 \u00b7 Sat: By arrangement \u00b7 Urgent briefs by phone",
      "processSteps": [
          {
              "step": "1",
              "title": "Brief & Discovery",
              "description": "We understand the role, team culture, and non-negotiables before any search begins."
          },
          {
              "step": "2",
              "title": "Search & Screen",
              "description": "We source, assess, and shortlist only candidates who genuinely fit your requirements."
          },
          {
              "step": "3",
              "title": "Interview & Place",
              "description": "We manage interviews, reference checks, and offer negotiation to completion."
          }
      ],
      "testimonial": {
          "quote": "Third placement in 18 months and all three are still with us. Outstanding calibre consistently.",
          "author": "Helen A., Verified Client",
          "rating": 5
      },
      "imageMood": "professional, dynamic, people-focused",
      "heroImageQuery": "recruitment consultant interviewing candidate across desk in modern bright office with resume on table",
      "heroBgImageQuery": "dark moody empty modern open plan office desks and chairs in evening light",
      "ogImageQuery": "stack of printed resumes CVs with pen and highlighter on recruiter desk",
      "aboutImageQuery": "two recruitment consultants reviewing candidate profiles together on laptop in bright office",
      "galleryImageQueries": [
          "modern open plan office workspace with desks computers and bright natural light through windows",
          "professional handshake between two people in office after job interview offer accepted",
          "executive corner office with polished desk leather chair and city skyline view through window",
          "stack of printed CVs and resumes spread on desk with highlighter pen and notes"
      ]
  },
  "Marketing Agency": {
      "heroEyebrow": "FULL-SERVICE MARKETING CAPE TOWN",
      "heroAccent": "Brand, digital & performance marketing",
      "tagline": "Marketing that actually <em>moves</em> the needle",
      "heroSubtitle": "Strategy-led marketing for brands that want more customers, more awareness, and better returns on every rand spent.",
      "ctaPrimary": "Get a Proposal",
      "ctaSecondary": "Our Work",
      "ctaNote": "Free marketing audit \u00b7 No lock-in retainers \u00b7 Monthly reporting",
      "badge": "IAB South Africa Member",
      "servicesHeading": "What We Do",
      "services": [
          {
              "name": "Brand Strategy & Identity",
              "description": "Brand positioning, visual identity, and messaging systems built for clarity and long-term impact.",
              "tags": [
                  "Branding",
                  "Positioning"
              ],
              "icon": "star",
              "serviceImageQuery": "brand identity design mockup with logo business cards letterhead and stationery flat lay on desk"
          },
          {
              "name": "Digital Marketing & SEO",
              "description": "Google Ads, SEO, social media marketing, and email campaigns that drive measurable traffic and leads.",
              "tags": [
                  "Google Ads",
                  "SEO"
              ],
              "icon": "trending-up",
              "serviceImageQuery": "google analytics website traffic dashboard on laptop screen showing visitor graphs and metrics"
          },
          {
              "name": "Content & Creative Production",
              "description": "Copywriting, photography, video, and design assets produced to a consistent and compelling standard.",
              "tags": [
                  "Content",
                  "Video"
              ],
              "icon": "camera",
              "serviceImageQuery": "video production shoot in studio with camera on tripod lighting rig and creative team"
          },
          {
              "name": "Website Design & Development",
              "description": "Conversion-focused websites built on modern platforms with SEO, analytics, and lead capture baked in from day one.",
              "tags": [
                  "Web Design",
                  "Lead Generation"
              ],
              "icon": "monitor",
              "serviceImageQuery": "responsive website design displayed on laptop tablet and phone screens showing same site"
          }
      ],
      "galleryHeading": "Campaigns We've Built",
      "aboutHeading": "Marketing built on <em>strategy</em>",
      "aboutText": "We don't start with tactics. We start with understanding your business, your customers, and what makes you genuinely different. Only then do we decide where and how to market.\n\nOur team includes strategists, designers, writers, and performance marketers working under one roof in Cape Town.",
      "aboutMission": "We believe marketing without strategy is just spending \u2014 and every rand our clients invest deserves a return.",
      "stats": [
          {
              "value": "11+",
              "label": "Years in Marketing",
              "sublabel": "since 2013"
          },
          {
              "value": "80+",
              "label": "Brands Served",
              "sublabel": "startups to corporates"
          },
          {
              "value": "4.1x",
              "label": "Average ROAS",
              "sublabel": "on paid digital campaigns"
          },
          {
              "value": "4.9\u2605",
              "label": "Google Rating",
              "sublabel": "from 180+ reviews"
          }
      ],
      "contactHeading": "Ready for a free marketing audit?",
      "contactHours": "Mon\u2013Fri: 08:30\u201317:30 \u00b7 Sat: By arrangement \u00b7 Virtual meetings available",
      "processSteps": [
          {
              "step": "1",
              "title": "Free Marketing Audit",
              "description": "We review your current marketing, identify gaps, and benchmark against competitors."
          },
          {
              "step": "2",
              "title": "Strategy & Proposal",
              "description": "A focused strategy with channels, budget allocation, and expected outcomes."
          },
          {
              "step": "3",
              "title": "Execute & Report",
              "description": "Campaigns launched, optimised weekly, reported against agreed KPIs monthly."
          }
      ],
      "testimonial": {
          "quote": "Leads doubled in 90 days. They know exactly what they're doing and show you the proof.",
          "author": "Jason R., Verified Client",
          "rating": 5
      },
      "imageMood": "creative, bold, modern",
      "heroImageQuery": "marketing agency creative workspace with mood board colour swatches design mockups on desk",
      "heroBgImageQuery": "dark moody creative agency studio with neon accent lights iMac screens and design work",
      "ogImageQuery": "brand campaign billboard mockup with bold poster design on city street",
      "aboutImageQuery": "creative marketing team of four brainstorming around whiteboard covered in colourful post-it notes",
      "galleryImageQueries": [
          "brand advertising campaign poster mockup displayed on billboard in urban street setting",
          "social media marketing manager holding phone with notifications and analytics on screen",
          "product photography studio shoot setup with camera tripod lighting and styled product on table",
          "marketing analytics ROI dashboard showing campaign performance charts and graphs on desktop monitor"
      ]
  },
  "Business Coach": {
      "heroEyebrow": "BUSINESS COACHING CAPE TOWN",
      "heroAccent": "ICF certified coach. 15+ years experience.",
      "tagline": "The clarity to lead, the courage to <em>decide</em>",
      "heroSubtitle": "Executive and business coaching for founders, managers, and leaders who want to perform at their best.",
      "ctaPrimary": "Book a Discovery Session",
      "ctaSecondary": "How Coaching Works",
      "ctaNote": "First session complimentary \u00b7 Confidential \u00b7 Remote & in-person",
      "badge": "ICF Certified Coach (ACC)",
      "servicesHeading": "Who We Coach",
      "services": [
          {
              "name": "Executive Coaching",
              "description": "One-on-one coaching for senior leaders navigating complexity, performance pressure, and team dynamics.",
              "tags": [
                  "Executive",
                  "Leadership"
              ],
              "icon": "user",
              "serviceImageQuery": "notebook goal setting written plan pen on desk"
          },
          {
              "name": "Entrepreneur Coaching",
              "description": "Structured coaching for founders managing growth, burnout, and high-stakes strategic decisions.",
              "tags": [
                  "Entrepreneur",
                  "Founder"
              ],
              "icon": "trending-up",
              "serviceImageQuery": "startup workspace laptop whiteboard ideas brainstorm"
          },
          {
              "name": "Team & Group Coaching",
              "description": "Group coaching workshops for management teams to align on strategy, communication, and accountability.",
              "tags": [
                  "Team Coaching",
                  "Workshops"
              ],
              "icon": "users",
              "serviceImageQuery": "workshop group session chairs circle flipchart"
          },
          {
              "name": "Leadership Development Programmes",
              "description": "Structured multi-session leadership programmes for emerging managers stepping into their first leadership roles.",
              "tags": [
                  "Leadership",
                  "Emerging Managers"
              ],
              "icon": "award",
              "serviceImageQuery": "leadership development workbook certificate pen desk"
          }
      ],
      "galleryHeading": "Coaching in Action",
      "aboutHeading": "Coaching that <em>transforms</em> performance",
      "aboutText": "Coaching is not consulting. We don't tell you what to do \u2014 we ask the right questions until you see what you already know. That shift in clarity is more powerful than any advice.\n\nI am an ICF-certified coach with 15 years of experience working with business leaders across South Africa.",
      "aboutMission": "We believe every leader has more capacity than they're currently accessing \u2014 coaching unlocks it.",
      "stats": [
          {
              "value": "15+",
              "label": "Years Coaching",
              "sublabel": "since 2009"
          },
          {
              "value": "300+",
              "label": "Leaders Coached",
              "sublabel": "executive to founder"
          },
          {
              "value": "ICF",
              "label": "Internationally Certified",
              "sublabel": "Associate Certified Coach"
          },
          {
              "value": "94%",
              "label": "Client Goal Achievement",
              "sublabel": "at 6-month review"
          }
      ],
      "contactHeading": "Ready for a free discovery session?",
      "contactHours": "Mon\u2013Fri: 07:30\u201318:00 \u00b7 Sat: By arrangement \u00b7 Telecoaching available globally",
      "processSteps": [
          {
              "step": "1",
              "title": "Discovery Session",
              "description": "A complimentary 45-minute session to explore your goals and assess our fit."
          },
          {
              "step": "2",
              "title": "Coaching Agreement",
              "description": "Clear coaching contract, session schedule, and agreed outcomes established."
          },
          {
              "step": "3",
              "title": "Coach & Grow",
              "description": "Regular sessions driving accountability, clarity, and measurable performance improvement."
          }
      ],
      "testimonial": {
          "quote": "I made the decision I'd been avoiding for two years in the third session. Worth everything.",
          "author": "Dakota N., Verified Client",
          "rating": 5
      },
      "imageMood": "professional, warm, purposeful",
      "heroImageQuery": "business coach in one on one session with executive client at small table in bright office with notebook",
      "heroBgImageQuery": "dark moody coaching session silhouette two people at desk with warm lamp light conversation",
      "ogImageQuery": "executive coaching session notebook pen and coffee on small table between two people",
      "aboutImageQuery": "professional coach sitting across from client in focused one on one conversation at small round table",
      "galleryImageQueries": [
          "open journal notebook on desk with handwritten goals list pen and coffee cup",
          "executive coaching workshop with flipchart showing goals and two professionals discussing at whiteboard",
          "team leadership workshop group of six people around flipchart with markers doing group activity",
          "professional development books stacked on desk with notebook pen and reading glasses"
      ]
  },
  "Translation / Interpreting": {
      "heroEyebrow": "TRANSLATION & INTERPRETING",
      "heroAccent": "40+ language pairs. SATI accredited.",
      "tagline": "Your message, perfectly <em>understood</em>",
      "heroSubtitle": "Professional translation, interpreting, and localisation for legal, medical, corporate, and government documents.",
      "ctaPrimary": "Get a Quote",
      "ctaSecondary": "Languages We Cover",
      "ctaNote": "Certified translations available \u00b7 48-hour turnaround \u00b7 NDA on all work",
      "badge": "SATI Accredited Translator",
      "servicesHeading": "What We Translate",
      "services": [
          {
              "name": "Legal & Official Document Translation",
              "description": "Certified translations of contracts, court orders, birth certificates, and official documents for any jurisdiction.",
              "tags": [
                  "Certified",
                  "Legal"
              ],
              "icon": "file-text",
              "serviceImageQuery": "certified document stamp official translation seal"
          },
          {
              "name": "Business & Technical Translation",
              "description": "Corporate documents, technical manuals, marketing materials, and website localisation.",
              "tags": [
                  "Corporate",
                  "Technical"
              ],
              "icon": "briefcase",
              "serviceImageQuery": "technical manual open multilingual pages text"
          },
          {
              "name": "Conference & Court Interpreting",
              "description": "Simultaneous and consecutive interpreting for conferences, depositions, and court proceedings.",
              "tags": [
                  "Simultaneous",
                  "Court"
              ],
              "icon": "mic",
              "serviceImageQuery": "interpreting headset booth conference equipment"
          },
          {
              "name": "Website & App Localisation",
              "description": "Full website and mobile app translation with cultural adaptation, SEO keyword localisation, and CMS integration.",
              "tags": [
                  "Localisation",
                  "App Translation"
              ],
              "icon": "globe",
              "serviceImageQuery": "multilingual website screens different languages devices"
          }
      ],
      "galleryHeading": "Languages We Speak",
      "aboutHeading": "Translation done with <em>accuracy</em>",
      "aboutText": "Bad translation is worse than no translation \u2014 a misunderstood contract or mistranslated medical instruction can cause real harm. Our translators are mother-tongue speakers with subject-matter expertise in the fields they translate.\n\nWe never use machine translation for certified or sensitive work.",
      "aboutMission": "We believe language should never be a barrier to understanding, justice, or opportunity.",
      "stats": [
          {
              "value": "12+",
              "label": "Years Translating",
              "sublabel": "since 2012"
          },
          {
              "value": "40+",
              "label": "Language Pairs",
              "sublabel": "including all 11 SA languages"
          },
          {
              "value": "5,000+",
              "label": "Documents Translated",
              "sublabel": "legal, medical & corporate"
          },
          {
              "value": "4.9\u2605",
              "label": "Google Rating",
              "sublabel": "from 200+ reviews"
          }
      ],
      "contactHeading": "Need a document translated?",
      "contactHours": "Mon\u2013Fri: 08:00\u201317:30 \u00b7 Urgent requests by email 24hrs \u00b7 Quotes same day",
      "processSteps": [
          {
              "step": "1",
              "title": "Submit Document",
              "description": "Send your document with language pair, purpose, and required turnaround time."
          },
          {
              "step": "2",
              "title": "Quote & Assign",
              "description": "We quote within the hour and assign a mother-tongue specialist in that subject area."
          },
          {
              "step": "3",
              "title": "Translate & Certify",
              "description": "Translated, proofread, and certified if required \u2014 delivered to your deadline."
          }
      ],
      "testimonial": {
          "quote": "Certified translation of our French contracts turned around in 24 hours. Flawless accuracy.",
          "author": "Pierre D., Verified Client",
          "rating": 5
      },
      "imageMood": "professional, precise, global",
      "heroImageQuery": "multilingual dictionary pages open languages text",
      "heroBgImageQuery": "dark moody world map text overlay languages",
      "ogImageQuery": "translated document pages side by side languages",
      "aboutImageQuery": "translator at desk comparing documents in two languages",
      "galleryImageQueries": [
          "certified translation stamp seal on legal document",
          "conference interpreting booth headphones microphone",
          "multilingual brochure pages printed different languages",
          "globe world map with different language flags"
      ]
  },
  "Notary / Commissioner of Oaths": {
      "heroEyebrow": "NOTARY PUBLIC CAPE TOWN",
      "heroAccent": "Apostille, certification & attestation",
      "tagline": "Documents authenticated with <em>authority</em>",
      "heroSubtitle": "Professional notarial and Commissioner of Oaths services for international documents, authentication, and apostilles.",
      "ctaPrimary": "Book an Appointment",
      "ctaSecondary": "Our Services",
      "ctaNote": "Same-day appointments \u00b7 Walk-ins welcome \u00b7 Apostille turnaround 3\u20135 days",
      "badge": "Law Society Admitted Notary Public",
      "servicesHeading": "What We Authenticate",
      "services": [
          {
              "name": "Notarial Authentication",
              "description": "Notarisation of documents for international use including powers of attorney and company documents.",
              "tags": [
                  "Notarisation",
                  "International"
              ],
              "icon": "award",
              "serviceImageQuery": "notarial seal stamp pressed into wax on document"
          },
          {
              "name": "Apostille & Legalisation",
              "description": "Apostille stamps for Hague Convention countries and full legalisation for non-convention countries.",
              "tags": [
                  "Apostille",
                  "Hague"
              ],
              "icon": "check-square",
              "serviceImageQuery": "apostille stamp certificate official government seal"
          },
          {
              "name": "Commissioner of Oaths",
              "description": "Certified copies, affidavits, statutory declarations, and sworn statements certified and stamped.",
              "tags": [
                  "Affidavit",
                  "Certified Copy"
              ],
              "icon": "stamp",
              "serviceImageQuery": "affidavit sworn document stamped certified copy"
          },
          {
              "name": "Ante-Nuptial Contracts",
              "description": "Drafting and registration of ante-nuptial contracts (ANCs) to protect both parties before marriage.",
              "tags": [
                  "Ante-Nuptial",
                  "Marriage Contract"
              ],
              "icon": "file-text",
              "serviceImageQuery": "ante-nuptial contract marriage document signed rings"
          }
      ],
      "galleryHeading": "Documents We Certify",
      "aboutHeading": "Notarial work done <em>correctly</em>",
      "aboutText": "Documents rejected abroad because of incorrect notarisation cause significant expense and delay. We ensure every document leaves our office prepared to the exact standard required by the receiving jurisdiction.\n\nWe liaise directly with DIRCO and the High Court for legalisation where required.",
      "aboutMission": "We believe official documents should open doors \u2014 and our job is to make sure they're never the reason they don't.",
      "stats": [
          {
              "value": "18+",
              "label": "Years in Practice",
              "sublabel": "since 2006"
          },
          {
              "value": "10,000+",
              "label": "Documents Authenticated",
              "sublabel": "notarial & oaths"
          },
          {
              "value": "3\u20135",
              "label": "Day Apostille Turnaround",
              "sublabel": "Hague Convention"
          },
          {
              "value": "4.9\u2605",
              "label": "Google Rating",
              "sublabel": "from 300+ reviews"
          }
      ],
      "contactHeading": "Need a document authenticated?",
      "contactHours": "Mon\u2013Fri: 08:30\u201316:30 \u00b7 Sat: 09:00\u201312:00 \u00b7 Walk-ins welcome",
      "processSteps": [
          {
              "step": "1",
              "title": "Confirm Requirements",
              "description": "Tell us the document type and destination country so we confirm exact requirements."
          },
          {
              "step": "2",
              "title": "Appointment & Signing",
              "description": "Attend our office with identity document and originals for notarisation."
          },
          {
              "step": "3",
              "title": "Certified & Delivered",
              "description": "Document certified, apostilled or legalised if required, and returned to you."
          }
      ],
      "testimonial": {
          "quote": "Apostille sorted in 4 days when others quoted 3 weeks. Thorough and very professional.",
          "author": "Emma K., Verified Client",
          "rating": 5
      },
      "imageMood": "authoritative, precise, professional",
      "heroImageQuery": "official seal stamp embossed on legal document",
      "heroBgImageQuery": "dark moody wax seal document parchment dramatic",
      "ogImageQuery": "notarial seal wax stamp official parchment document",
      "aboutImageQuery": "notary at desk stamping and signing official documents",
      "galleryImageQueries": [
          "official rubber stamp ink pad document desk",
          "government certificate apostille ribbon official",
          "stack of certified copies stamped and signed",
          "wax seal stamp closeup on legal document red"
      ]
  },
  "Debt Counsellor": {
      "heroEyebrow": "REGISTERED DEBT COUNSELLOR",
      "heroAccent": "NCR registered. Judgment-free process.",
      "tagline": "A way out of debt that <em>actually</em> works",
      "heroSubtitle": "NCR-registered debt counselling to restructure your debt, stop creditor harassment, and give you a realistic path to financial freedom.",
      "ctaPrimary": "Free Debt Assessment",
      "ctaSecondary": "How It Works",
      "ctaNote": "Completely confidential \u00b7 Stop calls from creditors \u00b7 No upfront fees",
      "badge": "NCR Registered Debt Counsellor",
      "servicesHeading": "How We Help",
      "services": [
          {
              "name": "Debt Review & Restructuring",
              "description": "We negotiate reduced instalments with all creditors and create a single affordable monthly payment.",
              "tags": [
                  "Debt Review",
                  "Reduced Instalments"
              ],
              "icon": "trending-down",
              "serviceImageQuery": "calculator bills statements overdue pile on desk"
          },
          {
              "name": "Creditor Protection",
              "description": "Legal protection from creditor action, garnishee orders, and asset repossession during debt review.",
              "tags": [
                  "Legal Protection",
                  "Creditor Stop"
              ],
              "icon": "shield",
              "serviceImageQuery": "shield icon protecting house from arrows concept art"
          },
          {
              "name": "Clearance Certificate",
              "description": "We issue your clearance certificate once all restructured debt is settled and your record restored.",
              "tags": [
                  "Clearance",
                  "Credit Record"
              ],
              "icon": "check-circle",
              "serviceImageQuery": "clearance certificate document checkmark approved stamp"
          },
          {
              "name": "Budgeting & Financial Literacy",
              "description": "Personalised budgeting tools, spending analysis, and financial literacy coaching to prevent future over-indebtedness.",
              "tags": [
                  "Budgeting",
                  "Financial Literacy"
              ],
              "icon": "book",
              "serviceImageQuery": "budget planner spreadsheet income expenses savings"
          }
      ],
      "galleryHeading": "The Road to Financial Freedom",
      "aboutHeading": "Debt handled with <em>dignity</em>",
      "aboutText": "We have helped hundreds of Cape Town residents take back control of their finances. Debt review is a legal, structured solution designed specifically for people in financial difficulty \u2014 not a last resort.\n\nWe are NCR registered, charge only regulated fees, and treat every client with complete confidentiality and respect.",
      "aboutMission": "We believe financial difficulty doesn't define a person \u2014 and everyone deserves a realistic, dignified way forward.",
      "stats": [
          {
              "value": "13+",
              "label": "Years Counselling",
              "sublabel": "since 2011"
          },
          {
              "value": "800+",
              "label": "Clients Helped",
              "sublabel": "through debt review"
          },
          {
              "value": "NCR",
              "label": "Registered & Compliant",
              "sublabel": "regulated fees only"
          },
          {
              "value": "97%",
              "label": "Completion Rate",
              "sublabel": "clients who finish the process"
          }
      ],
      "contactHeading": "Want a free, confidential debt assessment?",
      "contactHours": "Mon\u2013Fri: 08:00\u201317:30 \u00b7 Sat: 09:00\u201313:00 \u00b7 After-hours by arrangement",
      "processSteps": [
          {
              "step": "1",
              "title": "Free Assessment",
              "description": "We review your income, debt, and expenses to confirm whether debt review suits you."
          },
          {
              "step": "2",
              "title": "Apply & Protect",
              "description": "We apply for debt review, notify all creditors, and legal protection begins immediately."
          },
          {
              "step": "3",
              "title": "Pay & Progress",
              "description": "One affordable monthly payment made until all debt is settled and clearance issued."
          }
      ],
      "testimonial": {
          "quote": "The calls stopped the same week. Within 3 years I was debt-free and sleeping again.",
          "author": "Name withheld by request",
          "rating": 5
      },
      "imageMood": "calm, trustworthy, hopeful",
      "heroImageQuery": "broken chain links freedom release concept",
      "heroBgImageQuery": "dark moody bridge pathway leading to light hope",
      "ogImageQuery": "stack of bills envelopes financial stress desk",
      "aboutImageQuery": "counsellor sitting with client reviewing paperwork empathetically",
      "galleryImageQueries": [
          "overdue bills red letters pile on table",
          "sunrise open road freedom new beginning",
          "budget planner notebook pen calculator savings",
          "happy family in garden home debt free celebration"
      ]
  },
  "Customs / Freight Broker": {
      "heroEyebrow": "CUSTOMS & FREIGHT CAPE TOWN",
      "heroAccent": "SARS & SAASFF registered agents",
      "tagline": "Your cargo, cleared <em>without</em> delay",
      "heroSubtitle": "Licensed customs clearing, freight forwarding, and logistics for importers and exporters of any cargo size.",
      "ctaPrimary": "Get a Freight Quote",
      "ctaSecondary": "Our Services",
      "ctaNote": "Port, airport & border posts \u00b7 Full compliance \u00b7 Real-time tracking",
      "badge": "SARS Registered Clearing Agent",
      "servicesHeading": "What We Move",
      "services": [
          {
              "name": "Import Customs Clearing",
              "description": "Full customs declaration and clearance for sea, air, and road imports through all SA ports of entry.",
              "tags": [
                  "Import Clearing",
                  "Customs"
              ],
              "icon": "package",
              "serviceImageQuery": "container ship port crane unloading cargo"
          },
          {
              "name": "Export Documentation",
              "description": "Export declarations, permits, phytosanitary certificates, and bank documentation for all exports.",
              "tags": [
                  "Export",
                  "Documentation"
              ],
              "icon": "send",
              "serviceImageQuery": "shipping documents bill of lading customs forms"
          },
          {
              "name": "Freight Forwarding & Logistics",
              "description": "Sea, air, and road freight coordination from origin to destination with real-time shipment tracking.",
              "tags": [
                  "Sea Freight",
                  "Air Freight"
              ],
              "icon": "truck",
              "serviceImageQuery": "air cargo plane loading freight airport tarmac"
          },
          {
              "name": "Warehousing & Distribution",
              "description": "Bonded and general warehousing, inventory management, and last-mile distribution from our Cape Town facility.",
              "tags": [
                  "Warehousing",
                  "Distribution"
              ],
              "icon": "archive",
              "serviceImageQuery": "warehouse interior shelves pallets inventory storage"
          }
      ],
      "galleryHeading": "Cargo We've Cleared",
      "aboutHeading": "Freight cleared with <em>expertise</em>",
      "aboutText": "SARS and ITAC regulations change constantly \u2014 and a single error in a customs declaration can delay your cargo, trigger an inspection, or result in a penalty. We know the regulations and file correctly every time.\n\nWe are SARS registered, SAASFF members, and have operated in the Cape Town port community for over 20 years.",
      "aboutMission": "We believe international trade should be as smooth as possible \u2014 our job is to remove every obstacle between your cargo and its destination.",
      "stats": [
          {
              "value": "20+",
              "label": "Years in Clearing",
              "sublabel": "since 2004"
          },
          {
              "value": "5,000+",
              "label": "Shipments Cleared",
              "sublabel": "sea, air & road"
          },
          {
              "value": "99.2%",
              "label": "First-Time Clearance Rate",
              "sublabel": "no re-submission"
          },
          {
              "value": "4.8\u2605",
              "label": "Google Rating",
              "sublabel": "from 200+ reviews"
          }
      ],
      "contactHeading": "Ready to move your cargo?",
      "contactHours": "Mon\u2013Fri: 07:30\u201317:30 \u00b7 Sat: 08:00\u201312:00 \u00b7 Urgent shipments by phone",
      "processSteps": [
          {
              "step": "1",
              "title": "Submit Shipment Details",
              "description": "Send commercial invoice, packing list, and bill of lading for a quote and assessment."
          },
          {
              "step": "2",
              "title": "Classify & Declare",
              "description": "We classify your goods correctly and submit a compliant customs declaration."
          },
          {
              "step": "3",
              "title": "Clear & Deliver",
              "description": "Goods released from customs and delivered or forwarded to your next destination."
          }
      ],
      "testimonial": {
          "quote": "Container cleared in 48 hours. They knew exactly what was needed and just got it done.",
          "author": "Greg S., Verified Client",
          "rating": 5
      },
      "imageMood": "industrial, precise, global",
      "heroImageQuery": "container port stacked shipping containers crane harbour",
      "heroBgImageQuery": "dark moody container port night cranes silhouette",
      "ogImageQuery": "shipping containers stacked colourful port aerial",
      "aboutImageQuery": "logistics team reviewing shipping documents in warehouse office",
      "galleryImageQueries": [
          "container ship docked at port aerial view",
          "customs declaration form stamp documents desk",
          "air cargo loading bay plane freight pallets",
          "warehouse interior shelves pallets forklift logistics"
      ]
  },
  "Cleaning Service": {
      "heroEyebrow": "PROFESSIONAL CLEANING CAPE TOWN",
      "heroAccent": "Residential, commercial & deep cleans",
      "tagline": "Clean you can actually <em>feel</em>",
      "heroSubtitle": "Reliable, thorough professional cleaning for homes, offices, and commercial spaces \u2014 done properly every single visit.",
      "ctaPrimary": "Get a Quote",
      "ctaSecondary": "Our Services",
      "ctaNote": "Insured staff \u00b7 Eco-friendly products available \u00b7 Recurring discounts",
      "badge": "NCCA Registered Cleaning Company",
      "servicesHeading": "Cleaning Services Tailored to You",
      "services": [
          {
              "name": "Regular Home Cleaning",
              "description": "Weekly, fortnightly, or monthly home cleaning by a consistent, vetted cleaning team.",
              "tags": [
                  "Weekly Clean",
                  "Recurring"
              ],
              "icon": "home",
              "serviceImageQuery": "woman dusting shelves living room bright home cleaning gloves uniform"
          },
          {
              "name": "Office & Commercial Cleaning",
              "description": "Daily or weekly office cleaning with supply of consumables and after-hours scheduling.",
              "tags": [
                  "Office Clean",
                  "Commercial"
              ],
              "icon": "briefcase",
              "serviceImageQuery": "cleaner vacuuming office floor after hours desks chairs commercial cleaning"
          },
          {
              "name": "Deep Cleans & Move-Out",
              "description": "Full deep cleans for move-in, move-out, post-renovation, or once-off intensive cleaning.",
              "tags": [
                  "Deep Clean",
                  "Move-Out"
              ],
              "icon": "zap",
              "serviceImageQuery": "woman scrubbing kitchen oven on knees deep cleaning gloves spray bottle"
          },
          {
              "name": "Carpet & Upholstery Cleaning",
              "description": "Professional steam cleaning of carpets, rugs, and upholstered furniture using truck-mounted extraction equipment.",
              "tags": [
                  "Carpet Clean",
                  "Steam Extraction"
              ],
              "icon": "wind",
              "serviceImageQuery": "man using carpet cleaning machine on floor residential home professional"
          }
      ],
      "galleryHeading": "Spotlessly Done",
      "aboutHeading": "Cleaning that <em>shows</em>",
      "aboutText": "We've been cleaning Cape Town homes and offices since 2010. Our staff are vetted, trained, and insured. We use professional-grade products and checklists that ensure nothing is missed \u2014 ever.\n\nYou'll have a consistent team who know your space. That's not standard in this industry. For us, it's non-negotiable.",
      "aboutMission": "We believe a properly clean space changes how people feel, focus, and live in it.",
      "stats": [
          {
              "value": "14+",
              "label": "Years Cleaning",
              "sublabel": "since 2010"
          },
          {
              "value": "500+",
              "label": "Regular Clients",
              "sublabel": "residential & commercial"
          },
          {
              "value": "35",
              "label": "Vetted Cleaning Staff",
              "sublabel": "all insured & trained"
          },
          {
              "value": "4.8\u2605",
              "label": "Google Rating",
              "sublabel": "from 600+ reviews"
          }
      ],
      "contactHeading": "Want a quote for your clean?",
      "contactHours": "Mon\u2013Fri: 07:00\u201317:30 \u00b7 Sat: 08:00\u201314:00 \u00b7 After-hours cleans by arrangement",
      "processSteps": [
          {
              "step": "1",
              "title": "Quote & Schedule",
              "description": "We quote based on property size and frequency \u2014 you choose the schedule that suits."
          },
          {
              "step": "2",
              "title": "Meet the Team",
              "description": "Your dedicated cleaning team visits for an orientation before the first clean."
          },
          {
              "step": "3",
              "title": "Clean & Confirm",
              "description": "Every clean completed to checklist with a WhatsApp confirmation and quality feedback."
          }
      ],
      "testimonial": {
          "quote": "Same team every week for 2 years. They know my house better than I do.",
          "author": "Juanita F., Verified Client",
          "rating": 5
      },
      "imageMood": "fresh, bright, spotless",
      "heroImageQuery": "woman in uniform cleaning kitchen counter spray bottle smiling bright modern home",
      "heroBgImageQuery": "cleaning team walking into house carrying supplies buckets mops professional uniform",
      "ogImageQuery": "professional cleaner woman wiping table with cloth bright modern living room",
      "aboutImageQuery": "two cleaners in uniform wiping kitchen surfaces teamwork bright home interior",
      "galleryImageQueries": [
          "woman mopping hardwood floor living room bright sunlight cleaning uniform",
          "man scrubbing bathroom tiles on knees gloves sponge deep clean",
          "cleaning team carrying supplies walking into office building professional",
          "woman vacuuming carpet living room bright modern home cleaner"
      ],
      "features": [
        { "name": "Same Team Every Visit", "description": "You get the same vetted, trained cleaners every time. They learn your home, your preferences, and your standards.", "imageQuery": "professional cleaning team arriving at home trusted reliable" },
        { "name": "Eco-Friendly Products", "description": "We use non-toxic, biodegradable cleaning products that are safe for children, pets, and the environment \u2014 without compromising on clean.", "imageQuery": "eco-friendly green cleaning products natural spray bottles" },
        { "name": "100% Satisfaction Guarantee", "description": "If you're not happy with any part of the clean, we come back and redo it within 24 hours at no extra charge.", "imageQuery": "sparkling clean modern home interior bright satisfied customer" }
      ]
  },
  "Landscaper / Gardener": {
      "heroEyebrow": "LANDSCAPING CAPE TOWN",
      "heroAccent": "Design, installation & maintenance",
      "tagline": "Outdoor spaces that stop people in their <em>tracks</em>",
      "heroSubtitle": "Professional garden design, landscaping installation, and ongoing maintenance for residential and commercial properties.",
      "ctaPrimary": "Get a Quote",
      "ctaSecondary": "Our Work",
      "ctaNote": "Free design consultation \u00b7 Water-wise specialists \u00b7 Monthly maintenance plans",
      "badge": "Landscaping SA Association Member",
      "servicesHeading": "What We Create",
      "services": [
          {
              "name": "Garden Design & Installation",
              "description": "Full garden design from concept to planting \u2014 indigenous-focused and water-wise where appropriate.",
              "tags": [
                  "Garden Design",
                  "Indigenous"
              ],
              "icon": "feather",
              "serviceImageQuery": "beautiful landscaped garden plants pathways flowers"
          },
          {
              "name": "Hard Landscaping",
              "description": "Retaining walls, paving, decking, water features, and structural landscaping elements installed professionally.",
              "tags": [
                  "Hard Landscaping",
                  "Decking"
              ],
              "icon": "layers",
              "serviceImageQuery": "stone retaining wall garden timber deck outdoor"
          },
          {
              "name": "Ongoing Garden Maintenance",
              "description": "Regular garden maintenance by a skilled team \u2014 pruning, mulching, irrigation, and seasonal care.",
              "tags": [
                  "Maintenance",
                  "Irrigation"
              ],
              "icon": "scissors",
              "serviceImageQuery": "manicured lawn garden hedge trimmed neat green"
          },
          {
              "name": "Irrigation System Installation",
              "description": "Automated drip and spray irrigation systems designed to keep your garden thriving while minimising water usage.",
              "tags": [
                  "Automated Irrigation",
                  "Water-Wise"
              ],
              "icon": "cloud-rain",
              "serviceImageQuery": "automated garden irrigation sprinkler system installed"
          }
      ],
      "galleryHeading": "Gardens We've Created",
      "aboutHeading": "Gardens designed to <em>thrive</em>",
      "aboutText": "We believe a garden should work with its environment \u2014 the Western Cape climate, the soil, and the aspect of the property. We specialise in water-wise designs that reduce your water bill without sacrificing beauty.\n\nOur team includes a qualified landscape architect. Every design is site-specific, not template-based.",
      "aboutMission": "We believe a well-designed garden is one of the most enduring contributions we can make to a property.",
      "stats": [
          {
              "value": "16+",
              "label": "Years Landscaping",
              "sublabel": "since 2008"
          },
          {
              "value": "600+",
              "label": "Gardens Created",
              "sublabel": "Cape Town & surrounds"
          },
          {
              "value": "70%",
              "label": "Indigenous Plant Use",
              "sublabel": "across all designs"
          },
          {
              "value": "4.9\u2605",
              "label": "Google Rating",
              "sublabel": "from 450+ reviews"
          }
      ],
      "contactHeading": "Ready to transform your garden?",
      "contactHours": "Mon\u2013Fri: 07:30\u201317:00 \u00b7 Sat: 08:00\u201313:00 \u00b7 Site visits by appointment",
      "processSteps": [
          {
              "step": "1",
              "title": "Free Design Consultation",
              "description": "We visit the site, listen to your vision, and assess the space and conditions."
          },
          {
              "step": "2",
              "title": "Design & Quote",
              "description": "Concept design, planting plan, and fixed installation quote provided within a week."
          },
          {
              "step": "3",
              "title": "Install & Maintain",
              "description": "Professional installation followed by optional ongoing maintenance programme."
          }
      ],
      "testimonial": {
          "quote": "Transformed a barren slope into the most beautiful fynbos garden. Incredible work.",
          "author": "Sandra R., Verified Client",
          "rating": 5
      },
      "imageMood": "lush, natural, crafted",
      "heroImageQuery": "beautiful landscaped residential garden with outdoor seating colourful flower beds pathways lush green",
      "heroBgImageQuery": "lush green garden foliage plants dark background landscaping",
      "ogImageQuery": "stunning landscaped garden design stone pathways colourful flower beds shrubs",
      "aboutImageQuery": "professional gardener planting flowers in garden bed kneeling soil trowel landscaping",
      "galleryImageQueries": [
          "landscaped garden curved stone pathway bordered by colourful flower beds shrubs",
          "timber deck outdoor dining table chairs overlooking landscaped garden",
          "indigenous water-wise garden rockery succulents gravel mulch drought resistant",
          "garden water feature stone pond with plants ferns surrounding stones"
      ],
      "features": [
        { "name": "Water-Wise Design Expertise", "description": "We specialise in indigenous and drought-resistant planting that thrives in the Cape climate without wasting water.", "imageQuery": "water-wise indigenous garden design drought resistant plants" },
        { "name": "Design-to-Maintenance Continuity", "description": "The same team that designs your garden maintains it. Nobody knows your landscape better than the people who built it.", "imageQuery": "landscaper maintaining beautiful garden ongoing care professional" },
        { "name": "3D Design Visuals Before We Plant", "description": "See your garden before a single plant goes in the ground. We provide 3D renders so you can approve the design with confidence.", "imageQuery": "landscape design render 3D garden plan modern visual" }
      ]
  },
  "Pest Control": {
      "heroEyebrow": "PEST CONTROL CAPE TOWN",
      "heroAccent": "SAPCA registered. Child & pet safe.",
      "tagline": "Pests eliminated. Peace of mind <em>restored</em>.",
      "heroSubtitle": "Professional pest control for homes and businesses \u2014 guaranteed treatments for cockroaches, rodents, termites, and more.",
      "ctaPrimary": "Book a Treatment",
      "ctaSecondary": "What We Treat",
      "ctaNote": "Same-week bookings \u00b7 Child & pet safe products \u00b7 3-month guarantee",
      "badge": "SAPCA Registered Pest Control Operator",
      "servicesHeading": "What We Treat",
      "services": [
          {
              "name": "General Pest Treatments",
              "description": "Cockroaches, ants, silverfish, and flying insects treated with targeted, low-toxicity products.",
              "tags": [
                  "Cockroaches",
                  "Ants"
              ],
              "icon": "alert-triangle",
              "serviceImageQuery": "pest control spray nozzle treating baseboard interior"
          },
          {
              "name": "Rodent Control",
              "description": "Rats and mice eliminated using tamper-resistant bait stations and professional exclusion techniques.",
              "tags": [
                  "Rodents",
                  "Bait Stations"
              ],
              "icon": "shield",
              "serviceImageQuery": "rodent bait station placed along wall pest"
          },
          {
              "name": "Termite & Wood Borer",
              "description": "Chemical and non-chemical termite treatments with post-treatment guarantees and monitoring.",
              "tags": [
                  "Termites",
                  "Wood Borer"
              ],
              "icon": "home",
              "serviceImageQuery": "termite damage wood treatment close up inspection"
          },
          {
              "name": "Bird & Wildlife Management",
              "description": "Pigeon proofing, bird spikes, netting installations, and humane wildlife deterrents for roofs and buildings.",
              "tags": [
                  "Bird Proofing",
                  "Pigeon Spikes"
              ],
              "icon": "feather",
              "serviceImageQuery": "bird spike pigeon proofing installed building ledge"
          }
      ],
      "galleryHeading": "Treated & Cleared",
      "aboutHeading": "Pest control that <em>actually</em> works",
      "aboutText": "We've been treating Cape Town properties since 2009. The most important thing about pest control is not just killing the pests \u2014 it's understanding the infestation, treating the root cause, and preventing reinfestation.\n\nAll our products are SAPCA approved. Our technicians are certified, uniformed, and carry verifiable credentials.",
      "aboutMission": "We believe no family should share their home with pests \u2014 and eliminating them should never require toxic compromise.",
      "stats": [
          {
              "value": "15+",
              "label": "Years Treating",
              "sublabel": "since 2009"
          },
          {
              "value": "10,000+",
              "label": "Properties Treated",
              "sublabel": "residential & commercial"
          },
          {
              "value": "3mo",
              "label": "Treatment Guarantee",
              "sublabel": "on all general treatments"
          },
          {
              "value": "4.8\u2605",
              "label": "Google Rating",
              "sublabel": "from 700+ reviews"
          }
      ],
      "contactHeading": "Got a pest problem that needs sorting?",
      "contactHours": "Mon\u2013Fri: 07:30\u201317:30 \u00b7 Sat: 08:00\u201313:00 \u00b7 Urgent callouts available",
      "processSteps": [
          {
              "step": "1",
              "title": "Book & Brief",
              "description": "Tell us the pest and we'll confirm the right treatment and schedule a visit."
          },
          {
              "step": "2",
              "title": "Inspect & Treat",
              "description": "Certified technician inspects, confirms infestation, and applies targeted treatment."
          },
          {
              "step": "3",
              "title": "Follow-Up & Guarantee",
              "description": "Follow-up check within 2 weeks and 3-month guarantee on most treatments."
          }
      ],
      "testimonial": {
          "quote": "Cockroach-free for 8 months after one treatment. They actually fixed the problem.",
          "author": "Amanda H., Verified Client",
          "rating": 5
      },
      "imageMood": "clean, professional, trustworthy",
      "heroImageQuery": "pest control technician in uniform spraying treatment along baseboard in clean kitchen",
      "heroBgImageQuery": "pest control spray equipment pump nozzle protective gear dark background",
      "ogImageQuery": "pest control technician treating residential home interior spray nozzle baseboard",
      "aboutImageQuery": "pest control technician in uniform and gloves spraying treatment along wall skirting residential",
      "galleryImageQueries": [
          "pest control technician spraying insecticide treatment along baseboard wall interior residential",
          "rodent tamper-resistant bait station placed along garden perimeter wall fence",
          "termite damage inspection close up damaged wooden beam structural timber",
          "pest control fumigation tent covering residential house structure treatment outdoor"
      ],
      "features": [
        { "name": "Child & Pet-Safe Treatments", "description": "All our products are approved for use in homes with children and animals. Effective on pests, safe for your family.", "imageQuery": "family home safe pest control treatment child pet friendly" },
        { "name": "Guaranteed Knock-Down", "description": "If the pests come back within the guarantee period, so do we \u2014 at no extra cost. We don't leave until the problem is solved.", "imageQuery": "pest control technician inspecting home thorough professional" },
        { "name": "Discreet, Unmarked Vehicles", "description": "We arrive in plain vehicles so your neighbours don't need to know. Professional service without the stigma.", "imageQuery": "professional unmarked service vehicle arriving residential home" }
      ]
  },
  "Security Company": {
      "heroEyebrow": "SECURITY SERVICES CAPE TOWN",
      "heroAccent": "PSIRA registered. Armed response available.",
      "tagline": "Security that actually <em>responds</em>",
      "heroSubtitle": "Professional security solutions including armed response, guarding, access control, and CCTV for residential and commercial clients.",
      "ctaPrimary": "Get a Security Quote",
      "ctaSecondary": "Our Services",
      "ctaNote": "24hr response \u00b7 PSIRA registered \u00b7 No lock-in on response contracts",
      "badge": "PSIRA Grade A Registered Security Company",
      "servicesHeading": "How We Protect",
      "services": [
          {
              "name": "Armed Response",
              "description": "24-hour armed response to alarms and panic button activations with sub-5-minute response targets.",
              "tags": [
                  "Armed Response",
                  "24/7"
              ],
              "icon": "shield",
              "serviceImageQuery": "security response vehicle patrol car residential street"
          },
          {
              "name": "CCTV & Alarm Systems",
              "description": "Supply, installation, and monitoring of CCTV cameras, alarm systems, and smart home security.",
              "tags": [
                  "CCTV",
                  "Alarm Monitoring"
              ],
              "icon": "video",
              "serviceImageQuery": "CCTV security camera mounted wall surveillance"
          },
          {
              "name": "Guarding & Access Control",
              "description": "On-site security officers, gate guards, and access management for estates and commercial sites.",
              "tags": [
                  "Guarding",
                  "Access Control"
              ],
              "icon": "user-check",
              "serviceImageQuery": "security boom gate entrance estate access control"
          },
          {
              "name": "Electric Fencing & Perimeter Detection",
              "description": "Certified electric fence installations, perimeter beams, and vibration sensors for comprehensive boundary protection.",
              "tags": [
                  "Electric Fence",
                  "Perimeter Beams"
              ],
              "icon": "zap",
              "serviceImageQuery": "electric fence perimeter beam sensor installed wall"
          }
      ],
      "galleryHeading": "Securing Cape Town",
      "aboutHeading": "Security built on <em>response</em>",
      "aboutText": "A security company is only as good as its response time and its officers' conduct. We are PSIRA Grade A registered, our vehicles are tracked, and our officers are trained beyond the PSIRA minimum standard.\n\nWe operate transparently \u2014 our clients always know who is responding to their alarm and when.",
      "aboutMission": "We believe security should be a confidence, not an anxiety \u2014 and that comes from knowing your response team is genuinely prepared.",
      "stats": [
          {
              "value": "13+",
              "label": "Years in Security",
              "sublabel": "since 2011"
          },
          {
              "value": "1,500+",
              "label": "Protected Properties",
              "sublabel": "residential & commercial"
          },
          {
              "value": "4.8min",
              "label": "Average Response Time",
              "sublabel": "Cape Town metro"
          },
          {
              "value": "4.7\u2605",
              "label": "Google Rating",
              "sublabel": "from 400+ reviews"
          }
      ],
      "contactHeading": "Want a security assessment for your property?",
      "contactHours": "Mon\u2013Sun: Response 24hrs \u00b7 Office Mon\u2013Fri 08:00\u201317:00 \u00b7 Quotes by appointment",
      "processSteps": [
          {
              "step": "1",
              "title": "Free Security Assessment",
              "description": "We assess your property's vulnerabilities and recommend the appropriate protection level."
          },
          {
              "step": "2",
              "title": "Proposal & Installation",
              "description": "Security proposal accepted, alarm and CCTV installed by certified technicians."
          },
          {
              "step": "3",
              "title": "Monitor & Respond",
              "description": "24-hour monitoring, armed response, and regular patrol coverage activated."
          }
      ],
      "testimonial": {
          "quote": "Response vehicle arrived in under 4 minutes. Officers were professional and thorough.",
          "author": "Clive D., Verified Client",
          "rating": 5
      },
      "imageMood": "professional, secure, authoritative",
      "heroImageQuery": "CCTV security camera installed on residential house wall monitoring property entrance",
      "heroBgImageQuery": "security control room CCTV monitors dark background surveillance screens",
      "ogImageQuery": "security camera alarm system installed residential building entrance",
      "aboutImageQuery": "uniformed security guard patrolling residential estate at night with flashlight",
      "galleryImageQueries": [
          "armed response security vehicle patrolling residential suburb night lights",
          "CCTV dome camera mounted on building exterior wall close up",
          "estate boom gate access control guardhouse entrance barrier",
          "security monitoring control room operator watching CCTV screens"
      ],
      "features": [
        { "name": "Armed Response Under 4 Minutes", "description": "Our average response time is under 4 minutes in our coverage area. When seconds count, we're already on our way.", "imageQuery": "armed response vehicle security patrol neighbourhood fast" },
        { "name": "24/7 Control Room Monitoring", "description": "Your alarm is monitored around the clock by trained operators who verify every signal and dispatch immediately when needed.", "imageQuery": "security control room monitors CCTV alarm monitoring centre" },
        { "name": "Smart Home Integration", "description": "Our systems integrate with your smartphone so you can arm, disarm, and view cameras from anywhere in the world.", "imageQuery": "smartphone security app home monitoring camera smart system" }
      ]
  },
  "Moving / Removals": {
      "heroEyebrow": "PROFESSIONAL REMOVALS CAPE TOWN",
      "heroAccent": "Local, long-distance & storage",
      "tagline": "Your move, handled with <em>care</em>",
      "heroSubtitle": "Professional household and commercial removals across Cape Town and South Africa \u2014 packed, moved, and delivered safely.",
      "ctaPrimary": "Get a Removal Quote",
      "ctaSecondary": "How It Works",
      "ctaNote": "Free in-home quote \u00b7 Fully insured \u00b7 Packing service available",
      "badge": "SAFFRON Registered Removals Company",
      "servicesHeading": "How We Move",
      "services": [
          {
              "name": "Residential Removals",
              "description": "Full household removals with professional packing, padded blankets, and careful handling.",
              "tags": [
                  "Household",
                  "Full Pack"
              ],
              "icon": "home",
              "serviceImageQuery": "moving boxes stacked living room packed household"
          },
          {
              "name": "Office & Commercial Removals",
              "description": "Office relocations managed over a weekend with minimal disruption and full IT equipment care.",
              "tags": [
                  "Office Move",
                  "IT Care"
              ],
              "icon": "briefcase",
              "serviceImageQuery": "office desks chairs stacked boxes relocation moving"
          },
          {
              "name": "Storage & Packaging",
              "description": "Short and long-term storage solutions and professional packing materials for fragile goods.",
              "tags": [
                  "Storage",
                  "Packing"
              ],
              "icon": "package",
              "serviceImageQuery": "storage unit warehouse boxes shelves organized"
          },
          {
              "name": "Furniture Assembly & Disassembly",
              "description": "Professional disassembly of beds, desks, and wall units before the move, and full reassembly at your new address.",
              "tags": [
                  "Disassembly",
                  "Reassembly"
              ],
              "icon": "tool",
              "serviceImageQuery": "furniture disassembled bed frame parts ready moving"
          }
      ],
      "galleryHeading": "Moves We've Made",
      "aboutHeading": "Removals done <em>reliably</em>",
      "aboutText": "Moving is one of the most stressful events in a person's life. We know that \u2014 and we've spent 17 years making it as smooth as possible. Our crews are experienced, respectful, and trained to handle everything from a grand piano to a collection of framed artwork.\n\nWe are fully insured and offer in-transit cover on all goods.",
      "aboutMission": "We believe a great removals team makes the difference between a stressful move and an exciting new beginning.",
      "stats": [
          {
              "value": "17+",
              "label": "Years Moving",
              "sublabel": "since 2007"
          },
          {
              "value": "5,000+",
              "label": "Moves Completed",
              "sublabel": "local & long-distance"
          },
          {
              "value": "12",
              "label": "Removal Vehicles",
              "sublabel": "from 4-ton to 10-ton"
          },
          {
              "value": "4.8\u2605",
              "label": "Google Rating",
              "sublabel": "from 500+ reviews"
          }
      ],
      "contactHeading": "Planning a move? Let's quote.",
      "contactHours": "Mon\u2013Fri: 07:30\u201317:30 \u00b7 Sat: 08:00\u201314:00 \u00b7 Weekend moves by arrangement",
      "processSteps": [
          {
              "step": "1",
              "title": "In-Home Quote",
              "description": "We visit, assess the volume, and provide a fixed written quote with a move date."
          },
          {
              "step": "2",
              "title": "Pack & Load",
              "description": "Professional packing of fragile items, full load managed by experienced crew."
          },
          {
              "step": "3",
              "title": "Deliver & Place",
              "description": "Everything delivered, placed in the correct room, and beds assembled on arrival."
          }
      ],
      "testimonial": {
          "quote": "They moved a 4-bedroom house without a single scratch. Unbelievably professional crew.",
          "author": "Margot K., Verified Client",
          "rating": 5
      },
      "imageMood": "professional, reliable, careful",
      "heroImageQuery": "removal truck parked outside residential house movers loading furniture on ramp",
      "heroBgImageQuery": "cardboard moving boxes stacked dark background removals packing",
      "ogImageQuery": "professional movers carrying furniture into removal truck residential street",
      "aboutImageQuery": "two movers carefully carrying sofa wrapped in blankets down stairs residential home",
      "galleryImageQueries": [
          "removal truck open back loaded with furniture blankets straps residential driveway",
          "office furniture desks chairs stacked with moving boxes corridor relocation",
          "professional packer bubble wrapping fragile items into labelled cardboard boxes",
          "storage unit open shelves organized labelled boxes furniture stored"
      ],
      "features": [
        { "name": "Nothing Broken, Guaranteed", "description": "Every item is blanket-wrapped and secured. If anything is damaged during the move, we cover the replacement cost \u2014 no arguments.", "imageQuery": "movers carefully wrapping furniture blanket protection packing" },
        { "name": "Fixed Quotes, Not Estimates", "description": "We do an in-home assessment and give you a fixed price. The number you're quoted is the number you pay, full stop.", "imageQuery": "moving company consultant assessing home inventory quote" },
        { "name": "Packing Service Available", "description": "Don't want to pack? We'll send a team the day before to box everything professionally, labelled by room and ready to go.", "imageQuery": "professional packers boxing up home belongings labelled organised" }
      ]
  },
  "Pool Service": {
      "heroEyebrow": "POOL MAINTENANCE CAPE TOWN",
      "heroAccent": "Weekly cleans, repairs & renovations",
      "tagline": "Crystal clear water, every single <em>week</em>",
      "heroSubtitle": "Professional pool maintenance, chemical balancing, and repairs to keep your pool sparkling all year round.",
      "ctaPrimary": "Get a Service Quote",
      "ctaSecondary": "Our Services",
      "ctaNote": "Weekly & fortnightly plans \u00b7 Chemical supply included \u00b7 No contracts",
      "badge": "SPASA SA Pool Association Member",
      "servicesHeading": "What We Do",
      "services": [
          {
              "name": "Regular Pool Maintenance",
              "description": "Weekly or fortnightly cleaning, vacuuming, filter backwash, and chemical balancing visits.",
              "tags": [
                  "Weekly Clean",
                  "Chemical Balance"
              ],
              "icon": "droplet",
              "serviceImageQuery": "crystal clear swimming pool blue water residential"
          },
          {
              "name": "Equipment Repairs & Upgrades",
              "description": "Pump and motor repairs, filter replacements, automatic cleaner repairs, and LED lighting upgrades.",
              "tags": [
                  "Pump Repair",
                  "Filter"
              ],
              "icon": "settings",
              "serviceImageQuery": "pool pump filter equipment room installed pipes"
          },
          {
              "name": "Pool Renovations",
              "description": "Resurfacing, coping replacement, tiling, and full pool renovation projects managed end-to-end.",
              "tags": [
                  "Resurfacing",
                  "Tiling"
              ],
              "icon": "tool",
              "serviceImageQuery": "renovated pool mosaic tiles blue water feature"
          },
          {
              "name": "Solar Pool Heating",
              "description": "Roof-mounted solar heating panels that extend your swimming season by months without increasing your electricity bill.",
              "tags": [
                  "Solar Heating",
                  "Season Extension"
              ],
              "icon": "sun",
              "serviceImageQuery": "solar pool heating panels installed roof residential"
          }
      ],
      "galleryHeading": "Pools We Maintain",
      "aboutHeading": "Pools kept <em>perfectly</em> balanced",
      "aboutText": "A neglected pool turns green in two weeks in a Cape Town summer. We've been preventing that for 13 years. Our technicians are trained in water chemistry and equipment maintenance \u2014 they test, treat, and document every visit.\n\nYou'll receive a WhatsApp report after every service with chemical readings and any equipment observations.",
      "aboutMission": "We believe your pool should be an effortless pleasure \u2014 not a weekly stress and chore.",
      "stats": [
          {
              "value": "13+",
              "label": "Years in Pools",
              "sublabel": "since 2011"
          },
          {
              "value": "400+",
              "label": "Active Pool Clients",
              "sublabel": "residential & complex"
          },
          {
              "value": "6",
              "label": "Certified Pool Technicians",
              "sublabel": "chemistry & equipment"
          },
          {
              "value": "4.9\u2605",
              "label": "Google Rating",
              "sublabel": "from 350+ reviews"
          }
      ],
      "contactHeading": "Want a quote for your pool?",
      "contactHours": "Mon\u2013Fri: 07:00\u201317:00 \u00b7 Sat: 07:00\u201313:00 \u00b7 Urgent visits available",
      "processSteps": [
          {
              "step": "1",
              "title": "Pool Assessment",
              "description": "We assess the pool condition, equipment, and chemistry to recommend the right plan."
          },
          {
              "step": "2",
              "title": "Service Plan Agreed",
              "description": "Fixed monthly rate agreed, including visit frequency and chemical supply."
          },
          {
              "step": "3",
              "title": "Service & Report",
              "description": "Regular visits, WhatsApp report after each clean, and proactive equipment alerts."
          }
      ],
      "testimonial": {
          "quote": "Pool has been perfect for 2 years. I've never had to think about it since they took over.",
          "author": "Drew M., Verified Client",
          "rating": 5
      },
      "imageMood": "fresh, clean, aquatic",
      "heroImageQuery": "sparkling crystal clear blue swimming pool residential backyard garden sunny day",
      "heroBgImageQuery": "swimming pool underwater blue water surface ripples dark background",
      "ogImageQuery": "crystal clear turquoise swimming pool residential garden patio loungers",
      "aboutImageQuery": "pool technician testing water chemistry with test kit skimmer net poolside",
      "galleryImageQueries": [
          "crystal clear blue pool water sunlight ripples residential backyard",
          "pool pump room equipment filter pipes plumbing motor installed",
          "renovated swimming pool new mosaic tiles blue surface water feature",
          "infinity edge pool overlooking garden view residential luxury"
      ],
      "features": [
        { "name": "Proactive Equipment Monitoring", "description": "We don't wait for things to break. Every visit includes a full equipment check so we catch problems before they cost you.", "imageQuery": "pool technician checking pump equipment professional maintenance" },
        { "name": "WhatsApp Reports After Every Visit", "description": "You'll get a photo report with chemical readings and notes after every clean \u2014 full transparency, no guesswork.", "imageQuery": "smartphone showing maintenance report checklist professional" },
        { "name": "Fixed Monthly Pricing", "description": "One monthly fee covers everything \u2014 visits, chemicals, and routine maintenance. No surprises on your bill.", "imageQuery": "crystal clear swimming pool backyard beautiful well maintained" }
      ]
  },
  "Laundry / Dry Cleaning": {
      "heroEyebrow": "DRY CLEANING CAPE TOWN",
      "heroAccent": "Collection & delivery \u00b7 Same-day available",
      "tagline": "Clothes returned cleaner than <em>new</em>",
      "heroSubtitle": "Professional dry cleaning, laundering, and garment care with collection and delivery across Cape Town.",
      "ctaPrimary": "Book a Collection",
      "ctaSecondary": "Our Services",
      "ctaNote": "Collection & delivery included \u00b7 Same-day option \u00b7 No item too delicate",
      "badge": "Textile Services Association Member",
      "servicesHeading": "What We Clean",
      "services": [
          {
              "name": "Dry Cleaning",
              "description": "Professional dry cleaning for suits, dresses, coats, and delicate garments with individual inspection.",
              "tags": [
                  "Dry Cleaning",
                  "Suits"
              ],
              "icon": "wind",
              "serviceImageQuery": "suits hanging plastic covers dry cleaned pressed rack"
          },
          {
              "name": "Laundry & Pressing",
              "description": "Wash, dry, and press service for shirts, linens, and bulk household laundry.",
              "tags": [
                  "Laundry",
                  "Pressing"
              ],
              "icon": "layers",
              "serviceImageQuery": "pressed white shirts folded stacked crisp clean"
          },
          {
              "name": "Alterations & Repairs",
              "description": "In-house garment alterations, zip replacements, and repairs by an experienced seamstress.",
              "tags": [
                  "Alterations",
                  "Repairs"
              ],
              "icon": "scissors",
              "serviceImageQuery": "sewing machine fabric alteration close up stitching"
          },
          {
              "name": "Specialist & Wedding Dress Care",
              "description": "Expert cleaning and preservation of wedding dresses, leather, suede, and delicate designer garments.",
              "tags": [
                  "Wedding Dress",
                  "Specialist Fabrics"
              ],
              "icon": "star",
              "serviceImageQuery": "wedding dress preservation box cleaned pressed white"
          }
      ],
      "galleryHeading": "Garments We've Revived",
      "aboutHeading": "Clothes cared for with <em>expertise</em>",
      "aboutText": "Your clothing deserves more than a high-temperature tumble. We assess every garment on arrival, treat stains individually, and apply the correct cleaning method for each fabric.\n\nWe have been caring for Cape Town wardrobes since 2008. No garment comes back damaged. That's a record we protect carefully.",
      "aboutMission": "We believe your favourite garments should last for years \u2014 and proper cleaning is what makes that possible.",
      "stats": [
          {
              "value": "16+",
              "label": "Years in Garment Care",
              "sublabel": "since 2008"
          },
          {
              "value": "500+",
              "label": "Garments Per Week",
              "sublabel": "processed with care"
          },
          {
              "value": "0",
              "label": "Damaged Garments",
              "sublabel": "in 3 years of records"
          },
          {
              "value": "4.8\u2605",
              "label": "Google Rating",
              "sublabel": "from 300+ reviews"
          }
      ],
      "contactHeading": "Ready to book a collection?",
      "contactHours": "Mon\u2013Fri: 07:30\u201318:00 \u00b7 Sat: 08:00\u201314:00 \u00b7 Same-day service by 09:00 booking",
      "processSteps": [
          {
              "step": "1",
              "title": "Book a Collection",
              "description": "Book online or WhatsApp \u2014 we collect from home or office at a time that suits."
          },
          {
              "step": "2",
              "title": "Assess & Clean",
              "description": "Garments assessed, stains treated, and cleaned using the correct method for each fabric."
          },
          {
              "step": "3",
              "title": "Press & Deliver",
              "description": "Pressed, wrapped, and delivered back to your door within 48 hours."
          }
      ],
      "testimonial": {
          "quote": "Removed a red wine stain I thought was permanent. And the suit looks brand new.",
          "author": "Richard J., Verified Client",
          "rating": 5
      },
      "imageMood": "clean, fresh, professional",
      "heroImageQuery": "row of pressed suits and shirts hanging on rack in dry cleaner shop plastic covers",
      "heroBgImageQuery": "clothes hangers garments suits on rail dark background dry cleaning",
      "ogImageQuery": "freshly pressed white shirts suits hanging on rack ready for collection dry cleaner",
      "aboutImageQuery": "dry cleaner staff pressing shirt with professional steam iron garment care working",
      "galleryImageQueries": [
          "suits jackets wrapped in plastic covers on rack dry cleaned pressed ready",
          "folded pressed white shirts neatly stacked laundry service crisp clean",
          "seamstress at sewing machine doing garment alteration fabric close up stitching",
          "laundry delivery service garment bags hanging clean clothes van"
      ],
      "features": [
        { "name": "Free Collection & Delivery", "description": "We pick up your laundry and deliver it back to your door, cleaned and pressed. You don't need to leave the house.", "imageQuery": "laundry delivery service driver handing over clean clothes" },
        { "name": "Garment Care Specialists", "description": "From wedding dresses to suede jackets, we know how to handle delicate fabrics that other cleaners won't touch.", "imageQuery": "delicate garment dry cleaning specialist handling dress" },
        { "name": "24-Hour Turnaround", "description": "Drop off in the morning, collect the next day. Need it faster? Same-day express is available for an extra fee.", "imageQuery": "clean pressed shirts hanging laundry rack professional service" }
      ]
  },
  "Appliance Repair": {
      "heroEyebrow": "APPLIANCE REPAIRS CAPE TOWN",
      "heroAccent": "All major brands. Same-day callouts.",
      "tagline": "Repaired today. Running like <em>new</em>.",
      "heroSubtitle": "Professional repair of washing machines, fridges, dishwashers, dryers, and ovens by qualified technicians.",
      "ctaPrimary": "Book a Repair",
      "ctaSecondary": "Appliances We Fix",
      "ctaNote": "Same-day bookings \u00b7 Upfront pricing \u00b7 6-month parts guarantee",
      "badge": "DEASA Registered Appliance Service Agent",
      "servicesHeading": "What We Fix",
      "services": [
          {
              "name": "Washing Machines & Dryers",
              "description": "All makes and models \u2014 drum bearings, door seals, control boards, pumps, and heating elements.",
              "tags": [
                  "Washing Machine",
                  "Dryer"
              ],
              "icon": "wind",
              "serviceImageQuery": "washing machine open drum interior repair parts"
          },
          {
              "name": "Fridges & Freezers",
              "description": "Compressor, thermostat, ice maker, and gas recharge repairs for all major fridge brands.",
              "tags": [
                  "Fridge Repair",
                  "Freezer"
              ],
              "icon": "thermometer",
              "serviceImageQuery": "refrigerator compressor back panel repair components"
          },
          {
              "name": "Dishwashers & Ovens",
              "description": "Dishwasher pump, spray arm, and control board repairs plus oven element and thermostat work.",
              "tags": [
                  "Dishwasher",
                  "Oven"
              ],
              "icon": "tool",
              "serviceImageQuery": "oven heating element replacement repair interior"
          },
          {
              "name": "Stove, Hob & Extractor Repairs",
              "description": "Gas hob ignition, ceramic hob element, extractor fan motor, and stove thermostat repairs for all brands.",
              "tags": [
                  "Stove Repair",
                  "Extractor Fan"
              ],
              "icon": "cpu",
              "serviceImageQuery": "gas hob ceramic stove top repaired clean kitchen"
          }
      ],
      "galleryHeading": "Fixed & Running",
      "aboutHeading": "Repairs done <em>right</em> first time",
      "aboutText": "Before you replace an appliance, let us look at it. In most cases, the repair costs a fraction of replacement \u2014 and the repaired appliance runs for years more.\n\nOur technicians carry extensive stock of common parts, which means most repairs are completed on the first visit.",
      "aboutMission": "We believe repairing appliances is better for your pocket and better for the planet \u2014 and we make it as easy as possible.",
      "stats": [
          {
              "value": "14+",
              "label": "Years Repairing",
              "sublabel": "since 2010"
          },
          {
              "value": "15,000+",
              "label": "Appliances Repaired",
              "sublabel": "all major brands"
          },
          {
              "value": "85%",
              "label": "First-Visit Fix Rate",
              "sublabel": "parts carried on vehicle"
          },
          {
              "value": "4.8\u2605",
              "label": "Google Rating",
              "sublabel": "from 700+ reviews"
          }
      ],
      "contactHeading": "Appliance broken? Book a repair today.",
      "contactHours": "Mon\u2013Fri: 07:30\u201317:30 \u00b7 Sat: 08:00\u201313:00 \u00b7 Same-day callouts available",
      "processSteps": [
          {
              "step": "1",
              "title": "Book & Describe",
              "description": "Tell us the appliance, brand, and fault \u2014 we confirm availability and upfront callout fee."
          },
          {
              "step": "2",
              "title": "Diagnose & Quote",
              "description": "Technician diagnoses the fault and provides a fixed repair quote before starting."
          },
          {
              "step": "3",
              "title": "Repair & Guarantee",
              "description": "Repair completed, tested, and covered by a 6-month parts guarantee."
          }
      ],
      "testimonial": {
          "quote": "Fixed our Bosch washing machine in 45 minutes. Saved us from buying a new one.",
          "author": "Lesley B., Verified Client",
          "rating": 5
      },
      "imageMood": "practical, reliable, professional",
      "heroImageQuery": "appliance repair technician fixing washing machine in residential kitchen tools parts",
      "heroBgImageQuery": "open washing machine drum repair parts tools dark background",
      "ogImageQuery": "technician repairing kitchen appliance fridge washing machine home",
      "aboutImageQuery": "appliance repair technician diagnosing fridge compressor with multimeter in kitchen",
      "galleryImageQueries": [
          "washing machine repair technician replacing drum bearing parts residential laundry",
          "refrigerator compressor repair technician back panel open residential kitchen",
          "dishwasher repair open door spray arm pump tools technician",
          "oven element replacement technician tools open door kitchen repair"
      ],
      "features": [
        { "name": "Most Repairs Done in One Visit", "description": "Our vans carry the most common parts for all major brands. Most repairs are completed on the spot \u2014 no waiting for parts to arrive.", "imageQuery": "appliance repair technician fixing washing machine parts van" },
        { "name": "All Major Brands Covered", "description": "Samsung, LG, Bosch, Whirlpool, Defy, Hisense \u2014 if it's in your kitchen or laundry, we can fix it.", "imageQuery": "kitchen appliances modern home oven fridge washing machine" },
        { "name": "Honest Repair-or-Replace Advice", "description": "If a repair costs more than the appliance is worth, we'll tell you. We'd rather earn your trust than charge you for a bad fix.", "imageQuery": "technician explaining repair options to customer honest advice" }
      ]
  },
  "Handyman": {
      "heroEyebrow": "HANDYMAN SERVICES CAPE TOWN",
      "heroAccent": "One call. Every small job sorted.",
      "tagline": "The list of fixes you've been <em>postponing</em>",
      "heroSubtitle": "Reliable, skilled handyman services for all the small jobs around your home that need a capable pair of hands.",
      "ctaPrimary": "Book a Handyman",
      "ctaSecondary": "What We Fix",
      "ctaNote": "Hourly or half-day rates \u00b7 No job too small \u00b7 Fully vetted team",
      "badge": "Fully Insured & CIDB Registered",
      "servicesHeading": "What We Tackle",
      "services": [
          {
              "name": "Plumbing & Electrical Fixes",
              "description": "Dripping taps, loose outlets, broken light fittings, and running toilets fixed on the same visit.",
              "tags": [
                  "Plumbing Fixes",
                  "Electrical"
              ],
              "icon": "tool",
              "serviceImageQuery": "tap faucet repair wrench plumbing under sink"
          },
          {
              "name": "Carpentry & Assembly",
              "description": "Flat-pack assembly, shelf installation, door adjustments, and minor joinery repairs.",
              "tags": [
                  "Flat-Pack",
                  "Shelving"
              ],
              "icon": "box",
              "serviceImageQuery": "wall shelf mounted brackets books display installed"
          },
          {
              "name": "Painting & Patching",
              "description": "Touch-up painting, crack filling, grout repairs, and general aesthetic maintenance.",
              "tags": [
                  "Touch-Up Paint",
                  "Crack Fill"
              ],
              "icon": "edit",
              "serviceImageQuery": "wall crack filled sanded painted smooth finish"
          },
          {
              "name": "TV Mounting & Smart Home Setup",
              "description": "Wall-mounted TV installations, cable concealment, Wi-Fi mesh setup, and smart doorbell fitting.",
              "tags": [
                  "TV Mounting",
                  "Smart Home"
              ],
              "icon": "monitor",
              "serviceImageQuery": "wall mounted TV flat screen cables concealed living room"
          }
      ],
      "galleryHeading": "Jobs Done",
      "aboutHeading": "Small jobs, done <em>properly</em>",
      "aboutText": "The problem with most handymen is reliability. We show up when we say we will, do exactly what was agreed, and leave the property clean. That's a low bar, but in this industry it's apparently remarkable.\n\nOur handymen are vetted, insured, and carry a comprehensive toolkit. We charge honestly and transparently.",
      "aboutMission": "We believe every home has a growing list of small repairs \u2014 and knocking them off should be satisfying, not stressful.",
      "stats": [
          {
              "value": "10+",
              "label": "Years in Service",
              "sublabel": "since 2014"
          },
          {
              "value": "8,000+",
              "label": "Jobs Completed",
              "sublabel": "residential & commercial"
          },
          {
              "value": "8",
              "label": "Vetted Handymen",
              "sublabel": "all insured & background checked"
          },
          {
              "value": "4.9\u2605",
              "label": "Google Rating",
              "sublabel": "from 800+ reviews"
          }
      ],
      "contactHeading": "Have a list of jobs that need doing?",
      "contactHours": "Mon\u2013Fri: 07:00\u201318:00 \u00b7 Sat: 07:30\u201314:00 \u00b7 Same-week bookings available",
      "processSteps": [
          {
              "step": "1",
              "title": "Send Us Your List",
              "description": "Tell us all the jobs \u2014 we assess time needed and provide a transparent quote."
          },
          {
              "step": "2",
              "title": "Book & Confirm",
              "description": "Date confirmed, correct tools and materials arranged before the visit."
          },
          {
              "step": "3",
              "title": "All Done",
              "description": "Every job on the list completed, site left tidy, and sign-off from you."
          }
      ],
      "testimonial": {
          "quote": "Cleared a list of 9 jobs in one morning. Every single one done properly. Brilliant.",
          "author": "Tracy N., Verified Client",
          "rating": 5
      },
      "imageMood": "practical, reliable, friendly",
      "heroImageQuery": "handyman using power drill mounting shelf bracket on white wall residential home",
      "heroBgImageQuery": "handyman tool belt hammer drill screwdriver dark workshop background",
      "ogImageQuery": "handyman installing floating shelves screwdriver level measuring tape residential",
      "aboutImageQuery": "handyman kneeling repairing kitchen cabinet hinge screwdriver toolbox residential",
      "galleryImageQueries": [
          "handyman replacing kitchen tap faucet wrench under sink plumbing repair",
          "wall mounted floating shelves level drill brackets installed living room",
          "handyman patching drywall crack filler spackle knife smooth wall repair",
          "flat pack furniture assembled by handyman Allen key instructions bedroom"
      ],
      "features": [
        { "name": "One Call Covers Everything", "description": "Leaky tap, broken shelf, squeaky door \u2014 bring us your whole list and we'll knock it out in one visit. No job too small.", "imageQuery": "handyman fixing shelf tools belt residential home repair" },
        { "name": "Hourly Rate, No Call-Out Fee", "description": "You pay for the time we work, not for showing up. Transparent hourly billing with no minimum charge.", "imageQuery": "handyman working on home repairs tools professional affordable" },
        { "name": "Trusted & Background-Checked", "description": "Every handyman on our team is vetted, referenced, and insured. We work in your home \u2014 trust is non-negotiable.", "imageQuery": "trusted professional handyman ID badge verified background check" }
      ]
  },
  "Upholstery / Curtains": {
      "heroEyebrow": "UPHOLSTERY & SOFT FURNISHINGS",
      "heroAccent": "Reupholstery, curtains & blinds",
      "tagline": "Furniture reborn. Rooms <em>transformed</em>.",
      "heroSubtitle": "Professional reupholstery, custom curtains, and blinds that transform tired interiors into spaces you love again.",
      "ctaPrimary": "Book a Home Visit",
      "ctaSecondary": "Our Services",
      "ctaNote": "Free fabric consultation \u00b7 Home visits available \u00b7 2-year workmanship guarantee",
      "badge": "SA Furnishing Trades Council Member",
      "servicesHeading": "What We Make",
      "services": [
          {
              "name": "Furniture Reupholstery",
              "description": "Full reupholstery of sofas, dining chairs, headboards, and ottomans in your chosen fabric.",
              "tags": [
                  "Reupholstery",
                  "Sofas"
              ],
              "icon": "home",
              "serviceImageQuery": "reupholstered sofa velvet fabric finished living room"
          },
          {
              "name": "Custom Curtains & Drapes",
              "description": "Made-to-measure curtains, eyelet drapes, and lining in any fabric with professional installation.",
              "tags": [
                  "Custom Curtains",
                  "Made-to-Measure"
              ],
              "icon": "layers",
              "serviceImageQuery": "custom curtains drapes hanging in living room window"
          },
          {
              "name": "Blinds & Roman Blinds",
              "description": "Roller, venetian, Roman, and blackout blinds measured, made, and fitted professionally.",
              "tags": [
                  "Roller Blinds",
                  "Roman Blinds"
              ],
              "icon": "align-left",
              "serviceImageQuery": "roller blinds roman blinds installed window living room"
          },
          {
              "name": "Scatter Cushions & Soft Accessories",
              "description": "Custom scatter cushions, bolsters, window seats, and padded headboards made in your chosen fabric.",
              "tags": [
                  "Scatter Cushions",
                  "Headboards"
              ],
              "icon": "heart",
              "serviceImageQuery": "custom scatter cushions velvet sofa styled living room"
          }
      ],
      "galleryHeading": "Before & After",
      "aboutHeading": "Fabric transformed with <em>skill</em>",
      "aboutText": "Reupholstering a much-loved sofa is often better than replacing it \u2014 better for the environment, better for your wallet, and better for the piece itself if the frame is quality.\n\nOur workroom is in Cape Town. Every curtain is made on the premises. Every upholstery job is done by hand by an experienced upholsterer.",
      "aboutMission": "We believe great soft furnishings are the detail that makes a room feel finished \u2014 and they deserve to be made properly.",
      "stats": [
          {
              "value": "17+",
              "label": "Years in Trade",
              "sublabel": "since 2007"
          },
          {
              "value": "2,000+",
              "label": "Pieces Reupholstered",
              "sublabel": "residential & commercial"
          },
          {
              "value": "500+",
              "label": "Curtain & Blind Projects",
              "sublabel": "made to measure"
          },
          {
              "value": "4.9\u2605",
              "label": "Google Rating",
              "sublabel": "from 300+ reviews"
          }
      ],
      "contactHeading": "Want a home consultation?",
      "contactHours": "Mon\u2013Fri: 08:30\u201317:00 \u00b7 Sat: 09:00\u201313:00 \u00b7 Home visits by appointment",
      "processSteps": [
          {
              "step": "1",
              "title": "Home Fabric Consult",
              "description": "We visit with fabric samples, measure precisely, and advise on the best options."
          },
          {
              "step": "2",
              "title": "Make in Workshop",
              "description": "All curtains, blinds, and upholstery made in our Cape Town workroom."
          },
          {
              "step": "3",
              "title": "Install & Hang",
              "description": "Professional installation and hanging \u2014 everything fitted and finished on site."
          }
      ],
      "testimonial": {
          "quote": "My grandmother's chair reupholstered in a gorgeous fabric. It looks better than when it was new.",
          "author": "Gina R., Verified Client",
          "rating": 5
      },
      "imageMood": "warm, crafted, interior",
      "heroImageQuery": "reupholstered velvet sofa in elegant living room styled cushions interior design",
      "heroBgImageQuery": "fabric swatches samples upholstery textile rolls dark background",
      "ogImageQuery": "reupholstered wingback armchair new fabric interior styled living room",
      "aboutImageQuery": "upholsterer hand-sewing fabric in workshop workbench tools staple gun close up",
      "galleryImageQueries": [
          "reupholstered sofa before and after new fabric transformation living room",
          "custom made curtains drapes hanging in bay window living room interior elegant",
          "roman blinds fitted bedroom window soft light styled interior",
          "upholstery workshop interior fabric bolts rolls industrial sewing machine workbench"
      ],
      "features": [
        { "name": "Fabric Library With 500+ Options", "description": "We bring the showroom to you. Choose from hundreds of fabrics, textures, and patterns in the comfort of your own home.", "imageQuery": "fabric samples swatches upholstery selection variety colours" },
        { "name": "Restore, Don't Replace", "description": "Your grandmother's wingback doesn't need to go to the skip. We strip it back, re-spring, re-pad, and re-cover it to last another generation.", "imageQuery": "antique chair being reupholstered workshop restoration craft" },
        { "name": "Measure, Make & Fit Included", "description": "From first measurement to final fitting, we handle the entire process. No subcontractors, no miscommunication.", "imageQuery": "curtain fitting professional installer measuring window treatment" }
      ]
  },
  "Waste Removal / Skip Hire": {
      "heroEyebrow": "WASTE REMOVAL CAPE TOWN",
      "heroAccent": "Same-day skips. Responsible disposal.",
      "tagline": "Rubbish gone. Site <em>cleared</em>. Sorted.",
      "heroSubtitle": "Fast skip hire, builders' rubble removal, and garden waste clearing for residential and commercial clients.",
      "ctaPrimary": "Order a Skip",
      "ctaSecondary": "Skip Sizes",
      "ctaNote": "Same-day delivery \u00b7 Responsible sorting & recycling \u00b7 No load too big",
      "badge": "IWMSA Registered Waste Management Company",
      "servicesHeading": "What We Remove",
      "services": [
          {
              "name": "Skip Hire",
              "description": "2m\u00b3 to 10m\u00b3 skip bins delivered same-day and collected on your schedule.",
              "tags": [
                  "Skip Hire",
                  "Same-Day"
              ],
              "icon": "trash-2",
              "serviceImageQuery": "skip bin driveway residential waste loaded"
          },
          {
              "name": "Builders' Rubble Removal",
              "description": "Crane truck or tipper removal of building rubble, renovation waste, and heavy materials.",
              "tags": [
                  "Rubble",
                  "Crane Truck"
              ],
              "icon": "truck",
              "serviceImageQuery": "builders rubble removal tipper truck construction site"
          },
          {
              "name": "Garden & Green Waste",
              "description": "Removal of garden refuse, palm trees, cut branches, and green waste after landscaping.",
              "tags": [
                  "Garden Waste",
                  "Green Waste"
              ],
              "icon": "feather",
              "serviceImageQuery": "garden waste branches green refuse loaded truck"
          },
          {
              "name": "E-Waste & Hazardous Disposal",
              "description": "Compliant collection and disposal of electronic waste, old paint, chemicals, and other hazardous household materials.",
              "tags": [
                  "E-Waste",
                  "Hazardous Disposal"
              ],
              "icon": "alert-triangle",
              "serviceImageQuery": "electronic waste e-waste recycling sorted bins"
          }
      ],
      "galleryHeading": "Cleared & Clean",
      "aboutHeading": "Waste removed <em>responsibly</em>",
      "aboutText": "We don't just move waste from your site to a landfill. We sort everything \u2014 recyclables are recycled, green waste is composted, and only what cannot be diverted goes to landfill. We document disposal for clients who require it.\n\nFast, reliable, and genuinely responsible. That's the only way we do this.",
      "aboutMission": "We believe waste removal done responsibly is one of the simplest ways a business can contribute to a more sustainable city.",
      "stats": [
          {
              "value": "11+",
              "label": "Years in Waste",
              "sublabel": "since 2013"
          },
          {
              "value": "20,000+",
              "label": "Tons Removed",
              "sublabel": "since opening"
          },
          {
              "value": "65%",
              "label": "Waste Diverted",
              "sublabel": "from landfill through sorting"
          },
          {
              "value": "4.7\u2605",
              "label": "Google Rating",
              "sublabel": "from 350+ reviews"
          }
      ],
      "contactHeading": "Need a skip or removal today?",
      "contactHours": "Mon\u2013Fri: 06:30\u201317:30 \u00b7 Sat: 07:00\u201314:00 \u00b7 Same-day orders by 10:00",
      "processSteps": [
          {
              "step": "1",
              "title": "Order Online or Call",
              "description": "Choose your skip size or describe the removal \u2014 we confirm same-day or scheduled."
          },
          {
              "step": "2",
              "title": "Delivery & Fill",
              "description": "Skip delivered to your site \u2014 you fill it in your own time and we collect when ready."
          },
          {
              "step": "3",
              "title": "Collect & Dispose",
              "description": "Skip collected, waste sorted responsibly, and disposal certificate provided."
          }
      ],
      "testimonial": {
          "quote": "Skip delivered in 2 hours, collected next day. Absolute no-fuss service.",
          "author": "Daan P., Verified Client",
          "rating": 5
      },
      "imageMood": "industrial, clean, efficient",
      "heroImageQuery": "yellow skip bin on residential driveway loaded with rubble waste debris",
      "heroBgImageQuery": "industrial waste skip bin container dark background",
      "ogImageQuery": "skip bin hire on residential driveway loaded waste removal street",
      "aboutImageQuery": "waste removal crew operating grab truck loading skip bin onto flatbed truck site",
      "galleryImageQueries": [
          "loaded skip bin on residential driveway filled with rubble building waste debris",
          "tipper truck dumping builders rubble at construction site clearance demolition waste",
          "garden waste green refuse branches loaded onto truck green waste removal",
          "waste sorting recycling facility workers separating materials into bins responsible disposal"
      ],
      "features": [
        { "name": "Same-Day Drop & Collect", "description": "Need a skip today? We deliver same-day across Cape Town and collect when you're done \u2014 even if that's the same afternoon.", "imageQuery": "skip bin being delivered truck crane residential driveway" },
        { "name": "Responsible Disposal & Recycling", "description": "We sort and recycle wherever possible. Your waste is handled legally and sustainably \u2014 with disposal certificates on request.", "imageQuery": "waste sorting recycling facility responsible disposal professional" },
        { "name": "Any Size, Any Waste Type", "description": "From a single bakkie load to 40-cubic-metre roll-on containers, we handle garden refuse, rubble, office clearouts, and everything in between.", "imageQuery": "various skip sizes construction waste removal different containers" }
      ]
  },
  "Language School": {
      "heroEyebrow": "LANGUAGE SCHOOL CAPE TOWN",
      "heroAccent": "English, Afrikaans, French & more",
      "tagline": "A new language opens an entirely new <em>world</em>",
      "heroSubtitle": "Professional language tuition for adults and children \u2014 conversational, business, and exam-preparation courses.",
      "ctaPrimary": "Book a Free Assessment",
      "ctaSecondary": "Our Courses",
      "ctaNote": "Free level assessment \u00b7 Flexible scheduling \u00b7 Online & in-person",
      "badge": "Umalusi Accredited Language Centre",
      "servicesHeading": "What We Teach",
      "services": [
          {
              "name": "English for Business & Communication",
              "description": "Structured English tuition for professionals wanting clarity, confidence, and precision in the workplace.",
              "tags": [
                  "Business English",
                  "Communication"
              ],
              "icon": "message-circle",
              "serviceImageQuery": "classroom whiteboard English lesson grammar students desks"
          },
          {
              "name": "French, German & Spanish",
              "description": "Beginner to advanced tuition in European languages with qualified native-speaker instructors.",
              "tags": [
                  "French",
                  "German"
              ],
              "icon": "globe",
              "serviceImageQuery": "foreign language textbooks French German Spanish conversation class"
          },
          {
              "name": "Exam Preparation",
              "description": "IELTS, Cambridge, and DELF exam preparation courses with proven results and practice materials.",
              "tags": [
                  "IELTS",
                  "Cambridge"
              ],
              "icon": "award",
              "serviceImageQuery": "exam preparation study materials practice papers desk books"
          },
          {
              "name": "Conversational Afrikaans",
              "description": "Practical Afrikaans tuition for English speakers wanting to connect in the workplace and community.",
              "tags": [
                  "Afrikaans",
                  "Conversational"
              ],
              "serviceImageQuery": "Afrikaans language textbook vocabulary flashcards desk study"
          },
          {
              "name": "Corporate Language Training",
              "description": "On-site and online language programmes tailored for workplace communication and business writing.",
              "tags": [
                  "Corporate",
                  "Business"
              ],
              "serviceImageQuery": "corporate language training business meeting presentation"
          },
          {
              "name": "isiZulu & isiXhosa",
              "description": "Learn South Africa\u2019s most spoken indigenous languages for professional and personal enrichment.",
              "tags": [
                  "isiZulu",
                  "isiXhosa"
              ],
              "serviceImageQuery": "south african language class diverse students learning"
          }
      ],
      "galleryHeading": "Learning in Action",
      "aboutHeading": "Languages taught with <em>passion</em>",
      "aboutText": "We've been teaching languages in Cape Town since 2009. Our instructors are native or near-native speakers with formal teaching qualifications \u2014 not just fluency.\n\nSmall class sizes mean every student gets the attention they need. Most students reach conversational level within 6 months of committed study.",
      "aboutMission": "We believe language is the most powerful tool for connection, opportunity, and understanding across cultures.",
      "stats": [
          {
              "value": "15+",
              "label": "Years Teaching",
              "sublabel": "since 2009"
          },
          {
              "value": "8",
              "label": "Languages Offered",
              "sublabel": "beginner to advanced"
          },
          {
              "value": "2,000+",
              "label": "Students Taught",
              "sublabel": "adults & children"
          },
          {
              "value": "94%",
              "label": "Exam Pass Rate",
              "sublabel": "IELTS & Cambridge"
          }
      ],
      "contactHeading": "Ready for a free level assessment?",
      "stepsHeading": "To Start Speaking",
      "contactHours": "Mon\u2013Fri: 08:00\u201319:00 \u00b7 Sat: 09:00\u201315:00 \u00b7 Online classes available",
      "processSteps": [
          {
              "step": "1",
              "title": "Free Level Assessment",
              "description": "We assess your current level and recommend the most appropriate course and schedule."
          },
          {
              "step": "2",
              "title": "Enrol & Start",
              "description": "Join a class or book private tuition \u2014 materials included, schedule confirmed."
          },
          {
              "step": "3",
              "title": "Learn & Progress",
              "description": "Regular progress assessments keep you on track to reach your language goals."
          }
      ],
      "testimonial": {
          "quote": "Passed IELTS with a 7.5 band score after 3 months of preparation. Excellent teaching.",
          "author": "Amara D., Verified Client",
          "rating": 5
      },
      "imageMood": "warm, international, engaged",
      "heroImageQuery": "bright modern language school classroom with desks chairs whiteboard students learning",
      "heroBgImageQuery": "language classroom desks textbooks whiteboard dark background modern education",
      "ogImageQuery": "language school classroom students at desks whiteboard vocabulary words bright modern",
      "aboutImageQuery": "language teacher at whiteboard explaining grammar to adult students engaged classroom interaction",
      "galleryImageQueries": [
          "diverse adult students in language classroom desks whiteboard engaged learning speaking",
          "business English group lesson adult professionals practising conversation pair work",
          "IELTS exam preparation study materials practice test papers textbooks on desk",
          "language students in pairs practising conversation speaking activity face to face classroom"
      ]
  },
  "After-school / Enrichment": {
      "heroEyebrow": "AFTER-SCHOOL PROGRAMME CAPE TOWN",
      "heroAccent": "Homework support, enrichment & tutoring",
      "tagline": "The extra hour that makes all the <em>difference</em>",
      "heroSubtitle": "Safe, structured after-school care with homework support, enrichment activities, and supervised learning for primary and high school learners.",
      "ctaPrimary": "Enrol Now",
      "ctaSecondary": "Our Programme",
      "ctaNote": "Trial week available \u00b7 Transport assistance \u00b7 SACE registered staff",
      "badge": "Department of Education Registered Centre",
      "servicesHeading": "What We Offer",
      "services": [
          {
              "name": "Homework Supervision",
              "description": "Qualified educators supervise and assist with daily homework \u2014 work checked before learners go home.",
              "tags": [
                  "Homework Help",
                  "Supervised"
              ],
              "icon": "book",
              "serviceImageQuery": "children doing homework desk books pencils supervised classroom"
          },
          {
              "name": "Academic Enrichment",
              "description": "Maths, English, and Science enrichment sessions designed to build confidence and close gaps.",
              "tags": [
                  "Maths",
                  "Enrichment"
              ],
              "icon": "award",
              "serviceImageQuery": "maths enrichment lesson children whiteboard numbers classroom"
          },
          {
              "name": "Creative & Sports Activities",
              "description": "Art, music, sport, and coding activities that develop the whole child beyond the curriculum.",
              "tags": [
                  "Art",
                  "Coding"
              ],
              "icon": "activity",
              "serviceImageQuery": "children art craft painting activity table creative colourful"
          },
          {
              "name": "Exam Preparation Bootcamps",
              "description": "Intensive revision workshops before mid-year and final exams covering key subjects and exam technique.",
              "tags": [
                  "Exam Prep",
                  "Revision"
              ],
              "serviceImageQuery": "exam revision bootcamp past papers whiteboard study notes"
          },
          {
              "name": "STEM & Robotics",
              "description": "Hands-on science, technology, engineering, and maths programmes with robotics kits and coding challenges.",
              "tags": [
                  "STEM",
                  "Robotics"
              ],
              "serviceImageQuery": "children robotics STEM class building programming"
          },
          {
              "name": "Leadership & Life Skills",
              "description": "Confidence building, public speaking, and teamwork programmes designed for primary and high school students.",
              "tags": [
                  "Leadership",
                  "Life Skills"
              ],
              "serviceImageQuery": "children leadership teamwork activity group learning"
          }
      ],
      "galleryHeading": "Learning Beyond the Bell",
      "aboutHeading": "After-school done <em>properly</em>",
      "aboutText": "We are not a babysitting service. Every child in our care is engaged, supervised, and learning \u2014 whether through homework, enrichment, or structured activities.\n\nOur staff are qualified educators and youth workers, not untrained assistants. We maintain a 1:8 staff-to-learner ratio at all times.",
      "aboutMission": "We believe the hours after the bell are some of the most important in a child's development \u2014 and they deserve to be spent well.",
      "stats": [
          {
              "value": "10+",
              "label": "Years Running",
              "sublabel": "since 2014"
          },
          {
              "value": "120",
              "label": "Learners Enrolled",
              "sublabel": "Grade R to Grade 12"
          },
          {
              "value": "1:8",
              "label": "Staff to Learner Ratio",
              "sublabel": "at all times"
          },
          {
              "value": "98%",
              "label": "Parent Satisfaction",
              "sublabel": "annual survey"
          }
      ],
      "contactHeading": "Want to book a trial week?",
      "stepsHeading": "To Get Your Child Started",
      "contactHours": "Mon\u2013Fri: 13:00\u201318:00 \u00b7 Office: 08:00\u201314:00 \u00b7 School terms only",
      "processSteps": [
          {
              "step": "1",
              "title": "Enquire & Visit",
              "description": "Visit the centre, meet the team, and see the programme in action."
          },
          {
              "step": "2",
              "title": "Trial Week",
              "description": "Your child joins for a free trial week with no commitment required."
          },
          {
              "step": "3",
              "title": "Enrol",
              "description": "Formal enrolment, schedule confirmed, and regular progress updates begin."
          }
      ],
      "testimonial": {
          "quote": "My son went from Ds in Maths to a B in one term. The staff are exceptional.",
          "author": "Vanessa B., Verified Client",
          "rating": 5
      },
      "imageMood": "warm, engaged, bright",
      "heroImageQuery": "bright colourful classroom interior with desks bookshelves children doing homework after school",
      "heroBgImageQuery": "school classroom desks books stationery dark warm background education",
      "ogImageQuery": "children at desks doing homework bright classroom books pencils after school programme",
      "aboutImageQuery": "teacher sitting beside child helping with reading book at desk warm classroom after school",
      "galleryImageQueries": [
          "children seated at desks doing homework pencils books supervised after school classroom",
          "children doing hands-on science experiment in classroom excited engaged learning",
          "children running playing outdoor sports on grass field after school activity",
          "children reading books in cosy library corner colourful beanbag cushions"
      ]
  },
  "Art / Craft Classes": {
      "heroEyebrow": "ART & CRAFT CLASSES CAPE TOWN",
      "heroAccent": "Children, adults & corporate workshops",
      "tagline": "Make something with your own <em>hands</em>",
      "heroSubtitle": "Professional art and craft classes for children and adults \u2014 painting, ceramics, drawing, and mixed media in a welcoming studio.",
      "ctaPrimary": "Book a Class",
      "ctaSecondary": "Class Schedule",
      "ctaNote": "All materials supplied \u00b7 No experience needed \u00b7 First class discounted",
      "badge": "DACE Registered Arts Educator",
      "servicesHeading": "What We Teach",
      "services": [
          {
              "name": "Painting & Drawing",
              "description": "Watercolour, acrylic, oil painting, and life drawing classes for beginners to advanced students.",
              "tags": [
                  "Watercolour",
                  "Oil Painting"
              ],
              "icon": "edit-3",
              "serviceImageQuery": "watercolour painting easel brush close-up studio art class"
          },
          {
              "name": "Ceramics & Pottery",
              "description": "Wheel-thrown and hand-built pottery classes with glazing and kiln firing included.",
              "tags": [
                  "Ceramics",
                  "Pottery"
              ],
              "icon": "circle",
              "serviceImageQuery": "pottery wheel throwing hands clay spinning ceramics studio"
          },
          {
              "name": "Children's Art Programmes",
              "description": "Weekly art classes for children from age 4, developing creativity, fine motor skills, and confidence.",
              "tags": [
                  "Children",
                  "Age 4+"
              ],
              "icon": "star",
              "serviceImageQuery": "children painting easels colourful art class brushes aprons"
          },
          {
              "name": "Corporate & Team-Building Workshops",
              "description": "Guided creative workshops for corporate teams — ceramics, painting, and collaborative art experiences.",
              "tags": [
                  "Corporate Events",
                  "Team Building"
              ],
              "serviceImageQuery": "corporate team building art workshop group painting canvas"
          },
          {
              "name": "Printmaking & Linocut",
              "description": "Traditional printmaking techniques including linocut, monotype, and screen printing for all levels.",
              "tags": [
                  "Printmaking",
                  "Linocut"
              ],
              "serviceImageQuery": "printmaking linocut art class creative workshop"
          },
          {
              "name": "Textile & Fibre Arts",
              "description": "Weaving, macram\u00e9, and needle felting workshops in a relaxed, social studio setting.",
              "tags": [
                  "Textile Arts",
                  "Weaving"
              ],
              "serviceImageQuery": "textile weaving fibre art workshop handmade craft"
          }
      ],
      "galleryHeading": "Made in Our Studio",
      "aboutHeading": "Creativity taught with <em>joy</em>",
      "aboutText": "Art is not a talent \u2014 it's a skill that can be learned by anyone willing to try. Our studio in Cape Town has been teaching that truth since 2011.\n\nClasses are small (maximum 10 students), all materials are supplied, and our instructors are practising artists. You'll make something you're proud of, guaranteed.",
      "aboutMission": "We believe creativity is a fundamental human need \u2014 and every person deserves space to express it.",
      "stats": [
          {
              "value": "13+",
              "label": "Years Teaching",
              "sublabel": "since 2011"
          },
          {
              "value": "1,500+",
              "label": "Students Taught",
              "sublabel": "children & adults"
          },
          {
              "value": "10",
              "label": "Max Class Size",
              "sublabel": "for personal attention"
          },
          {
              "value": "4.9\u2605",
              "label": "Google Rating",
              "sublabel": "from 350+ reviews"
          }
      ],
      "contactHeading": "Ready to create something?",
      "stepsHeading": "To Start Creating",
      "contactHours": "Mon\u2013Fri: 09:00\u201319:00 \u00b7 Sat: 08:30\u201316:00 \u00b7 Sun: 10:00\u201314:00",
      "processSteps": [
          {
              "step": "1",
              "title": "Choose a Class",
              "description": "Browse our schedule and pick a class that suits your skill level and schedule."
          },
          {
              "step": "2",
              "title": "Book & Arrive",
              "description": "Book online, arrive at the studio \u2014 all materials and aprons are provided."
          },
          {
              "step": "3",
              "title": "Create & Grow",
              "description": "Learn, make, and leave with a finished piece and the urge to come back."
          }
      ],
      "testimonial": {
          "quote": "I've never painted in my life. After 6 weeks I've made things I'm genuinely proud of.",
          "author": "Michelle L., Verified Client",
          "rating": 5
      },
      "imageMood": "warm, creative, joyful",
      "heroImageQuery": "bright art studio interior with easels canvases paint tubes brushes natural light windows",
      "heroBgImageQuery": "artist paint palette brushes canvases dark studio background creative supplies",
      "ogImageQuery": "art class studio interior easels canvases students painting ceramics bright workshop",
      "aboutImageQuery": "art instructor demonstrating brush technique to adult student at easel canvas painting class",
      "galleryImageQueries": [
          "adult watercolour painting class students at easels wet on wet technique art studio",
          "finished ceramic pottery pieces glazed on display shelf kiln fired art studio",
          "children painting at easels colourful art class brushes aprons messy creative fun",
          "art studio gallery wall completed paintings canvases framed exhibition display"
      ]
  },
  "Car Dealership": {
      "heroEyebrow": "USED CAR DEALERSHIP CAPE TOWN",
      "heroAccent": "Finance, trade-ins & warranty included",
      "tagline": "The right car at a price you can <em>trust</em>",
      "heroSubtitle": "Quality used vehicles with full service history, mechanical inspection, and in-house finance from a Cape Town dealership you can rely on.",
      "ctaPrimary": "Browse Stock",
      "ctaSecondary": "Finance Calculator",
      "ctaNote": "In-house finance \u00b7 Trade-ins welcome \u00b7 3-month mechanical warranty",
      "badge": "RMI Registered Motor Dealer",
      "servicesHeading": "What We Offer",
      "services": [
          {
              "name": "Quality Used Vehicles",
              "description": "Carefully selected used vehicles with full service history, mechanical inspection, and clean titles.",
              "tags": [
                  "Used Cars",
                  "Service History"
              ],
              "icon": "truck",
              "serviceImageQuery": "white SUV car front view showroom clean background"
          },
          {
              "name": "In-House Vehicle Finance",
              "description": "Finance arranged through major banks with competitive rates and flexible terms to suit your budget.",
              "tags": [
                  "Finance",
                  "Bank Approved"
              ],
              "icon": "credit-card",
              "serviceImageQuery": "blue sedan car parked side view clean background"
          },
          {
              "name": "Trade-Ins & Vehicle Valuations",
              "description": "Fair, market-related trade-in valuations with same-day cash offers on qualifying vehicles.",
              "tags": [
                  "Trade-In",
                  "Valuation"
              ],
              "icon": "repeat",
              "serviceImageQuery": "red sports car front angle clean background"
          },
          {
            "name": "After-Sale Service Plans",
            "description": "Extended warranty packages, service plans, and roadside assistance bolt-ons for complete peace of mind after purchase.",
            "tags": [
              "Warranty",
              "Service Plan"
            ],
            "serviceImageQuery": "car keys on signed warranty document contract desk dealership"
          },
          {
              "name": "Extended Warranties",
              "description": "Comprehensive mechanical and electrical warranty plans for added peace of mind on your purchase.",
              "tags": [
                  "Warranty",
                  "Protection"
              ],
              "serviceImageQuery": "customer signing car purchase warranty paperwork at dealership desk"
          },
          {
              "name": "Fleet & Corporate Sales",
              "description": "Volume discounts, dedicated fleet management, and corporate leasing options for businesses.",
              "tags": [
                  "Fleet Sales",
                  "Corporate"
              ],
              "serviceImageQuery": "car fleet corporate vehicles dealership lot row"
          }
      ],
      "galleryHeading": "Current Stock",
      "aboutHeading": "Cars sold with <em>integrity</em>",
      "aboutText": "We have been selling quality used vehicles in Cape Town since 2006. Every car on our floor has been mechanically inspected, serviced where needed, and priced based on real market data \u2014 not wishful thinking.\n\nWe are RMI registered. Our finance consultants work with all major banks and get approvals most people don't expect.",
      "aboutMission": "We believe buying a used car should feel like a confident decision \u2014 not a gamble.",
      "stats": [
          {
              "value": "18+",
              "label": "Years in Motor Trade",
              "sublabel": "since 2006"
          },
          {
              "value": "2,500+",
              "label": "Vehicles Sold",
              "sublabel": "Cape Town & surrounds"
          },
          {
              "value": "3mo",
              "label": "Mechanical Warranty",
              "sublabel": "on all vehicles sold"
          },
          {
              "value": "4.7\u2605",
              "label": "Google Rating",
              "sublabel": "from 600+ reviews"
          }
      ],
      "contactHeading": "Found a car you like? Let's talk.",
      "contactHours": "Mon\u2013Fri: 08:00\u201317:30 \u00b7 Sat: 08:30\u201315:00 \u00b7 Sun: 10:00\u201314:00",
      "processSteps": [
          {
              "step": "1",
              "title": "Browse & Test Drive",
              "description": "View stock online or visit the floor \u2014 test drives available 7 days a week."
          },
          {
              "step": "2",
              "title": "Finance & Trade-In",
              "description": "We value your trade-in and arrange finance through multiple banks on the same visit."
          },
          {
              "step": "3",
              "title": "Drive Away",
              "description": "Paperwork completed, handover done, and you drive away same day in most cases."
          }
      ],
      "testimonial": {
          "quote": "Bought a Golf GTI with full history at a fair price. Finance approved in 2 hours.",
          "author": "Kyle F., Verified Client",
          "rating": 5
      },
      "imageMood": "premium, trustworthy, clean",
      "heroImageQuery": "car dealership showroom interior luxury vehicles lined up polished floor lights",
      "heroBgImageQuery": "dark car showroom interior moody lighting luxury sedan on display",
      "ogImageQuery": "row of cars parked in dealership lot for sale clean",
      "aboutImageQuery": "car salesman handing keys to happy customer at dealership handshake",
      "galleryImageQueries": [
          "black SUV parked in dealership lot front angle clean",
          "silver sedan car parked side view clean background",
          "white double cab pickup truck front angle outdoor",
          "blue BMW sedan parked three quarter view dealership"
      ],
      "features": [
        { "name": "Every Vehicle Inspected & Warranted", "description": "Each car on our floor passes a multi-point mechanical inspection. Nothing goes on sale until we'd be happy driving it ourselves.", "imageQuery": "mechanic inspecting car underneath on lift pre-purchase check" },
        { "name": "Finance Pre-Approval On-Site", "description": "We work with multiple finance houses to get you the best rate. Walk in, get approved, and drive out \u2014 often on the same day.", "imageQuery": "customer signing vehicle finance paperwork at car dealership desk" },
        { "name": "Trade-In Valuations in 15 Minutes", "description": "Thinking of upgrading? We'll value your current vehicle on the spot and deduct it from your new purchase. Quick, fair, transparent.", "imageQuery": "car salesman appraising trade-in vehicle on dealership lot clipboard" }
      ]
  },
  "App Developer": {
      "heroEyebrow": "APP DEVELOPMENT CAPE TOWN",
      "heroAccent": "iOS, Android & cross-platform builds",
      "tagline": "Your idea, built into an app that <em>works</em>",
      "heroSubtitle": "Custom mobile and web application development for startups, SMEs, and enterprises \u2014 from concept to App Store.",
      "ctaPrimary": "Book a Discovery Call",
      "ctaSecondary": "Our Portfolio",
      "ctaNote": "NDA signed upfront \u00b7 Fixed-price projects \u00b7 Post-launch support included",
      "badge": "Google Developer Partner",
      "servicesHeading": "What We Build",
      "services": [
          {
              "name": "iOS & Android Apps",
              "description": "Native and cross-platform mobile apps for iOS and Android built with React Native or Swift.",
              "tags": [
                  "iOS",
                  "Android"
              ],
              "icon": "smartphone",
              "serviceImageQuery": "hand holding iPhone showing polished mobile app home screen with colourful cards and navigation bar"
          },
          {
              "name": "Web Applications",
              "description": "Scalable web apps, SaaS platforms, and customer portals built with modern React and Node.js.",
              "tags": [
                  "Web App",
                  "SaaS"
              ],
              "icon": "monitor",
              "serviceImageQuery": "SaaS web application dashboard on laptop screen with sidebar navigation charts and data tables"
          },
          {
              "name": "MVP & Startup Builds",
              "description": "Lean MVPs built fast and smart to validate your idea before committing to a full product build.",
              "tags": [
                  "MVP",
                  "Startup"
              ],
              "icon": "zap",
              "serviceImageQuery": "UX designer sketching mobile app wireframes on paper with pen sticky notes and phone prototype"
          },
          {
            "name": "API Development & Integration",
            "description": "Custom API development, third-party integrations, and payment gateway connections to power your platform behind the scenes.",
            "tags": [
              "API",
              "Integration"
            ],
            "serviceImageQuery": "developer terminal screen showing REST API JSON response code with syntax highlighting dark IDE"
          }
      ],
      "galleryHeading": "Apps We've Shipped",
      "aboutHeading": "Apps built to <em>scale</em>",
      "aboutText": "We've been building software products in Cape Town since 2013. Our team includes senior engineers, UX designers, and product managers who understand that a great app is not just functional \u2014 it's intuitive, fast, and built to grow.\n\nWe work in sprints, communicate daily, and ship products that don't need to be rebuilt in two years.",
      "aboutMission": "We believe technology should solve real problems \u2014 and the best apps are the ones users can't imagine living without.",
      "stats": [
          {
              "value": "11+",
              "label": "Years Building",
              "sublabel": "since 2013"
          },
          {
              "value": "80+",
              "label": "Apps Shipped",
              "sublabel": "iOS, Android & web"
          },
          {
              "value": "12",
              "label": "Senior Engineers",
              "sublabel": "full-time in Cape Town"
          },
          {
              "value": "4.9\u2605",
              "label": "Google Rating",
              "sublabel": "from 150+ reviews"
          }
      ],
      "contactHeading": "Have an app idea? Let's talk.",
      "contactHours": "Mon\u2013Fri: 08:30\u201317:30 \u00b7 Discovery calls by appointment \u00b7 Remote meetings available",
      "processSteps": [
          {
              "step": "1",
              "title": "Discovery & Scoping",
              "description": "We deep-dive into your idea, define scope, and produce a detailed technical proposal."
          },
          {
              "step": "2",
              "title": "Design & Build",
              "description": "UX wireframes approved before a line of code is written, then sprint-based development."
          },
          {
              "step": "3",
              "title": "Launch & Support",
              "description": "App Store submission, launch support, and a 3-month post-launch maintenance period."
          }
      ],
      "testimonial": {
          "quote": "They built our MVP in 10 weeks and it's been downloaded 40,000 times. Exceptional team.",
          "author": "Liam P., Verified Client",
          "rating": 5
      },
      "imageMood": "modern, technical, sharp",
      "heroImageQuery": "smartphone showing colourful mobile app interface UI with navigation cards buttons modern design",
      "heroBgImageQuery": "Swift or React Native code on dark IDE screen mobile app development syntax highlighting",
      "ogImageQuery": "multiple smartphone screens showing mobile app UI mockups arranged on desk",
      "aboutImageQuery": "app developer team working at desks with monitors showing Xcode Android Studio mobile code",
      "galleryImageQueries": [
          "iPhone showing polished mobile app login screen with clean UI design colourful gradient",
          "developer debugging mobile app code on large monitor with phone emulator running beside it",
          "tablet and phone showing responsive app dashboard with charts cards and navigation menu",
          "UX designer drawing app wireframes on whiteboard with sticky notes user flow arrows"
      ],
      "features": [
        { "name": "Prototype Before You Pay to Build", "description": "We create a clickable prototype first so you can test the flow, gather feedback, and validate the idea before investing in full development.", "imageQuery": "clickable app prototype on smartphone screen with wireframe UI mockup user testing session" },
        { "name": "Post-Launch Iteration", "description": "Launch is just the beginning. We offer ongoing development sprints so your app evolves based on real user feedback.", "imageQuery": "mobile app analytics dashboard showing downloads retention user engagement metrics on screen" },
        { "name": "App Store Submission Handled", "description": "We manage the entire submission process for Apple and Google Play \u2014 screenshots, descriptions, compliance, and approval.", "imageQuery": "Apple App Store listing page with app screenshots ratings download button on iPhone screen" }
      ]
  },
  "E-commerce": {
      "heroEyebrow": "E-COMMERCE SOLUTIONS CAPE TOWN",
      "heroAccent": "Shopify, WooCommerce & custom builds",
      "tagline": "Your store, open for business <em>always</em>",
      "heroSubtitle": "E-commerce strategy, store development, and growth management for brands that want to sell more online.",
      "ctaPrimary": "Get a Proposal",
      "ctaSecondary": "Our Services",
      "ctaNote": "Free store audit \u00b7 No lock-in \u00b7 Launch in 4 weeks",
      "badge": "Shopify Partner & WooCommerce Expert",
      "servicesHeading": "How We Help",
      "services": [
          {
              "name": "E-commerce Store Build",
              "description": "Shopify, WooCommerce, and custom store builds with payment gateway integration and inventory setup.",
              "tags": [
                  "Shopify",
                  "WooCommerce"
              ],
              "icon": "shopping-cart",
              "serviceImageQuery": "Shopify store homepage on laptop showing product grid add to cart buttons modern ecommerce design"
          },
          {
              "name": "Conversion Rate Optimisation",
              "description": "UX improvements, A/B testing, and checkout flow optimisation to turn more visitors into buyers.",
              "tags": [
                  "CRO",
                  "A/B Testing"
              ],
              "icon": "trending-up",
              "serviceImageQuery": "ecommerce conversion rate optimisation dashboard showing A/B test results checkout funnel analytics on screen"
          },
          {
              "name": "E-commerce Growth Management",
              "description": "Ongoing SEO, Google Shopping, email marketing, and performance reporting for growing stores.",
              "tags": [
                  "Google Shopping",
                  "SEO"
              ],
              "icon": "bar-chart-2",
              "serviceImageQuery": "Google Shopping product listing ads showing product images prices and ratings on search results page"
          },
          {
            "name": "Product Photography & Listing",
            "description": "E-commerce product photography, copywriting, and bulk listing upload — ready to sell from day one.",
            "tags": [
              "Product Photos",
              "Listing"
            ],
            "serviceImageQuery": "product photography setup with white background lightbox camera and styled items for ecommerce listing"
          }
      ],
      "galleryHeading": "Stores We've Built",
      "aboutHeading": "E-commerce that actually <em>converts</em>",
      "aboutText": "Most e-commerce stores have a traffic problem or a conversion problem \u2014 or both. We fix both. We've been building and growing online stores in South Africa since 2012, working with brands selling everything from fashion to food.\n\nWe are certified Shopify Partners and WooCommerce specialists, with in-house SEO and paid media capabilities.",
      "aboutMission": "We believe a great online store should do most of the selling for you \u2014 we build stores that close.",
      "stats": [
          {
              "value": "12+",
              "label": "Years in E-commerce",
              "sublabel": "since 2012"
          },
          {
              "value": "150+",
              "label": "Stores Built",
              "sublabel": "Shopify & WooCommerce"
          },
          {
              "value": "3.8x",
              "label": "Average ROAS",
              "sublabel": "managed store campaigns"
          },
          {
              "value": "4.8\u2605",
              "label": "Google Rating",
              "sublabel": "from 180+ reviews"
          }
      ],
      "contactHeading": "Want a free e-commerce audit?",
      "contactHours": "Mon\u2013Fri: 08:30\u201317:30 \u00b7 Discovery calls by appointment \u00b7 Remote meetings available",
      "processSteps": [
          {
              "step": "1",
              "title": "Free Store Audit",
              "description": "We review your current store or brief and identify exactly where revenue is being lost."
          },
          {
              "step": "2",
              "title": "Build or Optimise",
              "description": "New store built to spec or existing store optimised for conversion and SEO."
          },
          {
              "step": "3",
              "title": "Grow & Report",
              "description": "Ongoing growth management with monthly performance reporting against agreed targets."
          }
      ],
      "testimonial": {
          "quote": "Revenue doubled in 4 months after they rebuilt our Shopify store. Worth every cent.",
          "author": "Nadia R., Verified Client",
          "rating": 5
      },
      "imageMood": "modern, commercial, sharp",
      "heroImageQuery": "online store product page on laptop screen showing product image add to cart button and reviews ecommerce",
      "heroBgImageQuery": "Shopify WooCommerce store backend admin dashboard dark screen with order management inventory",
      "ogImageQuery": "ecommerce website on laptop showing product grid with prices shopping cart icon and featured products",
      "aboutImageQuery": "ecommerce manager processing online orders on laptop with shipping boxes and packing materials on desk",
      "galleryImageQueries": [
          "Shopify store homepage design on desktop showing hero banner product collections and featured items",
          "ecommerce analytics dashboard showing revenue orders conversion rate graphs on large monitor",
          "product detail page on phone screen with high-quality product photo size selector and buy button",
          "warehouse worker scanning barcode on package for ecommerce order fulfilment shipping label"
      ],
      "features": [
        { "name": "Revenue-Focused, Not Just Pretty", "description": "We design stores that convert. Every layout decision, product page, and checkout flow is optimised to increase your average order value.", "imageQuery": "e-commerce store conversion optimisation checkout design screen" },
        { "name": "Multi-Channel Integration", "description": "Sell on your website, Instagram, Facebook, and marketplaces from one dashboard. We connect all your channels into a single system.", "imageQuery": "multi-channel e-commerce dashboard integration platforms screen" },
        { "name": "Ongoing Growth Management", "description": "Launch is step one. We offer monthly retainers covering SEO, email campaigns, and conversion rate optimisation to keep revenue climbing.", "imageQuery": "e-commerce growth analytics revenue chart upward trend" }
      ]
  },
  "Music Teacher / School": {
      "heroEyebrow": "MUSIC SCHOOL CAPE TOWN",
      "heroAccent": "Piano, guitar, violin & voice",
      "tagline": "Music lessons that actually <em>inspire</em>",
      "heroSubtitle": "Expert music tuition for children and adults in piano, guitar, violin, voice, and drums \u2014 from beginner to grade 8.",
      "ctaPrimary": "Book a Trial Lesson",
      "ctaSecondary": "Our Instruments",
      "ctaNote": "First lesson free \u00b7 Exam preparation \u00b7 All ages welcome",
      "badge": "UNISA Music Examinations Centre",
      "servicesHeading": "What We Teach",
      "services": [
          {
              "name": "Piano & Keyboard",
              "description": "Classical and contemporary piano from beginner to UNISA Grade 8, for all ages.",
              "tags": [
                  "Piano",
                  "Grade Exams"
              ],
              "serviceImageQuery": "piano keys hands playing lesson sheet music close-up"
          },
          {
              "name": "Guitar \u2014 Classical & Electric",
              "description": "Acoustic, classical, and electric guitar in all genres from fingerpicking to rock and blues.",
              "tags": [
                  "Guitar",
                  "Electric"
              ],
              "serviceImageQuery": "acoustic guitar lesson strumming fingers fretboard close-up"
          },
          {
              "name": "Voice & Theory",
              "description": "Singing lessons in classical and contemporary styles plus music theory for exam preparation.",
              "tags": [
                  "Voice",
                  "Music Theory"
              ],
              "serviceImageQuery": "singing lesson microphone vocal warmup piano accompaniment"
          },
          {
              "name": "Drums & Percussion",
              "description": "Drum kit, djembe, and percussion lessons for beginners to advanced — solo and ensemble playing.",
              "tags": [
                  "Drums",
                  "Percussion"
              ],
              "serviceImageQuery": "drum kit sticks snare cymbal lesson close-up studio"
          },
          {
              "name": "Music Theory & Composition",
              "description": "Structured theory lessons from grade 1 through diploma level, plus creative composition workshops.",
              "tags": [
                  "Theory",
                  "Composition"
              ],
              "serviceImageQuery": "music theory sheet music notation piano lesson"
          },
          {
              "name": "Band & Ensemble Coaching",
              "description": "Group rehearsals, band coaching, and ensemble performance preparation for school and community groups.",
              "tags": [
                  "Band",
                  "Ensemble"
              ],
              "serviceImageQuery": "music band rehearsal group instruments playing together"
          }
      ],
      "galleryHeading": "In the Studio",
      "aboutHeading": "Music taught with <em>passion</em>",
      "aboutText": "We believe music education should be the most anticipated part of a child's week \u2014 not a chore. Our teachers are qualified musicians who love what they teach and know how to bring that love to their students.\n\nWe teach exam syllabi but we also teach joy. Both matter.",
      "aboutMission": "We believe music is a lifelong gift \u2014 and the right teacher is what makes it stick.",
      "stats": [
          {
              "value": "15+",
              "label": "Years Teaching",
              "sublabel": "since 2009"
          },
          {
              "value": "200+",
              "label": "Students Per Term",
              "sublabel": "children & adults"
          },
          {
              "value": "8",
              "label": "Qualified Teachers",
              "sublabel": "multiple instruments"
          },
          {
              "value": "95%",
              "label": "UNISA Pass Rate",
              "sublabel": "distinction average"
          }
      ],
      "contactHeading": "Want to book a free trial lesson?",
      "stepsHeading": "To Start Playing",
      "testimonial": {
          "quote": "My daughter went from refusing to practise to playing for an hour every day. Incredible teacher.",
          "author": "Anthea S., Verified Client",
          "rating": 5
      },
      "imageMood": "warm, creative, inspiring",
      "heroImageQuery": "music school studio room with upright piano guitar stands sheet music warm lighting",
      "heroBgImageQuery": "grand piano keys close up dark moody studio lighting music",
      "ogImageQuery": "music lesson room piano guitar instruments sheet music stands warm bright studio",
      "aboutImageQuery": "music teacher sitting beside student guiding hands on piano keys during lesson",
      "galleryImageQueries": [
          "child practising upright piano hands on keys sheet music stand lesson room",
          "guitar teacher showing student chord finger placement on acoustic guitar fretboard lesson",
          "young violin student bowing technique close up strings lesson room",
          "music school recital children performing on stage audience parents watching concert"
      ],
      "processSteps": [
          {
              "step": "1",
              "title": "Free Trial Lesson",
              "description": "Meet your teacher, try the instrument, and see if it's the right fit."
          },
          {
              "step": "2",
              "title": "Enrol & Schedule",
              "description": "Choose your regular weekly slot and we set up your term schedule."
          },
          {
              "step": "3",
              "title": "Learn & Grow",
              "description": "Weekly lessons with progress tracked toward goals and exams."
          }
      ]
  },
  "Tutor": {
      "heroEyebrow": "ACADEMIC TUTORING CAPE TOWN",
      "heroAccent": "Maths, science, English & more",
      "tagline": "The grade they're capable of, <em>achieved</em>",
      "heroSubtitle": "One-on-one and small group academic tutoring for primary, high school, and matric students in all core subjects.",
      "ctaPrimary": "Book a Session",
      "ctaSecondary": "Subjects We Cover",
      "ctaNote": "First session trial \u00b7 Online or in-person \u00b7 Matric specialists",
      "badge": "SACE Registered Educators on Staff",
      "servicesHeading": "What We Tutor",
      "services": [
          {
              "name": "Maths & Physical Science",
              "description": "One-on-one maths and science tutoring from grade 4 to matric, with exam prep focus.",
              "tags": [
                  "Maths",
                  "Physical Science"
              ],
              "serviceImageQuery": "maths tutoring one-on-one whiteboard equations student desk"
          },
          {
              "name": "English & Afrikaans",
              "description": "Language, comprehension, essay writing, and literature tutoring for all grades.",
              "tags": [
                  "English",
                  "Essay Writing"
              ],
              "serviceImageQuery": "English essay writing tutoring notebook pen student desk"
          },
          {
              "name": "Matric Exam Preparation",
              "description": "Intensive matric prep with past papers, study technique coaching, and subject specialists.",
              "tags": [
                  "Matric",
                  "Exam Prep"
              ],
              "serviceImageQuery": "matric exam revision past papers textbooks desk study notes"
          },
          {
              "name": "Accounting & Business Studies",
              "description": "One-on-one and group tutoring in accounting, business studies, and economics from Grade 10 to matric.",
              "tags": [
                  "Accounting",
                  "Business Studies"
              ],
              "serviceImageQuery": "accounting textbook calculator financial statements study desk"
          },
          {
              "name": "Primary School Support",
              "description": "Foundation phase and intermediate phase tutoring in literacy, numeracy, and general subjects.",
              "tags": [
                  "Primary",
                  "Foundation Phase"
              ],
              "serviceImageQuery": "young student tutoring primary school homework help"
          },
          {
              "name": "Study Skills & Exam Strategy",
              "description": "Time management, note-taking techniques, and exam strategies to build confident independent learners.",
              "tags": [
                  "Study Skills",
                  "Exam Strategy"
              ],
              "serviceImageQuery": "student study skills planning exam revision notes"
          }
      ],
      "galleryHeading": "Learning in Action",
      "aboutHeading": "Tutoring that <em>actually</em> improves grades",
      "aboutText": "We are qualified teachers who tutor. That distinction matters \u2014 we understand the curriculum, the assessment standards, and the examination techniques that actually move marks.\n\nWe take on a limited number of students per tutor to maintain quality. Results are our reputation.",
      "aboutMission": "We believe every student has the capacity to improve \u2014 what they need is the right explanation, the right pace, and someone who believes in them.",
      "stats": [
          {
              "value": "12+",
              "label": "Years Tutoring",
              "sublabel": "since 2012"
          },
          {
              "value": "500+",
              "label": "Students Tutored",
              "sublabel": "primary to matric"
          },
          {
              "value": "2.4",
              "label": "Average Grade Improvement",
              "sublabel": "after one term"
          },
          {
              "value": "4.9\u2605",
              "label": "Google Rating",
              "sublabel": "from 350+ reviews"
          }
      ],
      "contactHeading": "Want to book a trial session?",
      "stepsHeading": "To Get Your Child Back On Track",
      "testimonial": {
          "quote": "Maths went from 42% to 78% in one term. The tutor found exactly where the gaps were.",
          "author": "Miriam T., Verified Client",
          "rating": 5
      },
      "imageMood": "focused, warm, encouraging",
      "heroImageQuery": "tutor and student at desk with open textbooks stationery bright study room academic",
      "heroBgImageQuery": "stack of textbooks open notebook pencils study desk dark background academic",
      "ogImageQuery": "private tutoring session tutor and student at desk books notes bright academic",
      "aboutImageQuery": "tutor explaining maths concept on whiteboard to student one-on-one session desk",
      "galleryImageQueries": [
          "student working maths equations on whiteboard pencil problem solving tutoring",
          "matric exam revision past papers study notes highlighter on desk preparation",
          "essay writing feedback teacher marking with red pen notebook student desk",
          "online tutoring session laptop screen webcam student at desk headphones"
      ],
      "processSteps": [
          {
              "step": "1",
              "title": "Assessment Session",
              "description": "We identify exactly where the gaps are before starting regular sessions."
          },
          {
              "step": "2",
              "title": "Structured Programme",
              "description": "A term plan covering curriculum gaps and exam preparation in priority order."
          },
          {
              "step": "3",
              "title": "Weekly Sessions & Progress",
              "description": "Regular sessions with parent updates and goal tracking every 4 weeks."
          }
      ]
  },
  "Driving School": {
      "heroEyebrow": "DRIVING SCHOOL CAPE TOWN",
      "heroAccent": "K53, yard test & road confidence",
      "tagline": "Your licence, faster than you <em>think</em>",
      "heroSubtitle": "Professional K53 driving lessons from accredited instructors \u2014 pass your learner, yard test, and road test with confidence.",
      "ctaPrimary": "Book a Lesson",
      "ctaSecondary": "Our Packages",
      "ctaNote": "Learners prep included \u00b7 Pick-up from home \u00b7 Automatic & manual",
      "badge": "DLTC Registered Driving School",
      "servicesHeading": "What We Offer",
      "services": [
          {
              "name": "Learner's Licence Preparation",
              "description": "Structured learner's licence prep covering the K53 rules of the road \u2014 pass first time.",
              "tags": [
                  "Learner's Licence",
                  "K53"
              ],
              "serviceImageQuery": "learner licence study guide K53 rules road book desk"
          },
          {
              "name": "Yard & Road Test Lessons",
              "description": "K53 yard manoeuvres and road test preparation with the routes your examiner will use.",
              "tags": [
                  "Yard Test",
                  "Road Test"
              ],
              "serviceImageQuery": "driving yard test parallel parking cones manoeuvre car"
          },
          {
              "name": "Nervous Driver Programme",
              "description": "Patient, confidence-building lessons for adults learning to drive later in life or after a break.",
              "tags": [
                  "Nervous Drivers",
                  "Adults"
              ],
              "serviceImageQuery": "nervous adult learner driving lesson steering wheel instructor calm"
          },
          {
              "name": "Code 10 & Code 14 Heavy Vehicle",
              "description": "Professional heavy vehicle licence training for Code 10 and Code 14 with yard and road preparation.",
              "tags": [
                  "Code 10",
                  "Heavy Vehicle"
              ],
              "serviceImageQuery": "heavy truck driving training yard manoeuvre code 14 vehicle"
          },
          {
              "name": "Defensive Driving Course",
              "description": "Advanced defensive driving techniques for safer road awareness and accident avoidance.",
              "tags": [
                  "Defensive Driving",
                  "Advanced"
              ],
              "serviceImageQuery": "defensive driving course car road safety training"
          },
          {
              "name": "Motorcycle & Scooter Lessons",
              "description": "Code A1 and A motorcycle training from basics to licence-ready, including bike supplied.",
              "tags": [
                  "Motorcycle",
                  "Code A"
              ],
              "serviceImageQuery": "motorcycle riding lesson training cones practice"
          }
      ],
      "galleryHeading": "New Drivers, New Freedom",
      "aboutHeading": "Driving taught with <em>patience</em>",
      "aboutText": "We have trained over 3,000 Cape Town drivers since 2006. Our pass rate is among the highest in the Western Cape because our instructors are accredited, methodical, and patient enough to take the time each student needs.\n\nWe don't rush. We get you ready.",
      "aboutMission": "We believe a confident, capable driver is a safe driver \u2014 and that takes proper training, not shortcuts.",
      "stats": [
          {
              "value": "18+",
              "label": "Years Teaching",
              "sublabel": "since 2006"
          },
          {
              "value": "3,000+",
              "label": "Drivers Trained",
              "sublabel": "all ages & experience"
          },
          {
              "value": "84%",
              "label": "First-Time Pass Rate",
              "sublabel": "road test"
          },
          {
              "value": "4.8\u2605",
              "label": "Google Rating",
              "sublabel": "from 600+ reviews"
          }
      ],
      "contactHeading": "Ready to start your lessons?",
      "stepsHeading": "To Get Your Licence",
      "testimonial": {
          "quote": "Passed my road test first time. My instructor was endlessly patient and incredibly thorough.",
          "author": "Zara K., Verified Client",
          "rating": 5
      },
      "imageMood": "confident, fresh, practical",
      "heroImageQuery": "driving school car interior dual controls instructor and learner dashboard steering wheel road view",
      "heroBgImageQuery": "car dashboard night driving road ahead dark background headlights view",
      "ogImageQuery": "driving school car on road with learner L plates instructor student driving lesson",
      "aboutImageQuery": "driving instructor in passenger seat guiding learner student steering wheel car lesson calm",
      "galleryImageQueries": [
          "learner driver hands on steering wheel car road view dashboard mirrors driving lesson",
          "car parallel parking between cones yard test K53 practice driving school manoeuvre",
          "K53 learner licence study guide road signs rules of the road book desk",
          "driving school branded car with L plates on road student driving confidently"
      ],
      "processSteps": [
          {
              "step": "1",
              "title": "Book & Assess",
              "description": "First lesson assesses your current level and sets the right starting point."
          },
          {
              "step": "2",
              "title": "Structured Lessons",
              "description": "K53-focused lessons covering yard and road systematically until test-ready."
          },
          {
              "step": "3",
              "title": "Test Booked & Passed",
              "description": "We help you book your test and prepare specifically for your test routes."
          }
      ]
  },
  "Preschool / Cr\u00e8che": {
      "heroEyebrow": "PRESCHOOL CAPE TOWN",
      "heroAccent": "Ages 2\u20136. Registered & inspected.",
      "tagline": "Where curiosity gets its first <em>yes</em>",
      "heroSubtitle": "A nurturing, stimulating preschool environment where children develop confidence, creativity, and a love of learning.",
      "ctaPrimary": "Book a Tour",
      "ctaSecondary": "Our Programme",
      "ctaNote": "DoE registered \u00b7 Limited spaces \u00b7 Hot meals included",
      "badge": "Department of Education Registered ECD",
      "servicesHeading": "What We Offer",
      "services": [
          {
              "name": "Early Childhood Development",
              "description": "Play-based learning programme covering literacy, numeracy, motor skills, and social development.",
              "tags": [
                  "ECD",
                  "Play-Based"
              ],
              "serviceImageQuery": "toddlers play-based learning blocks puzzles classroom colourful"
          },
          {
              "name": "Full-Day Care",
              "description": "Safe, stimulating full-day care from 07:00\u201317:30 with qualified teachers and caregivers.",
              "tags": [
                  "Full-Day",
                  "Aftercare"
              ],
              "serviceImageQuery": "children circle time story mat teacher reading classroom"
          },
          {
              "name": "School Readiness Programme",
              "description": "Structured Grade R readiness programme preparing children academically and emotionally for Grade 1.",
              "tags": [
                  "Grade R",
                  "School Readiness"
              ],
              "serviceImageQuery": "grade R school readiness writing pencil grip exercise desk"
          },
          {
              "name": "Outdoor Nature Play Programme",
              "description": "Structured outdoor learning with sensory gardens, mud kitchens, and nature walks to develop curiosity and resilience.",
              "tags": [
                  "Nature Play",
                  "Outdoor Learning"
              ],
              "serviceImageQuery": "sensory garden mud kitchen outdoor play sandpit water table"
          },
          {
              "name": "Holiday Care Programme",
              "description": "Full-day supervised holiday care with themed activities, outings, and creative play for ages 2\u20136.",
              "tags": [
                  "Holiday Care",
                  "School Holidays"
              ],
              "serviceImageQuery": "children holiday care programme playing creative activities"
          },
          {
              "name": "Aftercare & Extended Hours",
              "description": "Extended afternoon supervision with homework support, outdoor play, and a nutritious afternoon snack.",
              "tags": [
                  "Aftercare",
                  "Extended Hours"
              ],
              "serviceImageQuery": "children aftercare programme outdoor playground afternoon"
          }
      ],
      "galleryHeading": "A Day at Preschool",
      "aboutHeading": "Learning through <em>play</em>",
      "aboutText": "The early years are the most formative of a child's life \u2014 which is why we don't treat preschool as simply babysitting. Our programme is curriculum-based, play-centred, and delivered by qualified early childhood educators who love what they do.\n\nWe communicate daily with parents and our door is always open.",
      "aboutMission": "We believe the foundation of a great education is a child who arrives at school excited to learn \u2014 and we build that foundation.",
      "stats": [
          {
              "value": "16+",
              "label": "Years Open",
              "sublabel": "since 2008"
          },
          {
              "value": "80",
              "label": "Maximum Enrolment",
              "sublabel": "intentionally small"
          },
          {
              "value": "6",
              "label": "Qualified Teachers",
              "sublabel": "ECD certified"
          },
          {
              "value": "4.9\u2605",
              "label": "Google Rating",
              "sublabel": "from 300+ reviews"
          }
      ],
      "contactHeading": "Want to book a school tour?",
      "stepsHeading": "To Enrol Your Child",
      "testimonial": {
          "quote": "My son runs to school every morning. He's thriving socially and academically. Wonderful place.",
          "author": "Sage K., Verified Client",
          "rating": 5
      },
      "imageMood": "bright, nurturing, playful",
      "heroImageQuery": "bright colourful preschool classroom interior small tables chairs toys bookshelves learning",
      "heroBgImageQuery": "preschool classroom colourful educational toys blocks shelves bright warm",
      "ogImageQuery": "happy children playing in bright colourful preschool classroom toys learning",
      "aboutImageQuery": "preschool teacher reading storybook to small children sitting on mat circle time classroom",
      "galleryImageQueries": [
          "toddlers playing with building blocks water table sensory play preschool classroom",
          "preschool outdoor playground children climbing frame sandpit playing",
          "grade R child writing letters numbers pencil grip worksheet desk school readiness",
          "preschool children finger painting messy play art activity colourful table smocks"
      ],
      "processSteps": [
          {
              "step": "1",
              "title": "Book a School Tour",
              "description": "Visit us, meet the teachers, and see the environment your child would be in."
          },
          {
              "step": "2",
              "title": "Enrolment & Orientation",
              "description": "Complete enrolment paperwork and attend our parent orientation morning."
          },
          {
              "step": "3",
              "title": "Settling-In Period",
              "description": "Structured two-week settling-in programme to ease the transition."
          }
      ]
  },
  "Training / Skills Academy": {
      "heroEyebrow": "ACCREDITED SKILLS TRAINING",
      "heroAccent": "SETA accredited. CPD recognised.",
      "tagline": "Skills that <em>advance</em> your career",
      "heroSubtitle": "Accredited short courses, learnerships, and professional skills training for individuals and corporate teams.",
      "ctaPrimary": "View Courses",
      "ctaSecondary": "Corporate Training",
      "ctaNote": "SETA accredited \u00b7 Certificates issued \u00b7 Online & classroom options",
      "badge": "Services SETA Accredited Training Provider",
      "servicesHeading": "What We Offer",
      "services": [
          {
              "name": "Accredited Short Courses",
              "description": "SETA-accredited short courses in business, leadership, project management, and compliance.",
              "tags": [
                  "SETA Accredited",
                  "CPD Points"
              ],
              "serviceImageQuery": "classroom training short course whiteboard presentation students"
          },
          {
              "name": "Corporate & In-House Training",
              "description": "Custom training programmes designed and delivered for your team at your premises or online.",
              "tags": [
                  "Corporate Training",
                  "In-House"
              ],
              "serviceImageQuery": "corporate workshop team activity breakout group discussion boardroom"
          },
          {
              "name": "Learnerships & Internships",
              "description": "Structured learnership programmes with workplace experience and nationally recognised qualifications.",
              "tags": [
                  "Learnership",
                  "NQF"
              ],
              "serviceImageQuery": "learnership workplace mentoring young adult practical training"
          },
          {
              "name": "Health & Safety Compliance Courses",
              "description": "OHSA, fire safety, and hazardous chemical handling courses with DoL-accepted certification.",
              "tags": [
                  "OHSA Compliance",
                  "Fire Safety"
              ],
              "serviceImageQuery": "fire safety training extinguisher demonstration workplace PPE"
          },
          {
              "name": "Skills Assessment & RPL",
              "description": "Recognition of Prior Learning evaluations and skills gap analysis for career advancement.",
              "tags": [
                  "RPL",
                  "Skills Assessment"
              ],
              "serviceImageQuery": "skills assessment evaluation training centre professional"
          },
          {
              "name": "Online & Blended Learning",
              "description": "Flexible online courses with optional in-person practicals for working professionals.",
              "tags": [
                  "Online Learning",
                  "Blended"
              ],
              "serviceImageQuery": "online learning laptop virtual training course"
          }
      ],
      "galleryHeading": "In the Classroom",
      "aboutHeading": "Training that <em>transfers</em>",
      "aboutText": "We design training that changes what people actually do at work \u2014 not just what they know. Our facilitators are experienced practitioners, not just trainers. The case studies are real. The skills are applicable immediately.\n\nWe are SETA-accredited and all completions are certificated and recognised.",
      "aboutMission": "We believe skills development is the single most powerful investment an organisation makes in its people.",
      "stats": [
          {
              "value": "13+",
              "label": "Years Training",
              "sublabel": "since 2011"
          },
          {
              "value": "5,000+",
              "label": "Learners Trained",
              "sublabel": "across all programmes"
          },
          {
              "value": "20+",
              "label": "Accredited Courses",
              "sublabel": "short & full qualification"
          },
          {
              "value": "94%",
              "label": "Learner Satisfaction",
              "sublabel": "from post-course surveys"
          }
      ],
      "contactHeading": "Want to discuss training for your team?",
      "stepsHeading": "To Get Certified",
      "testimonial": {
          "quote": "Measurable change in team performance within 6 weeks. Practical, relevant, excellent.",
          "author": "Liezel M., Verified Client",
          "rating": 5
      },
      "imageMood": "professional, focused, empowering",
      "heroImageQuery": "professional training classroom interior rows of desks projector screen whiteboard bright modern",
      "heroBgImageQuery": "corporate training classroom desks chairs projector screen dark modern background",
      "ogImageQuery": "training academy classroom adult students desks projector presentation modern bright",
      "aboutImageQuery": "training facilitator presenting at flipchart whiteboard team discussion corporate workshop engaged",
      "galleryImageQueries": [
          "adult students in training classroom taking notes whiteboard presentation facilitator",
          "corporate team building workshop breakout group activity boardroom collaborative",
          "young adult learnership mentoring practical on-the-job workplace training supervisor",
          "training certificate ceremony group of graduates holding certificates achievement"
      ],
      "processSteps": [
          {
              "step": "1",
              "title": "Needs Assessment",
              "description": "We discuss your learning goals and recommend the most relevant programme."
          },
          {
              "step": "2",
              "title": "Enrol & Attend",
              "description": "Structured programme delivered in-person, online, or blended format."
          },
          {
              "step": "3",
              "title": "Certificated & Recognised",
              "description": "SETA certificate issued on completion \u2014 CPD points recorded where applicable."
          }
      ]
  },
  "Computer / Coding Classes": {
      "heroEyebrow": "CODING CLASSES CAPE TOWN",
      "heroAccent": "Kids, teens & adult beginners",
      "tagline": "Learn to code. Build <em>anything</em>.",
      "heroSubtitle": "Practical coding and computer skills classes for children, teens, and adults \u2014 from Scratch to Python to web development.",
      "ctaPrimary": "Book a Trial Class",
      "ctaSecondary": "Course Overview",
      "ctaNote": "No experience needed \u00b7 Project-based learning \u00b7 Holiday camps available",
      "badge": "Raspberry Pi Foundation Certified Educator",
      "servicesHeading": "What We Teach",
      "services": [
          {
              "name": "Kids Coding (Ages 7\u201312)",
              "description": "Visual coding with Scratch, game design, and robotics introducing programming logic playfully.",
              "tags": [
                  "Scratch",
                  "Robotics"
              ],
              "serviceImageQuery": "kids coding Scratch blocks screen colourful robotics table"
          },
          {
              "name": "Teen Web Development",
              "description": "HTML, CSS, JavaScript, and Python fundamentals for teens building real portfolio projects.",
              "tags": [
                  "Python",
                  "Web Dev"
              ],
              "serviceImageQuery": "teenager coding Python web development laptop screen code"
          },
          {
              "name": "Adult Digital Skills",
              "description": "Beginner computer skills, Microsoft Office, digital literacy, and intro coding for working adults.",
              "tags": [
                  "Digital Literacy",
                  "MS Office"
              ],
              "serviceImageQuery": "adult computer literacy class keyboard mouse monitor basics"
          },
          {
              "name": "Holiday Coding Camps",
              "description": "Intensive one-week coding camps during school holidays — game design, app building, and robotics challenges.",
              "tags": [
                  "Holiday Camp",
                  "Game Design"
              ],
              "serviceImageQuery": "kids coding holiday camp robotics challenge project building"
          },
          {
              "name": "Python & Data Science",
              "description": "Introduction to Python programming, data analysis, and visualisation for teens and adults.",
              "tags": [
                  "Python",
                  "Data Science"
              ],
              "serviceImageQuery": "python coding data science computer programming screen"
          },
          {
              "name": "Game Design & 3D Modelling",
              "description": "Create your own games using Unity or Scratch, plus intro to 3D modelling with Blender.",
              "tags": [
                  "Game Design",
                  "3D Modelling"
              ],
              "serviceImageQuery": "game design development computer 3D modelling screen"
          }
      ],
      "galleryHeading": "In the Lab",
      "aboutHeading": "Coding taught like it <em>matters</em>",
      "aboutText": "We teach coding because the world runs on software \u2014 and we want Cape Town kids and adults to be the ones building it, not just using it. Our classes are small, project-based, and led by developers who can actually teach.\n\nStudents leave with working projects, not just certificates.",
      "aboutMission": "We believe computational thinking is one of the most powerful skills a person can develop in the 21st century.",
      "stats": [
          {
              "value": "8+",
              "label": "Years Teaching",
              "sublabel": "since 2016"
          },
          {
              "value": "1,500+",
              "label": "Students Through",
              "sublabel": "kids, teens & adults"
          },
          {
              "value": "6",
              "label": "Expert Instructors",
              "sublabel": "working developers"
          },
          {
              "value": "4.9\u2605",
              "label": "Google Rating",
              "sublabel": "from 300+ reviews"
          }
      ],
      "contactHeading": "Want to book a free trial class?",
      "stepsHeading": "To Start Coding",
      "testimonial": {
          "quote": "My 10-year-old built his own game in 8 weeks. He is obsessed. Best investment.",
          "author": "David O., Verified Client",
          "rating": 5
      },
      "imageMood": "modern, energetic, creative",
      "heroImageQuery": "modern computer coding lab bright classroom rows of iMac screens students learning programming",
      "heroBgImageQuery": "computer code programming syntax screen dark background JavaScript Python developer monitor",
      "ogImageQuery": "kids coding class bright modern lab computers screens colourful Scratch blocks game project",
      "aboutImageQuery": "coding instructor leaning over student laptop debugging Python code screen classroom teaching",
      "galleryImageQueries": [
          "child using Scratch visual coding blocks on colourful screen game design primary school classroom",
          "teenager building website HTML CSS code editor screen laptop modern coding class",
          "adult learning Microsoft Office Excel spreadsheet computer screen beginner digital literacy class",
          "student presenting completed coding project website on monitor to classmates standing proud"
      ],
      "processSteps": [
          {
              "step": "1",
              "title": "Free Trial Class",
              "description": "Attend one free class and see if the learning style is the right fit."
          },
          {
              "step": "2",
              "title": "Enrol in a Course",
              "description": "Choose your programme \u2014 term-based or intensive holiday camp."
          },
          {
              "step": "3",
              "title": "Build Real Projects",
              "description": "Every course ends with a working project the student built themselves."
          }
      ]
  },
  "First Aid / Safety Training": {
      "heroEyebrow": "FIRST AID TRAINING CAPE TOWN",
      "heroAccent": "SAQA, DoL & HPCSA accredited",
      "tagline": "Be the person who <em>knows</em> what to do",
      "heroSubtitle": "Accredited first aid, CPR, and workplace safety training for individuals, teams, and compliance-required businesses.",
      "ctaPrimary": "Book a Course",
      "ctaSecondary": "Course Dates",
      "ctaNote": "Group bookings \u00b7 DoL certificates issued \u00b7 On-site training available",
      "badge": "DoL Accredited First Aid Training Provider",
      "servicesHeading": "Our Courses",
      "services": [
          {
              "name": "Level 1, 2 & 3 First Aid",
              "description": "DoL-accredited First Aid Level 1 to 3 courses with practical assessment and certification.",
              "tags": [
                  "First Aid Level 1",
                  "DoL Certified"
              ],
              "serviceImageQuery": "CPR chest compressions mannequin training hands practical"
          },
          {
              "name": "CPR & AED Training",
              "description": "Basic life support, CPR, and AED defibrillator training for workplace and public responders.",
              "tags": [
                  "CPR",
                  "AED"
              ],
              "serviceImageQuery": "AED defibrillator pads placement mannequin training demonstration"
          },
          {
              "name": "Workplace Safety & OHSA Compliance",
              "description": "Occupational Health and Safety Act compliance training for employers and safety officers.",
              "tags": [
                  "OHSA",
                  "Workplace Safety"
              ],
              "serviceImageQuery": "workplace safety fire extinguisher PPE hard hat training"
          },
          {
              "name": "Wilderness & Outdoor First Aid",
              "description": "Extended first aid for hikers, trail runners, and outdoor guides covering remote-area emergency response.",
              "tags": [
                  "Wilderness",
                  "Outdoor First Aid"
              ],
              "serviceImageQuery": "wilderness first aid outdoor backpack splint bandage trail"
          },
          {
              "name": "Fire Safety & Evacuation",
              "description": "Fire marshal training, evacuation drills, and fire extinguisher use for offices and factories.",
              "tags": [
                  "Fire Safety",
                  "Evacuation"
              ],
              "serviceImageQuery": "fire marshal training using fire extinguisher on small controlled fire workplace safety drill"
          },
          {
              "name": "Working at Heights",
              "description": "Fall protection awareness and certification for construction, maintenance, and industrial workers.",
              "tags": [
                  "Heights",
                  "Fall Protection"
              ],
              "serviceImageQuery": "worker wearing safety harness hard hat working at heights on scaffolding construction fall protection"
          }
      ],
      "galleryHeading": "Training That Saves Lives",
      "aboutHeading": "Safety skills that <em>matter</em>",
      "aboutText": "We have been training first responders and workplace safety officers since 2008. Our courses are practical first and theoretical second \u2014 because in an emergency, what matters is what you can actually do.\n\nAll certifications are DoL-compliant and accepted by DHET and SAQA-registered bodies.",
      "aboutMission": "We believe every workplace should have someone who can confidently respond in the first critical minutes of an emergency.",
      "stats": [
          {
              "value": "16+",
              "label": "Years Training",
              "sublabel": "since 2008"
          },
          {
              "value": "10,000+",
              "label": "Learners Certified",
              "sublabel": "first aid & safety"
          },
          {
              "value": "DoL",
              "label": "Accreditation Level",
              "sublabel": "Level 1, 2 & 3 First Aid"
          },
          {
              "value": "4.8\u2605",
              "label": "Google Rating",
              "sublabel": "from 400+ reviews"
          }
      ],
      "contactHeading": "Want to book a first aid course?",
      "stepsHeading": "To Get Certified",
      "testimonial": {
          "quote": "Used my training for real 3 months later. It worked. That instructor potentially saved a life.",
          "author": "Drew M., Verified Client",
          "rating": 5
      },
      "imageMood": "confident, practical, professional",
      "heroImageQuery": "first aid CPR training classroom mannequins bandages red cross equipment bright room",
      "heroBgImageQuery": "first aid kit open bandages stethoscope medical supplies dark background",
      "ogImageQuery": "first aid training class CPR mannequins students practising chest compressions bright room",
      "aboutImageQuery": "first aid instructor demonstrating arm bandaging technique to student in training room",
      "galleryImageQueries": [
          "group of students practising CPR chest compressions on mannequins first aid training floor",
          "AED defibrillator device open with electrode pads attached to mannequin training demonstration",
          "workplace fire safety training group using fire extinguisher on controlled fire outdoor drill",
          "first aid recovery position demonstration instructor positioning patient on floor training room"
      ],
      "processSteps": [
          {
              "step": "1",
              "title": "Choose Your Course Level",
              "description": "Select Level 1, 2, or 3 based on your role and workplace requirements."
          },
          {
              "step": "2",
              "title": "Attend & Practise",
              "description": "One or two-day practical and theory training with qualified facilitators."
          },
          {
              "step": "3",
              "title": "Certified & Compliant",
              "description": "DoL certificate issued \u2014 valid for 3 years and OHSA compliant."
          }
      ]
  },
  "Auto Mechanic / Workshop": {
      "heroEyebrow": "MOTOR WORKSHOP CAPE TOWN",
      "heroAccent": "All makes. Computerised diagnostics.",
      "tagline": "Your car, <em>properly</em> looked after",
      "heroSubtitle": "Full-service motor workshop for logbook services, repairs, diagnostics, and everything your vehicle needs to run perfectly.",
      "ctaPrimary": "Book a Service",
      "ctaSecondary": "What We Fix",
      "ctaNote": "Manufacturer warranty intact \u00b7 Courtesy car available \u00b7 Online booking",
      "badge": "RMI Registered Motor Workshop",
      "servicesHeading": "What We Do",
      "services": [
          {
              "name": "Logbook & Major Services",
              "description": "Full manufacturer-specified services with genuine or OEM parts that keep your warranty intact.",
              "tags": [
                  "Logbook Service",
                  "OEM Parts"
              ],
              "serviceImageQuery": "car engine oil change service workshop lift"
          },
          {
              "name": "Diagnostics & Repairs",
              "description": "Computerised fault code scanning, mechanical repairs, and electrical fault finding on all makes.",
              "tags": [
                  "Diagnostics",
                  "Computer Scan"
              ],
              "serviceImageQuery": "OBD2 diagnostic scanner plugged into car dashboard"
          },
          {
              "name": "Brakes, Tyres & Suspension",
              "description": "Brake pads and discs, wheel alignment, shock absorbers, and tyre replacement and balancing.",
              "tags": [
                  "Brakes",
                  "Wheel Alignment"
              ],
              "serviceImageQuery": "brake disc pads replacement close-up car wheel"
          },
          {
            "name": "Air Conditioning & Regassing",
            "description": "Full aircon diagnostic, regassing, compressor repairs, and cabin filter replacements for all makes.",
            "tags": [
              "Aircon",
              "Regassing"
            ],
            "serviceImageQuery": "car aircon system regas gauge hose connected"
          },
          {
              "name": "Pre-Purchase Inspections",
              "description": "Comprehensive vehicle inspections before you buy, covering engine, gearbox, suspension, and body condition.",
              "tags": [
                  "Pre-Purchase",
                  "Inspection"
              ],
              "serviceImageQuery": "mechanic inspecting car engine pre purchase check"
          },
          {
              "name": "Clutch & Gearbox Repairs",
              "description": "Manual and automatic gearbox rebuilds, clutch replacements, and drivetrain diagnostics.",
              "tags": [
                  "Clutch",
                  "Gearbox"
              ],
              "serviceImageQuery": "gearbox clutch repair mechanic workshop transmission"
          }
      ],
      "galleryHeading": "In the Workshop",
      "aboutHeading": "Mechanics you can actually <em>trust</em>",
      "aboutText": "We are an RMI-registered workshop which means our technicians are qualified and our workshop meets industry standards. We use a job card for every vehicle \u2014 you know exactly what was done, what parts were used, and what it cost.\n\nNo mystery charges. No unnecessary work. Just honest, skilled mechanics.",
      "aboutMission": "We believe your car should be maintained by people who take genuine pride in their work \u2014 and who explain everything they do.",
      "stats": [
          {
              "value": "17+",
              "label": "Years Servicing",
              "sublabel": "since 2007"
          },
          {
              "value": "8,000+",
              "label": "Vehicles Serviced",
              "sublabel": "all makes & models"
          },
          {
              "value": "8",
              "label": "Qualified Technicians",
              "sublabel": "incl. master technician"
          },
          {
              "value": "4.8\u2605",
              "label": "Google Rating",
              "sublabel": "from 800+ reviews"
          }
      ],
      "contactHeading": "Ready to book your service?",
      "testimonial": {
          "quote": "First time in 10 years I left a workshop not wondering if I was overcharged. Brilliant.",
          "author": "Derek M., Verified Client",
          "rating": 5
      },
      "imageMood": "technical, clean, professional",
      "heroImageQuery": "car raised on hydraulic lift mechanic working underneath in garage workshop",
      "heroBgImageQuery": "close-up car engine bay oil cap hoses dark moody workshop",
      "ogImageQuery": "mechanic tools spanners wrenches laid out on workshop bench",
      "aboutImageQuery": "male mechanic in overalls working under open car bonnet hood engine",
      "galleryImageQueries": [
          "car raised on hydraulic lift in clean modern auto workshop",
          "mechanic using laptop diagnostic tool plugged into car engine bay",
          "close-up brake disc caliper pads new car repair",
          "auto mechanic workshop interior tool wall pegboard wrenches organised"
      ],
      "features": [
        { "name": "Manufacturer Warranty Protected", "description": "We service according to manufacturer specifications with OEM parts, so your warranty stays intact \u2014 without dealership prices.", "imageQuery": "mechanic plugging OBD laptop diagnostic tool into car engine bay" },
        { "name": "Transparent Pricing, Always", "description": "You get a detailed quote before we start, and we call you before doing anything extra. No nasty surprises on collection day.", "imageQuery": "mechanic showing repair quote on clipboard to car owner in workshop" },
        { "name": "Courtesy Car Available", "description": "Need to get to work while your car is in? We offer a courtesy vehicle so your day isn't disrupted.", "imageQuery": "happy customer receiving car keys from mechanic at workshop counter" }
      ],
      "processSteps": [
          {
              "step": "1",
              "title": "Drop Off & Brief",
              "description": "Drop your car and tell us what you're experiencing \u2014 we listen before we touch anything."
          },
          {
              "step": "2",
              "title": "Diagnose & Quote",
              "description": "Full diagnostic and written quote approved by you before any work starts."
          },
          {
              "step": "3",
              "title": "Serviced & Collected",
              "description": "Work completed, test driven, and job card provided on collection."
          }
      ]
  },
  "Panel Beater / Auto Body": {
      "heroEyebrow": "PANEL BEATING CAPE TOWN",
      "heroAccent": "Insurance & private. All makes.",
      "tagline": "Your car, back to <em>factory</em> condition",
      "heroSubtitle": "Professional panel beating, spray painting, and structural repair for accident-damaged vehicles \u2014 approved by all insurers.",
      "ctaPrimary": "Get a Quote",
      "ctaSecondary": "Insurance Claims",
      "ctaNote": "All insurers accepted \u00b7 Courtesy car \u00b7 VASA approved",
      "badge": "VASA Registered Auto Body Repairer",
      "servicesHeading": "What We Repair",
      "services": [
          {
              "name": "Accident Damage & Panel Repairs",
              "description": "Structural and cosmetic panel repairs to manufacturer specifications using approved repair techniques.",
              "tags": [
                  "Panel Repair",
                  "Structural"
              ],
              "serviceImageQuery": "car body panel dent repair hammer filler workshop"
          },
          {
              "name": "Spray Painting & Refinishing",
              "description": "Full respray and touch-up painting using computerised colour matching for a perfect finish.",
              "tags": [
                  "Spray Paint",
                  "Colour Match"
              ],
              "serviceImageQuery": "car being spray painted in booth protective suit"
          },
          {
              "name": "Insurance Claims Assistance",
              "description": "We liaise directly with your insurer, manage the claim, and keep you updated throughout.",
              "tags": [
                  "Insurance Claims",
                  "Courtesy Car"
              ],
              "serviceImageQuery": "accident damaged car front bumper before repair"
          },
          {
            "name": "Windscreen & Glass Replacement",
            "description": "Chip repairs and full windscreen replacements using OEM-spec glass — fitted on-site, insurance-approved.",
            "tags": [
              "Windscreen",
              "Chip Repair"
            ],
            "serviceImageQuery": "windscreen glass replacement fitted car workshop suction"
          },
          {
              "name": "Dent & Scratch Removal",
              "description": "Paintless dent repair and micro-scratch removal to restore your vehicle without full respray.",
              "tags": [
                  "PDR",
                  "Scratch Removal"
              ],
              "serviceImageQuery": "paintless dent repair car body panel removal"
          },
          {
              "name": "Custom Paint & Vinyl Wraps",
              "description": "Full custom colour changes, matte finishes, and vinyl wrapping for a fresh new look.",
              "tags": [
                  "Custom Paint",
                  "Vinyl Wrap"
              ],
              "serviceImageQuery": "car vinyl wrap custom paint colour change workshop"
          }
      ],
      "galleryHeading": "Before & After",
      "aboutHeading": "Panel work done with <em>perfection</em>",
      "aboutText": "We are VASA-registered and approved by all major South African insurers. Our colour matching is computerised \u2014 we don't guess. Every repair is signed off by our quality controller before the car leaves the shop.\n\nWe treat every car as if it's our own.",
      "aboutMission": "We believe accident damage repairs should return your vehicle to exactly the condition it was in before the incident.",
      "stats": [
          {
              "value": "21+",
              "label": "Years Repairing",
              "sublabel": "since 2003"
          },
          {
              "value": "6,000+",
              "label": "Vehicles Repaired",
              "sublabel": "insurance & private"
          },
          {
              "value": "All",
              "label": "Major Insurers Approved",
              "sublabel": "direct billing available"
          },
          {
              "value": "4.8\u2605",
              "label": "Google Rating",
              "sublabel": "from 500+ reviews"
          }
      ],
      "contactHeading": "Need an accident repair quote?",
      "testimonial": {
          "quote": "You literally cannot see where the damage was. The colour match is perfect. Outstanding work.",
          "author": "Jacqui H., Verified Client",
          "rating": 5
      },
      "imageMood": "precise, professional, clean",
      "heroImageQuery": "man in protective suit spray painting car panel in booth orange sparks",
      "heroBgImageQuery": "auto body spray paint booth dark interior car masked off tape",
      "ogImageQuery": "panel beater using body filler sanding car fender dent repair",
      "aboutImageQuery": "man wet sanding car body panel in auto body workshop",
      "galleryImageQueries": [
          "car fender before and after dent repair panel beating",
          "car inside spray paint booth freshly painted red",
          "auto body repair shop interior car on stand tools organised",
          "gleaming repaired car after full respray showroom finish"
      ],
      "features": [
        { "name": "Insurance Claims Handled for You", "description": "We deal directly with all major insurers. From assessment to authorisation to collection, we manage the entire claims process.", "imageQuery": "panel beater inspecting dented car fender damage assessment clipboard" },
        { "name": "Factory-Match Paint Technology", "description": "Our computerised colour-matching system ensures your repair is invisible. No mismatched panels, no orange peel \u2014 just factory finish.", "imageQuery": "man spraying car panel in paint booth protective suit mask" },
        { "name": "Lifetime Workmanship Guarantee", "description": "We stand behind every repair with a written lifetime guarantee on workmanship. If the paint peels or the filler cracks, we fix it.", "imageQuery": "freshly repaired painted car panel gleaming perfect finish" }
      ],
      "processSteps": [
          {
              "step": "1",
              "title": "Assessment & Quote",
              "description": "We assess damage, photograph, and provide a written repair quote."
          },
          {
              "step": "2",
              "title": "Insurer Liaison",
              "description": "We manage the insurance claim and authorisation on your behalf."
          },
          {
              "step": "3",
              "title": "Repaired & Collected",
              "description": "Repaired to factory spec, quality inspected, and ready for collection."
          }
      ]
  },
  "Car Wash / Detailing": {
      "heroEyebrow": "AUTO DETAILING CAPE TOWN",
      "heroAccent": "Hand wash, clay bar & ceramic coating",
      "tagline": "Your car, spotless inside and <em>out</em>",
      "heroSubtitle": "Professional car washing, full valet, and paint correction and ceramic coating by trained detailers.",
      "ctaPrimary": "Book a Detail",
      "ctaSecondary": "Our Packages",
      "ctaNote": "Hand wash only \u00b7 Ceramic coating available \u00b7 Fleet accounts welcome",
      "badge": "International Detailing Association Member",
      "servicesHeading": "Our Services",
      "services": [
          {
              "name": "Full Interior & Exterior Valet",
              "description": "Comprehensive interior deep clean and hand wash exterior valet \u2014 every surface addressed.",
              "tags": [
                  "Full Valet",
                  "Interior Deep Clean"
              ],
              "serviceImageQuery": "man vacuuming car interior seats dashboard deep clean valet"
          },
          {
              "name": "Paint Correction",
              "description": "Machine polishing to remove swirl marks, scratches, and oxidation \u2014 restoring true paint depth.",
              "tags": [
                  "Paint Correction",
                  "Swirl Removal"
              ],
              "serviceImageQuery": "dual action polisher buffing car paint removing swirl marks close-up"
          },
          {
              "name": "Ceramic Coating",
              "description": "Professional-grade ceramic coating for long-term paint protection, gloss, and hydrophobic finish.",
              "tags": [
                  "Ceramic Coating",
                  "Paint Protection"
              ],
              "serviceImageQuery": "ceramic coating applied to car hood water beading"
          },
          {
            "name": "Engine Bay Detailing",
            "description": "Deep clean and dressing of the engine bay — because what’s under the bonnet deserves the same attention as the paint.",
            "tags": [
              "Engine Bay",
              "Deep Clean"
            ],
            "serviceImageQuery": "engine bay cleaned detailed shiny hoses cover"
          },
          {
              "name": "Headlight Restoration",
              "description": "UV-damaged and yellowed headlight lens polishing and protective coating for improved visibility.",
              "tags": [
                  "Headlights",
                  "Restoration"
              ],
              "serviceImageQuery": "headlight restoration polishing car lens cleaning"
          },
          {
              "name": "Upholstery & Leather Care",
              "description": "Deep cleaning, conditioning, and stain removal for leather and fabric seats and trim.",
              "tags": [
                  "Upholstery",
                  "Leather Care"
              ],
              "serviceImageQuery": "car interior upholstery leather cleaning detailing"
          }
      ],
      "galleryHeading": "Showroom Finish",
      "aboutHeading": "Detailing done <em>obsessively</em>",
      "aboutText": "We are detailers, not car washers. The distinction is everything. Every car that enters our bay is assessed individually \u2014 the paint, the leather, the glass. We use the correct product for each surface and we don't rush.\n\nOur ceramic coatings are professionally applied by certified applicators.",
      "aboutMission": "We believe your car should leave our bay looking better than it has in years \u2014 possibly better than new.",
      "stats": [
          {
              "value": "9+",
              "label": "Years Detailing",
              "sublabel": "since 2015"
          },
          {
              "value": "3,000+",
              "label": "Cars Detailed",
              "sublabel": "valet to ceramic"
          },
          {
              "value": "5yr",
              "label": "Ceramic Warranty",
              "sublabel": "on premium coating"
          },
          {
              "value": "4.9\u2605",
              "label": "Google Rating",
              "sublabel": "from 400+ reviews"
          }
      ],
      "contactHeading": "Ready to book your detail?",
      "testimonial": {
          "quote": "Paint correction on a 12-year-old car. It looks better than it did in 2014. Remarkable.",
          "author": "Brendon A., Verified Client",
          "rating": 5
      },
      "imageMood": "glossy, precise, clean",
      "heroImageQuery": "glossy black car hood mirror reflection after professional detailing polish",
      "heroBgImageQuery": "close-up wet glossy car paint water droplets dark reflection",
      "ogImageQuery": "water beading on ceramic coated car hood close-up",
      "aboutImageQuery": "man using dual action polisher machine on car paint detailing",
      "galleryImageQueries": [
          "clean car interior leather seats vacuumed dashboard conditioned",
          "car paint correction polish buffing swirl marks removed close-up",
          "water droplets beading on ceramic coated car bonnet",
          "man hand washing car with foam mitt and soapy bucket"
      ],
      "features": [
        { "name": "Hand Wash Only, No Machines", "description": "Every vehicle is washed by hand using pH-neutral products. No swirl marks, no scratches \u2014 just a finish that's safe for your clear coat.", "imageQuery": "man hand washing car with microfiber mitt soapy foam gentle" },
        { "name": "Interior Deep Clean Specialists", "description": "Leather conditioning, fabric extraction, air vent detailing, and odour removal. We make your cabin feel brand new.", "imageQuery": "detailer cleaning car leather seat with brush and conditioner" },
        { "name": "Ceramic Coating & Paint Protection", "description": "We offer professional ceramic coatings that protect your paint for years, not weeks. One application saves you hundreds in future washes.", "imageQuery": "applying ceramic coating to car bonnet with applicator pad glossy" }
      ],
      "processSteps": [
          {
              "step": "1",
              "title": "Assessment & Package",
              "description": "We inspect your car and recommend the right package for its condition."
          },
          {
              "step": "2",
              "title": "Detailed by Hand",
              "description": "Every surface cleaned or corrected using the correct product and technique."
          },
          {
              "step": "3",
              "title": "Ready & Gleaming",
              "description": "Final inspection done before handover \u2014 we don't release until it's right."
          }
      ]
  },
  "Tyre Shop": {
      "heroEyebrow": "TYRE SHOP CAPE TOWN",
      "heroAccent": "All brands. Same-day fitment.",
      "tagline": "Safe tyres. Smooth <em>rides</em>. Every time.",
      "heroSubtitle": "Quality tyres at competitive prices with professional fitment, balancing, and wheel alignment on all makes and sizes.",
      "ctaPrimary": "Get a Tyre Quote",
      "ctaSecondary": "Find Your Size",
      "ctaNote": "Same-day fitment \u00b7 Online quote \u00b7 Puncture repairs while you wait",
      "badge": "NTSA Registered Tyre Dealer",
      "servicesHeading": "What We Do",
      "services": [
          {
              "name": "New Tyre Supply & Fitment",
              "description": "Michelin, Bridgestone, Continental, and budget tyres in all sizes \u2014 fitted same day.",
              "tags": [
                  "New Tyres",
                  "Michelin"
              ],
              "serviceImageQuery": "mechanic holding new tyre next to car wheel in tyre shop"
          },
          {
              "name": "Wheel Alignment & Balancing",
              "description": "Computerised four-wheel alignment and dynamic wheel balancing to extend tyre life.",
              "tags": [
                  "Wheel Alignment",
                  "Balancing"
              ],
              "serviceImageQuery": "car on four wheel alignment machine laser beams measuring angles"
          },
          {
              "name": "Puncture Repairs",
              "description": "Professional puncture repairs assessed and fixed while you wait, correctly and permanently.",
              "tags": [
                  "Puncture Repair",
                  "While You Wait"
              ],
              "serviceImageQuery": "tyre puncture repair plug patch workshop close-up"
          },
          {
            "name": "Mag Wheel Repairs & Refurbishment",
            "description": "Buckle repairs, kerb damage restoration, and full mag wheel refinishing to factory-fresh condition.",
            "tags": [
              "Mag Wheels",
              "Refurbishment"
            ],
            "serviceImageQuery": "alloy mag wheel refurbished polished gleaming silver"
          },
          {
              "name": "Fleet & Commercial Tyres",
              "description": "Bulk tyre supply, on-site fitment, and fleet management programmes for trucks and delivery vehicles.",
              "tags": [
                  "Fleet",
                  "Commercial"
              ],
              "serviceImageQuery": "commercial truck tyre fitment fleet vehicle service"
          },
          {
              "name": "Run-Flat & Performance Tyres",
              "description": "Specialist run-flat, performance, and 4x4 tyre supply with expert advice on the best fit for your vehicle.",
              "tags": [
                  "Run-Flat",
                  "Performance"
              ],
              "serviceImageQuery": "performance tyres sports car wheel fitment close up"
          }
      ],
      "galleryHeading": "On the Rims",
      "aboutHeading": "Tyres fitted <em>correctly</em>",
      "aboutText": "Bad tyres and incorrect wheel alignment are among the leading causes of accidents in South Africa. We take tyre safety seriously \u2014 we advise correctly on pressure, tread depth, and tyre condition, and we never fit a tyre we wouldn't put on our own car.\n\nWe carry all major brands at honest prices.",
      "aboutMission": "We believe tyre safety is not negotiable \u2014 and the advice you get here will always put safety first.",
      "stats": [
          {
              "value": "14+",
              "label": "Years Fitting",
              "sublabel": "since 2010"
          },
          {
              "value": "20,000+",
              "label": "Tyres Fitted",
              "sublabel": "all sizes & makes"
          },
          {
              "value": "All",
              "label": "Major Brands Stocked",
              "sublabel": "premium to budget"
          },
          {
              "value": "4.8\u2605",
              "label": "Google Rating",
              "sublabel": "from 600+ reviews"
          }
      ],
      "contactHeading": "Need new tyres or a puncture fixed?",
      "testimonial": {
          "quote": "Best tyre shop in Cape Town. Fair price, fast fitment, no upsell nonsense. Perfect.",
          "author": "Calvin D., Verified Client",
          "rating": 5
      },
      "imageMood": "professional, practical, fast",
      "heroImageQuery": "wall of new tyres stacked on rack in tyre shop store",
      "heroBgImageQuery": "close-up tyre tread pattern rubber texture dark background",
      "ogImageQuery": "new tyres stacked rows on shelf in tyre fitting shop",
      "aboutImageQuery": "mechanic fitting tyre onto wheel rim using tyre changer machine",
      "galleryImageQueries": [
          "car raised on jack mechanic removing wheel tyre change",
          "computerised four wheel alignment machine laser beam readings car",
          "rows of new tyres on display rack tyre shop interior",
          "measuring tyre tread depth with gauge tool close-up"
      ],
      "features": [
        { "name": "Free Alignment Check With Every Fitting", "description": "Every set of new tyres includes a complimentary wheel alignment check \u2014 because new rubber on a misaligned car wears out fast.", "imageQuery": "car on computerised wheel alignment rack laser sensors measuring" },
        { "name": "All Brands, All Budgets", "description": "From premium Continentals to reliable budget options, we stock tyres for every vehicle and every wallet. Honest advice, no upselling.", "imageQuery": "wall rack of new tyres stacked various brands sizes tyre shop" },
        { "name": "While-You-Wait Service", "description": "Most fittings take under 30 minutes. Grab a coffee in our waiting area and we'll have you back on the road before it goes cold.", "imageQuery": "mechanic fitting tyre on wheel balancing machine in tyre bay" }
      ],
      "processSteps": [
          {
              "step": "1",
              "title": "Quote Your Size",
              "description": "Tell us your tyre size online or call in \u2014 we confirm availability and price."
          },
          {
              "step": "2",
              "title": "Drive In & Wait",
              "description": "We fit, balance, and align while you wait \u2014 most appointments under 90 minutes."
          },
          {
              "step": "3",
              "title": "Safety Checked",
              "description": "Pressure set and tread depth noted on your invoice before you leave."
          }
      ]
  },
  "Auto Electrician": {
      "heroEyebrow": "AUTO ELECTRICIAN CAPE TOWN",
      "heroAccent": "Fault diagnosis. Alarm & tracker fitting.",
      "tagline": "Electrical faults <em>found</em> and fixed",
      "heroSubtitle": "Specialist auto electrical diagnostics, fault finding, alarm and tracker installation for all vehicle makes.",
      "ctaPrimary": "Book a Diagnostic",
      "ctaSecondary": "Our Services",
      "ctaNote": "Same-day appointments \u00b7 All makes \u00b7 Finance tracker installations",
      "badge": "Institute of the Motor Industry Registered",
      "servicesHeading": "What We Fix",
      "services": [
          {
              "name": "Electrical Fault Finding",
              "description": "Advanced OBD diagnostics, wiring fault tracing, and electrical system repairs on all makes.",
              "tags": [
                  "Diagnostics",
                  "Fault Finding"
              ],
              "serviceImageQuery": "car electrical diagnostic scan tool plugged in"
          },
          {
              "name": "Alarm & Immobiliser",
              "description": "Vehicle alarm, immobiliser, and central locking system installation and repairs.",
              "tags": [
                  "Alarm",
                  "Immobiliser"
              ],
              "serviceImageQuery": "car alarm system keypad immobiliser installed dashboard"
          },
          {
              "name": "Trackers & Dash Cameras",
              "description": "GPS tracker and dash camera installation for personal and fleet vehicles.",
              "tags": [
                  "GPS Tracker",
                  "Dash Cam"
              ],
              "serviceImageQuery": "GPS tracker device installed under vehicle dashboard"
          },
          {
            "name": "Alternator & Starter Motor Repairs",
            "description": "Alternator rebuilds, starter motor replacements, and charging system diagnostics to keep you turning over first time.",
            "tags": [
              "Alternator",
              "Starter Motor"
            ],
            "serviceImageQuery": "car alternator starter motor removed engine bay parts"
          },
          {
              "name": "LED & HID Lighting Upgrades",
              "description": "Headlight, fog light, and interior LED conversions for improved visibility and modern aesthetics.",
              "tags": [
                  "LED Upgrade",
                  "Lighting"
              ],
              "serviceImageQuery": "LED headlight upgrade car auto electrician installation"
          },
          {
              "name": "Wiring & Loom Repairs",
              "description": "Full wiring harness repairs, loom replacements, and short-circuit diagnostics for all vehicle makes.",
              "tags": [
                  "Wiring",
                  "Loom Repair"
              ],
              "serviceImageQuery": "car wiring harness repair auto electrician diagnostic"
          }
      ],
      "galleryHeading": "Wired Right",
      "aboutHeading": "Auto electrical, <em>genuinely</em> sorted",
      "aboutText": "Auto electrical faults are notoriously difficult to diagnose \u2014 they hide, they appear and disappear, and they resist guesswork. We are specialists who approach every fault systematically with the right diagnostic equipment.\n\nWe are honest about what we find and we don't replace components unnecessarily.",
      "aboutMission": "We believe every electrical fault has a cause and a solution \u2014 and finding both correctly is the only real repair.",
      "stats": [
          {
              "value": "13+",
              "label": "Years in Auto Electrical",
              "sublabel": "since 2011"
          },
          {
              "value": "4,000+",
              "label": "Vehicles Diagnosed",
              "sublabel": "all makes & models"
          },
          {
              "value": "500+",
              "label": "Trackers Installed",
              "sublabel": "personal & fleet"
          },
          {
              "value": "4.8\u2605",
              "label": "Google Rating",
              "sublabel": "from 350+ reviews"
          }
      ],
      "contactHeading": "Got an electrical gremlin? Let's find it.",
      "testimonial": {
          "quote": "Intermittent fault that defeated three other workshops. Found and fixed in two hours.",
          "author": "Rowan B., Verified Client",
          "rating": 5
      },
      "imageMood": "technical, precise, professional",
      "heroImageQuery": "car engine bay wiring harness electrical connectors fuses close-up",
      "heroBgImageQuery": "car wiring loom cables connectors dark engine bay close-up",
      "ogImageQuery": "OBD2 diagnostic scan tool plugged into car dashboard port",
      "aboutImageQuery": "auto electrician man testing car wiring with digital multimeter",
      "galleryImageQueries": [
          "OBD diagnostic scanner screen fault codes car engine bay",
          "car alarm immobiliser keypad module installed under dashboard",
          "dashcam camera mounted on car windscreen interior view",
          "electrician soldering car wiring repair workshop close-up"
      ],
      "features": [
        { "name": "Advanced Diagnostic Equipment", "description": "We use dealer-level diagnostic tools to read fault codes, trace wiring issues, and pinpoint electrical problems \u2014 not guess at them.", "imageQuery": "OBD2 diagnostic scanner screen showing fault codes plugged into car" },
        { "name": "Aftermarket Installation Specialists", "description": "Towbars, spotlights, dual-battery systems, dashcams \u2014 we install aftermarket accessories properly, with no warranty issues.", "imageQuery": "man installing towbar wiring harness underneath vehicle rear" },
        { "name": "Mobile Service Available", "description": "Car won't start? We come to you with a fully equipped mobile unit. Roadside diagnosis and repair without a tow truck.", "imageQuery": "mobile mechanic working on car engine roadside with service van" }
      ],
      "processSteps": [
          {
              "step": "1",
              "title": "Drop Off & Describe",
              "description": "Tell us what you're experiencing \u2014 we listen before we scan."
          },
          {
              "step": "2",
              "title": "Full Diagnostic",
              "description": "OBD scan, wiring inspection, and systematic fault isolation."
          },
          {
              "step": "3",
              "title": "Fixed & Road Tested",
              "description": "Fault resolved, tested on the road, and documented on the job card."
          }
      ]
  },
  "Tow Truck / Roadside Assist": {
      "heroEyebrow": "TOWING & ROADSIDE CAPE TOWN",
      "heroAccent": "24/7. Anywhere in the Cape Peninsula.",
      "tagline": "Stranded? We're <em>already</em> on our way.",
      "heroSubtitle": "24-hour towing, roadside assistance, and vehicle recovery across Cape Town and the Cape Peninsula.",
      "ctaPrimary": "Call Now \u2014 24/7",
      "ctaSecondary": "Our Services",
      "ctaNote": "Average 30-min response \u00b7 Insurance approved \u00b7 No call-out fee",
      "badge": "Towing Association of SA Member",
      "servicesHeading": "What We Do",
      "services": [
          {
              "name": "Vehicle Towing",
              "description": "Flatbed and wheel-lift towing for accident vehicles, breakdowns, and repossessions, 24/7.",
              "tags": [
                  "Towing",
                  "Flatbed"
              ],
              "serviceImageQuery": "flatbed tow truck loading broken down car ramp"
          },
          {
              "name": "Roadside Assistance",
              "description": "Battery jump-start, tyre changes, fuel delivery, and lockout service any time, any location.",
              "tags": [
                  "Jump Start",
                  "Fuel Delivery"
              ],
              "serviceImageQuery": "battery jump start cables connected car engine roadside"
          },
          {
              "name": "Accident & Recovery",
              "description": "Accident scene vehicle recovery, secure storage, and insurance liaison support.",
              "tags": [
                  "Accident Recovery",
                  "Secure Storage"
              ],
              "serviceImageQuery": "accident damaged vehicle being winched onto tow truck"
          },
          {
            "name": "Long-Distance Towing",
            "description": "Interstate and long-haul vehicle transport between cities — fully insured, GPS-tracked, and door-to-door.",
            "tags": [
              "Long Distance",
              "Vehicle Transport"
            ],
            "serviceImageQuery": "flatbed truck loaded car highway long distance transport"
          },
          {
              "name": "Flatbed & Specialised Transport",
              "description": "Low-loader and flatbed transport for luxury, vintage, and non-running vehicles.",
              "tags": [
                  "Flatbed",
                  "Specialised"
              ],
              "serviceImageQuery": "flatbed tow truck loading luxury car transport"
          },
          {
              "name": "Battery Jump-Start & Tyre Change",
              "description": "On-the-spot battery jump-starts, flat tyre changes, and fuel delivery to get you moving again.",
              "tags": [
                  "Jump-Start",
                  "Tyre Change"
              ],
              "serviceImageQuery": "roadside assistance battery jump start vehicle breakdown"
          }
      ],
      "galleryHeading": "On the Road",
      "aboutHeading": "Fast help when you need it <em>most</em>",
      "aboutText": "Breakdowns and accidents happen at the worst times. We have been the calm, fast response Cape Town drivers count on since 2007 \u2014 day or night, public holidays, and when the rain is coming sideways.\n\nOur operators are professional, our vehicles are modern, and our response times are measured.",
      "aboutMission": "We believe when you call a tow truck, you need someone professional who arrives fast \u2014 not someone who adds to the stress.",
      "stats": [
          {
              "value": "17+",
              "label": "Years Towing",
              "sublabel": "since 2007"
          },
          {
              "value": "20,000+",
              "label": "Call-Outs Attended",
              "sublabel": "Cape Town & surrounds"
          },
          {
              "value": "30min",
              "label": "Average Response Time",
              "sublabel": "Cape Peninsula"
          },
          {
              "value": "4.8\u2605",
              "label": "Google Rating",
              "sublabel": "from 700+ reviews"
          }
      ],
      "contactHeading": "Broken down or had an accident?",
      "testimonial": {
          "quote": "Arrived in 22 minutes at midnight. Professional, calm, and got my car sorted. Excellent.",
          "author": "Yolanda T., Verified Client",
          "rating": 5
      },
      "imageMood": "urgent, reliable, professional",
      "heroImageQuery": "yellow flatbed tow truck loading white car on ramp roadside highway",
      "heroBgImageQuery": "tow truck amber flashing lights on dark road night breakdown",
      "ogImageQuery": "flatbed tow truck carrying car driving on highway road",
      "aboutImageQuery": "tow truck driver securing car with straps on flatbed trailer",
      "galleryImageQueries": [
          "flatbed tow truck loaded with car driving on highway road",
          "man connecting jumper cables battery jump start car roadside",
          "tow truck crane winch recovering crashed car accident scene",
          "tow truck with amber warning lights operating on road at night"
      ],
      "features": [
        { "name": "Average 30-Minute Response Time", "description": "We have vehicles stationed across the metro. When you're stranded, you won't wait long \u2014 our average arrival is under 30 minutes.", "imageQuery": "tow truck driving fast on road responding to emergency call" },
        { "name": "Flatbed Towing for Zero Damage", "description": "We use flatbed trucks that lift your vehicle clear of the road. No dragging, no diff damage, no scratched bumpers.", "imageQuery": "car being loaded onto flatbed tow truck ramp straps" },
        { "name": "24/7 All-Hours Service", "description": "Breakdowns don't keep office hours and neither do we. Call any time, any day \u2014 including weekends and public holidays.", "imageQuery": "tow truck with flashing amber lights on dark road at night" }
      ],
      "processSteps": [
          {
              "step": "1",
              "title": "Call & Share Location",
              "description": "Call our 24/7 line and share your location \u2014 we dispatch immediately."
          },
          {
              "step": "2",
              "title": "We Arrive Fast",
              "description": "Professional operator arrives within 30 minutes across Cape Town."
          },
          {
              "step": "3",
              "title": "Recovered & Assisted",
              "description": "Vehicle towed to your preferred workshop or we resolve roadside."
          }
      ]
  },
  "Motorcycle Shop": {
      "heroEyebrow": "MOTORCYCLE SHOP CAPE TOWN",
      "heroAccent": "Sales, service & genuine parts",
      "tagline": "Life's too short for a bike that's not <em>right</em>",
      "heroSubtitle": "New and pre-owned motorcycle sales, workshop servicing, and genuine parts for all major brands.",
      "ctaPrimary": "Book a Service",
      "ctaSecondary": "View Bikes",
      "ctaNote": "Finance available \u00b7 Roadworthiness certificates \u00b7 Trade-ins welcome",
      "badge": "MIOSA Registered Motorcycle Dealer",
      "servicesHeading": "What We Offer",
      "services": [
          {
              "name": "New & Pre-Owned Bikes",
              "description": "Carefully selected new and pre-owned motorcycles with mechanical history and roadworthy certificates.",
              "tags": [
                  "New Bikes",
                  "Pre-Owned"
              ],
              "serviceImageQuery": "sport motorcycle in showroom front angle gleaming"
          },
          {
              "name": "Workshop & Servicing",
              "description": "Full motorcycle servicing, repairs, and diagnostics by factory-trained technicians for all major brands.",
              "tags": [
                  "Servicing",
                  "Repairs"
              ],
              "serviceImageQuery": "motorcycle engine being serviced on workshop stand"
          },
          {
              "name": "Parts, Gear & Accessories",
              "description": "Genuine OEM and aftermarket parts, riding gear, helmets, and accessories from trusted brands.",
              "tags": [
                  "Genuine Parts",
                  "Riding Gear"
              ],
              "serviceImageQuery": "motorcycle helmets riding gear leather jackets display shelf"
          },
          {
            "name": "Custom Builds & Modifications",
            "description": "Performance upgrades, exhaust systems, custom paint, and bolt-on modifications to make your ride truly yours.",
            "tags": [
              "Custom Build",
              "Performance"
            ],
            "serviceImageQuery": "custom motorcycle exhaust pipes chrome modified close-up"
          },
          {
              "name": "Riding Gear & Apparel",
              "description": "Premium helmets, jackets, gloves, boots, and riding apparel from top brands for every season.",
              "tags": [
                  "Riding Gear",
                  "Helmets"
              ],
              "serviceImageQuery": "motorcycle riding gear helmets jackets shop display"
          },
          {
              "name": "Finance & Insurance",
              "description": "Flexible motorcycle finance options and comprehensive insurance packages arranged in-store.",
              "tags": [
                  "Finance",
                  "Insurance"
              ],
              "serviceImageQuery": "motorcycle finance paperwork dealership customer signing"
          }
      ],
      "galleryHeading": "In the Shop",
      "aboutHeading": "Bikes sold and serviced with <em>passion</em>",
      "aboutText": "We are riders who happen to run a motorcycle shop. That distinction matters \u2014 we sell bikes we'd buy ourselves, we service them the way we'd service our own, and we stock gear we actually wear.\n\nFrom your first commuter to a track-prepped litre bike, we're your shop.",
      "aboutMission": "We believe motorcycling is one of the most liberating things a person can do \u2014 and it deserves a shop that takes it as seriously as riders do.",
      "stats": [
          {
              "value": "14+",
              "label": "Years Open",
              "sublabel": "since 2010"
          },
          {
              "value": "500+",
              "label": "Bikes Sold",
              "sublabel": "new & pre-owned"
          },
          {
              "value": "1,200+",
              "label": "Bikes Serviced",
              "sublabel": "all major brands"
          },
          {
              "value": "4.8\u2605",
              "label": "Google Rating",
              "sublabel": "from 400+ reviews"
          }
      ],
      "contactHeading": "Looking to buy or service your bike?",
      "testimonial": {
          "quote": "Bought a pre-owned GS from them 3 years ago. Still have it serviced here. Trust is everything.",
          "author": "Kobus V., Verified Client",
          "rating": 5
      },
      "imageMood": "bold, adventurous, mechanical",
      "heroImageQuery": "row of sport motorcycles parked in dealer showroom floor shiny",
      "heroBgImageQuery": "motorcycle engine chrome exhaust pipes dark moody close-up garage",
      "ogImageQuery": "motorcycles lined up in showroom new bikes for sale",
      "aboutImageQuery": "motorcycle mechanic man working on bike engine in workshop",
      "galleryImageQueries": [
          "adventure motorcycle BMW GS parked on mountain road scenic",
          "motorcycle engine chrome exhaust pipes V-twin close-up detail",
          "motorcycle helmets jackets gloves displayed on shop wall rack",
          "classic vintage motorcycle restored cafe racer in showroom"
      ],
      "features": [
        { "name": "Riders Who Wrench", "description": "Every mechanic in our workshop rides. We understand bikes because we live them \u2014 not because we read a manual.", "imageQuery": "motorcycle mechanic in workshop working on bike engine experienced" },
        { "name": "Genuine & Aftermarket Parts In Stock", "description": "We carry OEM and quality aftermarket parts for major brands. Most repairs and upgrades are completed without ordering delays.", "imageQuery": "motorcycle parts shelves organised brake pads chains sprockets filters" },
        { "name": "Custom Builds & Modifications", "description": "From exhaust upgrades to full cafe racer builds, we turn your vision into a machine you'll never want to park.", "imageQuery": "custom cafe racer motorcycle build in workshop stripped frame" }
      ],
      "processSteps": [
          {
              "step": "1",
              "title": "Browse or Book",
              "description": "Visit our showroom or book your service online \u2014 we'll confirm your slot."
          },
          {
              "step": "2",
              "title": "Test Ride or Assessment",
              "description": "Take a test ride on a new bike or drop your bike off for assessment."
          },
          {
              "step": "3",
              "title": "Ride Away Happy",
              "description": "Buy with confidence or collect your serviced bike \u2014 job card included."
          }
      ]
  },
  "Web Developer / Designer": {
      "heroEyebrow": "WEB DESIGN & DEVELOPMENT",
      "heroAccent": "Strategy-led. Results-driven.",
      "tagline": "Websites that <em>work</em> as hard as you do",
      "heroSubtitle": "Custom websites, e-commerce platforms, and web applications built to convert visitors into clients.",
      "ctaPrimary": "Start a Project",
      "ctaSecondary": "Our Work",
      "ctaNote": "Free discovery call \u00b7 Fixed-price projects \u00b7 Hosting & maintenance available",
      "badge": "Google Partner Agency",
      "servicesHeading": "What We Build",
      "services": [
          {
              "name": "Custom Website Design",
              "description": "Strategy-informed, beautifully designed websites that reflect your brand and convert your traffic.",
              "tags": [
                  "Custom Design",
                  "UX"
              ],
              "serviceImageQuery": "designer reviewing website homepage layout on large monitor browser mockup clean UI"
          },
          {
              "name": "E-Commerce Development",
              "description": "WooCommerce and Shopify stores built for performance, conversion, and easy self-management.",
              "tags": [
                  "Shopify",
                  "WooCommerce"
              ],
              "serviceImageQuery": "Shopify online store product page with add to cart button and product photos on laptop screen"
          },
          {
              "name": "SEO & Performance",
              "description": "Technical SEO, page speed optimisation, and analytics setup to turn your site into a lead machine.",
              "tags": [
                  "SEO",
                  "Page Speed"
              ],
              "serviceImageQuery": "Google Search Console SEO performance dashboard showing clicks impressions rankings on screen"
          },
          {
            "name": "Hosting & Maintenance",
            "description": "Managed hosting, uptime monitoring, security updates, and monthly content changes — your site stays fast and safe.",
            "tags": [
              "Hosting",
              "Maintenance"
            ],
            "serviceImageQuery": "server rack in data centre with blue LED lights ethernet cables networking equipment rows"
          }
      ],
      "galleryHeading": "Our Work",
      "aboutHeading": "Websites built with <em>purpose</em>",
      "aboutText": "We build websites that do something. Not brochures that look nice and generate nothing. Every project starts with a strategy conversation: who is the visitor, what do you want them to do, and how do we make that happen?\n\nWe are a Cape Town digital studio with over a decade of client results to show.",
      "aboutMission": "We believe a website is a business's most powerful sales tool \u2014 and it should be built like one.",
      "stats": [
          {
              "value": "12+",
              "label": "Years Building",
              "sublabel": "since 2012"
          },
          {
              "value": "300+",
              "label": "Websites Launched",
              "sublabel": "across industries"
          },
          {
              "value": "10",
              "label": "Full-Stack Developers",
              "sublabel": "design & dev in-house"
          },
          {
              "value": "4.9\u2605",
              "label": "Google Rating",
              "sublabel": "from 200+ reviews"
          }
      ],
      "contactHeading": "Ready to start your project?",
      "testimonial": {
          "quote": "Enquiries doubled within 3 months of the new site going live. Exceptional strategic thinking.",
          "author": "Wendy M., Verified Client",
          "rating": 5
      },
      "imageMood": "modern, clean, digital",
      "heroImageQuery": "developer writing HTML CSS code on widescreen monitor dark IDE syntax highlighting close-up",
      "heroBgImageQuery": "lines of JavaScript code on dark screen code editor neon syntax colours background",
      "ogImageQuery": "laptop showing responsive website design with browser dev tools open side by side",
      "aboutImageQuery": "web designer working at desk with dual monitors showing Figma UI design wireframes",
      "galleryImageQueries": [
          "modern website homepage displayed on laptop browser clean typography hero section",
          "Shopify ecommerce store product grid page open on desktop screen bright layout",
          "Google Analytics traffic dashboard showing charts graphs sessions on monitor screen",
          "responsive website shown on phone tablet and desktop screens side by side mockup"
      ],
      "features": [
        { "name": "Performance-First Development", "description": "Every site we build scores 90+ on Google PageSpeed. Fast-loading pages mean better SEO, lower bounce rates, and more conversions.", "imageQuery": "Google PageSpeed Insights score results on laptop screen web performance metrics green" },
        { "name": "You Own Everything", "description": "Your code, your domain, your hosting account. We don't hold websites hostage \u2014 if you leave, everything goes with you.", "imageQuery": "developer showing client website admin panel on laptop screen CMS handover meeting" },
        { "name": "Post-Launch Support Included", "description": "Every build includes 30 days of free support. Bug fixes, content tweaks, and training so you can manage your own site.", "imageQuery": "developer and client sitting at desk laptop screen showing WordPress CMS training session" }
      ],
      "processSteps": [
          {
              "step": "1",
              "title": "Discovery & Strategy",
              "description": "We explore your goals, users, and competitors before opening a design file."
          },
          {
              "step": "2",
              "title": "Design, Build & Review",
              "description": "Iterative design and development with regular client reviews and sign-off."
          },
          {
              "step": "3",
              "title": "Launch & Optimise",
              "description": "Launched with analytics, SEO foundation, and 30-day post-launch support."
          }
      ]
  },
  "IT Support / Services": {
      "heroEyebrow": "IT SUPPORT CAPE TOWN",
      "heroAccent": "Remote & on-site. SLA guaranteed.",
      "tagline": "IT that stays <em>running</em> so your business does",
      "heroSubtitle": "Managed IT support, network infrastructure, cloud migration, and cybersecurity for SMEs and growing businesses.",
      "ctaPrimary": "Get a Support Quote",
      "ctaSecondary": "Our Services",
      "ctaNote": "Remote & on-site \u00b7 SLA response guaranteed \u00b7 Monthly retainers",
      "badge": "Microsoft Silver Partner",
      "servicesHeading": "What We Support",
      "services": [
          {
              "name": "Managed IT Support",
              "description": "Proactive monitoring, helpdesk, and on-site support ensuring maximum uptime for your business.",
              "tags": [
                  "Helpdesk",
                  "SLA"
              ],
              "serviceImageQuery": "IT helpdesk technician wearing headset looking at multiple monitoring screens with ticket system dashboard"
          },
          {
              "name": "Cloud & Microsoft 365",
              "description": "Microsoft 365 migration, setup, licensing, and ongoing administration and end-user support.",
              "tags": [
                  "Microsoft 365",
                  "Cloud Migration"
              ],
              "serviceImageQuery": "Microsoft Teams Outlook Office 365 apps open on laptop screen cloud migration workspace"
          },
          {
              "name": "Network & Security",
              "description": "Business network design, firewall configuration, backup solutions, and cybersecurity implementation.",
              "tags": [
                  "Network",
                  "Cybersecurity"
              ],
              "serviceImageQuery": "network switch rack with blinking green LED lights and ethernet patch cables plugged in close-up"
          },
          {
            "name": "Hardware Procurement & Setup",
            "description": "Laptops, desktops, monitors, and peripherals sourced at trade pricing and delivered configured and ready to work.",
            "tags": [
              "Hardware",
              "Procurement"
            ],
            "serviceImageQuery": "IT technician setting up new laptop workstation with monitor keyboard mouse on office desk"
          }
      ],
      "galleryHeading": "IT Done Right",
      "aboutHeading": "IT support that <em>prevents</em> problems",
      "aboutText": "Reactive IT support means you only call when something breaks. We do proactive managed IT \u2014 monitoring your systems, patching vulnerabilities, and catching problems before they cost you time and money.\n\nWe are a Microsoft partner serving Cape Town SMEs since 2009.",
      "aboutMission": "We believe technology should give businesses an advantage \u2014 not give IT managers a headache.",
      "stats": [
          {
              "value": "15+",
              "label": "Years in IT",
              "sublabel": "since 2009"
          },
          {
              "value": "150+",
              "label": "Business Clients",
              "sublabel": "on managed support"
          },
          {
              "value": "99.7%",
              "label": "Uptime SLA",
              "sublabel": "across managed clients"
          },
          {
              "value": "4.8\u2605",
              "label": "Google Rating",
              "sublabel": "from 300+ reviews"
          }
      ],
      "contactHeading": "Want to talk about your IT needs?",
      "testimonial": {
          "quote": "IT problems that were a weekly occurrence haven't happened in 18 months. Genuinely transformative.",
          "author": "Chris H., Verified Client",
          "rating": 5
      },
      "imageMood": "professional, technical, reliable",
      "heroImageQuery": "IT technician working in server room with blue LED lit racks patching cables data centre",
      "heroBgImageQuery": "dark server room corridor with rows of server racks blue ambient lighting data centre",
      "ogImageQuery": "server room with rows of racks blinking status lights and cable management",
      "aboutImageQuery": "IT support engineer assisting office worker at desk pointing at laptop screen troubleshooting",
      "galleryImageQueries": [
          "network operations centre NOC with wall of monitoring screens showing dashboards alerts",
          "Microsoft 365 admin portal open on laptop screen showing user management cloud settings",
          "inside server room close-up of rack mounted servers with blinking green amber status LEDs",
          "IT technician configuring firewall appliance in network rack with patch panel cables"
      ],
      "features": [
        { "name": "15-Minute Remote Response", "description": "Most issues are resolved remotely within the hour. Our average first-response time is under 15 minutes during business hours.", "imageQuery": "IT support technician using remote desktop software to help client on dual monitor screen" },
        { "name": "Proactive Monitoring", "description": "We don't wait for things to break. Our monitoring tools flag issues before they cause downtime \u2014 so you rarely need to call us.", "imageQuery": "server monitoring dashboard with uptime graphs CPU memory alerts on multiple screens dark room" },
        { "name": "Flat Monthly Fee, Unlimited Support", "description": "One predictable monthly cost covers all your IT support. No per-ticket charges, no clock-watching.", "imageQuery": "IT manager and business client reviewing managed services agreement at desk with laptop" }
      ],
      "processSteps": [
          {
              "step": "1",
              "title": "IT Audit",
              "description": "We audit your current environment and identify risks, gaps, and priorities."
          },
          {
              "step": "2",
              "title": "Support Plan Agreed",
              "description": "Monthly support plan with defined SLAs, scope, and escalation procedures."
          },
          {
              "step": "3",
              "title": "Proactively Managed",
              "description": "Systems monitored 24/7 \u2014 issues resolved before they affect your business."
          }
      ]
  },
  "Digital Marketing": {
      "heroEyebrow": "DIGITAL MARKETING CAPE TOWN",
      "heroAccent": "Google Ads, SEO & social certified",
      "tagline": "More traffic. More leads. More <em>revenue</em>.",
      "heroSubtitle": "Performance-focused digital marketing managing Google Ads, SEO, social media, and email to grow your business.",
      "ctaPrimary": "Get a Free Audit",
      "ctaSecondary": "Our Services",
      "ctaNote": "No lock-in contracts \u00b7 Monthly reporting \u00b7 ROI tracked always",
      "badge": "Google Premier Partner",
      "servicesHeading": "What We Do",
      "services": [
          {
              "name": "Google Ads & PPC",
              "description": "Certified Google Ads management focused on cost-per-lead, not just click volume.",
              "tags": [
                  "Google Ads",
                  "PPC"
              ],
              "serviceImageQuery": "Google Ads campaign manager dashboard showing cost per click impressions conversions on monitor screen"
          },
          {
              "name": "SEO & Content Marketing",
              "description": "Technical SEO, content strategy, and link building driving organic ranking and traffic growth.",
              "tags": [
                  "SEO",
                  "Content"
              ],
              "serviceImageQuery": "Google search results page showing top organic rankings SEO keyword positions on laptop screen"
          },
          {
              "name": "Social Media & Email",
              "description": "Social media strategy, paid social, and email marketing managed to measurable engagement goals.",
              "tags": [
                  "Social Media",
                  "Email Marketing"
              ],
              "serviceImageQuery": "social media management tool with scheduled Instagram Facebook posts content calendar on screen"
          },
          {
            "name": "Marketing Automation & CRM",
            "description": "HubSpot, Mailchimp, and custom CRM setups that automate lead nurturing and keep your sales pipeline moving.",
            "tags": [
              "Marketing Automation",
              "CRM"
            ],
            "serviceImageQuery": "HubSpot CRM pipeline dashboard showing deals leads stages funnel on laptop screen"
          }
      ],
      "galleryHeading": "Campaigns We've Run",
      "aboutHeading": "Digital marketing that <em>pays</em> for itself",
      "aboutText": "We are obsessed with one metric: return on ad spend. Every campaign is built around it, optimised toward it, and reported against it. Our clients don't just see traffic \u2014 they see revenue.\n\nWe are a Google Premier Partner managing significant ad spend across South African and international accounts.",
      "aboutMission": "We believe digital marketing should be measured against the only number that matters to a business: revenue.",
      "stats": [
          {
              "value": "11+",
              "label": "Years in Digital",
              "sublabel": "since 2013"
          },
          {
              "value": "100+",
              "label": "Active Clients",
              "sublabel": "across industries"
          },
          {
              "value": "R50m+",
              "label": "Ad Spend Managed",
              "sublabel": "annually across accounts"
          },
          {
              "value": "4.2x",
              "label": "Average ROAS",
              "sublabel": "across Google Ads clients"
          }
      ],
      "contactHeading": "Want a free digital marketing audit?",
      "testimonial": {
          "quote": "Our cost-per-lead dropped 60% in 4 months. These are proper performance marketers.",
          "author": "Ashley P., Verified Client",
          "rating": 5
      },
      "imageMood": "data-driven, modern, professional",
      "heroImageQuery": "digital marketing team analysing Google Ads performance dashboard on large monitor showing conversion graphs",
      "heroBgImageQuery": "marketing analytics dashboard with dark background showing campaign metrics click-through rate graphs",
      "ogImageQuery": "laptop screen showing Google Analytics real-time traffic dashboard with pie charts and line graphs",
      "aboutImageQuery": "marketing strategist pointing at campaign performance metrics on widescreen monitor in modern office",
      "galleryImageQueries": [
          "Google Ads campaign manager showing cost per conversion bidding strategy metrics on monitor",
          "Ahrefs SEO tool showing keyword rankings backlink growth organic traffic chart on screen",
          "Instagram Facebook social media posts feed with engagement likes comments on phone screen",
          "Mailchimp email campaign dashboard showing open rate click rate audience statistics on laptop"
      ],
      "features": [
        { "name": "Data-Driven, Not Guesswork", "description": "Every campaign is built on analytics, not hunches. We track, measure, and optimise weekly so your budget works harder over time.", "imageQuery": "marketing analyst looking at Google Analytics dashboard with traffic sources conversion charts on dual monitors" },
        { "name": "No Long-Term Lock-In", "description": "We earn your business every month. No 12-month contracts \u2014 stay because the results speak for themselves.", "imageQuery": "digital marketing team presenting monthly campaign report results to client on screen in meeting room" },
        { "name": "Full Funnel Strategy", "description": "From awareness ads to retargeting to email nurture, we build the complete pipeline \u2014 not just the top of the funnel.", "imageQuery": "marketing funnel diagram on whiteboard showing awareness consideration conversion stages with arrows" }
      ],
      "processSteps": [
          {
              "step": "1",
              "title": "Free Audit",
              "description": "We audit your current digital presence and identify the highest-impact opportunities."
          },
          {
              "step": "2",
              "title": "Strategy & Channels",
              "description": "Agreed channel strategy with monthly budget, KPIs, and reporting cadence."
          },
          {
              "step": "3",
              "title": "Launch & Optimise",
              "description": "Campaigns live within 2 weeks \u2014 optimised continuously against your revenue goals."
          }
      ]
  },
  "Cybersecurity": {
      "heroEyebrow": "CYBERSECURITY CAPE TOWN",
      "heroAccent": "Penetration testing & security audits",
      "tagline": "Protected before the <em>breach</em>, not after",
      "heroSubtitle": "Business cybersecurity assessments, penetration testing, and managed security services to protect what matters most.",
      "ctaPrimary": "Book a Security Assessment",
      "ctaSecondary": "Our Services",
      "ctaNote": "POPIA compliance included \u00b7 Free initial assessment \u00b7 NDA provided",
      "badge": "EC-Council Certified Security Professionals",
      "servicesHeading": "What We Do",
      "services": [
          {
              "name": "Penetration Testing",
              "description": "Ethical hacking and vulnerability assessments identifying weaknesses before attackers do.",
              "tags": [
                  "Pen Testing",
                  "Vulnerability Scan"
              ],
              "serviceImageQuery": "terminal screen code penetration testing commands dark"
          },
          {
              "name": "Security Audits & POPIA Compliance",
              "description": "IT security audits, POPIA compliance reviews, and information security policy implementation.",
              "tags": [
                  "POPIA",
                  "Security Audit"
              ],
              "serviceImageQuery": "security audit report firewall configuration screen"
          },
          {
              "name": "Managed Security Services",
              "description": "Ongoing threat monitoring, incident response, and security operations for businesses of all sizes.",
              "tags": [
                  "Threat Monitoring",
                  "Incident Response"
              ],
              "serviceImageQuery": "security operations centre SOC screens monitoring dashboard"
          },
          {
            "name": "Employee Security Training",
            "description": "Phishing simulations, security awareness workshops, and policy training to turn your staff from the weakest link into the first line of defence.",
            "tags": [
              "Awareness Training",
              "Phishing Simulation"
            ],
            "serviceImageQuery": "phishing email warning alert screen security awareness"
          }
      ],
      "galleryHeading": "Security Done Right",
      "aboutHeading": "Cybersecurity, <em>seriously</em>",
      "aboutText": "South African businesses lose hundreds of millions to cybercrime annually. Most of it is preventable with proper security posture. We help businesses understand their exposure, fix their vulnerabilities, and stay protected as the threat landscape evolves.\n\nWe are certified security professionals, not IT generalists who add security as an afterthought.",
      "aboutMission": "We believe cybersecurity is everyone's business \u2014 and the cost of prevention is a fraction of the cost of a breach.",
      "stats": [
          {
              "value": "10+",
              "label": "Years in Security",
              "sublabel": "since 2014"
          },
          {
              "value": "200+",
              "label": "Assessments Completed",
              "sublabel": "SME to enterprise"
          },
          {
              "value": "EC-Council",
              "label": "Certification Level",
              "sublabel": "CEH & CISSP qualified"
          },
          {
              "value": "0",
              "label": "Post-Assessment Breaches",
              "sublabel": "on fully implemented clients"
          }
      ],
      "contactHeading": "Want to know how exposed you are?",
      "testimonial": {
          "quote": "Their assessment found 14 critical vulnerabilities. Fixed before anyone knew. Essential service.",
          "author": "Mark T., Verified Client",
          "rating": 5
      },
      "imageMood": "dark, technical, authoritative",
      "heroImageQuery": "cybersecurity lock shield icon digital circuit dark",
      "heroBgImageQuery": "cybersecurity binary code matrix dark screen background",
      "ogImageQuery": "cybersecurity shield lock padlock digital dark",
      "aboutImageQuery": "security analyst monitoring threat dashboard screens dark room",
      "galleryImageQueries": [
          "penetration testing terminal code results screen",
          "security audit report compliance checklist screen",
          "SOC monitoring dashboard threat alerts screens",
          "firewall configuration network security appliance"
      ],
      "features": [
        { "name": "Vulnerability Assessments & Pen Testing", "description": "We find the holes before hackers do. Regular penetration testing and vulnerability scans keep your systems hardened.", "imageQuery": "cybersecurity penetration testing security audit screen code" },
        { "name": "Incident Response Planning", "description": "If a breach happens, you need a plan \u2014 not panic. We create and drill response protocols so your team knows exactly what to do.", "imageQuery": "cybersecurity incident response team planning strategy meeting" },
        { "name": "Employee Security Training", "description": "90% of breaches start with human error. We train your staff to spot phishing, use strong passwords, and handle data safely.", "imageQuery": "cybersecurity training workshop employees computer security awareness" }
      ],
      "processSteps": [
          {
              "step": "1",
              "title": "Free Risk Assessment",
              "description": "Initial scoping and risk assessment \u2014 we identify your highest-priority exposure."
          },
          {
              "step": "2",
              "title": "Assessment & Report",
              "description": "Technical assessment delivered with prioritised findings and remediation plan."
          },
          {
              "step": "3",
              "title": "Remediate & Monitor",
              "description": "Vulnerabilities closed and ongoing monitoring established to maintain security posture."
          }
      ]
  },
  "Data Analytics / BI": {
      "heroEyebrow": "DATA ANALYTICS CAPE TOWN",
      "heroAccent": "Power BI, Tableau & custom dashboards",
      "tagline": "Turn your data into <em>decisions</em>",
      "heroSubtitle": "Business intelligence, data visualisation, and analytics consulting helping companies make confident, data-driven decisions.",
      "ctaPrimary": "Book a Discovery Call",
      "ctaSecondary": "Our Solutions",
      "ctaNote": "Free data audit \u00b7 Power BI specialists \u00b7 Integration with all sources",
      "badge": "Microsoft Power BI Certified Partner",
      "servicesHeading": "What We Build",
      "services": [
          {
              "name": "Business Intelligence Dashboards",
              "description": "Power BI and Tableau dashboards giving executives real-time visibility of the metrics that matter.",
              "tags": [
                  "Power BI",
                  "Tableau"
              ],
              "serviceImageQuery": "Power BI dashboard KPI charts real-time metrics screen"
          },
          {
              "name": "Data Integration & ETL",
              "description": "Connecting disparate data sources into a single version of truth for accurate reporting.",
              "tags": [
                  "Data Integration",
                  "ETL"
              ],
              "serviceImageQuery": "data pipeline flow diagram ETL process screen"
          },
          {
              "name": "Predictive Analytics",
              "description": "Machine learning models and predictive analytics for demand forecasting, churn, and risk scoring.",
              "tags": [
                  "Predictive",
                  "Machine Learning"
              ],
              "serviceImageQuery": "machine learning model prediction chart forecast screen"
          },
          {
            "name": "Data Governance & Quality",
            "description": "Data quality auditing, governance frameworks, and master data management to ensure your reports are built on numbers you can trust.",
            "tags": [
              "Data Governance",
              "Quality"
            ],
            "serviceImageQuery": "data quality audit spreadsheet validation checks screen"
          }
      ],
      "galleryHeading": "Data in Action",
      "aboutHeading": "Data that <em>drives</em> decisions",
      "aboutText": "Most businesses are sitting on data they can't see or use. We connect it, clean it, and present it in a way that actually informs decisions. The executives who work with us make faster, more confident calls \u2014 because the information they need is always in front of them.\n\nWe are certified Microsoft Power BI partners based in Cape Town.",
      "aboutMission": "We believe every business decision is better when it's informed by data \u2014 and accessing that data should not require a data science degree.",
      "stats": [
          {
              "value": "9+",
              "label": "Years in BI",
              "sublabel": "since 2015"
          },
          {
              "value": "80+",
              "label": "BI Solutions Delivered",
              "sublabel": "SME to listed company"
          },
          {
              "value": "Power BI",
              "label": "Primary Platform",
              "sublabel": "Microsoft certified partner"
          },
          {
              "value": "60%",
              "label": "Average Reporting Time Saved",
              "sublabel": "post-implementation"
          }
      ],
      "contactHeading": "Want to see what your data is saying?",
      "testimonial": {
          "quote": "Replaced our 12 Excel reports with one live dashboard. Management meetings transformed.",
          "author": "Sandra M., Verified Client",
          "rating": 5
      },
      "imageMood": "data-driven, modern, precise",
      "heroImageQuery": "Power BI dashboard charts graphs data visualisation screen",
      "heroBgImageQuery": "analytics dashboard charts dark background blue graphs",
      "ogImageQuery": "data analytics dashboard charts graphs visualisation",
      "aboutImageQuery": "analyst building dashboard on screen charts data",
      "galleryImageQueries": [
          "Power BI interactive dashboard charts KPI tiles",
          "data visualisation bar charts pie graphs screen",
          "database schema diagram data integration flow",
          "predictive analytics forecast chart machine learning"
      ],
      "features": [
        { "name": "Dashboards That Drive Decisions", "description": "We don't just visualise data \u2014 we build dashboards that answer the questions your team actually asks, in real time.", "imageQuery": "business intelligence dashboard data visualisation charts screen" },
        { "name": "Clean Data, Reliable Insights", "description": "Garbage in, garbage out. We audit, clean, and structure your data first so every insight you act on is trustworthy.", "imageQuery": "data cleaning ETL pipeline database management professional" },
        { "name": "Platform-Agnostic Expertise", "description": "Power BI, Tableau, Looker, custom SQL \u2014 we work with whatever tools you have and recommend what fits your team best.", "imageQuery": "analytics tools multiple platforms Power BI Tableau screens" }
      ],
      "processSteps": [
          {
              "step": "1",
              "title": "Data Discovery",
              "description": "We map your data sources, report needs, and KPIs before any technical work."
          },
          {
              "step": "2",
              "title": "Build & Connect",
              "description": "ETL pipelines built and dashboards developed with regular client reviews."
          },
          {
              "step": "3",
              "title": "Live & Trained",
              "description": "Solution deployed and team trained \u2014 with documentation and ongoing support."
          }
      ]
  },
  "Other": {
      "heroEyebrow": "PROFESSIONAL SERVICES CAPE TOWN",
      "heroAccent": "Specialists in our field",
      "tagline": "Expertise you can <em>count on</em>",
      "heroSubtitle": "Professional, reliable services delivered by experienced specialists committed to quality outcomes for every client.",
      "ctaPrimary": "Get in Touch",
      "ctaSecondary": "What We Do",
      "ctaNote": "Free consultation \u00b7 Transparent pricing \u00b7 Results guaranteed",
      "badge": "Fully Insured & Registered",
      "servicesHeading": "What We Offer",
      "services": [
          {
              "name": "Consultation & Assessment",
              "description": "Thorough initial consultations to understand your needs and recommend the best course of action.",
              "tags": [
                  "Consultation",
                  "Assessment"
              ],
              "serviceImageQuery": "consultation meeting notepad pen coffee table"
          },
          {
              "name": "Core Service Delivery",
              "description": "Skilled, professional delivery of our core service with quality control at every stage.",
              "tags": [
                  "Professional",
                  "Quality"
              ],
              "serviceImageQuery": "workspace laptop documents charts on desk"
          },
          {
              "name": "Ongoing Support",
              "description": "Post-project support, follow-up, and maintenance to ensure lasting results.",
              "tags": [
                  "Support",
                  "Follow-Up"
              ],
              "serviceImageQuery": "phone call headset support desk computer screen"
          },
          {
            "name": "Custom Project Work",
            "description": "Bespoke projects tailored to your specific requirements — scoped, quoted, and delivered to agreed timelines.",
            "tags": [
              "Custom Projects",
              "Bespoke"
            ],
            "serviceImageQuery": "project plan whiteboard sticky notes timeline roadmap"
          }
      ],
      "galleryHeading": "Our Work",
      "aboutHeading": "Service delivered with <em>integrity</em>",
      "aboutText": "We built this business on a simple foundation: do what you say, do it well, and treat every client as if they're your most important one. That approach has sustained us for over a decade in Cape Town.\n\nWhatever your need, we bring genuine expertise, clear communication, and a commitment to outcomes.",
      "aboutMission": "We believe the best service businesses are the ones that care more about the outcome than the transaction.",
      "stats": [
          {
              "value": "10+",
              "label": "Years in Business",
              "sublabel": "since 2014"
          },
          {
              "value": "500+",
              "label": "Clients Served",
              "sublabel": "residential & commercial"
          },
          {
              "value": "95%",
              "label": "Client Retention Rate",
              "sublabel": "year-on-year"
          },
          {
              "value": "4.8\u2605",
              "label": "Google Rating",
              "sublabel": "from 300+ reviews"
          }
      ],
      "contactHeading": "Ready to discuss your needs?",
      "testimonial": {
          "quote": "Professional, reliable, and they delivered exactly what they promised. Highly recommended.",
          "author": "Lauren K., Verified Client",
          "rating": 5
      },
      "imageMood": "professional, trustworthy, clean",
      "heroImageQuery": "modern office workspace desk laptop plants clean",
      "heroBgImageQuery": "modern workspace desk dark background ambient light",
      "ogImageQuery": "modern office desk laptop notebook pen workspace",
      "aboutImageQuery": "team collaborating around desk in modern office",
      "galleryImageQueries": [
          "modern office interior open plan desk workspace",
          "whiteboard planning strategy notes markers",
          "laptop desk coffee notebook workspace clean",
          "handshake business meeting agreement close-up"
      ],
      "processSteps": [
          {
              "step": "1",
              "title": "Initial Consultation",
              "description": "We meet, listen, and understand what you need before proposing anything."
          },
          {
              "step": "2",
              "title": "Proposal & Agreement",
              "description": "Clear scope, timeline, and pricing agreed in writing before we start."
          },
          {
              "step": "3",
              "title": "Delivered & Supported",
              "description": "Work completed to agreed standard with follow-up support included."
          }
      ]
  },
  "Photographer": {
    "heroEyebrow": "PHOTOGRAPHY CAPE TOWN",
    "heroAccent": "Portrait, commercial & editorial",
    "tagline": "Moments made <em>permanent</em>",
    "heroSubtitle": "Professional photography for portraits, brands, events, and editorial — images that do justice to what you’re showing the world.",
    "ctaPrimary": "Book a Session",
    "ctaSecondary": "View Portfolio",
    "ctaNote": "Free pre-shoot consultation · Digital gallery within 7 days · Commercial licensing",
    "badge": "PSSA Professional Photographers of SA",
    "servicesHeading": "What We Shoot",
    "services": [
      {
        "name": "Portrait & Personal Branding",
        "description": "Professional headshots, personal brand portraits, and family sessions that capture genuine character.",
        "tags": [
          "Headshots",
          "Personal Brand"
        ],
        "icon": "user",
        "serviceImageQuery": "photographer taking portrait of woman studio lighting umbrella softbox"
      },
      {
        "name": "Commercial & Product Photography",
        "description": "Product, food, architectural, and commercial photography for brands, agencies, and e-commerce.",
        "tags": [
          "Commercial",
          "Product"
        ],
        "icon": "camera",
        "serviceImageQuery": "overhead flat lay product photography table arrangement white background"
      },
      {
        "name": "Events & Corporate",
        "description": "Conference, awards, and corporate event coverage with same-week turnaround on edited selects.",
        "tags": [
          "Events",
          "Corporate"
        ],
        "icon": "users",
        "serviceImageQuery": "event photographer with camera crowd conference room corporate"
      },
        {
          "name": "Drone & Aerial Photography",
          "description": "Licensed drone photography for property, construction, events, and landscape — dramatic perspectives from above.",
          "tags": [
            "Drone",
            "Aerial"
          ],
          "serviceImageQuery": "person operating drone controller outdoors field open sky"
        }
    ],
    "galleryHeading": "From the Portfolio",
    "aboutHeading": "Photography that <em>means</em> something",
    "aboutText": "I’ve been photographing people, places, and products in Cape Town for 14 years. The best images happen when the subject relaxes, the light cooperates, and the photographer is prepared for both.\n\nI shoot on medium-format and full-frame digital. Every image delivered has been individually retouched — not batch-processed.",
    "aboutMission": "We believe a great photograph is one where the viewer forgets it was taken and simply feels something.",
    "stats": [
      {
        "value": "14+",
        "label": "Years Shooting",
        "sublabel": "since 2010"
      },
      {
        "value": "500+",
        "label": "Shoots Delivered",
        "sublabel": "portrait to commercial"
      },
      {
        "value": "7",
        "label": "Day Gallery Turnaround",
        "sublabel": "fully retouched"
      },
      {
        "value": "4.9★",
        "label": "Google Rating",
        "sublabel": "from 300+ reviews"
      }
    ],
    "contactHeading": "Ready to book a shoot?",
    "contactHours": "Shoots available 7 days · Bookings & admin Mon–Fri 09:00–17:00",
    "projectCaptions": [
      "The light before golden hour",
      "Brand portrait, Sea Point studio",
      "Product table, natural light",
      "Corporate event, CTICC"
    ],
    "testimonial": {
      "quote": "The images were everything I hoped for. I’ve used them across every platform.",
      "author": "Zara T., Verified Client",
      "rating": 5
    },
    "imageMood": "cinematic, natural light, intimate",
    "heroImageQuery": "portrait photo natural light woman close-up studio",
    "ogImageQuery": "professional photographer holding camera DSLR lens studio portrait session",
    "aboutImageQuery": "photographer adjusting studio softbox lighting equipment behind scenes portrait shoot",
    "galleryImageQueries": [
      "bride and groom first dance wedding reception beautiful venue warm lights romantic",
      "cosmetics skincare products arranged marble table flat lay overhead commercial styled",
      "professional headshot portrait confident businessman dark background studio lighting",
      "modern house exterior white walls large windows garden blue sky architecture"
    ],
    "features": [
      { "name": "Wedding & Events", "description": "No month-long waits. You receive a curated, colour-graded online gallery within a week of your shoot.", "imageQuery": "bride and groom walking together garden wedding day romantic beautiful natural light" },
      { "name": "Commercial & Product", "description": "We guide you into moments, not stiff poses. The result is images that feel real, relaxed, and genuinely you.", "imageQuery": "cosmetics skincare products arranged on marble table flat lay overhead commercial photography" },
      { "name": "Portrait & Headshots", "description": "Every image comes with a clear usage licence. Use them on your website, socials, print, and ads without any hidden fees.", "imageQuery": "confident businesswoman professional headshot portrait dark background studio lighting smile" },
      { "name": "Architecture & Interiors", "description": "Property, construction, events, and landscape — dramatic perspectives from above.", "imageQuery": "beautiful modern living room interior design bright white sofa large windows natural light" }
    ]
  },
  "Videographer": {
    "heroEyebrow": "VIDEO PRODUCTION CAPE TOWN",
    "heroAccent": "Brand films, events & social content",
    "tagline": "Stories told in the most <em>powerful</em> format",
    "heroSubtitle": "Professional video production for brand films, social content, event coverage, and documentary — crafted from shoot to final edit.",
    "ctaPrimary": "Get a Quote",
    "ctaSecondary": "Watch Showreel",
    "ctaNote": "Creative brief included · Licensed music · Delivery within 10 days",
    "badge": "SASFED Registered Film Producer",
    "servicesHeading": "What We Produce",
    "services": [
      {
        "name": "Brand & Corporate Films",
        "description": "Compelling brand films, testimonial videos, and corporate stories for websites and campaigns.",
        "tags": [
          "Brand Film",
          "Corporate"
        ],
        "icon": "film",
        "serviceImageQuery": "professional videographer filming interview subject seated studio lights camera"
      },
      {
        "name": "Social Media Content",
        "description": "Vertical and horizontal short-form video for Instagram, YouTube, and TikTok — edited and branded.",
        "tags": [
          "Social Content",
          "Reels"
        ],
        "icon": "smartphone",
        "serviceImageQuery": "content creator filming with smartphone on tripod ring light social media video"
      },
      {
        "name": "Event & Documentary Coverage",
        "description": "Multi-camera event coverage, conference recordings, and documentary-style narrative films.",
        "tags": [
          "Events",
          "Documentary"
        ],
        "icon": "video",
        "serviceImageQuery": "cameraman filming event conference stage multiple cameras professional setup"
      },
        {
          "name": "Drone & Aerial Video",
          "description": "Licensed drone cinematography for property, tourism, and brand films — sweeping aerials that add production value instantly.",
          "tags": [
            "Drone",
            "Aerial"
          ],
          "serviceImageQuery": "drone operator holding DJI drone controller outdoors filming aerial video"
        }
    ],
    "galleryHeading": "From the Edit Suite",
    "aboutHeading": "Video crafted with <em>intention</em>",
    "aboutText": "A video that no one watches is a waste of budget. We approach every production with a clear brief, a strong narrative strategy, and a post-production process that delivers content that performs.\n\nWe shoot on cinema-grade cameras with professional lighting, sound, and drone where needed.",
    "aboutMission": "We believe the best brand videos are the ones people choose to watch — not the ones they skip.",
    "stats": [
      {
        "value": "12+",
        "label": "Years in Production",
        "sublabel": "since 2012"
      },
      {
        "value": "300+",
        "label": "Videos Produced",
        "sublabel": "brand to social"
      },
      {
        "value": "4K",
        "label": "All Footage Shot In",
        "sublabel": "cinema-grade cameras"
      },
      {
        "value": "4.9★",
        "label": "Google Rating",
        "sublabel": "from 200+ reviews"
      }
    ],
    "contactHeading": "Have a video project in mind?",
    "contactHours": "Shoots available 7 days · Bookings & admin Mon–Fri 08:30–17:30",
    "projectCaptions": [
      "Brand film, V&A Waterfront",
      "Social reel, Camps Bay",
      "Event highlights, CTICC",
      "Documentary, Winelands"
    ],
    "testimonial": {
      "quote": "The brand film has been the best marketing investment we’ve made in 5 years.",
      "author": "Marcus H., Verified Client",
      "rating": 5
    },
    "imageMood": "cinematic, moody, professional",
    "heroImageQuery": "videographer holding cinema camera RED filming on set professional",
    "ogImageQuery": "cinema camera lens close-up film production professional videography",
    "aboutImageQuery": "videographer behind camera filming interview subject studio lights professional",
    "galleryImageQueries": [
      "cinema camera on dolly track rails professional film set crew",
      "videographer filming vertical video smartphone gimbal stabilizer content creator",
      "drone operator flying camera equipment outdoors filming aerial footage",
      "video editor colour grading footage on monitor timeline software"
    ],
    "features": [
      { "name": "Concept-to-Delivery Production", "description": "We don't just point a camera. We develop the creative concept, script, shoot, edit, and deliver \u2014 one team, one vision.", "imageQuery": "video production team gathered around storyboard script planning whiteboard" },
      { "name": "Licensed Music & Sound Design", "description": "Every video includes commercially licensed music and professional sound mixing. No copyright strikes, no muffled audio.", "imageQuery": "video editor working at computer monitors audio waveform editing suite" },
      { "name": "Platform-Optimised Cuts", "description": "You get versions formatted for Instagram, YouTube, TikTok, and your website. One shoot, every platform covered.", "imageQuery": "multiple device screens showing video content smartphone tablet laptop" }
    ]
  },
  "Graphic Designer": {
    "heroEyebrow": "GRAPHIC DESIGN CAPE TOWN",
    "heroAccent": "Brand identity, print & digital design",
    "tagline": "Design that communicates before a word is <em>read</em>",
    "heroSubtitle": "Strategic graphic design for brand identity, marketing collateral, packaging, and digital assets from a Cape Town design studio.",
    "ctaPrimary": "Start a Project",
    "ctaSecondary": "View Portfolio",
    "ctaNote": "NDA on all briefs · Fixed project quotes · 3 revision rounds included",
    "badge": "CGDA Graphic Design Association Member",
    "servicesHeading": "What We Design",
    "services": [
      {
        "name": "Brand Identity & Logo Design",
        "description": "Brand strategy, logo design, colour systems, and brand guidelines built for long-term consistency.",
        "tags": [
          "Logo Design",
          "Brand Guidelines"
        ],
        "icon": "star",
        "serviceImageQuery": "logo design sketches on paper brand identity development concepts desk"
      },
      {
        "name": "Print & Packaging Design",
        "description": "Brochures, packaging, annual reports, and high-end print collateral designed for impact.",
        "tags": [
          "Packaging",
          "Print"
        ],
        "icon": "layers",
        "serviceImageQuery": "printed brochures packaging boxes product design samples spread on table"
      },
      {
        "name": "Digital & Social Design",
        "description": "Social media templates, website UI, email design, and digital ad creative at scale.",
        "tags": [
          "Social Media",
          "UI Design"
        ],
        "icon": "monitor",
        "serviceImageQuery": "designer creating social media graphics on computer screen digital design"
      },
        {
          "name": "Presentation & Pitch Deck Design",
          "description": "Investor decks, sales presentations, and internal keynotes designed to communicate clearly and win the room.",
          "tags": [
            "Pitch Deck",
            "Presentation"
          ],
          "serviceImageQuery": "presentation slides pitch deck laptop screen clean professional layout meeting"
        }
    ],
    "galleryHeading": "Selected Work",
    "aboutHeading": "Design rooted in <em>strategy</em>",
    "aboutText": "Good design isn’t decoration — it’s communication. We start every project by understanding the audience, the message, and the context before picking up a pen.\n\nWe’re a boutique design studio in Cape Town, established in 2008. Our clients range from local startups to international brands.",
    "aboutMission": "We believe design is the most efficient communication tool a business has — and every pixel should earn its place.",
    "stats": [
      {
        "value": "16+",
        "label": "Years Designing",
        "sublabel": "since 2008"
      },
      {
        "value": "300+",
        "label": "Brand Projects",
        "sublabel": "identity to campaign"
      },
      {
        "value": "4",
        "label": "Loerie Awards",
        "sublabel": "shortlisted & awarded"
      },
      {
        "value": "4.9★",
        "label": "Google Rating",
        "sublabel": "from 200+ reviews"
      }
    ],
    "contactHeading": "Have a design project? Let’s talk.",
    "contactHours": "Mon–Fri: 09:00–17:30 · Remote collaboration available · Projects by quote",
    "projectCaptions": [
      "Brand identity, Woodstock studio",
      "Packaging design, local producer",
      "Annual report, corporate client",
      "Social template system, lifestyle brand"
    ],
    "testimonial": {
      "quote": "The rebrand completely changed how people perceive us. Best creative decision we made.",
      "author": "Sophie W., Verified Client",
      "rating": 5
    },
    "imageMood": "bold, minimal, considered",
    "heroImageQuery": "brand identity stationery mockup business cards letterhead logo design flat lay",
    "ogImageQuery": "graphic designer working at iMac computer screen design software creative studio",
    "aboutImageQuery": "graphic designer sketching logo concepts pencil paper notebook desk creative",
    "galleryImageQueries": [
      "brand identity logo printed on business card stationery colour palette swatches",
      "packaging design cardboard product boxes mockup printed labels table",
      "social media post template design mockup on smartphone screen colourful",
      "large format poster typography graphic design print wall"
    ],
    "features": [
      { "name": "Brand Strategy, Not Just Pretty Pictures", "description": "We start with who you are, who you're talking to, and what you're trying to achieve. Design follows strategy, not the other way around.", "imageQuery": "creative team mood board colour swatches pinned cork board strategy workshop" },
      { "name": "Print & Digital Consistency", "description": "Your brand looks the same on a business card as it does on a billboard. We design systems, not one-offs.", "imageQuery": "business card letterhead envelope brand identity printed stationery mockup set" },
      { "name": "Source Files Always Yours", "description": "You own everything we create. All source files, fonts, and assets are handed over \u2014 you're never locked in.", "imageQuery": "graphic designer at desk iMac working on brand design files creative studio" }
    ]
  },
  "Interior Designer": {
    "heroEyebrow": "INTERIOR DESIGN CAPE TOWN",
    "heroAccent": "Residential, commercial & hospitality",
    "tagline": "Spaces designed for the way you actually <em>live</em>",
    "heroSubtitle": "Professional interior design for residential and commercial spaces — from concept and mood boards to furniture procurement and installation.",
    "ctaPrimary": "Book a Consultation",
    "ctaSecondary": "Our Portfolio",
    "ctaNote": "Initial consultation R800 · Full project management · Trade pricing passed on",
    "badge": "SADI Registered Interior Designer",
    "servicesHeading": "What We Design",
    "services": [
      {
        "name": "Full Interior Design",
        "description": "End-to-end interior design including concept, space planning, specification, and project management.",
        "tags": [
          "Full Design",
          "Project Management"
        ],
        "icon": "home",
        "serviceImageQuery": "beautifully designed living room interior sofa armchair rug styled decor"
      },
      {
        "name": "Furniture & Décor Sourcing",
        "description": "Custom and sourced furniture, rugs, lighting, and art curated and coordinated for your space.",
        "tags": [
          "Furniture",
          "Sourcing"
        ],
        "icon": "layers",
        "serviceImageQuery": "fabric swatches colour samples material mood board interior design flat lay table"
      },
      {
        "name": "Commercial & Hospitality Design",
        "description": "Office interiors, retail design, and hospitality fit-outs that balance aesthetics with function.",
        "tags": [
          "Commercial",
          "Hospitality"
        ],
        "icon": "briefcase",
        "serviceImageQuery": "modern commercial office interior designed workspace desks chairs bright"
      },
        {
          "name": "Kitchen & Bathroom Design",
          "description": "Specialist kitchen and bathroom design with 3D renders, material selection, and contractor coordination.",
          "tags": [
            "Kitchen Design",
            "Bathroom"
          ],
          "serviceImageQuery": "luxury kitchen white marble countertop island pendant lights modern cabinetry"
        }
    ],
    "galleryHeading": "Spaces We’ve Designed",
    "aboutHeading": "Interiors designed with <em>purpose</em>",
    "aboutText": "Great interior design isn’t about trends — it’s about understanding how a person or organisation uses a space and creating an environment that serves that use beautifully.\n\nI am a SADI-registered interior designer with 17 years of experience across residential, hospitality, and commercial projects in Cape Town and beyond.",
    "aboutMission": "We believe a well-designed interior doesn’t just look right — it makes you feel right the moment you walk in.",
    "stats": [
      {
        "value": "17+",
        "label": "Years Designing",
        "sublabel": "since 2007"
      },
      {
        "value": "200+",
        "label": "Projects Completed",
        "sublabel": "residential to commercial"
      },
      {
        "value": "SADI",
        "label": "Registered Designer",
        "sublabel": "professional body member"
      },
      {
        "value": "4.9★",
        "label": "Google Rating",
        "sublabel": "from 250+ reviews"
      }
    ],
    "contactHeading": "Want to transform your space?",
    "contactHours": "Mon–Fri: 09:00–17:00 · Site visits by appointment · Virtual consultations available",
    "projectCaptions": [
      "Cape Town apartment, full design",
      "Franschhoek guesthouse, hospitality fit-out",
      "Bespoke kitchen, Constantia",
      "Retail fit-out, V&A Waterfront"
    ],
    "testimonial": {
      "quote": "Our home looks like a magazine shoot every day. She understood exactly what we wanted.",
      "author": "Kate & Jon A., Verified Client",
      "rating": 5
    },
    "imageMood": "elegant, considered, natural light",
    "heroImageQuery": "beautiful modern living room styled sofa coffee table cushions art wall bright interior",
    "ogImageQuery": "interior designer woman reviewing fabric swatches samples at desk bright studio",
    "aboutImageQuery": "interior designer reviewing material samples fabric swatches mood board bright studio table",
    "galleryImageQueries": [
      "modern styled living room sofa cushions rug coffee table warm lighting",
      "contemporary kitchen marble island pendant lights white cabinets interior",
      "modern office interior open plan desks chairs bright windows workspace",
      "boutique hotel lobby interior design elegant furniture warm lighting"
    ],
    "features": [
      { "name": "3D Renders Before We Order Anything", "description": "See your room in photorealistic 3D before a single item is purchased. No guesswork, no expensive mistakes.", "imageQuery": "3D interior design render photorealistic modern living room computer visualisation" },
      { "name": "Trade-Only Pricing on Furniture", "description": "We pass on our trade discounts to you. Access brands and pieces that aren't available to the public, often at better prices.", "imageQuery": "luxury furniture showroom designer sofa armchair display exclusive showroom" },
      { "name": "Project Management Included", "description": "We coordinate contractors, deliveries, and installations so you don't have to. One point of contact from concept to completion.", "imageQuery": "interior designer with clipboard coordinating furniture delivery installation room" }
    ]
  },
  "Copywriter / Content Creator": {
    "heroEyebrow": "COPYWRITING CAPE TOWN",
    "heroAccent": "Brand copy, content & campaigns",
    "tagline": "Words that make people do <em>things</em>",
    "heroSubtitle": "Strategic copywriting and content creation for brands that want to communicate with clarity, personality, and persuasion.",
    "ctaPrimary": "Start a Project",
    "ctaSecondary": "View Work",
    "ctaNote": "Brief-first approach · NDA on all projects · Fast turnarounds available",
    "badge": "IAB SA Content Marketing Council",
    "servicesHeading": "What We Write",
    "services": [
      {
        "name": "Brand Copywriting",
        "description": "Tone of voice development, brand manifestos, taglines, and website copy that defines how you sound.",
        "tags": [
          "Brand Voice",
          "Website Copy"
        ],
        "icon": "edit-3",
        "serviceImageQuery": "website wireframe layout on laptop screen with text copy writing planning"
      },
      {
        "name": "Content Strategy & Creation",
        "description": "Blog posts, newsletters, social content, and long-form articles that build authority and drive traffic.",
        "tags": [
          "Content Strategy",
          "Blog"
        ],
        "icon": "file-text",
        "serviceImageQuery": "person writing blog post article laptop screen notebook desk content"
      },
      {
        "name": "Campaign & Ad Copy",
        "description": "Campaign concepts, ad copy, email sequences, and landing page copy designed to convert.",
        "tags": [
          "Ad Copy",
          "Email"
        ],
        "icon": "target",
        "serviceImageQuery": "advertising creative magazine spread open pages headline text campaign layout"
      },
        {
          "name": "SEO Copywriting",
          "description": "Search-optimised web copy, landing pages, and blog content that ranks on Google and reads like it was written by a human.",
          "tags": [
            "SEO Copy",
            "Web Content"
          ],
          "serviceImageQuery": "SEO search engine optimization laptop screen analytics Google ranking results"
        }
    ],
    "galleryHeading": "Words We’ve Written",
    "aboutHeading": "Copy written with <em>conviction</em>",
    "aboutText": "Most brands write about themselves. The best brands write for their audience. I’ve spent 15 years helping companies tell stories that resonate — in advertising, content, and brand communications.\n\nI’ve written for FMCG, tech, property, hospitality, and finance. Good copy starts with understanding people, not products.",
    "aboutMission": "We believe the right words can change how people feel about a brand — and that’s the most powerful tool in marketing.",
    "stats": [
      {
        "value": "15+",
        "label": "Years Writing",
        "sublabel": "since 2009"
      },
      {
        "value": "100+",
        "label": "Brands Written For",
        "sublabel": "local to international"
      },
      {
        "value": "3",
        "label": "Bookmark Awards",
        "sublabel": "content & digital category"
      },
      {
        "value": "4.9★",
        "label": "Google Rating",
        "sublabel": "from 150+ reviews"
      }
    ],
    "contactHeading": "Got a brief? Let’s write something great.",
    "contactHours": "Mon–Fri: 09:00–17:30 · Remote projects welcome · Rush turnarounds available",
    "projectCaptions": [
      "Brand manifesto, Cape Town startup",
      "Campaign tagline, national FMCG",
      "Website rewrite, hospitality brand",
      "Newsletter series, financial services"
    ],
    "testimonial": {
      "quote": "She nailed our brand voice on the first draft. We haven’t touched the website copy in 3 years.",
      "author": "Tom A., Verified Client",
      "rating": 5
    },
    "imageMood": "considered, creative, clean",
    "heroImageQuery": "writer typing on laptop at clean desk notebook pen coffee creative workspace",
    "ogImageQuery": "person typing on MacBook laptop keyboard close-up writing content creative",
    "aboutImageQuery": "copywriter woman working at laptop bright desk notebook pen plants creative office",
    "galleryImageQueries": [
      "printed brand manifesto document booklet open pages elegant typography",
      "person writing blog article on laptop screen coffee desk",
      "advertising campaign creative layout magazine spread headlines text",
      "social media content calendar planning board sticky notes organised desk"
    ],
    "features": [
      { "name": "SEO-Informed, Human-Written", "description": "Every piece is written for people first, search engines second. You get content that ranks and reads naturally.", "imageQuery": "writer at desk typing laptop notebook pen creative bright workspace professional" },
      { "name": "Brand Voice Development", "description": "We create a documented tone-of-voice guide so your brand sounds consistent whether we write it or your intern does.", "imageQuery": "brand guidelines document open pages typography colour palette style guide printed" },
      { "name": "Fast Turnaround, No Fluff", "description": "Most projects are delivered within 5 business days. Clean, concise copy that says what it needs to \u2014 nothing more.", "imageQuery": "editorial content calendar planning board sticky notes schedule organised wall" }
    ]
  },
  "Music Producer / Studio": {
    "heroEyebrow": "RECORDING STUDIO CAPE TOWN",
    "heroAccent": "Professional recording, mixing & mastering",
    "tagline": "Your sound, <em>realised</em>",
    "heroSubtitle": "Professional recording, production, mixing, and mastering from an acoustically treated Cape Town studio with an experienced producer.",
    "ctaPrimary": "Book Studio Time",
    "ctaSecondary": "Listen to Our Work",
    "ctaNote": "Hourly & block rates · All genres welcome · Engineer included",
    "badge": "RISA Registered Music Producer",
    "servicesHeading": "What We Do",
    "services": [
      {
        "name": "Recording & Production",
        "description": "Full music production from demo to release — arrangement, recording, and sound design included.",
        "tags": [
          "Recording",
          "Production"
        ],
        "icon": "mic",
        "serviceImageQuery": "condenser microphone in vocal booth pop filter recording studio professional"
      },
      {
        "name": "Mixing & Mastering",
        "description": "Professional mixing and mastering for independent artists and labels seeking a competitive sound.",
        "tags": [
          "Mixing",
          "Mastering"
        ],
        "icon": "sliders",
        "serviceImageQuery": "audio mixing console faders equaliser knobs studio monitor speakers professional"
      },
      {
        "name": "Podcast & Voiceover Recording",
        "description": "Podcast episodes, voiceover sessions, and audio branding recorded and produced to broadcast standard.",
        "tags": [
          "Podcast",
          "Voiceover"
        ],
        "icon": "radio",
        "serviceImageQuery": "podcast microphone headphones recording desk laptop audio interface studio"
      },
        {
          "name": "Film Scoring & Sync Licensing",
          "description": "Original music composition for film, TV, and advertising — plus sync licensing for existing catalogue tracks.",
          "tags": [
            "Film Score",
            "Sync Licensing"
          ],
          "serviceImageQuery": "film score sheet music composition notes on piano keyboard manuscript"
        }
    ],
    "galleryHeading": "From the Studio",
    "aboutHeading": "Sound crafted with <em>care</em>",
    "aboutText": "I have been producing music and recording artists in Cape Town for 18 years. The studio is acoustically treated, equipped with industry-standard gear, and designed to make artists feel comfortable enough to give their best performance.\n\nI work across genres — from singer-songwriter to hip-hop, jazz to electronic.",
    "aboutMission": "We believe every artist deserves to hear their music the way they imagined it — and our job is to close that gap.",
    "stats": [
      {
        "value": "18+",
        "label": "Years Producing",
        "sublabel": "since 2006"
      },
      {
        "value": "200+",
        "label": "Tracks Produced",
        "sublabel": "across all genres"
      },
      {
        "value": "12",
        "label": "SA Chart Entries",
        "sublabel": "from our studio"
      },
      {
        "value": "4.9★",
        "label": "Google Rating",
        "sublabel": "from 180+ reviews"
      }
    ],
    "contactHeading": "Ready to record?",
    "contactHours": "Mon–Sun: 09:00–22:00 by booking · Enquiries Mon–Fri 09:00–17:00",
    "projectCaptions": [
      "Tracking session, live band",
      "Mix session, hip-hop EP",
      "Podcast series, financial brand",
      "Vocal session, singer-songwriter"
    ],
    "testimonial": {
      "quote": "The mix made our sound commercial without losing what makes us us. Brilliant producer.",
      "author": "Kyle M., Verified Client",
      "rating": 5
    },
    "imageMood": "moody, professional, warm",
    "heroImageQuery": "recording studio mixing console faders knobs LED meters close-up professional audio",
    "ogImageQuery": "music producer at mixing desk studio monitors speakers headphones professional recording",
    "aboutImageQuery": "music producer engineer adjusting faders on mixing console recording studio monitors",
    "galleryImageQueries": [
      "band recording live session drum kit guitar bass instruments in studio room",
      "mixing console faders studio monitor speakers close-up professional audio mastering",
      "podcast recording setup microphone pop filter headphones laptop desk",
      "singer vocalist recording into condenser microphone headphones vocal booth studio"
    ],
    "features": [
      { "name": "Acoustically Treated, Pro-Grade Studio", "description": "Our rooms are purpose-built and acoustically treated. What you hear in the monitors is what the world hears.", "imageQuery": "professional recording studio interior acoustic treatment panels mixing desk monitors" },
      { "name": "Session Musicians on Call", "description": "Need live drums, bass, or guitar? We have a network of session musicians who can lay down tracks to elevate your project.", "imageQuery": "guitarist playing electric guitar recording session studio headphones professional" },
      { "name": "Mix & Master for All Platforms", "description": "We master for Spotify, Apple Music, vinyl, and broadcast. Your track sounds perfect wherever people listen.", "imageQuery": "audio mastering engineer at studio monitors speakers mixing console headphones" }
    ]
  },
  "Craft / Handmade Goods": {
    "heroEyebrow": "HANDMADE IN CAPE TOWN",
    "heroAccent": "Made to order. One of a kind.",
    "tagline": "Things made with hands, meant to <em>last</em>",
    "heroSubtitle": "Beautifully crafted handmade goods made in Cape Town — from ceramics and textiles to leather goods and home décor.",
    "ctaPrimary": "Shop the Collection",
    "ctaSecondary": "Custom Orders",
    "ctaNote": "Custom orders welcome · Ships nationwide · Gift wrapping available",
    "badge": "Proudly South African Craft Producer",
    "servicesHeading": "What We Make",
    "services": [
      {
        "name": "Handmade Ceramics",
        "description": "Wheel-thrown and hand-built ceramics — mugs, bowls, vases, and planters in earthy South African tones.",
        "tags": [
          "Ceramics",
          "Wheel-Thrown"
        ],
        "icon": "circle",
        "serviceImageQuery": "handmade ceramic bowls mugs earthy glaze colours displayed wooden shelf pottery"
      },
      {
        "name": "Textile & Woven Goods",
        "description": "Hand-woven cushion covers, throws, and wall hangings in natural fibres and local patterns.",
        "tags": [
          "Woven",
          "Natural Fibres"
        ],
        "icon": "grid",
        "serviceImageQuery": "hand-woven textile cushion throw blanket natural linen cotton loom weaving"
      },
      {
        "name": "Custom Leather Goods",
        "description": "Hand-stitched leather wallets, bags, key rings, and corporate gifts made to your specification.",
        "tags": [
          "Leather",
          "Custom"
        ],
        "icon": "briefcase",
        "serviceImageQuery": "handmade leather wallet stitching detail close-up craftsman workshop tools"
      },
        {
          "name": "Candles & Home Fragrance",
          "description": "Hand-poured soy candles, reed diffusers, and room sprays made with essential oils in small batches.",
          "tags": [
            "Candles",
            "Home Fragrance"
          ],
          "serviceImageQuery": "handmade soy candle glass jar lit flame warm light artisan home fragrance"
        }
    ],
    "galleryHeading": "Made by Hand",
    "aboutHeading": "Craft made with <em>intention</em>",
    "aboutText": "Everything we make is made by hand, in Cape Town, using locally sourced materials where possible. We are not a factory — each piece takes time, and each piece is slightly different. That’s the point.\n\nWe take custom orders and work with corporate clients for branded gifting.",
    "aboutMission": "We believe handmade objects carry something mass-produced ones never can — the evidence of a human being who cared.",
    "stats": [
      {
        "value": "9+",
        "label": "Years Making",
        "sublabel": "since 2015"
      },
      {
        "value": "5,000+",
        "label": "Pieces Sold",
        "sublabel": "online & at markets"
      },
      {
        "value": "100%",
        "label": "Made in Cape Town",
        "sublabel": "locally sourced materials"
      },
      {
        "value": "4.9★",
        "label": "Google Rating",
        "sublabel": "from 400+ reviews"
      }
    ],
    "contactHeading": "Want a custom or bulk order?",
    "contactHours": "Online orders 24hrs · Market stalls Sat–Sun · Studio visits by appointment",
    "projectCaptions": [
      "Ceramic collection, earthy tones",
      "Woven cushion, natural linen",
      "Leather wallet, hand-stitched",
      "Corporate gift set, custom branded"
    ],
    "testimonial": {
      "quote": "The ceramic set I bought is the most-admired thing in our kitchen. Worth every cent.",
      "author": "Anneke S., Verified Client",
      "rating": 5
    },
    "imageMood": "earthy, warm, artisanal",
    "heroImageQuery": "handmade ceramic mugs bowls pottery displayed on wooden shelf earthy glazes artisan",
    "ogImageQuery": "artisan hands shaping clay pottery wheel studio close-up handmade ceramics",
    "aboutImageQuery": "potter shaping clay bowl on pottery wheel hands close-up studio workshop",
    "galleryImageQueries": [
      "handmade ceramic vases bowls arranged on shelf earthy tones pottery display",
      "hand-woven textile cushion covers throws natural linen fabric texture",
      "handmade leather wallet journal belt stitched goods close-up detail",
      "artisan craft market stall handmade ceramics candles goods display table"
    ],
    "features": [
      { "name": "Every Piece Made by Hand", "description": "Nothing is mass-produced. Each item is crafted individually, which means you're getting something truly one-of-a-kind.", "imageQuery": "artisan hands shaping clay on pottery wheel close-up handmade workshop" },
      { "name": "Custom Orders Welcome", "description": "Want a specific colour, size, or personalisation? We love custom work and we'll collaborate with you to get it exactly right.", "imageQuery": "personalised handmade ceramic mug gift wrapped brown paper string custom order" },
      { "name": "Locally Sourced Materials", "description": "We use South African materials wherever possible \u2014 supporting local suppliers and keeping our carbon footprint small.", "imageQuery": "natural raw materials clay linen thread leather supplies craft workshop table" }
    ]
  },
  "Fashion Designer": {
    "heroEyebrow": "FASHION DESIGN CAPE TOWN",
    "heroAccent": "Ready-to-wear, bespoke & capsule collections",
    "tagline": "Clothes designed for who you actually <em>are</em>",
    "heroSubtitle": "Independent Cape Town fashion label producing considered ready-to-wear, bespoke garments, and capsule collections.",
    "ctaPrimary": "Book a Fitting",
    "ctaSecondary": "View Collection",
    "ctaNote": "Bespoke fittings by appointment · Ships worldwide · Sustainable fabrics used",
    "badge": "SAFA South African Fashion Association",
    "servicesHeading": "What We Create",
    "services": [
      {
        "name": "Bespoke Garments",
        "description": "Custom-made garments designed and constructed entirely for your measurements, occasion, and taste.",
        "tags": [
          "Bespoke",
          "Custom-Made"
        ],
        "icon": "scissors",
        "serviceImageQuery": "bespoke dress on dress form mannequin pins fabric fashion design studio"
      },
      {
        "name": "Ready-to-Wear Collection",
        "description": "Seasonal ready-to-wear pieces designed and produced in limited runs from our Cape Town studio.",
        "tags": [
          "Ready-to-Wear",
          "Limited Edition"
        ],
        "icon": "star",
        "serviceImageQuery": "ready-to-wear clothing collection hanging on rack fashion studio editorial styled"
      },
      {
        "name": "Capsule Wardrobe Consulting",
        "description": "Personal styling and capsule wardrobe design to help you dress with intention and consistency.",
        "tags": [
          "Capsule Wardrobe",
          "Styling"
        ],
        "icon": "layers",
        "serviceImageQuery": "capsule wardrobe outfit flat lay styled clothing accessories on white background"
      },
        {
          "name": "Bridal & Occasion Wear",
          "description": "Custom-designed bridal gowns, mother-of-the-bride outfits, and occasion wear for events that matter.",
          "tags": [
            "Bridal",
            "Occasion Wear"
          ],
          "serviceImageQuery": "white bridal wedding gown dress on hanger detail lace fabric studio"
        }
    ],
    "galleryHeading": "From the Studio",
    "aboutHeading": "Fashion made with <em>purpose</em>",
    "aboutText": "I design clothes that are made to be worn — not photographed once and forgotten. Every piece is constructed in our Cape Town studio using considered fabrics sourced from South African and European suppliers.\n\nI have been designing and producing collections since 2011, with stockists in Cape Town and Johannesburg.",
    "aboutMission": "We believe fashion should make the wearer feel more like themselves — not a version of someone else’s idea.",
    "stats": [
      {
        "value": "13+",
        "label": "Years Designing",
        "sublabel": "since 2011"
      },
      {
        "value": "8",
        "label": "Seasons Produced",
        "sublabel": "ready-to-wear collections"
      },
      {
        "value": "3",
        "label": "SA Fashion Week Shows",
        "sublabel": "main runway"
      },
      {
        "value": "4.9★",
        "label": "Google Rating",
        "sublabel": "from 200+ reviews"
      }
    ],
    "contactHeading": "Want a bespoke fitting or consultation?",
    "contactHours": "Mon–Fri: 10:00–17:00 · Sat: 10:00–14:00 · Fittings by appointment only",
    "projectCaptions": [
      "Bespoke wedding ensemble, Verified Client",
      "SS25 ready-to-wear, campaign shoot",
      "Custom occasion dress, Woodstock studio",
      "Capsule collection, Cape Town stockist"
    ],
    "testimonial": {
      "quote": "The wedding dress was absolutely perfect. She understood exactly what I wanted and exceeded it.",
      "author": "Bianca P., Verified Client",
      "rating": 5
    },
    "imageMood": "considered, minimal, editorial",
    "heroImageQuery": "fashion designer garments clothing rack styled editorial studio dresses hanging",
    "ogImageQuery": "fashion designer woman working at sewing machine fabric studio professional",
    "aboutImageQuery": "fashion designer cutting fabric pattern on large table scissors studio workshop",
    "galleryImageQueries": [
      "fashion model wearing designer dress editorial portrait photography studio",
      "dress on mannequin fitting pins adjustments fashion designer studio bespoke",
      "clothing collection garments hanging on rack styled fashion lookbook studio",
      "sewing machine close-up needle thread fabric fashion construction detail"
    ],
    "features": [
      { "name": "Made-to-Measure Fit", "description": "Every garment is cut to your measurements. Off-the-rack can't compete with clothes that are literally shaped around your body.", "imageQuery": "fashion designer measuring tape fitting client garment tailoring session studio" },
      { "name": "Sustainable, Limited-Run Collections", "description": "We produce in small batches to minimise waste. You wear something exclusive, and the planet doesn't pay for it.", "imageQuery": "sustainable fashion small batch garments hanging rack organic fabric labels studio" },
      { "name": "From Sketch to Wardrobe", "description": "We handle the full process \u2014 design, fabric sourcing, pattern-making, sewing, and final fitting. One designer, one vision.", "imageQuery": "fashion design sketches illustrations on paper pencil fabric swatches studio desk" }
    ]
  },
  "Animator / Motion Design": {
    "heroEyebrow": "ANIMATION & MOTION DESIGN CAPE TOWN",
    "heroAccent": "2D, 3D & motion graphics",
    "tagline": "Ideas that <em>move</em> people",
    "heroSubtitle": "Professional animation and motion design for brands, broadcasters, and agencies — from explainer videos to broadcast graphics.",
    "ctaPrimary": "Start a Project",
    "ctaSecondary": "Watch Showreel",
    "ctaNote": "Script & storyboard included · Broadcast-ready delivery · Revision rounds built in",
    "badge": "BASA Arts & Media Associate Member",
    "servicesHeading": "What We Animate",
    "services": [
      {
        "name": "Explainer & Brand Animation",
        "description": "2D animated explainer videos and brand films that make complex ideas simple and engaging.",
        "tags": [
          "Explainer",
          "2D Animation"
        ],
        "icon": "play",
        "serviceImageQuery": "person sitting at desk large computer monitor colourful screen creative studio"
      },
      {
        "name": "Motion Graphics & Titles",
        "description": "Logo animations, broadcast graphics, title sequences, and social motion content for any platform.",
        "tags": [
          "Motion Graphics",
          "Logo Animation"
        ],
        "icon": "film",
        "serviceImageQuery": "hands typing keyboard multiple monitors dark room colourful screens"
      },
      {
        "name": "3D Animation & Visualisation",
        "description": "Product visualisation, architectural walkthroughs, and 3D character animation.",
        "tags": [
          "3D Animation",
          "Product Vis"
        ],
        "icon": "box",
        "serviceImageQuery": "designer working two monitors dark studio 3D modelling creative"
      },
        {
          "name": "Interactive & UI Animation",
          "description": "Micro-interactions, loading states, and animated UI elements that make apps and websites feel alive.",
          "tags": [
            "UI Animation",
            "Micro-Interaction"
          ],
          "serviceImageQuery": "designer sketching wireframe notebook laptop desk overhead view"
        }
    ],
    "galleryHeading": "Things We’ve Set in Motion",
    "aboutHeading": "Motion design with <em>meaning</em>",
    "aboutText": "We’ve been creating animation and motion design for South African and international clients since 2010. Every project starts with a strong script and storyboard — because animation without a clear story is just expensive moving shapes.\n\nWe deliver broadcast-quality output in any format or platform specification required.",
    "aboutMission": "We believe motion is the most efficient way to explain, entertain, and persuade — when it’s backed by a clear idea.",
    "stats": [
      {
        "value": "14+",
        "label": "Years Animating",
        "sublabel": "since 2010"
      },
      {
        "value": "400+",
        "label": "Projects Delivered",
        "sublabel": "explainer to broadcast"
      },
      {
        "value": "6",
        "label": "Broadcast Clients",
        "sublabel": "SABC, M-Net & beyond"
      },
      {
        "value": "4.9★",
        "label": "Google Rating",
        "sublabel": "from 150+ reviews"
      }
    ],
    "contactHeading": "Have an animation brief?",
    "contactHours": "Mon–Fri: 09:00–17:30 · Remote projects welcome · Quotes within 24hrs",
    "projectCaptions": [
      "Explainer video, fintech startup",
      "Broadcast opener, M-Net campaign",
      "3D product vis, tech brand",
      "Social motion pack, lifestyle brand"
    ],
    "testimonial": {
      "quote": "The explainer video increased our product trial sign-ups by 40% in the first month.",
      "author": "Sam K., Verified Client",
      "rating": 5
    },
    "imageMood": "bold, vibrant, creative",
    "heroImageQuery": "creative person working at desk with large colourful monitor screen dark studio",
    "ogImageQuery": "colourful abstract light trails long exposure neon purple blue creative",
    "aboutImageQuery": "artist drawing on graphics tablet pen stylus at desk with computer monitor",
    "galleryImageQueries": [
      "team watching presentation large screen colourful office meeting room",
      "creative professional drawing graphics tablet pen monitor desk",
      "dark creative studio multiple computer screens colourful editing workspace",
      "person working laptop coffee shop table creative freelancer"
    ],
    "features": [
      { "name": "Explainer Videos That Convert", "description": "Our animated explainers turn complex ideas into 60-second stories that people actually watch to the end.", "imageQuery": "woman watching video on laptop screen colourful content bright living room" },
      { "name": "Style Frames Before Production", "description": "We design the look before we animate. You approve key frames so there are no surprises when the final video arrives.", "imageQuery": "sketches and drawings pinned to wall storyboard creative planning mood board" },
      { "name": "Lottie & Web-Ready Formats", "description": "We deliver in every format you need — MP4, GIF, Lottie, After Effects — optimised for web, app, and social.", "imageQuery": "close up computer screen code editor software developer colourful syntax dark" }
    ]
  },
  "Tattoo / Piercing Studio": {
    "heroEyebrow": "TATTOO STUDIO CAPE TOWN",
    "heroAccent": "Custom tattoos & professional piercing",
    "tagline": "Art made permanent, made <em>right</em>",
    "heroSubtitle": "Custom tattoo design and professional piercing in a sterile, welcoming studio by experienced artists in Cape Town.",
    "ctaPrimary": "Book a Consultation",
    "ctaSecondary": "Artist Portfolios",
    "ctaNote": "Free design consultation · BLOODBORNE pathogens certified · Vegan inks available",
    "badge": "SA Tattoo Artists Association Member",
    "servicesHeading": "What We Do",
    "services": [
      {
        "name": "Custom Tattoo Design",
        "description": "Bespoke tattoo design and application across all styles — fine line, black and grey, realism, and traditional.",
        "tags": [
          "Custom Design",
          "Fine Line"
        ],
        "icon": "edit-3",
        "serviceImageQuery": "tattoo artist inking fine line botanical floral design on client inner arm tattoo machine close-up studio"
      },
      {
        "name": "Cover-Up & Rework",
        "description": "Expert cover-up design and rework of existing tattoos — transforming what you have into what you want.",
        "tags": [
          "Cover-Up",
          "Rework"
        ],
        "icon": "refresh-cw",
        "serviceImageQuery": "tattoo artist working on cover-up design over old tattoo client arm tattoo machine ink studio"
      },
      {
        "name": "Professional Piercing",
        "description": "Ear, nose, body, and cartilage piercings using implant-grade titanium jewellery and sterile technique.",
        "tags": [
          "Piercing",
          "Titanium Jewellery"
        ],
        "icon": "circle",
        "serviceImageQuery": "professional piercer performing ear piercing with sterile needle titanium jewelry client seated studio"
      },
        {
          "name": "Laser Tattoo Removal",
          "description": "Safe, effective laser removal and fading treatments for old or unwanted tattoos — consultations always free.",
          "tags": [
            "Laser Removal",
            "Fading"
          ],
          "serviceImageQuery": "laser tattoo removal treatment practitioner holding device light beam on skin fading tattoo clinical"
        }
    ],
    "galleryHeading": "Fresh Ink",
    "aboutHeading": "Tattoos that stand the <em>test</em> of time",
    "aboutText": "A tattoo is permanent. The artist you choose matters enormously. Our studio in Cape Town has been producing custom tattoo work since 2012 — we consult before we book, design before we draw, and only proceed when both artist and client are confident.\n\nAll artists are bloodborne pathogen certified. All equipment is single-use. No shortcuts.",
    "aboutMission": "We believe tattoo art deserves the same care and technical skill as any other fine art — because it lasts forever.",
    "stats": [
      {
        "value": "12+",
        "label": "Years in Studio",
        "sublabel": "since 2012"
      },
      {
        "value": "4",
        "label": "Resident Artists",
        "sublabel": "each with specialist style"
      },
      {
        "value": "5,000+",
        "label": "Tattoos Completed",
        "sublabel": "Cape Town & walk-ins"
      },
      {
        "value": "4.9★",
        "label": "Google Rating",
        "sublabel": "from 500+ reviews"
      }
    ],
    "contactHeading": "Ready to book a consultation?",
    "contactHours": "Tue–Sat: 10:00–18:00 · Sun: 11:00–16:00 · Closed Mondays",
    "projectCaptions": [
      "Fine line botanical, inner arm",
      "Black & grey portrait, sleeve",
      "Geometric cover-up, shoulder",
      "Minimalist script, collarbone"
    ],
    "testimonial": {
      "quote": "The consultation made me feel completely confident. The result is everything I hoped for.",
      "author": "Ruby H., Verified Client",
      "rating": 5
    },
    "imageMood": "dark, artistic, precise",
    "heroImageQuery": "tattoo artist with gloves inking detailed design on client arm tattoo machine ink cups studio dark moody lighting",
    "ogImageQuery": "tattoo artist working on client arm close-up tattoo machine ink detail professional studio dark",
    "aboutImageQuery": "tattoo artist drawing custom design sketch on paper stencil tracing studio desk ink references artwork",
    "galleryImageQueries": [
      "healed fine line botanical floral tattoo on woman inner arm detailed delicate close-up skin",
      "black and grey realism portrait tattoo full sleeve arm detailed shading healed",
      "geometric tattoo shoulder blade detailed linework symmetrical pattern healed close-up",
      "multiple ear piercings healed titanium studs hoops cartilage tragus close-up jewelry"
    ]
  },
  "Art Gallery / Art Shop": {
    "heroEyebrow": "ART GALLERY CAPE TOWN",
    "heroAccent": "Original works, prints & commissions",
    "tagline": "Art that changes how a space <em>feels</em>",
    "heroSubtitle": "Curated contemporary art gallery representing South African and international artists — originals, limited prints, and commissions.",
    "ctaPrimary": "Visit the Gallery",
    "ctaSecondary": "Current Exhibition",
    "ctaNote": "Free art advisory · Framing service · Corporate & private commissions",
    "badge": "GAASA Gallery Association of South Africa",
    "servicesHeading": "Featured Artists",
    "services": [
      {
        "name": "Alex Morgan",
        "description": "Mixed media and large-scale abstract works exploring memory, landscape, and identity.",
        "tags": [
          "Mixed Media",
          "Abstract"
        ],
        "icon": "star",
        "serviceImageQuery": "artist standing beside large abstract painting studio portrait professional"
      },
      {
        "name": "Jordan Ellis",
        "description": "Oil on canvas landscapes and seascapes capturing light and colour in contemporary settings.",
        "tags": [
          "Oil Painting",
          "Landscape"
        ],
        "icon": "layers",
        "serviceImageQuery": "painter artist working at easel oil painting canvas bright studio natural light"
      },
      {
        "name": "Riley Chen",
        "description": "Contemporary sculpture and installation work in bronze, steel, and found materials.",
        "tags": [
          "Sculpture",
          "Installation"
        ],
        "icon": "briefcase",
        "serviceImageQuery": "sculptor artist working clay bronze sculpture hands workshop tools"
      },
      {
        "name": "Sam Okafor",
        "description": "Fine art photography and limited edition giclée prints documenting urban architecture and street life.",
        "tags": [
          "Photography",
          "Prints"
        ],
        "serviceImageQuery": "fine art photographer holding camera urban architecture street photography portrait"
      }
    ],
    "galleryHeading": "Current Exhibition",
    "aboutHeading": "Art selected with <em>conviction</em>",
    "aboutText": "We’ve been running an independent contemporary art gallery in Cape Town since 2009. We represent 22 South African artists and host 6 exhibitions per year — each one a considered body of work, not a mixed collection.\n\nWe believe South African art deserves serious attention. Our job is to facilitate that meeting between artist and collector.",
    "aboutMission": "We believe the right piece of art on a wall changes how the person who lives with it sees the world.",
    "stats": [
      {
        "value": "15+",
        "label": "Years Open",
        "sublabel": "since 2009"
      },
      {
        "value": "22",
        "label": "Represented Artists",
        "sublabel": "SA and international"
      },
      {
        "value": "80+",
        "label": "Exhibitions Curated",
        "sublabel": "since opening"
      },
      {
        "value": "4.9★",
        "label": "Google Rating",
        "sublabel": "from 300+ reviews"
      }
    ],
    "contactHeading": "Want to visit or discuss a work?",
    "contactHours": "Tue–Fri: 10:00–18:00 · Sat: 10:00–16:00 · Sun–Mon: By appointment",
    "projectCaptions": [
      "Solo exhibition, Woodstock gallery",
      "Commission, private residence Constantia",
      "Corporate collection, Cape Town CBD",
      "Limited edition print series"
    ],
    "testimonial": {
      "quote": "The advisory service helped me buy three pieces I genuinely love. Priceless experience.",
      "author": "Catherine D., Verified Client",
      "rating": 5
    },
    "imageMood": "curated, minimal, artistic",
    "heroImageQuery": "contemporary art gallery white walls paintings hung spotlights modern exhibition space",
    "ogImageQuery": "contemporary art gallery exhibition paintings white walls spotlights",
    "aboutImageQuery": "gallery curator carefully hanging framed artwork on white gallery wall",
    "galleryImageQueries": [
      "art gallery exhibition large paintings hung white wall track lighting",
      "limited edition framed prints row gallery display wall spotlights",
      "bronze sculpture pedestal white gallery interior contemporary art",
      "gallery opening night visitors viewing paintings wine glasses reception",
      "abstract painting close up colourful brushstrokes canvas texture detail",
      "person contemplating large artwork gallery white wall bench",
      "framed photographs fine art prints gallery wall row display",
      "art gallery interior wide angle white walls paintings sculptures exhibition"
    ],
    "features": [
      { "name": "Curated with Intention", "description": "Every piece in our gallery is selected by our curatorial team — we don’t exhibit everything, only work that moves us.", "imageQuery": "contemporary art gallery exhibition white walls curated paintings spotlights" },
      { "name": "Artist-First Relationships", "description": "We represent our artists long-term, investing in their careers and ensuring fair, transparent pricing for collectors.", "imageQuery": "art gallery opening night guests viewing paintings wine reception evening" },
      { "name": "Art Advisory Included", "description": "Not sure where to start? Our advisory service helps you find the right piece for your space, style, and budget — at no extra charge.", "imageQuery": "person selecting artwork painting for modern living room wall advisory" }
    ],
  },
  "Real Estate Agent": {
    "heroEyebrow": "ESTATE AGENT CAPE TOWN",
    "heroAccent": "Sales, rentals & property investment",
    "tagline": "The agent who puts your interests <em>first</em>",
    "heroSubtitle": "Experienced property sales and rental agent specialising in Cape Town’s residential market — from first-time buyers to investment portfolios.",
    "ctaPrimary": "List Your Property",
    "ctaSecondary": "View Listings",
    "ctaNote": "Free property valuation · No sole mandate required · Market-leading marketing",
    "badge": "PPRA Registered Property Practitioner",
    "servicesHeading": "How We Help",
    "services": [
      {
        "name": "Residential Sales",
        "description": "Strategic pricing, professional photography, and targeted marketing to achieve maximum sale value.",
        "tags": [
          "Sales",
          "Pricing Strategy"
        ],
        "icon": "home",
        "serviceImageQuery": "well-presented residential house exterior for sale sign front garden curb appeal listing"
      },
      {
        "name": "Rental Management",
        "description": "Tenant sourcing, lease management, and ongoing property management for residential landlords.",
        "tags": [
          "Rentals",
          "Property Management"
        ],
        "icon": "key",
        "serviceImageQuery": "modern apartment open-plan living room dining area furnished neutral interior rental ready"
      },
      {
        "name": "Property Investment Advisory",
        "description": "Investment property sourcing, yield analysis, and portfolio strategy for buy-to-let investors.",
        "tags": [
          "Investment",
          "Yield Analysis"
        ],
        "icon": "trending-up",
        "serviceImageQuery": "residential investment apartment building exterior multiple units balconies Cape Town property"
      },
        {
          "name": "First-Time Buyer Guidance",
          "description": "Step-by-step guidance through the home-buying process — bond pre-approval, offer to purchase, transfer, and registration.",
          "tags": [
            "First-Time Buyer",
            "Bond Guidance"
          ],
          "serviceImageQuery": "young couple receiving house keys from estate agent new home front door smiling excited"
        }
    ],
    "galleryHeading": "Recently Sold & Let",
    "aboutHeading": "Property sold with <em>strategy</em>",
    "aboutText": "I have been selling and letting property in Cape Town for 19 years. The market rewards agents who know the street, know the buyer pool, and know how to price — not those who simply list and wait.\n\nI am PPRA registered, hold a valid Fidelity Fund Certificate, and operate with complete transparency on commission structures.",
    "aboutMission": "We believe selling your property should feel like you have an expert in your corner — not someone who disappears after the mandate.",
    "stats": [
      {
        "value": "19+",
        "label": "Years in Property",
        "sublabel": "since 2005"
      },
      {
        "value": "600+",
        "label": "Properties Sold",
        "sublabel": "Cape Town & surrounds"
      },
      {
        "value": "97%",
        "label": "List-to-Sale Rate",
        "sublabel": "of mandated properties"
      },
      {
        "value": "4.9★",
        "label": "Google Rating",
        "sublabel": "from 400+ reviews"
      }
    ],
    "contactHeading": "Want a free property valuation?",
    "contactHours": "Mon–Fri: 08:00–18:00 · Sat: 09:00–14:00 · Viewings 7 days by appointment",
    "projectCaptions": [
      "Sold in 12 days, Constantia",
      "Let above asking, Verified Client",
      "Investment portfolio, Atlantic Seaboard",
      "Off-market sale, Newlands"
    ],
    "testimonial": {
      "quote": "Sold for R200k above asking in under 2 weeks. She knows exactly how to position a property.",
      "author": "Michael & Jane D., Verified Client",
      "rating": 5
    },
    "imageMood": "premium, aspirational, professional",
    "heroImageQuery": "luxury white modern home exterior wide driveway garden landscaped curb appeal Cape Town residential",
    "ogImageQuery": "beautiful Cape Town residential house curb appeal front view landscaped garden driveway modern architecture",
    "aboutImageQuery": "estate agent in business attire showing couple through bright modern open-plan home interior listing",
    "galleryImageQueries": [
      "luxury Cape Town villa with swimming pool garden terrace outdoor entertaining area exterior view",
      "modern townhouse street-facing facade architectural design clean lines windows residential",
      "large luxury estate house white walls wine farm vineyard green garden driveway gate",
      "suburban family home exterior front garden well-maintained landscaping residential sale property"
    ]
  },
  "Architect": {
    "heroEyebrow": "REGISTERED ARCHITECT CAPE TOWN",
    "heroAccent": "SACAP registered. Site-managed builds.",
    "tagline": "Architecture shaped by place, climate, and <em>you</em>",
    "heroSubtitle": "SACAP-registered architectural design for residential extensions, new builds, and commercial projects in the Western Cape.",
    "ctaPrimary": "Book a Consultation",
    "ctaSecondary": "Our Projects",
    "ctaNote": "Free initial consultation · Full council submission service · Site management included",
    "badge": "SACAP Registered Professional Architect",
    "servicesHeading": "What We Design",
    "services": [
      {
        "name": "Residential Architecture",
        "description": "New homes, extensions, and alterations designed around your life, your site, and the Western Cape climate.",
        "tags": [
          "New Homes",
          "Extensions"
        ],
        "icon": "home",
        "serviceImageQuery": "modern house exterior architecture white walls glass windows completed residential"
      },
      {
        "name": "Council Submissions & Approvals",
        "description": "Full planning permission submission, heritage assessment, and council approval management.",
        "tags": [
          "Council Submission",
          "Planning"
        ],
        "icon": "file-text",
        "serviceImageQuery": "architectural blueprints floor plan drawings spread on desk pencil ruler scale"
      },
      {
        "name": "Commercial & Retail Design",
        "description": "Commercial interiors, retail fit-outs, and office refurbishments with full architectural service.",
        "tags": [
          "Commercial",
          "Retail Fit-Out"
        ],
        "icon": "briefcase",
        "serviceImageQuery": "modern commercial office interior architecture designed open plan bright glass walls"
      },
        {
          "name": "Site Management & Contract Admin",
          "description": "Full construction oversight, contractor management, and contract administration from foundation to handover.",
          "tags": [
            "Site Management",
            "Contract Admin"
          ],
          "serviceImageQuery": "architect with hard hat clipboard on construction site inspecting building progress"
        }
    ],
    "galleryHeading": "Projects We’ve Designed",
    "aboutHeading": "Architecture built for <em>place</em>",
    "aboutText": "Every building we design responds to its specific site — the orientation, the climate, the views, and the neighbourhood. Cape Town architecture should look like it belongs here, not like it was lifted from a property magazine.\n\nWe are SACAP registered, manage the full council submission process, and offer site management through construction.",
    "aboutMission": "We believe great architecture improves the life of the person inside it and the quality of the street it faces.",
    "stats": [
      {
        "value": "20+",
        "label": "Years Practising",
        "sublabel": "since 2004"
      },
      {
        "value": "180+",
        "label": "Projects Built",
        "sublabel": "residential to commercial"
      },
      {
        "value": "SACAP",
        "label": "Registered Architect",
        "sublabel": "professional council member"
      },
      {
        "value": "4.9★",
        "label": "Google Rating",
        "sublabel": "from 250+ reviews"
      }
    ],
    "contactHeading": "Want to discuss your project?",
    "contactHours": "Mon–Fri: 08:30–17:00 · Site visits by appointment · Initial consultation free",
    "projectCaptions": [
      "New residence, Llandudno hillside",
      "Extension & pool, Constantia",
      "Retail fit-out, Cape Town CBD",
      "Heritage renovation, Bo-Kaap"
    ],
    "testimonial": {
      "quote": "The house doesn’t just look amazing — it actually works for how we live. Brilliant architect.",
      "author": "Lara & Nico B., Verified Client",
      "rating": 5
    },
    "imageMood": "architectural, clean, considered",
    "heroImageQuery": "modern residential house architecture exterior white walls large windows garden completed",
    "ogImageQuery": "architectural scale model white building hands architect desk blueprints",
    "aboutImageQuery": "architect reviewing blueprints floor plans at desk scale model building office",
    "galleryImageQueries": [
      "modern residential house architecture completed exterior garden landscaping",
      "contemporary home extension glass walls renovation architecture exterior",
      "modern commercial office interior architecture open plan bright designed space",
      "heritage building renovated restored facade period architecture exterior"
    ],
    "features": [
      { "name": "Full Council Submission Service", "description": "We handle site development plans, council submissions, and all the back-and-forth so you don't have to sit in planning offices.", "imageQuery": "architect reviewing building plans blueprints documents on desk council submission" },
      { "name": "Energy-Efficient Design Focus", "description": "Every project considers passive cooling, natural light, and insulation from day one \u2014 reducing your running costs for decades.", "imageQuery": "modern sustainable house large windows natural light solar panels energy efficient design" },
      { "name": "3D Walkthroughs Before Construction", "description": "We build your project virtually before anyone picks up a brick. Walk through your future home or office in photorealistic 3D.", "imageQuery": "3D architectural render modern house visualisation interior walkthrough photorealistic" }
    ]
  },
  "Surveyor": {
    "heroEyebrow": "LAND SURVEYOR CAPE TOWN",
    "heroAccent": "PLATO registered. Rapid turnaround.",
    "tagline": "Every boundary, measured <em>precisely</em>",
    "heroSubtitle": "Professional land surveying, sectional title surveys, and building location certificates for property transactions and development.",
    "ctaPrimary": "Get a Quote",
    "ctaSecondary": "Our Services",
    "ctaNote": "PLATO registered · Deeds office approved · 5-day BLC turnaround",
    "badge": "PLATO Registered Land Surveyor",
    "servicesHeading": "What We Survey",
    "services": [
      {
        "name": "Building Location Certificates",
        "description": "Rapid BLC preparation for property transfer and mortgage bond registration — 5-day standard turnaround.",
        "tags": [
          "BLC",
          "Transfer"
        ],
        "icon": "map",
        "serviceImageQuery": "land surveyor placing boundary peg survey marker on land plot measuring property line"
      },
      {
        "name": "Sectional Title Surveys",
        "description": "Sectional plan preparation, registration, and extension of sectional title schemes.",
        "tags": [
          "Sectional Title",
          "Scheme"
        ],
        "icon": "layers",
        "serviceImageQuery": "multi-storey apartment block complex aerial view residential units balconies sectional title"
      },
      {
        "name": "Subdivision & Consolidation",
        "description": "Land subdivision, consolidation, and rezoning surveys for residential and commercial development.",
        "tags": [
          "Subdivision",
          "Rezoning"
        ],
        "icon": "scissors",
        "serviceImageQuery": "vacant land plots fenced subdivision development site pegs string lines staked out"
      },
        {
          "name": "Topographic & As-Built Surveys",
          "description": "Detailed topographic surveys for architects and engineers, plus as-built verification for completed structures.",
          "tags": [
            "Topographic",
            "As-Built"
          ],
          "serviceImageQuery": "surveyor operating total station theodolite on tripod measuring land contours outdoors site"
        }
    ],
    "galleryHeading": "Surveys Completed",
    "aboutHeading": "Surveying done with <em>accuracy</em>",
    "aboutText": "A surveying error can delay a property transfer, block a development approval, or create expensive disputes between neighbours. We have been producing accurate, Deeds Office-approved surveys in the Western Cape since 2007.\n\nOur PLATO registration is current. Our turnaround times are among the fastest in Cape Town.",
    "aboutMission": "We believe accurate land surveying is the foundation of every secure property transaction and confident development.",
    "stats": [
      {
        "value": "17+",
        "label": "Years Surveying",
        "sublabel": "since 2007"
      },
      {
        "value": "3,000+",
        "label": "Surveys Completed",
        "sublabel": "BLC, sectional & subdivision"
      },
      {
        "value": "5",
        "label": "Day BLC Turnaround",
        "sublabel": "standard service"
      },
      {
        "value": "4.8★",
        "label": "Google Rating",
        "sublabel": "from 200+ reviews"
      }
    ],
    "contactHeading": "Need a survey quoted?",
    "contactHours": "Mon–Fri: 08:00–17:00 · Site surveys by appointment · Urgent BLC requests by phone",
    "projectCaptions": [
      "BLC, Sea Point apartment transfer",
      "Sectional plan, Newlands development",
      "Subdivision survey, Hout Bay",
      "Farm consolidation, Western Cape"
    ],
    "testimonial": {
      "quote": "BLC delivered in 4 days when the transfer was under pressure. Saved our deal.",
      "author": "Christo V., Verified Client",
      "rating": 5
    },
    "imageMood": "precise, professional, technical",
    "heroImageQuery": "land surveyor using theodolite total station on tripod surveying construction site",
    "ogImageQuery": "surveyor with total station instrument on tripod measuring land outdoors",
    "aboutImageQuery": "survey team with measuring equipment hard hats on building construction site",
    "galleryImageQueries": [
      "surveyor operating theodolite total station tripod measuring land boundary",
      "cadastral boundary survey map plan drawing property lines diagram",
      "residential building site survey pegs string lines marking foundation layout",
      "aerial view land parcels property boundaries subdivision development lots"
    ]
  },
  "Property Management": {
    "heroEyebrow": "PROPERTY MANAGEMENT CAPE TOWN",
    "heroAccent": "Residential & commercial portfolios",
    "tagline": "Your investment, managed as if it were <em>ours</em>",
    "heroSubtitle": "Professional property management for residential and commercial landlords — tenant placement, maintenance, and financial reporting.",
    "ctaPrimary": "Get a Management Quote",
    "ctaSecondary": "What’s Included",
    "ctaNote": "No placement fee for new mandates · Monthly financial statements · 24hr maintenance line",
    "badge": "PPRA Registered Property Manager",
    "servicesHeading": "What We Manage",
    "services": [
      {
        "name": "Tenant Sourcing & Placement",
        "description": "Thorough tenant vetting, credit checks, lease drafting, and deposit management on your behalf.",
        "tags": [
          "Tenant Vetting",
          "Lease Management"
        ],
        "icon": "user-check",
        "serviceImageQuery": "property agent handing apartment keys to new tenant signed lease agreement documents table"
      },
      {
        "name": "Maintenance Coordination",
        "description": "24-hour maintenance line, trusted contractor network, and monthly maintenance reporting.",
        "tags": [
          "Maintenance",
          "24hr Line"
        ],
        "icon": "tool",
        "serviceImageQuery": "maintenance plumber fixing leaking sink pipe under kitchen cabinet rental apartment repair"
      },
      {
        "name": "Financial Reporting",
        "description": "Monthly owner statements, rental collection, and annual income summaries for tax purposes.",
        "tags": [
          "Financial Statements",
          "Rental Collection"
        ],
        "icon": "file-text",
        "serviceImageQuery": "rental income financial statement spreadsheet laptop monthly report property management"
      },
        {
          "name": "Body Corporate Administration",
          "description": "Full body corporate management including AGMs, trustee support, levy collection, and compliance with the Sectional Titles Act.",
          "tags": [
            "Body Corporate",
            "Levy Collection"
          ],
          "serviceImageQuery": "body corporate AGM meeting room committee trustees documents voting apartment complex"
        }
    ],
    "galleryHeading": "Properties We Manage",
    "aboutHeading": "Property managed with <em>diligence</em>",
    "aboutText": "We manage 280 residential units and 40 commercial properties in Cape Town. Every landlord receives monthly statements, prompt maintenance responses, and an agent who answers the phone.\n\nWe are PPRA registered, hold a valid Fidelity Fund Certificate, and place tenant deposits in a regulated trust account.",
    "aboutMission": "We believe a well-managed property preserves its value, retains quality tenants, and gives its owner genuine peace of mind.",
    "stats": [
      {
        "value": "15+",
        "label": "Years Managing",
        "sublabel": "since 2009"
      },
      {
        "value": "280+",
        "label": "Units Managed",
        "sublabel": "residential & commercial"
      },
      {
        "value": "97%",
        "label": "Rental Collection Rate",
        "sublabel": "month-on-month"
      },
      {
        "value": "4.8★",
        "label": "Google Rating",
        "sublabel": "from 300+ reviews"
      }
    ],
    "contactHeading": "Want your property professionally managed?",
    "contactHours": "Mon–Fri: 08:30–17:00 · Sat: 09:00–12:00 · Maintenance line 24hrs",
    "projectCaptions": [
      "6-unit apartment block, Verified Client",
      "Commercial strip, Cape Town CBD",
      "Residential portfolio, Southern Suburbs",
      "Holiday let, Atlantic Seaboard"
    ],
    "testimonial": {
      "quote": "Best decision I made with my investment property. Zero landlord stress for 4 years.",
      "author": "Jamie M., Verified Client",
      "rating": 5
    },
    "imageMood": "professional, reliable, residential",
    "heroImageQuery": "well maintained residential apartment building exterior balconies landscaped garden",
    "ogImageQuery": "residential apartment complex exterior courtyard well maintained garden paths",
    "aboutImageQuery": "property manager inspecting rental apartment interior clipboard maintenance checklist",
    "galleryImageQueries": [
      "apartment block exterior well maintained landscaped garden entrance pathway",
      "modern kitchen interior clean white rental apartment ready for tenant",
      "commercial office building exterior glass facade entrance professional",
      "holiday rental apartment interior sea view balcony furnished modern"
    ]
  },
  "Home Staging": {
    "heroEyebrow": "HOME STAGING CAPE TOWN",
    "heroAccent": "Sell faster. Sell for more.",
    "tagline": "The first impression that closes the <em>deal</em>",
    "heroSubtitle": "Professional home staging for residential properties going to market — furniture, styling, and photography-ready presentation.",
    "ctaPrimary": "Book a Staging Consult",
    "ctaSecondary": "Before & After",
    "ctaNote": "Proven to increase sale price · Furniture hire included · 48hr turnaround",
    "badge": "RESA Accredited Home Stager",
    "servicesHeading": "What We Do",
    "services": [
      {
        "name": "Full Home Staging",
        "description": "Furniture sourcing, placement, and complete styling of the property for photography and viewings.",
        "tags": [
          "Full Staging",
          "Furniture Hire"
        ],
        "icon": "home",
        "serviceImageQuery": "professionally staged open-plan living room modern neutral furniture cushions styled for property photography sale"
      },
      {
        "name": "Occupied Home Styling",
        "description": "Decluttering, furniture rearrangement, and styling of occupied homes for sale without full staging.",
        "tags": [
          "Occupied Styling",
          "Declutter"
        ],
        "icon": "layers",
        "serviceImageQuery": "decluttered minimalist master bedroom white linen crisp pillows styled for sale photography"
      },
      {
        "name": "Staging Consultation",
        "description": "Room-by-room advice and an action plan for owners who want to stage independently.",
        "tags": [
          "Consultation",
          "DIY Guidance"
        ],
        "icon": "clipboard",
        "serviceImageQuery": "home stager presenting interior mood board fabric swatches paint colour samples client meeting"
      },
        {
          "name": "Virtual Staging",
          "description": "Photorealistic virtual staging of empty rooms for online listings — no furniture hire, no waiting, delivered in 48 hours.",
          "tags": [
            "Virtual Staging",
            "Digital"
          ],
          "serviceImageQuery": "side-by-side comparison empty room virtually staged furnished interior photorealistic property listing"
        }
    ],
    "galleryHeading": "Staged to Sell",
    "aboutHeading": "Staging that makes buyers <em>feel</em> it",
    "aboutText": "Buyers make emotional decisions in the first 30 seconds of a viewing. We stage properties to create that moment — the feeling that they could live here, that this is already a home.\n\nStaged properties in Cape Town sell in 40% less time and for an average of 7% more than comparable unstaged properties.",
    "aboutMission": "We believe every property deserves to be seen at its absolute best — because the difference in price can be tens of thousands of rand.",
    "stats": [
      {
        "value": "11+",
        "label": "Years Staging",
        "sublabel": "since 2013"
      },
      {
        "value": "450+",
        "label": "Properties Staged",
        "sublabel": "Cape Town market"
      },
      {
        "value": "40%",
        "label": "Faster Sale",
        "sublabel": "vs unstaged comparable"
      },
      {
        "value": "4.9★",
        "label": "Google Rating",
        "sublabel": "from 250+ reviews"
      }
    ],
    "contactHeading": "Ready to stage your property?",
    "contactHours": "Mon–Fri: 08:30–17:00 · Sat: 09:00–13:00 · Staging by appointment",
    "projectCaptions": [
      "Full staging, 3-bed Atlantic Seaboard",
      "Occupied styling, Claremont",
      "Before & after, Sea Point apartment",
      "Vacant staging, Southern Suburbs"
    ],
    "testimonial": {
      "quote": "Listed Monday after staging, accepted offer Wednesday. R180k above asking.",
      "author": "Heather P., Verified Client",
      "rating": 5
    },
    "imageMood": "warm, aspirational, residential",
    "heroImageQuery": "professionally staged modern living room neutral furniture cushions styled for property sale",
    "ogImageQuery": "beautifully staged open plan living room dining area neutral decor property showing",
    "aboutImageQuery": "home stager styling cushions on sofa arranging decor items in living room for property sale",
    "galleryImageQueries": [
      "before after empty room transformed into styled living room with furniture staging",
      "staged dining room table set with flowers vase candles neutral tones property",
      "staged master bedroom luxury white bedding lamps side tables neutral decor",
      "staged entrance hallway console table mirror fresh flowers property styling"
    ]
  },
  "Town Planner": {
    "heroEyebrow": "TOWN PLANNER CAPE TOWN",
    "heroAccent": "SACPLAN registered. Full application service.",
    "tagline": "Planning permission, handled with <em>expertise</em>",
    "heroSubtitle": "SACPLAN-registered town planner for rezoning, land use applications, environmental authorisations, and heritage submissions.",
    "ctaPrimary": "Book a Consultation",
    "ctaSecondary": "What We Handle",
    "ctaNote": "Free initial assessment · Council liaison included · Realistic timelines always",
    "badge": "SACPLAN Registered Town Planner",
    "servicesHeading": "What We Apply For",
    "services": [
      {
        "name": "Rezoning Applications",
        "description": "Full rezoning applications managed from motivation through public participation to council approval.",
        "tags": [
          "Rezoning",
          "Land Use"
        ],
        "icon": "map",
        "serviceImageQuery": "coloured urban zoning map residential commercial industrial land use districts planning district"
      },
      {
        "name": "Departure & Consent Use",
        "description": "Departure from zoning scheme, consent use applications, and land development approvals.",
        "tags": [
          "Departure",
          "Consent Use"
        ],
        "icon": "file-text",
        "serviceImageQuery": "mixed-use residential neighbourhood aerial view apartments shops ground floor Cape Town buildings"
      },
      {
        "name": "Environmental & Heritage",
        "description": "Environmental authorisations, heritage impact assessments, and appeals for sensitive sites.",
        "tags": [
          "Environmental",
          "Heritage"
        ],
        "icon": "shield",
        "serviceImageQuery": "heritage building Victorian facade preserved restored exterior Cape Town streetscape architecture"
      },
        {
          "name": "Subdivision & Development Coordination",
          "description": "End-to-end management of subdivision applications, including surveyor liaison, council submissions, and Deeds Office registration.",
          "tags": [
            "Subdivision",
            "Development"
          ],
          "serviceImageQuery": "land subdivision site plan layout map showing individual development blocks plots survey"
        }
    ],
    "galleryHeading": "Applications Approved",
    "aboutHeading": "Planning done with <em>realism</em>",
    "aboutText": "Planning applications fail because applicants don’t understand what is and isn’t achievable on a specific site, in a specific zone, in a specific municipality. We know the City of Cape Town’s planning system inside out.\n\nWe are SACPLAN registered, we give honest assessments of application prospects, and we manage the full process.",
    "aboutMission": "We believe property owners deserve a planning consultant who tells them the truth — and then fights hard for the best possible outcome.",
    "stats": [
      {
        "value": "16+",
        "label": "Years Planning",
        "sublabel": "since 2008"
      },
      {
        "value": "400+",
        "label": "Applications Managed",
        "sublabel": "rezoning to heritage"
      },
      {
        "value": "88%",
        "label": "Application Approval Rate",
        "sublabel": "submitted applications"
      },
      {
        "value": "4.8★",
        "label": "Google Rating",
        "sublabel": "from 180+ reviews"
      }
    ],
    "contactHeading": "Want an honest planning assessment?",
    "contactHours": "Mon–Fri: 08:30–17:00 · Initial consultation by appointment · Urgent matters by phone",
    "projectCaptions": [
      "Rezoning approved, Woodstock mixed-use",
      "Heritage approval, Bo-Kaap property",
      "Subdivision consent, Constantia",
      "Environmental authorisation, West Coast"
    ],
    "testimonial": {
      "quote": "Got approval for a rezoning three other planners said was impossible. She found a way.",
      "author": "Alan R., Verified Client",
      "rating": 5
    },
    "imageMood": "professional, precise, authoritative",
    "heroImageQuery": "aerial view urban city buildings mixed use residential commercial development planning",
    "ogImageQuery": "aerial view urban development suburb buildings roads infrastructure city planning",
    "aboutImageQuery": "town planner reviewing zoning maps site plans architectural drawings at desk meeting",
    "galleryImageQueries": [
      "urban zoning map coloured land use districts residential commercial industrial planning",
      "new residential development construction site foundation phase buildings rising",
      "heritage building facade preserved restored Victorian architecture urban streetscape",
      "town planning site inspection urban development infrastructure roads buildings"
    ]
  },
  "Print Shop / Signage": {
    "heroEyebrow": "PRINT SHOP & SIGNAGE CAPE TOWN",
    "heroAccent": "Printing, signs, banners & vinyl branding",
    "tagline": "Every surface a chance to make an <em>impression</em>",
    "heroSubtitle": "Wide-format printing, custom signage, banners, and vinyl branding materials produced fast and finished to a professional standard.",
    "ctaPrimary": "Get a Quote",
    "ctaSecondary": "What We Print",
    "ctaNote": "Same-day rush available · Design service included · Free delivery in CBD",
    "badge": "FESPA Certified Wide-Format Print Studio",
    "servicesHeading": "What We Produce",
    "services": [
      {
        "name": "Signage & Banners",
        "description": "Indoor and outdoor signage, pull-up banners, and large-format display prints for any venue or event.",
        "tags": [
          "Outdoor Signs",
          "Banners"
        ],
        "icon": "monitor",
        "serviceImageQuery": "large outdoor signage banner installed on building facade colourful printed"
      },
      {
        "name": "Vinyl Branding & Wraps",
        "description": "Cut vinyl lettering, window graphics, vehicle wraps, and wall murals applied by certified installers.",
        "tags": [
          "Vinyl",
          "Vehicle Wraps"
        ],
        "icon": "truck",
        "serviceImageQuery": "vinyl cut lettering applied to glass shop window storefront branding graphics"
      },
      {
        "name": "Branding Materials & Print",
        "description": "Business cards, brochures, stickers, and branded packaging materials printed to premium specification.",
        "tags": [
          "Branding Materials",
          "Stickers"
        ],
        "icon": "file-text",
        "serviceImageQuery": "printed business cards brochures stickers branding materials stacked on table"
      },
      {
        "name": "Vehicle Wraps & Fleet Branding",
        "description": "Full and partial vehicle wraps, fleet livery, and branded van graphics designed, printed, and applied on-site.",
        "tags": [
          "Vehicle Wraps",
          "Fleet Branding"
        ],
        "icon": "truck",
        "serviceImageQuery": "vehicle wrap colourful branded delivery van parked fleet livery graphics"
      }
    ],
    "galleryHeading": "Off the Press",
    "aboutHeading": "Print made with <em>purpose</em>",
    "aboutText": "We’ve been running presses and installing signage in Cape Town since 2008. Printing is easy. Printing things that actually look the way the client imagined — that takes skill, the right equipment, and people who care about colour accuracy and finish quality.\n\nWe use UV-stable inks, commercial-grade substrates, and experienced installers for every vinyl and signage job.",
    "aboutMission": "We believe every printed surface is a brand statement — and sloppy print is a cost no business can afford.",
    "stats": [
      {
        "value": "16+",
        "label": "Years Printing",
        "sublabel": "since 2008"
      },
      {
        "value": "2,000+",
        "label": "Projects Produced",
        "sublabel": "print to installation"
      },
      {
        "value": "48hr",
        "label": "Standard Turnaround",
        "sublabel": "same-day available"
      },
      {
        "value": "4.8★",
        "label": "Google Rating",
        "sublabel": "from 380+ reviews"
      }
    ],
    "contactHeading": "Need a print or signage quote?",
    "contactHours": "Mon–Fri: 07:30–17:30 · Sat: 08:00–13:00 · Rush orders by prior arrangement",
    "projectCaptions": [
      "Retail fascia signage, Cape Town CBD",
      "Vehicle wrap, 12-van fleet branding",
      "Event banner wall, CTICC exhibition",
      "Window vinyl, Woodstock studio fitout"
    ],
    "testimonial": {
      "quote": "Fleet of 12 vans wrapped in 3 days. Every single one perfect. Incredibly professional team.",
      "author": "Dean F., Verified Client",
      "rating": 5
    },
    "imageMood": "bold, vibrant, commercial",
    "heroImageQuery": "wide format inkjet printer printing large colourful banner sign print shop production",
    "ogImageQuery": "printed vinyl banner signage display colourful large format professional print shop",
    "aboutImageQuery": "print shop operator worker checking wide format printer output colourful large banner",
    "galleryImageQueries": [
      "illuminated retail shop fascia signage night lit up storefront lettering",
      "branded vehicle wrap colourful graphics on delivery van fleet parked",
      "exhibition trade show display stand pull-up banners printed backdrop event",
      "vinyl window graphics frosted lettering installed on glass storefront shop"
    ],
    "features": [
      { "name": "Same-Day Rush Available", "description": "Need it yesterday? We offer same-day turnaround on selected products so your deadline is never missed.", "imageQuery": "industrial printing press machine running fast production print shop colourful output" },
      { "name": "In-House Design Service", "description": "Don't have artwork? Our design team will create it for you at no extra charge on qualifying orders.", "imageQuery": "designer creating signage artwork layout on computer screen graphic design studio" },
      { "name": "Installation Team on Staff", "description": "We don't just print it \u2014 we install it. Vehicle wraps, building signage, window graphics, all fitted by our own crew.", "imageQuery": "workers installing shop signage fascia on building exterior ladder professional" }
    ]
  },
}
