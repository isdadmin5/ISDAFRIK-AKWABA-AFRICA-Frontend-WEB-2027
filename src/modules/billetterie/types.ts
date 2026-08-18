export type TripType = "roundtrip" | "oneway" | "multi";
export type CabinClass = "eco" | "business" | "first";
export type StopFilter = "direct" | "1" | "2+";
export type TimeSlot = "00-06" | "06-12" | "12-18" | "18-24";

export interface Airport {
  code: string;
  city: string;
  country: string;
}

export interface Flight {
  id: string;
  airline: string;
  airlineCode: string;
  flightNumber: string;
  from: Airport;
  to: Airport;
  departTime: string;
  arriveTime: string;
  duration: string;
  stops: number;
  stopLabel: string;
  price: number;
  taxes: number;
  serviceFee: number;
  bestChoice?: boolean;
  cabinKg: number;
  holdKg: number;
  mealIncluded: boolean;
  refundable: boolean;
  freeCancel: boolean;
  departureSlot: TimeSlot;
}

export interface PassengerForm {
  title: string;
  lastName: string;
  firstName: string;
  birthDate: string;
  nationality: string;
  documentNumber: string;
  documentExpiry: string;
  issuingCountry: string;
  email: string;
  phone: string;
  vegetarian: boolean;
  halal: boolean;
  pmr: boolean;
}

export interface ContactBilling {
  address: string;
  city: string;
  postalCode: string;
  useForInvoice: boolean;
  emergencyName: string;
  emergencyRelation: string;
  emergencyPhone: string;
}

export interface SeatSelection {
  passengerIndex: number;
  seatId: string;
  price: number;
  type: string;
}

export interface ExtraService {
  id: string;
  label: string;
  price: number;
}
