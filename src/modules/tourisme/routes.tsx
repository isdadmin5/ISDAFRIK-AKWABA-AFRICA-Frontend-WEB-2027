import type { RouteObject } from "react-router-dom";
import { ListePaysPage } from "./pages/ListePaysPage";
import { DetailPaysPage } from "./pages/DetailPaysPage";

export const tourismeRoutes: RouteObject[] = [
  { path: "tourisme", element: <ListePaysPage /> },
  { path: "tourisme/:paysId", element: <DetailPaysPage /> },
];
