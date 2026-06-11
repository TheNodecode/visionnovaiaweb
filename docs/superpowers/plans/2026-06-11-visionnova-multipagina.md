# Visión Nova 2.0 Multi-página — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ampliar la web de Visión Nova a 7 páginas con toda la estructura de secciones de veltim.com (calculadora ROI, simulador de chat, CRM mockup, demos de voz, fundador, casos de uso) manteniendo el estilo dark liquid-glass existente.

**Architecture:** HTML estático + Tailwind CDN sin build step. CSS/JS compartido extraído a `assets/css/main.css` y `assets/js/main.js`. El bloque `tailwind.config` inline se repite idéntico en cada página (requisito del CDN). Header, barra de anuncio, botón WhatsApp, sección calendario y footer son bloques HTML canónicos definidos una vez en index.html y copiados textualmente a cada página (cambiando solo el enlace activo).

**Tech Stack:** HTML5, Tailwind CSS (CDN), JavaScript vanilla, Google Fonts (Instrument Serif + Barlow), Material Symbols, Vercel.

**Spec:** `docs/superpowers/specs/2026-06-11-veltim-multipagina-design.md`

**Verificación general:** no hay framework de tests. Cada tarea se verifica abriendo la página con `python -m http.server 8088` (o doble clic) y comprobando: render correcto, sin errores en consola, enlaces funcionan. Commit al final de cada tarea.

---

### Task 1: Assets compartidos (`main.css` + `main.js`)

**Files:**
- Create: `assets/css/main.css` — mover ahí todos los estilos del `<style>` de index.html (body, .liquid-glass, .liquid-glass-strong, .text-gradient, .nebula-glow, .hero-video-container, .input-glass, .stagger-item) y añadir los nuevos: `.marquee` (carrusel logos), `.whatsapp-float`, `.announce-bar`, `.mobile-menu`, `.chat-bubble` (simulador), `.typing-dots`, `.slider-track` (calculadora).
- Create: `assets/js/main.js` — mover ahí el `<script>` de index.html (handleTilt, resetTilt, IntersectionObserver, nav scroll, video fade) y añadir: toggle menú hamburguesa, init marquee (duplicar contenido para loop infinito).

- [ ] **Step 1:** Crear `assets/css/main.css` con los estilos existentes + nuevos. Claves nuevas:

```css
/* Marquee logos */
.marquee-track { display:flex; gap:4rem; width:max-content; animation: marquee 30s linear infinite; }
@keyframes marquee { from { transform:translateX(0);} to { transform:translateX(-50%);} }
.marquee:hover .marquee-track { animation-play-state: paused; }

/* WhatsApp float */
.whatsapp-float { position:fixed; bottom:24px; right:24px; z-index:60; width:56px; height:56px;
  border-radius:9999px; background:#25D366; display:flex; align-items:center; justify-content:center;
  box-shadow:0 8px 30px rgba(37,211,102,.4); transition:transform .3s ease; }
.whatsapp-float:hover { transform:scale(1.1); }

/* Menú móvil */
.mobile-menu { position:fixed; inset:0; z-index:55; background:rgba(8,8,8,.92);
  backdrop-filter:blur(24px); display:flex; flex-direction:column; align-items:center;
  justify-content:center; gap:2rem; opacity:0; pointer-events:none; transition:opacity .4s ease; }
.mobile-menu.open { opacity:1; pointer-events:auto; }

/* Typing dots del simulador de chat */
.typing-dots span { width:6px; height:6px; border-radius:50%; background:rgba(255,255,255,.5);
  display:inline-block; animation:typing 1.2s infinite; }
.typing-dots span:nth-child(2){animation-delay:.2s} .typing-dots span:nth-child(3){animation-delay:.4s}
@keyframes typing { 0%,60%,100%{transform:translateY(0);opacity:.4} 30%{transform:translateY(-4px);opacity:1} }

/* Sliders calculadora */
input[type=range].roi-slider { -webkit-appearance:none; width:100%; height:4px; border-radius:9999px;
  background:rgba(255,255,255,.15); outline:none; }
input[type=range].roi-slider::-webkit-slider-thumb { -webkit-appearance:none; width:20px; height:20px;
  border-radius:50%; background:#fff; cursor:pointer; box-shadow:0 0 12px rgba(255,255,255,.5); }
```

