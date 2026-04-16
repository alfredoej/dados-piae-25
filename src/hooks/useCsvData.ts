import { useCallback, useState } from "react";
import { parseCsvFile } from "@/utils/parseCsv";
import type { ParseResult } from "@/types";

interface State {
  loading: boolean;
  result: ParseResult | null;
  error: string | null;
}

export function useCsvData() {
  const [state, setState] = useState<State>({
    loading: false,
    result: null,
    error: null,
  });

  const load = useCallback(async (file: File) => {
    setState({ loading: true, result: null, error: null });
    try {
      const result = await parseCsvFile(file);
      setState({ loading: false, result, error: null });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Erro desconhecido ao ler CSV";
      setState({ loading: false, result: null, error: message });
    }
  }, []);

  const reset = useCallback(
    () => setState({ loading: false, result: null, error: null }),
    [],
  );

  return { ...state, load, reset };
}
