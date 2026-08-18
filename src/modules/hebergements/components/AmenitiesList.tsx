import { AMENITY_META } from "../data/amenities";
import type { AmenityKey } from "../types";

export function AmenitiesList({ amenities }: { amenities: AmenityKey[] }) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {amenities.map((key) => {
        const meta = AMENITY_META[key];
        const Icon = meta.Icon;
        return (
          <li
            key={key}
            className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-navy-900"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500/10 text-brand-600">
              <Icon className="h-4 w-4" aria-hidden />
            </span>
            {meta.label}
          </li>
        );
      })}
    </ul>
  );
}
