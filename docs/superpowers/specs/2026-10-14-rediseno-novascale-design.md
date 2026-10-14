# Rediseño Visión Nova — NovaScale (spec)

Fecha: 2026-10-14 · Estado: pendiente de revisión de Stiven

## 1. Objetivo

La web actual (17 páginas HTML, home centrada en "agentes de IA para clínicas dentales") no genera contactos y suena genérica. Visión Nova ahora vende un servicio de agencia completo: **grabamos contenido en el negocio del cliente, llevamos sus redes, hacemos Meta Ads y filtramos cada contacto con el sistema de IA propio (Nova: WhatsApp con IA, agente de voz, CRM)**. La web debe:

- Vender ese servicio (NovaScale) a negocios locales de ticket alto en toda España.
- Verse premium (nivel web de 20.000 $), con animaciones al hacer scroll, y funcionar perfecto en móvil (iPhone, iPad, Android).
- Posicionar en Google por servicio, sector y ciudad.
- Captar contactos con un formulario por pasos que lo envía todo a Nova CRM.

**Éxito:** contactos cualificados entrando a Nova cada semana; LCP móvil < 2,5 s; Lighthouse móvil ≥ 90 en Performance, SEO y Accesibilidad.

## 2. Decisiones cerradas

| Tema | Decisión |
|---|---|
| Nicho | Negocios locales de ticket alto. Home general + landings de sector |
| Sectores con landing | Clínicas dentales · Medicina estética · Inmobiliarias · Reformas y construcción |
| Zona | Toda España ("vamos a tu negocio a grabar") |
| Precios | **Ningún precio de NovaScale en la web.** Cada propuesta es a medida. La sección "¿Solo quieres el software?" enlaza a los planes de app.visionnovaia.com |
| Entregables de contenido | Sin cifras ("jornada de grabación mensual en tu negocio"); varía por cliente |
| Stack | Astro (salida estática) + Tailwind + GSAP/ScrollTrigger + Lenis, deploy en Vercel |
| Copy | 100 % original. No copiar textos ni estructura de veltim.com ni de otras referencias |
| Meta | La verificación como partner está en curso. **No afirmar "Meta Tech Provider/Partner" hasta que esté aprobada.** Hasta entonces: "WhatsApp Business API oficial". El sello de partner va tras un flag (`META_PARTNER=true`) para activarlo con un cambio |
| Garantía | Se muestra limpia, sin letra pequeña visible en la sección. Las condiciones viven en el contrato y en una respuesta del FAQ escrita en lenguaje llano |
| Bonos | No se presentan como "3 bonos" con nombre. Sus beneficios se integran como características del sistema |
| Calendly | Se mantiene, pero **embebido dentro del último paso del formulario** con el estilo de la web y los datos prellenados. Reserva nativa en Nova = fase futura, cuando Nova exponga una página de reservas pública |

## 3. Mensaje y oferta (copy base)

**Posicionamiento:** agencia de contenido y captación con un sistema de IA propio. La IA es el diferencial, no el producto.

- **H1:** "Grabamos tu negocio. Lo llenamos de clientes. La IA te deja solo los que van a comprar."
- **Subtítulo:** "Contenido, Meta Ads y un CRM con IA que filtra cada contacto. Para negocios de ticket alto, en toda España."
- **CTA principal:** "Ver si mi negocio encaja" → formulario. **CTA secundario:** "Ver cómo trabajamos" → vídeo/sección del sistema.

**Los tres actos del sistema:**
1. **Grabamos.** Vamos a tu negocio con guiones, equipo y formato preparados. Tú solo pones el negocio.
2. **Captamos.** Contenido orgánico en tus redes + campañas de Meta Ads con esos mismos vídeos.
3. **Filtramos.** WhatsApp con IA que responde en menos de 60 s, agente de voz 24/7 y CRM Nova. Tu equipo solo habla con quien está listo para comprar.

**Beneficios que sustituyen a los bonos:**
- "La IA habla como tu equipo": se configura con el tono y las frases reales del negocio.
- "Nunca pierdes el control": aviso instantáneo cuando un cliente necesita a una persona.
- "Sabes en qué se va cada euro": informe mensual claro de trabajo, inversión en Ads y resultados.

**Garantía (texto visible):** "Si en 30 días el sistema no te entrega al menos 15 clientes filtrados, el segundo mes va por nuestra cuenta."
FAQ "¿Cómo funciona la garantía?": explica en llano que los 30 días cuentan desde que arrancan las campañas, que antes de empezar acordamos qué cuenta como cliente filtrado y la inversión en Ads, y que todo queda en el contrato.

**Escasez real:** "Solo incorporamos 3 negocios nuevos al mes, porque cada implantación la montamos a mano."

**Para quién es / no es:** es para negocios que ya facturan, tienen equipo y quieren crecer sin contratar más. No es para quien busca solo likes o una web barata.

**Nunca en la web:** "somos los mejores", años de experiencia inventados, testimonios o cifras inventadas, urgencia falsa. Los resultados del cliente actual de contenido solo se publican con datos reales y su permiso.

