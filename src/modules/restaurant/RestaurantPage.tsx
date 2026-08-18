import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  MapPin,
  Star,
  Heart,
  ChevronRight,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  CheckCircle,
  Headphones,
  Calendar,
  Clock,
  Users,
  Utensils,
  Coffee,
  Sun,
  Moon,
  Briefcase,
  Waves,
} from "lucide-react";
import { restaurants } from "./restaurant.data";
import type { Restaurant } from "./restaurant.types";
import { RestaurantDetailModal } from "./RestaurantDetailModal";

// 7 Categories / Ambiances
const ambiances = [
  { id: "Petit-déjeuner", label: "Petit-déjeuner", icon: Coffee },
  { id: "Déjeuner", label: "Déjeuner", icon: Sun },
  { id: "Dîner", label: "Dîner", icon: Moon },
  { id: "Familial", label: "Familial", icon: Users },
  { id: "Affaires", label: "Affaires", icon: Briefcase },
  { id: "Vue mer", label: "Vue mer", icon: Waves },
  { id: "Romantique", label: "Romantique", icon: Heart },
];

// Culinary Events
const events = [
  {
    id: 1,
    title: "Festival Gastronomique de Lomé",
    dateLocation: "21-23 Décembre • Lomé",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 2,
    title: "Semaine des Grillades",
    dateLocation: "13-17 Novembre • Abidjan",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 3,
    title: "Soirée Jazz & Dîner",
    dateLocation: "Chaque jeudi • Dakar",
    image: "https://images.unsplash.com/photo-1510627498534-cf7e9002facc?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 4,
    title: "Festival Gastronomique de Lomé",
    dateLocation: "21-23 Décembre • Lomé",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 5,
    title: "Semaine des Grillades",
    dateLocation: "13-17 Novembre • Abidjan",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 6,
    title: "Soirée Jazz & Dîner",
    dateLocation: "Chaque jeudi • Dakar",
    image: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=1200&q=80",
  },
];

// Features
const features = [
  {
    title: "Réservation instantanée",
    description: "Confirmation immédiate de votre table sans attente.",
    icon: Sparkles,
  },
  {
    title: "Paiement sécurisé",
    description: "Vos paiements et données sont protégés grâce à nos protocoles.",
    icon: ShieldCheck,
  },
  {
    title: "Restaurants vérifiés",
    description: "Tous nos partenaires sont soigneusement sélectionnés.",
    icon: CheckCircle,
  },
  {
    title: "Assistance 24/7",
    description: "Notre équipe support est disponible pour répondre à vos besoins.",
    icon: Headphones,
  },
];

// FAQ items
const faqList = [
  {
    question: "Puis-je modifier ou annuler ma réservation ?",
    answer:
      "Oui, vous pouvez modifier ou annuler gratuitement votre réservation jusqu'à 2 heures avant l'heure prévue directement depuis votre espace client ou par téléphone.",
  },
  {
    question: "Les menus sont-ils consultables à l'avance ?",
    answer:
      "Absolument. La plupart de nos restaurants partenaires mettent à jour leurs cartes et menus de saison en ligne sur AKWABA AFRICA.",
  },
  {
    question: "Proposez-vous des réservations pour les groupes ?",
    answer:
      "Oui ! Pour les événements ou les groupes de plus de 8 personnes, des formules dédiées avec salons privés et menues personnalisés sont proposées.",
  },
  {
    question: "Y a-t-il des options végétariennes ?",
    answer:
      "Tout à fait. Nos filtres de recherche et fiches d'établissements indiquent clairement les options végétariennes, véganes et sans gluten disponibles.",
  },
];

