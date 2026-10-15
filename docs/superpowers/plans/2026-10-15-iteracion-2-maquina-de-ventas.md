# Iteración 2 — Máquina de ventas: implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Turn the rebuilt Visión Nova site into a real sales machine based on Stiven's review of v1: smooth and fast, the real logo, real client and behind-the-scenes material, light/dark rhythm, tighter spacing, a richer hero, a clear explicit offer on every page, and landing pages that genuinely differ. Then deploy to Vercel.

**Architecture:** Same Astro 7 + Tailwind 4 + GSAP/Lenis codebase (branch `feat/rediseno-novascale`). New offer and proof blocks live in `src/components/sections/`, and per-page content lives in `src/data/*.ts`. Templates compose blocks per page type instead of repeating one fixed stack.

**Spec:** `docs/superpowers/specs/2026-10-14-rediseno-novascale-design.md` (still binding) plus Stiven's v1 feedback, summarised below.

## Stiven's v1 feedback (binding)
1. "Está un poco lenta": scrolling and animations must feel fast and fluid.
2. The section below the hero repeats the same background as the hero, but static. "Le falta un toquecito."
3. Everything is black. Mix in some light/white sections so the page isn't so dark.
4. Too much empty space inside cards and sections (e.g. the guarantee card).
5. The logo is wrong. The header shows typed text "visión nova", which is not the logo. The footer logo looks squashed and strange. Use his real logo (cut out of the images he gave, background removed) so it fits the header.
6. The hero needs more elements so it looks complete and attractive.
7. "Todas las páginas son iguales, no hay oferta clara": sector and service pages only change the header and title. Each page needs varied, specific information and a clear offer.
8. "Todavía no vende": it has to become a sales machine.
9. Use the real material:
   - The CEM Valderas clinic ads and doctor videos (current content client).
   - Stiven's behind-the-scenes photo.
10. When everything is finished and working, deploy to Vercel.

## Global Constraints (carried from v1, still binding)
- Copy in Spain Spanish, original. Address the reader as "tú". Do not copy veltim.com or the other references.
- No NovaScale prices anywhere. The only price allowed is the Nova software "desde 59 €/mes" on the form's software screen.
- Never claim Meta Partner or Tech Provider status except behind `SITE.metaPartner` (currently `false`). Use "WhatsApp Business API oficial".
- Never use the word "bono"/"bonos". Never use the word "error" in visible copy (an e2e test checks this).
- Guarantee, exact text: "Si en 30 días el sistema no te entrega al menos 15 clientes filtrados, el segundo mes va por nuestra cuenta."
- Scarcity, exact text: "Solo incorporamos 3 negocios nuevos al mes, porque cada implantación la montamos a mano."
- Honesty:
  - No invented clients, results, figures, testimonials or years in business.
  - No languages promised, no open-ended free work, no absolute claims about the AI ("está configurada para…").
  - Illustrative data is labelled "Ejemplo".
- Real client: **CEM Valderas** (clínica dental, Instagram @cemvalderas.clinica). We make their content and ads.
  - We may say "cliente actual", show their ads and videos, and describe what we do for them.
  - We must NOT state any result or figure for them.
  - The prices that appear inside their own ad creatives belong to the clinic, not to us. That is fine.
- Mobile-first and accessible:
  - 44px touch targets; `100svh`; safe-area insets on fixed elements; inputs ≥16px.
  - Exactly one h1 per page.
  - Under reduced motion everything is visible and static.
- Every existing test must stay green: `npm test` (build + vitest unit/SEO audit) and `npx playwright test` (form + layout, iphone + desktop). Add tests where new logic appears.
- Design language:
  - Dark ink `#0a0a0a` with gold accents is the base.
  - The new light sections use cream `#F4EFE6`, ink text and gold-600 accents. The transition between dark and light sections must look deliberate (no hard hairline jumps).
  - Display type stays Instrument Serif italic.

