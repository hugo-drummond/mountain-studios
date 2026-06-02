function buildFoodHospitalityTemplate(data: TemplateData): string {
  const { content, businessName, businessCategory, primaryColor, secondaryColor, pages, images, stockImages, locationInfo } = data
  const fonts = fontPairings[businessCategory] || fontPairings['other']
  const navFlags = resolveNavLinks(pages)

  const heroImg = images[0] || stockImages.hero
  const stockPool = buildImagePool(images, stockImages, businessName)
  const aboutImg = images[5] || stockImages.about

  // Candlelit dining palette — deep parchment, ink, warm gold
  const bg = '#f9f5ef'
  const bgAlt = '#f2ece2'
  const inkDark = '#1c1408'
  const inkMid = '#3d3120'
  const muted = '#7a6a54'
  const gold = '#b8862a'
  const goldLight = '#d4a84b'
  const cream = '#fdf8f0'

  const headHtml = buildHead(businessName, fonts, primaryColor, secondaryColor, 'light')

  const navLinks = navFlags.allLinks

  // Custom candlelit nav — transparent over hero, dark text
  const customNav = `
  <nav id="food-nav" style="position:fixed;top:0;left:0;right:0;z-index:100;padding:1.5rem 3rem;display:flex;align-items:center;justify-content:space-between;transition:all 0.5s ease;background:transparent">
    <a href="#" style="font-family:var(--heading-font);font-size:1.2rem;font-weight:600;color:#fff;text-decoration:none;letter-spacing:0.12em;text-transform:uppercase">${businessName}</a>
    <div style="display:flex;align-items:center;gap:2.5rem">
      ${navLinks.map(l => `<a href="${l.href}" style="font-family:var(--body-font);font-size:0.78rem;font-weight:500;color:rgba(255,255,255,0.85);text-decoration:none;letter-spacing:0.1em;text-transform:uppercase;transition:color 0.3s">${l.label}</a>`).join('')}
      <a href="#contact" style="font-family:var(--body-font);font-size:0.78rem;font-weight:600;padding:0.6rem 1.75rem;border:1.5px solid rgba(255,255,255,0.7);color:#fff;text-decoration:none;letter-spacing:0.1em;text-transform:uppercase;transition:all 0.3s">${content.ctaPrimary}</a>
      <label for="ms-menu-toggle" style="display:none;cursor:pointer;color:#fff;font-size:1.5rem">&#9776;</label>
    </div>
  </nav>
  <style>
    #food-nav.scrolled { background:${cream} !important; box-shadow:0 1px 20px rgba(0,0,0,0.08); }
    #food-nav.scrolled a { color:${inkDark} !important; }
    #food-nav.scrolled a[href="#contact"] { border-color:${inkDark} !important; }
    @media(max-width:768px){ #food-nav { padding:1rem 1.25rem; } #food-nav > div > a:not([href="#contact"]) { display:none!important; } #food-nav label { display:block!important; } }
  </style>
  <script>
    window.addEventListener('scroll',function(){
      var n=document.getElementById('food-nav');
      if(window.scrollY>80){n.classList.add('scrolled');}else{n.classList.remove('scrolled');}
    });
  </script>
  ${buildMobileMenu(content, navLinks)}`

  // HERO — full-bleed cinematic, Ken Burns bg, massive serif headline centered
  const heroSection = `
  <section style="position:relative;min-height:calc(100vh - 64px);display:flex;align-items:center;justify-content:center;overflow:hidden">
    <div style="position:absolute;inset:0;animation:kenburns 18s ease-in-out infinite alternate">
      <img src="${heroImg}" alt="" style="width:100%;height:100%;object-fit:cover;transform-origin:center" />
    </div>
    <div style="position:absolute;inset:0;background:linear-gradient(160deg,rgba(20,12,4,0.55) 0%,rgba(10,6,2,0.72) 60%,rgba(28,20,8,0.85) 100%)"></div>
    <div style="position:relative;z-index:2;text-align:center;padding:0 2rem;max-width:900px">
      <div style="display:flex;align-items:center;justify-content:center;gap:1.25rem;margin-bottom:2rem">
        <span style="display:block;width:50px;height:1px;background:${goldLight};opacity:0.8"></span>
        <span style="font-family:var(--body-font);font-size:0.7rem;font-weight:500;color:${goldLight};letter-spacing:0.25em;text-transform:uppercase">${content.heroEyebrow}</span>
        <span style="display:block;width:50px;height:1px;background:${goldLight};opacity:0.8"></span>
      </div>
      <h1 style="font-family:var(--heading-font);font-size:clamp(3.5rem,8vw,7rem);font-weight:400;color:#fff;line-height:1.0;margin-bottom:1.5rem;letter-spacing:-0.01em">${content.tagline}</h1>
      <p style="font-family:var(--body-font);font-size:1.05rem;color:rgba(255,255,255,0.75);max-width:520px;margin:0 auto 2.5rem;line-height:1.7;font-weight:300">${content.heroSubtitle}</p>
      <div style="display:flex;align-items:center;justify-content:center;gap:1.25rem;flex-wrap:wrap">
        <a href="#contact" style="font-family:var(--body-font);font-size:0.78rem;font-weight:600;padding:1rem 2.5rem;background:${gold};color:#fff;text-decoration:none;letter-spacing:0.14em;text-transform:uppercase;transition:all 0.3s">${content.ctaPrimary}</a>
        <a href="#services" style="font-family:var(--body-font);font-size:0.78rem;font-weight:500;padding:1rem 2.5rem;border:1px solid rgba(255,255,255,0.5);color:rgba(255,255,255,0.9);text-decoration:none;letter-spacing:0.14em;text-transform:uppercase;transition:all 0.3s">${content.ctaSecondary || 'View Menu'}</a>
      </div>
    </div>
    <div style="position:absolute;bottom:2.5rem;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:0.5rem;animation:scrollpulse 2.5s ease-in-out infinite">
      <span style="font-family:var(--body-font);font-size:0.65rem;color:rgba(255,255,255,0.5);letter-spacing:0.18em;text-transform:uppercase">Scroll</span>
      <span style="color:rgba(255,255,255,0.5);font-size:1.2rem">&#8595;</span>
    </div>
  </section>
  <style>
    @keyframes kenburns { 0%{transform:scale(1.0) translateX(0)} 100%{transform:scale(1.08) translateX(-2%)} }
    @keyframes scrollpulse { 0%,100%{opacity:0.4;transform:translateX(-50%) translateY(0)} 50%{opacity:1;transform:translateX(-50%) translateY(6px)} }
  </style>`

  // ACCOLADES STRIP — gold stars + key stats
  const accoladesStrip = `
  <section style="padding:2rem 3rem;background:${inkDark};display:flex;align-items:center;justify-content:center;gap:4rem;flex-wrap:wrap">
    ${content.stats.slice(0, 3).map(s => `
    <div style="text-align:center">
      <div style="font-family:var(--heading-font);font-size:1.7rem;font-weight:600;color:${goldLight};margin-bottom:0.2rem">${s.value}</div>
      <div style="font-family:var(--body-font);font-size:0.7rem;color:rgba(255,255,255,0.55);letter-spacing:0.12em;text-transform:uppercase">${s.label}</div>
    </div>`).join(`<span style="display:block;width:1px;height:40px;background:rgba(255,255,255,0.1)"></span>`)}
  </section>`

  // ABOUT — editorial 2-col: tall moody photo left, story right with gold ornament
  const aboutSection = `
  <section id="about" style="padding:120px 0;background:${bg}">
    <div class="ms-grid" style="max-width:1180px;margin:0 auto;padding:0 3rem;display:grid;grid-template-columns:1fr 1.1fr;gap:6rem;align-items:center">
      <div style="position:relative">
        <div style="aspect-ratio:3/4;border-radius:0;overflow:hidden">
          <img src="${aboutImg}" alt="" style="width:100%;height:100%;object-fit:cover" />
        </div>
        <div style="position:absolute;bottom:-2rem;right:-2rem;width:160px;height:160px;border:2px solid ${gold};opacity:0.4"></div>
        <div style="position:absolute;top:-1.5rem;left:-1.5rem;width:120px;height:120px;border:1px solid ${gold};opacity:0.25"></div>
      </div>
      <div>
        <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1.5rem">
          <span style="font-family:var(--body-font);font-size:0.7rem;font-weight:600;color:${gold};letter-spacing:0.2em;text-transform:uppercase">${content.badge || content.heroEyebrow}</span>
          <span style="flex:1;height:1px;background:${gold};opacity:0.3"></span>
        </div>
        <h2 style="font-family:var(--heading-font);font-size:clamp(2.2rem,4vw,3.5rem);font-weight:400;color:${inkDark};line-height:1.15;margin-bottom:1.5rem">${content.aboutHeading}</h2>
        ${content.aboutMission ? `<p style="font-family:var(--body-font);font-size:1.05rem;color:${inkMid};line-height:1.75;font-style:italic;margin-bottom:1.5rem;padding-left:1.25rem;border-left:3px solid ${gold}">${content.aboutMission}</p>` : ''}
        ${content.aboutText.split('\n').filter(p => p.trim()).map(p => `<p style="font-family:var(--body-font);font-size:0.95rem;color:${muted};line-height:1.85;margin-bottom:1rem">${p}</p>`).join('')}
        <a href="#contact" style="display:inline-block;margin-top:1.5rem;font-family:var(--body-font);font-size:0.78rem;font-weight:600;padding:0.9rem 2.25rem;background:${inkDark};color:#fff;text-decoration:none;letter-spacing:0.12em;text-transform:uppercase;transition:background 0.3s">${content.ctaPrimary}</a>
      </div>
    </div>
  </section>`

  // MENU SECTION — ornate heading, stacked menu rows with thumbnail
  const menuSection = `
  <section id="services" style="padding:120px 0;background:${bgAlt}">
    <div style="max-width:1000px;margin:0 auto;padding:0 3rem">
      <div style="text-align:center;margin-bottom:4rem">
        <div style="font-size:1.5rem;color:${gold};margin-bottom:0.75rem">&#10022;</div>
        <h2 style="font-family:var(--heading-font);font-size:clamp(2.5rem,5vw,4rem);font-weight:400;color:${inkDark};margin-bottom:0.5rem">${content.servicesHeading}</h2>
        <div style="font-size:1.5rem;color:${gold};margin-top:0.75rem">&#10022;</div>
      </div>
      <div style="display:flex;flex-direction:column;gap:0">
        ${content.services.map((s, i) => `
        <div style="display:flex;align-items:center;gap:2rem;padding:2rem 0;border-bottom:1px solid rgba(28,20,8,0.08);transition:background 0.3s">
          <div style="width:80px;height:80px;border-radius:50%;overflow:hidden;flex-shrink:0">
            <img src="${stockPool[i] || stockImages.cards[i]}" alt="" style="width:100%;height:100%;object-fit:cover" />
          </div>
          <div style="flex:1">
            <div style="display:flex;align-items:baseline;justify-content:space-between;margin-bottom:0.35rem">
              <h3 style="font-family:var(--heading-font);font-size:1.15rem;font-weight:600;color:${inkDark}">${s.name}</h3>
              <span style="font-family:var(--heading-font);font-size:1rem;color:${gold};flex-shrink:0;margin-left:1rem">&#9135;&#9135;&#9135;</span>
            </div>
            <p style="font-family:var(--body-font);font-size:0.88rem;color:${muted};line-height:1.6">${s.description}</p>
            <div style="display:flex;gap:0.5rem;margin-top:0.5rem;flex-wrap:wrap">
              ${s.tags.map(t => `<span style="font-family:var(--body-font);font-size:0.68rem;color:${gold};letter-spacing:0.1em;text-transform:uppercase">${t}</span>`).join('<span style="color:rgba(28,20,8,0.2)"> · </span>')}
            </div>
          </div>
        </div>`).join('')}
      </div>
      <div style="text-align:center;margin-top:3rem">
        <a href="#contact" style="display:inline-block;font-family:var(--body-font);font-size:0.78rem;font-weight:600;padding:0.9rem 2.5rem;border:1.5px solid ${inkDark};color:${inkDark};text-decoration:none;letter-spacing:0.14em;text-transform:uppercase;transition:all 0.3s">${content.ctaPrimary}</a>
      </div>
    </div>
  </section>`

  // GALLERY — asymmetric editorial grid: 1 tall left + 2 stacked right, then 3 across
  const gallerySection = `
  <section id="gallery" style="padding:0;background:${bg}">
    <div style="max-width:1400px;margin:0 auto">
      <div style="display:grid;grid-template-columns:1.4fr 1fr;gap:3px">
        <div style="overflow:hidden;height:600px">
          <img src="${stockPool[6]}" alt="" style="width:100%;height:100%;object-fit:cover;transition:transform 0.8s ease" onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform='scale(1)'" />
        </div>
        <div style="display:grid;grid-template-rows:1fr 1fr;gap:3px">
          <div style="overflow:hidden">
            <img src="${stockPool[7]}" alt="" style="width:100%;height:100%;object-fit:cover;transition:transform 0.8s ease" onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform='scale(1)'" />
          </div>
          <div style="overflow:hidden">
            <img src="${stockPool[8]}" alt="" style="width:100%;height:100%;object-fit:cover;transition:transform 0.8s ease" onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform='scale(1)'" />
          </div>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:3px;margin-top:3px">
        ${[9,10,11].map(i => `
        <div style="overflow:hidden;height:300px">
          <img src="${stockPool[i]}" alt="" style="width:100%;height:100%;object-fit:cover;transition:transform 0.8s ease" onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform='scale(1)'" />
        </div>`).join('')}
      </div>
    </div>
  </section>`

  // TESTIMONIAL — dark candlelit bg, centered oversized quote
  const testimonialSection = content.testimonial ? `
  <section style="padding:120px 3rem;background:${inkDark};position:relative;overflow:hidden">
    <div style="position:absolute;top:-2rem;left:3rem;font-family:var(--heading-font);font-size:18rem;color:rgba(184,134,42,0.07);line-height:1;pointer-events:none;user-select:none">&#8220;</div>
    <div style="max-width:800px;margin:0 auto;text-align:center;position:relative;z-index:2">
      <div style="display:flex;justify-content:center;gap:0.2rem;margin-bottom:2rem">
        ${[1,2,3,4,5].map(() => `<span style="color:${goldLight};font-size:1rem">&#9733;</span>`).join('')}
      </div>
      <p style="font-family:var(--heading-font);font-size:clamp(1.3rem,2.5vw,2rem);font-weight:400;color:#fff;line-height:1.6;font-style:italic;margin-bottom:2rem">"${content.testimonial.quote}"</p>
      <div style="display:flex;align-items:center;justify-content:center;gap:1.5rem">
        <span style="display:block;width:40px;height:1px;background:${gold};opacity:0.6"></span>
        <span style="font-family:var(--body-font);font-size:0.8rem;color:${goldLight};letter-spacing:0.15em;text-transform:uppercase">${content.testimonial.author}</span>
        <span style="display:block;width:40px;height:1px;background:${gold};opacity:0.6"></span>
      </div>
    </div>
  </section>` : ''

  // CONTACT — warm parchment, 2-col info + form
  const contactSection = buildContactSection(content, locationInfo)

  // FOOTER — ink dark, minimal
  const footerHtml = `
  <footer style="padding:3rem;background:${inkDark};display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1.5rem">
    <div style="font-family:var(--heading-font);font-size:1.3rem;font-weight:600;color:${goldLight};letter-spacing:0.14em;text-transform:uppercase">${businessName}</div>
    <div style="display:flex;gap:2rem;flex-wrap:wrap">
      ${navLinks.map(l => `<a href="${l.href}" style="font-family:var(--body-font);font-size:0.72rem;color:rgba(255,255,255,0.45);text-decoration:none;letter-spacing:0.1em;text-transform:uppercase;transition:color 0.3s">${l.label}</a>`).join('')}
    </div>
    <p style="font-family:var(--body-font);font-size:0.72rem;color:rgba(255,255,255,0.3);letter-spacing:0.08em">&copy; ${new Date().getFullYear()} ${businessName}. All rights reserved.</p>
  </footer>`

  return `${headHtml}
  <style>
    :root {
      --bg: ${bg};
      --bg-alt: ${bgAlt};
      --card-bg: ${cream};
      --text: ${inkDark};
      --text-muted: ${muted};
      --border: rgba(28,20,8,0.07);
    }
    /* Film grain */
    body::before {
      content:'';
      position:fixed;inset:0;pointer-events:none;z-index:999;opacity:0.025;
      background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
      background-size:160px 160px;
    }
    #contact { background:${bg} !important; }
    #contact h2, #contact p, #contact div { color:${inkDark} !important; }
    #contact .ms-grid input, #contact .ms-grid textarea { background:${cream} !important; border-color:rgba(28,20,8,0.12) !important; color:${inkDark} !important; }
    #contact .ms-grid button { background:${inkDark} !important; }
  </style>

${customNav}

${heroSection}
${accoladesStrip}
${aboutSection}
${menuSection}
${gallerySection}
${testimonialSection}
${contactSection}
${footerHtml}

</body>
</html>`
}

function buildRetailTemplate(data: TemplateData): string {
  const { content, businessName, businessCategory, primaryColor, secondaryColor, pages, images, stockImages, locationInfo } = data
  const fonts = fontPairings[businessCategory] || fontPairings['other']
  const navFlags = resolveNavLinks(pages)

  const heroImg = images[0] || stockImages.hero
  const stockPool = buildImagePool(images, stockImages, businessName)
  const aboutImg = images[5] || stockImages.about

  // Bold trend-forward palette — near-black canvas, electric accent, warm white
  const bg = '#0d0d0d'
  const bgCard = '#161616'
  const bgAlt = '#111111'
  const textPrimary = '#f0ece6'
  const textMuted = '#888480'
  const accent = primaryColor
  const accentLight = secondaryColor
  const border = 'rgba(240,236,230,0.07)'

  const headHtml = buildHead(businessName, fonts, primaryColor, secondaryColor, 'dark')
  const navLinks = navFlags.allLinks

  // CUSTOM NAV — transparent over hero, slides to solid
  const customNav = `
  <nav id="retail-nav" style="position:fixed;top:0;left:0;right:0;z-index:100;padding:1.25rem 2.5rem;display:flex;align-items:center;justify-content:space-between;transition:all 0.4s ease;background:transparent">
    <a href="#" style="font-family:var(--heading-font);font-size:1.05rem;font-weight:700;color:#fff;text-decoration:none;letter-spacing:0.06em;text-transform:uppercase">${businessName}</a>
    <div style="display:flex;align-items:center;gap:2rem">
      <div class="ms-nav-links" style="display:flex;align-items:center;gap:2rem">
        ${navLinks.map(l => `<a href="${l.href}" style="font-family:var(--body-font);font-size:0.78rem;font-weight:500;color:rgba(255,255,255,0.7);text-decoration:none;letter-spacing:0.06em;transition:color 0.3s" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,0.7)'">${l.label}</a>`).join('')}
      </div>
      <a href="#contact" style="font-family:var(--body-font);font-size:0.78rem;font-weight:700;padding:0.65rem 1.75rem;background:${accent};color:#fff;text-decoration:none;letter-spacing:0.08em;text-transform:uppercase;border-radius:4px;transition:opacity 0.3s">${content.ctaPrimary}</a>
      <label for="ms-menu-toggle" class="ms-burger-inline" style="display:none;cursor:pointer;color:#fff;font-size:1.5rem">&#9776;</label>
    </div>
  </nav>
  <style>
    #retail-nav.scrolled { background:${bg} !important; border-bottom:1px solid ${border}; box-shadow:0 2px 30px rgba(0,0,0,0.4); }
    @media(max-width:768px){ #retail-nav label { display:block!important; } }
  </style>
  <script>
    window.addEventListener('scroll',function(){
      var n=document.getElementById('retail-nav');
      if(window.scrollY>60){n.classList.add('scrolled');}else{n.classList.remove('scrolled');}
    });
  </script>
  ${buildMobileMenu(content, navLinks)}`

  // HERO — split layout: dark left with massive headline, right = full-bleed product photo
  const heroSection = `
  <section style="position:relative;min-height:calc(100vh - 64px);display:grid;grid-template-columns:1fr 1fr;background:${bg}">
    <div style="display:flex;flex-direction:column;justify-content:center;padding:8rem 4rem 4rem;position:relative;z-index:2">
      <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1.5rem">
        <span style="display:block;width:24px;height:2px;background:${accent}"></span>
        <span style="font-family:var(--body-font);font-size:0.7rem;font-weight:700;color:${accent};letter-spacing:0.2em;text-transform:uppercase">${content.heroEyebrow}</span>
      </div>
      <h1 style="font-family:var(--heading-font);font-size:clamp(3rem,5.5vw,5.5rem);font-weight:900;color:${textPrimary};line-height:0.95;margin-bottom:1.75rem;letter-spacing:-0.03em;text-transform:uppercase">${content.tagline}</h1>
      <p style="font-family:var(--body-font);font-size:1rem;color:${textMuted};max-width:420px;line-height:1.7;margin-bottom:2.5rem">${content.heroSubtitle}</p>
      <div style="display:flex;align-items:center;gap:1rem;flex-wrap:wrap">
        <a href="#services" style="font-family:var(--body-font);font-size:0.8rem;font-weight:700;padding:1rem 2.5rem;background:${accent};color:#fff;text-decoration:none;letter-spacing:0.1em;text-transform:uppercase;border-radius:4px;transition:transform 0.2s,opacity 0.2s">${content.ctaPrimary}</a>
        <a href="#gallery" style="font-family:var(--body-font);font-size:0.8rem;font-weight:500;color:${textMuted};text-decoration:none;letter-spacing:0.06em;display:flex;align-items:center;gap:0.5rem;transition:color 0.3s">${content.ctaSecondary || 'Explore Collection'} <span style="font-size:1rem">&#8594;</span></a>
      </div>
      <div style="display:flex;gap:3rem;margin-top:4rem;padding-top:2.5rem;border-top:1px solid ${border}">
        ${content.stats.slice(0, 3).map(s => `
        <div>
          <div style="font-family:var(--heading-font);font-size:1.6rem;font-weight:700;color:${textPrimary}">${s.value}</div>
          <div style="font-family:var(--body-font);font-size:0.7rem;color:${textMuted};letter-spacing:0.1em;text-transform:uppercase;margin-top:0.2rem">${s.label}</div>
        </div>`).join('')}
      </div>
    </div>
    <div style="position:relative;overflow:hidden">
      <img src="${heroImg}" alt="" style="width:100%;height:100%;object-fit:cover;transition:transform 12s ease" onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform='scale(1)'" />
      <div style="position:absolute;inset:0;background:linear-gradient(90deg,${bg} 0%,transparent 30%)"></div>
      ${content.badge ? `<div style="position:absolute;top:2.5rem;right:2.5rem;padding:0.5rem 1.25rem;background:${accent};font-family:var(--body-font);font-size:0.72rem;font-weight:700;color:#fff;letter-spacing:0.12em;text-transform:uppercase;border-radius:4px">${content.badge}</div>` : ''}
    </div>
  </section>
  <style>@media(max-width:768px){section:first-of-type{grid-template-columns:1fr!important}section:first-of-type>div:last-child{display:none!important}}</style>`

  // PRODUCTS GRID — 4-col with hover reveal overlay
  const productsSection = `
  <section id="services" style="padding:100px 0;background:${bg}">
    <div style="max-width:1400px;margin:0 auto;padding:0 2.5rem">
      <div style="display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:3.5rem;flex-wrap:wrap;gap:1rem">
        <h2 style="font-family:var(--heading-font);font-size:clamp(2.5rem,5vw,4rem);font-weight:900;color:${textPrimary};line-height:0.95;text-transform:uppercase;letter-spacing:-0.02em">${content.servicesHeading}</h2>
        <a href="#contact" style="font-family:var(--body-font);font-size:0.78rem;font-weight:600;color:${textMuted};text-decoration:none;letter-spacing:0.1em;text-transform:uppercase;display:flex;align-items:center;gap:0.5rem">View All <span>&#8594;</span></a>
      </div>
      <div class="ms-grid" style="display:grid;grid-template-columns:repeat(4,1fr);gap:1.5px;background:${border}">
        ${content.services.slice(0, 4).map((s, i) => `
        <div style="position:relative;background:${bgCard};overflow:hidden;group" onmouseover="this.querySelector('.overlay').style.opacity='1'" onmouseout="this.querySelector('.overlay').style.opacity='0'">
          <div style="height:360px;overflow:hidden">
            <img src="${stockPool[i]}" alt="" style="width:100%;height:100%;object-fit:cover;transition:transform 0.7s ease" onmouseover="this.style.transform='scale(1.06)'" onmouseout="this.style.transform='scale(1)'" />
          </div>
          <div class="overlay" style="position:absolute;inset:0;background:rgba(13,13,13,0.75);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:2rem;text-align:center;opacity:0;transition:opacity 0.4s ease">
            <p style="font-family:var(--body-font);font-size:0.88rem;color:rgba(255,255,255,0.85);line-height:1.6;margin-bottom:1.25rem">${s.description}</p>
            <div style="display:flex;gap:0.5rem;flex-wrap:wrap;justify-content:center">
              ${s.tags.map(t => `<span style="font-family:var(--body-font);font-size:0.68rem;padding:0.25rem 0.75rem;border:1px solid rgba(255,255,255,0.3);color:rgba(255,255,255,0.7);letter-spacing:0.08em;text-transform:uppercase;border-radius:2px">${t}</span>`).join('')}
            </div>
          </div>
          <div style="padding:1.25rem 1.5rem;background:${bgCard}">
            <h3 style="font-family:var(--heading-font);font-size:1rem;font-weight:700;color:${textPrimary};text-transform:uppercase;letter-spacing:0.04em">${s.name}</h3>
          </div>
        </div>`).join('')}
      </div>
    </div>
  </section>`

  // MARQUEE BANNER — scrolling text
  const marqueeBanner = `
  <section style="padding:1.5rem 0;background:${accent};overflow:hidden;white-space:nowrap">
    <div style="display:inline-flex;animation:marquee 25s linear infinite;gap:3rem">
      ${[...Array(8)].map(() => `<span style="font-family:var(--heading-font);font-size:1.3rem;font-weight:900;color:#fff;text-transform:uppercase;letter-spacing:0.08em">${content.heroEyebrow} &nbsp;&#10022;&nbsp; ${businessName} &nbsp;&#10022;&nbsp; ${content.ctaPrimary}</span>`).join('')}
    </div>
  </section>
  <style>@keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}</style>`

  // EDITORIAL SPLIT — full-height image + story right
  const editorialSplit = `
  <section id="about" style="display:grid;grid-template-columns:1fr 1fr;min-height:80vh;background:${bg}">
    <div style="overflow:hidden">
      <img src="${aboutImg}" alt="" style="width:100%;height:100%;object-fit:cover;transition:transform 1.2s ease" onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform='scale(1)'" />
    </div>
    <div style="display:flex;flex-direction:column;justify-content:center;padding:5rem 4rem">
      <div style="font-family:var(--body-font);font-size:0.7rem;font-weight:700;color:${accent};letter-spacing:0.2em;text-transform:uppercase;margin-bottom:1.5rem">${content.badge || 'Our Story'}</div>
      <h2 style="font-family:var(--heading-font);font-size:clamp(2.5rem,4.5vw,4rem);font-weight:900;color:${textPrimary};line-height:0.95;margin-bottom:1.5rem;text-transform:uppercase;letter-spacing:-0.02em">${content.aboutHeading}</h2>
      ${content.aboutMission ? `<p style="font-family:var(--body-font);font-size:1.05rem;color:${textPrimary};font-weight:600;line-height:1.65;margin-bottom:1.25rem">${content.aboutMission}</p>` : ''}
      ${content.aboutText.split('\n').filter(p => p.trim()).slice(0,2).map(p => `<p style="font-family:var(--body-font);font-size:0.92rem;color:${textMuted};line-height:1.8;margin-bottom:0.9rem">${p}</p>`).join('')}
      <a href="#contact" style="display:inline-flex;align-items:center;gap:0.75rem;margin-top:2rem;font-family:var(--body-font);font-size:0.8rem;font-weight:700;color:${textPrimary};text-decoration:none;letter-spacing:0.1em;text-transform:uppercase">${content.ctaPrimary} <span style="display:block;width:36px;height:1px;background:${accent}"></span></a>
    </div>
  </section>
  <style>@media(max-width:768px){#about{grid-template-columns:1fr!important}#about>div:first-child{height:300px!important}}</style>`

  // GALLERY — asymmetric grid: 1 big + 4 smaller
  const gallerySection = `
  <section id="gallery" style="padding:100px 0;background:${bgAlt}">
    <div style="max-width:1400px;margin:0 auto;padding:0 2.5rem">
      <h2 style="font-family:var(--heading-font);font-size:clamp(2.5rem,5vw,4rem);font-weight:900;color:${textPrimary};line-height:0.95;text-transform:uppercase;letter-spacing:-0.02em;margin-bottom:3rem">${content.galleryHeading}</h2>
      <div style="display:grid;grid-template-columns:1.5fr 1fr 1fr;grid-template-rows:280px 280px;gap:4px">
        <div style="grid-row:span 2;overflow:hidden;border-radius:4px">
          <img src="${stockPool[5]}" alt="" style="width:100%;height:100%;object-fit:cover;transition:transform 0.8s ease" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'" />
        </div>
        ${[6,7,8,9].map(i => `
        <div style="overflow:hidden;border-radius:4px">
          <img src="${stockPool[i]}" alt="" style="width:100%;height:100%;object-fit:cover;transition:transform 0.8s ease" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'" />
        </div>`).join('')}
      </div>
    </div>
  </section>`

  // TESTIMONIAL — bold dark card, accent quote mark
  const testimonialSection = content.testimonial ? `
  <section style="padding:100px 2.5rem;background:${bg}">
    <div style="max-width:900px;margin:0 auto;text-align:center">
      <div style="font-family:var(--heading-font);font-size:6rem;color:${accent};line-height:0.8;margin-bottom:1.5rem;opacity:0.6">&#8220;</div>
      <p style="font-family:var(--heading-font);font-size:clamp(1.4rem,2.5vw,2.2rem);font-weight:700;color:${textPrimary};line-height:1.35;text-transform:uppercase;letter-spacing:-0.01em;margin-bottom:2rem">"${content.testimonial.quote}"</p>
      <div style="display:flex;align-items:center;justify-content:center;gap:1.25rem">
        <span style="display:block;width:50px;height:1px;background:${accent}"></span>
        <span style="font-family:var(--body-font);font-size:0.78rem;color:${textMuted};letter-spacing:0.15em;text-transform:uppercase">${content.testimonial.author}</span>
        <span style="display:block;width:50px;height:1px;background:${accent}"></span>
      </div>
      ${content.testimonial.rating ? `<div style="margin-top:1.25rem;display:flex;justify-content:center;gap:0.25rem">${[...Array(content.testimonial.rating)].map(() => `<span style="color:${accent};font-size:1rem">&#9733;</span>`).join('')}</div>` : ''}
    </div>
  </section>` : ''

  // FEATURES STRIP — what sets apart, dark bg
  const featuresData = content.features || content.services.slice(0, 3)
  const featuresSection = `
  <section style="padding:100px 0;background:${bgCard}">
    <div style="max-width:1200px;margin:0 auto;padding:0 2.5rem">
      <h2 style="font-family:var(--heading-font);font-size:clamp(2.5rem,5vw,4rem);font-weight:900;color:${textPrimary};line-height:0.95;text-transform:uppercase;letter-spacing:-0.02em;text-align:center;margin-bottom:4rem">Why Shop With Us</h2>
      <div class="ms-grid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:2px;background:${border}">
        ${featuresData.slice(0, 3).map((f, i) => `
        <div style="background:${bgCard};padding:3rem 2.5rem;transition:background 0.3s" onmouseover="this.style.background='${bg}'" onmouseout="this.style.background='${bgCard}'">
          <div style="font-family:var(--heading-font);font-size:3rem;font-weight:900;color:${accent};opacity:0.3;line-height:1;margin-bottom:1.25rem">0${i+1}</div>
          <h3 style="font-family:var(--heading-font);font-size:1.2rem;font-weight:700;color:${textPrimary};text-transform:uppercase;letter-spacing:0.04em;margin-bottom:0.75rem">${f.name}</h3>
          <p style="font-family:var(--body-font);font-size:0.9rem;color:${textMuted};line-height:1.7">${f.description}</p>
        </div>`).join('')}
      </div>
    </div>
  </section>`

  const contactSection = buildContactSection(content, locationInfo)

  const footerHtml = `
  <footer style="padding:3rem 2.5rem;background:${bgCard};display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1.5rem;border-top:1px solid ${border}">
    <div style="font-family:var(--heading-font);font-size:1.1rem;font-weight:700;color:${textPrimary};letter-spacing:0.08em;text-transform:uppercase">${businessName}</div>
    <div style="display:flex;gap:2rem;flex-wrap:wrap">
      ${navLinks.map(l => `<a href="${l.href}" style="font-family:var(--body-font);font-size:0.72rem;color:${textMuted};text-decoration:none;letter-spacing:0.08em;text-transform:uppercase;transition:color 0.3s">${l.label}</a>`).join('')}
    </div>
    <p style="font-family:var(--body-font);font-size:0.72rem;color:${textMuted}">&copy; ${new Date().getFullYear()} ${businessName}. All rights reserved.</p>
  </footer>`

  return `${headHtml}
  <style>
    :root {
      --bg: ${bg};
      --bg-alt: ${bgAlt};
      --card-bg: ${bgCard};
      --text: ${textPrimary};
      --text-muted: ${textMuted};
      --border: ${border};
    }
    body::before {
      content:'';position:fixed;inset:0;pointer-events:none;z-index:999;opacity:0.02;
      background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
      background-size:160px 160px;
    }
    #contact { background:${bgAlt} !important; }
  </style>

${customNav}

${heroSection}
${marqueeBanner}
${productsSection}
${editorialSplit}
${gallerySection}
${testimonialSection}
${featuresSection}
${contactSection}
${footerHtml}

</body>
</html>`
}

function buildPetsTemplate(data: TemplateData): string {
  const { content, businessName, businessCategory, primaryColor, secondaryColor, pages, images, stockImages, locationInfo } = data
  const fonts = fontPairings[businessCategory] || fontPairings['other']
  const navFlags = resolveNavLinks(pages)

  const heroImg = images[0] || stockImages.hero
  const stockPool = buildImagePool(images, stockImages, businessName)
  const aboutImg = images[5] || stockImages.about

  // Warm joyful palette — soft sage/warm cream with earthy accents
  const bg = '#f7f3ed'
  const bgWarm = '#fdf9f4'
  const bgSage = '#e8f0e8'
  const bgDark = '#2c3e2c'
  const textDark = '#1e2e1e'
  const textMid = '#3d5a3d'
  const textMuted = '#6b8a6b'
  const accentGreen = '#4a7c4e'
  const accentWarm = '#c4793a'
  const accentYellow = '#e8b84b'

  const headHtml = buildHead(businessName, fonts, primaryColor, secondaryColor, 'light')
  const navLinks = navFlags.allLinks

  // CUSTOM NAV — warm white, playful
  const customNav = `
  <nav id="pets-nav" style="position:fixed;top:0;left:0;right:0;z-index:100;padding:1.1rem 2.5rem;display:flex;align-items:center;justify-content:space-between;background:${bgWarm};border-bottom:2px solid ${bgSage};transition:box-shadow 0.3s">
    <a href="#" style="font-family:var(--heading-font);font-size:1.3rem;font-weight:700;color:${textDark};text-decoration:none;letter-spacing:0.04em">${businessName}</a>
    <div style="display:flex;align-items:center;gap:2rem">
      <div class="ms-nav-links" style="display:flex;align-items:center;gap:1.75rem">
        ${navLinks.map(l => `<a href="${l.href}" style="font-family:var(--body-font);font-size:0.85rem;font-weight:500;color:${textMid};text-decoration:none;transition:color 0.3s" onmouseover="this.style.color='${accentGreen}'" onmouseout="this.style.color='${textMid}'">${l.label}</a>`).join('')}
      </div>
      <a href="#contact" style="font-family:var(--body-font);font-size:0.82rem;font-weight:700;padding:0.7rem 1.75rem;background:${accentGreen};color:#fff;text-decoration:none;border-radius:999px;letter-spacing:0.04em;transition:opacity 0.3s">${content.ctaPrimary}</a>
      <label for="ms-menu-toggle" class="ms-burger-inline" style="display:none;cursor:pointer;color:${textDark};font-size:1.5rem">&#9776;</label>
    </div>
  </nav>
  <style>
    #pets-nav.scrolled { box-shadow: 0 4px 24px rgba(74,124,78,0.1); }
    @media(max-width:768px){ #pets-nav label { display:block!important; } }
  </style>
  <script>
    window.addEventListener('scroll',function(){
      var n=document.getElementById('pets-nav');
      if(window.scrollY>50){n.classList.add('scrolled');}else{n.classList.remove('scrolled');}
    });
  </script>
  ${buildMobileMenu(content, navLinks)}`

  // HERO — full-bleed joyful image with rounded pill overlay card
  const heroSection = `
  <section style="padding-top:80px;position:relative;min-height:calc(100vh - 64px);display:flex;align-items:center;overflow:hidden;background:${bg}">
    <div style="position:absolute;inset:0;overflow:hidden">
      <img src="${heroImg}" alt="" style="width:100%;height:100%;object-fit:cover;animation:petZoom 20s ease-in-out infinite alternate" />
      <div style="position:absolute;inset:0;background:linear-gradient(135deg,rgba(28,46,28,0.7) 0%,rgba(28,46,28,0.35) 50%,rgba(28,46,28,0.15) 100%)"></div>
    </div>
    <div style="position:relative;z-index:2;max-width:1100px;margin:0 auto;padding:4rem 3rem;width:100%">
      <div style="max-width:600px">
        <div style="display:inline-flex;align-items:center;gap:0.6rem;background:rgba(255,255,255,0.15);backdrop-filter:blur(8px);padding:0.45rem 1.1rem;border-radius:999px;margin-bottom:1.75rem;border:1px solid rgba(255,255,255,0.25)">
          <span style="font-size:1rem">&#128062;</span>
          <span style="font-family:var(--body-font);font-size:0.72rem;font-weight:600;color:#fff;letter-spacing:0.14em;text-transform:uppercase">${content.heroEyebrow}</span>
        </div>
        <h1 style="font-family:var(--heading-font);font-size:clamp(2.8rem,6vw,5.5rem);font-weight:700;color:#fff;line-height:1.1;margin-bottom:1.25rem">${content.tagline}</h1>
        <p style="font-family:var(--body-font);font-size:1.05rem;color:rgba(255,255,255,0.82);line-height:1.7;max-width:480px;margin-bottom:2.25rem">${content.heroSubtitle}</p>
        <div style="display:flex;align-items:center;gap:1rem;flex-wrap:wrap">
          <a href="#contact" style="font-family:var(--body-font);font-size:0.85rem;font-weight:700;padding:1rem 2.25rem;background:${accentWarm};color:#fff;text-decoration:none;border-radius:999px;letter-spacing:0.06em;transition:transform 0.2s,opacity 0.2s">${content.ctaPrimary}</a>
          <a href="#services" style="font-family:var(--body-font);font-size:0.85rem;font-weight:600;padding:1rem 2.25rem;background:rgba(255,255,255,0.15);backdrop-filter:blur(8px);color:#fff;text-decoration:none;border-radius:999px;border:1.5px solid rgba(255,255,255,0.4);letter-spacing:0.06em">${content.ctaSecondary || 'Our Services'}</a>
        </div>
      </div>
    </div>
    <div style="position:absolute;bottom:3rem;right:3rem;background:rgba(255,255,255,0.9);backdrop-filter:blur(12px);border-radius:20px;padding:1.5rem 2rem;display:flex;align-items:center;gap:2rem">
      ${content.stats.slice(0, 2).map(s => `
      <div style="text-align:center">
        <div style="font-family:var(--heading-font);font-size:1.75rem;font-weight:700;color:${accentGreen}">${s.value}</div>
        <div style="font-family:var(--body-font);font-size:0.7rem;color:${textMuted};letter-spacing:0.1em;text-transform:uppercase;margin-top:0.2rem">${s.label}</div>
      </div>`).join(`<span style="display:block;width:1px;height:40px;background:${bgSage}"></span>`)}
    </div>
  </section>
  <style>@keyframes petZoom{0%{transform:scale(1)}100%{transform:scale(1.06) translateX(-1%)}}</style>`

  // ABOUT — warm split: rounded photo left with playful offset, story right
  const aboutSection = `
  <section id="about" style="padding:120px 0;background:${bgWarm}">
    <div class="ms-grid" style="max-width:1180px;margin:0 auto;padding:0 3rem;display:grid;grid-template-columns:1fr 1fr;gap:6rem;align-items:center">
      <div style="position:relative">
        <div style="border-radius:32px;overflow:hidden;aspect-ratio:4/5">
          <img src="${aboutImg}" alt="" style="width:100%;height:100%;object-fit:cover" />
        </div>
        <div style="position:absolute;bottom:-1.5rem;right:-1.5rem;width:140px;height:140px;border-radius:24px;overflow:hidden;border:4px solid ${bgWarm};box-shadow:0 8px 32px rgba(74,124,78,0.2)">
          <img src="${stockPool[1]}" alt="" style="width:100%;height:100%;object-fit:cover" />
        </div>
        <div style="position:absolute;top:2rem;left:-1.5rem;background:${accentYellow};border-radius:16px;padding:1rem 1.25rem;box-shadow:0 4px 20px rgba(232,184,75,0.3)">
          <div style="font-family:var(--heading-font);font-size:1.4rem;font-weight:700;color:${textDark}">${content.stats[2]?.value || '5★'}</div>
          <div style="font-family:var(--body-font);font-size:0.68rem;color:${textMid};letter-spacing:0.08em;text-transform:uppercase;margin-top:0.1rem">${content.stats[2]?.label || 'Rating'}</div>
        </div>
      </div>
      <div>
        <div style="display:inline-flex;align-items:center;gap:0.6rem;background:${bgSage};padding:0.4rem 1.1rem;border-radius:999px;margin-bottom:1.5rem">
          <span style="font-family:var(--body-font);font-size:0.7rem;font-weight:700;color:${accentGreen};letter-spacing:0.14em;text-transform:uppercase">${content.badge || 'About Us'}</span>
        </div>
        <h2 style="font-family:var(--heading-font);font-size:clamp(2rem,4vw,3.2rem);font-weight:700;color:${textDark};line-height:1.15;margin-bottom:1.25rem">${content.aboutHeading}</h2>
        ${content.aboutMission ? `<p style="font-family:var(--body-font);font-size:1.05rem;color:${textMid};font-weight:600;line-height:1.7;margin-bottom:1.25rem">${content.aboutMission}</p>` : ''}
        ${content.aboutText.split('\n').filter(p => p.trim()).map(p => `<p style="font-family:var(--body-font);font-size:0.95rem;color:${textMuted};line-height:1.85;margin-bottom:0.9rem">${p}</p>`).join('')}
        <div style="display:flex;gap:2.5rem;margin-top:2.5rem;padding:1.75rem;background:${bgSage};border-radius:20px">
          ${content.stats.slice(0, 2).map(s => `
          <div>
            <div style="font-family:var(--heading-font);font-size:2rem;font-weight:700;color:${accentGreen}">${s.value}</div>
            <div style="font-family:var(--body-font);font-size:0.78rem;color:${textMuted};margin-top:0.2rem">${s.label}</div>
          </div>`).join(`<span style="display:block;width:1px;background:rgba(74,124,78,0.2)"></span>`)}
        </div>
      </div>
    </div>
  </section>`

  // SERVICES — playful cards with emoji icons, sage tinted bg
  const servicesSection = `
  <section id="services" style="padding:100px 0;background:${bgSage}">
    <div style="max-width:1200px;margin:0 auto;padding:0 3rem">
      <div style="text-align:center;margin-bottom:3.5rem">
        <div style="display:inline-flex;align-items:center;gap:0.6rem;background:rgba(255,255,255,0.8);padding:0.4rem 1.1rem;border-radius:999px;margin-bottom:1rem">
          <span style="font-family:var(--body-font);font-size:0.7rem;font-weight:700;color:${accentGreen};letter-spacing:0.14em;text-transform:uppercase">${content.heroEyebrow}</span>
        </div>
        <h2 style="font-family:var(--heading-font);font-size:clamp(2rem,4vw,3rem);font-weight:700;color:${textDark};line-height:1.2">${content.servicesHeading}</h2>
      </div>
      <div class="ms-grid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:1.25rem">
        ${content.services.slice(0, 6).map((s, i) => `
        <div style="background:${bgWarm};border-radius:24px;padding:2rem;transition:transform 0.3s,box-shadow 0.3s;cursor:default" onmouseover="this.style.transform='translateY(-4px)';this.style.boxShadow='0 16px 40px rgba(74,124,78,0.12)'" onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='none'">
          <div style="width:60px;height:60px;border-radius:18px;background:${[bgSage,'rgba(196,121,58,0.12)','rgba(74,124,78,0.12)'][i%3]};display:flex;align-items:center;justify-content:center;margin-bottom:1.25rem;font-size:1.5rem">
            ${s.icon || ['&#128062;','&#128049;','&#9999;&#65039;','&#128137;','&#127968;','&#128144;'][i] || '&#128062;'}
          </div>
          <h3 style="font-family:var(--heading-font);font-size:1.1rem;font-weight:700;color:${textDark};margin-bottom:0.6rem">${s.name}</h3>
          <p style="font-family:var(--body-font);font-size:0.88rem;color:${textMuted};line-height:1.7">${s.description}</p>
          <div style="display:flex;flex-wrap:wrap;gap:0.4rem;margin-top:1rem">
            ${s.tags.slice(0,3).map(t => `<span style="font-family:var(--body-font);font-size:0.68rem;font-weight:600;padding:0.25rem 0.75rem;background:${bgSage};border-radius:999px;color:${textMid};letter-spacing:0.06em">${t}</span>`).join('')}
          </div>
        </div>`).join('')}
      </div>
    </div>
  </section>`

  // GALLERY — mosaic grid with rounded corners, warm hover
  const gallerySection = `
  <section id="gallery" style="padding:100px 0;background:${bg}">
    <div style="max-width:1300px;margin:0 auto;padding:0 3rem">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:3rem">
        <h2 style="font-family:var(--heading-font);font-size:clamp(2rem,4vw,3rem);font-weight:700;color:${textDark};line-height:1.15">${content.galleryHeading}</h2>
        <a href="#contact" style="font-family:var(--body-font);font-size:0.82rem;font-weight:600;color:${accentGreen};text-decoration:none;display:flex;align-items:center;gap:0.5rem">Book Now <span>&#8594;</span></a>
      </div>
      <div style="display:grid;grid-template-columns:1.2fr 1fr 1fr;grid-template-rows:260px 260px;gap:12px">
        <div style="grid-row:span 2;border-radius:24px;overflow:hidden">
          <img src="${stockPool[4]}" alt="" style="width:100%;height:100%;object-fit:cover;transition:transform 0.7s ease" onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform='scale(1)'" />
        </div>
        ${[5,6,7,8].map(i => `
        <div style="border-radius:18px;overflow:hidden">
          <img src="${stockPool[i]}" alt="" style="width:100%;height:100%;object-fit:cover;transition:transform 0.7s ease" onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform='scale(1)'" />
        </div>`).join('')}
      </div>
    </div>
  </section>`

  // TESTIMONIALS — 3 warm cards with avatar initials
  const fallbacks = getFallbackTestimonials(content, businessCategory)
  const allTestimonials = [
    ...(content.testimonials || []),
    ...(content.testimonial ? [content.testimonial] : []),
    ...fallbacks
  ].slice(0, 3)

  const testimonialsSection = allTestimonials.length > 0 ? `
  <section style="padding:100px 0;background:${bgWarm}">
    <div style="max-width:1200px;margin:0 auto;padding:0 3rem">
      <div style="text-align:center;margin-bottom:3.5rem">
        <h2 style="font-family:var(--heading-font);font-size:clamp(2rem,4vw,3rem);font-weight:700;color:${textDark};line-height:1.2">Happy Families, Happy Pets</h2>
      </div>
      <div class="ms-grid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem">
        ${allTestimonials.map((t, i) => {
          const avatarColors = [accentGreen, accentWarm, accentYellow]
          const avatarColor = avatarColors[i % 3]
          const initial = t.author ? t.author.charAt(0).toUpperCase() : 'C'
          return `
        <div style="background:${bgWarm};border:1.5px solid rgba(74,124,78,0.1);border-radius:24px;padding:2rem;transition:border-color 0.3s,transform 0.3s" onmouseover="this.style.borderColor='${accentGreen}';this.style.transform='translateY(-3px)'" onmouseout="this.style.borderColor='rgba(74,124,78,0.1)';this.style.transform='translateY(0)'">
          <div style="display:flex;gap:0.2rem;margin-bottom:1.25rem">
            ${[...Array(t.rating || 5)].map(() => `<span style="color:${accentYellow};font-size:0.9rem">&#9733;</span>`).join('')}
          </div>
          <p style="font-family:var(--body-font);font-size:0.92rem;color:${textMuted};line-height:1.75;margin-bottom:1.5rem;font-style:italic">"${t.quote}"</p>
          <div style="display:flex;align-items:center;gap:0.75rem">
            <div style="width:40px;height:40px;border-radius:50%;background:${avatarColor};display:flex;align-items:center;justify-content:center;font-family:var(--heading-font);font-size:0.95rem;font-weight:700;color:#fff;flex-shrink:0">${initial}</div>
            <div style="font-family:var(--body-font);font-size:0.85rem;font-weight:600;color:${textDark}">${t.author}</div>
          </div>
        </div>`
        }).join('')}
      </div>
    </div>
  </section>` : ''

  // CTA BANNER — dark green, playful
  const ctaBanner = `
  <section style="padding:80px 3rem;background:${bgDark};position:relative;overflow:hidden">
    <div style="position:absolute;right:-4rem;top:-4rem;width:300px;height:300px;border-radius:50%;background:rgba(74,124,78,0.15)"></div>
    <div style="position:absolute;left:10%;bottom:-3rem;width:200px;height:200px;border-radius:50%;background:rgba(232,184,75,0.1)"></div>
    <div style="max-width:700px;margin:0 auto;text-align:center;position:relative;z-index:2">
      <div style="font-size:2.5rem;margin-bottom:1rem">&#128062;</div>
      <h2 style="font-family:var(--heading-font);font-size:clamp(2rem,4vw,3rem);font-weight:700;color:#fff;line-height:1.2;margin-bottom:1rem">${content.contactHeading}</h2>
      <p style="font-family:var(--body-font);font-size:1rem;color:rgba(255,255,255,0.65);line-height:1.7;margin-bottom:2.5rem;max-width:480px;margin-left:auto;margin-right:auto">${content.heroSubtitle}</p>
      <a href="#contact" style="display:inline-block;font-family:var(--body-font);font-size:0.85rem;font-weight:700;padding:1rem 2.5rem;background:${accentWarm};color:#fff;text-decoration:none;border-radius:999px;letter-spacing:0.06em;transition:opacity 0.3s">${content.ctaPrimary}</a>
    </div>
  </section>`

  const contactSection = buildContactSection(content, locationInfo)

  const petFooter = `
  <footer style="padding:4rem 3rem 2.5rem;background:${bgDark}">
    <div class="ms-grid" style="max-width:1100px;margin:0 auto;display:grid;grid-template-columns:1.5fr 1fr 1fr 1fr;gap:3rem;margin-bottom:3rem">
      <div>
        <div style="font-family:var(--heading-font);font-size:1.5rem;font-weight:700;color:#fff;margin-bottom:0.75rem">${businessName}</div>
        <p style="font-family:var(--body-font);font-size:0.85rem;color:rgba(255,255,255,0.45);line-height:1.65;max-width:260px">${content.heroSubtitle}</p>
      </div>
      <div>
        <h4 style="font-family:var(--body-font);font-size:0.72rem;font-weight:700;color:rgba(255,255,255,0.5);letter-spacing:0.14em;text-transform:uppercase;margin-bottom:1.25rem">Services</h4>
        ${content.services.slice(0, 4).map(s => `<a href="#services" style="display:block;font-family:var(--body-font);font-size:0.85rem;color:rgba(255,255,255,0.55);text-decoration:none;margin-bottom:0.6rem;transition:color 0.2s" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,0.55)'">${s.name}</a>`).join('')}
      </div>
      <div>
        <h4 style="font-family:var(--body-font);font-size:0.72rem;font-weight:700;color:rgba(255,255,255,0.5);letter-spacing:0.14em;text-transform:uppercase;margin-bottom:1.25rem">Contact</h4>
        <p style="font-family:var(--body-font);font-size:0.85rem;color:rgba(255,255,255,0.55);line-height:1.75">${locationInfo.phone}<br/>hello@${businessName.toLowerCase().replace(/\s+/g, '')}.com</p>
      </div>
      <div>
        <h4 style="font-family:var(--body-font);font-size:0.72rem;font-weight:700;color:rgba(255,255,255,0.5);letter-spacing:0.14em;text-transform:uppercase;margin-bottom:1.25rem">Location</h4>
        <p style="font-family:var(--body-font);font-size:0.85rem;color:rgba(255,255,255,0.55);line-height:1.75">${locationInfo.address}<br/>${locationInfo.city}, ${locationInfo.postcode}</p>
        ${content.contactHours ? `<p style="font-family:var(--body-font);font-size:0.8rem;color:rgba(255,255,255,0.4);margin-top:0.75rem;line-height:1.7">${content.contactHours.replace(/ · /g, '<br/>')}</p>` : ''}
      </div>
    </div>
    <div style="max-width:1100px;margin:0 auto;padding-top:2rem;border-top:1px solid rgba(255,255,255,0.08);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1rem">
      <p style="font-family:var(--body-font);font-size:0.75rem;color:rgba(255,255,255,0.3)">&copy; ${new Date().getFullYear()} ${businessName}. All rights reserved.</p>
      <div style="display:flex;gap:2rem">
        <a href="#" style="font-family:var(--body-font);font-size:0.72rem;color:rgba(255,255,255,0.3);text-decoration:none">Privacy Policy</a>
        <a href="#" style="font-family:var(--body-font);font-size:0.72rem;color:rgba(255,255,255,0.3);text-decoration:none">Terms of Service</a>
      </div>
    </div>
  </footer>`

  return `${headHtml}
  <style>
    :root {
      --bg: ${bg};
      --bg-alt: ${bgSage};
      --card-bg: ${bgWarm};
      --text: ${textDark};
      --text-muted: ${textMuted};
      --border: rgba(74,124,78,0.1);
    }
    body::before {
      content:'';position:fixed;inset:0;pointer-events:none;z-index:999;opacity:0.015;
      background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
      background-size:160px 160px;
    }
    #contact { background:${bgSage} !important; }
  </style>

${customNav}

${heroSection}
${aboutSection}
${servicesSection}
${gallerySection}
${testimonialsSection}
${ctaBanner}
${contactSection}
${petFooter}

</body>
</html>`
}