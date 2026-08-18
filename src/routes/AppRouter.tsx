import { useRoutes, Navigate } from "react-router-dom";
import { PublicLayout } from "@/layouts/PublicLayout";
import { tourismeRoutes } from "@/modules/tourisme/routes";
import { hebergementsRoutes } from "@/modules/hebergements";
import { billetterieRoutes } from "@/modules/billetterie";

export function AppRouter() {
  return useRoutes([
    {
      path: "/",
      element: <PublicLayout />,
      children: [
        { index: true, element: <Navigate to="/hebergements" replace /> },
        ...hebergementsRoutes,
        ...billetterieRoutes,
        ...tourismeRoutes,
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
}

function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="font-display text-2xl font-bold text-navy-900">Page introuvable</h1>
      <p className="mt-2 text-slate-500">La page demandée n&apos;existe pas ou plus.</p>
    </div>
  );
}
