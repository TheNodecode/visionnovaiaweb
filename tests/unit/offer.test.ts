import { describe, it, expect } from 'vitest';
import {
  OFFER_ITEMS, FIRST_MONTH, OBJECTIONS, AFTER_BOOKING, RESULTS_NOTE, SCARCITY_TEXT, PRICE_NOTE,
  tailorOffer, tailorList,
} from '../../src/data/offer';

describe('tailorOffer', () => {
  it('sin opciones devuelve una copia de la base', () => {
    const out = tailorOffer(OFFER_ITEMS);
    expect(out).toEqual(OFFER_ITEMS);
    expect(out[0]).not.toBe(OFFER_ITEMS[0]);
  });
  it('only elige y ordena; ignora ids que no existen', () => {
    const out = tailorOffer(OFFER_ITEMS, { only: ['crm', 'grabacion', 'nada' as never] });
    expect(out.map((i) => i.id)).toEqual(['crm', 'grabacion']);
  });
  it('omit quita y patch cambia campos sin tocar la base ni el id', () => {
    const before = OFFER_ITEMS[2].outcome;
    const out = tailorOffer(OFFER_ITEMS, { omit: ['web'], patch: { ads: { outcome: 'Otro', id: 'x' } as never } });
    expect(out.find((i) => i.id === 'web')).toBeUndefined();
    expect(out.find((i) => i.id === 'ads')?.outcome).toBe('Otro');
    expect(OFFER_ITEMS[2].outcome).toBe(before);
  });
});

describe('tailorList', () => {
  it('sustituye por posición solo lo indicado', () => {
    const out = tailorList(FIRST_MONTH, [undefined, { text: 'Nos desplazamos a tu ciudad.' }]);
    expect(out[0]).toEqual(FIRST_MONTH[0]);
    expect(out[1]).toEqual({ ...FIRST_MONTH[1], text: 'Nos desplazamos a tu ciudad.' });
    expect(out).toHaveLength(4);
  });
});

describe('copy de la oferta', () => {
  const all = JSON.stringify({ OFFER_ITEMS, FIRST_MONTH, OBJECTIONS, AFTER_BOOKING, PRICE_NOTE });
  it('sin garantía de resultados y con la escasez exacta', () => {
    expect(RESULTS_NOTE).toContain('No garantizamos clientes, citas ni resultados');
    expect(JSON.stringify({ OFFER_ITEMS, FIRST_MONTH, OBJECTIONS, AFTER_BOOKING })).not.toMatch(/15 clientes filtrados|segundo mes va por nuestra cuenta|garantía de/i);
    expect(SCARCITY_TEXT).toBe('Solo incorporamos 3 negocios nuevos al mes, porque cada implantación la montamos a mano.');
    expect(OBJECTIONS.find((o) => o.q.includes('no funciona'))?.a).toContain(RESULTS_NOTE);
  });
  it('sin precios, sin «bono» y sin «error»', () => {
    expect(all).not.toMatch(/€|\beuros?\b/i);
    expect(all).not.toMatch(/\bbonos?\b|\berror/i);
  });
  it('nueve partidas, cuatro semanas, seis objeciones y tres pasos', () => {
    expect([OFFER_ITEMS.length, FIRST_MONTH.length, OBJECTIONS.length, AFTER_BOOKING.length]).toEqual([9, 4, 6, 3]);
    expect(new Set(OFFER_ITEMS.map((i) => i.id)).size).toBe(9);
  });
});
