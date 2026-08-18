import { FormEvent, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import clsx from "clsx";
import { CreditCard, Lock, Smartphone } from "lucide-react";
import { formatFcfa, getFlightById } from "../data/flights";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  confirmBooking,
  setAgreements,
  setPayment,
} from "@/redux/slices/billetterieSlice";
import { computeTotals, makeBookingRef } from "../utils";
import { FlightSearchBar } from "../components/FlightSearchBar";
import { Breadcrumbs, HelpWidget, btnOrange, btnOutline, field, label } from "../components/ui";

const METHODS = [
  {
    id: "momo" as const,
    title: "Mobile Money",
    badge: "LE PLUS UTILISÉ EN AFRIQUE DE L'OUEST",
    icons: ["T-money", "Orange", "Wave"],
  },
  { id: "card" as const, title: "Carte Bancaire", icons: ["Visa", "Mastercard"] },
  { id: "fedapay" as const, title: "FedaPay", icons: [] },
  { id: "transfer" as const, title: "Virement Bancaire", icons: [] },
];

export function PaymentPage() {
  const { id = "" } = useParams();
  const flight = getFlightById(id);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const draft = useAppSelector((s) => s.billetterie);
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

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

  function onPay(e: FormEvent) {
    e.preventDefault();
    if (!draft.acceptTerms || !draft.confirmOfficial) return;
    const ref = makeBookingRef();
    dispatch(confirmBooking(ref));
    navigate(`/billetterie/${id}/confirmation`);
  }

  return (
    <div className="space-y-6">
      <FlightSearchBar />
      <Breadcrumbs
        items={[
          { label: "Accueil", to: "/billetterie" },
          { label: "Billets", to: "/billetterie" },
          { label: "Bagages", to: `/billetterie/${id}/bagages` },
          { label: "Paiement" },
        ]}
      />

      <form onSubmit={onPay} className="grid gap-6 lg:grid-cols-[1.7fr_0.9fr]">
        <div className="space-y-5">
          <h1 className="font-display text-3xl font-bold text-[#0d1b3d]">Modes de paiement</h1>

          <div className="space-y-3">
            {METHODS.map((m) => {
              const active = draft.paymentMethod === m.id;
              return (
                <div
                  key={m.id}
                  className={clsx(
                    "overflow-hidden rounded-2xl border bg-white transition",
                    active ? "border-[#ff5c00] shadow-sm" : "border-slate-200"
                  )}
                >
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
                    onClick={() => dispatch(setPayment({ paymentMethod: m.id }))}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={clsx(
                          "flex size-5 items-center justify-center rounded-full border",
                          active ? "border-[#ff5c00]" : "border-slate-300"
                        )}
                      >
                        {active && <span className="size-2.5 rounded-full bg-[#ff5c00]" />}
                      </span>
                      <span className="font-semibold text-[#0d1b3d]">{m.title}</span>
                      {m.badge && (
                        <span className="hidden rounded-full bg-orange-50 px-2 py-0.5 text-[10px] font-bold uppercase text-[#ff5c00] sm:inline">
                          {m.badge}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-1">
                      {m.icons.map((icon) => (
                        <span
                          key={icon}
                          className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600"
                        >
                          {icon}
                        </span>
                      ))}
                    </div>
                  </button>

                  {active && m.id === "momo" && (
                    <div className="grid gap-4 border-t border-slate-100 px-5 py-4 sm:grid-cols-2">
                      <div>
                        <label className={label}>Code pays</label>
                        <select className={field} defaultValue="+228">
                          <option value="+228">+228</option>
                          <option value="+225">+225</option>
                          <option value="+233">+233</option>
                        </select>
                      </div>
                      <div>
                        <label className={label}>Numéro de téléphone</label>
                        <div className="relative">
                          <Smartphone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                          <input
                            className={`${field} pl-9`}
                            placeholder="90 00 00 00"
                            value={draft.paymentPhone}
                            onChange={(e) => dispatch(setPayment({ paymentPhone: e.target.value }))}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {active && m.id === "card" && (
                    <div className="grid gap-4 border-t border-slate-100 px-5 py-4 sm:grid-cols-2">
                      <div className="sm:col-span-2">
                        <label className={label}>Nom sur la carte</label>
                        <input
                          className={field}
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className={label}>Numéro de carte</label>
                        <div className="relative">
                          <CreditCard className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                          <input
                            className={`${field} pl-9`}
                            placeholder="0000 0000 0000 0000"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className={label}>Expiration</label>
                        <input
                          className={field}
                          placeholder="MM/AA"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <label className={label}>CVV</label>
                        <input
                          className={field}
                          placeholder="123"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  )}

                  {active && m.id === "fedapay" && (
                    <div className="border-t border-slate-100 px-5 py-4 text-sm text-slate-600">
                      Vous serez redirigé vers FedaPay pour finaliser le paiement sécurisé.
                    </div>
                  )}

                  {active && m.id === "transfer" && (
                    <div className="space-y-2 border-t border-slate-100 px-5 py-4 text-sm text-slate-600">
                      <p>
                        <span className="font-semibold text-[#0d1b3d]">Banque :</span> ECOBANK TOGO
                      </p>
                      <p>
                        <span className="font-semibold text-[#0d1b3d]">IBAN :</span> TG53 EC00 0000
                        0000 0000 0000 00
                      </p>
                      <p>
                        <span className="font-semibold text-[#0d1b3d]">Référence :</span>{" "}
                        AKW-VOL-{flight.flightNumber}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="space-y-3 text-sm text-slate-700">
            <label className="flex items-start gap-2">
              <input
                type="checkbox"
                className="mt-1 accent-[#0d1b3d]"
                checked={draft.confirmOfficial}
                onChange={(e) => dispatch(setAgreements({ confirmOfficial: e.target.checked }))}
              />
              Je confirme l&apos;exactitude des informations de voyage et de facturation.
            </label>
            <label className="flex items-start gap-2">
              <input
                type="checkbox"
                className="mt-1 accent-[#0d1b3d]"
                checked={draft.acceptTerms}
                onChange={(e) => dispatch(setAgreements({ acceptTerms: e.target.checked }))}
              />
              J&apos;accepte les Conditions Générales de Vente et la politique de confidentialité.
            </label>
          </div>

          <div className="flex flex-wrap gap-2 opacity-70">
            {["Mastercard", "Visa", "Wave", "Orange Money", "T-money"].map((p) => (
              <span
                key={p}
                className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-500"
              >
                {p}
              </span>
            ))}
          </div>
        </div>

        <aside className="h-fit space-y-4 lg:sticky lg:top-24">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="bg-[#0d1b3d] px-4 py-4 text-white">
              <p className="text-sm font-semibold">
                {flight.airline} · {flight.flightNumber}
              </p>
              <p className="mt-1 text-xs text-white/70">
                {flight.from.code} → {flight.to.code} · {draft.search.adults} Adultes
              </p>
            </div>
            <div className="space-y-2 p-5 text-sm">
              <h2 className="font-semibold text-[#0d1b3d]">Détail du paiement</h2>
              <div className="flex justify-between">
                <span className="text-slate-500">Billet (x{draft.search.adults})</span>
                <span>{formatFcfa(totals.tickets)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Taxes et frais</span>
                <span>{formatFcfa(totals.taxes + totals.serviceFee)}</span>
              </div>
              {(totals.seatFees > 0 || totals.extraFees > 0 || totals.baggageFees > 0) && (
                <div className="flex justify-between text-[#ff5c00]">
                  <span>Sièges / extras / bagages</span>
                  <span>
                    +{formatFcfa(totals.seatFees + totals.extraFees + totals.baggageFees)}
                  </span>
                </div>
              )}
              <div className="my-3 h-px bg-slate-100" />
              <p className="font-display text-2xl font-bold text-[#0d1b3d]">
                {formatFcfa(totals.total)}
              </p>
              <button
                type="submit"
                disabled={!draft.acceptTerms || !draft.confirmOfficial}
                className={`${btnOrange} mt-4 w-full`}
              >
                Payer maintenant →
              </button>
              <Link to={`/billetterie/${id}/bagages`} className={`${btnOutline} mt-3 w-full`}>
                Retour
              </Link>
              <p className="mt-4 flex items-center justify-center gap-1 text-center text-xs text-slate-400">
                <Lock className="h-3 w-3" /> Paiement sécurisé SSL & 3D Secure
              </p>
            </div>
          </div>
          <HelpWidget />
        </aside>
      </form>
    </div>
  );
}
