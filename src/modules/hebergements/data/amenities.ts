import {
  Wifi,
  Waves,
  Wind,
  Car,
  Coffee,
  UtensilsCrossed,
  Sparkles,
  Dumbbell,
  Bus,
  type LucideIcon,
} from "lucide-react";
import type { AmenityKey } from "../types";

export const AMENITY_META: Record<AmenityKey, { label: string; Icon: LucideIcon }> = {
  wifi: { label: "Wi-Fi", Icon: Wifi },
  piscine: { label: "Piscine", Icon: Waves },
  climatisation: { label: "Climatisation", Icon: Wind },
  parking: { label: "Parking", Icon: Car },
  petit_dejeuner: { label: "Petit-déjeuner", Icon: Coffee },
  restaurant: { label: "Restaurant", Icon: UtensilsCrossed },
  spa: { label: "Spa", Icon: Sparkles },
  salle_sport: { label: "Salle de sport", Icon: Dumbbell },
  navette: { label: "Navette", Icon: Bus },
};
