// ---------------------------------------------------------------------------
// The answer pages.
//
// One question per page, answered directly in the first paragraph. That
// paragraph is the whole point: it is the passage an AI assistant lifts when
// somebody asks the question, so it has to answer in full on its own, without
// the heading, without the page around it, and without a preamble.
//
// Every figure and claim here traces back to lib/chatbot/knowledge.ts, which
// is the canonical fact store. If a number changes, it changes in both places.
//
// Three honesty rules, carried over from the chatbot's system prompt. They are
// not style preferences:
//   1. Never claim a specific ranking, position, timeline or number of
//      enquiries.
//   2. AEO "improves the chances". Never "gets you named", never "makes sure".
//      Nobody controls what an AI says, and these pages must say so.
//   3. Never write that a business cannot get work without a website. "Works
//      much better with", not "only works if". Plenty of businesses do fine
//      without one, they know it, and overstating it costs their trust.
//
// Adding a page here means adding it in three more places: app/sitemap.ts,
// the "Pages on this site" section of lib/chatbot/knowledge.ts, and
// public/llms.txt. All three are hand-written on purpose.
// ---------------------------------------------------------------------------

export type Block =
  | { type: 'p'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'figures'; rows: { label: string; value: string; note?: string }[] }

export interface Answer {
  slug: string
  /** The question, exactly as somebody would ask it. Becomes the h1. */
  question: string
  /** Shorter framing for cards and nav, where the full question is too long. */
  shortTitle: string
  /** <title>. */
  metaTitle: string
  /** Meta description, and the card blurb on /answers. */
  metaDescription: string
  /** The quotable paragraph. Answers the question completely on its own. */
  lead: string
  sections: { heading: string; blocks: Block[] }[]
  /** Extra Q&As for the FAQPage node. The lead is added as the first entry. */
  faq: { q: string; a: string }[]
  related: string[]
  datePublished: string
}

const PUBLISHED = '2026-08-31'

