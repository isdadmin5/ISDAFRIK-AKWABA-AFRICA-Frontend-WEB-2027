import { RouteObject } from "react-router-dom";
import { BilletterieLayout } from "./layouts/BilletterieLayout";
import { FlightLandingPage } from "./pages/FlightLandingPage";
import { FlightResultsPage } from "./pages/FlightResultsPage";
import { FlightDetailPage } from "./pages/FlightDetailPage";
import { PassengersPage } from "./pages/PassengersPage";
import { SeatSelectionPage } from "./pages/SeatSelectionPage";
import { BaggagePage } from "./pages/BaggagePage";
import { PaymentPage } from "./pages/PaymentPage";
import { ConfirmationPage } from "./pages/ConfirmationPage";

export const billetterieRoutes: RouteObject[] = [
  {
    path: "billetterie",
    element: <BilletterieLayout />,
    children: [
      { index: true, element: <FlightLandingPage /> },
      { path: "resultats", element: <FlightResultsPage /> },
      { path: ":id", element: <FlightDetailPage /> },
      { path: ":id/voyageurs", element: <PassengersPage /> },
      { path: ":id/sieges", element: <SeatSelectionPage /> },
      { path: ":id/bagages", element: <BaggagePage /> },
      { path: ":id/paiement", element: <PaymentPage /> },
      { path: ":id/confirmation", element: <ConfirmationPage /> },
    ],
  },
];
