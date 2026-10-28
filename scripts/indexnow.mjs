// Avisa a Bing/Yandex/Seznam (IndexNow) de las URLs del sitemap. Bing es una de las fuentes de algunos asistentes de IA (p. ej. Copilot).
// Google NO usa IndexNow: para Google, envía el sitemap en Search Console. Ejecutar DESPUÉS de desplegar.
import { readFileSync } from 'node:fs';
const KEY = '2b84a1b5f6fac3f8a207b9408babb74a';
const HOST = 'www.visionnovaia.com';
const xml = readFileSync('dist/sitemap-0.xml', 'utf8');
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
});
console.log(`IndexNow: ${urlList.length} URLs enviadas → HTTP ${res.status}`);
