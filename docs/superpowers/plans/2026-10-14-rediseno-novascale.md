# Rediseño NovaScale — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Sustituir la web estática actual de Visión Nova por un sitio Astro premium, mobile-first y optimizado para SEO, que vende NovaScale (contenido + Meta Ads + filtro con IA) y envía cada contacto a Nova CRM mediante un formulario por pasos.

**Architecture:** Astro con salida estática (`build.format: 'file'` + `cleanUrls` en Vercel, para mantener las URLs sin `.html`). Un único `BaseLayout` (SEO, header, footer y movimiento), bloques de sección reutilizables alimentados por archivos de datos tipados (`src/data/*.ts`) y la lógica pura del formulario y de la calculadora en `src/lib/*.ts` con tests unitarios. El movimiento lo dirige un único `src/scripts/motion.ts` mediante atributos `data-*`, así que los componentes no importan GSAP directamente.

**Tech Stack:** Astro 7.x, Tailwind CSS 4 (`@tailwindcss/vite`), GSAP 3.15 (ScrollTrigger + SplitText, gratis), Lenis 1.3, TypeScript, Vitest, Playwright (chromium + webkit), `@astrojs/sitemap`, sharp, ffmpeg-static.

**Spec:** `docs/superpowers/specs/2026-10-14-rediseno-novascale-design.md` (léela antes de cualquier tarea).

## Global Constraints

- Todo el copy, en español de España y 100 % original. Nada copiado de veltim.com, creatit, Media Power, Èmfasi ni Play Your Brand (ni frases, ni nombres de sección, ni estructura).
- Ningún precio de NovaScale en ninguna página. El único lugar con precios es app.visionnovaia.com (solo se enlaza).
- Nunca escribir "Meta Tech Provider", "Meta Partner" ni "socio de Meta" salvo dentro del bloque condicionado por `SITE.metaPartner` (por defecto `false`). Mientras tanto: "WhatsApp Business API oficial".
- Nada de testimonios, cifras de resultados, logos de clientes ni años de experiencia inventados. Las estadísticas ilustrativas se etiquetan como "Ejemplo".
- No usar las palabras "bono" ni "bonos". Los beneficios son: "La IA habla como tu equipo", "Nunca pierdes el control", "Sabes en qué se va cada euro".
- Garantía, texto exacto: "Si en 30 días el sistema no te entrega al menos 15 clientes filtrados, el segundo mes va por nuestra cuenta." Sin letra pequeña en la sección; las condiciones, solo en la respuesta del FAQ "¿Cómo funciona la garantía?".
- Escasez, texto exacto: "Solo incorporamos 3 negocios nuevos al mes, porque cada implantación la montamos a mano."
- Mobile-first: se diseña a 375 px; zonas táctiles ≥ 44 px; `100svh` (nunca `100vh`); los elementos fijos respetan `env(safe-area-inset-*)`; inputs con `font-size ≥ 16px`.
- `prefers-reduced-motion: reduce` → sin pin, sin scroll suave, sin SplitText; todo el contenido visible y estático.
- Dominio canónico: `https://www.visionnovaia.com`. Contacto: WhatsApp `+34 610 85 97 03`, email `stiveng.visionnova@gmail.com`, dirección Carrer Puig Pedrós 8, 17520 Girona.
- Endpoint de Nova: `https://app.visionnovaia.com/api/conectar/G5dyyHJdDKYyH4GPl9fGCJtC`. Calendly: `https://calendly.com/stivengonzalezads/planifica-el-futuro-digital-de-tu-negocio-con-visionnov`.
- Tokens: fondo `#0a0a0a`, superficie `#121212`, texto `#ECE8E1`, texto secundario `#A39E96`, dorado `#D9B266`, degradado dorado `#F1D9A0 → #B8862F`. Fuentes: Instrument Serif (titulares, cursiva) + Geist (texto), autoalojadas.
- Presupuesto de rendimiento: LCP móvil < 2,5 s; Lighthouse móvil ≥ 90 en Performance, SEO y Accesibilidad.

## Review Focus

1. **Endpoint de Nova caído, lento o con CORS rechazado** → el visitante igualmente ve el paso de Calendly en ≤ 5 s y nunca ve un error (test en la Tarea 5).
2. **Teclado de iPhone / barra de Safari** → el formulario por pasos no se descoloca al abrirse el teclado, el botón "Siguiente" sigue al alcance y no hay zoom en los inputs (test en la Tarea 5: viewport webkit 390×844 y font-size de los inputs ≥ 16).
3. **Scroll horizontal accidental en móvil** (secciones fijadas, marquesinas, vídeo escalado) → ninguna página tiene `scrollWidth > clientWidth` a 375 px (test en la Tarea 14).
4. **Recargar a mitad del formulario o pulsar "atrás"** → los datos de los pasos se restauran desde `sessionStorage` y el paso se mantiene (test en la Tarea 5).
5. **Teléfono con espacios, prefijo +34 o número extranjero** → se acepta; las letras o los números demasiado cortos se rechazan con un mensaje en línea (test en la Tarea 4).

---

## File Structure

```
astro.config.mjs            config Astro (site, format file, sitemap, tailwind)
package.json / tsconfig.json / vitest.config.ts / playwright.config.ts
vercel.json                 cleanUrls + redirecciones 301
src/config/site.ts          constantes globales (URLs, contacto, flags)
src/styles/global.css       tokens Tailwind v4, fuentes, base, utilidades (glass, gold)
src/layouts/BaseLayout.astro
src/components/seo/Seo.astro            title/description/canonical/OG/twitter
src/components/seo/JsonLd.astro         <script type="application/ld+json">
src/components/layout/{AnnounceBar,Header,Footer,WhatsAppFloat,Logo}.astro
src/components/ui/{Button,Eyebrow,SectionHeading}.astro
src/components/form/LeadForm.astro      marcado de los 6 pasos
src/scripts/lead-form.ts                controlador del formulario (DOM)
src/scripts/motion.ts                   Lenis + GSAP dirigidos por data-*
src/lib/lead.ts                         lógica pura: validación, payload, cualificación, envío
src/lib/roi.ts                          lógica pura de la calculadora
src/components/sections/*.astro         bloques reutilizables (Tarea 6)
src/data/{services,sectors,cities,faqs,nav}.ts  contenido tipado
src/pages/index.astro
src/pages/[slug].astro                  servicios + ciudades (getStaticPaths)
src/pages/sectores/[slug].astro
src/pages/{nosotros,trabajos,contacto,software-nova,gracias}.astro
src/pages/{politica-privacidad,politica-cookies,terminos-condiciones}.astro
src/pages/blog/index.astro, src/pages/blog/[slug].astro
src/content.config.ts, src/content/blog/*.md
public/{favicon.svg,apple-touch-icon.png,robots.txt,llms.txt}
public/brand/{logo-icon.webp,logo-horizontal.webp,og-default.jpg}
public/video/hero.mp4, public/audio/*.mp3, public/img/fundador.jpg
tests/unit/{lead,roi}.test.ts
tests/seo/seo-audit.test.ts             audita dist/*.html
tests/e2e/{form,layout}.spec.ts
legacy/                     las páginas HTML antiguas, como fuente de la migración (se borra en la Tarea 14)
```

---

### Task 1: Scaffold de Astro, tokens, recursos y layout base

**Files:**
- Move: todos los `*.html` de la raíz, `assets/`, `robots.txt`, `sitemap.xml` y `🔥 LA OFERTA IRRESISTIBLE — Visión.txt` → `legacy/` (con `git mv`)
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `vitest.config.ts`, `src/config/site.ts`, `src/styles/global.css`, `src/layouts/BaseLayout.astro`, `src/components/seo/Seo.astro`, `src/components/seo/JsonLd.astro`, `src/pages/index.astro` (temporal), `scripts/prepare-assets.mjs`, `public/favicon.svg`
- Modify: `vercel.json`, `.gitignore`

**Interfaces:**
- Produces: `SITE` (de `src/config/site.ts`), `BaseLayout` con props `{ title: string; description: string; path: string; ogImage?: string; schema?: object[]; noindex?: boolean }`, clases CSS `.glass`, `.glass-strong`, `.text-gold`, `.bg-gold`, `.text-silver`, `.container-x` y los tokens de Tailwind `bg-ink`, `bg-surface`, `text-cream`, `text-muted`, `text-gold-400`, `font-display`, `font-sans`.

- [ ] **Step 1: Crear una rama y mover lo antiguo a legacy**

```bash
git checkout -b feat/rediseno-novascale
mkdir legacy
git mv *.html assets robots.txt sitemap.xml "🔥 LA OFERTA IRRESISTIBLE — Visión.txt" legacy/
```

- [ ] **Step 2: package.json e instalación**

```json
{
  "name": "vision-nova-web",
  "type": "module",
  "private": true,
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "assets": "node scripts/prepare-assets.mjs",
    "test": "vitest run",
    "test:e2e": "playwright test"
  }
}
```

```bash
npm i astro@^7 @astrojs/sitemap gsap@^3.15 lenis@^1.3 @fontsource-variable/geist @fontsource/instrument-serif
npm i -D tailwindcss@^4 @tailwindcss/vite typescript vitest @playwright/test sharp ffmpeg-static jsdom
npx playwright install chromium webkit
```

Si la API de Astro 7 difiere de lo que aparece aquí (content collections, config), sigue la documentación de la versión instalada (`node_modules/astro/README` / docs.astro.build) y conserva la misma intención.

- [ ] **Step 3: astro.config.mjs**

```js
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://www.visionnovaia.com',
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [sitemap({ filter: (p) => !p.includes('/gracias') })],
  vite: { plugins: [tailwindcss()] },
});
```

- [ ] **Step 4: src/config/site.ts**

```ts
export const SITE = {
  name: 'Visión Nova',
  url: 'https://www.visionnovaia.com',
  tagline: 'Tu negocio en piloto automático',
  email: 'stiveng.visionnova@gmail.com',
  phoneDisplay: '+34 610 85 97 03',
  phoneE164: '+34610859703',
  whatsapp: 'https://wa.me/34610859703',
  address: { street: 'Carrer Puig Pedrós 8', city: 'Girona', postalCode: '17520', country: 'ES' },
  founder: 'Stiven González',
  calendly: 'https://calendly.com/stivengonzalezads/planifica-el-futuro-digital-de-tu-negocio-con-visionnov',
  novaEndpoint: 'https://app.visionnovaia.com/api/conectar/G5dyyHJdDKYyH4GPl9fGCJtC',
  formsubmitEndpoint: 'https://formsubmit.co/ajax/stiveng.visionnova@gmail.com',
  appUrl: 'https://app.visionnovaia.com',
  metaPartner: false, // poner a true cuando Meta apruebe la verificación
} as const;
```

- [ ] **Step 5: src/styles/global.css** (tokens de Tailwind v4 + base)

