import { Link } from "react-router-dom";
import clsx from "clsx";

const STEPS = [
  { id: "chambres", label: "Choix", suffix: "" },
  { id: "voyageurs", label: "Voyageurs", suffix: "/voyageurs" },
  { id: "recap", label: "Récapitulatif", suffix: "/recap" },
  { id: "paiement", label: "Paiement", suffix: "/paiement" },
  { id: "confirmation", label: "Confirmation", suffix: "/confirmation" },
] as const;

export function CheckoutSteps({
  id,
  current,
}: {
  id: string;
  current: (typeof STEPS)[number]["id"];
}) {
  const currentIdx = STEPS.findIndex((s) => s.id === current);
  return (
    <ol className="mb-8 flex flex-wrap gap-2 text-[12px] font-semibold uppercase tracking-wide">
      {STEPS.map((step, i) => {
        const done = i < currentIdx;
        const active = i === currentIdx;
        const to = `/hebergements/${id}${step.suffix}`;
        const className = clsx(
          "rounded-full px-3 py-1.5",
          active && "bg-brand-500 text-navy-900",
          done && "bg-navy-900 text-white",
          !active && !done && "bg-white text-slate-400"
        );
        return (
          <li key={step.id}>
            {done ? (
              <Link to={to} className={className}>
                {i + 1}. {step.label}
              </Link>
            ) : (
              <span className={className}>
                {i + 1}. {step.label}
              </span>
            )}
          </li>
        );
      })}
    </ol>
  );
}