**Credibilidad sin sonar nuevos:** especificidad (cómo trabajamos, qué ve el cliente en el CRM, audios reales de la IA), cara del fundador, contenido real grabado, detrás de cámaras. Nada de "acabamos de empezar" ni de afirmaciones que no podamos demostrar.

## 4. Mapa del sitio y URLs

| Página | URL | Palabra clave principal |
|---|---|---|
| Home | `/` | agencia de marketing y contenido con IA |
| Creación de contenido / filmmaker | `/creacion-de-contenido` | agencia de creación de contenido para redes sociales |
| Gestión de redes | `/gestion-redes-sociales` | agencia de redes sociales |
| Meta Ads | `/publicidad-meta-ads` | agencia de Meta Ads / Facebook e Instagram Ads |
| Sistema IA | `/sistema-ia` | chatbot WhatsApp IA + agente de voz + CRM |
| WhatsApp API | `/whatsapp-business-api` | WhatsApp Business API oficial |
| Diseño web | `/diseno-web` | diseño web para negocios |
| Sectores | `/sectores/clinicas-dentales`, `/sectores/medicina-estetica`, `/sectores/inmobiliarias`, `/sectores/reformas` | marketing para [sector] |
| Ciudades | `/agencia-marketing-madrid`, `/agencia-marketing-barcelona`, `/agencia-marketing-valencia`, `/agencia-marketing-malaga` | agencia de marketing [ciudad] |
| Software Nova | `/software-nova` | CRM con IA para negocios |
| Nosotros | `/nosotros` | — |
| Trabajos | `/trabajos` | — (portfolio: detrás de cámaras + cliente) |
| Contacto | `/contacto` | — |
| Blog | `/blog`, `/blog/[slug]` | se migran los 7 artículos actuales |
| Legales | `/politica-privacidad`, `/politica-cookies`, `/terminos-condiciones` | — |

Cada landing de sector y de ciudad tiene contenido propio (dolores, ejemplos y FAQ específicos). No son la misma página con otra palabra cambiada.

**Redirecciones 301** (en `vercel.json`): `/agente-voz`, `/chatbot-ia` → `/sistema-ia`; `/servicios` → `/#sistema`; `/casos-de-uso` → `/trabajos`; `/quienes-somos` → `/nosotros`; `/blog-*` → `/blog/*`. Se mantiene la redirección de `visionnovaia.com` a `www`.

## 5. Home: secciones

1. **Hero.** Se mantiene lo que funciona de la actual: el fondo de vídeo iridiscente (alojado ahora en `/public/video/hero.mp4`, no en el CDN de terceros), las estrellas, Instrument Serif en cursiva y el header en cápsula. Novedades: el H1 se revela por palabras con un brillo dorado sutil y el logo nuevo (estrella dorada). Al hacer scroll, un marco con el vídeo detrás de cámaras crece desde el centro hasta ocupar la pantalla (mientras no haya vídeo, una imagen de reserva).
2. **El problema.** "No te faltan contactos. Te falta filtro." Sección fijada: 10 contactos entran y se van apagando los que se pierden (presentado como ejemplo ilustrativo).
3. **El sistema en 3 actos.** Scroll horizontal fijado en escritorio; tarjetas apiladas en móvil.
4. **Contenido real.** Reels dentro de móviles (vídeos `muted playsinline`, cargados solo cuando entran en pantalla).
5. **La IA en acción.** Chat de WhatsApp simulado + reproductor con los audios demo existentes (`.wav` convertidos a `.mp3`/`.m4a`).
6. **CRM Nova.** Captura del panel que se amplía con el scroll.
7. **Calculadora "¿Cuánto dinero pierdes al mes?".** Entradas: contactos al mes, % que no se atiende a tiempo, ticket medio. Muestra la pérdida estimada en €. Sin precio nuestro.
8. **Beneficios + garantía + 3 plazas al mes.**
9. **Para quién es / no es.**
10. **"¿Solo quieres el software?"** → app.visionnovaia.com.
11. **FAQ** (con schema FAQPage).
12. **Formulario** (componente de la sección 7).

Las páginas de servicio, sector y ciudad reutilizan los mismos bloques (Hero, Problema, Sistema, FAQ, Formulario) con su contenido propio.

## 6. Diseño visual y animación

- **Paleta (tokens):** fondo `#0a0a0a`, superficie `#121212`, texto `#ECE8E1`, texto secundario `#A39E96`, dorado `#D9B266` y degradado dorado `#F1D9A0 → #B8862F` (sacado de los logos). El dorado solo para acentos.
- **Tipografía:** Instrument Serif (titulares, cursiva) + Geist (texto). Fuentes autoalojadas con `font-display: swap`.
- **Logos:** icono de estrella dorada (favicon, app icon, header) y logo horizontal (footer, OG image). Exportados a SVG/WebP optimizados.
- **Movimiento:** Lenis para el scroll suave; GSAP + ScrollTrigger + SplitText para revelar textos, fijar secciones, escalar el vídeo, contadores y botones magnéticos (solo en escritorio).
- **Móvil primero:**
  - Todo se diseña y se prueba a 375 px primero, después tablet (768/1024) y escritorio.
  - En móvil: sin scroll horizontal fijado (se convierte en tarjetas apiladas), sin efectos magnéticos ni de cursor, y vídeos más ligeros.
  - Zonas táctiles de al menos 44 px; `100svh` en lugar de `100vh` (por la barra de Safari en iOS); `env(safe-area-inset-*)` en elementos fijos; inputs a 16 px para que iOS no haga zoom.
