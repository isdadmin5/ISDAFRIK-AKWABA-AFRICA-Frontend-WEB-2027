// Nous définissons ici des constantes pour l'application, 
// telles que les rôles d'utilisateur, les devises, les langues et les statuts de réservation.

export const ROLES = {
  VISITOR: "VISITEUR",
  CLIENT: "CLIENT",
  PARTNER: "PARTENAIRE",
  ADMIN: "ADMINISTRATEUR",
  SUPER_ADMIN: "SUPER_ADMINISTRATEUR",
} as const;

export const CURRENCIES = ["XOF", "XAF", "GHS", "NGN", "EUR", "USD"] as const;

export const LANGUAGES = ["fr", "en"] as const;

export const BOOKING_STATUSES = {
  PENDING: "EN_ATTENTE",
  CONFIRMED: "CONFIRMÉE",
  CANCELLED: "ANNULÉE",
  COMPLETED: "TERMINÉE",
} as const;
