// Routing Middleware de Vercel (se ejecuta antes de la caché, en cualquier framework).
// Si un agente pide la página con `Accept: text/markdown`, devuelve su versión Markdown (dist/md/…).
// Un navegador normal no se ve afectado. Las reescrituras de vercel.json no sirven aquí porque los
// archivos estáticos se resuelven antes que ellas.
import { next, rewrite } from '@vercel/functions';

export const config = {
  matcher: ['/((?!md/|_astro/|brand/|img/|audio/|video/|api/)[^.]*)'],
};

export default function middleware(request: Request) {
  const accept = request.headers.get('accept') ?? '';
  if (!/text\/markdown/i.test(accept)) return next();
  const url = new URL(request.url);
  const path = url.pathname.replace(/\/+$/, '');
  url.pathname = path === '' ? '/md/index.md' : `/md${path}.md`;
  return rewrite(url);
}
