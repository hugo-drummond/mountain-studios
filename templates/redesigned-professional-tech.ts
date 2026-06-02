function buildProfessionalTemplate(data: TemplateData): string {
  const { content, businessName, businessCategory, primaryColor, secondaryColor, pages, images, stockImages, locationInfo } = data
  const fonts = fontPairings[businessCategory] || fontPairings['other']
  const navFlags = resolveNavLinks(pages)

  const heroImg = images[0] || stockImages.hero
  const stockPool = buildImagePool(images, stockImages, businessName)
  let _pi = 0

  // Authoritative dark palette with warm parchment accents
  const bg = '#0d0d0b'
  const bgAlt = '#141410'
  const cardBg = '#1a1a16'
  const textPrimary = '#f0ede6'
  const textMuted = '#8a8780'
  const borderCol = 'rgba(240,237,230,0.08)'
  const accent = primaryColor || '#b8975a'

  const fallbackTestimonials = getFallbackTestimonials(content, businessCategory)

  const headHtml = buildHead(businessName, fonts, primaryColor, secondaryColor, 'dark') + `<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet"/>`

  return `${headHtml}
  <style>
    :root {
      --bg: ${bg};
      --bg-alt: ${bgAlt};
      --card-bg: ${cardBg};
      --text: ${textPrimary};
      --text-muted: ${textMuted};
      --border: ${borderCol};
      --primary: ${accent};
      --heading-font: 'Playfair Display', Georgia, serif;
      --body-font: 'DM Sans', sans-serif;
    }

    /* Grain overlay */
    body::before {
      content: '';
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 9999;
      opacity: 0.035;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    }

    /* Custom cursor */
    body { cursor: none; }
    #ms-cursor-dot { position:fixed;width:6px;height:6px;background:${accent};border-radius:50%;pointer-events:none;z-index:10000;transform:translate(-50%,-50%);transition:opacity 0.3s; }
    #ms-cursor-ring { position:fixed;width:36px;height:36px;border:1px solid ${accent};border-radius:50%;pointer-events:none;z-index:9999;transform:translate(-50%,-50%);transition:width 0.3s,height 0.3s,opacity 0.3s; }

    /* Reveal animations */
    .reveal { opacity:0;transform:translateY(28px);transition:opacity 0.75s ease,transform 0.75s ease; }
    .reveal.visible { opacity:1;transform:translateY(0); }
    .reveal-delay-1 { transition-delay:0.1s; }
    .reveal-delay-2 { transition-delay:0.2s; }
    .reveal-delay-3 { transition-delay:0.3s; }

    /* Horizontal rule accent */
    .pro-rule { display:flex;align-items:center;gap:1rem;margin-bottom:1.5rem; }
    .pro-rule::before, .pro-rule::after { content:'';flex:1;height:1px;background:${borderCol}; }
    .pro-rule::before { max-width:40px; }

    /* Service accordion */
    .pro-accordion-item { border-bottom:1px solid ${borderCol};overflow:hidden; }
    .pro-accordion-trigger { display:flex;align-items:center;justify-content:space-between;width:100%;padding:1.75rem 0;background:none;border:none;cursor:pointer;text-align:left; }
    .pro-accordion-body { max-height:0;overflow:hidden;transition:max-height 0.4s ease; }
    .pro-accordion-body.open { max-height:400px; }
    .pro-accordion-icon { width:28px;height:28px;border:1px solid ${borderCol};border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:transform 0.3s,background 0.3s; }
    .pro-accordion-trigger:hover .pro-accordion-icon { background:${accent};border-color:${accent}; }
  </style>

  <!-- Custom cursor -->
  <div id="ms-cursor-dot"></div>
  <div id="ms-cursor-ring"></div>

${buildStandardNav(businessName, content, navFlags)}

  <!-- ═══════════ HERO: Full-bleed, Ken Burns bg, text anchored bottom-left ═══════════ -->
  <section style="position:relative;min-height:95vh;display:flex;align-items:flex-end;overflow:hidden;background:${bg}">
    <div style="position:absolute;inset:0;overflow:hidden">
      <img src="${heroImg}" alt="" style="width:100%;height:100%;object-fit:cover;animation:kenBurns 20s ease-in-out infinite alternate" />
      <div style="position:absolute;inset:0;background:linear-gradient(105deg,rgba(13,13,11,0.82) 0%,rgba(13,13,11,0.45) 55%,rgba(13,13,11,0.15) 100%)"></div>
    </div>

    <div style="position:relative;z-index:2;max-width:1240px;margin:0 auto;padding:0 2.5rem 7rem;width:100%">
      <!-- Eyebrow with flanking lines -->
      <div style="display:flex;align-items:center;gap:1rem;margin-bottom:2rem">
        <div style="width:32px;height:1px;background:${accent}"></div>
        <span style="font-family:var(--body-font);font-size:0.7rem;letter-spacing:0.22em;text-transform:uppercase;color:${accent};font-weight:500">${content.heroEyebrow}</span>
        <div style="width:32px;height:1px;background:${accent}"></div>
      </div>

      <h1 style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(3rem,5.5vw,5.5rem);font-weight:400;color:${textPrimary};line-height:1.08;margin-bottom:1.75rem;max-width:700px;letter-spacing:-0.01em" class="reveal">${content.tagline}</h1>

      <p style="font-family:var(--body-font);font-size:1.05rem;color:rgba(240,237,230,0.72);max-width:480px;line-height:1.75;margin-bottom:3rem;font-weight:300" class="reveal reveal-delay-1">${content.heroSubtitle}</p>

      <div style="display:flex;align-items:center;gap:1.25rem;flex-wrap:wrap" class="reveal reveal-delay-2">
        <a href="#contact" style="font-family:var(--body-font);font-size:0.8rem;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;padding:1rem 2.5rem;background:${accent};color:${bg};text-decoration:none;transition:opacity 0.3s">${content.ctaPrimary}</a>
        <a href="#services" style="font-family:var(--body-font);font-size:0.8rem;font-weight:500;letter-spacing:0.12em;text-transform:uppercase;color:${textPrimary};text-decoration:none;display:flex;align-items:center;gap:0.6rem;opacity:0.75;transition:opacity 0.3s">${content.ctaSecondary} <span style="font-size:1.1rem">&#8594;</span></a>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div style="position:absolute;bottom:2.5rem;right:2.5rem;z-index:2;display:flex;flex-direction:column;align-items:center;gap:0.5rem">
      <div style="width:1px;height:48px;background:linear-gradient(to bottom,${accent},transparent);animation:scrollPulse 2s ease-in-out infinite"></div>
      <span style="font-family:var(--body-font);font-size:0.6rem;letter-spacing:0.2em;text-transform:uppercase;color:${accent};writing-mode:vertical-rl">Scroll</span>
    </div>
  </section>

  <!-- ═══════════ STATS RIBBON ═══════════ -->
  <section style="padding:0;background:${accent};overflow:hidden">
    <div class="ms-grid" style="max-width:1240px;margin:0 auto;display:grid;grid-template-columns:repeat(${Math.min(content.stats.length, 4)},1fr)">
      ${content.stats.slice(0, 4).map((s, i) => `
      <div style="padding:2.25rem 2rem;border-right:1px solid rgba(13,13,11,0.15);text-align:center${i === Math.min(content.stats.length, 4) - 1 ? ';border-right:none' : ''}">
        <div style="font-family:'Playfair Display',Georgia,serif;font-size:2.2rem;font-weight:700;color:${bg};line-height:1;margin-bottom:0.35rem">${s.value}</div>
        <div style="font-family:var(--body-font);font-size:0.7rem;letter-spacing:0.12em;text-transform:uppercase;color:rgba(13,13,11,0.65);font-weight:500">${s.label}</div>
      </div>`).join('')}
    </div>
  </section>

  <!-- ═══════════ SERVICES: Numbered accordion + sticky side image ═══════════ -->
  <section id="services" style="padding:120px 0;background:${bg}">
    <div style="max-width:1240px;margin:0 auto;padding:0 2.5rem">
      <!-- Section label -->
      <div class="reveal" style="display:flex;align-items:center;gap:1rem;margin-bottom:1rem">
        <div style="width:32px;height:1px;background:${accent}"></div>
        <span style="font-family:var(--body-font);font-size:0.7rem;letter-spacing:0.22em;text-transform:uppercase;color:${accent};font-weight:500">Our Services</span>
      </div>
      <h2 style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(2.2rem,4vw,3.5rem);font-weight:400;color:${textPrimary};margin-bottom:4rem;max-width:560px;line-height:1.2" class="reveal">${content.servicesHeading}</h2>

      <div class="ms-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:6rem;align-items:start">
        <!-- Accordion -->
        <div id="pro-svc-accordion">
          ${content.services.map((s, i) => `
          <div class="pro-accordion-item">
            <button class="pro-accordion-trigger" onclick="(function(btn){var body=btn.nextElementSibling,icon=btn.querySelector('.pro-svc-icon'),isOpen=body.classList.contains('open');document.querySelectorAll('.pro-accordion-body').forEach(function(b){b.classList.remove('open')});document.querySelectorAll('.pro-svc-icon').forEach(function(ic){ic.textContent='+'});if(!isOpen){body.classList.add('open');icon.textContent='&#215;'}var idx=${i};document.querySelectorAll('.pro-svc-img').forEach(function(im,j){im.style.opacity=j===idx?'1':'0';im.style.transform=j===idx?'scale(1)':'scale(1.04)'});})(this)">
              <div style="display:flex;align-items:center;gap:1.5rem">
                <span style="font-family:'Playfair Display',Georgia,serif;font-size:0.7rem;color:${accent};font-weight:400;opacity:0.7;min-width:20px">${String(i + 1).padStart(2, '0')}</span>
                <span style="font-family:'Playfair Display',Georgia,serif;font-size:1.15rem;font-weight:400;color:${textPrimary}">${s.name}</span>
              </div>
              <div class="pro-accordion-icon pro-svc-icon" style="font-size:0.85rem;color:${textPrimary}">+</div>
            </button>
            <div class="pro-accordion-body${i === 0 ? ' open' : ''}">
              <div style="padding:0 0 1.75rem 2.8rem">
                <p style="font-family:var(--body-font);font-size:0.95rem;color:${textMuted};line-height:1.8;margin-bottom:1.25rem">${s.description}</p>
                ${s.tags && s.tags.length > 0 ? `<div style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-bottom:1.25rem">${s.tags.map(t => `<span style="font-family:var(--body-font);font-size:0.7rem;letter-spacing:0.1em;text-transform:uppercase;padding:0.35rem 0.85rem;border:1px solid ${borderCol};color:${textMuted}">${t}</span>`).join('')}</div>` : ''}
                <a href="#contact" style="font-family:var(--body-font);font-size:0.75rem;letter-spacing:0.12em;text-transform:uppercase;color:${accent};text-decoration:none;font-weight:500">Enquire &#8594;</a>
              </div>
            </div>
          </div>`).join('')}
        </div>

        <!-- Sticky image panel -->
        <div class="ms-sticky" style="position:sticky;top:120px;aspect-ratio:4/5;overflow:hidden;border:1px solid ${borderCol}">
          ${content.services.map((s, i) => `
          <img src="${stockImages.cards[i] || stockPool[i % stockPool.length]}" alt="${s.name}" class="pro-svc-img" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:opacity 0.6s ease,transform 0.8s ease;opacity:${i === 0 ? '1' : '0'};transform:${i === 0 ? 'scale(1)' : 'scale(1.04)'}" />`).join('')}
          <!-- Overlay label -->
          <div style="position:absolute;bottom:0;left:0;right:0;padding:2rem;background:linear-gradient(to top,rgba(13,13,11,0.85),transparent)">
            <div id="pro-svc-label" style="font-family:'Playfair Display',Georgia,serif;font-size:1.1rem;font-weight:400;color:${textPrimary};font-style:italic">${content.services[0]?.name || ''}</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ═══════════ ABOUT: 2-col, image with offset border + stats grid ═══════════ -->
  <section id="about" style="padding:120px 0;background:${bgAlt}">
    <div class="ms-grid" style="max-width:1240px;margin:0 auto;padding:0 2.5rem;display:grid;grid-template-columns:1fr 1fr;gap:8rem;align-items:center">

      <!-- Left: Image with decorative offset border -->
      <div style="position:relative" class="reveal">
        <div style="position:absolute;top:-20px;left:-20px;right:20px;bottom:20px;border:1px solid ${accent};opacity:0.3;pointer-events:none"></div>
        <img src="${stockImages.about || stockPool[5]}" alt="" style="width:100%;aspect-ratio:3/4;object-fit:cover;display:block;position:relative;z-index:1" />
        <!-- Accent badge -->
        <div style="position:absolute;bottom:-1.5rem;right:-1.5rem;z-index:2;background:${accent};padding:1.25rem 1.75rem">
          <div style="font-family:'Playfair Display',Georgia,serif;font-size:1.8rem;font-weight:700;color:${bg};line-height:1">${content.stats[0]?.value || '20+'}</div>
          <div style="font-family:var(--body-font);font-size:0.65rem;letter-spacing:0.1em;text-transform:uppercase;color:rgba(13,13,11,0.65);margin-top:0.2rem">${content.stats[0]?.label || 'Years'}</div>
        </div>
      </div>

      <!-- Right: Heading + text + stats grid -->
      <div>
        <div class="reveal" style="display:flex;align-items:center;gap:1rem;margin-bottom:1.25rem">
          <div style="width:32px;height:1px;background:${accent}"></div>
          <span style="font-family:var(--body-font);font-size:0.7rem;letter-spacing:0.22em;text-transform:uppercase;color:${accent};font-weight:500">About Us</span>
        </div>
        <h2 style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(2rem,3.5vw,3rem);font-weight:400;color:${textPrimary};line-height:1.2;margin-bottom:1.5rem" class="reveal">${content.aboutHeading}</h2>
        ${content.aboutMission ? `<p style="font-family:'Playfair Display',Georgia,serif;font-size:1.05rem;color:${textPrimary};line-height:1.65;font-style:italic;margin-bottom:1.5rem;opacity:0.85" class="reveal">${content.aboutMission}</p>` : ''}
        ${content.aboutText.split('\n').filter(Boolean).map(p => `<p style="font-family:var(--body-font);font-size:0.95rem;color:${textMuted};line-height:1.85;margin-bottom:1rem;font-weight:300" class="reveal">${p}</p>`).join('')}

        <!-- Stats grid -->
        <div class="ms-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;margin-top:3rem;padding-top:2.5rem;border-top:1px solid ${borderCol}">
          ${content.stats.slice(1, 5).map(s => `
          <div class="reveal">
            <div style="font-family:'Playfair Display',Georgia,serif;font-size:2rem;font-weight:500;color:${accent};line-height:1;margin-bottom:0.3rem">${s.value}</div>
            <div style="font-family:var(--body-font);font-size:0.75rem;letter-spacing:0.08em;text-transform:uppercase;color:${textMuted};font-weight:400">${s.label}</div>
            ${s.sublabel ? `<div style="font-family:var(--body-font);font-size:0.7rem;color:${textMuted};opacity:0.6;margin-top:0.15rem">${s.sublabel}</div>` : ''}
          </div>`).join('')}
        </div>
      </div>
    </div>
  </section>

  <!-- ═══════════ PROCESS ═══════════ -->
  ${content.processSteps && content.processSteps.length > 0 ? `
  <section style="padding:120px 0;background:${bg}">
    <div style="max-width:1240px;margin:0 auto;padding:0 2.5rem">
      <div class="reveal" style="display:flex;align-items:center;gap:1rem;margin-bottom:1rem">
        <div style="width:32px;height:1px;background:${accent}"></div>
        <span style="font-family:var(--body-font);font-size:0.7rem;letter-spacing:0.22em;text-transform:uppercase;color:${accent};font-weight:500">How We Work</span>
      </div>
      <h2 style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(2rem,3.5vw,3rem);font-weight:400;color:${textPrimary};margin-bottom:5rem;max-width:500px;line-height:1.2" class="reveal">${content.stepsHeading || 'Our Approach'}</h2>
      <div class="ms-grid" style="display:grid;grid-template-columns:repeat(${Math.min(content.processSteps.length, 4)},1fr);gap:3rem">
        ${content.processSteps.slice(0, 4).map((step, i) => `
        <div class="reveal reveal-delay-${i + 1}" style="position:relative">
          ${i < content.processSteps!.length - 1 ? `<div style="position:absolute;top:1.25rem;left:calc(100% + 1.5rem);width:calc(3rem - 1px);height:1px;background:${borderCol}"></div>` : ''}
          <div style="font-family:'Playfair Display',Georgia,serif;font-size:2.5rem;font-weight:400;color:${accent};opacity:0.35;line-height:1;margin-bottom:1.25rem">${step.step.padStart ? step.step.padStart(2, '0') : step.step}</div>
          <h3 style="font-family:'Playfair Display',Georgia,serif;font-size:1.05rem;font-weight:500;color:${textPrimary};margin-bottom:0.75rem">${step.title}</h3>
          <p style="font-family:var(--body-font);font-size:0.85rem;color:${textMuted};line-height:1.8;font-weight:300">${step.description}</p>
        </div>`).join('')}
      </div>
    </div>
  </section>` : ''}

  <!-- ═══════════ TESTIMONIALS ═══════════ -->
  <section style="padding:120px 0;background:${bgAlt}">
    <div style="max-width:1240px;margin:0 auto;padding:0 2.5rem">
      <div class="reveal" style="display:flex;align-items:center;gap:1rem;margin-bottom:1rem">
        <div style="width:32px;height:1px;background:${accent}"></div>
        <span style="font-family:var(--body-font);font-size:0.7rem;letter-spacing:0.22em;text-transform:uppercase;color:${accent};font-weight:500">Client Testimonials</span>
      </div>

      ${content.testimonial ? `
      <!-- Large feature testimonial -->
      <div class="reveal" style="margin-bottom:4rem;padding-bottom:4rem;border-bottom:1px solid ${borderCol}">
        <div style="position:relative;padding-left:4rem">
          <div style="position:absolute;top:-1rem;left:0;font-family:'Playfair Display',Georgia,serif;font-size:6rem;line-height:1;color:${accent};opacity:0.3;font-style:italic">&ldquo;</div>
          <p style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(1.2rem,2.5vw,1.7rem);font-weight:400;color:${textPrimary};line-height:1.55;font-style:italic;margin-bottom:1.75rem">${content.testimonial.quote}</p>
          <div style="display:flex;align-items:center;gap:1.25rem">
            <div style="width:1px;height:36px;background:${accent}"></div>
            <div>
              <div style="font-family:var(--body-font);font-size:0.85rem;font-weight:600;color:${textPrimary};letter-spacing:0.04em">${content.testimonial.author}</div>
              ${content.testimonial.rating ? `<div style="color:${accent};font-size:0.75rem;margin-top:0.25rem">${'&#9733;'.repeat(content.testimonial.rating)}</div>` : ''}
            </div>
          </div>
        </div>
      </div>` : ''}

      <!-- Secondary testimonials grid -->
      <div class="ms-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:2rem">
        ${fallbackTestimonials.map(t => `
        <div class="reveal" style="background:${cardBg};border:1px solid ${borderCol};padding:2.5rem">
          <div style="color:${accent};font-size:0.75rem;margin-bottom:1.25rem">${'&#9733;'.repeat(t.rating)}</div>
          <p style="font-family:'Playfair Display',Georgia,serif;font-size:1rem;color:${textPrimary};line-height:1.7;font-style:italic;margin-bottom:1.5rem">"${t.quote}"</p>
          <div style="font-family:var(--body-font);font-size:0.8rem;color:${textMuted};font-weight:500;letter-spacing:0.04em">— ${t.author}</div>
        </div>`).join('')}
      </div>
    </div>
  </section>

  <!-- ═══════════ FULL-BLEED IMAGE BREAK ═══════════ -->
  <section style="height:45vh;overflow:hidden;position:relative">
    <img src="${stockPool[6] || heroImg}" alt="" style="width:100%;height:100%;object-fit:cover" />
    <div style="position:absolute;inset:0;background:linear-gradient(to right,rgba(13,13,11,0.6),rgba(13,13,11,0.1))"></div>
    <div style="position:absolute;inset:0;display:flex;align-items:center;padding:0 4rem">
      <h2 style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(2rem,4vw,3.5rem);font-weight:400;color:#fff;line-height:1.2;font-style:italic;max-width:600px">${content.contactHeading}</h2>
    </div>
  </section>

${buildContactSection(content, locationInfo)}

  <!-- ═══════════ FOOTER ═══════════ -->
  <footer style="padding:5rem 2.5rem 2rem;background:#080806;border-top:1px solid ${borderCol}">
    <div class="ms-grid" style="max-width:1240px;margin:0 auto;display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:4rem;margin-bottom:4rem">
      <div>
        <div style="font-family:'Playfair Display',Georgia,serif;font-size:1.6rem;font-weight:400;color:${textPrimary};margin-bottom:0.5rem;letter-spacing:0.02em">${businessName}</div>
        <div style="width:32px;height:1px;background:${accent};margin-bottom:1.25rem"></div>
        <p style="font-family:var(--body-font);font-size:0.85rem;color:${textMuted};line-height:1.75;max-width:280px;font-weight:300">${content.heroSubtitle}</p>
      </div>
      <div>
        <div style="font-family:var(--body-font);font-size:0.65rem;letter-spacing:0.18em;text-transform:uppercase;color:${accent};font-weight:600;margin-bottom:1.5rem">Navigate</div>
        <a href="#services" style="display:block;font-family:var(--body-font);font-size:0.85rem;color:${textMuted};text-decoration:none;margin-bottom:0.75rem;transition:color 0.2s;font-weight:300">Services</a>
        <a href="#about" style="display:block;font-family:var(--body-font);font-size:0.85rem;color:${textMuted};text-decoration:none;margin-bottom:0.75rem;transition:color 0.2s;font-weight:300">About Us</a>
        <a href="#contact" style="display:block;font-family:var(--body-font);font-size:0.85rem;color:${textMuted};text-decoration:none;margin-bottom:0.75rem;transition:color 0.2s;font-weight:300">Contact</a>
      </div>
      <div>
        <div style="font-family:var(--body-font);font-size:0.65rem;letter-spacing:0.18em;text-transform:uppercase;color:${accent};font-weight:600;margin-bottom:1.5rem">Services</div>
        ${content.services.slice(0, 4).map(s => `<a href="#services" style="display:block;font-family:var(--body-font);font-size:0.85rem;color:${textMuted};text-decoration:none;margin-bottom:0.75rem;font-weight:300">${s.tags?.[0] || s.name}</a>`).join('')}
      </div>
      <div>
        <div style="font-family:var(--body-font);font-size:0.65rem;letter-spacing:0.18em;text-transform:uppercase;color:${accent};font-weight:600;margin-bottom:1.5rem">Legal</div>
        <a href="#" style="display:block;font-family:var(--body-font);font-size:0.85rem;color:${textMuted};text-decoration:none;margin-bottom:0.75rem;font-weight:300">Privacy Policy</a>
        <a href="#" style="display:block;font-family:var(--body-font);font-size:0.85rem;color:${textMuted};text-decoration:none;margin-bottom:0.75rem;font-weight:300">Terms of Service</a>
        <div style="margin-top:2rem">
          <a href="#contact" style="font-family:var(--body-font);font-size:0.75rem;letter-spacing:0.12em;text-transform:uppercase;font-weight:600;padding:0.75rem 1.5rem;border:1px solid ${accent};color:${accent};text-decoration:none;transition:background 0.3s,color 0.3s">${content.ctaPrimary}</a>
        </div>
      </div>
    </div>
    <div style="max-width:1240px;margin:0 auto;padding-top:2rem;border-top:1px solid ${borderCol};display:flex;align-items:center;justify-content:space-between">
      <div style="font-family:var(--body-font);font-size:0.75rem;color:rgba(240,237,230,0.25);font-weight:300">&copy; ${new Date().getFullYear()} ${businessName}. All rights reserved.</div>
      <div style="font-family:var(--body-font);font-size:0.65rem;letter-spacing:0.12em;text-transform:uppercase;color:rgba(240,237,230,0.25)">Excellence · Integrity · Results</div>
    </div>
  </footer>

  <style>
    @keyframes kenBurns { from { transform:scale(1); } to { transform:scale(1.06); } }
    @keyframes scrollPulse { 0%,100% { opacity:0.4; } 50% { opacity:1; } }
  </style>

  <script>
    // Custom cursor
    var dot = document.getElementById('ms-cursor-dot');
    var ring = document.getElementById('ms-cursor-ring');
    var mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', function(e){ mx = e.clientX; my = e.clientY; dot.style.left = mx+'px'; dot.style.top = my+'px'; });
    (function loop(){ rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12; ring.style.left = rx+'px'; ring.style.top = ry+'px'; requestAnimationFrame(loop); })();
    document.querySelectorAll('a,button').forEach(function(el){ el.addEventListener('mouseenter',function(){ ring.style.width='56px'; ring.style.height='56px'; ring.style.opacity='0.5'; }); el.addEventListener('mouseleave',function(){ ring.style.width='36px'; ring.style.height='36px'; ring.style.opacity='1'; }); });

    // Scroll reveal
    var obs = new IntersectionObserver(function(entries){ entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('visible'); } }); }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(function(el){ obs.observe(el); });

    // Accordion: open first item by default + update label
    var firstBody = document.querySelector('.pro-accordion-body');
    if(firstBody) firstBody.classList.add('open');
    var firstIcon = document.querySelector('.pro-svc-icon');
    if(firstIcon) firstIcon.textContent = '×';
  </script>

