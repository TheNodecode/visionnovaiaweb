import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://www.visionnovaia.com',
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
    // Las hojas de estilo de componentes de cada página (≤ 20 KB; la de la home ronda 14 KB) van en línea: una petición
    // menos que bloquee el primer pintado. El resto de recursos sigue el límite por defecto (4 KB).
    build: { assetsInlineLimit: (file, content) => (file.endsWith('.css') ? content.length < 20480 : undefined) },
  },
});
