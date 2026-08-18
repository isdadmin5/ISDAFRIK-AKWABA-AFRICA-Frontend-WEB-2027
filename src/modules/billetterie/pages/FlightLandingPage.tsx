import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FlightSearchBar } from "../components/FlightSearchBar";
import { FigmaIcon } from "../components/FigmaIcon";
import heroImg from "../assets/hero-plane.png";
import destLome from "../assets/dest-lome.png";
import destAbidjan from "../assets/dest-abidjan.png";
import destCotonou from "../assets/dest-cotonou.png";
import destAccra from "../assets/dest-accra.png";
import offerCabin from "../assets/offer-cabin.png";
import offerWeekend from "../assets/offer-weekend.png";

const DESTINATIONS = [
  {
    city: "Lomé",
    country: "TOGO",
    tag: "VOLS DIRECTS QUOTIDIENS",
    price: "480.000",
    img: destLome,
  },
  {
    city: "Abidjan",
    country: "CÔTE D'IVOIRE",
    tag: "L'EXPERIENCE AFRICAINE",
    price: "940.000",
    img: destAbidjan,
  },
  {
    city: "Cotonou",
    country: "BÉNIN",
    tag: "DESTINATION AFFAIRES",
    price: "610.000",
    img: destCotonou,
  },
  {
    city: "Accra",
    country: "Niger",
    tag: "CULTURE ET HISTOIRE",
    price: "105.000",
    img: destAccra,
  },
];

const OFFERS = [
  {
    badge: "OFFRE LIMITÉE",
    title: "Lomé → Abidjan",
    description: "Profitez de -15% sur vos réservations de groupe ce mois-ci.",
    pricePrefix: "Dès",
    price: "79.000 FCFA",
    cta: "J'en profite",
    img: offerCabin,
  },
  {
    badge: "NEW",
    title: "Weekend à Cotonou",
    description: "Forfait Vol + Hôtel pour 3 nuits à prix réduit.",
    pricePrefix: "À partir de",
    price: "645.000 FCFA",
    cta: "Découvrir",
    img: offerWeekend,
  },
];

const BENEFITS = [
  {
    icon: "trustPrice" as const,
    title: "Meilleurs prix",
    text: "Nous comparons des centaines de sites pour vous.",
  },
  {
    icon: "trustShield" as const,
    title: "Paiement sécurisé",
    text: "Vos transactions sont protégées à 100%.",
  },
  {
    icon: "trustHeadset" as const,
    title: "Assistance 24h/24",
    text: "Une équipe locale à votre écoute en permanence.",
  },
  {
    icon: "trustZap" as const,
    title: "Réservation rapide",
    text: "Réservez votre billet en moins de 2 minutes.",
  },
];

const PARTNERS = [
  { code: "A", name: "ASKY", color: "bg-[#dc2626]" },
  { code: "ACI", name: "Air Côte d'Ivoire", color: "bg-[#f97316]" },
  { code: "E", name: "Ethiopian", color: "bg-[#15803d]" },
  { code: "AF", name: "Air France", color: "bg-[#2563eb]" },
  { code: "TK", name: "Turkish Airlines", color: "bg-[#b91c1c]" },
];

const FAQ = [
  {
    q: "Comment puis-je modifier ou annuler mon billet ?",
    a: "Selon la compagnie et le tarif, la modification ou l’annulation peut être possible avec des frais. Retrouvez les conditions sur le détail du vol avant de confirmer.",
  },
  {
    q: "Quels sont les modes de paiement acceptés ?",
    a: "Cartes bancaires, Mobile Money et virement selon les offres disponibles. Tous les paiements sont sécurisés SSL.",
  },
  {
    q: "Puis-je réserver pour une autre personne ?",
    a: "Oui. Renseignez les informations exactes du voyageur telles qu’elles figurent sur son document d’identité officiel.",
  },
];

