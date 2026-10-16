import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';
const walk = (d: string): string[] => readdirSync(d).flatMap((f) => {
  const p = join(d, f);
  return statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') ? [p] : [];
});
const pages = existsSync(DIST) ? walk(DIST).filter((p) => !p.includes('404')) : [];
const get = (html: string, re: RegExp) => html.match(re)?.[1] ?? '';

describe.skipIf(!pages.length)('auditoría SEO de dist/', () => {
  const data = pages.map((p) => {
    const html = readFileSync(p, 'utf8');
    return {
      p, html,
      title: get(html, /<title>([^<]*)<\/title>/),
      desc: get(html, /<meta name="description" content="([^"]*)"/),
      canonical: get(html, /<link rel="canonical" href="([^"]*)"/),
      h1s: (html.match(/<h1[\s>]/g) ?? []).length,
    };
  });

  it('cada página tiene un title único de ≤ 65 caracteres', () => {
    const titles = data.map((d) => d.title);
    for (const d of data) expect(d.title.length, d.p).toBeGreaterThan(10), expect(d.title.length, d.p).toBeLessThanOrEqual(65);
    expect(new Set(titles).size).toBe(titles.length);
  });
  it('cada página tiene una meta description única de 70–165 caracteres', () => {
    for (const d of data) expect(d.desc.length, d.p).toBeGreaterThanOrEqual(70), expect(d.desc.length, d.p).toBeLessThanOrEqual(165);
    expect(new Set(data.map((d) => d.desc)).size).toBe(data.length);
  });
  it('canonical absoluta en www, sin .html', () => {
    for (const d of data) expect(d.canonical, d.p).toMatch(/^https:\/\/www\.visionnovaia\.com(\/[a-z0-9\-\/]*)?$/);
  });
  it('exactamente un h1 por página', () => { for (const d of data) expect(d.h1s, d.p).toBe(1); });
  it('lang="es" y og:image', () => {
    for (const d of data) { expect(d.html, d.p).toContain('<html lang="es"'); expect(d.html, d.p).toContain('property="og:image"'); }
  });
  it('ningún precio de NovaScale y ninguna afirmación de partner de Meta', () => {
    for (const d of data) {
      const text = d.html.replace(/<script[\s\S]*?<\/script>/g, '');
      expect(text, d.p).not.toMatch(/1\.490|2\.500|950\s?€/);
      expect(text, d.p).not.toMatch(/Meta (Tech )?(Provider|Partner)|socios? (tecnológicos? )?de Meta/i);
      expect(text, d.p).not.toMatch(/\bbonos?\b/i);
    }
  });
  it('todas las imágenes tienen alt', () => {
    for (const d of data) expect(d.html.match(/<img(?![^>]*\balt=)[^>]*>/g) ?? [], d.p).toEqual([]);
  });
});
