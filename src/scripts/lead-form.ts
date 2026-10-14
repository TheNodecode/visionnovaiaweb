import { buildPayload, isQualified, submitLead, validateContact, type LeadInput } from '../lib/lead';

type Step = 1 | 2 | 3 | 4 | 5 | 6 | 'software';
type Data = Partial<LeadInput>;
type Saved = { step: Step; data: Data };

const KEY = 'vn-lead';
const DURATION = 350;
const AUTO_ADVANCE = 250;
const CONTACT_FIELDS = ['nombre', 'email', 'telefono', 'empresa', 'web', 'mensaje'] as const;
const CALENDLY_SRC = 'https://assets.calendly.com/assets/external/widget.js';

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const lenis = () => (window as any).__lenis as { scrollTo: (t: HTMLElement | number, o?: object) => void } | undefined;

function scrollToEl(el: HTMLElement) {
  const l = lenis();
  if (l) l.scrollTo(el, { offset: -90 });
  else el.scrollIntoView({ behavior: reduceMotion() ? 'auto' : 'smooth', block: 'start' });
}

function read(): Saved | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return null;
    const s = JSON.parse(raw) as Saved;
    return s && typeof s === 'object' && s.data ? s : null;
  } catch { return null; }
}
function write(s: Saved | null) {
  try {
    if (s) sessionStorage.setItem(KEY, JSON.stringify(s));
    else sessionStorage.removeItem(KEY);
  } catch { /* almacenamiento no disponible: seguimos sin persistir */ }
}

let calendlyPromise: Promise<void> | null = null;
function loadCalendly(): Promise<void> {
  if ((window as any).Calendly) return Promise.resolve();
  if (!calendlyPromise) {
    calendlyPromise = new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = CALENDLY_SRC; s.async = true;
      s.onload = () => resolve();
      s.onerror = () => { calendlyPromise = null; reject(new Error('calendly')); };
      document.head.appendChild(s);
    });
  }
  return calendlyPromise;
}

function track() {
  const w = window as any;
  try { w.fbq?.('track', 'Lead'); } catch { /* sin píxel */ }
  try { w.gtag?.('event', 'generate_lead'); } catch { /* sin GA4 */ }
}

