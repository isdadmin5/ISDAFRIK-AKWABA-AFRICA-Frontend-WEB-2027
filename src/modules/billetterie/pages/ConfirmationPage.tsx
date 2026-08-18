import { Link, useParams } from "react-router-dom";
import {
  CheckCircle2,
  CreditCard,
  Info,
  Mail,
  MapPin,
  Printer,
  RefreshCw,
} from "lucide-react";
import { formatFcfa, getFlightById } from "../data/flights";
import { useAppSelector } from "@/redux/hooks";
import { computeTotals } from "../utils";
import { btnOrange, btnOutline } from "../components/ui";

export function ConfirmationPage() {
  const { id = "" } = useParams();
  const flight = getFlightById(id);
  const draft = useAppSelector((s) => s.billetterie);
  const passenger = draft.passengers[0];

  if (!flight || !draft.bookingRef) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
        <p className="text-slate-600">Aucune réservation confirmée.</p>
        <Link to="/billetterie" className="mt-4 inline-block text-[#ff5c00]">
          Retour à la billetterie
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
  const firstName = passenger?.firstName || "voyageur";

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-slate-200 bg-white px-6 py-10 text-center shadow-sm sm:px-10">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-100">
          <CheckCircle2 className="h-9 w-9 text-emerald-600" />
        </div>
        <h1 className="mt-5 font-display text-3xl font-bold text-[#0d1b3d]">
          Félicitations, {firstName} !
        </h1>
        <p className="mt-2 text-slate-500">Votre réservation est confirmée.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.7fr_0.9fr]">
        <div className="space-y-5">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:grid md:grid-cols-[1.2fr_0.8fr]">
            <div className="p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Identifiant de voyage
              </p>
              <p className="mt-2 text-sm text-slate-600">Numéro de confirmation :</p>
              <p className="mt-1 font-display text-3xl font-bold text-[#ff5c00]">
                {draft.bookingRef}
              </p>
              <p className="mt-4 flex items-start gap-2 text-sm text-slate-600">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#ff5c00]" />
                Présentez ce QR code à l&apos;embarquement pour un check-in prioritaire.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link to="/billetterie" className={btnOrange}>
                  <RefreshCw className="h-4 w-4" />
                  Gérer ma réservation
                </Link>
                <button type="button" className={btnOutline} onClick={() => window.print()}>
                  <Printer className="h-4 w-4" />
                  Imprimer le reçu
                </button>
              </div>
            </div>
            <div className="flex items-center justify-center bg-[#0d1b3d] p-6">
              <div className="rounded-xl bg-white p-4 shadow-lg">
                <div className="grid size-40 grid-cols-5 gap-1">
                  {Array.from({ length: 25 }).map((_, i) => (
                    <span
                      key={i}
                      className={
                        (i * 7) % 3 === 0 ? "rounded-[2px] bg-[#0d1b3d]" : "rounded-[2px] bg-slate-200"
                      }
                    />
                  ))}
                </div>
                <p className="mt-3 text-center text-xs font-semibold text-[#0d1b3d]">
                  {draft.bookingRef}
                </p>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:flex">
            <img
              src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=600&q=80"
              alt={flight.airline}
              className="h-44 w-full object-cover sm:h-auto sm:w-52"
            />
            <div className="flex-1 p-5">
              <h2 className="font-display text-xl font-bold text-[#0d1b3d]">
                {flight.airline} · {flight.flightNumber}
              </h2>
              <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                <MapPin className="h-3.5 w-3.5" />
                {flight.from.city} → {flight.to.city}
              </p>
              <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                <div>
                  <p className="text-xs uppercase text-slate-400">Horaires</p>
                  <p className="font-semibold text-[#0d1b3d]">
                    {flight.departTime} - {flight.arriveTime}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase text-slate-400">Passagers</p>
                  <p className="font-semibold text-[#0d1b3d]">{draft.search.adults} Adultes</p>
                </div>
                {draft.seats.length > 0 && (
                  <div>
                    <p className="text-xs uppercase text-slate-400">Sièges</p>
                    <p className="font-semibold text-[#0d1b3d]">
                      {draft.seats.map((s) => s.seatId).join(", ")}
                    </p>
                  </div>
                )}
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-4 text-sm">
                <span className="inline-flex items-center gap-1.5 text-slate-500">
                  <CreditCard className="h-4 w-4" />
                  Payé via{" "}
                  {draft.paymentMethod === "momo"
                    ? "Mobile Money"
                    : draft.paymentMethod === "card"
                      ? "Carte bancaire"
                      : draft.paymentMethod === "fedapay"
                        ? "FedaPay"
                        : "Virement"}
                </span>
                <span className="font-bold text-[#0d1b3d]">
                  Total payé : {formatFcfa(totals.total)}
                </span>
              </div>
            </div>
          </div>

          <Link to="/billetterie" className="inline-flex text-sm font-semibold text-[#0d1b3d] hover:text-[#ff5c00]">
            ← Retour à l&apos;accueil billetterie
          </Link>
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="font-semibold text-[#0d1b3d]">Prochaines étapes</h3>
            <ul className="mt-4 space-y-4">
              <li className="flex gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                  <Mail className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-[#0d1b3d]">E-mail envoyé</p>
                  <p className="mt-0.5 text-sm text-slate-500">
                    Un e-billet a été envoyé à {passenger?.email || "votre adresse email"}.
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-[#ff5c00]">
                  <RefreshCw className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-[#0d1b3d]">Services additionnels</p>
                  <p className="mt-0.5 text-sm text-slate-500">
                    Ajoutez un transfert aéroport ou un salon VIP depuis votre espace client.
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-700">
                  <CheckCircle2 className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-[#0d1b3d]">Check-in</p>
                  <p className="mt-0.5 text-sm text-slate-500">
                    Munissez-vous d&apos;une pièce d&apos;identité valide et de votre QR code.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl bg-[#0d1b3d] p-5 text-white">
            <p className="font-semibold">Besoin d&apos;aide ?</p>
            <p className="mt-2 text-sm text-white/70">
              Notre assistance est disponible 24/7 pour vous accompagner dans votre voyage.
            </p>
            <a href="tel:+22890000000" className="mt-4 inline-block text-sm font-semibold text-[#ff5c00]">
              Contacter le support →
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}
