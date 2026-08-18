import { Link, useNavigate, useParams } from "react-router-dom";
import clsx from "clsx";
import { Briefcase, Luggage, Minus, Plus } from "lucide-react";
import { BAGGAGE_OPTIONS, EXTRA_BAG_PRICE, formatFcfa, getFlightById } from "../data/flights";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setBaggageExtra } from "@/redux/slices/billetterieSlice";
import { computeTotals } from "../utils";
import { FlightSearchBar } from "../components/FlightSearchBar";
import { Breadcrumbs, btnOrange, btnOutline } from "../components/ui";

export function BaggagePage() {
  const { id = "" } = useParams();
  const flight = getFlightById(id);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const draft = useAppSelector((s) => s.billetterie);

  if (!flight) {
    return (
      <div className="p-10 text-center">
        <Link to="/billetterie" className="text-[#ff5c00]">
          Retour
        </Link>
      </div>
    );
  }

  const totals = computeTotals(
    flight,
    draft.search.adults,
    draft.seats,
    draft.extras,
    draft.baggageExtra
  );

  return (
    <div className="space-y-6">
      <FlightSearchBar />
      <Breadcrumbs
        items={[
          { label: "Accueil", to: "/billetterie" },
          { label: "Billets", to: "/billetterie" },
          { label: "Détail", to: `/billetterie/${id}` },
          { label: "Voyageurs", to: `/billetterie/${id}/voyageurs` },
          { label: "Sièges", to: `/billetterie/${id}/sieges` },
          { label: "Bagages" },
        ]}
      />

      <div className="grid gap-6 lg:grid-cols-[1.7fr_0.9fr]">
        <div className="space-y-6">
          <div>
            <h1 className="font-display text-3xl font-bold text-[#0d1b3d]">Choisissez vos bagages</h1>
            <p className="mt-2 text-slate-500">
              Votre tarif inclut déjà cabine {flight.cabinKg} kg et soute {flight.holdKg} kg par
              passager. Ajoutez des bagages supplémentaires si besoin.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-orange-50 text-[#ff5c00]">
                <Briefcase className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-[#0d1b3d]">Cabine incluse</h3>
              <p className="mt-1 text-sm text-slate-500">{flight.cabinKg} kg · 1 pièce cabine</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-sky-50 text-[#0d1b3d]">
                <Luggage className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-[#0d1b3d]">Soute incluse</h3>
              <p className="mt-1 text-sm text-slate-500">{flight.holdKg} kg · 1 valise enregistrée</p>
            </div>
          </div>

          {draft.passengers.map((p, index) => {
            const count = draft.baggageExtra[index] ?? 0;
            return (
              <section
                key={index}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
              >
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex size-8 items-center justify-center rounded-full bg-[#0d1b3d] text-sm font-bold text-white">
                      {index + 1}
                    </span>
                    <div>
                      <h2 className="font-semibold text-[#0d1b3d]">
                        Passager {index + 1}
                        {p.firstName || p.lastName
                          ? ` — ${p.firstName} ${p.lastName}`.trim()
                          : ""}
                      </h2>
                      <p className="text-sm text-slate-500">
                        Supplément : {formatFcfa(EXTRA_BAG_PRICE)} / bagage 23 kg
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      aria-label="Retirer un bagage"
                      disabled={count <= 0}
                      onClick={() =>
                        dispatch(setBaggageExtra({ index, count: count - 1 }))
                      }
                      className="flex size-9 items-center justify-center rounded-full border border-slate-200 disabled:opacity-40"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="min-w-[2rem] text-center text-lg font-bold text-[#0d1b3d]">
                      {count}
                    </span>
                    <button
                      type="button"
                      aria-label="Ajouter un bagage"
                      disabled={count >= 3}
                      onClick={() =>
                        dispatch(setBaggageExtra({ index, count: count + 1 }))
                      }
                      className="flex size-9 items-center justify-center rounded-full border border-[#ff5c00] text-[#ff5c00] disabled:opacity-40"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="grid gap-2 sm:grid-cols-2">
                  {BAGGAGE_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => dispatch(setBaggageExtra({ index, count: opt.id }))}
                      className={clsx(
                        "rounded-xl border px-4 py-3 text-left transition",
                        count === opt.id
                          ? "border-[#ff5c00] bg-orange-50"
                          : "border-slate-200 hover:border-slate-300"
                      )}
                    >
                      <p className="text-sm font-semibold text-[#0d1b3d]">{opt.label}</p>
                      <p className="mt-0.5 text-xs text-slate-500">{opt.description}</p>
                    </button>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        <aside className="h-fit space-y-4 lg:sticky lg:top-24">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="bg-[#0d1b3d] px-4 py-3 text-white">
              <p className="text-sm font-semibold">Résumé bagages</p>
              <p className="text-xs text-white/70">
                {flight.airline} · {flight.flightNumber}
              </p>
            </div>
            <div className="space-y-2 p-4 text-sm">
              {draft.passengers.map((_, i) => (
                <div key={i} className="flex justify-between">
                  <span className="text-slate-500">Passager {i + 1}</span>
                  <span className="font-medium text-[#0d1b3d]">
                    {(draft.baggageExtra[i] ?? 0) === 0
                      ? "Inclus"
                      : `+${draft.baggageExtra[i]} × 23 kg`}
                  </span>
                </div>
              ))}
              <div className="my-2 h-px bg-slate-100" />
              <div className="flex justify-between">
                <span className="text-slate-500">Sous-total vol</span>
                <span>{formatFcfa(totals.subtotal + totals.seatFees + totals.extraFees)}</span>
              </div>
              {totals.baggageFees > 0 && (
                <div className="flex justify-between text-[#ff5c00]">
                  <span>Bagages extra</span>
                  <span>+{formatFcfa(totals.baggageFees)}</span>
                </div>
              )}
              <p className="pt-2 font-display text-2xl font-bold text-[#0d1b3d]">
                {formatFcfa(totals.total)}
              </p>
              <button
                type="button"
                className={`${btnOrange} mt-4 w-full`}
                onClick={() => navigate(`/billetterie/${id}/paiement`)}
              >
                Continuer vers le paiement
              </button>
              <Link to={`/billetterie/${id}/sieges`} className={`${btnOutline} mt-3 w-full`}>
                Retour
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
