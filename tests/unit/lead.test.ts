import { describe, it, expect, vi } from 'vitest';
import { isValidEmail, normalizePhone, validateContact, isQualified, buildPayload, submitLead, TICKETS, ADS } from '../../src/lib/lead';

const base = {
  servicio: ['todo el sistema'], sector: 'Clínica dental', ticket_medio: TICKETS[3], publicidad_actual: ADS[0],
  nombre: 'Laura Martín', email: 'laura@clinica.es', telefono: '+34 610 85 97 03', empresa: 'Clínica Sol', privacidad: true,
};

describe('normalizePhone', () => {
  it('acepta un móvil español con espacios', () => expect(normalizePhone('610 85 97 03')).toBe('+34610859703'));
  it('acepta +34 y guiones', () => expect(normalizePhone('+34-610-859-703')).toBe('+34610859703'));
  it('acepta 0034', () => expect(normalizePhone('0034 610859703')).toBe('+34610859703'));
  it('acepta números extranjeros con +', () => expect(normalizePhone('+57 300 123 4567')).toBe('+573001234567'));
  it('rechaza letras', () => expect(normalizePhone('61085abcd')).toBeNull());
  it('rechaza números cortos', () => expect(normalizePhone('12345')).toBeNull());
  it('rechaza un número de 9 cifras que no empieza por 6/7/8/9', () => expect(normalizePhone('123456789')).toBeNull());
});

describe('isValidEmail', () => {
  it('acepta un email normal', () => expect(isValidEmail('a.b@empresa.com')).toBe(true));
  it('rechaza sin dominio', () => expect(isValidEmail('a@b')).toBe(false));
  it('rechaza con espacios', () => expect(isValidEmail('a @b.com')).toBe(false));
});

describe('validateContact', () => {
  it('sin errores con datos válidos', () => expect(validateContact(base)).toEqual({}));
  it('marca cada campo inválido', () => {
    const e = validateContact({ nombre: ' ', email: 'x', telefono: '12', empresa: '', privacidad: false });
    expect(Object.keys(e).sort()).toEqual(['email', 'empresa', 'nombre', 'privacidad', 'telefono']);
  });
});

describe('isQualified', () => {
  it('no cualifica con ticket bajo y sin publicidad', () => expect(isQualified({ ticket_medio: TICKETS[0], publicidad_actual: ADS[3] })).toBe(false));
  it('cualifica con ticket bajo si ya invierte en publicidad', () => expect(isQualified({ ticket_medio: TICKETS[0], publicidad_actual: ADS[0] })).toBe(true));
  it('cualifica con ticket alto sin publicidad', () => expect(isQualified({ ticket_medio: TICKETS[2], publicidad_actual: ADS[3] })).toBe(true));
});

describe('buildPayload', () => {
  it('incluye los campos de Nova, el origen, la página y los UTM', () => {
    const p = buildPayload({ ...base, mensaje: 'Hola' }, { pagina: '/sectores/clinicas-dentales', search: '?utm_source=meta&utm_campaign=otono' });
    expect(p).toMatchObject({
      nombre: 'Laura Martín', email: 'laura@clinica.es', telefono: '+34610859703', mensaje: 'Hola', origen: 'Web',
      servicio: 'todo el sistema', sector: 'Clínica dental', ticket_medio: TICKETS[3], publicidad_actual: ADS[0],
      empresa: 'Clínica Sol', pagina: '/sectores/clinicas-dentales', utm_source: 'meta', utm_campaign: 'otono', utm_medium: '', cualificado: true,
    });
  });
  it('genera un mensaje de resumen si el usuario no escribe ninguno', () => {
    const p = buildPayload(base, { pagina: '/', search: '' });
    expect(String(p.mensaje)).toContain('todo el sistema');
    expect(String(p.mensaje)).toContain('Clínica dental');
  });
  it('usa sector_otro cuando el sector es "Otro"', () => {
    const p = buildPayload({ ...base, sector: 'Otro', sector_otro: 'Gimnasio' }, { pagina: '/', search: '' });
    expect(p.sector).toBe('Gimnasio');
  });
});

describe('submitLead', () => {
  it('envía a Nova y al email y devuelve true en ambos', async () => {
    const f = vi.fn().mockResolvedValue(new Response('{}', { status: 200 }));
    const r = await submitLead({ a: '1' }, { fetchImpl: f, novaUrl: 'https://nova/x', emailUrl: 'https://mail/y' });
    expect(r).toEqual({ nova: true, email: true });
    expect(f.mock.calls[0][0]).toBe('https://nova/x');
    expect(JSON.parse(f.mock.calls[0][1].body)).toEqual({ a: '1' });
    expect(f.mock.calls[0][1].headers['Content-Type']).toBe('application/json');
  });
  it('nunca lanza un error si Nova falla', async () => {
    const f = vi.fn().mockRejectedValueOnce(new TypeError('CORS')).mockResolvedValueOnce(new Response('{}'));
    await expect(submitLead({}, { fetchImpl: f })).resolves.toEqual({ nova: false, email: true });
  });
  it('se rinde tras el timeout', async () => {
    const never = vi.fn((_u, init) => new Promise((_r, rej) => init.signal.addEventListener('abort', () => rej(new Error('abort')))));
    const t0 = Date.now();
    const r = await submitLead({}, { fetchImpl: never as any, timeoutMs: 50 });
    expect(r).toEqual({ nova: false, email: false });
    expect(Date.now() - t0).toBeLessThan(500);
  });
  it('trata un HTTP 500 como fallo', async () => {
    const f = vi.fn().mockResolvedValue(new Response('', { status: 500 }));
    await expect(submitLead({}, { fetchImpl: f })).resolves.toEqual({ nova: false, email: false });
  });
});

describe('buildPayload: atribución', () => {
  const ctx = { pagina: '/', search: '' };
  it('la URL actual gana sobre lo guardado', () => {
    const p = buildPayload(base, { ...ctx, search: '?utm_source=meta&gclid=abc', attribution: { utm_source: 'google', gclid: 'zzz', utm_term: 'dentista' } });
    expect(p).toMatchObject({ utm_source: 'meta', gclid: 'abc', utm_term: 'dentista' });
  });
  it('usa lo guardado cuando la URL no trae parámetros', () => {
    const p = buildPayload(base, { ...ctx, attribution: { utm_source: 'meta', utm_medium: 'cpc', utm_campaign: 'otono', utm_content: 'v1', fbclid: 'fb1' } });
    expect(p).toMatchObject({ utm_source: 'meta', utm_medium: 'cpc', utm_campaign: 'otono', utm_content: 'v1', fbclid: 'fb1' });
  });
  it('queda vacío si no hay ni URL ni guardado', () => {
    const p = buildPayload(base, ctx);
    expect(p).toMatchObject({ utm_source: '', utm_medium: '', utm_campaign: '' });
    for (const k of ['utm_content', 'utm_term', 'fbclid', 'gclid']) expect(p).not.toHaveProperty(k);
  });
});
