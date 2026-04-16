import { formatNumber, formatPercent } from "@/utils/format";
import type { MetricResult } from "@/types";

export function KpiCard({
  metric,
  format,
}: {
  metric: MetricResult;
  format?: "number" | "percent";
}) {
  const displayValue =
    typeof metric.value === "number"
      ? format === "percent"
        ? formatPercent(metric.value)
        : formatNumber(metric.value)
      : String(metric.value);

  return (
    <div className="card p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
        {metric.label}
      </p>
      <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
        {displayValue}
      </p>
      {metric.hint && (
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          {metric.hint}
        </p>
      )}
    </div>
  );
}
