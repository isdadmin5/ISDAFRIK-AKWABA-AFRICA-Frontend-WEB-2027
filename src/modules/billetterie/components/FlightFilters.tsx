import clsx from "clsx";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { resetFilters, setFilters } from "@/redux/slices/billetterieSlice";
import { formatFcfa } from "../data/flights";

const AIRLINES = ["ASKY Airlines", "Air Côte d'Ivoire", "Brussels Airlines", "Air France"];
const STOPS = [
  { id: "direct", label: "Direct" },
  { id: "1", label: "1 Escale" },
  { id: "2+", label: "2+ Escales" },
];
const SLOTS = [
  { id: "00-06", label: "00:00 - 06:00" },
  { id: "06-12", label: "06:00 - 12:00" },
  { id: "12-18", label: "12:00 - 18:00" },
  { id: "18-24", label: "18:00 - 00:00" },
];

function toggleIn(list: string[], value: string) {
  return list.includes(value) ? list.filter((x) => x !== value) : [...list, value];
}

export function FlightFilters() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((s) => s.billetterie.filters);

  return (
    <aside className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0px_4px_20px_0px_rgba(13,27,61,0.05)]">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-bold text-[#0d1b3d]">Filtres</h2>
        <button
          type="button"
          onClick={() => dispatch(resetFilters())}
          className="text-xs font-bold uppercase tracking-wide text-[#ff5c00]"
        >
          Réinitialiser
        </button>
      </div>

      <section className="mb-6">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-semibold text-[#0d1b3d]">Prix max</span>
          <span className="font-semibold text-[#ff5c00]">
            {filters.maxPrice >= 1000000
              ? "1M FCFA"
              : `${Math.round(filters.maxPrice / 1000)}k FCFA`}
          </span>
        </div>
        <input
          type="range"
          min={40000}
          max={1000000}
          step={10000}
          value={filters.maxPrice}
          onChange={(e) => dispatch(setFilters({ maxPrice: Number(e.target.value) }))}
          className="w-full accent-[#ff5c00]"
        />
        <div className="mt-1 flex justify-between text-xs text-slate-400">
          <span>40k FCFA</span>
          <span>1M FCFA</span>
        </div>
        <p className="mt-1 text-xs text-slate-400">{formatFcfa(filters.maxPrice)}</p>
      </section>

      <section className="mb-6">
        <h3 className="mb-3 text-sm font-semibold text-[#0d1b3d]">Compagnies aériennes</h3>
        <div className="space-y-2">
          {AIRLINES.map((airline) => (
            <label key={airline} className="flex cursor-pointer items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={filters.airlines.includes(airline)}
                onChange={() =>
                  dispatch(setFilters({ airlines: toggleIn(filters.airlines, airline) }))
                }
                className="h-4 w-4 rounded accent-[#0d1b3d]"
              />
              {airline}
            </label>
          ))}
        </div>
      </section>

      <section className="mb-6">
        <h3 className="mb-3 text-sm font-semibold text-[#0d1b3d]">Escales</h3>
        <div className="space-y-2">
          {STOPS.map((s) => (
            <label key={s.id} className="flex cursor-pointer items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={filters.stops.includes(s.id)}
                onChange={() => dispatch(setFilters({ stops: toggleIn(filters.stops, s.id) }))}
                className="h-4 w-4 rounded accent-[#0d1b3d]"
              />
              {s.label}
            </label>
          ))}
        </div>
      </section>

      <section className="mb-6">
        <h3 className="mb-3 text-sm font-semibold text-[#0d1b3d]">Horaires de départ</h3>
        <div className="grid grid-cols-2 gap-2">
          {SLOTS.map((slot) => {
            const active = filters.departureSlots.includes(slot.id);
            return (
              <button
                key={slot.id}
                type="button"
                onClick={() =>
                  dispatch(
                    setFilters({ departureSlots: toggleIn(filters.departureSlots, slot.id) })
                  )
                }
                className={clsx(
                  "rounded-lg border px-2 py-2 text-xs font-medium transition",
                  active
                    ? "border-[#ff5c00] text-[#ff5c00]"
                    : "border-slate-200 text-[#0d1b3d] hover:border-slate-300"
                )}
              >
                {slot.label}
              </button>
            );
          })}
        </div>
      </section>

      <section>
        <h3 className="mb-3 text-sm font-semibold text-[#0d1b3d]">Services & Politiques</h3>
        <div className="space-y-2">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={filters.freeCancel}
              onChange={(e) => dispatch(setFilters({ freeCancel: e.target.checked }))}
              className="h-4 w-4 rounded accent-[#0d1b3d]"
            />
            Annulation gratuite
          </label>
          <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={filters.bagsIncluded}
              onChange={(e) => dispatch(setFilters({ bagsIncluded: e.target.checked }))}
              className="h-4 w-4 rounded accent-[#0d1b3d]"
            />
            Bagages inclus
          </label>
        </div>
      </section>
    </aside>
  );
}
