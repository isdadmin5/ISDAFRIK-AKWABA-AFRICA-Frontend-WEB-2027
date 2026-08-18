import type { SelectedRoom } from "../booking/BookingContext";

export const ROOMS_BY_HOTEL: Record<string, SelectedRoom[]> = {
  default: [
    { id: "deluxe", name: "Chambre Deluxe", pricePerNight: 85000, size: 35, bed: "Queen Size", view: "Vue Piscine" },
    { id: "standard", name: "Chambre Standard", pricePerNight: 65000, size: 24, bed: "King", view: "Vue Ville" },
    { id: "suite", name: "Suite Présidentielle", pricePerNight: 180000, size: 72, bed: "King", view: "Vue Lagune" },
  ],
};

export function getRooms(accommodationId: string) {
  return ROOMS_BY_HOTEL[accommodationId] ?? ROOMS_BY_HOTEL.default;
}
