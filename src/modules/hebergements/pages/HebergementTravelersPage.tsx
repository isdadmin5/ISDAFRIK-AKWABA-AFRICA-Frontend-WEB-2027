import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { EXTRA_OPTIONS, useBooking } from "../booking/BookingContext";
import { computeStay, money } from "../booking/pricing";
import { CheckoutSteps } from "../components/CheckoutSteps";
import { HebergementPageShell } from "../components/HebergementPageShell";
import { TYPE_ROUTES } from "../catalog";
import { TYPE_LABELS, getAccommodationById } from "../data/mockAccommodations";
import { getRooms } from "../data/rooms";

export function HebergementTravelersPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const booking = useBooking();
  const item = id ? getAccommodationById(id) : undefined;
  const [firstName, setFirstName] = useState("Jean");
  const [lastName, setLastName] = useState("Koffi");
  const [email, setEmail] = useState(booking.travelerEmail);

  useEffect(() => {
    if (!item) return;
    booking.setAccommodation(item.id);
    if (!booking.room) {
      const fallback = item.type === "HOTEL" ? getRooms(item.id)[0] : {
        id: "entire",
        name: "Logement entier",
        pricePerNight: item.pricePerNight,
        size: 120,
        bed: `${item.rooms} chambres`,
        view: item.district,
      };
      booking.setRoom(fallback);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item?.id]);

  if (!item) return null;

  const stay = computeStay(item, booking);
  const listingId = item.id;

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    booking.setGuest(`${firstName} ${lastName}`, email);
    navigate(`/hebergements/${listingId}/recap`);
  }

  return (
    <HebergementPageShell
      activeType={item.type}
      destination={item.city}
      crumbs={[
        { label: "Accueil", to: "/hebergements" },
        { label: TYPE_LABELS[item.type], to: TYPE_ROUTES[item.type] },
        { label: item.name, to: `/hebergements/${item.id}` },
        { label: "Informations des voyageurs" },
      ]}
    >
      <CheckoutSteps id={item.id} current="voyageurs" />
      <form onSubmit={onSubmit} className="grid gap-8 lg:grid-cols-[360px_1fr]">
        <aside className="h-fit overflow-hidden rounded-2xl bg-white shadow-md">
          <img src={item.image} alt={item.name} className="h-44 w-full object-cover" />
          <div className="p-5">
            <h2 className="font-bold text-navy-900">{item.name}</h2>
            <p className="text-sm text-slate-500">{item.city}, {item.country}</p>
            <p className="mt-2 w-fit rounded bg-green-100 px-2 py-0.5 text-xs font-bold text-green-700">
              {item.rating.toFixed(1)}/5
            </p>
            <ul className="mt-4 space-y-1 text-sm text-slate-600">
              <li>{stay.roomName}</li>
              <li>Durée : {booking.nights} nuits</li>
              <li>{booking.adults} Adultes{booking.children ? ` · ${booking.children} enfant(s)` : ""}</li>
            </ul>
            <p className="mt-4 flex justify-between text-sm">
              <span>Hébergement</span>
              <span>{money(stay.lodging)}</span>
            </p>
            <p className="flex justify-between text-sm">
              <span>Services</span>
              <span>{money(stay.extrasSum)}</span>
            </p>
            <p className="flex justify-between text-sm">
              <span>Taxes &amp; Frais</span>
              <span>{money(stay.tax)}</span>
            </p>
            <p className="mt-2 text-xl font-bold text-brand-500">Total {money(stay.total)}</p>
            <p className="mt-2 text-xs text-green-600">Annulation gratuite</p>
            <button type="submit" className="mt-4 w-full rounded-xl bg-brand-500 py-3 font-semibold text-navy-900">
              Continuer vers le récapitulatif
            </button>
            <Link
              to={item.type === "HOTEL" ? `/hebergements/${item.id}/chambres` : `/hebergements/${item.id}`}
              className="mt-2 block w-full rounded-xl border py-3 text-center text-sm"
            >
              Retour
            </Link>
          </div>
        </aside>

        <div>
          <h1 className="text-2xl font-bold text-navy-900">Informations des voyageurs</h1>
          <p className="mt-1 text-sm text-slate-500">Renseignez les identités des occupants.</p>

          <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
            <h3 className="font-semibold">Voyageur 1 (Principal)</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="text-sm">
                <span className="mb-1 block text-slate-600">Prénom</span>
                <input required value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full rounded-lg border border-slate-200 bg-[#f8f9fa] px-3 py-2.5" />
              </label>
              <label className="text-sm">
                <span className="mb-1 block text-slate-600">Nom</span>
                <input required value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full rounded-lg border border-slate-200 bg-[#f8f9fa] px-3 py-2.5" />
              </label>
              <label className="text-sm sm:col-span-2">
                <span className="mb-1 block text-slate-600">Email</span>
                <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-lg border border-slate-200 bg-[#f8f9fa] px-3 py-2.5" />
              </label>
              {["Civilité", "Date de naissance", "Nationalité", "Téléphone"].map((label) => (
                <label key={label} className="text-sm">
                  <span className="mb-1 block text-slate-600">{label}</span>
                  <input className="w-full rounded-lg border border-slate-200 bg-[#f8f9fa] px-3 py-2.5" />
                </label>
              ))}
            </div>
          </div>

          <div className="mt-4 rounded-2xl bg-white p-6 shadow-sm">
            <h3 className="font-semibold">Voyageur 2</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {["Prénom", "Nom", "Date de naissance", "Nationalité"].map((label) => (
                <label key={label} className="text-sm">
                  <span className="mb-1 block text-slate-600">{label}</span>
                  <input className="w-full rounded-lg border border-slate-200 bg-[#f8f9fa] px-3 py-2.5" />
                </label>
              ))}
            </div>
          </div>

          <div className="mt-4 rounded-2xl bg-white p-6 shadow-sm">
            <h3 className="font-semibold">Services additionnels</h3>
            <p className="mt-1 text-sm text-slate-500">Ils apparaîtront sur le récapitulatif et le paiement.</p>
            <div className="mt-4 space-y-3">
              {EXTRA_OPTIONS.map((extra) => (
                <label key={extra.id} className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm">
                  <span className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={booking.extras.includes(extra.id)}
                      onChange={() => booking.toggleExtra(extra.id)}
                      className="accent-brand-500"
                    />
                    {extra.label}
                  </span>
                  <span className="font-semibold">{money(extra.price)}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </form>
    </HebergementPageShell>
  );
}
