import { Link, useNavigate, useParams } from "react-router-dom";
import { useBooking } from "../booking/BookingContext";
import { money } from "../booking/pricing";
import { CheckoutSteps } from "../components/CheckoutSteps";
import { HebergementPageShell } from "../components/HebergementPageShell";
import { TYPE_ROUTES } from "../catalog";
import { TYPE_LABELS, getAccommodationById } from "../data/mockAccommodations";
import { getRooms } from "../data/rooms";

export function HebergementRoomsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const booking = useBooking();
  const item = id ? getAccommodationById(id) : undefined;
  if (!item) return null;

  const rooms = getRooms(item.id);

  return (
    <HebergementPageShell
      activeType={item.type}
      destination={item.city}
      crumbs={[
        { label: "Accueil", to: "/hebergements" },
        { label: TYPE_LABELS[item.type], to: TYPE_ROUTES[item.type] },
        { label: item.name, to: `/hebergements/${item.id}` },
        { label: "Chambres" },
      ]}
    >
      <CheckoutSteps id={item.id} current="chambres" />
      <h1 className="text-3xl font-bold text-navy-900">Choisissez votre chambre</h1>
      <p className="mt-1 text-slate-500">
        {item.name} · {booking.nights} nuits · {booking.adults} adultes
      </p>

      <div className="mt-8 space-y-4">
        {rooms.map((room, i) => (
          <article key={room.id} className="overflow-hidden rounded-2xl bg-white shadow-sm md:flex">
            <img src={item.gallery[i % item.gallery.length]} alt={room.name} className="h-52 w-full object-cover md:h-auto md:w-72" />
            <div className="flex flex-1 flex-col justify-between p-6">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-navy-900">{room.name}</h2>
                  {i === 0 && (
                    <span className="rounded bg-brand-500/15 px-2 py-0.5 text-[10px] font-bold uppercase text-brand-500">
                      Le plus réservé
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm text-slate-500">
                  {room.size} m² · {room.bed} · {room.view} · Annulation gratuite
                </p>
              </div>
              <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
                <p className="text-2xl font-bold text-navy-900">
                  {money(room.pricePerNight)}
                  <span className="text-sm font-normal text-slate-500"> / nuit</span>
                </p>
                <button
                  type="button"
                  onClick={() => {
                    booking.setAccommodation(item.id);
                    booking.setRoom(room);
                    navigate(`/hebergements/${item.id}/voyageurs`);
                  }}
                  className="rounded-xl bg-brand-500 px-5 py-2.5 font-semibold text-navy-900"
                >
                  Réserver cette chambre
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <Link to={`/hebergements/${item.id}`} className="mt-6 inline-block text-sm text-slate-500">
        ← Retour à la fiche
      </Link>
    </HebergementPageShell>
  );
}
