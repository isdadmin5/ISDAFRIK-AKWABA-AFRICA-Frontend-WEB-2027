// Nous gérons ici les variables d'environnement pour l'application, 
// telles que l'URL de base de l'API, 
// la clé API Google Maps et 
// la clé publique FedaPay.
export const env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1",
  googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
  fedaPayPublicKey: import.meta.env.VITE_FEDAPAY_PUBLIC_KEY || "",
};