export function RestaurantPage() {
  const navigate = useNavigate();

  // Search & Filter State
  const [selectedCity, setSelectedCity] = useState("Toutes les villes");
  const [searchName, setSearchName] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedGuests, setSelectedGuests] = useState("2");
  const [selectedTime, setSelectedTime] = useState("09:15");
  const [activeAmbiance, setActiveAmbiance] = useState<string | null>(null);

  // Favorites
  const [favorites, setFavorites] = useState<Record<string, boolean>>({
    "le-phenicien": true,
  });

  // Active Modal Restaurant
  const [modalRestaurant, setModalRestaurant] = useState<Restaurant | null>(null);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Toggle favorite helper
  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Filtered popular restaurants
  const filteredRestaurants = useMemo(() => {
    return restaurants.filter((r) => {
      const matchCity =
        selectedCity === "Toutes les villes" ||
        r.location.toLowerCase().includes(selectedCity.toLowerCase());

      const matchName =
        !searchName.trim() ||
        r.name.toLowerCase().includes(searchName.toLowerCase()) ||
        r.category.toLowerCase().includes(searchName.toLowerCase());

      const matchAmbiance =
        !activeAmbiance ||
        r.ambiance === activeAmbiance ||
        r.tags.includes(activeAmbiance);

      return matchCity && matchName && matchAmbiance;
    });
  }, [selectedCity, searchName, activeAmbiance]);

  // AKWABA Selection (3 featured items)
  const selectionAkwaba = useMemo(() => {
    return restaurants.filter((r) => r.featured).slice(0, 3);
  }, []);

  return (
    <div className="bg-[#F8FAFC] text-slate-900 font-body ">
      {/* HERO SECTION */}
      <section className="relative bg-[#0B1536]">
        {/* Background Image with warm overlay */}
        <div className="absolute inset-0 overflow-hidden ">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity scale-105 transition-transform duration-1000"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=2000&q=80')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B1536]/80 via-[#0B1536]/60 to-[#0B1536]" />
        </div>

        {/* Hero Content */}
        <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-20 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white font-display tracking-tight max-w-4xl leading-tight">
            Réservez les meilleures tables d'Afrique de l'Ouest
          </h1>
          <p className="mt-4 max-w-2xl text-sm sm:text-lg text-slate-300 font-normal leading-relaxed">
            Découvrez les meilleurs restaurants, cuisines locales et gastronomiques au Togo, au Bénin, au Burkina Faso, en Côte d'Ivoire et au Niger.
          </p>
        </div>
        <br /><br />
      </section>
        
      <section>
        {/* FLOATING SEARCH CARD */}
        <div className="relative -mt-11 mx-auto max-w-6xl w-full  px-4 sm:px-6 lg:px-8 -mb-16 sm:-mb-14 z-30 mt-5 ">
          <div className="rounded-[24px] sm:rounded-[13px] bg-white p-5 sm:p-9 shadow-xl border border-slate-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3.5 items-end">
              {/* DESTINATION */}
              <div>
                <label className="block text-[11px] font-extrabold text-[#0B1536]  uppercase tracking-wider mb-1.5">
                  DESTINATION
                </label>
                <div className="relative">
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-800 outline-none focus:border-[#F97316] cursor-pointer shadow-sm"
                  >
                    <option value="Lomé">Lomé</option>
                    <option value="Toutes les villes">Toutes les destinations</option>
                    <option value="Dakar">Dakar</option>
                    <option value="Abidjan">Abidjan</option>
                    <option value="Cotonou">Cotonou</option>
                    <option value="Ouagadougou">Ouagadougou</option>
                    <option value="Niamey">Niamey</option>
                  </select>
                  <ChevronDown className="absolute right-3.5 top-3 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* DATE */}
              <div>
                <label className="block text-[11px] font-extrabold text-[#0B1536] uppercase tracking-wider mb-1.5">
                  DATE
                </label>
                <input
                  type="text"
                  placeholder="mm/dd/yyyy"
                  value={selectedDate}
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => {
                    if (!e.target.value) e.target.type = "text";
                  }}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-medium text-slate-800 placeholder-slate-400 outline-none focus:border-[#F97316] shadow-sm"
                />
              </div>
      
              {/* HEURE */}
              <div>
                <label className="block text-[11px] font-extrabold text-[#0B1536] uppercase tracking-wider mb-1.5">
                  HEURE
                </label>
                <div className="relative">
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-800 outline-none focus:border-[#F97316] cursor-pointer shadow-sm"
                  >
                    <option value="12:00">12:00</option>
                    <option value="09:15">09:15</option>
                    <option value="13:00">13:00</option>
                    <option value="19:30">19:30</option>
                    <option value="20:00">20:00</option>
                    <option value="21:00">21:00</option>
                  </select>
                  <ChevronDown className="absolute right-3.5 top-3 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* PERSONNES */}
              <div>
                <label className="block text-[11px] font-extrabold text-[#0B1536] uppercase tracking-wider mb-1.5">
                  PERSONNES
                </label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={selectedGuests}
                  onChange={(e) => setSelectedGuests(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-800 outline-none focus:border-[#F97316] shadow-sm"
                />
              </div>

              {/* CUISINE */}
              <div>
                <label className="block text-[11px] font-extrabold text-[#0B1536] uppercase tracking-wider mb-1.5">
                  CUISINE
                </label>
                <div className="relative">
                  <select
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-800 outline-none focus:border-[#F97316] cursor-pointer shadow-sm"
                  >
                    <option value="">Togolaise</option>
                    <option value="Libanaise">Libanaise</option>
                    <option value="Poissons">Poissons & Fruits de mer</option>
                    <option value="Africaine">Africaine</option>
                    <option value="Gastronomique">Gastronomique</option>
                    <option value="Française">Française</option>
                  </select>
                  <ChevronDown className="absolute right-3.5 top-3 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Button Rechercher */}
              <div>
                <button
                  onClick={() => {}}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#F97316] py-2.5 px-4 text-xs font-bold text-white shadow-md transition hover:bg-orange-600 active:scale-95"
                >
                  <Search className="h-4 w-4" />
                  <span>Rechercher</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RESTAURANTS POPULAIRES SECTION */}
      <section className="mx-auto max-w-7xl px-4 pt-24 sm:pt-28 pb-14 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1536] font-display">
              Restaurants Populaires
            </h2>
            <div className="w-12 h-1 bg-[#F97316] rounded-full mt-2" />
          </div>
          <button
            onClick={() => {
              setActiveAmbiance(null);
              setSelectedCity("Toutes les villes");
              setSearchName("");
            }}
            className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#F97316] hover:underline"
          >
            <span>Voir tout</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {filteredRestaurants.length === 0 ? (
          <div className="rounded-2xl bg-white p-12 text-center border border-slate-200">
            <Utensils className="mx-auto h-12 w-12 text-slate-300" />
            <h3 className="mt-4 text-lg font-semibold text-slate-800">Aucun restaurant trouvé</h3>
            <p className="mt-1 text-sm text-slate-500">Essayez de modifier vos critères de recherche ou réinitialisez les filtres.</p>
            <button
              onClick={() => {
                setSelectedCity("Toutes les villes");
                setSearchName("");
                setActiveAmbiance(null);
              }}
              className="mt-4 rounded-xl bg-[#F97316] px-5 py-2 text-xs font-semibold text-white"
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredRestaurants.map((restaurant) => (
              <div
                key={restaurant.id}
                onClick={() => navigate(`/restaurants/${restaurant.id}`)}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer"
              >
                {/* Image Container */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Rating Badge (Top Left) */}
                  <div className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-bold text-[#F97316] shadow-sm backdrop-blur-sm">
                    <Star className="h-3.5 w-3.5 fill-[#F97316] text-[#F97316]" />
                    <span>{restaurant.rating.toFixed(1)}</span>
                  </div>

                  {/* Favorite Button (Top Right) */}
                  <button
                    onClick={(e) => toggleFavorite(restaurant.id, e)}
                    className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow transition hover:scale-110"
                    aria-label="Ajouter aux favoris"
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        favorites[restaurant.id]
                          ? "fill-red-500 text-red-500"
                          : "text-slate-600"
                      }`}
                    />
                  </button>
                </div>

                {/* Card Content */}
                <div className="p-4 flex flex-col flex-1 justify-between space-y-3">
                  <div>
                    <h3 className="text-base font-bold text-[#0B1536] group-hover:text-[#F97316] transition line-clamp-1">
                      {restaurant.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                      {restaurant.category}
                    </p>
                    <p className="flex items-center gap-1 text-xs text-slate-400 mt-1.5">
                      <MapPin className="h-3.5 w-3.5 text-[#F97316]" />
                      <span>{restaurant.location}</span>
                    </p>
                  </div>

                  {/* Price & Action Button */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 gap-2">
                    <span className="text-xs sm:text-sm font-bold text-[#0B1536] truncate">
                      {restaurant.price}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setModalRestaurant(restaurant);
                        }}
                        className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition"
                      >
                        Aperçu
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/restaurants/${restaurant.id}`);
                        }}
                        className="rounded-xl bg-[#0B1536] px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#162454] active:scale-95"
                      >
                        Voir
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* TROUVEZ VOTRE AMBIANCE SECTION */}
      <section className="bg-white py-14 border-y border-slate-200/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1536] text-center font-display mb-8">
            Trouvez votre ambiance
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
            {ambiances.map(({ id, label, icon: Icon }) => {
              const isActive = activeAmbiance === id;
              return (
                <button
                  key={id}
                  onClick={() => setActiveAmbiance(isActive ? null : id)}
                  className={`flex flex-col items-center justify-center p-5 rounded-2xl border transition-all duration-200 cursor-pointer text-center group ${
                    isActive
                      ? "border-[#F97316] bg-orange-50/50 text-[#F97316] shadow-sm"
                      : "border-slate-200/80 bg-white text-slate-700 hover:border-[#F97316]/50 hover:text-[#F97316] shadow-sm"
                  }`}
                >
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl mb-3 transition ${
                    isActive ? "bg-[#F97316] text-white" : "bg-slate-100 text-slate-600 group-hover:bg-[#F97316]/10 group-hover:text-[#F97316]"
                  }`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-semibold tracking-wide">
                    {label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* SÉLECTION AKWABA SECTION */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1536] font-display">
            Sélection AKWABA
          </h2>
          <span className="rounded-full bg-orange-100 text-[#F97316] text-xs font-bold px-3 py-1">
            Les plus réservés
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {selectionAkwaba.map((restaurant) => (
            <div
              key={restaurant.id}
              onClick={() => setModalRestaurant(restaurant)}
              className="flex items-center gap-4 rounded-2xl bg-white p-4 border border-slate-200/80 shadow-sm hover:shadow-md transition cursor-pointer group"
            >
              <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="h-full w-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>

              <div className="flex flex-col justify-between flex-1 min-w-0">
                <div>
                  <h3 className="text-sm font-bold text-[#0B1536] truncate group-hover:text-[#F97316] transition">
                    {restaurant.name}
                  </h3>
                  <p className="text-xs text-slate-500 truncate mt-0.5">
                    {restaurant.location}
                  </p>
                </div>

                <div className="flex items-center gap-1 text-xs font-bold text-amber-500 mt-1">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  <span>{restaurant.rating.toFixed(1)}</span>
                  <span className="text-slate-400 font-normal">
                    ({restaurant.reviewsCount || 100} avis)
                  </span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setModalRestaurant(restaurant);
                  }}
                  className="text-left text-xs font-bold text-[#F97316] underline hover:text-orange-600 mt-2"
                >
                  Réserver maintenant
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ÉVÉNEMENTS CULINAIRES SECTION */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1536] font-display mb-8">
          Événements Culinaires
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="group relative h-64 overflow-hidden rounded-2xl shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
            >
              <img
                src={event.image}
                alt={event.title}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              <div className="absolute bottom-4 left-4 right-4 text-white space-y-2">
                <h3 className="text-base sm:text-lg font-bold font-display leading-snug">
                  {event.title}
                </h3>
                <p className="text-xs text-slate-300 flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-[#F97316]" />
                  {event.dateLocation}
                </p>
                <button className="rounded-xl bg-[#F97316] px-4 py-2 text-xs font-semibold text-white shadow transition hover:bg-orange-600">
                  Découvrir
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES / GARANTIES SECTION */}
      <section className="bg-white py-14 border-t border-slate-200/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl  border border-slate-100 bg-red p-6 shadow-sm flex flex-col items-start"
              >
                
                <div className="flex items-center justify-center w-full">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-[#F97316] mb-4">
                  <feature.icon className="h-6  w-6" />
                </div>
                </div>

                <div className="flex items-center justify-center w-full">
                <h3 className="text-base font-bold text-[#0B1536]">
                  {feature.title}
                </h3>
                </div>

                <div className="flex text-center justify-center w-full">
                <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                  {feature.description}
                </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUESTIONS FRÉQUENTES (FAQ) SECTION */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1536] text-center font-display mb-8">
          Questions Fréquentes
        </h2>

        <div className="space-y-3">
          {faqList.map((item, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={item.question}
                className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between p-4 sm:p-5 text-left text-sm font-semibold text-[#0B1536] hover:text-[#F97316] transition"
                >
                  <span>{item.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-slate-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? "rotate-180 text-[#F97316]" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                    <p className="pt-3">{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* RESTAURANT DETAIL MODAL */}
      <RestaurantDetailModal
        restaurant={modalRestaurant}
        onClose={() => setModalRestaurant(null)}
      />
    </div>
  );
}
