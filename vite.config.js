/// <reference types="vitest/config" />
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";
// Nous définissons la configuration de Vite pour notre projet React avec TypeScript. 
// Nous utilisons le plugin React pour gérer les fichiers JSX et TSX, et 
// Nous configurons un alias pour simplifier les imports depuis le dossier "src". 
// Le serveur de développement est configuré pour écouter sur le port 5173. 
// De plus, nous configurons Vitest pour utiliser l'environnement "jsdom" pour les tests, avec des variables globales et un fichier de configuration de test spécifique.
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    server: {
        port: 5173,
    },
    test: {
        environment: "jsdom",
        globals: true,
        setupFiles: "./src/tests-setup.ts",
    },
});
