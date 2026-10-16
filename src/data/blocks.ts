// Tipos de los bloques propios de cada landing (sector, servicio, ciudad).
// Los componentes son genéricos: el texto vive en sectors.ts, services.ts y cities.ts.
// Reglas de honestidad: los anuncios de ejemplo se rotulan «Ejemplo de enfoque», los paneles y
// calendarios de muestra «Ejemplo» o «Simulación», y nada promete cifras ni resultados.
import type { IconName } from '../components/ui/icon-names';

/** Un gancho de anuncio de ejemplo (no es un anuncio publicado). */
export interface AdAngle {
  hook: string;
  /** Qué idea trabaja el anuncio. */
  angle: string;
  /** Cómo se grabaría. */
  format: string;
  /** A quién va dirigido. */
  audience: string;
}

/** Pregunta que la IA hace antes de pasar el contacto, con el porqué. */
export interface QualifyQuestion { q: string; why: string }

/** Ficha de ejemplo del contacto que le llega al negocio ya filtrado. */
export interface LeadCard {
  name: string;
  source: string;
  fields: { k: string; v: string }[];
  status: string;
}

export interface Qualify {
  lead: string;
  questions: QualifyQuestion[];
  card: LeadCard;
}

export interface FunnelStep { icon: IconName; title: string; text: string }

/** Franja de la jornada de grabación. */
export interface ShootSlot { time: string; title: string; text: string }

export type PostKind = 'Reel' | 'Carrusel' | 'Historia' | 'Directo';
/** Publicación de un mes de ejemplo; `day` va de 1 a 28 (cuatro semanas, de lunes a domingo). */
export interface CalendarPost { day: number; kind: PostKind; title: string }

export interface CompareRow { feature: string; a: string; b: string }

/** Mensaje de la bandeja simulada y lo que hace la IA con él. */
export interface TriageItem { from: string; text: string; tag: 'Oportunidad' | 'Duda' | 'Comentario' | 'Para una persona'; action: string }

export interface Point { icon: IconName; title: string; text: string }
export interface Numbered { title: string; text: string }
