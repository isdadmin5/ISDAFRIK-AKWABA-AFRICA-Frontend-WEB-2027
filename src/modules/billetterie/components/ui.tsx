import { Link } from "react-router-dom";
import clsx from "clsx";

export function Breadcrumbs({ items }: { items: Array<{ label: string; to?: string }> }) {
  return (
    <nav className="mb-4 text-sm text-[#0d1b3d]" aria-label="Fil d Ariane">
      {items.map((item, i) => (
        <span key={`${item.label}-${i}`}>
          {i > 0 && <span className="mx-1.5 text-slate-400">&gt;</span>}
          {item.to ? (
            <Link to={item.to} className="hover:text-[#ff5c00]">
              {item.label}
            </Link>
          ) : (
            <span className={clsx(i === items.length - 1 && "font-semibold")}>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

export function HelpWidget() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-[#f3f4f6] p-4">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-50 text-[#ff5c00]">
          <span className="text-lg" aria-hidden>
            ☎
          </span>
        </div>
        <div>
          <p className="font-semibold text-[#0d1b3d]">Besoin d&apos;aide ?</p>
          <p className="mt-1 text-sm text-slate-500">Support 24/7 au +228 90 00 00 00</p>
        </div>
      </div>
    </div>
  );
}

export const btnOrange =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-[#ff5c00] px-5 py-3 font-semibold text-white transition hover:bg-[#e65200] disabled:opacity-40";

export const btnNavy =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-[#0d1b3d] px-5 py-3 font-semibold text-white transition hover:bg-[#152a55]";

export const btnOutline =
  "inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-[#0d1b3d] transition hover:bg-slate-50";

export const field =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-[#0d1b3d] placeholder:text-slate-400 focus:border-[#ff5c00] focus:outline-none focus:ring-2 focus:ring-orange-100";

export const label = "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500";
