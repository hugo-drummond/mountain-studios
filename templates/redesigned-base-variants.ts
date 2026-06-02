function buildVisualTemplate(data: TemplateData): string {
  const { content, businessName, businessCategory, primaryColor, secondaryColor, pages, images, stockImages, locationInfo } = data
  const fonts = fontPairings[businessCategory] || fontPairings['other']
  const navFlags = resolveNavLinks(pages)

  const heroImg = images[0] || stockImages.hero
  const stockPool = buildImagePool(images, stockImages, businessName)
  const aboutImg = stockImages.about || stockPool[4]

  const pr = parseInt(primaryColor.slice(1, 3), 16)
  const pg = parseInt(primaryColor.slice(3, 5), 16)
  const pb = parseInt(primaryColor.slice(5, 7), 16)

  const fallbackTestimonials = getFallbackTestimonials(content, businessCategory)

  const servicesSection = `
    <style>
      .vs-svc-item { border-top:1px solid var(--border);padding:2rem 0;cursor:default;transition:background 0.3s }
      .vs-svc-item:last-child { border-bottom:1px solid var(--border) }
      .vs-svc-item:hover { background:rgba(${pr},${pg},${pb},0.04) }
      .vs-num { font-family:var(--heading-font);font-size:4rem;font-weight:400;line-height:1;color:rgba(${pr},${pg},${pb},0.18);float:left;margin-right:1.5rem;margin-top:-0.5rem }
    </style>
    <section id="services" style="padding:120px 0;background:var(--bg-alt)">
      <div style="max-width:1200px;margin:0 auto;padding:0 2rem">
        <div class="ms-grid" style="display:grid;grid-template-columns:1fr 1.1fr;gap:5rem;align-items:start">
          <div>
            <div style="display:flex;align-items:center;gap:1rem;margin-bottom:2rem">
              <div style="width:40px;height:1px;background:var(--primary)"></div>
              <p style="font-family:var(--body-font);font-size:0.75rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--primary);font-weight:600;margin:0">${content.heroEyebrow}</p>
            </div>
            <h2 style="font-family:var(--heading-font);font-size:clamp(2.2rem,4vw,3.5rem);font-weight:400;color:var(--text);line-height:1.15;margin:0 0 2.5rem 0">${content.servicesHeading}</h2>
            <div class="ms-img" style="overflow:hidden;border-radius:4px;height:480px;position:relative">
              <img src="${stockPool[1]}" alt="" style="width:100%;height:100%;object-fit:cover;transition:transform 8s ease" onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform='scale(1)'" />
              <div style="position:absolute;bottom:0;left:0;right:0;height:40%;background:linear-gradient(to top,rgba(0,0,0,0.5),transparent)"></div>
            </div>
          </div>
          <div style="padding-top:5rem">
            ${content.services.map((s, i) => `
              <div class="vs-svc-item" style="padding:2rem 0${i === 0 ? ';border-top:1px solid var(--border)' : ''}">
                <div style="overflow:hidden">
                  <span class="vs-num">${String(i + 1).padStart(2, '0')}</span>
                  <h3 style="font-family:var(--heading-font);font-size:1.5rem;font-weight:400;color:var(--text);margin:0 0 0.75rem 0;line-height:1.2">${s.name}</h3>
                  <p style="font-family:var(--body-font);font-size:0.9rem;color:var(--text-muted);line-height:1.8;margin:0 0 1rem 0;clear:both">${s.description}</p>
                </div>
                <div style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-top:1rem">
                  ${s.tags.map(t => `<span style="font-family:var(--body-font);font-size:0.72rem;padding:0.3rem 0.85rem;border-radius:2px;background:rgba(${pr},${pg},${pb},0.1);color:var(--primary);font-weight:500;letter-spacing:0.03em">${t}</span>`).join('')}
                </div>
              </div>`).join('')}
          </div>
        </div>
      </div>
    </section>`

  const gallerySection = `
    <style>
      .vs-gal { position:relative;overflow:hidden;cursor:pointer }
      .vs-gal img { width:100%;height:100%;object-fit:cover;display:block;transition:transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94) }
      .vs-gal:hover img { transform:scale(1.06) }
      .vs-gal-overlay { position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.7) 0%,transparent 50%);opacity:0;transition:opacity 0.4s }
      .vs-gal:hover .vs-gal-overlay { opacity:1 }
      .vs-gal-label { position:absolute;bottom:1.5rem;left:1.75rem;font-family:var(--body-font);font-size:0.85rem;color:#fff;font-weight:500;letter-spacing:0.05em;opacity:0;transition:opacity 0.4s,transform 0.4s;transform:translateY(8px) }
      .vs-gal:hover .vs-gal-label { opacity:1;transform:translateY(0) }
    </style>
    <section id="gallery" style="padding:0;background:var(--bg)">
      <div style="max-width:1200px;margin:0 auto;padding:80px 2rem 0">
        <div style="display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:3rem">
          <h2 style="font-family:var(--heading-font);font-size:clamp(2rem,4vw,3rem);font-weight:400;color:var(--text);line-height:1.15;margin:0;max-width:500px">${content.galleryHeading}</h2>
          <a href="#contact" style="font-family:var(--body-font);font-size:0.8rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--primary);text-decoration:none;font-weight:600;white-space:nowrap;padding-bottom:0.25rem;border-bottom:1px solid var(--primary)">${content.ctaPrimary} &rarr;</a>
        </div>
      </div>
      <div style="max-width:1200px;margin:0 auto;padding:0 2rem 80px">
        <div class="ms-grid" style="display:grid;grid-template-columns:1.65fr 1fr;grid-template-rows:340px 260px;gap:8px">
          <div class="vs-gal" style="grid-row:1/3;border-radius:4px 0 0 4px">
            <img src="${stockPool[8]}" alt="Gallery" />
            <div class="vs-gal-overlay"></div>
            <div class="vs-gal-label">${content.heroEyebrow}</div>
          </div>
          <div class="vs-gal" style="border-radius:0 4px 0 0">
            <img src="${stockPool[9]}" alt="Gallery" />
            <div class="vs-gal-overlay"></div>
            <div class="vs-gal-label">${businessName}</div>
          </div>
          <div class="vs-gal" style="border-radius:0 0 4px 0">
            <img src="${stockPool[10]}" alt="Gallery" />
            <div class="vs-gal-overlay"></div>
            <div class="vs-gal-label">${content.servicesHeading}</div>
          </div>
        </div>
        <div class="ms-grid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:8px">
          ${[stockPool[11], stockPool[12], stockPool[13]].map((img, i) => `
          <div class="vs-gal" style="height:200px;border-radius:4px">
            <img src="${img}" alt="Gallery" />
            <div class="vs-gal-overlay"></div>
          </div>`).join('')}
        </div>
      </div>
    </section>`

  const testimonialsSection = `
    <section style="padding:100px 0;background:var(--bg-alt);overflow:hidden">
      <div style="max-width:1200px;margin:0 auto;padding:0 2rem">
        <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1.5rem">
          <div style="width:40px;height:1px;background:var(--primary)"></div>
          <p style="font-family:var(--body-font);font-size:0.75rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--primary);font-weight:600;margin:0">What Clients Say</p>
        </div>
        <div class="ms-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:start">
          ${content.testimonial ? `
          <div style="position:relative;padding:3rem;background:rgba(${pr},${pg},${pb},0.06);border-radius:4px;border-left:3px solid var(--primary)">
            <div style="font-family:var(--heading-font);font-size:5rem;line-height:0.8;color:var(--primary);opacity:0.3;position:absolute;top:2rem;left:2.5rem">&ldquo;</div>
            <p style="font-family:var(--heading-font);font-size:clamp(1.1rem,2vw,1.35rem);font-weight:400;color:var(--text);line-height:1.65;font-style:italic;margin:1.5rem 0 1.5rem;position:relative;z-index:1">"${content.testimonial.quote}"</p>
            <div style="display:flex;align-items:center;gap:1rem">
              <div style="width:36px;height:1px;background:var(--border)"></div>
              <p style="font-family:var(--body-font);font-size:0.8rem;color:var(--text-muted);letter-spacing:0.08em;text-transform:uppercase;font-weight:500;margin:0">${content.testimonial.author}</p>
            </div>
            ${content.testimonial.rating ? `<div style="color:var(--primary);font-size:0.9rem;margin-top:1rem;letter-spacing:0.15em">${'&#9733;'.repeat(content.testimonial.rating)}</div>` : ''}
          </div>` : ''}
          <div style="display:flex;flex-direction:column;gap:2rem">
            ${fallbackTestimonials.slice(0, 2).map(t => `
            <div style="padding:2rem;background:var(--card-bg);border-radius:4px;border:1px solid var(--border)">
              <div style="color:var(--primary);font-size:0.85rem;letter-spacing:0.15em;margin-bottom:1rem">${'&#9733;'.repeat(t.rating)}</div>
              <p style="font-family:var(--body-font);font-size:0.95rem;color:var(--text);line-height:1.75;font-style:italic;margin:0 0 1.25rem">"${t.quote}"</p>
              <p style="font-family:var(--body-font);font-size:0.78rem;color:var(--text-muted);letter-spacing:0.08em;text-transform:uppercase;font-weight:500;margin:0">${t.author}</p>
            </div>`).join('')}
          </div>
        </div>
      </div>
    </section>`

  const headHtml = buildHead(businessName, fonts, primaryColor, secondaryColor)

  return `${headHtml}
<style>
  @keyframes vs-kenburns { 0% { transform:scale(1) translate(0,0) } 100% { transform:scale(1.08) translate(-1%,-0.5%) } }
  @keyframes vs-fadeup { from { opacity:0;transform:translateY(28px) } to { opacity:1;transform:translateY(0) } }
  .vs-fade-1 { animation:vs-fadeup 0.9s ease 0.1s both }
  .vs-fade-2 { animation:vs-fadeup 0.9s ease 0.3s both }
  .vs-fade-3 { animation:vs-fadeup 0.9s ease 0.5s both }
  .vs-fade-4 { animation:vs-fadeup 0.9s ease 0.7s both }
  .vs-fade-5 { animation:vs-fadeup 0.9s ease 0.9s both }
  .vs-hero-bg { animation:vs-kenburns 18s ease-out forwards }
  body::before { content:'';position:fixed;inset:0;pointer-events:none;z-index:9999;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");opacity:0.4 }
  .reveal { opacity:0;transform:translateY(24px);transition:opacity 0.7s ease,transform 0.7s ease }
  .reveal.visible { opacity:1;transform:translateY(0) }
  #custom-cursor-dot { width:6px;height:6px;background:var(--primary);border-radius:50%;position:fixed;pointer-events:none;z-index:10000;transform:translate(-50%,-50%);transition:opacity 0.3s }
  #custom-cursor-ring { width:32px;height:32px;border:1.5px solid rgba(${pr},${pg},${pb},0.5);border-radius:50%;position:fixed;pointer-events:none;z-index:9999;transform:translate(-50%,-50%);transition:width 0.2s,height 0.2s }
</style>
<div id="custom-cursor-dot"></div>
<div id="custom-cursor-ring"></div>

${buildStandardNav(businessName, content, navFlags)}

  <!-- Hero: full-bleed Ken Burns, eyebrow with flanking lines, massive serif h1 -->
  <section style="position:relative;min-height:calc(100vh - 64px);display:flex;align-items:center;overflow:hidden">
    <div style="position:absolute;inset:0;overflow:hidden">
      <img src="${heroImg}" alt="" class="vs-hero-bg" style="width:100%;height:100%;object-fit:cover" />
      <div style="position:absolute;inset:0;background:linear-gradient(110deg,rgba(0,0,0,0.88) 0%,rgba(0,0,0,0.55) 55%,rgba(0,0,0,0.7) 100%)"></div>
    </div>
    <div style="position:relative;max-width:1200px;margin:0 auto;padding:7rem 2rem 4rem;width:100%">
      ${content.badge ? `<div class="vs-fade-1" style="display:inline-flex;align-items:center;gap:0.5rem;font-family:var(--body-font);font-size:0.72rem;letter-spacing:0.12em;padding:0.45rem 1.1rem;border-radius:2px;background:rgba(${pr},${pg},${pb},0.15);border:1px solid rgba(${pr},${pg},${pb},0.35);color:rgba(255,255,255,0.9);margin-bottom:2rem;text-transform:uppercase">${content.badge}</div>` : ''}
      <div class="vs-fade-1" style="display:flex;align-items:center;gap:1.25rem;margin-bottom:2rem">
        <div style="width:48px;height:1px;background:var(--primary)"></div>
        <p style="font-family:var(--body-font);font-size:0.75rem;letter-spacing:0.22em;text-transform:uppercase;color:var(--primary);font-weight:600;margin:0">${content.heroEyebrow}</p>
        <div style="width:48px;height:1px;background:var(--primary)"></div>
      </div>
      <h1 class="vs-fade-2" style="font-family:var(--heading-font);font-size:clamp(3.2rem,7vw,6rem);font-weight:400;color:#f5f5f0;line-height:1.02;margin:0 0 1.75rem;max-width:780px;letter-spacing:-0.01em">${content.tagline}</h1>
      <p class="vs-fade-3" style="font-family:var(--body-font);font-size:1.1rem;color:rgba(245,245,240,0.72);max-width:500px;line-height:1.8;margin:0 0 ${content.heroAccent ? '1.25rem' : '2.75rem'}">${content.heroSubtitle}</p>
      ${content.heroAccent ? `<p class="vs-fade-3" style="font-family:var(--body-font);font-size:1.1rem;color:var(--primary);font-weight:600;margin:0 0 2.75rem;letter-spacing:0.01em">${content.heroAccent}</p>` : ''}
      <div class="vs-fade-4" style="display:flex;gap:1rem;align-items:center;flex-wrap:wrap">
        <a href="#contact" style="font-family:var(--body-font);font-size:0.9rem;font-weight:600;padding:1rem 2.75rem;background:var(--primary);color:#fff;border-radius:2px;text-decoration:none;letter-spacing:0.04em;transition:opacity 0.2s">${content.ctaPrimary}</a>
        <a href="#services" style="font-family:var(--body-font);font-size:0.9rem;font-weight:500;padding:1rem 2.25rem;background:transparent;color:#f5f5f0;border:1px solid rgba(255,255,255,0.28);border-radius:2px;text-decoration:none;transition:all 0.2s">${content.ctaSecondary}</a>
      </div>
      ${content.ctaNote ? `<p class="vs-fade-5" style="font-family:var(--body-font);font-size:0.78rem;color:rgba(255,255,255,0.42);margin-top:1.25rem">${content.ctaNote}</p>` : ''}
    </div>
    <!-- Hero bottom stat strip -->
    <div style="position:absolute;bottom:0;left:0;right:0;background:rgba(0,0,0,0.55);backdrop-filter:blur(12px);border-top:1px solid rgba(255,255,255,0.07)">
      <div style="max-width:1200px;margin:0 auto;padding:0 2rem;display:flex;gap:0">
        ${content.stats.slice(0, 4).map((s, i) => `
        <div style="flex:1;padding:1.5rem 2rem;${i > 0 ? 'border-left:1px solid rgba(255,255,255,0.08)' : ''}">
          <div style="font-family:var(--heading-font);font-size:2rem;font-weight:400;color:#f5f5f0;line-height:1">${s.value}</div>
          <div style="font-family:var(--body-font);font-size:0.78rem;color:rgba(245,245,240,0.55);margin-top:0.35rem;letter-spacing:0.04em">${s.label}</div>
        </div>`).join('')}
      </div>
    </div>
  </section>

  ${servicesSection}
  ${gallerySection}
  ${testimonialsSection}

  <!-- About -->
  <section id="about" style="padding:120px 0;background:var(--bg)">
    <div style="max-width:1200px;margin:0 auto;padding:0 2rem">
      <div class="ms-grid" style="display:grid;grid-template-columns:1fr 1.2fr;gap:5rem;align-items:start">
        <div class="reveal">
          <div style="position:relative;display:inline-block;width:100%">
            <div class="ms-img" style="overflow:hidden;border-radius:4px;height:540px">
              <img src="${aboutImg}" alt="" style="width:100%;height:100%;object-fit:cover" />
            </div>
            <div style="position:absolute;bottom:-1.5rem;right:-1.5rem;width:120px;height:120px;border:2px solid var(--primary);border-radius:2px;z-index:-1"></div>
          </div>
        </div>
        <div class="reveal">
          <div style="display:flex;align-items:center;gap:1rem;margin-bottom:2rem">
            <div style="width:40px;height:1px;background:var(--primary)"></div>
            <p style="font-family:var(--body-font);font-size:0.75rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--primary);font-weight:600;margin:0">Our Story</p>
          </div>
          <h2 style="font-family:var(--heading-font);font-size:clamp(2rem,3.5vw,2.8rem);font-weight:400;color:var(--text);line-height:1.2;margin:0 0 1.75rem">${content.aboutHeading}</h2>
          ${content.aboutMission ? `<p style="font-family:var(--heading-font);font-size:1.1rem;color:var(--text);line-height:1.65;font-style:italic;margin:0 0 1.5rem;padding-left:1.25rem;border-left:2px solid var(--primary)">${content.aboutMission}</p>` : ''}
          ${content.aboutText.split('\n').filter(p => p.trim()).map(p => `<p style="font-family:var(--body-font);font-size:0.95rem;color:var(--text-muted);line-height:1.85;margin:0 0 1rem">${p}</p>`).join('')}
          <div class="ms-grid" style="display:grid;grid-template-columns:repeat(2,1fr);gap:2rem;margin-top:3rem;padding-top:2.5rem;border-top:1px solid var(--border)">
            ${content.stats.slice(0, 4).map(s => `
            <div>
              <div style="font-family:var(--heading-font);font-size:2.2rem;font-weight:400;color:var(--text);line-height:1">${s.value}</div>
              <div style="font-family:var(--body-font);font-size:0.8rem;color:var(--text-muted);margin-top:0.35rem;letter-spacing:0.04em">${s.label}</div>
              ${s.sublabel ? `<div style="font-family:var(--body-font);font-size:0.72rem;color:var(--text-muted);opacity:0.6;margin-top:0.15rem">${s.sublabel}</div>` : ''}
            </div>`).join('')}
          </div>
        </div>
      </div>
    </div>
  </section>

  ${buildContactSection(content, locationInfo)}

${buildFooter(businessName, content)}

<script>
  // Scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible') }), { threshold: 0.12 });
  revealEls.forEach(el => obs.observe(el));
  // Custom cursor
  const dot = document.getElementById('custom-cursor-dot');
  const ring = document.getElementById('custom-cursor-ring');
  let rx = 0, ry = 0;
  document.addEventListener('mousemove', e => {
    dot.style.left = e.clientX + 'px'; dot.style.top = e.clientY + 'px';
    rx += (e.clientX - rx) * 0.12; ry += (e.clientY - ry) * 0.12;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
  });
  requestAnimationFrame(function loop() { rx += (parseFloat(dot.style.left||0) - rx) * 0.12; ry += (parseFloat(dot.style.top||0) - ry) * 0.12; ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; requestAnimationFrame(loop); });
</script>
</body>
</html>`
}

