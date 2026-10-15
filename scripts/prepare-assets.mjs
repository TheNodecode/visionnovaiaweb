// Script de un solo uso (ya ejecutado): generó los recursos que hoy viven en public/
// (logos, icono táctil, imagen OG, foto del fundador, audios de la demo y vídeo del hero).
// La foto y los audios salían de la web antigua (legacy/), que ya se ha eliminado: esos pasos
// se han quitado y los archivos generados siguen en public/img y public/audio.
// Si hay que regenerar los logos: LOGO_DIR=<carpeta con 3.png y 4.png> npm run assets
import { execFileSync } from 'node:child_process';
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import sharp from 'sharp';
import ffmpeg from 'ffmpeg-static';

const SRC = process.env.LOGO_DIR; // carpeta con 3.png (icono) y 4.png (horizontal)
mkdirSync('public/brand', { recursive: true });
mkdirSync('public/video', { recursive: true });
mkdirSync('public/img', { recursive: true });

await sharp(`${SRC}/3.png`).resize(512).webp({ quality: 88 }).toFile('public/brand/logo-icon.webp');
await sharp(`${SRC}/3.png`).resize(180).png().toFile('public/apple-touch-icon.png');
await sharp(`${SRC}/4.png`).resize(1600).webp({ quality: 86 }).toFile('public/brand/logo-horizontal.webp');
await sharp(`${SRC}/4.png`).resize(1200, 630, { fit: 'cover' }).jpeg({ quality: 85 }).toFile('public/brand/og-default.jpg');

const res = await fetch('https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_080021_d598092b-c4c2-4e53-8e46-94cf9064cd50.mp4');
writeFileSync('public/video/hero-src.mp4', Buffer.from(await res.arrayBuffer()));
// 1280 px, sin audio y CRF 25: ~230 KB en lugar de 2,1 MB (va al 60 % de opacidad bajo un velo)
execFileSync(ffmpeg, ['-y', '-i', 'public/video/hero-src.mp4', '-vf', 'scale=1280:-2', '-c:v', 'libx264', '-preset', 'slow', '-crf', '25', '-tune', 'grain',
  '-pix_fmt', 'yuv420p', '-an', '-movflags', '+faststart', 'public/video/hero.mp4']);
rmSync('public/video/hero-src.mp4');
execFileSync(ffmpeg, ['-y', '-ss', '1', '-i', 'public/video/hero.mp4', '-frames:v', '1', '-update', '1', '-q:v', '4', 'public/video/hero-poster.jpg']);
