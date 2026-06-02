function buildTradesTemplate(data: TemplateData): string {
  const { content, businessName, businessCategory, primaryColor, secondaryColor, pages, images, stockImages, locationInfo } = data
  const fonts = fontPairings[businessCategory] || fontPairings['other']
  const navFlags = resolveNavLinks(pages)

  const heroImg = images[0] || stockImages.hero
  const stockPool = buildImagePool(images, stockImages, businessName)
  const aboutImg = images[5] || stockImages.about
  let _pi = 0
  const serviceImgs = [
    images[1] || stockImages.cards[0],
    images[2] || stockImages.cards[1],
    images[3] || stockImages.cards[2],
    images[4] || stockImages.cards[3],
    stockImages.cards[4],
    stockImages.cards[5],
  ]

  const trBg = '#f9f7f4'
  const trAlt = '#f0ece5'
  const trDark = '#1c1a17'
  const trText = '#2a2620'
  const trMuted = '#7a7068'
  const trAccent = primaryColor || '#c8480a'

  const headHtml = buildHead(businessName, fonts, primaryColor, secondaryColor, 'light')

  const extraFonts = `<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet"/>`

  // Grain overlay + custom CSS
  const extraStyles = `
  <style>
    :root {
      --bg: ${trBg};
      --bg-alt: ${trAlt};
      --card-bg: #ffffff;
      --text: ${trText};
      --text-muted: ${trMuted};
      --border: rgba(0,0,0,0.08);
      --heading-font: 'Oswald', sans-serif;
      --body-font: 'Inter', sans-serif;
    }
    body::before {
      content:'';position:fixed;inset:0;pointer-events:none;z-index:9999;opacity:0.025;
      background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    }
    .tr-reveal { opacity:0; transform:translateY(28px); transition:opacity 0.7s ease, transform 0.7s ease; }
    .tr-reveal.visible { opacity:1; transform:translateY(0); }
    .tr-service-card:hover { transform:translateY(-4px); box-shadow:0 12px 40px rgba(0,0,0,0.12); }
    .tr-service-card { transition:transform 0.35s ease, box-shadow 0.35s ease; }
    .tr-step-num { font-family:'Oswald',sans-serif; font-size:5rem; font-weight:700; color:${trAccent}; line-height:1; opacity:0.15; position:absolute; top:-1.5rem; left:-0.5rem; pointer-events:none; }
    @keyframes kbzoom { 0%{transform:scale(1)} 100%{transform:scale(1.06)} }
    .tr-hero-img { animation: kbzoom 12s ease-in-out infinite alternate; }
    @keyframes fadeUp { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }
    .tr-fade1 { animation: fadeUp 0.9s ease forwards; }
    .tr-fade2 { animation: fadeUp 0.9s 0.2s ease both; }
    .tr-fade3 { animation: fadeUp 0.9s 0.4s ease both; }
    .tr-tag { display:inline-block; font-family:'Inter',sans-serif; font-size:0.7rem; font-weight:600; letter-spacing:0.08em; text-transform:uppercase; padding:0.3rem 0.75rem; border:1px solid rgba(0,0,0,0.18); border-radius:2px; color:${trMuted}; }
    .tr-cta-primary { display:inline-flex; align-items:center; gap:0.5rem; font-family:'Inter',sans-serif; font-size:0.875rem; font-weight:600; letter-spacing:0.04em; padding:0.9rem 2.25rem; background:${trAccent}; color:#fff; text-decoration:none; transition:opacity 0.25s; }
    .tr-cta-primary:hover { opacity:0.88; }
    .tr-cta-ghost { display:inline-flex; align-items:center; gap:0.5rem; font-family:'Inter',sans-serif; font-size:0.875rem; font-weight:600; letter-spacing:0.04em; padding:0.9rem 2.25rem; background:transparent; color:#fff; border:1.5px solid rgba(255,255,255,0.55); text-decoration:none; transition:border-color 0.25s; }
    .tr-cta-ghost:hover { border-color:#fff; }
    .tr-input { width:100%; box-sizing:border-box; font-family:'Inter',sans-serif; font-size:0.9rem; padding:0.85rem 0 0.85rem; background:transparent; border:none; border-bottom:1.5px solid rgba(0,0,0,0.2); color:${trText}; outline:none; transition:border-color 0.25s; }
    .tr-input:focus { border-bottom-color:${trAccent}; }
    .tr-input::placeholder { color:${trMuted}; }
  </style>`

  // Nav
  const nav = buildStandardNav(businessName, content, navFlags)

  // HERO — full-bleed with Ken Burns, diagonal cut at bottom, large Oswald heading
  const heroSection = `
  <section style="position:relative;min-height:calc(92vh - 64px);display:flex;flex-direction:column;justify-content:flex-end;overflow:hidden;background:${trDark}">
    <div style="position:absolute;inset:0;overflow:hidden">
      <img src="${heroImg}" alt="" class="tr-hero-img" style="width:100%;height:100%;object-fit:cover;opacity:0.55" />
      <div style="position:absolute;inset:0;background:linear-gradient(160deg,rgba(28,26,23,0.3) 0%,rgba(28,26,23,0.85) 70%)"></div>
    </div>
    <!-- diagonal bottom cut -->
    <div style="position:absolute;bottom:-2px;left:0;right:0;height:80px;background:${trBg};clip-path:polygon(0 100%,100% 100%,100% 0)"></div>
    <div style="position:relative;max-width:1240px;margin:0 auto;padding:0 2rem 7rem;width:100%">
      <div class="tr-fade1" style="display:flex;align-items:center;gap:1rem;margin-bottom:1.75rem">
        <div style="width:36px;height:2px;background:${trAccent}"></div>
        <span style="font-family:'Inter',sans-serif;font-size:0.75rem;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:rgba(255,255,255,0.7)">${content.heroEyebrow}</span>
      </div>
      <h1 class="tr-fade2" style="font-family:'Oswald',sans-serif;font-size:clamp(3rem,7vw,6rem);font-weight:700;color:#fff;line-height:1.0;letter-spacing:0.01em;text-transform:uppercase;margin-bottom:1.5rem;max-width:820px">${content.tagline}</h1>
      <p class="tr-fade3" style="font-family:'Inter',sans-serif;font-size:1.05rem;color:rgba(255,255,255,0.72);max-width:540px;line-height:1.75;margin-bottom:2.5rem">${content.heroSubtitle}</p>
      <div style="display:flex;gap:1rem;flex-wrap:wrap">
        <a href="#contact" class="tr-cta-primary">${content.ctaPrimary} &rarr;</a>
        <a href="#services" class="tr-cta-ghost">${content.ctaSecondary || 'See Our Work'}</a>
      </div>
    </div>
  </section>`

  // CREDENTIALS STRIP — dark band, 4 stats
  const credStrip = `
  <section style="background:${trDark};padding:0 2rem">
    <div style="max-width:1240px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid rgba(255,255,255,0.06)">
      ${content.stats.slice(0, 4).map((s, i) => `
      <div style="padding:2.5rem 1.5rem;${i < 3 ? 'border-right:1px solid rgba(255,255,255,0.06)' : ''}">
        <div style="font-family:'Oswald',sans-serif;font-size:2.5rem;font-weight:700;color:${trAccent};line-height:1;margin-bottom:0.35rem">${s.value}</div>
        <div style="font-family:'Inter',sans-serif;font-size:0.8rem;font-weight:500;color:rgba(255,255,255,0.5);text-transform:uppercase;letter-spacing:0.08em">${s.label}</div>
        ${s.sublabel ? `<div style="font-family:'Inter',sans-serif;font-size:0.72rem;color:rgba(255,255,255,0.3);margin-top:0.2rem">${s.sublabel}</div>` : ''}
      </div>`).join('')}
    </div>
  </section>`

  // SERVICES — editorial two-column grid, numbered, with image
  const servicesSection = `
  <section id="services" style="padding:100px 2rem;background:${trBg}">
    <div style="max-width:1240px;margin:0 auto">
      <div style="display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:4rem;flex-wrap:wrap;gap:1.5rem">
        <div>
          <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1rem">
            <div style="width:28px;height:2px;background:${trAccent}"></div>
            <span style="font-family:'Inter',sans-serif;font-size:0.72rem;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:${trMuted}">What We Do</span>
          </div>
          <h2 style="font-family:'Oswald',sans-serif;font-size:clamp(2.2rem,4.5vw,3.8rem);font-weight:700;color:${trText};text-transform:uppercase;line-height:1.05">${content.servicesHeading}</h2>
        </div>
        <a href="#contact" class="tr-cta-primary" style="background:${trAccent};color:#fff">${content.ctaPrimary} &rarr;</a>
      </div>
      <div class="ms-grid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:1.5px;background:rgba(0,0,0,0.07)">
        ${content.services.slice(0, 6).map((s, i) => `
        <div class="tr-service-card tr-reveal" style="background:${trBg};padding:2.5rem 2rem;position:relative;overflow:hidden">
          <span class="tr-step-num">${String(i + 1).padStart(2, '0')}</span>
          <div style="margin-bottom:1.25rem">
            <span style="font-family:'Inter',sans-serif;font-size:1.5rem">${mapIcon(s.icon, i)}</span>
          </div>
          <h3 style="font-family:'Oswald',sans-serif;font-size:1.3rem;font-weight:600;color:${trText};text-transform:uppercase;letter-spacing:0.03em;margin-bottom:0.75rem">${s.name}</h3>
          <p style="font-family:'Inter',sans-serif;font-size:0.875rem;color:${trMuted};line-height:1.75;margin-bottom:1.25rem">${s.description}</p>
          <div style="display:flex;gap:0.4rem;flex-wrap:wrap">
            ${s.tags.slice(0, 2).map(t => `<span class="tr-tag">${t}</span>`).join('')}
          </div>
        </div>`).join('')}
      </div>
    </div>
  </section>`

  // PROCESS — horizontal steps on dark background, angled connector lines
  const processSteps = content.processSteps || content.services.slice(0, 4).map((s, i) => ({
    step: String(i + 1),
    title: s.name,
    description: s.description,
  }))
  const processSection = `
  <section style="padding:100px 2rem;background:${trDark}">
    <div style="max-width:1240px;margin:0 auto">
      <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1rem">
        <div style="width:28px;height:2px;background:${trAccent}"></div>
        <span style="font-family:'Inter',sans-serif;font-size:0.72rem;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:rgba(255,255,255,0.4)">How It Works</span>
      </div>
      <h2 style="font-family:'Oswald',sans-serif;font-size:clamp(2rem,4vw,3.2rem);font-weight:700;color:#fff;text-transform:uppercase;margin-bottom:4rem">${content.stepsHeading || 'Our Process'}</h2>
      <div class="ms-flex" style="display:flex;gap:0;align-items:stretch">
        ${processSteps.slice(0, 4).map((step, i) => `
        <div style="flex:1;padding:2.5rem 2rem;border-left:1px solid rgba(255,255,255,0.08);${i === 0 ? 'border-left:none' : ''}">
          <div style="font-family:'Oswald',sans-serif;font-size:3.5rem;font-weight:700;color:${trAccent};opacity:0.4;line-height:1;margin-bottom:1.5rem">${String(i + 1).padStart(2, '0')}</div>
          <h3 style="font-family:'Oswald',sans-serif;font-size:1.1rem;font-weight:600;color:#fff;text-transform:uppercase;letter-spacing:0.04em;margin-bottom:0.75rem">${step.title}</h3>
          <p style="font-family:'Inter',sans-serif;font-size:0.85rem;color:rgba(255,255,255,0.45);line-height:1.75">${step.description}</p>
        </div>`).join('')}
      </div>
    </div>
  </section>`

  // ABOUT — asymmetric: image 60%, text 40% with offset border detail
  const aboutParagraphs = content.aboutText.split('\n').filter(p => p.trim())
  const aboutSection = `
  <section id="about" style="padding:100px 2rem;background:${trBg}">
    <div class="ms-grid" style="max-width:1240px;margin:0 auto;display:grid;grid-template-columns:1.1fr 1fr;gap:5rem;align-items:center">
      <div style="position:relative">
        <div style="position:absolute;top:-20px;left:-20px;right:20px;bottom:20px;border:2px solid ${trAccent};opacity:0.25;pointer-events:none"></div>
        <div class="ms-img" style="height:580px;overflow:hidden">
          <img src="${aboutImg}" alt="" style="width:100%;height:100%;object-fit:cover" />
        </div>
        <div style="position:absolute;bottom:-2rem;right:-2rem;background:${trDark};padding:1.5rem 2rem">
          <div style="font-family:'Oswald',sans-serif;font-size:2rem;font-weight:700;color:${trAccent}">${content.stats[0]?.value || '15+'}</div>
          <div style="font-family:'Inter',sans-serif;font-size:0.75rem;color:rgba(255,255,255,0.5);text-transform:uppercase;letter-spacing:0.08em;margin-top:0.2rem">${content.stats[0]?.label || 'Years Experience'}</div>
        </div>
      </div>
      <div>
        <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1rem">
          <div style="width:28px;height:2px;background:${trAccent}"></div>
          <span style="font-family:'Inter',sans-serif;font-size:0.72rem;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:${trMuted}">About Us</span>
        </div>
        <h2 style="font-family:'Oswald',sans-serif;font-size:clamp(2rem,4vw,3rem);font-weight:700;color:${trText};text-transform:uppercase;line-height:1.05;margin-bottom:1.5rem">${content.aboutHeading}</h2>
        ${content.aboutMission ? `<p style="font-family:'Inter',sans-serif;font-size:1.05rem;font-style:italic;color:${trText};line-height:1.65;margin-bottom:1.25rem;border-left:3px solid ${trAccent};padding-left:1.25rem">${content.aboutMission}</p>` : ''}
        ${aboutParagraphs.map(p => `<p style="font-family:'Inter',sans-serif;font-size:0.9rem;color:${trMuted};line-height:1.8;margin-bottom:1rem">${p}</p>`).join('')}
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.6rem;margin-top:2rem">
          ${content.services.map(s => s.tags).flat().slice(0, 6).map(t => `
          <div style="display:flex;align-items:center;gap:0.6rem">
            <div style="width:6px;height:6px;background:${trAccent};flex-shrink:0"></div>
            <span style="font-family:'Inter',sans-serif;font-size:0.82rem;color:${trText};font-weight:500">${t}</span>
          </div>`).join('')}
        </div>
      </div>
    </div>
  </section>`

  // PROJECT SHOWCASE — full-width image grid, 3 columns with hover caption overlay
  const projectSection = `
  <section style="padding:100px 2rem;background:${trAlt}">
    <div style="max-width:1240px;margin:0 auto">
      <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1rem">
        <div style="width:28px;height:2px;background:${trAccent}"></div>
        <span style="font-family:'Inter',sans-serif;font-size:0.72rem;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:${trMuted}">Recent Work</span>
      </div>
      <h2 style="font-family:'Oswald',sans-serif;font-size:clamp(2rem,4vw,3rem);font-weight:700;color:${trText};text-transform:uppercase;margin-bottom:3rem">${content.galleryHeading || 'Projects'}</h2>
      <div class="ms-grid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:1.5px;background:rgba(0,0,0,0.07)">
        ${serviceImgs.slice(0, 6).map((img, i) => `
        <div style="position:relative;overflow:hidden;background:${trDark}">
          <div class="ms-img" style="height:300px;overflow:hidden">
            <img src="${img || stockPool[_pi++]}" alt="" style="width:100%;height:100%;object-fit:cover;transition:transform 0.6s ease" onmouseover="this.style.transform='scale(1.07)'" onmouseout="this.style.transform='scale(1)'" />
          </div>
          <div style="position:absolute;bottom:0;left:0;right:0;padding:1.25rem 1.5rem;background:linear-gradient(transparent,rgba(0,0,0,0.75));pointer-events:none">
            <div style="font-family:'Oswald',sans-serif;font-size:0.9rem;font-weight:600;color:#fff;text-transform:uppercase;letter-spacing:0.05em">${content.projectCaptions?.[i] || content.services[i % content.services.length]?.name || 'Project'}</div>
          </div>
        </div>`).join('')}
      </div>
    </div>
  </section>`

  // TESTIMONIALS — dark bg, 3 cards, large italic quote
  const testimonialSection = content.testimonial ? `
  <section id="testimonials" style="padding:100px 2rem;background:${trDark}">
    <div style="max-width:1240px;margin:0 auto">
      <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1rem">
        <div style="width:28px;height:2px;background:${trAccent}"></div>
        <span style="font-family:'Inter',sans-serif;font-size:0.72rem;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:rgba(255,255,255,0.35)">Testimonials</span>
      </div>
      <h2 style="font-family:'Oswald',sans-serif;font-size:clamp(2rem,4vw,3rem);font-weight:700;color:#fff;text-transform:uppercase;margin-bottom:3.5rem">What Clients Say</h2>
      <div class="ms-grid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:rgba(255,255,255,0.06)">
        ${[content.testimonial, ...getFallbackTestimonials(content, businessCategory)].slice(0, 3).map((t, i) => `
        <div style="background:${trDark};padding:2.5rem 2rem">
          <div style="font-size:3rem;line-height:1;color:${trAccent};opacity:0.5;margin-bottom:1rem;font-family:Georgia,serif">&ldquo;</div>
          <p style="font-family:'Inter',sans-serif;font-size:0.925rem;font-style:italic;color:rgba(255,255,255,0.65);line-height:1.8;margin-bottom:1.75rem">${t.quote}</p>
          <div style="border-top:1px solid rgba(255,255,255,0.08);padding-top:1.25rem">
            <div style="font-family:'Oswald',sans-serif;font-size:0.95rem;font-weight:600;color:#fff;text-transform:uppercase;letter-spacing:0.04em">${t.author.split(',')[0]}</div>
            <div style="font-family:'Inter',sans-serif;font-size:0.78rem;color:rgba(255,255,255,0.35);margin-top:0.2rem">${t.author.split(',')[1]?.trim() || 'Customer'}</div>
            <div style="color:${trAccent};font-size:0.8rem;margin-top:0.4rem">${'&#9733;'.repeat(t.rating || 5)}</div>
          </div>
        </div>`).join('')}
      </div>
    </div>
  </section>` : ''

  // CONTACT — 2-col, underline inputs, dark panel left
  const contactSection = `
  <section id="contact" style="padding:0;background:${trBg}">
    <div class="ms-grid" style="max-width:100%;display:grid;grid-template-columns:1fr 1.4fr">
      <div style="background:${trDark};padding:5rem 3rem;display:flex;flex-direction:column;justify-content:center">
        <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1rem">
          <div style="width:28px;height:2px;background:${trAccent}"></div>
          <span style="font-family:'Inter',sans-serif;font-size:0.72rem;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:rgba(255,255,255,0.35)">Contact</span>
        </div>
        <h2 style="font-family:'Oswald',sans-serif;font-size:clamp(2rem,3.5vw,2.8rem);font-weight:700;color:#fff;text-transform:uppercase;line-height:1.05;margin-bottom:2rem">${content.contactHeading}</h2>
        <p style="font-family:'Inter',sans-serif;font-size:0.9rem;color:rgba(255,255,255,0.45);line-height:1.75;margin-bottom:2.5rem;max-width:340px">${content.heroSubtitle}</p>
        <div style="display:flex;flex-direction:column;gap:1.5rem">
          <div style="display:flex;align-items:center;gap:1rem">
            <div style="width:40px;height:40px;border:1px solid rgba(255,255,255,0.12);display:flex;align-items:center;justify-content:center;color:${trAccent};font-size:1rem;flex-shrink:0">&#9742;</div>
            <div>
              <div style="font-family:'Inter',sans-serif;font-size:0.7rem;text-transform:uppercase;letter-spacing:0.1em;color:rgba(255,255,255,0.3);margin-bottom:0.25rem">Phone</div>
              <div style="font-family:'Inter',sans-serif;font-size:0.9rem;color:rgba(255,255,255,0.75)">${locationInfo.phone}</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:1rem">
            <div style="width:40px;height:40px;border:1px solid rgba(255,255,255,0.12);display:flex;align-items:center;justify-content:center;color:${trAccent};font-size:1rem;flex-shrink:0">&#9993;</div>
            <div>
              <div style="font-family:'Inter',sans-serif;font-size:0.7rem;text-transform:uppercase;letter-spacing:0.1em;color:rgba(255,255,255,0.3);margin-bottom:0.25rem">Email</div>
              <div style="font-family:'Inter',sans-serif;font-size:0.9rem;color:rgba(255,255,255,0.75)">hello@${businessName.toLowerCase().replace(/\s+/g, '')}.com</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:1rem">
            <div style="width:40px;height:40px;border:1px solid rgba(255,255,255,0.12);display:flex;align-items:center;justify-content:center;color:${trAccent};font-size:1rem;flex-shrink:0">&#9906;</div>
            <div>
              <div style="font-family:'Inter',sans-serif;font-size:0.7rem;text-transform:uppercase;letter-spacing:0.1em;color:rgba(255,255,255,0.3);margin-bottom:0.25rem">Service Area</div>
              <div style="font-family:'Inter',sans-serif;font-size:0.9rem;color:rgba(255,255,255,0.75)">${locationInfo.city} &amp; surrounds</div>
            </div>
          </div>
          ${content.contactHours ? `
          <div style="display:flex;align-items:center;gap:1rem">
            <div style="width:40px;height:40px;border:1px solid rgba(255,255,255,0.12);display:flex;align-items:center;justify-content:center;color:${trAccent};font-size:1rem;flex-shrink:0">&#9200;</div>
            <div>
              <div style="font-family:'Inter',sans-serif;font-size:0.7rem;text-transform:uppercase;letter-spacing:0.1em;color:rgba(255,255,255,0.3);margin-bottom:0.25rem">Hours</div>
              <div style="font-family:'Inter',sans-serif;font-size:0.85rem;color:rgba(255,255,255,0.75)">${content.contactHours.replace(/ · /g, '<br />')}</div>
            </div>
          </div>` : ''}
        </div>
      </div>
      <div style="padding:5rem 4rem;background:${trBg}">
        <h3 style="font-family:'Oswald',sans-serif;font-size:1.5rem;font-weight:600;color:${trText};text-transform:uppercase;letter-spacing:0.03em;margin-bottom:0.5rem">Get a Free Quote</h3>
        <p style="font-family:'Inter',sans-serif;font-size:0.85rem;color:${trMuted};margin-bottom:2.5rem">Tell us about your project — we'll get back to you within 24 hours.</p>
        <form style="display:flex;flex-direction:column;gap:2rem" onsubmit="return false">
          <div class="ms-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:2rem">
            <div>
              <label style="font-family:'Inter',sans-serif;font-size:0.7rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:${trMuted};display:block;margin-bottom:0.5rem">Name</label>
              <input type="text" placeholder="Your name" class="tr-input" />
            </div>
            <div>
              <label style="font-family:'Inter',sans-serif;font-size:0.7rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:${trMuted};display:block;margin-bottom:0.5rem">Phone</label>
              <input type="tel" placeholder="${locationInfo.phone}" class="tr-input" />
            </div>
          </div>
          <div>
            <label style="font-family:'Inter',sans-serif;font-size:0.7rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:${trMuted};display:block;margin-bottom:0.5rem">Email</label>
            <input type="email" placeholder="your@email.com" class="tr-input" />
          </div>
          <div>
            <label style="font-family:'Inter',sans-serif;font-size:0.7rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:${trMuted};display:block;margin-bottom:0.5rem">Project Details</label>
            <textarea placeholder="Describe your project..." rows="5" class="tr-input" style="resize:none"></textarea>
          </div>
          <button type="submit" class="tr-cta-primary" style="align-self:flex-start;background:${trAccent};color:#fff;border:none;cursor:pointer;font-size:0.875rem;letter-spacing:0.04em;padding:1rem 2.5rem">${content.ctaPrimary} &rarr;</button>
        </form>
      </div>
    </div>
  </section>`

  // FOOTER
  const trFooter = `
  <footer style="padding:3.5rem 2rem 2rem;background:${trDark};border-top:1px solid rgba(255,255,255,0.05)">
    <div class="ms-grid" style="max-width:1240px;margin:0 auto;display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:3rem;margin-bottom:3rem">
      <div>
        <div style="font-family:'Oswald',sans-serif;font-size:1.5rem;font-weight:700;color:#fff;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:0.75rem">${businessName}</div>
        <p style="font-family:'Inter',sans-serif;font-size:0.82rem;color:rgba(255,255,255,0.35);line-height:1.7;max-width:280px">${content.heroSubtitle}</p>
      </div>
      <div>
        <div style="font-family:'Inter',sans-serif;font-size:0.68rem;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.3);margin-bottom:1.25rem">Services</div>
        ${content.services.slice(0, 4).map(s => `<a href="#services" style="display:block;font-family:'Inter',sans-serif;font-size:0.82rem;color:rgba(255,255,255,0.45);text-decoration:none;margin-bottom:0.6rem;transition:color 0.2s" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,0.45)'">${s.tags?.[0] || s.name}</a>`).join('')}
      </div>
      <div>
        <div style="font-family:'Inter',sans-serif;font-size:0.68rem;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.3);margin-bottom:1.25rem">Company</div>
        <a href="#about" style="display:block;font-family:'Inter',sans-serif;font-size:0.82rem;color:rgba(255,255,255,0.45);text-decoration:none;margin-bottom:0.6rem">About</a>
        <a href="#testimonials" style="display:block;font-family:'Inter',sans-serif;font-size:0.82rem;color:rgba(255,255,255,0.45);text-decoration:none;margin-bottom:0.6rem">Testimonials</a>
        <a href="#contact" style="display:block;font-family:'Inter',sans-serif;font-size:0.82rem;color:rgba(255,255,255,0.45);text-decoration:none;margin-bottom:0.6rem">Contact</a>
      </div>
      <div>
        <div style="font-family:'Inter',sans-serif;font-size:0.68rem;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.3);margin-bottom:1.25rem">Contact</div>
        <p style="font-family:'Inter',sans-serif;font-size:0.82rem;color:rgba(255,255,255,0.45);margin-bottom:0.5rem">&#9742; ${locationInfo.phone}</p>
        <p style="font-family:'Inter',sans-serif;font-size:0.82rem;color:rgba(255,255,255,0.45);margin-bottom:0.5rem">&#9993; hello@${businessName.toLowerCase().replace(/\s+/g, '')}.com</p>
        <p style="font-family:'Inter',sans-serif;font-size:0.82rem;color:rgba(255,255,255,0.45)">${locationInfo.city}</p>
      </div>
    </div>
    <div style="max-width:1240px;margin:0 auto;padding-top:2rem;border-top:1px solid rgba(255,255,255,0.06);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem">
      <p style="font-family:'Inter',sans-serif;font-size:0.72rem;color:rgba(255,255,255,0.2)">&copy; ${new Date().getFullYear()} ${businessName}. All rights reserved.</p>
      <div style="display:flex;gap:1.5rem">
        <a href="#" style="font-family:'Inter',sans-serif;font-size:0.72rem;color:rgba(255,255,255,0.2);text-decoration:none">Privacy Policy</a>
        <a href="#" style="font-family:'Inter',sans-serif;font-size:0.72rem;color:rgba(255,255,255,0.2);text-decoration:none">Terms</a>
      </div>
    </div>
  </footer>
  <script>
    const revealEls = document.querySelectorAll('.tr-reveal');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.12 });
    revealEls.forEach(el => obs.observe(el));
  </script>`

  return `${headHtml}${extraFonts}${extraStyles}
