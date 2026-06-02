function buildHealthWellnessTemplate(data: TemplateData): string {
  const { content, businessName, businessCategory, primaryColor, secondaryColor, pages, images, stockImages, locationInfo } = data
  const fonts = fontPairings[businessCategory] || fontPairings['other']
  const navFlags = resolveNavLinks(pages)

  const heroImg = images[0] || stockImages.hero
  const stockPool = buildImagePool(images, stockImages, businessName)
  const aboutImg = stockImages.about || stockPool[0]

  const hw = {
    bg: '#fdfcf9',
    bgAlt: '#f2eeea',
    bgDeep: '#e8e2da',
    text: '#1c1c1c',
    muted: '#6b6565',
    accent: primaryColor || '#7c9e8f',
    border: 'rgba(0,0,0,0.07)',
  }

  const testimonials = [content.testimonial, ...getFallbackTestimonials(content, businessCategory)].filter(Boolean).slice(0, 3)

  const headHtml = buildHead(businessName, fonts, primaryColor, secondaryColor, 'light')
    + `<link href="https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet"/>`

  return `${headHtml}
<style>
  :root {
    --bg: ${hw.bg};
    --bg-alt: ${hw.bgAlt};
    --card-bg: #fff;
    --text: ${hw.text};
    --text-muted: ${hw.muted};
    --border: ${hw.border};
    --accent: ${hw.accent};
  }
  html { scroll-behavior: smooth; }
  .hw-fade { opacity: 0; transform: translateY(28px); transition: opacity 0.8s ease, transform 0.8s ease; }
  .hw-fade.visible { opacity: 1; transform: none; }
  .hw-service-card { transition: box-shadow 0.35s ease, transform 0.35s ease; }
  .hw-service-card:hover { box-shadow: 0 12px 40px rgba(0,0,0,0.10); transform: translateY(-4px); }
  .hw-btn-primary { transition: background 0.3s ease, transform 0.2s ease; }
  .hw-btn-primary:hover { filter: brightness(1.1); transform: translateY(-1px); }
  .hw-nav-link { position: relative; }
  .hw-nav-link::after { content: ''; position: absolute; bottom: -2px; left: 0; width: 0; height: 1px; background: ${hw.accent}; transition: width 0.3s ease; }
  .hw-nav-link:hover::after { width: 100%; }
  .hw-img-hover { overflow: hidden; }
  .hw-img-hover img { transition: transform 0.7s ease; }
  .hw-img-hover:hover img { transform: scale(1.04); }
</style>

${buildStandardNav(businessName, content, navFlags)}

<!-- HERO: Full-bleed split — soft cream left, full-bleed photo right, large serif italic tagline -->
<section style="min-height:calc(100vh - 64px);display:grid;grid-template-columns:1fr 1fr;background:${hw.bg};position:relative">
  <div style="display:flex;flex-direction:column;justify-content:center;padding:8rem 4rem 6rem 5rem">
    <p class="hw-fade" style="font-family:'DM Sans',sans-serif;font-size:0.72rem;letter-spacing:0.2em;text-transform:uppercase;color:${hw.accent};margin-bottom:2rem">${content.heroEyebrow || 'Wellness & Care'}</p>
    <h1 class="hw-fade" style="font-family:'Cormorant',Georgia,serif;font-size:clamp(3.2rem,5vw,5.5rem);font-weight:300;font-style:italic;color:${hw.text};line-height:1.1;letter-spacing:-0.01em;margin-bottom:1.5rem">${content.tagline}</h1>
    <div class="hw-fade" style="width:48px;height:1px;background:${hw.accent};margin-bottom:1.75rem"></div>
    <p class="hw-fade" style="font-family:'DM Sans',sans-serif;font-size:1rem;color:${hw.muted};line-height:1.8;max-width:400px;margin-bottom:2.5rem;font-weight:300">${content.heroSubtitle}</p>
    <div class="hw-fade" style="display:flex;gap:1rem;align-items:center">
      <a href="#contact" class="hw-btn-primary" style="font-family:'DM Sans',sans-serif;font-size:0.82rem;font-weight:500;letter-spacing:0.08em;padding:1rem 2.25rem;background:${hw.accent};color:#fff;text-decoration:none;display:inline-block">${content.ctaPrimary}</a>
      <a href="#services" style="font-family:'DM Sans',sans-serif;font-size:0.82rem;font-weight:400;letter-spacing:0.06em;color:${hw.muted};text-decoration:none;display:flex;align-items:center;gap:0.4rem">Explore &rarr;</a>
    </div>
    <div class="hw-fade" style="display:flex;gap:2.5rem;margin-top:4rem;padding-top:3rem;border-top:1px solid ${hw.border}">
      ${content.stats.slice(0, 3).map(s => `
      <div>
        <div style="font-family:'Cormorant',Georgia,serif;font-size:2rem;font-weight:400;color:${hw.text}">${s.value}</div>
        <div style="font-family:'DM Sans',sans-serif;font-size:0.72rem;color:${hw.muted};letter-spacing:0.08em;text-transform:uppercase;margin-top:0.2rem">${s.label}</div>
      </div>`).join('')}
    </div>
  </div>
  <div class="hw-img-hover" style="position:relative">
    <img src="${heroImg}" alt="" style="width:100%;height:100%;object-fit:cover;display:block" />
    <div style="position:absolute;inset:0;background:linear-gradient(to right,${hw.bg} 0%,transparent 8%)"></div>
    ${content.badge ? `<div style="position:absolute;bottom:3rem;left:2rem;background:rgba(255,255,255,0.92);backdrop-filter:blur(8px);padding:1rem 1.5rem;max-width:220px">
      <p style="font-family:'Cormorant',Georgia,serif;font-size:1rem;font-style:italic;color:${hw.text};line-height:1.5">${content.badge}</p>
    </div>` : ''}
  </div>
</section>

<!-- MARQUEE STRIP -->
<div style="background:${hw.accent};padding:0.9rem 0;overflow:hidden;white-space:nowrap">
  <div style="display:inline-block;animation:marquee 22s linear infinite">
    ${[...Array(6)].map(() => content.services.map(s => `<span style="font-family:'DM Sans',sans-serif;font-size:0.72rem;letter-spacing:0.18em;text-transform:uppercase;color:rgba(255,255,255,0.9);padding:0 2.5rem">${s.name}</span>`).join('')).join('')}
  </div>
</div>
<style>@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }</style>

<!-- SERVICES: Alternating large image + content rows -->
<section id="services" style="padding:8rem 0;background:${hw.bg}">
  <div style="max-width:1200px;margin:0 auto;padding:0 3rem">
    <div class="hw-fade" style="display:flex;align-items:center;gap:1.5rem;margin-bottom:4rem">
      <div style="width:32px;height:1px;background:${hw.accent}"></div>
      <p style="font-family:'DM Sans',sans-serif;font-size:0.72rem;letter-spacing:0.2em;text-transform:uppercase;color:${hw.accent}">${content.servicesHeading}</p>
    </div>
    <div style="display:flex;flex-direction:column;gap:0">
      ${content.services.slice(0, 4).map((s, i) => `
      <div class="hw-fade ms-grid" style="display:grid;grid-template-columns:${i % 2 === 0 ? '1fr 1.2fr' : '1.2fr 1fr'};min-height:420px;border-top:1px solid ${hw.border}${i === Math.min(content.services.length,4)-1 ? `;border-bottom:1px solid ${hw.border}` : ''}">
        ${i % 2 !== 0 ? `<div class="hw-img-hover" style="background:${hw.bgAlt}"><img src="${stockPool[i] || heroImg}" alt="" style="width:100%;height:100%;object-fit:cover;display:block" /></div>` : ''}
        <div style="display:flex;flex-direction:column;justify-content:center;padding:4rem;${i % 2 === 0 ? 'order:-1' : ''}">
          <div style="font-family:'Cormorant',Georgia,serif;font-size:4rem;font-weight:300;color:${hw.bgDeep};line-height:1;margin-bottom:1.5rem;user-select:none">0${i + 1}</div>
          <h3 style="font-family:'Cormorant',Georgia,serif;font-size:2rem;font-weight:400;color:${hw.text};margin-bottom:1rem;line-height:1.2">${s.name}</h3>
          <p style="font-family:'DM Sans',sans-serif;font-size:0.9rem;color:${hw.muted};line-height:1.8;margin-bottom:1.5rem;max-width:360px">${s.description}</p>
          <div style="display:flex;gap:0.5rem;flex-wrap:wrap">
            ${s.tags.slice(0, 3).map(t => `<span style="font-family:'DM Sans',sans-serif;font-size:0.68rem;letter-spacing:0.1em;text-transform:uppercase;color:${hw.accent};border:1px solid ${hw.accent};padding:0.25rem 0.65rem">${t}</span>`).join('')}
          </div>
        </div>
        ${i % 2 === 0 ? `<div class="hw-img-hover" style="background:${hw.bgAlt}"><img src="${stockPool[i] || heroImg}" alt="" style="width:100%;height:100%;object-fit:cover;display:block" /></div>` : ''}
      </div>`).join('')}
    </div>
  </div>
</section>

<!-- ABOUT: Asymmetric 2-col — stacked images left, editorial content right -->
<section id="about" style="padding:8rem 0;background:${hw.bgAlt}">
  <div class="ms-grid" style="max-width:1200px;margin:0 auto;padding:0 3rem;display:grid;grid-template-columns:1fr 1fr;gap:5rem;align-items:center">
    <div style="position:relative">
      <div class="hw-img-hover" style="height:480px;margin-bottom:1.5rem">
        <img src="${aboutImg}" alt="" style="width:100%;height:100%;object-fit:cover;display:block" />
      </div>
      <div class="hw-img-hover" style="height:220px;margin-left:3rem">
        <img src="${stockPool[4] || heroImg}" alt="" style="width:100%;height:100%;object-fit:cover;display:block" />
      </div>
      <div style="position:absolute;top:50%;left:-1.5rem;transform:translateY(-50%) rotate(-90deg);font-family:'DM Sans',sans-serif;font-size:0.65rem;letter-spacing:0.25em;text-transform:uppercase;color:${hw.muted};white-space:nowrap">${businessName}</div>
    </div>
    <div class="hw-fade">
      <p style="font-family:'DM Sans',sans-serif;font-size:0.72rem;letter-spacing:0.2em;text-transform:uppercase;color:${hw.accent};margin-bottom:1.5rem">Our Story</p>
      <h2 style="font-family:'Cormorant',Georgia,serif;font-size:clamp(2.2rem,3.5vw,3.2rem);font-weight:300;color:${hw.text};line-height:1.2;margin-bottom:2rem">${content.aboutHeading}</h2>
      ${content.aboutMission ? `<p style="font-family:'Cormorant',Georgia,serif;font-size:1.2rem;font-style:italic;color:${hw.text};line-height:1.7;margin-bottom:2rem;padding-left:1rem;border-left:2px solid ${hw.accent}">${content.aboutMission}</p>` : ''}
      ${content.aboutText.split('\n').filter(p => p.trim()).map(p => `<p style="font-family:'DM Sans',sans-serif;font-size:0.92rem;color:${hw.muted};line-height:1.9;margin-bottom:1.25rem;font-weight:300">${p}</p>`).join('')}
      <div style="margin-top:2.5rem;display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;padding-top:2.5rem;border-top:1px solid ${hw.border}">
        ${content.stats.slice(0, 4).map(s => `
        <div>
          <div style="font-family:'Cormorant',Georgia,serif;font-size:2.5rem;font-weight:300;color:${hw.text}">${s.value}</div>
          <div style="font-family:'DM Sans',sans-serif;font-size:0.72rem;color:${hw.muted};letter-spacing:0.08em;text-transform:uppercase;margin-top:0.2rem">${s.label}</div>
        </div>`).join('')}
      </div>
    </div>
  </div>
</section>

<!-- TESTIMONIALS: Soft cream, large italic quote, portrait grid -->
<section id="testimonials" style="padding:8rem 0;background:${hw.bg}">
  <div style="max-width:1200px;margin:0 auto;padding:0 3rem">
    <div class="hw-fade" style="text-align:center;margin-bottom:5rem">
      <p style="font-family:'DM Sans',sans-serif;font-size:0.72rem;letter-spacing:0.2em;text-transform:uppercase;color:${hw.accent};margin-bottom:1rem">Client Stories</p>
      <h2 style="font-family:'Cormorant',Georgia,serif;font-size:clamp(2.5rem,4vw,3.8rem);font-weight:300;font-style:italic;color:${hw.text};line-height:1.2">Words of Trust</h2>
    </div>
    <div class="ms-grid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:2rem">
      ${testimonials.map((t, i) => `
      <div class="hw-fade hw-service-card" style="background:${i === 1 ? hw.accent : hw.bgAlt};padding:2.5rem;position:relative">
        <div style="font-family:'Cormorant',Georgia,serif;font-size:5rem;line-height:1;color:${i === 1 ? 'rgba(255,255,255,0.25)' : hw.bgDeep};position:absolute;top:1rem;left:1.5rem;user-select:none">&ldquo;</div>
        <div style="color:${i === 1 ? 'rgba(255,255,255,0.9)' : '#f59e0b'};font-size:0.8rem;letter-spacing:0.1em;margin-bottom:1.5rem;position:relative;z-index:1">${'★'.repeat(t!.rating)}</div>
        <p style="font-family:'Cormorant',Georgia,serif;font-size:1.15rem;font-style:italic;color:${i === 1 ? '#fff' : hw.text};line-height:1.7;margin-bottom:2rem;position:relative;z-index:1">"${t!.quote}"</p>
        <div style="display:flex;align-items:center;gap:0.75rem;border-top:1px solid ${i === 1 ? 'rgba(255,255,255,0.2)' : hw.border};padding-top:1.25rem">
          <div style="width:36px;height:36px;border-radius:50%;background:${i === 1 ? 'rgba(255,255,255,0.2)' : hw.bgDeep};flex-shrink:0"></div>
          <div>
            <div style="font-family:'DM Sans',sans-serif;font-size:0.8rem;font-weight:500;color:${i === 1 ? '#fff' : hw.text}">${t!.author.split(',')[0]}</div>
            <div style="font-family:'DM Sans',sans-serif;font-size:0.72rem;color:${i === 1 ? 'rgba(255,255,255,0.6)' : hw.muted}">${t!.author.split(',')[1]?.trim() || 'Client'}</div>
          </div>
        </div>
      </div>`).join('')}
    </div>
  </div>
</section>

<!-- CONTACT: Warm linen bg, 2-col, elegant form -->
<section id="contact" style="padding:8rem 0;background:${hw.bgAlt}">
  <div class="ms-grid" style="max-width:1200px;margin:0 auto;padding:0 3rem;display:grid;grid-template-columns:1fr 1.1fr;gap:6rem;align-items:start">
    <div class="hw-fade">
      <p style="font-family:'DM Sans',sans-serif;font-size:0.72rem;letter-spacing:0.2em;text-transform:uppercase;color:${hw.accent};margin-bottom:1.5rem">Get In Touch</p>
      <h2 style="font-family:'Cormorant',Georgia,serif;font-size:clamp(2.2rem,3.5vw,3.2rem);font-weight:300;color:${hw.text};line-height:1.2;margin-bottom:2rem">${content.contactHeading}</h2>
      <p style="font-family:'DM Sans',sans-serif;font-size:0.9rem;color:${hw.muted};line-height:1.8;margin-bottom:3rem;font-weight:300">${content.heroSubtitle}</p>
      <div style="display:flex;flex-direction:column;gap:1.5rem">
        ${[
          { icon: '⊙', label: 'Address', val: `${locationInfo.address}, ${locationInfo.city}` },
          { icon: '◎', label: 'Phone', val: locationInfo.phone },
          { icon: '✉', label: 'Email', val: `hello@${businessName.toLowerCase().replace(/\s/g,'')}.com` },
          ...(content.contactHours ? [{ icon: '◷', label: 'Hours', val: content.contactHours.replace(/ · /g, ' · ') }] : []),
        ].map(item => `
        <div style="display:flex;gap:1.25rem;align-items:flex-start">
          <div style="width:40px;height:40px;border:1px solid ${hw.border};display:flex;align-items:center;justify-content:center;color:${hw.accent};font-size:1rem;flex-shrink:0">${item.icon}</div>
          <div>
            <div style="font-family:'DM Sans',sans-serif;font-size:0.68rem;letter-spacing:0.15em;text-transform:uppercase;color:${hw.muted};margin-bottom:0.25rem">${item.label}</div>
            <div style="font-family:'DM Sans',sans-serif;font-size:0.88rem;color:${hw.text}">${item.val}</div>
          </div>
        </div>`).join('')}
      </div>
    </div>
    <div class="hw-fade" style="background:#fff;padding:3rem">
      <h3 style="font-family:'Cormorant',Georgia,serif;font-size:1.6rem;font-weight:300;color:${hw.text};margin-bottom:0.5rem">Send a Message</h3>
      <p style="font-family:'DM Sans',sans-serif;font-size:0.8rem;color:${hw.muted};margin-bottom:2rem">We respond within 24 hours.</p>
      <form style="display:flex;flex-direction:column;gap:1.25rem" onsubmit="return false">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem">
          <div>
            <label style="font-family:'DM Sans',sans-serif;font-size:0.68rem;letter-spacing:0.12em;text-transform:uppercase;color:${hw.muted};display:block;margin-bottom:0.5rem">First Name</label>
            <input type="text" style="width:100%;box-sizing:border-box;font-family:'DM Sans',sans-serif;padding:0.75rem 0;border:none;border-bottom:1px solid ${hw.border};background:transparent;font-size:0.9rem;color:${hw.text};outline:none" />
          </div>
          <div>
            <label style="font-family:'DM Sans',sans-serif;font-size:0.68rem;letter-spacing:0.12em;text-transform:uppercase;color:${hw.muted};display:block;margin-bottom:0.5rem">Last Name</label>
            <input type="text" style="width:100%;box-sizing:border-box;font-family:'DM Sans',sans-serif;padding:0.75rem 0;border:none;border-bottom:1px solid ${hw.border};background:transparent;font-size:0.9rem;color:${hw.text};outline:none" />
          </div>
        </div>
        <div>
          <label style="font-family:'DM Sans',sans-serif;font-size:0.68rem;letter-spacing:0.12em;text-transform:uppercase;color:${hw.muted};display:block;margin-bottom:0.5rem">Email</label>
          <input type="email" style="width:100%;box-sizing:border-box;font-family:'DM Sans',sans-serif;padding:0.75rem 0;border:none;border-bottom:1px solid ${hw.border};background:transparent;font-size:0.9rem;color:${hw.text};outline:none" />
        </div>
        <div>
          <label style="font-family:'DM Sans',sans-serif;font-size:0.68rem;letter-spacing:0.12em;text-transform:uppercase;color:${hw.muted};display:block;margin-bottom:0.5rem">Service of Interest</label>
          <select style="width:100%;box-sizing:border-box;font-family:'DM Sans',sans-serif;padding:0.75rem 0;border:none;border-bottom:1px solid ${hw.border};background:transparent;font-size:0.9rem;color:${hw.text};outline:none;appearance:none">
            <option value="">Select a service</option>
            ${content.services.map(s => `<option value="${s.name}">${s.name}</option>`).join('')}
          </select>
        </div>
        <div>
          <label style="font-family:'DM Sans',sans-serif;font-size:0.68rem;letter-spacing:0.12em;text-transform:uppercase;color:${hw.muted};display:block;margin-bottom:0.5rem">Message</label>
          <textarea rows="4" style="width:100%;box-sizing:border-box;font-family:'DM Sans',sans-serif;padding:0.75rem 0;border:none;border-bottom:1px solid ${hw.border};background:transparent;font-size:0.9rem;color:${hw.text};outline:none;resize:none"></textarea>
        </div>
        <button type="submit" class="hw-btn-primary" style="margin-top:0.5rem;font-family:'DM Sans',sans-serif;font-size:0.78rem;font-weight:500;letter-spacing:0.12em;text-transform:uppercase;padding:1.1rem 2.5rem;background:${hw.accent};color:#fff;border:none;cursor:pointer;align-self:flex-start">${content.ctaPrimary}</button>
      </form>
    </div>
  </div>
</section>

<footer style="padding:4rem 3rem 2.5rem;background:${hw.text}">
  <div style="max-width:1200px;margin:0 auto">
    <div style="display:grid;grid-template-columns:2fr 1fr 1fr;gap:4rem;margin-bottom:3rem">
      <div>
        <div style="font-family:'Cormorant',Georgia,serif;font-size:1.6rem;font-weight:300;color:#fff;margin-bottom:1rem;letter-spacing:0.05em">${businessName}</div>
        <p style="font-family:'DM Sans',sans-serif;font-size:0.82rem;color:rgba(255,255,255,0.45);line-height:1.8;max-width:280px;font-weight:300">${content.heroSubtitle}</p>
      </div>
      <div>
        <div style="font-family:'DM Sans',sans-serif;font-size:0.65rem;letter-spacing:0.2em;text-transform:uppercase;color:${hw.accent};margin-bottom:1.5rem">Services</div>
        ${content.services.slice(0, 4).map(s => `<a href="#services" style="display:block;font-family:'DM Sans',sans-serif;font-size:0.82rem;color:rgba(255,255,255,0.45);text-decoration:none;margin-bottom:0.65rem;transition:color 0.2s">${s.tags?.[0] || s.name}</a>`).join('')}
      </div>
      <div>
        <div style="font-family:'DM Sans',sans-serif;font-size:0.65rem;letter-spacing:0.2em;text-transform:uppercase;color:${hw.accent};margin-bottom:1.5rem">Company</div>
        <a href="#about" style="display:block;font-family:'DM Sans',sans-serif;font-size:0.82rem;color:rgba(255,255,255,0.45);text-decoration:none;margin-bottom:0.65rem">About</a>
        <a href="#contact" style="display:block;font-family:'DM Sans',sans-serif;font-size:0.82rem;color:rgba(255,255,255,0.45);text-decoration:none;margin-bottom:0.65rem">Contact</a>
        <a href="#" style="display:block;font-family:'DM Sans',sans-serif;font-size:0.82rem;color:rgba(255,255,255,0.45);text-decoration:none;margin-bottom:0.65rem">Privacy Policy</a>
      </div>
    </div>
    <div style="border-top:1px solid rgba(255,255,255,0.08);padding-top:2rem;display:flex;justify-content:space-between;align-items:center">
      <p style="font-family:'DM Sans',sans-serif;font-size:0.72rem;color:rgba(255,255,255,0.25)">&copy; ${new Date().getFullYear()} ${businessName}. All rights reserved.</p>
      <p style="font-family:'DM Sans',sans-serif;font-size:0.72rem;color:rgba(255,255,255,0.25)">Wellness &amp; Care</p>
    </div>
  </div>
</footer>

<script>
  const hwObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); hwObserver.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.hw-fade').forEach(el => hwObserver.observe(el));
</script>

</body>
</html>`
}

