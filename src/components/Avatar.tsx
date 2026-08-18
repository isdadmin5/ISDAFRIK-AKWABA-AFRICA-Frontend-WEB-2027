// Composant Avatar — Photo → Initiales → Icône générique, avec support "groupe d'utilisateurs"
import { UserRound } from "lucide-react";

const SIZES = {
  sm: "w-8 h-8 text-xs",
  md: "w-12 h-12 text-base",
  lg: "w-16 h-16 text-lg",
};

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] || "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

export function Avatar({
  src,
  alt,
  name,
  size = "md",
}: {
  src?: string;
  alt?: string;
  name?: string;
  size?: "sm" | "md" | "lg";
}) {
  return (
    <div className={`rounded-full overflow-hidden ${SIZES[size]}`}>
      {src ? (
        <img
          src={src}
          alt={alt || name || "Avatar"}
          className="h-full w-full object-cover"
          onError={(e) => {
            // Repli si l'image ne charge pas : on la masque, le fallback
            // ci-dessous (rendu conditionnel côté parent) prend le relai.
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      ) : name ? (
        <div className="flex h-full w-full items-center justify-center bg-asphalt-700 font-display font-semibold text-sand-50">
          {getInitials(name)}
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-asphalt-700 text-sand-400">
          <UserRound className="h-1/2 w-1/2" />
        </div>
      )}
    </div>
  );
}

// Groupe d'utilisateurs — plusieurs avatars superposés, avec un "+N" si la
// liste dépasse `max`.
export function AvatarGroup({
  users,
  max = 3,
  size = "sm",
}: {
  users: { src?: string; name?: string }[];
  max?: number;
  size?: "sm" | "md" | "lg";
}) {
  const visible = users.slice(0, max);
  const remaining = users.length - visible.length;

  return (
    <div className="flex items-center">
      {visible.map((user, i) => (
        <div
          key={i}
          className="rounded-full ring-2 ring-asphalt-900"
          style={{ marginLeft: i === 0 ? 0 : "-0.75rem" }}
        >
          <Avatar src={user.src} name={user.name} size={size} />
        </div>
      ))}
      {remaining > 0 && (
        <div
          className={`flex items-center justify-center rounded-full bg-amber-500 font-display font-semibold text-asphalt-950 ring-2 ring-asphalt-900 ${SIZES[size]}`}
          style={{ marginLeft: "-0.75rem" }}
        >
          +{remaining}
        </div>
      )}
    </div>
  );
}