${nav}
${heroSection}
${credStrip}
${servicesSection}
${processSection}
${aboutSection}
${projectSection}
${testimonialSection}
${contactSection}
${trFooter}
</body>
</html>`
}

function buildHomeServicesTemplate(data: TemplateData): string {
  const { content, businessName, businessCategory, primaryColor, secondaryColor, pages, images, stockImages, locationInfo } = data
  const fonts = fontPairings[businessCategory] || fontPairings['other']
  const navFlags = resolveNavLinks(pages)

  const heroImg = images[0] || stockImages.hero
  const stockPool = buildImagePool(images, stockImages, businessName)
  const aboutImg = images[5] || stockImages.about
  let _pi = 0
  const serviceImgs = [
    images[1] || stockImages.cards[0],
    images[2] || stockImages.cards[1],
    images[3] || stockImages.cards[2],
    images[4] || stockImages.cards[3],
  ]

  const hmCream = '#faf8f5'
  const hmSage = '#e8ede6'
  const hmDeep = '#2d3a2e'
  const hmText = '#1e2920'
  const hmMuted = '#6b7d6c'
  const hmAccent = primaryColor || '#3d6b42'
  const hmWarm = '#f5f0e8'

  const headHtml = buildHead(businessName, fonts, primaryColor, secondaryColor, 'light')

  const extraFonts = `<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=DM+Serif+Display:ital@0;1&family=Inter:wght@300;400;500&display=swap" rel="stylesheet"/>`

  const extraStyles = `
  <style>
    :root {
      --bg: ${hmCream};
      --bg-alt: ${hmSage};
      --card-bg: #fff;
      --text: ${hmText};
      --text-muted: ${hmMuted};
      --border: rgba(0,0,0,0.07);
      --heading-font: 'DM Serif Display', Georgia, serif;
      --body-font: 'Poppins', sans-serif;
    }
    body::before {
      content:'';position:fixed;inset:0;pointer-events:none;z-index:9999;opacity:0.018;
      background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    }
    @keyframes hmFadeUp { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
    @keyframes hmKenBurns { 0%{transform:scale(1)} 100%{transform:scale(1.05)} }
    .hm-fade1 { animation: hmFadeUp 0.9s ease forwards; }
    .hm-fade2 { animation: hmFadeUp 0.9s 0.18s ease both; }
    .hm-fade3 { animation: hmFadeUp 0.9s 0.36s ease both; }
    .hm-hero-bg { animation: hmKenBurns 14s ease-in-out infinite alternate; }
    .hm-reveal { opacity:0; transform:translateY(24px); transition:opacity 0.65s ease, transform 0.65s ease; }
    .hm-reveal.visible { opacity:1; transform:translateY(0); }
    .hm-card { transition:transform 0.35s ease, box-shadow 0.35s ease; }
    .hm-card:hover { transform:translateY(-5px); box-shadow:0 16px 48px rgba(0,0,0,0.1); }
    .hm-chip { display:inline-flex; align-items:center; gap:0.4rem; font-family:'Poppins',sans-serif; font-size:0.7rem; font-weight:600; letter-spacing:0.06em; text-transform:uppercase; padding:0.35rem 0.9rem; border-radius:999px; background:rgba(61,107,66,0.1); color:${hmAccent}; }
    .hm-pill-cta { display:inline-flex; align-items:center; gap:0.5rem; font-family:'Poppins',sans-serif; font-size:0.875rem; font-weight:600; padding:0.9rem 2.25rem; border-radius:999px; background:${hmAccent}; color:#fff; text-decoration:none; transition:background 0.25s; }
    .hm-pill-cta:hover { background:${hmDeep}; }
    .hm-pill-ghost { display:inline-flex; align-items:center; gap:0.5rem; font-family:'Poppins',sans-serif; font-size:0.875rem; font-weight:600; padding:0.9rem 2.25rem; border-radius:999px; background:transparent; color:#fff; border:2px solid rgba(255,255,255,0.5); text-decoration:none; transition:border-color 0.25s; }
    .hm-pill-ghost:hover { border-color:#fff; }
    .hm-step-connector { flex:0 0 1px; background:rgba(0,0,0,0.12); align-self:stretch; margin:0 -0.5px; }
    .hm-input { width:100%; box-sizing:border-box; font-family:'Poppins',sans-serif; font-size:0.875rem; padding:1rem 1.25rem; background:#fff; border:1.5px solid rgba(0,0,0,0.1); border-radius:12px; color:${hmText}; outline:none; transition:border-color 0.25s; }
    .hm-input:focus { border-color:${hmAccent}; }
    .hm-input::placeholder { color:${hmMuted}; }
  </style>`

  const nav = buildStandardNav(businessName, content, navFlags)

  // HERO — warm split: sage-green illustrated left panel, full-bleed photo right
  const heroSection = `
  <section style="position:relative;min-height:88vh;overflow:hidden;display:grid;grid-template-columns:1fr 1fr">
    <!-- Left: warm cream/sage content panel -->
    <div style="background:linear-gradient(160deg,${hmCream} 0%,${hmSage} 100%);display:flex;flex-direction:column;justify-content:center;padding:5rem 3.5rem 5rem 4rem;position:relative;z-index:1">
      <div class="hm-fade1" style="margin-bottom:1.5rem">
        <span class="hm-chip">&#127968; ${content.heroEyebrow}</span>
      </div>
      <h1 class="hm-fade2" style="font-family:'DM Serif Display',Georgia,serif;font-size:clamp(2.4rem,4.5vw,3.8rem);font-weight:400;font-style:italic;color:${hmText};line-height:1.15;margin-bottom:1.25rem;max-width:480px">${content.tagline}</h1>
      <p class="hm-fade3" style="font-family:'Poppins',sans-serif;font-size:0.975rem;color:${hmMuted};line-height:1.8;max-width:420px;margin-bottom:2.25rem">${content.heroSubtitle}</p>
      <div style="display:flex;gap:0.75rem;flex-wrap:wrap;margin-bottom:3rem">
        <a href="#contact" class="hm-pill-cta" style="background:${hmAccent}">${content.ctaPrimary}</a>
        <a href="#services" style="display:inline-flex;align-items:center;gap:0.5rem;font-family:'Poppins',sans-serif;font-size:0.875rem;font-weight:600;padding:0.9rem 2.25rem;border-radius:999px;background:transparent;color:${hmText};border:2px solid rgba(0,0,0,0.15);text-decoration:none">${content.ctaSecondary || 'Our Services'}</a>
      </div>
      <!-- mini trust strip -->
      <div style="display:flex;gap:2rem;flex-wrap:wrap">
        ${content.stats.slice(0, 3).map(s => `
        <div>
          <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.6rem;color:${hmAccent}">${s.value}</div>
          <div style="font-family:'Poppins',sans-serif;font-size:0.72rem;font-weight:500;color:${hmMuted};text-transform:uppercase;letter-spacing:0.06em">${s.label}</div>
        </div>`).join('')}
      </div>
      <!-- decorative circle -->
      <div style="position:absolute;top:-80px;right:-80px;width:280px;height:280px;border-radius:50%;border:60px solid rgba(61,107,66,0.07);pointer-events:none"></div>
    </div>
    <!-- Right: Ken Burns photo -->
    <div style="position:relative;overflow:hidden">
      <img src="${heroImg}" alt="" class="hm-hero-bg" style="width:100%;height:100%;object-fit:cover" />
      <div style="position:absolute;inset:0;background:linear-gradient(90deg,${hmSage} 0%,transparent 25%)"></div>
      <!-- floating badge -->
      <div style="position:absolute;top:2.5rem;right:2.5rem;background:#fff;border-radius:16px;padding:1rem 1.5rem;box-shadow:0 8px 32px rgba(0,0,0,0.12);display:flex;align-items:center;gap:0.75rem">
        <div style="width:40px;height:40px;border-radius:50%;background:${hmAccent};display:flex;align-items:center;justify-content:center;font-size:1.1rem;color:#fff">&#10003;</div>
        <div>
          <div style="font-family:'Poppins',sans-serif;font-size:0.82rem;font-weight:600;color:${hmText}">${content.badge || 'Trusted & Insured'}</div>
          <div style="font-family:'Poppins',sans-serif;font-size:0.7rem;color:${hmMuted}">${content.stats[3]?.value || '500+'} happy clients</div>
        </div>
      </div>
    </div>
  </section>`

  // SERVICES — card grid with photo tops, organic rounded corners
  const servicesSection = `
  <section id="services" style="padding:100px 2rem;background:${hmCream}">
    <div style="max-width:1200px;margin:0 auto">
      <div style="text-align:center;margin-bottom:4rem">
        <span class="hm-chip" style="margin-bottom:1rem;display:inline-flex">${content.heroEyebrow}</span>
        <h2 style="font-family:'DM Serif Display',Georgia,serif;font-size:clamp(2rem,4vw,3rem);font-weight:400;color:${hmText};margin:0.5rem 0 1rem">${content.servicesHeading}</h2>
        <p style="font-family:'Poppins',sans-serif;font-size:0.95rem;color:${hmMuted};max-width:520px;margin:0 auto;line-height:1.75">${content.aboutMission || content.heroSubtitle}</p>
      </div>
      <div class="ms-grid" style="display:grid;grid-template-columns:repeat(4,1fr);gap:1.5rem">
        ${content.services.slice(0, 4).map((s, i) => `
        <div class="hm-card hm-reveal" style="background:#fff;border-radius:20px;overflow:hidden;border:1px solid rgba(0,0,0,0.05)">
          <div class="ms-img" style="height:195px;overflow:hidden;position:relative">
            <img src="${serviceImgs[i] || stockPool[_pi++]}" alt="${s.name}" style="width:100%;height:100%;object-fit:cover" />
            <div style="position:absolute;top:1rem;left:1rem">
              <span class="hm-chip" style="background:rgba(255,255,255,0.9);color:${hmAccent};backdrop-filter:blur(8px)">${s.tags?.[0] || ''}</span>
            </div>
          </div>
          <div style="padding:1.5rem">
            <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.15rem;color:${hmText};margin-bottom:0.6rem">${s.name}</h3>
            <p style="font-family:'Poppins',sans-serif;font-size:0.82rem;color:${hmMuted};line-height:1.75;margin-bottom:1.25rem">${s.description}</p>
            <a href="#contact" style="font-family:'Poppins',sans-serif;font-size:0.8rem;font-weight:600;color:${hmAccent};text-decoration:none;display:inline-flex;align-items:center;gap:0.35rem">Get a Quote &rarr;</a>
          </div>
        </div>`).join('')}
      </div>
      ${content.services.length > 4 ? `
      <div class="ms-grid" style="display:grid;grid-template-columns:repeat(${Math.min(content.services.length - 4, 3)},1fr);gap:1.5rem;margin-top:1.5rem">
        ${content.services.slice(4, 7).map((s, i) => `
        <div class="hm-card hm-reveal" style="background:#fff;border-radius:20px;padding:2rem;border:1px solid rgba(0,0,0,0.05);display:flex;gap:1.25rem;align-items:flex-start">
          <div style="width:48px;height:48px;border-radius:14px;background:rgba(61,107,66,0.1);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:1.2rem;color:${hmAccent}">${mapIcon(s.icon, i + 4)}</div>
          <div>
            <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.05rem;color:${hmText};margin-bottom:0.4rem">${s.name}</h3>
            <p style="font-family:'Poppins',sans-serif;font-size:0.8rem;color:${hmMuted};line-height:1.7">${s.description}</p>
          </div>
        </div>`).join('')}
      </div>` : ''}
    </div>
  </section>`

  // HOW IT WORKS — horizontal steps, warm background, friendly icons
  const processSteps = content.processSteps || content.services.slice(0, 3).map((s, i) => ({
    step: String(i + 1),
    title: s.name,
    description: s.description,
  }))
  const stepEmoji = ['&#128222;', '&#128203;', '&#127968;', '&#10003;']
  const processSection = `
  <section style="padding:90px 2rem;background:${hmWarm}">
    <div style="max-width:1200px;margin:0 auto;text-align:center">
      <span class="hm-chip" style="margin-bottom:1rem;display:inline-flex">Simple Process</span>
      <h2 style="font-family:'DM Serif Display',Georgia,serif;font-size:clamp(2rem,4vw,3rem);font-weight:400;color:${hmText};margin-bottom:4rem">${content.stepsHeading || 'How It Works'}</h2>
      <div class="ms-flex" style="display:flex;align-items:flex-start;gap:0">
        ${processSteps.slice(0, 4).map((step, i) => `${i > 0 ? `
        <div class="ms-arrow" style="flex:0 0 48px;display:flex;align-items:center;justify-content:center;padding-top:2rem">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="${hmMuted}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>` : ''}
        <div style="flex:1;padding:2.5rem 1.5rem;background:#fff;border-radius:20px;border:1px solid rgba(0,0,0,0.06);text-align:center">
          <div style="width:64px;height:64px;border-radius:50%;background:${hmSage};display:flex;align-items:center;justify-content:center;margin:0 auto 1.25rem;font-size:1.6rem">${stepEmoji[i]}</div>
          <div style="font-family:'DM Serif Display',Georgia,serif;font-size:0.85rem;color:${hmAccent};font-style:italic;margin-bottom:0.25rem">Step ${step.step}</div>
          <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.15rem;color:${hmText};margin-bottom:0.6rem">${step.title}</h3>
          <p style="font-family:'Poppins',sans-serif;font-size:0.82rem;color:${hmMuted};line-height:1.75">${step.description}</p>
        </div>`).join('')}
      </div>
    </div>
  </section>`

  // ABOUT — photo right, warm left, bullet benefits, soft rounded image
  const aboutParagraphs = content.aboutText.split('\n').filter(p => p.trim())
  const aboutSection = `
  <section id="about" style="padding:100px 2rem;background:${hmCream}">
    <div class="ms-grid" style="max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:5rem;align-items:center">
      <div>
        <span class="hm-chip" style="margin-bottom:1.25rem;display:inline-flex">Our Story</span>
        <h2 style="font-family:'DM Serif Display',Georgia,serif;font-size:clamp(2rem,4vw,3rem);font-weight:400;font-style:italic;color:${hmText};line-height:1.2;margin-bottom:1.5rem">${content.aboutHeading}</h2>
        ${content.aboutMission ? `<p style="font-family:'Poppins',sans-serif;font-size:1rem;font-weight:500;color:${hmText};line-height:1.7;margin-bottom:1.5rem;padding:1.25rem 1.5rem;background:${hmSage};border-radius:12px;border-left:3px solid ${hmAccent}">${content.aboutMission}</p>` : ''}
        ${aboutParagraphs.map(p => `<p style="font-family:'Poppins',sans-serif;font-size:0.9rem;color:${hmMuted};line-height:1.85;margin-bottom:1rem">${p}</p>`).join('')}
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem;margin-top:2rem">
          ${content.services.map(s => s.tags).flat().slice(0, 6).map(t => `
          <div style="display:flex;align-items:center;gap:0.6rem">
            <div style="width:20px;height:20px;border-radius:50%;background:rgba(61,107,66,0.12);display:flex;align-items:center;justify-content:center;flex-shrink:0">
              <span style="color:${hmAccent};font-size:0.7rem;font-weight:700">&#10003;</span>
            </div>
            <span style="font-family:'Poppins',sans-serif;font-size:0.82rem;color:${hmText};font-weight:500">${t}</span>
          </div>`).join('')}
        </div>
        <div style="margin-top:2.5rem">
          <a href="#contact" class="hm-pill-cta" style="background:${hmAccent}">${content.ctaPrimary}</a>
        </div>
      </div>
      <div style="position:relative">
        <div style="border-radius:24px;overflow:hidden;height:520px">
          <img src="${aboutImg}" alt="" style="width:100%;height:100%;object-fit:cover" />
        </div>
        <!-- Stats grid overlay -->
        <div class="ms-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem;margin-top:1.25rem">
          ${content.stats.slice(0, 4).map(s => `
          <div style="background:#fff;border-radius:14px;padding:1.25rem 1.5rem;border:1px solid rgba(0,0,0,0.05)">
            <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.8rem;color:${hmAccent}">${s.value}</div>
            <div style="font-family:'Poppins',sans-serif;font-size:0.75rem;font-weight:500;color:${hmMuted};margin-top:0.2rem">${s.label}</div>
          </div>`).join('')}
        </div>
      </div>
    </div>
  </section>`

  // TESTIMONIALS — soft cards with avatar initials, stars, italic quote
  const testimonialSection = content.testimonial ? `
  <section id="testimonials" style="padding:90px 2rem;background:${hmSage}">
    <div style="max-width:1200px;margin:0 auto;text-align:center">
      <span class="hm-chip" style="margin-bottom:1rem;display:inline-flex">Reviews</span>
      <h2 style="font-family:'DM Serif Display',Georgia,serif;font-size:clamp(2rem,4vw,3rem);font-weight:400;color:${hmText};margin-bottom:3.5rem">What Our Clients Say</h2>
      <div class="ms-grid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;text-align:left">
        ${[content.testimonial, ...getFallbackTestimonials(content, businessCategory)].slice(0, 3).map((t, i) => `
        <div class="hm-card hm-reveal" style="background:#fff;border-radius:20px;padding:2rem;border:1px solid rgba(0,0,0,0.05);position:relative">
          <div style="font-size:2.5rem;line-height:1;font-family:'DM Serif Display',Georgia,serif;color:${hmAccent};opacity:0.3;position:absolute;top:1.5rem;right:1.75rem">&ldquo;</div>
          <div style="color:#f59e0b;font-size:0.9rem;margin-bottom:1rem">${'&#9733;'.repeat(t.rating || 5)}</div>
          <p style="font-family:'Poppins',sans-serif;font-size:0.9rem;font-style:italic;color:${hmMuted};line-height:1.8;margin-bottom:1.5rem">"${t.quote}"</p>
          <div style="display:flex;align-items:center;gap:0.75rem;border-top:1px solid rgba(0,0,0,0.06);padding-top:1.25rem">
            <div style="width:40px;height:40px;border-radius:50%;background:${hmSage};display:flex;align-items:center;justify-content:center;flex-shrink:0">
              <span style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:${hmAccent}">${t.author.charAt(0)}</span>
            </div>
            <div>
              <div style="font-family:'Poppins',sans-serif;font-size:0.85rem;font-weight:600;color:${hmText}">${t.author.split(',')[0]}</div>
              <div style="font-family:'Poppins',sans-serif;font-size:0.75rem;color:${hmMuted}">${t.author.split(',')[1]?.trim() || 'Happy Client'}</div>
            </div>
          </div>
        </div>`).join('')}
      </div>
    </div>
  </section>` : ''

  // CTA BANNER — warm full-width, friendly tone
  const ctaBanner = `
  <section style="padding:80px 2rem;background:${hmAccent}">
    <div style="max-width:1200px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:2rem">
      <div>
        <h2 style="font-family:'DM Serif Display',Georgia,serif;font-size:clamp(1.8rem,3.5vw,2.8rem);font-weight:400;font-style:italic;color:#fff;line-height:1.2;margin-bottom:0.5rem">${content.aboutMission || content.heroSubtitle}</h2>
        <p style="font-family:'Poppins',sans-serif;font-size:0.9rem;color:rgba(255,255,255,0.7)">${content.ctaNote || 'No obligation. Fast response.'}</p>
      </div>
      <a href="#contact" style="display:inline-flex;align-items:center;gap:0.5rem;font-family:'Poppins',sans-serif;font-size:0.875rem;font-weight:600;padding:1rem 2.5rem;border-radius:999px;background:#fff;color:${hmAccent};text-decoration:none;white-space:nowrap">${content.ctaPrimary} &rarr;</a>
    </div>
  </section>`

  // CONTACT — 2-col warm layout
  const contactSection = `
  <section id="contact" style="padding:100px 2rem;background:${hmCream}">
    <div style="max-width:1200px;margin:0 auto">
      <div style="text-align:center;margin-bottom:3.5rem">
        <span class="hm-chip" style="margin-bottom:1rem;display:inline-flex">Get In Touch</span>
        <h2 style="font-family:'DM Serif Display',Georgia,serif;font-size:clamp(2rem,4vw,3rem);font-weight:400;color:${hmText}">${content.contactHeading}</h2>
      </div>
      <div class="ms-grid" style="display:grid;grid-template-columns:1fr 1.2fr;gap:4rem;align-items:start">
        <div style="display:flex;flex-direction:column;gap:1.5rem">
          ${[
            { icon: '&#9742;', label: 'Phone', value: locationInfo.phone },
            { icon: '&#9993;', label: 'Email', value: `hello@${businessName.toLowerCase().replace(/\s+/g, '')}.com` },
            { icon: '&#9906;', label: 'Service Area', value: `${locationInfo.city} & surrounds` },
          ].map(item => `
          <div style="display:flex;gap:1rem;align-items:flex-start;padding:1.5rem;background:#fff;border-radius:16px;border:1px solid rgba(0,0,0,0.06)">
            <div style="width:44px;height:44px;border-radius:12px;background:${hmSage};display:flex;align-items:center;justify-content:center;font-size:1.1rem;flex-shrink:0;color:${hmAccent}">${item.icon}</div>
            <div>
              <div style="font-family:'Poppins',sans-serif;font-size:0.72rem;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:${hmMuted};margin-bottom:0.25rem">${item.label}</div>
              <div style="font-family:'Poppins',sans-serif;font-size:0.9rem;color:${hmText};font-weight:500">${item.value}</div>
            </div>
          </div>`).join('')}
          ${content.contactHours ? `
          <div style="display:flex;gap:1rem;align-items:flex-start;padding:1.5rem;background:#fff;border-radius:16px;border:1px solid rgba(0,0,0,0.06)">
            <div style="width:44px;height:44px;border-radius:12px;background:${hmSage};display:flex;align-items:center;justify-content:center;font-size:1.1rem;flex-shrink:0;color:${hmAccent}">&#9200;</div>
            <div>
              <div style="font-family:'Poppins',sans-serif;font-size:0.72rem;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:${hmMuted};margin-bottom:0.25rem">Hours</div>
              <div style="font-family:'Poppins',sans-serif;font-size:0.875rem;color:${hmText}">${content.contactHours.replace(/ · /g, '<br />')}</div>
            </div>
          </div>` : ''}
        </div>
        <div style="background:#fff;border-radius:24px;padding:2.5rem;border:1px solid rgba(0,0,0,0.06)">
          <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.5rem;color:${hmText};margin-bottom:0.4rem">Send Us a Message</h3>
          <p style="font-family:'Poppins',sans-serif;font-size:0.82rem;color:${hmMuted};margin-bottom:1.75rem">We'll respond within 2 hours during business hours.</p>
          <form style="display:flex;flex-direction:column;gap:1.25rem" onsubmit="return false">
            <div class="ms-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:1rem">
              <input type="text" placeholder="Your name" class="hm-input" />
              <input type="tel" placeholder="Phone number" class="hm-input" />
            </div>
            <input type="email" placeholder="Email address" class="hm-input" />
            <textarea placeholder="Tell us about your needs..." rows="4" class="hm-input" style="resize:none"></textarea>
            <button type="submit" style="font-family:'Poppins',sans-serif;font-size:0.875rem;font-weight:600;padding:1rem 2rem;border-radius:999px;background:${hmAccent};color:#fff;border:none;cursor:pointer;transition:background 0.25s;width:100%">${content.ctaPrimary} &rarr;</button>
          </form>
        </div>
      </div>
    </div>
  </section>`

  // FOOTER
  const hmFooter = `
  <footer style="padding:4rem 2rem 2rem;background:${hmDeep};border-top:1px solid rgba(255,255,255,0.05)">
    <div class="ms-grid" style="max-width:1200px;margin:0 auto;display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:3rem;margin-bottom:3rem">
      <div>
        <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.5rem;color:#fff;margin-bottom:0.75rem">${businessName}</div>
        <p style="font-family:'Poppins',sans-serif;font-size:0.82rem;color:rgba(255,255,255,0.4);line-height:1.7;max-width:280px;margin-bottom:1.5rem">${content.heroSubtitle}</p>
        <a href="#contact" class="hm-pill-cta" style="font-size:0.8rem;padding:0.7rem 1.75rem">${content.ctaPrimary}</a>
      </div>
      <div>
        <div style="font-family:'Poppins',sans-serif;font-size:0.68rem;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.3);margin-bottom:1.25rem">Services</div>
        ${content.services.slice(0, 4).map(s => `<a href="#services" style="display:block;font-family:'Poppins',sans-serif;font-size:0.82rem;color:rgba(255,255,255,0.45);text-decoration:none;margin-bottom:0.55rem">${s.tags?.[0] || s.name}</a>`).join('')}
      </div>
      <div>
        <div style="font-family:'Poppins',sans-serif;font-size:0.68rem;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.3);margin-bottom:1.25rem">Company</div>
        <a href="#about" style="display:block;font-family:'Poppins',sans-serif;font-size:0.82rem;color:rgba(255,255,255,0.45);text-decoration:none;margin-bottom:0.55rem">About</a>
        <a href="#testimonials" style="display:block;font-family:'Poppins',sans-serif;font-size:0.82rem;color:rgba(255,255,255,0.45);text-decoration:none;margin-bottom:0.55rem">Reviews</a>
        <a href="#contact" style="display:block;font-family:'Poppins',sans-serif;font-size:0.82rem;color:rgba(255,255,255,0.45);text-decoration:none;margin-bottom:0.55rem">Contact</a>
      </div>
      <div>
        <div style="font-family:'Poppins',sans-serif;font-size:0.68rem;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.3);margin-bottom:1.25rem">Contact</div>
        <p style="font-family:'Poppins',sans-serif;font-size:0.82rem;color:rgba(255,255,255,0.45);margin-bottom:0.5rem">&#9742; ${locationInfo.phone}</p>
        <p style="font-family:'Poppins',sans-serif;font-size:0.82rem;color:rgba(255,255,255,0.45);margin-bottom:0.5rem">&#9993; hello@${businessName.toLowerCase().replace(/\s+/g, '')}.com</p>
        <p style="font-family:'Poppins',sans-serif;font-size:0.82rem;color:rgba(255,255,255,0.45)">${locationInfo.city}</p>
      </div>
    </div>
    <div style="max-width:1200px;margin:0 auto;padding-top:2rem;border-top:1px solid rgba(255,255,255,0.06);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem">
      <p style="font-family:'Poppins',sans-serif;font-size:0.72rem;color:rgba(255,255,255,0.2)">&copy; ${new Date().getFullYear()} ${businessName}. All rights reserved.</p>
      <div style="display:flex;gap:1.5rem">
        <a href="#" style="font-family:'Poppins',sans-serif;font-size:0.72rem;color:rgba(255,255,255,0.2);text-decoration:none">Privacy Policy</a>
        <a href="#" style="font-family:'Poppins',sans-serif;font-size:0.72rem;color:rgba(255,255,255,0.2);text-decoration:none">Terms</a>
      </div>
    </div>
  </footer>
  <script>
    const hmEls = document.querySelectorAll('.hm-reveal');
    const hmObs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); hmObs.unobserve(e.target); } });
    }, { threshold: 0.1 });
    hmEls.forEach(el => hmObs.observe(el));
  </script>`

  return `${headHtml}${extraFonts}${extraStyles}
${nav}
${heroSection}
${servicesSection}
${processSection}
${aboutSection}
${testimonialSection}
${ctaBanner}
${contactSection}
${hmFooter}
</body>
</html>`
}

