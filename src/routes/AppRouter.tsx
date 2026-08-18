import { useRoutes, Navigate } from "react-router-dom";
import { PublicLayout } from "@/layouts/PublicLayout";
import { restaurantRoutes } from "@/modules/restaurant";

// Nous définissons ici le routeur principal de l'application, qui gère les routes publiques et les routes du module Restaurants.
export function AppRouter() {
  return useRoutes([
    {
      path: "/",
      element: <PublicLayout />,
      children: [
        { index: true, element: <Navigate to="/restaurants" replace /> },
        ...restaurantRoutes,
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
}

function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="font-display text-2xl font-bold text-sand-50">Page introuvable</h1>
      <p className="mt-2 text-sand-400">La page demandée n'existe pas ou plus.</p>
    </div>
  );
}
