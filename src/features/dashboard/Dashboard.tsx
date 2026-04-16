import { useMemo } from "react";
import type { CsvRow, Filters, MetricResult, StringField } from "@/types";
import { metrics as metricDefs } from "@/config/metrics.config";
import { charts as chartDefs } from "@/config/charts.config";
import { applyFilters } from "@/utils/aggregate";
import { FilterBar } from "@/components/FilterBar";
import { KpiCard } from "@/components/KpiCard";
import { Chart } from "@/components/Chart";
import { DataTable } from "@/components/DataTable";

interface DashboardProps {
  rows: CsvRow[];
  filters: Filters;
  onFilterChange: (field: StringField, value: string) => void;
  onClearFilters: () => void;
  theme: "light" | "dark";
}

export function Dashboard({
  rows,
  filters,
  onFilterChange,
  onClearFilters,
  theme,
}: DashboardProps) {
  const filtered = useMemo(() => applyFilters(rows, filters), [rows, filters]);

  const kpis = useMemo<
    Array<{ metric: MetricResult; format?: "number" | "percent" }>
  >(() => {
    return metricDefs.map((def) => ({
      metric: {
        id: def.id,
        label: def.label,
        hint: def.hint,
        value: def.compute(filtered),
      },
      format: def.format,
    }));
  }, [filtered]);

  return (
    <div className="flex flex-col gap-6">
      <FilterBar
        rows={rows}
        filters={filters}
        onChange={onFilterChange}
        onClear={onClearFilters}
      />

      <section aria-label="Indicadores principais">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          {kpis.map(({ metric, format }) => (
            <KpiCard key={metric.id} metric={metric} format={format} />
          ))}
        </div>
      </section>

      <section aria-label="Gráficos analíticos">
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          {chartDefs.map((chart) => (
            <Chart
              key={chart.id}
              chart={chart}
              rows={filtered}
              theme={theme}
            />
          ))}
        </div>
      </section>

      <DataTable rows={filtered} />
    </div>
  );
}
