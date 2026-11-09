// Prepara el material real de CEM Valderas para la web: clips verticales de 12 s (540×960, sin audio, ~1 MB),
// carteles WebP, creatividades de anuncios y fotos de la clínica.
// Selección hecha a propósito SIN pacientes (nada del vídeo «testimonio», ni fotos con personas, ni antes/después).
// Uso: CEM_DIR="C:/Users/stive/Desktop/cem valderas" node scripts/cem-assets.mjs
import { spawnSync } from 'node:child_process';
import { mkdirSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';
import ffmpeg from 'ffmpeg-static';

const SRC = process.env.CEM_DIR ?? 'C:/Users/stive/Desktop/cem valderas';
const VID = 'public/video/cem';
const IMG = 'public/img/cem';
mkdirSync(VID, { recursive: true });
mkdirSync(IMG, { recursive: true });

// [id, archivo origen, segundo de inicio]
const clips = [
  ['premium', 'Cem Valderas ads v/_Esta clínica no es para todos_ — Ángulo C Premium.mp4', 0],
  ['despacho', 'Cem Valderas ads v/El problema no es que un buen implante.mp4', 0],
  ['emocional', 'Cem Valderas ads v/No va de dientes_ — Ángulo A Emocional.mp4', 0],
  ['hueso', 'ads videos oct/clip 1 hueso.mp4', 1],
  ['escaner', 'ads videos oct/clip 2 escaner.mp4', 1],
  ['padres', 'ads videos oct/Clip4 Simulación antes de empezar el tramiento que ve.mp4', 1],
];
for (const [id, file, ss] of clips) {
  const input = join(SRC, file);
  if (!existsSync(input)) { console.warn('FALTA', input); continue; }
  const out = join(VID, `cem-${id}.mp4`);
  const r = spawnSync(ffmpeg, ['-y', '-ss', String(ss), '-t', '12', '-i', input, '-vf', 'scale=540:-2,fps=24', '-an', '-c:v', 'libx264', '-crf', '29', '-preset', 'slow', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', out]);
  if (r.status !== 0) { console.error('ffmpeg falló en', id); continue; }
  // cartel: fotograma a los 1,5 s del clip ya recortado
  const poster = join(IMG, `cem-${id}.webp`);
  const png = join(IMG, `.tmp-${id}.png`);
  spawnSync(ffmpeg, ['-y', '-ss', '1.5', '-i', out, '-frames:v', '1', png]);
  await sharp(png).webp({ quality: 74, effort: 5 }).toFile(poster);
  console.log(id, (statSync(out).size / 1024) | 0, 'KB vídeo,', (statSync(poster).size / 1024) | 0, 'KB cartel');
}

// [id, archivo origen, ancho]
const stills = [
  ['ad-honesto', 'Cem Valderas ads v/esto no es lo mas barato.png', 800],
  ['ad-sonreir', 'Cem Valderas ads v/¿Cuántas fotos tienes donde de verdad.png', 800],
  ['ad-miedo', 'Cem Valderas ads v/¿Cuánto llevas sin sonreír de verdad (1).png', 800],
  ['carrusel-mitos', 'carrusel/carrusel 1 falso o correcto/1.jpg', 800],
  ['carrusel-chatgpt', 'carrusel chatgpt o/1.jpg', 800],
  ['clinica-sala-espera', 'fotos/IMG_1298.PNG', 900],
  ['clinica-gabinete', 'fotos/IMG_1331.PNG', 1100],
  ['clinica-recepcion', 'fotos/IMG_1336.PNG', 900],
  ['clinica-sala-estar', 'fotos/IMG_1341.PNG', 900],
];
for (const [id, file, w] of stills) {
  const input = join(SRC, file);
  if (!existsSync(input)) { console.warn('FALTA', input); continue; }
  const info = await sharp(input).resize({ width: w, withoutEnlargement: true }).webp({ quality: 78, effort: 5 }).toFile(join(IMG, `${id}.webp`));
  console.log(id, info.width + '×' + info.height, (info.size / 1024) | 0, 'KB');
}