function buildAutomotiveTemplate(data: TemplateData): string {
  const { content, businessName, businessCategory, primaryColor, secondaryColor, pages, images, stockImages, locationInfo } = data
  const fonts = fontPairings[businessCategory] || fontPairings['other']
  const navFlags = resolveNavLinks(pages)

  const heroImg = images[0] || stockImages.hero
  const stockPool = buildImagePool(images, stockImages, businessName)
  const aboutImg = images[5] || stockImages.about
  let _pi = 0
  const serviceImgs = [
    images[1] || stockImages.cards[0],
    images[2] || stockImages.cards[1],
    images[3] || stockImages.cards[2],
    images[4] || stockImages.cards[3],
    stockImages.cards[4],
    stockImages.cards[5],
  ]

  const autoBg = '#0a0a0a'
  const autoAlt = '#111111'
  const autoCard = '#141414'
  const autoText = '#f0ede8'
  const autoMuted = '#888580'
  const autoBorder = 'rgba(255,255,255,0.07)'
  const autoAccent = primaryColor || '#e63b1e'
  const autoAccentDim = 'rgba(230,59,30,0.12)'

  const headHtml = buildHead(businessName, fonts, primaryColor, secondaryColor, 'dark')

  const extraFonts = `<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@300;400;500;600;700;800&family=Barlow:wght@300;400;500;600&display=swap" rel="stylesheet"/>`

  const extraStyles = `
  <style>
    :root {
      --bg: ${autoBg};
      --bg-alt: ${autoAlt};
      --card-bg: ${autoCard};
      --text: ${autoText};
      --text-muted: ${autoMuted};
      --border: ${autoBorder};
      --heading-font: 'Barlow Condensed', sans-serif;
      --body-font: 'Barlow', sans-serif;
    }
    body::before {
      content:'';position:fixed;inset:0;pointer-events:none;z-index:9999;opacity:0.03;
      background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    }
    @keyframes autoKB { 0%{transform:scale(1)} 100%{transform:scale(1.08)} }
    @keyframes autoFadeUp { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }
    @keyframes scanline { 0%{transform:translateX(-100%)} 100%{transform:translateX(100%)} }
    .auto-bg { animation: autoKB 16s ease-in-out infinite alternate; }
    .auto-f1 { animation: autoFadeUp 1s ease forwards; }
    .auto-f2 { animation: autoFadeUp 1s 0.2s ease both; }
    .auto-f3 { animation: autoFadeUp 1s 0.4s ease both; }
    .auto-reveal { opacity:0; transform:translateY(24px); transition:opacity 0.65s ease, transform 0.65s ease; }
    .auto-reveal.visible { opacity:1; transform:translateY(0); }
    .auto-card { transition:border-color 0.3s ease, transform 0.3s ease; }
    .auto-card:hover { border-color:${autoAccent} !important; transform:translateY(-3px); }
    .auto-service-row { border-bottom:1px solid ${autoBorder}; transition:background 0.25s; cursor:default; }
    .auto-service-row:hover { background:rgba(255,255,255,0.02); }
    .auto-cta { display:inline-flex; align-items:center; gap:0.5rem; font-family:'Barlow Condensed',sans-serif; font-size:0.95rem; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; padding:0.85rem 2.5rem; background:${autoAccent}; color:#fff; text-decoration:none; clip-path:polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px)); transition:opacity 0.25s; border:none; cursor:pointer; }
    .auto-cta:hover { opacity:0.88; }
    .auto-cta-outline { display:inline-flex; align-items:center; gap:0.5rem; font-family:'Barlow Condensed',sans-serif; font-size:0.95rem; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; padding:0.85rem 2.5rem; background:transparent; color:#fff; border:1.5px solid rgba(255,255,255,0.3); text-decoration:none; clip-path:polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px)); transition:border-color 0.25s; }
    .auto-cta-outline:hover { border-color:#fff; }
    .auto-badge { display:inline-flex; align-items:center; gap:0.4rem; font-family:'Barlow Condensed',sans-serif; font-size:0.72rem; font-weight:600; letter-spacing:0.12em; text-transform:uppercase; padding:0.3rem 0.85rem; background:${autoAccentDim}; border:1px solid rgba(230,59,30,0.3); color:${autoAccent}; }
    .auto-input { width:100%; box-sizing:border-box; font-family:'Barlow',sans-serif; font-size:0.9rem; padding:0.85rem 1rem; background:transparent; border:none; border-bottom:1px solid rgba(255,255,255,0.15); color:${autoText}; outline:none; transition:border-color 0.25s; }
    .auto-input:focus { border-bottom-color:${autoAccent}; }
    .auto-input::placeholder { color:${autoMuted}; }
    /* scanline accent on hero */
    .auto-scanline { position:absolute; top:0; left:0; width:2px; height:100%; background:linear-gradient(180deg,transparent,${autoAccent},transparent); animation: scanline 4s ease-in-out infinite; opacity:0.35; pointer-events:none; }
  </style>`

  const nav = buildStandardNav(businessName, content, navFlags)

  // HERO — full-bleed cinematic, angular overlays, bold condensed type
  const heroSection = `
  <section style="position:relative;min-height:calc(100vh - 64px);display:flex;align-items:flex-end;overflow:hidden;background:${autoBg}">
    <div style="position:absolute;inset:0;overflow:hidden">
      <img src="${heroImg}" alt="" class="auto-bg" style="width:100%;height:100%;object-fit:cover;opacity:0.45" />
      <div style="position:absolute;inset:0;background:linear-gradient(175deg,transparent 0%,rgba(0,0,0,0.5) 50%,rgba(10,10,10,0.95) 85%)"></div>
      <!-- angular accent line -->
      <div style="position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;overflow:hidden">
        <div style="position:absolute;top:0;left:0;width:3px;height:40%;background:linear-gradient(180deg,${autoAccent},transparent)"></div>
      </div>
    </div>
    <div style="position:relative;max-width:1300px;margin:0 auto;padding:0 2rem 6rem;width:100%">
      <div class="auto-f1" style="margin-bottom:1.5rem">
        <span class="auto-badge">&#9632; ${content.heroEyebrow}</span>
      </div>
      <h1 class="auto-f2" style="font-family:'Barlow Condensed',sans-serif;font-size:clamp(3.5rem,9vw,8.5rem);font-weight:800;color:#fff;line-height:0.92;letter-spacing:-0.01em;text-transform:uppercase;margin-bottom:1.75rem;max-width:900px">${content.tagline}</h1>
      <p class="auto-f3" style="font-family:'Barlow',sans-serif;font-size:1.05rem;color:rgba(255,255,255,0.6);max-width:500px;line-height:1.7;margin-bottom:2.5rem">${content.heroSubtitle}</p>
      <div style="display:flex;gap:1rem;flex-wrap:wrap;margin-bottom:4rem">
        <a href="#contact" class="auto-cta">${content.ctaPrimary}</a>
        <a href="#services" class="auto-cta-outline">${content.ctaSecondary || 'View Services'}</a>
      </div>
      <!-- stat row at bottom -->
      <div style="display:flex;gap:3rem;padding-top:2rem;border-top:1px solid rgba(255,255,255,0.08);flex-wrap:wrap">
        ${content.stats.slice(0, 4).map(s => `
        <div>
          <div style="font-family:'Barlow Condensed',sans-serif;font-size:1.75rem;font-weight:700;color:${autoAccent};letter-spacing:0.02em">${s.value}</div>
          <div style="font-family:'Barlow',sans-serif;font-size:0.75rem;color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:0.08em;margin-top:0.1rem">${s.label}</div>
        </div>`).join('')}
      </div>
    </div>
  </section>`

  // SERVICES — full-width list rows, left image swap on hover (sticky), performance feel
  const servicesSection = `
  <section id="services" style="padding:0;background:${autoBg}">
    <div style="max-width:1300px;margin:0 auto;padding:80px 2rem">
      <div style="display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:3.5rem;flex-wrap:wrap;gap:1.5rem">
        <div>
          <span class="auto-badge" style="margin-bottom:0.75rem;display:inline-flex">Services</span>
          <h2 style="font-family:'Barlow Condensed',sans-serif;font-size:clamp(2.5rem,5vw,4.5rem);font-weight:800;color:${autoText};text-transform:uppercase;letter-spacing:-0.01em;line-height:1">${content.servicesHeading}</h2>
        </div>
        <a href="#contact" class="auto-cta">${content.ctaPrimary}</a>
      </div>
      <!-- sticky left image + accordion-style rows -->
      <div class="ms-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:start">
        <div class="ms-sticky" style="position:sticky;top:80px">
          <div style="aspect-ratio:4/3;overflow:hidden">
            <img src="${serviceImgs[0]}" alt="" id="auto-svc-img" style="width:100%;height:100%;object-fit:cover;transition:opacity 0.4s ease" />
          </div>
          <div style="border:1px solid ${autoBorder};border-top:none;padding:1.5rem">
            <div style="font-family:'Barlow Condensed',sans-serif;font-size:0.72rem;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:${autoMuted}">Currently viewing</div>
            <div id="auto-svc-name" style="font-family:'Barlow Condensed',sans-serif;font-size:1.15rem;font-weight:700;color:${autoText};margin-top:0.25rem">${content.services[0]?.name || ''}</div>
          </div>
        </div>
        <div>
          ${content.services.slice(0, 6).map((s, i) => `
          <div class="auto-service-row" style="padding:1.75rem 0;border-bottom:1px solid ${autoBorder}"
               onmouseover="
                 var img=document.getElementById('auto-svc-img');
                 var nm=document.getElementById('auto-svc-name');
                 img.style.opacity='0';
                 setTimeout(function(){img.src='${serviceImgs[i] || stockPool[_pi++]}';img.style.opacity='1';},200);
                 nm.textContent='${s.name.replace(/'/g, "\\'")}';
               ">
            <div style="display:flex;align-items:center;justify-content:space-between;gap:1rem">
              <div style="display:flex;align-items:center;gap:1.5rem">
                <div style="font-family:'Barlow Condensed',sans-serif;font-size:0.7rem;font-weight:600;letter-spacing:0.1em;color:${autoAccent};min-width:2.5rem">${String(i + 1).padStart(2, '0')}</div>
                <div>
                  <h3 style="font-family:'Barlow Condensed',sans-serif;font-size:1.3rem;font-weight:700;color:${autoText};text-transform:uppercase;letter-spacing:0.03em;margin-bottom:0.3rem">${s.name}</h3>
                  <p style="font-family:'Barlow',sans-serif;font-size:0.875rem;color:${autoMuted};line-height:1.65">${s.description}</p>
                </div>
              </div>
              <div style="color:${autoMuted};font-size:1.25rem;flex-shrink:0">&rsaquo;</div>
            </div>
            <div style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-top:0.75rem;padding-left:4rem">
              ${s.tags.slice(0, 3).map(t => `<span style="font-family:'Barlow',sans-serif;font-size:0.72rem;padding:0.25rem 0.65rem;border:1px solid ${autoBorder};color:${autoMuted}">${t}</span>`).join('')}
            </div>
          </div>`).join('')}
        </div>
      </div>
    </div>
  </section>`

  // PERFORMANCE STATS — dark panel, large numbers
  const statsSection = `
  <section style="padding:80px 2rem;background:${autoAlt};border-top:1px solid ${autoBorder};border-bottom:1px solid ${autoBorder}">
    <div style="max-width:1300px;margin:0 auto">
      <div class="ms-grid" style="display:grid;grid-template-columns:repeat(4,1fr);gap:0;border:1px solid ${autoBorder}">
        ${content.stats.slice(0, 4).map((s, i) => `
        <div style="padding:3rem 2rem;text-align:center;${i < 3 ? `border-right:1px solid ${autoBorder}` : ''}">
          <div style="font-family:'Barlow Condensed',sans-serif;font-size:3.5rem;font-weight:800;color:${autoAccent};letter-spacing:-0.02em;line-height:1;margin-bottom:0.5rem">${s.value}</div>
          <div style="font-family:'Barlow',sans-serif;font-size:0.75rem;font-weight:500;color:${autoMuted};text-transform:uppercase;letter-spacing:0.1em">${s.label}</div>
          ${s.sublabel ? `<div style="font-family:'Barlow',sans-serif;font-size:0.7rem;color:rgba(255,255,255,0.2);margin-top:0.25rem">${s.sublabel}</div>` : ''}
        </div>`).join('')}
      </div>
    </div>
  </section>`

  // ABOUT — full-bleed split: photo left 60%, text right 40%, red accent border
  const aboutParagraphs = content.aboutText.split('\n').filter(p => p.trim())
  const aboutSection = `
  <section id="about" style="padding:0;background:${autoBg}">
    <div class="ms-grid" style="display:grid;grid-template-columns:1.4fr 1fr">
      <div style="position:relative;min-height:600px;overflow:hidden">
        <img src="${aboutImg}" alt="" style="width:100%;height:100%;object-fit:cover;position:absolute;inset:0" />
        <div style="position:absolute;inset:0;background:linear-gradient(90deg,transparent 60%,${autoBg} 100%)"></div>
        <!-- accent stripe -->
        <div style="position:absolute;top:0;left:0;width:4px;height:100%;background:${autoAccent}"></div>
      </div>
      <div style="padding:5rem 3.5rem;display:flex;flex-direction:column;justify-content:center">
        <span class="auto-badge" style="margin-bottom:1.25rem;display:inline-flex">About Us</span>
        <h2 style="font-family:'Barlow Condensed',sans-serif;font-size:clamp(2.5rem,4.5vw,3.8rem);font-weight:800;color:${autoText};text-transform:uppercase;letter-spacing:-0.01em;line-height:1;margin-bottom:1.5rem">${content.aboutHeading}</h2>
        ${content.aboutMission ? `<p style="font-family:'Barlow',sans-serif;font-size:1rem;font-style:italic;color:${autoText};line-height:1.7;margin-bottom:1.25rem;padding-left:1.25rem;border-left:3px solid ${autoAccent}">${content.aboutMission}</p>` : ''}
        ${aboutParagraphs.map(p => `<p style="font-family:'Barlow',sans-serif;font-size:0.9rem;color:${autoMuted};line-height:1.8;margin-bottom:0.85rem">${p}</p>`).join('')}
        <div style="display:flex;flex-direction:column;gap:0.6rem;margin-top:1.5rem">
          ${content.services.map(s => s.tags).flat().slice(0, 5).map(t => `
          <div style="display:flex;align-items:center;gap:0.75rem">
            <div style="width:4px;height:4px;background:${autoAccent};flex-shrink:0"></div>
            <span style="font-family:'Barlow',sans-serif;font-size:0.875rem;color:${autoText}">${t}</span>
          </div>`).join('')}
        </div>
        <div style="margin-top:2.5rem">
          <a href="#contact" class="auto-cta">${content.ctaPrimary}</a>
        </div>
      </div>
    </div>
  </section>`

  // GALLERY / PRODUCT CARDS — tight dark grid
  const gallerySection = `
  <section style="padding:80px 2rem;background:${autoAlt}">
    <div style="max-width:1300px;margin:0 auto">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:3rem;flex-wrap:wrap;gap:1rem">
        <div>
          <span class="auto-badge" style="margin-bottom:0.75rem;display:inline-flex">Gallery</span>
          <h2 style="font-family:'Barlow Condensed',sans-serif;font-size:clamp(2rem,4vw,3.2rem);font-weight:800;color:${autoText};text-transform:uppercase;letter-spacing:-0.01em;line-height:1">${content.galleryHeading || 'Our Work'}</h2>
        </div>
      </div>
      <div class="ms-grid" style="display:grid;grid-template-columns:2fr 1fr 1fr;gap:3px">
        <div style="position:relative;overflow:hidden;grid-row:span 2" class="auto-reveal">
          <div style="height:100%;min-height:460px;overflow:hidden">
            <img src="${serviceImgs[3] || stockPool[_pi++]}" alt="" style="width:100%;height:100%;object-fit:cover;transition:transform 0.6s ease" onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform='scale(1)'" />
          </div>
          <div style="position:absolute;bottom:0;left:0;right:0;padding:1.5rem;background:linear-gradient(transparent,rgba(0,0,0,0.8))">
            <div style="font-family:'Barlow Condensed',sans-serif;font-size:1rem;font-weight:700;color:#fff;text-transform:uppercase">${content.services[3]?.name || content.services[0]?.name || ''}</div>
          </div>
        </div>
        ${serviceImgs.slice(4, 8).map((img, i) => `
        <div style="position:relative;overflow:hidden;height:225px" class="auto-reveal">
          <img src="${img || stockPool[_pi++]}" alt="" style="width:100%;height:100%;object-fit:cover;transition:transform 0.6s ease" onmouseover="this.style.transform='scale(1.06)'" onmouseout="this.style.transform='scale(1)'" />
          <div style="position:absolute;inset:0;background:rgba(0,0,0,0);transition:background 0.3s" onmouseover="this.style.background='rgba(230,59,30,0.15)'" onmouseout="this.style.background='rgba(0,0,0,0)'"></div>
          <div style="position:absolute;bottom:0.75rem;left:0.75rem">
            <div style="font-family:'Barlow Condensed',sans-serif;font-size:0.8rem;font-weight:700;color:#fff;text-transform:uppercase;text-shadow:0 1px 4px rgba(0,0,0,0.7)">${content.services[(i + 4) % content.services.length]?.name || ''}</div>
          </div>
        </div>`).join('')}
      </div>
    </div>
  </section>`

  // TESTIMONIALS — dark, angled quote marks, minimal
  const testimonialSection = content.testimonial ? `
  <section style="padding:80px 2rem;background:${autoBg};border-top:1px solid ${autoBorder}">
    <div style="max-width:1300px;margin:0 auto">
      <span class="auto-badge" style="margin-bottom:2rem;display:inline-flex">Customer Reviews</span>
      <div class="ms-grid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:${autoBorder}">
        ${[content.testimonial, ...getFallbackTestimonials(content, businessCategory)].slice(0, 3).map((t, i) => `
        <div class="auto-reveal" style="background:${autoBg};padding:2.5rem 2rem">
          <div style="font-family:'Barlow Condensed',sans-serif;font-size:4rem;font-weight:800;color:${autoAccent};opacity:0.2;line-height:0.8;margin-bottom:1.25rem">&ldquo;</div>
          <p style="font-family:'Barlow',sans-serif;font-size:0.925rem;color:rgba(255,255,255,0.6);line-height:1.8;font-style:italic;margin-bottom:1.75rem">${t.quote}</p>
          <div style="display:flex;align-items:center;justify-content:space-between;border-top:1px solid ${autoBorder};padding-top:1.25rem">
            <div>
              <div style="font-family:'Barlow Condensed',sans-serif;font-size:0.9rem;font-weight:700;color:${autoText};text-transform:uppercase;letter-spacing:0.04em">${t.author.split(',')[0]}</div>
              <div style="font-family:'Barlow',sans-serif;font-size:0.75rem;color:${autoMuted};margin-top:0.15rem">${t.author.split(',')[1]?.trim() || 'Customer'}</div>
            </div>
            <div style="color:${autoAccent};font-size:0.85rem">${'&#9733;'.repeat(t.rating || 5)}</div>
          </div>
        </div>`).join('')}
      </div>
    </div>
  </section>` : ''

  // CONTACT — dark split: red left panel, form right
  const contactSection = `
  <section id="contact" style="padding:0;background:${autoBg}">
    <div class="ms-grid" style="display:grid;grid-template-columns:1fr 1.5fr">
      <div style="background:${autoAccent};padding:5rem 3rem;display:flex;flex-direction:column;justify-content:center;position:relative;overflow:hidden">
        <div style="position:absolute;top:-4rem;right:-4rem;width:200px;height:200px;border-radius:50%;border:40px solid rgba(255,255,255,0.06);pointer-events:none"></div>
        <h2 style="font-family:'Barlow Condensed',sans-serif;font-size:clamp(2.5rem,4vw,3.5rem);font-weight:800;color:#fff;text-transform:uppercase;letter-spacing:-0.01em;line-height:1;margin-bottom:1.5rem">${content.contactHeading}</h2>
        <p style="font-family:'Barlow',sans-serif;font-size:0.9rem;color:rgba(255,255,255,0.75);line-height:1.75;margin-bottom:2.5rem;max-width:300px">${content.heroSubtitle}</p>
        <div style="display:flex;flex-direction:column;gap:1.5rem">
          ${[
            { icon: '&#9742;', val: locationInfo.phone },
            { icon: '&#9993;', val: `hello@${businessName.toLowerCase().replace(/\s+/g, '')}.com` },
            { icon: '&#9906;', val: `${locationInfo.city} & surrounds` },
          ].map(item => `
          <div style="display:flex;align-items:center;gap:0.85rem">
            <div style="width:36px;height:36px;border:1px solid rgba(255,255,255,0.3);display:flex;align-items:center;justify-content:center;color:#fff;font-size:0.9rem;flex-shrink:0">${item.icon}</div>
            <span style="font-family:'Barlow',sans-serif;font-size:0.9rem;color:rgba(255,255,255,0.85)">${item.val}</span>
          </div>`).join('')}
          ${content.contactHours ? `
          <div style="display:flex;align-items:center;gap:0.85rem">
            <div style="width:36px;height:36px;border:1px solid rgba(255,255,255,0.3);display:flex;align-items:center;justify-content:center;color:#fff;font-size:0.9rem;flex-shrink:0">&#9200;</div>
            <span style="font-family:'Barlow',sans-serif;font-size:0.875rem;color:rgba(255,255,255,0.85)">${content.contactHours.replace(/ · /g, ' &middot; ')}</span>
          </div>` : ''}
        </div>
      </div>
      <div style="padding:5rem 4rem;background:${autoAlt}">
        <h3 style="font-family:'Barlow Condensed',sans-serif;font-size:1.8rem;font-weight:800;color:${autoText};text-transform:uppercase;letter-spacing:0.02em;margin-bottom:0.4rem">Book a Service</h3>
        <p style="font-family:'Barlow',sans-serif;font-size:0.85rem;color:${autoMuted};margin-bottom:2.5rem">We'll confirm your booking within 2 hours.</p>
        <form style="display:flex;flex-direction:column;gap:1.75rem" onsubmit="return false">
          <div class="ms-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:2rem">
            <div>
              <label style="font-family:'Barlow',sans-serif;font-size:0.7rem;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:${autoMuted};display:block;margin-bottom:0.5rem">Name</label>
              <input type="text" placeholder="Full name" class="auto-input" />
            </div>
            <div>
              <label style="font-family:'Barlow',sans-serif;font-size:0.7rem;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:${autoMuted};display:block;margin-bottom:0.5rem">Phone</label>
              <input type="tel" placeholder="${locationInfo.phone}" class="auto-input" />
            </div>
          </div>
          <div>
            <label style="font-family:'Barlow',sans-serif;font-size:0.7rem;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:${autoMuted};display:block;margin-bottom:0.5rem">Email</label>
            <input type="email" placeholder="your@email.com" class="auto-input" />
          </div>
          <div>
            <label style="font-family:'Barlow',sans-serif;font-size:0.7rem;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:${autoMuted};display:block;margin-bottom:0.5rem">Vehicle &amp; Issue</label>
            <textarea placeholder="e.g. 2019 Toyota Hilux — strange noise from front left..." rows="4" class="auto-input" style="resize:none"></textarea>
          </div>
          <button type="submit" class="auto-cta" style="align-self:flex-start;font-size:0.9rem">${content.ctaPrimary} &#8594;</button>
        </form>
      </div>
    </div>
  </section>`

  // FOOTER
  const autoFooter = `
  <footer style="padding:3.5rem 2rem 2rem;background:${autoBg};border-top:1px solid ${autoBorder}">
    <div class="ms-grid" style="max-width:1300px;margin:0 auto;display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:3rem;margin-bottom:3rem">
      <div>
        <div style="font-family:'Barlow Condensed',sans-serif;font-size:1.8rem;font-weight:800;color:#fff;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:0.75rem">${businessName}</div>
        <p style="font-family:'Barlow',sans-serif;font-size:0.82rem;color:rgba(255,255,255,0.3);line-height:1.7;max-width:280px">${content.heroSubtitle}</p>
      </div>
      <div>
        <div style="font-family:'Barlow',sans-serif;font-size:0.68rem;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.25);margin-bottom:1.25rem">Services</div>
        ${content.services.slice(0, 4).map(s => `<a href="#services" style="display:block;font-family:'Barlow',sans-serif;font-size:0.82rem;color:rgba(255,255,255,0.4);text-decoration:none;margin-bottom:0.55rem;transition:color 0.2s" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,0.4)'">${s.tags?.[0] || s.name}</a>`).join('')}
      </div>
      <div>
        <div style="font-family:'Barlow',sans-serif;font-size:0.68rem;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.25);margin-bottom:1.25rem">Company</div>
        <a href="#about" style="display:block;font-family:'Barlow',sans-serif;font-size:0.82rem;color:rgba(255,255,255,0.4);text-decoration:none;margin-bottom:0.55rem">About</a>
        <a href="#testimonials" style="display:block;font-family:'Barlow',sans-serif;font-size:0.82rem;color:rgba(255,255,255,0.4);text-decoration:none;margin-bottom:0.55rem">Reviews</a>
        <a href="#contact" style="display:block;font-family:'Barlow',sans-serif;font-size:0.82rem;color:rgba(255,255,255,0.4);text-decoration:none;margin-bottom:0.55rem">Contact</a>
      </div>
      <div>
        <div style="font-family:'Barlow',sans-serif;font-size:0.68rem;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.25);margin-bottom:1.25rem">Contact</div>
        <p style="font-family:'Barlow',sans-serif;font-size:0.82rem;color:rgba(255,255,255,0.4);margin-bottom:0.5rem">&#9742; ${locationInfo.phone}</p>
        <p style="font-family:'Barlow',sans-serif;font-size:0.82rem;color:rgba(255,255,255,0.4);margin-bottom:0.5rem">&#9993; hello@${businessName.toLowerCase().replace(/\s+/g, '')}.com</p>
        <p style="font-family:'Barlow',sans-serif;font-size:0.82rem;color:rgba(255,255,255,0.4)">${locationInfo.city}</p>
      </div>
    </div>
    <div style="max-width:1300px;margin:0 auto;padding-top:2rem;border-top:1px solid ${autoBorder};display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem">
      <p style="font-family:'Barlow',sans-serif;font-size:0.72rem;color:rgba(255,255,255,0.18)">&copy; ${new Date().getFullYear()} ${businessName}. All rights reserved.</p>
      <div style="display:flex;gap:1.5rem">
        <a href="#" style="font-family:'Barlow',sans-serif;font-size:0.72rem;color:rgba(255,255,255,0.18);text-decoration:none">Privacy Policy</a>
        <a href="#" style="font-family:'Barlow',sans-serif;font-size:0.72rem;color:rgba(255,255,255,0.18);text-decoration:none">Terms</a>
      </div>
    </div>
  </footer>
  <script>
    const autoEls = document.querySelectorAll('.auto-reveal');
    const autoObs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); autoObs.unobserve(e.target); } });
    }, { threshold: 0.1 });
    autoEls.forEach(el => autoObs.observe(el));
  </script>`

  return `${headHtml}${extraFonts}${extraStyles}
${nav}
${heroSection}
${servicesSection}
${statsSection}
${aboutSection}
${gallerySection}
${testimonialSection}
${contactSection}
${autoFooter}
</body>
</html>`
}