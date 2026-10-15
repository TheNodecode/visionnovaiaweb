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
  for (const s of ['/agente-voz', '/chatbot-ia', '/servicios', '/casos-de-uso', '/quienes-somos', '/blog-:slug']) expect(src).toContain(s);
});
