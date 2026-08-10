import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Ce slice conserve le brouillon de réservation de véhicule pendant tout le parcours
// (Détail -> Dates -> Conducteur -> Assurance -> Paiement -> Contrat).
export interface VehicleBookingDraft {
  vehicleId: string | null;
  pickupLocation: string;
  startDate: string;
  endDate: string;
  driver: {
    fullName: string;
    email: string;
    phone: string;
    licenseNumber: string;
  };
  options: {
    insurance: "BASIC" | "PREMIUM" | "NONE";
    withDriver: boolean;
    gps: boolean;
    childSeat: boolean;
  };
}

const initialState: VehicleBookingDraft = {
  vehicleId: null,
  pickupLocation: "",
  startDate: "",
  endDate: "",
  driver: { fullName: "", email: "", phone: "", licenseNumber: "" },
  options: { insurance: "BASIC", withDriver: false, gps: false, childSeat: false },
};

const bookingSlice = createSlice({
  name: "vehicleBooking",
  initialState,
  reducers: {
    setVehicle(state, action: PayloadAction<string>) {
      state.vehicleId = action.payload;
    },
    setDates(state, action: PayloadAction<{ startDate: string; endDate: string; pickupLocation?: string }>) {
      state.startDate = action.payload.startDate;
      state.endDate = action.payload.endDate;
      if (action.payload.pickupLocation !== undefined) state.pickupLocation = action.payload.pickupLocation;
    },
    setDriver(state, action: PayloadAction<VehicleBookingDraft["driver"]>) {
      state.driver = action.payload;
    },
    setOptions(state, action: PayloadAction<Partial<VehicleBookingDraft["options"]>>) {
      state.options = { ...state.options, ...action.payload };
    },
    resetBooking() {
      return initialState;
    },
  },
});

export const { setVehicle, setDates, setDriver, setOptions, resetBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
