import clsx from "clsx";

// Nous gérons ici les badges pour afficher des statuts de disponibilité, types de véhicules…
export function Badge({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "success" | "warning" | "danger";
}) {
  return (
    <span
      className={clsx("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium", {
        "bg-asphalt-700 text-sand-200": tone === "neutral",
        "bg-route-500/15 text-route-400": tone === "success",
        "bg-amber-500/15 text-amber-400": tone === "warning",
        "bg-danger/15 text-danger": tone === "danger",
      })}
    >
      {children}
    </span>
  );
}
