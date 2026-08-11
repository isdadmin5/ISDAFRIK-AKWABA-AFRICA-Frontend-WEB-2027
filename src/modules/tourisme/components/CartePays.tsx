import type { Pays } from "../data/pays";

interface CartePaysProps {
  pays: Pays;
  onClick?: (paysId: string) => void;
}

export function CartePays({ pays, onClick }: CartePaysProps) {
  return (
    <div
      onClick={() => onClick?.(pays.id)}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-200 p-6 cursor-pointer border border-gray-100"
    >
      <h3 className="text-xl font-bold text-green-700 mb-1">{pays.nom}</h3>
      <p className="text-sm text-gray-500 mb-3">Capitale : {pays.capitale}</p>
      <p className="text-gray-600 text-sm line-clamp-3">
        {pays.presentation}
      </p>
      <span className="inline-block mt-4 text-green-700 text-sm font-medium">
        Découvrir →
      </span>
    </div>
  );
}
