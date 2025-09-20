// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// Support BASE_URL (preferred) and fallback to BASE_PATH for compatibility
const rawBaseUrl = process.env.BASE_URL || '';
let site;
let base = '/';

if (rawBaseUrl) {
  // Ensure protocol for URL parsing
  const withProtocol = rawBaseUrl.startsWith('http://') || rawBaseUrl.startsWith('https://')
    ? rawBaseUrl
    : `http://${rawBaseUrl}`;
  try {
    const url = new URL(withProtocol);
    site = `${url.protocol}//${url.host}${url.pathname}`.replace(/\/$/, '');
    base = url.pathname || '/';
  } catch {
    // If parsing fails, keep defaults
  }
}

// Legacy support if only BASE_PATH is provided
if (!rawBaseUrl && process.env.BASE_PATH) {
  base = process.env.BASE_PATH;
}

// Ensure base starts and ends with '/'
if (!base.startsWith('/')) base = `/${base}`;
if (!base.endsWith('/')) base = `${base}/`;

// https://astro.build/config
export default defineConfig({
  output: 'static',
  base,
  // Set site when provided to help with canonical URLs/sitemap
  ...(site ? { site } : {}),
  integrations: [react()],
});
