import { Plane } from "lucide-react";
import { Link } from "react-router-dom";
import type { Flight } from "../types";
import { formatFcfa } from "../data/flights";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectFlight, toggleCompare } from "@/redux/slices/billetterieSlice";
import { btnOrange } from "./ui";

export function FlightCard({ flight }: { flight: Flight }) {
  const dispatch = useAppDispatch();
  const compareIds = useAppSelector((s) => s.billetterie.compareIds);
  const compared = compareIds.includes(flight.id);

  return (
    <article className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0px_4px_20px_0px_rgba(13,27,61,0.05)] sm:p-6">
      {flight.bestChoice && (
        <span className="absolute right-0 top-0 rounded-bl-xl bg-[#ff5c00] px-3 py-1.5 text-xs font-bold text-white">
          Meilleur choix
        </span>
      )}

      <div className="grid gap-5 lg:grid-cols-[1fr_1.5fr_auto] lg:items-center">
        <div className="flex items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-[#0d1b3d]">
            {flight.airlineCode}
          </div>
          <div>
            <p className="font-semibold text-[#0d1b3d]">{flight.airline}</p>
            <p className="text-xs text-slate-400">{flight.flightNumber}</p>
          </div>
        </div>

        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          <div>
            <p className="text-2xl font-bold text-[#0d1b3d]">{flight.departTime}</p>
            <p className="text-sm text-slate-500">
              {flight.from.code} - {flight.from.city}
            </p>
          </div>

          <div className="min-w-[120px] text-center">
            <p className="text-xs text-slate-400">{flight.duration}</p>
            <div className="relative my-2 flex items-center justify-center">
              <span className="h-px w-full bg-slate-300" />
              <Plane className="absolute size-4 text-[#0d1b3d]" />
            </div>
            <p
              className={
                flight.stops === 0
                  ? "text-xs font-semibold text-[#1D70D1]"
                  : "text-xs font-medium text-[#ff5c00]"
              }
            >
              {flight.stopLabel}
            </p>
          </div>

          <div className="text-right">
            <p className="text-2xl font-bold text-[#0d1b3d]">{flight.arriveTime}</p>
            <p className="text-sm text-slate-500">
              {flight.to.code} - {flight.to.city}
            </p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-xl font-bold text-[#0d1b3d]">{formatFcfa(flight.price)}</p>
          <p className="text-xs text-slate-400">Prix par adulte</p>
          <Link
            to={`/billetterie/${flight.id}`}
            onClick={() => dispatch(selectFlight(flight.id))}
            className={`${btnOrange} mt-3 w-full sm:w-auto`}
          >
            Sélectionner
          </Link>
          <label className="mt-3 flex cursor-pointer items-center justify-end gap-2 text-xs text-slate-500">
            <input
              type="checkbox"
              checked={compared}
              onChange={() => dispatch(toggleCompare(flight.id))}
              className="accent-[#0d1b3d]"
            />
            Comparer ce vol
          </label>
        </div>
      </div>
    </article>
  );
}
