// Medios de la web. Los originales viven en assets-src/ y se exportan con
// `node scripts/brand-assets.mjs`; cuando lleguen vídeos reales, solo hay que tocar este archivo.

/** Cliente actual real. No se publica ningún resultado ni cifra suya. */
export const CLIENT = { name: 'CEM Valderas', sector: 'Clínica dental', instagram: 'cemvalderas.clinica' } as const;

export interface Picture { src: string; alt: string; width: number; height: number }
/** `src` es el cartel (WebP); si hay `video`, el cartel se muestra hasta que el clip entra en pantalla. */
export interface ClientPiece { src: string; alt: string; label: string; width: number; height: number; srcset?: string; video?: string }

/** Foto real detrás de cámaras: Stiven encuadrando una toma en casa de un cliente. */
export const BTS_PHOTO: Picture & { fallback: string } = {
  src: '/img/clientes/stiven-detras-de-camaras.webp',
  fallback: '/img/clientes/stiven-detras-de-camaras.jpg',
  alt: 'Stiven González encuadra la cámara sobre un trípode en un salón luminoso antes de grabar',
  width: 948,
  height: 1659,
};

const clip = (id: string, label: string, alt: string): ClientPiece => ({
  src: `/img/cem/cem-${id}.webp`, video: `/video/cem/cem-${id}.mp4`, width: 540, height: 960, label, alt,
});

/** Clips reales de CEM Valderas (12 s, 540×960, sin audio). Selección sin pacientes: solo el equipo y la clínica. */
export const CEM_CLIPS = {
  premium: clip('premium', 'Anuncio: «Esta clínica no es para todos»', 'Anuncio en vídeo de CEM Valderas: el doctor, con el rótulo de la clínica a su espalda, explica cómo trabajan, con subtítulos'),
  despacho: clip('despacho', 'El doctor da la cara', 'El doctor de CEM Valderas habla a cámara desde su despacho, con subtítulos'),
  emocional: clip('emocional', 'Explicado desde su consulta', 'El doctor de CEM Valderas habla a cámara sentado en el gabinete, con subtítulos'),
  hueso: clip('hueso', 'Motion graphics para anuncios', 'Pieza animada de CEM Valderas: «cuando falta un diente, los demás se mueven», con el doctor y rótulos animados'),
  escaner: clip('escaner', 'Rótulos animados sobre el escáner 3D', 'Pieza de CEM Valderas con el doctor y animaciones sobre el escáner 3D'),
  padres: clip('padres', 'Ortodoncia infantil, explicada', 'Pieza de CEM Valderas con la doctora y rótulos animados sobre lo que ven los padres antes de empezar una ortodoncia'),
} as const;

/** Creatividades gráficas reales de CEM Valderas (anuncios y carruseles). Las ofertas y los textos son de la clínica. */
export const CEM_ADS: ClientPiece[] = [
  { src: '/img/cem/ad-honesto.webp', width: 800, height: 1055, label: 'Anuncio · «Esto no es lo más barato. Es lo más honesto»', alt: 'Creatividad de CEM Valderas: un doctor trabaja con lupas y el titular «Esto no es lo más barato. Es lo más honesto»' },
  { src: '/img/cem/ad-sonreir.webp', width: 800, height: 800, label: 'Anuncio · «¿Cuántas fotos tienes donde sonríes de verdad?»', alt: 'Creatividad de CEM Valderas con una mujer sonriendo y el titular «¿Cuántas fotos tienes donde sonríes de verdad?»' },
  { src: '/img/cem/ad-miedo.webp', width: 800, height: 800, label: 'Anuncio · «¿Cuánto llevas sin sonreír de verdad?»', alt: 'Creatividad de CEM Valderas con una mujer sonriendo y el titular «¿Cuánto llevas sin sonreír de verdad?»' },
  { src: '/img/cem/carrusel-mitos.webp', width: 800, height: 1000, label: 'Carrusel educativo · «Falso o correcto»', alt: 'Portada de un carrusel de CEM Valderas: «Falso o correcto: 6 cosas que crees saber de tus dientes»' },
  { src: '/img/cem/carrusel-chatgpt.webp', width: 800, height: 1000, label: 'Carrusel educativo · «Que te lo mire un dentista»', alt: 'Portada de un carrusel de CEM Valderas: «Pregunta a ChatGPT qué tienes en la boca. Que te lo mire un dentista»' },
];

/** Fotos reales de la clínica (sin personas): dónde grabamos. */
export const CEM_CLINIC: ClientPiece[] = [
  { src: '/img/cem/clinica-recepcion.webp', width: 900, height: 1200, label: 'Recepción', alt: 'Recepción de la clínica CEM Valderas, con el mostrador blanco y el rótulo en la pared' },
  { src: '/img/cem/clinica-sala-estar.webp', width: 900, height: 1200, label: 'Sala de estar', alt: 'Sala de estar de CEM Valderas con sofás de bouclé, luz cálida y una planta' },
  { src: '/img/cem/clinica-gabinete.webp', width: 1100, height: 728, label: 'Gabinete', alt: 'Gabinete de CEM Valderas con el sillón azul y el equipo, con mucha luz natural' },
  { src: '/img/cem/clinica-sala-espera.webp', width: 900, height: 1592, label: 'Sala de espera', alt: 'Sala de espera de CEM Valderas con sillas grises y el logotipo de la clínica en la pared' },
];

/** Anuncios en vídeo. */
export const CLIENT_ADS: ClientPiece[] = [CEM_CLIPS.premium, CEM_CLIPS.hueso];

/** Vídeos del doctor hablando a cámara, con subtítulos. */
export const CLIENT_REELS: ClientPiece[] = [CEM_CLIPS.despacho, CEM_CLIPS.emocional, CEM_CLIPS.escaner];

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
export const CONTENT_REELS: Reel[] = [...CLIENT_REELS, CEM_CLIPS.padres, CEM_CLIPS.premium].map((r) => ({ src: r.video, poster: r.src, label: r.label, alt: r.alt }));

/** Captura real de NØVA. Sin imagen, se dibuja un panel de ejemplo en HTML. */
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
  { ...CEM_CLIPS.hueso, label: 'Anuncio en Meta' },
  BTS_PHOTO_SMALL,
  { ...CEM_CLIPS.despacho, label: 'El doctor a cámara' },
];
