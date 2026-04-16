import { useRef, useState } from "react";

interface UploadAreaProps {
  onFile: (file: File) => void;
  loading: boolean;
}

export function UploadArea({ onFile, loading }: UploadAreaProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleFile = (file: File | null | undefined) => {
    if (!file) return;
    if (!/\.csv$/i.test(file.name)) {
      alert("Selecione um arquivo .csv válido.");
      return;
    }
    onFile(file);
  };

  return (
    <section
      aria-label="Upload de CSV"
      className={`card flex flex-col items-center justify-center gap-3 border-2 border-dashed p-8 text-center transition ${
        dragging
          ? "border-brand-500 bg-brand-50 dark:bg-brand-500/5"
          : "border-slate-300 dark:border-slate-700"
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        handleFile(e.dataTransfer.files?.[0]);
      }}
    >
      <div className="text-4xl" aria-hidden>
        📊
      </div>
      <div>
        <h2 className="text-base font-semibold">
          Selecione o arquivo CSV do PIAE 2025
        </h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Arraste um arquivo aqui ou clique no botão abaixo. O processamento
          acontece inteiramente no seu navegador.
        </p>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept=".csv,text/csv"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
      <button
        type="button"
        className="btn-primary"
        onClick={() => inputRef.current?.click()}
        disabled={loading}
      >
        {loading ? "Processando…" : "Escolher arquivo CSV"}
      </button>
    </section>
  );
}
