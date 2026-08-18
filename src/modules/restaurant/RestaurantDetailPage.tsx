import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Star,
  MapPin,
  Clock,
  ArrowLeft,
  Heart,
  Share2,
  CheckCircle2,
  Calendar,
  Users,
  Search,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Flame,
  Grid,
  ShoppingCart,
  Sparkles,
} from "lucide-react";
import { restaurants } from "./restaurant.data";
import type { Restaurant } from "./restaurant.types";
import { RestaurantDetailModal } from "./RestaurantDetailModal";

export function RestaurantDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Find target restaurant or fallback to first
  const restaurant = restaurants.find((r) => r.id === id) || restaurants[0];

  // Top search bar state
  const [selectedCity, setSelectedCity] = useState("Lomé");
  const [selectedDate, setSelectedDate] = useState("mm/dd/yyyy");
  const [selectedTime, setSelectedTime] = useState("12:00");
  const [selectedGuests, setSelectedGuests] = useState("2");
  const [selectedCuisine, setSelectedCuisine] = useState("Togolaise");

  // Gallery state
  const [showAllPhotosModal, setShowAllPhotosModal] = useState(false);

  // Menu tab state
  const [activeMenuTab, setActiveMenuTab] = useState<string>("Entrées");

  // Reservation Form Sidebar State
  const [occasion, setOccasion] = useState("Dîner Standard");
  const [resDate, setResDate] = useState("2024-11-20");
  const [resGuests, setResGuests] = useState(2);
  const [resTimeSlot, setResTimeSlot] = useState("19:00");
  const [resSuccess, setResSuccess] = useState(false);

  // Pre-order items counter simulation
  const [preorderCount, setPreorderCount] = useState<Record<string, number>>({});

  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handlePreorder = (dishId: string) => {
    setPreorderCount((prev) => ({
      ...prev,
      [dishId]: (prev[dishId] || 0) + 1,
    }));
  };

  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResSuccess(true);
  };

  const galleryImages = restaurant.gallery && restaurant.gallery.length >= 5
    ? restaurant.gallery
    : [
        restaurant.image,
        "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1510627498534-cf7e9002facc?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
      ];

  const menuCategories = ["Entrées", "Plats", "Desserts", "Boissons"];

  const filteredDishes = restaurant.menu
    ? restaurant.menu.filter((item) => {
        if (activeMenuTab === "Entrées") return item.category === "Entrées" || item.category === "Entrée";
        if (activeMenuTab === "Plats") return item.category === "Plats Principaux" || item.category === "Plats";
        if (activeMenuTab === "Desserts") return item.category === "Desserts";
        if (activeMenuTab === "Boissons") return item.category === "Boissons & Cocktails" || item.category === "Boissons";
        return true;
      })
    : [];

  return (
    <div className="bg-[#F8FAFA] min-h-screen text-slate-900 font-body">
      
      {/* FACK HERO*/}
      <div className="bg-[#0B1536] pb-12 px-4 sm:px-6 h-40 lg:px-8">
      </div>

      {/* FLOATING SEARCH CARD TOP SECTION */}
      <div>
        <div className="mx-auto max-w-7xl">
          
          <div className="rounded-2xl mx-5 -mt-10  sm:rounded-3xl bg-white p-4 sm:p-5 shadow-x1 border border-slate-100">
            <div className="m-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 items-end">
              {/* DESTINATION */}
              <div>
                <label className="block text-[10px] font-extrabold text-[#0B1536] uppercase tracking-wider mb-1">
                  DESTINATION
                </label>
                <div className="relative">
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 outline-none focus:border-[#F97316] cursor-pointer"
                  >
                    <option value="Lomé">Lomé</option>
                    <option value="Dakar">Dakar</option>
                    <option value="Abidjan">Abidjan</option>
                    <option value="Cotonou">Cotonou</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-2.5 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* DATE */}
              <div>
                <label className="block text-[10px] font-extrabold text-[#0B1536] uppercase tracking-wider mb-1">
                  DATE
                </label>
                <input
                  type="text"
                  placeholder="mm/dd/yyyy"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 outline-none focus:border-[#F97316]"
                />
              </div>

              {/* HEURE */}
              <div>
                <label className="block text-[10px] font-extrabold text-[#0B1536] uppercase tracking-wider mb-1">
                  HEURE
                </label>
                <div className="relative">
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 outline-none focus:border-[#F97316] cursor-pointer"
                  >
                    <option value="12:00">12:00</option>
                    <option value="13:00">13:00</option>
                    <option value="19:00">19:00</option>
                    <option value="20:00">20:00</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-2.5 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* PERSONNES */}
              <div>
                <label className="block text-[10px] font-extrabold text-[#0B1536] uppercase tracking-wider mb-1">
                  PERSONNES
                </label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={selectedGuests}
                  onChange={(e) => setSelectedGuests(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 outline-none focus:border-[#F97316]"
                />
              </div>

              {/* CUISINE */}
              <div>
                <label className="block text-[10px] font-extrabold text-[#0B1536] uppercase tracking-wider mb-1">
                  CUISINE
                </label>
                <div className="relative">
                  <select
                    value={selectedCuisine}
                    onChange={(e) => setSelectedCuisine(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 outline-none focus:border-[#F97316] cursor-pointer"
                  >
                    <option value="Togolaise">Togolaise</option>
                    <option value="Méditerranéenne">Méditerranéenne</option>
                    <option value="Française">Française</option>
                    <option value="Poissons">Poissons</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-2.5 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* BUTTON RECHERCHER */}
              <div>
                <button
                  onClick={() => {}}
                  className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-[#F97316] py-2 px-4 text-xs font-extrabold text-white shadow transition hover:bg-orange-600 active:scale-95"
                >
                  <Search className="h-3.5 w-3.5" />
                  <span>Rechercher</span>
                </button>
              </div>
            </div>
          </div> <br />
        </div>
        
      </div>
     
    
    
    
      {/* MAIN CONTAINER */}
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8 space-y-6">
        {/* BREADCRUMBS */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          <Link to="/" className="hover:text-slate-900 transition">Accueil</Link>
          <span>›</span>
          <Link to="/restaurants" className="hover:text-slate-900 transition">Restaurants</Link>
          <span>›</span>
          <span className="text-slate-800 font-bold">{restaurant.name}</span>
        </nav>

        {/* 5-PHOTO GALLERY GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 rounded-3xl overflow-hidden">
          {/* Main Large Photo (Left 50%) */}
          <div className="h-[320px] sm:h-[400px] rounded-2xl overflow-hidden bg-slate-200 relative group">
            <img
              src={galleryImages[0]}
              alt={restaurant.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* 2x2 Small Photos (Right 50%) */}
          <div className="grid grid-cols-2 gap-3 h-[320px] sm:h-[400px]">
            {galleryImages.slice(1, 5).map((imgUrl, idx) => {
              const isLast = idx === 3;
              return (
                <div
                  key={idx}
                  onClick={() => setShowAllPhotosModal(true)}
                  className="relative h-full rounded-2xl overflow-hidden bg-slate-200 cursor-pointer group"
                >
                  <img
                    src={imgUrl}
                    alt={`Photo ${idx + 2}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {isLast && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[2px] transition hover:bg-black/50">
                      <div className="flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-xs font-bold text-[#0B1536] shadow-md backdrop-blur-md">
                        <Grid className="h-4 w-4 text-[#0B1536]" />
                        <span>Voir toutes les photos</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* TITLE & HEADER METRICS SECTION */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2">
          <div>
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-[#0B1536] px-3 py-1 text-[11px] font-bold text-white shadow-sm">
                <CheckCircle2 className="h-3.5 w-3.5 text-blue-400" />
                Restaurant vérifié
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-3 py-1 text-[11px] font-bold text-[#F97316]">
                <Flame className="h-3.5 w-3.5 fill-[#F97316] text-[#F97316]" />
                Très demandé
              </span>
            </div><br />

            {/* Restaurant Title & Subtitle */}
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B1536] font-display">
              {restaurant.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
              {restaurant.category} • {restaurant.location}
            </p>
          </div>

          {/* Right Metrics: Rating & Price */}
          <div className="flex flex-col md:items-end justify-center">
            <div className="flex items-center gap-1.5">
              <Star className="h-5 w-5 fill-[#F97316] text-[#F97316]" />
              <span className="text-xl font-extrabold text-[#0B1536]">{restaurant.rating.toFixed(1)}</span>
              <span className="text-xs text-slate-400 font-normal">({restaurant.reviewsCount || 1264} avis)</span>
            </div>
            <div className="mt-1">
              <span className="text-xl sm:text-2xl font-extrabold text-[#0B1536]">{restaurant.price.split('/')[0]}</span>
              <span className="text-xs text-slate-500 font-normal"> / personne</span>
            </div>
          </div>
        </div>

        {/* 2-COLUMN CONTENT SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
          
          {/* LEFT COLUMN (~65-70%) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* CARD: À PROPOS DU PHÉNICIES */}
            <div className="rounded-3xl bg-white p-6 sm:p-8 border border-slate-200/80 shadow-sm relative overflow-hidden space-y-5">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#F97316]" />

              <h2 className="text-xl font-bold text-[#0B1536] font-display">
                À propos du {restaurant.name}
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {restaurant.fullDescription || restaurant.description}
              </p>

              {/* Chef Box inside À propos */}
              {restaurant.chef && (
                <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200/70 flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="h-16 w-16 rounded-full overflow-hidden shrink-0 border-2 border-white shadow">
                    <img src={restaurant.chef.image} alt={restaurant.chef.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="text-sm font-bold text-[#0B1536]">{restaurant.chef.name}</h3>
                    <p className="text-xs text-slate-500">{restaurant.chef.subtitle}</p>
                    <p className="text-xs font-bold text-[#F97316]">{restaurant.chef.title}</p>
                  </div>
                </div>
              )}
            </div>

            {/* MENU SECTION */}
            <div className="space-y-4">
              {/* Menu Categories Pills Bar */}
              <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
                {menuCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveMenuTab(cat)}
                    className={`px-5 py-2 rounded-xl text-xs font-bold transition ${
                      activeMenuTab === cat
                        ? "bg-white text-[#0B1536] shadow-sm border border-slate-200"
                        : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Menu Items Grid (2 Columns) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredDishes.map((dish) => {
                  const count = preorderCount[dish.id] || 0;
                  return (
                    <div
                      key={dish.id}
                      className="rounded-3xl bg-white border border-slate-200/80 shadow-sm overflow-hidden flex flex-col justify-between"
                    >
                      {/* Image Container */}
                      <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                        <img
                          src={dish.image || "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"}
                          alt={dish.name}
                          className="w-full h-full object-cover"
                        />
                        {dish.badge && (
                          <div className="absolute top-3 left-3">
                            <span className="rounded-md bg-[#F97316] px-2.5 py-1 text-[10px] font-extrabold uppercase text-white shadow">
                              {dish.badge}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                        <div className="space-y-1.5">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="text-sm font-bold text-[#0B1536]">{dish.name}</h3>
                            <span className="text-xs font-extrabold text-[#0B1536] whitespace-nowrap">
                              {dish.price.toLocaleString("fr-FR")} FCFA
                            </span>
                          </div>

                          <p className="text-[11px] text-slate-500 leading-relaxed">
                            {dish.description}
                          </p>

                          {/* Meta Tags */}
                          <div className="flex flex-wrap items-center gap-2 pt-1 text-[10px] text-slate-400 font-semibold">
                            {dish.prepTime && <span>🕒 {dish.prepTime}</span>}
                            {dish.calories && <span>🔥 {dish.calories}</span>}
                            {dish.isVegetarian && (
                              <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
                                Végétarien
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Add to Pre-order Button */}
                        <button
                          onClick={() => handlePreorder(dish.id)}
                          className="w-full mt-2 flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-2 px-3 text-xs font-bold text-[#0B1536] hover:border-[#F97316] hover:text-[#F97316] transition shadow-sm"
                        >
                          <ShoppingCart className="h-3.5 w-3.5" />
                          <span>
                            {count > 0 ? `Ajouté (${count})` : "Ajouter à la précommande"}
                          </span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* AVIS DES CLIENTS SECTION */}
            <div className="rounded-3xl bg-white p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
              <h2 className="text-xl font-bold text-[#0B1536] font-display">
                Avis des clients
              </h2>

              <div className="flex flex-col sm:flex-row items-center gap-8 pt-2">
                {/* Left Rating Block */}
                <div className="text-center sm:text-left space-y-1 shrink-0 border-r-0 sm:border-r border-slate-200 sm:pr-8">
                  <span className="text-5xl font-extrabold text-[#0B1536]">4.9</span>
                  <div className="flex items-center justify-center sm:justify-start gap-1 text-amber-500 py-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="h-4 w-4 fill-[#F97316] text-[#F97316]" />
                    ))}
                  </div>
                  <span className="block text-xs text-slate-400 font-medium">
                    Basé sur {restaurant.reviewsCount || 1264} avis
                  </span>
                </div>

                {/* Rating Distribution Bars */}
                <div className="flex-1 w-full space-y-2 text-xs text-slate-600 font-medium">
                  <div className="flex items-center gap-3">
                    <span className="w-14 text-right">5 étoiles</span>
                    <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full bg-[#F97316] rounded-full w-[93%]" />
                    </div>
                    <span className="w-8">93%</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="w-14 text-right">4 étoiles</span>
                    <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full bg-[#F97316] rounded-full w-[6%]" />
                    </div>
                    <span className="w-8">6%</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="w-14 text-right">3 étoiles</span>
                    <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full bg-[#F97316] rounded-full w-[1%]" />
                    </div>
                    <span className="w-8">1%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* QUESTIONS FRÉQUENTES SECTION */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#0B1536] font-display">
                Questions fréquentes
              </h2>

              <div className="space-y-3">
                {[
                  {
                    q: "Y a-t-il un code vestimentaire ?",
                    a: "Une tenue chic décontractée est recommandée en soirée. Les tenues de plage ne sont pas admises dans les salons de restauration.",
                  },
                  {
                    q: "Proposez-vous des options sans gluten ?",
                    a: "Oui, notre chef propose plusieurs options végétariennes, végétaliennes et sans gluten préparées à la commande.",
                  },
                ].map((faq, i) => {
                  const isOpen = openFaq === i;
                  return (
                    <div key={i} className="rounded-2xl bg-white border border-slate-200 overflow-hidden">
                      <button
                        onClick={() => toggleFaq(i)}
                        className="w-full flex items-center justify-between p-4 text-left font-bold text-xs sm:text-sm text-[#0B1536] hover:bg-slate-50 transition"
                      >
                        <span>{faq.q}</span>
                        {isOpen ? (
                          <ChevronUp className="h-4 w-4 text-slate-400" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-slate-400" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN (STICKY SIDEBAR: RÉSERVER UNE TABLE) */}
          <div className="space-y-6">
            <div className="sticky top-24 rounded-3xl bg-white p-6 border border-slate-200 shadow-xl space-y-5">
              <h2 className="text-lg font-bold text-[#0B1536] font-display text-center sm:text-left">
                Réserver une table
              </h2>

              {resSuccess ? (
                <div className="py-6 text-center space-y-3 bg-green-50 rounded-2xl p-4 border border-green-200">
                  <CheckCircle2 className="h-10 w-10 text-green-600 mx-auto" />
                  <h3 className="text-sm font-bold text-slate-900">Réservation enregistrée !</h3>
                  <p className="text-xs text-slate-600">
                    Table pour <span className="font-bold">{resGuests} personnes</span> le <span className="font-bold">{resDate} à {resTimeSlot}</span>.
                  </p>
                  <button
                    onClick={() => setResSuccess(false)}
                    className="w-full mt-2 rounded-xl bg-[#0B1536] py-2 text-xs font-bold text-white hover:bg-slate-800 transition"
                  >
                    Nouvelle réservation
                  </button>
                </div>
              ) : (
                <form onSubmit={handleReservationSubmit} className="space-y-4">
                  {/* Occasion spéciale */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Occasion spéciale
                    </label>
                    <div className="relative">
                      <select
                        value={occasion}
                        onChange={(e) => setOccasion(e.target.value)}
                        className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-800 outline-none focus:border-[#F97316]"
                      >
                        <option value="Dîner Standard">Dîner Standard</option>
                        <option value="Anniversaire">Anniversaire</option>
                        <option value="Repas d'affaires">Repas d'affaires</option>
                        <option value="Romantique">Romantique</option>
                      </select>
                      <ChevronDown className="absolute right-3.5 top-3 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Date & Convives Row */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Date
                      </label>
                      <input
                        type="date"
                        value={resDate}
                        onChange={(e) => setResDate(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-800 outline-none focus:border-[#F97316]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Convives
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="20"
                        value={resGuests}
                        onChange={(e) => setResGuests(Number(e.target.value))}
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-800 outline-none focus:border-[#F97316]"
                        required
                      />
                    </div>
                  </div>

                  {/* Heure disponible slots */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">
                      Heures disponibles
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {["18:30", "19:00", "19:30", "20:00", "20:30", "21:00"].map((slot) => {
                        const isSelected = resTimeSlot === slot;
                        return (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setResTimeSlot(slot)}
                            className={`py-2 rounded-xl text-xs font-bold border transition ${
                              isSelected
                                ? "border-[#F97316] text-[#F97316] bg-orange-50/60 shadow-xs ring-1 ring-[#F97316]"
                                : "border-slate-200 text-slate-700 hover:border-slate-300"
                            }`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* BUTTON 1: Réserver maintenant */}
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-[#F97316] py-3.5 text-xs font-extrabold text-white shadow-md hover:bg-orange-600 transition active:scale-95"
                  >
                    Réserver maintenant
                  </button>

                  {/* BUTTON 2: Retour aux résultats */}
                  <button
                    type="button"
                    onClick={() => navigate("/restaurants")}
                    className="w-full rounded-xl bg-[#0B1536] py-3.5 text-xs font-extrabold text-white shadow hover:bg-slate-800 transition active:scale-95"
                  >
                    Retour aux résultats
                  </button>

                  <p className="text-[10px] text-center text-slate-400 font-medium">
                    Aucun frais de réservation. Annulation gratuite jusqu'à 2h avant.
                  </p>
                </form>
              )}
            </div>
          </div>
          <br /><br />

        </div>
      </div>

      {/* Quick Modal Trigger */}
      <RestaurantDetailModal
        restaurant={showAllPhotosModal ? restaurant : null}
        onClose={() => setShowAllPhotosModal(false)}
      />
    </div>
  );
}

