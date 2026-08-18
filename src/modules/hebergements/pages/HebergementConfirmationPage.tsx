import { Link, useParams } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { useBooking } from "../booking/BookingContext";
import { computeStay, formatStayDates, money } from "../booking/pricing";
import { CheckoutSteps } from "../components/CheckoutSteps";
import { HebergementPageShell } from "../components/HebergementPageShell";
import { getAccommodationById } from "../data/mockAccommodations";

export function HebergementConfirmationPage() {
  const { id } = useParams();
  const booking = useBooking();
  const item = id ? getAccommodationById(id) : undefined;
  if (!item) return null;

  const stay = computeStay(item, booking);
  const firstName = booking.travelerName.split(" ")[0] || "voyageur";

  return (
    <HebergementPageShell
      activeType={item.type}
      destination={item.city}
      crumbs={[
        { label: "Accueil", to: "/hebergements" },
        { label: "Paiement", to: `/hebergements/${item.id}/paiement` },
        { label: "Confirmation de paiement" },
      ]}
    >
      <CheckoutSteps id={item.id} current="confirmation" />

      <div className="rounded-2xl bg-white px-6 py-10 text-center shadow-sm">
        <CheckCircle2 className="mx-auto h-14 w-14 text-green-500" />
        <h1 className="mt-4 text-3xl font-bold text-navy-900">Félicitations, {firstName} !</h1>
        <p className="mt-2 text-slate-600">Votre réservation est confirmée.</p>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-slate-500">Identifiant de voyage</p>
          <p className="mt-1 text-lg font-bold">
            Numéro de confirmation : <span className="text-brand-500">AKW-2026-7789</span>
          </p>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            <img src={item.image} alt="" className="h-36 w-56 rounded-xl object-cover" />
            <div>
              <h2 className="text-xl font-bold">{item.name}</h2>
              <p className="text-sm text-slate-500">{item.city}, {item.country}</p>
              <p className="mt-2 text-sm">{formatStayDates(booking.checkIn, booking.checkOut)} · {stay.roomName}</p>
              <p className="mt-2 text-xl font-bold">{money(stay.total)}</p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" className="rounded-xl bg-brand-500 px-5 py-3 font-semibold text-navy-900">
              Gérer ma réservation
            </button>
            <button type="button" className="rounded-xl border border-brand-500 px-5 py-3 font-semibold text-brand-500">
              Imprimer le reçu
            </button>
          </div>
        </div>
        <div className="space-y-3">
          {["E-mail envoyé", "Tableau de bord", "Check-in"].map((t) => (
            <div key={t} className="rounded-xl bg-white p-4 shadow-sm">
              <p className="font-semibold text-navy-900">{t}</p>
              <p className="text-sm text-slate-500">Votre dossier est prêt. Conservez le QR code pour l&apos;arrivée.</p>
            </div>
          ))}
          <Link to="/hebergements" className="block text-sm text-slate-500">
            ← Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </HebergementPageShell>
  );
}
