import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, SplitText);
// la barra de direcciones del móvil cambia la altura al hacer scroll: no recalcular todo por eso
ScrollTrigger.config({ ignoreMobileResize: true });

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
document.documentElement.classList.add(reduce ? 'motion-off' : 'motion-on');

// Ritmo del movimiento: corto y ligero para que la página se sienta rápida.
const EASE = 'power3.out';
const REVEAL = { y: 18, duration: 0.6 };
const STAGGER = 0.04;

function initLenis() {
  if (reduce) return;
  // lerp 0.15: sigue a la rueda casi al instante (≈0,3 s hasta parar), sin la sensación flotante de 0.1.
  // autoRaf queda en false (por defecto): el único bucle es el ticker de GSAP.
  const lenis = new Lenis({ lerp: 0.15, wheelMultiplier: 1, smoothWheel: true, autoRaf: false });
  lenis.on('scroll', ScrollTrigger.update);
  // prioritize: Lenis mueve el scroll y ScrollTrigger lo lee ANTES de que GSAP escriba estilos en ese
  // fotograma; si no, cada lectura de scrollY fuerza un recálculo de estilos (layout thrashing).
  gsap.ticker.add((t) => lenis.raf(t * 1000), false, true);
  gsap.ticker.lagSmoothing(0);
  document.addEventListener('click', (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
    if (!a || a.getAttribute('href') === '#' || a.hasAttribute('data-open-form')) return;
    let el: HTMLElement | null = null;
    try { el = document.querySelector<HTMLElement>(a.getAttribute('href')!); } catch { return; }
    if (!el) return;
    e.preventDefault();
    lenis.scrollTo(el, { offset: -90 });
    if (!el.matches('a[href], button, input, select, textarea, [tabindex]')) el.setAttribute('tabindex', '-1');
    el.focus({ preventScroll: true });
  });
  (window as any).__lenis = lenis;
}

function reveals() {
  gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
    gsap.from(el, { ...REVEAL, opacity: 0, ease: EASE, delay: Number(el.dataset.revealDelay || 0) * 0.7,
      scrollTrigger: { trigger: el, start: 'top 92%', once: true } });
  });
  gsap.utils.toArray<HTMLElement>('[data-reveal-stagger]').forEach((el) => {
    gsap.from(el.children, { ...REVEAL, y: 16, opacity: 0, ease: EASE, stagger: STAGGER,
      scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
  });
  gsap.utils.toArray<HTMLElement>('[data-split]').forEach((el) => {
    // SplitText solo en titulares h1/h2; el resto (párrafos largos) entra con un revelado simple
    if (!/^H[12]$/.test(el.tagName)) {
      gsap.from(el, { ...REVEAL, opacity: 0, ease: EASE, scrollTrigger: { trigger: el, start: 'top 92%', once: true } });
      return;
    }
    const split = SplitText.create(el, { type: 'words', mask: 'words', aria: 'auto' });
    gsap.from(split.words, { yPercent: 110, duration: 0.7, ease: 'expo.out', stagger: { amount: Math.min(0.35, split.words.length * 0.035) },
      scrollTrigger: { trigger: el, start: 'top 92%', once: true } });
  });
}

function counters() {
  gsap.utils.toArray<HTMLElement>('[data-counter]').forEach((el) => {
    const end = Number(el.dataset.counter);
    if (!Number.isFinite(end)) return;
    const pre = el.dataset.counterPrefix ?? '', suf = el.dataset.counterSuffix ?? '';
    const obj = { v: 0 };
    gsap.to(obj, { v: end, duration: 1.2, ease: 'power2.out',
      onUpdate: () => (el.textContent = pre + Math.round(obj.v).toLocaleString('es-ES') + suf),
      scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
  });
}

function scrollLinked() {
  const mm = gsap.matchMedia();
  // parallax solo en tablet/escritorio: en móvil desplazaría elementos dentro de carruseles
  mm.add('(min-width: 768px)', () => {
    gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
      gsap.to(el, { y: Number(el.dataset.parallax) * 100, ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
  });
  // data-progress-fill="y" rellena en vertical (de arriba abajo); cualquier otro valor, en horizontal
  gsap.utils.toArray<HTMLElement>('[data-progress-fill]').forEach((el) => {
    const v = el.dataset.progressFill === 'y';
    gsap.fromTo(el, v ? { scaleY: 0 } : { scaleX: 0 }, { ...(v ? { scaleY: 1 } : { scaleX: 1 }), ease: 'none', transformOrigin: v ? 'top' : 'left',
      scrollTrigger: { trigger: el.closest('section') ?? el, start: 'top 60%', end: 'bottom 60%', scrub: true } });
  });
  // sin pin en móviles en horizontal: con poca altura el fijado tapa la pantalla entera
  mm.add('(min-width: 768px) and (min-height: 600px)', () => {
    gsap.utils.toArray<HTMLElement>('[data-scale-media]').forEach((sec) => {
      const target = sec.querySelector('[data-scale-target]');
      if (!target) return;
      const st = { trigger: sec, start: 'top top', end: '+=120%', scrub: true, pin: true, refreshPriority: 1 };
      // data-scale-media="zoom": el marco entero crece (para paneles con texto, que un recorte cortaría)
      if (sec.dataset.scaleMedia === 'zoom') {
        gsap.fromTo(target, { scale: 0.78, opacity: 0.55, transformOrigin: '50% 30%' }, { scale: 1, opacity: 1, ease: 'none', scrollTrigger: { ...st, end: '+=90%' } });
        return;
      }
      gsap.fromTo(target, { clipPath: 'inset(18% 22% round 28px)' }, { clipPath: 'inset(0% 0% round 0px)', ease: 'none', scrollTrigger: st });
    });
  });
  mm.add('(min-width: 1024px)', () => {
    gsap.utils.toArray<HTMLElement>('[data-pin-horizontal]').forEach((sec) => {
      const track = sec.querySelector<HTMLElement>('[data-track]');
      if (!track) return;
      const dist = () => Math.max(0, track.scrollWidth - window.innerWidth + 80);
      gsap.to(track, { x: () => -dist(), ease: 'none',
        scrollTrigger: { trigger: sec, start: 'top top', end: () => '+=' + dist(), scrub: true, pin: true, refreshPriority: 1, invalidateOnRefresh: true,
          // la capa compuesta solo mientras la pista se mueve
          onToggle: (self) => { track.style.willChange = self.isActive ? 'transform' : ''; } } });
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
  if (reduce) {
    // todo queda visible y estático; los contadores muestran su valor final
    document.querySelectorAll<HTMLElement>('[data-counter]').forEach((el) => {
      const end = Number(el.dataset.counter);
      if (Number.isFinite(end)) el.textContent = (el.dataset.counterPrefix ?? '') + end.toLocaleString('es-ES') + (el.dataset.counterSuffix ?? '');
    });
    return;
  }
  initLenis();
  reveals();
  counters();
  scrollLinked();
  refresh();
  if (document.readyState !== 'complete') window.addEventListener('load', refresh, { once: true });
}

// Los pins (refreshPriority: 1) se recalculan primero y en orden de documento,
// así el resto de triggers ya cuentan con el espacio que añaden.
function refresh() {
  ScrollTrigger.sort();
  ScrollTrigger.refresh();
}

window.addEventListener('motion:refresh', refresh);

document.fonts?.ready.then(init) ?? init();
