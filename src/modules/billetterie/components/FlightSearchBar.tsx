import clsx from "clsx";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setSearch, swapAirports } from "@/redux/slices/billetterieSlice";
import { AIRPORTS } from "../data/flights";
import type { TripType } from "../types";
import { FigmaIcon } from "./FigmaIcon";

export function FlightSearchBar({
  onSearch,
  variant = "default",
}: {
  onSearch?: () => void;
  variant?: "default" | "hero";
}) {
  const dispatch = useAppDispatch();
  const search = useAppSelector((s) => s.billetterie.search);

  const tripTypes: Array<{ id: TripType; label: string }> = [
    { id: "roundtrip", label: "Aller-retour" },
    { id: "oneway", label: "Aller simple" },
    { id: "multi", label: "Multi-destinations" },
  ];

  const fieldCls =
    "w-full rounded-2xl border border-[#c6c6cf] bg-white px-3 py-[13px] text-base text-[#0d1b3d] placeholder:text-[#6b7280] focus:border-[#ff5c00] focus:outline-none focus:ring-2 focus:ring-orange-100";
  const labelCls =
    "mb-1 block pl-1 text-xs font-medium uppercase tracking-[0.6px] text-[#4b5563]";

  return (
    <div
      className={clsx(
        "rounded-[24px] p-6 shadow-[0px_8px_15px_rgba(13,27,61,0.12)] sm:p-8",
        variant === "hero" ? "bg-white" : "border border-slate-200/80 bg-white"
      )}
    >
      <div className="mb-6 flex flex-wrap gap-5">
        {tripTypes.map((t) => (
          <label
            key={t.id}
            className="inline-flex cursor-pointer items-center gap-2 text-sm font-medium"
          >
            <span
              className={clsx(
                "flex size-[22px] items-center justify-center overflow-clip rounded-full border",
                search.tripType === t.id
                  ? "border-transparent bg-[#ff5c00]"
                  : "border-[#76767f] bg-white"
              )}
            >
              {search.tripType === t.id && (
                <span className="size-2 rounded-full bg-white" />
              )}
            </span>
            <input
              type="radio"
              className="sr-only"
              checked={search.tripType === t.id}
              onChange={() => dispatch(setSearch({ tripType: t.id }))}
            />
            <span className={search.tripType === t.id ? "text-[#0d1b3d]" : "text-[#4b5563]"}>
              {t.label}
            </span>
          </label>
        ))}
      </div>

      <div className="grid gap-3 lg:grid-cols-[1.1fr_auto_1.1fr_1fr_1fr_1.25fr_auto] lg:items-end">
        <div>
          <p className={labelCls}>Départ</p>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
              <FigmaIcon name="planeDepart" size={20} />
            </span>
            <select
              className={`${fieldCls} pl-10`}
              value={search.from}
              onChange={(e) => dispatch(setSearch({ from: e.target.value }))}
            >
              {AIRPORTS.map((a) => (
                <option key={a.code} value={a.code}>
                  {a.city} ({a.code})
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="button"
          aria-label="Inverser départ et arrivée"
          onClick={() => dispatch(swapAirports())}
          className="mx-auto flex size-10 items-center justify-center rounded-full border border-[#c6c6cf] bg-white shadow-sm lg:mb-1"
        >
          <FigmaIcon name="swap" size={18} />
        </button>

        <div>
          <p className={labelCls}>Arrivée</p>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
              <FigmaIcon name="planeArrive" size={20} />
            </span>
            <select
              className={`${fieldCls} pl-10`}
              value={search.to}
              onChange={(e) => dispatch(setSearch({ to: e.target.value }))}
            >
              {AIRPORTS.map((a) => (
                <option key={a.code} value={a.code}>
                  {a.city} ({a.code})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <p className={labelCls}>Aller</p>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
              <FigmaIcon name="calendar" size={18} />
            </span>
            <input
              type="date"
              className={`${fieldCls} pl-10`}
              value={search.departDate}
              onChange={(e) => dispatch(setSearch({ departDate: e.target.value }))}
              placeholder="Date"
            />
          </div>
        </div>

        <div>
          <p className={labelCls}>Retour</p>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
              <FigmaIcon name="calendar" size={18} />
            </span>
            <input
              type="date"
              className={`${fieldCls} pl-10`}
              disabled={search.tripType === "oneway"}
              value={search.returnDate}
              onChange={(e) => dispatch(setSearch({ returnDate: e.target.value }))}
              placeholder="Date"
            />
          </div>
        </div>

        <div>
          <p className={labelCls}>Passagers / Classe</p>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
              <FigmaIcon name="passengers" size={18} />
            </span>
            <select
              className={`${fieldCls} appearance-none pl-10 pr-10`}
              value={`${search.adults}-${search.cabin}`}
              onChange={(e) => {
                const [adults, cabin] = e.target.value.split("-");
                dispatch(
                  setSearch({
                    adults: Number(adults),
                    cabin: cabin as "eco" | "business" | "first",
                  })
                );
              }}
            >
              <option value="1-eco">1 Adulte, Éco</option>
              <option value="2-eco">2 Adultes, Éco</option>
              <option value="3-eco">3 Adultes, Éco</option>
              <option value="1-business">1 Adulte, Business</option>
              <option value="2-business">2 Adultes, Business</option>
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
              <FigmaIcon name="chevronDown" size={12} />
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={onSearch}
          className="inline-flex h-[54px] items-center justify-center gap-2 rounded-2xl bg-[#ff5c00] px-5 text-base font-semibold text-white shadow-[0px_4px_6px_-1px_rgba(245,166,35,0.2)] transition hover:bg-[#e65200]"
        >
          <FigmaIcon name="search" size={18} />
          Rechercher
        </button>
      </div>
    </div>
  );
}
