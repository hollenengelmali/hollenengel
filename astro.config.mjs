import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://hollenengel.ro',
  redirects: { '/': '/ro/' },
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'ro', locales: { ro: 'ro-RO', en: 'en-US' } },
    }),
  ],
  vite: { plugins: [tailwindcss()] },
});