```css
@import 'tailwindcss';
@import '@fontsource-variable/geist';
@import '@fontsource/instrument-serif/400.css';
@import '@fontsource/instrument-serif/400-italic.css';

@theme {
  --color-ink: #0a0a0a;
  --color-surface: #121212;
  --color-surface-2: #1a1a1a;
  --color-cream: #ece8e1;
  --color-muted: #a39e96;
  --color-gold-200: #f1d9a0;
  --color-gold-400: #d9b266;
  --color-gold-600: #b8862f;
  --font-display: 'Instrument Serif', ui-serif, Georgia, serif;
  --font-sans: 'Geist Variable', ui-sans-serif, system-ui, sans-serif;
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
}

html { background: var(--color-ink); color: var(--color-cream); -webkit-text-size-adjust: 100%; }
body { font-family: var(--font-sans); background: var(--color-ink); overflow-x: clip; }
::selection { background: rgb(217 178 102 / 0.3); }
:focus-visible { outline: 2px solid var(--color-gold-400); outline-offset: 3px; border-radius: 6px; }
input, select, textarea { font-size: 16px; }

.container-x { width: 100%; max-width: 1240px; margin-inline: auto; padding-inline: 20px; }
@media (min-width: 768px) { .container-x { padding-inline: 32px; } }

.glass { background: rgb(255 255 255 / 0.03); border: 1px solid rgb(255 255 255 / 0.08);
  backdrop-filter: blur(24px) saturate(180%); -webkit-backdrop-filter: blur(24px) saturate(180%); }
.glass-strong { background: rgb(255 255 255 / 0.07); border: 1px solid rgb(255 255 255 / 0.16);
  backdrop-filter: blur(40px) saturate(200%); -webkit-backdrop-filter: blur(40px) saturate(200%); }
.text-gold { background: linear-gradient(135deg, var(--color-gold-200), var(--color-gold-600));
  -webkit-background-clip: text; background-clip: text; color: transparent; }
.text-silver { background: linear-gradient(135deg, #fff 0%, rgb(255 255 255 / 0.45) 100%);
  -webkit-background-clip: text; background-clip: text; color: transparent; }
.bg-gold { background: linear-gradient(135deg, var(--color-gold-200), var(--color-gold-400) 45%, var(--color-gold-600)); color: #1a1408; }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}
```

- [ ] **Step 6: Seo.astro, JsonLd.astro y BaseLayout.astro**

`src/components/seo/Seo.astro`:
```astro
---
import { SITE } from '../../config/site';
interface Props { title: string; description: string; path: string; ogImage?: string; noindex?: boolean }
const { title, description, path, ogImage = '/brand/og-default.jpg', noindex = false } = Astro.props;
const canonical = new URL(path === '/' ? '/' : path.replace(/\/$/, ''), SITE.url).href;
const og = new URL(ogImage, SITE.url).href;
---
<title>{title}</title>
<meta name="description" content={description} />
<link rel="canonical" href={canonical} />
<meta name="robots" content={noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'} />
<meta property="og:type" content="website" />
<meta property="og:locale" content="es_ES" />
<meta property="og:site_name" content={SITE.name} />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:url" content={canonical} />
<meta property="og:image" content={og} />
<meta name="twitter:card" content="summary_large_image" />
<meta name="theme-color" content="#0a0a0a" />
```

`src/components/seo/JsonLd.astro`:
```astro
---
interface Props { data: object | object[] }
const items = Array.isArray(Astro.props.data) ? Astro.props.data : [Astro.props.data];
---
{items.map((d) => <script type="application/ld+json" set:html={JSON.stringify(d)} />)}
```

`src/layouts/BaseLayout.astro` (la Tarea 2 añade header y footer; la Tarea 3 añade el script de movimiento):
```astro
---
import '../styles/global.css';
import Seo from '../components/seo/Seo.astro';
import JsonLd from '../components/seo/JsonLd.astro';
import { SITE } from '../config/site';
interface Props { title: string; description: string; path: string; ogImage?: string; schema?: object[]; noindex?: boolean }
const { schema = [], ...seo } = Astro.props;
const org = {
  '@context': 'https://schema.org', '@type': 'ProfessionalService', '@id': SITE.url + '/#org',
  name: SITE.name, url: SITE.url, email: SITE.email, telephone: SITE.phoneE164,
  logo: SITE.url + '/brand/logo-icon.webp', image: SITE.url + '/brand/og-default.jpg',
  founder: { '@type': 'Person', name: SITE.founder },
  address: { '@type': 'PostalAddress', streetAddress: SITE.address.street, addressLocality: SITE.address.city, postalCode: SITE.address.postalCode, addressCountry: SITE.address.country },
  areaServed: { '@type': 'Country', name: 'España' },
  sameAs: [SITE.whatsapp],
};
---
<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    <Seo {...seo} />
    <JsonLd data={[org, ...schema]} />
  </head>
  <body class="min-h-[100svh] antialiased">
    <slot />
  </body>
</html>
```

- [ ] **Step 7: favicon.svg (estrella dorada de 4 puntas, a juego con el logo)**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F1D9A0"/><stop offset="1" stop-color="#B8862F"/></linearGradient></defs>
  <rect width="64" height="64" rx="14" fill="#0a0a0a"/>
  <path fill="url(#g)" d="M30 8c1 11 4 18 9 21-5 3-8 10-9 27-1-17-4-24-9-27 5-3 8-10 9-21z" transform="translate(-2 0)"/>
  <path fill="url(#g)" d="M47 11c.4 4 1.5 6 3.5 7-2 1-3.1 3-3.5 7-.4-4-1.5-6-3.5-7 2-1 3.1-3 3.5-7z"/>
</svg>
```

Reutiliza este mismo dibujo en `src/components/layout/Logo.astro` (Tarea 2) como SVG en línea.

- [ ] **Step 8: scripts/prepare-assets.mjs** (logos → webp, OG, audios → mp3, vídeo del hero → local)

```js
import { execFileSync } from 'node:child_process';
import { mkdirSync, readdirSync, copyFileSync, writeFileSync } from 'node:fs';
import sharp from 'sharp';
import ffmpeg from 'ffmpeg-static';

const SRC = process.env.LOGO_DIR; // carpeta con 3.png (icono) y 4.png (horizontal)
mkdirSync('public/brand', { recursive: true });
mkdirSync('public/audio', { recursive: true });
mkdirSync('public/video', { recursive: true });
mkdirSync('public/img', { recursive: true });

await sharp(`${SRC}/3.png`).resize(512).webp({ quality: 88 }).toFile('public/brand/logo-icon.webp');
await sharp(`${SRC}/3.png`).resize(180).png().toFile('public/apple-touch-icon.png');
await sharp(`${SRC}/4.png`).resize(1600).webp({ quality: 86 }).toFile('public/brand/logo-horizontal.webp');
await sharp(`${SRC}/4.png`).resize(1200, 630, { fit: 'cover' }).jpeg({ quality: 85 }).toFile('public/brand/og-default.jpg');
await sharp('legacy/assets/img/fundador.jpeg').resize(900).jpeg({ quality: 82 }).toFile('public/img/fundador.jpg');

for (const f of readdirSync('legacy/assets/audio')) {
  if (!/\.(wav|mp3)$/.test(f)) continue;
  const out = `public/audio/${f.replace(/\.(wav|mp3)$/, '.mp3')}`;
  execFileSync(ffmpeg, ['-y', '-i', `legacy/assets/audio/${f}`, '-ac', '1', '-b:a', '64k', out]);
}

const res = await fetch('https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_080021_d598092b-c4c2-4e53-8e46-94cf9064cd50.mp4');
writeFileSync('public/video/hero.mp4', Buffer.from(await res.arrayBuffer()));
execFileSync(ffmpeg, ['-y', '-ss', '1', '-i', 'public/video/hero.mp4', '-frames:v', '1', '-q:v', '4', 'public/video/hero-poster.jpg']);
```

Ejecútalo con `LOGO_DIR="C:/Users/stive/AppData/Local/Temp/claude/c--Users-stive-vision-nova-ia-2-0/716b2694-cce6-4ed8-b9d1-5fc5d559a768/images" npm run assets`. Comprueba que `public/audio/` tiene 9 archivos `.mp3` y que `public/video/hero.mp4` pesa unos 2 MB.

- [ ] **Step 9: vercel.json, .gitignore, index temporal y vitest.config.ts**

`vercel.json`:
```json
{
  "cleanUrls": true,
  "trailingSlash": false,
  "redirects": [
    { "source": "/:path*", "has": [{ "type": "host", "value": "visionnovaia.com" }], "destination": "https://www.visionnovaia.com/:path*", "permanent": true },
    { "source": "/agente-voz", "destination": "/sistema-ia", "permanent": true },
    { "source": "/chatbot-ia", "destination": "/sistema-ia", "permanent": true },
    { "source": "/servicios", "destination": "/#sistema", "permanent": true },
    { "source": "/casos-de-uso", "destination": "/trabajos", "permanent": true },
    { "source": "/quienes-somos", "destination": "/nosotros", "permanent": true },
    { "source": "/blog-:slug", "destination": "/blog/:slug", "permanent": true },
    { "source": "/index", "destination": "/", "permanent": true }
  ]
}
```

`.gitignore`: añade `node_modules/`, `dist/`, `.astro/`, `test-results/`, `playwright-report/`.

`vitest.config.ts`:
```ts
import { defineConfig } from 'vitest/config';
export default defineConfig({ test: { include: ['tests/unit/**/*.test.ts', 'tests/seo/**/*.test.ts'], environment: 'node' } });
```

`src/pages/index.astro` (temporal):
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout title="Visión Nova" description="Agencia de contenido y captación con IA para negocios de ticket alto en toda España." path="/">
  <h1 class="font-display italic text-6xl text-gold p-10">Visión Nova</h1>
</BaseLayout>
```

- [ ] **Step 10: Verificar el build**

Run: `npm run build`
Expected: termina sin errores; `dist/index.html` contiene `<link rel="canonical" href="https://www.visionnovaia.com/"` y un JSON-LD `ProfessionalService`.

- [ ] **Step 11: Commit**

```bash
git add -A
git commit -m "feat: scaffold de Astro, tokens de diseño, recursos de marca y layout base"
```

---

### Task 2: Header, menú móvil, barra de anuncio, footer y WhatsApp flotante

**Files:**
- Create: `src/components/layout/Logo.astro`, `AnnounceBar.astro`, `Header.astro`, `Footer.astro`, `WhatsAppFloat.astro`, `src/data/nav.ts`, `src/components/ui/Button.astro`, `src/components/ui/Eyebrow.astro`, `src/components/ui/SectionHeading.astro`
- Modify: `src/layouts/BaseLayout.astro`

**Interfaces:**
- Consumes: `SITE`, clases de la Tarea 1.
- Produces: `NAV` y `FOOTER_LINKS` (en `nav.ts`); `<Button href variant="gold"|"glass"|"ghost" size="md"|"lg" data-open-form?>`, `<Eyebrow>`, `<SectionHeading eyebrow title titleHtml? lead align="center"|"left">`. Cualquier elemento con `data-open-form` hace scroll hasta `#formulario` en la página actual o, si no existe, navega a `/contacto#formulario` (lo implementa la Tarea 5 en `lead-form.ts`; hasta entonces el `href` de reserva es `/contacto#formulario`).

