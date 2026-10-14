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
    let el: Element | null = null;
    try { el = document.querySelector(a.getAttribute('href')!); } catch { return; }
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
    if (!Number.isFinite(end)) return;
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
  window.addEventListener('motion:refresh', () => ScrollTrigger.refresh());
  window.addEventListener('load', () => ScrollTrigger.refresh());
}

document.fonts?.ready.then(init) ?? init();