- **Accesibilidad:** con `prefers-reduced-motion` se desactivan los fijados y las animaciones y se muestra todo estático; contraste AA; foco visible.

## 7. Formulario por pasos

Un único componente `<LeadForm>` que se usa en todas las páginas (en la variante corta de las landings arranca en el paso 1). Una pregunta por pantalla, barra de progreso, transiciones de deslizamiento, botón atrás y teclado Enter.

| Paso | Pregunta | Campo (Nova) | Tipo |
|---|---|---|---|
| 1 | ¿Qué te gustaría conseguir? | `servicio` | multiselección: más clientes con anuncios · contenido y redes · que la IA atienda y filtre · todo el sistema |
| 2 | ¿A qué se dedica tu negocio? | `sector` | dental · estética · inmobiliaria · reformas · otro (+ texto) |
| 3 | ¿Cuánto vale de media un cliente para ti? | `ticket_medio` | menos de 100 € · 100–500 € · 500–2.000 € · más de 2.000 € |
| 4 | ¿Ya invertís en publicidad? | `publicidad_actual` | sí, en Meta · sí, en otros canales · lo probamos y lo dejamos · todavía no |
| 5 | ¿Cómo te contactamos? | `nombre`, `email`, `telefono`, `empresa`, `web` (opcional), `mensaje` (opcional) | inputs |
| 6 | Elige tu llamada | Calendly embebido con nombre y email prellenados | — |

No se pregunta la facturación (la gente la percibe como intrusiva). El ticket medio y la publicidad actual filtran igual y además alimentan la calculadora de ROI.

**Envío** (al completar el paso 5, antes de mostrar Calendly):
1. `fetch("https://app.visionnovaia.com/api/conectar/G5dyyHJdDKYyH4GPl9fGCJtC", { method: "POST", headers: {"Content-Type":"application/json"}, keepalive: true, body: JSON.stringify({ nombre, email, telefono, mensaje, origen: "Web", servicio, sector, ticket_medio, publicidad_actual, empresa, web, pagina, utm_source, utm_medium, utm_campaign, cualificado }) })`, con timeout de 5 s. Los errores se ignoran en silencio.
2. Copia por email a `formsubmit.co/ajax/stiveng.visionnova@gmail.com` (también silenciosa).
3. Si `ticket_medio = "menos de 100 €"` y `publicidad_actual = "todavía no"`: `cualificado: false`. En vez de Calendly se muestra una pantalla amable que ofrece el software Nova (planes en la app) y un enlace por si aun así quieren llamada. En cualquier otro caso: Calendly.
4. Evento `Lead` para Meta Pixel / GA4 si están configurados (variables de entorno opcionales).

Validación en el cliente (email, teléfono español o internacional), honeypot anti-spam y la casilla de aceptación de la política de privacidad. Los datos del paso a paso se guardan en `sessionStorage` para no perderlos si recarga la página.

## 8. SEO técnico

- `title` y `description` únicos por página; canónicas a `https://www.visionnovaia.com/...`.
- Schema: `ProfessionalService` (Girona, `areaServed: España`), `Service` en cada página de servicio, `FAQPage`, `BreadcrumbList` y `Article` en el blog.
- `@astrojs/sitemap`, `robots.txt` y `llms.txt` (resumen de la agencia para buscadores de IA).
- Imágenes OG por página generadas en el build, imágenes en AVIF/WebP con `width`/`height`, vídeos con `poster` y `preload="none"` fuera del hero.
- Enlazado interno: cada servicio enlaza a sus sectores y viceversa; las ciudades enlazan a los servicios.

## 9. Recursos pendientes de Stiven (no bloquean)

La web arranca con huecos marcados y una imagen de reserva:
- Vídeos detrás de cámaras (horizontal para el hero, verticales para los reels).
- Reels del cliente actual + su permiso por escrito.
- Captura del CRM Nova.
- Aviso cuando Meta apruebe la verificación (para activar el sello).

## 10. Fuera de alcance

- Vídeo de ventas / skill de Remotion → proyecto aparte, después de este.
- Reserva nativa en Nova en lugar de Calendly.
- Cambios en app.visionnovaia.com (la incoherencia "desde 950 €/mes · sin permanencia" se señala a Stiven, pero no se toca aquí).

## 11. Verificación

- `astro build` sin errores ni avisos.
- Lighthouse móvil ≥ 90 (Performance, SEO y Accesibilidad) en la home y en una landing.
- Revisión visual a 375, 768, 1024 y 1440 px, más Safari iOS (barra de direcciones, safe areas, autoplay de vídeo).
- Formulario: un envío real llega a Nova y por email; con la URL de Nova rota, el visitante sigue viendo Calendly sin error.
- Todas las redirecciones 301 responden bien.
