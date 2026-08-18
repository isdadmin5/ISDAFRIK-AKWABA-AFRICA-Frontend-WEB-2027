import type { AccommodationType } from "./types";

export const TYPE_ROUTES: Record<AccommodationType | "ALL", string> = {
  ALL: "/hebergements/recherche",
  HOTEL: "/hebergements/hotels",
  MAISON: "/hebergements/maisons",
  VILLA: "/hebergements/villas",
  APPARTEMENT: "/hebergements/appartements",
  RESIDENCE: "/hebergements/recherche",
};

export const TYPE_SINGULAR: Record<AccommodationType | "ALL", string> = {
  ALL: "Hébergement",
  HOTEL: "Hôtel",
  MAISON: "Maison",
  VILLA: "Villa",
  APPARTEMENT: "Appartement",
  RESIDENCE: "Résidence",
};
