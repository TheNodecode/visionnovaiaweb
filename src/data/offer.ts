// La oferta de NovaScale: qué incluye, el primer mes, las objeciones y qué pasa al reservar.
// Cada bloque tiene su versión base aquí; las páginas de sector, servicio y ciudad pasan
// variaciones con tailorOffer()/tailorList() sin copiar la lista entera.
// Reglas: sin precios de NovaScale, sin cifras de clientes y la IA siempre «está configurada para…».
import type { IconName } from '../components/ui/icon-names';

/** Texto exacto de la garantía (no se parafrasea en ningún sitio). */
export const GUARANTEE_TEXT = 'Si en 30 días el sistema no te entrega al menos 15 clientes filtrados, el segundo mes va por nuestra cuenta.';
/** Texto exacto de la escasez real. */
export const SCARCITY_TEXT = 'Solo incorporamos 3 negocios nuevos al mes, porque cada implantación la montamos a mano.';
export const PRICE_NOTE = 'Precio: propuesta a medida tras una llamada de 20 minutos.';

export type OfferId = 'grabacion' | 'redes' | 'ads' | 'whatsapp' | 'voz' | 'crm' | 'web' | 'informe' | 'aviso';

export interface OfferItem {
  id: OfferId;
  icon: IconName;
  /** Lo que es. */
  title: string;
  /** Lo que te llevas (resultado concreto, no el nombre de la función). */
  outcome: string;
  /** Detalle corto en etiquetas (opcional). */
  tags?: string[];
}

export const OFFER_ITEMS: OfferItem[] = [
  {
    id: 'grabacion', icon: 'camera',
    title: 'Una jornada de grabación al mes en tu negocio',
    outcome: 'Te llevas los vídeos del mes hechos: guiones escritos para tu sector, filmmaker en tu local y edición en vertical lista para publicar.',
    tags: ['Guiones', 'Filmmaker', 'Edición'],
  },
  {
    id: 'redes', icon: 'users',
    title: 'Tus redes, gestionadas con ese contenido',
    outcome: 'Publicamos con un calendario que acordamos contigo, con tu cara y tu local. Quien te busca antes de llamar encuentra un negocio vivo, no una cuenta abandonada.',
  },
  {
    id: 'ads', icon: 'megaphone',
    title: 'Campañas de Meta Ads con tus vídeos',
    outcome: 'Tus propios vídeos convertidos en anuncios para la gente de tu zona que encaja con tu cliente. La inversión va directa a Meta, en tu cuenta y con tu tarjeta.',
  },
  {
    id: 'whatsapp', icon: 'chat',
    title: 'WhatsApp con IA que responde en menos de 60 s',
    outcome: 'Está pensado para responder en menos de un minuto, también de noche. La IA está configurada para preguntar lo que preguntarías tú y separar a quien va en serio de quien solo mira.',
  },
  {
    id: 'voz', icon: 'phone',
    title: 'Agente de voz 24/7',
    outcome: 'Las llamadas que hoy se pierden a la hora de comer, de noche o con el equipo ocupado las coge el agente de voz: está configurado para atenderlas, filtrarlas y dejarlas apuntadas en el CRM.',
  },
  {
    id: 'crm', icon: 'crm',
    title: 'CRM Nova con todo en tiempo real',
    outcome: 'Cada contacto en una sola pantalla: de qué anuncio viene, qué ha preguntado y en qué punto está. Se acabaron las libretas y los chats perdidos.',
  },
  {
    id: 'web', icon: 'globe',
    title: 'Web optimizada, incluida en el montaje',
    outcome: 'Una web rápida, pensada para que la visita que llega del anuncio acabe escribiéndote. Va dentro del montaje, no es una partida aparte.',
  },
  {
    id: 'informe', icon: 'chart',
    title: 'Informe mensual claro',
    outcome: 'Qué hemos hecho, cuánto se ha invertido en anuncios y qué ha salido de ahí. Una página, sin jerga y sin gráficos de relleno.',
  },
  {
    id: 'aviso', icon: 'bolt',
    title: 'Aviso al instante cuando un cliente necesita a una persona',
    outcome: 'Está configurada para no improvisar: cuando una conversación necesita a una persona, te avisa al momento y tomas tú el control.',
  },
];

export interface TailorOptions<Id extends string, T> {
  /** Solo estos, en este orden. */
  only?: Id[];
  /** Quitar estos. */
  omit?: Id[];
  /** Cambiar campos de algunos (p. ej. el resultado adaptado a un sector). */
  patch?: Partial<Record<Id, Partial<Omit<T, 'id'>>>>;
}

/** Variante de la oferta para una página concreta, sin tocar la base. */
export function tailorOffer(base: OfferItem[], opts: TailorOptions<OfferId, OfferItem> = {}): OfferItem[] {
  const byId = new Map(base.map((it) => [it.id, it]));
  const picked = opts.only ? opts.only.map((id) => byId.get(id)).filter((x): x is OfferItem => !!x) : base;
  return picked
    .filter((it) => !opts.omit?.includes(it.id))
    .map((it) => (opts.patch?.[it.id] ? { ...it, ...opts.patch[it.id], id: it.id } : { ...it }));
}

