import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Nous gérons ici la pagination pour naviguer entre les pages de résultats
// Implémentation simplifiée, conforme au contrat de props d'un futur composant pagination graphique (mêmes noms de champs).
export function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;
  return (
    <nav className="flex items-center justify-center gap-1.5" aria-label="Pagination">
      <button
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        className="rounded-lg p-2 text-sand-300 hover:bg-asphalt-800 disabled:opacity-30"
        aria-label="Page précédente"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          aria-current={p === page ? "page" : undefined}
          className={clsx(
            "h-9 w-9 rounded-lg text-sm font-medium",
            p === page ? "bg-amber-500 text-asphalt-950" : "text-sand-300 hover:bg-asphalt-800"
          )}
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => onChange(page + 1)}
        disabled={page >= totalPages}
        className="rounded-lg p-2 text-sand-300 hover:bg-asphalt-800 disabled:opacity-30"
        aria-label="Page suivante"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
}
