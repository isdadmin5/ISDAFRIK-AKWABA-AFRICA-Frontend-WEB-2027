import { ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setSortBy } from "@/redux/slices/billetterieSlice";
import { flights } from "../data/flights";
import { filterFlights, sortFlights } from "../utils";
import { FlightSearchBar } from "../components/FlightSearchBar";
import { FlightFilters } from "../components/FlightFilters";
import { FlightCard } from "../components/FlightCard";
import { Breadcrumbs } from "../components/ui";

export function FlightResultsPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { filters, sortBy, search } = useAppSelector((s) => s.billetterie);
  const [visible, setVisible] = useState(4);

  const results = useMemo(() => {
    return sortFlights(filterFlights(flights, filters), sortBy);
  }, [filters, sortBy]);

  const shown = results.slice(0, visible);

  return (
    <div className="space-y-6">
      <FlightSearchBar onSearch={() => setVisible(4)} />

      <Breadcrumbs
        items={[
          { label: "Accueil", to: "/billetterie" },
          { label: "Billets", to: "/billetterie" },
          { label: "Résultats" },
        ]}
      />

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <FlightFilters />

        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-slate-600">
              <span className="font-semibold text-[#0d1b3d]">{results.length} vols trouvés</span>
              <span className="mx-2 text-slate-300">·</span>
              {search.from} → {search.to}
            </p>
            <label className="flex items-center gap-2 text-sm text-slate-600">
              Trier par:
              <select
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-[#0d1b3d]"
                value={sortBy}
                onChange={(e) =>
                  dispatch(setSortBy(e.target.value as "best" | "price" | "duration"))
                }
              >
                <option value="best">Meilleur choix</option>
                <option value="price">Prix croissant</option>
                <option value="duration">Durée</option>
              </select>
            </label>
          </div>

          {shown.map((flight) => (
            <FlightCard key={flight.id} flight={flight} />
          ))}

          {visible < results.length && (
            <button
              type="button"
              onClick={() => setVisible((v) => v + 4)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-100 py-3 text-sm font-semibold text-[#0d1b3d] hover:bg-slate-200"
            >
              Afficher plus de vols
              <ChevronDown className="h-4 w-4" />
            </button>
          )}

          {results.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
              Aucun vol ne correspond à vos filtres.
              <button
                type="button"
                className="mt-4 block w-full text-[#ff5c00]"
                onClick={() => navigate("/billetterie")}
              >
                Modifier la recherche
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
