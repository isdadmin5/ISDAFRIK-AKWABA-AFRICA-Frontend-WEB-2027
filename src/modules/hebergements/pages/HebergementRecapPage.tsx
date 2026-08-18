import { Link, useParams } from "react-router-dom";
import { useBooking } from "../booking/BookingContext";
import { computeStay, formatStayDates, money } from "../booking/pricing";
import { CheckoutSteps } from "../components/CheckoutSteps";
import { HebergementPageShell } from "../components/HebergementPageShell";
import { TYPE_ROUTES } from "../catalog";
import { TYPE_LABELS, getAccommodationById } from "../data/mockAccommodations";

export function HebergementRecapPage() {
  const { id } = useParams();
  const booking = useBooking();
  const item = id ? getAccommodationById(id) : undefined;
  if (!item) return null;

  const stay = computeStay(item, booking);

  return (
    <HebergementPageShell
      activeType={item.type}
      destination={item.city}
      crumbs={[
        { label: "Accueil", to: "/hebergements" },
        { label: TYPE_LABELS[item.type], to: TYPE_ROUTES[item.type] },
        { label: item.name, to: `/hebergements/${item.id}` },
        { label: "Voyageurs", to: `/hebergements/${item.id}/voyageurs` },
        { label: "Récapitulatif" },
      ]}
    >
      <CheckoutSteps id={item.id} current="recap" />
      <h1 className="text-3xl font-bold text-navy-900">Vérifiez votre réservation</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          <section className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex gap-4">
              <img src={item.image} alt="" className="h-28 w-40 rounded-xl object-cover" />
              <div className="flex-1">
                <div className="flex justify-between">
                  <span className="rounded bg-navy-900 px-2 py-0.5 text-[10px] font-bold text-white">PARTENAIRE PREMIUM</span>
                  <Link to={`/hebergements/${item.id}`} className="text-sm text-brand-500">Modifier</Link>
                </div>
                <h2 className="mt-2 font-bold">{item.name}</h2>
                <p className="text-sm text-slate-500">{item.district}, {item.city}, {item.country}</p>
                <p className="mt-2 text-sm">{formatStayDates(booking.checkIn, booking.checkOut)} · {booking.nights} nuits</p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex justify-between">
              <h3 className="font-semibold">{stay.roomName}</h3>
              <Link to={item.type === "HOTEL" ? `/hebergements/${item.id}/chambres` : `/hebergements/${item.id}`} className="text-sm text-brand-500">
                Modifier
              </Link>
            </div>
            <p className="mt-2 text-sm text-slate-600">
              {booking.adults} Adultes{booking.room ? ` · ${booking.room.size} m² · ${booking.room.bed} · ${booking.room.view}` : ""}
            </p>
          </section>

          <section className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex justify-between">
              <h3 className="font-semibold">Voyageurs</h3>
              <Link to={`/hebergements/${item.id}/voyageurs`} className="text-sm text-brand-500">Modifier</Link>
            </div>
            <p className="mt-2 text-sm">{booking.travelerName}</p>
            <p className="text-sm text-slate-500">{booking.travelerEmail}</p>
          </section>

          <section className="rounded-2xl bg-white p-5 shadow-sm">
            <h3 className="font-semibold">Services additionnels</h3>
            {stay.selectedExtras.length === 0 ? (
              <p className="mt-2 text-sm text-slate-500">Aucun service additionnel.</p>
            ) : (
              <ul className="mt-3 space-y-1 text-sm">
                {stay.selectedExtras.map((extra) => (
                  <li key={extra.id} className="flex justify-between">
                    <span>{extra.label}</span>
                    <span>{money(extra.price)}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="rounded-2xl bg-navy-900 p-5 text-white">
            <p className="flex justify-between text-sm"><span>Hébergement</span><span>{money(stay.lodging)}</span></p>
            <p className="flex justify-between text-sm"><span>Services</span><span>{money(stay.extrasSum)}</span></p>
            <p className="flex justify-between text-sm"><span>Taxes</span><span>{money(stay.tax)}</span></p>
            {stay.promo < 0 && (
              <p className="flex justify-between text-sm text-brand-400"><span>Promo {booking.promo}</span><span>{money(stay.promo)}</span></p>
            )}
            <p className="mt-3 text-2xl font-bold text-brand-500">Total {money(stay.total)}</p>
          </section>
        </div>

        <aside className="h-fit overflow-hidden rounded-2xl bg-white shadow-md">
          <div className="bg-navy-900 px-5 py-4 text-white">
            <h2 className="font-semibold">Votre réservation</h2>
          </div>
          <div className="space-y-2 p-5 text-sm">
            <p className="font-semibold">{item.name}</p>
            <p>{stay.roomName} · {booking.nights} nuits</p>
            <p className="flex justify-between"><span>Hébergement</span><span>{money(stay.lodging)}</span></p>
            <p className="flex justify-between"><span>Services</span><span>{money(stay.extrasSum)}</span></p>
            <p className="flex justify-between"><span>Taxes</span><span>{money(stay.tax)}</span></p>
            {stay.promo < 0 && (
              <p className="flex justify-between text-green-600"><span>Remise #{booking.promo}</span><span>{money(stay.promo)}</span></p>
            )}
            <p className="border-t pt-3 text-xl font-bold text-brand-500">{money(stay.total)}</p>
            <Link to={`/hebergements/${item.id}/paiement`} className="mt-4 block rounded-xl bg-brand-500 py-3 text-center font-semibold text-navy-900">
              Procéder au paiement →
            </Link>
            <Link to={`/hebergements/${item.id}/voyageurs`} className="mt-2 block rounded-xl border py-3 text-center">
              Retour
            </Link>
          </div>
        </aside>
      </div>
    </HebergementPageShell>
  );
}
