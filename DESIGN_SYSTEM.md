# Alpine Mist Design System

### 1. Overview & Creative North Star
**Creative North Star: "The Ethereal Atelier"**
Alpine Mist is a design system that marries the structural precision of an architectural firm with the soft, atmospheric qualities of a high-end editorial publication. It is designed to feel spacious, intentional, and curated. 

Unlike standard digital interfaces that rely on rigid grids and heavy borders, Alpine Mist breaks the "template" look through **intentional asymmetry**, using rotated image containers and overlapping background shapes to create a sense of movement. The system prioritizes "white space" as a functional element, allowing high-contrast typography and subtle tonal shifts to guide the user's eye.

### 2. Colors
The palette is a sophisticated blend of cool slates (`#535f77`), mist whites (`#f9f9fe`), and warm, dusty rose accents (`#745762`).

*   **The "No-Line" Rule:** Visual separation must be achieved through background color shifts (e.g., transitioning from `surface` to `surface_container_low`) rather than 1px solid borders. Borders are reserved for interactive elements at low opacity or for glassmorphism effects.
*   **Surface Hierarchy & Nesting:** Use `surface_container_low` for large secondary sections and `surface_container_highest` for interactive card backgrounds. 
*   **The Glass & Gradient Rule:** Utilize the "Editorial Gradient" (a linear blend from `#d6e3ff` to `#f6d0dd`) for hero backgrounds. Floating elements should use `glass-card` styling: `rgba(255, 255, 255, 0.4)` with a 20px backdrop blur.

### 3. Typography
The system uses a high-contrast pairing of an editorial serif for headings and a modern, legible sans for utility.

**As shipped (13 August 2026):** the site pages use **Playfair Display** for every heading and **Source Sans 3** for body and labels, both loaded in `app/layout.tsx` as `--font-playfair` and `--font-source-sans`. Use those two on any new site page. The scale below still applies; Noto Serif and Plus Jakarta Sans were the original spec and are not loaded anywhere.

**Typography Scale:**
*   **Display/Hero:** 3.75rem (60px) to 4.5rem (72px). Noto Serif, Bold. Used for high-impact headers.
*   **Headlines:** 2.25rem (36px) to 3rem (48px). Noto Serif, Semibold.
*   **Body Text:** 1.125rem (18px) to 1.25rem (20px). Plus Jakarta Sans, Light/Regular. Increased line-height (leading-relaxed) is mandatory for readability.
*   **Labels/Captions:** 0.75rem (12px) to 0.875rem (14px). Plus Jakarta Sans, Bold, uppercase with tracking-widest (0.1em).

The rhythm of the typography is defined by the contrast between the organic, italicized serifs (often used for numbers or decorative tags) and the clean, geometric sans-serif body.

### 4. Elevation & Depth
Elevation in Alpine Mist is conveyed through **Tonal Layering** and **Ambient Shadows** rather than traditional "lift."

*   **The Layering Principle:** Depth is created by stacking surfaces. For example, a `surface_container_low` section may sit behind a `surface_container_lowest` card.
*   **Ambient Shadows:**
    *   *Small:* `0 1px 2px 0 rgba(0, 0, 0, 0.05)` (Navbars)
    *   *Extra Large:* `0 20px 25px -5px rgba(0, 0, 0, 0.1)` (Hero images)
    *   *Color Shadows:* For primary buttons, use `shadow-primary/20` to create a soft glow effect.
*   **Intentional Rotation:** Depth is also signaled by breaking the 2D plane—rotating cards by 1-2 degrees creates a "physical paper" feel.

### 5. Components
*   **Buttons:** Fully pill-shaped (`rounded-full`). Primary buttons use `primary` background with `on_primary` text. Hover states should feature a subtle scale-down (`active:scale-95`) and a slight color shift to `primary_dim`.
*   **Glass Cards:** Use for overlapping content. Must include a `border-white/20` and `backdrop-blur-xl`.
*   **Process Markers:** Large, italicized Noto Serif numbers in `tertiary` color at 20% opacity.
*   **Inputs:** Minimalist with `outline_variant` borders or `surface_container` backgrounds. Focus states use a subtle `secondary` glow.

### 6. Do's and Don'ts
*   **Do:** Use asymmetric layouts where images and text columns have different widths.
*   **Do:** Use Noto Serif Italic for decorative elements or to emphasize specific words in headlines.
*   **Don't:** Use pure black (`#000000`) for text; use `on_surface` (`#2e333a`) to maintain the "Mist" aesthetic.
*   **Don't:** Add borders to cards that are already distinguished by a shadow or a background color change.
*   **Do:** Use high-quality, architectural or minimalist photography with soft, natural lighting.