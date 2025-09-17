// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
const base = process.env.BASE_PATH || '/';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  base,
  integrations: [react()],
});
