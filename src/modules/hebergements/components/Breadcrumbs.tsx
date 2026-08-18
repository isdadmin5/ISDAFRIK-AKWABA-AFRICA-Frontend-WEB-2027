import { Link } from "react-router-dom";

export function Breadcrumbs({ items }: { items: Array<{ label: string; to?: string }> }) {
  return (
    <nav className="text-[13px] text-slate-500" aria-label="Fil d'Ariane">
      {items.map((item, i) => (
        <span key={item.label}>
          {i > 0 && <span className="mx-1.5 text-slate-400">&gt;</span>}
          {item.to ? (
            <Link to={item.to} className="hover:text-brand-500">
              {item.label}
            </Link>
          ) : (
            <strong className="text-navy-900">{item.label}</strong>
          )}
        </span>
      ))}
    </nav>
  );
}
