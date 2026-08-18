import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";
import logo from "@/assets/logo-akwaba-africa.png";
import { FigmaIcon } from "@/modules/billetterie/components/FigmaIcon";

const NAV = [
  { label: "Accueil", to: "/" },
  { label: "Hébergements", to: "/hebergements" },
  { label: "Restaurants", to: "/restaurants" },
  { label: "Billets", to: "/billetterie" },
  { label: "Location de Voitures", to: "/vehicules" },
  { label: "Tourisme", to: "/tourisme" },
  { label: "Circuits Touristiques", to: "/circuits" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#0d1b3d] text-white shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/hebergements" className="flex shrink-0 items-center" aria-label="Akwaba Africa">
          <span className="flex h-11 items-center rounded-xl bg-white px-2 py-1">
            <img src={logo} alt="Akwaba Africa" className="h-9 w-auto object-contain" />
          </span>
        </Link>

        <nav className="hidden items-center gap-5 text-[13px] font-medium xl:flex">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                clsx(
                  "whitespace-nowrap transition hover:text-[#FF5C00]",
                  isActive ? "font-semibold text-[#FF5C00]" : "text-white/90"
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 text-sm text-white/90 hover:text-white"
          >
            <FigmaIcon name="globe" size={16} />
            FR
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1 text-sm text-white/90 hover:text-white"
          >
            TOGO
            <FigmaIcon name="chevronTogo" size={12} />
          </button>
          <button
            type="button"
            className="rounded-2xl bg-[#ff5c00] px-6 py-2 text-sm font-medium text-[#0d1b3d] transition hover:bg-[#e65200]"
          >
            Connexion
          </button>
        </div>

        <button
          className="rounded-lg p-2 text-white hover:bg-white/10 xl:hidden"
          aria-label="Ouvrir le menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-[#0d1b3d] px-4 py-4 xl:hidden">
          <div className="flex flex-col gap-3">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  clsx("text-sm", isActive ? "font-semibold text-[#FF5C00]" : "text-white/90")
                }
              >
                {item.label}
              </NavLink>
            ))}
            <div className="mt-2 flex items-center gap-3 border-t border-white/10 pt-3">
              <span className="text-sm text-white/80">FR · TOGO</span>
              <button
                type="button"
                className="rounded-2xl bg-[#ff5c00] px-6 py-2 text-sm font-medium text-[#0d1b3d]"
              >
                Connexion
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
