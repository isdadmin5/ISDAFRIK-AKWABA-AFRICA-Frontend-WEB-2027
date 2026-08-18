// Nous gérons ici la saisie de texte, avec label et message d'erreur

import { InputHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-sand-200">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={clsx(
            "rounded-lg border bg-asphalt-900 px-3.5 py-2.5 text-sand-50 placeholder:text-sand-400/60",
            "focus:outline-none focus:ring-2 focus:ring-amber-500/60",
            error ? "border-danger" : "border-asphalt-600",
            className
          )}
          aria-invalid={!!error}
          {...props}
        />
        {error && <span className="text-xs text-danger">{error}</span>}
      </div>
    );
  }
);
Input.displayName = "Input";
