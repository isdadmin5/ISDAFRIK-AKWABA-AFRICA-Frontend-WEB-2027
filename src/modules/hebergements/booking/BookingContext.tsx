import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export interface ExtraOption {
  id: string;
  label: string;
  price: number;
}

export const EXTRA_OPTIONS: ExtraOption[] = [
  { id: "breakfast", label: "Petit-déjeuner Premium", price: 24000 },
  { id: "shuttle", label: "Navette aéroport", price: 20000 },
  { id: "spa", label: "Accès Spa & Détente", price: 50000 },
];

export interface SelectedRoom {
  id: string;
  name: string;
  pricePerNight: number;
  size: number;
  bed: string;
  view: string;
}

interface BookingState {
  accommodationId: string | null;
  room: SelectedRoom | null;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  extras: string[];
  promo: string;
  travelerName: string;
  travelerEmail: string;
}

const DEFAULT: BookingState = {
  accommodationId: null,
  room: null,
  checkIn: "2026-08-18",
  checkOut: "2026-08-21",
  adults: 2,
  children: 0,
  extras: ["breakfast", "shuttle", "spa"],
  promo: "AKWABA10",
  travelerName: "Jean Koffi",
  travelerEmail: "jean.koffi@email.com",
};

interface BookingContextValue extends BookingState {
  nights: number;
  setAccommodation: (id: string) => void;
  setRoom: (room: SelectedRoom) => void;
  toggleExtra: (id: string) => void;
  setTravelers: (adults: number, children: number) => void;
  setDates: (checkIn: string, checkOut: string) => void;
  setGuest: (name: string, email: string) => void;
}

const BookingContext = createContext<BookingContextValue | null>(null);

function nightsBetween(start: string, end: string) {
  const a = new Date(start).getTime();
  const b = new Date(end).getTime();
  if (Number.isNaN(a) || Number.isNaN(b) || b <= a) return 3;
  return Math.ceil((b - a) / 86400000);
}

export function BookingProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<BookingState>(DEFAULT);
  const nights = nightsBetween(state.checkIn, state.checkOut);

  const value = useMemo<BookingContextValue>(
    () => ({
      ...state,
      nights,
      setAccommodation: (id) => setState((s) => ({ ...s, accommodationId: id })),
      setRoom: (room) => setState((s) => ({ ...s, room })),
      toggleExtra: (id) =>
        setState((s) => ({
          ...s,
          extras: s.extras.includes(id) ? s.extras.filter((x) => x !== id) : [...s.extras, id],
        })),
      setTravelers: (adults, children) => setState((s) => ({ ...s, adults, children })),
      setDates: (checkIn, checkOut) => setState((s) => ({ ...s, checkIn, checkOut })),
      setGuest: (travelerName, travelerEmail) => setState((s) => ({ ...s, travelerName, travelerEmail })),
    }),
    [state, nights]
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within BookingProvider");
  return ctx;
}
