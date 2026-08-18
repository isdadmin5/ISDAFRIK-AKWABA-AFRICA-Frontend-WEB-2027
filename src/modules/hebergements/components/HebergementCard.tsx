import { Link } from "react-router-dom";
import { MapPin, Star } from "lucide-react";
import { formatCurrency } from "@/utils/formatCurrency";
import { TYPE_LABELS } from "../data/mockAccommodations";
import type { Accommodation } from "../types";

export function HebergementCard({ item }: { item: Accommodation }) {
  const discounted =
    item.promotion != null
      ? Math.round(item.pricePerNight * (1 - item.promotion / 100))
      : item.pricePerNight;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <Link to={`/hebergements/${item.id}`} className="relative block aspect-[16/10] overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <span className="absolute left-3 top-3 rounded-full bg-navy-900/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
          {TYPE_LABELS[item.type]}
        </span>
        {item.promotion != null && (
          <span className="absolute right-3 top-3 rounded-full bg-brand-500 px-2.5 py-1 text-[11px] font-bold text-white">
            -{item.promotion}%
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-display text-lg font-semibold text-navy-900">
              <Link to={`/hebergements/${item.id}`} className="hover:text-brand-600">
                {item.name}
              </Link>
            </h3>
            <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
              <MapPin className="h-3.5 w-3.5 text-brand-500" aria-hidden />
              {item.district}, {item.city}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-1 rounded-lg bg-amber-50 px-2 py-1 text-sm font-semibold text-amber-700">
            <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" aria-hidden />
            {item.rating.toFixed(1)}
          </div>
        </div>

        <div className="mt-auto flex items-end justify-between gap-3 border-t border-slate-100 pt-3">
          <div>
            {item.promotion != null && (
              <p className="text-xs text-slate-400 line-through">
                {formatCurrency(item.pricePerNight, item.currency)}
              </p>
            )}
            <p className="font-display text-lg font-bold text-brand-600">
              {formatCurrency(discounted, item.currency)}
              <span className="ml-1 text-sm font-medium text-slate-500">/ nuit</span>
            </p>
          </div>
          <Link
            to={`/hebergements/${item.id}`}
            className="rounded-lg bg-brand-500 px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-brand-600"
          >
            Détails
          </Link>
        </div>
      </div>
    </article>
  );
}
