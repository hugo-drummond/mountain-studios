function buildPropertyTemplate(data: TemplateData): string {
  const { content, businessName, businessCategory, primaryColor, secondaryColor, pages, images, stockImages, locationInfo } = data
  const fonts = fontPairings[businessCategory] || fontPairings['other']
  const navFlags = resolveNavLinks(pages)

  const heroImg = images[0] || stockImages.hero
  const stockPool = buildImagePool(images, stockImages, businessName)
  const aboutImg = images[5] || stockImages.about
  let _pi = 0
  const galleryImgs = [
    images[1] || stockImages.cards[0],
    images[2] || stockImages.cards[1],
    images[3] || stockImages.cards[2],
    images[4] || stockImages.cards[3],
    stockPool[4] || stockImages.cards[4],
    stockPool[5] || stockImages.cards[5],
  ]

  const gold = primaryColor || '#c9a96e'
  const void_ = '#080808'
  const offwhite = '#f2ede8'
  const muted = '#8a8580'
  const border = 'rgba(201,169,110,0.2)'

  const headHtml = buildHead(businessName, fonts, primaryColor, secondaryColor, 'dark') + `<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@200;300;400;500&display=swap" rel="stylesheet"/>`

  const heroSection = `
  <section style="position:relative;min-height:calc(100vh - 64px);display:flex;flex-direction:column;overflow:hidden;background:${void_}">
    <div style="position:absolute;inset:0">
      <img src="${heroImg}" alt="" style="width:100%;height:100%;object-fit:cover;opacity:0.35" />
      <div style="position:absolute;inset:0;background:linear-gradient(to bottom,rgba(8,8,8,0.3) 0%,rgba(8,8,8,0.7) 60%,${void_} 100%)"></div>
    </div>
    <div style="position:relative;flex:1;display:flex;flex-direction:column;justify-content:flex-end;max-width:1400px;margin:0 auto;width:100%;padding:0 4rem 7rem">
      <div style="display:flex;align-items:center;gap:1rem;margin-bottom:2.5rem">
        <div style="width:40px;height:1px;background:${gold}"></div>
        <span style="font-family:'Jost',sans-serif;font-size:0.7rem;font-weight:300;letter-spacing:0.3em;text-transform:uppercase;color:${gold}">${content.heroEyebrow || 'Luxury Real Estate'}</span>
      </div>
      <h1 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(4rem,9vw,8rem);font-weight:300;color:${offwhite};line-height:0.92;letter-spacing:-0.02em;margin-bottom:2.5rem;font-style:italic">${businessName}</h1>
      <div style="display:flex;align-items:flex-end;justify-content:space-between;flex-wrap:wrap;gap:2rem">
        <p style="font-family:'Jost',sans-serif;font-size:1rem;font-weight:200;color:rgba(242,237,232,0.65);line-height:1.8;max-width:480px">${content.heroSubtitle}</p>
        <div style="display:flex;gap:1rem;flex-shrink:0">
          <a href="#properties" style="font-family:'Jost',sans-serif;font-size:0.75rem;font-weight:400;letter-spacing:0.15em;text-transform:uppercase;padding:1rem 2.5rem;border:1px solid ${gold};color:${gold};text-decoration:none;transition:all 0.3s ease">View Properties</a>
          <a href="#contact" style="font-family:'Jost',sans-serif;font-size:0.75rem;font-weight:400;letter-spacing:0.15em;text-transform:uppercase;padding:1rem 2.5rem;background:${gold};color:${void_};text-decoration:none">${content.ctaPrimary}</a>
        </div>
      </div>
    </div>
    <div style="position:relative;display:flex;justify-content:center;padding:2rem 4rem;border-top:1px solid ${border}">
      <div style="display:flex;gap:6rem;flex-wrap:wrap;justify-content:center">
        ${content.stats.slice(0, 3).map(s => `
        <div style="text-align:center">
          <div style="font-family:'Cormorant Garamond',Georgia,serif;font-size:2.5rem;font-weight:300;color:${offwhite};line-height:1">${s.value}</div>
          <div style="font-family:'Jost',sans-serif;font-size:0.65rem;font-weight:300;letter-spacing:0.2em;text-transform:uppercase;color:${muted};margin-top:0.4rem">${s.label}</div>
        </div>`).join('')}
      </div>
    </div>
  </section>`

  const propertiesSection = `
  <section id="properties" style="padding:140px 0;background:${void_}">
    <div style="max-width:1400px;margin:0 auto;padding:0 4rem">
      <div style="display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:5rem;flex-wrap:wrap;gap:2rem">
        <div>
          <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1.5rem">
            <div style="width:30px;height:1px;background:${gold}"></div>
            <span style="font-family:'Jost',sans-serif;font-size:0.65rem;font-weight:300;letter-spacing:0.3em;text-transform:uppercase;color:${gold}">Our Portfolio</span>
          </div>
          <h2 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(3rem,5vw,5rem);font-weight:300;color:${offwhite};line-height:1;font-style:italic">${content.galleryHeading || 'Featured Properties'}</h2>
        </div>
        <a href="#contact" style="font-family:'Jost',sans-serif;font-size:0.7rem;font-weight:400;letter-spacing:0.2em;text-transform:uppercase;color:${gold};text-decoration:none;border-bottom:1px solid ${gold};padding-bottom:0.25rem">View All Listings &rarr;</a>
      </div>
      <div style="display:grid;grid-template-columns:1.4fr 1fr;gap:1.5px;background:${border}">
        ${[0,1].map((i) => {
          const propCaption = (content.projectCaptions && content.projectCaptions[i]) ? content.projectCaptions[i] : (i === 0 ? 'Clifton Penthouse' : 'Bishopscourt Manor')
          const propSub = (content.features && content.features[i]) ? content.features[i].name : (i === 0 ? 'Clifton, Atlantic Seaboard' : 'Bishopscourt, Southern Suburbs')
          return `
        <div style="position:relative;overflow:hidden;background:${void_}">
          <div style="height:${i === 0 ? '580px' : '580px'};overflow:hidden">
            <img src="${galleryImgs[i]}" alt="" style="width:100%;height:100%;object-fit:cover;transition:transform 0.8s ease" onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform='scale(1)'" />
          </div>
          <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(8,8,8,0.85) 0%,transparent 50%)"></div>
          <div style="position:absolute;bottom:0;left:0;right:0;padding:2rem 2.5rem">
            <div style="font-family:'Jost',sans-serif;font-size:0.65rem;font-weight:300;letter-spacing:0.2em;text-transform:uppercase;color:${gold};margin-bottom:0.5rem">${propSub}</div>
            <h3 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:1.8rem;font-weight:300;color:${offwhite};font-style:italic">${propCaption}</h3>
          </div>
          <div style="position:absolute;top:1.5rem;right:1.5rem;background:${gold};padding:0.35rem 0.9rem">
            <span style="font-family:'Jost',sans-serif;font-size:0.6rem;font-weight:400;letter-spacing:0.15em;text-transform:uppercase;color:${void_}">For Sale</span>
          </div>
        </div>`
        }).join('')}
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:1.5px;background:${border};margin-top:1.5px">
        ${[2,3,4].map((i) => {
          const propCaption = (content.projectCaptions && content.projectCaptions[i]) ? content.projectCaptions[i] : (['Camps Bay Villa','Sea Point Apartment','Constantia Estate'][i-2] || 'Luxury Residence')
          const propSub = (content.features && content.features[i]) ? content.features[i].name : (['Camps Bay','Sea Point','Constantia'][i-2] || locationInfo.city)
          return `
        <div style="position:relative;overflow:hidden;background:${void_}">
          <div style="height:360px;overflow:hidden">
            <img src="${galleryImgs[i] || stockPool[_pi++]}" alt="" style="width:100%;height:100%;object-fit:cover;transition:transform 0.8s ease" onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform='scale(1)'" />
          </div>
          <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(8,8,8,0.85) 0%,transparent 55%)"></div>
          <div style="position:absolute;bottom:0;left:0;right:0;padding:1.5rem 2rem">
            <div style="font-family:'Jost',sans-serif;font-size:0.6rem;font-weight:300;letter-spacing:0.2em;text-transform:uppercase;color:${gold};margin-bottom:0.35rem">${propSub}</div>
            <h3 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:1.4rem;font-weight:300;color:${offwhite};font-style:italic">${propCaption}</h3>
          </div>
        </div>`
        }).join('')}
      </div>
    </div>
  </section>`

  const aboutSection = `
  <section id="about" style="padding:140px 0;background:#0d0d0d">
    <div style="max-width:1400px;margin:0 auto;padding:0 4rem">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8rem;align-items:center" class="ms-grid">
        <div>
          <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:2rem">
            <div style="width:30px;height:1px;background:${gold}"></div>
            <span style="font-family:'Jost',sans-serif;font-size:0.65rem;font-weight:300;letter-spacing:0.3em;text-transform:uppercase;color:${gold}">About</span>
          </div>
          <h2 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(2.5rem,4vw,4rem);font-weight:300;color:${offwhite};line-height:1.1;font-style:italic;margin-bottom:2.5rem">${content.aboutHeading}</h2>
          ${content.aboutMission ? `<p style="font-family:'Cormorant Garamond',Georgia,serif;font-size:1.25rem;font-weight:300;color:${offwhite};line-height:1.6;font-style:italic;margin-bottom:2rem;border-left:2px solid ${gold};padding-left:1.5rem">${content.aboutMission}</p>` : ''}
          ${content.aboutText.split('\n').filter(p => p.trim()).map(p => `<p style="font-family:'Jost',sans-serif;font-size:0.9rem;font-weight:200;color:${muted};line-height:2;margin-bottom:1.25rem">${p}</p>`).join('')}
          <a href="#contact" style="display:inline-flex;align-items:center;gap:0.75rem;font-family:'Jost',sans-serif;font-size:0.7rem;font-weight:400;letter-spacing:0.2em;text-transform:uppercase;color:${gold};text-decoration:none;margin-top:1rem">${content.ctaSecondary || 'Learn More'} <span style="width:40px;height:1px;background:${gold};display:inline-block"></span></a>
        </div>
        <div style="position:relative">
          <div style="position:absolute;top:-1.5rem;left:-1.5rem;right:1.5rem;bottom:1.5rem;border:1px solid ${border}"></div>
          <div style="overflow:hidden;height:600px;position:relative">
            <img src="${aboutImg}" alt="" style="width:100%;height:100%;object-fit:cover" />
          </div>
          <div style="position:absolute;bottom:-2rem;right:-2rem;background:${gold};padding:2rem 2.5rem;min-width:180px">
            <div style="font-family:'Cormorant Garamond',Georgia,serif;font-size:3rem;font-weight:300;color:${void_};line-height:1">${content.stats[0]?.value || '20+'}</div>
            <div style="font-family:'Jost',sans-serif;font-size:0.65rem;font-weight:300;letter-spacing:0.2em;text-transform:uppercase;color:${void_};opacity:0.7;margin-top:0.4rem">${content.stats[0]?.label || 'Years Experience'}</div>
          </div>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:0;border:1px solid ${border};margin-top:7rem" class="ms-grid">
        ${content.stats.slice(1, 5).map((s, i) => `
        <div style="padding:2.5rem;${i > 0 ? 'border-left:1px solid ' + border : ''}">
          <div style="font-family:'Cormorant Garamond',Georgia,serif;font-size:3rem;font-weight:300;color:${gold};line-height:1">${s.value}</div>
          <div style="font-family:'Jost',sans-serif;font-size:0.65rem;font-weight:300;letter-spacing:0.2em;text-transform:uppercase;color:${muted};margin-top:0.6rem">${s.label}</div>
          ${s.sublabel ? `<div style="font-family:'Jost',sans-serif;font-size:0.75rem;font-weight:200;color:${muted};margin-top:0.35rem;opacity:0.6">${s.sublabel}</div>` : ''}
        </div>`).join('')}
      </div>
    </div>
  </section>`

  const servicesSection = `
  <section id="services" style="padding:140px 0;background:${void_}">
    <div style="max-width:1400px;margin:0 auto;padding:0 4rem">
      <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1.5rem">
        <div style="width:30px;height:1px;background:${gold}"></div>
        <span style="font-family:'Jost',sans-serif;font-size:0.65rem;font-weight:300;letter-spacing:0.3em;text-transform:uppercase;color:${gold}">What We Do</span>
      </div>
      <h2 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(3rem,5vw,5rem);font-weight:300;color:${offwhite};line-height:1;font-style:italic;margin-bottom:5rem">${content.servicesHeading}</h2>
      <div style="display:grid;grid-template-columns:1fr;gap:0">
        ${content.services.map((s, i) => `
        <div style="display:grid;grid-template-columns:80px 1fr 1.5fr auto;gap:2rem;align-items:start;padding:3rem 0;border-bottom:1px solid ${border}" class="ms-grid">
          <div style="font-family:'Cormorant Garamond',Georgia,serif;font-size:4rem;font-weight:300;color:${border.replace('0.2','0.4')};line-height:1;padding-top:0.25rem">${String(i + 1).padStart(2, '0')}</div>
          <h3 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:1.6rem;font-weight:300;color:${offwhite};font-style:italic;padding-top:0.5rem">${s.name}</h3>
          <p style="font-family:'Jost',sans-serif;font-size:0.85rem;font-weight:200;color:${muted};line-height:1.9">${s.description}</p>
          <a href="#contact" style="font-family:'Jost',sans-serif;font-size:0.65rem;font-weight:400;letter-spacing:0.2em;text-transform:uppercase;color:${gold};text-decoration:none;border:1px solid ${border};padding:0.75rem 1.5rem;white-space:nowrap;transition:all 0.3s" onmouseover="this.style.borderColor='${gold}'" onmouseout="this.style.borderColor='${border}'">Enquire</a>
        </div>`).join('')}
      </div>
    </div>
  </section>`

  const testimonialSection = content.testimonial ? `
  <section style="padding:140px 0;background:#0a0a0a;overflow:hidden">
    <div style="max-width:1400px;margin:0 auto;padding:0 4rem">
      <div style="display:grid;grid-template-columns:1fr 2fr;gap:8rem;align-items:start" class="ms-grid">
        <div>
          <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1.5rem">
            <div style="width:30px;height:1px;background:${gold}"></div>
            <span style="font-family:'Jost',sans-serif;font-size:0.65rem;font-weight:300;letter-spacing:0.3em;text-transform:uppercase;color:${gold}">Testimonials</span>
          </div>
          <h2 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(2rem,3vw,3rem);font-weight:300;color:${offwhite};font-style:italic;line-height:1.2">What Our Clients Say</h2>
        </div>
        <div>
          <div style="font-family:'Cormorant Garamond',Georgia,serif;font-size:8rem;font-weight:300;color:${border};line-height:0.6;margin-bottom:2rem">&ldquo;</div>
          <p style="font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(1.4rem,2.5vw,2rem);font-weight:300;color:${offwhite};line-height:1.6;font-style:italic;margin-bottom:2.5rem">${content.testimonial.quote}</p>
          <div style="display:flex;align-items:center;gap:1.5rem">
            <div style="width:1px;height:50px;background:${gold}"></div>
            <div>
              <div style="font-family:'Jost',sans-serif;font-size:0.8rem;font-weight:400;color:${offwhite};letter-spacing:0.1em;text-transform:uppercase">${content.testimonial.author.split(',')[0]}</div>
              <div style="font-family:'Jost',sans-serif;font-size:0.75rem;font-weight:200;color:${muted};margin-top:0.25rem">${content.testimonial.author.split(',')[1]?.trim() || 'Valued Client'}</div>
              ${content.testimonial.rating ? `<div style="color:${gold};font-size:0.75rem;letter-spacing:0.15em;margin-top:0.4rem">${'&#9733;'.repeat(content.testimonial.rating)}</div>` : ''}
            </div>
          </div>
          ${(() => {
            const fallbacks = getFallbackTestimonials(content, 'property')
            return fallbacks.slice(0, 2).map(t => `
          <div style="margin-top:3rem;padding-top:3rem;border-top:1px solid ${border}">
            <p style="font-family:'Cormorant Garamond',Georgia,serif;font-size:1.15rem;font-weight:300;color:${muted};line-height:1.7;font-style:italic;margin-bottom:1.5rem">${t.quote}</p>
            <div style="font-family:'Jost',sans-serif;font-size:0.75rem;font-weight:300;color:${muted};letter-spacing:0.1em">— ${t.author}</div>
          </div>`).join('')
          })()}
        </div>
      </div>
    </div>
  </section>` : ''

  const contactSection = `
  <section id="contact" style="padding:140px 0;background:${void_}">
    <div style="max-width:1400px;margin:0 auto;padding:0 4rem">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8rem;align-items:start" class="ms-grid">
        <div>
          <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1.5rem">
            <div style="width:30px;height:1px;background:${gold}"></div>
            <span style="font-family:'Jost',sans-serif;font-size:0.65rem;font-weight:300;letter-spacing:0.3em;text-transform:uppercase;color:${gold}">Get in Touch</span>
          </div>
          <h2 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(2.5rem,4vw,4rem);font-weight:300;color:${offwhite};line-height:1.1;font-style:italic;margin-bottom:2.5rem">${content.contactHeading}</h2>
          <p style="font-family:'Jost',sans-serif;font-size:0.9rem;font-weight:200;color:${muted};line-height:2;margin-bottom:3rem">${content.aboutMission || content.heroSubtitle}</p>
          <div style="display:flex;flex-direction:column;gap:2rem;border-top:1px solid ${border};padding-top:3rem">
            <div>
              <div style="font-family:'Jost',sans-serif;font-size:0.6rem;font-weight:300;letter-spacing:0.25em;text-transform:uppercase;color:${gold};margin-bottom:0.5rem">Address</div>
              <div style="font-family:'Jost',sans-serif;font-size:0.9rem;font-weight:200;color:${offwhite}">${locationInfo.address}, ${locationInfo.city}</div>
            </div>
            <div>
              <div style="font-family:'Jost',sans-serif;font-size:0.6rem;font-weight:300;letter-spacing:0.25em;text-transform:uppercase;color:${gold};margin-bottom:0.5rem">Contact</div>
              <div style="font-family:'Jost',sans-serif;font-size:0.9rem;font-weight:200;color:${offwhite}">${locationInfo.phone}<br/>hello@${businessName.toLowerCase().replace(/\s/g,'')}.com</div>
            </div>
            ${content.contactHours ? `<div>
              <div style="font-family:'Jost',sans-serif;font-size:0.6rem;font-weight:300;letter-spacing:0.25em;text-transform:uppercase;color:${gold};margin-bottom:0.5rem">Office Hours</div>
              <div style="font-family:'Jost',sans-serif;font-size:0.9rem;font-weight:200;color:${offwhite}">${content.contactHours.replace(/ · /g, '<br/>')}</div>
            </div>` : ''}
          </div>
        </div>
        <div style="border:1px solid ${border};padding:3rem">
          <h3 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:1.5rem;font-weight:300;color:${offwhite};font-style:italic;margin-bottom:2rem">Send an Enquiry</h3>
          <form style="display:flex;flex-direction:column;gap:1.5rem" onsubmit="return false">
            <div>
              <label style="font-family:'Jost',sans-serif;font-size:0.6rem;font-weight:300;letter-spacing:0.25em;text-transform:uppercase;color:${gold};display:block;margin-bottom:0.6rem">Full Name</label>
              <input type="text" placeholder="Your name" style="width:100%;box-sizing:border-box;font-family:'Jost',sans-serif;font-weight:200;padding:0.85rem 0;background:transparent;border:none;border-bottom:1px solid ${border};color:${offwhite};font-size:0.9rem;outline:none" />
            </div>
            <div>
              <label style="font-family:'Jost',sans-serif;font-size:0.6rem;font-weight:300;letter-spacing:0.25em;text-transform:uppercase;color:${gold};display:block;margin-bottom:0.6rem">Email</label>
              <input type="email" placeholder="your@email.com" style="width:100%;box-sizing:border-box;font-family:'Jost',sans-serif;font-weight:200;padding:0.85rem 0;background:transparent;border:none;border-bottom:1px solid ${border};color:${offwhite};font-size:0.9rem;outline:none" />
            </div>
            <div>
              <label style="font-family:'Jost',sans-serif;font-size:0.6rem;font-weight:300;letter-spacing:0.25em;text-transform:uppercase;color:${gold};display:block;margin-bottom:0.6rem">Phone</label>
              <input type="tel" placeholder="${locationInfo.phone}" style="width:100%;box-sizing:border-box;font-family:'Jost',sans-serif;font-weight:200;padding:0.85rem 0;background:transparent;border:none;border-bottom:1px solid ${border};color:${offwhite};font-size:0.9rem;outline:none" />
            </div>
            <div>
              <label style="font-family:'Jost',sans-serif;font-size:0.6rem;font-weight:300;letter-spacing:0.25em;text-transform:uppercase;color:${gold};display:block;margin-bottom:0.6rem">Message</label>
              <textarea placeholder="Tell us about the property you are looking for..." rows="4" style="width:100%;box-sizing:border-box;font-family:'Jost',sans-serif;font-weight:200;padding:0.85rem 0;background:transparent;border:none;border-bottom:1px solid ${border};color:${offwhite};font-size:0.9rem;outline:none;resize:none"></textarea>
            </div>
            <button type="submit" style="font-family:'Jost',sans-serif;font-size:0.7rem;font-weight:400;letter-spacing:0.2em;text-transform:uppercase;padding:1rem 2.5rem;background:${gold};color:${void_};border:none;cursor:pointer;align-self:flex-start;transition:opacity 0.3s">Submit Enquiry</button>
          </form>
        </div>
      </div>
    </div>
  </section>`

  const prFooter = `
  <footer style="padding:6rem 4rem 3rem;background:#050505;border-top:1px solid ${border}">
    <div style="max-width:1400px;margin:0 auto">
      <div style="display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:4rem;margin-bottom:5rem" class="ms-grid">
        <div>
          <div style="font-family:'Cormorant Garamond',Georgia,serif;font-size:2rem;font-weight:300;color:${offwhite};font-style:italic;margin-bottom:1.5rem;letter-spacing:0.05em">${businessName}</div>
          <p style="font-family:'Jost',sans-serif;font-size:0.8rem;font-weight:200;color:${muted};line-height:1.9;max-width:320px">${content.heroSubtitle}</p>
        </div>
        <div>
          <div style="font-family:'Jost',sans-serif;font-size:0.6rem;font-weight:300;letter-spacing:0.25em;text-transform:uppercase;color:${gold};margin-bottom:1.5rem">Navigate</div>
          <a href="#properties" style="font-family:'Jost',sans-serif;font-size:0.8rem;font-weight:200;color:${muted};text-decoration:none;display:block;margin-bottom:0.75rem;transition:color 0.2s">Properties</a>
          <a href="#about" style="font-family:'Jost',sans-serif;font-size:0.8rem;font-weight:200;color:${muted};text-decoration:none;display:block;margin-bottom:0.75rem">About</a>
          <a href="#services" style="font-family:'Jost',sans-serif;font-size:0.8rem;font-weight:200;color:${muted};text-decoration:none;display:block;margin-bottom:0.75rem">Services</a>
          <a href="#contact" style="font-family:'Jost',sans-serif;font-size:0.8rem;font-weight:200;color:${muted};text-decoration:none;display:block;margin-bottom:0.75rem">Contact</a>
        </div>
        <div>
          <div style="font-family:'Jost',sans-serif;font-size:0.6rem;font-weight:300;letter-spacing:0.25em;text-transform:uppercase;color:${gold};margin-bottom:1.5rem">Services</div>
          ${content.services.slice(0, 4).map(s => `<a href="#services" style="font-family:'Jost',sans-serif;font-size:0.8rem;font-weight:200;color:${muted};text-decoration:none;display:block;margin-bottom:0.75rem">${s.tags?.[0] || s.name}</a>`).join('')}
        </div>
        <div>
          <div style="font-family:'Jost',sans-serif;font-size:0.6rem;font-weight:300;letter-spacing:0.25em;text-transform:uppercase;color:${gold};margin-bottom:1.5rem">Contact</div>
          <p style="font-family:'Jost',sans-serif;font-size:0.8rem;font-weight:200;color:${muted};line-height:1.9">${locationInfo.address}<br/>${locationInfo.city}<br/>${locationInfo.phone}</p>
        </div>
      </div>
      <div style="border-top:1px solid ${border};padding-top:2rem;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem">
        <p style="font-family:'Jost',sans-serif;font-size:0.7rem;font-weight:200;color:${muted}">&copy; ${new Date().getFullYear()} ${businessName}. All rights reserved.</p>
        <div style="display:flex;gap:2rem">
          <a href="#" style="font-family:'Jost',sans-serif;font-size:0.7rem;font-weight:200;color:${muted};text-decoration:none">Privacy Policy</a>
          <a href="#" style="font-family:'Jost',sans-serif;font-size:0.7rem;font-weight:200;color:${muted};text-decoration:none">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>`

  return `${headHtml}
  <style>
    :root {
      --bg: ${void_};
      --bg-alt: #0d0d0d;
      --card-bg: #111111;
      --text: ${offwhite};
      --text-muted: ${muted};
      --border: ${border};
      --primary: ${gold};
      --secondary: ${secondaryColor};
    }
  </style>

${buildStandardNav(businessName, content, navFlags)}

${heroSection}
${propertiesSection}
${aboutSection}
${servicesSection}
${testimonialSection}
${contactSection}
${prFooter}

</body>
</html>`
}

