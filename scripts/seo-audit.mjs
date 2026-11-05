// Auditoría on-page de dist/: título, descripción, H1, canónica, palabras, enlaces entrantes, duplicados y huérfanas.
// Uso: npm run build && node scripts/seo-audit.mjs docs/seo/auditoria.md
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { JSDOM } from 'jsdom';
const DIST = 'dist';
const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? (f==='md'||f==='_astro'?[]:walk(p)) : p.endsWith('.html') ? [p] : []; });
const pages = walk(DIST).map((f) => {
  const rel = relative(DIST, f).split(sep).join('/');
  const url = rel === 'index.html' ? '/' : '/' + rel.replace(/\.html$/, '');
  const d = new JSDOM(readFileSync(f, 'utf8')).window.document;
  const main = d.querySelector('main');
  const text = (main?.textContent ?? '').replace(/\s+/g, ' ').trim();
  const links = [...d.querySelectorAll('main a[href^="/"], header a[href^="/"], footer a[href^="/"]')].map((a) => a.getAttribute('href').split('#')[0].split('?')[0].replace(/\/$/, '') || '/');
  const mainLinks = [...d.querySelectorAll('main a[href^="/"]')].map((a) => a.getAttribute('href').split('#')[0].split('?')[0].replace(/\/$/, '') || '/');
  return { url, title: d.title, desc: d.querySelector('meta[name=description]')?.content ?? '', h1: [...d.querySelectorAll('h1')].map((h) => h.textContent.trim()).join(' | '), canon: d.querySelector('link[rel=canonical]')?.href ?? '(sin canónica)', robots: d.querySelector('meta[name=robots]')?.content ?? '', words: text.split(' ').length, mainLinks: new Set(mainLinks), imgNoAlt: [...d.querySelectorAll('img:not([alt])')].length };
});
const inbound = Object.fromEntries(pages.map((p) => [p.url, 0]));
for (const p of pages) for (const l of p.mainLinks) if (l !== p.url && l in inbound) inbound[l]++;
let out = [`# Auditoría de visionnovaia.com (05/11/2026)\n`, `${pages.length} páginas indexables compiladas.\n`, `| URL | Título (largo) | Descripción (largo) | H1 | Palabras | Enlaces entrantes (contenido) | Canónica OK |`, `|---|---|---|---|---|---|---|`];
for (const p of pages.sort((a, b) => a.url.localeCompare(b.url))) {
  const canonOk = p.canon === 'https://www.visionnovaia.com' + (p.url === '/' ? '/' : p.url) ? 'sí' : p.canon;
  out.push(`| ${p.url} | ${p.title} (${p.title.length}) | (${p.desc.length}) | ${p.h1.slice(0, 70)} | ${p.words} | ${inbound[p.url]} | ${canonOk} |`);
}
const dup = (k) => { const m = new Map(); pages.forEach((p) => m.set(p[k], [...(m.get(p[k]) ?? []), p.url])); return [...m].filter(([, v]) => v.length > 1); };
out.push('\n## Duplicados', 'Títulos: ' + (JSON.stringify(dup('title')) || '—'), 'Descripciones: ' + (JSON.stringify(dup('desc')) || '—'), 'H1: ' + (JSON.stringify(dup('h1')) || '—'));
out.push('\n## Huérfanas (0 enlaces entrantes desde el contenido de otras páginas)', pages.filter((p) => inbound[p.url] === 0 && p.url !== '/').map((p) => p.url).join(', ') || '—');
out.push('\n## Títulos > 60 caracteres', pages.filter((p) => p.title.length > 60).map((p) => `${p.url} (${p.title.length})`).join(', ') || '—');
out.push('\n## Descripciones > 155 caracteres', pages.filter((p) => p.desc.length > 155).map((p) => `${p.url} (${p.desc.length})`).join(', ') || '—');
out.push('\n## Imágenes sin alt', pages.filter((p) => p.imgNoAlt).map((p) => `${p.url} (${p.imgNoAlt})`).join(', ') || '—');
writeFileSync(process.argv[2], out.join('\n'));
console.log(out.slice(-12).join('\n'));