- [ ] **Step 2:** Crear `assets/js/main.js` con el JS existente de index.html más:

```js
// Menú hamburguesa
function toggleMobileMenu() {
  document.getElementById('mobile-menu').classList.toggle('open');
}
// Marquee: duplicar contenido para loop continuo
document.querySelectorAll('.marquee-track').forEach(t => { t.innerHTML += t.innerHTML; });
```

(El listener de `apply-form` debe comprobar `if (document.getElementById('apply-form'))` porque no existe en todas las páginas. Igual con `.fading-video` y `#main-nav` — guard clauses en todo.)

- [ ] **Step 3:** Verificar que los archivos existen y el CSS no tiene errores de sintaxis (abrir index.html aún no los usa — se conecta en Task 2).
- [ ] **Step 4:** Commit: `git add assets; git commit -m "feat: extract shared CSS/JS to assets"`

---

### Task 2: index.html — globals (barra anuncio, header ampliado, WhatsApp, footer, calendario)

**Files:**
- Modify: `index.html`

Estos bloques son los CANÓNICOS que se copian al resto de páginas.

- [ ] **Step 1:** Reemplazar `<style>` y `<script>` inline por `<link rel="stylesheet" href="assets/css/main.css"/>` y `<script src="assets/js/main.js" defer></script>`. El bloque `tailwind.config` se queda inline.
- [ ] **Step 2:** Añadir barra de anuncio como primer elemento del body:

```html
<div class="announce-bar w-full bg-white/5 border-b border-white/10 backdrop-blur-md text-center py-2 px-4 relative z-[51]">
  <a href="https://calendly.com/stivengonzalezads/planifica-el-futuro-digital-de-tu-negocio-con-visionnov" target="_blank" rel="noopener"
     class="font-label-sm text-[11px] uppercase tracking-widest text-primary/80 hover:text-primary transition-colors">
    🚀 Prueba una demo gratuita — Agenda tu llamada ahora →
  </a>
</div>
```

Ajustar el header fijo: pasa de `top-6` a `top-12` para no tapar la barra (y el JS de scroll lo mantiene).

- [ ] **Step 3:** Header: mismos estilos píldora, nuevos enlaces desktop:
  Casos de Uso → `casos-de-uso.html` · Ecosistema → `servicios.html` · Chatbot IA → `chatbot-ia.html` · Agente de Voz → `agente-voz.html` · Quiénes Somos → `quienes-somos.html` + botón Reservar Plaza (igual). Añadir botón hamburguesa visible solo en móvil (`md:hidden`, icono `menu`, `onclick="toggleMobileMenu()"`) y el panel:

```html
<div class="mobile-menu" id="mobile-menu">
  <button class="absolute top-8 right-8 text-primary" onclick="toggleMobileMenu()">
    <span class="material-symbols-outlined text-4xl">close</span>
  </button>
  <a class="font-headline-sm text-3xl italic text-primary" href="index.html">Inicio</a>
  <a class="font-headline-sm text-3xl italic text-primary" href="casos-de-uso.html">Casos de Uso</a>
  <a class="font-headline-sm text-3xl italic text-primary" href="servicios.html">Ecosistema</a>
  <a class="font-headline-sm text-3xl italic text-primary" href="chatbot-ia.html">Chatbot IA</a>
  <a class="font-headline-sm text-3xl italic text-primary" href="agente-voz.html">Agente de Voz</a>
  <a class="font-headline-sm text-3xl italic text-primary" href="diseno-web.html">Diseño Web IA</a>
  <a class="font-headline-sm text-3xl italic text-primary" href="quienes-somos.html">Quiénes Somos</a>
</div>
```

- [ ] **Step 4:** Botón flotante WhatsApp antes de `</body>`:

