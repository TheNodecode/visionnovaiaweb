import { describe, it, expect } from 'vitest';
import { lostRevenue } from '../../src/lib/roi';

describe('lostRevenue', () => {
  it('calcula los contactos perdidos × tasa de cierre × ticket', () => {
    expect(lostRevenue({ contactos: 100, pctSinAtender: 30, ticket: 800 }))
      .toEqual({ perdidosMes: 30, euroMes: 4800, euroAno: 57600 }); // tasa de cierre por defecto 0,2
  });
  it('limita las entradas a rangos sensatos', () => {
    expect(lostRevenue({ contactos: -5, pctSinAtender: 150, ticket: -1 })).toEqual({ perdidosMes: 0, euroMes: 0, euroAno: 0 });
  });
  it('redondea a euros enteros', () => {
    expect(lostRevenue({ contactos: 7, pctSinAtender: 33, ticket: 99, tasaCierre: 0.25 }).euroMes).toBe(57);
  });
});
