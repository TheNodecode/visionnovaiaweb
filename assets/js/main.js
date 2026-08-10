/* ============ Visión Nova — JS compartido ============ */

// 3D tilt en cards
function handleTilt(e, el) {
  const r = el.getBoundingClientRect();
  const x = e.clientX - r.left, y = e.clientY - r.top;
  const cx = r.width / 2, cy = r.height / 2;
  const rx = (y - cy) / 15, ry = (cx - x) / 15;
  el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.02,1.02,1.02)`;
}
function resetTilt(el) {
  el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
}

// Menú hamburguesa
function toggleMobileMenu() {
  const m = document.getElementById('mobile-menu');
  if (m) m.classList.toggle('open');
}

document.addEventListener('DOMContentLoaded', () => {

  // Scroll reveal
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.stagger-item').forEach((item, i) => {
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
            item.style.transition = 'all 0.8s cubic-bezier(0.16,1,0.3,1)';
          }, i * 100);
        });
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  document.querySelectorAll('section').forEach(s => obs.observe(s));

  // Nav glass al hacer scroll
  const nav = document.getElementById('main-nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        nav.classList.add('bg-black/60', 'py-2');
        nav.classList.remove('bg-black/20', 'py-3');
      } else {
        nav.classList.remove('bg-black/60', 'py-2');
        nav.classList.add('bg-black/20', 'py-3');
      }
    });
  }

  // Video del hero con fade en el loop
  const video = document.querySelector('.fading-video');
  if (video) {
    video.style.transition = 'opacity 1s ease';
    video.addEventListener('timeupdate', function () {
      if (this.currentTime > this.duration - 0.5) this.style.opacity = '0';
      else this.style.opacity = '0.6';
    });
  }

  // Animación dinámica por sección en cada scroll (entra y se re-anima al volver)
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => e.target.classList.toggle('in-view', e.isIntersecting));
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('section').forEach(s => {
    s.classList.add('reveal');
    revealObs.observe(s);
  });

  // Marquee: duplicar contenido para loop continuo
  document.querySelectorAll('.marquee-track').forEach(t => { t.innerHTML += t.innerHTML; });

  initROI();
  initChatSim();
  initAudioDemos();
  initTopicSelector();
});

/* ============ Calculadora ROI ============ */
function initROI() {
  const calls = document.getElementById('roi-calls');
  if (!calls) return;
  const cost = document.getElementById('roi-cost'), sale = document.getElementById('roi-sale');
  const fmt = n => n.toLocaleString('es-ES') + '€';
  function setEl(id, val) { const el = document.getElementById(id); if (el) el.textContent = val; }
  function calc() {
    const c = +calls.value, e = +cost.value, v = +sale.value;
    setEl('roi-calls-val', c.toLocaleString('es-ES'));
    setEl('roi-cost-val', e.toLocaleString('es-ES'));
    setEl('roi-sale-val', v.toLocaleString('es-ES'));
    const employees = Math.max(1, Math.ceil(c / 800));
    const humanCost = Math.round(employees * e);
    const aiCost = Math.round(c * 0.75);
    const extra = Math.round(c * 0.06 * v);
    const net = Math.max(0, humanCost + extra - aiCost);
    const raw = aiCost > 0 ? (net / aiCost) : 0;
    const multiplier = raw > 0 ? raw.toFixed(1) + 'x' : '—';
    setEl('roi-human-cost', '+' + fmt(humanCost));
    setEl('roi-extra', '+' + fmt(extra));
    setEl('roi-ai-cost', fmt(aiCost));
    setEl('roi-total', fmt(net));
    setEl('roi-annual', fmt(net * 12) + ' al año');
    setEl('roi-multiplier', multiplier);
    // Barra visual: qué porcentaje del valor total (ahorro+extra) termina siendo ganancia neta
    const total = humanCost + extra;
    const pct = total > 0 ? Math.min(95, Math.max(4, (net / total) * 100)) : 4;
    const bar = document.getElementById('roi-bar');
    if (bar) bar.style.width = pct + '%';
  }
  [calls, cost, sale].forEach(s => s.addEventListener('input', calc));
  calc();
}

/* ============ Simulador de chat por industria ============ */
const chatScenarios = {
  restaurante: [
    { from: 'user', text: '¡Hola! ¿Tenéis mesa para 4 el sábado por la noche?' },
    { from: 'ai',   text: '¡Hola! 👋 Sí, nos queda disponibilidad. ¿Os va mejor a las 20:30 o a las 22:00?' },
    { from: 'user', text: 'A las 22:00 mejor' },
    { from: 'ai',   text: 'Perfecto. ¿A nombre de quién pongo la reserva?' },
    { from: 'user', text: 'Marcos Peña' },
    { from: 'ai',   text: '✅ ¡Hecho, Marcos! Mesa para 4 · sábado · 22:00. Te llega la confirmación por WhatsApp 📲' }
  ],
  clinica: [
    { from: 'user', text: 'Quiero una cita para limpieza dental' },
    { from: 'ai',   text: '¡Hola! 😊 Encantada de ayudarte. ¿Prefieres por la mañana o por la tarde?' },
    { from: 'user', text: 'Por la tarde' },
    { from: 'ai',   text: 'Tengo hueco el jueves a las 16:30 o el viernes a las 18:00. ¿Cuál te va mejor?' },
    { from: 'user', text: 'El jueves' },
    { from: 'ai',   text: '✅ Cita confirmada: jueves 16:30, limpieza dental. Te enviaré un recordatorio el día antes.' }
  ],
  inmobiliaria: [
    { from: 'user', text: 'Vi el piso de la calle Mayor, ¿sigue disponible?' },
    { from: 'ai',   text: '¡Hola! Sí, sigue disponible 🏠 3 habitaciones, 95m², 240.000€. ¿Quieres visitarlo?' },
    { from: 'user', text: 'Sí, ¿cuándo puedo?' },
    { from: 'ai',   text: 'Tenemos visitas el miércoles a las 17:00 y el sábado a las 11:00. ¿Cuál prefieres?' },
    { from: 'user', text: 'Sábado a las 11' },
    { from: 'ai',   text: '✅ Visita agendada: sábado 11:00, calle Mayor. Te he enviado la ubicación por WhatsApp.' }
  ],
  ecommerce: [
    { from: 'user', text: '¿Dónde está mi pedido #4582?' },
    { from: 'ai',   text: '¡Hola! Déjame comprobarlo… 📦 Tu pedido salió ayer del almacén y llega mañana antes de las 14:00.' },
    { from: 'user', text: '¿Puedo cambiar la dirección de entrega?' },
    { from: 'ai',   text: 'Claro. Dime la nueva dirección y lo actualizo al momento.' },
    { from: 'user', text: 'Calle Luna 8, 2ºB' },
    { from: 'ai',   text: '✅ Dirección actualizada. Recibirás tu pedido mañana en Calle Luna 8, 2ºB.' }
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
        div.className = 'chat-msg ' + (msg.from === 'user'
          ? 'self-end bg-white text-black rounded-2xl rounded-br-sm px-4 py-2.5 max-w-[80%] text-sm'
          : 'self-start bg-white/10 border border-white/10 text-on-surface rounded-2xl rounded-bl-sm px-4 py-2.5 max-w-[80%] text-sm');
        div.textContent = msg.text;
        box.appendChild(div);
        box.scrollTop = box.scrollHeight;
      }, delay));
      delay += msg.from === 'ai' ? 1600 : 1100;
    });
  }
  document.querySelectorAll('.chat-tab').forEach(b => b.addEventListener('click', () => play(b.dataset.chat)));
  play('restaurante');
}

/* ============ Reproductor de demos de voz ============ */
function initAudioDemos() {
  const player = document.getElementById('demo-player');
  if (!player) return;
  document.querySelectorAll('.demo-item').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.demo-item').forEach(i => i.classList.remove('bg-white/5'));
      item.classList.add('bg-white/5');
      const status = document.getElementById('demo-status');
      player.src = item.dataset.src;
      player.play().then(() => {
        if (status) status.textContent = 'Reproduciendo: ' + item.dataset.title;
      }).catch(() => {
        if (status) status.textContent = 'Audio disponible próximamente — agenda una demo en vivo para escucharlo hoy.';
      });
    });
  });
}

/* ============ Modal de Booking (2 pasos) ============ */
function openBookingModal() {
  const modal = document.getElementById('booking-modal');
  if (!modal) return;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  resetBookingModal();
}
function closeBookingModal() {
  const modal = document.getElementById('booking-modal');
  if (!modal) return;
  modal.classList.remove('open');
  document.body.style.overflow = '';
}
function resetBookingModal() {
  const step1 = document.getElementById('booking-step-1');
  const step2 = document.getElementById('booking-step-2');
  const bar = document.getElementById('booking-progress-bar');
  const count = document.getElementById('booking-step-count');
  const label = document.getElementById('booking-step-label');
  const hint = document.getElementById('booking-step-hint');
  if (!step1 || !step2) return;
  step1.classList.remove('hidden');
  step2.classList.add('hidden');
  if (bar) bar.style.width = '50%';
  if (count) count.textContent = 'Paso 1 de 2';
  if (label) label.textContent = 'Elige tu día';
  if (hint) hint.textContent = 'Elige un hueco y te lo dejamos reservado';
}
function goToBookingStep2() {
  const step1 = document.getElementById('booking-step-1');
  const step2 = document.getElementById('booking-step-2');
  const bar = document.getElementById('booking-progress-bar');
  const count = document.getElementById('booking-step-count');
  const label = document.getElementById('booking-step-label');
  const hint = document.getElementById('booking-step-hint');
  if (!step1 || !step2) return;
  step1.classList.add('hidden');
  step2.classList.remove('hidden');
  if (bar) bar.style.width = '100%';
  if (count) count.textContent = 'Paso 2 de 2';
  if (label) label.textContent = 'Espera, falta un paso';
  if (hint) hint.textContent = 'Casi lo logras — confirma abajo para terminar';
  const modal = document.getElementById('booking-modal');
  if (modal) modal.scrollTop = 0;
}
// Avanza automáticamente al paso 2 cuando Calendly confirma la reserva
window.addEventListener('message', (e) => {
  if (e.data && e.data.event && String(e.data.event).indexOf('calendly') === 0 && e.data.event === 'calendly.event_scheduled') {
    goToBookingStep2();
  }
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeBookingModal();
});

/* ============ Selector de temas (agente de voz) ============ */
function initTopicSelector() {
  const topics = document.querySelectorAll('.topic-card');
  if (!topics.length) return;
  topics.forEach(card => {
    card.addEventListener('click', () => {
      topics.forEach(c => c.classList.remove('!border-white/60', 'bg-white/5'));
      card.classList.add('!border-white/60', 'bg-white/5');
    });
  });
}