```html
<a class="whatsapp-float" href="https://wa.me/34610859703?text=Hola%20Stiven%2C%20quiero%20informaci%C3%B3n%20sobre%20los%20agentes%20de%20IA"
   target="_blank" rel="noopener" aria-label="WhatsApp">
  <svg viewBox="0 0 32 32" width="28" height="28" fill="#fff"><path d="M16 3C9.4 3 4 8.4 4 15c0 2.6.8 5 2.3 7L4 29l7.2-2.2c1.9 1 4 1.6 6.3 1.6 6.6 0 12-5.4 12-12S22.6 3 16 3zm0 22c-2 0-3.9-.6-5.5-1.6l-.4-.2-4.2 1.3 1.3-4.1-.3-.4C5.6 18.4 5 16.8 5 15 5 9 9.9 4 16 4s11 5 11 11-4.9 10-11 10zm6-7.5c-.3-.2-1.9-1-2.2-1.1-.3-.1-.5-.2-.7.2s-.8 1.1-1 1.3c-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.4.3-.6.1-.2 0-.5 0-.7s-.7-1.8-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1.1-1.1 2.7s1.2 3.1 1.3 3.3c.2.2 2.3 3.5 5.5 4.9.8.3 1.4.5 1.9.7.8.2 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z"/></svg>
</a>
```

- [ ] **Step 5:** Footer ampliado: columna "Servicios" nueva (Chatbot IA, Agente de Voz, Diseño Web IA, Casos de Uso) y columna "Empresa" (Ecosistema, Quiénes Somos, Contacto). Mantener diseño actual.
- [ ] **Step 6:** Abrir en navegador: barra de anuncio visible, header con nuevos enlaces, hamburguesa funciona en viewport móvil, botón WhatsApp abre wa.me, sin errores de consola.
- [ ] **Step 7:** Commit: `git commit -am "feat: global nav, announce bar, whatsapp float, footer"`

---

### Task 3: index.html — nuevas secciones (problema, logos, features, ROI, teasers)

**Files:**
- Modify: `index.html` (insertar secciones entre las existentes según orden del spec)
- Modify: `assets/js/main.js` (lógica calculadora ROI)

- [ ] **Step 1: Sección Problema** (tras el hero, antes de "Nuestra Visión"). Layout 2 columnas (texto + tarjeta visual con badge "<20s tiempo de respuesta"). Copy:
  - Badge: "Más conversión, mismo presupuesto"
  - H2: "Convierte más leads en clientes **sin aumentar tu inversión** en publicidad"
  - Párrafo: "Si inviertes en anuncios y recibes leads cada día pero muchos no terminan comprando, el problema no es la cantidad de leads: es cómo los gestionas."
  - 3 bullets con check: respuesta en segundos por WhatsApp y llamada / seguimiento y cualificación automáticos / proceso comercial claro y medible.
  - CTA: "Quiero convertir más leads →" → `#contact`.
  Visual: card liquid-glass con métrica grande `<20s` y "Tiempo de respuesta".

- [ ] **Step 2: Carrusel de logos.** Sección con texto "Trabajamos con las mejores herramientas" y marquee. Los logos se renderizan como texto estilizado + icono Material (sin descargar SVGs de marcas para evitar problemas): WhatsApp, OpenAI, Make, n8n, HubSpot, Calendly, Shopify, Instagram, Google Calendar, Meta. Estructura:

```html
<section class="py-16 border-y border-white/5 overflow-hidden">
  <p class="text-center font-label-sm text-label-sm uppercase tracking-[0.4em] text-on-surface-variant/50 mb-10">Trabajamos con las mejores herramientas</p>
  <div class="marquee"><div class="marquee-track items-center">
    <span class="text-2xl font-semibold text-white/40 hover:text-white/80 transition-colors whitespace-nowrap">WhatsApp</span>
    <!-- ...resto de logos igual... -->
  </div></div>
</section>
```

- [ ] **Step 3: Grid 4 features** (2x2, cards liquid-glass con icono Material):
  - `schedule` Disponibilidad 24/7 — "Atiende llamadas y mensajes a cualquier hora. Nunca pierdas un cliente."
  - `smart_toy` Conversación Natural — "Respuestas fluidas e inteligentes que parecen humanas."
  - `event_available` Reservas Automáticas — "Agenda citas y mesas directamente durante la conversación."
  - `translate` Multi-idioma — "Atiende a clientes en diferentes idiomas sin problemas."

