// Genera los recursos de marca y de clientes a partir de los originales de assets-src/.
//   node scripts/brand-assets.mjs            → escribe en public/
//   PREVIEW=<carpeta> node scripts/...       → además compone vistas previas sobre negro y crema
//
// Recorte del logo: el fondo es un degradado oscuro, así que primero se estima ese fondo
// (apertura morfológica a baja resolución + desenfoque), se resta, y el alfa sale del brillo
// restante con una rampa suave. El color se des-premultiplica para que los bordes dorados
// no se ensucien al ponerlos sobre crema.
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import sharp from 'sharp';

const PREVIEW = process.env.PREVIEW;
const OUT = 'public/brand';
mkdirSync(OUT, { recursive: true });
mkdirSync('public/img/clientes', { recursive: true });

/** Mínimo (o máximo) separable en una ventana cuadrada de radio r sobre un canal float. */
function rankFilter(src, w, h, r, pick) {
  const tmp = new Float32Array(w * h), out = new Float32Array(w * h);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    let m = src[y * w + x];
    for (let k = Math.max(0, x - r); k <= Math.min(w - 1, x + r); k++) m = pick(m, src[y * w + k]);
    tmp[y * w + x] = m;
  }
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    let m = tmp[y * w + x];
    for (let k = Math.max(0, y - r); k <= Math.min(h - 1, y + r); k++) m = pick(m, tmp[k * w + x]);
    out[y * w + x] = m;
  }
  return out;
}

/** Desenfoque casi gaussiano (tres pasadas de caja separables) sobre un canal float. */
function blurF(src, w, h, r) {
  let a = src;
  for (let pass = 0; pass < 3; pass++) {
    const t = new Float32Array(w * h), o = new Float32Array(w * h);
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      let s = 0, n = 0;
      for (let k = Math.max(0, x - r); k <= Math.min(w - 1, x + r); k++) { s += a[y * w + k]; n++; }
      t[y * w + x] = s / n;
    }
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      let s = 0, n = 0;
      for (let k = Math.max(0, y - r); k <= Math.min(h - 1, y + r); k++) { s += t[k * w + x]; n++; }
      o[y * w + x] = s / n;
    }
    a = o;
  }
  return a;
}

/**
 * Fondo estimado a tamaño completo (RGB). A 1/f de resolución: la apertura morfológica da una
 * primera aproximación; después se marca como contenido lo que sobresale de ella y el fondo se
 * rellena con un desenfoque normalizado de los píxeles que no son contenido (varias iteraciones).
 */
async function estimateBackground(img, w, h, f, r) {
  const sw = Math.round(w / f), sh = Math.round(h / f), n = sw * sh;
  const small = await sharp(img, { raw: { width: w, height: h, channels: 3 } }).resize(sw, sh, { fit: 'fill' }).raw().toBuffer();
  const ch = [0, 1, 2].map((c) => { const a = new Float32Array(n); for (let i = 0; i < n; i++) a[i] = small[i * 3 + c]; return a; });
  const lum = new Float32Array(n);
  for (let i = 0; i < n; i++) lum[i] = Math.max(ch[0][i], ch[1][i], ch[2][i]);
  const bgL = blurF(rankFilter(rankFilter(lum, sw, sh, r, Math.min), sw, sh, r, Math.max), sw, sh, Math.ceil(r / 3));
  let bg = ch;
  for (let it = 0; it < 3; it++) {
    const keep = new Float32Array(n);
    for (let i = 0; i < n; i++) keep[i] = lum[i] - bgL[i] > 6 ? 0 : 1;
    const kd = rankFilter(keep, sw, sh, 2, Math.min); // ensancha la máscara de contenido
    const wsum = blurF(kd, sw, sh, r);
    bg = ch.map((a) => {
      const m = new Float32Array(n);
      for (let i = 0; i < n; i++) m[i] = a[i] * kd[i];
      const b = blurF(m, sw, sh, r);
      for (let i = 0; i < n; i++) b[i] = wsum[i] > 1e-3 ? b[i] / wsum[i] : 0;
      return b;
    });
    for (let i = 0; i < n; i++) bgL[i] = Math.max(bg[0][i], bg[1][i], bg[2][i]);
  }
  const merged = Buffer.alloc(n * 3);
  for (let i = 0; i < n; i++) for (let c = 0; c < 3; c++) merged[i * 3 + c] = Math.round(bg[c][i]);
  return sharp(merged, { raw: { width: sw, height: sh, channels: 3 } }).resize(w, h, { fit: 'fill', kernel: 'cubic' }).raw().toBuffer();
}