function buildCreativeTemplate(data: TemplateData): string {
  const { content, businessName, businessCategory, primaryColor, secondaryColor, pages, images, stockImages, locationInfo } = data
  const fonts = fontPairings[businessCategory] || fontPairings['other']
  const navFlags = resolveNavLinks(pages)

  const heroImg = images[0] || stockImages.hero
  const stockPool = buildImagePool(images, stockImages, businessName)
  const aboutImg = images[5] || stockImages.about
  let _pi = 0

  const ink = '#0a0a08'
  const chalk = '#f7f5f0'
  const stone = '#e8e4dd'
  const dust = '#9a9590'
  const accent = primaryColor || '#d4522a'
  const headHtml = buildHead(businessName, fonts, primaryColor, secondaryColor, 'light') + `<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet"/>`

  const heroSection = `
  <section style="background:${ink};min-height:calc(100vh - 64px);display:grid;grid-template-columns:1fr 1fr;overflow:hidden" class="ms-grid">
    <div style="display:flex;flex-direction:column;justify-content:space-between;padding:5rem 4rem;position:relative;z-index:1">
      <div style="font-family:'Space Grotesk',sans-serif;font-size:0.7rem;font-weight:400;letter-spacing:0.25em;text-transform:uppercase;color:${dust}">Creative Studio</div>
      <div>
        <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1.5rem">
          <div style="width:40px;height:1px;background:${accent}"></div>
          <span style="font-family:'Space Grotesk',sans-serif;font-size:0.65rem;font-weight:400;letter-spacing:0.25em;text-transform:uppercase;color:${accent}">${content.heroEyebrow || 'Portfolio'}</span>
        </div>
        <h1 style="font-family:'Instrument Serif',Georgia,serif;font-size:clamp(4rem,7vw,7rem);font-weight:400;color:${chalk};line-height:0.9;letter-spacing:-0.02em;margin-bottom:2.5rem;font-style:italic">${businessName}</h1>
        <p style="font-family:'Space Grotesk',sans-serif;font-size:1rem;font-weight:300;color:${dust};line-height:1.8;max-width:420px;margin-bottom:3rem">${content.heroSubtitle}</p>
        <div style="display:flex;gap:1rem;align-items:center;flex-wrap:wrap">
          <a href="#work" style="font-family:'Space Grotesk',sans-serif;font-size:0.75rem;font-weight:500;letter-spacing:0.12em;text-transform:uppercase;padding:1rem 2.5rem;background:${accent};color:#fff;text-decoration:none">${content.ctaPrimary}</a>
          <a href="#about" style="font-family:'Space Grotesk',sans-serif;font-size:0.75rem;font-weight:400;letter-spacing:0.12em;text-transform:uppercase;color:${dust};text-decoration:none;border-bottom:1px solid ${dust};padding-bottom:0.1rem">${content.ctaSecondary || 'About'}</a>
        </div>
      </div>
      <div style="display:flex;gap:3rem">
        ${content.stats.slice(0, 3).map(s => `
        <div>
          <div style="font-family:'Instrument Serif',Georgia,serif;font-size:2rem;font-weight:400;color:${chalk};font-style:italic">${s.value}</div>
          <div style="font-family:'Space Grotesk',sans-serif;font-size:0.65rem;font-weight:400;letter-spacing:0.15em;text-transform:uppercase;color:${dust};margin-top:0.25rem">${s.label}</div>
        </div>`).join('')}
      </div>
    </div>
    <div style="position:relative;overflow:hidden">
      <img src="${heroImg}" alt="" style="width:100%;height:100%;object-fit:cover;filter:grayscale(20%)" />
      <div style="position:absolute;inset:0;background:linear-gradient(to right,${ink} 0%,transparent 30%)"></div>
      <div style="position:absolute;bottom:3rem;right:3rem;background:${accent};padding:1rem 1.5rem">
        <div style="font-family:'Space Grotesk',sans-serif;font-size:0.65rem;font-weight:500;letter-spacing:0.2em;text-transform:uppercase;color:#fff">${content.badge || 'Available for Work'}</div>
      </div>
    </div>
  </section>`

  const marqueeSection = `
  <section style="background:${accent};padding:1.25rem 0;overflow:hidden;white-space:nowrap">
    <div style="display:inline-flex;gap:4rem;animation:marquee 20s linear infinite">
      ${[...content.services.map(s => s.name), ...content.services.map(s => s.name)].map(name => `<span style="font-family:'Space Grotesk',sans-serif;font-size:0.75rem;font-weight:500;letter-spacing:0.2em;text-transform:uppercase;color:#fff">${name} &nbsp;&bull;</span>`).join('')}
    </div>
    <style>@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }</style>
  </section>`

  const workSection = `
  <section id="work" style="padding:120px 0;background:${chalk}">
    <div style="max-width:1400px;margin:0 auto;padding:0 4rem">
      <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:5rem;flex-wrap:wrap;gap:1.5rem">
        <h2 style="font-family:'Instrument Serif',Georgia,serif;font-size:clamp(3rem,5vw,5.5rem);font-weight:400;color:${ink};font-style:italic;line-height:0.9">${content.galleryHeading || 'Selected Work'}</h2>
        <p style="font-family:'Space Grotesk',sans-serif;font-size:0.8rem;font-weight:300;color:${dust};max-width:300px;line-height:1.7">${content.aboutMission || content.heroSubtitle}</p>
      </div>
      <div style="display:grid;grid-template-columns:7fr 5fr;gap:1.5rem;margin-bottom:1.5rem" class="ms-grid">
        <div style="position:relative;overflow:hidden;group">
          <div style="height:580px;overflow:hidden">
            <img src="${stockPool[_pi++] || stockImages.cards[0]}" alt="" style="width:100%;height:100%;object-fit:cover;transition:transform 0.6s ease" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'" />
          </div>
          <div style="position:absolute;inset:0;background:rgba(10,10,8,0);transition:background 0.3s ease;display:flex;align-items:flex-end;padding:2rem" onmouseover="this.style.background='rgba(10,10,8,0.6)'" onmouseout="this.style.background='rgba(10,10,8,0)'">
            <div style="opacity:0;transform:translateY(10px);transition:all 0.3s ease" onmouseover="this.parentElement.style.opacity='1';this.style.opacity='1';this.style.transform='translateY(0)'" >
              <p style="font-family:'Space Grotesk',sans-serif;font-size:0.65rem;font-weight:400;letter-spacing:0.15em;text-transform:uppercase;color:${accent};margin-bottom:0.4rem">${(content.features && content.features[0]) ? (content.features[0] as {name:string;description:string}).name : (content.services[0]?.tags?.[0] || 'Photography')}</p>
              <h3 style="font-family:'Instrument Serif',Georgia,serif;font-size:1.5rem;font-weight:400;color:#fff;font-style:italic">${(content.projectCaptions && content.projectCaptions[0]) || content.services[0]?.name || 'Editorial Series'}</h3>
            </div>
          </div>
          <div style="padding:1.25rem 0">
            <p style="font-family:'Space Grotesk',sans-serif;font-size:0.65rem;font-weight:400;letter-spacing:0.15em;text-transform:uppercase;color:${dust};margin-bottom:0.35rem">${(content.features && content.features[0]) ? (content.features[0] as {name:string}).name : (content.services[0]?.tags?.[0] || 'Photography')}</p>
            <h3 style="font-family:'Instrument Serif',Georgia,serif;font-size:1.6rem;font-weight:400;color:${ink};font-style:italic">${(content.projectCaptions && content.projectCaptions[0]) || content.services[0]?.name || 'Editorial Series'}</h3>
          </div>
        </div>
        <div style="display:flex;flex-direction:column;gap:1.5rem">
          ${[1,2].map((idx) => `
          <div style="position:relative;overflow:hidden;flex:1">
            <div style="height:100%;min-height:250px;overflow:hidden">
              <img src="${stockPool[_pi++] || stockImages.cards[idx]}" alt="" style="width:100%;height:100%;object-fit:cover;transition:transform 0.6s ease" onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform='scale(1)'" />
            </div>
            <div style="padding:1rem 0">
              <p style="font-family:'Space Grotesk',sans-serif;font-size:0.6rem;font-weight:400;letter-spacing:0.15em;text-transform:uppercase;color:${dust};margin-bottom:0.25rem">${content.services[idx]?.tags?.[0] || 'Creative'}</p>
              <h3 style="font-family:'Instrument Serif',Georgia,serif;font-size:1.2rem;font-weight:400;color:${ink};font-style:italic">${(content.projectCaptions && content.projectCaptions[idx]) || content.services[idx]?.name || 'Project'}</h3>
            </div>
          </div>`).join('')}
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:1.5rem" class="ms-grid">
        ${[3,4,5].map((idx) => `
        <div>
          <div style="overflow:hidden;height:340px">
            <img src="${stockPool[_pi++] || stockImages.cards[idx]}" alt="" style="width:100%;height:100%;object-fit:cover;transition:transform 0.6s ease" onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform='scale(1)'" />
          </div>
          <div style="padding:1rem 0">
            <p style="font-family:'Space Grotesk',sans-serif;font-size:0.6rem;font-weight:400;letter-spacing:0.15em;text-transform:uppercase;color:${dust};margin-bottom:0.25rem">${content.services[idx % content.services.length]?.tags?.[0] || 'Creative'}</p>
            <h3 style="font-family:'Instrument Serif',Georgia,serif;font-size:1.1rem;font-weight:400;color:${ink};font-style:italic">${(content.projectCaptions && content.projectCaptions[idx]) || content.services[idx % content.services.length]?.name || 'Project'}</h3>
          </div>
        </div>`).join('')}
      </div>
    </div>
  </section>`

  const servicesSection = `
  <section id="services" style="padding:120px 0;background:${ink}">
    <div style="max-width:1400px;margin:0 auto;padding:0 4rem">
      <div style="display:grid;grid-template-columns:1fr 2fr;gap:8rem;align-items:start" class="ms-grid">
        <div>
          <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1.5rem">
            <div style="width:30px;height:1px;background:${accent}"></div>
            <span style="font-family:'Space Grotesk',sans-serif;font-size:0.65rem;font-weight:400;letter-spacing:0.25em;text-transform:uppercase;color:${accent}">Services</span>
          </div>
          <h2 style="font-family:'Instrument Serif',Georgia,serif;font-size:clamp(2.5rem,4vw,4rem);font-weight:400;color:${chalk};font-style:italic;line-height:1.1">${content.servicesHeading}</h2>
          <p style="font-family:'Space Grotesk',sans-serif;font-size:0.85rem;font-weight:300;color:${dust};line-height:1.9;margin-top:1.5rem">${content.aboutMission || content.heroSubtitle}</p>
        </div>
        <div>
          ${content.services.map((s, i) => `
          <div style="display:flex;gap:2.5rem;padding:2rem 0;border-bottom:1px solid rgba(247,245,240,0.08);align-items:start">
            <div style="font-family:'Instrument Serif',Georgia,serif;font-size:1.2rem;font-weight:400;color:rgba(247,245,240,0.2);font-style:italic;flex-shrink:0;width:2.5rem">${String(i + 1).padStart(2, '0')}</div>
            <div style="flex:1">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem">
                <h3 style="font-family:'Space Grotesk',sans-serif;font-size:1.1rem;font-weight:500;color:${chalk}">${s.name}</h3>
                <div style="display:flex;gap:0.5rem;flex-wrap:wrap">
                  ${s.tags.slice(0, 2).map(tag => `<span style="font-family:'Space Grotesk',sans-serif;font-size:0.6rem;font-weight:400;letter-spacing:0.1em;text-transform:uppercase;padding:0.2rem 0.6rem;border:1px solid rgba(247,245,240,0.15);color:${dust}">${tag}</span>`).join('')}
                </div>
              </div>
              <p style="font-family:'Space Grotesk',sans-serif;font-size:0.85rem;font-weight:300;color:${dust};line-height:1.8">${s.description}</p>
            </div>
          </div>`).join('')}
        </div>
      </div>
    </div>
  </section>`

  const aboutSection = `
  <section id="about" style="padding:120px 0;background:${stone}">
    <div style="max-width:1400px;margin:0 auto;padding:0 4rem">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8rem;align-items:center" class="ms-grid">
        <div style="position:relative">
          <div style="overflow:hidden;height:650px">
            <img src="${aboutImg}" alt="" style="width:100%;height:100%;object-fit:cover" />
          </div>
          <div style="position:absolute;top:-2rem;right:-2rem;width:180px;height:180px;border:1px solid rgba(10,10,8,0.15);z-index:-1"></div>
        </div>
        <div>
          <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1.5rem">
            <div style="width:30px;height:1px;background:${accent}"></div>
            <span style="font-family:'Space Grotesk',sans-serif;font-size:0.65rem;font-weight:400;letter-spacing:0.25em;text-transform:uppercase;color:${accent}">About</span>
          </div>
          <h2 style="font-family:'Instrument Serif',Georgia,serif;font-size:clamp(2.5rem,4vw,4rem);font-weight:400;color:${ink};font-style:italic;line-height:1.1;margin-bottom:2rem">${content.aboutHeading}</h2>
          ${content.aboutMission ? `<p style="font-family:'Instrument Serif',Georgia,serif;font-size:1.3rem;font-weight:400;color:${ink};font-style:italic;line-height:1.5;margin-bottom:2rem">${content.aboutMission}</p>` : ''}
          ${content.aboutText.split('\n').filter(p => p.trim()).map(p => `<p style="font-family:'Space Grotesk',sans-serif;font-size:0.9rem;font-weight:300;color:#4a4a45;line-height:1.9;margin-bottom:1.25rem">${p}</p>`).join('')}
          <a href="#contact" style="display:inline-flex;align-items:center;gap:1rem;font-family:'Space Grotesk',sans-serif;font-size:0.75rem;font-weight:500;letter-spacing:0.15em;text-transform:uppercase;color:${ink};text-decoration:none;margin-top:2rem;border-bottom:1px solid ${ink};padding-bottom:0.25rem">${content.ctaPrimary} &rarr;</a>
        </div>
      </div>
    </div>
  </section>`

  const testimonialSection = content.testimonial ? `
  <section style="padding:100px 0;background:${accent}">
    <div style="max-width:900px;margin:0 auto;padding:0 4rem;text-align:center">
      <div style="font-family:'Instrument Serif',Georgia,serif;font-size:6rem;font-weight:400;color:rgba(255,255,255,0.2);line-height:0.6;margin-bottom:2.5rem">&ldquo;</div>
      <p style="font-family:'Instrument Serif',Georgia,serif;font-size:clamp(1.5rem,3vw,2.5rem);font-weight:400;color:#fff;line-height:1.4;font-style:italic;margin-bottom:2.5rem">${content.testimonial.quote}</p>
      <div style="font-family:'Space Grotesk',sans-serif;font-size:0.75rem;font-weight:500;letter-spacing:0.15em;text-transform:uppercase;color:rgba(255,255,255,0.7)">— ${content.testimonial.author}</div>
      ${content.testimonial.rating ? `<div style="color:rgba(255,255,255,0.8);font-size:1rem;letter-spacing:0.15em;margin-top:0.75rem">${'&#9733;'.repeat(content.testimonial.rating)}</div>` : ''}
    </div>
  </section>` : ''

  const contactSection = `
  <section id="contact" style="padding:120px 0;background:${chalk}">
    <div style="max-width:1400px;margin:0 auto;padding:0 4rem">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8rem;align-items:start" class="ms-grid">
        <div>
          <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1.5rem">
            <div style="width:30px;height:1px;background:${accent}"></div>
            <span style="font-family:'Space Grotesk',sans-serif;font-size:0.65rem;font-weight:400;letter-spacing:0.25em;text-transform:uppercase;color:${accent}">Let's Talk</span>
          </div>
          <h2 style="font-family:'Instrument Serif',Georgia,serif;font-size:clamp(3rem,5vw,5rem);font-weight:400;color:${ink};font-style:italic;line-height:0.95;margin-bottom:2.5rem">${content.contactHeading}</h2>
          <p style="font-family:'Space Grotesk',sans-serif;font-size:0.9rem;font-weight:300;color:${dust};line-height:1.9;margin-bottom:3rem">${content.aboutMission || content.heroSubtitle}</p>
          <div style="display:flex;flex-direction:column;gap:1.5rem">
            <a href="mailto:hello@${businessName.toLowerCase().replace(/\s/g,'')}.com" style="font-family:'Space Grotesk',sans-serif;font-size:1rem;font-weight:400;color:${ink};text-decoration:none;border-bottom:1px solid rgba(10,10,8,0.15);padding-bottom:1rem">hello@${businessName.toLowerCase().replace(/\s/g,'')}.com</a>
            <a href="tel:${locationInfo.phone}" style="font-family:'Space Grotesk',sans-serif;font-size:1rem;font-weight:400;color:${ink};text-decoration:none;border-bottom:1px solid rgba(10,10,8,0.15);padding-bottom:1rem">${locationInfo.phone}</a>
            <span style="font-family:'Space Grotesk',sans-serif;font-size:0.9rem;font-weight:300;color:${dust}">${locationInfo.address}, ${locationInfo.city}</span>
          </div>
        </div>
        <form style="display:flex;flex-direction:column;gap:2rem" onsubmit="return false">
          <div>
            <input type="text" placeholder="Your Name" style="width:100%;box-sizing:border-box;font-family:'Space Grotesk',sans-serif;font-weight:300;font-size:0.95rem;padding:1rem 0;background:transparent;border:none;border-bottom:1px solid rgba(10,10,8,0.15);color:${ink};outline:none" />
          </div>
          <div>
            <input type="email" placeholder="Email Address" style="width:100%;box-sizing:border-box;font-family:'Space Grotesk',sans-serif;font-weight:300;font-size:0.95rem;padding:1rem 0;background:transparent;border:none;border-bottom:1px solid rgba(10,10,8,0.15);color:${ink};outline:none" />
          </div>
          <div>
            <input type="text" placeholder="Project Type" style="width:100%;box-sizing:border-box;font-family:'Space Grotesk',sans-serif;font-weight:300;font-size:0.95rem;padding:1rem 0;background:transparent;border:none;border-bottom:1px solid rgba(10,10,8,0.15);color:${ink};outline:none" />
          </div>
          <div>
            <textarea placeholder="Tell me about your project..." rows="5" style="width:100%;box-sizing:border-box;font-family:'Space Grotesk',sans-serif;font-weight:300;font-size:0.95rem;padding:1rem 0;background:transparent;border:none;border-bottom:1px solid rgba(10,10,8,0.15);color:${ink};outline:none;resize:none"></textarea>
          </div>
          <button type="submit" style="font-family:'Space Grotesk',sans-serif;font-size:0.75rem;font-weight:500;letter-spacing:0.15em;text-transform:uppercase;padding:1.1rem 3rem;background:${ink};color:${chalk};border:none;cursor:pointer;align-self:flex-start;transition:background 0.3s ease">Send Message</button>
        </form>
      </div>
    </div>
  </section>`

  const crFooter = `
  <footer style="padding:5rem 4rem 3rem;background:${ink};border-top:1px solid rgba(247,245,240,0.06)">
    <div style="max-width:1400px;margin:0 auto">
      <div style="display:grid;grid-template-columns:2fr 1fr 1fr;gap:4rem;margin-bottom:4rem" class="ms-grid">
        <div>
          <div style="font-family:'Instrument Serif',Georgia,serif;font-size:2rem;font-weight:400;color:${chalk};font-style:italic;margin-bottom:1rem">${businessName}</div>
          <p style="font-family:'Space Grotesk',sans-serif;font-size:0.8rem;font-weight:300;color:${dust};line-height:1.9;max-width:340px">${content.heroSubtitle}</p>
        </div>
        <div>
          <div style="font-family:'Space Grotesk',sans-serif;font-size:0.6rem;font-weight:400;letter-spacing:0.25em;text-transform:uppercase;color:${accent};margin-bottom:1.5rem">Work</div>
          <a href="#work" style="font-family:'Space Grotesk',sans-serif;font-size:0.8rem;font-weight:300;color:${dust};text-decoration:none;display:block;margin-bottom:0.75rem">Portfolio</a>
          <a href="#services" style="font-family:'Space Grotesk',sans-serif;font-size:0.8rem;font-weight:300;color:${dust};text-decoration:none;display:block;margin-bottom:0.75rem">Services</a>
          <a href="#about" style="font-family:'Space Grotesk',sans-serif;font-size:0.8rem;font-weight:300;color:${dust};text-decoration:none;display:block;margin-bottom:0.75rem">About</a>
          <a href="#contact" style="font-family:'Space Grotesk',sans-serif;font-size:0.8rem;font-weight:300;color:${dust};text-decoration:none;display:block;margin-bottom:0.75rem">Contact</a>
        </div>
        <div>
          <div style="font-family:'Space Grotesk',sans-serif;font-size:0.6rem;font-weight:400;letter-spacing:0.25em;text-transform:uppercase;color:${accent};margin-bottom:1.5rem">Contact</div>
          <p style="font-family:'Space Grotesk',sans-serif;font-size:0.8rem;font-weight:300;color:${dust};line-height:1.9">${locationInfo.address}<br/>${locationInfo.city}<br/>${locationInfo.phone}</p>
        </div>
      </div>
      <div style="border-top:1px solid rgba(247,245,240,0.06);padding-top:2rem;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem">
        <p style="font-family:'Space Grotesk',sans-serif;font-size:0.7rem;font-weight:300;color:${dust}">&copy; ${new Date().getFullYear()} ${businessName}. All rights reserved.</p>
        <div style="display:flex;gap:2rem">
          <a href="#" style="font-family:'Space Grotesk',sans-serif;font-size:0.7rem;font-weight:300;color:${dust};text-decoration:none">Privacy</a>
          <a href="#" style="font-family:'Space Grotesk',sans-serif;font-size:0.7rem;font-weight:300;color:${dust};text-decoration:none">Terms</a>
        </div>
      </div>
    </div>
  </footer>`

  return `${headHtml}
  <style>
    :root {
      --bg: ${chalk};
      --bg-alt: ${stone};
      --card-bg: #ffffff;
      --text: ${ink};
      --text-muted: ${dust};
      --border: rgba(10,10,8,0.1);
      --primary: ${accent};
      --secondary: ${secondaryColor};
    }
  </style>

${buildStandardNav(businessName, content, navFlags)}

${heroSection}
${marqueeSection}
${workSection}
${servicesSection}
${aboutSection}
${testimonialSection}
${contactSection}
${crFooter}

</body>
</html>`
}