export interface Week { title: string; text: string; deliverable: string }

export const FIRST_MONTH: Week[] = [
  {
    title: 'Arranque: auditoría y guiones',
    text: 'En la reunión de arranque revisamos tus redes, tus anuncios si ya los tienes y cómo se atiende hoy a quien escribe o llama. Con eso escribimos los guiones de la primera grabación.',
    deliverable: 'Guiones aprobados por ti',
  },
  {
    title: 'Jornada de grabación en tu negocio',
    text: 'Vamos a tu local con el equipo. Tú y tu equipo dais la cara; nosotros llevamos el guion y dirigimos cada toma.',
    deliverable: 'Los vídeos del mes, editados',
  },
  {
    title: 'Lanzamos anuncios, activamos la IA y el CRM',
    text: 'Las campañas salen con tus vídeos. El WhatsApp con IA y el agente de voz empiezan a atender, y cada contacto entra en CRM Nova.',
    deliverable: 'Desde aquí cuentan los 30 días de la garantía',
  },
  {
    title: 'Primeros clientes filtrados y primer informe',
    text: 'Tu equipo empieza a hablar con contactos que ya han pasado el filtro. Cerramos la semana con el primer informe: qué funciona y qué ajustamos.',
    deliverable: 'Tu primer informe mensual',
  },
];

/** Sustituye por posición solo los campos que cambian (p. ej. la semana 2 de una ciudad con desplazamiento). */
export function tailorList<T extends object>(base: T[], patch: (Partial<T> | undefined)[] = []): T[] {
  return base.map((it, i) => (patch[i] ? { ...it, ...patch[i] } : { ...it }));
}

export interface Objection { q: string; short: string; a: string }

export const OBJECTIONS: Objection[] = [
  {
    q: 'Ya hago publicidad.',
    short: 'Perfecto: el problema ya no es traer contactos, es no perderlos.',
    a: 'Lo que casi nadie mide es cuántos se pierden después: el que escribe a las diez de la noche, el que llama con el equipo ocupado, el que pregunta y nadie le vuelve a escribir. Nosotros grabamos el contenido de los anuncios y montamos el filtro que atiende a cada contacto al momento.',
  },
  {
    q: 'Ya tengo agencia.',
    short: 'La mayoría entrega anuncios y un informe. Lo que pasa con el contacto ya no es cosa suya.',
    a: 'Nosotros llevamos la cadena entera: grabación, anuncios, una IA configurada para responder en menos de un minuto, filtro y CRM. Por eso nuestra garantía se mide en clientes filtrados y no en clics ni en alcance.',
  },
  {
    q: 'No tengo tiempo para grabar.',
    short: 'Te pedimos un día al mes, el que acordemos contigo, y solo te necesitamos en tus tomas.',
    a: 'Llegamos con los guiones escritos y dirigimos cada toma. Tú solo haces lo que ya haces cada día: explicar tu trabajo. El resto del mes no tienes que pensar en contenido.',
  },
  {
    q: '¿Mis clientes notarán que es una IA?',
    short: 'Notarán que les contestan al momento, a cualquier hora y con datos de tu negocio.',
    a: 'La configuramos con tu tono y tus respuestas reales, y está configurada para no inventar: si algo se sale de lo que sabe, te avisa y entra una persona de tu equipo.',
  },
  {
    q: '¿Y si no funciona?',
    short: 'Entonces el riesgo es nuestro, y está por escrito.',
    a: `${GUARANTEE_TEXT} Los 30 días cuentan desde que arrancan las campañas, y antes de empezar acordamos contigo qué cuenta como cliente filtrado en tu negocio.`,
  },
  {
    q: '¿Por qué no me dais precio en la web?',
    short: 'Porque no vendemos un paquete de estantería.',
    a: 'No cuesta lo mismo grabar una clínica que una inmobiliaria con tres oficinas, ni captar en un barrio que en una provincia entera. Por eso no ponemos una tarifa de catálogo: en 20 minutos vemos tu caso y después te enviamos una propuesta cerrada, con el precio por escrito.',
  },
];

export interface Step { title: string; text: string }

export const AFTER_BOOKING: Step[] = [
  {
    title: 'Llamada de 20 minutos',
    text: 'Vemos tu negocio, cómo te llegan hoy los clientes y dónde se pierden. Si no encajamos, te lo decimos en la misma llamada.',
  },
  {
    title: 'Propuesta cerrada, sin letra pequeña',
    text: 'Qué incluye, cuánto cuesta y qué cuenta como cliente filtrado en tu caso. Todo por escrito, para que decidas con calma.',
  },
  {
    title: 'Si te encaja, reservas tu plaza',
    text: 'Entras en la siguiente incorporación del mes y empezamos por la semana 1: auditoría y guiones.',
  },
];
