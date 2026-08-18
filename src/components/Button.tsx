//Nous gérons ici le button réutilisable pour l'application. 
import { ButtonHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";
import { Loader2 } from "lucide-react";

// Réutilisation des Composants
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", loading, className, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={clsx(
          "inline-flex items-center justify-center gap-2 rounded-lg font-display font-semibold transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed",
          {
            "bg-amber-500 text-asphalt-950 hover:bg-amber-400": variant === "primary",
            "bg-asphalt-700 text-sand-50 hover:bg-asphalt-600": variant === "secondary",
            "bg-transparent text-sand-50 hover:bg-asphalt-800": variant === "ghost",
            "bg-danger text-sand-50 hover:opacity-90": variant === "danger",
          },
          {
            "text-sm px-3 py-1.5": size === "sm",
            "text-base px-5 py-2.5": size === "md",
            "text-lg px-7 py-3.5": size === "lg",
          },
          className
        )}
        {...props}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
