import type { CsvRow, MetricDef } from "@/types";

const normalize = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();

const isDiplomado = (row: CsvRow) => normalize(row.situacaoSau) === "diplomado";
const isMsSupera = (row: CsvRow) => normalize(row.situacaoSau) === "ms supera";

export const metrics: MetricDef[] = [
  {
    id: "totalAlunos",
    label: "Total de Alunos",
    hint: "Contagem total de registros",
    compute: (rows) => rows.length,
    format: "number",
  },
  {
    id: "totalCursos",
    label: "Total de Cursos",
    hint: "Cursos distintos",
    compute: (rows) =>
      new Set(rows.map((r) => r.curso).filter(Boolean)).size,
    format: "number",
  },
  {
    id: "totalDiplomados",
    label: "Total de Diplomados",
    hint: "Situação SAU = diplomado",
    compute: (rows) => rows.filter(isDiplomado).length,
    format: "number",
  },
  {
    id: "totalMsSupera",
    label: "Total MS Supera",
    hint: "Situação SAU = MS Supera",
    compute: (rows) => rows.filter(isMsSupera).length,
    format: "number",
  },
  {
    id: "totalReprovadosPorFalta",
    label: "Reprovados por Falta",
    hint: "Alunos com reprovação por falta > 0",
    compute: (rows) => rows.filter((r) => r.reprovacaoPorFalta > 0).length,
    format: "number",
  },
  {
    id: "totalReprovadosPorNota",
    label: "Reprovados por Nota",
    hint: "Alunos com reprovação por nota > 0",
    compute: (rows) => rows.filter((r) => r.reprovacaoPorNota > 0).length,
    format: "number",
  },
  {
    id: "percentualComReprovacaoPorFalta",
    label: "% Reprovação por Falta",
    hint: "Percentual sobre total filtrado",
    compute: (rows) => {
      if (!rows.length) return 0;
      const n = rows.filter((r) => r.reprovacaoPorFalta > 0).length;
      return (n / rows.length) * 100;
    },
    format: "percent",
  },
  {
    id: "percentualComReprovacaoPorNota",
    label: "% Reprovação por Nota",
    hint: "Percentual sobre total filtrado",
    compute: (rows) => {
      if (!rows.length) return 0;
      const n = rows.filter((r) => r.reprovacaoPorNota > 0).length;
      return (n / rows.length) * 100;
    },
    format: "percent",
  },
  {
    id: "tiposBeneficioDistintos",
    label: "Tipos de Benefício",
    hint: "Tipos distintos na base filtrada",
    compute: (rows) =>
      new Set(rows.map((r) => r.tipoBeneficio).filter(Boolean)).size,
    format: "number",
  },
];