function buildFitnessTemplate(data: TemplateData): string {
  const { content, businessName, businessCategory, primaryColor, secondaryColor, pages, images, stockImages, locationInfo } = data
  const fonts = fontPairings[businessCategory] || fontPairings['other']
  const navFlags = resolveNavLinks(pages)

  const heroImg = images[0] || stockImages.hero
  const stockPool = buildImagePool(images, stockImages, businessName)
  const aboutImg = stockImages.about || stockPool[0]

  const fit = {
    bg: '#0a0a0a',
    bgAlt: '#111111',
    bgCard: '#161616',
    text: '#ffffff',
    muted: '#888888',
    accent: primaryColor || '#e8ff00',
    border: 'rgba(255,255,255,0.06)',
  }

  const headHtml = buildHead(businessName, fonts, primaryColor, secondaryColor, 'dark')
    + `<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet"/>`

  const testimonials = [content.testimonial, ...getFallbackTestimonials(content, businessCategory)].filter(Boolean).slice(0, 3)

  return `${headHtml}
<style>
  :root {
    --bg: ${fit.bg};
    --bg-alt: ${fit.bgAlt};
    --card-bg: ${fit.bgCard};
    --text: ${fit.text};
    --text-muted: ${fit.muted};
    --border: ${fit.border};
  }
  html { scroll-behavior: smooth; }
  .fit-fade { opacity: 0; transform: translateY(32px); transition: opacity 0.7s ease, transform 0.7s ease; }
  .fit-fade.visible { opacity: 1; transform: none; }
  .fit-card { transition: transform 0.3s ease; }
  .fit-card:hover { transform: translateY(-6px); }
  .fit-img-zoom { overflow: hidden; }
  .fit-img-zoom img { transition: transform 0.6s ease; }
  .fit-img-zoom:hover img { transform: scale(1.05); }
  .fit-btn { transition: background 0.25s ease, color 0.25s ease, transform 0.2s ease; }
  .fit-btn:hover { transform: translateY(-2px); }
  .fit-service-row { border-bottom: 1px solid ${fit.border}; transition: background 0.3s ease; cursor: pointer; }
  .fit-service-row:hover { background: ${fit.bgCard}; }
  .fit-counter { font-variant-numeric: tabular-nums; }
</style>

<!-- PROMO BAR -->
<div style="background:${fit.accent};padding:0.55rem 2rem;text-align:center">
  <p style="font-family:'Inter',sans-serif;font-size:0.72rem;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;color:#000">${content.badge || content.heroEyebrow || 'Limited spots available — join today'}</p>
</div>

${buildStandardNav(businessName, content, navFlags)}

<!-- HERO: Dark cinematic full-bleed, massive Bebas headline, split stats bar -->
<section style="position:relative;min-height:calc(100vh - 64px);display:flex;flex-direction:column;justify-content:flex-end;overflow:hidden;background:${fit.bg}">
  <div style="position:absolute;inset:0">
    <img src="${heroImg}" alt="" style="width:100%;height:100%;object-fit:cover;display:block" />
    <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(10,10,10,1) 0%,rgba(10,10,10,0.65) 50%,rgba(10,10,10,0.15) 100%)"></div>
    <div style="position:absolute;inset:0;background:linear-gradient(to right,rgba(10,10,10,0.5) 0%,transparent 60%)"></div>
  </div>
  <div style="position:relative;max-width:1400px;margin:0 auto;padding:0 3rem 6rem;width:100%">
    <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1.5rem">
      <div style="width:40px;height:2px;background:${fit.accent}"></div>
      <p style="font-family:'Inter',sans-serif;font-size:0.7rem;font-weight:600;letter-spacing:0.25em;text-transform:uppercase;color:${fit.accent}">${content.heroEyebrow || businessName}</p>
    </div>
    <h1 style="font-family:'Bebas Neue',sans-serif;font-size:clamp(5rem,11vw,11rem);font-weight:400;color:${fit.text};line-height:0.9;letter-spacing:0.02em;margin-bottom:2rem">${content.tagline.toUpperCase()}</h1>
    <div style="display:flex;align-items:center;gap:1.5rem;flex-wrap:wrap">
      <a href="#contact" class="fit-btn" style="font-family:'Inter',sans-serif;font-size:0.8rem;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;padding:1.1rem 2.8rem;background:${fit.accent};color:#000;text-decoration:none;display:inline-block">${content.ctaPrimary}</a>
      <a href="#services" class="fit-btn" style="font-family:'Inter',sans-serif;font-size:0.8rem;font-weight:500;letter-spacing:0.12em;text-transform:uppercase;padding:1.1rem 2.8rem;border:1px solid rgba(255,255,255,0.3);color:${fit.text};text-decoration:none;display:inline-block">${content.ctaSecondary || 'View Classes'}</a>
    </div>
  </div>
  <!-- Bottom stats bar -->
  <div style="position:relative;background:rgba(255,255,255,0.04);backdrop-filter:blur(12px);border-top:1px solid ${fit.border}">
    <div style="max-width:1400px;margin:0 auto;padding:0 3rem;display:flex;justify-content:space-between;flex-wrap:wrap">
      ${content.stats.slice(0, 4).map((s, i) => `
      <div style="padding:1.5rem 0;${i < 3 ? `border-right:1px solid ${fit.border};padding-right:3rem;margin-right:3rem` : ''}">
        <div class="fit-counter" style="font-family:'Bebas Neue',sans-serif;font-size:2.8rem;color:${fit.text};line-height:1">${s.value}</div>
        <div style="font-family:'Inter',sans-serif;font-size:0.65rem;letter-spacing:0.15em;text-transform:uppercase;color:${fit.muted};margin-top:0.2rem">${s.label}</div>
      </div>`).join('')}
    </div>
  </div>
</section>

<!-- SERVICES: Bold numbered list rows — editorial, high contrast -->
<section id="services" style="padding:6rem 0;background:${fit.bg}">
  <div style="max-width:1400px;margin:0 auto;padding:0 3rem">
    <div class="fit-fade" style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:4rem">
      <h2 style="font-family:'Bebas Neue',sans-serif;font-size:clamp(3rem,5vw,5rem);color:${fit.text};line-height:1;letter-spacing:0.04em">${content.servicesHeading.toUpperCase()}</h2>
      <a href="#contact" style="font-family:'Inter',sans-serif;font-size:0.72rem;font-weight:500;letter-spacing:0.12em;text-transform:uppercase;color:${fit.muted};text-decoration:none;border-bottom:1px solid ${fit.muted};padding-bottom:0.2rem">${content.ctaPrimary} &rarr;</a>
    </div>
    <div>
      ${content.services.map((s, i) => `
      <div class="fit-service-row" style="display:grid;grid-template-columns:80px 1fr auto;gap:2rem;align-items:center;padding:2rem 0">
        <div style="font-family:'Bebas Neue',sans-serif;font-size:3rem;color:${fit.accent};line-height:1;opacity:0.7">0${i + 1}</div>
        <div>
          <h3 style="font-family:'Bebas Neue',sans-serif;font-size:1.8rem;color:${fit.text};letter-spacing:0.05em;margin-bottom:0.35rem">${s.name.toUpperCase()}</h3>
          <p style="font-family:'Inter',sans-serif;font-size:0.85rem;color:${fit.muted};font-weight:300;line-height:1.6;max-width:520px">${s.description}</p>
          <div style="display:flex;gap:0.5rem;margin-top:0.75rem;flex-wrap:wrap">
            ${s.tags.slice(0, 3).map(t => `<span style="font-family:'Inter',sans-serif;font-size:0.62rem;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:${fit.accent};background:rgba(${parseInt(fit.accent.slice(1,3)||'e8',16)},${parseInt(fit.accent.slice(3,5)||'ff',16)},${parseInt(fit.accent.slice(5,7)||'00',16)},0.1);padding:0.25rem 0.65rem">${t}</span>`).join('')}
          </div>
        </div>
        <div style="font-family:'Inter',sans-serif;font-size:1.5rem;color:rgba(255,255,255,0.15)">&#8599;</div>
      </div>`).join('')}
    </div>
  </div>
</section>

<!-- PHOTO GRID: Asymmetric 3+2 mosaic, full-bleed -->
<section style="display:grid;grid-template-columns:3fr 2fr;background:${fit.bg};gap:3px">
  <div class="fit-img-zoom" style="height:520px">
    <img src="${stockPool[0] || heroImg}" alt="" style="width:100%;height:100%;object-fit:cover;display:block" />
  </div>
  <div style="display:grid;grid-template-rows:1fr 1fr;gap:3px">
    <div class="fit-img-zoom" style="height:258px">
      <img src="${stockPool[1] || heroImg}" alt="" style="width:100%;height:100%;object-fit:cover;display:block" />
    </div>
    <div class="fit-img-zoom" style="height:258px">
      <img src="${stockPool[2] || heroImg}" alt="" style="width:100%;height:100%;object-fit:cover;display:block" />
    </div>
  </div>
</section>

<!-- ABOUT: Dark, horizontal — bold quote + image side -->
<section id="about" style="padding:7rem 0;background:${fit.bgAlt}">
  <div class="ms-grid" style="max-width:1400px;margin:0 auto;padding:0 3rem;display:grid;grid-template-columns:1fr 1fr;gap:6rem;align-items:center">
    <div class="fit-fade">
      <div style="display:flex;align-items:center;gap:1rem;margin-bottom:2rem">
        <div style="width:32px;height:2px;background:${fit.accent}"></div>
        <p style="font-family:'Inter',sans-serif;font-size:0.68rem;font-weight:600;letter-spacing:0.2em;text-transform:uppercase;color:${fit.accent}">Our Philosophy</p>
      </div>
      <h2 style="font-family:'Bebas Neue',sans-serif;font-size:clamp(3rem,4.5vw,4.5rem);color:${fit.text};line-height:1;letter-spacing:0.03em;margin-bottom:1.5rem">${content.aboutHeading.toUpperCase()}</h2>
      ${content.aboutMission ? `<p style="font-family:'Inter',sans-serif;font-size:1.05rem;color:${fit.accent};line-height:1.7;margin-bottom:1.5rem;font-weight:400">${content.aboutMission}</p>` : ''}
      ${content.aboutText.split('\n').filter(p => p.trim()).map(p => `<p style="font-family:'Inter',sans-serif;font-size:0.88rem;color:${fit.muted};line-height:1.9;margin-bottom:1rem;font-weight:300">${p}</p>`).join('')}
      <a href="#contact" class="fit-btn" style="display:inline-block;margin-top:2rem;font-family:'Inter',sans-serif;font-size:0.78rem;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;padding:1.1rem 2.8rem;background:${fit.accent};color:#000;text-decoration:none">${content.ctaPrimary}</a>
    </div>
    <div class="fit-fade fit-img-zoom" style="height:560px;position:relative">
      <img src="${aboutImg}" alt="" style="width:100%;height:100%;object-fit:cover;display:block" />
      <div style="position:absolute;bottom:2rem;left:-2rem;background:${fit.accent};padding:1.5rem 2rem;max-width:200px">
        <div style="font-family:'Bebas Neue',sans-serif;font-size:2.5rem;color:#000;line-height:1">${content.stats[0]?.value || '500+'}</div>
        <div style="font-family:'Inter',sans-serif;font-size:0.7rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#000;margin-top:0.25rem">${content.stats[0]?.label || 'Active Members'}</div>
      </div>
    </div>
  </div>
</section>

<!-- TESTIMONIALS: Dark cards, accent quote marks -->
<section id="testimonials" style="padding:7rem 0;background:${fit.bg}">
  <div style="max-width:1400px;margin:0 auto;padding:0 3rem">
    <div class="fit-fade" style="margin-bottom:4rem">
      <h2 style="font-family:'Bebas Neue',sans-serif;font-size:clamp(3rem,5vw,5rem);color:${fit.text};line-height:1;letter-spacing:0.03em">RESULTS<span style="color:${fit.accent}">.</span> STORIES<span style="color:${fit.accent}">.</span></h2>
    </div>
    <div class="ms-grid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:1.5px;background:${fit.border}">
      ${testimonials.map((t, i) => `
      <div class="fit-card" style="background:${i === 0 ? fit.accent : fit.bgCard};padding:2.5rem;position:relative">
        <div style="font-family:'Bebas Neue',sans-serif;font-size:6rem;line-height:1;color:${i === 0 ? 'rgba(0,0,0,0.12)' : fit.accent};position:absolute;top:0.5rem;left:1.5rem;user-select:none">"</div>
        <div style="color:${i === 0 ? 'rgba(0,0,0,0.5)' : fit.accent};font-size:0.75rem;letter-spacing:0.1em;margin-bottom:1.5rem;position:relative;z-index:1">${'★'.repeat(t!.rating)}</div>
        <p style="font-family:'Inter',sans-serif;font-size:0.9rem;color:${i === 0 ? '#000' : fit.text};line-height:1.8;margin-bottom:2rem;position:relative;z-index:1;font-weight:${i === 0 ? '500' : '300'}">"${t!.quote}"</p>
        <div style="border-top:1px solid ${i === 0 ? 'rgba(0,0,0,0.15)' : fit.border};padding-top:1rem">
          <div style="font-family:'Inter',sans-serif;font-size:0.8rem;font-weight:600;color:${i === 0 ? '#000' : fit.text}">${t!.author.split(',')[0]}</div>
          <div style="font-family:'Inter',sans-serif;font-size:0.72rem;color:${i === 0 ? 'rgba(0,0,0,0.5)' : fit.muted};margin-top:0.15rem">${t!.author.split(',')[1]?.trim() || 'Member'}</div>
        </div>
      </div>`).join('')}
    </div>
  </div>
</section>

<!-- CONTACT: Dark 2-col, accent CTA bar above -->
<div style="background:${fit.accent};padding:2.5rem 3rem;text-align:center">
  <h3 style="font-family:'Bebas Neue',sans-serif;font-size:clamp(2rem,4vw,3.5rem);color:#000;letter-spacing:0.05em">${content.ctaPrimary.toUpperCase()} — START TODAY</h3>
</div>
<section id="contact" style="padding:6rem 0;background:${fit.bgAlt}">
  <div class="ms-grid" style="max-width:1400px;margin:0 auto;padding:0 3rem;display:grid;grid-template-columns:1fr 1.4fr;gap:6rem;align-items:start">
    <div class="fit-fade">
      <h2 style="font-family:'Bebas Neue',sans-serif;font-size:clamp(2.5rem,4vw,4rem);color:${fit.text};line-height:1;letter-spacing:0.03em;margin-bottom:2rem">${content.contactHeading.toUpperCase()}</h2>
      <div style="display:flex;flex-direction:column;gap:1.5rem">
        ${[
          { label: 'Location', val: `${locationInfo.address}, ${locationInfo.city}` },
          { label: 'Phone', val: locationInfo.phone },
          { label: 'Email', val: `hello@${businessName.toLowerCase().replace(/\s/g,'')}.com` },
          ...(content.contactHours ? [{ label: 'Hours', val: content.contactHours }] : []),
        ].map(item => `
        <div style="border-left:2px solid ${fit.accent};padding-left:1.25rem">
          <div style="font-family:'Inter',sans-serif;font-size:0.65rem;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;color:${fit.accent};margin-bottom:0.3rem">${item.label}</div>
          <div style="font-family:'Inter',sans-serif;font-size:0.9rem;color:${fit.muted};font-weight:300">${item.val}</div>
        </div>`).join('')}
      </div>
    </div>
    <div class="fit-fade">
      <form style="display:flex;flex-direction:column;gap:1rem" onsubmit="return false">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem">
          <input type="text" placeholder="Full Name" style="font-family:'Inter',sans-serif;padding:1rem 1.25rem;background:${fit.bgCard};border:1px solid ${fit.border};color:${fit.text};font-size:0.88rem;outline:none;box-sizing:border-box" />
          <input type="email" placeholder="Email" style="font-family:'Inter',sans-serif;padding:1rem 1.25rem;background:${fit.bgCard};border:1px solid ${fit.border};color:${fit.text};font-size:0.88rem;outline:none;box-sizing:border-box" />
        </div>
        <input type="tel" placeholder="Phone Number" style="font-family:'Inter',sans-serif;padding:1rem 1.25rem;background:${fit.bgCard};border:1px solid ${fit.border};color:${fit.text};font-size:0.88rem;outline:none" />
        <select style="font-family:'Inter',sans-serif;padding:1rem 1.25rem;background:${fit.bgCard};border:1px solid ${fit.border};color:${fit.muted};font-size:0.88rem;outline:none;appearance:none">
          <option value="">Select a program</option>
          ${content.services.map(s => `<option value="${s.name}">${s.name}</option>`).join('')}
        </select>
        <textarea placeholder="Tell us about your fitness goals..." rows="4" style="font-family:'Inter',sans-serif;padding:1rem 1.25rem;background:${fit.bgCard};border:1px solid ${fit.border};color:${fit.text};font-size:0.88rem;outline:none;resize:none"></textarea>
        <button type="submit" class="fit-btn" style="font-family:'Inter',sans-serif;font-size:0.8rem;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;padding:1.2rem 2.5rem;background:${fit.accent};color:#000;border:none;cursor:pointer">${content.ctaPrimary}</button>
      </form>
    </div>
  </div>
</section>

<footer style="padding:3rem;background:${fit.bg};border-top:1px solid ${fit.border}">
  <div style="max-width:1400px;margin:0 auto;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem">
    <div style="font-family:'Bebas Neue',sans-serif;font-size:1.8rem;color:${fit.text};letter-spacing:0.08em">${businessName.toUpperCase()}</div>
    <div style="display:flex;gap:2rem;flex-wrap:wrap">
      ${content.services.slice(0, 3).map(s => `<a href="#services" style="font-family:'Inter',sans-serif;font-size:0.72rem;color:${fit.muted};text-decoration:none;letter-spacing:0.08em;text-transform:uppercase">${s.tags?.[0] || s.name}</a>`).join('')}
      <a href="#contact" style="font-family:'Inter',sans-serif;font-size:0.72rem;color:${fit.muted};text-decoration:none;letter-spacing:0.08em;text-transform:uppercase">Contact</a>
    </div>
    <p style="font-family:'Inter',sans-serif;font-size:0.72rem;color:rgba(255,255,255,0.2)">&copy; ${new Date().getFullYear()} ${businessName}</p>
  </div>
</footer>

<script>
  const fitObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); fitObserver.unobserve(e.target); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fit-fade').forEach(el => fitObserver.observe(el));
</script>

</body>
</html>`
}

