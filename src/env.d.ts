/// <reference types="astro/client" />

// Optional: extend typing for our custom env var
interface ImportMetaEnv {
  readonly PUBLIC_BASE_URL?: string;
  readonly VITE_BASE_URL?: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
