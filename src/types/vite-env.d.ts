/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GITHUB_USER: string;
  readonly VITE_GITHUB_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