/** Recorta una región del original y devuelve RGBA con el fondo eliminado. */
// El fondo se estima sobre la región ampliada M px por cada lado para que los bordes del
// recorte no sesguen la estimación (el resplandor de las esquinas dejaba manchas).
// `solid(x, y)`: zona donde los huecos interiores (sombreado oscuro del oro) se rellenan opacos.
async function cutOut(file, region, { f = 8, r = 20, lo = 14, ramp = 44, mask, solid, M = 320 } = {}) {
  const meta = await sharp(file).metadata();
  const L = Math.max(0, region.left - M), T = Math.max(0, region.top - M);
  const R = Math.min(meta.width, region.left + region.width + M), B = Math.min(meta.height, region.top + region.height + M);
  const ew = R - L, eh = B - T;
  const { data: img } = await sharp(file).removeAlpha().extract({ left: L, top: T, width: ew, height: eh }).raw().toBuffer({ resolveWithObject: true });
  const bg = await estimateBackground(img, ew, eh, f, r);
  const w = region.width, h = region.height, ox = region.left - L, oy = region.top - T;
  const out = Buffer.alloc(w * h * 4);
  const orig = Buffer.alloc(w * h * 3);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const i = y * w + x, j = (y + oy) * ew + x + ox;
    for (let c = 0; c < 3; c++) orig[i * 3 + c] = img[j * 3 + c];
    const fr = Math.max(0, img[j * 3] - bg[j * 3]);
    const fg = Math.max(0, img[j * 3 + 1] - bg[j * 3 + 1]);
    const fb = Math.max(0, img[j * 3 + 2] - bg[j * 3 + 2]);
    const v = Math.max(fr, fg, fb);
    let a = Math.min(1, Math.max(0, (v - lo) / ramp));
    a = a * a * (3 - 2 * a); // smoothstep: bordes suaves sin halo
    if (mask && mask(x, y)) a = 0;
    // Des-premultiplicar: el color visible es el píxel sin el fondo, escalado al alfa.
    const k = a > 0 ? 1 / Math.max(a, v / 255) : 0;
    // Las sombras proyectadas del original salen marrón oscuro semitransparente (mancha sobre
    // crema): todo lo que, ya des-premultiplicado, sigue siendo oscuro pierde opacidad.
    if (a < 1 && v * k < 140) a *= Math.max(0, (v * k - 60) / 80);
    out[i * 4] = Math.min(255, Math.round(fr * k));
    out[i * 4 + 1] = Math.min(255, Math.round(fg * k));
    out[i * 4 + 2] = Math.min(255, Math.round(fb * k));
    out[i * 4 + 3] = Math.round(a * 255);
  }
  if (solid) fillHoles(out, orig, w, h, solid);
  return trim(out, w, h);
}

