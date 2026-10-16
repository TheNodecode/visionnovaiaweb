import { describe, it, expect } from 'vitest';
import { SECTORS } from '../../src/data/sectors';
import { SECTOR_SALES } from '../../src/data/sector-sales';
import { SERVICES } from '../../src/data/services';
import { SERVICE_SALES } from '../../src/data/service-sales';
import { CITIES } from '../../src/data/cities';
import { OFFER_ITEMS, FIRST_MONTH, OBJECTIONS, AFTER_BOOKING, tailorOffer, tailorList } from '../../src/data/offer';
import { HOME_FAQ } from '../../src/data/faqs';

const text = (o: unknown) => JSON.stringify(o);

describe('landings de sector', () => {
  it('cada sector tiene sus bloques de venta completos', () => {
    for (const s of SECTORS) {
      const x = SECTOR_SALES[s.slug];
      expect(x, s.slug).toBeDefined();
      expect(x.angles.items, s.slug).toHaveLength(3);
      expect(x.qualify.questions.length, s.slug).toBeGreaterThanOrEqual(4);
      expect(x.qualify.questions.length, s.slug).toBeLessThanOrEqual(5);
      expect(x.objections, s.slug).toHaveLength(4);
      expect(x.firstMonth.weeks, s.slug).toHaveLength(4);
      expect(tailorOffer(OFFER_ITEMS, { patch: x.offer.patch }), s.slug).toHaveLength(9);
      expect(tailorList(FIRST_MONTH, x.firstMonth.weeks)[2].deliverable).toBe(FIRST_MONTH[2].deliverable);
    }
  });
  it('solo la clínica dental enseña el trabajo real del cliente', () => {
    for (const s of SECTORS) expect(SECTOR_SALES[s.slug].proof.kind, s.slug).toBe(s.slug === 'clinicas-dentales' ? 'real' : 'bts');
  });
  it('los ganchos y los textos de cada sector son distintos', () => {
    const hooks = SECTORS.flatMap((s) => SECTOR_SALES[s.slug].angles.items.map((a) => a.hook));
    expect(new Set(hooks).size).toBe(hooks.length);
    const leads = SECTORS.map((s) => SECTOR_SALES[s.slug].offer.lead);
    expect(new Set(leads).size).toBe(leads.length);
  });
});

describe('landings de servicio y ciudad', () => {
  it('cada servicio tiene oferta compacta de 8 partidas con la suya primero', () => {
    for (const s of SERVICES) {
      const o = SERVICE_SALES[s.slug].offer;
      const ids = OFFER_ITEMS.map((i) => i.id);
      const items = tailorOffer(OFFER_ITEMS, { only: [o.first, ...ids.filter((id) => id !== o.first)], omit: [o.omit], patch: { [o.first]: o.patch } });
      expect(items, s.slug).toHaveLength(8);
      expect(items[0].id, s.slug).toBe(o.first);
    }
  });
  it('cada ciudad cuenta el viaje en la semana 2', () => {
    for (const c of CITIES) {
      expect(c.sales.week2.text, c.slug).toMatch(/Girona|viaje|antelación/);
      expect(c.sales.note, c.slug).toMatch(/^Plazos orientativos/);
    }
  });
});

describe('honestidad del copy de las landings', () => {
  const all = text([SECTOR_SALES, SERVICE_SALES, CITIES.map((c) => c.sales)]);
  it('sin precios, «bono», «error» ni partner de Meta', () => {
    expect(all).not.toMatch(/€/);
    expect(all).not.toMatch(/\bbonos?\b/i);
    expect(all).not.toMatch(/\berror\b/i);
    expect(all).not.toMatch(/Meta (Tech )?(Provider|Partner)/i);
  });
  it('sin cifras ni resultados atribuidos a CEM Valderas', () => {
    const cem = all.match(/[^"]*CEM Valderas[^"]*/g) ?? [];
    expect(cem.length).toBeGreaterThan(0);
    for (const s of cem) expect(s).not.toMatch(/\d+\s?%|\+\s?\d|pacientes nuevos|resultad|más citas|el doble|x\s?2/i);
  });
});

// Toda frase que promete un tiempo de respuesta o atención 24/7 de nuestra IA va matizada
// («está configurada para…» / «pensado para…»). Los títulos cortos de partidas son nombres de función.
describe('tiempos de respuesta de la IA, siempre matizados', () => {
  const CLAIM = /menos de (60 s|60 segundos|un minuto)|24\/7/i;
  const HEDGE = /configurad|pensad/i;
  const walk = (v: unknown, key: string, out: { key: string; s: string }[]) => {
    if (typeof v === 'string') out.push({ key, s: v.replace(/ /g, ' ') });
    else if (Array.isArray(v)) v.forEach((x) => walk(x, key, out));
    else if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) walk(x, k, out);
    return out;
  };
  const strings = walk([SECTORS, SECTOR_SALES, SERVICES, SERVICE_SALES, CITIES, OFFER_ITEMS, OBJECTIONS, AFTER_BOOKING, FIRST_MONTH, HOME_FAQ], '', []);
  it('cada frase con «menos de 60 s», «menos de un minuto» o «24/7» lleva «configurad…» o «pensad…»', () => {
    const bad = strings
      .filter(({ key, s }) => !(key === 'title' && s.length <= 50))
      .flatMap(({ s }) => s.split(/(?<=[.!?])\s+/))
      .filter((x) => CLAIM.test(x) && !HEDGE.test(x));
    expect(bad).toEqual([]);
    expect(strings.filter(({ s }) => CLAIM.test(s)).length).toBeGreaterThan(5); // el barrido sí ve las frases
  });
});