- [ ] **Step 4: Calculadora ROI + Prospección.** Sección 2 columnas:
  Izquierda — "Automatiza tu Prospección": card con cola de llamadas mockup (4 contactos con avatar-inicial, nombre, sector, "Hace X meses") y panel de llamada activa (estático, decorativo).
  Derecha — "Calcula tu Ahorro": 3 sliders + resultados:

```html
<div class="liquid-glass p-8 rounded-xl space-y-6">
  <div><label class="flex justify-between text-sm text-on-surface-variant mb-2">Llamadas mensuales <span id="roi-calls-val" class="text-primary">2400</span></label>
    <input type="range" class="roi-slider" id="roi-calls" min="100" max="10000" step="100" value="2400"/></div>
  <div><label class="flex justify-between text-sm text-on-surface-variant mb-2">Coste mensual empleado (€) <span id="roi-cost-val" class="text-primary">1350</span></label>
    <input type="range" class="roi-slider" id="roi-cost" min="500" max="5000" step="50" value="1350"/></div>
  <div><label class="flex justify-between text-sm text-on-surface-variant mb-2">Valor promedio venta (€) <span id="roi-sale-val" class="text-primary">150</span></label>
    <input type="range" class="roi-slider" id="roi-sale" min="10" max="2000" step="10" value="150"/></div>
  <div class="border-t border-white/10 pt-6 space-y-3">
    <div class="flex justify-between"><span class="text-on-surface-variant">Ahorro mensual</span><span class="text-primary text-xl font-semibold" id="roi-savings">—</span></div>
    <div class="flex justify-between"><span class="text-on-surface-variant">Ingresos adicionales</span><span class="text-primary text-xl font-semibold" id="roi-extra">—</span></div>
    <div class="liquid-glass-strong rounded-lg p-5 flex justify-between items-center">
      <div><p class="font-label-sm uppercase tracking-widest text-xs text-primary/70">ROI Total Mensual</p>
        <p class="text-xs text-on-surface-variant" id="roi-annual">—</p></div>
      <p class="font-headline-md text-4xl text-primary" id="roi-total">—</p>
    </div>
  </div>
</div>
```

JS en main.js (guard clause si no existe `#roi-calls`):

```js
function initROI() {
  const calls = document.getElementById('roi-calls');
  if (!calls) return;
  const cost = document.getElementById('roi-cost'), sale = document.getElementById('roi-sale');
  const fmt = n => n.toLocaleString('es-ES') + '€';
  function calc() {
    const c = +calls.value, e = +cost.value, v = +sale.value;
    document.getElementById('roi-calls-val').textContent = c.toLocaleString('es-ES');
    document.getElementById('roi-cost-val').textContent = e.toLocaleString('es-ES');
    document.getElementById('roi-sale-val').textContent = v.toLocaleString('es-ES');
    // Humano: 12% conversión, coste = empleados necesarios (1 por cada 800 llamadas/mes)
    // IA: 18% conversión, coste 0.75€/llamada incluido — ahorro = coste empleados - coste IA aprox
    const employees = Math.max(1, Math.ceil(c / 800));
    const humanCost = employees * e;
    const aiCost = c * 0.75;
    const savings = Math.max(0, Math.round(humanCost - aiCost));
    const extra = Math.round(c * (0.18 - 0.12) * v);
    const total = savings + extra;
    document.getElementById('roi-savings').textContent = fmt(savings);
    document.getElementById('roi-extra').textContent = fmt(extra);
    document.getElementById('roi-total').textContent = fmt(total);
    document.getElementById('roi-annual').textContent = fmt(total * 12) + ' anuales';
  }
  [calls, cost, sale].forEach(s => s.addEventListener('input', calc));
  calc();
}
initROI();
```

Debajo de los resultados, mini tabla Humanos vs IA (coste/llamada €1,69 vs €0,75 · conversión 12% vs 18% · disponibilidad 8h/día vs 24/7) y botón "Solicitar Demo Gratis" → `#contact`.

