'use client'

import { useEffect, useRef, useState } from 'react'

// ---------------------------------------------------------------------------
// The header pill: wordmark, two menus, and the Contact button. It was six flat
// links and a "SEE YOUR SITE FREE" button; the six are now grouped so the bar
// carries two decisions instead of six, and Contact — the thing someone reaches
// for when they have decided — takes the button.
//
// One component rather than the copy in app/page.tsx and the copy in
// PageShell.tsx, which had already drifted apart. Every href is absolute so a
// hash target resolves from /work or /about as well as from the homepage.
// ---------------------------------------------------------------------------

interface NavItem {
  label: string
  href?: string
  // The free audit has no page of its own — it is the popup in AuditPopup.tsx,
  // which opens on this event from anywhere.
  event?: string
}

interface NavMenu {
  label: string
  items: NavItem[]
}

const AUDIT_EVENT = 'ms-audit:open'

const menus: NavMenu[] = [
  {
    label: 'ABOUT',
    items: [
      { label: 'About us', href: '/about' },
      { label: 'Work', href: '/work' },
      { label: 'Services', href: '/services' },
      { label: 'Reviews', href: '/#reviews' },
    ],
  },
  {
    label: 'RESOURCES',
    items: [
      { label: 'Refer & earn R1000', href: '/#refer' },
      { label: 'Referral terms', href: '/refer/terms' },
      { label: 'Free site audit', event: AUDIT_EVENT },
      { label: 'See your site free', href: '/start-your-project' },
    ],
  },
]

