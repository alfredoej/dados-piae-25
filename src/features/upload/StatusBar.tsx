import type { ParseResult } from "@/types";
import { formatDateTime, formatNumber } from "@/utils/format";

interface StatusBarProps {
  result: ParseResult;
  onReset: () => void;
}

export function StatusBar({ result, onReset }: StatusBarProps) {
  const valid = result.rows.length;
  return (
    <section
      aria-label="Status do processamento"
      className="card flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div>
          <p className="label">Arquivo</p>
          <p className="text-sm font-medium truncate max-w-[220px]">
            {result.fileName}
          </p>
        </div>
        <div>
          <p className="label">Linhas Válidas</p>
          <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
            {formatNumber(valid)}
          </p>
        </div>
        <div>
          <p className="label">Linhas Inválidas</p>
          <p
            className={`text-sm font-semibold ${
              result.invalidRows > 0
                ? "text-amber-600 dark:text-amber-400"
                : "text-slate-500"
            }`}
          >
            {formatNumber(result.invalidRows)}
          </p>
        </div>
        <div>
          <p className="label">Processado em</p>
          <p className="text-sm font-medium">
            {formatDateTime(result.processedAt)}
          </p>
        </div>
      </div>
      <button type="button" className="btn-ghost" onClick={onReset}>
        Carregar outro arquivo
      </button>
    </section>
  );
}
