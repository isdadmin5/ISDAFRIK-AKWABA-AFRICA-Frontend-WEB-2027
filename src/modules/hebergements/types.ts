export type AccommodationType =
  | "HOTEL"
  | "APPARTEMENT"
  | "VILLA"
  | "MAISON"
  | "RESIDENCE";

export type AmenityKey =
  | "wifi"
  | "piscine"
  | "climatisation"
  | "parking"
  | "petit_dejeuner"
  | "restaurant"
  | "spa"
  | "salle_sport"
  | "navette";

export interface Accommodation {
  id: string;
  name: string;
  type: AccommodationType;
  city: string;
  district: string;
  country: string;
  stars: number;
  rating: number;
  reviewCount: number;
  pricePerNight: number;
  currency: string;
  image: string;
  gallery: string[];
  description: string;
  amenities: AmenityKey[];
  capacity: number;
  rooms: number;
  promotion?: number;
  featured?: boolean;
}

export interface HebergementSearchFilters {
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  type: AccommodationType | "ALL";
}
