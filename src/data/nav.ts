export const SERVICES_NAV = [
  { href: '/creacion-de-contenido', label: 'Creación de contenido' },
  { href: '/gestion-redes-sociales', label: 'Gestión de redes sociales' },
  { href: '/publicidad-meta-ads', label: 'Publicidad en Meta Ads' },
  { href: '/sistema-ia', label: 'Sistema IA + CRM' },
  { href: '/whatsapp-business-api', label: 'WhatsApp Business API' },
  { href: '/diseno-web', label: 'Diseño web' },
] as const;
export const SECTORS_NAV = [
  { href: '/sectores/clinicas-dentales', label: 'Clínicas dentales' },
  { href: '/sectores/medicina-estetica', label: 'Medicina estética' },
  { href: '/sectores/inmobiliarias', label: 'Inmobiliarias' },
  { href: '/sectores/reformas', label: 'Reformas y construcción' },
] as const;
export const CITIES_NAV = [
  { href: '/agencia-marketing-madrid', label: 'Madrid' },
  { href: '/agencia-marketing-barcelona', label: 'Barcelona' },
  { href: '/agencia-marketing-valencia', label: 'Valencia' },
  { href: '/agencia-marketing-malaga', label: 'Málaga' },
] as const;
export const COMPANY_NAV = [
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/trabajos', label: 'Trabajos' },
  { href: '/software-nova', label: 'Software Nova' },
  { href: '/blog', label: 'Blog' },
  { href: '/contacto', label: 'Contacto' },
] as const;
export const LEGAL_NAV = [
  { href: '/politica-privacidad', label: 'Privacidad' },
  { href: '/politica-cookies', label: 'Cookies' },
  { href: '/terminos-condiciones', label: 'Términos' },
] as const;

export const NAV = {
  services: SERVICES_NAV,
  sectors: SECTORS_NAV,
  links: [
    { href: '/sistema-ia', label: 'Sistema IA' },
    { href: '/trabajos', label: 'Trabajos' },
    { href: '/nosotros', label: 'Nosotros' },
    { href: '/blog', label: 'Blog' },
  ],
} as const;

export const FOOTER_LINKS = {
  services: SERVICES_NAV,
  sectors: SECTORS_NAV,
  cities: CITIES_NAV,
  company: COMPANY_NAV,
  legal: LEGAL_NAV,
} as const;
