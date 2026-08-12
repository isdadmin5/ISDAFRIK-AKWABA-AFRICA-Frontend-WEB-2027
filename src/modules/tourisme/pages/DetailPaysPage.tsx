import { useParams, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { pays } from "../data/pays";
import { sitesTouristiques } from "../data/sitesTouristiques";
import { CarteSite } from "../components/CarteSite";

export function DetailPaysPage() {
  const { paysId } = useParams<{ paysId: string }>();
  const navigate = useNavigate();
  const [recherche, setRecherche] = useState("");
  const [categorieActive, setCategorieActive] = useState<string>("Toutes");

  const paysActuel = pays.find((p) => p.id === paysId);
  const sitesDuPays = sitesTouristiques.filter((s) => s.paysId === paysId);

  const categories = useMemo(() => {
    const set = new Set<string>();
    sitesDuPays.forEach((s) => {
      s.categorie.split(",").forEach((c) => set.add(c.trim()));
    });
    return ["Toutes", ...Array.from(set).sort()];
  }, [sitesDuPays]);

  const sitesFiltres = useMemo(() => {
    return sitesDuPays.filter((s) => {
      const correspondCategorie =
        categorieActive === "Toutes" ||
        s.categorie.split(",").map((c) => c.trim()).includes(categorieActive);

      const texte = recherche.trim().toLowerCase();
      const correspondRecherche =
        texte === "" ||
        s.nom.toLowerCase().includes(texte) ||
        s.ville.toLowerCase().includes(texte) ||
        s.region.toLowerCase().includes(texte);

      return correspondCategorie && correspondRecherche;
    });
  }, [sitesDuPays, categorieActive, recherche]);

  if (!paysActuel) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">Pays introuvable.</p>
          <button
            onClick={() => navigate("/tourisme")}
            className="text-green-700 font-medium"
          >
            ← Retour à la liste des pays
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <button
          onClick={() => navigate("/tourisme")}
          className="text-green-700 font-medium mb-6"
        >
          ← Retour à la liste des pays
        </button>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-1">
          {paysActuel.nom}
        </h1>
        <p className="text-gray-500 mb-8">Capitale : {paysActuel.capitale}</p>

        <div className="bg-white rounded-xl shadow-md p-6 mb-6 space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-green-700 mb-1">Présentation</h2>
            <p className="text-gray-600">{paysActuel.presentation}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-green-700 mb-1">Culture</h2>
            <p className="text-gray-600">{paysActuel.culture}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-green-700 mb-1">Religion et traditions</h2>
            <p className="text-gray-600">{paysActuel.religion}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-green-700 mb-1">Langues parlées</h2>
            <p className="text-gray-600 whitespace-pre-line">{paysActuel.langues}</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Sites touristiques ({sitesFiltres.length}/{sitesDuPays.length})
        </h2>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
            placeholder="Rechercher un site, une ville, une région..."
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          <select
            value={categorieActive}
            onChange={(e) => setCategorieActive(e.target.value)}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 bg-white"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {sitesFiltres.length === 0 ? (
          <p className="text-gray-500 italic">
            Aucun site ne correspond à ta recherche.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {sitesFiltres.map((site) => (
              <CarteSite key={site.id} site={site} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