function initForm(root: HTMLElement) {
  const form = root.querySelector<HTMLFormElement>('[data-lf-form]')!;
  const label = root.querySelector<HTMLElement>('[data-lf-label]')!;
  const bar = root.querySelector<HTMLElement>('[data-lf-bar]')!;
  const back = root.querySelector<HTMLButtonElement>('[data-lf-back]')!;
  const submitBtn = root.querySelector<HTMLButtonElement>('[data-lf-submit]')!;
  const otroSlot = root.querySelector<HTMLElement>('[data-lf-otro-slot]')!;
  const otroTpl = root.querySelector<HTMLTemplateElement>('[data-lf-otro-tpl]')!;
  const stepEl = (s: Step) => root.querySelector<HTMLElement>(`.lf-step[data-step="${s}"]`)!;

  let step: Step = 1;
  let data: Data = { servicio: [] };
  let pending: { el: HTMLElement; timer: number; leaving: Step } | null = null;
  let advanceTimer = 0;
  let sending = false;
  let calendlyMounted = false;

  const persist = () => {
    if (typeof step === 'number' && step <= 5) write({ step, data });
  };

  // --- Campo "Otro" (solo existe en el DOM mientras el paso 2 lo necesita) ---
  function mountOtro(focus = false) {
    if (otroSlot.firstElementChild) return;
    otroSlot.appendChild(otroTpl.content.cloneNode(true));
    const input = otroSlot.querySelector<HTMLInputElement>('input[name="sector_otro"]')!;
    input.value = data.sector_otro ?? '';
    if (focus) input.focus({ preventScroll: true });
    window.dispatchEvent(new Event('motion:refresh'));
  }
  const unmountOtro = () => { otroSlot.replaceChildren(); };

  // --- Interfaz ---
  function updateChrome() {
    const n = typeof step === 'number' && step <= 5 ? step : null;
    label.textContent = n ? `Paso ${n} de 5` : step === 6 ? 'Último paso' : 'Listo';
    bar.style.transform = `scaleX(${n ? n / 5 : 1})`;
    back.hidden = !(typeof step === 'number' && step >= 2 && step <= 5);
  }

  function syncPressed() {
    root.querySelectorAll<HTMLElement>('.lf-opts').forEach((group) => {
      const field = group.dataset.field as keyof LeadInput;
      const val = data[field];
      group.querySelectorAll<HTMLButtonElement>('[data-opt]').forEach((b) => {
        const on = Array.isArray(val) ? val.includes(b.dataset.opt!) : val === b.dataset.opt;
        b.setAttribute('aria-pressed', String(on));
      });
    });
  }

  function finishPending() {
    if (!pending) return;
    clearTimeout(pending.timer);
    const { el, leaving } = pending;
    el.hidden = true;
    el.removeAttribute('data-anim');
    if (leaving === 2) unmountOtro();
    pending = null;
  }

  function show(s: Step) {
    root.querySelectorAll<HTMLElement>('.lf-step').forEach((el) => {
      const on = el.dataset.step === String(s);
      el.hidden = !on;
      el.removeAttribute('data-anim');
      el.removeAttribute('aria-hidden');
      el.inert = !on;
    });
    step = s;
    if (s === 2 && data.sector === 'Otro') mountOtro();
    updateChrome();
  }

  function go(next: Step, dir: 1 | -1 = 1) {
    if (next === step) return;
    clearTimeout(advanceTimer);
    finishPending();
    const from = stepEl(step);
    const to = stepEl(next);
    const leaving = step;
    const animate = !reduceMotion();

    from.setAttribute('aria-hidden', 'true');
    from.inert = true;
    to.hidden = false;
    to.inert = false;
    to.removeAttribute('aria-hidden');
    if (animate) {
      for (const el of [from, to]) { el.style.setProperty('--lf-dir', String(dir)); el.removeAttribute('data-anim'); }
      void to.offsetWidth; // reinicia la animación
      from.dataset.anim = 'out';
      to.dataset.anim = 'in';
      pending = { el: from, leaving, timer: window.setTimeout(() => { finishPending(); to.removeAttribute('data-anim'); window.dispatchEvent(new Event('motion:refresh')); }, DURATION) };
    } else {
      from.hidden = true;
      if (leaving === 2) unmountOtro();
    }

    step = next;
    if (next === 2 && data.sector === 'Otro') mountOtro();
    updateChrome();
    persist();
    if (next === 6) mountCalendly();
    if (next === 'software') {
      const first = (data.nombre ?? '').trim().split(/\s+/)[0] ?? '';
      root.querySelector('[data-lf-name]')!.textContent = first;
    }

    to.querySelector<HTMLElement>('[data-lf-title]')?.focus({ preventScroll: true });
    if (form.getBoundingClientRect().top < 0) scrollToEl(form);
    window.dispatchEvent(new Event('motion:refresh'));
  }

  // --- Calendly (paso 6) ---
  function mountCalendly() {
    if (calendlyMounted) return;
    const parent = root.querySelector<HTMLElement>('[data-lf-calendly]')!;
    const url = `${root.dataset.calendlyUrl}?hide_gdpr_banner=1&background_color=121212&text_color=ece8e1&primary_color=d9b266`;
    loadCalendly().then(() => {
      if (calendlyMounted) return;
      calendlyMounted = true;
      try {
        (window as any).Calendly.initInlineWidget({ url, parentElement: parent, prefill: { name: data.nombre?.trim() ?? '', email: data.email?.trim() ?? '' } });
      } catch { /* queda el enlace alternativo */ }
    }).catch(() => { /* bloqueado: queda el enlace para abrirlo en otra pestaña */ });
  }

  // --- Mensajes en línea ---
  function setMsg(field: string, text: string) {
    const msg = root.querySelector<HTMLElement>(`[data-msg-for="${field}"]`);
    if (msg) msg.textContent = text;
    const input = form.querySelector<HTMLInputElement>(`[name="${field}"]`);
    if (input) {
      if (text) input.setAttribute('aria-invalid', 'true');
      else input.removeAttribute('aria-invalid');
    }
  }
  const setHint = (n: number, text: string) => { const h = root.querySelector<HTMLElement>(`[data-lf-hint="${n}"]`); if (h) h.textContent = text; };

  function nextFromCurrent() {
    if (step === 1) {
      if (!data.servicio?.length) { setHint(1, 'Elige al menos una opción para seguir.'); return; }
      setHint(1, '');
      go(2, 1);
    } else if (step === 2 && data.sector === 'Otro') {
      if ((data.sector_otro ?? '').trim().length < 2) {
        setMsg('sector_otro', 'Cuéntanos en pocas palabras a qué te dedicas');
        otroSlot.querySelector<HTMLInputElement>('input')?.focus();
        return;
      }
      go(3, 1);
    }
  }

  // --- Eventos ---
  form.addEventListener('click', (e) => {
    const t = e.target as HTMLElement;
    const opt = t.closest<HTMLButtonElement>('[data-opt]');
    if (opt) {
      const group = opt.closest<HTMLElement>('.lf-opts')!;
      const field = group.dataset.field as keyof LeadInput;
      const value = opt.dataset.opt!;
      if (group.hasAttribute('data-multi')) {
        const list = new Set(data.servicio ?? []);
        if (list.has(value)) list.delete(value); else list.add(value);
        data.servicio = Array.from(list);
        if (list.size) setHint(1, '');
        syncPressed(); persist();
        return;
      }
      (data as Record<string, unknown>)[field] = value;
      syncPressed(); persist();
      const here = step;
      if (field === 'sector' && value === 'Otro') { mountOtro(true); return; }
      if (field === 'sector') unmountOtro();
      // La respuesta ya está dada: si recarga durante la espera, retoma en la siguiente pregunta.
      if (typeof here === 'number' && here < 5) write({ step: (here + 1) as Step, data });
      clearTimeout(advanceTimer);
      advanceTimer = window.setTimeout(() => { if (step === here && typeof here === 'number') go((here + 1) as Step, 1); }, AUTO_ADVANCE);
      return;
    }
    if (t.closest('[data-lf-next]')) { nextFromCurrent(); return; }
    const goto = t.closest<HTMLElement>('[data-lf-goto]');
    if (goto) { go(goto.dataset.lfGoto === '6' ? 6 : 'software', 1); }
  });

  back.addEventListener('click', () => {
    if (typeof step === 'number' && step >= 2 && step <= 5) go((step - 1) as Step, -1);
  });

  form.addEventListener('input', (e) => {
    const el = e.target as HTMLInputElement;
    const name = el.name;
    if (name === '_gotcha' || !name) return;
    if (name === 'privacidad') data.privacidad = el.checked;
    else (data as Record<string, unknown>)[name] = el.value;
    if (el.getAttribute('aria-invalid') === 'true') setMsg(name, '');
    persist();
  });
  form.addEventListener('change', (e) => {
    const el = e.target as HTMLInputElement;
    if (el.name === 'privacidad') { data.privacidad = el.checked; if (el.checked) setMsg('privacidad', ''); persist(); }
  });

  form.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' || e.isComposing) return;
    const t = e.target as HTMLElement;
    if (t.tagName === 'TEXTAREA' || t.tagName === 'BUTTON' || t.tagName === 'A') return;
    if (step === 1 || step === 2) { e.preventDefault(); nextFromCurrent(); }
  });

  // Móvil: con el teclado abierto, el campo con foco se centra en la vista.
  const coarse = window.matchMedia('(pointer: coarse)');
  form.addEventListener('focusin', (e) => {
    const t = e.target as HTMLElement;
    if (!coarse.matches || !t.matches('input:not([type=checkbox]), textarea')) return;
    window.setTimeout(() => { if (document.activeElement === t) t.scrollIntoView({ block: 'center' }); }, 300);
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (step !== 5 || sending) return;
    const fd = new FormData(form);
    for (const f of CONTACT_FIELDS) (data as Record<string, unknown>)[f] = String(fd.get(f) ?? '');
    data.privacidad = fd.get('privacidad') !== null;

    const contact = { nombre: data.nombre ?? '', email: data.email ?? '', telefono: data.telefono ?? '', empresa: data.empresa ?? '', privacidad: !!data.privacidad };
    const errs = validateContact(contact);
    for (const k of ['nombre', 'empresa', 'email', 'telefono', 'privacidad'] as const) setMsg(k, errs[k] ?? '');
    const firstBad = (['nombre', 'empresa', 'email', 'telefono', 'privacidad'] as const).find((k) => errs[k]);
    if (firstBad) { form.querySelector<HTMLInputElement>(`[name="${firstBad}"]`)?.focus(); return; }

    const lead: LeadInput = {
      servicio: data.servicio ?? [], sector: data.sector ?? '', sector_otro: data.sector_otro, ticket_medio: data.ticket_medio ?? '',
      publicidad_actual: data.publicidad_actual ?? '', ...contact, web: data.web, mensaje: data.mensaje,
    };
    const qualified = isQualified(lead);

    sending = true;
    submitBtn.disabled = true;
    submitBtn.setAttribute('aria-busy', 'true');
    const isBot = String(fd.get('_gotcha') ?? '').trim() !== '';
    if (!isBot) {
      try {
        await submitLead(buildPayload(lead, { pagina: location.pathname, search: location.search }));
      } catch { /* el envío nunca bloquea al visitante */ }
      track();
    }
    write(null);
    submitBtn.removeAttribute('aria-busy');
    submitBtn.disabled = false;
    sending = false;
    go(qualified ? 6 : 'software', 1);
  });

  // Móvil: mientras la tarjeta está en pantalla se oculta el botón flotante de WhatsApp
  // para que no tape el botón fijo "Siguiente" / "Ver huecos".
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) document.documentElement.dataset.formInView = '';
      else delete document.documentElement.dataset.formInView;
    }, { threshold: 0.15 }).observe(form);
  }

  // --- Restaurar progreso ---
  const saved = read();
  if (saved && [1, 2, 3, 4, 5].includes(saved.step as number)) {
    data = { servicio: [], ...saved.data };
    for (const f of CONTACT_FIELDS) {
      const el = form.querySelector<HTMLInputElement | HTMLTextAreaElement>(`[name="${f}"]`);
      if (el && typeof data[f] === 'string') el.value = data[f] as string;
    }
    const pv = form.querySelector<HTMLInputElement>('[name="privacidad"]');
    if (pv) pv.checked = !!data.privacidad;
    syncPressed();
    show(saved.step);
  } else {
    show(1);
  }
}

function initOpenForm() {
  document.addEventListener('click', (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const trigger = (e.target as HTMLElement).closest<HTMLElement>('[data-open-form]');
    if (!trigger) return;
    const target = document.getElementById('formulario');
    if (!target) return; // sin formulario en esta página: se navega a /contacto#formulario
    e.preventDefault();
    scrollToEl(target);
    const title = target.querySelector<HTMLElement>('.lf-step:not([hidden]) [data-lf-title]');
    window.setTimeout(() => title?.focus({ preventScroll: true }), reduceMotion() ? 0 : 700);
  });
}

let started = false;
export function initLeadForms() {
  if (started) return;
  started = true;
  document.querySelectorAll<HTMLElement>('[data-lead-form]').forEach(initForm);
  initOpenForm();
}