Diseño (se conserva lo que a Stiven le gusta de la web actual):
- **AnnounceBar:** franja fina sobre el header, `text-[11px] uppercase tracking-[0.25em]`, texto "Solo 3 plazas nuevas al mes · Mira si tu negocio encaja →", enlazada a `#formulario` / `/contacto#formulario`. En móvil < 380 px se acorta a "3 plazas al mes · Ver si encajas →".
- **Header:** cápsula fija centrada (`top: calc(env(safe-area-inset-top) + 44px)`, `w-[94%] max-w-[1200px] rounded-full glass`). Al hacer scroll > 40 px se vuelve más opaca y compacta. Contenido: logo (estrella SVG dorada + "visión nova" en Instrument Serif cursiva, minúsculas), enlaces en `text-[11px] uppercase tracking-[0.2em] text-muted hover:text-cream` y un CTA blanco en cápsula "Reservar plaza" (como el actual). Nav de escritorio (≥ 1024): Servicios (desplegable: los 6 servicios), Sectores (desplegable: los 4), Sistema IA, Trabajos, Nosotros, Blog.
- **Menú móvil:** pantalla completa `fixed inset-0 bg-ink/95 backdrop-blur`, enlaces grandes en Instrument Serif cursiva, entrada escalonada (CSS), CTA dorado en la parte inferior con `padding-bottom: env(safe-area-inset-bottom)`. Mientras está abierto, `<html>` lleva `overflow:hidden`. Se cierra con Escape, con el botón ✕ y al pulsar un enlace. Botón con `aria-expanded` y `aria-controls`.
- **Footer:** logo horizontal (`/brand/logo-horizontal.webp`, `width=320`), lema "Tu negocio en piloto automático", 4 columnas (Servicios, Sectores, Ciudades, Empresa), contacto (WhatsApp, email, Girona · "Grabamos en toda España"), legales y "© 2026 Visión Nova". Abajo, la palabra "visión nova" gigante en Instrument Serif con `text-silver` y opacidad 0.06 (detalle de marca).
- **WhatsAppFloat:** botón circular de 56 px abajo a la derecha (`bottom: calc(16px + env(safe-area-inset-bottom))`), verde #25D366, `aria-label="Escribir por WhatsApp"`, enlace a `SITE.whatsapp` con el texto "Hola, vengo de la web de Visión Nova".

- [ ] **Step 1: `src/data/nav.ts`**

```ts
export const SERVICES_NAV = [
  { href: '/creacion-de-contenido', label: 'Creación de contenido' },
  { href: '/gestion-redes-sociales', label: 'Gestión de redes sociales' },
  { href: '/publicidad-meta-ads', label: 'Publicidad en Meta Ads' },
  { href: '/sistema-ia', label: 'Sistema IA + CRM' },
  { href: '/whatsapp-business-api', label: 'WhatsApp Business API' },
  { href: '/diseno-web', label: 'Diseño web' },
] as const;
export const SECTORS_NAV = [
  { href: '/sectores/clinicas-dentales', label: 'Clínicas dentales' },
  { href: '/sectores/medicina-estetica', label: 'Medicina estética' },
  { href: '/sectores/inmobiliarias', label: 'Inmobiliarias' },
  { href: '/sectores/reformas', label: 'Reformas y construcción' },
] as const;
export const CITIES_NAV = [
  { href: '/agencia-marketing-madrid', label: 'Madrid' },
  { href: '/agencia-marketing-barcelona', label: 'Barcelona' },
  { href: '/agencia-marketing-valencia', label: 'Valencia' },
  { href: '/agencia-marketing-malaga', label: 'Málaga' },
] as const;
export const COMPANY_NAV = [
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/trabajos', label: 'Trabajos' },
  { href: '/software-nova', label: 'Software Nova' },
  { href: '/blog', label: 'Blog' },
  { href: '/contacto', label: 'Contacto' },
] as const;
export const LEGAL_NAV = [
  { href: '/politica-privacidad', label: 'Privacidad' },
  { href: '/politica-cookies', label: 'Cookies' },
  { href: '/terminos-condiciones', label: 'Términos' },
] as const;
```

- [ ] **Step 2: Implementar los componentes como se describe arriba.** Los desplegables de escritorio usan `<details>`/`<summary>` o botones con `aria-expanded`; se abren al pasar el ratón y al hacer clic, y se cierran con Escape o al hacer clic fuera. El JS del menú va en un `<script>` dentro de `Header.astro` (Astro lo empaqueta).

- [ ] **Step 3: Añadirlos a BaseLayout:** `<AnnounceBar/><Header/>` antes de `<main id="main"><slot/></main>` y `<Footer/><WhatsAppFloat/>` después. Añade un enlace de salto `<a href="#main" class="sr-only focus:not-sr-only">Saltar al contenido</a>`.

- [ ] **Step 4: Verificar**

Run: `npm run build && npx astro preview` y abre http://localhost:4321 a 375 px y a 1440 px.
Expected: la cápsula del header no se solapa con la barra de anuncio; el menú móvil se abre, bloquea el scroll y se cierra con Escape; no hay scroll horizontal a 375 px.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: header en cápsula, menú móvil, footer y botón de WhatsApp"
```

---

### Task 3: Sistema de movimiento (Lenis + GSAP con atributos data-*)

**Files:**
- Create: `src/scripts/motion.ts`
- Modify: `src/layouts/BaseLayout.astro` (añadir `<script>import '../scripts/motion.ts';</script>`)

**Interfaces:**
- Produces (contrato de atributos que usan todas las secciones):
  - `data-reveal` → aparece con fade + desplazamiento hacia arriba (y: 32 → 0, 0.9 s, expo.out) al entrar en pantalla. `data-reveal-delay="0.1"` es opcional.
  - `data-reveal-stagger` sobre un contenedor → sus hijos directos aparecen escalonados 0.08 s.
  - `data-split` sobre un titular → SplitText por palabras, cada palabra sube desde una máscara (`yPercent: 110 → 0`), stagger 0.06. Solo una vez.
  - `data-counter="15"` → cuenta de 0 al valor al entrar (`data-counter-suffix` y `data-counter-prefix` opcionales).
  - `data-parallax="0.2"` → desplazamiento y = valor × 100 px ligado al scroll.
  - `data-scale-media` → el hijo `[data-scale-target]` escala de `clip-path: inset(18% 22% round 28px)` a `inset(0 round 0)` mientras la sección está fijada (solo ≥ 768 px; en móvil se muestra completo con reveal).
  - `data-pin-horizontal` → el hijo `[data-track]` se desplaza horizontalmente mientras la sección está fijada (solo ≥ 1024 px; en móvil se ignora y el track se apila en vertical por CSS).
  - `data-magnetic` → el botón sigue al cursor ±8 px (solo con `(hover: hover) and (pointer: fine)`).
  - `data-progress-fill` → `scaleX` 0 → 1 ligado al scroll de su sección (barras de proceso).
  - Evento `window.dispatchEvent(new Event('motion:refresh'))` → llama a `ScrollTrigger.refresh()` (lo usan el formulario y las imágenes que cargan tarde).

- [ ] **Step 1: Implementar `src/scripts/motion.ts`**

```ts
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, SplitText);

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
document.documentElement.classList.add(reduce ? 'motion-off' : 'motion-on');

function initLenis() {
  if (reduce) return;
  const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  document.addEventListener('click', (e) => {
    const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
    if (!a || a.getAttribute('href') === '#') return;
    const el = document.querySelector(a.getAttribute('href')!);
    if (el) { e.preventDefault(); lenis.scrollTo(el as HTMLElement, { offset: -90 }); }
  });
  (window as any).__lenis = lenis;
}

