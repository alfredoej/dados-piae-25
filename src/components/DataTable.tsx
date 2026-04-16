import { useMemo, useState } from "react";
import type { CsvRow } from "@/types";
import { formatNumber } from "@/utils/format";

interface DataTableProps {
  rows: CsvRow[];
}

const PAGE_SIZE = 50;

export function DataTable({ rows }: DataTableProps) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) => r.nomeAcademico.toLowerCase().includes(q));
  }, [rows, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages - 1);
  const pageRows = filtered.slice(
    safePage * PAGE_SIZE,
    safePage * PAGE_SIZE + PAGE_SIZE,
  );

  return (
    <section aria-label="Tabela analítica" className="card p-4">
      <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-200">
          Tabela Analítica ({formatNumber(filtered.length)} registros)
        </h2>
        <input
          type="search"
          placeholder="Buscar por nome acadêmico…"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(0);
          }}
          className="input sm:max-w-xs"
          aria-label="Buscar por nome acadêmico"
        />
      </div>
      <div className="overflow-auto rounded-lg border border-slate-200 dark:border-slate-800">
        <table className="min-w-full divide-y divide-slate-200 text-sm dark:divide-slate-800">
          <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:bg-slate-900 dark:text-slate-400">
            <tr>
              <th className="px-3 py-2">Nome Acadêmico</th>
              <th className="px-3 py-2">Curso</th>
              <th className="px-3 py-2">Unidade</th>
              <th className="px-3 py-2">Tipo Benefício</th>
              <th className="px-3 py-2">Situação SAU</th>
              <th className="px-3 py-2">Ano</th>
              <th className="px-3 py-2">Mês</th>
              <th className="px-3 py-2 text-right">Rep. Falta</th>
              <th className="px-3 py-2 text-right">Rep. Nota</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {pageRows.map((r, i) => (
              <tr
                key={`${safePage}-${i}`}
                className="hover:bg-slate-50 dark:hover:bg-slate-900/60"
              >
                <td className="px-3 py-2">{r.nomeAcademico || "-"}</td>
                <td className="px-3 py-2">{r.curso}</td>
                <td className="px-3 py-2">{r.unidadeEnsino}</td>
                <td className="px-3 py-2">{r.tipoBeneficio}</td>
                <td className="px-3 py-2">{r.situacaoSau}</td>
                <td className="px-3 py-2">{r.anoSituacao}</td>
                <td className="px-3 py-2">{r.mesSituacao}</td>
                <td className="px-3 py-2 text-right tabular-nums">
                  {r.reprovacaoPorFalta}
                </td>
                <td className="px-3 py-2 text-right tabular-nums">
                  {r.reprovacaoPorNota}
                </td>
              </tr>
            ))}
            {!pageRows.length && (
              <tr>
                <td
                  colSpan={9}
                  className="px-3 py-6 text-center text-slate-400"
                >
                  Nenhum registro encontrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
        <span>
          Página {safePage + 1} de {totalPages}
        </span>
        <div className="flex gap-2">
          <button
            type="button"
            className="btn-ghost text-xs"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={safePage === 0}
          >
            Anterior
          </button>
          <button
            type="button"
            className="btn-ghost text-xs"
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={safePage >= totalPages - 1}
          >
            Próxima
          </button>
        </div>
      </div>
    </section>
  );
}
