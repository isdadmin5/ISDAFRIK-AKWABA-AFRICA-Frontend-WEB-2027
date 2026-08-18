import { Link, useSearchParams } from "react-router-dom";
import { MapPin } from "lucide-react";
import { HebergementPageShell } from "../components/HebergementPageShell";
import { filterAccommodations, TYPE_LABELS } from "../data/mockAccommodations";
import { FIGMA } from "../assets";
import type { AccommodationType } from "../types";
import { useBooking } from "../booking/BookingContext";

const TITLES: Record<AccommodationType | "ALL", (city: string) => string> = {
  ALL: (c) => `Hébergements à ${c}`,
  HOTEL: (c) => `Hôtels à ${c}`,
  MAISON: (c) => `Maisons à ${c}`,
  VILLA: (c) => `Villas à ${c}`,
  APPARTEMENT: (c) => `Appartements à ${c}`,
  RESIDENCE: (c) => `Résidences à ${c}`,
};

export function HebergementResultsPage({ type }: { type: AccommodationType | "ALL" }) {
  const [params] = useSearchParams();
  const booking = useBooking();
  const q = params.get("q") ?? "";
  const list = filterAccommodations({
    destination: q,
    type,
  });
  const plural = type === "ALL" ? "hébergements" : TYPE_LABELS[type].toLowerCase();

  return (
    <HebergementPageShell
      activeType={type}
      destination={params.get("q") ?? ""}
      crumbs={[
        { label: "Accueil", to: "/hebergements" },
        { label: "Hébergements", to: "/hebergements" },
        { label: TYPE_LABELS[type] },
      ]}
    >
      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="h-fit rounded-2xl bg-white p-5 shadow-sm">
          <div className="mb-4 overflow-hidden rounded-xl">
            <img src={FIGMA.mosaic5} alt="Carte" className="h-32 w-full object-cover" />
            <p className="bg-slate-100 py-2 text-center text-sm font-semibold text-navy-900">Voir sur la carte</p>
          </div>
          <h2 className="mb-3 font-semibold text-navy-900">Filtrer par</h2>
          <p className="mb-2 text-sm text-slate-500">Budget par nuit</p>
          <input type="range" className="mb-4 w-full accent-brand-500" />
          <p className="mb-2 text-sm font-medium">Catégorie</p>
          {["5 étoiles", "4 étoiles", "3 étoiles"].map((c) => (
            <label key={c} className="mb-1 flex items-center gap-2 text-sm">
              <input type="checkbox" defaultChecked={c.startsWith("5")} className="accent-brand-500" /> {c}
            </label>
          ))}
          <p className="mb-2 mt-4 text-sm font-medium">Services populaires</p>
          {["Wi-Fi gratuit", "Piscine", "Navette Aéroport", "Spa & Bien-être"].map((c) => (
            <label key={c} className="mb-1 flex items-center gap-2 text-sm">
              <input type="checkbox" className="accent-brand-500" /> {c}
            </label>
          ))}
        </aside>

        <div>
          <h1 className="text-3xl font-bold text-navy-900">{q ? TITLES[type](q) : TYPE_LABELS[type]}</h1>
          <p className="mt-1 text-slate-500">
            {list.length} {plural} trouvé{list.length > 1 ? "s" : ""}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {["Recommandé", "Prix", "Note", "Distance"].map((s, i) => (
              <button
                key={s}
                type="button"
                className={i === 0 ? "rounded-full bg-navy-900 px-4 py-1.5 text-sm text-white" : "rounded-full bg-white px-4 py-1.5 text-sm"}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="mt-6 space-y-4">
            {list.map((item) => (
              <article key={item.id} className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm md:flex-row">
                <div className="relative h-52 w-full md:h-auto md:w-72">
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                  <span className="absolute left-3 top-3 rounded bg-navy-900 px-2 py-1 text-[10px] font-bold uppercase text-brand-500">
                    {TYPE_LABELS[item.type]}
                  </span>
                </div>
                <div className="flex flex-1 flex-col justify-between p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="text-xl font-bold text-navy-900">{item.name}</h2>
                      <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                        <MapPin className="h-3.5 w-3" />
                        {item.district}, {item.city}
                      </p>
                    </div>
                    <div className="rounded-lg bg-[#c9a227] px-3 py-1 text-right text-sm font-bold text-white">
                      Excellent {item.rating.toFixed(1)}
                    </div>
                  </div>
                  <p className="mt-3 line-clamp-2 text-sm text-slate-600">{item.description}</p>
                  <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
                    <p className="text-xl font-bold text-navy-900">
                      {item.pricePerNight.toLocaleString("fr-FR")} FCFA
                      <span className="text-xs font-normal text-slate-500"> / nuit</span>
                    </p>
                    <Link
                      to={`/hebergements/${item.id}`}
                      onClick={() => booking.setAccommodation(item.id)}
                      className="rounded-xl bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white"
                    >
                      {item.type === "HOTEL" ? "Voir les chambres" : "Voir l'annonce"}
                    </Link>
                  </div>
                </div>
              </article>
            ))}
            {list.length === 0 && (
              <div className="rounded-2xl border border-dashed bg-white px-6 py-16 text-center">
                <p className="font-semibold text-navy-900">Aucun résultat</p>
                <p className="mt-1 text-sm text-slate-500">Modifiez la destination ou le type d&apos;hébergement.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </HebergementPageShell>
  );
}
