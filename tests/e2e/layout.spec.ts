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
  expect(await lightContrastFails(page)).toEqual([]);
});

test('home: la oferta está completa y cada CTA lleva al formulario', async ({ browser }) => {
  for (const [w, h] of [[1440, 900], [390, 844]]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, reducedMotion: 'reduce' });
    const page = await ctx.newPage();
    await page.goto('/');
    // orden: prueba real justo tras el hero; al reservar justo antes del formulario
    const ids = await page.locator('main > section, body > section, section[id], section[aria-labelledby]').evaluateAll((els) => els.map((e) => e.id).filter(Boolean));
    expect(ids.indexOf('trabajo-real')).toBeLessThan(ids.indexOf('oferta'));
    expect(ids.indexOf('oferta')).toBeLessThan(ids.indexOf('primer-mes'));
    expect(ids.indexOf('objeciones')).toBeLessThan(ids.indexOf('al-reservar'));
    expect(ids.indexOf('al-reservar')).toBe(ids.indexOf('formulario') - 1);
    await expect(page.locator('#oferta .offer-row')).toHaveCount(9);
    await expect(page.locator('#primer-mes .fm-item')).toHaveCount(4);
    await expect(page.locator('#objeciones li')).toHaveCount(6);
    await expect(page.locator('#al-reservar .ab-step')).toHaveCount(3);
    await expect(page.locator('#oferta')).toContainText('Si en 30 días el sistema no te entrega al menos 15 clientes filtrados, el segundo mes va por nuestra cuenta.');
    await expect(page.locator('#oferta')).toContainText('Solo incorporamos 3 negocios nuevos al mes, porque cada implantación la montamos a mano.');
    for (const sec of ['#trabajo-real', '#oferta', '#objeciones']) {
      const cta = page.locator(`${sec} [data-open-form]`).first();
      await page.evaluate(() => window.scrollTo(0, 0));
      await cta.scrollIntoViewIfNeeded();
      await cta.click();
      await expect.poll(() => page.locator('#formulario').evaluate((e) => Math.abs(e.getBoundingClientRect().top) < 200)).toBe(true);
    }
    await ctx.close();
  }
});

test('home escritorio: la ficha de la oferta se queda fija mientras bajas la lista', async ({ browser }) => {
  // sin animaciones: el revelado (translateY) movería la ficha unos píxeles durante la medida
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  await page.goto('/');
  const list = page.locator('#oferta .offer-list');
  await list.evaluate((e) => window.scrollTo(0, e.getBoundingClientRect().top + scrollY + 500));
  await page.waitForTimeout(300);
  const top = await page.locator('#oferta .offer-card').evaluate((e) => e.getBoundingClientRect().top);
  expect(top).toBeGreaterThanOrEqual(90);
  expect(top).toBeLessThanOrEqual(100);
  await ctx.close();
});