// ---------- Service Template (icon cards, process section) ----------
// Light theme for most service businesses; dark for tech-digital
function buildServiceTemplate(data: TemplateData): string {
  const { content, businessName, businessCategory, primaryColor, secondaryColor, pages, images, stockImages, locationInfo } = data
  const fonts = fontPairings[businessCategory] || fontPairings['other']
  const navFlags = resolveNavLinks(pages)
  const theme: Theme = businessCategory === 'tech-digital' ? 'dark' : 'light'

  const defaultServiceIcons = ['&#9670;', '&#9674;', '&#9656;', '&#9632;', '&#9678;', '&#9733;']
  const iconMap: Record<string, string> = {
    droplet: '&#128167;', flame: '&#128293;', tool: '&#9874;', zap: '&#9889;', cpu: '&#9881;',
    sun: '&#9728;', home: '&#8962;', shield: '&#128737;', layers: '&#9776;', grid: '&#9638;',
    box: '&#9634;', star: '&#9733;', maximize: '&#10697;', map: '&#9873;', edit: '&#9998;',
    'edit-2': '&#9998;', square: '&#9633;', key: '&#128273;', lock: '&#128274;', truck: '&#128666;',
    'trash-2': '&#9249;', wind: '&#127788;', settings: '&#9881;', 'chevrons-down': '&#8650;',
    'cloud-rain': '&#127783;', 'battery-charging': '&#128267;', 'align-left': '&#9776;',
    'file-text': '&#128196;', book: '&#128214;', users: '&#128101;', target: '&#9678;',
    'trending-up': '&#8599;', 'trending-down': '&#8600;', clock: '&#128336;', briefcase: '&#128188;',
    camera: '&#128247;', mic: '&#127908;', user: '&#128100;', 'user-check': '&#128100;',
    award: '&#127942;', 'check-square': '&#9745;', 'check-circle': '&#10004;', stamp: '&#128203;',
    package: '&#128230;', send: '&#10148;', scissors: '&#9986;', feather: '&#10047;',
    thermometer: '&#127777;', video: '&#128249;', 'alert-triangle': '&#9888;',
    activity: '&#9829;', 'bar-chart-2': '&#128200;', circle: '&#9679;', 'credit-card': '&#128179;',
    'edit-3': '&#9998;', globe: '&#127760;', 'message-circle': '&#128172;', monitor: '&#128187;',
    repeat: '&#128257;', 'shopping-cart': '&#128722;', smartphone: '&#128241;',
    clipboard: '&#128203;', film: '&#127902;', play: '&#9654;', radio: '&#128251;',
    'refresh-cw': '&#128260;', sliders: '&#9776;',
  }

  const pr = parseInt(primaryColor.slice(1, 3), 16)
  const pg = parseInt(primaryColor.slice(3, 5), 16)
  const pb = parseInt(primaryColor.slice(5, 7), 16)

  const stockPool = buildImagePool(images, stockImages, businessName)
  const fallbackTestimonials = getFallbackTestimonials(content, businessCategory)

  const isProfessionalCategory = businessCategory === 'professional'
  const showProcessSection = !isProfessionalCategory

  const steps = content.processSteps || [
    { step: '1', title: 'Get in Touch', description: 'Reach out and tell us what you need' },
    { step: '2', title: 'We Plan', description: 'We create a tailored approach for your project' },
    { step: '3', title: 'We Deliver', description: 'Professional execution with quality guaranteed' },
  ]

  const tileLabels = ['Who We Are', 'Our Approach', 'Our Work', 'Our Team']
  const tileImgs = [
    stockImages.cards[7] || stockImages.hero,
    stockImages.cards[8] || stockImages.cards[0],
    stockImages.cards[9] || stockImages.cards[1],
    stockImages.cards[10] || stockImages.cards[2],
  ]
  const statIcons = ['&#9878;', '&#9734;', '&#9823;']

  const servicesSection = `
    <style>
      .svc-card { transition:transform 0.3s ease,box-shadow 0.3s ease }
      .svc-card:hover { transform:translateY(-4px);box-shadow:0 12px 40px rgba(${pr},${pg},${pb},0.15) !important }
    </style>
    <section id="services" style="padding:110px 0;background:var(--bg-alt)">
      <div style="max-width:1200px;margin:0 auto;padding:0 2rem">
        <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1.5rem">
          <div style="width:32px;height:2px;background:var(--primary);border-radius:1px"></div>
          <p style="font-family:var(--body-font);font-size:0.75rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--primary);font-weight:700;margin:0">${content.heroEyebrow}</p>
        </div>
        <div style="display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:3.5rem;gap:2rem">
          <h2 style="font-family:var(--heading-font);font-size:clamp(2rem,4vw,3rem);font-weight:400;color:var(--text);line-height:1.15;margin:0;max-width:550px">${content.servicesHeading}</h2>
          <a href="#contact" style="font-family:var(--body-font);font-size:0.8rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:var(--primary);text-decoration:none;white-space:nowrap;flex-shrink:0">${content.ctaPrimary} &rarr;</a>
        </div>
        <div class="ms-flex" style="display:flex;align-items:stretch;gap:1rem">
          ${content.services.map((s, i) => `${i > 0 ? `
            <div class="ms-arrow" style="display:flex;align-items:center;flex-shrink:0;padding:0 0.25rem;opacity:0.35">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="var(--text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>` : ''}
            <div class="svc-card" style="flex:1;${theme === 'light' ? 'background:#fff;box-shadow:0 2px 16px rgba(0,0,0,0.06);border:1px solid rgba(0,0,0,0.05)' : 'background:var(--card-bg);border:1px solid var(--border)'};border-radius:3px;padding:2.5rem 2rem;position:relative;overflow:hidden">
              <div style="position:absolute;top:0;left:0;right:0;height:3px;background:rgba(${pr},${pg},${pb},${i === 0 ? '1' : '0.3'})"></div>
              <div style="width:56px;height:56px;border-radius:3px;background:rgba(${pr},${pg},${pb},0.1);display:flex;align-items:center;justify-content:center;margin-bottom:1.75rem">
                <span style="font-size:1.5rem;color:var(--primary)">${s.icon ? (iconMap[s.icon] || defaultServiceIcons[i] || defaultServiceIcons[0]) : (defaultServiceIcons[i] || defaultServiceIcons[0])}</span>
              </div>
              <div style="font-family:var(--body-font);font-size:0.65rem;letter-spacing:0.2em;color:var(--text-muted);font-weight:600;text-transform:uppercase;margin-bottom:0.75rem">0${i + 1}</div>
              <h3 style="font-family:var(--heading-font);font-size:1.2rem;font-weight:600;color:var(--text);margin:0 0 0.85rem;line-height:1.25">${s.name}</h3>
              <p style="font-family:var(--body-font);font-size:0.88rem;color:var(--text-muted);line-height:1.8;margin:0">${s.description}</p>
            </div>`).join('')}
        </div>
      </div>
    </section>`

  const professionalSection = !isProfessionalCategory ? '' : `
    <section style="padding:0;background:var(--bg)">
      <div class="ms-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:3px;background:var(--border)">
        ${tileImgs.map((img, i) => `
        <div class="ms-img" style="position:relative;height:300px;overflow:hidden">
          <img src="${img}" alt="" style="width:100%;height:100%;object-fit:cover;transition:transform 0.6s ease" onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform='scale(1)'" />
          <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.65) 0%,transparent 60%)"></div>
          <div style="position:absolute;bottom:1.5rem;left:1.75rem;font-family:var(--body-font);font-size:0.72rem;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#fff;padding:0.5rem 1rem;background:rgba(${pr},${pg},${pb},0.9);border-radius:2px">${tileLabels[i]}</div>
        </div>`).join('')}
      </div>
      <div style="background:var(--bg-alt);border-top:3px solid var(--primary);padding:70px 2rem">
        <div class="ms-grid" style="max-width:1200px;margin:0 auto;display:grid;grid-template-columns:repeat(${Math.min(content.stats.length, 3)},1fr);gap:0">
          ${content.stats.slice(0, 3).map((s, i) => `
          <div style="text-align:center;padding:2rem 3rem;${i > 0 ? 'border-left:1px solid var(--border)' : ''}">
            <div style="font-size:1.75rem;color:var(--primary);margin-bottom:0.75rem">${statIcons[i % statIcons.length]}</div>
            <div style="font-family:var(--heading-font);font-size:clamp(2rem,3.5vw,2.8rem);font-weight:400;color:var(--text);margin-bottom:0.4rem;line-height:1">${s.value}</div>
            <div style="font-family:var(--body-font);font-size:0.82rem;font-weight:600;color:var(--text);letter-spacing:0.05em">${s.label}</div>
            ${s.sublabel ? `<div style="font-family:var(--body-font);font-size:0.75rem;color:var(--text-muted);margin-top:0.3rem">${s.sublabel}</div>` : ''}
          </div>`).join('')}
        </div>
      </div>
    </section>`

  const processSection = isProfessionalCategory ? professionalSection : !showProcessSection ? '' : `
    <section id="gallery" style="padding:110px 0;background:var(--bg)">
      <div style="max-width:1200px;margin:0 auto;padding:0 2rem">
        <div style="text-align:center;margin-bottom:4rem">
          <div style="display:inline-flex;align-items:center;gap:1rem;margin-bottom:1.5rem">
            <div style="width:32px;height:1px;background:var(--primary)"></div>
            <p style="font-family:var(--body-font);font-size:0.75rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--primary);font-weight:600;margin:0">${content.stepsHeading || 'How It Works'}</p>
            <div style="width:32px;height:1px;background:var(--primary)"></div>
          </div>
          <h2 style="font-family:var(--heading-font);font-size:clamp(2rem,3.5vw,2.75rem);font-weight:400;color:var(--text);margin:0 0 1rem;line-height:1.2">A Simple, Proven Process</h2>
          <p style="font-family:var(--body-font);font-size:0.95rem;color:var(--text-muted);max-width:460px;margin:0 auto;line-height:1.7">Straightforward from first contact to final delivery — no surprises.</p>
        </div>
        <div class="ms-flex" style="display:flex;align-items:stretch;gap:0;position:relative">
          <div style="position:absolute;top:36px;left:0;right:0;height:1px;background:var(--border);z-index:0"></div>
          ${steps.map((s, i) => `${i > 0 ? `
            <div class="ms-arrow" style="display:flex;align-items:flex-start;flex-shrink:0;padding:0 0.5rem;margin-top:24px;z-index:1">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="var(--primary)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>` : ''}
            <div style="flex:1;${theme === 'light' ? 'background:#fff;box-shadow:0 2px 12px rgba(0,0,0,0.05);border:1px solid rgba(0,0,0,0.06)' : 'background:var(--card-bg);border:1px solid var(--border)'};border-radius:3px;padding:2.5rem 1.75rem;text-align:center;position:relative;z-index:1">
              <div style="width:72px;height:72px;border-radius:50%;background:var(--primary);display:flex;align-items:center;justify-content:center;margin:0 auto 1.5rem;box-shadow:0 4px 16px rgba(${pr},${pg},${pb},0.3)">
                <span style="font-family:var(--heading-font);font-size:1.5rem;font-weight:700;color:#fff">${s.step}</span>
              </div>
              <h3 style="font-family:var(--heading-font);font-size:1.15rem;font-weight:700;color:var(--text);margin:0 0 0.75rem">${s.title}</h3>
              <p style="font-family:var(--body-font);font-size:0.88rem;color:var(--text-muted);line-height:1.75;margin:0">${s.description}</p>
            </div>`).join('')}
        </div>
      </div>
    </section>`

  const testimonialsSection = `
    <section style="padding:100px 0;background:var(--bg-alt)">
      <div style="max-width:1200px;margin:0 auto;padding:0 2rem">
        <div style="display:flex;align-items:center;gap:1rem;margin-bottom:3rem">
          <div style="width:32px;height:2px;background:var(--primary);border-radius:1px"></div>
          <p style="font-family:var(--body-font);font-size:0.75rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--primary);font-weight:700;margin:0">Client Feedback</p>
        </div>
        <div class="ms-grid" style="display:grid;grid-template-columns:repeat(${Math.min(fallbackTestimonials.length + (content.testimonial ? 1 : 0), 3)},1fr);gap:1.5rem">
          ${content.testimonial ? `
          <div style="${theme === 'light' ? 'background:#fff;box-shadow:0 4px 24px rgba(0,0,0,0.07);border:1px solid rgba(0,0,0,0.05)' : 'background:var(--card-bg);border:1px solid var(--border)'};border-radius:3px;padding:2.5rem;position:relative;overflow:hidden">
            <div style="position:absolute;top:0;left:0;right:0;height:3px;background:var(--primary)"></div>
            <div style="font-size:0.9rem;color:var(--primary);letter-spacing:0.15em;margin-bottom:1.25rem">${'&#9733;'.repeat(content.testimonial.rating || 5)}</div>
            <p style="font-family:var(--heading-font);font-size:1rem;color:var(--text);line-height:1.75;font-style:italic;margin:0 0 1.5rem">"${content.testimonial.quote}"</p>
            <div style="display:flex;align-items:center;gap:0.75rem;padding-top:1.25rem;border-top:1px solid var(--border)">
              <div style="width:8px;height:8px;border-radius:50%;background:var(--primary)"></div>
              <p style="font-family:var(--body-font);font-size:0.78rem;color:var(--text-muted);letter-spacing:0.06em;font-weight:600;margin:0;text-transform:uppercase">${content.testimonial.author}</p>
            </div>
          </div>` : ''}
          ${fallbackTestimonials.slice(0, 2).map(t => `
          <div style="${theme === 'light' ? 'background:#fff;box-shadow:0 4px 24px rgba(0,0,0,0.07);border:1px solid rgba(0,0,0,0.05)' : 'background:var(--card-bg);border:1px solid var(--border)'};border-radius:3px;padding:2.5rem">
            <div style="font-size:0.9rem;color:var(--primary);letter-spacing:0.15em;margin-bottom:1.25rem">${'&#9733;'.repeat(t.rating)}</div>
            <p style="font-family:var(--body-font);font-size:0.95rem;color:var(--text);line-height:1.8;font-style:italic;margin:0 0 1.5rem">"${t.quote}"</p>
            <div style="display:flex;align-items:center;gap:0.75rem;padding-top:1.25rem;border-top:1px solid var(--border)">
              <div style="width:8px;height:8px;border-radius:50%;background:rgba(${pr},${pg},${pb},0.4)"></div>
              <p style="font-family:var(--body-font);font-size:0.78rem;color:var(--text-muted);letter-spacing:0.06em;font-weight:600;margin:0;text-transform:uppercase">${t.author}</p>
            </div>
          </div>`).join('')}
        </div>
      </div>
    </section>`

  const headHtml = buildHead(businessName, fonts, primaryColor, secondaryColor, theme)

  return `${headHtml}
<style>
  @keyframes svc-fadeup { from { opacity:0;transform:translateY(24px) } to { opacity:1;transform:translateY(0) } }
  .svc-fade-1 { animation:svc-fadeup 0.8s ease 0.1s both }
  .svc-fade-2 { animation:svc-fadeup 0.8s ease 0.25s both }
  .svc-fade-3 { animation:svc-fadeup 0.8s ease 0.4s both }
  .svc-fade-4 { animation:svc-fadeup 0.8s ease 0.55s both }
  .svc-fade-5 { animation:svc-fadeup 0.8s ease 0.7s both }
  body::before { content:'';position:fixed;inset:0;pointer-events:none;z-index:9999;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");opacity:0.35 }
  .reveal { opacity:0;transform:translateY(20px);transition:opacity 0.65s ease,transform 0.65s ease }
  .reveal.visible { opacity:1;transform:translateY(0) }
  #custom-cursor-dot { width:5px;height:5px;background:var(--primary);border-radius:50%;position:fixed;pointer-events:none;z-index:10000;transform:translate(-50%,-50%) }
  #custom-cursor-ring { width:28px;height:28px;border:1.5px solid rgba(${pr},${pg},${pb},0.45);border-radius:50%;position:fixed;pointer-events:none;z-index:9999;transform:translate(-50%,-50%);transition:width 0.2s,height 0.2s }
</style>
<div id="custom-cursor-dot"></div>
<div id="custom-cursor-ring"></div>

${buildStandardNav(businessName, content, navFlags)}

  <!-- Hero -->
  <section style="position:relative;min-height:calc(92vh - 64px);display:flex;align-items:center;overflow:hidden;background:${theme === 'dark' ? 'var(--bg)' : '#0a0a0a'}">
    <div style="position:absolute;inset:0">
      <img src="${images[0] || stockImages.hero}" alt="" style="width:100%;height:100%;object-fit:cover;opacity:${theme === 'dark' ? '0.25' : '0.35'}" />
      <div style="position:absolute;inset:0;background:linear-gradient(120deg,rgba(0,0,0,0.92) 0%,rgba(0,0,0,0.7) 50%,rgba(0,0,0,0.85) 100%)"></div>
    </div>
    <!-- Left accent bar -->
    <div style="position:absolute;left:0;top:0;bottom:0;width:4px;background:var(--primary)"></div>
    <div style="position:relative;max-width:1200px;margin:0 auto;padding:7rem 2rem 5rem;width:100%">
      ${content.badge ? `<div class="svc-fade-1" style="display:inline-flex;align-items:center;gap:0.5rem;font-family:var(--body-font);font-size:0.7rem;letter-spacing:0.15em;padding:0.4rem 1rem;border-radius:2px;background:rgba(${pr},${pg},${pb},0.12);border:1px solid rgba(${pr},${pg},${pb},0.3);color:rgba(255,255,255,0.85);margin-bottom:2rem;text-transform:uppercase;font-weight:600">${content.badge}</div>` : ''}
      <p class="svc-fade-1" style="font-family:var(--body-font);font-size:0.75rem;letter-spacing:0.22em;text-transform:uppercase;color:var(--primary-on-dark);margin-bottom:1.5rem;font-weight:700">${content.heroEyebrow}</p>
      <h1 class="svc-fade-2" style="font-family:var(--heading-font);font-size:clamp(3rem,6.5vw,5.5rem);font-weight:400;color:#f5f5f0;line-height:1.02;margin:0 0 1.75rem;max-width:750px">${content.tagline}</h1>
      <p class="svc-fade-3" style="font-family:var(--body-font);font-size:1.05rem;color:rgba(245,245,240,0.65);max-width:500px;line-height:1.82;margin:0 0 ${content.heroAccent ? '1.25rem' : '2.75rem'}">${content.heroSubtitle}</p>
      ${content.heroAccent ? `<p class="svc-fade-3" style="font-family:var(--body-font);font-size:1.05rem;color:var(--primary-on-dark);font-weight:600;margin:0 0 2.75rem">${content.heroAccent}</p>` : ''}
      <div class="svc-fade-4" style="display:flex;gap:1rem;align-items:center;flex-wrap:wrap;margin-bottom:${content.ctaNote ? '0.75rem' : '0'}">
        <a href="#contact" style="font-family:var(--body-font);font-size:0.88rem;font-weight:700;padding:1rem 2.75rem;background:var(--primary-on-dark);color:#fff;border-radius:2px;text-decoration:none;letter-spacing:0.05em;text-transform:uppercase;transition:opacity 0.2s">${content.ctaPrimary}</a>
        <a href="#services" style="font-family:var(--body-font);font-size:0.88rem;font-weight:500;padding:1rem 2.25rem;background:transparent;color:#f5f5f0;border:1px solid rgba(255,255,255,0.25);border-radius:2px;text-decoration:none;transition:all 0.2s">${content.ctaSecondary}</a>
      </div>
      ${content.ctaNote ? `<p class="svc-fade-5" style="font-family:var(--body-font);font-size:0.78rem;color:rgba(255,255,255,0.38);margin-bottom:0">${content.ctaNote}</p>` : ''}
      <!-- Stats strip -->
      <div style="display:flex;gap:0;margin-top:4rem;border-top:1px solid rgba(255,255,255,0.1);padding-top:2.5rem">
        ${content.stats.slice(0, 4).map((s, i) => `
        <div style="flex:1;${i > 0 ? 'padding-left:2.5rem;border-left:1px solid rgba(255,255,255,0.08);margin-left:2.5rem' : ''}">
          <div style="font-family:var(--heading-font);font-size:2.25rem;font-weight:400;color:#f5f5f0;line-height:1">${s.value}</div>
          <div style="font-family:var(--body-font);font-size:0.78rem;color:rgba(245,245,240,0.5);margin-top:0.35rem;letter-spacing:0.04em">${s.label}</div>
          ${s.sublabel ? `<div style="font-family:var(--body-font);font-size:0.7rem;color:rgba(245,245,240,0.28);margin-top:0.15rem">${s.sublabel}</div>` : ''}
        </div>`).join('')}
      </div>
    </div>
  </section>

  ${servicesSection}
  ${processSection}
  ${buildAboutSection(content)}
  ${testimonialsSection}
  ${buildContactSection(content, locationInfo)}

${buildFooter(businessName, content, theme)}

<script>
  const revealEls = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible') }), { threshold: 0.1 });
  revealEls.forEach(el => obs.observe(el));
  const dot = document.getElementById('custom-cursor-dot');
  const ring = document.getElementById('custom-cursor-ring');
  let rx = 0, ry = 0;
  document.addEventListener('mousemove', e => { dot.style.left = e.clientX + 'px'; dot.style.top = e.clientY + 'px'; });
  requestAnimationFrame(function loop() { rx += (parseFloat(dot.style.left||0) - rx) * 0.1; ry += (parseFloat(dot.style.top||0) - ry) * 0.1; ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; requestAnimationFrame(loop); });
</script>
</body>
</html>`
}

