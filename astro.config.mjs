import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://aume.honey',
  integrations: [tailwind({ applyBaseStyles: false })],
  vite: {
    server: { fs: { strict: false } },
  },
});
