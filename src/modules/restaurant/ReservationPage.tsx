import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Calendar,
  Clock,
  Users,
  MapPin,
  CheckCircle2,
  AlertCircle,
  XCircle,
  ChevronRight,
  ArrowLeft,
  QrCode,
  Phone,
  Search,
  Sparkles,
  Utensils,
} from "lucide-react";
import { restaurants } from "./restaurant.data";

interface ReservationItem {
  id: string;
  restaurantId: string;
  restaurantName: string;
  restaurantImage: string;
  location: string;
  date: string;
  time: string;
  guests: number;
  specialRequest?: string;
  status: "confirmée" | "en attente" | "passée" | "annulée";
  confirmationCode: string;
  price: string;
}

const mockReservations: ReservationItem[] = [
  {
    id: "res-101",
    restaurantId: "le-phenicien",
    restaurantName: "Le Phénicien",
    restaurantImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    location: "Kodjoviakopé, Lomé, Togo",
    date: "15 Août 2026",
    time: "19:30",
    guests: 2,
    specialRequest: "Table près de la terrasse extérieure si possible.",
    status: "confirmée",
    confirmationCode: "AKW-7892-TG",
    price: "17 000 FCFA / pers",
  },
  {
    id: "res-102",
    restaurantId: "la-cabane-du-pecheur",
    restaurantName: "La Cabane du Pêcheur",
    restaurantImage: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
    location: "Almadies, Dakar, Sénégal",
    date: "20 Août 2026",
    time: "20:00",
    guests: 4,
    specialRequest: "Menu fruits de mer pour 4 personnes.",
    status: "en attente",
    confirmationCode: "AKW-4412-SN",
    price: "25 000 FCFA / pers",
  },
  {
    id: "res-103",
    restaurantId: "saakan",
    restaurantName: "Saakan",
    restaurantImage: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
    location: "Le Plateau, Abidjan, Côte d'Ivoire",
    date: "02 Juillet 2026",
    time: "13:00",
    guests: 3,
    status: "passée",
    confirmationCode: "AKW-1109-CI",
    price: "35 000 FCFA / pers",
  },
];

