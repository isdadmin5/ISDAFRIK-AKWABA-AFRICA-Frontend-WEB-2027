import type { Flight } from "./types";
import { EXTRA_SERVICES, QUICK_EXTRAS, EXTRA_BAG_PRICE } from "./data/flights";
import type { RootState } from "@/redux/store";

export function filterFlights(
  all: Flight[],
  filters: RootState["billetterie"]["filters"]
): Flight[] {
  return all.filter((f) => {
    if (f.price > filters.maxPrice) return false;
    if (filters.airlines.length && !filters.airlines.includes(f.airline)) return false;
    if (filters.stops.length) {
      const key = f.stops === 0 ? "direct" : f.stops === 1 ? "1" : "2+";
      if (!filters.stops.includes(key)) return false;
    }
    if (filters.departureSlots.length && !filters.departureSlots.includes(f.departureSlot)) {
      return false;
    }
    if (filters.freeCancel && !f.freeCancel) return false;
    if (filters.bagsIncluded && f.holdKg <= 0) return false;
    return true;
  });
}

export function sortFlights(
  list: Flight[],
  sortBy: RootState["billetterie"]["sortBy"]
): Flight[] {
  const copy = [...list];
  if (sortBy === "price") return copy.sort((a, b) => a.price - b.price);
  if (sortBy === "duration") {
    return copy.sort((a, b) => durationMinutes(a.duration) - durationMinutes(b.duration));
  }
  return copy.sort((a, b) => Number(!!b.bestChoice) - Number(!!a.bestChoice) || a.price - b.price);
}

function durationMinutes(d: string) {
  const m = d.match(/(\d+)h\s*(\d+)?/);
  if (!m) return 9999;
  return Number(m[1]) * 60 + Number(m[2] || 0);
}

export function computeTotals(
  flight: Flight,
  adults: number,
  seats: Array<{ price: number }>,
  extras: string[],
  baggageExtra: number[] = []
) {
  const tickets = flight.price * adults;
  const taxes = flight.taxes;
  const serviceFee = flight.serviceFee;
  const seatFees = seats.reduce((s, x) => s + x.price, 0);
  const extraFees = extras.reduce((sum, id) => {
    const q = QUICK_EXTRAS.find((e) => e.id === id);
    const e = EXTRA_SERVICES.find((x) => x.id === id);
    return sum + (q?.price || e?.price || 0);
  }, 0);
  const baggageFees =
    baggageExtra.reduce((sum, n) => sum + Math.max(0, n), 0) * EXTRA_BAG_PRICE;
  const subtotal = tickets + taxes + serviceFee;
  const total = subtotal + seatFees + extraFees + baggageFees;
  return {
    tickets,
    taxes,
    serviceFee,
    seatFees,
    extraFees,
    baggageFees,
    subtotal,
    total,
  };
}

export function makeBookingRef() {
  return `AKW-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

export function isPassengerComplete(p: {
  lastName: string;
  firstName: string;
  birthDate: string;
  nationality: string;
  documentNumber: string;
  email: string;
  phone: string;
}) {
  return Boolean(
    p.lastName &&
      p.firstName &&
      p.birthDate &&
      p.nationality &&
      p.documentNumber &&
      p.email &&
      p.phone
  );
}