export function FlightLandingPage() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="bg-[#f2f2f2] font-body text-[#0d1b3d]">
      <section className="relative isolate overflow-hidden">
        <img
          src={heroImg}
          alt="Avion en vol"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1b3d]/75 via-[#0d1b3d]/45 to-[#f2f2f2]" />

        <div className="relative mx-auto max-w-[1120px] px-4 pb-36 pt-24 sm:px-6 sm:pb-40 sm:pt-28 lg:px-8">
          <div className="max-w-[672px] text-white">
            <h1 className="font-display text-[40px] font-bold leading-[1.05] tracking-[-0.96px] sm:text-[52px] lg:text-[60px] lg:leading-[60px]">
              Trouvez votre prochain vol en Afrique
            </h1>
            <p className="mt-4 max-w-[744px] text-base leading-7 text-[#e2e2e2] sm:text-[20px]">
              Comparez les meilleures offres et réservez au meilleur prix en toute simplicité avec
              AKWABA AFRICA.
            </p>
          </div>
        </div>
      </section>

      <div className="relative z-10 mx-auto -mt-28 max-w-[1120px] px-4 sm:-mt-32 sm:px-6 lg:px-8">
        <FlightSearchBar
          variant="hero"
          onSearch={() => navigate("/billetterie/resultats")}
        />
      </div>

      <section className="mx-auto max-w-[1120px] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-[28px] font-semibold leading-10 text-[#0d1b3d] sm:text-[32px]">
              Destinations Populaires
            </h2>
            <p className="mt-1 text-base text-[#4b5563]">Découvrez l&apos;Afrique au départ de Lomé</p>
          </div>
          <Link
            to="/billetterie/resultats"
            className="hidden items-center gap-1 text-base font-semibold text-[#0d1b3d] sm:inline-flex"
          >
            Tout voir
            <FigmaIcon name="arrowSeeAll" size={14} />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {DESTINATIONS.map((d) => (
            <Link
              key={d.city}
              to="/billetterie/resultats"
              className="overflow-hidden rounded-[24px] bg-white shadow-[0px_4px_20px_0px_rgba(13,27,61,0.05)] transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="relative h-48 overflow-hidden">
                <img src={d.img} alt={d.city} className="h-full w-full object-cover" />
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-[#1a1a1a]">
                  {d.country}
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-semibold text-[#0d1b3d]">{d.city}</h3>
                <p className="mt-1 text-xs font-bold uppercase tracking-[-0.6px] text-[#4b5563]">
                  {d.tag}
                </p>
                <div className="mt-3 flex items-center justify-between pt-1">
                  <span className="text-xs text-[#4b5563]">À partir de</span>
                  <p className="text-[#0d1b3d]">
                    <span className="text-base">{d.price} </span>
                    <span className="text-sm font-medium">FCFA</span>
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1120px] px-4 pb-8 sm:px-6 lg:px-8">
        <h2 className="mb-8 font-display text-[28px] font-semibold text-[#0d1b3d] sm:text-[32px]">
          Offres Spéciales
        </h2>
        <div className="grid gap-6 lg:grid-cols-2">
          {OFFERS.map((o) => (
            <article
              key={o.title}
              className="relative flex min-h-[300px] flex-col justify-center overflow-hidden rounded-[24px]"
            >
              <img src={o.img} alt={o.title} className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-[rgba(13,27,61,0.9)] to-[rgba(13,27,61,0)]" />
              <div className="relative flex h-full flex-col justify-center p-8 sm:p-10">
                <span className="mb-4 w-fit rounded-full bg-[#ff5c00] px-3 py-1 text-xs font-bold text-white">
                  {o.badge}
                </span>
                <h3 className="text-base text-white">{o.title}</h3>
                <p className="mt-2 max-w-md text-lg leading-7 text-white/80">{o.description}</p>
                <p className="mt-4 text-base text-white">
                  {o.pricePrefix}{" "}
                  <span className="text-xl font-bold text-[#ff5c00] sm:text-2xl">{o.price}</span>
                </p>
                <button
                  type="button"
                  onClick={() => navigate("/billetterie/resultats")}
                  className="mt-6 w-fit rounded-2xl bg-white px-8 py-3 text-base font-bold text-[#0d1b3d] transition hover:bg-[#f5f5f5]"
                >
                  {o.cta}
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1120px] px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 rounded-[24px] bg-[#0d1b3d] px-8 py-16 text-white sm:flex-row sm:gap-12 sm:px-12">
          {BENEFITS.map((b) => (
            <div key={b.title} className="flex flex-1 flex-col items-center gap-4 text-center">
              <div className="flex size-16 items-center justify-center rounded-full bg-white/10">
                <FigmaIcon name={b.icon} size={28} />
              </div>
              <div>
                <h3 className="text-base text-white">{b.title}</h3>
                <p className="mt-2 text-base leading-6 text-white/60">{b.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1120px] px-4 pb-10 sm:px-6 lg:px-8">
        <p className="mb-8 text-center text-base uppercase tracking-[3.2px] text-[#4b5563]">
          Nos compagnies partenaires
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
          {PARTNERS.map((p) => (
            <div key={p.name} className="flex items-center gap-3">
              <div
                className={`flex size-10 items-center justify-center rounded-[2px] text-base font-bold italic text-white ${p.color}`}
              >
                {p.code}
              </div>
              <span className="text-xl font-bold text-[#0d1b3d]">{p.name}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[768px] px-4 pb-16 sm:px-6 lg:px-8">
        <h2 className="mb-12 text-center font-display text-[28px] font-semibold text-[#0d1b3d] sm:text-[32px]">
          Questions Fréquentes
        </h2>
        <div className="flex flex-col gap-4">
          {FAQ.map((item, i) => {
            const open = openFaq === i;
            return (
              <div
                key={item.q}
                className="overflow-hidden rounded-[24px] border border-[#c6c6cf] bg-white"
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 p-6 text-left"
                  onClick={() => setOpenFaq(open ? null : i)}
                  aria-expanded={open}
                >
                  <span className="text-base font-semibold text-[#0d1b3d]">{item.q}</span>
                  <FigmaIcon
                    name="faqChevron"
                    size={12}
                    className={open ? "rotate-180" : ""}
                  />
                </button>
                {open && (
                  <div className="border-t border-[#c6c6cf]/60 px-6 pb-6">
                    <p className="pt-4 text-sm leading-6 text-[#4b5563]">{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
