import { fieldLabels } from "@/config/columns.schema";
import type { CsvRow, Filters, StringField } from "@/types";
import { distinctValues } from "@/utils/aggregate";

const filterableFields: StringField[] = [
  "anoSituacao",
  "mesSituacao",
  "anoInicioBeneficio",
  "tipoBeneficio",
  "unidadeEnsino",
  "curso",
  "situacaoSau",
];

interface FilterBarProps {
  rows: CsvRow[];
  filters: Filters;
  onChange: (field: StringField, value: string) => void;
  onClear: () => void;
}

export function FilterBar({
  rows,
  filters,
  onChange,
  onClear,
}: FilterBarProps) {
  const hasAny = Object.values(filters).some((v) => v && v !== "");

  return (
    <section aria-label="Filtros globais" className="card p-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-200">
          Filtros Globais
        </h2>
        <button
          type="button"
          onClick={onClear}
          disabled={!hasAny}
          className="btn-ghost text-xs"
        >
          Limpar filtros
        </button>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
        {filterableFields.map((field) => {
          const options = distinctValues(rows, field);
          return (
            <label key={field} className="block">
              <span className="label">{fieldLabels[field]}</span>
              <select
                className="input"
                value={filters[field] ?? ""}
                onChange={(e) => onChange(field, e.target.value)}
              >
                <option value="">Todos</option>
                {options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </label>
          );
        })}
      </div>
    </section>
  );
}