## Media available (in `assets-src/`, raw)
- `clientes/stiven-detras-de-camaras.png` (948×1659): Stiven framing a shot on a tripod in a bright clinic/living room. This is the hero piece of real proof.
- `clientes/cem-anuncio-dientes-story.png` (179×327) and `clientes/cem-anuncio-dientes-reel.png` (177×359): CEM Valderas ad "Recupera tus dientes en un solo día" (before/after smile). Instagram screenshots with UI.
- `clientes/cem-doctor-recepcion.png` (180×358), `clientes/cem-doctor-despacho.png` (287×567), `clientes/cem-doctor-anuncio.png` (311×558): the doctor talking to camera, subtitled, Instagram story/ad UI.
- `marca/logo-icono-original.png` (3840²): gold 4-point star with two small stars inside a rounded square, "VISIÓN NOVA" and the tagline below, on a dark background.
- `marca/logo-horizontal-original.png` (3840×2160): the star, a vertical divider, "VISIÓN NOVA" (VISIÓN in white, NOVA in gold) and the tagline "TU NEGOCIO EN PILOTO AUTOMÁTICO", on a dark gradient background.

The client screenshots are low resolution. Display them inside phone frames no wider than ~300 CSS px, or at their native size. Export WebP at 2× where the source allows, and never upscale beyond 2×. Ledger note: ask Stiven for the original exports later.

---

### Task 1: Real brand logo + media pipeline
**Files:** `scripts/brand-assets.mjs` (new), `public/brand/*`, `public/img/clientes/*`, `src/components/layout/Logo.astro`, `Header.astro`, `Footer.astro`, `public/favicon.svg` / `apple-touch-icon.png`, `src/data/media.ts`, `.gitignore` (keep `assets-src/` committed; it is small).

- Build transparent cut-outs from the originals with sharp:
  - Use a luminance/colour key: the background is near-black, so alpha comes from brightness with a smooth ramp. Keep the soft glow of the gold.
  - Trim to the content bounding box.
- Outputs:
  1. `public/brand/logo-horizontal.webp` and `.png`: star + divider + "VISIÓN NOVA". Two variants: with the tagline (footer) and without the tagline (header, cropped above the tagline line). Height ~48–56px rendered in the header, crisp at 2×.
  2. `public/brand/logo-star.webp`: just the star mark, transparent, for the favicon, small badges and the mobile header.
  3. Regenerate `favicon.svg`, or replace it with a PNG favicon set (32, 180) from the real star.
- Header: replace the typed "visión nova" with the real horizontal logo (no tagline), sized to fit the capsule. On narrow phones use the star + "VISIÓN NOVA" wordmark, scaled so it never wraps.
- Footer: use the full logo with its tagline at its natural aspect ratio. The current one is squashed.
- Client media:
  - Export to `public/img/clientes/*.webp` (and a JPEG fallback for the BTS photo). Give each a descriptive alt text in Spanish.
  - Crop the Instagram top-bar chrome only if it looks cleaner; keep the subtitles.
- `media.ts` new exports (all typed): `BTS_PHOTO`, `CLIENT_ADS: {src, alt, label}[]`, `CLIENT_REELS: {src, alt, label}[]`, `CLIENT = { name: 'CEM Valderas', sector: 'Clínica dental', instagram: 'cemvalderas.clinica' }`.
- Repoint the existing consumers:
  - `ScaleVideo` poster becomes the BTS photo, not the hero poster. This fixes "mismo fondo abajo estático".
  - `ContentWall` and `CONTENT_REELS` use the real client media.
- Verify: `npm test`, plus header screenshots at 375 and 1440 that you look at.

### Task 2: Speed and fluidity
**Files:** `src/scripts/motion.ts`, `src/styles/global.css`, heavy section components as needed, `BaseLayout.astro`.

Measure first, then fix. Use Playwright with Chrome tracing or a CDP `Performance` + `requestAnimationFrame` frame-time probe while wheel-scrolling home and one landing at 1440×900 and with 4× CPU throttling. Record long tasks and dropped frames before and after.

