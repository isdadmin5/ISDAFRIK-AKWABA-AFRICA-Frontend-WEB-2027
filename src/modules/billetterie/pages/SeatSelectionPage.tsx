import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import clsx from "clsx";
import { EXTRA_SERVICES, QUICK_EXTRAS, formatFcfa, getFlightById } from "../data/flights";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setSeat, toggleExtra } from "@/redux/slices/billetterieSlice";
import { computeTotals } from "../utils";
import { FlightSearchBar } from "../components/FlightSearchBar";
import { Breadcrumbs, btnOrange, btnOutline } from "../components/ui";
import { FigmaIcon, type BilletIconName } from "../components/FigmaIcon";

type SeatStatus = "available" | "occupied" | "selected" | "premium" | "legroom";

const COLS = ["A", "B", "C", "D", "E", "F"] as const;
const ROWS = [10, 11, 12, 14];

/** Aligné maquette Figma 282:4918 */
const OCCUPIED = new Set(["11A", "11B", "11D", "11E", "11F", "12E"]);
const PREMIUM = new Set(["11C"]);
const LEGROOM = new Set(["10A", "10B", "10C", "10D", "10E", "10F"]);

const QUICK_ICONS: Record<string, BilletIconName> = {
  meal: "extraMeal",
  boarding: "extraBoard",
  lounge: "extraLounge",
};

const SERVICE_ICONS: Record<string, BilletIconName> = {
  vip: "svcVip",
  insurance: "svcInsurance",
  priority: "svcPriority",
  transfer: "svcTransfer",
};

function seatPrice(id: string) {
  if (LEGROOM.has(id)) return 20000;
  if (PREMIUM.has(id)) return 15000;
  return 0;
}

function seatType(id: string) {
  const col = id.slice(-1);
  if (col === "A" || col === "F") return "Fenêtre";
  if (col === "C" || col === "D") return "Couloir";
  return "Milieu";
}