- [ ] **Step 5: Teaser chatbot** (sección corta): H2 "De Mensaje a Reserva en Segundos", párrafo, CTA "Ver cómo funciona →" → `chatbot-ia.html`.
- [ ] **Step 6: Teaser fundador** (antes del form de contacto): card horizontal con inicial "S" como avatar placeholder, "Stiven González — Fundador", 2 líneas de bio, enlace "Conóceme →" → `quienes-somos.html`.
- [ ] **Step 7:** Verificar en navegador: sliders actualizan números en vivo, marquee gira sin saltos, secciones con scroll-reveal. Sin errores consola.
- [ ] **Step 8:** Commit: `git commit -am "feat: index sections - problem, logos, features, ROI calculator, teasers"`

---

### Task 4: chatbot-ia.html (NUEVA)

**Files:**
- Create: `chatbot-ia.html` (head con tailwind.config copiado de index + main.css/main.js + globals de Task 2 con enlace activo "Chatbot IA")
- Modify: `assets/js/main.js` (simulador de chat)

- [ ] **Step 1:** Crear página con: announce bar + header + mobile menu + whatsapp + footer + sección calendario (bloque "O agenda directamente / Reservar Llamada" reutilizado del form de index como sección propia con H2 "¿Listo para transformar tu negocio?").
- [ ] **Step 2: Hero**: badge "Chatbot IA", H1 italic gradient "De Mensaje a Reserva en Segundos", sub "Tu IA trabaja 24/7 convirtiendo conversaciones en ventas reales".
- [ ] **Step 3: Timeline 4 pasos** (columna izquierda, números en círculos liquid-glass):
  1. Cliente Contacta — WhatsApp / Instagram / Messenger
  2. IA Responde — Respuesta inmediata
  3. Reserva Confirmada — Automático en segundos
  4. Directo a tu CRM — Todo registrado
- [ ] **Step 4: Simulador de chat** (columna derecha): mockup de móvil (div redondeado con notch) + pestañas Restaurante / Clínica / Inmobiliaria / E-commerce. JS con conversaciones por industria y typing effect:

```js
const chatScenarios = {
  restaurante: [
    {from:'user', text:'Hola, quiero reservar una mesa para 4 personas'},
    {from:'ai',   text:'¡Hola! 👋 Claro, con gusto te ayudo. ¿Para qué día y hora te gustaría la reserva?'},
    {from:'user', text:'Este sábado a las 9pm'},
    {from:'ai',   text:'Perfecto, tenemos disponibilidad el sábado a las 21:00. ¿A nombre de quién hago la reserva?'},
    {from:'user', text:'Carlos Rodríguez'},
    {from:'ai',   text:'✅ ¡Listo Carlos! Tu reserva está confirmada: 📅 Sábado · 21:00 · 4 personas'}
  ],
  clinica: [
    {from:'user', text:'Quiero una cita para limpieza dental'},
    {from:'ai',   text:'¡Hola! 😊 Encantada de ayudarte. ¿Prefieres por la mañana o por la tarde?'},
    {from:'user', text:'Por la tarde'},
    {from:'ai',   text:'Tengo hueco el jueves a las 16:30 o el viernes a las 18:00. ¿Cuál te va mejor?'},
    {from:'user', text:'El jueves'},
    {from:'ai',   text:'✅ Cita confirmada: jueves 16:30, limpieza dental. Te enviaré un recordatorio el día antes.'}
  ],
  inmobiliaria: [
    {from:'user', text:'Vi el piso de la calle Mayor, ¿sigue disponible?'},
    {from:'ai',   text:'¡Hola! Sí, sigue disponible 🏠 3 habitaciones, 95m², 240.000€. ¿Quieres visitarlo?'},
    {from:'user', text:'Sí, ¿cuándo puedo?'},
    {from:'ai',   text:'Tenemos visitas el miércoles a las 17:00 y el sábado a las 11:00. ¿Cuál prefieres?'},
    {from:'user', text:'Sábado a las 11'},
    {from:'ai',   text:'✅ Visita agendada: sábado 11:00, calle Mayor. Te he enviado la ubicación por WhatsApp.'}
  ],
  ecommerce: [
    {from:'user', text:'¿Dónde está mi pedido #4582?'},
    {from:'ai',   text:'¡Hola! Déjame comprobarlo… 📦 Tu pedido salió ayer del almacén y llega mañana antes de las 14:00.'},
    {from:'user', text:'¿Puedo cambiar la dirección de entrega?'},
    {from:'ai',   text:'Claro. Dime la nueva dirección y lo actualizo al momento.'},
    {from:'user', text:'Calle Luna 8, 2ºB'},
    {from:'ai',   text:'✅ Dirección actualizada. Recibirás tu pedido mañana en Calle Luna 8, 2ºB.'}
  ]
};
function initChatSim() {
  const box = document.getElementById('chat-messages');
  if (!box) return;
  let timeouts = [];
  function play(key) {
    timeouts.forEach(clearTimeout); timeouts = []; box.innerHTML = '';
    document.querySelectorAll('.chat-tab').forEach(b => b.classList.toggle('active-tab', b.dataset.chat === key));
    let delay = 400;
    chatScenarios[key].forEach(msg => {
      timeouts.push(setTimeout(() => {
        const div = document.createElement('div');
        div.className = msg.from === 'user'
          ? 'self-end bg-white text-black rounded-2xl rounded-br-sm px-4 py-2.5 max-w-[80%] text-sm'
          : 'self-start bg-white/10 border border-white/10 text-on-surface rounded-2xl rounded-bl-sm px-4 py-2.5 max-w-[80%] text-sm';
        div.textContent = msg.text;
        box.appendChild(div); box.scrollTop = box.scrollHeight;
      }, delay));
      delay += msg.from === 'ai' ? 1600 : 1100;
    });
  }
  document.querySelectorAll('.chat-tab').forEach(b => b.addEventListener('click', () => play(b.dataset.chat)));
  play('restaurante');
}
initChatSim();
```

