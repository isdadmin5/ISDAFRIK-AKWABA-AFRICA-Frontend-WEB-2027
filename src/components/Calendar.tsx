import { Input } from "./Input";

// Nous gérons ici la sélection de dates
// Implémentation simplifiée en date-range native, conforme au contrat de props
// d'un futur composant calendrier graphique (mêmes noms de champs).
export function DateRangePicker({
  startDate,
  endDate,
  onChange,
  minDate,
  error,
}: {
  startDate: string;
  endDate: string;
  onChange: (range: { startDate: string; endDate: string }) => void;
  minDate?: string;
  error?: { startDate?: string; endDate?: string };
}) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Input
        type="date"
        label="Date de prise en charge"
        value={startDate}
        min={minDate}
        error={error?.startDate}
        onChange={(e) => onChange({ startDate: e.target.value, endDate })}
      />
      <Input
        type="date"
        label="Date de restitution"
        value={endDate}
        min={startDate || minDate}
        error={error?.endDate}
        onChange={(e) => onChange({ startDate, endDate: e.target.value })}
      />
    </div>
  );
}
