// Nous définissons ici les types pour l'environnement Vite, 
// afin de pouvoir accéder aux variables d'environnement de manière typée dans notre application.
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_GOOGLE_MAPS_API_KEY: string;
  readonly VITE_FEDAPAY_PUBLIC_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