export const ANSWERS: Answer[] = [
  {
    slug: 'website-cost-south-africa',
    question: 'What does a website cost in South Africa?',
    shortTitle: 'What a website costs',
    metaTitle: 'What Does a Website Cost in South Africa? — Mountain Studios',
    metaDescription:
      'Real figures, not a range. A home page is R2 000, each extra page R1 000, hosting and upkeep R400 a month, the domain about R100 a year. Worked example inside.',
    lead:
      'A small business website in South Africa generally costs between R2 000 and R25 000 to build, plus a monthly fee for hosting and upkeep. At Mountain Studios a home page is R2 000, every additional page is R1 000, and R400 a month covers hosting, the SSL certificate, updates, backups and small changes. The domain name is billed separately at roughly R100 a year. Those are guide figures — the final number moves with what the site actually needs.',
    sections: [
      {
        heading: 'What you pay once, and what you pay every month',
        blocks: [
          {
            type: 'p',
            text: 'Two different things get called "the price of a website", and mixing them up is how quotes end up impossible to compare. There is the build, which you pay once, and there is keeping it running, which you pay monthly.',
          },
          {
            type: 'figures',
            rows: [
              { label: 'Home page', value: 'R2 000', note: 'Once off' },
              { label: 'Each additional page', value: 'R1 000', note: 'Once off' },
              { label: 'Hosting and maintenance', value: 'R400 / month', note: 'Hosting, SSL certificate, updates, backups, small changes' },
              { label: 'Domain name', value: '~R100 / year', note: 'Billed separately. Some domains cost more than others' },
            ],
          },
          {
            type: 'p',
            text: 'There are no packages or tiers. You pay for the pages you actually want.',
          },
        ],
      },
      {
        heading: 'A worked example: what a five-page site costs',
        blocks: [
          {
            type: 'p',
            text: 'Say you want a home page, an about page, a services page, a gallery and a contact page. That is one home page at R2 000 and four more at R1 000 each, so about R6 000 to build.',
          },
          {
            type: 'p',
            text: 'After that it is R400 a month to keep it live and looked after, and about R100 a year for the domain. So the first year comes to roughly R10 900, and every year after that about R4 900.',
          },
        ],
      },
      {
        heading: 'What is included in the R400 a month',
        blocks: [
          {
            type: 'list',
            items: [
              'Hosting — the site being online and staying online.',
              'The SSL certificate, which is what puts the padlock in the address bar instead of a "not secure" warning.',
              'Updates and backups.',
              'Small changes — new opening hours, a price that moved, a photo swapped out.',
            ],
          },
          {
            type: 'p',
            text: 'Bigger additions get quoted before anyone touches anything. Nothing appears on an invoice that you have not already agreed to.',
          },
        ],
      },
      {
        heading: 'What moves the number',
        blocks: [
          {
            type: 'p',
            text: 'Page count is the main thing, which is why it is priced per page. Beyond that: whether you need online bookings, whether you are selling from the site, and how much of the content already exists.',
          },
          {
            type: 'p',
            text: 'The words and images for each page come from you. If you have them, the site gets built around them. If they need to be worked out from scratch, that takes longer.',
          },
        ],
      },
      {
        heading: 'Why quotes vary so much between studios',
        blocks: [
          {
            type: 'p',
            text: 'You will see R500 sites and R150 000 sites advertised in South Africa and both are real prices for real work. The cheap end is usually a template with your logo dropped into it. The expensive end is usually an agency with account managers, a design team and offices to pay for.',
          },
          {
            type: 'p',
            text: 'Ask any studio two things before comparing their number to anyone else’s: what happens after the site goes live, and who owns it. Those two answers explain most of the gap.',
          },
        ],
      },
    ],
    faq: [
      {
        q: 'Is there a cheaper option than R2 000 for a website in South Africa?',
        a: 'Yes, and it is usually a template with your logo dropped into it. That can be the right call for some businesses. What you generally give up is a layout built around what you actually do, and somebody to call when something breaks.',
      },
      {
        q: 'Do I have to pay the monthly fee?',
        a: 'Something has to cover hosting and the SSL certificate, or the site is not online and browsers flag it as not secure. At Mountain Studios that is R400 a month and it also covers updates, backups and small changes.',
      },
      {
        q: 'What happens to the price if I add pages later?',
        a: 'Additional pages are R1 000 each, the same as they are at the start. Bigger additions get quoted before any work begins.',
      },
    ],
    related: ['how-long-to-build-a-website', 'who-owns-my-website', 'do-i-need-a-website'],
    datePublished: PUBLISHED,
  },

  {
    slug: 'how-long-to-build-a-website',
    question: 'How long does it take to build a website?',
    shortTitle: 'How long it takes',
    metaTitle: 'How Long Does It Take to Build a Website? — Mountain Studios',
    metaDescription:
      'About 14 days from the day your content arrives. What those two weeks actually cover, and the one thing that causes nearly every delay.',
    lead:
      'A small business website typically takes about 14 days to build, counted from the day the content arrives rather than the day you agree to it. The content is the part that decides everything: the words and images for each page come from you, and the two weeks start once they land. Before any of that you can see a free preview of your own site in about a minute.',
    sections: [
      {
        heading: 'What the two weeks actually cover',
        blocks: [
          {
            type: 'p',
            text: 'Design, build, your review, changes, and going live. One person does all of it start to finish — no handoffs and no account managers — which is most of why it is two weeks and not two months.',
          },
          {
            type: 'p',
            text: 'You approve the build before it goes anywhere. Nothing is published that you have not seen.',
          },
        ],
      },
      {
        heading: 'What causes nearly every delay',
        blocks: [
          {
            type: 'p',
            text: 'Content. Almost always content. A site can be designed and built in a fortnight; waiting on photos of finished work, a menu, a list of services or a paragraph about the business is what turns a fortnight into two months.',
          },
          {
            type: 'p',
            text: 'It does not have to be polished. An old brochure, phone photos of your work, and a rough note about what you do is enough to design around.',
          },
        ],
      },
      {
        heading: 'What happens before the fourteen days',
        blocks: [
          {
            type: 'p',
            text: 'Type in your business name and a free preview of a site for it is generated in about a minute, before you commit to anything and before you have sent a single photo.',
          },
          {
            type: 'p',
            text: 'The layout in that preview is the real work. The photos are stock and the wording is a stand-in — your own go in when the real site is built.',
          },
        ],
      },
    ],
    faq: [
      {
        q: 'Can a website be built faster than 14 days?',
        a: 'Sometimes, depending on how many pages there are and how ready the content is. It is not something to promise before seeing the scope.',
      },
      {
        q: 'What do I need to have ready before we start?',
        a: 'The words and images for each page. Rough is fine — an old brochure, phone photos of your work, a menu. The site gets designed around what you send.',
      },
    ],
    related: ['website-cost-south-africa', 'who-owns-my-website'],
    datePublished: PUBLISHED,
  },

  {
    slug: 'who-owns-my-website',
    question: 'Who owns my website?',
    shortTitle: 'Who owns your website',
    metaTitle: 'Who Owns My Website? — Mountain Studios',
    metaDescription:
      'You do — the site, the domain and the content. What that means if you stop paying, and the questions worth asking any web designer before you sign.',
    lead:
      'You own your website. The site, the domain name and the content are yours, and they stay yours if you stop the monthly retainer. That is not true everywhere: some web designers register the domain in their own name, or build on a platform you are renting rather than something you can take with you. It is worth asking before you sign anything.',
    sections: [
      {
        heading: 'What happens if you stop paying the retainer',
        blocks: [
          {
            type: 'p',
            text: 'The website is still yours. What the retainer buys is hosting, the SSL certificate, updates, backups and small changes — the running of it, not the right to it.',
          },
          {
            type: 'p',
            text: 'If you leave, you leave with the site and the domain.',
          },
        ],
      },
      {
        heading: 'The domain name is the part people lose',
        blocks: [
          {
            type: 'p',
            text: 'A domain is registered to a person or a company, and whoever is named on that registration controls it. If a web designer registers it in their own name, then the address your customers know, your email addresses and every business card you have printed sit behind somebody else’s account.',
          },
          {
            type: 'p',
            text: 'This is the single most common way small businesses get stuck with a supplier they want to leave. It is also the easiest thing in the world to check.',
          },
        ],
      },
      {
        heading: 'Three questions worth asking any web designer',
        blocks: [
          {
            type: 'list',
            items: [
              'Whose name is the domain registered in?',
              'If I stop paying you, what happens to the site?',
              'Can I take the site to another host, and what would that involve?',
            ],
          },
          {
            type: 'p',
            text: 'Straight answers to those three tell you most of what you need to know about who you are dealing with.',
          },
        ],
      },
    ],
    faq: [
      {
        q: 'Do I own the content on my website?',
        a: 'Yes. The words and images are yours — most of them came from you in the first place.',
      },
      {
        q: 'Can I move my website to another company?',
        a: 'Yes. The site and the domain are yours to take.',
      },
    ],
    related: ['website-cost-south-africa', 'how-long-to-build-a-website'],
    datePublished: PUBLISHED,
  },

  {
    slug: 'google-ads-seo-or-aeo-first',
    question: 'Google Ads, SEO or AEO — which should I do first?',
    shortTitle: 'Which to do first',
    metaTitle: 'Google Ads, SEO or AEO — Which First? — Mountain Studios',
    metaDescription:
      'Three ways of getting found, explained in plain English, and the order to do them in. The website comes first, then ads, then SEO, then AEO.',
    lead:
      'Do the website first, then Google Ads if you want enquiries soon, then SEO for steady long-term visibility, and AEO last. Ads and search both send people somewhere, and they work much better when there is a good site waiting at the other end. AEO is genuinely growing and worth doing, but it is the newest of the three and the hardest to predict, which is why it goes last rather than first.',
    sections: [
      {
        heading: 'The three, in plain English',
        blocks: [
          {
            type: 'p',
            text: 'Google Ads — you pay Google to put your business at the top of the results when somebody searches for what you do. Your ads can be showing within days.',
          },
          {
            type: 'p',
            text: 'SEO, search engine optimisation — earning your place in the ordinary Google results rather than paying for the spot. Slower to build, but it keeps working once it does.',
          },
          {
            type: 'p',
            text: 'AEO, answer engine optimisation — the same idea again, for AI assistants like ChatGPT. Setting your site and your business details up so an AI can understand them and has a better chance of naming you when somebody asks it to recommend a business like yours.',
          },
        ],
      },
      {
        heading: 'Why the website comes first',
        blocks: [
          {
            type: 'p',
            text: 'All three of the others are ways of sending somebody to you. What they find when they arrive is what decides whether you get the job.',
          },
          {
            type: 'p',
            text: 'Plenty of businesses win work without a website — that is simply true, and anybody telling you otherwise is selling something. But money spent driving people to a page that does not convince them is money spent twice.',
          },
        ],
      },
      {
        heading: 'On a limited budget',
        blocks: [
          {
            type: 'p',
            text: 'The site and Google Ads come first. Ads appearing is not the same thing as enquiries arriving — how many follow depends on how many people are searching, how much competition there is, and how well the campaign is set up.',
          },
          {
            type: 'p',
            text: 'Nobody should promise you a number of enquiries, a position, or a date by which either arrives.',
          },
        ],
      },
    ],
    faq: [
      {
        q: 'Should I do AEO instead of SEO?',
        a: 'No. SEO is the established one and AEO is the newest and least predictable of the three. AEO is worth doing, but not at the expense of the things that are known to work.',
      },
      {
        q: 'How quickly do Google Ads work?',
        a: 'Ads can be showing within days. How many enquiries follow depends on search volume, competition and how the campaign is set up — that part nobody can promise.',
      },
    ],
    related: ['what-is-aeo', 'do-i-need-a-website', 'website-cost-south-africa'],
    datePublished: PUBLISHED,
  },

  {
    slug: 'what-is-aeo',
    question: 'What is answer engine optimisation (AEO)?',
    shortTitle: 'What AEO is',
    metaTitle: 'What Is Answer Engine Optimisation (AEO)? — Mountain Studios',
    metaDescription:
      'AEO is setting your website and business details up so AI assistants can understand them and have a better chance of naming you. What it involves, and what nobody can promise.',
    lead:
      'Answer engine optimisation, or AEO, is setting your website and your business details up so that AI assistants like ChatGPT, Perplexity and Google’s AI answers can understand them, and so you have a better chance of being named when somebody asks one of them to recommend a business like yours. It is the same idea as SEO, aimed at assistants instead of a results page. It improves the chances. Nobody controls what an AI says, and anybody promising you a guaranteed mention is overselling it.',
    sections: [
      {
        heading: 'Why it is a separate thing from SEO',
        blocks: [
          {
            type: 'p',
            text: 'Search results are a list of links, and somebody clicks one. An AI assistant reads the pages itself and answers in a paragraph, often naming two or three businesses and no more. There is no page two.',
          },
          {
            type: 'p',
            text: 'So the question stops being "where do we rank" and becomes "is there anything on this site clear enough to quote". Those need different work.',
          },
        ],
      },
      {
        heading: 'What actually helps',
        blocks: [
          {
            type: 'list',
            items: [
              'Facts stated plainly on the page — what you do, where you do it, what it costs, what your hours are. Assistants quote specifics and skip vagueness.',
              'Structured data, which is a machine-readable copy of those same facts sitting in the page for crawlers to read.',
              'Answering real questions directly, in the first sentence, rather than building up to it.',
              'Being consistent everywhere — the same business name, address and phone number on your site, your Google listing and your social profiles.',
              'Letting AI crawlers read the site at all. Some sites block them without realising.',
            ],
          },
        ],
      },
      {
        heading: 'What nobody can promise',
        blocks: [
          {
            type: 'p',
            text: 'That an assistant will name you. That it will keep naming you next month. That you will appear for a particular question. The models change, they are trained and updated on their own schedules, and none of that is anybody’s to control.',
          },
          {
            type: 'p',
            text: 'What is within reach is making sure that when an assistant does look, there is something clear, accurate and quotable to find.',
          },
        ],
      },
    ],
    faq: [
      {
        q: 'Is AEO the same as GEO?',
        a: 'Near enough. Generative engine optimisation is another name for the same work — getting a business understood and cited by AI assistants rather than ranked on a results page.',
      },
      {
        q: 'Can you guarantee my business is named by ChatGPT?',
        a: 'No, and nobody can. AEO improves the chances by making the facts about your business clear and machine-readable. What an assistant actually says is not within anyone’s control.',
      },
      {
        q: 'Do I need AEO if I already do SEO?',
        a: 'They overlap but they are not the same. A lot of what helps AEO is good practice anyway — clear facts, direct answers, consistent business details.',
      },
    ],
    related: ['google-ads-seo-or-aeo-first', 'do-i-need-a-website'],
    datePublished: PUBLISHED,
  },

  {
    slug: 'do-i-need-a-website',
    question: 'Does my small business need a website?',
    shortTitle: 'Do you need a website',
    metaTitle: 'Does My Small Business Need a Website? — Mountain Studios',
    metaDescription:
      'An honest answer. Plenty of South African businesses win work without one. Here is when a website earns its keep and when it genuinely does not.',
    lead:
      'Not necessarily. Plenty of South African businesses run well on word of mouth, a Facebook page and a WhatsApp number, and anybody telling you that is impossible is selling something. A website earns its keep when people who have never met you are trying to decide whether to call — when you are being compared to two other quotes, when the work is expensive enough that people check you out first, or when you are paying to send people somewhere.',
    sections: [
      {
        heading: 'When a website earns its keep',
        blocks: [
          {
            type: 'list',
            items: [
              'People are comparing you against other quotes before they phone.',
              'The job is big enough that somebody wants to see finished work first.',
              'You are spending on advertising, which needs somewhere to send people.',
              'You are getting the same five questions every week and answering them one at a time.',
              'You want to be found by somebody who does not already know your name.',
            ],
          },
        ],
      },
      {
        heading: 'When it genuinely does not',
        blocks: [
          {
            type: 'p',
            text: 'If you are fully booked on referrals and turning work away, a website is not what you need next. If your customers all walk past your door, a Google Business listing with good photos and correct hours will do more for you than a site will.',
          },
          {
            type: 'p',
            text: 'That is a real answer, not modesty. Building something you do not need is a waste of your money.',
          },
        ],
      },
      {
        heading: 'What a Facebook page cannot do',
        blocks: [
          {
            type: 'p',
            text: 'It is somebody else’s platform, and it shows your business next to everybody else’s. You do not control what appears around your work, and you do not control the reach.',
          },
          {
            type: 'p',
            text: 'You also cannot take it with you. A website and its domain are yours.',
          },
        ],
      },
    ],
    faq: [
      {
        q: 'Is a Facebook page enough instead of a website?',
        a: 'For some businesses, yes. What you give up is control of the platform, control of what appears alongside your work, and anything you can take with you.',
      },
      {
        q: 'I get all my work from word of mouth. Do I still need a website?',
        a: 'Probably not urgently. A site matters most when people who do not already know you are deciding whether to call.',
      },
    ],
    related: ['website-cost-south-africa', 'google-ads-seo-or-aeo-first', 'what-is-aeo'],
    datePublished: PUBLISHED,
  },
]

export function getAnswer(slug: string): Answer | undefined {
  return ANSWERS.find((a) => a.slug === slug)
}
