// Nous gérons ici le composant de carte réutilisable pour l'application
import { HTMLAttributes } from "react";
import clsx from "clsx";

// Composant de carte pour afficher du contenu dans une enveloppe stylisée
export function Card({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        "rounded-2xl bg-asphalt-800 border border-asphalt-700 shadow-lg shadow-black/20",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