// ---------- Portfolio Template (gallery-focused) ----------
function buildPortfolioTemplate(data: TemplateData): string {
  const { content, businessName, businessCategory, primaryColor, secondaryColor, pages, images, stockImages, locationInfo } = data
  const fonts = fontPairings[businessCategory] || fontPairings['other']
  const navFlags = resolveNavLinks(pages)

  const heroImg = images[0] || stockImages.hero
  const stockPool = buildImagePool(images, stockImages, businessName)
  const aboutImg = stockImages.about || stockPool[5]

  const pr = parseInt(primaryColor.slice(1, 3), 16)
  const pg = parseInt(primaryColor.slice(3, 5), 16)
  const pb = parseInt(primaryColor.slice(5, 7), 16)

  const serviceImgs = [
    images[1] || stockImages.cards[0],
    images[2] || stockImages.cards[1],
    images[3] || stockImages.cards[2],
    images[4] || stockImages.cards[3],
  ]

  const captions = content.projectCaptions || ['Featured Project', 'Recent Work', 'Client Project', 'Latest Design', 'Creative Direction']
  const fallbackTestimonials = getFallbackTestimonials(content, businessCategory)

  const servicesSection = `
    <style>
      .pf2-acc-body { overflow:hidden;max-height:0;transition:max-height 0.4s cubic-bezier(0.4,0,0.2,1),opacity 0.3s ease;opacity:0 }
      .pf2-acc-body.pf2-open { max-height:320px;opacity:1 }
      .pf2-acc-icon { display:flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;border:1.5px solid var(--border);transition:transform 0.35s ease,background 0.3s,border-color 0.3s;flex-shrink:0;font-size:1.1rem;color:var(--text-muted);font-weight:300 }
      .pf2-acc-icon.pf2-open { transform:rotate(45deg);background:var(--primary);border-color:var(--primary);color:#fff }
      .pf2-svc-row { border-top:1px solid var(--border) }
      .pf2-svc-row:last-child { border-bottom:1px solid var(--border) }
      .pf2-svc-trigger { cursor:pointer;width:100%;background:none;border:none;padding:2rem 0;text-align:left;display:flex;align-items:center;justify-content:space-between;gap:1rem }
      .pf2-img-stage { position:relative;overflow:hidden;border-radius:2px }
      .pf2-img-stage img { position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:opacity 0.5s ease,transform 0.7s ease }
      .pf2-img-stage img.pf2-active { opacity:1;transform:scale(1) }
      .pf2-img-stage img.pf2-inactive { opacity:0;transform:scale(1.03) }
    </style>
    <section id="services" style="padding:120px 0;background:var(--bg-alt)">
      <div style="max-width:1200px;margin:0 auto;padding:0 2rem">
        <div style="display:flex;align-items:center;gap:1.5rem;margin-bottom:1.5rem">
          <div style="width:1px;height:48px;background:var(--primary)"></div>
          <h2 style="font-family:var(--heading-font);font-size:clamp(2rem,4vw,3.2rem);font-weight:400;color:var(--text);line-height:1.12;margin:0">${content.servicesHeading}</h2>
        </div>
        <div class="ms-grid" style="display:grid;grid-template-columns:48% 52%;gap:4rem;align-items:start;margin-top:3.5rem">
          <!-- Left: sticky image stage -->
          <div class="ms-sticky" style="position:sticky;top:3rem">
            <div class="pf2-img-stage" style="height:580px">
              ${serviceImgs.map((img, i) => `<img id="pf2-img-${i}" src="${img}" alt="" class="${i === 0 ? 'pf2-active' : 'pf2-inactive'}" />`).join('')}
            </div>
            <div style="display:flex;gap:0.5rem;margin-top:1rem">
              ${serviceImgs.slice(0, Math.min(serviceImgs.length, content.services.length)).map((_, i) => `<div id="pf2-dot-${i}" style="width:${i === 0 ? '24px' : '8px'};height:8px;border-radius:4px;background:${i === 0 ? 'var(--primary)' : 'var(--border)'};transition:width 0.3s,background 0.3s;cursor:pointer" onclick="(function(){document.querySelectorAll('[id^=pf2-img]').forEach(function(el,j){el.className=j===${i}?'pf2-active':'pf2-inactive'});document.querySelectorAll('[id^=pf2-dot]').forEach(function(el,j){el.style.width=j===${i}?'24px':'8px';el.style.background=j===${i}?'var(--primary)':'var(--border)'})})()"></div>`).join('')}
            </div>
          </div>
          <!-- Right: accordion -->
          <div>
            ${content.services.map((s, i) => `
              <div class="pf2-svc-row">
                <button class="pf2-svc-trigger" onclick="(function(){var bodies=document.querySelectorAll('.pf2-acc-body');var icons=document.querySelectorAll('.pf2-acc-icon');var imgs=document.querySelectorAll('[id^=pf2-img]');var dots=document.querySelectorAll('[id^=pf2-dot]');bodies.forEach(function(el,j){if(j===${i}){el.classList.toggle('pf2-open');icons[j].classList.toggle('pf2-open')}else{el.classList.remove('pf2-open');icons[j].classList.remove('pf2-open')}});imgs.forEach(function(el,j){el.className=j===${i}?'pf2-active':'pf2-inactive'});dots.forEach(function(el,j){el.style.width=j===${i}?'24px':'8px';el.style.background=j===${i}?'var(--primary)':'var(--border)'})})()">
                  <div>
                    <div style="font-family:var(--body-font);font-size:0.68rem;letter-spacing:0.22em;color:var(--primary);font-weight:700;text-transform:uppercase;margin-bottom:0.6rem">0${i + 1}</div>
                    <h3 style="font-family:var(--heading-font);font-size:clamp(1.5rem,2.5vw,2rem);font-weight:400;color:var(--text);margin:0;line-height:1.15">${s.name}</h3>
                  </div>
                  <span class="pf2-acc-icon${i === 0 ? ' pf2-open' : ''}">+</span>
                </button>
                <div class="pf2-acc-body${i === 0 ? ' pf2-open' : ''}" style="padding:0 0 2rem">
                  <p style="font-family:var(--body-font);font-size:0.95rem;color:var(--text-muted);line-height:1.82;margin:0 0 1.25rem">${s.description}</p>
                  <div style="display:flex;gap:0.5rem;flex-wrap:wrap">
                    ${s.tags.map(t => `<span style="font-family:var(--body-font);font-size:0.72rem;padding:0.3rem 0.85rem;border-radius:1px;background:rgba(${pr},${pg},${pb},0.08);color:var(--primary);font-weight:600;letter-spacing:0.04em">${t}</span>`).join('')}
                  </div>
                </div>
              </div>`).join('')}
          </div>
        </div>
      </div>
    </section>`

  const gallerySection = `
    <style>
      .pf2-cell { position:relative;overflow:hidden;cursor:pointer }
      .pf2-cell img { width:100%;height:100%;object-fit:cover;display:block;transition:transform 0.65s cubic-bezier(0.25,0.46,0.45,0.94) }
      .pf2-cell:hover img { transform:scale(1.05) }
      .pf2-cap { position:absolute;inset:0;display:flex;flex-direction:column;align-items:flex-start;justify-content:flex-end;padding:1.75rem;background:linear-gradient(to top,rgba(0,0,0,0.75) 0%,rgba(0,0,0,0.2) 50%,transparent 100%);opacity:0;transition:opacity 0.4s ease }
      .pf2-cell:hover .pf2-cap { opacity:1 }
      .pf2-cap-title { font-family:var(--heading-font);font-size:1.1rem;font-weight:400;color:#fff;margin:0 0 0.35rem;transform:translateY(8px);transition:transform 0.4s ease }
      .pf2-cell:hover .pf2-cap-title { transform:translateY(0) }
      .pf2-cap-sub { font-family:var(--body-font);font-size:0.72rem;color:rgba(255,255,255,0.65);letter-spacing:0.1em;text-transform:uppercase;font-weight:500;transform:translateY(8px);transition:transform 0.4s ease 0.05s }
      .pf2-cell:hover .pf2-cap-sub { transform:translateY(0) }
    </style>
    <section id="gallery" style="padding:0;background:var(--bg)">
      <div style="max-width:1200px;margin:0 auto;padding:80px 2rem 40px">
        <div style="display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:3rem">
          <h2 style="font-family:var(--heading-font);font-size:clamp(2rem,4vw,3rem);font-weight:400;color:var(--text);line-height:1.15;margin:0;max-width:480px">${content.galleryHeading}</h2>
          <p style="font-family:var(--body-font);font-size:0.78rem;color:var(--text-muted);letter-spacing:0.08em;text-transform:uppercase;margin:0">${businessName} &mdash; Selected Works</p>
        </div>
      </div>
      <!-- Asymmetric gallery grid -->
      <div style="max-width:1400px;margin:0 auto">
        <div class="ms-grid" style="display:grid;grid-template-columns:1.8fr 1fr 1fr;grid-template-rows:380px 280px;gap:3px">
          <div class="pf2-cell" style="grid-row:1/3">
            <img src="${stockPool[8]}" alt="${captions[0] || 'Featured Project'}" />
            <div class="pf2-cap">
              <div class="pf2-cap-title">${captions[0] || 'Featured Project'}</div>
              <div class="pf2-cap-sub">${businessName}</div>
            </div>
          </div>
          <div class="pf2-cell">
            <img src="${stockPool[9]}" alt="${captions[1] || 'Project'}" />
            <div class="pf2-cap">
              <div class="pf2-cap-title">${captions[1] || 'Project'}</div>
              <div class="pf2-cap-sub">${content.heroEyebrow}</div>
            </div>
          </div>
          <div class="pf2-cell">
            <img src="${stockPool[10]}" alt="${captions[2] || 'Project'}" />
            <div class="pf2-cap">
              <div class="pf2-cap-title">${captions[2] || 'Project'}</div>
              <div class="pf2-cap-sub">${content.heroEyebrow}</div>
            </div>
          </div>
          <div class="pf2-cell">
            <img src="${stockPool[11]}" alt="${captions[3] || 'Project'}" />
            <div class="pf2-cap">
              <div class="pf2-cap-title">${captions[3] || 'Project'}</div>
              <div class="pf2-cap-sub">${businessName}</div>
            </div>
          </div>
          <div class="pf2-cell">
            <img src="${stockPool[12]}" alt="${captions[4] || 'Project'}" />
            <div class="pf2-cap">
              <div class="pf2-cap-title">${captions[4] || 'Project'}</div>
              <div class="pf2-cap-sub">${businessName}</div>
            </div>
          </div>
        </div>
        <div class="ms-grid" style="display:grid;grid-template-columns:1fr 1fr 1fr;height:220px;gap:3px;margin-top:3px">
          ${[stockPool[13], stockPool[14], stockPool[15]].map((img, i) => `
          <div class="pf2-cell">
            <img src="${img}" alt="${captions[i] || 'Work'}" />
            <div class="pf2-cap">
              <div class="pf2-cap-title">${captions[i] || 'Work'}</div>
            </div>
          </div>`).join('')}
        </div>
      </div>
      <div style="padding:40px 2rem 80px;text-align:center">
        <a href="#contact" style="font-family:var(--body-font);font-size:0.82rem;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:var(--primary);text-decoration:none;border-bottom:1px solid var(--primary);padding-bottom:0.25rem">Work With Us &rarr;</a>
      </div>
    </section>`

  const testimonialsSection = `
    <section style="padding:100px 0;background:var(--bg-alt)">
      <div style="max-width:1200px;margin:0 auto;padding:0 2rem">
        ${content.testimonial ? `
        <div style="max-width:820px;margin:0 auto;text-align:center">
          <div style="font-family:var(--heading-font);font-size:6rem;line-height:0.7;color:var(--primary);opacity:0.2;margin-bottom:2rem">&ldquo;</div>
          <p style="font-family:var(--heading-font);font-size:clamp(1.25rem,2.5vw,1.7rem);font-weight:400;font-style:italic;color:var(--text);line-height:1.6;margin:0 0 2.5rem">"${content.testimonial.quote}"</p>
          <div style="display:flex;align-items:center;justify-content:center;gap:1.5rem">
            <div style="width:48px;height:1px;background:var(--border)"></div>
            <p style="font-family:var(--body-font);font-size:0.78rem;color:var(--text-muted);letter-spacing:0.12em;text-transform:uppercase;font-weight:500;margin:0">${content.testimonial.author}</p>
            <div style="width:48px;height:1px;background:var(--border)"></div>
          </div>
          ${content.testimonial.rating ? `<div style="color:var(--primary);font-size:0.9rem;letter-spacing:0.15em;margin-top:1.25rem">${'&#9733;'.repeat(content.testimonial.rating)}</div>` : ''}
        </div>
        <div style="width:1px;height:60px;background:var(--border);margin:4rem auto"></div>` : ''}
        <div class="ms-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:2rem">
          ${fallbackTestimonials.slice(0, 2).map(t => `
          <div style="padding:2.5rem;border:1px solid var(--border);border-radius:2px;background:var(--card-bg);position:relative">
            <div style="color:var(--primary);font-size:0.85rem;letter-spacing:0.15em;margin-bottom:1.5rem">${'&#9733;'.repeat(t.rating)}</div>
            <p style="font-family:var(--heading-font);font-size:1rem;color:var(--text);line-height:1.75;font-style:italic;margin:0 0 2rem">"${t.quote}"</p>
            <div style="font-family:var(--body-font);font-size:0.75rem;color:var(--text-muted);letter-spacing:0.1em;text-transform:uppercase;font-weight:600">${t.author}</div>
          </div>`).join('')}
        </div>
      </div>
    </section>`

  const headHtml = buildHead(businessName, fonts, primaryColor, secondaryColor)

  return `${headHtml}
<style>
  @keyframes pf2-kenburns { 0% { transform:scale(1.06) translate(0.5%,0) } 100% { transform:scale(1) translate(0,0) } }
  @keyframes pf2-fadeup { from { opacity:0;transform:translateY(30px) } to { opacity:1;transform:translateY(0) } }
  @keyframes pf2-fadein { from { opacity:0 } to { opacity:1 } }
  .pf2-hero-bg { animation:pf2-kenburns 20s ease-out forwards }
  .pf2-f1 { animation:pf2-fadeup 1s ease 0.2s both }
  .pf2-f2 { animation:pf2-fadeup 1s ease 0.45s both }
  .pf2-f3 { animation:pf2-fadeup 1s ease 0.65s both }
  .pf2-f4 { animation:pf2-fadeup 1s ease 0.85s both }
  .pf2-f5 { animation:pf2-fadeup 1s ease 1.0s both }
  body::before { content:'';position:fixed;inset:0;pointer-events:none;z-index:9999;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");opacity:0.45 }
  .reveal { opacity:0;transform:translateY(22px);transition:opacity 0.75s ease,transform 0.75s ease }
  .reveal.visible { opacity:1;transform:translateY(0) }
  #custom-cursor-dot { width:5px;height:5px;background:var(--primary);border-radius:50%;position:fixed;pointer-events:none;z-index:10000;transform:translate(-50%,-50%) }
  #custom-cursor-ring { width:34px;height:34px;border:1px solid rgba(${pr},${pg},${pb},0.4);border-radius:50%;position:fixed;pointer-events:none;z-index:9999;transform:translate(-50%,-50%) }
</style>
<div id="custom-cursor-dot"></div>
<div id="custom-cursor-ring"></div>

${buildStandardNav(businessName, content, navFlags)}

  <!-- Hero — editorial, center-aligned, Ken Burns -->
  <section style="position:relative;min-height:calc(100vh - 64px);display:flex;align-items:center;justify-content:center;overflow:hidden;text-align:center">
    <div style="position:absolute;inset:0;overflow:hidden">
      <img src="${heroImg}" alt="" class="pf2-hero-bg" style="width:100%;height:100%;object-fit:cover" />
      <div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,0.5) 0%,rgba(0,0,0,0.72) 50%,rgba(0,0,0,0.88) 100%)"></div>
    </div>
    <!-- Decorative corner marks -->
    <div style="position:absolute;top:6rem;left:2rem;width:30px;height:30px;border-top:1.5px solid rgba(255,255,255,0.25);border-left:1.5px solid rgba(255,255,255,0.25)"></div>
    <div style="position:absolute;top:6rem;right:2rem;width:30px;height:30px;border-top:1.5px solid rgba(255,255,255,0.25);border-right:1.5px solid rgba(255,255,255,0.25)"></div>
    <div style="position:absolute;bottom:8rem;left:2rem;width:30px;height:30px;border-bottom:1.5px solid rgba(255,255,255,0.25);border-left:1.5px solid rgba(255,255,255,0.25)"></div>
    <div style="position:absolute;bottom:8rem;right:2rem;width:30px;height:30px;border-bottom:1.5px solid rgba(255,255,255,0.25);border-right:1.5px solid rgba(255,255,255,0.25)"></div>
    <div style="position:relative;max-width:860px;margin:0 auto;padding:8rem 2rem 6rem">
      ${content.badge ? `<div class="pf2-f1" style="display:inline-block;font-family:var(--body-font);font-size:0.7rem;letter-spacing:0.15em;padding:0.45rem 1.25rem;border-radius:999px;background:rgba(${pr},${pg},${pb},0.15);border:1px solid rgba(${pr},${pg},${pb},0.35);color:rgba(255,255,255,0.85);margin-bottom:2.25rem;text-transform:uppercase;font-weight:600">${content.badge}</div>` : ''}
      <div class="pf2-f1" style="display:flex;align-items:center;justify-content:center;gap:1.25rem;margin-bottom:2rem">
        <div style="width:40px;height:1px;background:rgba(${pr},${pg},${pb},0.7)"></div>
        <p style="font-family:var(--body-font);font-size:0.75rem;letter-spacing:0.25em;text-transform:uppercase;color:var(--primary);font-weight:600;margin:0">${content.heroEyebrow}</p>
        <div style="width:40px;height:1px;background:rgba(${pr},${pg},${pb},0.7)"></div>
      </div>
      <h1 class="pf2-f2" style="font-family:var(--heading-font);font-size:clamp(3.5rem,8vw,6.5rem);font-weight:400;color:#f5f5f0;line-height:1.0;margin:0 0 2rem;letter-spacing:-0.01em">${content.tagline}</h1>
      <p class="pf2-f3" style="font-family:var(--body-font);font-size:1.05rem;color:rgba(245,245,240,0.65);max-width:480px;margin:0 auto ${content.heroAccent ? '1.25rem' : '2.75rem'};line-height:1.82">${content.heroSubtitle}</p>
      ${content.heroAccent ? `<p class="pf2-f3" style="font-family:var(--body-font);font-size:1.05rem;color:var(--primary);font-weight:600;margin:0 auto 2.75rem;max-width:480px">${content.heroAccent}</p>` : ''}
      <div class="pf2-f4" style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap">
        <a href="#gallery" style="font-family:var(--body-font);font-size:0.88rem;font-weight:600;padding:1.1rem 2.75rem;background:var(--primary);color:#fff;border-radius:2px;text-decoration:none;letter-spacing:0.05em;transition:opacity 0.2s">${content.ctaPrimary}</a>
        <a href="#contact" style="font-family:var(--body-font);font-size:0.88rem;font-weight:500;padding:1.1rem 2.25rem;background:transparent;color:#f5f5f0;border:1px solid rgba(255,255,255,0.28);border-radius:2px;text-decoration:none;transition:all 0.2s">${content.ctaSecondary}</a>
      </div>
      ${content.ctaNote ? `<p class="pf2-f5" style="font-family:var(--body-font);font-size:0.78rem;color:rgba(255,255,255,0.38);margin-top:1.5rem">${content.ctaNote}</p>` : ''}
    </div>
    <!-- Bottom scroll indicator -->
    <div style="position:absolute;bottom:2.5rem;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:0.5rem">
      <div style="font-family:var(--body-font);font-size:0.65rem;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.35);font-weight:500">Scroll</div>
      <div style="width:1px;height:32px;background:linear-gradient(to bottom,rgba(255,255,255,0.35),transparent)"></div>
    </div>
  </section>

  ${servicesSection}
  ${gallerySection}

  <!-- About -->
  <section id="about" style="padding:120px 0;background:var(--bg)">
    <div style="max-width:1200px;margin:0 auto;padding:0 2rem">
      <div class="ms-grid" style="display:grid;grid-template-columns:1.1fr 1fr;gap:5rem;align-items:center">
        <div class="reveal">
          <div style="display:flex;align-items:center;gap:1.5rem;margin-bottom:1.5rem">
            <div style="width:1px;height:48px;background:var(--primary)"></div>
            <p style="font-family:var(--body-font);font-size:0.72rem;letter-spacing:0.22em;text-transform:uppercase;color:var(--primary);font-weight:700;margin:0">About the Studio</p>
          </div>
          <h2 style="font-family:var(--heading-font);font-size:clamp(2rem,4vw,2.8rem);font-weight:400;color:var(--text);line-height:1.2;margin:0 0 1.75rem">${content.aboutHeading}</h2>
          ${content.aboutMission ? `<p style="font-family:var(--heading-font);font-size:1.05rem;color:var(--text);line-height:1.65;font-style:italic;margin:0 0 1.75rem;padding-left:1.5rem;border-left:2px solid var(--primary)">${content.aboutMission}</p>` : ''}
          ${content.aboutText.split('\n').filter(p => p.trim()).map(p => `<p style="font-family:var(--body-font);font-size:0.92rem;color:var(--text-muted);line-height:1.9;margin:0 0 1rem">${p}</p>`).join('')}
          <div class="ms-grid" style="display:grid;grid-template-columns:repeat(2,1fr);gap:2rem;margin-top:2.5rem;padding-top:2rem;border-top:1px solid var(--border)">
            ${content.stats.slice(0, 4).map(s => `
            <div>
              <div style="font-family:var(--heading-font);font-size:2rem;font-weight:400;color:var(--text);line-height:1">${s.value}</div>
              <div style="font-family:var(--body-font);font-size:0.78rem;color:var(--text-muted);margin-top:0.3rem;letter-spacing:0.04em">${s.label}</div>
              ${s.sublabel ? `<div style="font-family:var(--body-font);font-size:0.7rem;color:var(--text-muted);opacity:0.55;margin-top:0.12rem">${s.sublabel}</div>` : ''}
            </div>`).join('')}
          </div>
        </div>
        <div class="reveal" style="position:relative">
          <div class="ms-img" style="overflow:hidden;border-radius:2px;height:580px">
            <img src="${aboutImg}" alt="" style="width:100%;height:100%;object-fit:cover;transition:transform 0.6s ease" onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform='scale(1)'" />
          </div>
          <div style="position:absolute;top:-1.5rem;right:-1.5rem;width:100px;height:100px;border:1.5px solid var(--primary);border-radius:1px;z-index:-1;opacity:0.5"></div>
          <div style="position:absolute;bottom:-1.5rem;left:-1.5rem;width:100px;height:100px;border:1.5px solid rgba(${pr},${pg},${pb},0.25);border-radius:1px;z-index:-1"></div>
        </div>
      </div>
    </div>
  </section>

  ${testimonialsSection}
  ${buildContactSection(content, locationInfo)}

${buildFooter(businessName, content)}

<script>
  const revealEls = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible') }), { threshold: 0.1 });
  revealEls.forEach(el => obs.observe(el));
  const dot = document.getElementById('custom-cursor-dot');
  const ring = document.getElementById('custom-cursor-ring');
  let rx = 0, ry = 0;
  document.addEventListener('mousemove', e => { dot.style.left = e.clientX + 'px'; dot.style.top = e.clientY + 'px'; });
  requestAnimationFrame(function loop() { rx += (parseFloat(dot.style.left||0) - rx) * 0.08; ry += (parseFloat(dot.style.top||0) - ry) * 0.08; ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; requestAnimationFrame(loop); });
</script>
</body>
</html>`
}