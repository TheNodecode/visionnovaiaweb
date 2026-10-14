import { execFileSync } from 'node:child_process';
import { mkdirSync, readdirSync, writeFileSync } from 'node:fs';
import sharp from 'sharp';
import ffmpeg from 'ffmpeg-static';

const SRC = process.env.LOGO_DIR; // carpeta con 3.png (icono) y 4.png (horizontal)
mkdirSync('public/brand', { recursive: true });
mkdirSync('public/audio', { recursive: true });
mkdirSync('public/video', { recursive: true });
mkdirSync('public/img', { recursive: true });

await sharp(`${SRC}/3.png`).resize(512).webp({ quality: 88 }).toFile('public/brand/logo-icon.webp');
await sharp(`${SRC}/3.png`).resize(180).png().toFile('public/apple-touch-icon.png');
await sharp(`${SRC}/4.png`).resize(1600).webp({ quality: 86 }).toFile('public/brand/logo-horizontal.webp');
await sharp(`${SRC}/4.png`).resize(1200, 630, { fit: 'cover' }).jpeg({ quality: 85 }).toFile('public/brand/og-default.jpg');
await sharp('legacy/assets/img/fundador.jpeg').resize(900).jpeg({ quality: 82 }).toFile('public/img/fundador.jpg');

for (const f of readdirSync('legacy/assets/audio')) {
  if (!/\.(wav|mp3)$/.test(f)) continue;
  const out = `public/audio/${f.replace(/\.(wav|mp3)$/, '.mp3')}`;
  execFileSync(ffmpeg, ['-y', '-i', `legacy/assets/audio/${f}`, '-ac', '1', '-b:a', '64k', out]);
}

const res = await fetch('https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_080021_d598092b-c4c2-4e53-8e46-94cf9064cd50.mp4');
writeFileSync('public/video/hero.mp4', Buffer.from(await res.arrayBuffer()));
execFileSync(ffmpeg, ['-y', '-ss', '1', '-i', 'public/video/hero.mp4', '-frames:v', '1', '-update', '1', '-q:v', '4', 'public/video/hero-poster.jpg']);
