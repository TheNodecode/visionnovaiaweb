import { SITE } from '../config/site';

export const SERVICES = ['más clientes con anuncios', 'contenido y redes', 'que la IA atienda y filtre', 'todo el sistema'] as const;
export const SECTORS = ['Clínica dental', 'Medicina estética', 'Inmobiliaria', 'Reformas y construcción', 'Otro'] as const;
export const TICKETS = ['menos de 100 €', '100–500 €', '500–2.000 €', 'más de 2.000 €'] as const;
export const ADS = ['sí, en Meta', 'sí, en otros canales', 'lo probamos y lo dejamos', 'todavía no'] as const;

export type LeadInput = {
  servicio: string[]; sector: string; sector_otro?: string; ticket_medio: string; publicidad_actual: string;
  nombre: string; email: string; telefono: string; empresa: string; web?: string; mensaje?: string; privacidad: boolean;
};
type ContactKey = 'nombre' | 'email' | 'telefono' | 'empresa' | 'privacidad';

export function isValidEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s.trim());
}

export function normalizePhone(s: string): string | null {
  const raw = s.trim();
  if (/[a-z]/i.test(raw)) return null;
  let d = raw.replace(/[\s\-().]/g, '');
  if (d.startsWith('00')) d = '+' + d.slice(2);
  if (d.startsWith('+')) {
    const digits = d.slice(1);
    if (!/^\d{8,15}$/.test(digits)) return null;
    return '+' + digits;
  }
  if (/^[6789]\d{8}$/.test(d)) return '+34' + d;
  return null;
}

export function validateContact(i: Pick<LeadInput, ContactKey>): Partial<Record<ContactKey, string>> {
  const e: Partial<Record<ContactKey, string>> = {};
  if (i.nombre.trim().length < 2) e.nombre = 'Dinos tu nombre';
  if (!isValidEmail(i.email)) e.email = 'Revisa el email';
  if (!normalizePhone(i.telefono)) e.telefono = 'Revisa el teléfono';
  if (i.empresa.trim().length < 2) e.empresa = 'Dinos el nombre de tu negocio';
  if (!i.privacidad) e.privacidad = 'Necesitamos tu consentimiento';
  return e;
}

export function isQualified(i: Pick<LeadInput, 'ticket_medio' | 'publicidad_actual'>): boolean {
  return !(i.ticket_medio === TICKETS[0] && i.publicidad_actual === ADS[3]);
}

export const ATTRIBUTION_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid', 'gclid'] as const;

export function buildPayload(i: LeadInput, ctx: { pagina: string; search: string; attribution?: Record<string, string> }): Record<string, string | boolean> {
  const q = new URLSearchParams(ctx.search);
  const attr = (k: string) => q.get(k) || ctx.attribution?.[k] || '';
  const extra: Record<string, string> = {};
  for (const k of ['utm_content', 'utm_term', 'fbclid', 'gclid']) { const v = attr(k); if (v) extra[k] = v; }
  const sector = i.sector === 'Otro' && i.sector_otro?.trim() ? i.sector_otro.trim() : i.sector;
  const servicio = i.servicio.join(', ');
  const mensaje = i.mensaje?.trim() ||
    `Quiere: ${servicio}. Sector: ${sector}. Ticket medio: ${i.ticket_medio}. Publicidad: ${i.publicidad_actual}.`;
  return {
    nombre: i.nombre.trim(), email: i.email.trim(), telefono: normalizePhone(i.telefono) ?? i.telefono.trim(),
    mensaje, origen: 'Web', servicio, sector, ticket_medio: i.ticket_medio, publicidad_actual: i.publicidad_actual,
    empresa: i.empresa.trim(), web: i.web?.trim() ?? '', pagina: ctx.pagina,
    utm_source: attr('utm_source'), utm_medium: attr('utm_medium'), utm_campaign: attr('utm_campaign'), ...extra,
    cualificado: isQualified(i),
  };
}

async function post(fetchImpl: typeof fetch, url: string, body: unknown, timeoutMs: number): Promise<boolean> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetchImpl(url, {
      method: 'POST', keepalive: true, signal: ctrl.signal,
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(body),
    });
    return res.ok;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}

export async function submitLead(
  payload: Record<string, unknown>,
  opts: { fetchImpl?: typeof fetch; timeoutMs?: number; novaUrl?: string; emailUrl?: string } = {},
): Promise<{ nova: boolean; email: boolean }> {
  const f = opts.fetchImpl ?? fetch.bind(globalThis);
  const t = opts.timeoutMs ?? 5000;
  const [nova, email] = await Promise.all([
    post(f, opts.novaUrl ?? SITE.novaEndpoint, payload, t),
    post(f, opts.emailUrl ?? SITE.formsubmitEndpoint, { ...payload, _subject: `Nuevo lead web — ${payload.empresa ?? ''}`, _template: 'table' }, t),
  ]);
  return { nova, email };
}