(Las pestañas usan `data-chat="restaurante"` etc.; clase `active-tab` = `bg-primary text-on-primary`.)

- [ ] **Step 5: Sección CRM "Cada Cliente Bajo Observación"**: H2 + sub "CRM de conversaciones incluido: nunca pierdas el control de ninguna interacción". Mockup estático 3 columnas (lista de conversaciones con 4 contactos y estados Nuevo/Pendiente/Resuelto · chat central · panel de perfil con email, teléfono, nº pedidos, canal). Todo liquid-glass, datos ficticios españoles.
- [ ] **Step 6: SEO head**: title "Chatbot IA para WhatsApp e Instagram | Visión Nova", description, OG tags, JSON-LD `Service`.
- [ ] **Step 7:** Verificar: pestañas cambian conversación, animación typing, responsive. Commit: `git add chatbot-ia.html assets; git commit -m "feat: chatbot-ia page with chat simulator and CRM mockup"`

---

### Task 5: agente-voz.html (NUEVA)

**Files:**
- Create: `agente-voz.html`
- Create: `assets/audio/.gitkeep` (carpeta para demos futuros)
- Modify: `assets/js/main.js` (reproductor)

- [ ] **Step 1:** Crear página con globals (enlace activo "Agente de Voz").
- [ ] **Step 2: Hero**: badge "Agente de Voz IA", H1 "Una Recepcionista que Nunca Duerme", sub "Descubre cómo nuestros agentes de voz con IA transforman las conversaciones con clientes".
- [ ] **Step 3: Selector de 6 temas** (grid de cards clicables, solo visual/selección): Recepcionista (`support_agent`), Agendador de Citas (`event`), Calificación de Leads (`fact_check`), Encuestas (`checklist`), Atención al Cliente (`sentiment_satisfied`), Cobranza (`payments`). Card seleccionada → borde primario. Texto guía: "Selecciona el caso que mejor encaja con tu negocio".
- [ ] **Step 4: Formulario "Escucha a tu futura recepcionista en una demo en vivo"** — campos nombre, teléfono (+34), email. IMPORTANTE (decisión del usuario): NO prometer que llama una IA. Botón "AGENDAR MI DEMO EN VIVO"; el submit abre el Calendly en pestaña nueva (mismo patrón que apply-form de index, con id `voice-demo-form` y guard clause en main.js).
- [ ] **Step 5: "Escucha Demos Reales"**: card con 3 ítems (Demo Restaurante 2:45, Demo Inmobiliaria 3:12, Demo Clínica Estética 2:58 — badges "Llamada entrante · Exitosa") + reproductor:

