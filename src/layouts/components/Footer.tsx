import { Link } from "react-router-dom";
import logo from "@/assets/logo-akwaba-africa.png";
import { FigmaIcon } from "@/modules/billetterie/components/FigmaIcon";

const NAV_LINKS = [
  { label: "Accueil", to: "/" },
  { label: "Hébergements", to: "/hebergements" },
  { label: "Restaurants", to: "/restaurants" },
  { label: "Billets", to: "/billetterie" },
  { label: "Location de voiture", to: "/vehicules" },
  { label: "Tourisme", to: "/tourisme" },
  { label: "Circuits Touristiques", to: "/circuits" },
];

const INFO_LINKS = [
  { label: "À propos de nous", to: "#" },
  { label: "Contact", to: "#" },
  { label: "Aide &FAQ", to: "#" },
  { label: "Confidentialité", to: "#" },
  { label: "Conditions d'utilisation", to: "#" },
];

export function Footer() {
  return (
    <footer className="bg-[#0d1b3d] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <Link to="/hebergements" className="inline-flex rounded-xl bg-white px-2 py-1">
            <img src={logo} alt="Akwaba Africa" className="h-12 w-auto object-contain" />
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-white/60">
            Le leader du voyage premium en Afrique de l&apos;Ouest. Nous créons des ponts entre les
            cultures.
          </p>
          <a
            href="#"
            className="mt-4 inline-flex size-10 items-center justify-center rounded-full border border-white/20 hover:bg-white/5"
            aria-label="Site web"
          >
            <FigmaIcon name="footerSocial" size={20} />
          </a>
        </div>

        <div>
          <h3 className="text-xl font-semibold">Navigation</h3>
          <ul className="mt-4 space-y-2.5 text-base text-white/70">
            {NAV_LINKS.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="hover:text-[#ff5c00]">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold">Informations</h3>
          <ul className="mt-4 space-y-2.5 text-base text-white/70">
            {INFO_LINKS.map((l) => (
              <li key={l.label}>
                <a href={l.to} className="hover:text-[#ff5c00]">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold">Contact</h3>
          <ul className="mt-4 space-y-3 text-base text-white/70">
            <li className="flex items-start gap-3">
              <FigmaIcon name="contactPin" size={16} className="mt-1" />
              123 Rue de la Plage, Lomé, Togo
            </li>
            <li className="flex items-center gap-3">
              <FigmaIcon name="contactPhone" size={18} />
              +228 90 00 00 00
            </li>
            <li className="flex items-center gap-3">
              <FigmaIcon name="contactMail" size={18} />
              contact@akwabaafrica.com
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-white/40 sm:flex-row sm:px-6 lg:px-8">
          <p>© 2026 AKWABA AFRICA. Tous droits réservés.</p>
          <p>Voyagez avec style. Explorez avec passion.</p>
        </div>
      </div>
    </footer>
  );
}
