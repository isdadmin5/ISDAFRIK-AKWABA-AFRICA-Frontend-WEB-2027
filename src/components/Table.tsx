// Tableau de données générique — components/Table (aussi appelé "DataTable"
// ailleurs dans le cahier des charges, même composant, un seul nom retenu ici)
import type { ReactNode } from "react";
import { Loader } from "./Loader";

type ColumnConfig =
  | string
  | {
      key: string;
      label?: string;
      render?: (value: unknown, row: Record<string, any>, index: number) => ReactNode;
      className?: string;
    };

function normalizeColumns(columns: ColumnConfig[]) {
  return columns.map((column) => {
    if (typeof column === "string") {
      return { key: column, label: column, render: undefined, className: undefined };
    }
    return {
      key: column.key,
      label: column.label ?? column.key,
      render: column.render,
      className: column.className,
    };
  });
}

export function Table({
  columns,
  data,
  loading = false,
  emptyLabel = "Aucune donnée à afficher.",
}: {
  columns: ColumnConfig[];
  data: Record<string, any>[];
  loading?: boolean;
  emptyLabel?: string;
}) {
  const normalizedColumns = normalizeColumns(columns);

  if (loading) {
    return <Loader label="Chargement des données…" />;
  }

  if (data.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-asphalt-600 py-12 text-center text-sand-400">
        {emptyLabel}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-asphalt-700">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="bg-asphalt-800">
            {normalizedColumns.map((column) => (
              <th
                key={column.key}
                className="border-b border-asphalt-700 px-4 py-3 text-sm font-semibold text-sand-200"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={row.id ?? rowIndex} className="border-b border-asphalt-700 hover:bg-asphalt-800">
              {normalizedColumns.map((column) => {
                const value = row[column.key];
                return (
                  <td
                    key={column.key}
                    className={`px-4 py-3 text-sm text-sand-50 ${column.className ?? ""}`.trim()}
                  >
                    {column.render ? column.render(value, row, rowIndex) : value ?? "-"}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}