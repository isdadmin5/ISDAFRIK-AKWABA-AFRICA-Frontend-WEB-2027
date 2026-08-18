import type { RouteObject } from "react-router-dom";
import { HebergementsHomePage } from "./pages/HebergementsHomePage";
import { HebergementResultsPage } from "./pages/HebergementResultsPage";
import { HebergementDetailPage } from "./pages/HebergementDetailPage";
import { HebergementRoomsPage } from "./pages/HebergementRoomsPage";
import { HebergementTravelersPage } from "./pages/HebergementTravelersPage";
import { HebergementRecapPage } from "./pages/HebergementRecapPage";
import { HebergementPaymentPage } from "./pages/HebergementPaymentPage";
import { HebergementConfirmationPage } from "./pages/HebergementConfirmationPage";

export const hebergementsRoutes: RouteObject[] = [
  { path: "hebergements", element: <HebergementsHomePage /> },
  { path: "hebergements/recherche", element: <HebergementResultsPage type="ALL" /> },
  { path: "hebergements/hotels", element: <HebergementResultsPage type="HOTEL" /> },
  { path: "hebergements/maisons", element: <HebergementResultsPage type="MAISON" /> },
  { path: "hebergements/villas", element: <HebergementResultsPage type="VILLA" /> },
  { path: "hebergements/appartements", element: <HebergementResultsPage type="APPARTEMENT" /> },
  { path: "hebergements/:id/chambres", element: <HebergementRoomsPage /> },
  { path: "hebergements/:id/voyageurs", element: <HebergementTravelersPage /> },
  { path: "hebergements/:id/recap", element: <HebergementRecapPage /> },
  { path: "hebergements/:id/paiement", element: <HebergementPaymentPage /> },
  { path: "hebergements/:id/confirmation", element: <HebergementConfirmationPage /> },
  { path: "hebergements/:id", element: <HebergementDetailPage /> },
];