function reveals() {
  gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
    gsap.from(el, { y: 32, opacity: 0, duration: 0.9, ease: 'expo.out', delay: Number(el.dataset.revealDelay || 0),
      scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
  });
  gsap.utils.toArray<HTMLElement>('[data-reveal-stagger]').forEach((el) => {
    gsap.from(el.children, { y: 28, opacity: 0, duration: 0.8, ease: 'expo.out', stagger: 0.08,
      scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
  });
  gsap.utils.toArray<HTMLElement>('[data-split]').forEach((el) => {
    const split = SplitText.create(el, { type: 'words', mask: 'words' });
    gsap.from(split.words, { yPercent: 110, duration: 1, ease: 'expo.out', stagger: 0.06,
      scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
  });
}

function counters() {
  gsap.utils.toArray<HTMLElement>('[data-counter]').forEach((el) => {
    const end = Number(el.dataset.counter);
    const pre = el.dataset.counterPrefix ?? '', suf = el.dataset.counterSuffix ?? '';
    const obj = { v: 0 };
    gsap.to(obj, { v: end, duration: 1.6, ease: 'power2.out',
      onUpdate: () => (el.textContent = pre + Math.round(obj.v).toLocaleString('es-ES') + suf),
      scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
  });
}

function scrollLinked() {
  const mm = gsap.matchMedia();
  gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
    gsap.to(el, { y: Number(el.dataset.parallax) * 100, ease: 'none',
      scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } });
  });
  gsap.utils.toArray<HTMLElement>('[data-progress-fill]').forEach((el) => {
    gsap.fromTo(el, { scaleX: 0 }, { scaleX: 1, ease: 'none', transformOrigin: 'left',
      scrollTrigger: { trigger: el.closest('section') ?? el, start: 'top 60%', end: 'bottom 60%', scrub: true } });
  });
  mm.add('(min-width: 768px)', () => {
    gsap.utils.toArray<HTMLElement>('[data-scale-media]').forEach((sec) => {
      const target = sec.querySelector('[data-scale-target]');
      if (!target) return;
      gsap.fromTo(target, { clipPath: 'inset(18% 22% round 28px)' }, { clipPath: 'inset(0% 0% round 0px)', ease: 'none',
        scrollTrigger: { trigger: sec, start: 'top top', end: '+=120%', scrub: true, pin: true } });
    });
  });
  mm.add('(min-width: 1024px)', () => {
    gsap.utils.toArray<HTMLElement>('[data-pin-horizontal]').forEach((sec) => {
      const track = sec.querySelector<HTMLElement>('[data-track]');
      if (!track) return;
      const dist = () => track.scrollWidth - window.innerWidth + 80;
      gsap.to(track, { x: () => -dist(), ease: 'none',
        scrollTrigger: { trigger: sec, start: 'top top', end: () => '+=' + dist(), scrub: 1, pin: true, invalidateOnRefresh: true } });
    });
  });
  mm.add('(hover: hover) and (pointer: fine)', () => {
    gsap.utils.toArray<HTMLElement>('[data-magnetic]').forEach((el) => {
      const xTo = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3' });
      const yTo = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3' });
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        xTo(((e.clientX - r.left) / r.width - 0.5) * 16);
        yTo(((e.clientY - r.top) / r.height - 0.5) * 16);
      });
      el.addEventListener('pointerleave', () => { xTo(0); yTo(0); });
    });
  });
}

function init() {
  if (reduce) return; // todo queda visible y estático
  initLenis();
  reveals();
  counters();
  scrollLinked();
  window.addEventListener('motion:refresh', () => ScrollTrigger.refresh());
  window.addEventListener('load', () => ScrollTrigger.refresh());
}

document.fonts?.ready.then(init) ?? init();
```

Añade a `global.css`: `.motion-on [data-split] { visibility: visible; }`. No ocultes nada por CSS antes de que corra el JS: los estados `from` de GSAP se encargan, así que si el JS falla, el contenido sigue siendo visible.

- [ ] **Step 2: Verificar** con una sección de prueba temporal en el index (un `h2 data-split`, tres tarjetas en `data-reveal-stagger` y un `span data-counter="15"`). Ejecuta `npm run dev`, haz scroll y comprueba que todo anima. Activa "reducir movimiento" en las DevTools (Rendering → Emulate prefers-reduced-motion) y comprueba que todo se ve sin animar. Después quita la sección de prueba.

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: sistema de movimiento con Lenis y GSAP dirigido por data-*"
```

---

### Task 4: Lógica pura del lead y de la calculadora (TDD)

**Files:**
- Create: `src/lib/lead.ts`, `src/lib/roi.ts`
- Test: `tests/unit/lead.test.ts`, `tests/unit/roi.test.ts`

**Interfaces:**
- Produces:
  - `TICKETS`, `ADS`, `SERVICES`, `SECTORS` (tuplas `as const`)
  - `type LeadInput = { servicio: string[]; sector: string; sector_otro?: string; ticket_medio: string; publicidad_actual: string; nombre: string; email: string; telefono: string; empresa: string; web?: string; mensaje?: string; privacidad: boolean }`
  - `isValidEmail(s: string): boolean`, `normalizePhone(s: string): string | null`
  - `validateContact(i: Pick<LeadInput,'nombre'|'email'|'telefono'|'empresa'|'privacidad'>): Partial<Record<'nombre'|'email'|'telefono'|'empresa'|'privacidad', string>>`
  - `isQualified(i: Pick<LeadInput,'ticket_medio'|'publicidad_actual'>): boolean`
  - `buildPayload(i: LeadInput, ctx: { pagina: string; search: string }): Record<string, string | boolean>`
  - `submitLead(payload, opts?: { fetchImpl?: typeof fetch; timeoutMs?: number; novaUrl?: string; emailUrl?: string }): Promise<{ nova: boolean; email: boolean }>`: nunca lanza errores.
  - `lostRevenue({ contactos, pctSinAtender, ticket, tasaCierre? }): { perdidosMes: number; euroMes: number; euroAno: number }`

- [ ] **Step 1: Escribir los tests que fallan** (`tests/unit/lead.test.ts`)

```ts
import { describe, it, expect, vi } from 'vitest';
import { isValidEmail, normalizePhone, validateContact, isQualified, buildPayload, submitLead, TICKETS, ADS } from '../../src/lib/lead';

const base = {
  servicio: ['todo el sistema'], sector: 'Clínica dental', ticket_medio: TICKETS[3], publicidad_actual: ADS[0],
  nombre: 'Laura Martín', email: 'laura@clinica.es', telefono: '+34 610 85 97 03', empresa: 'Clínica Sol', privacidad: true,
};

describe('normalizePhone', () => {
  it('acepta un móvil español con espacios', () => expect(normalizePhone('610 85 97 03')).toBe('+34610859703'));
  it('acepta +34 y guiones', () => expect(normalizePhone('+34-610-859-703')).toBe('+34610859703'));
  it('acepta 0034', () => expect(normalizePhone('0034 610859703')).toBe('+34610859703'));
  it('acepta números extranjeros con +', () => expect(normalizePhone('+57 300 123 4567')).toBe('+573001234567'));
  it('rechaza letras', () => expect(normalizePhone('61085abcd')).toBeNull());
  it('rechaza números cortos', () => expect(normalizePhone('12345')).toBeNull());
  it('rechaza un número de 9 cifras que no empieza por 6/7/8/9', () => expect(normalizePhone('123456789')).toBeNull());
});

describe('isValidEmail', () => {
  it('acepta un email normal', () => expect(isValidEmail('a.b@empresa.com')).toBe(true));
  it('rechaza sin dominio', () => expect(isValidEmail('a@b')).toBe(false));
  it('rechaza con espacios', () => expect(isValidEmail('a @b.com')).toBe(false));
});

describe('validateContact', () => {
  it('sin errores con datos válidos', () => expect(validateContact(base)).toEqual({}));
  it('marca cada campo inválido', () => {
    const e = validateContact({ nombre: ' ', email: 'x', telefono: '12', empresa: '', privacidad: false });
    expect(Object.keys(e).sort()).toEqual(['email', 'empresa', 'nombre', 'privacidad', 'telefono']);
  });
});

describe('isQualified', () => {
  it('no cualifica con ticket bajo y sin publicidad', () => expect(isQualified({ ticket_medio: TICKETS[0], publicidad_actual: ADS[3] })).toBe(false));
  it('cualifica con ticket bajo si ya invierte en publicidad', () => expect(isQualified({ ticket_medio: TICKETS[0], publicidad_actual: ADS[0] })).toBe(true));
  it('cualifica con ticket alto sin publicidad', () => expect(isQualified({ ticket_medio: TICKETS[2], publicidad_actual: ADS[3] })).toBe(true));
});

describe('buildPayload', () => {
  it('incluye los campos de Nova, el origen, la página y los UTM', () => {
    const p = buildPayload({ ...base, mensaje: 'Hola' }, { pagina: '/sectores/clinicas-dentales', search: '?utm_source=meta&utm_campaign=otono' });
    expect(p).toMatchObject({
      nombre: 'Laura Martín', email: 'laura@clinica.es', telefono: '+34610859703', mensaje: 'Hola', origen: 'Web',
      servicio: 'todo el sistema', sector: 'Clínica dental', ticket_medio: TICKETS[3], publicidad_actual: ADS[0],
      empresa: 'Clínica Sol', pagina: '/sectores/clinicas-dentales', utm_source: 'meta', utm_campaign: 'otono', utm_medium: '', cualificado: true,
    });
  });
  it('genera un mensaje de resumen si el usuario no escribe ninguno', () => {
    const p = buildPayload(base, { pagina: '/', search: '' });
    expect(String(p.mensaje)).toContain('todo el sistema');
    expect(String(p.mensaje)).toContain('Clínica dental');
  });
  it('usa sector_otro cuando el sector es "Otro"', () => {
    const p = buildPayload({ ...base, sector: 'Otro', sector_otro: 'Gimnasio' }, { pagina: '/', search: '' });
    expect(p.sector).toBe('Gimnasio');
  });
});

describe('submitLead', () => {
  it('envía a Nova y al email y devuelve true en ambos', async () => {
    const f = vi.fn().mockResolvedValue(new Response('{}', { status: 200 }));
    const r = await submitLead({ a: '1' }, { fetchImpl: f, novaUrl: 'https://nova/x', emailUrl: 'https://mail/y' });
    expect(r).toEqual({ nova: true, email: true });
    expect(f.mock.calls[0][0]).toBe('https://nova/x');
    expect(JSON.parse(f.mock.calls[0][1].body)).toEqual({ a: '1' });
    expect(f.mock.calls[0][1].headers['Content-Type']).toBe('application/json');
  });
  it('nunca lanza un error si Nova falla', async () => {
    const f = vi.fn().mockRejectedValueOnce(new TypeError('CORS')).mockResolvedValueOnce(new Response('{}'));
    await expect(submitLead({}, { fetchImpl: f })).resolves.toEqual({ nova: false, email: true });
  });
  it('se rinde tras el timeout', async () => {
    const never = vi.fn((_u, init) => new Promise((_r, rej) => init.signal.addEventListener('abort', () => rej(new Error('abort')))));
    const t0 = Date.now();
    const r = await submitLead({}, { fetchImpl: never as any, timeoutMs: 50 });
    expect(r).toEqual({ nova: false, email: false });
    expect(Date.now() - t0).toBeLessThan(500);
  });
  it('trata un HTTP 500 como fallo', async () => {
    const f = vi.fn().mockResolvedValue(new Response('', { status: 500 }));
    await expect(submitLead({}, { fetchImpl: f })).resolves.toEqual({ nova: false, email: false });
  });
});
```

`tests/unit/roi.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { lostRevenue } from '../../src/lib/roi';

describe('lostRevenue', () => {
  it('calcula los contactos perdidos × tasa de cierre × ticket', () => {
    expect(lostRevenue({ contactos: 100, pctSinAtender: 30, ticket: 800 }))
      .toEqual({ perdidosMes: 30, euroMes: 4800, euroAno: 57600 }); // tasa de cierre por defecto 0,2
  });
  it('limita las entradas a rangos sensatos', () => {
    expect(lostRevenue({ contactos: -5, pctSinAtender: 150, ticket: -1 })).toEqual({ perdidosMes: 0, euroMes: 0, euroAno: 0 });
  });
  it('redondea a euros enteros', () => {
    expect(lostRevenue({ contactos: 7, pctSinAtender: 33, ticket: 99, tasaCierre: 0.25 }).euroMes).toBe(57);
  });
});
```

- [ ] **Step 2: Ejecutar los tests y verificar que fallan**

Run: `npx vitest run tests/unit`
Expected: FAIL, "Failed to resolve import ../../src/lib/lead".

- [ ] **Step 3: Implementar `src/lib/lead.ts`**

```ts
import { SITE } from '../config/site';

export const SERVICES = ['más clientes con anuncios', 'contenido y redes', 'que la IA atienda y filtre', 'todo el sistema'] as const;
export const SECTORS = ['Clínica dental', 'Medicina estética', 'Inmobiliaria', 'Reformas y construcción', 'Otro'] as const;
export const TICKETS = ['menos de 100 €', '100–500 €', '500–2.000 €', 'más de 2.000 €'] as const;
export const ADS = ['sí, en Meta', 'sí, en otros canales', 'lo probamos y lo dejamos', 'todavía no'] as const;

export type LeadInput = {
  servicio: string[]; sector: string; sector_otro?: string; ticket_medio: string; publicidad_actual: string;
  nombre: string; email: string; telefono: string; empresa: string; web?: string; mensaje?: string; privacidad: boolean;
};
type ContactKey = 'nombre' | 'email' | 'telefono' | 'empresa' | 'privacidad';

export function isValidEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s.trim());
}

export function normalizePhone(s: string): string | null {
  const raw = s.trim();
  if (/[a-z]/i.test(raw)) return null;
  let d = raw.replace(/[\s\-().]/g, '');
  if (d.startsWith('00')) d = '+' + d.slice(2);
  if (d.startsWith('+')) {
    const digits = d.slice(1);
    if (!/^\d{8,15}$/.test(digits)) return null;
    return '+' + digits;
  }
  if (/^[6789]\d{8}$/.test(d)) return '+34' + d;
  return null;
}

export function validateContact(i: Pick<LeadInput, ContactKey>): Partial<Record<ContactKey, string>> {
  const e: Partial<Record<ContactKey, string>> = {};
  if (i.nombre.trim().length < 2) e.nombre = 'Dinos tu nombre';
  if (!isValidEmail(i.email)) e.email = 'Revisa el email';
  if (!normalizePhone(i.telefono)) e.telefono = 'Revisa el teléfono';
  if (i.empresa.trim().length < 2) e.empresa = 'Dinos el nombre de tu negocio';
  if (!i.privacidad) e.privacidad = 'Necesitamos tu consentimiento';
  return e;
}

export function isQualified(i: Pick<LeadInput, 'ticket_medio' | 'publicidad_actual'>): boolean {
  return !(i.ticket_medio === TICKETS[0] && i.publicidad_actual === ADS[3]);
}

export function buildPayload(i: LeadInput, ctx: { pagina: string; search: string }): Record<string, string | boolean> {
  const q = new URLSearchParams(ctx.search);
  const sector = i.sector === 'Otro' && i.sector_otro?.trim() ? i.sector_otro.trim() : i.sector;
  const servicio = i.servicio.join(', ');
  const mensaje = i.mensaje?.trim() ||
    `Quiere: ${servicio}. Sector: ${sector}. Ticket medio: ${i.ticket_medio}. Publicidad: ${i.publicidad_actual}.`;
  return {
    nombre: i.nombre.trim(), email: i.email.trim(), telefono: normalizePhone(i.telefono) ?? i.telefono.trim(),
    mensaje, origen: 'Web', servicio, sector, ticket_medio: i.ticket_medio, publicidad_actual: i.publicidad_actual,
    empresa: i.empresa.trim(), web: i.web?.trim() ?? '', pagina: ctx.pagina,
    utm_source: q.get('utm_source') ?? '', utm_medium: q.get('utm_medium') ?? '', utm_campaign: q.get('utm_campaign') ?? '',
    cualificado: isQualified(i),
  };
}

async function post(fetchImpl: typeof fetch, url: string, body: unknown, timeoutMs: number): Promise<boolean> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetchImpl(url, {
      method: 'POST', keepalive: true, signal: ctrl.signal,
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(body),
    });
    return res.ok;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}

export async function submitLead(
  payload: Record<string, unknown>,
  opts: { fetchImpl?: typeof fetch; timeoutMs?: number; novaUrl?: string; emailUrl?: string } = {},
): Promise<{ nova: boolean; email: boolean }> {
  const f = opts.fetchImpl ?? fetch.bind(globalThis);
  const t = opts.timeoutMs ?? 5000;
  const [nova, email] = await Promise.all([
    post(f, opts.novaUrl ?? SITE.novaEndpoint, payload, t),
    post(f, opts.emailUrl ?? SITE.formsubmitEndpoint, { ...payload, _subject: `Nuevo lead web — ${payload.empresa ?? ''}`, _template: 'table' }, t),
  ]);
  return { nova, email };
}
```

`src/lib/roi.ts`:
```ts
const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, Number.isFinite(n) ? n : 0));
export function lostRevenue(i: { contactos: number; pctSinAtender: number; ticket: number; tasaCierre?: number }) {
  const contactos = clamp(i.contactos, 0, 100000);
  const pct = clamp(i.pctSinAtender, 0, 100) / 100;
  const ticket = clamp(i.ticket, 0, 1_000_000);
  const cierre = clamp(i.tasaCierre ?? 0.2, 0, 1);
  const perdidosMes = Math.round(contactos * pct);
  const euroMes = Math.round(contactos * pct * cierre * ticket);
  return { perdidosMes, euroMes, euroAno: euroMes * 12 };
}
```

- [ ] **Step 4: Ejecutar los tests y verificar que pasan**

Run: `npx vitest run tests/unit`
Expected: PASS (todos).

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: lógica del lead (validación, payload, envío a Nova) y calculadora de ROI con tests"
```

---

### Task 5: Componente LeadForm por pasos + tests e2e

**Files:**
- Create: `src/components/form/LeadForm.astro`, `src/scripts/lead-form.ts`, `playwright.config.ts`, `tests/e2e/form.spec.ts`, `src/pages/gracias.astro`
- Modify: `src/pages/index.astro` (montar `<LeadForm/>` temporalmente para probarlo)

**Interfaces:**
- Consumes: todo lo exportado por `src/lib/lead.ts`; `SITE.calendly`, `SITE.appUrl`; evento `motion:refresh`.
- Produces: `<LeadForm id="formulario" variant="full"|"compact" heading? lead? />`. La variante `compact` arranca igual en el paso 1, pero con menos espacio y sin columna lateral. El atributo `data-open-form` en cualquier lugar abre o hace scroll al formulario.

**Diseño UX:**
- Tarjeta `glass-strong rounded-[28px]`. Arriba, una barra de progreso dorada de 2 px y la etiqueta "Paso 2 de 5". El paso de Calendly no cuenta en el total.
- Una pregunta por pantalla, en Instrument Serif cursiva de 28–40 px.
- Las opciones son tarjetas grandes y pulsables (≥ 56 px de alto) con un icono SVG en línea, en dos columnas en escritorio y una en móvil. Elegir una opción en los pasos de respuesta única avanza solo tras 250 ms. El paso 1 es multiselección y tiene botón "Siguiente".
- Transición entre pasos: el paso saliente se desliza 24 px a la izquierda y se desvanece; el entrante llega desde la derecha (CSS con `transform`/`opacity`, 350 ms, `--ease-out-expo`). Al volver atrás, la dirección se invierte.
- Paso 5: inputs con etiqueta flotante, `autocomplete` (`name`, `email`, `tel`, `organization`, `url`), `inputmode="email"` / `"tel"`, errores en línea bajo cada campo (`aria-describedby`), casilla de privacidad con enlace a `/politica-privacidad`, honeypot `<input name="_gotcha" tabindex="-1" autocomplete="off" class="hidden">` y botón "Ver huecos disponibles →".
- Al enviar: el botón muestra un spinner, se llama a `submitLead()` (se espera hasta 5 s, el resultado no importa), se dispara `fbq('track','Lead')` / `gtag('event','generate_lead')` si existen y, si `isQualified`, se pasa al paso 6. Si no, a la pantalla "software".
- Paso 6 (Calendly): título "Elige el hueco que mejor te venga", subtítulo "20 minutos · te enseñamos cómo quedaría tu sistema". El contenedor carga `https://assets.calendly.com/assets/external/widget.js` de forma diferida y llama a `Calendly.initInlineWidget({ url: SITE.calendly + '?hide_gdpr_banner=1&background_color=121212&text_color=ece8e1&primary_color=d9b266', parentElement, prefill: { name, email } })`. Altura: 680 px en escritorio y `min(720px, 80svh)` en móvil. Debajo: "¿Prefieres WhatsApp? Escríbenos" → `SITE.whatsapp`.
- Pantalla "software" (no cualificado): "Gracias, {nombre}. Por lo que nos cuentas, ahora mismo te encaja mejor nuestro software Nova: CRM con IA y WhatsApp desde 59 €/mes, sin agencia." Botón dorado "Ver planes de Nova" → `SITE.appUrl`, y enlace secundario "Prefiero hablar igualmente" → paso 6. (Este es el único sitio de la web con un precio, y es del software, no de NovaScale.)
- Estado guardado en `sessionStorage['vn-lead']` (`{ step, data }`) en cada cambio; al cargar se restaura. Se borra tras el envío.
- Teclado: Enter avanza; las tarjetas de opción son `<button type="button" aria-pressed>`. Al cambiar de paso, el foco va al título del nuevo paso (`tabindex="-1"`).
- Móvil: la tarjeta ocupa todo el ancho con 16 px de margen, y el botón "Siguiente" queda fijo abajo dentro de la tarjeta (`position: sticky; bottom: env(safe-area-inset-bottom)`). Con el teclado abierto, el input con foco se lleva a la vista con `scrollIntoView({block:'center'})`.

- [ ] **Step 1: playwright.config.ts**

```ts
import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: 'tests/e2e',
  webServer: { command: 'npm run build && npx astro preview --port 4321', port: 4321, reuseExistingServer: true, timeout: 180_000 },
  use: { baseURL: 'http://localhost:4321' },
  projects: [
    { name: 'iphone', use: { ...devices['iPhone 14'] } },
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
  ],
});
```

- [ ] **Step 2: Escribir los tests e2e que fallan** (`tests/e2e/form.spec.ts`)

```ts
import { test, expect } from '@playwright/test';

async function fillToContact(page) {
  await page.goto('/#formulario');
  const form = page.locator('#formulario');
  await form.getByRole('button', { name: /todo el sistema/i }).click();
  await form.getByRole('button', { name: /siguiente/i }).click();
  await form.getByRole('button', { name: /clínica dental/i }).click();
  await form.getByRole('button', { name: /más de 2.000/i }).click();
  await form.getByRole('button', { name: /sí, en meta/i }).click();
  await form.getByLabel(/nombre/i).fill('Laura Martín');
  await form.getByLabel(/email/i).fill('laura@clinica.es');
  await form.getByLabel(/teléfono/i).fill('610 85 97 03');
  await form.getByLabel(/negocio|empresa/i).first().fill('Clínica Sol');
  await form.getByLabel(/privacidad/i).check();
  return form;
}

test.beforeEach(async ({ page }) => {
  await page.route('https://assets.calendly.com/**', (r) => r.fulfill({ body: 'window.Calendly={initInlineWidget(){}}', contentType: 'text/javascript' }));
  await page.route('https://formsubmit.co/**', (r) => r.fulfill({ status: 200, body: '{}' }));
});

test('envía a Nova el payload esperado y muestra Calendly', async ({ page }) => {
  let body: any;
  await page.route('https://app.visionnovaia.com/api/conectar/**', async (r) => { body = r.request().postDataJSON(); await r.fulfill({ status: 200, body: '{}' }); });
  const form = await fillToContact(page);
  await form.getByRole('button', { name: /ver huecos/i }).click();
  await expect(form.getByText(/elige el hueco/i)).toBeVisible();
  expect(body).toMatchObject({ nombre: 'Laura Martín', email: 'laura@clinica.es', telefono: '+34610859703', origen: 'Web', sector: 'Clínica dental', cualificado: true });
});

test('si Nova falla, el visitante ve Calendly sin ningún error', async ({ page }) => {
  await page.route('https://app.visionnovaia.com/api/conectar/**', (r) => r.abort('failed'));
  const form = await fillToContact(page);
  await form.getByRole('button', { name: /ver huecos/i }).click();
  await expect(form.getByText(/elige el hueco/i)).toBeVisible({ timeout: 7000 });
  await expect(page.getByText(/error/i)).toHaveCount(0);
});

test('un perfil no cualificado ve la oferta del software Nova', async ({ page }) => {
  await page.route('https://app.visionnovaia.com/api/conectar/**', (r) => r.fulfill({ status: 200, body: '{}' }));
  await page.goto('/#formulario');
  const form = page.locator('#formulario');
  await form.getByRole('button', { name: /contenido y redes/i }).click();
  await form.getByRole('button', { name: /siguiente/i }).click();
  await form.getByRole('button', { name: /otro/i }).click();
  await form.getByLabel(/a qué se dedica|cuál/i).fill('Peluquería');
  await form.getByRole('button', { name: /siguiente/i }).click();
  await form.getByRole('button', { name: /menos de 100/i }).click();
  await form.getByRole('button', { name: /todavía no/i }).click();
  await form.getByLabel(/nombre/i).fill('Ana');
  await form.getByLabel(/email/i).fill('ana@pelu.es');
  await form.getByLabel(/teléfono/i).fill('+57 300 123 4567');
  await form.getByLabel(/negocio|empresa/i).first().fill('Pelu Ana');
  await form.getByLabel(/privacidad/i).check();
  await form.getByRole('button', { name: /ver huecos/i }).click();
  await expect(form.getByRole('link', { name: /ver planes de nova/i })).toBeVisible();
});

test('muestra errores en línea y no envía con datos inválidos', async ({ page }) => {
  let called = false;
  await page.route('https://app.visionnovaia.com/api/conectar/**', (r) => { called = true; r.fulfill({ body: '{}' }); });
  const form = await fillToContact(page);
  await form.getByLabel(/teléfono/i).fill('12ab');
  await form.getByRole('button', { name: /ver huecos/i }).click();
  await expect(form.getByText(/revisa el teléfono/i)).toBeVisible();
  expect(called).toBe(false);
});

test('recupera el progreso tras recargar', async ({ page }) => {
  await page.goto('/#formulario');
  const form = page.locator('#formulario');
  await form.getByRole('button', { name: /todo el sistema/i }).click();
  await form.getByRole('button', { name: /siguiente/i }).click();
  await form.getByRole('button', { name: /inmobiliaria/i }).click();
  await page.reload();
  await expect(page.locator('#formulario').getByText(/cuánto vale de media/i)).toBeVisible();
});

test('los inputs no provocan zoom en iOS (font-size >= 16px)', async ({ page }) => {
  await fillToContact(page);
  const sizes = await page.locator('#formulario input:not([type=hidden]):not([type=checkbox])').evaluateAll(
    (els) => els.filter((e) => (e as HTMLElement).offsetParent).map((e) => parseFloat(getComputedStyle(e).fontSize)));
  for (const s of sizes) expect(s).toBeGreaterThanOrEqual(16);
});
```

- [ ] **Step 3: Ejecutar y verificar que fallan**

Run: `npx playwright test tests/e2e/form.spec.ts --project=desktop`
Expected: FAIL (no existe `#formulario`).

- [ ] **Step 4: Implementar** `LeadForm.astro` (marcado de los pasos 1–6 + la pantalla "software", con los textos de las tablas de la spec §7 y los arrays de `lead.ts` como fuente de las opciones), `lead-form.ts` (máquina de estados: `step: 1..6 | 'software'`, `data: Partial<LeadInput>`, `go(n, dir)`, `persist()`, `restore()`, `submit()`, y el manejo de `data-open-form`) y `gracias.astro` (noindex; confirmación genérica, por si se usa). El paso 2 con "Otro" muestra un input "¿A qué se dedica tu negocio?" y un botón "Siguiente" en vez de avanzar solo. Monta `<LeadForm id="formulario" />` en el index.

- [ ] **Step 5: Ejecutar y verificar que pasan**

Run: `npx playwright test tests/e2e/form.spec.ts`
Expected: PASS en los proyectos `iphone` y `desktop`.

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: formulario por pasos conectado a Nova CRM con Calendly embebido"
```

---

### Task 6: Bloques de sección reutilizables

**Files:**
- Create en `src/components/sections/`: `HeroHome.astro`, `PageHero.astro`, `ScaleVideo.astro`, `ProblemFilter.astro`, `SystemActs.astro`, `ContentWall.astro`, `AIDemo.astro`, `CrmShowcase.astro`, `RoiCalculator.astro`, `Benefits.astro`, `Guarantee.astro`, `ForWho.astro`, `SoftwareNova.astro`, `Faq.astro`, `CtaBand.astro`, `FeatureGrid.astro`, `ProcessSteps.astro`
- Create: `src/data/faqs.ts`, `src/data/media.ts`

**Interfaces:**
- Consumes: el contrato de movimiento de la Tarea 3, `Button` / `SectionHeading` / `Eyebrow` de la Tarea 2, `lostRevenue` de la Tarea 4 y `LeadForm` de la Tarea 5.
- Produces (props exactas; las páginas de las Tareas 7–11 dependen de ellas):
  - `HeroHome` — sin props (el copy está en el propio componente).
  - `PageHero { eyebrow: string; title: string; titleAccent?: string; lead: string; ctaLabel?: string; bullets?: string[] }`: `titleAccent` se añade en `text-gold`.
  - `ScaleVideo { src?: string; poster: string; caption: string }`: si no hay `src`, muestra el póster.
  - `ProblemFilter { title?: string; lead?: string }`
  - `SystemActs { id?: string }`: siempre los 3 actos (Grabamos / Captamos / Filtramos).
  - `ContentWall { items: { src?: string; poster: string; label: string }[] }`
  - `AIDemo { scenario: 'dental'|'estetica'|'inmobiliaria'|'reformas'|'general'; audios: { src: string; label: string }[] }`
  - `CrmShowcase { image?: string }`
  - `RoiCalculator { defaultTicket?: number }`
  - `Benefits`, `Guarantee`, `ForWho`, `SoftwareNova` — sin props.
  - `Faq { items: { q: string; a: string }[]; title?: string }`: también emite el JSON-LD `FAQPage` con `<JsonLd>`.
  - `CtaBand { title: string; lead?: string }`
  - `FeatureGrid { eyebrow?: string; title: string; items: { title: string; text: string; icon: IconName }[] }`
  - `ProcessSteps { title: string; steps: { title: string; text: string }[] }`
  - `type IconName = 'camera'|'film'|'megaphone'|'target'|'chat'|'phone'|'crm'|'bolt'|'shield'|'chart'|'calendar'|'globe'|'users'|'spark'`: SVGs en línea de trazo fino (1.5 px), definidos en `src/components/ui/Icon.astro` (crea este archivo; `<Icon name size=24/>`).
  - `faqs.ts` exporta `HOME_FAQ: {q,a}[]` y `GUARANTEE_FAQ: {q,a}`.
  - `media.ts` exporta `HERO_BTS_VIDEO: string | undefined`, `HERO_BTS_POSTER = '/video/hero-poster.jpg'`, `CONTENT_REELS: {src?,poster,label}[]` (de momento 3 entradas con `/video/hero-poster.jpg` y las etiquetas "El equipo da la cara", "Tu servicio, explicado en 30 s", "Detrás de cámaras"), `CRM_IMAGE: string | undefined` y `AUDIO_DEMOS: {src,label,sector}[]` (los 9 mp3 con etiquetas legibles: "Clínica dental", "Clínica dental (2)", "Clínica dental Alameda", "Medicina estética", "Fisioterapia", "Constructora", "Despacho jurídico", "Abogado laboralista", "Pizzería"). Cuando Stiven envíe los vídeos, solo cambiará este archivo.

**Contenido y diseño de cada bloque** (todo el copy, original y siguiendo las Global Constraints):

- **HeroHome:** `min-h-[100svh]`. Fondo: `<video autoplay muted loop playsinline preload="auto" poster="/video/hero-poster.jpg" src="/video/hero.mp4">` con opacidad 0.6, un degradado hacia `ink` abajo y una capa de estrellas (`radial-gradient` repetidos, con un parpadeo CSS lento, desactivado con reduced-motion). Contenido centrado:
  - Píldora: punto dorado pulsando + "Agencia de contenido y captación con IA".
  - H1 (`data-split`, Instrument Serif cursiva, `text-[44px] leading-[1.02] md:text-[88px]`, `text-silver`): "Grabamos tu negocio. Lo llenamos de clientes." y una segunda línea en `text-gold`: "La IA te deja solo los que van a comprar."
  - Subtítulo: el de la spec.
  - CTAs: dorado `data-magnetic data-open-form` "Ver si mi negocio encaja" + glass "Ver cómo trabajamos" → `#sistema`.
  - Debajo, una fila de sellos: "WhatsApp Business API oficial" (o "Meta Tech Provider" si `SITE.metaPartner`) · "Grabamos en toda España" · "3 plazas al mes".
  - En móvil, los CTAs ocupan todo el ancho y van apilados.
- **ScaleVideo:** sección `data-scale-media` de 100svh con `[data-scale-target]` que contiene el vídeo detrás de cámaras o el póster, `object-cover`, y un pie de texto superpuesto abajo a la izquierda ("Así trabajamos: vamos a tu negocio y grabamos el contenido del mes.").
- **ProblemFilter:**
  - Eyebrow "El problema real"; título `data-split` "No te faltan contactos. Te falta filtro."
  - Visual: 10 puntos/avatares en fila con la etiqueta "Ejemplo · 10 contactos que te escriben esta semana". Con el scroll (`data-progress-fill` + una clase al entrar) 4 se apagan ("sin respuesta a tiempo"), 3 se ponen en gris ("solo preguntaban") y 3 quedan dorados ("listos para comprar").
  - Texto: el dueño o el equipo pierde horas con quien no iba a comprar, mientras el que sí estaba listo ya eligió a otro.
  - En móvil la fila se convierte en una cuadrícula de 5×2.
- **SystemActs:** `id="sistema"`, `data-pin-horizontal` con `[data-track]` de 3 paneles grandes (cada uno de 80vw en escritorio, apilados en móvil): 01 Grabamos, 02 Captamos, 03 Filtramos (copy de la spec §3). Cada panel lleva un número gigante en contorno dorado, el título en serif, 3 viñetas concretas, una mini ilustración (01: claqueta + "guiones, equipo y formato preparados"; 02: un anuncio de Meta simulado; 03: una burbuja de WhatsApp respondiendo en "< 60 s") y al final un panel de cierre: "Tu equipo solo cierra."
- **ContentWall:** 3–5 móviles (marco con `rounded-[44px] border-[10px] border-surface-2`) con vídeo `muted loop playsinline preload="none"` que se reproduce solo al entrar en pantalla (IntersectionObserver) y se pausa al salir; etiqueta debajo; `data-parallax` alterno 0.1 / -0.1 en escritorio. Título: "Contenido que parece tuyo porque lo es." En móvil, carrusel con `scroll-snap-type: x mandatory` (con `overflow-x:auto` en el propio carrusel, nunca en el body).
- **AIDemo:** dos columnas. Izquierda: un chat de WhatsApp simulado con guion por `scenario` (5–6 mensajes que muestran cómo la IA cualifica con preguntas de necesidad, plazo e intención y agenda; escribe mensajes nuevos, no reutilices los del legacy), con indicador "escribiendo…" y botón "Repetir". Derecha: un reproductor de audio propio (play/pausa, barra de progreso, duración) con la lista de `audios`, titulado "Escucha a la IA atendiendo una llamada real de prueba". Pie: "La IA no improvisa: solo responde con la información que tú apruebas, y cuando algo requiere a una persona, te avisa al momento."
- **CrmShowcase:** `data-scale-media` con un mockup de navegador; si `image` existe, la muestra; si no, un panel construido en HTML/CSS (columnas del pipeline "Nuevo · Filtrado · Cita · Cliente", tarjetas de ejemplo con nombres ficticios marcados "Ejemplo" y una métrica "Clientes filtrados este mes" con `data-counter`). Título: "Lo ves todo en CRM Nova, en tiempo real."
- **RoiCalculator:** 3 sliders (contactos al mes, 10–500, por defecto 80; % sin atender a tiempo, 0–80, por defecto 30; ticket medio €, 50–10.000, por defecto `defaultTicket ?? 600`) con su valor numérico grande, y un resultado en `text-gold` con el número gigante "€ que se te escapan al mes" + "al año" + la nota "Calculado con una tasa de cierre conservadora del 20 %". Usa `lostRevenue`. Los sliders tienen un área táctil de 44 px y `aria-valuetext`. CTA: "Quiero recuperar ese dinero" `data-open-form`.
- **Benefits:** 3 tarjetas glass con los 3 beneficios (títulos exactos de las Global Constraints) y una línea explicativa cada una.
- **Guarantee:** banda grande con icono de escudo dorado, el texto exacto de la garantía en serif y, debajo, la línea de escasez exacta + `data-counter="3"` "plazas este mes" (como texto, sin cuenta atrás falsa). Sin letra pequeña.
- **ForWho:** dos columnas, "Es para ti si…" (✓ dorado) / "No es para ti si…" (✕ apagado), con 4 líneas cada una, basadas en el perfil del PDF sin mencionar cifras de facturación.
- **SoftwareNova:** tarjeta horizontal: "¿Solo quieres el software?" + "Nova es nuestro CRM con IA y WhatsApp. Si prefieres montarlo tú, tienes planes desde la app." Botón → `SITE.appUrl` (`rel="noopener"`). Sin cifras.
- **Faq:** acordeón accesible (`<details>` con animación de altura vía `interpolate-size` / grid-rows), con un `+` dorado que rota.
- **CtaBand:** título gigante en serif + botón dorado `data-open-form`, con un brillo dorado radial de fondo.
- **FeatureGrid / ProcessSteps:** genéricos para las landings: cuadrícula de 2–3 columnas de tarjetas glass, y pasos numerados con una línea vertical `data-progress-fill`.

`HOME_FAQ` (8 preguntas; escribe respuestas de 2–4 frases): ¿Qué hacéis exactamente? · ¿Venís de verdad a grabar a mi negocio? ¿Y si estoy fuera de Madrid o Barcelona? (sí, toda España) · ¿Quién paga la publicidad de Meta? (el cliente, directamente a Meta) · ¿Mis clientes notarán que hablan con una IA? · ¿Qué pasa si la IA no sabe responder? · ¿El número de WhatsApp sigue siendo mío? (sí, API oficial, el número es tuyo) · ¿Cuánto cuesta? (depende del negocio; propuesta cerrada tras la llamada de 20 minutos; si solo quieres el software, mira los planes de Nova) · `GUARANTEE_FAQ` = ¿Cómo funciona la garantía? (los 30 días cuentan desde que arrancan las campañas; antes de empezar acordamos qué cuenta como cliente filtrado y la inversión en Ads; todo queda en el contrato).

- [ ] **Step 1: Crear `Icon.astro`, `faqs.ts` y `media.ts`.**
- [ ] **Step 2: Implementar cada bloque.** Después de cada 3–4 bloques, móntalos en una página temporal `src/pages/_preview.astro` (Astro no publica los archivos con `_`) y revísalos a 375 px y a 1440 px con `npm run dev`.
- [ ] **Step 3: Verificar**

Run: `npm run build && npx vitest run`
Expected: build OK, tests unitarios OK. Revisión manual a 375 px: ningún bloque desborda en horizontal; el scroll horizontal fijado de SystemActs solo existe a ≥ 1024 px.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: bloques de sección reutilizables (hero, sistema, demo IA, CRM, calculadora, garantía, FAQ)"
```

---

### Task 7: Home

**Files:**
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: todos los bloques de la Tarea 6, `LeadForm` y `HOME_FAQ`.

- [ ] **Step 1: Montar la home en el orden de la spec §5:** HeroHome → ScaleVideo → ProblemFilter → SystemActs → ContentWall → AIDemo (`scenario="general"`, todos los audios) → CrmShowcase → RoiCalculator → Benefits → Guarantee → ForWho → SoftwareNova → Faq (`HOME_FAQ`) → sección de formulario `id="formulario"` con título "Mira si tu negocio encaja" + lead "5 preguntas rápidas. Si encajamos, eliges hueco para una llamada de 20 minutos." + `<LeadForm variant="full" />`.
- SEO:
  - `title`: "Agencia de contenido, Meta Ads y captación con IA | Visión Nova"
  - `description`: "Grabamos tu negocio, lanzamos tus anuncios en Meta y nuestra IA filtra cada contacto para que solo hables con quien va a comprar. Toda España."
  - `schema`: un `WebSite` con `name` y `url`.
- Elimina `src/pages/_preview.astro`.

- [ ] **Step 2: Verificar**

Run: `npm run build && npx playwright test tests/e2e/form.spec.ts`
Expected: PASS. Revisión visual a 375 / 768 / 1024 / 1440 px.

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: nueva home NovaScale"
```

---

### Task 8: Páginas de servicio (6) y de ciudad (4)

**Files:**
- Create: `src/data/services.ts`, `src/data/cities.ts`, `src/pages/[slug].astro`

**Interfaces:**
- Produces:
```ts
// src/data/services.ts
import type { IconName } from '../components/ui/Icon.astro';
export type ServicePage = {
  slug: 'creacion-de-contenido'|'gestion-redes-sociales'|'publicidad-meta-ads'|'sistema-ia'|'whatsapp-business-api'|'diseno-web';
  seoTitle: string;        // ≤ 60 caracteres, con la keyword al principio
  seoDescription: string;  // 140–160 caracteres
  keyword: string;
  hero: { eyebrow: string; title: string; titleAccent?: string; lead: string; bullets: string[] };
  features: { title: string; items: { title: string; text: string; icon: IconName }[] };
  process: { title: string; steps: { title: string; text: string }[] };
  showContentWall?: boolean; showAIDemo?: boolean; showRoi?: boolean;
  faq: { q: string; a: string }[];   // 5–6, específicas del servicio
  related: string[];                 // slugs de sectores (`sectores/...`) y de otros servicios
};
export const SERVICES: ServicePage[];

// src/data/cities.ts
export type CityPage = {
  slug: 'agencia-marketing-madrid'|'agencia-marketing-barcelona'|'agencia-marketing-valencia'|'agencia-marketing-malaga';
  city: string; seoTitle: string; seoDescription: string;
  hero: { eyebrow: string; title: string; titleAccent?: string; lead: string; bullets: string[] };
  localAngle: { title: string; paragraphs: string[] }; // 2–3 párrafos genuinamente locales
  sectorsHighlight: string[];                          // 2–3 sectores con peso en esa ciudad
  faq: { q: string; a: string }[];                     // 4–5, específicas de la ciudad
};
export const CITIES: CityPage[];
```
- `[slug].astro`: `getStaticPaths` devuelve `SERVICES` (con `kind: 'service'`) y `CITIES` (con `kind: 'city'`) y renderiza:
  - **Servicio:** PageHero → FeatureGrid → (ContentWall | AIDemo | RoiCalculator según los flags) → ProcessSteps → SystemActs (para mostrar dónde encaja en el sistema completo) → Guarantee → Faq → enlaces relacionados → LeadForm `compact`.
  - **Ciudad:** PageHero → bloque `localAngle` → SystemActs → enlaces a los sectores destacados → Benefits → Faq → LeadForm `compact`.
  - Schema: `Service` (`provider` → `#org`, `areaServed`: España o la ciudad) + `BreadcrumbList`.

**Brief de contenido** (escribe el copy completo; ninguna frase repetida entre páginas):

| slug | keyword principal | ángulo |
|---|---|---|
| creacion-de-contenido | agencia de creación de contenido para redes sociales | Vamos a tu negocio con guiones, equipo y formato preparados; jornada de grabación mensual; reels, stories y creativos para anuncios; filmmaker; tú solo pones el negocio. `showContentWall` |
| gestion-redes-sociales | agencia de redes sociales | Calendario, publicación, copy, diseño, respuesta a comentarios y DMs (con la IA filtrando los que quieren comprar). `showContentWall` |
| publicidad-meta-ads | agencia de Meta Ads (Facebook e Instagram Ads) | Estrategia, creativos con tu propio contenido, optimización e informe mensual; el presupuesto lo pagas tú directamente a Meta; la diferencia es que cada lead se filtra al instante. `showRoi` |
| sistema-ia | chatbot de WhatsApp con IA y agente de voz | WhatsApp con IA que responde en < 60 s, agente de voz 24/7, recuperación de llamadas perdidas, CRM Nova y aviso al momento cuando hace falta una persona. `showAIDemo` + `showRoi` |
| whatsapp-business-api | WhatsApp Business API oficial | API oficial de Meta, el número es tuyo, varios agentes, plantillas, IA conectada; sello de partner solo si `SITE.metaPartner`. `showAIDemo` |
| diseno-web | diseño web para negocios | Web incluida en el montaje: rápida, pensada para convertir y conectada al CRM; no se vende como "web barata" |

Ciudades: Madrid, Barcelona, Valencia, Málaga. El ángulo local se basa en hechos verificables y genéricos (densidad de clínicas y competencia en Instagram en esa ciudad, desplazamiento para grabar, mercado inmobiliario activo), sin inventar clientes ni direcciones. Siempre: "Grabamos en [ciudad] y en toda España".

- [ ] **Step 1: Escribir `services.ts` y `cities.ts` con el copy completo.**
- [ ] **Step 2: Implementar `[slug].astro`.**
- [ ] **Step 3: Verificar**

Run: `npm run build`
Expected: existen `dist/creacion-de-contenido.html` … `dist/agencia-marketing-malaga.html` (10 archivos). Revisión a 375 px de una página de servicio y una de ciudad.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: landings de servicio y de ciudad"
```

---

### Task 9: Páginas de sector (4)

**Files:**
- Create: `src/data/sectors.ts`, `src/pages/sectores/[slug].astro`

**Interfaces:**
```ts
export type SectorPage = {
  slug: 'clinicas-dentales'|'medicina-estetica'|'inmobiliarias'|'reformas';
  name: string; seoTitle: string; seoDescription: string; keyword: string;
  hero: { eyebrow: string; title: string; titleAccent?: string; lead: string; bullets: string[] };
  pains: { title: string; text: string }[];          // 4 dolores concretos del sector
  contentIdeas: string[];                             // 4–5 ideas de vídeo que grabaríamos allí
  aiScenario: 'dental'|'estetica'|'inmobiliaria'|'reformas';
  audioFilter: string[];                              // sectores de AUDIO_DEMOS que se muestran
  defaultTicket: number;                              // para la calculadora: dental 1500, estética 600, inmobiliaria 4000, reformas 8000
  faq: { q: string; a: string }[];                    // 5, específicas
};
export const SECTORS: SectorPage[];
```

Plantilla: PageHero → FeatureGrid de `pains` (título "Lo que vemos en [sector]") → bloque de ideas de contenido ("Lo que grabaríamos en tu [negocio]") → AIDemo con `aiScenario` y `audioFilter` → RoiCalculator con `defaultTicket` → SystemActs → Guarantee → Faq → LeadForm `compact`. Schema: `Service` (`audience`: el sector) + `BreadcrumbList`.

Keywords: "marketing para clínicas dentales", "marketing para clínicas de medicina estética", "marketing para inmobiliarias", "marketing para empresas de reformas". En estética y dental: añade una nota de cumplimiento ("La IA no diagnostica ni da precios médicos cerrados: las consultas clínicas pasan a tu equipo") y evita afirmaciones sanitarias.

- [ ] **Step 1: Escribir `sectors.ts` con el copy completo (original y específico de cada sector).**
- [ ] **Step 2: Implementar la plantilla.**
- [ ] **Step 3: Verificar** con `npm run build` (existen 4 archivos `dist/sectores/*.html`) y una revisión a 375 px.
- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: landings de sector"
```

---

### Task 10: Nosotros, Trabajos, Contacto, Software Nova y legales

**Files:**
- Create: `src/pages/nosotros.astro`, `trabajos.astro`, `contacto.astro`, `software-nova.astro`, `politica-privacidad.astro`, `politica-cookies.astro`, `terminos-condiciones.astro`

- **Nosotros:** foto del fundador (`/img/fundador.jpg`), "Soy Stiven González…" en primera persona: por qué Visión Nova junta producción audiovisual, publicidad y tecnología propia; cómo trabajamos (pocas cuentas, a mano, 3 plazas al mes); qué es Nova. Sin años de experiencia inventados. CTA al formulario.
- **Trabajos:** cabecera "Trabajos y detrás de cámaras" + ContentWall con `CONTENT_REELS` + ScaleVideo + un bloque "Casos con resultados" que de momento dice honestamente: "Estamos documentando los resultados de nuestros clientes actuales. Mientras tanto, mira cómo trabajamos." + CtaBand. Sin cifras.
- **Contacto:** título "Hablemos de tu negocio", `<LeadForm variant="full" id="formulario"/>` y una columna con WhatsApp, email, "Girona · Grabamos en toda España" y el horario de respuesta ("Respondemos en menos de 24 h laborables").
- **Software Nova:** explica Nova (CRM, asistente IA en WhatsApp y web, agenda, recordatorios, panel). Tres tarjetas resumen de los planes Esencial / Profesional / Empresa con sus características principales (de la captura de la app). **Sin precios en esta web**: cada tarjeta enlaza a `SITE.appUrl` con "Ver precio y empezar". Debajo: "¿Prefieres que lo montemos todo por ti? Eso es NovaScale" → `/#sistema`.
- **Legales:** migra el texto de `legacy/politica-privacidad.html`, `legacy/politica-cookies.html` y `legacy/terminos-condiciones.html` (solo el contenido del `<main>`, en prosa con estilo `prose`, `noindex: false`). Añade a la de privacidad un apartado que diga que los datos del formulario se guardan en Nova CRM (encargado del tratamiento: Visión Nova) y en el correo, para gestionar la solicitud.

- [ ] **Step 1: Implementar las 7 páginas** con `title`/`description` únicos.
- [ ] **Step 2: Verificar** con `npm run build` y una revisión a 375 px de Nosotros y Contacto.
- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: páginas de nosotros, trabajos, contacto, software Nova y legales"
```

---

### Task 11: Migración del blog

**Files:**
- Create: `src/content.config.ts`, `src/content/blog/*.md` (7), `src/pages/blog/index.astro`, `src/pages/blog/[slug].astro`

**Interfaces:**
```ts
// src/content.config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({ title: z.string(), description: z.string(), date: z.coerce.date(), tags: z.array(z.string()).default([]) }),
});
export const collections = { blog };
```

- [ ] **Step 1: Convertir cada `legacy/blog-*.html` a markdown.** El slug es el nombre de archivo sin `blog-` ni `.html` (así encaja con la redirección `/blog-:slug → /blog/:slug`). El frontmatter usa `title` (del `<h1>`), `description` (del meta description) y `date` (de `datePublished` si existe; si no, `2026-07-01`). Conserva las cifras y los textos del artículo, pero elimina cualquier precio de NovaScale o del "Sistema Cliente Infinito" que aparezca, y sustituye las menciones a "Sistema Cliente Infinito" por "NovaScale".
- [ ] **Step 2: `blog/index.astro`:** cuadrícula de tarjetas glass (título, descripción, fecha) con `data-reveal-stagger`. **`blog/[slug].astro`:** artículo con ancho de lectura de 68 ch, tipografía cuidada (h2 en serif, párrafos de 18 px y 1.7 de interlineado), schema `Article` + `BreadcrumbList`, CtaBand al final y enlaces a 2 servicios relacionados.
- [ ] **Step 3: Verificar** con `npm run build`: existen 7 archivos `dist/blog/*.html` y `dist/blog.html`.
- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: migración del blog a content collections"
```

---

### Task 12: SEO técnico (robots, llms.txt y auditoría)

**Files:**
- Create: `public/robots.txt`, `public/llms.txt`, `tests/seo/seo-audit.test.ts`

- [ ] **Step 1: `public/robots.txt`**

```
User-agent: *
Allow: /
Disallow: /gracias

Sitemap: https://www.visionnovaia.com/sitemap-index.xml
```

- [ ] **Step 2: `public/llms.txt`:** resumen en markdown de Visión Nova: qué hace (contenido, Meta Ads, sistema IA con CRM Nova y WhatsApp API), para quién, dónde (toda España, sede en Girona), cómo contactar, y la lista de URLs principales con una línea cada una. Sin precios de NovaScale.

- [ ] **Step 3: Escribir el test de auditoría** (`tests/seo/seo-audit.test.ts`)

```ts
import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';
const walk = (d: string): string[] => readdirSync(d).flatMap((f) => {
  const p = join(d, f);
  return statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') ? [p] : [];
});
const pages = existsSync(DIST) ? walk(DIST).filter((p) => !p.includes('404') && !p.includes('gracias')) : [];
const get = (html: string, re: RegExp) => html.match(re)?.[1] ?? '';

describe.skipIf(!pages.length)('auditoría SEO de dist/', () => {
  const data = pages.map((p) => {
    const html = readFileSync(p, 'utf8');
    return {
      p, html,
      title: get(html, /<title>([^<]*)<\/title>/),
      desc: get(html, /<meta name="description" content="([^"]*)"/),
      canonical: get(html, /<link rel="canonical" href="([^"]*)"/),
      h1s: (html.match(/<h1[\s>]/g) ?? []).length,
    };
  });

  it('cada página tiene un title único de ≤ 65 caracteres', () => {
    const titles = data.map((d) => d.title);
    for (const d of data) expect(d.title.length, d.p).toBeGreaterThan(10), expect(d.title.length, d.p).toBeLessThanOrEqual(65);
    expect(new Set(titles).size).toBe(titles.length);
  });
  it('cada página tiene una meta description única de 70–165 caracteres', () => {
    for (const d of data) expect(d.desc.length, d.p).toBeGreaterThanOrEqual(70), expect(d.desc.length, d.p).toBeLessThanOrEqual(165);
    expect(new Set(data.map((d) => d.desc)).size).toBe(data.length);
  });
  it('canonical absoluta en www, sin .html', () => {
    for (const d of data) expect(d.canonical, d.p).toMatch(/^https:\/\/www\.visionnovaia\.com(\/[a-z0-9\-\/]*)?$/);
  });
  it('exactamente un h1 por página', () => { for (const d of data) expect(d.h1s, d.p).toBe(1); });
  it('lang="es" y og:image', () => {
    for (const d of data) { expect(d.html, d.p).toContain('<html lang="es"'); expect(d.html, d.p).toContain('property="og:image"'); }
  });
  it('ningún precio de NovaScale y ninguna afirmación de partner de Meta', () => {
    for (const d of data) {
      const text = d.html.replace(/<script[\s\S]*?<\/script>/g, '');
      expect(text, d.p).not.toMatch(/1\.490|2\.500|950\s?€/);
      expect(text, d.p).not.toMatch(/Meta (Tech )?(Provider|Partner)|socios? (tecnológicos? )?de Meta/i);
      expect(text, d.p).not.toMatch(/\bbonos?\b/i);
    }
  });
  it('todas las imágenes tienen alt', () => {
    for (const d of data) expect(d.html.match(/<img(?![^>]*\balt=)[^>]*>/g) ?? [], d.p).toEqual([]);
  });
});
```

- [ ] **Step 4: Ejecutar**

Run: `npm run build && npx vitest run tests/seo`
Expected: PASS. Si algo falla, corrige la página (no el test).

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: robots, llms.txt y auditoría SEO automatizada"
```

---

### Task 13: Enlazado interno y revisión del copy

**Files:**
- Modify: las páginas de datos y plantillas que haga falta

- [ ] **Step 1: Enlazado:** cada servicio enlaza a ≥ 2 sectores y a ≥ 1 servicio; cada sector, a ≥ 3 servicios; cada ciudad, a los servicios principales y a sus sectores destacados; la home enlaza a los 6 servicios y a los 4 sectores (en SystemActs y en el footer). Comprueba que no hay enlaces rotos:

```bash
npm run build && node -e "
const fs=require('fs'),p=require('path');const w=d=>fs.readdirSync(d).flatMap(f=>{const q=p.join(d,f);return fs.statSync(q).isDirectory()?w(q):q.endsWith('.html')?[q]:[]});
const files=w('dist');const ok=new Set(files.map(f=>'/'+f.slice(5).replace(/\\\\/g,'/').replace(/\.html$/,'').replace(/^index$/,'').replace(/\/index$/,'')));ok.add('/');
let bad=0;for(const f of files){for(const m of fs.readFileSync(f,'utf8').matchAll(/href=\"(\/[^\"#?]*)/g)){const u=m[1].replace(/\/$/,'')||'/';if(!ok.has(u)&&!/\.(webp|jpg|png|svg|mp4|mp3|xml|txt|css|js)$/.test(u)){console.log(f,u);bad++}}}process.exit(bad?1:0)"
```
Expected: exit 0.

- [ ] **Step 2: Revisión del copy:** lee todas las páginas del build y comprueba las Global Constraints (originalidad, nada de precios, nada de "partner", nada de "bonos", nada inventado, textos exactos de la garantía y de la escasez). Busca también frases repetidas entre landings:

```bash
grep -rhoE "[A-ZÁÉÍÓÚ][^.<>]{60,}\." dist --include=*.html | sort | uniq -c | sort -rn | awk '$1>2' | head -30
```
Expected: solo se repiten los bloques compartidos (garantía, escasez, beneficios, SystemActs y footer).

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "chore: enlazado interno y revisión del copy"
```

---

### Task 14: QA final (layout responsive, rendimiento) y limpieza

**Files:**
- Create: `tests/e2e/layout.spec.ts`
- Delete: `legacy/`

- [ ] **Step 1: Escribir el test de layout**

```ts
import { test, expect } from '@playwright/test';
const PAGES = ['/', '/creacion-de-contenido', '/gestion-redes-sociales', '/publicidad-meta-ads', '/sistema-ia', '/whatsapp-business-api', '/diseno-web',
  '/sectores/clinicas-dentales', '/sectores/medicina-estetica', '/sectores/inmobiliarias', '/sectores/reformas',
  '/agencia-marketing-madrid', '/agencia-marketing-barcelona', '/agencia-marketing-valencia', '/agencia-marketing-malaga',
  '/nosotros', '/trabajos', '/contacto', '/software-nova', '/blog'];
const WIDTHS = [375, 768, 1024, 1440];

for (const path of PAGES) for (const w of WIDTHS) {
  test(`${path} @${w}px sin scroll horizontal`, async ({ page }) => {
    await page.setViewportSize({ width: w, height: 900 });
    await page.goto(path);
    await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 30)); } });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
}

test('con reduced motion todo el texto es visible', async ({ browser }) => {
  const ctx = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  const hidden = await page.locator('h2').evaluateAll((els) => els.filter((e) => parseFloat(getComputedStyle(e).opacity) < 0.5).length);
  expect(hidden).toBe(0);
});

test('las redirecciones antiguas están declaradas', async () => {
  const v = JSON.parse(require('node:fs').readFileSync('vercel.json', 'utf8'));
  const src = v.redirects.map((r: any) => r.source);
  for (const s of ['/agente-voz', '/chatbot-ia', '/servicios', '/casos-de-uso', '/quienes-somos', '/blog-:slug']) expect(src).toContain(s);
});
```

- [ ] **Step 2: Ejecutar**

Run: `npx playwright test`
Expected: PASS en todos. Si una página desborda, corrige el componente culpable (normalmente basta con `overflow-x: clip` en la sección o con `min-w-0`, pero arregla el ancho real, no lo tapes).

- [ ] **Step 3: Lighthouse móvil**

```bash
npx astro preview --port 4321 &
npx lighthouse http://localhost:4321/ --form-factor=mobile --only-categories=performance,seo,accessibility --output=json --output-path=./lh-home.json --chrome-flags="--headless"
npx lighthouse http://localhost:4321/sectores/clinicas-dentales --form-factor=mobile --only-categories=performance,seo,accessibility --output=json --output-path=./lh-dental.json --chrome-flags="--headless"
node -e "for (const f of ['lh-home.json','lh-dental.json']) { const r=require('./'+f); console.log(f, Object.fromEntries(Object.entries(r.categories).map(([k,v])=>[k,Math.round(v.score*100)]))) }"
```
Expected: ≥ 90 en las tres categorías. Las palancas habituales si no se llega: `preload` del póster del hero, `fetchpriority="high"` en el póster, reducir el JS del hero (GSAP se carga con el script del layout; si hace falta, retrasa `motion.ts` con `requestIdleCallback`) y comprimir más el `hero.mp4` (`-crf 30`). Borra después los `lh-*.json`.

- [ ] **Step 4: Limpieza:** `git rm -r legacy` y elimina las referencias a `legacy` de `scripts/prepare-assets.mjs` (los recursos ya están en `public/`; deja el script con un comentario que diga que ya se ejecutó y para qué servía, o bórralo).

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "test: QA responsive y reduced-motion; elimina las páginas antiguas"
```
