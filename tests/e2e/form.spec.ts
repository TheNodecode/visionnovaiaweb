import { test, expect } from '@playwright/test';

async function fillToContact(page) {
  await page.goto('/#formulario');
  const form = page.locator('#formulario');
  await form.getByRole('button', { name: /todo el sistema/i }).click();
  await form.getByRole('button', { name: /siguiente/i }).click();
  await form.getByRole('button', { name: /clínica dental/i }).click();
  await form.getByRole('button', { name: /más de 2.000/i }).click();
  await form.getByRole('button', { name: /sí, en meta/i }).click();
  await form.getByLabel(/nombre/i).fill('Laura Martín');
  await form.getByLabel(/email/i).fill('laura@clinica.es');
  await form.getByLabel(/teléfono/i).fill('610 85 97 03');
  await form.getByLabel(/negocio|empresa/i).first().fill('Clínica Sol');
  await form.getByLabel(/privacidad/i).check();
  return form;
}

test.beforeEach(async ({ page }) => {
  await page.route('https://assets.calendly.com/**', (r) => r.fulfill({ body: 'window.Calendly={initInlineWidget(){}}', contentType: 'text/javascript' }));
  await page.route('https://formsubmit.co/**', (r) => r.fulfill({ status: 200, body: '{}' }));
});

test('envía a Nova el payload esperado y muestra Calendly', async ({ page }) => {
  let body: any;
  await page.route('https://app.visionnovaia.com/api/conectar/**', async (r) => { body = r.request().postDataJSON(); await r.fulfill({ status: 200, body: '{}' }); });
  const form = await fillToContact(page);
  await form.getByRole('button', { name: /ver huecos/i }).click();
  await expect(form.getByText(/elige el hueco/i)).toBeVisible();
  expect(body).toMatchObject({ nombre: 'Laura Martín', email: 'laura@clinica.es', telefono: '+34610859703', origen: 'Web', sector: 'Clínica dental', cualificado: true });
});

test('si Nova falla, el visitante ve Calendly sin ningún error', async ({ page }) => {
  await page.route('https://app.visionnovaia.com/api/conectar/**', (r) => r.abort('failed'));
  const form = await fillToContact(page);
  await form.getByRole('button', { name: /ver huecos/i }).click();
  await expect(form.getByText(/elige el hueco/i)).toBeVisible({ timeout: 7000 });
  await expect(page.getByText(/error/i)).toHaveCount(0);
});

test('un perfil no cualificado ve la oferta del software Nova', async ({ page }) => {
  await page.route('https://app.visionnovaia.com/api/conectar/**', (r) => r.fulfill({ status: 200, body: '{}' }));
  await page.goto('/#formulario');
  const form = page.locator('#formulario');
  await form.getByRole('button', { name: /contenido y redes/i }).click();
  await form.getByRole('button', { name: /siguiente/i }).click();
  await form.getByRole('button', { name: /otro/i }).click();
  await form.getByLabel(/a qué se dedica|cuál/i).fill('Peluquería');
  await form.getByRole('button', { name: /siguiente/i }).click();
  await form.getByRole('button', { name: /menos de 100/i }).click();
  await form.getByRole('button', { name: /todavía no/i }).click();
  await form.getByLabel(/nombre/i).fill('Ana');
  await form.getByLabel(/email/i).fill('ana@pelu.es');
  await form.getByLabel(/teléfono/i).fill('+57 300 123 4567');
  await form.getByLabel(/negocio|empresa/i).first().fill('Pelu Ana');
  await form.getByLabel(/privacidad/i).check();
  await form.getByRole('button', { name: /ver huecos/i }).click();
  await expect(form.getByRole('link', { name: /ver planes de nova/i })).toBeVisible();
});

test('muestra errores en línea y no envía con datos inválidos', async ({ page }) => {
  let called = false;
  await page.route('https://app.visionnovaia.com/api/conectar/**', (r) => { called = true; r.fulfill({ body: '{}' }); });
  const form = await fillToContact(page);
  await form.getByLabel(/teléfono/i).fill('12ab');
  await form.getByRole('button', { name: /ver huecos/i }).click();
  await expect(form.getByText(/revisa el teléfono/i)).toBeVisible();
  expect(called).toBe(false);
});

test('recupera el progreso tras recargar', async ({ page }) => {
  await page.goto('/#formulario');
  const form = page.locator('#formulario');
  await form.getByRole('button', { name: /todo el sistema/i }).click();
  await form.getByRole('button', { name: /siguiente/i }).click();
  await form.getByRole('button', { name: /inmobiliaria/i }).click();
  await page.reload();
  await expect(page.locator('#formulario').getByText(/cuánto vale de media/i)).toBeVisible();
});

test('los inputs no provocan zoom en iOS (font-size >= 16px)', async ({ page }) => {
  await fillToContact(page);
  const sizes = await page.locator('#formulario input:not([type=hidden]):not([type=checkbox])').evaluateAll(
    (els) => els.filter((e) => (e as HTMLElement).offsetParent).map((e) => parseFloat(getComputedStyle(e).fontSize)));
  for (const s of sizes) expect(s).toBeGreaterThanOrEqual(16);
});
