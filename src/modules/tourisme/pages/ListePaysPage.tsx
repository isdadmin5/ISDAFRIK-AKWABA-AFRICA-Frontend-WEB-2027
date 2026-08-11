import { useNavigate } from "react-router-dom";
import { pays } from "../data/pays";
import { CartePays } from "../components/CartePays";

export function ListePaysPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          Tourisme & Circuits touristiques
        </h1>
        <p className="text-gray-500 mb-10">
          Découvrez les pays, sites touristiques et fêtes traditionnelles d'Afrique de l'Ouest.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pays.map((p) => (
            <CartePays
              key={p.id}
              pays={p}
              onClick={(paysId) => navigate(`/tourisme/${paysId}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
