import axios from "axios";
import { env } from "./env";

// Ici nous configurons un client HTTP pour communiquer avec notre API backend, en utilisant Axios. 
// Nous définissons l'URL de base, les en-têtes par défaut et un délai d'attente. 
// Nous ajoutons également des intercepteurs pour gérer l'authentification JWT et la journalisation des erreurs.
// format JSON, authentification JWT, versionnement /api/v1, codes HTTP standard
export const httpClient = axios.create({
  baseURL: env.apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("aa_access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Nous gérons ici les erreurs de réponse HTTP, en journalisant les détails en mode développement et en rejetant la promesse pour permettre une gestion ultérieure.
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.error("[API ERROR]", error?.response?.data || error.message);
    }
    return Promise.reject(error);
  }
);