```html
<audio id="demo-player" preload="none"></audio>
<!-- cada ítem: data-src="assets/audio/demo-restaurante.mp3" etc. -->
```

```js
function initAudioDemos() {
  const player = document.getElementById('demo-player');
  if (!player) return;
  document.querySelectorAll('.demo-item').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.demo-item').forEach(i => i.classList.remove('bg-white/5'));
      item.classList.add('bg-white/5');
      player.src = item.dataset.src;
      player.play().catch(() => {
        document.getElementById('demo-status').textContent = 'Audio disponible próximamente — agenda una demo en vivo para escucharlo hoy.';
      });
    });
  });
}
initAudioDemos();
```

(Sin archivos de audio aún, el catch muestra mensaje elegante en `#demo-status` en vez de romper.)

- [ ] **Step 6: Features de voz** (3 cards): Voz humana natural / Agenda directamente en tu calendario / Transferencia a humano cuando hace falta. + CTA + sección calendario.
- [ ] **Step 7: SEO head**: title "Agente de Voz IA: Recepcionista Virtual 24/7 | Visión Nova", description, OG, JSON-LD `Service`.
- [ ] **Step 8:** Verificar y commit: `git add agente-voz.html assets; git commit -m "feat: agente-voz page with topics, demo form and audio player"`

---

### Task 6: diseno-web.html (NUEVA)

**Files:**
- Create: `diseno-web.html`

- [ ] **Step 1:** Página con globals (sin enlace propio en header desktop; está en footer y mobile menu).
- [ ] **Step 2:** Secciones:
  - Hero: "Webs que Venden Solas", sub "Diseño web premium con IA integrada: chatbot, agenda y seguimiento incluidos desde el día uno".
  - Qué incluye (4 cards): Landing de alta conversión / Chatbot IA embebido / Agenda integrada (Calendly) / SEO técnico y velocidad.
  - Proceso (timeline 4 pasos): Estrategia y copy → Diseño a medida → IA integrada → Lanzamiento en días, no meses.
  - Comparativa "Web normal vs Web con IA" (tabla 2 columnas: formulario muerto vs conversación que agenda; visitas anónimas vs leads cualificados; respondes tú vs responde la IA 24/7).
  - CTA + sección calendario.
- [ ] **Step 3:** SEO head: title "Diseño Web con IA Integrada | Visión Nova", JSON-LD `Service`. Verificar y commit: `git add diseno-web.html; git commit -m "feat: diseno-web page"`

---

### Task 7: casos-de-uso.html (NUEVA)

**Files:**
- Create: `casos-de-uso.html`

- [ ] **Step 1:** Página con globals (enlace activo "Casos de Uso").
- [ ] **Step 2:** Hero: "Ideas para tu Negocio", sub "Descubre qué puede automatizar la IA en tu sector".
- [ ] **Step 3:** Grid de 6 industrias (cards liquid-glass grandes, cada una con icono, 3 automatizaciones concretas y enlace al servicio):
  - Clínicas y Estética (`medical_services`): recordatorios de cita, reactivación de pacientes, agenda 24/7 → agente-voz.html
  - Restaurantes (`restaurant`): reservas por WhatsApp, gestión de grupos, confirmaciones → chatbot-ia.html
  - Inmobiliarias (`home_work`): cualificación de compradores, visitas agendadas, seguimiento → chatbot-ia.html
  - E-commerce (`shopping_cart`): estado de pedidos, recuperación de carritos, postventa → chatbot-ia.html
  - Despachos y Asesorías (`gavel`): filtro de consultas, citas, recordatorios de documentación → agente-voz.html
  - Talleres y Servicios (`build`): citas de taller, presupuestos rápidos, avisos de recogida → agente-voz.html
- [ ] **Step 4:** Banda final: "¿No ves tu sector? La IA se adapta a cualquier negocio" + CTA WhatsApp + sección calendario.
- [ ] **Step 5:** SEO head: title "Casos de Uso de IA por Sector | Visión Nova". Verificar y commit: `git add casos-de-uso.html; git commit -m "feat: casos-de-uso page"`

---

### Task 8: quienes-somos.html (NUEVA)

