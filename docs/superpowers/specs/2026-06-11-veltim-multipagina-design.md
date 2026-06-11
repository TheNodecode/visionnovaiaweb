# Diseño: Visión Nova 2.0 — Sitio multi-página (referencia estructural: veltim.com)

**Fecha:** 2026-06-11
**Estado:** Aprobado por el usuario

## Objetivo

Ampliar la web de Visión Nova (actualmente index.html + servicios.html) a un sitio
multi-página con toda la estructura de secciones de veltim.com, pero con el estilo
propio existente (dark, liquid-glass, tipografías Instrument Serif + Barlow) y
textos redactados desde cero en el tono de marca ("Sistema Cliente Infinito",
"escala al infinito", élite). No se copia el diseño visual ni los textos de Veltim.

## Stack y estructura técnica

- HTML estático + Tailwind CDN (config inline existente), deploy en Vercel. Sin build step.
- Extraer lo compartido a:
  - `assets/css/main.css` — estilos liquid-glass, input-glass, text-gradient, nebula-glow, animaciones.
  - `assets/js/main.js` — nav scroll, tilt 3D, scroll-reveal, menú hamburguesa, calculadora ROI, simulador de chat, reproductor de audio.
- El tailwind.config inline se mantiene idéntico en cada página (es necesario con CDN); el resto no se duplica.
- Sin backend: calculadora ROI y simuladores son JS puro. Todos los CTA llevan a Calendly o WhatsApp.

## Páginas

### 1. index.html (mejorar la existente)
Orden de secciones:
1. Barra de anuncio (global) + header (global).
2. Hero actual (video, titular, CTA) — se conserva.
3. NUEVA — Problema/agitación: "Convierte más leads en clientes sin aumentar tu inversión en publicidad" con 3 bullets de valor y badge "<20s tiempo de respuesta".
4. NUEVA — Carrusel de logos (marquee infinito): WhatsApp, OpenAI, Make, n8n, HubSpot, Calendly, Shopify, Instagram, Google Calendar. Texto: "Trabajamos con las mejores herramientas".
5. NUEVA — 4 features en grid 2x2: Disponibilidad 24/7, Conversación Natural, Reservas Automáticas, Multi-idioma.
6. Sección Ecosistema actual (6 cards) — se conserva, las cards enlazan a las páginas de servicio.
7. NUEVA — Calculadora ROI "Calcula tu Ahorro": 3 sliders (llamadas mensuales, coste mensual empleado €, valor promedio venta €) → calcula ahorro mensual, ingresos adicionales, ROI total mensual/anual + mini tabla Humanos vs IA. Junto a ella, panel "Automatiza tu Prospección" con cola de llamadas animada (mockup).
8. NUEVA — Teaser del simulador de chat (enlace a chatbot-ia.html).
9. Sección Garantía/Resultados actual — se conserva.
10. NUEVA — Teaser fundador (foto + 2 líneas, enlace a quienes-somos.html).
11. Formulario de aplicación actual + sección calendario (global).
12. Footer (global).

### 2. servicios.html
Se mantiene; las cards de servicio enlazan a chatbot-ia.html, agente-voz.html y diseno-web.html. Recibe los elementos globales.

### 3. chatbot-ia.html (NUEVA)
- Hero: "De Mensaje a Reserva en Segundos".
- Timeline 4 pasos: Cliente Contacta (WhatsApp/Instagram/Messenger) → IA Responde → Reserva Confirmada → Directo a tu CRM.
- Simulador de chat animado (mockup de móvil) con pestañas por industria: Restaurante, Clínica, Inmobiliaria, E-commerce. Cada pestaña reproduce una conversación con typing-effect.
- Sección CRM "Cada Cliente Bajo Observación": mockup de bandeja de conversaciones con lista de clientes, chat central y panel de perfil.
- CTA final + calendario.

### 4. agente-voz.html (NUEVA)
- Hero: agente de voz IA.
- Selector de 6 temas (cards): Recepcionista, Agendador de Citas, Calificación de Leads, Encuestas, Atención al Cliente, Cobranza.
- Formulario que AGENDA UNA LLAMADA (nombre, teléfono, email) — NO promete que "te llama una IA"; el submit abre Calendly. Copy tipo "Agenda una demo en vivo con nuestro agente".
- "Escucha Demos Reales": reproductor de audio con 3 demos (Restaurante, Inmobiliaria, Clínica Estética) usando `<audio>` con archivos placeholder en `assets/audio/` (rutas listas para reemplazar).
- Features de voz + CTA + calendario.

### 5. diseno-web.html (NUEVA)
- Servicio de diseño web con IA integrada: hero, qué incluye (landing de conversión, chatbot embebido, agenda integrada, SEO), proceso de entrega, CTA + calendario.

### 6. casos-de-uso.html (NUEVA)
- "Ideas para tu negocio": grid por industria (clínicas, restaurantes, inmobiliarias, e-commerce, despachos, talleres...) con qué automatizar en cada una y qué sistema aplica. Enlaces a las páginas de servicio. CTA + calendario.

### 7. quienes-somos.html (NUEVA)
- Perfil del fundador: **Stiven González — Fundador**, "Experto en IA aplicada a negocios".
- Bio profesional (sin exagerar): +5 años de experiencia ayudando a negocios a vender más y atender mejor con IA.
- 6 badges de credenciales: Chatbots y agentes de voz IA, Programación y desarrollo, Diseño web, Marketing digital, Creación de aplicaciones, Negocios automatizados con resultados medibles.
- Foto: placeholder (`assets/img/fundador.jpg`) hasta que el usuario la entregue.
- Misión/visión + CTA + calendario.

## Elementos globales (todas las páginas)

- **Barra de anuncio** sobre el header: "🚀 Prueba una demo gratuita — Agenda tu llamada ahora" (enlace a Calendly).
- **Header**: misma píldora de cristal flotante; enlaces: Casos de Uso, Ecosistema (dropdown: Chatbot, Agente de Voz, Diseño Web), Quiénes Somos + botón "Reservar Plaza". Menú hamburguesa en móvil con panel deslizante.
- **Botón flotante WhatsApp**: burbuja fija inferior derecha → https://wa.me/34610859703 con mensaje precargado.
- **Sección calendario** al final de cada página: embed/enlace de Calendly existente (https://calendly.com/stivengonzalezads/planifica-el-futuro-digital-de-tu-negocio-con-visionnov).
- **Footer ampliado**: columnas Empresa / Servicios / Legal con enlaces a todas las páginas.

## SEO

- Title y meta description únicos por página, en español, orientados a keywords (agentes de IA, chatbot WhatsApp para negocios, agente de voz IA, automatización...).
- Open Graph + Twitter cards por página.
- JSON-LD schema.org: Organization en index, Service en páginas de servicio, Person en quienes-somos.
- Canonical, lang="es", jerarquía h1→h2 correcta, alt en imágenes.
- sitemap.xml y robots.txt.

## Datos del usuario

- WhatsApp: +34 610 85 97 03
- Nombre: Stiven González
- Email: ss.companyes@gmail.com
- Calendly: enlace existente en la web actual.
- Pendientes del usuario: foto del fundador, audios de demo.

## Fuera de alcance

- Backend de llamadas IA en vivo (formulario solo agenda).
- Copiar diseño visual, fotos o textos literales de Veltim.
- Sistema de login / "Iniciar sesión".
- Página de precios (descartada por el usuario: precios solo en llamada).
- Blog.
