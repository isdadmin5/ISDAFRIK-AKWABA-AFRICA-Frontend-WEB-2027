import { useState } from "react";
import { Search } from "lucide-react";

// Nous gérons ici la barre de recherche pour filtrer les véhicules
// Implémentation simplifiée, conforme au contrat de props d'un futur composant barre de recherche graphique (mêmes noms de champs).
export function SearchBar({
  placeholder = "Ville, aéroport, agence…",
  onSearch,
}: {
  placeholder?: string;
  onSearch: (query: string) => void;
}) {
  const [value, setValue] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSearch(value);
      }}
      className="flex items-center gap-2 rounded-xl border border-asphalt-600 bg-asphalt-900 px-4 py-3 focus-within:ring-2 focus-within:ring-amber-500/60"
      role="search"
    >
      <Search className="h-4 w-4 shrink-0 text-sand-400" aria-hidden />
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm text-sand-50 placeholder:text-sand-400/70 focus:outline-none"
        aria-label="Rechercher un véhicule"
      />
    </form>
  );
}
