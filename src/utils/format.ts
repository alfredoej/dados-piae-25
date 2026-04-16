const numberFormatter = new Intl.NumberFormat("pt-BR");
const percentFormatter = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

export function formatNumber(value: number | string): string {
  const n = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(n)) return String(value);
  return numberFormatter.format(n);
}

export function formatPercent(value: number): string {
  if (!Number.isFinite(value)) return "-";
  return `${percentFormatter.format(value)}%`;
}

export function formatDateTime(d: Date): string {
  return d.toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "medium",
  });
}
