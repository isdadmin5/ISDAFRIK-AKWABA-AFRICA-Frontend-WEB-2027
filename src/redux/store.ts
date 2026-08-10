import { configureStore } from "@reduxjs/toolkit";
import vehicleBookingReducer from "./slices/bookingSlice";

// Nous créons le store Redux en utilisant configureStore de Redux Toolkit. 
// Nous passons un objet de configuration avec la propriété reducer, qui contient notre reducer vehicleBookingReducer.
//  Cela permet à Redux de gérer l'état de l'application lié aux réservations de véhicules.
export const store = configureStore({
  reducer: {
    vehicleBooking: vehicleBookingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
