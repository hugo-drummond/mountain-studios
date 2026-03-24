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
  projectCaptions?: string[]
  testimonial: { quote: string; author: string; rating: number }
  imageMood: string
  heroImageQuery: string
  heroBgImageQuery?: string
  ogImageQuery: string
  aboutImageQuery: string
  galleryImageQueries: string[]
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
        "serviceImageQuery": "fine dining plated dish white tablecloth restaurant"
      },
      {
        "name": "Private Functions",
        "description": "Exclusive venue hire for corporate dinners, birthdays, and intimate celebrations of any size.",
        "tags": [
          "Private Hire",
          "Events"
        ],
        "serviceImageQuery": "private dining room long table set for event"
      },
      {
        "name": "Wine Pairing",
        "description": "Curated Cape wine pairings selected by our in-house sommelier for every course.",
        "tags": [
          "Sommelier",
          "Cape Wines"
        ],
        "serviceImageQuery": "wine bottle glasses poured at restaurant table"
      },
      {
        "name": "Sunday Brunch",
        "description": "A leisurely weekend spread of eggs Benedict, freshly baked pastries, and bottomless mimosas.",
        "tags": [
          "Brunch",
          "Weekend"
        ],
        "serviceImageQuery": "brunch table spread eggs pastries juice morning"
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
      "author": "Sipho M., Cape Town",
      "rating": 5
    },
    "imageMood": "warm, moody, intimate",
    "heroImageQuery": "restaurant dining table plates wine glasses candlelight evening",
    "ogImageQuery": "fine dining table set white plates wine restaurant",
    "aboutImageQuery": "chef plating dishes in restaurant kitchen line",
    "galleryImageQueries": [
      "restaurant interior booth seating warm pendant lights",
      "grilled steak plated garnished fine dining",
      "cocktails bar counter restaurant evening",
      "restaurant outdoor terrace dining table set"
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
        "serviceImageQuery": "espresso machine pouring shot coffee café"
      },
      {
        "name": "All-Day Brunch",
        "description": "House-baked pastries, toasted sandwiches, and grain bowls made fresh every morning.",
        "tags": [
          "Brunch",
          "Baked Fresh"
        ],
        "serviceImageQuery": "café display cabinet pastries sandwiches glass counter"
      },
      {
        "name": "Retail Beans",
        "description": "Take home our house roast whole-bean or ground, freshly bagged and labelled each week.",
        "tags": [
          "Take-Home",
          "Gift Bags"
        ],
        "serviceImageQuery": "coffee beans roasted bag scoop wooden surface"
      },
      {
        "name": "Meeting & Co-Working Space",
        "description": "Free WiFi, plug points at every table, and a quiet corner perfect for laptops and small meetings.",
        "tags": [
          "WiFi",
          "Co-Working"
        ],
        "serviceImageQuery": "café interior laptop table coffee cup workspace"
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
      "author": "Lerato K., Woodstock",
      "rating": 5
    },
    "imageMood": "bright, cosy, textured",
    "heroImageQuery": "latte art coffee cup wooden table café warm light",
    "ogImageQuery": "cappuccino latte art ceramic cup café table",
    "aboutImageQuery": "barista making espresso behind café counter",
    "galleryImageQueries": [
      "café interior wooden tables pendant lights cosy",
      "croissant pastry plate coffee cup café table",
      "espresso machine portafilter coffee beans close-up",
      "iced coffee glass straw café counter summer"
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
        "serviceImageQuery": "artisan sourdough loaf crusty golden bakery"
      },
      {
        "name": "Pastries & Viennoiserie",
        "description": "Laminated croissants, pain au chocolat, and morning pastries made with French butter.",
        "tags": [
          "Croissants",
          "French Butter"
        ],
        "serviceImageQuery": "decorated wedding cake tiered white flowers bakery"
      },
      {
        "name": "Custom Celebration Cakes",
        "description": "Bespoke layered cakes for birthdays, weddings, and events \u2014 designed and baked to order.",
        "tags": [
          "Custom Cakes",
          "Wedding Cakes"
        ],
        "serviceImageQuery": "pastry croissant danish display tray bakery"
      },
      {
        "name": "Bread Subscriptions",
        "description": "Weekly loaf deliveries straight to your door — choose your favourites and we bake them fresh.",
        "tags": [
          "Subscription",
          "Weekly Delivery"
        ],
        "serviceImageQuery": "bread loaves basket assorted fresh baked"
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
      "author": "Annika V., Cape Town",
      "rating": 5
    },
    "imageMood": "warm, golden, rustic",
    "heroImageQuery": "artisan bread loaves sourdough display shelf bakery",
    "ogImageQuery": "fresh baked bread loaves bakery shelf morning",
    "aboutImageQuery": "baker kneading dough flour wooden table hands",
    "galleryImageQueries": [
      "bakery display case cupcakes pastries croissants glass",
      "sourdough bread sliced cutting board rustic table",
      "cinnamon rolls tray fresh baked golden icing",
      "bakery interior counter shelves bread warm light"
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
        "serviceImageQuery": "craft beer taps row bar counter pouring glass"
      },
      {
        "name": "Pub Kitchen",
        "description": "No-nonsense bar food: loaded burgers, nachos, and proper fish and chips done right.",
        "tags": [
          "Pub Grub",
          "Burgers"
        ],
        "serviceImageQuery": "cocktail mixing bartender shaker bar counter"
      },
      {
        "name": "Live Sport & Events",
        "description": "Multiple big screens showing all major sports, plus quiz nights and live music evenings.",
        "tags": [
          "Live Sport",
          "Quiz Night"
        ],
        "serviceImageQuery": "bar food burger fries plate pub table"
      },
      {
        "name": "Cocktail Menu",
        "description": "Signature cocktails, classic mixes, and seasonal specials shaken and stirred by our bar team.",
        "tags": [
          "Cocktails",
          "Signature Drinks"
        ],
        "serviceImageQuery": "cocktail drinks colourful glasses bar counter"
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
      "author": "Ruan O., Cape Town",
      "rating": 5
    },
    "imageMood": "dark, warm, lively",
    "heroImageQuery": "bar counter cocktails glasses neon light evening interior",
    "ogImageQuery": "craft beer tap handles bar counter glasses",
    "aboutImageQuery": "bartender mixing cocktail shaker bar counter close-up",
    "galleryImageQueries": [
      "pub interior wooden bar stools warm lighting",
      "cocktail glasses garnished bar counter colourful drinks",
      "craft beer flight tasting glasses wooden paddle",
      "bar snacks platter nachos wings table"
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
        "serviceImageQuery": "fresh meat cuts steak butcher counter display"
      },
      {
        "name": "House Charcuterie",
        "description": "Hand-crafted bacon, boerewors, biltong, and cured meats made in small batches in-house.",
        "tags": [
          "Biltong",
          "Boerewors"
        ],
        "serviceImageQuery": "deli sandwich prepared counter meats cheeses"
      },
      {
        "name": "Deli & Platters",
        "description": "Artisan cheeses, antipasti, and deli boards assembled fresh daily for entertaining.",
        "tags": [
          "Cheese Board",
          "Antipasti"
        ],
        "serviceImageQuery": "biltong dried meat South African snack display"
      },
      {
        "name": "Braai Packs & Marinades",
        "description": "Ready-to-braai packs with marinated chops, boerewors, and sosaties — just add fire.",
        "tags": [
          "Braai Packs",
          "Marinades"
        ],
        "serviceImageQuery": "marinated meat skewers braai pack tray"
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
      "author": "Johan S., Cape Town",
      "rating": 5
    },
    "imageMood": "rich, rustic, earthy",
    "heroImageQuery": "butcher shop counter fresh meat cuts display refrigerated",
    "ogImageQuery": "premium steak cuts displayed butcher counter",
    "aboutImageQuery": "butcher cutting meat cleaver wooden block apron",
    "galleryImageQueries": [
      "deli counter meats cheeses display glass case",
      "raw steak cuts marbled beef wooden board",
      "sausages hanging butcher shop cured meats",
      "butcher shop interior counter scale refrigerator"
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
        "serviceImageQuery": "corporate catering buffet platters conference room"
      },
      {
        "name": "Wedding & Private Events",
        "description": "Bespoke menus for weddings, birthdays, and milestone events with full table service.",
        "tags": [
          "Wedding",
          "Table Service"
        ],
        "serviceImageQuery": "wedding reception dinner table set flowers candles"
      },
      {
        "name": "Cocktail & Canape Parties",
        "description": "Sophisticated finger food and canape stations for launches, cocktail evenings, and networking.",
        "tags": [
          "Canapes",
          "Cocktail Events"
        ],
        "serviceImageQuery": "canapes finger food platter served catering event"
      },
      {
        "name": "Meal Prep & Drop-Off",
        "description": "Weekly meal prep packages delivered to your home or office — wholesome food without the cooking.",
        "tags": [
          "Meal Prep",
          "Drop-Off"
        ],
        "serviceImageQuery": "meal prep containers portioned food packed"
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
      "author": "Priya N., Cape Town",
      "rating": 5
    },
    "imageMood": "elegant, abundant, professional",
    "heroImageQuery": "catering buffet table elegant setup platters trays event",
    "ogImageQuery": "catering event buffet table platters serving dishes",
    "aboutImageQuery": "catering team preparing food trays in kitchen",
    "galleryImageQueries": [
      "catering banquet table set with plates cutlery glasses",
      "canapes appetizer platters on serving trays event",
      "wedding reception long table set with flowers plates",
      "dessert table catering display cakes macarons"
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
        "serviceImageQuery": "burger meal fries drink fast food combo"
      },
      {
        "name": "Family Packs",
        "description": "Value-packed bundles designed to feed the whole family without breaking the budget.",
        "tags": [
          "Family Value",
          "Bulk Orders"
        ],
        "serviceImageQuery": "pizza box open takeaway delivery pepperoni"
      },
      {
        "name": "Delivery & Collect",
        "description": "Order online for lightning-fast delivery or skip the queue with click-and-collect.",
        "tags": [
          "Delivery",
          "Click & Collect"
        ],
        "serviceImageQuery": "chicken wrap burrito fast food foil packaging"
      },
      {
        "name": "Loyalty & Rewards",
        "description": "Earn stamps on every order and get your tenth meal free — because regulars deserve a perk.",
        "tags": [
          "Loyalty Card",
          "Rewards"
        ],
        "serviceImageQuery": "takeaway paper bags counter fast food packaged"
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
      "author": "Themba D., Cape Town",
      "rating": 5
    },
    "imageMood": "bold, vibrant, appetising",
    "heroImageQuery": "burger fries takeaway container fast food close-up",
    "ogImageQuery": "burger and fries takeaway box fast food",
    "aboutImageQuery": "fast food kitchen grill preparation counter",
    "galleryImageQueries": [
      "takeaway counter ordering screen fast food restaurant",
      "loaded burger cheese bacon close-up bun",
      "fried chicken wings crispy plate dipping sauce",
      "milkshake tall glass straw fast food counter"
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
        "serviceImageQuery": "food truck burger served window outdoor market"
      },
      {
        "name": "Market Weekends",
        "description": "Find us at Cape Town's best markets every Saturday and Sunday with our full menu.",
        "tags": [
          "Markets",
          "Weekend"
        ],
        "serviceImageQuery": "food truck tacos street food plated"
      },
      {
        "name": "Private Events & Catering",
        "description": "Bring the truck to your corporate event, birthday, or street party \u2014 we handle everything.",
        "tags": [
          "Private Hire",
          "Events"
        ],
        "serviceImageQuery": "food truck coffee served window latte cup"
      },
      {
        "name": "Festival & Pop-Up Bookings",
        "description": "Book us for food festivals, pop-up markets, and neighbourhood events across the Western Cape.",
        "tags": [
          "Festivals",
          "Pop-Ups"
        ],
        "serviceImageQuery": "outdoor food market stalls street festival"
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
      "author": "Cara B., Sea Point",
      "rating": 5
    },
    "imageMood": "vibrant, casual, energetic",
    "heroImageQuery": "food truck serving window customers street food market",
    "ogImageQuery": "food truck street vendor serving customers queue",
    "aboutImageQuery": "food truck chef cooking grill serving window",
    "galleryImageQueries": [
      "food truck parked colourful painted exterior market",
      "street tacos plate food truck served",
      "food truck festival night lights crowd eating",
      "food truck menu board handwritten specials"
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
        "serviceImageQuery": "fresh pressed juice bottles green orange colourful"
      },
      {
        "name": "Superfood Smoothies",
        "description": "Blended bowls and smoothies packed with adaptogens, protein, and seasonal fruits.",
        "tags": [
          "Smoothie Bowl",
          "Protein"
        ],
        "serviceImageQuery": "smoothie bowl acai topped berries granola"
      },
      {
        "name": "Wellness Shots & Cleanses",
        "description": "Daily immunity shots and 3- to 5-day juice cleanses designed to reset your system.",
        "tags": [
          "Immunity Shots",
          "Cleanse"
        ],
        "serviceImageQuery": "detox juice cleanse bottles labelled refrigerator"
      },
      {
        "name": "Açaí & Smoothie Bowls",
        "description": "Thick-blended açaí, pitaya, and green bowls topped with granola, seeds, and seasonal fruit.",
        "tags": [
          "Açaí Bowls",
          "Toppings"
        ],
        "serviceImageQuery": "acai bowl topped granola fruit seeds close-up"
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
      "author": "Nomvula H., Green Point",
      "rating": 5
    },
    "imageMood": "fresh, bright, clean",
    "heroImageQuery": "fresh juice glasses colourful smoothie bowls fruit counter",
    "ogImageQuery": "colourful smoothie glasses fruit garnish juice bar",
    "aboutImageQuery": "blender smoothie preparation fresh fruit counter juice bar",
    "galleryImageQueries": [
      "juice bar counter fresh fruit display blender",
      "acai bowl topped granola banana berries",
      "green juice celery spinach glass fresh pressed",
      "smoothie bottles colourful lined up refrigerator"
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
        "serviceImageQuery": "pizza delivery box opened pepperoni cheese"
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
      "author": "Marco F., Cape Town",
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
        "serviceImageQuery": "dim sum bamboo steamer dumplings Asian"
      },
      {
        "name": "Omakase Experience",
        "description": "Leave it to the chef \u2014 a curated multi-course omakase menu at the counter or at your table.",
        "tags": [
          "Omakase",
          "Chef's Choice"
        ],
        "serviceImageQuery": "stir fry wok noodles vegetables Asian kitchen"
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
      "author": "Yuki T., Cape Town",
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
        "serviceImageQuery": "ice cream sundae bowl toppings chocolate"
      },
      {
        "name": "Cakes & Catering",
        "description": "Gelato cakes and wholesale catering for events, restaurants, and corporate clients.",
        "tags": [
          "Gelato Cakes",
          "Wholesale"
        ],
        "serviceImageQuery": "frozen yogurt cup toppings fruit sprinkles"
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
      "author": "Sofia M., Cape Town",
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
      "author": "Claire D., Cape Town",
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
      "author": "James T., London",
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
        "serviceImageQuery": "hotel conference room meeting table chairs"
      },
      {
        "name": "Fine Dining Restaurant",
        "description": "In-house restaurant serving contemporary South African cuisine for breakfast, lunch, and dinner.",
        "tags": [
          "Restaurant",
          "Fine Dining"
        ],
        "serviceImageQuery": "hotel spa pool indoor treatment wellness"
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
      "author": "Sarah L., London",
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
        "name": "Women's & Men's Collections",
        "description": "Seasonal clothing lines from emerging and established designers, refreshed monthly.",
        "tags": ["Women's", "Men's"],
        "serviceImageQuery": "clothing rack dresses hanging in fashion store"
      },
      {
        "name": "Shoes & Accessories",
        "description": "Curated footwear, bags, jewellery, and accessories to complete every outfit.",
        "tags": ["Shoes", "Accessories"],
        "serviceImageQuery": "shoes displayed on shelves fashion retail store"
      },
      {
        "name": "Personal Styling",
        "description": "Complimentary personal styling consultations in-store \u2014 we help you find what works for you.",
        "tags": ["Styling", "Consultation"],
        "serviceImageQuery": "fashion accessories scarves bags jewellery counter display"
      },
      {
        "name": "Alterations & Tailoring",
        "description": "In-house alterations so everything you buy fits like it was made for you.",
        "tags": [
          "Alterations",
          "Tailoring"
        ],
        "serviceImageQuery": "sewing machine thread fabric alteration close-up"
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
      "author": "Samantha K., Cape Town",
      "rating": 5
    },
    "imageMood": "stylish, warm, curated",
    "heroImageQuery": "clothing store interior hanging rails garments organised racks",
    "ogImageQuery": "clothing rack fashion store garments hanging",
    "aboutImageQuery": "shop assistant arranging clothing on display table",
    "galleryImageQueries": [
      "clothing store interior racks hangers organised",
      "fashion accessories display scarves bags shelf",
      "fitting room mirror clothing store curtain",
      "clothing store window display mannequins dressed"
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
        "serviceImageQuery": "fresh produce fruit vegetables displayed grocery"
      },
      {
        "name": "Artisan & Specialty Goods",
        "description": "Craft breads, local honey, preserves, coffee, and specialty foods you won't find in chain stores.",
        "tags": ["Artisan", "Specialty"],
        "serviceImageQuery": "deli counter prepared meals salads grocery"
      },
      {
        "name": "Everyday Essentials",
        "description": "Pantry staples, household goods, and everyday groceries at fair prices with no membership needed.",
        "tags": ["Pantry", "Household"],
        "serviceImageQuery": "grocery delivery bags packed products doorstep"
      },
      {
        "name": "Online Ordering & Delivery",
        "description": "Order your weekly shop online and we deliver same-day — packed by the same team who stock the shelves.",
        "tags": [
          "Online Orders",
          "Same-Day Delivery"
        ],
        "serviceImageQuery": "grocery basket filled products counter checkout"
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
      "author": "Karen P., Cape Town",
      "rating": 5
    },
    "imageMood": "fresh, natural, inviting",
    "heroImageQuery": "grocery store fresh produce fruit vegetables display shelves",
    "ogImageQuery": "grocery store produce aisle fresh vegetables fruit",
    "aboutImageQuery": "grocer arranging fresh produce on display shelf",
    "galleryImageQueries": [
      "grocery store interior aisles shelves stocked products",
      "fresh vegetables crates market display tomatoes peppers",
      "deli counter meats cheeses grocery store",
      "bakery section bread loaves grocery store"
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
        "serviceImageQuery": "retail products displayed shelves organised store"
      },
      {
        "name": "Online Store",
        "description": "Shop our full range online with fast dispatch and free delivery on orders over R500.",
        "tags": ["Online", "Fast Delivery"],
        "serviceImageQuery": "gift wrapping counter retail store packaging"
      },
      {
        "name": "Gift Wrapping & Cards",
        "description": "Complimentary gift wrapping and personalised cards on any in-store or online purchase.",
        "tags": ["Gift Wrap", "Personalised"],
        "serviceImageQuery": "retail delivery packages boxed products"
      },
      {
        "name": "Loyalty Programme",
        "description": "Earn points on every purchase and unlock exclusive discounts, early access, and birthday treats.",
        "tags": [
          "Loyalty",
          "Rewards"
        ],
        "serviceImageQuery": "retail counter shopping bags branded packaging"
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
      "author": "Deborah M., Cape Town",
      "rating": 5
    },
    "imageMood": "warm, curated, inviting",
    "heroImageQuery": "retail shop interior shelves products display counter",
    "ogImageQuery": "retail shop interior display shelves products",
    "aboutImageQuery": "shop owner arranging products on display shelf",
    "galleryImageQueries": [
      "retail store interior shelves products organised",
      "shop counter products gift wrap display",
      "retail store window display storefront street view",
      "curated homeware products displayed on shelf"
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
        "serviceImageQuery": "boutique clothing rack curated dresses elegant"
      },
      {
        "name": "Accessories & Jewellery",
        "description": "Curated bags, scarves, jewellery, and finishing pieces that complete any outfit.",
        "tags": [
          "Accessories",
          "Jewellery"
        ],
        "serviceImageQuery": "designer handbags jewellery accessories displayed boutique shelf"
      },
      {
        "name": "Personal Styling",
        "description": "Book a one-on-one styling session to refresh your wardrobe with a professional eye.",
        "tags": [
          "Personal Styling",
          "Wardrobe Edit"
        ],
        "serviceImageQuery": "clothing rack with curated designer dresses elegant boutique"
      },
      {
        "name": "Trunk Shows & Pop-Ups",
        "description": "Seasonal trunk shows featuring guest designers and exclusive limited-edition capsule collections.",
        "tags": [
          "Trunk Shows",
          "Limited Edition"
        ],
        "serviceImageQuery": "fashion pop-up event clothing displayed gallery"
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
      "author": "Thandeka N., Cape Town",
      "rating": 5
    },
    "imageMood": "elegant, minimal, editorial",
    "heroImageQuery": "boutique interior clothing rack elegant minimal hangers",
    "ogImageQuery": "boutique fashion store interior clothing display",
    "aboutImageQuery": "boutique owner styling mannequin in store",
    "galleryImageQueries": [
      "boutique interior minimal clothing rack hangers",
      "designer handbags displayed shelf boutique store",
      "boutique fitting room mirror curtain elegant",
      "boutique window display mannequin dressed storefront"
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
        "serviceImageQuery": "fresh flower bouquet wrapped hand delivery"
      },
      {
        "name": "Wedding & Event Florals",
        "description": "Full floral design for weddings, events, and corporate installations from brief to breakdown.",
        "tags": [
          "Wedding Flowers",
          "Event Design"
        ],
        "serviceImageQuery": "wedding flowers bouquet arrangement ceremony"
      },
      {
        "name": "Weekly Flower Subscriptions",
        "description": "Seasonal blooms delivered to your home or office every week, styled in a signature vase.",
        "tags": [
          "Subscription",
          "Weekly Delivery"
        ],
        "serviceImageQuery": "corporate flower arrangement vase office reception"
      },
      {
        "name": "Dried & Preserved Florals",
        "description": "Long-lasting dried and preserved arrangements that hold their beauty for months without water.",
        "tags": [
          "Dried Flowers",
          "Preserved"
        ],
        "serviceImageQuery": "dried flower arrangement vase preserved bouquet"
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
      "author": "Nadine B., Cape Town",
      "rating": 5
    },
    "imageMood": "lush, romantic, botanical",
    "heroImageQuery": "florist shop buckets fresh flowers roses tulips colourful",
    "ogImageQuery": "flower bouquet roses wrapped florist shop",
    "aboutImageQuery": "florist arranging bouquet hands flowers ribbon table",
    "galleryImageQueries": [
      "florist shop interior buckets flowers display",
      "wedding bouquet white roses greenery ribbon",
      "flower arrangement vase table centrepiece",
      "dried flower bouquet wrapped kraft paper"
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
        "serviceImageQuery": "gift hamper basket wrapped products ribbon"
      },
      {
        "name": "Custom Gift Boxes",
        "description": "Build a personalised gift box with your chosen products, branded or wrapped to order.",
        "tags": [
          "Gift Boxes",
          "Personalised"
        ],
        "serviceImageQuery": "scented candles display jars gift shop shelf"
      },
      {
        "name": "Corporate Gifting",
        "description": "Bulk corporate gift orders with branded packaging, personalised notes, and delivery.",
        "tags": [
          "Corporate Gifts",
          "Bulk Orders"
        ],
        "serviceImageQuery": "personalised gifts engraved mugs frames"
      },
      {
        "name": "Kids & Baby Gifts",
        "description": "Beautifully made toys, blankets, and keepsakes for new arrivals and little ones.",
        "tags": [
          "Baby Gifts",
          "Kids"
        ],
        "serviceImageQuery": "baby gift set blanket toy box wrapped"
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
      "author": "Gareth P., Cape Town",
      "rating": 5
    },
    "imageMood": "warm, curated, celebratory",
    "heroImageQuery": "gift shop interior shelves candles homeware mugs display",
    "ogImageQuery": "gift shop interior curated display homeware",
    "aboutImageQuery": "shop owner wrapping gift with ribbon at counter",
    "galleryImageQueries": [
      "gift shop shelves products candles ceramics",
      "greeting cards display rack gift shop",
      "gift wrapping ribbon bows tissue paper table",
      "handmade crafts pottery display gift shop"
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
        "serviceImageQuery": "engagement ring diamond gold jewellery close-up"
      },
      {
        "name": "Fine Jewellery Collection",
        "description": "Ready-to-wear and made-to-order pieces in gold, silver, and platinum with ethically sourced stones.",
        "tags": [
          "Fine Jewellery",
          "Ethical Stones"
        ],
        "serviceImageQuery": "custom jewellery design workshop goldsmith bench"
      },
      {
        "name": "Repairs & Remodelling",
        "description": "Restore inherited pieces or transform old jewellery into something new and wearable.",
        "tags": [
          "Repairs",
          "Heirloom Reset"
        ],
        "serviceImageQuery": "jewellery repair polishing tools workbench"
      },
      {
        "name": "Engraving & Personalisation",
        "description": "Custom engraving on rings, pendants, and watches — dates, initials, or a message that matters.",
        "tags": [
          "Engraving",
          "Personalised"
        ],
        "serviceImageQuery": "engraved ring inscription close-up jewellery"
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
      "author": "Michael A., Cape Town",
      "rating": 5
    },
    "imageMood": "luxurious, intimate, precise",
    "heroImageQuery": "jewellery display case rings necklaces velvet tray",
    "ogImageQuery": "diamond ring jewellery display velvet box",
    "aboutImageQuery": "jeweller goldsmith workbench tools magnifier close-up",
    "galleryImageQueries": [
      "jewellery store display case rings gold silver",
      "engagement ring diamond close-up velvet box",
      "gold necklace pendant chain jewellery display",
      "jeweller workshop tools bench magnifier lamp"
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
        "serviceImageQuery": "living room sofa armchair coffee table showroom"
      },
      {
        "name": "Custom Orders",
        "description": "Bespoke furniture made to your dimensions, timber choice, and finish \u2014 designed in our workshop.",
        "tags": [
          "Custom",
          "Bespoke"
        ],
        "serviceImageQuery": "custom furniture workshop carpenter wood crafting"
      },
      {
        "name": "Interior Styling",
        "description": "Our in-house stylists help you select and arrange pieces that work for your specific space.",
        "tags": [
          "Styling",
          "Space Planning"
        ],
        "serviceImageQuery": "interior styled room armchair lamp side table"
      },
      {
        "name": "Delivery & Assembly",
        "description": "White-glove delivery and assembly in your home — we place it exactly where you want it.",
        "tags": [
          "White-Glove",
          "Assembly"
        ],
        "serviceImageQuery": "furniture delivery wrapped moving blanket truck"
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
      "author": "Ronel V., Cape Town",
      "rating": 5
    },
    "imageMood": "warm, natural, crafted",
    "heroImageQuery": "furniture showroom sofa dining table chairs display",
    "ogImageQuery": "furniture showroom interior sofa table chairs",
    "aboutImageQuery": "carpenter sanding solid wood table in workshop",
    "galleryImageQueries": [
      "furniture showroom living room sofa coffee table",
      "dining table solid wood chairs set showroom",
      "bedroom furniture bed headboard side tables",
      "outdoor furniture patio table chairs garden"
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
        "serviceImageQuery": "power tools drill saw display hardware shelf"
      },
      {
        "name": "Fixings, Paint & Materials",
        "description": "Screws, bolts, paints, adhesives, and building materials stocked in depth for trade and retail.",
        "tags": [
          "Fixings",
          "Paint Range"
        ],
        "serviceImageQuery": "paint mixing machine colour matching hardware store"
      },
      {
        "name": "Trade Accounts & Delivery",
        "description": "Open a trade account for invoiced orders, credit terms, and priority delivery to site.",
        "tags": [
          "Trade Accounts",
          "Delivery"
        ],
        "serviceImageQuery": "key cutting machine hardware store counter"
      },
      {
        "name": "Key Cutting & Gas Refills",
        "description": "While-you-wait key cutting, gas bottle exchanges, and number plate making at the counter.",
        "tags": [
          "Key Cutting",
          "Gas Refills"
        ],
        "serviceImageQuery": "plumbing fittings pipes display hardware aisle"
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
      "author": "Brett H., Cape Town",
      "rating": 5
    },
    "imageMood": "industrial, practical, reliable",
    "heroImageQuery": "hardware store interior shelves tools drills screws",
    "ogImageQuery": "hardware store tools display shelves organised",
    "aboutImageQuery": "hardware store aisle tools organised shelves pegboard",
    "galleryImageQueries": [
      "hardware store shelves power tools drills saws",
      "paint cans colour swatches display hardware store",
      "plumbing fittings pipes shelf hardware store",
      "nuts bolts screws organised bins hardware"
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
        "serviceImageQuery": "book display stack new releases table"
      },
      {
        "name": "Staff Picks & Events",
        "description": "Monthly staff recommendations, author evenings, and book club events in the store.",
        "tags": [
          "Staff Picks",
          "Author Events"
        ],
        "serviceImageQuery": "children story time reading bookshop corner"
      },
      {
        "name": "Special Orders & Gift Cards",
        "description": "Source any title in print within 48 hours, or let us choose for someone with a gift card.",
        "tags": [
          "Special Orders",
          "Gift Cards"
        ],
        "serviceImageQuery": "book gift wrapped ribbon bow"
      },
      {
        "name": "Children's Section",
        "description": "A dedicated kids corner with picture books, middle-grade fiction, and age-guided recommendations.",
        "tags": [
          "Children's Books",
          "Picture Books"
        ],
        "serviceImageQuery": "children books colourful shelf display illustrated"
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
      "author": "Catherine W., Cape Town",
      "rating": 5
    },
    "imageMood": "warm, literary, inviting",
    "heroImageQuery": "bookshop interior shelves books stacked warm light cosy",
    "ogImageQuery": "bookshop shelves books stacked warm lighting",
    "aboutImageQuery": "person reading book armchair bookshop cosy corner",
    "galleryImageQueries": [
      "bookshop interior shelves floor ceiling books",
      "book display table new releases bestsellers",
      "children books section colourful bookshop shelf",
      "book stack reading glasses coffee table"
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
        "serviceImageQuery": "prescription medicine bottles pharmacy counter"
      },
      {
        "name": "Chronic Medication Management",
        "description": "Streamlined chronic scripts, auto-refill reminders, and home delivery for regular medications.",
        "tags": [
          "Chronic Meds",
          "Home Delivery"
        ],
        "serviceImageQuery": "vitamins supplements shelf display pharmacy"
      },
      {
        "name": "Health Screenings",
        "description": "Walk-in blood pressure, glucose, cholesterol, and BMI screenings with pharmacist consultation.",
        "tags": [
          "Blood Pressure",
          "Glucose"
        ],
        "serviceImageQuery": "pharmacist blood pressure check health screening"
      },
      {
        "name": "Vaccinations & Travel Health",
        "description": "Flu jabs, travel vaccinations, and immunisation records managed by our qualified pharmacists.",
        "tags": [
          "Vaccinations",
          "Travel Health"
        ],
        "serviceImageQuery": "vaccination injection syringe medical vial"
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
      "author": "Patricia L., Cape Town",
      "rating": 5
    },
    "imageMood": "clean, trustworthy, professional",
    "heroImageQuery": "pharmacy interior shelves medicine counter dispensary clean",
    "ogImageQuery": "pharmacy counter dispensary shelves medicine",
    "aboutImageQuery": "pharmacist dispensing medicine counter patient consultation",
    "galleryImageQueries": [
      "pharmacy interior clean shelves products organised",
      "pharmacist consultation counter patient medicine",
      "vitamins supplements display shelf pharmacy",
      "prescription medication bottles pharmacy dispensary"
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
        "serviceImageQuery": "educational building blocks STEM toys display shelf"
      },
      {
        "name": "Games & Puzzles",
        "description": "Family board games, strategy puzzles, and cooperative games for every age and group size.",
        "tags": [
          "Board Games",
          "Puzzles"
        ],
        "serviceImageQuery": "board games puzzles stacked on shelf toy store"
      },
      {
        "name": "Birthday Gifting",
        "description": "Age-appropriate gift suggestions from our team \u2014 perfectly wrapped and ready to delight.",
        "tags": [
          "Birthday Gifts",
          "Wrapping"
        ],
        "serviceImageQuery": "toy gift wrapped ribbon box birthday"
      },
      {
        "name": "Outdoor & Active Play",
        "description": "Trampolines, scooters, sandpits, and garden games that get kids moving and off screens.",
        "tags": [
          "Outdoor Toys",
          "Active Play"
        ],
        "serviceImageQuery": "outdoor toys scooter trampoline garden play"
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
      "author": "Karen S., Cape Town",
      "rating": 5
    },
    "imageMood": "bright, playful, warm",
    "heroImageQuery": "toy store interior shelves colourful toys stuffed animals display",
    "ogImageQuery": "toy store shelves colourful toys display",
    "aboutImageQuery": "children toys educational blocks puzzles colourful display",
    "galleryImageQueries": [
      "toy store interior colourful shelves stuffed animals",
      "board games puzzles stacked display shelf",
      "educational toys building blocks LEGO display",
      "toy store window display children dolls cars"
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
        "serviceImageQuery": "laptop computers display electronics store counter"
      },
      {
        "name": "Smart Home & Accessories",
        "description": "Smart speakers, routers, earbuds, and accessories from brands that actually last.",
        "tags": [
          "Smart Home",
          "Accessories"
        ],
        "serviceImageQuery": "phone repair technician tools screen electronics"
      },
      {
        "name": "Repairs & Trade-Ins",
        "description": "Screen repairs, battery replacements, and trade-ins completed by certified technicians.",
        "tags": [
          "Repairs",
          "Trade-Ins"
        ],
        "serviceImageQuery": "home entertainment TV display electronics showroom"
      },
      {
        "name": "Setup & Installation",
        "description": "On-site setup for TVs, sound systems, home networks, and smart home devices — done properly.",
        "tags": [
          "Installation",
          "Home Setup"
        ],
        "serviceImageQuery": "TV mounted wall living room entertainment system"
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
      "author": "Simon R., Cape Town",
      "rating": 5
    },
    "imageMood": "clean, modern, technical",
    "heroImageQuery": "electronics store display laptops phones tablets counter",
    "ogImageQuery": "electronics store laptops phones display counter",
    "aboutImageQuery": "electronics shelf headphones speakers gadgets display",
    "galleryImageQueries": [
      "electronics store interior displays screens phones",
      "laptop display open screens electronics counter",
      "headphones speakers audio display shelf electronics",
      "smartphone accessories cases chargers display rack"
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
        "serviceImageQuery": "running shoes training sneakers display shelf"
      },
      {
        "name": "Outdoor & Adventure",
        "description": "Hiking packs, trail apparel, and outdoor gear from Salomon, The North Face, and more.",
        "tags": [
          "Hiking",
          "Trail"
        ],
        "serviceImageQuery": "sports clothing activewear rack display store"
      },
      {
        "name": "Team Sport Equipment",
        "description": "Rugby, cricket, soccer, and swimming gear for clubs, schools, and individuals.",
        "tags": [
          "Team Sport",
          "Cricket"
        ],
        "serviceImageQuery": "outdoor camping gear backpacks tents display"
      },
      {
        "name": "Racket Restringing & Repairs",
        "description": "In-store racket restringing, ski servicing, and equipment repairs by qualified technicians.",
        "tags": [
          "Restringing",
          "Equipment Repair"
        ],
        "serviceImageQuery": "tennis racket strings close-up sports equipment"
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
      "author": "Candice J., Cape Town",
      "rating": 5
    },
    "imageMood": "energetic, technical, outdoors",
    "heroImageQuery": "sports store interior running shoes display shelves gear",
    "ogImageQuery": "sports gear shoes equipment store display",
    "aboutImageQuery": "running shoes display wall sports store shelves",
    "galleryImageQueries": [
      "sports store running shoes wall display shelves",
      "cycling gear helmets bikes sports store",
      "fitness equipment dumbbells mats sports store",
      "outdoor hiking backpacks camping gear display"
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
        "serviceImageQuery": "fresh produce vegetables fruit supermarket display"
      },
      {
        "name": "In-Store Butchery & Bakery",
        "description": "Full-service butchery with custom cuts and a bakery baking fresh bread and pastries daily.",
        "tags": [
          "Butchery",
          "In-Store Bakery"
        ],
        "serviceImageQuery": "grocery delivery bags doorstep packed products"
      },
      {
        "name": "Online Shopping & Delivery",
        "description": "Same-day delivery and next-morning click-and-collect for your full weekly shop.",
        "tags": [
          "Delivery",
          "Click & Collect"
        ],
        "serviceImageQuery": "deli counter prepared food supermarket"
      },
      {
        "name": "Loyalty Card & Weekly Specials",
        "description": "Swipe your loyalty card for points on every shop and exclusive access to our weekly specials.",
        "tags": [
          "Loyalty Card",
          "Weekly Specials"
        ],
        "serviceImageQuery": "supermarket checkout counter bags groceries"
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
      "author": "Zelda M., Cape Town",
      "rating": 5
    },
    "imageMood": "fresh, abundant, community",
    "heroImageQuery": "supermarket produce aisle fresh vegetables fruit display",
    "ogImageQuery": "supermarket interior aisles shelves produce",
    "aboutImageQuery": "fresh produce market vegetables stacked colourful crates",
    "galleryImageQueries": [
      "supermarket aisles stocked shelves products overhead",
      "fresh bakery section bread loaves supermarket",
      "meat counter butcher supermarket display fresh",
      "checkout counter supermarket cashier scanning"
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
        "serviceImageQuery": "vintage clothing rack browse thrift store"
      },
      {
        "name": "Furniture & Homeware",
        "description": "Solid second-hand furniture, ceramics, art, and homeware with genuine character and history.",
        "tags": [
          "Vintage Furniture",
          "Homeware"
        ],
        "serviceImageQuery": "second-hand furniture table chairs thrift"
      },
      {
        "name": "Buy, Sell & Consign",
        "description": "We buy quality items outright or take your pieces on consignment and handle the selling.",
        "tags": [
          "Buy & Sell",
          "Consignment"
        ],
        "serviceImageQuery": "retro vinyl records crate browsing thrift"
      },
      {
        "name": "Upcycled & Restored Pieces",
        "description": "Hand-restored furniture and upcycled fashion pieces given a second life by local makers.",
        "tags": [
          "Upcycled",
          "Restored"
        ],
        "serviceImageQuery": "upcycled furniture painted restored chair table"
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
      "author": "Mia C., Cape Town",
      "rating": 5
    },
    "imageMood": "eclectic, warm, nostalgic",
    "heroImageQuery": "thrift store interior clothing racks vintage shelves",
    "ogImageQuery": "thrift store vintage clothing racks display",
    "aboutImageQuery": "vintage clothing rack thrift store browse hangers",
    "galleryImageQueries": [
      "thrift store interior vintage clothing racks browse",
      "second-hand books vinyl records shelf display",
      "vintage furniture lamp vase thrift store",
      "retro clothing denim jacket rack thrift store"
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
        "serviceImageQuery": "potted plants flowers display garden centre shelf"
      },
      {
        "name": "Garden Design & Planting",
        "description": "On-site garden design consultations and full planting plans from qualified horticulturists.",
        "tags": [
          "Garden Design",
          "Planting Plan"
        ],
        "serviceImageQuery": "landscaping garden design outdoor plants installed"
      },
      {
        "name": "Pots, Soil & Garden Supplies",
        "description": "Terracotta and designer pots, premium compost, fertilisers, and tools for every garden project.",
        "tags": [
          "Pots",
          "Compost"
        ],
        "serviceImageQuery": "garden tools soil bags fertiliser display shelf"
      },
      {
        "name": "Fruit Trees & Edible Garden",
        "description": "Citrus, stone fruit, herbs, and vegetable seedlings for growing your own food at home.",
        "tags": [
          "Fruit Trees",
          "Edible Garden"
        ],
        "serviceImageQuery": "fruit tree citrus lemon potted nursery display"
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
      "author": "Tony N., Cape Town",
      "rating": 5
    },
    "imageMood": "lush, natural, botanical",
    "heroImageQuery": "garden centre plants pots greenhouse shelves rows",
    "ogImageQuery": "garden centre nursery potted plants rows greenhouse",
    "aboutImageQuery": "garden nursery potted plants succulents hands repotting",
    "galleryImageQueries": [
      "garden centre greenhouse plants rows shelves",
      "potted succulents cacti display garden nursery",
      "garden tools watering cans pots display shelf",
      "outdoor trees shrubs garden centre yard"
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
        "serviceImageQuery": "dental checkup mouth mirror tools examination close-up"
      },
      {
        "name": "Cosmetic & Whitening",
        "description": "Professional whitening, veneers, bonding, and smile makeovers that look completely natural.",
        "tags": [
          "Whitening",
          "Veneers"
        ],
        "serviceImageQuery": "teeth whitening LED light treatment dental chair close-up"
      },
      {
        "name": "Implants & Orthodontics",
        "description": "Dental implants, clear aligners, and orthodontic treatment from experienced specialists.",
        "tags": [
          "Implants",
          "Clear Aligners"
        ],
        "serviceImageQuery": "dental implant model jaw bone cross-section close-up"
      },
      {
        "name": "Children's Dentistry",
        "description": "Gentle, child-friendly dental care from first teeth through to teens — building habits that last a lifetime.",
        "tags": [
          "Paediatric",
          "Preventive Care"
        ],
        "serviceImageQuery": "colourful children dental chair equipment bright fun room"
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
      "author": "Felicity A., Cape Town",
      "rating": 5
    },
    "imageMood": "clean, calm, professional",
    "heroImageQuery": "modern dental clinic interior treatment room bright lights equipment",
    "ogImageQuery": "dental practice treatment room bright modern equipment",
    "aboutImageQuery": "dentist treating patient in dental chair examination light",
    "galleryImageQueries": [
      "dental clinic waiting room modern clean reception",
      "dental tools mirror scaler tray sterile close-up",
      "dental x-ray screen teeth scan radiograph display",
      "teeth whitening UV light treatment dental chair"
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
        "serviceImageQuery": "medical consultation desk computer notes stethoscope"
      },
      {
        "name": "Chronic Disease Management",
        "description": "Ongoing management of hypertension, diabetes, asthma, and other chronic conditions.",
        "tags": [
          "Diabetes",
          "Hypertension"
        ],
        "serviceImageQuery": "blood pressure monitor cuff arm reading check"
      },
      {
        "name": "Occupational & Travel Health",
        "description": "Pre-employment medicals, travel vaccinations, and certificates for corporate and travel needs.",
        "tags": [
          "Travel Vaccines",
          "Medicals"
        ],
        "serviceImageQuery": "vaccination injection arm syringe clinic room"
      },
      {
        "name": "Women's & Reproductive Health",
        "description": "Pap smears, contraception, antenatal screening, and menopause management with discretion and care.",
        "tags": [
          "Women's Health",
          "Antenatal"
        ],
        "serviceImageQuery": "gynaecology examination room ultrasound monitor equipment"
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
      "author": "Anton P., Cape Town",
      "rating": 5
    },
    "imageMood": "warm, clean, professional",
    "heroImageQuery": "medical practice interior waiting area modern clean bright",
    "ogImageQuery": "medical practice consultation room modern clean",
    "aboutImageQuery": "doctor listening to patient consultation desk warm",
    "galleryImageQueries": [
      "medical practice consultation room desk monitor warm",
      "blood test sample tubes laboratory medical equipment",
      "medical examination room bed equipment curtain",
      "stethoscope checking heartbeat patient chest close-up"
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
        "serviceImageQuery": "knee physiotherapy taping sports injury treatment table"
      },
      {
        "name": "Chronic Pain & Back Care",
        "description": "Effective treatment for lower back pain, neck stiffness, and persistent musculoskeletal conditions.",
        "tags": [
          "Back Pain",
          "Neck"
        ],
        "serviceImageQuery": "lower back manual therapy hands spine treatment bed"
      },
      {
        "name": "Post-Surgical Rehabilitation",
        "description": "Structured post-op rehab programmes following orthopaedic and spinal surgery.",
        "tags": [
          "Post-Op Rehab",
          "Orthopaedic"
        ],
        "serviceImageQuery": "post-surgery rehabilitation exercise balance board physio gym"
      },
      {
        "name": "Women's Health Physio",
        "description": "Specialised pelvic floor rehabilitation, pre- and postnatal physio, and incontinence management.",
        "tags": [
          "Pelvic Floor",
          "Postnatal"
        ],
        "serviceImageQuery": "pelvic floor exercise ball rehabilitation mat physio equipment"
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
      "author": "Brendan T., Cape Town",
      "rating": 5
    },
    "imageMood": "clinical, active, professional",
    "heroImageQuery": "physiotherapy clinic interior treatment beds equipment bright",
    "ogImageQuery": "physiotherapy clinic treatment room beds equipment",
    "aboutImageQuery": "physiotherapist guiding patient leg stretch exercise mat",
    "galleryImageQueries": [
      "physiotherapy clinic room treatment beds bright equipment",
      "exercise ball rehabilitation patient balancing physio gym",
      "ultrasound therapy probe knee joint treatment close-up",
      "resistance band shoulder exercise patient physio clinic"
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
        "serviceImageQuery": "chiropractic spinal adjustment hands on back treatment table"
      },
      {
        "name": "Back & Neck Pain",
        "description": "Effective treatment for lumbar disc issues, whiplash, headaches, and chronic neck tension.",
        "tags": [
          "Back Pain",
          "Neck Pain"
        ],
        "serviceImageQuery": "neck adjustment chiropractic treatment patient side view"
      },
      {
        "name": "Paediatric & Family Chiropractic",
        "description": "Gentle chiropractic care for infants, children, and pregnant women using adapted techniques.",
        "tags": [
          "Family",
          "Paediatric"
        ],
        "serviceImageQuery": "gentle paediatric chiropractic infant adjustment hands"
      },
      {
        "name": "Sports Chiropractic",
        "description": "Performance-focused chiropractic care for athletes including biomechanical assessment and injury prevention.",
        "tags": [
          "Sports Performance",
          "Biomechanics"
        ],
        "serviceImageQuery": "sports biomechanics assessment running gait analysis screen"
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
      "author": "Susan V., Cape Town",
      "rating": 5
    },
    "imageMood": "clean, clinical, calming",
    "heroImageQuery": "chiropractic clinic interior treatment table modern bright",
    "ogImageQuery": "chiropractic treatment room modern clean equipment",
    "aboutImageQuery": "chiropractor adjusting patient spine hands treatment table",
    "galleryImageQueries": [
      "chiropractic clinic treatment room table modern bright",
      "spine anatomical model vertebrae desk display close-up",
      "posture assessment standing side view alignment check",
      "chiropractic heat therapy back warm pack treatment"
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
        "serviceImageQuery": "phoropter eye test lenses patient eye exam close-up"
      },
      {
        "name": "Designer Frames & Lenses",
        "description": "Curated selection of designer and independent frames with premium single-vision and varifocal lenses.",
        "tags": [
          "Designer Frames",
          "Varifocals"
        ],
        "serviceImageQuery": "designer eyeglasses frames display wall rack shelves"
      },
      {
        "name": "Contact Lens Fitting",
        "description": "Expert contact lens trials and fittings including daily, monthly, and specialty lenses.",
        "tags": [
          "Contact Lenses",
          "Dry Eye"
        ],
        "serviceImageQuery": "contact lens fitting finger tip insertion close-up"
      },
      {
        "name": "Children's Vision Screening",
        "description": "Early detection of lazy eye, squint, and learning-related vision issues in school-age children.",
        "tags": [
          "Paediatric Vision",
          "Screening"
        ],
        "serviceImageQuery": "children vision screening chart colourful shapes eye test"
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
      "author": "Raymond F., Cape Town",
      "rating": 5
    },
    "imageMood": "clean, precise, modern",
    "heroImageQuery": "optometry practice interior eye test equipment phoropter modern",
    "ogImageQuery": "optometry practice eye test room equipment modern",
    "aboutImageQuery": "optometrist examining patient eyes slit lamp close-up",
    "galleryImageQueries": [
      "eyeglasses frames display wall shelves modern shop",
      "slit lamp eye examination biomicroscope close-up",
      "contact lens case solution daily lenses close-up",
      "children eye test colourful chart shapes wall"
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
        "serviceImageQuery": "precision haircut scissors comb wet hair sectioning close-up"
      },
      {
        "name": "Colour & Balayage",
        "description": "Full colour, balayage, ombre, and colour correction from experienced colourists using Wella and L'Or\u00e9al.",
        "tags": [
          "Balayage",
          "Colour Correction"
        ],
        "serviceImageQuery": "balayage hair colour foils application process salon"
      },
      {
        "name": "Treatments & Keratin",
        "description": "Deep conditioning, Brazilian keratin, and scalp treatments to restore shine and manageability.",
        "tags": [
          "Keratin",
          "Scalp Treatment"
        ],
        "serviceImageQuery": "keratin hair treatment application smoothing iron salon"
      },
      {
        "name": "Bridal & Event Styling",
        "description": "Wedding hair, updo styling, and event-ready looks with a trial session and on-location service.",
        "tags": [
          "Bridal Hair",
          "Updo"
        ],
        "serviceImageQuery": "bridal updo hairstyle pins flowers elegant wedding styling"
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
      "author": "Vanessa O., Cape Town",
      "rating": 5
    },
    "imageMood": "stylish, warm, creative",
    "heroImageQuery": "hair salon interior styling stations mirrors warm lighting",
    "ogImageQuery": "hair salon interior mirrors chairs warm styling",
    "aboutImageQuery": "stylist cutting client hair scissors salon chair action",
    "galleryImageQueries": [
      "barber shop chair leather vintage mirror warm lighting",
      "hair colouring foils highlights process salon client",
      "hair wash basin shampoo backwash salon client reclined",
      "blow dry round brush styling finish salon client"
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
        "serviceImageQuery": "facial treatment serum application aesthetician spa bed close-up"
      },
      {
        "name": "Body Treatments & Wraps",
        "description": "Detoxifying wraps, exfoliation scrubs, and full-body treatments for skin renewal and relaxation.",
        "tags": [
          "Body Wraps",
          "Scrubs"
        ],
        "serviceImageQuery": "body wrap detox towels spa treatment bed"
      },
      {
        "name": "Nails & Waxing",
        "description": "Gel manicures, pedicures, and professional waxing from therapists trained in detail.",
        "tags": [
          "Gel Nails",
          "Waxing"
        ],
        "serviceImageQuery": "gel manicure nail polish application hands close-up"
      },
      {
        "name": "Lash & Brow Artistry",
        "description": "Eyelash extensions, brow lamination, tinting, and microblading for effortlessly defined features.",
        "tags": [
          "Lash Extensions",
          "Brow Lamination"
        ],
        "serviceImageQuery": "eyelash extensions individual lash application tweezers close-up"
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
      "author": "Melissa H., Cape Town",
      "rating": 5
    },
    "imageMood": "serene, luxurious, warm",
    "heroImageQuery": "spa treatment room interior candles towels bed warm ambient",
    "ogImageQuery": "spa treatment room candles towels ambient warm",
    "aboutImageQuery": "aesthetician applying facial mask client spa bed treatment",
    "galleryImageQueries": [
      "spa reception area flowers candles ambient lighting interior",
      "pedicure foot spa warm water treatment soak",
      "hot stone massage placement back spa treatment",
      "manicure nail art design close-up hands polish"
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
        "serviceImageQuery": "deep tissue massage back muscles pressure hands close-up"
      },
      {
        "name": "Swedish & Relaxation",
        "description": "Full-body relaxation massage using long, flowing strokes to reduce cortisol and restore calm.",
        "tags": [
          "Swedish",
          "Relaxation"
        ],
        "serviceImageQuery": "swedish relaxation massage long strokes back oil"
      },
      {
        "name": "Sports & Recovery",
        "description": "Pre- and post-event massage for athletes, with specific techniques for recovery and injury prevention.",
        "tags": [
          "Sports Recovery",
          "Athletes"
        ],
        "serviceImageQuery": "sports massage calf leg athlete recovery treatment"
      },
      {
        "name": "Prenatal & Postnatal Massage",
        "description": "Safe, supportive massage for expectant and new mothers — easing tension, swelling, and the demands of pregnancy.",
        "tags": [
          "Prenatal",
          "Postnatal"
        ],
        "serviceImageQuery": "pregnancy massage bolster side-lying support cushions treatment"
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
      "author": "Lee-Ann D., Cape Town",
      "rating": 5
    },
    "imageMood": "calm, warm, healing",
    "heroImageQuery": "massage therapy room interior table towels dim candles ambience",
    "ogImageQuery": "massage room interior dim candles towels ambience",
    "aboutImageQuery": "massage therapist working on client shoulder neck treatment",
    "galleryImageQueries": [
      "massage room candles essential oils towels warm ambience",
      "hot stone massage basalt stones placed back spine",
      "aromatherapy essential oil bottles herbs treatment setup",
      "foot reflexology massage pressure point treatment close-up"
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
        "serviceImageQuery": "meal plan document printed paper desk pen notes"
      },
      {
        "name": "Chronic Disease Nutrition",
        "description": "Medical nutrition therapy for diabetes, cardiovascular disease, kidney conditions, and cancer support.",
        "tags": [
          "Diabetes Nutrition",
          "Cardiac Diet"
        ],
        "serviceImageQuery": "blood glucose monitor diabetes management nutrition close-up"
      },
      {
        "name": "Sports & Performance Nutrition",
        "description": "Fuelling strategies for endurance athletes, team sport players, and gym-goers at every level.",
        "tags": [
          "Sports Nutrition",
          "Endurance"
        ],
        "serviceImageQuery": "sports nutrition smoothie protein powder blender preparation"
      },
      {
        "name": "Gut Health & IBS Management",
        "description": "Low-FODMAP guidance, elimination protocols, and gut microbiome support for digestive conditions.",
        "tags": [
          "Gut Health",
          "Low-FODMAP"
        ],
        "serviceImageQuery": "gut health fermented foods probiotics kefir sauerkraut jars"
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
      "author": "Kim R., Cape Town",
      "rating": 5
    },
    "imageMood": "fresh, warm, nourishing",
    "heroImageQuery": "fresh healthy food spread table colourful vegetables fruits grains",
    "ogImageQuery": "healthy food spread vegetables fruits grains table",
    "aboutImageQuery": "dietitian consultation with client discussing meal plan desk",
    "galleryImageQueries": [
      "healthy meal prep containers colourful vegetables rice protein",
      "body composition scale measurement health assessment",
      "smoothie bowl acai berries seeds granola breakfast close-up",
      "fresh produce market vegetables fruit colourful basket"
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
        "serviceImageQuery": "therapy room comfortable armchairs warm lamp conversation"
      },
      {
        "name": "Couples Therapy",
        "description": "Structured sessions to improve communication, navigate conflict, and rebuild connection in relationships.",
        "tags": [
          "Couples",
          "Relationships"
        ],
        "serviceImageQuery": "couple seated together couch therapy session room"
      },
      {
        "name": "Child & Adolescent Therapy",
        "description": "Age-appropriate therapeutic support for children navigating school, family change, and emotional difficulty.",
        "tags": [
          "Child Therapy",
          "Adolescent"
        ],
        "serviceImageQuery": "child play therapy toys sand tray art supplies room"
      },
      {
        "name": "Corporate & Workplace Wellness",
        "description": "EAP sessions, workplace stress debriefings, and organisational wellbeing programmes for businesses.",
        "tags": [
          "EAP",
          "Workplace Wellness"
        ],
        "serviceImageQuery": "corporate wellness workshop group discussion circle chairs office"
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
    "heroImageQuery": "therapy room interior comfortable sofa warm lamp plants",
    "ogImageQuery": "therapy room interior warm lamp comfortable sofa",
    "aboutImageQuery": "therapist listening to client seated warm office empathy",
    "galleryImageQueries": [
      "therapy waiting room comfortable seating plants soft light",
      "journal writing pen notebook self-reflection therapy homework",
      "sand tray therapy miniature figures play therapy room",
      "mindfulness meditation cushion candle calm peaceful space"
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
        "serviceImageQuery": "child speech therapy session picture cards alphabet table"
      },
      {
        "name": "Stuttering & Fluency",
        "description": "Evidence-based fluency therapy for children and adults to build confidence and communication ease.",
        "tags": [
          "Fluency",
          "Stuttering"
        ],
        "serviceImageQuery": "speech fluency exercises mouth mirror articulation practice"
      },
      {
        "name": "Voice & Swallowing",
        "description": "Therapy for voice disorders, dysphonia, and dysphagia following neurological events or injury.",
        "tags": [
          "Voice Therapy",
          "Dysphagia"
        ],
        "serviceImageQuery": "voice therapy larynx model swallowing exercise demonstration"
      },
      {
        "name": "Augmentative & Alternative Communication",
        "description": "AAC device assessment, setup, and training for non-verbal or minimally verbal children and adults.",
        "tags": [
          "AAC",
          "Assistive Technology"
        ],
        "serviceImageQuery": "AAC communication device tablet symbols buttons touchscreen"
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
      "author": "Helen P., Cape Town",
      "rating": 5
    },
    "imageMood": "warm, professional, encouraging",
    "heroImageQuery": "speech therapy room interior colourful child-friendly posters table",
    "ogImageQuery": "speech therapy room colourful child-friendly bright",
    "aboutImageQuery": "speech therapist working with child letter sounds mirror",
    "galleryImageQueries": [
      "speech therapy practice room table chairs colourful posters bright",
      "articulation picture cards letter sounds speech therapy close-up",
      "child practicing speech sounds mirror mouth movements exercise",
      "speech therapy puppets storytelling language engagement child"
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
        "serviceImageQuery": "child sensory integration swing climbing occupational therapy gym"
      },
      {
        "name": "Neurological Rehabilitation",
        "description": "Post-stroke, brain injury, and neurological condition rehabilitation to restore daily function.",
        "tags": [
          "Post-Stroke",
          "Neuro Rehab"
        ],
        "serviceImageQuery": "stroke rehabilitation daily task hand grip exercise OT"
      },
      {
        "name": "Ergonomic & Workplace Assessment",
        "description": "Workstation assessments and recommendations to prevent and address occupational injury.",
        "tags": [
          "Ergonomics",
          "Workstation"
        ],
        "serviceImageQuery": "ergonomic workstation assessment desk chair monitor setup"
      },
      {
        "name": "School Readiness Assessment",
        "description": "Comprehensive assessments for Grade R and Grade 1 readiness covering motor, perceptual, and social skills.",
        "tags": [
          "School Readiness",
          "Perceptual Skills"
        ],
        "serviceImageQuery": "school readiness assessment worksheet pencil grip shapes child"
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
      "author": "Linda M., Cape Town",
      "rating": 5
    },
    "imageMood": "warm, enabling, professional",
    "heroImageQuery": "occupational therapy clinic interior sensory equipment bright room",
    "ogImageQuery": "occupational therapy room sensory equipment bright",
    "aboutImageQuery": "occupational therapist guiding patient hand exercise task activity",
    "galleryImageQueries": [
      "occupational therapy sensory room swing ball pit bright",
      "hand therapy putty grip squeeze exercise close-up",
      "fine motor skills pencil grip exercise child OT table",
      "stroke patient rehabilitation kitchen daily living task OT"
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
        "serviceImageQuery": "hearing test soundproof booth headphones audiometry equipment"
      },
      {
        "name": "Hearing Aid Fitting",
        "description": "Expert fitting of Phonak, Oticon, and Signia hearing aids with trial periods and ongoing adjustment.",
        "tags": [
          "Hearing Aids",
          "Phonak"
        ],
        "serviceImageQuery": "hearing aid behind ear fitting close-up small device"
      },
      {
        "name": "Tinnitus Management",
        "description": "Evidence-based tinnitus assessment and sound therapy programmes to reduce impact on daily life.",
        "tags": [
          "Tinnitus",
          "Sound Therapy"
        ],
        "serviceImageQuery": "tinnitus sound therapy headphones audiologist screen display"
      },
      {
        "name": "Paediatric Hearing Screening",
        "description": "Newborn and early childhood hearing screening using OAE and ABR technology for early intervention.",
        "tags": [
          "Newborn Screening",
          "Early Intervention"
        ],
        "serviceImageQuery": "paediatric hearing screening OAE probe infant ear test"
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
      "author": "Marie O., Cape Town",
      "rating": 5
    },
    "imageMood": "clean, calm, professional",
    "heroImageQuery": "audiology clinic interior hearing test booth equipment modern",
    "ogImageQuery": "audiology clinic hearing test equipment modern",
    "aboutImageQuery": "audiologist fitting hearing aid patient ear close-up action",
    "galleryImageQueries": [
      "audiology soundproof booth hearing test headphones equipment",
      "hearing aid models display case small devices varieties",
      "otoscope ear canal examination close-up medical",
      "audiogram results graph screen hearing threshold display"
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
        "serviceImageQuery": "plantar fasciitis heel examination foot biomechanics assessment"
      },
      {
        "name": "Nail & Skin Conditions",
        "description": "Ingrown toenails, fungal infections, corns, and callus treatment by qualified podiatrists.",
        "tags": [
          "Ingrown Toenails",
          "Fungal"
        ],
        "serviceImageQuery": "ingrown toenail treatment podiatry instruments foot close-up"
      },
      {
        "name": "Diabetic Foot Care",
        "description": "Specialised regular care and risk assessment for diabetic patients to prevent complications.",
        "tags": [
          "Diabetic Foot",
          "Risk Assessment"
        ],
        "serviceImageQuery": "diabetic foot screening monofilament test sensation check"
      },
      {
        "name": "Custom Orthotics",
        "description": "Precision-moulded orthotics designed from gait analysis data to correct alignment and relieve chronic pain.",
        "tags": [
          "Custom Orthotics",
          "Gait Analysis"
        ],
        "serviceImageQuery": "custom orthotic insole moulding tray foot impression podiatry"
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
      "author": "Dave L., Cape Town",
      "rating": 5
    },
    "imageMood": "clean, professional, clinical",
    "heroImageQuery": "podiatry clinic interior treatment chair instruments bright clean",
    "ogImageQuery": "podiatry clinic treatment chair instruments modern",
    "aboutImageQuery": "podiatrist treating patient foot instruments chair close-up",
    "galleryImageQueries": [
      "podiatry treatment room chair instruments bright modern clean",
      "custom orthotics insoles moulded shoes fitting display",
      "podiatry instruments scalpel clippers tray sterile close-up",
      "gait analysis treadmill biomechanics running assessment screen"
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
        "serviceImageQuery": "acupuncture needles inserted back meridian points close-up"
      },
      {
        "name": "Homeopathy & Naturopathy",
        "description": "Personalised constitutional treatment addressing the root causes of illness and imbalance.",
        "tags": [
          "Homeopathy",
          "Naturopathy"
        ],
        "serviceImageQuery": "homeopathy naturopathy herbal tincture bottles remedies wooden shelf"
      },
      {
        "name": "Reflexology & Energy Work",
        "description": "Reflexology, Reiki, and energy therapy for stress relief, relaxation, and subtle body balance.",
        "tags": [
          "Reflexology",
          "Reiki"
        ],
        "serviceImageQuery": "reflexology foot pressure point treatment hands close-up"
      },
      {
        "name": "Herbal Medicine & Nutrition",
        "description": "Custom herbal formulations and whole-food nutrition plans addressing inflammation, hormones, and fatigue.",
        "tags": [
          "Herbal Medicine",
          "Nutrition"
        ],
        "serviceImageQuery": "herbal medicine dried herbs mortar pestle tincture bottles wooden"
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
      "author": "Yvonne B., Cape Town",
      "rating": 5
    },
    "imageMood": "calm, earthy, healing",
    "heroImageQuery": "holistic health clinic interior herbs plants warm natural light",
    "ogImageQuery": "holistic clinic interior herbs candles warm natural",
    "aboutImageQuery": "holistic practitioner consulting patient pulse reading wrist",
    "galleryImageQueries": [
      "acupuncture treatment needles back patient meridian table",
      "dried medicinal herbs jars wooden apothecary shelf",
      "cupping therapy round glass cups back treatment marks",
      "crystal healing stones arrangement therapy treatment table"
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
        "serviceImageQuery": "body transformation before after progress tracking measurement"
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
      "author": "Alicia F., Cape Town",
      "rating": 5
    },
    "imageMood": "energetic, motivating, dynamic",
    "heroImageQuery": "gym training floor weights barbells kettlebells functional equipment",
    "ogImageQuery": "gym training floor weights equipment functional area",
    "aboutImageQuery": "trainer coaching client through squat form gym session",
    "galleryImageQueries": [
      "gym floor kettlebells dumbbells rack functional training area",
      "barbell squat rack training session loaded bar gym",
      "outdoor bootcamp training park group pushups grass",
      "stretching foam roller recovery cool down mat gym"
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
        "serviceImageQuery": "yin yoga restorative bolster supported pose dim candles"
      },
      {
        "name": "Yoga Teacher Training",
        "description": "Internationally recognised 200-hour teacher training programmes for aspiring yoga instructors.",
        "tags": [
          "Teacher Training",
          "200hr"
        ],
        "serviceImageQuery": "yoga teacher training group circle seated studio discussion"
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
      "author": "Jess W., Cape Town",
      "rating": 5
    },
    "imageMood": "calm, warm, natural light",
    "heroImageQuery": "yoga studio interior wooden floor mats blocks natural light",
    "ogImageQuery": "yoga studio interior mats wooden floor natural light",
    "aboutImageQuery": "yoga instructor adjusting student pose hands-on studio class",
    "galleryImageQueries": [
      "yoga studio interior mats blocks blankets props warm light",
      "downward dog pose yoga class students hands feet mats",
      "seated meditation cushion incense candle calm studio floor",
      "headstand inversion practice wall support yoga studio"
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
        "serviceImageQuery": "free weights area dumbbells barbell bench press rack gym"
      },
      {
        "name": "Group Fitness Classes",
        "description": "HIIT, cycling, boxing, and strength classes led by qualified instructors every day of the week.",
        "tags": [
          "HIIT",
          "Cycling"
        ],
        "serviceImageQuery": "group spinning cycling class studio bikes energy"
      },
      {
        "name": "Personal Training & Biokinetics",
        "description": "Gym-based personal training and biokinetic rehabilitation sessions from certified professionals.",
        "tags": [
          "Personal Training",
          "Biokinetics"
        ],
        "serviceImageQuery": "personal training session TRX suspension straps gym"
      },
      {
        "name": "Recovery & Wellness Zone",
        "description": "Sauna, cold plunge, foam rolling stations, and stretching area for serious post-workout recovery.",
        "tags": [
          "Sauna",
          "Cold Plunge"
        ],
        "serviceImageQuery": "sauna interior wooden benches steam heat wellness recovery"
      }
    ],
    "galleryHeading": "In the Gym",
    "aboutHeading": "A gym that earns your <em>loyalty</em>",
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
      "author": "Damon L., Cape Town",
      "rating": 5
    },
    "imageMood": "energetic, clean, motivating",
    "heroImageQuery": "gym interior wide angle weights machines cardio floor modern",
    "ogImageQuery": "gym floor weights machines cardio equipment wide",
    "aboutImageQuery": "gym members working out weights floor energetic atmosphere",
    "galleryImageQueries": [
      "gym weight room barbells racks mirrors squat area",
      "treadmill running cardio machines row gym floor",
      "boxing HIIT class gloves pads group gym studio",
      "functional training area ropes kettlebells tyres gym"
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
        "serviceImageQuery": "muay thai pad work kick training gloves gym"
      },
      {
        "name": "Kids Martial Arts",
        "description": "Age-specific classes building focus, confidence, and respect in children from 5 to 15 years.",
        "tags": [
          "Kids Classes",
          "Confidence"
        ],
        "serviceImageQuery": "children martial arts class kids white uniforms bowing dojo"
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
      "author": "Chris B., Cape Town",
      "rating": 5
    },
    "imageMood": "intense, disciplined, powerful",
    "heroImageQuery": "martial arts dojo interior mats heavy bags mirrors training",
    "ogImageQuery": "martial arts dojo interior mats bags training area",
    "aboutImageQuery": "martial arts instructor demonstrating technique students dojo mats",
    "galleryImageQueries": [
      "martial arts dojo interior mats heavy bags wall mirrors",
      "BJJ ground grappling submission hold mats close-up",
      "muay thai heavy bag knee strike training gym",
      "kids martial arts class drilling kicks pads dojo"
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
        "serviceImageQuery": "contemporary dance class floor work students studio movement"
      },
      {
        "name": "Children's Dance",
        "description": "Age-specific ballet, jazz, and creative movement classes for children from 3 to 17 years.",
        "tags": [
          "Ballet",
          "Children"
        ],
        "serviceImageQuery": "children ballet class tutu barre studio mirrors"
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
      "author": "Sandra K., Cape Town",
      "rating": 5
    },
    "imageMood": "expressive, warm, energetic",
    "heroImageQuery": "dance studio interior mirror barre wooden floor bright spacious",
    "ogImageQuery": "dance studio interior barre mirror spacious wooden floor",
    "aboutImageQuery": "dance instructor teaching class students studio mirror action",
    "galleryImageQueries": [
      "dance studio empty interior barre mirror spotlights wooden floor",
      "ballet pointe shoes relevé barre practice studio close-up",
      "hip hop dance class students studio street style energy",
      "latin ballroom dance couple tango hold studio elegance"
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
        "serviceImageQuery": "child swimming lesson instructor pool kickboard water"
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
        "serviceImageQuery": "competitive squad swimmer freestyle stroke lane racing"
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
      "author": "Tamaryn J., Cape Town",
      "rating": 5
    },
    "imageMood": "fresh, bright, aquatic",
    "heroImageQuery": "indoor swimming pool lanes blue water overhead facility clean",
    "ogImageQuery": "indoor swimming pool lanes blue water clean bright",
    "aboutImageQuery": "swimming coach in water teaching child technique pool",
    "galleryImageQueries": [
      "swimming pool underwater view blue water lane lines",
      "swimmer diving blocks starting position splash pool",
      "toddler parent baby swimming lesson pool warm water",
      "aqua aerobics class water exercise group pool noodles"
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
        "serviceImageQuery": "golf club fitting launch monitor trackman data screen"
      },
      {
        "name": "Pro Shop & Equipment",
        "description": "Curated pro shop stocking Titleist, TaylorMade, and Callaway equipment and apparel.",
        "tags": [
          "Pro Shop",
          "Titleist"
        ],
        "serviceImageQuery": "golf pro shop interior clubs bags apparel display racks"
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
      "author": "Neil G., Cape Town",
      "rating": 5
    },
    "imageMood": "green, classic, precision",
    "heroImageQuery": "golf driving range green fairway practice area scenic",
    "ogImageQuery": "golf driving range fairway practice scenic green",
    "aboutImageQuery": "golf coach watching student swing driving range lesson",
    "galleryImageQueries": [
      "golf course hole aerial view fairway bunker green scenic",
      "golf ball driver tee box close-up grass morning dew",
      "golf simulator indoor screen launch monitor club fitting",
      "golf putting practice green hole flag approach shot"
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
        "serviceImageQuery": "athlete sprint training starting blocks track field"
      },
      {
        "name": "School Holiday Camps",
        "description": "Structured multi-sport holiday camps for children combining fitness, fun, and foundational skill development.",
        "tags": [
          "Holiday Camps",
          "Skills"
        ],
        "serviceImageQuery": "children holiday sports camp outdoor games field group"
      },
      {
        "name": "Strength & Conditioning Programmes",
        "description": "Periodised S&C programmes designed to complement sport-specific training and reduce injury risk.",
        "tags": [
          "Strength & Conditioning",
          "Injury Prevention"
        ],
        "serviceImageQuery": "strength conditioning barbell squat rack athletic training gym"
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
      "author": "Mary T., Cape Town",
      "rating": 5
    },
    "imageMood": "active, outdoor, energetic",
    "heroImageQuery": "sports field training area cones markers grass athletic track",
    "ogImageQuery": "sports training field cones markers athletic track grass",
    "aboutImageQuery": "coach guiding young athletes technique field training action",
    "galleryImageQueries": [
      "agility training cones ladder athletes running field drills",
      "coach demonstrating throwing technique athlete field close-up",
      "team huddle sports field discussion strategy coach",
      "children sports camp relay race running field outdoor"
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
        "serviceImageQuery": "dog haircut clippers trim grooming table"
      },
      {
        "name": "Puppy's First Groom",
        "description": "Gentle, positive first grooming experiences to socialise puppies to the grooming process.",
        "tags": [
          "Puppy Groom",
          "First Visit"
        ],
        "serviceImageQuery": "dog nail trimming groomer hands close-up"
      },
      {
        "name": "Teeth Cleaning & Oral Care",
        "description": "Non-anaesthetic teeth cleaning, breath treatment, and gum health checks to keep those chompers in top shape.",
        "tags": [
          "Dental",
          "Oral Care"
        ],
        "serviceImageQuery": "dog teeth clean white dental hygiene close-up mouth"
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
      "author": "Bianca M., Cape Town",
      "rating": 5
    },
    "imageMood": "warm, friendly, clean",
    "heroImageQuery": "fluffy dog sitting on grooming table freshly groomed",
    "ogImageQuery": "small white dog groomed with bow tie fluffy",
    "aboutImageQuery": "groomer gently brushing dog on grooming table",
    "galleryImageQueries": [
      "poodle freshly groomed fluffy white salon",
      "golden retriever being bathed in grooming tub",
      "small dog getting haircut on grooming table",
      "dog grooming salon interior bath stations clean"
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
      "author": "Lindi P., Cape Town",
      "rating": 5
    },
    "imageMood": "warm, friendly, colourful",
    "heroImageQuery": "puppy sitting in pet shop surrounded by toys",
    "ogImageQuery": "kitten and puppy together pet shop cute",
    "aboutImageQuery": "pet shop staff member helping customer with dog food",
    "galleryImageQueries": [
      "colourful tropical fish aquarium tank pet shop",
      "dog toys bones treats colourful display shelf",
      "premium pet food bags stacked on shelf varieties",
      "rabbit guinea pig small animal enclosure pet shop"
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
      "author": "Andrew C., Cape Town",
      "rating": 5
    },
    "imageMood": "clean, caring, safe",
    "heroImageQuery": "happy dogs playing together in outdoor yard kennel",
    "ogImageQuery": "dogs running and playing in large outdoor kennel yard",
    "aboutImageQuery": "kennel staff walking dogs in outdoor exercise area",
    "galleryImageQueries": [
      "dogs playing fetch in large grassy kennel yard",
      "cat relaxing on climbing tree in cattery room",
      "dog sleeping on comfortable bed in kennel room",
      "clean indoor kennel suite with dog bed and water bowl"
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
      "author": "Kirsten L., Cape Town",
      "rating": 5
    },
    "imageMood": "warm, outdoor, active",
    "heroImageQuery": "happy dogs running together on park path",
    "ogImageQuery": "group of dogs walking on leashes park trail",
    "aboutImageQuery": "dog walker with group of dogs on beach trail",
    "galleryImageQueries": [
      "dogs walking together park trail leashes group",
      "happy dog running park field off-leash play",
      "pet sitter cat home couch relaxed cuddle",
      "dog walker beach dogs running sand water"
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
        "serviceImageQuery": "dog agility obstacle jump training course"
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
      "author": "Fiona B., Cape Town",
      "rating": 5
    },
    "imageMood": "warm, outdoor, trust-building",
    "heroImageQuery": "dog sitting attentively looking up during training session outdoor",
    "ogImageQuery": "dog performing sit stay command outdoors training",
    "aboutImageQuery": "trainer rewarding dog with treat during obedience session",
    "galleryImageQueries": [
      "dog training class outdoor field group dogs",
      "puppy training treats reward obedience sit",
      "agility training dog jumping obstacle course",
      "dog and trainer bond leash walk heel"
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
      "author": "Shane D., Cape Town",
      "rating": 5
    },
    "imageMood": "warm, welcoming, animal-loving",
    "heroImageQuery": "happy golden retriever puppy sitting looking at camera",
    "ogImageQuery": "cat and dog sitting together looking at camera",
    "aboutImageQuery": "pet care staff member playing with dogs in daycare yard",
    "galleryImageQueries": [
      "fluffy dog freshly groomed with bow tie",
      "cat being gently brushed grooming session",
      "dogs running playing together daycare yard",
      "pet food treats toys accessories display shelf"
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
        "serviceImageQuery": "cat receiving vaccination at vet clinic"
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
      "author": "Yvette N., Cape Town",
      "rating": 5
    },
    "imageMood": "clean, caring, professional",
    "heroImageQuery": "golden retriever sitting on vet examination table clinic",
    "ogImageQuery": "cat on vet examination table clinic",
    "aboutImageQuery": "vet gently examining puppy on clinic table",
    "galleryImageQueries": [
      "vet clinic reception area clean modern interior",
      "dog on examination table vet clinic",
      "cat receiving check-up vaccination at clinic",
      "vet surgery operating room sterile equipment"
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
      "author": "Thembi N., Cape Town",
      "rating": 5
    },
    "imageMood": "elegant, dramatic, celebratory",
    "heroImageQuery": "elegant event venue decorated tables centrepieces flowers lighting",
    "ogImageQuery": "event venue hall decorated tables flowers evening lighting",
    "aboutImageQuery": "event coordinator arranging table settings at venue",
    "galleryImageQueries": [
      "event venue setup decorated tables chairs flowers",
      "corporate event conference stage podium screen",
      "outdoor event tent marquee fairy lights evening",
      "event decor centrepiece flowers candles table"
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
        "serviceImageQuery": "packed dance floor party lights crowd dancing"
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
      "author": "Ashleigh T., Cape Town",
      "rating": 5
    },
    "imageMood": "energetic, nightlife, electric",
    "heroImageQuery": "DJ decks mixer turntables close-up neon lights",
    "ogImageQuery": "DJ turntables mixer headphones club lights",
    "aboutImageQuery": "DJ mixing tracks behind decks at event",
    "galleryImageQueries": [
      "DJ booth setup turntables mixer lights club",
      "dance floor crowd party lights DJ event",
      "MC microphone stage event speaker audience",
      "sound equipment speakers amplifier DJ setup"
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
        "serviceImageQuery": "wedding ceremony arch flowers chairs aisle outdoor garden"
      },
      {
        "name": "Catering & Bar",
        "description": "In-house catering with customisable menus, cocktail hour, and a fully staffed open bar service.",
        "tags": [
          "Catering",
          "Open Bar"
        ],
        "serviceImageQuery": "wedding reception dinner tables set candles flowers elegant"
      },
      {
        "name": "Ceremony & Chapel",
        "description": "A dedicated ceremony space \u2014 indoor chapel or outdoor garden \u2014 set to exactly your vision.",
        "tags": [
          "Garden Ceremony",
          "Chapel"
        ],
        "serviceImageQuery": "wedding chapel interior aisle seats natural light"
      },
        {
          "name": "Décor & Floral Styling",
          "description": "Full wedding décor and floral styling — table settings, ceremony arches, centrepieces, and everything your Pinterest board promised.",
          "tags": [
            "Wedding Décor",
            "Floral"
          ],
          "serviceImageQuery": "wedding floral centrepiece table setting candles elegant"
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
      "author": "Caitlin & Ryan M.",
      "rating": 5
    },
    "imageMood": "romantic, golden, Cape",
    "heroImageQuery": "wedding ceremony arch flowers aisle chairs garden venue",
    "ogImageQuery": "wedding ceremony aisle flowers arch venue outdoor",
    "aboutImageQuery": "wedding coordinator setting up table flowers at venue",
    "galleryImageQueries": [
      "wedding ceremony outdoor arch flowers aisle chairs",
      "wedding reception hall decorated tables centrepieces",
      "wedding cake tiered white flowers elegant display",
      "wedding dance floor couple first dance lights"
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
        "serviceImageQuery": "mirror photo booth glowing ring light event venue"
      },
      {
        "name": "360\u00b0 Video Booth",
        "description": "Spinning 360-degree slow-motion video platform for jaw-dropping social media content at any event.",
        "tags": [
          "360 Booth",
          "Slow Motion"
        ],
        "serviceImageQuery": "360 video booth spinning platform event party"
      },
      {
        "name": "Custom Branding & Props",
        "description": "Fully branded booths with your logo, custom print overlays, and a themed prop box for guests.",
        "tags": [
          "Branded",
          "Prop Box"
        ],
        "serviceImageQuery": "photo strip prints with custom branded overlay"
      },
        {
          "name": "GIF & Boomerang Station",
          "description": "Interactive GIF and boomerang stations with instant social sharing — your guests post the party while they’re still at the party.",
          "tags": [
            "GIF Station",
            "Social Sharing"
          ],
          "serviceImageQuery": "animated GIF booth screen social sharing station event"
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
      "author": "Gaby S., Cape Town",
      "rating": 5
    },
    "imageMood": "fun, vibrant, celebratory",
    "heroImageQuery": "photo booth setup backdrop neon sign lights event",
    "ogImageQuery": "photo booth backdrop props party guests fun",
    "aboutImageQuery": "photo booth attendant setting up backdrop props event",
    "galleryImageQueries": [
      "photo booth backdrop lights setup event venue",
      "photo booth props signs guests posing fun",
      "photo strip prints collected party event",
      "inflatable photo booth setup event outdoor tent"
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
        "serviceImageQuery": "party table setting themed decorations plates cups"
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
          "serviceImageQuery": "dessert table sweet treats styled display party event"
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
      "author": "Priya R., Cape Town",
      "rating": 5
    },
    "imageMood": "colourful, festive, joyful",
    "heroImageQuery": "balloon arch garland colourful party entrance decoration",
    "ogImageQuery": "party supplies balloons streamers decorations colourful",
    "aboutImageQuery": "balloon artist creating arch installation for party",
    "galleryImageQueries": [
      "party shop interior balloons banners shelves display",
      "balloon arch decoration entrance event colourful",
      "party table setup plates cups napkins themed",
      "birthday decorations bunting cake topper balloons"
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
        "serviceImageQuery": "comedian MC performing stage microphone corporate event"
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
      "author": "Barbara C., Cape Town",
      "rating": 5
    },
    "imageMood": "vibrant, live, celebratory",
    "heroImageQuery": "live band performing on stage instruments lights concert",
    "ogImageQuery": "performer stage spotlight microphone live show",
    "aboutImageQuery": "musician performing guitar on stage event lighting",
    "galleryImageQueries": [
      "stage performance lights performer audience live",
      "magician performing trick audience amazed show",
      "live band performing instruments stage concert",
      "children entertainer party balloon animal making"
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
        "serviceImageQuery": "boardroom meeting room screen projector chairs table"
      },
      {
        "name": "Event Hall & Function Room",
        "description": "Versatile main event space for 50 to 300 guests, configurable for dinners, launches, and mixers.",
        "tags": [
          "Event Hall",
          "Flexible Layout"
        ],
        "serviceImageQuery": "event hall large open space decorated for dinner"
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
          "serviceImageQuery": "training room workshop seminar space chairs whiteboard"
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
      "author": "Dina F., Cape Town",
      "rating": 5
    },
    "imageMood": "versatile, elegant, professional",
    "heroImageQuery": "event venue hall interior set tables chairs elegant evening",
    "ogImageQuery": "venue hire hall interior chairs tables setup",
    "aboutImageQuery": "venue manager preparing event space tables setup",
    "galleryImageQueries": [
      "venue hall interior empty chairs tables setup",
      "conference room projector screen chairs meeting",
      "outdoor venue garden marquee tent evening lights",
      "venue cocktail area lounge seating evening"
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
          "author": "Warren B., Cape Town",
          "rating": 5
      },
      "imageMood": "professional, clean, reliable",
      "heroImageQuery": "modern bathroom renovation white tiles rainfall shower",
      "heroBgImageQuery": "plumbing pipes tools dark background",
      "ogImageQuery": "modern kitchen sink faucet renovation",
      "aboutImageQuery": "plumber repairing pipe under sink working",
      "galleryImageQueries": [
          "modern bathroom renovation freestanding bathtub",
          "new water heater tank installed utility room",
          "kitchen sink tap installation granite countertop",
          "underfloor heating pipes installation concrete"
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
          "author": "Dave H., Cape Town",
          "rating": 5
      },
      "imageMood": "precise, professional, safe",
      "heroImageQuery": "modern home lighting recessed downlights living room",
      "heroBgImageQuery": "electrical panel wiring dark background",
      "ogImageQuery": "neat electrical wiring distribution board installed",
      "aboutImageQuery": "electrician wiring distribution board working",
      "galleryImageQueries": [
          "new distribution board RCBO switches installed",
          "solar panel array residential rooftop",
          "recessed LED downlights installed ceiling",
          "outdoor garden lighting pathway bollard lights night"
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
          "author": "Nicola & Brett P., Cape Town",
          "rating": 5
      },
      "imageMood": "solid, professional, crafted",
      "heroImageQuery": "completed modern house exterior architecture garden",
      "heroBgImageQuery": "construction site building dark background tools",
      "ogImageQuery": "finished residential home exterior landscaping",
      "aboutImageQuery": "builder laying bricks construction site working",
      "galleryImageQueries": [
          "new build house completed exterior landscaped",
          "renovated open plan kitchen living room interior",
          "house extension second storey addition completed",
          "bathroom renovation modern tiles vanity mirror"
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
          "author": "Pippa L., Cape Town",
          "rating": 5
      },
      "imageMood": "warm, crafted, precise",
      "heroImageQuery": "custom built in bookshelf living room warm wood",
      "heroBgImageQuery": "carpenter workshop wood shavings dark background",
      "ogImageQuery": "fitted wardrobe doors open organized interior",
      "aboutImageQuery": "carpenter hand planing wood workshop crafting",
      "galleryImageQueries": [
          "built in wardrobe walk in closet organized",
          "modern kitchen cabinetry wooden island completed",
          "solid wood desk home office bespoke furniture",
          "floating timber shelves mounted living room wall"
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
          "author": "Ross D., Cape Town",
          "rating": 5
      },
      "imageMood": "industrial, precise, strong",
      "heroImageQuery": "custom steel driveway gate installed modern house",
      "heroBgImageQuery": "welding sparks dark metal fabrication workshop background",
      "ogImageQuery": "ornamental iron gate entrance finished installed",
      "aboutImageQuery": "welder sparks metal fabrication workshop action",
      "galleryImageQueries": [
          "modern steel sliding gate driveway installed",
          "metal spiral staircase interior industrial style",
          "wrought iron window security bars decorative",
          "steel pergola frame outdoor patio structure"
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
          "author": "Gail T., Cape Town",
          "rating": 5
      },
      "imageMood": "clean, precise, durable",
      "heroImageQuery": "beautiful paved driveway natural stone entrance",
      "heroBgImageQuery": "paving stones tiles dark background texture",
      "ogImageQuery": "completed natural stone paved driveway house",
      "aboutImageQuery": "tiler laying floor tiles close up hands working",
      "galleryImageQueries": [
          "cobblestone driveway pattern completed front entrance",
          "outdoor patio tiled seating area garden view",
          "marble bathroom floor tiles herringbone pattern",
          "slate pool surround tiles completed water feature"
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
          "author": "Colin S., Cape Town",
          "rating": 5
      },
      "imageMood": "solid, professional, weatherproof",
      "heroImageQuery": "newly tiled residential roof aerial view house",
      "heroBgImageQuery": "roof tiles dark sky background roofing",
      "ogImageQuery": "completed roof clay tiles house blue sky",
      "aboutImageQuery": "roofer installing tiles on roof ridge working",
      "galleryImageQueries": [
          "clay tile roof completed residential house",
          "flat roof waterproofing membrane white coating",
          "new corrugated metal roof installed building",
          "copper gutters downpipes installed house fascia"
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
          "author": "Elaine P., Cape Town",
          "rating": 5
      },
      "imageMood": "fresh, bright, clean",
      "heroImageQuery": "freshly painted modern home interior bright airy rooms",
      "heroBgImageQuery": "paint roller brush dark background painting supplies",
      "ogImageQuery": "painted living room fresh white walls furniture",
      "aboutImageQuery": "painter rolling paint on wall interior working",
      "galleryImageQueries": [
          "freshly painted bedroom soft colours feature wall",
          "house exterior painted white trim neat finish",
          "venetian plaster texture accent wall interior",
          "painted hallway staircase white bright transformation"
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
          "author": "Tamara H., Cape Town",
          "rating": 5
      },
      "imageMood": "clean, light, precise",
      "heroImageQuery": "modern home large glass windows natural light interior",
      "heroBgImageQuery": "glass reflection dark background architectural glazing",
      "ogImageQuery": "frameless glass shower door installed modern bathroom",
      "aboutImageQuery": "glazier installing glass panel window working",
      "galleryImageQueries": [
          "frameless shower glass enclosure walk in bathroom",
          "aluminium window frames installed modern house",
          "glass bi-fold doors opening to garden patio",
          "glass balustrade balcony railing modern home"
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
          "author": "Ingrid V., Cape Town",
          "rating": 5
      },
      "imageMood": "trustworthy, secure, professional",
      "heroImageQuery": "secure front door brass handle deadbolt lock",
      "heroBgImageQuery": "lock security door dark background metal",
      "ogImageQuery": "high security door lock deadbolt installed",
      "aboutImageQuery": "locksmith picking lock working on door close up",
      "galleryImageQueries": [
          "deadbolt lock installed wooden front door",
          "keypad entry system gate access control installed",
          "smart lock digital keypad front door modern",
          "intercom video system mounted wall entrance"
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
          "author": "Mariana K., Cape Town",
          "rating": 5
      },
      "imageMood": "clean, smooth, professional",
      "heroImageQuery": "smooth white plastered walls empty room bright light",
      "heroBgImageQuery": "plastering wall dark textured background",
      "ogImageQuery": "smooth skim plaster finish interior white wall",
      "aboutImageQuery": "plasterer trowelling skim coat wall working",
      "galleryImageQueries": [
          "smooth interior plastered room white walls ceiling",
          "rendered exterior building facade finished",
          "repaired wall crack smooth finish painted",
          "newly plastered room ready for painting light"
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
          "author": "Stefan J., Cape Town",
          "rating": 5
      },
      "imageMood": "secure, clean, residential",
      "heroImageQuery": "black palisade fence installed around residential property",
      "heroBgImageQuery": "fencing security palisade dark background",
      "ogImageQuery": "completed palisade fence boundary residential neat",
      "aboutImageQuery": "fencing installer drilling post holes working",
      "galleryImageQueries": [
          "steel palisade boundary fence residential property",
          "electric fence strands wall top perimeter security",
          "timber palisade garden fence panels neat row",
          "precast concrete wall boundary residential installed"
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
          "author": "Wayne C., Cape Town",
          "rating": 5
      },
      "imageMood": "industrial, safe, structured",
      "heroImageQuery": "scaffolding structure erected building facade blue sky",
      "heroBgImageQuery": "scaffolding dark construction site background",
      "ogImageQuery": "scaffolding around building renovation work access",
      "aboutImageQuery": "workers assembling scaffolding tubes clamps erecting",
      "galleryImageQueries": [
          "scaffolding around house residential renovation access",
          "scaffolding commercial building multiple stories facade",
          "scaffolding platform boards walkway safety rails",
          "clean construction site scaffolding removed completed"
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
          "author": "Pieter N., Cape Town",
          "rating": 5
      },
      "imageMood": "industrial, clear, professional",
      "heroImageQuery": "cleared building site ready for construction flat ground",
      "heroBgImageQuery": "demolition site rubble dark background",
      "ogImageQuery": "cleared site after demolition clean flat ready",
      "aboutImageQuery": "excavator demolishing structure operator working",
      "galleryImageQueries": [
          "interior stripped out gutted room bare walls",
          "excavator breaking concrete structure demolition",
          "skip bin loaded rubble bricks site clearing",
          "cleared level site after demolition clean"
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
          "author": "Adele F., Cape Town",
          "rating": 5
      },
      "imageMood": "clean, modern, sustainable",
      "heroImageQuery": "solar panels on modern house roof blue sky sunny",
      "heroBgImageQuery": "solar panel array dark sky background renewable energy",
      "ogImageQuery": "residential rooftop solar panel array installed",
      "aboutImageQuery": "solar installer mounting panel on roof working",
      "galleryImageQueries": [
          "solar panel rows installed residential rooftop",
          "battery storage unit wall mounted garage",
          "solar inverter display monitoring energy output",
          "modern house exterior with solar panels roof"
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
          "author": "James M., Cape Town",
          "rating": 5
      },
      "imageMood": "clean, modern, cool",
      "heroImageQuery": "modern living room air conditioner mounted wall cool interior",
      "heroBgImageQuery": "HVAC air conditioning unit dark background cooling",
      "ogImageQuery": "split unit air conditioner installed living room wall",
      "aboutImageQuery": "HVAC technician servicing air conditioner unit working",
      "galleryImageQueries": [
          "wall split unit air conditioner bedroom installed",
          "ducted air conditioning ceiling vent office",
          "air conditioner outdoor condenser unit mounted wall",
          "cassette air conditioning ceiling unit open plan office"
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
          "author": "Kobus V., Stellenbosch",
          "rating": 5
      },
      "imageMood": "natural, clean, resourceful",
      "heroImageQuery": "lush green garden irrigation sprinklers running water",
      "heroBgImageQuery": "borehole water pump dark background natural earth",
      "ogImageQuery": "garden lawn green healthy irrigation sprinkler system",
      "aboutImageQuery": "borehole drilling rig crew operating site working",
      "galleryImageQueries": [
          "borehole drilling rig operating garden yard",
          "submersible pump equipment pressure tank installed",
          "drip irrigation lines installed garden beds plants",
          "lush green lawn sprinkler system running sunset"
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
              "serviceImageQuery": "property deed title document signed sealed"
          },
          {
              "name": "Contracts & Commercial Law",
              "description": "Drafting, reviewing, and enforcing commercial contracts, NDAs, and shareholder agreements.",
              "tags": [
                  "Contracts",
                  "Commercial"
              ],
              "icon": "file-text",
              "serviceImageQuery": "commercial contract document pen signature close up"
          },
          {
              "name": "Dispute Resolution & Litigation",
              "description": "Civil litigation, mediation, and dispute resolution for individuals and businesses in South Africa.",
              "tags": [
                  "Litigation",
                  "Mediation"
              ],
              "icon": "shield",
              "serviceImageQuery": "courtroom interior empty wooden bench judge seat"
          },
          {
              "name": "Wills & Estate Administration",
              "description": "Drafting of wills, appointment as executor, and full estate administration to ensure your wishes are carried out.",
              "tags": [
                  "Wills",
                  "Estate Admin"
              ],
              "icon": "clipboard",
              "serviceImageQuery": "last will testament document signed witnessed"
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
          "author": "Mark & Susan T., Cape Town",
          "rating": 5
      },
      "imageMood": "professional, authoritative, trustworthy",
      "heroImageQuery": "law library shelves leather bound books gavel",
      "heroBgImageQuery": "dark moody scales of justice closeup dramatic lighting",
      "ogImageQuery": "legal scales justice books dark wooden desk",
      "aboutImageQuery": "attorneys discussing case files around conference table",
      "galleryImageQueries": [
          "law office interior mahogany desk bookshelves",
          "legal contract signature pen close up document",
          "courtroom wooden interior high ceiling formal",
          "scales of justice brass on desk with law books"
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
              "serviceImageQuery": "spreadsheet financial statements laptop screen numbers"
          },
          {
              "name": "Tax Compliance & Returns",
              "description": "Company tax, VAT, PAYE, and personal tax returns filed accurately and on time, every time.",
              "tags": [
                  "Tax Returns",
                  "VAT"
              ],
              "icon": "file-text",
              "serviceImageQuery": "tax return forms calculator pen on desk"
          },
          {
              "name": "Payroll & HR Administration",
              "description": "Full payroll processing, IRP5 submissions, PAYE reconciliations, and UIF registration.",
              "tags": [
                  "Payroll",
                  "IRP5"
              ],
              "icon": "users",
              "serviceImageQuery": "payroll payslip documents stacked on office desk"
          },
          {
              "name": "Company Registration & Compliance",
              "description": "New company registration with CIPC, BEE affidavits, annual returns, and SARS eFiling setup for startups and SMEs.",
              "tags": [
                  "CIPC Registration",
                  "Annual Returns"
              ],
              "icon": "check-square",
              "serviceImageQuery": "company registration certificate CIPC documents desk"
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
          "author": "Brendan O., Cape Town",
          "rating": 5
      },
      "imageMood": "professional, precise, trustworthy",
      "heroImageQuery": "financial reports charts graphs on desk calculator",
      "heroBgImageQuery": "dark moody spreadsheet numbers financial data screen",
      "ogImageQuery": "accounting ledger financial statements desk workspace",
      "aboutImageQuery": "accounting team reviewing financial reports in boardroom",
      "galleryImageQueries": [
          "bookkeeping ledger open on desk with calculator",
          "tax forms stacked with pen and calculator",
          "annual financial report graphs pie charts printed",
          "cloud accounting software dashboard laptop screen"
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
              "serviceImageQuery": "strategy whiteboard diagram flowchart sticky notes"
          },
          {
              "name": "Operational Improvement",
              "description": "Process mapping, efficiency analysis, and implementation support to reduce costs and improve output.",
              "tags": [
                  "Operations",
                  "Efficiency"
              ],
              "icon": "settings",
              "serviceImageQuery": "workflow process map diagram printed on table"
          },
          {
              "name": "Growth & Scale Advisory",
              "description": "Revenue growth strategy, market expansion planning, and investor-ready business development.",
              "tags": [
                  "Growth",
                  "Scale"
              ],
              "icon": "trending-up",
              "serviceImageQuery": "revenue growth chart upward trend on screen"
          },
          {
              "name": "Change Management & Restructuring",
              "description": "Organisational restructuring, workforce realignment, and change management support to navigate transitions smoothly.",
              "tags": [
                  "Restructuring",
                  "Change Management"
              ],
              "icon": "refresh-cw",
              "serviceImageQuery": "organisational chart restructured diagram pinned board"
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
          "author": "David K., Cape Town",
          "rating": 5
      },
      "imageMood": "sharp, professional, strategic",
      "heroImageQuery": "whiteboard covered in strategy diagrams and sticky notes",
      "heroBgImageQuery": "dark moody boardroom empty chairs long table",
      "ogImageQuery": "strategy planning board post-it notes diagrams",
      "aboutImageQuery": "consultant presenting strategy slides to client in meeting room",
      "galleryImageQueries": [
          "strategy workshop whiteboard markers sticky notes",
          "business plan document executive summary printed",
          "KPI dashboard metrics graphs on monitor screen",
          "process flowchart printed large format on wall"
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
              "serviceImageQuery": "retirement fund growth chart nest egg savings"
          },
          {
              "name": "Investment Portfolio Management",
              "description": "Personalised investment portfolios aligned to your risk profile, timeline, and financial goals.",
              "tags": [
                  "Investments",
                  "Portfolio"
              ],
              "icon": "trending-up",
              "serviceImageQuery": "investment portfolio pie chart asset allocation screen"
          },
          {
              "name": "Risk & Estate Planning",
              "description": "Life cover, income protection, and estate planning to protect your family and preserve wealth.",
              "tags": [
                  "Life Cover",
                  "Estate"
              ],
              "icon": "shield",
              "serviceImageQuery": "estate planning documents will testament pen"
          },
          {
              "name": "Tax-Efficient Savings & TFSA",
              "description": "Tax-free savings accounts, tax-efficient investment structures, and Section 12J planning for maximum after-tax growth.",
              "tags": [
                  "TFSA",
                  "Tax Efficiency"
              ],
              "icon": "percent",
              "serviceImageQuery": "savings account growth chart compound interest"
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
          "author": "Carol M., Cape Town",
          "rating": 5
      },
      "imageMood": "professional, trustworthy, confident",
      "heroImageQuery": "investment growth chart line graph upward trend",
      "heroBgImageQuery": "dark moody stock market data financial charts screen",
      "ogImageQuery": "financial planning documents charts calculator desk",
      "aboutImageQuery": "financial planner explaining charts to couple at desk",
      "galleryImageQueries": [
          "retirement savings jar coins growing plant money",
          "stock market investment chart candlestick screen",
          "life insurance policy document with family photos",
          "financial plan printed document pie charts graphs"
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
              "serviceImageQuery": "house and car miniature models umbrella protection"
          },
          {
              "name": "Business Insurance",
              "description": "Commercial property, liability, business interruption, and professional indemnity for any business size.",
              "tags": [
                  "Commercial",
                  "Liability"
              ],
              "icon": "briefcase",
              "serviceImageQuery": "commercial building exterior office warehouse property"
          },
          {
              "name": "Claims Assistance",
              "description": "We manage your claims from submission to settlement \u2014 you never face the insurer alone.",
              "tags": [
                  "Claims Support",
                  "Settlement"
              ],
              "icon": "shield",
              "serviceImageQuery": "car accident damage bumper claim scene"
          },
          {
              "name": "Specialist & High-Value Cover",
              "description": "Tailored cover for high-value homes, art collections, jewellery, and classic vehicles that standard policies exclude.",
              "tags": [
                  "High-Value",
                  "Art & Jewellery"
              ],
              "icon": "star",
              "serviceImageQuery": "luxury watch jewellery collection velvet case display"
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
          "author": "Nadia F., Cape Town",
          "rating": 5
      },
      "imageMood": "professional, reassuring, trustworthy",
      "heroImageQuery": "umbrella protecting house model safety shield concept",
      "heroBgImageQuery": "dark moody umbrella rain protection dramatic lighting",
      "ogImageQuery": "insurance policy documents house car model desk",
      "aboutImageQuery": "insurance broker reviewing policy documents with client at desk",
      "galleryImageQueries": [
          "insurance policy comparison documents spread on desk",
          "family home exterior garden protected insured",
          "warehouse commercial building exterior loading dock",
          "water damage home interior insurance claim"
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
              "serviceImageQuery": "CV resume document on desk with pen shortlist"
          },
          {
              "name": "Contract & Temp Staffing",
              "description": "Rapid deployment of contract and temporary staff for project work, leave cover, and peaks.",
              "tags": [
                  "Contract",
                  "Temp"
              ],
              "icon": "clock",
              "serviceImageQuery": "busy office open plan workspace desks computers"
          },
          {
              "name": "Executive Search",
              "description": "Discreet headhunting and executive search for senior management and C-suite appointments.",
              "tags": [
                  "Executive Search",
                  "C-Suite"
              ],
              "icon": "star",
              "serviceImageQuery": "boardroom executive chairs long table glass windows"
          },
          {
              "name": "Psychometric & Skills Testing",
              "description": "Pre-employment psychometric assessments, competency testing, and cultural fit evaluations to de-risk every hire.",
              "tags": [
                  "Psychometrics",
                  "Skills Testing"
              ],
              "icon": "clipboard",
              "serviceImageQuery": "aptitude test assessment paper desk pencil"
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
          "author": "Helen A., Cape Town CEO",
          "rating": 5
      },
      "imageMood": "professional, dynamic, people-focused",
      "heroImageQuery": "modern office space desks open plan bright workspace",
      "heroBgImageQuery": "dark moody empty office desks chairs evening",
      "ogImageQuery": "resume CV shortlist documents desk workspace",
      "aboutImageQuery": "recruitment consultants collaborating around laptop in office",
      "galleryImageQueries": [
          "office workspace modern desks bright natural light",
          "handshake two people meeting office job offer",
          "corner office executive desk city view window",
          "stack of CVs resumes printed on desk"
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
              "serviceImageQuery": "brand identity mockup logo business cards stationery"
          },
          {
              "name": "Digital Marketing & SEO",
              "description": "Google Ads, SEO, social media marketing, and email campaigns that drive measurable traffic and leads.",
              "tags": [
                  "Google Ads",
                  "SEO"
              ],
              "icon": "trending-up",
              "serviceImageQuery": "google analytics dashboard website traffic screen"
          },
          {
              "name": "Content & Creative Production",
              "description": "Copywriting, photography, video, and design assets produced to a consistent and compelling standard.",
              "tags": [
                  "Content",
                  "Video"
              ],
              "icon": "camera",
              "serviceImageQuery": "video production camera studio creative shoot setup"
          },
          {
              "name": "Website Design & Development",
              "description": "Conversion-focused websites built on modern platforms with SEO, analytics, and lead capture baked in from day one.",
              "tags": [
                  "Web Design",
                  "Lead Generation"
              ],
              "icon": "monitor",
              "serviceImageQuery": "responsive website design mockup laptop tablet phone"
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
          "author": "Jason R., Cape Town",
          "rating": 5
      },
      "imageMood": "creative, bold, modern",
      "heroImageQuery": "creative workspace mood board design mockups colourful",
      "heroBgImageQuery": "dark moody creative studio neon lights workspace",
      "ogImageQuery": "brand campaign mockup billboard poster design",
      "aboutImageQuery": "creative team brainstorming around whiteboard with post-its",
      "galleryImageQueries": [
          "brand campaign poster mockup billboard street",
          "social media marketing phone screen notifications",
          "photographer studio product shoot camera lighting",
          "marketing analytics dashboard charts ROI screen"
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
          "author": "Thandi N., Cape Town",
          "rating": 5
      },
      "imageMood": "professional, warm, purposeful",
      "heroImageQuery": "mountain summit sunrise achievement peak view",
      "heroBgImageQuery": "dark moody pathway leading forward light at end",
      "ogImageQuery": "compass direction leadership navigation desk",
      "aboutImageQuery": "coach and client in one on one session at small table",
      "galleryImageQueries": [
          "journal open on desk with pen goal list written",
          "lightbulb idea creativity innovation concept",
          "team workshop flipchart markers group activity",
          "growth mindset books stack on desk motivation"
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
          "author": "Pierre D., Cape Town",
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
          "author": "Emma K., Cape Town",
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
          "author": "Greg S., Cape Town importer",
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
              "serviceImageQuery": "spotless clean living room tidy bright interior"
          },
          {
              "name": "Office & Commercial Cleaning",
              "description": "Daily or weekly office cleaning with supply of consumables and after-hours scheduling.",
              "tags": [
                  "Office Clean",
                  "Commercial"
              ],
              "icon": "briefcase",
              "serviceImageQuery": "clean modern office space desks tidy interior"
          },
          {
              "name": "Deep Cleans & Move-Out",
              "description": "Full deep cleans for move-in, move-out, post-renovation, or once-off intensive cleaning.",
              "tags": [
                  "Deep Clean",
                  "Move-Out"
              ],
              "icon": "zap",
              "serviceImageQuery": "sparkling clean empty kitchen deep cleaned white"
          },
          {
              "name": "Carpet & Upholstery Cleaning",
              "description": "Professional steam cleaning of carpets, rugs, and upholstered furniture using truck-mounted extraction equipment.",
              "tags": [
                  "Carpet Clean",
                  "Steam Extraction"
              ],
              "icon": "wind",
              "serviceImageQuery": "carpet steam cleaning extraction machine residential"
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
          "author": "Juanita F., Cape Town",
          "rating": 5
      },
      "imageMood": "fresh, bright, spotless",
      "heroImageQuery": "spotless bright living room clean white interior home",
      "heroBgImageQuery": "cleaning supplies spray bottles dark background",
      "ogImageQuery": "immaculate clean home interior bright airy rooms",
      "aboutImageQuery": "cleaner wiping kitchen counter spray cloth working",
      "galleryImageQueries": [
          "clean tidy bedroom freshly made bed white sheets",
          "sparkling clean office workspace desks organized",
          "deep cleaned bathroom tiles grout shining",
          "polished hardwood floor living room gleaming"
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
          "author": "Sandra R., Cape Town",
          "rating": 5
      },
      "imageMood": "lush, natural, crafted",
      "heroImageQuery": "beautiful landscaped garden outdoor seating flowers lush",
      "heroBgImageQuery": "garden landscaping dark background lush green",
      "ogImageQuery": "stunning garden design pathways plants flowers",
      "aboutImageQuery": "gardener planting flowers bed landscaping working",
      "galleryImageQueries": [
          "landscaped garden design curved pathway flower beds",
          "timber deck outdoor dining area garden view",
          "indigenous fynbos garden rockery succulents",
          "water feature pond garden stones plants"
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
          "author": "Amanda H., Cape Town",
          "rating": 5
      },
      "imageMood": "clean, professional, trustworthy",
      "heroImageQuery": "clean pest free home interior bright kitchen",
      "heroBgImageQuery": "pest control equipment sprayer dark background",
      "ogImageQuery": "clean healthy home interior pest free living",
      "aboutImageQuery": "pest control technician spraying treatment working",
      "galleryImageQueries": [
          "pest control spray treatment along baseboard wall",
          "rodent bait station placed garden perimeter",
          "termite damage inspection wooden beam close up",
          "fumigation tent over house structure treatment"
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
          "author": "Clive D., Cape Town",
          "rating": 5
      },
      "imageMood": "professional, secure, authoritative",
      "heroImageQuery": "secure residential estate entrance gate camera bollards",
      "heroBgImageQuery": "security dark background shield protection",
      "ogImageQuery": "CCTV cameras installed building entrance security",
      "aboutImageQuery": "security officer patrolling residential area night",
      "galleryImageQueries": [
          "security patrol vehicle driving residential street night",
          "CCTV camera dome mounted building exterior",
          "boom gate access control estate entrance point",
          "security control room monitors screens surveillance"
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
          "author": "Margot K., Cape Town",
          "rating": 5
      },
      "imageMood": "professional, reliable, careful",
      "heroImageQuery": "moving truck parked outside house loading furniture",
      "heroBgImageQuery": "removals boxes truck dark background",
      "ogImageQuery": "removal truck loaded furniture boxes residential street",
      "aboutImageQuery": "movers carrying sofa down stairs teamwork careful",
      "galleryImageQueries": [
          "removal truck loaded furniture blankets residential",
          "office relocation desks stacked boxes corridor",
          "bubble wrap packing fragile items boxes",
          "storage facility unit open organized boxes"
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
          "author": "Gavin M., Cape Town",
          "rating": 5
      },
      "imageMood": "fresh, clean, aquatic",
      "heroImageQuery": "sparkling blue swimming pool backyard garden sunny",
      "heroBgImageQuery": "swimming pool dark background blue water",
      "ogImageQuery": "crystal clear pool turquoise water residential garden",
      "aboutImageQuery": "pool technician testing water chemistry skimmer net",
      "galleryImageQueries": [
          "clear blue pool water sunlight ripples residential",
          "pool pump room equipment filter plumbing",
          "renovated pool new tiles mosaic blue surface",
          "infinity pool edge garden view sunset residential"
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
          "author": "Richard J., Cape Town",
          "rating": 5
      },
      "imageMood": "clean, fresh, professional",
      "heroImageQuery": "row of pressed suits hanging rack dry cleaner shop",
      "heroBgImageQuery": "clothes hangers garments dark background clean",
      "ogImageQuery": "freshly pressed shirts suits hanging ready collection",
      "aboutImageQuery": "dry cleaner staff pressing garment steam iron working",
      "galleryImageQueries": [
          "suits jackets wrapped plastic dry cleaned rack",
          "folded pressed white shirts stacked neat",
          "seamstress sewing machine fabric alteration close up",
          "laundry delivery van garments bags hanging"
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
          "author": "Lesley B., Cape Town",
          "rating": 5
      },
      "imageMood": "practical, reliable, professional",
      "heroImageQuery": "modern kitchen appliances washing machine fridge interior",
      "heroBgImageQuery": "appliance repair tools multimeter dark background",
      "ogImageQuery": "kitchen appliances working properly washing machine fridge",
      "aboutImageQuery": "technician repairing washing machine tools working",
      "galleryImageQueries": [
          "washing machine drum repair parts close up",
          "refrigerator compressor repair back panel open",
          "dishwasher interior spray arm pump repair",
          "oven element thermostat repair door open"
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
          "author": "Tracy N., Cape Town",
          "rating": 5
      },
      "imageMood": "practical, reliable, friendly",
      "heroImageQuery": "well maintained home interior repairs completed tidy",
      "heroBgImageQuery": "tool belt tools dark background workshop",
      "ogImageQuery": "neat home interior shelves mounted walls painted",
      "aboutImageQuery": "handyman drilling wall shelf mounting working",
      "galleryImageQueries": [
          "new tap installed kitchen sink dripping fixed",
          "floating shelves mounted wall living room books",
          "freshly patched painted wall smooth finish",
          "flat pack furniture assembled desk bedroom neat"
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
          "author": "Gina R., Cape Town",
          "rating": 5
      },
      "imageMood": "warm, crafted, interior",
      "heroImageQuery": "reupholstered sofa velvet fabric elegant living room",
      "heroBgImageQuery": "fabric swatches dark background textile upholstery",
      "ogImageQuery": "reupholstered armchair new fabric interior styled",
      "aboutImageQuery": "upholsterer sewing fabric workroom hands close up",
      "galleryImageQueries": [
          "reupholstered sofa before after new fabric",
          "custom curtains drapes hanging bay window interior",
          "roman blinds fitted bedroom window styled",
          "upholstery workroom fabric bolts sewing machine"
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
          "author": "Daan P., Cape Town",
          "rating": 5
      },
      "imageMood": "industrial, clean, efficient",
      "heroImageQuery": "skip bin hire delivery residential driveway loaded",
      "heroBgImageQuery": "waste skip bin dark background industrial",
      "ogImageQuery": "skip hire bin residential waste removal street",
      "aboutImageQuery": "waste removal crew loading skip bin truck site",
      "galleryImageQueries": [
          "skip bin loaded residential driveway waste",
          "builders rubble removal tipper truck site clearance",
          "garden waste green refuse truck loaded branches",
          "waste sorting recycling facility bins separated"
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
          "author": "Amara D., Cape Town",
          "rating": 5
      },
      "imageMood": "warm, international, engaged",
      "heroImageQuery": "language school classroom interior desks whiteboard bright modern",
      "heroBgImageQuery": "language classroom dark background desks whiteboard modern",
      "ogImageQuery": "language school classroom desks whiteboard bright modern",
      "aboutImageQuery": "language teacher explaining lesson student whiteboard interaction",
      "galleryImageQueries": [
          "language classroom students desks whiteboard engaged learning",
          "business English group lesson adults conversation practice",
          "IELTS Cambridge exam study materials practice papers desk",
          "language students paired conversation practice speaking activity"
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
          "author": "Vanessa B., Cape Town",
          "rating": 5
      },
      "imageMood": "warm, engaged, bright",
      "heroImageQuery": "bright classroom interior desks bookshelves children learning warm",
      "heroBgImageQuery": "classroom desks books dark warm background education",
      "ogImageQuery": "classroom children learning desks books bright warm",
      "aboutImageQuery": "teacher helping child with reading book desk warm classroom",
      "galleryImageQueries": [
          "children homework time pencils books desks supervision classroom",
          "science experiment children classroom hands-on learning engaged",
          "children outdoor sports activity running playing field grass",
          "children reading books library corner colourful cushions"
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
          "author": "Michelle L., Cape Town",
          "rating": 5
      },
      "imageMood": "warm, creative, joyful",
      "heroImageQuery": "art studio interior easels canvases paints bright natural light",
      "heroBgImageQuery": "art studio dark background canvases paints brushes creative",
      "ogImageQuery": "art studio interior easels canvases paints ceramics bright",
      "aboutImageQuery": "art instructor guiding student brush technique canvas easel",
      "galleryImageQueries": [
          "watercolour painting class adult wet on wet technique studio",
          "ceramics kiln glazed pottery finished pieces display shelf",
          "children finger painting messy fun colourful art class table",
          "art studio wall completed paintings canvases exhibition display"
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
            "serviceImageQuery": "car warranty certificate document keys desk"
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
          "author": "Kyle F., Cape Town",
          "rating": 5
      },
      "imageMood": "premium, trustworthy, clean",
      "heroImageQuery": "luxury car showroom dark interior modern dealership",
      "heroBgImageQuery": "car showroom dark background luxury vehicles row",
      "ogImageQuery": "car dealership showroom row of vehicles",
      "aboutImageQuery": "car salesperson shaking hands with customer at dealership",
      "galleryImageQueries": [
          "black luxury SUV parked front view",
          "silver hatchback car side view clean",
          "white pickup truck front angle outdoor",
          "grey BMW sedan parked side view"
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
              "serviceImageQuery": "smartphone showing app interface UI design colourful"
          },
          {
              "name": "Web Applications",
              "description": "Scalable web apps, SaaS platforms, and customer portals built with modern React and Node.js.",
              "tags": [
                  "Web App",
                  "SaaS"
              ],
              "icon": "monitor",
              "serviceImageQuery": "web application dashboard screen laptop browser"
          },
          {
              "name": "MVP & Startup Builds",
              "description": "Lean MVPs built fast and smart to validate your idea before committing to a full product build.",
              "tags": [
                  "MVP",
                  "Startup"
              ],
              "icon": "zap",
              "serviceImageQuery": "wireframe sketches on paper app UX design process"
          },
          {
            "name": "API Development & Integration",
            "description": "Custom API development, third-party integrations, and payment gateway connections to power your platform behind the scenes.",
            "tags": [
              "API",
              "Integration"
            ],
            "serviceImageQuery": "API endpoint code JSON response terminal screen"
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
          "author": "Liam P., Cape Town startup founder",
          "rating": 5
      },
      "imageMood": "modern, technical, sharp",
      "heroImageQuery": "mobile app screens UI design mockup smartphone",
      "heroBgImageQuery": "code editor dark screen syntax highlighted programming",
      "ogImageQuery": "mobile app UI screens design mockup",
      "aboutImageQuery": "developer writing code on laptop screen close-up",
      "galleryImageQueries": [
          "mobile app UI design screens colourful interface",
          "code on dark screen programming syntax IDE",
          "web dashboard analytics charts browser screen",
          "wireframe prototype sketches UX design whiteboard"
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
              "serviceImageQuery": "Shopify store homepage design laptop product grid"
          },
          {
              "name": "Conversion Rate Optimisation",
              "description": "UX improvements, A/B testing, and checkout flow optimisation to turn more visitors into buyers.",
              "tags": [
                  "CRO",
                  "A/B Testing"
              ],
              "icon": "trending-up",
              "serviceImageQuery": "analytics dashboard conversion rate charts screen"
          },
          {
              "name": "E-commerce Growth Management",
              "description": "Ongoing SEO, Google Shopping, email marketing, and performance reporting for growing stores.",
              "tags": [
                  "Google Shopping",
                  "SEO"
              ],
              "icon": "bar-chart-2",
              "serviceImageQuery": "Google Shopping ads product listing screen"
          },
          {
            "name": "Product Photography & Listing",
            "description": "E-commerce product photography, copywriting, and bulk listing upload — ready to sell from day one.",
            "tags": [
              "Product Photos",
              "Listing"
            ],
            "serviceImageQuery": "ecommerce product photo white background styled item"
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
          "author": "Nadia R., Cape Town",
          "rating": 5
      },
      "imageMood": "modern, commercial, sharp",
      "heroImageQuery": "ecommerce online store product page laptop screen",
      "heroBgImageQuery": "online store checkout page dark screen background",
      "ogImageQuery": "ecommerce product grid shopping cart laptop screen",
      "aboutImageQuery": "person managing ecommerce store orders on laptop",
      "galleryImageQueries": [
          "Shopify online store homepage products grid screen",
          "ecommerce analytics dashboard conversion charts",
          "product page design photography online store",
          "email marketing campaign newsletter laptop screen"
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
      "testimonial": {
          "quote": "My daughter went from refusing to practise to playing for an hour every day. Incredible teacher.",
          "author": "Anthea S., Cape Town",
          "rating": 5
      },
      "imageMood": "warm, creative, inspiring",
      "heroImageQuery": "music school studio interior piano guitar instruments warm",
      "heroBgImageQuery": "piano keys dark moody background music instruments",
      "ogImageQuery": "music school studio instruments piano guitar warm bright",
      "aboutImageQuery": "music teacher guiding student hands piano keys lesson",
      "galleryImageQueries": [
          "piano practice upright keys sheet music student hands",
          "guitar lesson student chord finger placement fretboard",
          "violin lesson bow technique student close-up strings",
          "music school recital concert students performing stage"
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
      "testimonial": {
          "quote": "Maths went from 42% to 78% in one term. The tutor found exactly where the gaps were.",
          "author": "Miriam T., Cape Town",
          "rating": 5
      },
      "imageMood": "focused, warm, encouraging",
      "heroImageQuery": "study desk books stationery bright room academic learning",
      "heroBgImageQuery": "books study desk dark background academic learning",
      "ogImageQuery": "tutoring desk books study materials academic bright",
      "aboutImageQuery": "tutor explaining concept whiteboard student one-on-one session",
      "galleryImageQueries": [
          "maths whiteboard equations student pencil working problem",
          "matric revision past papers study notes highlighter desk",
          "essay writing feedback red pen notebook student desk",
          "online tutoring session laptop screen student desk webcam"
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
      "testimonial": {
          "quote": "Passed my road test first time. My instructor was endlessly patient and incredibly thorough.",
          "author": "Zara K., Cape Town",
          "rating": 5
      },
      "imageMood": "confident, fresh, practical",
      "heroImageQuery": "driving school car dual-control interior dashboard road view",
      "heroBgImageQuery": "car dashboard driving road dark background view",
      "ogImageQuery": "driving school car road lesson dual-control interior",
      "aboutImageQuery": "driving instructor guiding student hands steering wheel lesson car",
      "galleryImageQueries": [
          "driving lesson car road view steering wheel dashboard mirrors",
          "parallel parking cones yard test K53 practice manoeuvre",
          "K53 learner licence study materials road signs book",
          "driving school branded car road lesson student confidence"
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
      "testimonial": {
          "quote": "My son runs to school every morning. He's thriving socially and academically. Wonderful place.",
          "author": "Nomsa K., Cape Town",
          "rating": 5
      },
      "imageMood": "bright, nurturing, playful",
      "heroImageQuery": "preschool classroom interior bright colourful toys shelves learning",
      "heroBgImageQuery": "preschool classroom colourful toys learning bright background",
      "ogImageQuery": "preschool classroom bright colourful toys learning area",
      "aboutImageQuery": "preschool teacher reading story children circle mat classroom",
      "galleryImageQueries": [
          "preschool play-based learning building blocks water table classroom",
          "preschool outdoor playground climbing frame sandpit children",
          "grade R preparation writing letters numbers worksheet desk",
          "preschool art activity messy play painting children table"
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
      "testimonial": {
          "quote": "Measurable change in team performance within 6 weeks. Practical, relevant, excellent.",
          "author": "Liezel M., Cape Town",
          "rating": 5
      },
      "imageMood": "professional, focused, empowering",
      "heroImageQuery": "training academy classroom interior projector desks modern bright",
      "heroBgImageQuery": "training classroom dark background desks projector modern",
      "ogImageQuery": "training academy classroom desks projector modern bright",
      "aboutImageQuery": "facilitator leading workshop flipchart team discussion engaged",
      "galleryImageQueries": [
          "training classroom students taking notes whiteboard presentation",
          "corporate team workshop boardroom collaborative exercise",
          "learnership youth practical workplace mentoring on-the-job training",
          "training certificate ceremony graduation group achievement"
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
      "testimonial": {
          "quote": "My 10-year-old built his own game in 8 weeks. He is obsessed. Best investment.",
          "author": "David O., Cape Town",
          "rating": 5
      },
      "imageMood": "modern, energetic, creative",
      "heroImageQuery": "coding lab interior computers screens bright modern classroom",
      "heroBgImageQuery": "code screen programming syntax dark background green text",
      "ogImageQuery": "coding lab computers screens modern bright classroom",
      "aboutImageQuery": "coding instructor helping student debug code screen laptop",
      "galleryImageQueries": [
          "kids Scratch coding colourful blocks game design screen",
          "teen building website HTML CSS code screen laptop",
          "adult learning computer skills Microsoft Office screen keyboard",
          "student presenting coding project screen classmates applause"
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
      "testimonial": {
          "quote": "Used my training for real 3 months later. It worked. That instructor potentially saved a life.",
          "author": "Gavin M., Cape Town",
          "rating": 5
      },
      "imageMood": "confident, practical, professional",
      "heroImageQuery": "first aid training room mannequins bandages equipment bright",
      "heroBgImageQuery": "first aid medical training dark background bandages equipment",
      "ogImageQuery": "first aid training room CPR mannequins equipment bright",
      "aboutImageQuery": "first aid instructor demonstrating bandaging technique student arm",
      "galleryImageQueries": [
          "CPR training group students mannequins chest compressions floor",
          "AED defibrillator device open pads ready emergency training",
          "fire safety training extinguisher demonstration workplace outdoor",
          "first aid training recovery position patient floor demonstration"
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
          "author": "Derek M., Cape Town",
          "rating": 5
      },
      "imageMood": "technical, clean, professional",
      "heroImageQuery": "car on hydraulic lift in mechanic workshop garage",
      "heroBgImageQuery": "car engine bay close-up dark workshop background",
      "ogImageQuery": "mechanic tools laid out on workshop bench engine parts",
      "aboutImageQuery": "mechanic working under vehicle bonnet in workshop",
      "galleryImageQueries": [
          "car on hydraulic lift in clean workshop",
          "mechanic using diagnostic laptop on engine bay",
          "brake disc pads suspension spring close-up",
          "workshop interior tool wall organised equipment"
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
          "author": "Jacqui H., Cape Town",
          "rating": 5
      },
      "imageMood": "precise, professional, clean",
      "heroImageQuery": "car being spray painted in auto body booth",
      "heroBgImageQuery": "spray paint booth car dark workshop background",
      "ogImageQuery": "car dent repair panel beating hammer body filler",
      "aboutImageQuery": "panel beater sanding car body in workshop",
      "galleryImageQueries": [
          "car before and after panel repair restoration",
          "spray paint booth car colour matched respray",
          "panel beater workshop tools equipment organised",
          "repaired car gleaming after full respray"
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
              "serviceImageQuery": "car interior deep clean leather seats dashboard valet"
          },
          {
              "name": "Paint Correction",
              "description": "Machine polishing to remove swirl marks, scratches, and oxidation \u2014 restoring true paint depth.",
              "tags": [
                  "Paint Correction",
                  "Swirl Removal"
              ],
              "serviceImageQuery": "machine polisher removing swirl marks car paint close-up"
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
          "author": "Brendon A., Cape Town",
          "rating": 5
      },
      "imageMood": "glossy, precise, clean",
      "heroImageQuery": "glossy black car hood reflection after detailing polish",
      "heroBgImageQuery": "glossy wet car paintwork reflection dark background",
      "ogImageQuery": "car paint ceramic coating water beading glossy",
      "aboutImageQuery": "detailer machine polishing car paintwork close-up",
      "galleryImageQueries": [
          "car interior vacuumed clean leather conditioned",
          "paint correction before after swirl marks removed",
          "ceramic coated car water beading on hood",
          "car being hand washed foam mitt bucket"
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
              "serviceImageQuery": "new tyres stacked on display rack tyre shop"
          },
          {
              "name": "Wheel Alignment & Balancing",
              "description": "Computerised four-wheel alignment and dynamic wheel balancing to extend tyre life.",
              "tags": [
                  "Wheel Alignment",
                  "Balancing"
              ],
              "serviceImageQuery": "computerised wheel alignment machine laser car"
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
          "author": "Calvin D., Cape Town",
          "rating": 5
      },
      "imageMood": "professional, practical, fast",
      "heroImageQuery": "new tyre on rim close-up tread pattern rubber",
      "heroBgImageQuery": "tyre tread close-up rubber dark background",
      "ogImageQuery": "stack of new tyres in tyre shop",
      "aboutImageQuery": "technician fitting tyre onto wheel rim with machine",
      "galleryImageQueries": [
          "car lifted on jack tyre being changed",
          "computerised wheel alignment machine display readings",
          "new tyres stacked rows display tyre shop",
          "tyre tread depth gauge measurement close-up"
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
          "author": "Gavin B., Cape Town",
          "rating": 5
      },
      "imageMood": "technical, precise, professional",
      "heroImageQuery": "car electrical wiring harness dashboard close-up",
      "heroBgImageQuery": "vehicle wiring loom electrical connections dark background",
      "ogImageQuery": "car OBD diagnostic tool plugged into dashboard",
      "aboutImageQuery": "auto electrician testing vehicle wiring with multimeter",
      "galleryImageQueries": [
          "car OBD diagnostic scanner display readings",
          "vehicle alarm immobiliser module installed",
          "dash camera mounted on car windscreen",
          "car electrical wiring repair soldering workshop"
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
          "author": "Yolanda T., Cape Town",
          "rating": 5
      },
      "imageMood": "urgent, reliable, professional",
      "heroImageQuery": "flatbed tow truck loading car on ramp roadside",
      "heroBgImageQuery": "tow truck headlights road dark night background",
      "ogImageQuery": "tow truck flatbed with car loaded road",
      "aboutImageQuery": "tow truck operator securing vehicle straps for transport",
      "galleryImageQueries": [
          "flatbed tow truck with car loaded highway",
          "roadside battery jump start cables connected",
          "accident vehicle recovery tow truck crane",
          "tow truck amber lights operating at night road"
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
          "author": "Kobus V., Cape Town",
          "rating": 5
      },
      "imageMood": "bold, adventurous, mechanical",
      "heroImageQuery": "motorcycles lined up in showroom floor display",
      "heroBgImageQuery": "motorcycle close-up engine detail dark moody garage",
      "ogImageQuery": "row of motorcycles in showroom gleaming",
      "aboutImageQuery": "motorcycle mechanic working on engine in workshop",
      "galleryImageQueries": [
          "adventure motorcycle parked outdoor scenic road",
          "motorcycle engine close-up chrome exhaust detail",
          "riding helmets gloves boots gear display wall",
          "classic vintage motorcycle restored showroom"
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
              "serviceImageQuery": "website homepage design mockup browser clean layout"
          },
          {
              "name": "E-Commerce Development",
              "description": "WooCommerce and Shopify stores built for performance, conversion, and easy self-management.",
              "tags": [
                  "Shopify",
                  "WooCommerce"
              ],
              "serviceImageQuery": "ecommerce store design product page checkout screen"
          },
          {
              "name": "SEO & Performance",
              "description": "Technical SEO, page speed optimisation, and analytics setup to turn your site into a lead machine.",
              "tags": [
                  "SEO",
                  "Page Speed"
              ],
              "serviceImageQuery": "SEO analytics dashboard Google search results screen"
          },
          {
            "name": "Hosting & Maintenance",
            "description": "Managed hosting, uptime monitoring, security updates, and monthly content changes — your site stays fast and safe.",
            "tags": [
              "Hosting",
              "Maintenance"
            ],
            "serviceImageQuery": "server rack hosting data centre blinking lights"
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
          "author": "Wendy M., Cape Town",
          "rating": 5
      },
      "imageMood": "modern, clean, digital",
      "heroImageQuery": "website design mockup on laptop screen modern clean",
      "heroBgImageQuery": "website code HTML CSS dark editor screen background",
      "ogImageQuery": "responsive website design desktop tablet mobile mockup",
      "aboutImageQuery": "web developer coding on dual monitors desk",
      "galleryImageQueries": [
          "website portfolio page design clean modern layout",
          "ecommerce store product grid Shopify design",
          "SEO analytics traffic growth chart dashboard",
          "responsive website design mobile tablet desktop screens"
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
              "serviceImageQuery": "helpdesk support screen monitoring dashboard alerts"
          },
          {
              "name": "Cloud & Microsoft 365",
              "description": "Microsoft 365 migration, setup, licensing, and ongoing administration and end-user support.",
              "tags": [
                  "Microsoft 365",
                  "Cloud Migration"
              ],
              "serviceImageQuery": "Microsoft 365 cloud apps icons laptop screen"
          },
          {
              "name": "Network & Security",
              "description": "Business network design, firewall configuration, backup solutions, and cybersecurity implementation.",
              "tags": [
                  "Network",
                  "Cybersecurity"
              ],
              "serviceImageQuery": "network switch ethernet cables connected blinking"
          },
          {
            "name": "Hardware Procurement & Setup",
            "description": "Laptops, desktops, monitors, and peripherals sourced at trade pricing and delivered configured and ready to work.",
            "tags": [
              "Hardware",
              "Procurement"
            ],
            "serviceImageQuery": "new laptop unboxing setup workstation desk monitor"
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
          "author": "Chris H., Cape Town",
          "rating": 5
      },
      "imageMood": "professional, technical, reliable",
      "heroImageQuery": "server rack data centre blinking lights networking",
      "heroBgImageQuery": "server room data centre blue lights dark background",
      "ogImageQuery": "server rack networking cables data centre blue",
      "aboutImageQuery": "IT technician configuring server rack data centre",
      "galleryImageQueries": [
          "helpdesk monitoring dashboard multiple screens alerts",
          "Microsoft 365 cloud migration setup laptop",
          "server room racks cables networking infrastructure",
          "firewall security appliance network rack installed"
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
              "serviceImageQuery": "Google Ads campaign dashboard PPC metrics screen"
          },
          {
              "name": "SEO & Content Marketing",
              "description": "Technical SEO, content strategy, and link building driving organic ranking and traffic growth.",
              "tags": [
                  "SEO",
                  "Content"
              ],
              "serviceImageQuery": "SEO ranking results Google search page screen"
          },
          {
              "name": "Social Media & Email",
              "description": "Social media strategy, paid social, and email marketing managed to measurable engagement goals.",
              "tags": [
                  "Social Media",
                  "Email Marketing"
              ],
              "serviceImageQuery": "social media feed posts scheduled content calendar screen"
          },
          {
            "name": "Marketing Automation & CRM",
            "description": "HubSpot, Mailchimp, and custom CRM setups that automate lead nurturing and keep your sales pipeline moving.",
            "tags": [
              "Marketing Automation",
              "CRM"
            ],
            "serviceImageQuery": "CRM dashboard pipeline leads funnel automation screen"
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
          "author": "Ashley P., Cape Town",
          "rating": 5
      },
      "imageMood": "data-driven, modern, professional",
      "heroImageQuery": "Google Ads analytics dashboard screen charts performance",
      "heroBgImageQuery": "analytics dashboard charts dark background screen",
      "ogImageQuery": "digital marketing analytics dashboard charts graphs",
      "aboutImageQuery": "marketing analyst reviewing campaign performance on screen",
      "galleryImageQueries": [
          "Google Ads PPC campaign metrics conversion screen",
          "SEO keyword ranking chart growth analytics",
          "social media content calendar posts scheduled",
          "email marketing campaign open rate dashboard"
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
          "author": "Mark T., Cape Town",
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
          "author": "Sandra M., Cape Town",
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
          "author": "Client, Cape Town",
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
        "serviceImageQuery": "portrait headshot natural light warm tones close-up"
      },
      {
        "name": "Commercial & Product Photography",
        "description": "Product, food, architectural, and commercial photography for brands, agencies, and e-commerce.",
        "tags": [
          "Commercial",
          "Product"
        ],
        "icon": "camera",
        "serviceImageQuery": "product photography flat lay styled table overhead"
      },
      {
        "name": "Events & Corporate",
        "description": "Conference, awards, and corporate event coverage with same-week turnaround on edited selects.",
        "tags": [
          "Events",
          "Corporate"
        ],
        "icon": "users",
        "serviceImageQuery": "event photography crowd stage speakers conference"
      },
        {
          "name": "Drone & Aerial Photography",
          "description": "Licensed drone photography for property, construction, events, and landscape — dramatic perspectives from above.",
          "tags": [
            "Drone",
            "Aerial"
          ],
          "serviceImageQuery": "aerial drone photo coastline landscape overhead view"
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
      "author": "Zara T., Cape Town",
      "rating": 5
    },
    "imageMood": "cinematic, natural light, intimate",
    "heroImageQuery": "portrait photo natural light woman close-up studio",
    "ogImageQuery": "professional camera lens portrait photography bokeh shallow depth",
    "aboutImageQuery": "photographer adjusting lighting behind the scenes on shoot",
    "galleryImageQueries": [
      "portrait photo moody lighting studio close-up",
      "product flat lay overhead styled arrangement",
      "couple candid outdoor golden hour lifestyle",
      "architectural interior photo natural light room"
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
        "serviceImageQuery": "cinema camera filming interview subject brand film"
      },
      {
        "name": "Social Media Content",
        "description": "Vertical and horizontal short-form video for Instagram, YouTube, and TikTok — edited and branded.",
        "tags": [
          "Social Content",
          "Reels"
        ],
        "icon": "smartphone",
        "serviceImageQuery": "smartphone vertical video filming social content"
      },
      {
        "name": "Event & Documentary Coverage",
        "description": "Multi-camera event coverage, conference recordings, and documentary-style narrative films.",
        "tags": [
          "Events",
          "Documentary"
        ],
        "icon": "video",
        "serviceImageQuery": "multi-camera event coverage conference recording"
      },
        {
          "name": "Drone & Aerial Video",
          "description": "Licensed drone cinematography for property, tourism, and brand films — sweeping aerials that add production value instantly.",
          "tags": [
            "Drone",
            "Aerial"
          ],
          "serviceImageQuery": "aerial drone footage coastline landscape cinematic view"
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
      "author": "Marcus H., Cape Town",
      "rating": 5
    },
    "imageMood": "cinematic, moody, professional",
    "heroImageQuery": "cinema camera on gimbal rig filming close-up",
    "ogImageQuery": "video production professional Cape Town brand film cinematic",
    "aboutImageQuery": "videographer operating cinema camera on set filming",
    "galleryImageQueries": [
      "cinema camera on dolly track filming scene",
      "vertical video filming social media content",
      "drone aerial shot filming landscape cinematic",
      "video editing timeline colour grading screen"
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
        "serviceImageQuery": "brand identity logo design stationery mockup layout"
      },
      {
        "name": "Print & Packaging Design",
        "description": "Brochures, packaging, annual reports, and high-end print collateral designed for impact.",
        "tags": [
          "Packaging",
          "Print"
        ],
        "icon": "layers",
        "serviceImageQuery": "packaging design boxes printed brochure layout table"
      },
      {
        "name": "Digital & Social Design",
        "description": "Social media templates, website UI, email design, and digital ad creative at scale.",
        "tags": [
          "Social Media",
          "UI Design"
        ],
        "icon": "monitor",
        "serviceImageQuery": "social media template design phone screen mockup"
      },
        {
          "name": "Presentation & Pitch Deck Design",
          "description": "Investor decks, sales presentations, and internal keynotes designed to communicate clearly and win the room.",
          "tags": [
            "Pitch Deck",
            "Presentation"
          ],
          "serviceImageQuery": "pitch deck presentation slides screen clean layout design"
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
      "author": "Sophie W., Cape Town",
      "rating": 5
    },
    "imageMood": "bold, minimal, considered",
    "heroImageQuery": "brand identity design logo mockup stationery layout",
    "ogImageQuery": "graphic design brand identity professional Cape Town studio",
    "aboutImageQuery": "designer sketching logo concepts pencil paper desk",
    "galleryImageQueries": [
      "brand identity logo colour palette stationery",
      "packaging design product boxes printed layouts",
      "social media post design template phone screen",
      "typography poster design large format print"
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
        "serviceImageQuery": "modern living room interior styled sofa cushions art"
      },
      {
        "name": "Furniture & Décor Sourcing",
        "description": "Custom and sourced furniture, rugs, lighting, and art curated and coordinated for your space.",
        "tags": [
          "Furniture",
          "Sourcing"
        ],
        "icon": "layers",
        "serviceImageQuery": "furniture décor fabric samples mood board table"
      },
      {
        "name": "Commercial & Hospitality Design",
        "description": "Office interiors, retail design, and hospitality fit-outs that balance aesthetics with function.",
        "tags": [
          "Commercial",
          "Hospitality"
        ],
        "icon": "briefcase",
        "serviceImageQuery": "modern office interior design workspace open plan"
      },
        {
          "name": "Kitchen & Bathroom Design",
          "description": "Specialist kitchen and bathroom design with 3D renders, material selection, and contractor coordination.",
          "tags": [
            "Kitchen Design",
            "Bathroom"
          ],
          "serviceImageQuery": "modern kitchen design marble countertop island pendant lights"
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
      "author": "Kate & Jon A., Cape Town",
      "rating": 5
    },
    "imageMood": "elegant, considered, natural light",
    "heroImageQuery": "elegant living room interior design sofa art natural light",
    "ogImageQuery": "interior designer professional Cape Town residential project",
    "aboutImageQuery": "interior designer reviewing fabric swatches mood board",
    "galleryImageQueries": [
      "living room interior design elegant styled warm",
      "kitchen interior design modern marble countertop",
      "commercial office interior open plan design",
      "hospitality restaurant interior design elegant"
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
        "serviceImageQuery": "website copy wireframe layout screen design words"
      },
      {
        "name": "Content Strategy & Creation",
        "description": "Blog posts, newsletters, social content, and long-form articles that build authority and drive traffic.",
        "tags": [
          "Content Strategy",
          "Blog"
        ],
        "icon": "file-text",
        "serviceImageQuery": "blog post article writing screen content strategy"
      },
      {
        "name": "Campaign & Ad Copy",
        "description": "Campaign concepts, ad copy, email sequences, and landing page copy designed to convert.",
        "tags": [
          "Ad Copy",
          "Email"
        ],
        "icon": "target",
        "serviceImageQuery": "advertising headline layout magazine spread design"
      },
        {
          "name": "SEO Copywriting",
          "description": "Search-optimised web copy, landing pages, and blog content that ranks on Google and reads like it was written by a human.",
          "tags": [
            "SEO Copy",
            "Web Content"
          ],
          "serviceImageQuery": "Google search results page ranking SEO content screen"
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
      "author": "Tom A., Cape Town",
      "rating": 5
    },
    "imageMood": "considered, creative, clean",
    "heroImageQuery": "notebook pen laptop keyboard writing desk close-up",
    "ogImageQuery": "copywriter content creator professional Cape Town brand",
    "aboutImageQuery": "writer typing on laptop in bright creative workspace",
    "galleryImageQueries": [
      "brand manifesto copy layout print design",
      "blog content article screen laptop writing",
      "advertising campaign headline creative layout",
      "social media content posts planned calendar"
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
        "serviceImageQuery": "studio microphone condenser vocal booth recording"
      },
      {
        "name": "Mixing & Mastering",
        "description": "Professional mixing and mastering for independent artists and labels seeking a competitive sound.",
        "tags": [
          "Mixing",
          "Mastering"
        ],
        "icon": "sliders",
        "serviceImageQuery": "mixing console faders equaliser studio monitors speakers"
      },
      {
        "name": "Podcast & Voiceover Recording",
        "description": "Podcast episodes, voiceover sessions, and audio branding recorded and produced to broadcast standard.",
        "tags": [
          "Podcast",
          "Voiceover"
        ],
        "icon": "radio",
        "serviceImageQuery": "podcast microphone headphones recording studio desk"
      },
        {
          "name": "Film Scoring & Sync Licensing",
          "description": "Original music composition for film, TV, and advertising — plus sync licensing for existing catalogue tracks.",
          "tags": [
            "Film Score",
            "Sync Licensing"
          ],
          "serviceImageQuery": "music score sheet notes composition manuscript paper"
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
      "author": "Kagiso M., Cape Town",
      "rating": 5
    },
    "imageMood": "moody, professional, warm",
    "heroImageQuery": "recording studio mixing console faders knobs close-up",
    "ogImageQuery": "music studio professional recording Cape Town producer",
    "aboutImageQuery": "music producer adjusting mixing console in studio",
    "galleryImageQueries": [
      "band recording live session instruments studio",
      "mixing mastering console monitor speakers close-up",
      "podcast recording microphone headphones desk",
      "vocalist singing into condenser microphone studio"
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
        "serviceImageQuery": "wheel-thrown ceramic bowls mugs earthy glazes display"
      },
      {
        "name": "Textile & Woven Goods",
        "description": "Hand-woven cushion covers, throws, and wall hangings in natural fibres and local patterns.",
        "tags": [
          "Woven",
          "Natural Fibres"
        ],
        "icon": "grid",
        "serviceImageQuery": "hand-woven cushion covers throws natural fibre loom"
      },
      {
        "name": "Custom Leather Goods",
        "description": "Hand-stitched leather wallets, bags, key rings, and corporate gifts made to your specification.",
        "tags": [
          "Leather",
          "Custom"
        ],
        "icon": "briefcase",
        "serviceImageQuery": "hand-stitched leather wallet bag close-up craft"
      },
        {
          "name": "Candles & Home Fragrance",
          "description": "Hand-poured soy candles, reed diffusers, and room sprays made with essential oils in small batches.",
          "tags": [
            "Candles",
            "Home Fragrance"
          ],
          "serviceImageQuery": "hand-poured soy candle glass jar flame warm light"
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
      "author": "Anneke S., Cape Town",
      "rating": 5
    },
    "imageMood": "earthy, warm, artisanal",
    "heroImageQuery": "handmade ceramics pottery mugs bowls earthy tones display",
    "ogImageQuery": "handmade ceramics leather craft Cape Town artisan",
    "aboutImageQuery": "potter shaping clay on wheel in studio",
    "galleryImageQueries": [
      "ceramic vases bowls display earthy tones shelf",
      "woven textile cushion throw natural fibre",
      "hand-stitched leather goods wallet bag belt",
      "artisan craft market stall handmade goods"
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
        "serviceImageQuery": "bespoke dress garment on mannequin fitting studio"
      },
      {
        "name": "Ready-to-Wear Collection",
        "description": "Seasonal ready-to-wear pieces designed and produced in limited runs from our Cape Town studio.",
        "tags": [
          "Ready-to-Wear",
          "Limited Edition"
        ],
        "icon": "star",
        "serviceImageQuery": "ready-to-wear clothing rack styled editorial lookbook"
      },
      {
        "name": "Capsule Wardrobe Consulting",
        "description": "Personal styling and capsule wardrobe design to help you dress with intention and consistency.",
        "tags": [
          "Capsule Wardrobe",
          "Styling"
        ],
        "icon": "layers",
        "serviceImageQuery": "capsule wardrobe flat lay outfit combinations styled"
      },
        {
          "name": "Bridal & Occasion Wear",
          "description": "Custom-designed bridal gowns, mother-of-the-bride outfits, and occasion wear for events that matter.",
          "tags": [
            "Bridal",
            "Occasion Wear"
          ],
          "serviceImageQuery": "bridal gown white dress mannequin studio design detail"
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
      "Bespoke wedding ensemble, Cape Town",
      "SS25 ready-to-wear, campaign shoot",
      "Custom occasion dress, Woodstock studio",
      "Capsule collection, Cape Town stockist"
    ],
    "testimonial": {
      "quote": "The wedding dress was absolutely perfect. She understood exactly what I wanted and exceeded it.",
      "author": "Bianca P., Cape Town",
      "rating": 5
    },
    "imageMood": "considered, minimal, editorial",
    "heroImageQuery": "fashion garments hanging on rack editorial lookbook",
    "ogImageQuery": "fashion designer Cape Town bespoke ready-to-wear collection",
    "aboutImageQuery": "fashion designer cutting fabric on table in studio",
    "galleryImageQueries": [
      "fashion editorial model wearing designer garment",
      "bespoke dress fitting mannequin pins studio",
      "clothing collection lookbook styled garments rack",
      "sewing machine fabric construction studio detail"
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
        "serviceImageQuery": "2D animation explainer video colourful characters screen"
      },
      {
        "name": "Motion Graphics & Titles",
        "description": "Logo animations, broadcast graphics, title sequences, and social motion content for any platform.",
        "tags": [
          "Motion Graphics",
          "Logo Animation"
        ],
        "icon": "film",
        "serviceImageQuery": "motion graphics title sequence animated logo screen"
      },
      {
        "name": "3D Animation & Visualisation",
        "description": "Product visualisation, architectural walkthroughs, and 3D character animation.",
        "tags": [
          "3D Animation",
          "Product Vis"
        ],
        "icon": "box",
        "serviceImageQuery": "3D render product visualisation floating object screen"
      },
        {
          "name": "Interactive & UI Animation",
          "description": "Micro-interactions, loading states, and animated UI elements that make apps and websites feel alive.",
          "tags": [
            "UI Animation",
            "Micro-Interaction"
          ],
          "serviceImageQuery": "animated UI interface loading spinner button hover screen"
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
      "author": "Sam K., Cape Town",
      "rating": 5
    },
    "imageMood": "bold, vibrant, creative",
    "heroImageQuery": "animation storyboard frames colourful character design screen",
    "ogImageQuery": "motion design animation professional Cape Town studio",
    "aboutImageQuery": "animator working on frame illustration tablet stylus",
    "galleryImageQueries": [
      "2D animation explainer video colourful scene",
      "broadcast title sequence motion graphics animated",
      "3D product render visualisation floating angle",
      "social media motion content animated story"
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
        "serviceImageQuery": "fine line tattoo design botanical arm close-up"
      },
      {
        "name": "Cover-Up & Rework",
        "description": "Expert cover-up design and rework of existing tattoos — transforming what you have into what you want.",
        "tags": [
          "Cover-Up",
          "Rework"
        ],
        "icon": "refresh-cw",
        "serviceImageQuery": "tattoo cover-up before after arm transformation"
      },
      {
        "name": "Professional Piercing",
        "description": "Ear, nose, body, and cartilage piercings using implant-grade titanium jewellery and sterile technique.",
        "tags": [
          "Piercing",
          "Titanium Jewellery"
        ],
        "icon": "circle",
        "serviceImageQuery": "ear piercing titanium jewellery stud close-up"
      },
        {
          "name": "Laser Tattoo Removal",
          "description": "Safe, effective laser removal and fading treatments for old or unwanted tattoos — consultations always free.",
          "tags": [
            "Laser Removal",
            "Fading"
          ],
          "serviceImageQuery": "laser tattoo removal machine light beam skin treatment"
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
      "author": "Ruby H., Cape Town",
      "rating": 5
    },
    "imageMood": "dark, artistic, precise",
    "heroImageQuery": "fine line tattoo close-up arm botanical floral design",
    "ogImageQuery": "tattoo studio professional artist Cape Town custom",
    "aboutImageQuery": "tattoo artist inking design on arm studio close-up",
    "galleryImageQueries": [
      "fine line botanical tattoo arm close-up healed",
      "black and grey realism portrait tattoo sleeve",
      "geometric tattoo shoulder blade detailed linework",
      "ear piercings multiple titanium studs healed"
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
        "name": "Thandi Molefe",
        "description": "Mixed media and large-scale abstract works exploring memory, landscape, and identity. Exhibited at FNB Joburg Art Fair 2023.",
        "tags": [
          "Mixed Media",
          "Abstract"
        ],
        "icon": "star",
        "serviceImageQuery": "female artist painting large abstract canvas studio"
      },
      {
        "name": "James van Wyk",
        "description": "Oil on canvas landscapes and seascapes capturing the light and colour of the Western Cape coastline.",
        "tags": [
          "Oil Painting",
          "Landscape"
        ],
        "icon": "layers",
        "serviceImageQuery": "male artist painter studio easel oil painting"
      },
      {
        "name": "Naledi Khumalo",
        "description": "Contemporary sculpture and installation work in bronze, steel, and found materials. Winner of the Sasol New Signatures Award.",
        "tags": [
          "Sculpture",
          "Installation"
        ],
        "icon": "briefcase",
        "serviceImageQuery": "sculptor artist workshop bronze sculpture tools"
      },
      {
        "name": "Pieter de Villiers",
        "description": "Fine art photography and limited edition giclée prints documenting urban architecture and street life across South Africa.",
        "tags": [
          "Photography",
          "Prints"
        ],
        "serviceImageQuery": "photographer artist studio fine art photography prints"
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
      "author": "Catherine D., Cape Town collector",
      "rating": 5
    },
    "imageMood": "curated, minimal, artistic",
    "heroImageQuery": "contemporary art paintings hanging white gallery wall",
    "ogImageQuery": "art gallery Cape Town contemporary South African art",
    "aboutImageQuery": "gallery curator hanging artwork on white wall",
    "galleryImageQueries": [
      "gallery exhibition paintings hung white wall spotlights",
      "limited edition prints framed gallery display row",
      "sculpture pedestal gallery interior contemporary art",
      "gallery opening event visitors viewing artwork"
    ]
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
        "serviceImageQuery": "luxury house exterior for sale front garden"
      },
      {
        "name": "Rental Management",
        "description": "Tenant sourcing, lease management, and ongoing property management for residential landlords.",
        "tags": [
          "Rentals",
          "Property Management"
        ],
        "icon": "key",
        "serviceImageQuery": "modern apartment interior open plan living room"
      },
      {
        "name": "Property Investment Advisory",
        "description": "Investment property sourcing, yield analysis, and portfolio strategy for buy-to-let investors.",
        "tags": [
          "Investment",
          "Yield Analysis"
        ],
        "icon": "trending-up",
        "serviceImageQuery": "residential investment property building exterior balcony"
      },
        {
          "name": "First-Time Buyer Guidance",
          "description": "Step-by-step guidance through the home-buying process — bond pre-approval, offer to purchase, transfer, and registration.",
          "tags": [
            "First-Time Buyer",
            "Bond Guidance"
          ],
          "serviceImageQuery": "house keys new home front door entrance welcome"
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
      "Let above asking, Sea Point",
      "Investment portfolio, Atlantic Seaboard",
      "Off-market sale, Newlands"
    ],
    "testimonial": {
      "quote": "Sold for R200k above asking in under 2 weeks. She knows exactly how to position a property.",
      "author": "Michael & Jane D., Cape Town",
      "rating": 5
    },
    "imageMood": "premium, aspirational, professional",
    "heroImageQuery": "luxury home exterior white facade garden driveway",
    "ogImageQuery": "beautiful residential house curb appeal front view",
    "aboutImageQuery": "estate agent team meeting around table discussing listings",
    "galleryImageQueries": [
      "luxury villa swimming pool exterior sunset",
      "modern townhouse street view architecture",
      "penthouse apartment balcony ocean view",
      "suburban family home garden exterior"
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
        "serviceImageQuery": "modern residential house exterior architecture completed"
      },
      {
        "name": "Council Submissions & Approvals",
        "description": "Full planning permission submission, heritage assessment, and council approval management.",
        "tags": [
          "Council Submission",
          "Planning"
        ],
        "icon": "file-text",
        "serviceImageQuery": "architectural blueprints floor plan drawings desk"
      },
      {
        "name": "Commercial & Retail Design",
        "description": "Commercial interiors, retail fit-outs, and office refurbishments with full architectural service.",
        "tags": [
          "Commercial",
          "Retail Fit-Out"
        ],
        "icon": "briefcase",
        "serviceImageQuery": "modern commercial building interior open plan office design"
      },
        {
          "name": "Site Management & Contract Admin",
          "description": "Full construction oversight, contractor management, and contract administration from foundation to handover.",
          "tags": [
            "Site Management",
            "Contract Admin"
          ],
          "serviceImageQuery": "construction site scaffold building progress concrete frame"
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
      "author": "Lara & Nico B., Cape Town",
      "rating": 5
    },
    "imageMood": "architectural, clean, considered",
    "heroImageQuery": "modern architecture residential building exterior white walls",
    "ogImageQuery": "architectural model building design concept",
    "aboutImageQuery": "architect reviewing blueprints at desk with scale model",
    "galleryImageQueries": [
      "modern residential house architecture exterior completed",
      "home extension renovation contemporary glass design",
      "commercial office interior architecture open plan",
      "heritage building renovation restored facade"
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
        "serviceImageQuery": "boundary pegs survey markers on land plot"
      },
      {
        "name": "Sectional Title Surveys",
        "description": "Sectional plan preparation, registration, and extension of sectional title schemes.",
        "tags": [
          "Sectional Title",
          "Scheme"
        ],
        "icon": "layers",
        "serviceImageQuery": "apartment building complex aerial view sectional plan"
      },
      {
        "name": "Subdivision & Consolidation",
        "description": "Land subdivision, consolidation, and rezoning surveys for residential and commercial development.",
        "tags": [
          "Subdivision",
          "Rezoning"
        ],
        "icon": "scissors",
        "serviceImageQuery": "vacant land plots subdivision fenced development site"
      },
        {
          "name": "Topographic & As-Built Surveys",
          "description": "Detailed topographic surveys for architects and engineers, plus as-built verification for completed structures.",
          "tags": [
            "Topographic",
            "As-Built"
          ],
          "serviceImageQuery": "survey total station tripod instrument measuring land"
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
      "author": "Christo V., Cape Town",
      "rating": 5
    },
    "imageMood": "precise, professional, technical",
    "heroImageQuery": "theodolite tripod survey equipment on construction site",
    "ogImageQuery": "surveying total station instrument on tripod outdoors",
    "aboutImageQuery": "survey team with equipment on building site",
    "galleryImageQueries": [
      "surveying theodolite on tripod measuring land",
      "cadastral map boundary plan drawing",
      "residential building site pegs and string layout",
      "aerial view land parcels subdivision lots"
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
        "serviceImageQuery": "apartment keys on lease agreement document table"
      },
      {
        "name": "Maintenance Coordination",
        "description": "24-hour maintenance line, trusted contractor network, and monthly maintenance reporting.",
        "tags": [
          "Maintenance",
          "24hr Line"
        ],
        "icon": "tool",
        "serviceImageQuery": "building maintenance plumber fixing sink apartment"
      },
      {
        "name": "Financial Reporting",
        "description": "Monthly owner statements, rental collection, and annual income summaries for tax purposes.",
        "tags": [
          "Financial Statements",
          "Rental Collection"
        ],
        "icon": "file-text",
        "serviceImageQuery": "financial statement spreadsheet laptop rental income report"
      },
        {
          "name": "Body Corporate Administration",
          "description": "Full body corporate management including AGMs, trustee support, levy collection, and compliance with the Sectional Titles Act.",
          "tags": [
            "Body Corporate",
            "Levy Collection"
          ],
          "serviceImageQuery": "apartment complex body corporate meeting room documents"
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
      "6-unit apartment block, Sea Point",
      "Commercial strip, Cape Town CBD",
      "Residential portfolio, Southern Suburbs",
      "Holiday let, Atlantic Seaboard"
    ],
    "testimonial": {
      "quote": "Best decision I made with my investment property. Zero landlord stress for 4 years.",
      "author": "Johan M., Cape Town landlord",
      "rating": 5
    },
    "imageMood": "professional, reliable, residential",
    "heroImageQuery": "modern apartment building exterior balconies blue sky",
    "ogImageQuery": "residential apartment complex courtyard garden",
    "aboutImageQuery": "property management team meeting in office with laptops",
    "galleryImageQueries": [
      "apartment block exterior well maintained garden",
      "modern kitchen interior rental apartment clean",
      "commercial office building glass facade",
      "holiday rental apartment sea view balcony"
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
        "serviceImageQuery": "beautifully staged living room modern furniture neutral tones"
      },
      {
        "name": "Occupied Home Styling",
        "description": "Decluttering, furniture rearrangement, and styling of occupied homes for sale without full staging.",
        "tags": [
          "Occupied Styling",
          "Declutter"
        ],
        "icon": "layers",
        "serviceImageQuery": "decluttered minimalist bedroom white linen styling"
      },
      {
        "name": "Staging Consultation",
        "description": "Room-by-room advice and an action plan for owners who want to stage independently.",
        "tags": [
          "Consultation",
          "DIY Guidance"
        ],
        "icon": "clipboard",
        "serviceImageQuery": "interior mood board fabric swatches colour samples"
      },
        {
          "name": "Virtual Staging",
          "description": "Photorealistic virtual staging of empty rooms for online listings — no furniture hire, no waiting, delivered in 48 hours.",
          "tags": [
            "Virtual Staging",
            "Digital"
          ],
          "serviceImageQuery": "virtual staged room before after empty furnished comparison"
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
      "author": "Heather P., Cape Town",
      "rating": 5
    },
    "imageMood": "warm, aspirational, residential",
    "heroImageQuery": "staged luxury living room fireplace neutral decor",
    "ogImageQuery": "beautifully furnished open plan living dining room",
    "aboutImageQuery": "home stager arranging cushions on sofa in living room",
    "galleryImageQueries": [
      "empty room transformed into styled living space",
      "staged dining room table set with flowers",
      "staged master bedroom luxury bedding lamps",
      "staged entrance hallway console mirror fresh flowers"
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
        "serviceImageQuery": "zoning map urban plan coloured land use districts"
      },
      {
        "name": "Departure & Consent Use",
        "description": "Departure from zoning scheme, consent use applications, and land development approvals.",
        "tags": [
          "Departure",
          "Consent Use"
        ],
        "icon": "file-text",
        "serviceImageQuery": "residential neighbourhood aerial view mixed use buildings"
      },
      {
        "name": "Environmental & Heritage",
        "description": "Environmental authorisations, heritage impact assessments, and appeals for sensitive sites.",
        "tags": [
          "Environmental",
          "Heritage"
        ],
        "icon": "shield",
        "serviceImageQuery": "heritage building facade preserved restoration exterior"
      },
        {
          "name": "Subdivision & Development Coordination",
          "description": "End-to-end management of subdivision applications, including surveyor liaison, council submissions, and Deeds Office registration.",
          "tags": [
            "Subdivision",
            "Development"
          ],
          "serviceImageQuery": "subdivision development plan map layout site blocks"
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
      "author": "Alan R., Cape Town developer",
      "rating": 5
    },
    "imageMood": "professional, precise, authoritative",
    "heroImageQuery": "city urban skyline aerial view mixed use development",
    "ogImageQuery": "urban development plan aerial view buildings roads",
    "aboutImageQuery": "planners reviewing architectural drawings and site maps at desk",
    "galleryImageQueries": [
      "urban zoning map coloured districts planning",
      "construction site new development breaking ground",
      "heritage building victorian facade restoration",
      "environmental wetland conservation natural landscape"
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
        "serviceImageQuery": "custom signage outdoor banner large format printing"
      },
      {
        "name": "Vinyl Branding & Wraps",
        "description": "Cut vinyl lettering, window graphics, vehicle wraps, and wall murals applied by certified installers.",
        "tags": [
          "Vinyl",
          "Vehicle Wraps"
        ],
        "icon": "truck",
        "serviceImageQuery": "vinyl lettering window graphics storefront branding"
      },
      {
        "name": "Branding Materials & Print",
        "description": "Business cards, brochures, stickers, and branded packaging materials printed to premium specification.",
        "tags": [
          "Branding Materials",
          "Stickers"
        ],
        "icon": "file-text",
        "serviceImageQuery": "business cards brochures printed branding materials stacked"
      },
      {
        "name": "Vehicle Wraps & Fleet Branding",
        "description": "Full and partial vehicle wraps, fleet livery, and branded van graphics designed, printed, and applied on-site.",
        "tags": [
          "Vehicle Wraps",
          "Fleet Branding"
        ],
        "icon": "truck",
        "serviceImageQuery": "vehicle wrap branded van fleet livery graphics"
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
      "author": "Dean F., Cape Town",
      "rating": 5
    },
    "imageMood": "bold, vibrant, commercial",
    "heroImageQuery": "print shop wide format printer signage production",
    "ogImageQuery": "signage vinyl banners printed display",
    "aboutImageQuery": "print shop operator running wide format press",
    "galleryImageQueries": [
      "retail fascia signage illuminated shopfront",
      "branded vehicle wrap van fleet graphics",
      "event banner wall exhibition display stand",
      "window vinyl graphics storefront branding installed"
    ]
  },
}
