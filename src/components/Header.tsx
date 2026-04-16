interface HeaderProps {
  theme: "light" | "dark";
  onToggleTheme: () => void;
}

export function Header({ theme, onToggleTheme }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-white font-bold">
            P
          </div>
          <div>
            <h1 className="text-lg font-semibold">PIAE 2025</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Dashboard Analítico de Dados Acadêmicos
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onToggleTheme}
          className="btn-ghost"
          aria-label="Alternar tema claro/escuro"
        >
          {theme === "dark" ? "Modo Claro" : "Modo Escuro"}
        </button>
      </div>
    </header>
  );
}
