import { SelectHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";

// Nous gérons ici la sélection d'options dans un menu déroulant, avec label et message d'erreur
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className, id, ...props }, ref) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={selectId} className="text-sm font-medium text-sand-200">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={clsx(
            "rounded-lg border bg-asphalt-900 px-3.5 py-2.5 text-sand-50",
            "focus:outline-none focus:ring-2 focus:ring-amber-500/60",
            error ? "border-danger" : "border-asphalt-600",
            className
          )}
          aria-invalid={!!error}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <span className="text-xs text-danger">{error}</span>}
      </div>
    );
  }
);
Select.displayName = "Select";
