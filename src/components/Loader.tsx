// Nous gérons ici l'affichage d'un loader avec un label

import { Loader2 } from "lucide-react";

export function Loader({ label = "Chargement…" }: { label?: string }) {
  return (
    <div role="status" className="flex flex-col items-center justify-center gap-3 py-16 text-sand-400">
      <Loader2 className="h-8 w-8 animate-spin text-amber-500" aria-hidden />
      <span className="text-sm">{label}</span>
    </div>
  );
}