function buildEducationTemplate(data: TemplateData): string {
  const { content, businessName, businessCategory, primaryColor, secondaryColor, pages, images, stockImages, locationInfo } = data
  const fonts = fontPairings[businessCategory] || fontPairings['other']
  const navFlags = resolveNavLinks(pages)

  const heroImg = images[0] || stockImages.hero
  const stockPool = buildImagePool(images, stockImages, businessName)
  const aboutImg = stockImages.about || stockPool[0]

  const edu = {
    bg: '#ffffff',
    bgAlt: '#f7f5f2',
    bgWarm: '#fef9f0',
    text: '#1a1714',
    muted: '#6b6560',
    accent: primaryColor || '#2d5be3',
    accentLight: lightenColor(primaryColor || '#2d5be3', 0.88),
    border: 'rgba(0,0,0,0.07)',
  }

  const testimonials = [content.testimonial, ...getFallbackTestimonials(content, businessCategory)].filter(Boolean).slice(0, 2)

  const headHtml = buildHead(businessName, fonts, primaryColor, secondaryColor, 'light')
    + `<link href="https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet"/>`

  const processSteps = content.processSteps || [
    { step: '01', title: content.services[0]?.name || 'Enroll', description: content.services[0]?.description || 'Begin your learning journey.' },
    { step: '02', title: content.services[1]?.name || 'Learn', description: content.services[1]?.description || 'Engage with expert-led content.' },
    { step: '03', title: content.services[2]?.name || 'Achieve', description: content.services[2]?.description || 'Reach your goals and grow.' },
  ]

  return `${headHtml}
<style>
  :root {
    --bg: ${edu.bg};
    --bg-alt: ${edu.bgAlt};
    --card-bg: ${edu.bg};
    --text: ${edu.text};
    --text-muted: ${edu.muted};
    --border: ${edu.border};
  }
  html { scroll-behavior: smooth; }
  .edu-fade { opacity: 0; transform: translateY(24px); transition: opacity 0.75s ease, transform 0.75s ease; }
  .edu-fade.visible { opacity: 1; transform: none; }
  .edu-card { transition: box-shadow 0.35s ease, transform 0.35s ease; }
  .edu-card:hover { box-shadow: 0 16px 48px rgba(0,0,0,0.10); transform: translateY(-5px); }
  .edu-img-zoom { overflow: hidden; }
  .edu-img-zoom img { transition: transform 0.65s ease; }
  .edu-img-zoom:hover img { transform: scale(1.04); }
  .edu-link { position: relative; display: inline-block; }
  .edu-link::after { content: ''; position: absolute; bottom: 0; left: 0; width: 100%; height: 1px; background: ${edu.accent}; transform: scaleX(0); transform-origin: right; transition: transform 0.35s ease; }
  .edu-link:hover::after { transform: scaleX(1); transform-origin: left; }
</style>

${buildStandardNav(businessName, content, navFlags)}

<!-- HERO: Warm off-white, large editorial serif left, stacked image collage right -->
<section style="background:${edu.bgWarm};min-height:calc(92vh - 64px);display:flex;align-items:center;overflow:hidden;position:relative">
  <div style="position:absolute;top:0;right:0;width:45%;height:100%;background:${edu.accentLight};clip-path:polygon(8% 0,100% 0,100% 100%,0% 100%)"></div>
  <div style="max-width:1200px;margin:0 auto;padding:6rem 3rem;width:100%;display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center;position:relative;z-index:1">
    <div>
      <div class="edu-fade" style="display:inline-flex;align-items:center;gap:0.75rem;background:${edu.accent};padding:0.5rem 1.25rem;margin-bottom:2rem">
        <div style="width:6px;height:6px;border-radius:50%;background:#fff"></div>
        <p style="font-family:'Inter',sans-serif;font-size:0.7rem;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;color:#fff">${content.heroEyebrow || 'Education & Growth'}</p>
      </div>
      <h1 class="edu-fade" style="font-family:'Merriweather',Georgia,serif;font-size:clamp(2.5rem,4.5vw,4rem);font-weight:700;color:${edu.text};line-height:1.2;margin-bottom:1.5rem">${content.tagline}</h1>
      <p class="edu-fade" style="font-family:'Inter',sans-serif;font-size:1rem;color:${edu.muted};line-height:1.8;max-width:420px;margin-bottom:2.5rem;font-weight:300">${content.heroSubtitle}</p>
      <div class="edu-fade" style="display:flex;gap:1rem;align-items:center;flex-wrap:wrap">
        <a href="#contact" style="font-family:'Inter',sans-serif;font-size:0.82rem;font-weight:600;letter-spacing:0.06em;padding:1rem 2.5rem;background:${edu.accent};color:#fff;text-decoration:none;display:inline-block;transition:filter 0.25s ease">${content.ctaPrimary}</a>
        <a href="#services" style="font-family:'Inter',sans-serif;font-size:0.82rem;font-weight:400;color:${edu.text};text-decoration:none;display:flex;align-items:center;gap:0.4rem;border-bottom:1px solid ${edu.text};padding-bottom:0.15rem">${content.ctaSecondary || 'See Programs'}</a>
      </div>
      <div class="edu-fade" style="display:flex;gap:2rem;margin-top:3.5rem;padding-top:2.5rem;border-top:1px solid ${edu.border}">
        ${content.stats.slice(0, 3).map(s => `
        <div>
          <div style="font-family:'Merriweather',Georgia,serif;font-size:1.8rem;font-weight:700;color:${edu.accent}">${s.value}</div>
          <div style="font-family:'Inter',sans-serif;font-size:0.72rem;color:${edu.muted};letter-spacing:0.06em;margin-top:0.2rem">${s.label}</div>
        </div>`).join('')}
      </div>
    </div>
    <div class="edu-fade" style="display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;gap:1rem;height:500px">
      <div class="edu-img-zoom" style="grid-column:1/2;grid-row:1/3;border-radius:4px;overflow:hidden">
        <img src="${heroImg}" alt="" style="width:100%;height:100%;object-fit:cover;display:block" />
      </div>
      <div class="edu-img-zoom" style="border-radius:4px;overflow:hidden">
        <img src="${stockPool[0] || heroImg}" alt="" style="width:100%;height:100%;object-fit:cover;display:block" />
      </div>
      <div style="background:${edu.accent};border-radius:4px;display:flex;flex-direction:column;justify-content:center;padding:1.5rem">
        <div style="font-family:'Merriweather',Georgia,serif;font-size:1.4rem;font-weight:700;color:#fff;line-height:1.2">${content.stats[3]?.value || content.stats[0]?.value || '98%'}</div>
        <div style="font-family:'Inter',sans-serif;font-size:0.72rem;color:rgba(255,255,255,0.75);margin-top:0.35rem;line-height:1.4">${content.stats[3]?.label || 'Student satisfaction'}</div>
      </div>
    </div>
  </div>
</section>

<!-- TRUST STRIP -->
<div style="background:${edu.text};padding:1.5rem 3rem">
  <div style="max-width:1200px;margin:0 auto;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem">
    ${content.stats.slice(0, 4).map(s => `
    <div style="text-align:center">
      <span style="font-family:'Merriweather',Georgia,serif;font-size:1.3rem;font-weight:700;color:#fff">${s.value}</span>
      <span style="font-family:'Inter',sans-serif;font-size:0.72rem;color:rgba(255,255,255,0.45);margin-left:0.5rem;letter-spacing:0.06em">${s.label}</span>
    </div>`).join('')}
  </div>
</div>

<!-- PROGRAMS: Clean card grid, category badge, hover lift -->
<section id="services" style="padding:7rem 0;background:${edu.bg}">
  <div style="max-width:1200px;margin:0 auto;padding:0 3rem">
    <div class="edu-fade" style="display:flex;flex-direction:column;align-items:flex-start;gap:0.75rem;margin-bottom:4rem">
      <div style="display:flex;align-items:center;gap:1rem">
        <div style="width:24px;height:2px;background:${edu.accent}"></div>
        <p style="font-family:'Inter',sans-serif;font-size:0.72rem;font-weight:600;letter-spacing:0.2em;text-transform:uppercase;color:${edu.accent}">Our Programs</p>
      </div>
      <h2 style="font-family:'Merriweather',Georgia,serif;font-size:clamp(2rem,3.5vw,3rem);font-weight:700;color:${edu.text};line-height:1.2">${content.servicesHeading}</h2>
    </div>
    <div class="ms-grid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem">
      ${content.services.slice(0, 6).map((s, i) => `
      <div class="edu-fade edu-card" style="background:${i === 0 ? edu.accent : edu.bgAlt};border-radius:2px;padding:2.5rem;position:relative;overflow:hidden">
        <div style="position:absolute;top:0;right:0;width:80px;height:80px;background:${i === 0 ? 'rgba(255,255,255,0.08)' : edu.accentLight};border-radius:0 0 0 80px"></div>
        <div style="font-family:'Inter',sans-serif;font-size:0.65rem;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;color:${i === 0 ? 'rgba(255,255,255,0.7)' : edu.accent};margin-bottom:1rem">${s.tags[0] || 'Program'}</div>
        <h3 style="font-family:'Merriweather',Georgia,serif;font-size:1.2rem;font-weight:700;color:${i === 0 ? '#fff' : edu.text};margin-bottom:0.75rem;line-height:1.3">${s.name}</h3>
        <p style="font-family:'Inter',sans-serif;font-size:0.85rem;color:${i === 0 ? 'rgba(255,255,255,0.75)' : edu.muted};line-height:1.7;font-weight:300;margin-bottom:1.5rem">${s.description}</p>
        <a href="#contact" style="font-family:'Inter',sans-serif;font-size:0.72rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:${i === 0 ? '#fff' : edu.accent};text-decoration:none;display:flex;align-items:center;gap:0.4rem">Learn More &rarr;</a>
      </div>`).join('')}
    </div>
  </div>
</section>

<!-- HOW IT WORKS: Clean 3-step with connecting line, numbered circles -->
<section style="padding:7rem 0;background:${edu.bgWarm}">
  <div style="max-width:1000px;margin:0 auto;padding:0 3rem;text-align:center">
    <div class="edu-fade" style="margin-bottom:5rem">
      <p style="font-family:'Inter',sans-serif;font-size:0.72rem;font-weight:600;letter-spacing:0.2em;text-transform:uppercase;color:${edu.accent};margin-bottom:1rem">How It Works</p>
      <h2 style="font-family:'Merriweather',Georgia,serif;font-size:clamp(1.8rem,3vw,2.5rem);font-weight:700;color:${edu.text};line-height:1.3">${content.stepsHeading || 'Your Path to Success'}</h2>
    </div>
    <div style="position:relative">
      <div style="position:absolute;top:32px;left:calc(16% + 32px);right:calc(16% + 32px);height:1px;background:linear-gradient(to right,${edu.accent},${edu.accentLight},${edu.accent});z-index:0" class="ms-sticky"></div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:2rem;position:relative;z-index:1">
        ${processSteps.slice(0, 3).map((step, i) => `
        <div class="edu-fade" style="display:flex;flex-direction:column;align-items:center;text-align:center;gap:1.5rem">
          <div style="width:64px;height:64px;border-radius:50%;background:${i === 1 ? edu.accent : edu.bg};border:2px solid ${edu.accent};display:flex;align-items:center;justify-content:center;flex-shrink:0">
            <span style="font-family:'Merriweather',Georgia,serif;font-size:1.2rem;font-weight:700;color:${i === 1 ? '#fff' : edu.accent}">${step.step}</span>
          </div>
          <div>
            <h3 style="font-family:'Merriweather',Georgia,serif;font-size:1rem;font-weight:700;color:${edu.text};margin-bottom:0.65rem">${step.title}</h3>
            <p style="font-family:'Inter',sans-serif;font-size:0.85rem;color:${edu.muted};line-height:1.7;font-weight:300">${step.description}</p>
          </div>
        </div>`).join('')}
      </div>
    </div>
    <a href="#contact" style="display:inline-block;margin-top:4rem;font-family:'Inter',sans-serif;font-size:0.82rem;font-weight:600;letter-spacing:0.08em;padding:1.1rem 3rem;background:${edu.accent};color:#fff;text-decoration:none">${content.ctaPrimary}</a>
  </div>
</section>

<!-- ABOUT: Split — image left, warm editorial content right -->
<section id="about" style="padding:7rem 0;background:${edu.bg}">
  <div class="ms-grid" style="max-width:1200px;margin:0 auto;padding:0 3rem;display:grid;grid-template-columns:1fr 1fr;gap:5rem;align-items:center">
    <div class="edu-fade" style="position:relative">
      <div class="edu-img-zoom" style="height:520px;border-radius:2px;overflow:hidden">
        <img src="${aboutImg}" alt="" style="width:100%;height:100%;object-fit:cover;display:block" />
      </div>
      <div style="position:absolute;bottom:-2rem;right:-2rem;background:${edu.bgWarm};border:1px solid ${edu.border};padding:1.5rem 2rem">
        <p style="font-family:'Merriweather',Georgia,serif;font-size:0.9rem;font-style:italic;color:${edu.text};line-height:1.5;max-width:160px">${content.badge || 'Committed to your growth'}</p>
      </div>
    </div>
    <div class="edu-fade">
      <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1.5rem">
        <div style="width:24px;height:2px;background:${edu.accent}"></div>
        <p style="font-family:'Inter',sans-serif;font-size:0.72rem;font-weight:600;letter-spacing:0.2em;text-transform:uppercase;color:${edu.accent}">About Us</p>
      </div>
      <h2 style="font-family:'Merriweather',Georgia,serif;font-size:clamp(2rem,3vw,2.8rem);font-weight:700;color:${edu.text};line-height:1.25;margin-bottom:1.5rem">${content.aboutHeading}</h2>
      ${content.aboutMission ? `<p style="font-family:'Merriweather',Georgia,serif;font-size:1rem;font-style:italic;color:${edu.text};line-height:1.7;margin-bottom:1.5rem;padding-left:1.25rem;border-left:3px solid ${edu.accent}">${content.aboutMission}</p>` : ''}
      ${content.aboutText.split('\n').filter(p => p.trim()).map(p => `<p style="font-family:'Inter',sans-serif;font-size:0.9rem;color:${edu.muted};line-height:1.9;margin-bottom:1rem;font-weight:300">${p}</p>`).join('')}
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.25rem;margin-top:2.5rem;padding-top:2rem;border-top:1px solid ${edu.border}">
        ${content.stats.slice(0, 4).map(s => `
        <div style="display:flex;gap:0.75rem;align-items:flex-start">
          <div style="width:28px;height:28px;border-radius:50%;background:${edu.accentLight};display:flex;align-items:center;justify-content:center;color:${edu.accent};font-size:0.7rem;flex-shrink:0;margin-top:0.1rem">✓</div>
          <div>
            <div style="font-family:'Merriweather',Georgia,serif;font-size:1.2rem;font-weight:700;color:${edu.text}">${s.value}</div>
            <div style="font-family:'Inter',sans-serif;font-size:0.72rem;color:${edu.muted};margin-top:0.1rem">${s.label}</div>
          </div>
        </div>`).join('')}
      </div>
    </div>
  </div>
</section>

<!-- TESTIMONIALS: Warm bg, large serif quote, 2-col -->
<section id="testimonials" style="padding:7rem 0;background:${edu.bgAlt}">
  <div style="max-width:1200px;margin:0 auto;padding:0 3rem">
    <div class="edu-fade" style="text-align:center;margin-bottom:4rem">
      <p style="font-family:'Inter',sans-serif;font-size:0.72rem;font-weight:600;letter-spacing:0.2em;text-transform:uppercase;color:${edu.accent};margin-bottom:1rem">Student Stories</p>
      <h2 style="font-family:'Merriweather',Georgia,serif;font-size:clamp(2rem,3vw,2.8rem);font-weight:700;color:${edu.text};line-height:1.2">What Our Students Say</h2>
    </div>
    <div class="ms-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:2rem">
      ${testimonials.map((t, i) => `
      <div class="edu-fade edu-card" style="background:${i === 0 ? edu.accent : edu.bg};padding:3rem;border-radius:2px;position:relative">
        <div style="font-family:'Merriweather',Georgia,serif;font-size:6rem;line-height:1;color:${i === 0 ? 'rgba(255,255,255,0.15)' : edu.accentLight};position:absolute;top:1rem;left:2rem;user-select:none;font-style:italic">"</div>
        <div style="color:${i === 0 ? 'rgba(255,255,255,0.9)' : '#f59e0b'};font-size:0.85rem;letter-spacing:0.05em;margin-bottom:1.5rem;position:relative;z-index:1">${'★'.repeat(t!.rating)}</div>
        <p style="font-family:'Merriweather',Georgia,serif;font-size:1.05rem;font-style:italic;color:${i === 0 ? '#fff' : edu.text};line-height:1.75;margin-bottom:2rem;position:relative;z-index:1">"${t!.quote}"</p>
        <div style="display:flex;align-items:center;gap:1rem;border-top:1px solid ${i === 0 ? 'rgba(255,255,255,0.2)' : edu.border};padding-top:1.25rem">
          <div style="width:40px;height:40px;border-radius:50%;background:${i === 0 ? 'rgba(255,255,255,0.2)' : edu.accentLight};display:flex;align-items:center;justify-content:center;font-family:'Merriweather',serif;font-size:1rem;color:${i === 0 ? '#fff' : edu.accent};flex-shrink:0">${t!.author[0]}</div>
          <div>
            <div style="font-family:'Inter',sans-serif;font-size:0.85rem;font-weight:600;color:${i === 0 ? '#fff' : edu.text}">${t!.author.split(',')[0]}</div>
            <div style="font-family:'Inter',sans-serif;font-size:0.72rem;color:${i === 0 ? 'rgba(255,255,255,0.6)' : edu.muted};margin-top:0.1rem">${t!.author.split(',')[1]?.trim() || 'Student'}</div>
          </div>
        </div>
      </div>`).join('')}
    </div>
  </div>
</section>

<!-- CONTACT: Warm, 2-col, friendly form -->
<section id="contact" style="padding:7rem 0;background:${edu.bgWarm}">
  <div class="ms-grid" style="max-width:1200px;margin:0 auto;padding:0 3rem;display:grid;grid-template-columns:1fr 1.2fr;gap:6rem;align-items:start">
    <div class="edu-fade">
      <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1.5rem">
        <div style="width:24px;height:2px;background:${edu.accent}"></div>
        <p style="font-family:'Inter',sans-serif;font-size:0.72rem;font-weight:600;letter-spacing:0.2em;text-transform:uppercase;color:${edu.accent}">Enroll Today</p>
      </div>
      <h2 style="font-family:'Merriweather',Georgia,serif;font-size:clamp(2rem,3.5vw,3rem);font-weight:700;color:${edu.text};line-height:1.2;margin-bottom:1.5rem">${content.contactHeading}</h2>
      <p style="font-family:'Inter',sans-serif;font-size:0.9rem;color:${edu.muted};line-height:1.8;margin-bottom:3rem;font-weight:300">${content.heroSubtitle}</p>
      <div style="display:flex;flex-direction:column;gap:1.5rem">
        ${[
          { icon: '📍', label: 'Address', val: `${locationInfo.address}, ${locationInfo.city}` },
          { icon: '📞', label: 'Phone', val: locationInfo.phone },
          { icon: '✉️', label: 'Email', val: `hello@${businessName.toLowerCase().replace(/\s/g,'')}.com` },
          ...(content.contactHours ? [{ icon: '🕐', label: 'Hours', val: content.contactHours }] : []),
        ].map(item => `
        <div style="display:flex;gap:1rem;align-items:flex-start">
          <div style="width:42px;height:42px;border-radius:50%;background:${edu.accentLight};display:flex;align-items:center;justify-content:center;font-size:1rem;flex-shrink:0">${item.icon}</div>
          <div>
            <div style="font-family:'Inter',sans-serif;font-size:0.68rem;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:${edu.muted};margin-bottom:0.2rem">${item.label}</div>
            <div style="font-family:'Inter',sans-serif;font-size:0.88rem;color:${edu.text}">${item.val}</div>
          </div>
        </div>`).join('')}
      </div>
    </div>
    <div class="edu-fade" style="background:#fff;padding:3rem;border-radius:2px;box-shadow:0 4px 32px rgba(0,0,0,0.07)">
      <h3 style="font-family:'Merriweather',Georgia,serif;font-size:1.5rem;font-weight:700;color:${edu.text};margin-bottom:0.5rem">Get in Touch</h3>
      <p style="font-family:'Inter',sans-serif;font-size:0.82rem;color:${edu.muted};margin-bottom:2rem">We'll respond within one business day.</p>
      <form style="display:flex;flex-direction:column;gap:1.25rem" onsubmit="return false">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem">
          <div>
            <label style="font-family:'Inter',sans-serif;font-size:0.7rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:${edu.muted};display:block;margin-bottom:0.5rem">First Name</label>
            <input type="text" style="width:100%;box-sizing:border-box;font-family:'Inter',sans-serif;padding:0.85rem 1rem;border:1px solid ${edu.border};border-radius:2px;font-size:0.9rem;color:${edu.text};outline:none;transition:border-color 0.2s" />
          </div>
          <div>
            <label style="font-family:'Inter',sans-serif;font-size:0.7rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:${edu.muted};display:block;margin-bottom:0.5rem">Last Name</label>
            <input type="text" style="width:100%;box-sizing:border-box;font-family:'Inter',sans-serif;padding:0.85rem 1rem;border:1px solid ${edu.border};border-radius:2px;font-size:0.9rem;color:${edu.text};outline:none" />
          </div>
        </div>
        <div>
          <label style="font-family:'Inter',sans-serif;font-size:0.7rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:${edu.muted};display:block;margin-bottom:0.5rem">Email Address</label>
          <input type="email" style="width:100%;box-sizing:border-box;font-family:'Inter',sans-serif;padding:0.85rem 1rem;border:1px solid ${edu.border};border-radius:2px;font-size:0.9rem;color:${edu.text};outline:none" />
        </div>
        <div>
          <label style="font-family:'Inter',sans-serif;font-size:0.7rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:${edu.muted};display:block;margin-bottom:0.5rem">Program of Interest</label>
          <select style="width:100%;box-sizing:border-box;font-family:'Inter',sans-serif;padding:0.85rem 1rem;border:1px solid ${edu.border};border-radius:2px;font-size:0.9rem;color:${edu.muted};outline:none;background:#fff;appearance:none">
            <option value="">Select a program</option>
            ${content.services.map(s => `<option value="${s.name}">${s.name}</option>`).join('')}
          </select>
        </div>
        <div>
          <label style="font-family:'Inter',sans-serif;font-size:0.7rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:${edu.muted};display:block;margin-bottom:0.5rem">Message</label>
          <textarea placeholder="Tell us about your goals..." rows="4" style="width:100%;box-sizing:border-box;font-family:'Inter',sans-serif;padding:0.85rem 1rem;border:1px solid ${edu.border};border-radius:2px;font-size:0.9rem;color:${edu.text};outline:none;resize:none"></textarea>
        </div>
        <button type="submit" style="font-family:'Inter',sans-serif;font-size:0.8rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;padding:1.1rem 2.5rem;background:${edu.accent};color:#fff;border:none;cursor:pointer;border-radius:2px;transition:filter 0.25s ease">${content.ctaPrimary}</button>
      </form>
    </div>
  </div>
</section>

<footer style="padding:4rem 3rem 2.5rem;background:${edu.text}">
  <div style="max-width:1200px;margin:0 auto">
    <div style="display:grid;grid-template-columns:2fr 1fr 1fr;gap:4rem;margin-bottom:3rem">
      <div>
        <div style="font-family:'Merriweather',Georgia,serif;font-size:1.4rem;font-weight:700;color:#fff;margin-bottom:1rem">${businessName}</div>
        <p style="font-family:'Inter',sans-serif;font-size:0.82rem;color:rgba(255,255,255,0.4);line-height:1.8;max-width:280px;font-weight:300">${content.heroSubtitle}</p>
      </div>
      <div>
        <div style="font-family:'Inter',sans-serif;font-size:0.65rem;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;color:${edu.accent};margin-bottom:1.5rem">Programs</div>
        ${content.services.slice(0, 4).map(s => `<a href="#services" style="display:block;font-family:'Inter',sans-serif;font-size:0.82rem;color:rgba(255,255,255,0.4);text-decoration:none;margin-bottom:0.6rem;font-weight:300">${s.tags?.[0] || s.name}</a>`).join('')}
      </div>
      <div>
        <div style="font-family:'Inter',sans-serif;font-size:0.65rem;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;color:${edu.accent};margin-bottom:1.5rem">Company</div>
        <a href="#about" style="display:block;font-family:'Inter',sans-serif;font-size:0.82rem;color:rgba(255,255,255,0.4);text-decoration:none;margin-bottom:0.6rem;font-weight:300">About Us</a>
        <a href="#contact" style="display:block;font-family:'Inter',sans-serif;font-size:0.82rem;color:rgba(255,255,255,0.4);text-decoration:none;margin-bottom:0.6rem;font-weight:300">Contact</a>
        <a href="#" style="display:block;font-family:'Inter',sans-serif;font-size:0.82rem;color:rgba(255,255,255,0.4);text-decoration:none;margin-bottom:0.6rem;font-weight:300">Privacy Policy</a>
      </div>
    </div>
    <div style="border-top:1px solid rgba(255,255,255,0.08);padding-top:2rem;display:flex;justify-content:space-between;align-items:center">
      <p style="font-family:'Inter',sans-serif;font-size:0.72rem;color:rgba(255,255,255,0.25);font-weight:300">&copy; ${new Date().getFullYear()} ${businessName}. All rights reserved.</p>
      <p style="font-family:'Inter',sans-serif;font-size:0.72rem;color:rgba(255,255,255,0.25);font-weight:300">Education &amp; Growth</p>
    </div>
  </div>
</footer>

<script>
  const eduObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); eduObserver.unobserve(e.target); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('.edu-fade').forEach(el => eduObserver.observe(el));
</script>

</body>
</html>`
}