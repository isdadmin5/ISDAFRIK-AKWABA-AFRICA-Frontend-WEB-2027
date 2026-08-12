import { Link, NavLink } from "react-router-dom";
import { Car, Menu } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";

// Nous gérons l'en-tête du site web, qui inclut le logo, la navigation et le menu pour les appareils mobiles.
export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-asphalt-700 bg-asphalt-900/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link to="/vehicles" className="flex items-center gap-2 font-display text-lg font-bold text-sand-50">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500 text-asphalt-950">
            <Car className="h-5 w-5" />
          </span>
          AKWABA <span className="text-amber-500">AFRICA</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-sand-200 sm:flex">
          <NavLink
            to="/tourisme"
            className={({ isActive }) => clsx("hover:text-sand-50", isActive && "text-amber-400")}
          >
            Tourisme
          </NavLink>
          <NavLink
            to="/vehicles"
            end
            className={({ isActive }) => clsx("hover:text-sand-50", isActive && "text-amber-400")}
          >
            Catalogue
          </NavLink>
          <NavLink
            to="/vehicles/favorites"
            className={({ isActive }) => clsx("hover:text-sand-50", isActive && "text-amber-400")}
          >
            Mes réservations
          </NavLink>
        </nav>

        <button
          className="rounded-lg p-2 text-sand-200 hover:bg-asphalt-800 sm:hidden"
          aria-label="Ouvrir le menu"
          onClick={() => setOpen((o) => !o)}
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>
      {open && (
        <div className="border-t border-asphalt-700 px-4 py-3 sm:hidden">
          <Link to="/tourisme" className="block py-2 text-sm text-sand-200">
            Tourisme
          </Link>
          <Link to="/vehicles" className="block py-2 text-sm text-sand-200">
            Catalogue
          </Link>
          <Link to="/vehicles/favorites" className="block py-2 text-sm text-sand-200">
            Mes réservations
          </Link>
        </div>
      )}
    </header>
  );
}