/** Lo que no se alcanza desde el borde por píxeles casi transparentes es interior: opaco. */
function fillHoles(out, orig, w, h, solid) {
  const outside = new Float32Array(w * h);
  const stack = [];
  const push = (x, y) => {
    const i = y * w + x;
    if (outside[i] || out[i * 4 + 3] >= 128) return;
    outside[i] = 1; stack.push(i);
  };
  for (let x = 0; x < w; x++) { push(x, 0); push(x, h - 1); }
  for (let y = 0; y < h; y++) { push(0, y); push(w - 1, y); }
  while (stack.length) {
    const i = stack.pop(), x = i % w, y = (i - x) / w;
    if (x > 0) push(x - 1, y); if (x < w - 1) push(x + 1, y);
    if (y > 0) push(x, y - 1); if (y < h - 1) push(x, y + 1);
  }
  const near = rankFilter(outside, w, h, 3, Math.max); // conserva el borde suave
  for (let i = 0; i < w * h; i++) {
    if (near[i] || !solid(i % w, Math.floor(i / w))) continue;
    for (let c = 0; c < 3; c++) out[i * 4 + c] = orig[i * 3 + c];
    out[i * 4 + 3] = 255;
  }
}

/** Recorta al rectángulo con contenido (alfa > 10) dejando un margen pequeño. */
function trim(buf, w, h, pad = 12) {
  let x0 = w, y0 = h, x1 = -1, y1 = -1;
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    if (buf[(y * w + x) * 4 + 3] > 10) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
  }
  x0 = Math.max(0, x0 - pad); y0 = Math.max(0, y0 - pad); x1 = Math.min(w - 1, x1 + pad); y1 = Math.min(h - 1, y1 + pad);
  const tw = x1 - x0 + 1, th = y1 - y0 + 1, out = Buffer.alloc(tw * th * 4);
  for (let y = 0; y < th; y++) buf.copy(out, y * tw * 4, ((y + y0) * w + x0) * 4, ((y + y0) * w + x1 + 1) * 4);
  return { data: out, width: tw, height: th };
}

const raw = (c) => sharp(c.data, { raw: { width: c.width, height: c.height, channels: 4 } });

async function emit(cut, name, height, { png = true } = {}) {
  const r = raw(cut).resize({ height, kernel: 'lanczos3' });
  const webp = await r.clone().webp({ quality: 92, alphaQuality: 100, effort: 6 }).toFile(`${OUT}/${name}.webp`);
  if (png) await r.clone().png({ compressionLevel: 9, palette: false }).toFile(`${OUT}/${name}.png`);
  console.log(`${name}: ${webp.width}×${webp.height}, ${(webp.size / 1024).toFixed(1)} KB`);
  if (PREVIEW) {
    for (const [bgName, bg] of [['oscuro', '#0a0a0a'], ['crema', '#F4EFE6']]) {
      const buf = await r.clone().png().toBuffer();
      const m = await sharp(buf).metadata();
      await sharp({ create: { width: m.width + 80, height: m.height + 80, channels: 3, background: bg } })
        .composite([{ input: buf, left: 40, top: 40 }]).png().toFile(`${PREVIEW}/${name}-${bgName}.png`);
    }
  }
  return webp;
}

// ── Logo horizontal (3840×2160): estrella + divisor + VISIÓN NOVA + lema ──
const H_FILE = 'assets-src/marca/logo-horizontal-original.png';
const H_REGION = { left: 340, top: 520, width: 3200, height: 1110 };
const full = await cutOut(H_FILE, H_REGION, { r: 12, solid: (x) => x < 1180 - H_REGION.left });
await emit(full, 'logo-horizontal', 300); // pie: con lema
// Cabecera: sin la línea del lema (a la derecha del divisor), la estrella queda entera.
const noTag = await cutOut(H_FILE, H_REGION, { r: 12, solid: (x) => x < 1180 - H_REGION.left, mask: (x, y) => x > 1300 - H_REGION.left && y > 1205 - H_REGION.top });
await emit(noTag, 'logo-horizontal-sin-lema', 168);

