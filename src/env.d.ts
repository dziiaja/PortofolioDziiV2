// src/env.d.ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string;
    // Tambahkan variabel environment lain yang Anda gunakan
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }