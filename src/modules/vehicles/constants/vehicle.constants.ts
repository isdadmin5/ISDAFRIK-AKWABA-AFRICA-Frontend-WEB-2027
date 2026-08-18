//Nous gérons ici les constantes du module "Location de Véhicules" selon le cahier des charges
import {Vehicle, VehicleSearchParams, VehicleInsurancing } from "../types/vehicle.types";

export type Option<V> = {
  value: V;
  label: string;
};

//Les types de véhicules (pour les filtres et le formulaire de filtre du catalogue)
export const VEHICLE_TYPES: Option<Vehicle["type"]>[] = [
  { value: "VOITURE", label: "Voiture" },
  { value: "SUV", label: "SUV" },
  { value: "BUS", label: "Bus" },
  { value: "MOTO", label: "Moto" },
  { value: "MINIBUS", label: "Minibus" }
];

//Les types de transmission
export const VEHICLE_TRANSMISSIONS: Option<Vehicle["transmission"]>[] = [
  { value: "MANUELLE", label: "Manuelle" },
  { value: "AUTOMATIQUE", label: "Automatique" }
];

//Les types de carburant 
export const VEHICLE_FUELS: Option<Vehicle["fuel"]>[] = [
  { value: "ESSENCE", label: "Essence" },
  { value: "DIESEL", label: "Diesel" },
  { value: "ELECTRIQUE", label: "Électrique" },
  { value: "HYBRIDE", label: "Hybride" }
];

//Les options de tri (pour le formulaire de filtre du catalogue)
export const VEHICLE_SORT_OPTIONS: Option<VehicleSearchParams["sortBy"]>[] = [
  { value: "priceAsc", label: "Prix croissant" },
  { value: "priceDesc", label: "Prix décroissant" },
  { value: "ratingDesc", label: "Note décroissante" },
  { value: "yearDesc", label: "Année décroissante" },
  { value: "mileageAsc", label: "Kilométrage croissant" }
];

//Les niveaux d'assurance (pour le formulaire de réservation)
export const VEHICLE_INSURANCE_LEVELS: Option<VehicleInsurancing["insuranceLevel"]>[] = [
  { value: "NONE", label: "Aucune" },
  { value: "BASIC", label: "Basique" },
  { value: "PREMIUM", label: "Premium" }
];

//Les équipements
export const VEHICLE_EQUIPMENTS: Option<Vehicle["equipments"][number]>[] = [
  { value: "Climatisation", label: "Climatisation" },
  { value: "GPS embarqué", label: "GPS embarqué" },
  { value: "Siège enfant", label: "Siège enfant" },
  { value: "Bluetooth", label: "Bluetooth" },
  { value: "Caméra de recul", label: "Caméra de recul" },
  { value: "Toit ouvrant", label: "Toit ouvrant" },
  { value: "Régulateur de vitesse", label: "Régulateur de vitesse" },
  { value: "Chauffage des sièges", label: "Chauffage des sièges" },
  { value: "Système audio premium", label: "Système audio premium" },
  { value: "Capteurs de stationnement", label: "Capteurs de stationnement" }
];