</body>
</html>`
}

function buildTechDigitalTemplate(data: TemplateData): string {
  const { content, businessName, businessCategory, primaryColor, secondaryColor, pages, images, stockImages, locationInfo } = data
  const fonts = fontPairings[businessCategory] || fontPairings['other']
  const navFlags = resolveNavLinks(pages)

  const heroImg = images[0] || stockImages.hero
  const stockPool = buildImagePool(images, stockImages, businessName)
  let _pi = 0

  // Futuristic dark palette
  const bg = '#080810'
  const bgAlt = '#0d0d1a'
  const cardBg = '#111122'
  const textPrimary = '#e8e8f0'
  const textMuted = '#7070a0'
  const borderCol = 'rgba(120,120,200,0.12)'
  const accent = primaryColor || '#6c63ff'
  const accentGlow = `${accent}40`

  const fallbackTestimonials = getFallbackTestimonials(content, businessCategory)

  const headHtml = buildHead(businessName, fonts, primaryColor, secondaryColor, 'dark') + `<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet"/>`

  return `${headHtml}
  <style>
    :root {
      --bg: ${bg};
      --bg-alt: ${bgAlt};
      --card-bg: ${cardBg};
      --text: ${textPrimary};
      --text-muted: ${textMuted};
      --border: ${borderCol};
      --primary: ${accent};
      --heading-font: 'Space Grotesk', sans-serif;
      --body-font: 'Space Grotesk', sans-serif;
    }

    /* Grain overlay */
    body::before {
      content: '';
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 9999;
      opacity: 0.025;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    }

    /* Animated grid background */
    body::after {
      content: '';
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 0;
      background-image:
        linear-gradient(rgba(120,120,200,0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(120,120,200,0.04) 1px, transparent 1px);
      background-size: 60px 60px;
    }

    body { position: relative; }

    /* Custom cursor */
    body { cursor: none; }
    #ms-cursor-dot { position:fixed;width:5px;height:5px;background:${accent};border-radius:50%;pointer-events:none;z-index:10000;transform:translate(-50%,-50%);box-shadow:0 0 8px ${accent}; }
    #ms-cursor-ring { position:fixed;width:32px;height:32px;border:1px solid ${accent};border-radius:50%;pointer-events:none;z-index:9999;transform:translate(-50%,-50%);transition:width 0.3s,height 0.3s,opacity 0.3s;opacity:0.5; }

    /* Reveal animations */
    .reveal { opacity:0;transform:translateY(24px);transition:opacity 0.7s ease,transform 0.7s ease; }
    .reveal.visible { opacity:1;transform:translateY(0); }
    .reveal-delay-1 { transition-delay:0.1s; }
    .reveal-delay-2 { transition-delay:0.2s; }
    .reveal-delay-3 { transition-delay:0.3s; }
    .reveal-delay-4 { transition-delay:0.4s; }

    /* Glow card */
    .tech-card {
      background: ${cardBg};
      border: 1px solid ${borderCol};
      border-radius: 12px;
      padding: 2.5rem;
      position: relative;
      overflow: hidden;
      transition: border-color 0.4s ease, transform 0.4s ease;
    }
    .tech-card::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle at 30% 30%, ${accentGlow} 0%, transparent 55%);
      opacity: 0;
      transition: opacity 0.4s ease;
    }
    .tech-card:hover { border-color: ${accent}55; transform: translateY(-4px); }
    .tech-card:hover::before { opacity: 1; }

    /* Mono label style */
    .mono-label {
      font-family: 'Space Mono', monospace;
      font-size: 0.65rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: ${accent};
    }

    /* Typewriter cursor blink */
    @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
    .tw-cursor { display:inline-block;width:2px;height:1em;background:${accent};margin-left:2px;animation:blink 1s step-end infinite;vertical-align:text-bottom; }

    /* Glowing line */
    .glow-line { height:1px;background:linear-gradient(to right,transparent,${accent},transparent); }

    /* Accordion */
    .tech-accord-body { max-height:0;overflow:hidden;transition:max-height 0.4s cubic-bezier(0.4,0,0.2,1); }
    .tech-accord-body.open { max-height:300px; }
  </style>

  <!-- Custom cursor -->
  <div id="ms-cursor-dot"></div>
  <div id="ms-cursor-ring"></div>

${buildStandardNav(businessName, content, navFlags)}

  <!-- ═══════════ HERO: Centered, massive type, animated gradient orb ═══════════ -->
  <section style="position:relative;min-height:100vh;display:flex;align-items:center;overflow:hidden;background:${bg};z-index:1">

    <!-- Ambient orb -->
    <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:800px;height:800px;border-radius:50%;background:radial-gradient(circle,${accentGlow} 0%,transparent 65%);pointer-events:none;animation:orbPulse 6s ease-in-out infinite"></div>

    <!-- Floating code fragments -->
    <div style="position:absolute;top:15%;left:5%;font-family:'Space Mono',monospace;font-size:0.65rem;color:rgba(108,99,255,0.2);line-height:1.8;pointer-events:none">
      const init = () =&gt; {<br />&nbsp;&nbsp;deploy();<br />};
    </div>
    <div style="position:absolute;bottom:20%;right:6%;font-family:'Space Mono',monospace;font-size:0.65rem;color:rgba(108,99,255,0.2);line-height:1.8;pointer-events:none;text-align:right">
      &lt;Solution /&gt;<br />// v2.0.0
    </div>

    <div style="position:relative;z-index:2;max-width:1100px;margin:0 auto;padding:0 2.5rem;text-align:center;width:100%">

      ${content.badge ? `<div class="reveal" style="display:inline-flex;align-items:center;gap:0.5rem;font-family:'Space Mono',monospace;font-size:0.65rem;letter-spacing:0.15em;text-transform:uppercase;padding:0.5rem 1.25rem;border:1px solid ${borderCol};border-radius:999px;color:${accent};margin-bottom:2.5rem">
        <span style="width:6px;height:6px;border-radius:50%;background:${accent};animation:blink 1.5s ease-in-out infinite"></span>
        ${content.badge}
      </div>` : ''}

      <h1 class="reveal" style="font-family:'Space Grotesk',sans-serif;font-size:clamp(3rem,7vw,6rem);font-weight:700;line-height:1.0;letter-spacing:-0.03em;margin-bottom:1.75rem;color:${textPrimary}">
        ${content.heroAccent ? `<span style="color:${accent}">${content.heroAccent}</span><br /><span style="color:${textPrimary}">${content.tagline}</span>` : content.tagline.replace(' ', `<br />`)}
        <span class="tw-cursor"></span>
      </h1>

      <p class="reveal reveal-delay-1" style="font-family:'Space Grotesk',sans-serif;font-size:1.1rem;color:${textMuted};line-height:1.75;max-width:580px;margin:0 auto 3rem;font-weight:300">${content.heroSubtitle}</p>

      <div class="reveal reveal-delay-2" style="display:flex;align-items:center;justify-content:center;gap:1rem;flex-wrap:wrap">
        <a href="#contact" style="font-family:'Space Grotesk',sans-serif;font-size:0.8rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;padding:1rem 2.5rem;background:${accent};color:#fff;border-radius:6px;text-decoration:none;box-shadow:0 0 32px ${accentGlow};transition:box-shadow 0.3s,transform 0.3s">${content.ctaPrimary}</a>
        <a href="#services" style="font-family:'Space Grotesk',sans-serif;font-size:0.8rem;font-weight:500;letter-spacing:0.1em;text-transform:uppercase;padding:1rem 2.5rem;border:1px solid ${borderCol};color:${textPrimary};border-radius:6px;text-decoration:none;transition:border-color 0.3s">${content.ctaSecondary}</a>
      </div>

      ${content.ctaNote ? `<p class="reveal reveal-delay-3" style="font-family:'Space Mono',monospace;font-size:0.65rem;color:${textMuted};margin-top:1.25rem;letter-spacing:0.08em">${content.ctaNote}</p>` : ''}
    </div>
  </section>

  <!-- ═══════════ STATS MARQUEE ═══════════ -->
  <div style="position:relative;z-index:1;padding:1.5rem 0;border-top:1px solid ${borderCol};border-bottom:1px solid ${borderCol};background:${bgAlt};overflow:hidden">
    <div style="display:flex;align-items:center;gap:5rem;animation:marquee 20s linear infinite;white-space:nowrap">
      ${[...content.stats, ...content.stats, ...content.stats].map(s => `
      <div style="display:flex;align-items:center;gap:0.75rem;flex-shrink:0">
        <span style="font-family:'Space Grotesk',sans-serif;font-size:1.1rem;font-weight:700;color:${accent}">${s.value}</span>
        <span style="font-family:'Space Mono',monospace;font-size:0.65rem;letter-spacing:0.1em;text-transform:uppercase;color:${textMuted}">${s.label}</span>
        <span style="color:${borderCol};font-size:1.2rem">&#47;</span>
      </div>`).join('')}
    </div>
  </div>

  <!-- ═══════════ SERVICES: Cards with glow effect ═══════════ -->
  <section id="services" style="position:relative;padding:120px 0;background:${bg};z-index:1">
    <div style="max-width:1200px;margin:0 auto;padding:0 2.5rem">
      <div style="display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:4rem;flex-wrap:wrap;gap:2rem">
        <div>
          <div class="mono-label reveal" style="margin-bottom:1rem">${'// '}${content.heroEyebrow}</div>
          <h2 class="reveal" style="font-family:'Space Grotesk',sans-serif;font-size:clamp(2rem,4vw,3rem);font-weight:700;color:${textPrimary};line-height:1.1;letter-spacing:-0.02em">${content.servicesHeading}</h2>
        </div>
        <a href="#contact" class="reveal" style="font-family:'Space Grotesk',sans-serif;font-size:0.75rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:${accent};text-decoration:none;display:flex;align-items:center;gap:0.5rem;flex-shrink:0">All Services <span style="font-size:1rem">&#8594;</span></a>
      </div>

      <div class="ms-grid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem">
        ${content.services.slice(0, Math.min(content.services.length, 6)).map((s, i) => `
        <div class="tech-card reveal reveal-delay-${(i % 3) + 1}">
          <div style="font-family:'Space Mono',monospace;font-size:0.65rem;color:${textMuted};letter-spacing:0.1em;margin-bottom:1.5rem">${String(i + 1).padStart(2, '0')}</div>
          <div style="font-size:1.75rem;margin-bottom:1.25rem;line-height:1">${s.icon || ['⚡', '◈', '⊕', '◉', '⬡', '◇'][i % 6]}</div>
          <h3 style="font-family:'Space Grotesk',sans-serif;font-size:1.1rem;font-weight:600;color:${textPrimary};margin-bottom:0.75rem;letter-spacing:-0.01em">${s.name}</h3>
          <p style="font-family:'Space Grotesk',sans-serif;font-size:0.9rem;color:${textMuted};line-height:1.7;margin-bottom:1.5rem;font-weight:300">${s.description}</p>
          ${s.tags && s.tags.length > 0 ? `<div style="display:flex;gap:0.5rem;flex-wrap:wrap">${s.tags.map(t => `<span style="font-family:'Space Mono',monospace;font-size:0.6rem;letter-spacing:0.08em;padding:0.3rem 0.7rem;background:rgba(108,99,255,0.08);border:1px solid ${borderCol};border-radius:4px;color:${accent}">${t}</span>`).join('')}</div>` : ''}
        </div>`).join('')}
      </div>
    </div>
  </section>

  <!-- ═══════════ FEATURE SHOWCASES: Alternating ═══════════ -->
  <section style="position:relative;padding:80px 0 120px;background:${bgAlt};z-index:1">
    <div style="max-width:1200px;margin:0 auto;padding:0 2.5rem">
      <div class="mono-label reveal" style="text-align:center;margin-bottom:1rem">// How We Deliver</div>
      <h2 class="reveal" style="font-family:'Space Grotesk',sans-serif;font-size:clamp(2rem,4vw,3rem);font-weight:700;color:${textPrimary};text-align:center;letter-spacing:-0.02em;margin-bottom:5rem">Built for results</h2>

      ${(content.features || content.services.slice(0, 3)).map((item, i) => `
      <div class="ms-grid reveal" style="display:grid;grid-template-columns:1fr 1fr;gap:6rem;align-items:center;margin-bottom:${i < 2 ? '6rem' : '0'}">
        ${i % 2 === 0 ? `
        <div>
          <div style="font-family:'Space Mono',monospace;font-size:0.65rem;color:${accent};letter-spacing:0.15em;margin-bottom:1rem">FEATURE ${String(i + 1).padStart(2, '0')}</div>
          <h3 style="font-family:'Space Grotesk',sans-serif;font-size:clamp(1.5rem,2.5vw,2rem);font-weight:700;color:${textPrimary};line-height:1.2;letter-spacing:-0.02em;margin-bottom:1rem">${item.name}</h3>
          <p style="font-family:'Space Grotesk',sans-serif;font-size:0.95rem;color:${textMuted};line-height:1.8;margin-bottom:1.75rem;font-weight:300">${item.description}</p>
          <a href="#contact" style="font-family:'Space Grotesk',sans-serif;font-size:0.75rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:${accent};text-decoration:none;display:inline-flex;align-items:center;gap:0.5rem">${content.ctaPrimary} <span>&#8594;</span></a>
        </div>
        <div style="position:relative;border-radius:12px;overflow:hidden;border:1px solid ${borderCol}">
          <img src="${stockImages.cards[i] || stockPool[i]}" alt="" style="width:100%;height:360px;object-fit:cover;display:block" />
          <div style="position:absolute;inset:0;background:linear-gradient(135deg,${accentGlow} 0%,transparent 60%)"></div>
        </div>
        ` : `
        <div style="position:relative;border-radius:12px;overflow:hidden;border:1px solid ${borderCol}">
          <img src="${stockImages.cards[i] || stockPool[i]}" alt="" style="width:100%;height:360px;object-fit:cover;display:block" />
          <div style="position:absolute;inset:0;background:linear-gradient(225deg,${accentGlow} 0%,transparent 60%)"></div>
        </div>
        <div>
          <div style="font-family:'Space Mono',monospace;font-size:0.65rem;color:${accent};letter-spacing:0.15em;margin-bottom:1rem">FEATURE ${String(i + 1).padStart(2, '0')}</div>
          <h3 style="font-family:'Space Grotesk',sans-serif;font-size:clamp(1.5rem,2.5vw,2rem);font-weight:700;color:${textPrimary};line-height:1.2;letter-spacing:-0.02em;margin-bottom:1rem">${item.name}</h3>
          <p style="font-family:'Space Grotesk',sans-serif;font-size:0.95rem;color:${textMuted};line-height:1.8;margin-bottom:1.75rem;font-weight:300">${item.description}</p>
          <a href="#contact" style="font-family:'Space Grotesk',sans-serif;font-size:0.75rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:${accent};text-decoration:none;display:inline-flex;align-items:center;gap:0.5rem">${content.ctaPrimary} <span>&#8594;</span></a>
        </div>`}
      </div>`).join('')}
    </div>
  </section>

  <!-- ═══════════ ABOUT + PROCESS ═══════════ -->
  <section id="about" style="position:relative;padding:120px 0;background:${bg};z-index:1">
    <div style="max-width:1200px;margin:0 auto;padding:0 2.5rem">
      <div class="glow-line reveal" style="margin-bottom:5rem"></div>

      <!-- About 2-col -->
      <div class="ms-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:8rem;align-items:start;margin-bottom:7rem">
        <div>
          <div class="mono-label reveal" style="margin-bottom:1rem">// About Us</div>
          <h2 class="reveal" style="font-family:'Space Grotesk',sans-serif;font-size:clamp(2rem,3.5vw,2.8rem);font-weight:700;color:${textPrimary};line-height:1.1;letter-spacing:-0.02em;margin-bottom:2rem">${content.aboutHeading}</h2>
          ${content.aboutMission ? `<p class="reveal" style="font-family:'Space Grotesk',sans-serif;font-size:1rem;color:${accent};line-height:1.7;margin-bottom:1.5rem;font-weight:500">${content.aboutMission}</p>` : ''}
          ${content.aboutText.split('\n').filter(Boolean).map(p => `<p class="reveal" style="font-family:'Space Grotesk',sans-serif;font-size:0.95rem;color:${textMuted};line-height:1.8;margin-bottom:1rem;font-weight:300">${p}</p>`).join('')}
        </div>
        <!-- Stats grid -->
        <div class="ms-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;padding-top:3rem">
          ${content.stats.slice(0, 4).map(s => `
          <div class="tech-card reveal">
            <div style="font-family:'Space Grotesk',sans-serif;font-size:2.2rem;font-weight:700;color:${accent};letter-spacing:-0.03em;line-height:1;margin-bottom:0.5rem">${s.value}</div>
            <div class="mono-label" style="color:${textMuted};font-size:0.6rem">${s.label}</div>
            ${s.sublabel ? `<div style="font-family:'Space Mono',monospace;font-size:0.6rem;color:${textMuted};opacity:0.5;margin-top:0.25rem">${s.sublabel}</div>` : ''}
          </div>`).join('')}
        </div>
      </div>

      <!-- Process steps -->
      ${content.processSteps && content.processSteps.length > 0 ? `
      <div class="glow-line reveal" style="margin-bottom:5rem"></div>
      <div class="mono-label reveal" style="text-align:center;margin-bottom:1rem">// The Process</div>
      <h2 class="reveal" style="font-family:'Space Grotesk',sans-serif;font-size:clamp(2rem,3.5vw,2.8rem);font-weight:700;color:${textPrimary};text-align:center;letter-spacing:-0.02em;margin-bottom:4rem">${content.stepsHeading || 'How We Work'}</h2>
      <div class="ms-flex" style="display:flex;align-items:start;gap:0">
        ${content.processSteps.slice(0, 4).map((step, i, arr) => `
        <div class="reveal reveal-delay-${i + 1}" style="flex:1;text-align:center;padding:0 1.5rem;position:relative">
          ${i < arr.length - 1 ? `<div style="position:absolute;top:2rem;left:calc(50% + 2.5rem);right:calc(-50% + 2.5rem);height:1px;background:linear-gradient(to right,${accent}60,${accent}20)"></div>` : ''}
          <div style="width:64px;height:64px;border-radius:50%;border:1px solid ${accent};display:flex;align-items:center;justify-content:center;margin:0 auto 1.5rem;position:relative;z-index:1;background:${bg}">
            <span style="font-family:'Space Mono',monospace;font-size:0.8rem;color:${accent};font-weight:700">${String(i + 1).padStart(2, '0')}</span>
          </div>
          <h3 style="font-family:'Space Grotesk',sans-serif;font-size:0.9rem;font-weight:600;color:${textPrimary};margin-bottom:0.6rem;letter-spacing:-0.01em">${step.title}</h3>
          <p style="font-family:'Space Grotesk',sans-serif;font-size:0.82rem;color:${textMuted};line-height:1.7;font-weight:300">${step.description}</p>
        </div>`).join('')}
      </div>` : ''}
    </div>
  </section>

  <!-- ═══════════ TESTIMONIALS ═══════════ -->
  <section style="position:relative;padding:120px 0;background:${bgAlt};z-index:1">
    <div style="max-width:1200px;margin:0 auto;padding:0 2.5rem">
      <div class="mono-label reveal" style="text-align:center;margin-bottom:1rem">// Social Proof</div>
      <h2 class="reveal" style="font-family:'Space Grotesk',sans-serif;font-size:clamp(2rem,4vw,3rem);font-weight:700;color:${textPrimary};text-align:center;letter-spacing:-0.02em;margin-bottom:4rem">What clients say</h2>

      ${content.testimonial ? `
      <div class="reveal" style="background:linear-gradient(135deg,${cardBg},${bg});border:1px solid ${borderCol};border-radius:16px;padding:4rem;margin-bottom:2rem;position:relative;overflow:hidden">
        <div style="position:absolute;top:2rem;right:3rem;font-family:'Space Grotesk',sans-serif;font-size:6rem;font-weight:700;color:${accentGlow};line-height:1;pointer-events:none">"</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center">
          <div>
            <p style="font-family:'Space Grotesk',sans-serif;font-size:1.15rem;color:${textPrimary};line-height:1.65;margin-bottom:2rem;font-weight:300">"${content.testimonial.quote}"</p>
            <div style="display:flex;align-items:center;gap:1rem">
              <div style="width:40px;height:40px;border-radius:50%;background:${accent};display:flex;align-items:center;justify-content:center;color:#fff;font-family:'Space Grotesk',sans-serif;font-size:0.85rem;font-weight:600;flex-shrink:0">${content.testimonial.author.charAt(0)}</div>
              <div>
                <div style="font-family:'Space Grotesk',sans-serif;font-size:0.9rem;font-weight:600;color:${textPrimary}">${content.testimonial.author}</div>
                ${content.testimonial.rating ? `<div style="color:${accent};font-size:0.7rem;margin-top:0.2rem">${'&#9733;'.repeat(content.testimonial.rating)}</div>` : ''}
              </div>
            </div>
          </div>
          <div style="border-radius:12px;overflow:hidden;border:1px solid ${borderCol}">
            <img src="${stockPool[4] || heroImg}" alt="" style="width:100%;height:260px;object-fit:cover;display:block" />
          </div>
        </div>
      </div>` : ''}

      <div class="ms-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem">
        ${fallbackTestimonials.map(t => `
        <div class="tech-card reveal">
          <div style="color:${accent};font-size:0.75rem;margin-bottom:1.25rem">${'&#9733;'.repeat(t.rating)}</div>
          <p style="font-family:'Space Grotesk',sans-serif;font-size:0.95rem;color:${textMuted};line-height:1.7;margin-bottom:1.5rem;font-weight:300">"${t.quote}"</p>
          <div style="font-family:'Space Mono',monospace;font-size:0.65rem;color:${textMuted};letter-spacing:0.08em">— ${t.author}</div>
        </div>`).join('')}
      </div>
    </div>
  </section>

  <!-- ═══════════ FINAL CTA BAND ═══════════ -->
  <section style="position:relative;padding:140px 0;background:${bg};overflow:hidden;z-index:1">
    <div style="position:absolute;inset:0;background:radial-gradient(ellipse at center,${accentGlow} 0%,transparent 65%);pointer-events:none"></div>
    <div style="position:relative;z-index:2;max-width:800px;margin:0 auto;padding:0 2.5rem;text-align:center">
      <div class="mono-label reveal" style="margin-bottom:1.5rem">// Ready When You Are</div>
      <h2 class="reveal" style="font-family:'Space Grotesk',sans-serif;font-size:clamp(2.2rem,5vw,4rem);font-weight:700;color:${textPrimary};line-height:1.05;letter-spacing:-0.03em;margin-bottom:2rem">Let's build something <span style="color:${accent}">remarkable</span></h2>
      <p class="reveal" style="font-family:'Space Grotesk',sans-serif;font-size:1rem;color:${textMuted};line-height:1.75;margin-bottom:3rem;font-weight:300">${content.heroSubtitle}</p>
      <div class="reveal" style="display:flex;align-items:center;justify-content:center;gap:1rem;flex-wrap:wrap">
        <a href="#contact" style="font-family:'Space Grotesk',sans-serif;font-size:0.8rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;padding:1.1rem 2.75rem;background:${accent};color:#fff;border-radius:6px;text-decoration:none;box-shadow:0 0 40px ${accentGlow}">${content.ctaPrimary}</a>
        <a href="#services" style="font-family:'Space Grotesk',sans-serif;font-size:0.8rem;font-weight:500;letter-spacing:0.1em;text-transform:uppercase;padding:1.1rem 2.75rem;border:1px solid ${borderCol};color:${textPrimary};border-radius:6px;text-decoration:none">${content.ctaSecondary}</a>
      </div>
    </div>
  </section>

${buildContactSection(content, locationInfo)}

${buildFooter(businessName, content, 'dark')}

  <style>
    @keyframes orbPulse { 0%,100%{transform:translate(-50%,-50%) scale(1);opacity:0.6} 50%{transform:translate(-50%,-50%) scale(1.1);opacity:1} }
    @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
  </style>

  <script>
    // Custom cursor
    var dot = document.getElementById('ms-cursor-dot');
    var ring = document.getElementById('ms-cursor-ring');
    var mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', function(e){ mx = e.clientX; my = e.clientY; dot.style.left = mx+'px'; dot.style.top = my+'px'; });
    (function loop(){ rx += (mx - rx) * 0.1; ry += (my - ry) * 0.1; ring.style.left = rx+'px'; ring.style.top = ry+'px'; requestAnimationFrame(loop); })();
    document.querySelectorAll('a,button').forEach(function(el){ el.addEventListener('mouseenter',function(){ ring.style.width='52px'; ring.style.height='52px'; ring.style.opacity='0.8'; }); el.addEventListener('mouseleave',function(){ ring.style.width='32px'; ring.style.height='32px'; ring.style.opacity='0.5'; }); });

    // Scroll reveal
    var obs = new IntersectionObserver(function(entries){ entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('visible'); } }); }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(function(el){ obs.observe(el); });
  </script>

</body>
</html>`
}