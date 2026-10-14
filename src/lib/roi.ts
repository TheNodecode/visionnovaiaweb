const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, Number.isFinite(n) ? n : 0));
export function lostRevenue(i: { contactos: number; pctSinAtender: number; ticket: number; tasaCierre?: number }) {
  const contactos = clamp(i.contactos, 0, 100000);
  const pct = clamp(i.pctSinAtender, 0, 100) / 100;
  const ticket = clamp(i.ticket, 0, 1_000_000);
  const cierre = clamp(i.tasaCierre ?? 0.2, 0, 1);
  const perdidosMes = Math.round(contactos * pct);
  const euroMes = Math.round(contactos * pct * cierre * ticket);
  return { perdidosMes, euroMes, euroAno: euroMes * 12 };
}
