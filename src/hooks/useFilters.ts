import { useCallback, useState } from "react";
import type { Filters, StringField } from "@/types";

export function useFilters() {
  const [filters, setFilters] = useState<Filters>({});

  const setFilter = useCallback((field: StringField, value: string) => {
    setFilters((prev) => {
      const next = { ...prev };
      if (!value) delete next[field];
      else next[field] = value;
      return next;
    });
  }, []);

  const clearAll = useCallback(() => setFilters({}), []);

  return { filters, setFilter, clearAll };
}
