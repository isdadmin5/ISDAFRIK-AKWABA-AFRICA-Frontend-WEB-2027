import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Star, MapPin, Clock, Users, Calendar, CheckCircle2, ShieldCheck, Heart, ExternalLink } from "lucide-react";
import type { Restaurant } from "./restaurant.types";

interface RestaurantDetailModalProps {
  restaurant: Restaurant | null;
  onClose: () => void;
}

export function RestaurantDetailModal({ restaurant, onClose }: RestaurantDetailModalProps) {
  const navigate = useNavigate();
  const [date, setDate] = useState("2026-08-15");
  const [time, setTime] = useState("19:30");
  const [guests, setGuests] = useState(2);
  const [specialRequest, setSpecialRequest] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  if (!restaurant) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl transition-all border border-slate-100 max-h-[90vh] flex flex-col">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition"
          aria-label="Fermer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Banner */}
        <div className="relative h-60 w-full overflow-hidden shrink-0">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow transition hover:scale-105"
          >
            <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-slate-600"}`} />
          </button>

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <div className="flex items-center gap-2 mb-1">
              <span className="rounded-full bg-[#F97316] px-3 py-0.5 text-xs font-semibold text-white">
                {restaurant.category}
              </span>
              <span className="flex items-center gap-1 rounded-full bg-black/50 px-2.5 py-0.5 text-xs font-semibold text-amber-300 backdrop-blur-sm">
                <Star className="h-3.5 w-3.5 fill-amber-300 text-amber-300" />
                {restaurant.rating.toFixed(1)} ({restaurant.reviewsCount || 100} avis)
              </span>
            </div>
            <h2 className="text-2xl font-bold font-display">{restaurant.name}</h2>
            <p className="flex items-center gap-1 text-xs text-slate-200 mt-1">
              <MapPin className="h-3.5 w-3.5 text-[#F97316]" />
              {restaurant.location}
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 space-y-6">
          {isSubmitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 font-display">Réservation confirmée !</h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Votre table au restaurant <span className="font-semibold text-slate-900">{restaurant.name}</span> a bien été enregistrée pour <span className="font-semibold">{guests} personnes</span> le <span className="font-semibold">{date} à {time}</span>.
              </p>
              <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200 max-w-md mx-auto text-left text-xs text-slate-600 space-y-1">
                <p><span className="font-semibold">Lieu:</span> {restaurant.location}</p>
                <p><span className="font-semibold">Tarif estimé:</span> {restaurant.price}</p>
                <p><span className="font-semibold">Statut:</span> Confirmation immédiate transmise par SMS/Email</p>
              </div>
              <button
                onClick={onClose}
                className="mt-4 rounded-xl bg-[#F97316] px-6 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 transition"
              >
                Fermer
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">À propos</h3>
                <button
                  onClick={() => {
                    onClose();
                    navigate(`/restaurants/${restaurant.id}`);
                  }}
                  className="flex items-center gap-1 text-xs font-bold text-[#F97316] hover:underline"
                >
                  <span>Voir la fiche complète</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </button>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed mt-2">{restaurant.description}</p>

              <div className="flex flex-wrap gap-2">
                {restaurant.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600 font-medium">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4 pt-2 border-t border-slate-100">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Réserver une table</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-[#F97316]" /> Date
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-800 focus:border-[#F97316] outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-[#F97316]" /> Heure
                    </label>
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-800 focus:border-[#F97316] outline-none bg-white"
                    >
                      {["12:00", "12:30", "13:00", "19:00", "19:30", "20:00", "20:30", "21:00"].map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                      <Users className="h-3.5 w-3.5 text-[#F97316]" /> Personnes
                    </label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-800 focus:border-[#F97316] outline-none bg-white"
                    >
                      {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                        <option key={num} value={num}>{num} personne{num > 1 ? "s" : ""}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Demandes particulières (optionnel)
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Table en terrasse, anniversaire, allergie..."
                    value={specialRequest}
                    onChange={(e) => setSpecialRequest(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-800 focus:border-[#F97316] outline-none"
                  />
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <div>
                    <span className="block text-xs text-slate-400">Prix indicatif</span>
                    <span className="text-base font-bold text-[#0B1536]">{restaurant.price}</span>
                  </div>
                  <button
                    type="submit"
                    className="flex items-center gap-2 rounded-xl bg-[#F97316] px-6 py-3 text-sm font-semibold text-white shadow hover:bg-orange-600 transition active:scale-95"
                  >
                    <ShieldCheck className="h-4 w-4" />
                    <span>Confirmer la réservation</span>
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
