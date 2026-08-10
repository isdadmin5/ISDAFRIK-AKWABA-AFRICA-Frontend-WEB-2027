import { useRoutes, Navigate } from "react-router-dom";
import { PublicLayout } from "@/layouts/PublicLayout";
import { vehiclesRoutes } from "@/modules/vehicles";

// Nous définissons ici le routeur principal de l'application, qui gère les routes publiques et les routes spécifiques au module "Location de Véhicules".
export function AppRouter() {
  return useRoutes([
    {
      path: "/",
      element: <PublicLayout />,
      children: [
        { index: true, element: <Navigate to="/vehicles" replace /> },
        ...vehiclesRoutes,
        { path: "vehicles/favorites", element: <Navigate to="/vehicles" replace /> },
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
