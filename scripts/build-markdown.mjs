// Genera, tras `astro build`, una versión Markdown de cada página (dist/md/<ruta>.md) y un
// dist/llms-full.txt con todo el contenido. Vercel la sirve cuando un agente pide
// `Accept: text/markdown` (ver vercel.json: rewrites + Vary: Accept).
import { readdirSync, readFileSync, writeFileSync, mkdirSync, statSync } from 'node:fs';
import { join, dirname, relative, sep } from 'node:path';
import { JSDOM } from 'jsdom';
import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';

const DIST = 'dist';
const SITE = 'https://www.visionnovaia.com';
const SKIP = new Set(['404.html']);

const walk = (dir) =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) return f === 'md' || f === '_astro' ? [] : walk(p);
    return p.endsWith('.html') && !SKIP.has(f) ? [p] : [];
  });

const td = new TurndownService({ headingStyle: 'atx', bulletListMarker: '-', codeBlockStyle: 'fenced', emDelimiter: '_' });
td.use(gfm);

function toMarkdown(html) {
  const dom = new JSDOM(html);
  const doc = dom.window.document;
  const title = doc.querySelector('title')?.textContent?.trim() ?? '';
  const description = doc.querySelector('meta[name="description"]')?.getAttribute('content') ?? '';
  const main = doc.querySelector('main');
  if (!main) return null;
  main
    .querySelectorAll('script, style, svg, form, button, template, noscript, video, audio, iframe, [aria-hidden="true"], [data-md-skip], [inert]')
    .forEach((el) => el.remove());
  main.querySelectorAll('img').forEach((img) => (img.getAttribute('alt') ? null : img.remove()));
  main.querySelectorAll('a[href]').forEach((a) => {
    const h = a.getAttribute('href');
    if (h.startsWith('/')) a.setAttribute('href', SITE + h);
    if (h.startsWith('#')) a.removeAttribute('href');
  });
  const body = td.turndown(main.innerHTML).replace(/\n{3,}/g, '\n\n').trim();
  return { title, description, body };
}

const pages = walk(DIST).sort();
const full = [];
let count = 0;
for (const file of pages) {
  const rel = relative(DIST, file).split(sep).join('/');
  const urlPath = rel === 'index.html' ? '/' : '/' + rel.replace(/\.html$/, '');
  const mdPath = rel === 'index.html' ? 'index.md' : rel.replace(/\.html$/, '.md');
  const md = toMarkdown(readFileSync(file, 'utf8'));
  if (!md) continue;
  const out = `---\ntitle: ${JSON.stringify(md.title)}\ndescription: ${JSON.stringify(md.description)}\nurl: ${SITE}${urlPath === '/' ? '/' : urlPath}\n---\n\n${md.body}\n`;
  const dest = join(DIST, 'md', mdPath);
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, out);
  count++;
  if (!/politica|terminos/.test(urlPath)) full.push(`# ${md.title}\nURL: ${SITE}${urlPath}\n\n${md.body}\n`);
}

const head = `# Visión Nova — contenido completo del sitio\n\n> Agencia de contenido, Meta Ads y captación con IA (sistema NovaScale y software Nova). Versión en texto de las páginas públicas de ${SITE}.\n\n`;
writeFileSync(join(DIST, 'llms-full.txt'), head + full.join('\n---\n\n'));
console.log(`[markdown] ${count} páginas → dist/md/ y dist/llms-full.txt`);