**Files:**
- Create: `quienes-somos.html`
- Create: `assets/img/.gitkeep`

- [ ] **Step 1:** Página con globals (enlace activo "Quiénes Somos").
- [ ] **Step 2: Perfil del fundador** (layout 2 columnas como Veltim pero dark):
  - Foto: `<img src="assets/img/fundador.jpg" onerror="this.outerHTML='<div class=...>S</div>'"/>` — placeholder elegante (inicial S en card liquid-glass) hasta que exista el archivo.
  - Badge "Fundador & CEO" · H1 "Stiven González" · subtítulo "IA aplicada a negocios".
  - Bio (tono profesional, sin exagerar): "Especialista en inteligencia artificial con más de 5 años de experiencia ayudando a negocios a vender más, atender mejor y operar con menos esfuerzo. En Visión Nova construimos chatbots, agentes de voz y automatizaciones que trabajan por ti 24/7 — sin complicaciones y con resultados medibles."
  - 6 badges-card: Chatbots y agentes de voz IA · Desarrollo y programación · Diseño web de conversión · Marketing digital orientado a ventas · Creación de aplicaciones a medida · Negocios automatizados con resultados medibles.
- [ ] **Step 3: Misión**: bloque centrado "No somos solo una agencia; somos el motor de crecimiento de tu negocio." + valores en 3 cards (Resultados por contrato / Tecnología de élite / Trato directo con el fundador).
- [ ] **Step 4:** CTA + sección calendario. SEO head: title "Quiénes Somos — Stiven González | Visión Nova", JSON-LD `Person`+`Organization`.
- [ ] **Step 5:** Verificar (placeholder de foto se ve bien sin imagen) y commit: `git add quienes-somos.html assets; git commit -m "feat: quienes-somos page with founder profile"`

---

### Task 9: servicios.html — integrar globals y enlaces

**Files:**
- Modify: `servicios.html`

- [ ] **Step 1:** Reemplazar `<style>`/`<script>` inline por main.css/main.js (igual que Task 2 Step 1). Copiar announce bar, header nuevo, mobile menu, whatsapp float y footer ampliado desde index.html.
- [ ] **Step 2:** En las cards de servicios, añadir enlaces: chatbot/WhatsApp → `chatbot-ia.html`, voz → `agente-voz.html`, web → `diseno-web.html`.
- [ ] **Step 3:** Verificar y commit: `git commit -am "feat: servicios page globals and service links"`

---

### Task 10: SEO global — sitemap, robots, meta por página

**Files:**
- Create: `sitemap.xml`, `robots.txt`
- Modify: todas las páginas (head)

- [ ] **Step 1:** `robots.txt`:

```
User-agent: *
Allow: /
Sitemap: https://visionnova.vercel.app/sitemap.xml
```

(Si el usuario tiene dominio propio, se reemplaza la URL; usar el dominio de vercel.json si existe.)

- [ ] **Step 2:** `sitemap.xml` con las 7 páginas, `lastmod` 2026-06-11.
- [ ] **Step 3:** En cada página verificar/añadir: `<link rel="canonical">`, OG (`og:title`, `og:description`, `og:type`, `og:locale=es_ES`), `twitter:card=summary_large_image`. En index: JSON-LD `Organization` (name Visión Nova, founder Stiven González, email ss.companyes@gmail.com, sameAs WhatsApp).
- [ ] **Step 4:** Commit: `git add -A; git commit -m "feat: SEO - sitemap, robots, meta tags, JSON-LD"`

---

### Task 11: Verificación final integral

- [ ] **Step 1:** Servir con `python -m http.server 8088` y recorrer las 7 páginas: header/footer idénticos, todos los enlaces internos funcionan (sin 404), barra anuncio + WhatsApp en todas.
- [ ] **Step 2:** Probar interactivos: calculadora ROI (mover los 3 sliders), simulador de chat (4 pestañas), selector de temas de voz, reproductor (muestra mensaje elegante sin audio), hamburguesa móvil (viewport 375px), formularios abren Calendly.
- [ ] **Step 3:** Consola sin errores en las 7 páginas.
- [ ] **Step 4:** Commit final si hubo arreglos: `git commit -am "fix: final QA pass"`