Expected levers:
- **Lenis:** less floaty. Higher lerp (~0.15) or `duration` ~0.9, `wheelMultiplier` 1. Make sure `autoRaf` isn't doubled with the GSAP ticker.
- **Reveal animations:** shorter and lighter (duration ~0.55–0.65 s, y 16–20px, stagger 0.04).
- **SplitText:** ~0.7 s, only on h1/h2, not on long paragraphs.
- **Scrub pins:** `scrub: true` or `0.5` instead of 1.
- **backdrop-filter:** remove it from large and repeated surfaces (cards, sections). Keep it only on the header capsule and modal-like elements, and use solid translucent fills elsewhere.
- **Rendering:** `content-visibility: auto` with `contain-intrinsic-size` on below-the-fold sections that are not pinned. Promote animated layers with `will-change` only while animating.
- **Media:** lazy-decode images; pause off-screen videos (already done; verify).

Done when: no long task >50ms during scroll on desktop unthrottled; noticeably fewer dropped frames under 4× throttling; Lighthouse mobile performance ≥ 95 on home. Report the numbers before and after.

### Task 3: Light/dark rhythm, spacing and the guarantee card
**Files:** `global.css` (light-section tokens/utilities), the section components, `index.astro`.

- Add a light-section variant: a `.section-light` utility or a `tone="light"` prop on section components, with cream background, ink text, gold-600 accents, adjusted borders and card fills, and AA contrast.
- On home, make 3–4 sections light (proof/real work, offer stack, for-who and FAQ are good candidates). The hero, the system acts, the AI demo and the CRM stay dark.
- Transitions: give each section boundary a deliberate edge, e.g. a large radius on the light block's top corners, or a soft gradient seam. No hairline jumps.
- Spacing:
  - Cut vertical padding (desktop ~96–120px, mobile ~64–72px).
  - Remove empty space inside cards.
  - Guarantee becomes a compact two-column card: shield + guarantee text on the left, scarcity and CTA on the right, stacked on mobile. Desktop height should be about half of today's.
- Look at wheel-scroll viewport screenshots at 390 and 1440 and iterate until it looks premium and dense, without feeling cramped.

### Task 4: Hero upgrade
**Files:** `HeroHome.astro` (+ a small new component if needed).

- Keep the iridescent video background that Stiven loves, the H1 and the subtitle.
- Add proof and depth:
  - **Desktop:** a composition of 3 tilted phone frames floating on the right or below the headline: a CEM ad, a doctor reel and the BTS photo. Give them a gentle idle float, parallax on scroll, and a label "Contenido real de un cliente actual".
  - **Mobile:** a single horizontal strip of 3 small phones under the CTAs.
- Add a trust row of compact chips with icons, e.g. "Grabamos en tu negocio · Meta Ads · IA que filtra · CRM Nova · WhatsApp Business API oficial". This replaces the sparse seals.
- Optional: a slow marquee of the four sectors.
- Above the fold on 1440×900: H1, subtitle, both CTAs and the start of the phone composition. On 390×844: H1, subtitle and the primary CTA visible.
- Keep LCP: H1 text is the LCP. Images are lazy and below the LCP's priority.

### Task 5: The offer — sales machine blocks
**Files:** new `src/components/sections/OfferStack.astro`, `FirstMonth.astro`, `RealWork.astro`, `Objections.astro`, `AfterBooking.astro`; `src/data/offer.ts` (new); `index.astro`.

- **OfferStack** ("Lo que incluye NovaScale"): every item gets a concrete outcome line, not a feature name. Items:
  1. Jornada de grabación en tu negocio cada mes (guiones, filmmaker, edición)
  2. Gestión de tus redes con ese contenido
  3. Campañas de Meta Ads con tus vídeos (the budget goes directly to Meta)
  4. WhatsApp con IA que responde en menos de 60 s y filtra
  5. Agente de voz 24/7 que recupera llamadas perdidas
  6. CRM Nova con todo en tiempo real
  7. Web optimizada incluida en el montaje
  8. Informe mensual claro
  9. Aviso al instante cuando un cliente necesita a una persona

  Layout: a sticky side card (desktop) with the guarantee, "3 plazas al mes", the primary CTA, and "Precio: propuesta a medida tras una llamada de 20 minutos". Light section.
