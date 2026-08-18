import { Link } from "react-router-dom";
import { FIGMA } from "@/modules/hebergements/assets";

export function Footer() {
  return (
    <footer className="bg-navy-900 text-white">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:px-20">
        <div className="flex flex-col gap-6">
          <img src={FIGMA.logo} alt="AKWABA AFRICA" className="size-[62px] rounded-[10px] object-cover" />
          <p className="text-[16px] leading-[26px] text-white/60">
            Le leader du voyage premium en Afrique de l&apos;Ouest. Nous créons des ponts entre les cultures.
          </p>
          <a
            href="#"
            className="flex size-10 items-center justify-center rounded-full border border-white/20"
            aria-label="Site web"
          >
            <img src={FIGMA.iconSocial} alt="" className="size-5" />
          </a>
        </div>

        <div>
          <h3 className="text-[20px] font-semibold">Navigation</h3>
          <ul className="mt-6 space-y-1 text-[16px] leading-6 text-white/70">
            <li><Link to="/hebergements">Accueil</Link></li>
            <li><Link to="/hebergements">Hébergements</Link></li>
            <li>Restaurants</li>
            <li>Billets</li>
            <li>Location de voiture</li>
            <li>Tourisme</li>
            <li>Circuits Touristiques</li>
          </ul>
        </div>

        <div>
          <h3 className="text-[20px] font-semibold">Informations</h3>
          <ul className="mt-6 space-y-1 text-[16px] leading-6 text-white/70">
            <li>À propos de nous</li>
            <li>Contact</li>
            <li>Aide &amp; FAQ</li>
            <li>Confidentialité</li>
            <li>Conditions d&apos;utilisation</li>
          </ul>
        </div>

        <div>
          <h3 className="text-[20px] font-semibold">Contact</h3>
          <ul className="mt-6 space-y-3 text-[16px] leading-6 text-white/70">
            <li className="flex items-start gap-3">
              <img src={FIGMA.iconAddr} alt="" className="mt-0.5 h-5 w-3.5" />
              123 Rue de la Plage, Lomé, Togo
            </li>
            <li className="flex items-center gap-3">
              <img src={FIGMA.iconPhone} alt="" className="size-[18px]" />
              +228 90 00 00 00
            </li>
            <li className="flex items-center gap-3">
              <img src={FIGMA.iconMail} alt="" className="h-4 w-5" />
              contact@akwabaafrica.com
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1280px] flex-col gap-2 border-t border-white/10 px-6 py-8 text-[12px] text-white/40 sm:flex-row sm:justify-between lg:px-20">
        <p>© 2026 AKWABA AFRICA. Tous droits réservés.</p>
        <p>Voyagez avec style. Explorez avec passion.</p>
      </div>
    </footer>
  );
}
