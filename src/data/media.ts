// Medios de la web. Los originales viven en assets-src/ y se exportan con
// `node scripts/brand-assets.mjs`; cuando lleguen vídeos reales, solo hay que tocar este archivo.

/** Cliente actual real. No se publica ningún resultado ni cifra suya. */
export const CLIENT = { name: 'CEM Valderas', sector: 'Clínica dental', instagram: 'cemvalderas.clinica' } as const;

export interface Picture { src: string; alt: string; width: number; height: number }
export interface ClientPiece { src: string; alt: string; label: string; width: number; height: number; srcset?: string }

/** Foto real detrás de cámaras: Stiven encuadrando una toma en casa de un cliente. */
export const BTS_PHOTO: Picture & { fallback: string } = {
  src: '/img/clientes/stiven-detras-de-camaras.webp',
  fallback: '/img/clientes/stiven-detras-de-camaras.jpg',
  alt: 'Stiven González encuadra la cámara sobre un trípode en un salón luminoso antes de grabar',
  width: 948,
  height: 1659,
};

/** Anuncios reales de CEM Valderas (capturas de Instagram; los precios son de la clínica). */
export const CLIENT_ADS: ClientPiece[] = [
  {
    src: '/img/clientes/cem-anuncio-dientes-story.webp', width: 179, height: 327,
    label: 'Anuncio en historia',
    alt: 'Anuncio de CEM Valderas en historias de Instagram: «Recupera tus dientes en un solo día», con fotos de antes y después de una sonrisa',
  },
  {
    src: '/img/clientes/cem-anuncio-dientes-reel.webp', width: 177, height: 359,
    label: 'Anuncio en reels',
    alt: 'El mismo anuncio de CEM Valderas adaptado a reels, con el antes y el después y el botón para pedir valoración',
  },
];

/** Vídeos reales del doctor de CEM Valderas hablando a cámara, con subtítulos. */
export const CLIENT_REELS: ClientPiece[] = [
  {
    src: '/img/clientes/cem-doctor-anuncio.webp', width: 311, height: 558,
    label: 'El doctor da la cara',
    alt: 'El doctor de CEM Valderas habla a cámara en la clínica, con subtítulos, en un anuncio de Instagram con botón «Reservar»',
  },
  {
    src: '/img/clientes/cem-doctor-despacho.webp', width: 287, height: 567,
    label: 'Explicado desde su consulta',
    alt: 'El doctor de CEM Valderas sentado en su despacho explica un tratamiento a cámara, con subtítulos',
  },
  {
    src: '/img/clientes/cem-doctor-recepcion.webp', width: 180, height: 358,
    label: 'Grabado en su clínica',
    alt: 'El doctor de CEM Valderas habla a cámara en la recepción de la clínica, con subtítulos',
  },
];

/** El detrás de cámaras en tamaño de móvil (300/440 px de ancho) para marcos pequeños. */
export const BTS_PHOTO_SMALL: ClientPiece = {
  src: '/img/clientes/stiven-detras-de-camaras-440.webp',
  srcset: '/img/clientes/stiven-detras-de-camaras-300.webp 300w, /img/clientes/stiven-detras-de-camaras-440.webp 440w',
  width: 440, height: 770, label: 'Detrás de cámaras', alt: BTS_PHOTO.alt,
};

/** Vídeo detrás de cámaras (sección que crece tras el hero). Sin vídeo, se muestra la foto real. */
export const HERO_BTS_VIDEO: string | undefined = undefined;
export const HERO_BTS_POSTER = BTS_PHOTO.src;

export interface Reel { src?: string; poster: string; label: string; alt?: string }
/** Piezas del muro de contenido: el material real del cliente. */
export const CONTENT_REELS: Reel[] = CLIENT_REELS.map((r) => ({ poster: r.src, label: r.label, alt: r.alt }));

/** Captura real de CRM Nova. Sin imagen, se dibuja un panel de ejemplo en HTML. */
export const CRM_IMAGE: string | undefined = undefined;

export interface AudioDemo { src: string; label: string; sector: string }
export const AUDIO_DEMOS: AudioDemo[] = [
  { src: '/audio/demo-dental.mp3', label: 'Clínica dental', sector: 'dental' },
  { src: '/audio/demo-dental-2.mp3', label: 'Clínica dental (2)', sector: 'dental' },
  { src: '/audio/demo-dental-alameda.mp3', label: 'Clínica dental (3)', sector: 'dental' },
  { src: '/audio/demo-estetica.mp3', label: 'Medicina estética', sector: 'estetica' },
  { src: '/audio/demo-fisio.mp3', label: 'Fisioterapia', sector: 'fisioterapia' },
  { src: '/audio/demo-constructora.mp3', label: 'Constructora', sector: 'reformas' },
  { src: '/audio/demo-juridico.mp3', label: 'Despacho jurídico', sector: 'juridico' },
  { src: '/audio/demo-abogado-laboral.mp3', label: 'Abogado laboralista', sector: 'juridico' },
  { src: '/audio/demo-pizza.mp3', label: 'Pizzería', sector: 'restauracion' },
];

/** Composición de móviles del hero: material real de CEM Valderas y el detrás de cámaras. */
export const HERO_PHONES: ClientPiece[] = [
  { ...CLIENT_ADS[1], label: 'Anuncio en Meta' },
  BTS_PHOTO_SMALL,
  { ...CLIENT_REELS[0], label: 'El doctor a cámara' },
];
