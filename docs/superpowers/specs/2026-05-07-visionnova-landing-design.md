# VISIONNØVA — Landing Page Design Spec
**Fecha:** 2026-05-07  
**Tipo:** Landing page de agencia IA — una sola página  
**Stack:** HTML + CSS + JS puro · GSAP + ScrollTrigger (CDN) · Canvas API para estrellas

---

## Objetivo
Convertir visitantes en leads calificados que agenden una llamada via Calendly.  
**CTA principal:** https://calendly.com/stivengonzalezads/planifica-el-futuro-digital-de-tu-negocio-con-visionnov

---

## Paleta de colores
| Token | Valor | Uso |
|-------|-------|-----|
| Background | `#000000` | Fondo absoluto |
| Accent purple | `#814ac8` | Botones, bordes, glow |
| Accent violet | `#df7afe` | Highlights, badges |
| Text primary | `#ffffff` | Headings |
| Text muted | `#cccccc` | Subtítulos, cuerpo |
| Card bg | `rgba(255,255,255,0.05)` | Cards de servicios |
| Card border | `rgba(255,255,255,0.08)` | Bordes sutiles |

---

## Tipografía
- **Fuente principal:** Figtree (Google Fonts) — weights 400, 500, 600, 700, 900
- **Logo:** `letter-spacing: 0.15em` + Ø renderizado nativamente (Unicode U+00D8)

---

## Estructura de secciones

### 1. Navbar (fija)
- Logo: `VISIONNØVA` texto blanco, fuente geométrica, letra-espaciado amplio
- Links: Inicio · Servicios · Por qué nosotros · Garantía · Contacto (smooth scroll)
- CTA: `Agendar llamada ↗` — botón púrpura sólido
- Comportamiento scroll: al bajar >50px → `backdrop-filter: blur(12px)` + `background: rgba(0,0,0,0.8)`
- Animación entrada: fade-in desde arriba con GSAP (delay 0.2s)

### 2. Hero (100vh)
- **Fondo:** Canvas `<canvas id="stars">` — partículas blancas aleatorias con parallax suave al mover mouse
- **Orbe:** `div.orb` — gradiente radial `#814ac8 → #df7afe → transparent`, blur 80px, animación float (translateY ±20px, 6s infinite ease-in-out)
- **Badge pill:** `Nuevo · Sistema Cliente Infinito` — borde púrpura, fondo `rgba(129,74,200,0.15)`
- **H1:** "Tu negocio nunca más pierde un cliente por no contestar."
- **Subtítulo:** "En 30 días te instalamos un sistema completo de IA que responde, agenda, llama y vende por ti — las 24 horas, los 7 días — sin que tú ni tu equipo muevan un dedo."
- **Botones:** `Agendar llamada ↗` (púrpura) + `Ver servicios →` (outline blanco)
- **Animación entrada:** GSAP timeline — badge → h1 → subtítulo → botones, cada uno fade-in + translateY(30px→0), stagger 0.15s

### 3. Servicios (9 cards)
- **Título sección:** "Todo lo que incluye el Sistema Cliente Infinito"
- **Layout:** CSS Grid — 3 columnas desktop / 2 tablet / 1 mobile
- **Cards (9):**
  1. 🌐 Tu Web Profesional con IA Integrada
  2. 💬 Agente IA en WhatsApp 24/7
  3. 📞 Agente de Voz IA para Llamadas
  4. 📊 Dashboard de Control en Tiempo Real
  5. 🔄 Sistema de Seguimiento Automático
  6. ⚙️ Integración CRM Completa
  7. 🛠️ Instalación 100% a Cargo Nuestro
  8. 🎓 Formación para Tu Equipo
  9. 🛡️ Soporte Prioritario 90 Días
- **Card estilo:** `border-radius: 16px`, borde `1px solid rgba(129,74,200,0.3)`, hover → borde púrpura brillante + glow sutil
- **Animación:** ScrollTrigger stagger — cards entran con fade-in + scale(0.95→1), escalonado 0.1s por card

### 4. Garantía
- **Fondo:** orbe púrpura difuso centrado (mismo efecto que hero pero más tenue)
- **Icono:** escudo grande (SVG o emoji 🛡️)
- **Título:** "Sin riesgo para ti"
- **Texto:** "Si en los primeros 30 días el sistema no te genera resultados medibles — citas agendadas, llamadas contestadas, clientes recuperados — el mes siguiente de soporte es completamente gratis. Y seguimos así, mes a mes, hasta que los resultados sean reales. Nosotros no ganamos si tú no ganas."
- **Animación:** fade-in desde abajo con ScrollTrigger

### 5. Urgencia + Cierre
- **Fondo:** gradiente sutil negro → púrpura muy oscuro
- **Texto urgencia:** "Solo aceptamos 5 clientes nuevos al mes para garantizar calidad. Si estás leyendo esto, hay plaza disponible esta semana."
- **Dots/indicador:** 5 círculos (ej. 3 llenos = ocupados, 2 vacíos = disponibles)
- **Precio gancho:** "Menos de $17 al día. Una sola cita recuperada ya paga el sistema."
- **Frase cierre:** "No te pedimos que confíes en nosotros. Te pedimos 20 minutos para mostrarte exactamente cómo funcionaría en tu negocio."
- **CTA final:** botón grande `Reserva tu llamada gratuita ↗` — púrpura, hover con glow
- **Animación:** contador de plazas con número animado, luego fade-in del texto y botón

### 6. Footer
- Logo `VISIONNØVA` centrado
- Links: Servicios · Garantía · Contacto
- Copyright: `© 2026 Visión Nova. Todos los derechos reservados.`
- Línea superior con glow púrpura

---

## Animaciones — resumen técnico
| Elemento | Librería | Tipo |
|----------|----------|------|
| Entrada navbar | GSAP | fromTo, y:-40→0, opacity 0→1 |
| Hero elementos | GSAP timeline | stagger fade-in + translateY |
| Orbe | CSS keyframes | float up/down infinite |
| Estrellas | Canvas API | requestAnimationFrame, parallax mouse |
| Cards servicios | GSAP ScrollTrigger | stagger batch, scale + fade |
| Garantía | GSAP ScrollTrigger | fade-in from bottom |
| Urgencia / cierre | GSAP ScrollTrigger | fade-in + counter animado |
| Navbar scroll | JS scroll event | clase CSS con backdrop-filter |

---

## Responsivo
- Desktop: ≥1200px
- Tablet: 810px–1199px
- Mobile: ≤809px
- Navbar mobile: hamburger menu con drawer lateral

---

## Entregable
- `index.html` — archivo único autocontenido en la raíz del proyecto
- Sin build process, abrir directamente en navegador
- GSAP y ScrollTrigger cargados via CDN (unpkg)
