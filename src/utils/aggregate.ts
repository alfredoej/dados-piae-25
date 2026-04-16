import type { ChartDef, CsvField, CsvRow, Filters } from "@/types";

export interface GroupedPoint {
  name: string;
  value: number;
}

export function applyFilters(rows: CsvRow[], filters: Filters): CsvRow[] {
  const entries = Object.entries(filters).filter(
    ([, v]) => v !== undefined && v !== "",
  ) as [CsvField, string][];
  if (entries.length === 0) return rows;
  return rows.filter((row) =>
    entries.every(([field, value]) => String(row[field]) === value),
  );
}

export function distinctValues(rows: CsvRow[], field: CsvField): string[] {
  const set = new Set<string>();
  for (const row of rows) {
    const v = String(row[field] ?? "").trim();
    if (v) set.add(v);
  }
  return [...set].sort((a, b) => a.localeCompare(b, "pt-BR"));
}

export function aggregate(rows: CsvRow[], chart: ChartDef): GroupedPoint[] {
  const buckets = new Map<string, number>();

  for (const row of rows) {
    const rawKey = row[chart.groupBy];
    const key = String(rawKey ?? "").trim() || "(vazio)";
    const current = buckets.get(key) ?? 0;
    if (chart.aggregate === "count") {
      buckets.set(key, current + 1);
    } else {
      const n = chart.valueField
        ? Number(row[chart.valueField]) || 0
        : 0;
      buckets.set(key, current + n);
    }
  }

  let points = [...buckets.entries()].map(([name, value]) => ({
    name,
    value,
  }));
  points.sort((a, b) => b.value - a.value);
  if (chart.topN) points = points.slice(0, chart.topN);
  return points;
}

export function totalReprovacoesCombinadas(rows: CsvRow[]): GroupedPoint[] {
  return [
    {
      name: "Reprovação por Falta",
      value: rows.reduce((acc, r) => acc + r.reprovacaoPorFalta, 0),
    },
    {
      name: "Reprovação por Nota",
      value: rows.reduce((acc, r) => acc + r.reprovacaoPorNota, 0),
    },
  ];
}