export function SeatSelectionPage() {
  const { id = "" } = useParams();
  const flight = getFlightById(id);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const draft = useAppSelector((s) => s.billetterie);
  const [activePassenger, setActivePassenger] = useState(0);

  const selectedMap = useMemo(() => {
    const map = new Map<string, number>();
    draft.seats.forEach((s) => map.set(s.seatId, s.passengerIndex));
    return map;
  }, [draft.seats]);

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
  const activeSeat = draft.seats.find((s) => s.passengerIndex === activePassenger);

  function statusOf(seatId: string): SeatStatus {
    if (selectedMap.has(seatId)) return "selected";
    if (OCCUPIED.has(seatId)) return "occupied";
    if (PREMIUM.has(seatId)) return "premium";
    if (LEGROOM.has(seatId)) return "legroom";
    return "available";
  }

  function onSeatClick(seatId: string) {
    const st = statusOf(seatId);
    if (st === "occupied") return;
    if (st === "selected" && selectedMap.get(seatId) !== activePassenger) return;
    dispatch(
      setSeat({
        passengerIndex: activePassenger,
        seatId,
        price: seatPrice(seatId),
        type: seatType(seatId),
      })
    );
  }

  function continueToBaggage() {
    navigate(`/billetterie/${id}/bagages`);
  }

  return (
    <div className="space-y-6">
      <FlightSearchBar />
      <Breadcrumbs
        items={[
          { label: "Accueil", to: "/billetterie" },
          { label: "Billets", to: "/billetterie" },
          { label: "Détail", to: `/billetterie/${id}` },
          { label: "Informations des voyageurs", to: `/billetterie/${id}/voyageurs` },
          { label: "Choix des sièges" },
        ]}
      />

      <div className="grid gap-6 lg:grid-cols-[1.7fr_0.9fr]">
        <div className="space-y-6">
          <div>
            <h1 className="font-display text-3xl font-bold text-[#0d1b3d]">Choisissez vos sièges</h1>
            <p className="mt-2 text-slate-500">
              Sélectionnez vos sièges afin de voyager confortablement de {flight.from.city} vers{" "}
              {flight.to.city}.
            </p>
          </div>

          <div className="inline-flex flex-wrap gap-1 rounded-[20px] bg-[#f3f3f3] p-1">
            {draft.passengers.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActivePassenger(i)}
                className={clsx(
                  "rounded-2xl px-4 py-2 text-sm font-semibold",
                  activePassenger === i
                    ? "bg-[#0d1b3d] text-white"
                    : "bg-transparent text-slate-600"
                )}
              >
                Passager {i + 1}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 text-sm text-[#1a1c1c]">
            {[
              { label: "Disponible", swatch: "bg-[#22c55e]" },
              { label: "Fenêtre", icon: "legendWindow" as const },
              { label: "Couloir", icon: "legendAisle" as const },
              { label: "Plus d'espace", icon: "legendLegroom" as const },
              { label: "Toilettes", icon: "legendToilet" as const },
            ].map((l) => (
              <span key={l.label} className="inline-flex items-center gap-2">
                {"swatch" in l && l.swatch ? (
                  <span className={clsx("size-4 rounded-[2px]", l.swatch)} />
                ) : (
                  <FigmaIcon name={l.icon!} size={16} />
                )}
                {l.label}
              </span>
            ))}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <div className="mx-auto max-w-[500px] rounded-t-[100px] rounded-b-[40px] border-x-4 border-t-8 border-[#e2e8f0] bg-[#f8fafc] px-8 pb-8 pt-16 sm:px-12">
              <div className="mb-3 grid grid-cols-[1fr_1fr_1fr_auto_1fr_1fr_1fr] gap-1 text-center text-sm font-bold text-slate-400">
                {COLS.slice(0, 3).map((c) => (
                  <span key={c}>{c}</span>
                ))}
                <span className="w-8" />
                {COLS.slice(3).map((c) => (
                  <span key={c}>{c}</span>
                ))}
              </div>

              {ROWS.map((row) => (
                <div key={row}>
                  {row === 14 && (
                    <div className="my-3 flex items-center gap-3 opacity-50">
                      <span className="h-px flex-1 bg-[#fca5a5]" />
                      <span className="text-[10px] font-bold uppercase tracking-[1px] text-[#ef4444]">
                        ISSUE DE SECOURS
                      </span>
                      <span className="h-px flex-1 bg-[#fca5a5]" />
                    </div>
                  )}
                  <div className="mb-2 grid grid-cols-[1fr_1fr_1fr_auto_1fr_1fr_1fr] items-center gap-1">
                    {COLS.slice(0, 3).map((c) => {
                      const seatId = `${row}${c}`;
                      return (
                        <SeatButton
                          key={seatId}
                          seatId={seatId}
                          status={statusOf(seatId)}
                          onClick={() => onSeatClick(seatId)}
                        />
                      );
                    })}
                    <span className="w-8 text-center text-sm font-bold text-slate-300">{row}</span>
                    {COLS.slice(3).map((c) => {
                      const seatId = `${row}${c}`;
                      return (
                        <SeatButton
                          key={seatId}
                          seatId={seatId}
                          status={statusOf(seatId)}
                          onClick={() => onSeatClick(seatId)}
                        />
                      );
                    })}
                  </div>
                </div>
              ))}

              <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center px-6">
                <div className="flex justify-center">
                  <FigmaIcon name="amenityToilet" size={20} />
                </div>
                <span />
                <div className="flex justify-center">
                  <FigmaIcon name="amenityWheelchair" size={18} />
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-4 border-t border-[#eee] pt-4 text-xs text-[#1a1c1c]">
              <span className="inline-flex items-center gap-2">
                <span className="size-4 rounded-[2px] bg-[#22c55e]" />
                Disponible
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="size-4 rounded-[2px] bg-[#f87171]/50" />
                Occupé
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="size-4 rounded-[2px] border border-[#ff5c00] bg-[#ffedd5]" />
                <span>
                  Premium
                  <br />
                  (+15k)
                </span>
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="size-4 rounded-[2px] bg-[#006ce4]" />
                Sélectionné
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="flex size-4 items-center justify-center rounded-[2px] bg-[#ff5c00]">
                  <FigmaIcon name="seatStar" size={10} />
                </span>
                <span>
                  Legroom
                  <br />
                  (+20k)
                </span>
              </span>
            </div>
          </div>

          {activeSeat && (
            <div className="flex items-center justify-between rounded-[20px] border border-slate-100 border-l-8 border-l-[#006ce4] bg-white px-6 py-6 shadow-md">
              <div className="flex items-center gap-4">
                <FigmaIcon name="seatPreview" size={48} />
                <div>
                  <p className="text-2xl font-semibold text-[#0d1b3d]">Siège: {activeSeat.seatId}</p>
                  <p className="text-base text-slate-600">
                    Type: {activeSeat.type} •{" "}
                    <span className="font-semibold text-[#16a34a]">
                      {activeSeat.price === 0 ? "Inclus" : formatFcfa(activeSeat.price)}
                    </span>
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500">Passager {activePassenger + 1}</p>
                <p className="text-xl font-semibold text-[#0d1b3d]">OK</p>
              </div>
            </div>
          )}

          <section>
            <h2 className="mb-4 text-xl font-semibold text-[#0d1b3d]">Services additionnels</h2>
            <div className="mb-4 grid gap-4 sm:grid-cols-3">
              {QUICK_EXTRAS.map((q) => {
                const on = draft.extras.includes(q.id);
                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => dispatch(toggleExtra(q.id))}
                    className={clsx(
                      "rounded-[20px] border bg-white p-[17px] text-left shadow-sm transition",
                      on ? "border-[#ff5c00]" : "border-[#eee]"
                    )}
                  >
                    <FigmaIcon name={QUICK_ICONS[q.id]} size={20} />
                    <p className="mt-2 text-sm font-medium text-[#0d1b3d]">{q.label}</p>
                    <p className="text-xs text-slate-500">{q.priceLabel}</p>
                  </button>
                );
              })}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {EXTRA_SERVICES.map((s) => {
                const on = draft.extras.includes(s.id);
                return (
                  <div
                    key={s.id}
                    className="rounded-2xl bg-white p-[22px] shadow-[0_4px_10px_rgba(13,27,61,0.05)]"
                  >
                    <div className="flex gap-4">
                      <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#eff6ff]">
                        <FigmaIcon name={SERVICE_ICONS[s.id]} size={20} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-[#0d1b3d]">{s.title}</h3>
                        <p className="mt-1 text-base text-slate-500">{s.description}</p>
                        <p className="mt-2 pb-3 text-base text-[#0d1b3d]">
                          {s.priceLabel}
                        </p>
                        <button
                          type="button"
                          onClick={() => dispatch(toggleExtra(s.id))}
                          className={clsx(
                            "w-full rounded-2xl border-2 py-2.5 text-base font-semibold",
                            on
                              ? "border-[#ff5c00] bg-[#ff5c00] text-white"
                              : "border-[#0d1b3d] text-[#0d1b3d]"
                          )}
                        >
                          {on ? "Sélectionné" : "Sélectionner"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-[#0d1b3d]">
              Vous voyagez à {flight.to.city} ?
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: "Hôtels de luxe",
                  sub: "À partir de 45 000 FCFA / nuit",
                  img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
                },
                {
                  title: "Location de voiture",
                  sub: "Berlines & SUVs premium",
                  img: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=600&q=80",
                },
                {
                  title: "Gastronomie locale",
                  sub: "Réservez les meilleures tables",
                  img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=600&q=80",
                },
                {
                  title: "Circuits & Visites",
                  sub: "Expériences authentiques",
                  img: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=600&q=80",
                },
              ].map((c) => (
                <div key={c.title} className="overflow-hidden rounded-2xl bg-white shadow-sm">
                  <div className="relative h-36">
                    <img src={c.img} alt={c.title} className="h-full w-full object-cover" />
                    <p className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 font-semibold text-white">
                      {c.title}
                    </p>
                  </div>
                  <p className="p-3 text-sm text-slate-500">{c.sub}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="h-fit space-y-4 lg:sticky lg:top-24">
          <div className="overflow-hidden rounded-[20px] bg-white shadow-[0_4px_20px_rgba(13,27,61,0.05)]">
            <div className="flex items-center justify-between bg-[#0d1b3d] px-4 py-4 text-white">
              <p className="text-sm font-medium">Résumé du voyage</p>
              <p className="text-xs text-white/80">Vol {flight.flightNumber}</p>
            </div>
            <div className="space-y-2 p-6 text-sm">
              <p className="font-semibold text-[#0d1b3d]">
                {flight.from.code} → {flight.to.code}
              </p>
              <p className="text-slate-500">{draft.search.departDate || "18 Juillet 2026"}</p>
              <p className="text-slate-500">
                {draft.search.adults} Adultes,{" "}
                {draft.search.cabin === "eco" ? "Economy" : "Business"}
              </p>
            </div>
          </div>

          <div className="rounded-[20px] border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="font-semibold text-[#0d1b3d]">Détails du prix</h2>
            <dl className="mt-3 space-y-2 text-sm">
              {draft.passengers.map((_, i) => {
                const seat = draft.seats.find((s) => s.passengerIndex === i);
                return (
                  <div key={i} className="flex justify-between">
                    <dt className="text-slate-500">
                      Passager {i + 1}
                      {seat ? ` (${seat.seatId})` : ""}
                    </dt>
                    <dd>{!seat || seat.price === 0 ? "Inclus" : formatFcfa(seat.price)}</dd>
                  </div>
                );
              })}
              <div className="flex justify-between">
                <dt className="text-slate-500">Sous-total</dt>
                <dd>{formatFcfa(totals.subtotal)}</dd>
              </div>
              {(totals.seatFees > 0 || totals.extraFees > 0) && (
                <div className="flex justify-between text-[#ff5c00]">
                  <dt>Suppléments</dt>
                  <dd>+{formatFcfa(totals.seatFees + totals.extraFees)}</dd>
                </div>
              )}
            </dl>
            <div className="my-4 h-px bg-slate-100" />
            <p className="font-display text-2xl font-bold text-[#0d1b3d]">
              {formatFcfa(totals.total)}
            </p>
            <button type="button" className={`${btnOrange} mt-5 w-full`} onClick={continueToBaggage}>
              Continuer vers les bagages
            </button>
            <Link to={`/billetterie/${id}/voyageurs`} className={`${btnOutline} mt-3 w-full`}>
              Retour
            </Link>
            <p className="mt-4 flex items-center justify-center gap-2 text-xs text-[#1a1c1c]">
              <FigmaIcon name="lockSecure" size={14} />
              Paiement sécurisé SSL & 3D Secure
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function SeatButton({
  seatId,
  status,
  onClick,
}: {
  seatId: string;
  status: SeatStatus;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={status === "occupied"}
      className={clsx(
        "relative mx-auto flex size-10 items-center justify-center rounded-2xl text-sm font-bold transition",
        status === "available" && "bg-[#22c55e] text-white hover:brightness-110",
        status === "occupied" && "cursor-not-allowed bg-[#f87171] opacity-50",
        status === "selected" &&
          "bg-[#006ce4] text-white shadow-[0_0_0_4px_rgba(0,108,228,0.3)]",
        status === "premium" && "border-2 border-[#ff5c00] bg-[#ffedd5] text-[#ff5c00]",
        status === "legroom" && "bg-[#ff5c00] text-white"
      )}
      aria-label={`Siège ${seatId}`}
    >
      {status === "legroom" && <FigmaIcon name="seatStar" size={14} />}
      {status === "premium" && "P"}
      {status === "selected" && seatId}
      {(status === "available" || status === "occupied") && null}
    </button>
  );
}