const lightContrastFails = (page: import('@playwright/test').Page) => page.evaluate(() => {
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

// Cada landing tiene su propia composición: bloques que solo ella lleva.
const LANDING_BLOCKS: Record<string, string[]> = {
  '/sectores/clinicas-dentales': ['#oferta', '#angulos', '#preguntas-ia', '#trabajo-real', '#primer-mes', '#objeciones'],
  '/sectores/medicina-estetica': ['#tratamiento-explicado', '#oferta', '#angulos', '#preguntas-ia', '#asi-grabamos', '#primer-mes', '#objeciones'],
  '/sectores/inmobiliarias': ['#dos-frentes', '#oferta', '#angulos', '#preguntas-ia', '#asi-grabamos', '#primer-mes', '#objeciones'],
  '/sectores/reformas': ['#obra-en-fases', '#oferta', '#angulos', '#preguntas-ia', '#asi-grabamos', '#primer-mes', '#objeciones'],
  '/creacion-de-contenido': ['#jornada', '#trabajo-real', '#oferta'],
  '/gestion-redes-sociales': ['#calendario', '#bandeja', '#oferta'],
  '/publicidad-meta-ads': ['#anuncios-reales', '#embudo', '#oferta'],
  '/sistema-ia': ['#preguntas-ia', '#aviso', '#oferta'],
  '/whatsapp-business-api': ['#app-o-api', '#tu-numero', '#oferta'],
  '/diseno-web': ['#anatomia', '#la-web-en-el-sistema', '#oferta'],
  '/agencia-marketing-madrid': ['#oferta', '#primer-mes', '#trabajo-real'],
};
const GUARANTEE = 'Si en 30 días el sistema no te entrega al menos 15 clientes filtrados, el segundo mes va por nuestra cuenta.';

test('cada landing lleva sus bloques propios, la garantía y «al reservar» antes del formulario', async ({ page }) => {
  for (const [path, blocks] of Object.entries(LANDING_BLOCKS)) {
    await page.goto(path);
    for (const b of blocks) await expect(page.locator(b), `${path} ${b}`).toHaveCount(1);
    await expect(page.locator('#oferta'), path).toContainText(GUARANTEE);
    const ids = await page.locator('section[id]').evaluateAll((els) => els.map((e) => e.id));
    expect(ids.indexOf('al-reservar'), path).toBe(ids.indexOf('formulario') - 1);
  }
  await page.goto('/sectores/reformas');
  await expect(page.locator('#angulos li')).toHaveCount(3);
  await expect(page.locator('#angulos')).toContainText('Ejemplo de enfoque');
  await expect(page.locator('#trabajo-real')).toHaveCount(0);
});

test('la tabla de WhatsApp se desplaza dentro de su marco, sin desbordar la página', async ({ browser }) => {
  const ctx = await browser.newContext({ viewport: { width: 375, height: 800 } });
  const page = await ctx.newPage();
  await page.goto('/whatsapp-business-api');
  const box = page.locator('#app-o-api [role="region"]');
  await expect(box.locator('table caption')).toHaveCount(1);
  expect(await box.evaluate((e) => e.scrollWidth > e.clientWidth)).toBe(true);
  expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(0);
  await ctx.close();
});

test('las secciones claras de las landings cumplen contraste AA', async ({ page }) => {
  for (const path of ['/sectores/clinicas-dentales', '/sectores/reformas', '/gestion-redes-sociales', '/whatsapp-business-api', '/diseno-web', '/sistema-ia']) {
    await page.goto(path);
    expect(await lightContrastFails(page), path).toEqual([]);
  }
});

test('cada sector tiene su propia secuencia de bloques', async ({ page }) => {
  const seqs: string[] = [];
  for (const path of ['/sectores/clinicas-dentales', '/sectores/medicina-estetica', '/sectores/inmobiliarias', '/sectores/reformas']) {
    await page.goto(path);
    seqs.push((await page.locator('main section[id], body section[id]').evaluateAll((els) => els.map((e) => e.id))).join(','));
  }
  expect(new Set(seqs).size).toBe(4);
  // sin audio propio de inmobiliaria no hay reproductor (ni demos de otros sectores)
  await page.goto('/sectores/inmobiliarias');
  await expect(page.locator('[data-audio-player]')).toHaveCount(0);
  await expect(page.locator('[data-ai-demo] [data-chat]')).toHaveCount(1);
});

test('servicios: la oferta aparece pronto y la franja bajo el hero lleva a ella', async ({ page }) => {
  for (const path of ['/creacion-de-contenido', '/gestion-redes-sociales', '/publicidad-meta-ads', '/sistema-ia', '/whatsapp-business-api', '/diseno-web']) {
    await page.goto(path);
    const ids = await page.locator('section[id]').evaluateAll((els) => els.map((e) => e.id));
    expect(ids.indexOf('oferta'), `${path}: ${ids.join(',')}`).toBeLessThanOrEqual(1);
    await expect(page.locator('a[href="#oferta"]').first(), path).toBeVisible();
  }
});
