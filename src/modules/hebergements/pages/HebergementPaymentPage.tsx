import { FormEvent, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useBooking } from "../booking/BookingContext";
import { computeStay, formatStayDates, money } from "../booking/pricing";
import { CheckoutSteps } from "../components/CheckoutSteps";
import { HebergementPageShell } from "../components/HebergementPageShell";
import { TYPE_ROUTES } from "../catalog";
import { TYPE_LABELS, getAccommodationById } from "../data/mockAccommodations";

const METHODS = ["Mobile Money", "Carte Bancaire", "FedaPay", "Virement Bancaire"] as const;

export function HebergementPaymentPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const booking = useBooking();
  const item = id ? getAccommodationById(id) : undefined;
  const [method, setMethod] = useState<(typeof METHODS)[number]>("Mobile Money");
  if (!item) return null;

  const stay = computeStay(item, booking);
  const listingId = item.id;

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    navigate(`/hebergements/${listingId}/confirmation`);
  }

  return (
    <HebergementPageShell
      activeType={item.type}
      destination={item.city}
      crumbs={[
        { label: "Accueil", to: "/hebergements" },
        { label: TYPE_LABELS[item.type], to: TYPE_ROUTES[item.type] },
        { label: "Récapitulatif", to: `/hebergements/${item.id}/recap` },
        { label: "Paiement" },
      ]}
    >
      <CheckoutSteps id={item.id} current="paiement" />
      <form onSubmit={onSubmit} className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h1 className="text-xl font-bold text-navy-900">Modes de paiement</h1>
          <div className="mt-4 space-y-3">
            {METHODS.map((m) => (
              <label
                key={m}
                className={`block rounded-xl border p-4 ${method === m ? "border-brand-500" : "border-slate-200"}`}
              >
                <input type="radio" className="mr-2 accent-brand-500" checked={method === m} onChange={() => setMethod(m)} />
                {m}
                {m === "Mobile Money" && method === m && (
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <input placeholder="Code pays" className="rounded-lg border px-3 py-2" />
                    <input required placeholder="Numéro de téléphone" className="rounded-lg border px-3 py-2" />
                  </div>
                )}
              </label>
            ))}
          </div>
          <h2 className="mt-8 font-semibold">Informations de facturation</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <input defaultValue={booking.travelerName} placeholder="Nom complet" className="rounded-lg border px-3 py-2.5" />
            <input defaultValue={booking.travelerEmail} placeholder="Email" className="rounded-lg border px-3 py-2.5" />
            <input placeholder="Adresse" className="rounded-lg border px-3 py-2.5" />
            <input defaultValue={item.city} placeholder="Ville" className="rounded-lg border px-3 py-2.5" />
          </div>
          <label className="mt-4 flex items-center gap-2 text-sm">
            <input type="checkbox" required className="accent-brand-500" /> J&apos;accepte les conditions d&apos;utilisation
          </label>
        </div>

        <aside className="h-fit overflow-hidden rounded-2xl bg-white shadow-md">
          <img src={item.image} alt="" className="h-40 w-full object-cover" />
          <div className="p-5">
            <h2 className="font-bold">{item.name}</h2>
            <p className="text-sm text-slate-500">{item.city}, {item.country}</p>
            <p className="mt-2 text-sm">{formatStayDates(booking.checkIn, booking.checkOut)} · {stay.roomName}</p>
            <p className="mt-4 text-2xl font-bold">{money(stay.total)}</p>
            <button type="submit" className="mt-4 w-full rounded-xl bg-brand-500 py-3 font-semibold text-navy-900">
              Payer maintenant &gt;
            </button>
            <Link to={`/hebergements/${item.id}/recap`} className="mt-2 block rounded-xl border py-3 text-center text-sm">
              Retour au récapitulatif
            </Link>
          </div>
        </aside>
      </form>
    </HebergementPageShell>
  );
}