export function ReservationPage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<"toutes" | "à venir" | "passées">("à venir");
  const [reservations, setReservations] = useState<ReservationItem[]>(mockReservations);
  const [selectedRes, setSelectedRes] = useState<ReservationItem | null>(null);

  const handleCancel = (id: string) => {
    setReservations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "annulée" as const } : r))
    );
    setSelectedRes(null);
  };

  const filteredReservations = reservations.filter((r) => {
    if (filter === "à venir") return r.status === "confirmée" || r.status === "en attente";
    if (filter === "passées") return r.status === "passée" || r.status === "annulée";
    return true;
  });

  return (
    <div className="bg-[#F8FAFC] min-h-screen text-slate-900 font-body pb-24">
      {/* Top Banner Header */}
      <div className="bg-[#0B1536] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="mx-auto max-w-7xl">
          <button
            onClick={() => navigate("/restaurants")}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white mb-4 transition"
          >
            <ArrowLeft className="h-4 w-4 text-[#F97316]" />
            <span>Retour à l'exploration</span>
          </button>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="uppercase text-xs font-extrabold text-[#F97316] tracking-wider">
                Espace Gastronomie
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-white mt-1">
                Mes Réservations de Tables
              </h1>
              <p className="mt-2 text-sm text-slate-300 max-w-2xl">
                Gérez vos tables réservées, consultez vos codes de confirmation et préparez vos sorties gastronomiques.
              </p>
            </div>

            <Link
              to="/restaurants"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#F97316] px-5 py-3 text-xs font-bold text-white shadow-md hover:bg-orange-600 transition"
            >
              <Utensils className="h-4 w-4" />
              <span>Réserver une autre table</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        {/* Filter Pills */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-4 mb-8">
          {[
            { id: "à venir", label: "À venir & En attente" },
            { id: "passées", label: "Historique & Annulées" },
            { id: "toutes", label: "Toutes les réservations" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                filter === tab.id
                  ? "bg-[#0B1536] text-white shadow-sm"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* List of Reservations */}
        {filteredReservations.length === 0 ? (
          <div className="rounded-3xl bg-white p-12 text-center border border-slate-200 shadow-sm max-w-xl mx-auto space-y-4">
            <Calendar className="mx-auto h-12 w-12 text-slate-300" />
            <h3 className="text-lg font-bold text-[#0B1536]">Aucune réservation dans cette catégorie</h3>
            <p className="text-xs text-slate-500">
              Découvrez les meilleurs restaurants partenaires et réservez votre table en quelques clics.
            </p>
            <Link
              to="/restaurants"
              className="inline-block rounded-xl bg-[#F97316] px-6 py-2.5 text-xs font-bold text-white shadow hover:bg-orange-600 transition"
            >
              Explorer les restaurants
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReservations.map((res) => {
              const isConfirmed = res.status === "confirmée";
              const isPending = res.status === "en attente";
              const isCancelled = res.status === "annulée";

              return (
                <div
                  key={res.id}
                  className="rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition overflow-hidden flex flex-col justify-between"
                >
                  {/* Card Header Image & Status */}
                  <div className="relative h-44 w-full overflow-hidden">
                    <img
                      src={res.restaurantImage}
                      alt={res.restaurantName}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Status Badge */}
                    <div className="absolute top-3 right-3">
                      {isConfirmed && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/90 text-white px-3 py-1 text-[11px] font-bold shadow backdrop-blur-sm">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Confirmée
                        </span>
                      )}
                      {isPending && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/90 text-white px-3 py-1 text-[11px] font-bold shadow backdrop-blur-sm">
                          <AlertCircle className="h-3.5 w-3.5" />
                          En attente
                        </span>
                      )}
                      {(isCancelled || res.status === "passée") && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-600/90 text-white px-3 py-1 text-[11px] font-bold shadow backdrop-blur-sm">
                          {isCancelled ? <XCircle className="h-3.5 w-3.5" /> : null}
                          {isCancelled ? "Annulée" : "Passée"}
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <h3 className="text-lg font-bold font-display">{res.restaurantName}</h3>
                      <p className="flex items-center gap-1 text-xs text-slate-200">
                        <MapPin className="h-3.5 w-3.5 text-[#F97316]" />
                        <span className="truncate">{res.location}</span>
                      </p>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2.5">
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                          <Calendar className="h-4 w-4 text-[#F97316]" />
                          <div>
                            <span className="block text-[10px] text-slate-400 font-bold uppercase">Date</span>
                            <span className="font-semibold text-[#0B1536]">{res.date}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                          <Clock className="h-4 w-4 text-[#F97316]" />
                          <div>
                            <span className="block text-[10px] text-slate-400 font-bold uppercase">Heure</span>
                            <span className="font-semibold text-[#0B1536]">{res.time}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-[#F97316]" />
                          <span className="font-semibold text-[#0B1536]">
                            {res.guests} personne{res.guests > 1 ? "s" : ""}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-500 font-bold">{res.price}</span>
                      </div>

                      {res.specialRequest && (
                        <p className="text-xs text-slate-500 italic bg-amber-50/50 p-2.5 rounded-xl border border-amber-100/60">
                          "{res.specialRequest}"
                        </p>
                      )}

                      {/* Code Badge */}
                      <div className="flex items-center justify-between p-3 rounded-2xl bg-[#0B1536] text-white">
                        <div>
                          <span className="block text-[10px] text-slate-400 uppercase font-bold">Code Réservation</span>
                          <span className="text-sm font-mono font-bold tracking-wider text-[#F97316]">{res.confirmationCode}</span>
                        </div>
                        <QrCode className="h-6 w-6 text-slate-300" />
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <Link
                        to={`/restaurants/${res.restaurantId}`}
                        className="flex-1 py-2 text-center rounded-xl bg-slate-100 text-xs font-bold text-slate-700 hover:bg-slate-200 transition"
                      >
                        Voir le resto
                      </Link>

                      {(isConfirmed || isPending) && (
                        <button
                          onClick={() => setSelectedRes(res)}
                          className="px-4 py-2 rounded-xl bg-red-50 text-xs font-bold text-red-600 hover:bg-red-100 transition"
                        >
                          Annuler
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Cancellation Confirmation Modal */}
        {selectedRes && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl space-y-4 text-center border border-slate-100">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600">
                <AlertCircle className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold text-[#0B1536] font-display">Annuler cette réservation ?</h3>
              <p className="text-xs text-slate-600">
                Voulez-vous vraiment annuler la réservation pour <span className="font-bold">{selectedRes.guests} personnes</span> au restaurant <span className="font-bold">{selectedRes.restaurantName}</span> le <span className="font-bold">{selectedRes.date} à {selectedRes.time}</span> ?
              </p>
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setSelectedRes(null)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
                >
                  Non, conserver
                </button>
                <button
                  onClick={() => handleCancel(selectedRes.id)}
                  className="flex-1 py-2.5 rounded-xl bg-red-600 text-xs font-bold text-white shadow hover:bg-red-700 transition"
                >
                  Oui, annuler
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

