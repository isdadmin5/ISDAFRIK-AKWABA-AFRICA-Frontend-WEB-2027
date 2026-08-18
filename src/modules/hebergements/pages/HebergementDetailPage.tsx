import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MapPin } from "lucide-react";
import { FIGMA } from "../assets";
import { useBooking } from "../booking/BookingContext";
import { computeStay, money } from "../booking/pricing";
import { HebergementPageShell } from "../components/HebergementPageShell";
import { TYPE_ROUTES, TYPE_SINGULAR } from "../catalog";
import { AMENITY_META } from "../data/amenities";
import { ACCOMMODATIONS, TYPE_LABELS, getAccommodationById } from "../data/mockAccommodations";
import { getRooms } from "../data/rooms";

const REVIEWS = [
  { name: "Ama K.", city: "Accra", text: "Accueil impeccable, chambres spacieuses et petit-déjeuner excellent. Je reviendrai." },
  { name: "Jean-Marc T.", city: "Lomé", text: "Emplacement idéal, personnel aux petits soins. La piscine est un vrai plus en fin de journée." },
  { name: "Fatou B.", city: "Abidjan", text: "Propre, calme, et réservation fluide via Akwaba. RAS, recommandé." },
];

export function HebergementDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const booking = useBooking();
  const item = id ? getAccommodationById(id) : undefined;

  useEffect(() => {
    if (item) booking.setAccommodation(item.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item?.id]);

  if (!item) {
    return (
      <div className="px-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-navy-900">Hébergement introuvable</h1>
        <Link to="/hebergements" className="mt-4 inline-block text-brand-500">
          Retour
        </Link>
      </div>
    );
  }

  const gallery = item.gallery.length >= 5 ? item.gallery : [...item.gallery, FIGMA.mosaic2, FIGMA.mosaic3, FIGMA.sofitel];
  const stay = computeStay(item, booking);
  const rooms = item.type === "HOTEL" ? getRooms(item.id) : [];
  const similar = ACCOMMODATIONS.filter((a) => a.type === item.type && a.id !== item.id).slice(0, 3);
  const catalog = TYPE_ROUTES[item.type];
  const isHotel = item.type === "HOTEL";
  const listing = item;

  function bookRoom(roomId?: string) {
    const chosen = rooms.find((r) => r.id === roomId) ?? rooms[0];
    if (chosen) booking.setRoom(chosen);
    else {
      booking.setRoom({
        id: "entire",
        name: "Logement entier",
        pricePerNight: listing.pricePerNight,
        size: 120,
        bed: `${listing.rooms} chambres`,
        view: listing.district,
      });
    }
    navigate(`/hebergements/${listing.id}/voyageurs`);
  }

  return (
    <HebergementPageShell
      activeType={item.type}
      destination={item.city}
      crumbs={[
        { label: "Accueil", to: "/hebergements" },
        { label: "Hébergements", to: "/hebergements/recherche" },
        { label: TYPE_LABELS[item.type], to: catalog },
        { label: item.city, to: `${catalog}?q=${encodeURIComponent(item.city)}` },
        { label: item.name },
      ]}
    >
      <div className="grid gap-2 md:grid-cols-[2fr_1fr]">
        <img src={gallery[0]} alt={item.name} className="h-[420px] w-full rounded-2xl object-cover" />
        <div className="grid grid-cols-2 gap-2">
          {gallery.slice(1, 5).map((src, i) => (
            <img key={src + i} src={src} alt="" className="h-[205px] w-full rounded-2xl object-cover" />
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_380px]">
        <div>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-brand-500">{TYPE_SINGULAR[item.type]} · {item.stars} étoiles</p>
              <h1 className="mt-1 text-3xl font-bold text-navy-900">{item.name}</h1>
              <p className="mt-1 flex items-center gap-1 text-slate-500">
                <MapPin className="h-4 w-3" />
                {item.district}, {item.city} — {item.country}
              </p>
            </div>
            <div className="rounded-lg bg-navy-900 px-3 py-2 text-white">
              <p className="text-sm font-bold">Excellent {item.rating.toFixed(1)}</p>
              <p className="text-xs text-white/70">({item.reviewCount} avis)</p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-4 text-sm text-slate-600">
            <span>{item.capacity} Voyageurs</span>
            <span>{item.rooms} Chambres</span>
            <span>2 Salles de bain</span>
            {item.amenities.includes("piscine") && <span>Piscine</span>}
            <span>120 m²</span>
          </div>

          <h2 className="mt-10 text-xl font-semibold text-navy-900">À propos de {isHotel ? "cet hôtel" : "ce logement"}</h2>
          <p className="mt-3 leading-7 text-slate-600">{item.description}</p>

          <h2 className="mt-10 text-xl font-semibold text-navy-900">Équipements &amp; Services</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {item.amenities.map((key) => {
              const meta = AMENITY_META[key];
              const Icon = meta.Icon;
              return (
                <div key={key} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm">
                  <Icon className="h-4 w-4 text-brand-500" />
                  {meta.label}
                </div>
              );
            })}
          </div>

          {isHotel && (
            <>
              <div className="mt-10 flex items-end justify-between">
                <h2 className="text-xl font-semibold text-navy-900">Choisissez votre chambre</h2>
                <Link to={`/hebergements/${item.id}/chambres`} className="text-sm font-semibold text-brand-500">
                  Voir toutes les chambres
                </Link>
              </div>
              <div className="mt-4 space-y-3">
                {rooms.map((room, i) => (
                  <article key={room.id} className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-navy-900">{room.name}</h3>
                        {i === 0 && (
                          <span className="rounded bg-brand-500/15 px-2 py-0.5 text-[10px] font-bold uppercase text-brand-500">
                            Le plus réservé
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-slate-500">
                        {room.size} m² · {room.bed} · {room.view}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="text-lg font-bold text-navy-900">
                        {money(room.pricePerNight)}
                        <span className="text-xs font-normal text-slate-500"> / nuit</span>
                      </p>
                      <button
                        type="button"
                        onClick={() => bookRoom(room.id)}
                        className="rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-semibold text-navy-900"
                      >
                        Sélectionner
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}

          <h2 className="mt-10 text-xl font-semibold text-navy-900">Localisation</h2>
          <div className="mt-3 flex h-48 items-center justify-center rounded-2xl bg-navy-900 text-sm text-white/70">
            Carte — {item.district}, {item.city}, {item.country}
          </div>

          <h2 className="mt-10 text-xl font-semibold text-navy-900">Avis des voyageurs</h2>
          <div className="mt-4 space-y-3">
            {REVIEWS.map((review) => (
              <article key={review.name} className="rounded-2xl bg-white p-5 shadow-sm">
                <p className="font-semibold text-navy-900">{review.name}</p>
                <p className="text-xs text-slate-400">{review.city}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{review.text}</p>
              </article>
            ))}
          </div>

          <h2 className="mt-10 text-xl font-semibold text-navy-900">{isHotel ? "L'établissement" : "Votre hôte"}</h2>
          <div className="mt-4 flex gap-4 rounded-2xl bg-white p-5 shadow-sm">
            <img src={item.image} alt="" className="size-16 rounded-full object-cover" />
            <div>
              <p className="font-semibold text-navy-900">{item.name}</p>
              <p className="text-sm text-slate-500">Superhôte · Réponse en moins d&apos;une heure</p>
              <p className="mt-2 text-sm text-slate-600">
                Équipe locale formée Akwaba. Check-in dès 14h, assistance 24h/24.
              </p>
            </div>
          </div>

          <h2 className="mt-10 text-xl font-semibold text-navy-900">Règlement intérieur</h2>
          <ul className="mt-3 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
            <li>Arrivée à partir de 14h00</li>
            <li>Départ avant 12h00</li>
            <li>Non-fumeur</li>
            <li>Pas de fêtes / événements</li>
          </ul>
        </div>

        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-md">
          <p className="text-2xl font-bold text-navy-900">
            {money(stay.unit)}
            <span className="text-sm font-normal text-slate-500"> / nuit</span>
          </p>
          <p className="mt-1 text-sm text-slate-500">{booking.nights} nuits · {booking.adults} adultes</p>
          <button
            type="button"
            onClick={() => (isHotel ? navigate(`/hebergements/${item.id}/chambres`) : bookRoom())}
            className="mt-5 block w-full rounded-xl bg-brand-500 py-3.5 text-center font-semibold text-navy-900"
          >
            {isHotel ? "Voir les chambres" : "Réserver maintenant"}
          </button>
          <div className="mt-4 space-y-1 text-sm text-slate-600">
            <p className="flex justify-between">
              <span>Sous-total ({booking.nights} nuits)</span>
              <span>{money(stay.lodging)}</span>
            </p>
            <p className="flex justify-between">
              <span>Taxes &amp; frais</span>
              <span>{money(stay.tax)}</span>
            </p>
            <p className="flex justify-between border-t pt-2 font-bold text-navy-900">
              <span>Total</span>
              <span>{money(stay.lodging + stay.tax)}</span>
            </p>
          </div>
          <Link to={catalog} className="mt-4 block w-full rounded-xl bg-navy-900 py-3 text-center text-sm text-white">
            Retour aux {TYPE_LABELS[item.type].toLowerCase()}
          </Link>
        </aside>
      </div>

      {similar.length > 0 && (
        <section className="mt-16">
          <h2 className="text-xl font-semibold text-navy-900">{TYPE_LABELS[item.type]} similaires</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {similar.map((s) => (
              <Link key={s.id} to={`/hebergements/${s.id}`} className="overflow-hidden rounded-2xl bg-white shadow-sm">
                <img src={s.image} alt={s.name} className="h-44 w-full object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold text-navy-900">{s.name}</h3>
                  <p className="text-sm text-slate-500">{s.city}, {s.country}</p>
                  <p className="mt-2 font-bold text-navy-900">
                    {money(s.pricePerNight)} <span className="text-xs font-normal text-slate-500">/ nuit</span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </HebergementPageShell>
  );
}
