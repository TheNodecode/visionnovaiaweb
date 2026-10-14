// Medios de la web. Cuando lleguen los vídeos reales, solo hay que tocar este archivo.

/** Vídeo detrás de cámaras (sección que crece tras el hero). Sin vídeo, se muestra el póster. */
export const HERO_BTS_VIDEO: string | undefined = undefined;
export const HERO_BTS_POSTER = '/video/hero-poster.jpg';

export interface Reel { src?: string; poster: string; label: string }
export const CONTENT_REELS: Reel[] = [
  { poster: '/video/hero-poster.jpg', label: 'El equipo da la cara' },
  { poster: '/video/hero-poster.jpg', label: 'Tu servicio, explicado en 30 s' },
  { poster: '/video/hero-poster.jpg', label: 'Detrás de cámaras' },
];

/** Captura real de CRM Nova. Sin imagen, se dibuja un panel de ejemplo en HTML. */
export const CRM_IMAGE: string | undefined = undefined;

export interface AudioDemo { src: string; label: string; sector: string }
export const AUDIO_DEMOS: AudioDemo[] = [
  { src: '/audio/demo-dental.mp3', label: 'Clínica dental', sector: 'dental' },
  { src: '/audio/demo-dental-2.mp3', label: 'Clínica dental (2)', sector: 'dental' },
  { src: '/audio/demo-dental-alameda.mp3', label: 'Clínica dental Alameda', sector: 'dental' },
  { src: '/audio/demo-estetica.mp3', label: 'Medicina estética', sector: 'estetica' },
  { src: '/audio/demo-fisio.mp3', label: 'Fisioterapia', sector: 'fisioterapia' },
  { src: '/audio/demo-constructora.mp3', label: 'Constructora', sector: 'reformas' },
  { src: '/audio/demo-juridico.mp3', label: 'Despacho jurídico', sector: 'juridico' },
  { src: '/audio/demo-abogado-laboral.mp3', label: 'Abogado laboralista', sector: 'juridico' },
  { src: '/audio/demo-pizza.mp3', label: 'Pizzería', sector: 'restauracion' },
];
