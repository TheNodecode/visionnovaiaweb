export const SITE = {
  name: 'Visión Nova',
  url: 'https://www.visionnovaia.com',
  tagline: 'Tu negocio en piloto automático',
  email: 'stiveng.visionnova@gmail.com',
  phoneDisplay: '+34 610 85 97 03',
  phoneE164: '+34610859703',
  whatsapp: 'https://wa.me/34610859703',
  address: { street: 'Carrer Puig Pedrós 8', city: 'Girona', postalCode: '17520', country: 'ES' },
  founder: 'Stiven González',
  calendly: 'https://calendly.com/stivengonzalezads/planifica-el-futuro-digital-de-tu-negocio-con-visionnov',
  novaEndpoint: 'https://app.visionnovaia.com/api/conectar/G5dyyHJdDKYyH4GPl9fGCJtC',
  formsubmitEndpoint: 'https://formsubmit.co/ajax/stiveng.visionnova@gmail.com',
  appUrl: 'https://app.visionnovaia.com',
  metaPartner: false, // poner a true cuando Meta apruebe la verificación
} as const;

/** Enlace a la app de NØVA con el origen para medir altas: ?sector=…&utm_source=visionnovaia&utm_medium=…&utm_campaign=… */
export function appLink(campaign: string, opts: { path?: string; sector?: string; medium?: string } = {}): string {
  const u = new URL(opts.path ?? '/', SITE.appUrl);
  if (opts.sector) u.searchParams.set('sector', opts.sector);
  u.searchParams.set('utm_source', 'visionnovaia');
  u.searchParams.set('utm_medium', opts.medium ?? 'web');
  u.searchParams.set('utm_campaign', campaign);
  return u.toString();
}
