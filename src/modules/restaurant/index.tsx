import { RestaurantPage } from "./RestaurantPage";
import { ReservationPage } from "./ReservationPage";
import { RestaurantDetailPage } from "./RestaurantDetailPage";

export const restaurantRoutes = [
  { path: "restaurants", element: <RestaurantPage /> },
  { path: "restaurants/reservations", element: <ReservationPage /> },
  { path: "restaurants/:id", element: <RestaurantDetailPage /> },
];

