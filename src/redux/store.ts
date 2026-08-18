import { configureStore } from "@reduxjs/toolkit";
import vehicleBookingReducer from "./slices/bookingSlice";
import billetterieReducer from "./slices/billetterieSlice";

// Nous créons le store Redux en utilisant configureStore de Redux Toolkit.
export const store = configureStore({
  reducer: {
    vehicleBooking: vehicleBookingReducer,
    billetterie: billetterieReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
