import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';

const hasDist = existsSync('dist/index.html');
const html = (p: string) => readFileSync(`dist/${p}`, 'utf8');

describe.skipIf(!hasDist)('versión Markdown para agentes', () => {
  it('genera dist/md para la home y una página interna', () => {
    expect(existsSync('dist/md/index.md')).toBe(true);
    expect(existsSync('dist/md/agencia-marketing-tarragona.md')).toBe(true);
    const md = readFileSync('dist/md/index.md', 'utf8');
    expect(md).toMatch(/^---\ntitle: /);
    expect(md).toContain('url: https://www.visionnovaia.com/');
    expect(md).not.toMatch(/<script|<svg/);
  });
  it('genera llms-full.txt con las páginas principales', () => {
    const t = readFileSync('dist/llms-full.txt', 'utf8');
    expect(t).toContain('Agencia de marketing en El Vendrell');
    expect(t.length).toBeGreaterThan(20000);
  });
  it('cada página anuncia su versión Markdown', () => {
    expect(html('index.html')).toContain('rel="alternate" type="text/markdown" href="/md/index.md"');
    expect(html('agencia-marketing-tarragona.html')).toContain('href="/md/agencia-marketing-tarragona.md"');
  });
  it('vercel.json reescribe por cabecera Accept y añade Vary: Accept', () => {
    const v = JSON.parse(readFileSync('vercel.json', 'utf8'));
    const rw = v.rewrites.filter((r: any) => r.has?.some((h: any) => h.key === 'accept' && /text\/markdown/.test(h.value)));
    expect(rw.length).toBeGreaterThanOrEqual(2);
    expect(rw[0].destination).toBe('/md/index.md');
    const vary = v.headers.find((h: any) => h.source === '/(.*)');
    expect(vary.headers).toContainEqual({ key: 'Vary', value: 'Accept' });
    const md = v.headers.find((h: any) => h.source === '/md/(.*)');
    expect(md.headers.some((h: any) => h.key === 'Content-Type' && /text\/markdown/.test(h.value))).toBe(true);
  });
});

describe.skipIf(!hasDist)('captación y rendimiento', () => {
  it('el teléfono es un enlace tel: en el pie de todas las páginas', () => {
    for (const p of ['index.html', 'contacto.html', 'agencia-marketing-barcelona.html']) expect(html(p), p).toContain('href="tel:+34610859703"');
  });
  it('la imagen principal de la home se precarga con prioridad alta y en WebP', () => {
    const h = html('index.html');
    expect(h).toMatch(/<link rel="preload" as="image"[^>]*hero-poster-1280\.webp[^>]*fetchpriority="high"/);
    expect(h).toMatch(/<img[^>]*data-hero-poster[^>]*fetchpriority="high"/);
  });
  it('el schema de la organización cubre Barcelona, Tarragona y El Vendrell', () => {
    const h = html('index.html');
    for (const c of ['Barcelona', 'Tarragona', 'El Vendrell']) expect(h).toContain(`"name":"${c}"`);
  });
  it('la clave de IndexNow está publicada y coincide con el script', () => {
    const key = /const KEY = '([a-f0-9]{32})'/.exec(readFileSync('scripts/indexnow.mjs', 'utf8'))?.[1];
    expect(key).toBeTruthy();
    expect(readFileSync(`public/${key}.txt`, 'utf8')).toBe(key);
  });
});