// Variante tinta para secciones claras (crema): VISIÓN (blanco) pasa a tinta #0a0a0a y el oro
// se lleva a gold-600 (#b8862f) conservando su sombreado. Todavía no se usa en la web.
function inkVariant(c) {
  const d = Buffer.from(c.data);
  for (let i = 0; i < d.length; i += 4) {
    if (!d[i + 3]) continue;
    const r = d[i], g = d[i + 1], b = d[i + 2], mx = Math.max(r, g, b), mn = Math.min(r, g, b);
    // Solo las letras pasan a tinta; los brillos casi blancos de la estrella (a la izquierda
    // del divisor, ~25 % del ancho) siguen siendo oro.
    const inWordmark = (i / 4) % c.width > c.width * 0.25;
    if (inWordmark && (mx === 0 || (mx - mn) / mx < 0.22)) { d[i] = d[i + 1] = d[i + 2] = 10; continue; }
    const k = Math.min(1.12, Math.max(0.62, 0.45 + 0.7 * (mx / 255)));
    d[i] = Math.min(255, Math.round(184 * k)); d[i + 1] = Math.min(255, Math.round(134 * k)); d[i + 2] = Math.min(255, Math.round(47 * k));
  }
  return { ...c, data: d };
}
await emit(inkVariant(full), 'logo-horizontal-ink', 300, { png: false });
await emit(inkVariant(noTag), 'logo-horizontal-sin-lema-ink', 168, { png: false });

// ── Estrella sola, del icono cuadrado (3840²), con más detalle ──
const I_FILE = 'assets-src/marca/logo-icono-original.png';
const star = await cutOut(I_FILE, { left: 860, top: 440, width: 2160, height: 2480 }, { f: 16, r: 12, lo: 24, solid: () => true, mask: (x, y) => x < 320 && y < 760 });
await emit(star, 'logo-star', 512, { png: false });

// Favicon PNG (32) e icono táctil (180) a partir de la estrella, sobre fondo tinta.
async function icon(size, file, radius) {
  const inner = Math.round(size * 0.82);
  const s = await raw(star).resize({ height: inner, width: inner, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
  const plate = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${radius}" fill="#0a0a0a"/></svg>`);
  await sharp(plate).composite([{ input: s, gravity: 'center' }]).png({ compressionLevel: 9 }).toFile(file);
}
await icon(32, 'public/favicon-32.png', 7);
await icon(180, 'public/apple-touch-icon.png', 0); // iOS ya redondea las esquinas
await icon(128, `${OUT}/logo-star-plate.png`, 28); // insignia (56 CSS px a 2×)
// favicon.svg: el mismo icono (64 px, nítido en pantallas 2×) incrustado, para los navegadores
// que prefieren SVG y para los consumidores que ya apuntaban a /favicon.svg.
await icon(64, 'public/favicon-64.tmp.png', 14);
const fav64 = readFileSync('public/favicon-64.tmp.png').toString('base64');
rmSync('public/favicon-64.tmp.png');
writeFileSync('public/favicon.svg',
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><image width="64" height="64" href="data:image/png;base64,${fav64}"/></svg>
`);

// ── Material real de clientes ──
const C = 'assets-src/clientes';
for (const name of ['cem-anuncio-dientes-story', 'cem-anuncio-dientes-reel', 'cem-doctor-recepcion', 'cem-doctor-despacho', 'cem-doctor-anuncio']) {
  const info = await sharp(`${C}/${name}.png`).removeAlpha().webp({ quality: 88 }).toFile(`public/img/clientes/${name}.webp`);
  console.log(`${name}: ${info.width}×${info.height}, ${(info.size / 1024).toFixed(1)} KB`);
}
// Foto detrás de cámaras: 948×1659 a tamaño nativo (ocupa media pantalla en escritorio: no se reduce).
const bts = sharp(`${C}/stiven-detras-de-camaras.png`).removeAlpha();
for (const [ext, enc] of [['webp', (s) => s.webp({ quality: 82 })], ['jpg', (s) => s.jpeg({ quality: 80, mozjpeg: true })]]) {
  const info = await enc(bts.clone()).toFile(`public/img/clientes/stiven-detras-de-camaras.${ext}`);
  console.log(`bts.${ext}: ${info.width}×${info.height}, ${(info.size / 1024).toFixed(1)} KB`);
}