export default function SiteHeaderNav() {
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)

  // Escape closes a dropdown, and so does a click anywhere else. Hover alone
  // would leave one open for anyone navigating by keyboard.
  useEffect(() => {
    if (!openMenu) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenMenu(null)
    }
    const onDown = (e: MouseEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpenMenu(null)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('mousedown', onDown)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('mousedown', onDown)
    }
  }, [openMenu])

  const fire = (event: string) => {
    setOpenMenu(null)
    setMenuOpen(false)
    window.dispatchEvent(new Event(event))
  }

  return (
    <>
      <nav
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '1.5rem 2rem 0',
          position: 'relative',
          zIndex: 20,
        }}
      >
        <div
          ref={navRef}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            background: 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            border: '1px solid rgba(255,255,255,0.35)',
            borderRadius: '999px',
            padding: '0.55rem 0.55rem 0.55rem 1.75rem',
            gap: '0.4rem',
          }}
        >
          {/* Every child of the pill is a flex box with line-height 1. Left as
              inline text, the Playfair wordmark carried its own tall line box
              and sat visibly higher than the Source Sans links beside it —
              flex centres the box, not the glyphs. */}
          <a
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              fontFamily: 'var(--font-playfair), Georgia, serif',
              fontSize: '1.15rem',
              lineHeight: 1,
              color: '#1a1a2e',
              textDecoration: 'none',
              marginRight: '1rem',
              fontWeight: 400,
              whiteSpace: 'nowrap',
            }}
          >
            mountain studios
          </a>

          <div className="ms-hdr-links" style={{ display: 'flex', gap: '0.2rem' }}>
            {menus.map(menu => (
              <div
                key={menu.label}
                className="ms-hdr-menu"
                onMouseEnter={() => setOpenMenu(menu.label)}
                onMouseLeave={() => setOpenMenu(current => (current === menu.label ? null : current))}
              >
                <button
                  type="button"
                  className="ms-hdr-trigger"
                  aria-expanded={openMenu === menu.label}
                  aria-haspopup="true"
                  // Opens, never toggles. Hovering has already opened it by the
                  // time a mouse user presses, so a toggle here would read as
                  // "clicking the menu closes the menu". It is closed by
                  // leaving, by Escape, by a click outside, or by choosing.
                  onClick={() => setOpenMenu(menu.label)}
                >
                  {menu.label}
                  <svg
                    className="ms-hdr-caret"
                    width="9"
                    height="6"
                    viewBox="0 0 9 6"
                    aria-hidden="true"
                    style={{ transform: openMenu === menu.label ? 'rotate(180deg)' : 'none' }}
                  >
                    <path d="M1 1l3.5 3.5L8 1" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" />
                  </svg>
                </button>

                {openMenu === menu.label && (
                  <div className="ms-hdr-drop" role="menu">
                    {menu.items.map(item =>
                      item.event ? (
                        <button
                          key={item.label}
                          type="button"
                          className="ms-hdr-drop-item"
                          role="menuitem"
                          onClick={() => fire(item.event as string)}
                        >
                          {item.label}
                        </button>
                      ) : (
                        <a
                          key={item.label}
                          href={item.href}
                          className="ms-hdr-drop-item"
                          role="menuitem"
                          onClick={() => setOpenMenu(null)}
                        >
                          {item.label}
                        </a>
                      ),
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          <a href="/contact" className="ms-hdr-cta">
            CONTACT
          </a>

          <button
            className="ms-hdr-burger"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
          >
            ☰
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            background: 'rgba(10,12,22,0.96)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.75rem',
            overflowY: 'auto',
            padding: '4rem 1.5rem',
          }}
        >
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            style={{
              position: 'absolute',
              top: '1.25rem',
              right: '1.5rem',
              background: 'none',
              border: 'none',
              color: '#fff',
              fontSize: '2rem',
              cursor: 'pointer',
              lineHeight: 1,
            }}
          >
            &times;
          </button>

          {/* Flat on a phone: the grouping is a way of shortening a wide bar,
              and there is no bar here to shorten. The group names stay as
              headings so the two lists still read as two subjects. */}
          {menus.map(menu => (
            <div key={menu.label} onClick={e => e.stopPropagation()} style={{ textAlign: 'center' }}>
              <p
                style={{
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.4)',
                  margin: '0 0 0.9rem',
                }}
              >
                {menu.label}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {menu.items.map(item =>
                  item.event ? (
                    <button
                      key={item.label}
                      type="button"
                      className="ms-hdr-mobile-link"
                      onClick={() => fire(item.event as string)}
                    >
                      {item.label}
                    </button>
                  ) : (
                    <a
                      key={item.label}
                      href={item.href}
                      className="ms-hdr-mobile-link"
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  ),
                )}
              </div>
            </div>
          ))}

          <a
            href="/contact"
            onClick={e => e.stopPropagation()}
            style={{
              fontSize: '1.05rem',
              fontWeight: 700,
              color: '#1a1a2e',
              background: '#fff',
              padding: '0.75rem 2.5rem',
              borderRadius: '999px',
              textDecoration: 'none',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            Contact
          </a>
        </div>
      )}

      {/* Classes rather than inline style: the dropdown needs :hover and the
          media queries need something to target. */}
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
    </>
  )
}

// Not a {`...`} child of <style>. React escapes a text child on the server and
// not on the client, so a quote or a `>` in the CSS arrives as `&#x27;` /
// `&gt;` in the server HTML and as itself in the browser. That is a text
// mismatch, and it does not fail loudly — it throws away the server tree,
// re-renders on the client and can leave the page looking perfect with nothing
// wired up. `content: ''` in the hover bridge below did exactly that.
const CSS = `
        .ms-hdr-menu { position: relative; }
        .ms-hdr-trigger {
          display: inline-flex; align-items: center; gap: 0.35rem;
          padding: 0.45rem 0.85rem; border: 0; border-radius: 999px;
          background: transparent; color: #1a1a2e; cursor: pointer;
          font-family: inherit; font-size: 0.78rem; font-weight: 600; line-height: 1;
          text-transform: uppercase; letter-spacing: 0.1em;
          transition: background 0.18s ease;
        }
        .ms-hdr-trigger:hover { background: rgba(26,26,46,0.06); }
        .ms-hdr-caret { transition: transform 0.18s ease; }

        .ms-hdr-drop {
          position: absolute; top: calc(100% + 0.6rem); left: 50%;
          transform: translateX(-50%);
          min-width: 208px; padding: 0.5rem;
          background: #fff; border: 1px solid #e3e0ea; border-radius: 14px;
          box-shadow: 0 18px 40px -18px rgba(26,26,46,0.45);
          display: flex; flex-direction: column;
          animation: ms-hdr-drop-in 0.18s ease-out;
        }
        /* Bridges the 0.6rem gap under the trigger. Without it the pointer
           crosses dead space on the way to the first item, the menu closes
           mid-reach, and the whole thing feels broken. */
        .ms-hdr-drop::before {
          content: ''; position: absolute; top: -0.6rem; left: 0; right: 0; height: 0.6rem;
        }
        @keyframes ms-hdr-drop-in {
          from { opacity: 0; transform: translateX(-50%) translateY(-4px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        .ms-hdr-drop-item {
          display: block; width: 100%; padding: 0.6rem 0.85rem;
          border: 0; border-radius: 9px; background: transparent;
          color: #2e333a; cursor: pointer; text-align: left; text-decoration: none;
          font-family: inherit; font-size: 0.9rem; font-weight: 500;
          white-space: nowrap; transition: background 0.16s ease, color 0.16s ease;
        }
        .ms-hdr-drop-item:hover { background: #f4f2fa; color: #7d3d4f; }

        .ms-hdr-cta {
          display: inline-flex; align-items: center;
          background: #1a1a2e; color: #fff;
          padding: 0.6rem 1.4rem; border-radius: 999px; text-decoration: none;
          font-size: 0.78rem; font-weight: 700; line-height: 1; text-transform: uppercase;
          letter-spacing: 0.08em; white-space: nowrap;
          transition: opacity 0.18s ease;
        }
        .ms-hdr-cta:hover { opacity: 0.86; }

        .ms-hdr-burger {
          display: none; background: none; border: none; color: #1a1a2e;
          cursor: pointer; font-size: 1.4rem; padding: 0 0.5rem;
        }

        .ms-hdr-mobile-link {
          display: block; padding: 0.55rem 1.75rem; border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.25); background: transparent;
          color: #fff; text-decoration: none; cursor: pointer;
          font-family: inherit; font-size: 1.05rem; font-weight: 500;
          letter-spacing: 0.04em; transition: border-color 0.2s ease;
        }
        .ms-hdr-mobile-link:hover { border-color: rgba(255,255,255,0.65); }

        @media (max-width: 768px) {
          .ms-hdr-links, .ms-hdr-cta { display: none !important; }
          .ms-hdr-burger { display: block !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ms-hdr-drop, .ms-hdr-caret { animation: none; transition: none; }
        }
`
