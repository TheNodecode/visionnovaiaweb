import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';

const PAGES = ['/', '/creacion-de-contenido', '/gestion-redes-sociales', '/publicidad-meta-ads', '/sistema-ia', '/whatsapp-business-api', '/diseno-web',
  '/sectores/clinicas-dentales', '/sectores/medicina-estetica', '/sectores/inmobiliarias', '/sectores/reformas',
  '/agencia-marketing-madrid', '/agencia-marketing-barcelona', '/agencia-marketing-valencia', '/agencia-marketing-malaga',
  '/nosotros', '/trabajos', '/contacto', '/software-nova', '/blog',
  '/blog/agente-voz-ia-como-funciona', '/blog/que-es-geo-optimizacion-ia',
  '/politica-privacidad', '/politica-cookies', '/terminos-condiciones'];
const WIDTHS = [375, 768, 1024, 1440];

for (const path of PAGES) for (const w of WIDTHS) {
  test(`${path} @${w}px sin scroll horizontal`, async ({ page }) => {
    await page.setViewportSize({ width: w, height: 900 });
    await page.goto(path);
    await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 30)); } });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
}

test('con reduced motion todo el texto es visible', async ({ browser }) => {
  const ctx = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  const hidden = await page.locator('h2').evaluateAll((els) => els.filter((e) => parseFloat(getComputedStyle(e).opacity) < 0.5).length);
  expect(hidden).toBe(0);
  await ctx.close();
});

test('las redirecciones antiguas están declaradas', async () => {
  const v = JSON.parse(readFileSync('vercel.json', 'utf8'));
  const src = v.redirects.map((r: { source: string }) => r.source);
  for (const s of ['/agente-voz', '/chatbot-ia', '/servicios', '/sectores', '/casos-de-uso', '/quienes-somos', '/blog-:slug']) expect(src).toContain(s);
});

test('hero: lo esencial queda sobre el pliegue', async ({ browser }) => {
  for (const [w, h] of [[1440, 900], [390, 844]]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h } });
    const page = await ctx.newPage();
    await page.goto('/');
    await page.waitForTimeout(900); // la entrada del hero dura 0,6 s
    const hero = page.locator('section.hero');
    const bottomOf = (sel: string) => hero.locator(sel).first().evaluate((e) => e.getBoundingClientRect().bottom);
    const topOf = (sel: string) => hero.locator(sel).first().evaluate((e) => e.getBoundingClientRect().top);
    expect(await bottomOf('h1')).toBeLessThanOrEqual(h);
    expect(await bottomOf('h1 + p')).toBeLessThanOrEqual(h);
    expect(await bottomOf('[data-open-form]')).toBeLessThanOrEqual(h);
    if (w >= 1024) {
      expect(await bottomOf('a[href="#sistema"]')).toBeLessThanOrEqual(h);
      expect(await topOf('.hp-phone')).toBeLessThan(h - 120);
    }
    await ctx.close();
  }
});

test('las secciones claras de la home cumplen contraste AA', async ({ page }) => {
  await page.goto('/');
  expect(await page.locator('.section-light').count()).toBeGreaterThanOrEqual(3);
  const fails = await page.evaluate(() => {
    const c = document.createElement('canvas').getContext('2d', { willReadFrequently: true })!;
    const rgba = (col: string) => { c.clearRect(0, 0, 1, 1); c.fillStyle = col; c.fillRect(0, 0, 1, 1); return Array.from(c.getImageData(0, 0, 1, 1).data); };
    const lum = ([r, g, b]: number[]) => [r, g, b].map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; })
      .reduce((a, v, i) => a + v * [0.2126, 0.7152, 0.0722][i], 0);
    const out: string[] = [];
    document.querySelectorAll<HTMLElement>('.section-light').forEach((sec) => {
      const bg = rgba(getComputedStyle(sec).backgroundColor);
      sec.querySelectorAll<HTMLElement>('*').forEach((el) => {
        if (el.closest('.tone-dark, [aria-hidden="true"], .text-gold, .bg-gold')) return;
        const own = Array.from(el.childNodes).some((n) => n.nodeType === 3 && n.textContent!.trim());
        if (!own || !el.offsetParent) return;
        const s = getComputedStyle(el);
        const [r, g, b, a] = rgba(s.color);
        const fg = [r, g, b].map((v, i) => v * (a / 255) + bg[i] * (1 - a / 255));
        const [l1, l2] = [lum(fg), lum(bg)].sort((x, y) => y - x);
        const ratio = (l1 + 0.05) / (l2 + 0.05);
        const large = parseFloat(s.fontSize) >= 24 || (parseFloat(s.fontSize) >= 18.66 && +s.fontWeight >= 700);
        if (ratio < (large ? 3 : 4.5)) out.push(`${el.textContent!.trim().slice(0, 40)} → ${ratio.toFixed(2)}`);
      });
    });
    return out;
  });
  expect(fails).toEqual([]);
});
