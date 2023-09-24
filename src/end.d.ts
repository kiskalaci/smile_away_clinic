/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_ENV: string
    readonly VITE_HOST: string
    readonly VITE_DEV_HOST: string
    // more env variables...
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }