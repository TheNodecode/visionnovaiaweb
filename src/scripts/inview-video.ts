// Vídeos marcados con [data-inview-video]: se reproducen solo mientras están en pantalla.
// Con reduced-motion no se reproducen solos (se queda el póster).
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function init() {
  const videos = document.querySelectorAll<HTMLVideoElement>('video[data-inview-video]');
  if (!videos.length || reduce || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      const v = e.target as HTMLVideoElement;
      if (e.isIntersecting) v.play().catch(() => {});
      else v.pause();
    }
  }, { threshold: 0.35 });
  videos.forEach((v) => { v.muted = true; io.observe(v); });
}

init();
