// Nous gérons ici la galerie d'images réutilisable pour l'application
import { useState } from "react";
import clsx from "clsx";

// Composant de galerie d'images avec sélection d'image active
export function Gallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);
  if (!images.length) return null;
  return (
    <div>
      <div className="aspect-[16/9] w-full overflow-hidden rounded-2xl bg-asphalt-800">
        <img src={images[active]} alt={`${alt} — photo ${active + 1}`} className="h-full w-full object-cover" />
      </div>
      {images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto">
          {images.map((src, i) => (
            <button
              key={src + i}
              onClick={() => setActive(i)}
              className={clsx(
                "h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2",
                i === active ? "border-amber-500" : "border-transparent opacity-70 hover:opacity-100"
              )}
              aria-label={`Voir la photo ${i + 1}`}
            >
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
