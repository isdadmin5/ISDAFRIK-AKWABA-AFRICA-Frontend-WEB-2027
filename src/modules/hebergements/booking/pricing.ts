import type { Accommodation } from "../types";
import { EXTRA_OPTIONS, type SelectedRoom } from "./BookingContext";

export function money(n: number) {
  return `${n.toLocaleString("fr-FR")} FCFA`;
}

export function formatStayDates(checkIn: string, checkOut: string) {
  const fmt = (iso: string) =>
    new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
  return `${fmt(checkIn)} — ${fmt(checkOut)}`;
}

export function computeStay(
  item: Accommodation,
  booking: {
    room: SelectedRoom | null;
    nights: number;
    extras: string[];
    promo: string;
  }
) {
  const unit = booking.room?.pricePerNight ?? item.pricePerNight;
  const roomName =
    booking.room?.name ?? (item.type === "HOTEL" ? "Chambre Deluxe" : "Logement entier");
  const lodging = unit * booking.nights;
  const selectedExtras = EXTRA_OPTIONS.filter((e) => booking.extras.includes(e.id));
  const extrasSum = selectedExtras.reduce((sum, e) => sum + e.price, 0);
  const tax = 18000;
  const promo = booking.promo ? -10000 : 0;
  const total = lodging + extrasSum + tax + promo;
  return { unit, roomName, lodging, selectedExtras, extrasSum, tax, promo, total };
}
