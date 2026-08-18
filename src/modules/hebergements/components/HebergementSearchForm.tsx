import { FormEvent, useState } from "react";
import { CalendarDays, MapPin, Users, Search } from "lucide-react";
import type { AccommodationType, HebergementSearchFilters } from "../types";
import { TYPE_LABELS } from "../data/mockAccommodations";

const TYPES: Array<AccommodationType | "ALL"> = [
  "ALL",
  "HOTEL",
  "APPARTEMENT",
  "VILLA",
  "MAISON",
  "RESIDENCE",
];

interface Props {
  initial?: Partial<HebergementSearchFilters>;
  onSearch: (filters: HebergementSearchFilters) => void;
  compact?: boolean;
}

export function HebergementSearchForm({ initial, onSearch, compact }: Props) {
  const [destination, setDestination] = useState(initial?.destination ?? "");
  const [checkIn, setCheckIn] = useState(initial?.checkIn ?? "");
  const [checkOut, setCheckOut] = useState(initial?.checkOut ?? "");
  const [guests, setGuests] = useState(initial?.guests ?? 2);
  const [type, setType] = useState<AccommodationType | "ALL">(initial?.type ?? "ALL");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSearch({ destination, checkIn, checkOut, guests, type });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={
        compact
          ? "rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          : "rounded-2xl bg-white p-4 shadow-xl shadow-navy-900/15 sm:p-6"
      }
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <label className="flex flex-col gap-1.5 lg:col-span-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Destination</span>
          <span className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/20">
            <MapPin className="h-4 w-4 text-brand-500" aria-hidden />
            <input
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Ville, quartier, pays…"
              className="w-full bg-transparent text-sm text-navy-900 placeholder:text-slate-400 focus:outline-none"
            />
          </span>
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Arrivée</span>
          <span className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/20">
            <CalendarDays className="h-4 w-4 text-brand-500" aria-hidden />
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full bg-transparent text-sm text-navy-900 focus:outline-none"
            />
          </span>
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Départ</span>
          <span className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/20">
            <CalendarDays className="h-4 w-4 text-brand-500" aria-hidden />
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full bg-transparent text-sm text-navy-900 focus:outline-none"
            />
          </span>
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Voyageurs</span>
          <span className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/20">
            <Users className="h-4 w-4 text-brand-500" aria-hidden />
            <input
              type="number"
              min={1}
              max={20}
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value) || 1)}
              className="w-full bg-transparent text-sm text-navy-900 focus:outline-none"
            />
          </span>
        </label>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {TYPES.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setType(t)}
              className={
                type === t
                  ? "rounded-full bg-navy-900 px-3 py-1.5 text-xs font-semibold text-white"
                  : "rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-200"
              }
            >
              {TYPE_LABELS[t]}
            </button>
          ))}
        </div>

        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-500 px-6 py-3 font-display text-sm font-bold text-white transition hover:bg-brand-600"
        >
          <Search className="h-4 w-4" aria-hidden />
          Rechercher
        </button>
      </div>
    </form>
  );
}