function buildEventsTemplate(data: TemplateData): string {
  const { content, businessName, businessCategory, primaryColor, secondaryColor, pages, images, stockImages, locationInfo } = data
  const fonts = fontPairings[businessCategory] || fontPairings['other']
  const navFlags = resolveNavLinks(pages)

  const heroImg = images[0] || stockImages.hero
  const stockPool = buildImagePool(images, stockImages, businessName)
  const aboutImg = images[5] || stockImages.about
  let _pi = 0

  const midnight = '#0d0d12'
  const parchment = '#faf8f4'
  const warmgrey = '#f0ece6'
  const muted = '#7a7570'
  const vivid = primaryColor || '#e8410a'
  const gold = secondaryColor || '#d4a853'

  const headHtml = buildHead(businessName, fonts, primaryColor, secondaryColor, 'dark') + `<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet"/>`

  const heroSection = `
  <section style="position:relative;min-height:calc(100vh - 64px);display:flex;align-items:center;overflow:hidden;background:${midnight}">
    <div style="position:absolute;inset:0">
      <img src="${heroImg}" alt="" style="width:100%;height:100%;object-fit:cover;opacity:0.45" />
      <div style="position:absolute;inset:0;background:linear-gradient(135deg,rgba(13,13,18,0.95) 0%,rgba(13,13,18,0.5) 50%,rgba(13,13,18,0.7) 100%)"></div>
    </div>
    <div style="position:relative;max-width:1400px;margin:0 auto;padding:0 4rem;width:100%;padding-top:100px;padding-bottom:100px">
      <div style="max-width:800px">
        <div style="display:inline-flex;align-items:center;gap:0.75rem;margin-bottom:2.5rem;background:rgba(232,65,10,0.12);border:1px solid rgba(232,65,10,0.3);padding:0.5rem 1.25rem">
          <div style="width:6px;height:6px;border-radius:50%;background:${vivid}"></div>
          <span style="font-family:'DM Sans',sans-serif;font-size:0.65rem;font-weight:500;letter-spacing:0.25em;text-transform:uppercase;color:${vivid}">${content.heroEyebrow || 'Events & Entertainment'}</span>
        </div>
        <h1 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(4.5rem,10vw,9rem);font-weight:300;color:${parchment};line-height:0.88;letter-spacing:-0.02em;margin-bottom:0.5rem">${businessName.split(' ').slice(0,2).join('<br/>')}</h1>
        ${businessName.split(' ').length > 2 ? `<h1 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(4.5rem,10vw,9rem);font-weight:300;color:${parchment};line-height:0.88;font-style:italic;letter-spacing:-0.02em;margin-bottom:2.5rem">${businessName.split(' ').slice(2).join(' ')}</h1>` : '<div style="margin-bottom:2.5rem"></div>'}
        <div style="display:flex;align-items:flex-start;gap:4rem;flex-wrap:wrap">
          <p style="font-family:'DM Sans',sans-serif;font-size:1rem;font-weight:300;color:rgba(250,248,244,0.65);line-height:1.8;max-width:420px">${content.heroSubtitle}</p>
          <div style="display:flex;flex-direction:column;gap:1rem;flex-shrink:0">
            <a href="#contact" style="font-family:'DM Sans',sans-serif;font-size:0.75rem;font-weight:500;letter-spacing:0.15em;text-transform:uppercase;padding:1.1rem 2.5rem;background:${vivid};color:#fff;text-decoration:none;display:inline-block">${content.ctaPrimary}</a>
            <a href="#services" style="font-family:'DM Sans',sans-serif;font-size:0.75rem;font-weight:400;letter-spacing:0.15em;text-transform:uppercase;padding:1.1rem 2.5rem;border:1px solid rgba(250,248,244,0.2);color:${parchment};text-decoration:none;display:inline-block;text-align:center">${content.ctaSecondary || 'Our Services'}</a>
          </div>
        </div>
      </div>
    </div>
    <div style="position:absolute;bottom:0;left:0;right:0;display:flex;background:rgba(13,13,18,0.8);backdrop-filter:blur(10px);border-top:1px solid rgba(250,248,244,0.06)">
      ${content.stats.slice(0, 4).map((s, i) => `
      <div style="flex:1;padding:1.5rem 2rem;${i > 0 ? 'border-left:1px solid rgba(250,248,244,0.06)' : ''}">
        <div style="font-family:'Cormorant Garamond',Georgia,serif;font-size:2rem;font-weight:300;color:${parchment};line-height:1">${s.value}</div>
        <div style="font-family:'DM Sans',sans-serif;font-size:0.65rem;font-weight:400;letter-spacing:0.15em;text-transform:uppercase;color:${muted};margin-top:0.35rem">${s.label}</div>
      </div>`).join('')}
    </div>
  </section>`

  const servicesSection = `
  <section id="services" style="padding:140px 0;background:${parchment}">
    <div style="max-width:1400px;margin:0 auto;padding:0 4rem">
      <div style="display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:5rem;flex-wrap:wrap;gap:2rem">
        <div>
          <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1.5rem">
            <div style="width:30px;height:1px;background:${vivid}"></div>
            <span style="font-family:'DM Sans',sans-serif;font-size:0.65rem;font-weight:500;letter-spacing:0.25em;text-transform:uppercase;color:${vivid}">What We Do</span>
          </div>
          <h2 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(3rem,5vw,5rem);font-weight:300;color:${midnight};line-height:1;font-style:italic">${content.servicesHeading}</h2>
        </div>
        <p style="font-family:'DM Sans',sans-serif;font-size:0.9rem;font-weight:300;color:${muted};max-width:300px;line-height:1.7">${content.aboutMission || content.heroSubtitle}</p>
      </div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:0;border:1px solid rgba(13,13,18,0.08)" class="ms-grid">
        ${content.services.slice(0, 6).map((s, i) => `
        <div style="padding:2.5rem;${i % 3 > 0 ? 'border-left:1px solid rgba(13,13,18,0.08);' : ''}${i >= 3 ? 'border-top:1px solid rgba(13,13,18,0.08);' : ''}position:relative;overflow:hidden;background:${parchment};transition:background 0.3s ease" onmouseover="this.style.background='${warmgrey}'" onmouseout="this.style.background='${parchment}'">
          <div style="width:48px;height:48px;border-radius:50%;background:rgba(232,65,10,0.08);display:flex;align-items:center;justify-content:center;margin-bottom:1.5rem">
            <span style="font-size:1.2rem">${s.icon || '&#9733;'}</span>
          </div>
          <h3 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:1.4rem;font-weight:400;color:${midnight};margin-bottom:0.75rem;font-style:italic">${s.name}</h3>
          <p style="font-family:'DM Sans',sans-serif;font-size:0.85rem;font-weight:300;color:${muted};line-height:1.8;margin-bottom:1.5rem">${s.description}</p>
          <div style="display:flex;flex-wrap:wrap;gap:0.4rem">
            ${s.tags.slice(0, 3).map(tag => `<span style="font-family:'DM Sans',sans-serif;font-size:0.6rem;font-weight:500;letter-spacing:0.1em;text-transform:uppercase;padding:0.2rem 0.6rem;background:rgba(13,13,18,0.05);color:${muted}">${tag}</span>`).join('')}
          </div>
          <div style="position:absolute;bottom:0;left:0;width:0;height:2px;background:${vivid};transition:width 0.4s ease" onmouseover="this.parentElement.style.background='${warmgrey}';this.style.width='100%'" onmouseout="this.parentElement.style.background='${parchment}';this.style.width='0'"></div>
        </div>`).join('')}
      </div>
      <div style="text-align:center;margin-top:3rem">
        <a href="#contact" style="font-family:'DM Sans',sans-serif;font-size:0.75rem;font-weight:500;letter-spacing:0.15em;text-transform:uppercase;padding:1.1rem 3rem;background:${midnight};color:${parchment};text-decoration:none;display:inline-block">${content.ctaPrimary}</a>
      </div>
    </div>
  </section>`

  const gallerySection = `
  <section id="gallery" style="padding:140px 0;background:${midnight}">
    <div style="max-width:1400px;margin:0 auto;padding:0 4rem">
      <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1.5rem">
        <div style="width:30px;height:1px;background:${vivid}"></div>
        <span style="font-family:'DM Sans',sans-serif;font-size:0.65rem;font-weight:500;letter-spacing:0.25em;text-transform:uppercase;color:${vivid}">Past Events</span>
      </div>
      <h2 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(3rem,5vw,5rem);font-weight:300;color:${parchment};font-style:italic;margin-bottom:4rem;line-height:1">${content.galleryHeading || 'Our Work'}</h2>
      <div style="display:grid;grid-template-columns:5fr 3fr 4fr;gap:1.5px;background:rgba(250,248,244,0.06);margin-bottom:1.5px" class="ms-grid">
        ${[0,1,2].map((i) => `
        <div style="overflow:hidden;height:480px;position:relative">
          <img src="${stockPool[_pi++] || stockImages.cards[i]}" alt="" style="width:100%;height:100%;object-fit:cover;transition:transform 0.6s ease;filter:grayscale(15%)" onmouseover="this.style.transform='scale(1.04)';this.style.filter='grayscale(0%)'" onmouseout="this.style.transform='scale(1)';this.style.filter='grayscale(15%)'" />
          <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(13,13,18,0.8) 0%,transparent 50%)"></div>
          <div style="position:absolute;bottom:1.5rem;left:1.5rem">
            <div style="font-family:'DM Sans',sans-serif;font-size:0.6rem;font-weight:500;letter-spacing:0.15em;text-transform:uppercase;color:${vivid};margin-bottom:0.35rem">${(content.projectCaptions && content.projectCaptions[i]) ? 'Event' : content.services[i]?.tags?.[0] || 'Event'}</div>
            <div style="font-family:'Cormorant Garamond',Georgia,serif;font-size:1.1rem;font-weight:300;color:${parchment};font-style:italic">${(content.projectCaptions && content.projectCaptions[i]) || content.services[i]?.name || 'Special Event'}</div>
          </div>
        </div>`).join('')}
      </div>
      <div style="display:grid;grid-template-columns:3fr 4fr 5fr;gap:1.5px;background:rgba(250,248,244,0.06)" class="ms-grid">
        ${[3,4,5].map((i) => `
        <div style="overflow:hidden;height:360px;position:relative">
          <img src="${stockPool[_pi++] || stockImages.cards[i]}" alt="" style="width:100%;height:100%;object-fit:cover;transition:transform 0.6s ease;filter:grayscale(15%)" onmouseover="this.style.transform='scale(1.04)';this.style.filter='grayscale(0%)'" onmouseout="this.style.transform='scale(1)';this.style.filter='grayscale(15%)'" />
        </div>`).join('')}
      </div>
    </div>
  </section>`

  const aboutSection = `
  <section id="about" style="padding:140px 0;background:${warmgrey}">
    <div style="max-width:1400px;margin:0 auto;padding:0 4rem">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8rem;align-items:center" class="ms-grid">
        <div>
          <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1.5rem">
            <div style="width:30px;height:1px;background:${vivid}"></div>
            <span style="font-family:'DM Sans',sans-serif;font-size:0.65rem;font-weight:500;letter-spacing:0.25em;text-transform:uppercase;color:${vivid}">Our Story</span>
          </div>
          <h2 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(2.5rem,4vw,4.5rem);font-weight:300;color:${midnight};font-style:italic;line-height:1.05;margin-bottom:2.5rem">${content.aboutHeading}</h2>
          ${content.aboutMission ? `<p style="font-family:'Cormorant Garamond',Georgia,serif;font-size:1.3rem;font-weight:300;color:${midnight};font-style:italic;line-height:1.5;margin-bottom:2rem;border-left:3px solid ${vivid};padding-left:1.5rem">${content.aboutMission}</p>` : ''}
          ${content.aboutText.split('\n').filter(p => p.trim()).map(p => `<p style="font-family:'DM Sans',sans-serif;font-size:0.9rem;font-weight:300;color:${muted};line-height:1.9;margin-bottom:1.25rem">${p}</p>`).join('')}
          <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:2rem;margin-top:3rem;padding-top:3rem;border-top:1px solid rgba(13,13,18,0.1)" class="ms-grid">
            ${content.stats.slice(0, 4).map(s => `
            <div>
              <div style="font-family:'Cormorant Garamond',Georgia,serif;font-size:2.5rem;font-weight:300;color:${vivid};line-height:1">${s.value}</div>
              <div style="font-family:'DM Sans',sans-serif;font-size:0.7rem;font-weight:400;letter-spacing:0.1em;text-transform:uppercase;color:${muted};margin-top:0.4rem">${s.label}</div>
            </div>`).join('')}
          </div>
        </div>
        <div style="position:relative">
          <div style="overflow:hidden;height:650px">
            <img src="${aboutImg}" alt="" style="width:100%;height:100%;object-fit:cover" />
          </div>
          <div style="position:absolute;top:-1rem;right:-1rem;bottom:1rem;left:1rem;border:1px solid rgba(232,65,10,0.2);z-index:-1;pointer-events:none"></div>
        </div>
      </div>
    </div>
  </section>`

  const testimonialSection = content.testimonial ? `
  <section style="padding:140px 0;background:${midnight};overflow:hidden">
    <div style="max-width:1400px;margin:0 auto;padding:0 4rem">
      <div style="display:grid;grid-template-columns:1fr 2fr;gap:8rem;align-items:start" class="ms-grid">
        <div>
          <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1.5rem">
            <div style="width:30px;height:1px;background:${vivid}"></div>
            <span style="font-family:'DM Sans',sans-serif;font-size:0.65rem;font-weight:500;letter-spacing:0.25em;text-transform:uppercase;color:${vivid}">Testimonials</span>
          </div>
          <h2 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(2rem,3vw,3.5rem);font-weight:300;color:${parchment};font-style:italic;line-height:1.1">Client Stories</h2>
        </div>
        <div style="display:flex;flex-direction:column;gap:3rem">
          <div>
            <div style="font-family:'Cormorant Garamond',Georgia,serif;font-size:5rem;font-weight:300;color:${vivid};line-height:0.6;opacity:0.3;margin-bottom:1.5rem">&ldquo;</div>
            <p style="font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(1.4rem,2.5vw,2rem);font-weight:300;color:${parchment};font-style:italic;line-height:1.5;margin-bottom:2rem">${content.testimonial.quote}</p>
            <div style="display:flex;align-items:center;gap:1.5rem">
              <div style="width:1px;height:40px;background:${vivid}"></div>
              <div>
                <div style="font-family:'DM Sans',sans-serif;font-size:0.8rem;font-weight:500;color:${parchment};letter-spacing:0.08em;text-transform:uppercase">${content.testimonial.author}</div>
                ${content.testimonial.rating ? `<div style="color:${gold};font-size:0.75rem;margin-top:0.3rem">${'&#9733;'.repeat(content.testimonial.rating)}</div>` : ''}
              </div>
            </div>
          </div>
          ${(() => {
            const fallbacks = getFallbackTestimonials(content, 'events-entertainment')
            return fallbacks.slice(0, 2).map(t => `
          <div style="padding-top:3rem;border-top:1px solid rgba(250,248,244,0.06)">
            <p style="font-family:'Cormorant Garamond',Georgia,serif;font-size:1.2rem;font-weight:300;color:rgba(250,248,244,0.6);font-style:italic;line-height:1.6;margin-bottom:1.5rem">${t.quote}</p>
            <div style="font-family:'DM Sans',sans-serif;font-size:0.75rem;font-weight:400;color:${muted};letter-spacing:0.08em">— ${t.author}</div>
          </div>`).join('')
          })()}
        </div>
      </div>
    </div>
  </section>` : ''

  const processSection = content.processSteps && content.processSteps.length > 0 ? `
  <section style="padding:120px 0;background:${vivid}">
    <div style="max-width:1400px;margin:0 auto;padding:0 4rem">
      <div style="text-align:center;margin-bottom:5rem">
        <div style="font-family:'DM Sans',sans-serif;font-size:0.65rem;font-weight:500;letter-spacing:0.25em;text-transform:uppercase;color:rgba(255,255,255,0.6);margin-bottom:1rem">${content.stepsHeading || 'How It Works'}</div>
        <h2 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(3rem,5vw,5rem);font-weight:300;color:#fff;font-style:italic;line-height:1">From Vision to Reality</h2>
      </div>
      <div style="display:grid;grid-template-columns:repeat(${Math.min(content.processSteps.length, 4)},1fr);gap:0" class="ms-grid">
        ${content.processSteps.slice(0, 4).map((step, i) => `
        <div style="padding:2.5rem 2rem;${i > 0 ? 'border-left:1px solid rgba(255,255,255,0.15)' : ''}">
          <div style="font-family:'Cormorant Garamond',Georgia,serif;font-size:5rem;font-weight:300;color:rgba(255,255,255,0.15);line-height:1;margin-bottom:1.5rem">${step.step}</div>
          <h3 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:1.4rem;font-weight:400;color:#fff;font-style:italic;margin-bottom:0.75rem">${step.title}</h3>
          <p style="font-family:'DM Sans',sans-serif;font-size:0.85rem;font-weight:300;color:rgba(255,255,255,0.7);line-height:1.8">${step.description}</p>
        </div>`).join('')}
      </div>
    </div>
  </section>` : ''

  const contactSection = `
  <section id="contact" style="padding:140px 0;background:${parchment}">
    <div style="max-width:1400px;margin:0 auto;padding:0 4rem">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8rem;align-items:start" class="ms-grid">
        <div>
          <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1.5rem">
            <div style="width:30px;height:1px;background:${vivid}"></div>
            <span style="font-family:'DM Sans',sans-serif;font-size:0.65rem;font-weight:500;letter-spacing:0.25em;text-transform:uppercase;color:${vivid}">Book Your Event</span>
          </div>
          <h2 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(3rem,5vw,5rem);font-weight:300;color:${midnight};font-style:italic;line-height:0.95;margin-bottom:2.5rem">${content.contactHeading}</h2>
          <p style="font-family:'DM Sans',sans-serif;font-size:0.9rem;font-weight:300;color:${muted};line-height:1.9;margin-bottom:3rem">${content.aboutMission || content.heroSubtitle}</p>
          <div style="display:flex;flex-direction:column;gap:2rem">
            <div style="display:flex;gap:1.5rem;align-items:flex-start">
              <div style="width:44px;height:44px;background:rgba(232,65,10,0.08);border:1px solid rgba(232,65,10,0.15);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:1rem;color:${vivid}">&#9906;</div>
              <div>
                <div style="font-family:'DM Sans',sans-serif;font-size:0.7rem;font-weight:500;letter-spacing:0.15em;text-transform:uppercase;color:${midnight};margin-bottom:0.35rem">Location</div>
                <div style="font-family:'DM Sans',sans-serif;font-size:0.85rem;font-weight:300;color:${muted}">${locationInfo.address}, ${locationInfo.city}</div>
              </div>
            </div>
            <div style="display:flex;gap:1.5rem;align-items:flex-start">
              <div style="width:44px;height:44px;background:rgba(232,65,10,0.08);border:1px solid rgba(232,65,10,0.15);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:1rem;color:${vivid}">&#9742;</div>
              <div>
                <div style="font-family:'DM Sans',sans-serif;font-size:0.7rem;font-weight:500;letter-spacing:0.15em;text-transform:uppercase;color:${midnight};margin-bottom:0.35rem">Phone</div>
                <div style="font-family:'DM Sans',sans-serif;font-size:0.85rem;font-weight:300;color:${muted}">${locationInfo.phone}</div>
              </div>
            </div>
            <div style="display:flex;gap:1.5rem;align-items:flex-start">
              <div style="width:44px;height:44px;background:rgba(232,65,10,0.08);border:1px solid rgba(232,65,10,0.15);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:1rem;color:${vivid}">&#9993;</div>
              <div>
                <div style="font-family:'DM Sans',sans-serif;font-size:0.7rem;font-weight:500;letter-spacing:0.15em;text-transform:uppercase;color:${midnight};margin-bottom:0.35rem">Email</div>
                <div style="font-family:'DM Sans',sans-serif;font-size:0.85rem;font-weight:300;color:${muted}">hello@${businessName.toLowerCase().replace(/\s/g,'')}.com</div>
              </div>
            </div>
            ${content.contactHours ? `<div style="display:flex;gap:1.5rem;align-items:flex-start">
              <div style="width:44px;height:44px;background:rgba(232,65,10,0.08);border:1px solid rgba(232,65,10,0.15);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:1rem;color:${vivid}">&#9200;</div>
              <div>
                <div style="font-family:'DM Sans',sans-serif;font-size:0.7rem;font-weight:500;letter-spacing:0.15em;text-transform:uppercase;color:${midnight};margin-bottom:0.35rem">Hours</div>
                <div style="font-family:'DM Sans',sans-serif;font-size:0.85rem;font-weight:300;color:${muted}">${content.contactHours.replace(/ · /g,'<br/>')}</div>
              </div>
            </div>` : ''}
          </div>
        </div>
        <div>
          <form style="display:flex;flex-direction:column;gap:1.5rem" onsubmit="return false">
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem" class="ms-grid">
              <div>
                <label style="font-family:'DM Sans',sans-serif;font-size:0.6rem;font-weight:500;letter-spacing:0.2em;text-transform:uppercase;color:${midnight};display:block;margin-bottom:0.6rem">Name</label>
                <input type="text" placeholder="Your name" style="width:100%;box-sizing:border-box;font-family:'DM Sans',sans-serif;font-weight:300;font-size:0.9rem;padding:0.85rem 1.25rem;background:${warmgrey};border:1px solid rgba(13,13,18,0.08);color:${midnight};outline:none" />
              </div>
              <div>
                <label style="font-family:'DM Sans',sans-serif;font-size:0.6rem;font-weight:500;letter-spacing:0.2em;text-transform:uppercase;color:${midnight};display:block;margin-bottom:0.6rem">Email</label>
                <input type="email" placeholder="your@email.com" style="width:100%;box-sizing:border-box;font-family:'DM Sans',sans-serif;font-weight:300;font-size:0.9rem;padding:0.85rem 1.25rem;background:${warmgrey};border:1px solid rgba(13,13,18,0.08);color:${midnight};outline:none" />
              </div>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem" class="ms-grid">
              <div>
                <label style="font-family:'DM Sans',sans-serif;font-size:0.6rem;font-weight:500;letter-spacing:0.2em;text-transform:uppercase;color:${midnight};display:block;margin-bottom:0.6rem">Event Type</label>
                <input type="text" placeholder="Wedding, Corporate..." style="width:100%;box-sizing:border-box;font-family:'DM Sans',sans-serif;font-weight:300;font-size:0.9rem;padding:0.85rem 1.25rem;background:${warmgrey};border:1px solid rgba(13,13,18,0.08);color:${midnight};outline:none" />
              </div>
              <div>
                <label style="font-family:'DM Sans',sans-serif;font-size:0.6rem;font-weight:500;letter-spacing:0.2em;text-transform:uppercase;color:${midnight};display:block;margin-bottom:0.6rem">Event Date</label>
                <input type="text" placeholder="DD / MM / YYYY" style="width:100%;box-sizing:border-box;font-family:'DM Sans',sans-serif;font-weight:300;font-size:0.9rem;padding:0.85rem 1.25rem;background:${warmgrey};border:1px solid rgba(13,13,18,0.08);color:${midnight};outline:none" />
              </div>
            </div>
            <div>
              <label style="font-family:'DM Sans',sans-serif;font-size:0.6rem;font-weight:500;letter-spacing:0.2em;text-transform:uppercase;color:${midnight};display:block;margin-bottom:0.6rem">Tell Us About Your Event</label>
              <textarea placeholder="Guest count, venue, vision, budget..." rows="5" style="width:100%;box-sizing:border-box;font-family:'DM Sans',sans-serif;font-weight:300;font-size:0.9rem;padding:0.85rem 1.25rem;background:${warmgrey};border:1px solid rgba(13,13,18,0.08);color:${midnight};outline:none;resize:none"></textarea>
            </div>
            <button type="submit" style="font-family:'DM Sans',sans-serif;font-size:0.75rem;font-weight:500;letter-spacing:0.15em;text-transform:uppercase;padding:1.1rem 3rem;background:${vivid};color:#fff;border:none;cursor:pointer;align-self:flex-start">Send Enquiry</button>
          </form>
        </div>
      </div>
    </div>
  </section>`

  const evtFooter = `
  <footer style="padding:6rem 4rem 3rem;background:${midnight};border-top:1px solid rgba(250,248,244,0.04)">
    <div style="max-width:1400px;margin:0 auto">
      <div style="display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:4rem;margin-bottom:5rem" class="ms-grid">
        <div>
          <div style="font-family:'Cormorant Garamond',Georgia,serif;font-size:2rem;font-weight:300;color:${parchment};font-style:italic;margin-bottom:1.5rem;letter-spacing:0.05em">${businessName}</div>
          <p style="font-family:'DM Sans',sans-serif;font-size:0.8rem;font-weight:300;color:${muted};line-height:1.9;max-width:320px">${content.heroSubtitle}</p>
        </div>
        <div>
          <div style="font-family:'DM Sans',sans-serif;font-size:0.6rem;font-weight:500;letter-spacing:0.25em;text-transform:uppercase;color:${vivid};margin-bottom:1.5rem">Navigate</div>
          <a href="#services" style="font-family:'DM Sans',sans-serif;font-size:0.8rem;font-weight:300;color:${muted};text-decoration:none;display:block;margin-bottom:0.75rem">Services</a>
          <a href="#gallery" style="font-family:'DM Sans',sans-serif;font-size:0.8rem;font-weight:300;color:${muted};text-decoration:none;display:block;margin-bottom:0.75rem">Gallery</a>
          <a href="#about" style="font-family:'DM Sans',sans-serif;font-size:0.8rem;font-weight:300;color:${muted};text-decoration:none;display:block;margin-bottom:0.75rem">About</a>
          <a href="#contact" style="font-family:'DM Sans',sans-serif;font-size:0.8rem;font-weight:300;color:${muted};text-decoration:none;display:block;margin-bottom:0.75rem">Contact</a>
        </div>
        <div>
          <div style="font-family:'DM Sans',sans-serif;font-size:0.6rem;font-weight:500;letter-spacing:0.25em;text-transform:uppercase;color:${vivid};margin-bottom:1.5rem">Services</div>
          ${content.services.slice(0, 4).map(s => `<a href="#services" style="font-family:'DM Sans',sans-serif;font-size:0.8rem;font-weight:300;color:${muted};text-decoration:none;display:block;margin-bottom:0.75rem">${s.tags?.[0] || s.name}</a>`).join('')}
        </div>
        <div>
          <div style="font-family:'DM Sans',sans-serif;font-size:0.6rem;font-weight:500;letter-spacing:0.25em;text-transform:uppercase;color:${vivid};margin-bottom:1.5rem">Contact</div>
          <p style="font-family:'DM Sans',sans-serif;font-size:0.8rem;font-weight:300;color:${muted};line-height:1.9">${locationInfo.address}<br/>${locationInfo.city}<br/>${locationInfo.phone}</p>
        </div>
      </div>
      <div style="border-top:1px solid rgba(250,248,244,0.06);padding-top:2rem;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem">
        <p style="font-family:'DM Sans',sans-serif;font-size:0.7rem;font-weight:300;color:${muted}">&copy; ${new Date().getFullYear()} ${businessName}. All rights reserved.</p>
        <div style="display:flex;gap:2rem">
          <a href="#" style="font-family:'DM Sans',sans-serif;font-size:0.7rem;font-weight:300;color:${muted};text-decoration:none">Privacy Policy</a>
          <a href="#" style="font-family:'DM Sans',sans-serif;font-size:0.7rem;font-weight:300;color:${muted};text-decoration:none">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>`

  return `${headHtml}
  <style>
    :root {
      --bg: ${midnight};
      --bg-alt: ${parchment};
      --card-bg: ${parchment};
      --text: ${parchment};
      --text-muted: ${muted};
      --border: rgba(250,248,244,0.06);
      --primary: ${vivid};
      --secondary: ${gold};
    }
  </style>

${buildStandardNav(businessName, content, navFlags)}

${heroSection}
${servicesSection}
${gallerySection}
${aboutSection}
${testimonialSection}
${processSection}
${contactSection}
${evtFooter}

</body>
</html>`
}