// Types du module Location de Véhicules — selon le cahier des charges
// (à confirmer avec l'équipe : "agencyId" en attendant clarification agence vs compagnie de transport)

//Le véhicule
export type Vehicle = {
  id: string;
  reference: string; // format VEH-2026-000123
  registrationNumber: string; // immatriculation
  brand: string;
  model: string;
  year: number;
  type: "VOITURE" | "SUV" | "BUS" | "MOTO" | "MINIBUS";
  transmission: "MANUELLE" | "AUTOMATIQUE";
  fuel: "ESSENCE" | "DIESEL" | "ELECTRIQUE" | "HYBRIDE";
  mileageKm: number;
  seats: number;
  equipments: string[]; // climatisation, GPS embarqué, etc.
  pricePerDay: number;
  currency: string;
  rating: number;
  photos: string[];
  available: "DISPONIBLE" | "LOUÉ" | "EN_MAINTENANCE" | "HORS_SERVICE";
  conditions: string[]; // pluriel : plusieurs conditions possibles
  agencyId: string;
  city: string;
  country: string;
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
  deletedAt: string | null;
};

//Les paramètres de recherche
export type VehicleSearchParams = {
  city?: string;
  type?: "VOITURE" | "SUV" | "BUS" | "MOTO" | "MINIBUS";
  minPrice?: number;
  maxPrice?: number;
  startDate?: string; // ISO 8601
  endDate?: string;
  page?: number;
  sortBy?: "priceAsc" | "priceDesc" | "ratingDesc" | "yearDesc" | "mileageAsc";
};

//Le conducteur (infos saisies lors de la réservation)
export type VehicleDriver = {
  fullName: string;
  email: string;
  phone: string;
  licenseNumber: string;
};

//Les options de réservation (assurance + extras)
export type VehicleInsurancing = {
  insuranceLevel: "NONE" | "BASIC" | "PREMIUM";
  withDriver: boolean;
  gps: boolean;
  childSeat: boolean;
};

//Ce que le client envoie pour réserver
export type VehicleBookingPayload = {
  vehicleId: string;
  startDate: string; // ISO 8601
  endDate: string;
  pickupLocation: string;
  driver: VehicleDriver; // plus un simple string
  options: VehicleInsurancing; // plus un simple string
};

//Ce que l'API renvoie après une réservation réussie
export type VehicleBookingResult = {
  bookingId: string;
  status: "EN_ATTENTE" | "CONFIRMÉE" | "ANNULÉE"; // aligné sur BOOKING_STATUSES du projet
  totalPrice: number;
  currency: string;
};

//Vérification de disponibilité pour une période donnée
export type VehicleAvailability = {
  vehicleId: string;
  startDate: string;
  endDate: string;
  available: "DISPONIBLE" | "LOUÉ" | "EN_MAINTENANCE" | "HORS_SERVICE";
};