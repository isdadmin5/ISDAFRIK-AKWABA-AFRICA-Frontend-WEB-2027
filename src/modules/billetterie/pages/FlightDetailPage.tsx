import { Link, useNavigate, useParams } from "react-router-dom";
import { Plane } from "lucide-react";
import { getFlightById, formatFcfa } from "../data/flights";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectFlight } from "@/redux/slices/billetterieSlice";
import { computeTotals } from "../utils";
import { FlightSearchBar } from "../components/FlightSearchBar";
import { Breadcrumbs, btnNavy, btnOrange } from "../components/ui";
import { FigmaIcon } from "../components/FigmaIcon";
import { useEffect } from "react";

export function FlightDetailPage() {
  const { id = "" } = useParams();
  const flight = getFlightById(id);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { search, seats, extras, baggageExtra } = useAppSelector((s) => s.billetterie);

  useEffect(() => {
    if (flight) dispatch(selectFlight(flight.id));
  }, [flight, dispatch]);

  if (!flight) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
        <p>Vol introuvable.</p>
        <Link to="/billetterie" className="mt-4 inline-block text-[#ff5c00]">
          Retour
        </Link>
      </div>
    );
  }

  const totals = computeTotals(flight, search.adults, seats, extras, baggageExtra);
  const dateLabel = search.departDate
    ? new Date(search.departDate + "T12:00:00").toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "18 juil. 2026";

  const services = [
    { icon: "svcCabin" as const, label: `Cabine ${flight.cabinKg}kg` },
    { icon: "svcHold" as const, label: `Soute ${flight.holdKg}kg` },
    { icon: "svcMeal" as const, label: flight.mealIncluded ? "Repas inclus" : "Repas non inclus" },
    { icon: "svcSeat" as const, label: "Siège standard" },
    { icon: "svcModifiable" as const, label: "Modifiable (frais)" },
    { icon: "svcEticket" as const, label: "Billet électronique" },
  ];

  return (
    <div className="space-y-6">
      <FlightSearchBar />
      <Breadcrumbs
        items={[
          { label: "Accueil", to: "/billetterie" },
          { label: "Billets", to: "/billetterie" },
          { label: "Détail" },
        ]}
      />

      <div className="grid gap-6 lg:grid-cols-[1.7fr_0.9fr]">
        <div className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-[#0d1b3d]">
                  {flight.airlineCode}
                </div>
                <div>
                  <p className="font-semibold text-[#0d1b3d]">{flight.airline}</p>
                  <p className="text-sm text-slate-500">
                    Vol {flight.flightNumber}{" "}
                    <span className="font-semibold text-[#ff5c00]">
                      {flight.stopLabel === "Direct" ? "Vol direct" : flight.stopLabel}
                    </span>
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                Vol confirmé
              </span>
            </div>

            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
              <div>
                <p className="font-display text-3xl font-bold text-[#0d1b3d]">{flight.departTime}</p>
                <p className="mt-1 font-semibold text-[#0d1b3d]">{flight.from.code}</p>
                <p className="text-sm text-slate-500">
                  {flight.from.city}, {flight.from.country}
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto flex items-center gap-2">
                  <span className="h-px w-10 bg-slate-300 sm:w-16" />
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0d1b3d] text-white">
                    <Plane className="h-4 w-4" />
                  </span>
                  <span className="h-px w-10 bg-slate-300 sm:w-16" />
                </div>
                <p className="mt-2 text-sm text-slate-500">{flight.duration.replace("m", "min")}</p>
              </div>
              <div className="text-right">
                <p className="font-display text-3xl font-bold text-[#0d1b3d]">{flight.arriveTime}</p>
                <p className="mt-1 font-semibold text-[#0d1b3d]">{flight.to.code}</p>
                <p className="text-sm text-slate-500">
                  {flight.to.city}, {flight.to.country}
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((s) => (
                <div
                  key={s.label}
                  className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2.5 text-sm text-[#0d1b3d]"
                >
                  <FigmaIcon name={s.icon} size={18} />
                  {s.label}
                </div>
              ))}
            </div>
          </section>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Modification",
                text: "Possible jusqu'à 24h avant le départ avec frais de dossier.",
                tone: "bg-sky-50",
                icon: "policyMod" as const,
              },
              {
                title: "Annulation",
                text: "Annulation possible avec frais variables selon la date.",
                tone: "bg-orange-50",
                icon: "policyCancel" as const,
              },
              {
                title: "Remboursement",
                text: "Remboursement partiel des taxes aéroportuaires uniquement.",
                tone: "bg-slate-100",
                icon: "policyRefund" as const,
              },
            ].map((c) => (
              <div key={c.title} className={`rounded-2xl p-4 ${c.tone}`}>
                <div className="mb-2">
                  <FigmaIcon name={c.icon} size={22} />
                </div>
                <p className="font-semibold text-[#0d1b3d]">{c.title}</p>
                <p className="mt-2 text-sm text-[#0d1b3d]/80">{c.text}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl bg-[#0d1b3d] p-5 text-white">
            <div className="flex gap-3">
              <FigmaIcon name="infoI" size={20} className="mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold">Informations de voyage</p>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-white/85">
                  <li>Arrivée à l&apos;aéroport recommandée 2h avant le décollage.</li>
                  <li>Passeport ou CNI en cours de validité requis pour tous les passagers.</li>
                </ul>
              </div>
            </div>
          </div>

          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:grid md:grid-cols-2">
            <img
              src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=900&q=80"
              alt={flight.airline}
              className="h-48 w-full object-cover md:h-full"
            />
            <div className="p-5 sm:p-6">
              <h2 className="font-display text-xl font-bold text-[#0d1b3d]">
                À propos de {flight.airline}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Compagnie de référence sur les liaisons ouest-africaines, {flight.airline} propose
                des connexions fiables, un service à bord attentif et une expérience adaptée aux
                voyageurs d&apos;affaires comme loisirs.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                  Flotte Moderne
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                  Compagnie Panafricaine
                </span>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 font-display text-xl font-bold text-[#0d1b3d]">
              Vous pourriez également être intéressé
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                {
                  title: "Assurance voyage",
                  tag: "Conseillé",
                  price: "À partir de 12 000 FCFA",
                  img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=600&q=80",
                },
                {
                  title: "Salon VIP",
                  price: "15 000 FCFA",
                  img: "https://images.unsplash.com/photo-1540962351504-4693d4d9f1e0?auto=format&fit=crop&w=600&q=80",
                },
                {
                  title: "Hôtel aéroport",
                  price: "À partir de 45 000 FCFA",
                  img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                >
                  <img src={item.img} alt={item.title} className="h-36 w-full object-cover" />
                  {item.tag && (
                    <span className="absolute right-0 top-0 rounded-bl-xl bg-[#ff5c00] px-2.5 py-1 text-xs font-bold text-white">
                      {item.tag}
                    </span>
                  )}
                  <div className="relative p-4 pr-12">
                    <p className="font-semibold text-[#0d1b3d]">{item.title}</p>
                    <p className="mt-1 text-sm text-slate-500">{item.price}</p>
                    <span className="absolute bottom-4 right-4 inline-flex size-8 overflow-clip">
                      <FigmaIcon name="plusArrow" size={32} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="h-fit space-y-4 lg:sticky lg:top-24">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="font-display text-lg font-bold text-[#0d1b3d]">
              Récapitulatif de la sélection
            </h2>
            <p className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[#0d1b3d]">
              <Plane className="h-4 w-4" />
              Aller simple
            </p>
            <p className="font-semibold text-[#0d1b3d]">
              {flight.airline} • {flight.flightNumber}
            </p>

            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between gap-3">
                <dt className="text-slate-500">Trajet</dt>
                <dd className="font-medium text-[#0d1b3d]">
                  {flight.from.code} → {flight.to.code}
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-slate-500">Date</dt>
                <dd className="font-medium text-[#0d1b3d]">{dateLabel}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-slate-500">Passagers</dt>
                <dd className="font-medium text-[#0d1b3d]">{search.adults} Adultes</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-slate-500">Bagages</dt>
                <dd className="font-medium text-[#0d1b3d]">
                  {search.adults} x {flight.holdKg}kg + {search.adults} x {flight.cabinKg}kg
                </dd>
              </div>
            </dl>

            <div className="my-4 h-px bg-slate-100" />
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-slate-500">Billet (x{search.adults})</dt>
                <dd>{formatFcfa(totals.tickets)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">Taxes et frais</dt>
                <dd>{formatFcfa(totals.taxes)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">Frais de service</dt>
                <dd>{formatFcfa(totals.serviceFee)}</dd>
              </div>
            </dl>
            <div className="my-4 h-px bg-slate-100" />
            <p className="font-display text-2xl font-bold text-[#0d1b3d]">
              Total: {formatFcfa(totals.total)}
            </p>

            <button
              type="button"
              className={`${btnOrange} mt-5 w-full`}
              onClick={() => navigate(`/billetterie/${flight.id}/voyageurs`)}
            >
              Continuer la réservation
            </button>
            <Link to="/billetterie/resultats" className={`${btnNavy} mt-3 w-full`}>
              Retour aux résultats
            </Link>
            <p className="mt-4 text-center text-xs text-slate-400">
              Prix final incluant toutes les taxes obligatoires.
            </p>
            <div className="mt-3 flex items-center justify-center gap-4">
              <FigmaIcon name="trustShield2" size={18} />
              <FigmaIcon name="trustLock" size={18} />
              <FigmaIcon name="trustCard" size={18} />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
