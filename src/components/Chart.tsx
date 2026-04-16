import ReactECharts from "echarts-for-react";
import type { EChartsOption } from "echarts";
import type { ChartDef, CsvRow } from "@/types";
import { aggregate, type GroupedPoint } from "@/utils/aggregate";

interface ChartProps {
  chart: ChartDef;
  rows: CsvRow[];
  theme: "light" | "dark";
}

function combinedReprovacoesByTipo(rows: CsvRow[]): GroupedPoint[] {
  const map = new Map<string, number>();
  for (const r of rows) {
    const key = (r.tipoBeneficio || "(vazio)").trim();
    map.set(
      key,
      (map.get(key) ?? 0) + r.reprovacaoPorFalta + r.reprovacaoPorNota,
    );
  }
  return [...map.entries()]
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
}

function buildOption(
  chart: ChartDef,
  points: GroupedPoint[],
  dark: boolean,
): EChartsOption {
  const textColor = dark ? "#e2e8f0" : "#1e293b";
  const axisColor = dark ? "#334155" : "#cbd5e1";
  const base = {
    textStyle: { color: textColor, fontFamily: "Inter, sans-serif" },
    grid: { left: 40, right: 20, top: 30, bottom: 70, containLabel: true },
  };

  if (chart.kind === "pie") {
    return {
      ...base,
      tooltip: { trigger: "item" },
      legend: {
        bottom: 0,
        type: "scroll",
        textStyle: { color: textColor },
      },
      series: [
        {
          type: "pie",
          radius: ["35%", "65%"],
          itemStyle: {
            borderRadius: 6,
            borderWidth: 2,
            borderColor: dark ? "#0f172a" : "#ffffff",
          },
          label: { color: textColor },
          data: points,
        },
      ],
    };
  }

  const isHorizontal = chart.kind === "barHorizontal";
  const categoryAxis = {
    type: "category" as const,
    data: points.map((p) => p.name),
    axisLine: { lineStyle: { color: axisColor } },
    axisLabel: {
      color: textColor,
      rotate: isHorizontal ? 0 : 30,
      interval: 0,
      fontSize: 11,
      formatter: (v: string) => (v.length > 24 ? `${v.slice(0, 22)}…` : v),
    },
  };
  const valueAxis = {
    type: "value" as const,
    axisLine: { lineStyle: { color: axisColor } },
    splitLine: { lineStyle: { color: axisColor, type: "dashed" as const } },
    axisLabel: { color: textColor },
  };

  return {
    ...base,
    tooltip: { trigger: "axis" },
    xAxis: isHorizontal ? valueAxis : categoryAxis,
    yAxis: isHorizontal ? categoryAxis : valueAxis,
    series: [
      {
        type: chart.kind === "line" ? "line" : "bar",
        data: points.map((p) => p.value),
        itemStyle: {
          color: "#2563eb",
          borderRadius: isHorizontal ? [0, 6, 6, 0] : [6, 6, 0, 0],
        },
        smooth: chart.kind === "line",
      },
    ],
  };
}

export function Chart({ chart, rows, theme }: ChartProps) {
  const dark = theme === "dark";
  const points =
    chart.id === "totalReprovacoesPorTipoBeneficio"
      ? combinedReprovacoesByTipo(rows)
      : aggregate(rows, chart);

  const empty = points.length === 0;
  const option = buildOption(chart, points, dark);

  return (
    <div className="card flex h-full flex-col p-4">
      <h3 className="mb-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
        {chart.title}
      </h3>
      {empty ? (
        <div className="flex h-64 flex-1 items-center justify-center text-sm text-slate-400">
          Sem dados para exibir
        </div>
      ) : (
        <ReactECharts
          option={option}
          style={{ height: 340, width: "100%" }}
          notMerge
          lazyUpdate
        />
      )}
    </div>
  );
}
