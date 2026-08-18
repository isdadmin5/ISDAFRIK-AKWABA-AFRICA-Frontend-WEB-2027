import { Link, NavLink } from "react-router-dom";
import { Globe, ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";

const navLinks = [
  { label: "Accueil", to: "/" },
  { label: "Hébergements", to: "/hebergements" },
  { label: "Restaurants", to: "/restaurants" },
  { label: "Billets", to: "/billets" },
  { label: "Location de Voitures", to: "/location-de-voitures" },
  { label: "Tourisme", to: "/tourisme" },
  { label: "Circuits Touristiques", to: "/circuits-touristiques" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState("TOGO");

  return (
    <header className="sticky top-0 z-50 bg-[#0B1536] text-white border-b border-white/10 shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo (White rounded card with map outline) */}
        <Link to="/restaurants" className="flex items-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white p-2 shadow shrink-0">
            <svg viewBox="0 0 100 100" className="h-full w-full text-[#0B1536]" fill="none" stroke="currentColor" strokeWidth="6">
              {/* Stylized Africa Map */}
              <path d="M45,15 C58,15 72,25 72,40 C72,55 58,75 48,85 C38,75 32,60 35,45 C38,30 40,15 45,15 Z" fill="#0B1536" />
              <path d="M48,30 L55,42 L42,48 L58,62" stroke="#F97316" strokeWidth="4" />
            </svg>
          </div>
        </Link>

        {/* Navigation Links (Desktop/Laptop) */}
        <nav className="hidden items-center gap-3.5 lg:gap-5 text-xs font-semibold text-slate-200 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                clsx(
                  "transition-colors duration-200 text-xs tracking-wide whitespace-nowrap",
                  link.to === "/restaurants" || isActive
                    ? "text-[#F97316] font-bold"
                    : "text-slate-200 hover:text-white"
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="hidden items-center gap-3 lg:flex shrink-0">
          {/* Language Selector (Globe + FR) */}
          <div className="flex items-center gap-1 text-xs text-white cursor-pointer hover:text-slate-200 transition">
            <Globe className="h-4 w-4 text-white" />
            <span className="font-semibold text-xs">FR</span>
          </div>

          {/* Country Selector Dropdown (TOGO v) */}
          <div className="relative flex items-center gap-1 rounded-xl bg-slate-700/50 px-2.5 py-1.5 text-xs text-white border border-white/10 cursor-pointer hover:bg-slate-700/70 transition">
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="bg-transparent text-xs font-semibold text-white outline-none cursor-pointer pr-1 uppercase"
            >
              <option value="TOGO" className="bg-[#0B1536] text-white">TOGO</option>
              <option value="BENIN" className="bg-[#0B1536] text-white">BENIN</option>
              <option value="SENEGAL" className="bg-[#0B1536] text-white">SENEGAL</option>
              <option value="CÔTE D'IVOIRE" className="bg-[#0B1536] text-white">CÔTE D'IVOIRE</option>
              <option value="NIGER" className="bg-[#0B1536] text-white">NIGER</option>
            </select>
            <ChevronDown className="h-3.5 w-3.5 text-slate-300 pointer-events-none" />
          </div>

          {/* Mes Réservations Link */}
          <Link
            to="/restaurants/reservations"
            className="rounded-full bg-white/10 px-4 py-2 text-xs font-bold text-white transition hover:bg-white/20 whitespace-nowrap"
          >
            Mes réservations
          </Link>

          {/* Connexion Button */}
          <Link
            to="/connexion"
            className="rounded-full bg-[#F97316] px-5 py-2 text-xs font-bold text-white shadow transition hover:bg-orange-600 active:scale-95 whitespace-nowrap"
          >
            Connexion
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="rounded-lg p-2 text-slate-200 hover:bg-white/10 lg:hidden"
          aria-label="Ouvrir le menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="border-t border-white/10 bg-[#0B1536] px-4 py-4 lg:hidden space-y-3 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={clsx(
                  "rounded-lg px-3 py-2.5 text-sm font-medium transition",
                  link.to === "/restaurants"
                    ? "text-[#F97316] font-bold"
                    : "text-slate-200 hover:bg-white/5 hover:text-white"
                )}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-white/10">
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <Globe className="h-4 w-4" />
              <span>FR</span>
              <span>• {country}</span>
            </div>
            <Link
              to="/connexion"
              className="rounded-full bg-[#F97316] px-5 py-1.5 text-xs font-bold text-white"
              onClick={() => setOpen(false)}
            >
              Connexion
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