- **FirstMonth:** a 4-week timeline. Semana 1: llamada, auditoría y guiones. Semana 2: jornada de grabación en tu negocio. Semana 3: lanzamos anuncios, activamos la IA y el CRM. Semana 4: primeros clientes filtrados y primer informe. Accepts per-page overrides.
- **RealWork** ("Trabajo real · Cliente actual: CEM Valderas, clínica dental"):
  - Show their ads and doctor reels in phone frames, with the BTS photo.
  - Explain what we do for them: we record the doctor, write the scripts and turn the videos into Meta ads. No results or figures.
  - Use a light section on home and the dental page.
- **Objections:** 5–6 hard objections with confident, honest answers:
  - "Ya hago publicidad"
  - "Ya tengo agencia"
  - "No tengo tiempo para grabar"
  - "¿Mis clientes notarán que es una IA?"
  - "¿Y si no funciona?" (answer with the guarantee)
  - "¿Por qué no me dais precio en la web?"
- **AfterBooking** ("Qué pasa cuando reservas"): 3 steps. 20-minute call where we look at your case → a closed proposal with no small print → if it fits, you start in the next intake. Do not promise a delivery time for the proposal.
- New home order:
  1. Hero
  2. RealWork (the proof the visitor sees first)
  3. ProblemFilter
  4. SystemActs
  5. OfferStack
  6. FirstMonth
  7. AIDemo
  8. CrmShowcase
  9. Roi
  10. Guarantee
  11. Objections
  12. ForWho
  13. AfterBooking + LeadForm
  14. FAQ
  15. SoftwareNova (small)

  Remove anything that now duplicates (e.g. Benefits, if OfferStack covers it).
- More CTAs: one after RealWork, one in OfferStack, one after Objections, plus the final form. Each opens the form.
- Unit-test any new pure logic.

### Task 6: Landing pages that genuinely differ
**Files:** `src/data/services.ts`, `sectors.ts`, `cities.ts`, the `[slug].astro` and `sectores/[slug].astro` templates, `offer.ts`.

- Give each page type its own composition, not one fixed stack.
- **Sector pages.** Each one gets these sector-specific sections:
  - Sector offer: "NovaScale para clínicas dentales" with sector-tailored inclusions.
  - Three example ad angles with hooks, labelled "Ejemplo de enfoque".
  - "Lo que la IA pregunta antes de pasarte el contacto": 4–5 qualification questions specific to the sector.
  - A sector-specific FirstMonth.
  - Sector objections.
  - The dental page shows RealWork (CEM Valderas). The others show a smaller "así grabamos" block with the BTS photo.
  - Keep the ROI calculator with its sector ticket.
  - Use SystemActs in a compact form at most.
- **Service pages.** Composition differs by service:
  - Contenido: the timeline of a shooting day, BTS, real reels and deliverables.
  - Redes: a monthly calendar, what gets published, community management + IA filtering of DMs.
  - Meta Ads: real ad creatives, a funnel diagram (anuncio → WhatsApp/llamada → IA filtra → CRM → cita), ROI.
  - Sistema IA: chat, audios, the qualification questions, CRM, handoff alert.
  - WhatsApp API: a comparison table (WhatsApp Business app vs API oficial), "tu número es tuyo".
  - Diseño web: what the site does in the system.
  - Every service page also gets OfferStack (compact) and Guarantee.
- **City pages.** The local angle, plus OfferStack, FirstMonth (with a note about travelling to film there), RealWork (small) and city FAQs.
- Write new copy for each sector and service. Run the duplicate-sentence check across all landing pages: only shared blocks may repeat.

### Task 7: QA and deploy
- `npm test` and `npx playwright test` green. Add a layout test for any new page states.
- Lighthouse mobile on home, one sector and one service: ≥ 90 on all three categories, report scores.
- Visual pass: wheel-scroll viewport screenshots at 390 and 1440 on home + dental + Meta Ads, looked at and fixed.
- Deploy to production:
  - Merge `feat/rediseno-novascale` into `master`, then `git push origin master`. The Vercel project `vision-nova` is linked to that GitHub repo; also push the feature branch.
  - Confirm the Vercel production deployment succeeds (`npx vercel ls` / `npx vercel inspect`). If git integration does not trigger a deploy, run `npx vercel --prod`.
  - Smoke-test the live URL: home 200, a landing 200, `/agente-voz` returns a 301, the form loads.
