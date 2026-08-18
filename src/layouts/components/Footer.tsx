import { MapPin, Phone, Mail, Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0B1536] text-slate-300 border-t border-white/10 font-body">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {/* Brand & Description */}
        <div className="space-y-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white p-2 shadow shrink-0">
            <svg viewBox="0 0 100 100" className="h-full w-full text-[#0B1536]" fill="none" stroke="currentColor" strokeWidth="6">
              <path d="M45,15 C58,15 72,25 72,40 C72,55 58,75 48,85 C38,75 32,60 35,45 C38,30 40,15 45,15 Z" fill="#0B1536" />
              <path d="M48,30 L55,42 L42,48 L58,62" stroke="#F97316" strokeWidth="4" />
            </svg>
          </div>
          <p className="text-xs leading-relaxed text-slate-300 max-w-xs">
            Le leader du voyage premium en Afrique de l'Ouest. Nous créons des ponts entre les cultures.
          </p>
          <div className="pt-1">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white hover:bg-white/10 transition cursor-pointer">
              <Globe className="h-4 w-4" />
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-white tracking-wide">Navigation</h3>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="hover:text-white transition cursor-pointer">Accueil</li>
            <li className="hover:text-white transition cursor-pointer">Hébergements</li>
            <li className="hover:text-[#F97316] transition cursor-pointer font-medium">Restaurants</li>
            <li className="hover:text-white transition cursor-pointer">Billets</li>
            <li className="hover:text-white transition cursor-pointer">Location de voiture</li>
            <li className="hover:text-white transition cursor-pointer">Tourisme</li>
            <li className="hover:text-white transition cursor-pointer">Circuits Touristiques</li>
          </ul>
        </div>

        {/* Informations */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-white tracking-wide">Informations</h3>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="hover:text-white transition cursor-pointer">À propos de nous</li>
            <li className="hover:text-white transition cursor-pointer">Contact</li>
            <li className="hover:text-white transition cursor-pointer">Aide &FAQ</li>
            <li className="hover:text-white transition cursor-pointer">Confidentialité</li>
            <li className="hover:text-white transition cursor-pointer">Conditions d'utilisation</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-white tracking-wide">Contact</h3>
          <ul className="space-y-3 text-xs text-slate-300">
            <li className="flex items-center gap-2.5">
              <MapPin className="h-4 w-4 text-[#F97316] shrink-0" />
              <span>123 Rue de la Plage, Lomé, Togo</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 text-[#F97316] shrink-0" />
              <span>+228 90 00 00 00</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 text-[#F97316] shrink-0" />
              <span className="text-slate-300 hover:text-[#F97316] transition cursor-pointer">contact@akwabaafrica.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 px-4 py-5 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto px-4 lg:px-8 gap-3">
        <span>© 2026 AKWABA AFRICA. Tous droits réservés.</span>
        <span>Voyagez avec style. Explorez avec passion.</span>
      </div>
    </footer>
  );
}

