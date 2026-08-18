import type { Flight } from "../types";

export const AIRPORTS = [
  { code: "LFW", city: "Lomé", country: "Togo" },
  { code: "ABJ", city: "Abidjan", country: "Côte d'Ivoire" },
  { code: "ACC", city: "Accra", country: "Ghana" },
  { code: "COO", city: "Cotonou", country: "Bénin" },
  { code: "DSS", city: "Dakar", country: "Sénégal" },
  { code: "CDG", city: "Paris", country: "France" },
] as const;

export const flights: Flight[] = [
  {
    id: "kp102",
    airline: "ASKY Airlines",
    airlineCode: "KP",
    flightNumber: "KP102",
    from: { code: "LFW", city: "Lomé", country: "Togo" },
    to: { code: "ABJ", city: "Abidjan", country: "Côte d'Ivoire" },
    departTime: "08:15",
    arriveTime: "10:05",
    duration: "1h 50m",
    stops: 0,
    stopLabel: "Direct",
    price: 79000,
    taxes: 18500,
    serviceFee: 5000,
    bestChoice: true,
    cabinKg: 7,
    holdKg: 23,
    mealIncluded: true,
    refundable: false,
    freeCancel: false,
    departureSlot: "06-12",
  },
  {
    id: "hf201",
    airline: "Air Côte d'Ivoire",
    airlineCode: "HF",
    flightNumber: "HF201",
    from: { code: "LFW", city: "Lomé", country: "Togo" },
    to: { code: "ABJ", city: "Abidjan", country: "Côte d'Ivoire" },
    departTime: "12:40",
    arriveTime: "15:55",
    duration: "3h 15m",
    stops: 1,
    stopLabel: "1 escale (ACC)",
    price: 68500,
    taxes: 16200,
    serviceFee: 5000,
    cabinKg: 7,
    holdKg: 23,
    mealIncluded: false,
    refundable: false,
    freeCancel: true,
    departureSlot: "12-18",
  },
  {
    id: "sn451",
    airline: "Brussels Airlines",
    airlineCode: "SN",
    flightNumber: "SN451",
    from: { code: "LFW", city: "Lomé", country: "Togo" },
    to: { code: "ABJ", city: "Abidjan", country: "Côte d'Ivoire" },
    departTime: "06:10",
    arriveTime: "11:40",
    duration: "5h 30m",
    stops: 1,
    stopLabel: "1 escale (COO)",
    price: 95500,
    taxes: 21000,
    serviceFee: 5000,
    cabinKg: 8,
    holdKg: 23,
    mealIncluded: true,
    refundable: true,
    freeCancel: false,
    departureSlot: "06-12",
  },
  {
    id: "af722",
    airline: "Air France",
    airlineCode: "AF",
    flightNumber: "AF722",
    from: { code: "LFW", city: "Lomé", country: "Togo" },
    to: { code: "ABJ", city: "Abidjan", country: "Côte d'Ivoire" },
    departTime: "19:20",
    arriveTime: "21:05",
    duration: "1h 45m",
    stops: 0,
    stopLabel: "Direct",
    price: 112000,
    taxes: 24500,
    serviceFee: 5000,
    cabinKg: 12,
    holdKg: 23,
    mealIncluded: true,
    refundable: true,
    freeCancel: true,
    departureSlot: "18-24",
  },
  {
    id: "kp188",
    airline: "ASKY Airlines",
    airlineCode: "KP",
    flightNumber: "KP188",
    from: { code: "LFW", city: "Lomé", country: "Togo" },
    to: { code: "ABJ", city: "Abidjan", country: "Côte d'Ivoire" },
    departTime: "14:05",
    arriveTime: "15:50",
    duration: "1h 45m",
    stops: 0,
    stopLabel: "Direct",
    price: 82000,
    taxes: 18500,
    serviceFee: 5000,
    cabinKg: 7,
    holdKg: 23,
    mealIncluded: true,
    refundable: false,
    freeCancel: false,
    departureSlot: "12-18",
  },
];

export function getFlightById(id: string): Flight | undefined {
  return flights.find((f) => f.id === id);
}

export function formatFcfa(amount: number): string {
  return `${amount.toLocaleString("fr-FR")} FCFA`;
}

export const EXTRA_SERVICES = [
  {
    id: "vip",
    title: "Accès au Salon VIP",
    description: "Wi-Fi, drinks, snacks, espace de travail",
    price: 25000,
    priceLabel: "25 000 FCFA",
  },
  {
    id: "insurance",
    title: "Assurance Voyage",
    description: "Couverture médicale et bagages complète",
    price: 12500,
    priceLabel: "12 500 FCFA",
  },
  {
    id: "priority",
    title: "Embarquement Prioritaire",
    description: "Gagnez du temps à la porte d'embarquement",
    price: 7500,
    priceLabel: "7 500 FCFA",
  },
  {
    id: "transfer",
    title: "Transfert Aéroport ↔ Hôtel",
    description: "Chauffeur privé à votre arrivée à Abidjan",
    price: 18000,
    priceLabel: "Dès 18 000 FCFA",
  },
];

export const EXTRA_BAG_PRICE = 15000;

export const QUICK_EXTRAS = [
  { id: "meal", label: "Repas premium", price: 7500, priceLabel: "+7,500 FCFA" },
  { id: "boarding", label: "Embarquement", price: 10000, priceLabel: "+10,000 FCFA" },
  { id: "lounge", label: "Accès Lounge", price: 20000, priceLabel: "+20,000 FCFA" },
];

export const BAGGAGE_OPTIONS = [
  { id: 0, label: "Inclus uniquement", description: "Cabine + soute du tarif" },
  { id: 1, label: "+1 bagage 23 kg", description: "Supplément soute" },
  { id: 2, label: "+2 bagages 23 kg", description: "Idéal pour un long séjour" },
  { id: 3, label: "+3 bagages 23 kg", description: "Maximum autorisé" },
] as const;
