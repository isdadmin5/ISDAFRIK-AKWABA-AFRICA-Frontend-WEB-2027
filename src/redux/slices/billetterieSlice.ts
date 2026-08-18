import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type {
  CabinClass,
  ContactBilling,
  PassengerForm,
  SeatSelection,
  TripType,
} from "@/modules/billetterie/types";

export interface FlightSearchState {
  tripType: TripType;
  from: string;
  to: string;
  departDate: string;
  returnDate: string;
  adults: number;
  cabin: CabinClass;
}

export interface FlightFiltersState {
  maxPrice: number;
  airlines: string[];
  stops: string[];
  departureSlots: string[];
  freeCancel: boolean;
  bagsIncluded: boolean;
}

export interface BilletterieDraft {
  search: FlightSearchState;
  filters: FlightFiltersState;
  sortBy: "best" | "price" | "duration";
  selectedFlightId: string | null;
  compareIds: string[];
  passengers: PassengerForm[];
  contact: ContactBilling;
  seats: SeatSelection[];
  extras: string[];
  /** Extra hold bags count per passenger index */
  baggageExtra: number[];
  paymentMethod: "momo" | "card" | "fedapay" | "transfer";
  paymentPhone: string;
  confirmOfficial: boolean;
  acceptTerms: boolean;
  newsletter: boolean;
  bookingRef: string | null;
}

const emptyPassenger = (): PassengerForm => ({
  title: "Monsieur",
  lastName: "",
  firstName: "",
  birthDate: "",
  nationality: "",
  documentNumber: "",
  documentExpiry: "",
  issuingCountry: "",
  email: "",
  phone: "",
  vegetarian: false,
  halal: false,
  pmr: false,
});

const initialState: BilletterieDraft = {
  search: {
    tripType: "roundtrip",
    from: "LFW",
    to: "ABJ",
    departDate: "",
    returnDate: "",
    adults: 2,
    cabin: "eco",
  },
  filters: {
    maxPrice: 500000,
    airlines: ["ASKY Airlines", "Air Côte d'Ivoire"],
    stops: [],
    departureSlots: ["06-12"],
    freeCancel: false,
    bagsIncluded: false,
  },
  sortBy: "best",
  selectedFlightId: null,
  compareIds: [],
  passengers: [
    {
      ...emptyPassenger(),
      lastName: "Luther",
      firstName: "King",
      birthDate: "1990-05-15",
      nationality: "Togolaise",
      email: "luther.king@email.com",
      phone: "+228 70 00 00 00",
      vegetarian: true,
    },
    emptyPassenger(),
  ],
  contact: {
    address: "",
    city: "",
    postalCode: "",
    useForInvoice: true,
    emergencyName: "",
    emergencyRelation: "Conjoint(e)",
    emergencyPhone: "",
  },
  seats: [],
  extras: [],
  baggageExtra: [0, 0],
  paymentMethod: "momo",
  paymentPhone: "",
  confirmOfficial: false,
  acceptTerms: false,
  newsletter: false,
  bookingRef: null,
};

const billetterieSlice = createSlice({
  name: "billetterie",
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<Partial<FlightSearchState>>) {
      state.search = { ...state.search, ...action.payload };
      const adults = state.search.adults;
      while (state.passengers.length < adults) state.passengers.push(emptyPassenger());
      while (state.passengers.length > adults) state.passengers.pop();
      while (state.baggageExtra.length < adults) state.baggageExtra.push(0);
      while (state.baggageExtra.length > adults) state.baggageExtra.pop();
    },
    swapAirports(state) {
      const tmp = state.search.from;
      state.search.from = state.search.to;
      state.search.to = tmp;
    },
    setFilters(state, action: PayloadAction<Partial<FlightFiltersState>>) {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters(state) {
      state.filters = initialState.filters;
    },
    setSortBy(state, action: PayloadAction<BilletterieDraft["sortBy"]>) {
      state.sortBy = action.payload;
    },
    selectFlight(state, action: PayloadAction<string>) {
      state.selectedFlightId = action.payload;
      state.seats = [];
      state.extras = [];
      state.baggageExtra = Array.from({ length: state.search.adults }, () => 0);
      state.bookingRef = null;
    },
    setBaggageExtra(state, action: PayloadAction<{ index: number; count: number }>) {
      const { index, count } = action.payload;
      while (state.baggageExtra.length <= index) state.baggageExtra.push(0);
      state.baggageExtra[index] = Math.max(0, Math.min(3, count));
    },
    setPayment(
      state,
      action: PayloadAction<Partial<Pick<BilletterieDraft, "paymentMethod" | "paymentPhone">>>
    ) {
      Object.assign(state, action.payload);
    },
    toggleCompare(state, action: PayloadAction<string>) {
      const id = action.payload;
      if (state.compareIds.includes(id)) {
        state.compareIds = state.compareIds.filter((x) => x !== id);
      } else if (state.compareIds.length < 3) {
        state.compareIds.push(id);
      }
    },
    updatePassenger(
      state,
      action: PayloadAction<{ index: number; data: Partial<PassengerForm> }>
    ) {
      const p = state.passengers[action.payload.index];
      if (p) state.passengers[action.payload.index] = { ...p, ...action.payload.data };
    },
    setContact(state, action: PayloadAction<Partial<ContactBilling>>) {
      state.contact = { ...state.contact, ...action.payload };
    },
    setSeat(state, action: PayloadAction<SeatSelection>) {
      state.seats = state.seats.filter((s) => s.passengerIndex !== action.payload.passengerIndex);
      state.seats.push(action.payload);
    },
    toggleExtra(state, action: PayloadAction<string>) {
      if (state.extras.includes(action.payload)) {
        state.extras = state.extras.filter((x) => x !== action.payload);
      } else {
        state.extras.push(action.payload);
      }
    },
    setAgreements(
      state,
      action: PayloadAction<Partial<Pick<BilletterieDraft, "confirmOfficial" | "acceptTerms" | "newsletter">>>
    ) {
      Object.assign(state, action.payload);
    },
    confirmBooking(state, action: PayloadAction<string>) {
      state.bookingRef = action.payload;
    },
    resetBilletterie() {
      return initialState;
    },
  },
});

export const {
  setSearch,
  swapAirports,
  setFilters,
  resetFilters,
  setSortBy,
  selectFlight,
  toggleCompare,
  updatePassenger,
  setContact,
  setSeat,
  toggleExtra,
  setBaggageExtra,
  setPayment,
  setAgreements,
  confirmBooking,
  resetBilletterie,
} = billetterieSlice.actions;

export default billetterieSlice.reducer;
