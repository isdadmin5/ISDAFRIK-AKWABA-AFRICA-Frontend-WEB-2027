import { Link } from "react-router-dom";
import { Globe } from "lucide-react";
import { FIGMA } from "@/modules/hebergements/assets";

export function Header() {
  return (
    <header className="sticky top-0 z-50 h-[81px] bg-navy-900 text-white">
      <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-6 lg:px-[61px]">
        <Link to="/hebergements" className="shrink-0">
          <img src={FIGMA.logo} alt="AKWABA AFRICA" className="size-[62px] rounded-[10px] object-cover" />
        </Link>

        <nav className="flex items-center">
          <Link to="/hebergements" className="text-[14px] font-medium text-brand-500">
            Hébergements
          </Link>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <button type="button" className="flex items-center gap-1 text-[14px] font-medium">
            <Globe className="size-[17px]" />
            FR
          </button>
          <button
            type="button"
            className="flex h-[34px] w-[88px] items-center justify-center gap-1 rounded-xl bg-white/20 text-[16px] font-medium"
          >
            <img src={FIGMA.iconFlag} alt="" className="h-4 w-4 object-contain" />
            TOGO
          </button>
          <button type="button" className="rounded-2xl bg-brand-500 px-6 py-2 text-[14px] font-medium text-navy-900">
            Connexion
          </button>
        </div>
      </div>
    </header>
  );
}
