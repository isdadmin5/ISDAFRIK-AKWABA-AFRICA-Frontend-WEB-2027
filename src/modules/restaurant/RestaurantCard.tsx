import { Heart, MapPin, Star } from "lucide-react";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import type { Restaurant } from "./restaurant.types";

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <Card className="overflow-hidden bg-asphalt-900/90 text-sand-50 shadow-xl shadow-black/20">
      <div className="relative h-64 overflow-hidden">
        <img src={restaurant.image} alt={restaurant.name} className="h-full w-full object-cover transition duration-500 hover:scale-105" />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
          <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
            {restaurant.category}
          </span>
          <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${restaurant.open ? "bg-emerald-500/15 text-emerald-300" : "bg-sand-50/10 text-sand-200"}`}>
            {restaurant.open ? "Ouvert" : "Fermé"}
          </span>
        </div>
      </div>

      <div className="space-y-4 p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="text-xl font-semibold text-sand-50">{restaurant.name}</h3>
            <p className="mt-1 text-sm text-sand-300">{restaurant.location}</p>
          </div>
          <div className="flex items-center gap-2 text-amber-400">
            <Star className="h-4 w-4" />
            <span className="text-sm font-semibold">{restaurant.rating.toFixed(1)}</span>
          </div>
        </div>

        <p className="text-sm leading-6 text-sand-300">{restaurant.description}</p>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sand-300">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">{restaurant.location}</span>
          </div>
          <div className="text-base font-semibold text-sand-50">{restaurant.price} FCFA</div>
        </div>

        <div className="flex flex-wrap gap-2">
          {restaurant.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="rounded-full bg-white/10 px-3 py-1 text-xs text-sand-300">
              {tag}
            </span>
          ))}
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Button variant="ghost" size="md" className="w-full">
            Voir la carte
          </Button>
          <Button variant="primary" size="md" className="w-full">
            Réserver
          </Button>
        </div>
      </div>
    </Card>
  );
}
