import { Header } from "@/components/Header";
import { UploadArea } from "@/features/upload/UploadArea";
import { StatusBar } from "@/features/upload/StatusBar";
import { Dashboard } from "@/features/dashboard/Dashboard";
import { useCsvData } from "@/hooks/useCsvData";
import { useFilters } from "@/hooks/useFilters";
import { useTheme } from "@/hooks/useTheme";

export default function App() {
  const { theme, toggle } = useTheme();
  const { loading, result, error, load, reset } = useCsvData();
  const { filters, setFilter, clearAll } = useFilters();

  return (
    <div className="min-h-screen">
      <Header theme={theme} onToggleTheme={toggle} />

      <main className="mx-auto flex max-w-screen-2xl flex-col gap-6 px-4 py-6 sm:px-6">
        {!result && (
          <UploadArea
            onFile={(file) => {
              clearAll();
              load(file);
            }}
            loading={loading}
          />
        )}

        {loading && (
          <div className="card flex items-center gap-3 p-4 text-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-brand-500" />
            Processando CSV…
          </div>
        )}

        {error && (
          <div
            role="alert"
            className="card border-red-300 bg-red-50 p-4 text-sm text-red-800 dark:border-red-800 dark:bg-red-950/40 dark:text-red-300"
          >
            <strong className="block font-semibold">
              Falha ao processar o arquivo
            </strong>
            <span>{error}</span>
          </div>
        )}

        {result && (
          <>
            <StatusBar
              result={result}
              onReset={() => {
                reset();
                clearAll();
              }}
            />
            {result.rows.length === 0 ? (
              <div className="card p-6 text-center text-sm text-slate-500">
                O arquivo foi lido, mas nenhuma linha válida foi encontrada.
              </div>
            ) : (
              <Dashboard
                rows={result.rows}
                filters={filters}
                onFilterChange={setFilter}
                onClearFilters={clearAll}
                theme={theme}
              />
            )}
          </>
        )}
      </main>

      <footer className="mx-auto max-w-screen-2xl px-4 py-6 text-center text-xs text-slate-400 sm:px-6">
        PIAE 2025 · Dashboard 100% front-end · Processamento local no navegador
      </footer>
    </div>
  );
}
