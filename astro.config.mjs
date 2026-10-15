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
    // Las hojas de estilo pequeñas de componentes (formulario, FAQ) van en línea: una petición
    // menos que bloquee el primer pintado. El resto de recursos sigue el límite por defecto (4 KB).
    build: { assetsInlineLimit: (file, content) => (file.endsWith('.css') ? content.length < 8192 : undefined) },
  },
});
