import type { SiteTouristique } from "../data/sitesTouristiques";

interface CarteSiteProps {
  site: SiteTouristique;
}

export function CarteSite({ site }: CarteSiteProps) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-200 p-5 border border-gray-100">
      <div className="flex items-start justify-between mb-2">
        <h4 className="text-lg font-semibold text-gray-800">{site.nom}</h4>
        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full whitespace-nowrap ml-2">
          {site.categorie}
        </span>
      </div>
      <p className="text-sm text-gray-500 mb-3">
        {site.ville} — {site.region}
      </p>
      {site.fete && (
        <p className="text-sm text-gray-600 mb-2">
          <span className="font-medium text-gray-700">Fête locale : </span>
          {site.fete}
        </p>
      )}
      {site.gastronomie && (
        <p className="text-sm text-gray-600">
          <span className="font-medium text-gray-700">Gastronomie : </span>
          {site.gastronomie}
        </p>
      )}
    </div>
  );
}
