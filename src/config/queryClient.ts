// Nous configurons ici le cache de React Query pour toute l'application 
// C'est le cœur de la stratégie "Véhicules → React Query" du cahier des charges

import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Nous définissons ici les options par défaut pour toutes les requêtes React Query, 
      // y compris la durée de vie du cache, le délai avant la mise à jour et la gestion des erreurs.
      staleTime: 1000 * 60 * 1, // 1 minute
      gcTime: 1000 * 60 * 10, // 10 minute
        refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          return false; // Ne pas réessayer pour les erreurs 404
        }
        return failureCount < 3; // Réessayer jusqu'à 3 fois pour les autres erreurs
      },
    },
  },
});