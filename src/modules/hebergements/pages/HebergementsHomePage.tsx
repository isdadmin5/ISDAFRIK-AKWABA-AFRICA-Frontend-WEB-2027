import { Link } from "react-router-dom";
import { useState, type ComponentType } from "react";
import {
  BadgeCheck,
  CalendarClock,
  ChevronDown,
  ChevronRight,
  CreditCard,
  Headphones,
  Heart,
  MapPin,
  ShieldCheck,
  Snowflake,
  Star,
  Waves,
  Wifi,
} from "lucide-react";
import { FIGMA } from "../assets";
import { HebergementSearchBar } from "../components/HebergementSearchBar";
import { ACCOMMODATIONS } from "../data/mockAccommodations";

const popular = ACCOMMODATIONS.filter((a) => a.type === "HOTEL").slice(0, 3);
const maisons = ACCOMMODATIONS.filter((a) => a.type === "MAISON");
const premium = ACCOMMODATIONS.filter((a) => a.type === "VILLA" || a.type === "APPARTEMENT").slice(0, 3);

export function HebergementsHomePage() {
  const [faq, setFaq] = useState(0);

  return (
    <div className="bg-[#f2f2f2]">
      <section className="relative h-[520px] overflow-hidden sm:h-[600px]">
        <img src={FIGMA.hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 mx-auto flex h-full max-w-[1280px] flex-col items-center px-4 pt-[88px] text-center">
          <h1 className="font-display text-[36px] font-bold leading-[1.15] tracking-[-1.28px] text-white sm:text-[56px] sm:leading-[70px]">
            Trouvez l&apos;hôtel idéal pour
            <br />
            votre séjour
          </h1>
          <p className="mt-4 max-w-3xl text-[17px] font-semibold leading-[28px] text-[#f8f8f8] sm:text-[22px] sm:leading-[32px]">
            Hôtels, appartements, villas et maisons dans les plus belles destinations d&apos;Afrique.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-4">
            <Link
              to="/hebergements/recherche"
              className="rounded-2xl bg-brand-500 px-10 py-[17px] text-[20px] font-semibold text-navy-900 shadow-lg"
            >
              Commencer mon voyage
            </Link>
            <a
              href="#populaires"
              className="rounded-2xl border border-white/30 bg-[#0d1b3d]/80 px-10 py-[17px] text-[20px] font-semibold text-white backdrop-blur"
            >
              Découvrir les destinations
            </a>
          </div>
        </div>
      </section>

      <div className="relative z-20 mx-auto -mt-20 px-4">
        <HebergementSearchBar />
      </div>

      <section id="populaires" className="mx-auto max-w-[1280px] px-4 py-20 sm:px-20">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-[30px] font-bold text-[#0f172a]">Hôtels les plus populaires</h2>
            <p className="mt-2 text-[16px] text-slate-500">Une sélection rigoureuse pour une expérience inoubliable.</p>
          </div>
          <Link to="/hebergements/hotels" className="hidden items-center gap-1 text-[16px] font-bold text-brand-500 sm:flex">
            Voir tout
            <ChevronRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {popular.map((item) => (
            <article
              key={item.id}
              className="overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-[0_10px_15px_-3px_rgba(0,0,0,0.05)]"
            >
              <Link to={`/hebergements/${item.id}`} className="relative block h-64 overflow-hidden">
                <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                {item.id === "HOT-SOF" && (
                  <span className="absolute left-4 top-4 rounded-full bg-[#0f172a] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[1.1px] text-brand-500">
                    LUXE
                  </span>
                )}
                <button
                  type="button"
                  className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full bg-white/90 backdrop-blur"
                  aria-label="Favori"
                >
                  <Heart className="h-[18px] w-5 text-navy-900" />
                </button>
              </Link>
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <h3 className="text-[20px] font-bold text-[#0f172a]">{item.name}</h3>
                  <span className="rounded-lg bg-brand-500/10 px-2 py-1 text-[14px] font-bold text-brand-500">
                    {item.rating.toFixed(1)}
                  </span>
                </div>
                <p className="mt-2 flex items-center gap-1 text-[14px] text-slate-500">
                  <MapPin className="h-[15px] w-3" />
                  {item.city}, {item.country}
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-4">
                  <p className="text-[18px] font-bold text-[#0f172a]">
                    {item.pricePerNight.toLocaleString("fr-FR")} FCFA{" "}
                    <span className="text-[12px] font-normal text-slate-500">/ nuit</span>
                  </p>
                  <Link to={`/hebergements/${item.id}`} className="text-[14px] font-bold text-brand-500">
                    Détails
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 pb-16 sm:px-20">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-[30px] font-bold text-[#0f172a]">Maisons d&apos;hôtes</h2>
            <p className="mt-2 text-[16px] text-slate-500">Le confort d&apos;une maison, l&apos;accueil d&apos;une famille.</p>
          </div>
          <Link to="/hebergements/maisons" className="hidden items-center gap-1 text-[16px] font-bold text-brand-500 sm:flex">
            Voir tout
            <ChevronRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {maisons.map((item) => (
            <article key={item.id} className="overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-sm">
              <Link to={`/hebergements/${item.id}`} className="block h-56 overflow-hidden">
                <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
              </Link>
              <div className="p-6">
                <h3 className="text-[20px] font-bold text-[#0f172a]">{item.name}</h3>
                <p className="mt-2 text-[14px] text-slate-500">
                  {item.city}, {item.country} · {item.capacity} voyageurs
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-4">
                  <p className="text-[18px] font-bold text-[#0f172a]">
                    {item.pricePerNight.toLocaleString("fr-FR")} FCFA{" "}
                    <span className="text-[12px] font-normal text-slate-500">/ nuit</span>
                  </p>
                  <Link to={`/hebergements/${item.id}`} className="text-[14px] font-bold text-brand-500">
                    Voir l&apos;annonce
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 pb-16 sm:px-20">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-[32px] font-semibold text-navy-900">Sélection Premium</h2>
            <p className="mt-2 text-[16px] text-[#4b5563]">Des hébergements d&apos;exception rigoureusement sélectionnés</p>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {premium.map((item) => (
            <article key={item.id} className="overflow-hidden rounded-xl bg-white shadow-md">
              <div className="h-64 overflow-hidden">
                <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <h3 className="text-[20px] font-semibold text-navy-900">{item.name}</h3>
                  <span className="flex items-center gap-1 rounded bg-[#feae2c]/20 px-2 py-1 text-[12px] font-bold text-[#835500]">
                    <Star className="h-3 w-3 fill-current" />
                    {item.rating.toFixed(1)}
                  </span>
                </div>
                <p className="mt-2 text-[12px] text-[#4b5563]">
                  {item.district}, {item.city} • {item.type === "VILLA" ? "Villa" : "Appartement"} • {item.capacity} Voyageurs
                </p>
                <div className="my-3 flex gap-4 border-y border-[#c6c6cf]/30 py-3 text-[12px] text-[#4b5563]">
                  <span className="flex items-center gap-1">
                    <Wifi className="h-3.5 w-3.5" /> Wi-Fi
                  </span>
                  <span className="flex items-center gap-1">
                    <Waves className="h-3.5 w-3.5" /> Piscine
                  </span>
                  <span className="flex items-center gap-1">
                    <Snowflake className="size-[15px]" /> Clim
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <p className="text-[20px] font-semibold text-navy-900">
                    {item.pricePerNight.toLocaleString("fr-FR")} FCFA
                    <span className="text-[12px] font-normal text-[#4b5563]"> /nuit</span>
                  </p>
                  <Link
                    to={`/hebergements/${item.id}`}
                    className="rounded-lg border border-navy-900 px-[17px] py-[9px] text-[16px] text-navy-900"
                  >
                    Voir
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#d9d9d9]/40 py-24">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-20">
          <h2 className="mb-12 text-[32px] font-semibold text-navy-900">Offres Spéciales &amp; Promotions</h2>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="relative flex h-64 overflow-hidden rounded-3xl bg-navy-900 px-12 shadow-lg">
              <img src={FIGMA.promoNights} alt="" className="absolute inset-y-0 right-0 w-1/3 object-cover opacity-40" />
              <div className="relative z-10 flex flex-col justify-center py-8">
                <span className="w-fit rounded bg-brand-500 px-2 py-1 text-[12px] font-bold text-white">OFFRE LIMITÉE</span>
                <h3 className="mt-3 text-[32px] font-semibold leading-10 text-white">
                  Séjournez 3 nuits,
                  <br />
                  payez pour 2
                </h3>
                <p className="mt-2 text-[16px] text-white/80">
                  Valable dans tous nos hôtels partenaires à Lomé et Abidjan.
                </p>
                <Link
                  to="/hebergements/recherche"
                  className="mt-4 w-fit rounded-2xl border border-white px-6 py-2 text-[16px] text-white"
                >
                  En profiter
                </Link>
              </div>
            </div>
            <div className="relative flex h-64 items-center overflow-hidden rounded-3xl border border-[#c6c6cf] bg-white px-12 shadow-lg">
              <CreditCard className="absolute right-10 top-10 h-[120px] w-[150px] text-navy-900 opacity-10" />
              <div>
                <h3 className="text-[32px] font-semibold leading-10 text-navy-900">
                  -20% avec la
                  <br />
                  carte Ecobank
                </h3>
                <p className="mt-2 text-[16px] text-[#45464e]">
                  Réduction exclusive sur votre réservation d&apos;hôtel via notre plateforme.
                </p>
                <button type="button" className="mt-4 rounded-2xl bg-brand-500 px-6 py-2 text-[16px] text-white">
                  Détails
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1120px] gap-8 px-4 py-24 sm:grid-cols-2 lg:grid-cols-4">
        {([
          { Icon: BadgeCheck, title: "Vérifié", text: "Experts sur place pour chaque établissement." },
          { Icon: ShieldCheck, title: "Sécurisé", text: "Paiements cryptés et réservation garantie." },
          { Icon: CalendarClock, title: "Flexible", text: "Annulation simplifiée sur la plupart des offres." },
          { Icon: Headphones, title: "Assistance", text: "Support dédié 24h/24 par nos concierges." },
        ] as Array<{ Icon: ComponentType<{ className?: string }>; title: string; text: string }>).map((item) => (
          <div key={item.title} className="rounded-[20px] border border-slate-200 bg-white p-8 text-center shadow-sm">
            <item.Icon className="mx-auto h-10 w-10 text-brand-500" />
            <h3 className="mt-3 text-[18px] font-bold text-[#0f172a]">{item.title}</h3>
            <p className="mt-1 text-[14px] leading-5 text-slate-500">{item.text}</p>
          </div>
        ))}
      </section>

      <section className="bg-navy-900 py-16">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <h2 className="text-[24px] font-semibold text-[#d8e2ff]">Appartements et Villas les plus populaires</h2>
              <p className="mt-1 text-[16px] text-[#c5c6cd]">Sélectionnés pour leur confort et leur excellence de service.</p>
            </div>
            <Link to="/hebergements/villas" className="text-[16px] font-bold text-brand-500">
              Voir tout
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:grid-rows-2">
            <img src={FIGMA.mosaic1} alt="" className="col-span-2 row-span-2 h-full max-h-[420px] w-full rounded-xl object-cover" />
            <img src={FIGMA.mosaic2} alt="" className="h-48 w-full rounded-xl object-cover" />
            <img src={FIGMA.mosaic3} alt="" className="h-48 w-full rounded-xl object-cover" />
            <img src={FIGMA.mosaic4} alt="" className="h-48 w-full rounded-xl object-cover" />
            <img src={FIGMA.mosaic5} alt="" className="h-48 w-full rounded-xl object-cover" />
          </div>
        </div>
      </section>

      <div className="overflow-hidden bg-[#f2f2f2] py-10">
        <p className="whitespace-nowrap text-center text-[40px] font-medium leading-5 text-black/80">
          ONOMO &nbsp;&nbsp; AZALAÏ &nbsp;&nbsp; RADISSON BLUE &nbsp;&nbsp; SARAKAWA &nbsp;&nbsp; GOLDEN TULIP
        </p>
      </div>

      <section className="mx-auto max-w-[768px] px-6 py-24">
        <h2 className="mb-12 text-center text-[32px] font-semibold text-navy-900">Questions Fréquentes</h2>
        {[
          {
            q: "Quelles sont les méthodes de paiement acceptées ?",
            a: "Nous acceptons les cartes bancaires internationales (Visa, Mastercard, Fedapay), ainsi que les solutions de Mobile Money locales (Flooz, Mixx by yas, Orange Money, MTN Mobile Money) pour faciliter vos réservations en toute sécurité.",
          },
          { q: "Puis-je annuler ma réservation gratuitement ?", a: "Oui, selon la politique d'annulation de chaque partenaire. La plupart des offres proposent une annulation gratuite jusqu'à 24h avant l'arrivée." },
          { q: "Proposez-vous des services de transfert aéroport ?", a: "Oui, des navettes aéroport peuvent être ajoutées lors de la réservation, selon la disponibilité de l'établissement." },
        ].map((item, i) => (
          <button
            key={item.q}
            type="button"
            onClick={() => setFaq(faq === i ? -1 : i)}
            className="mb-4 w-full overflow-hidden rounded-3xl border border-[#c6c6cf] bg-white text-left"
          >
            <div className="flex items-center justify-between p-6">
              <span className="text-[16px] text-navy-900">{item.q}</span>
              <ChevronDown
                className={`h-4 w-4 text-navy-900 transition ${faq === i ? "rotate-180" : ""}`}
              />
            </div>
            {faq === i && (
              <p className="border-t border-[#c6c6cf]/30 px-6 pb-6 pt-4 text-[16px] leading-6 text-[#45464e]">{item.a}</p>
            )}
          </button>
        ))}
      </section>
    </div>
  );
}
