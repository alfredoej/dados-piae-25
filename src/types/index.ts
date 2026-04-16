export interface CsvRow {
  anoSituacao: string;
  mesSituacao: string;
  anoInicioBeneficio: string;
  tipoBeneficio: string;
  nomeAcademico: string;
  unidadeEnsino: string;
  curso: string;
  situacaoSau: string;
  reprovacaoPorFalta: number;
  reprovacaoPorNota: number;
}

export type CsvField = keyof CsvRow;

export interface ValidationIssue {
  row: number;
  field?: CsvField;
  message: string;
}

export interface ParseResult {
  rows: CsvRow[];
  invalidRows: number;
  totalRows: number;
  issues: ValidationIssue[];
  fileName: string;
  processedAt: Date;
}

export type StringField = Extract<
  CsvField,
  | "anoSituacao"
  | "mesSituacao"
  | "anoInicioBeneficio"
  | "tipoBeneficio"
  | "nomeAcademico"
  | "unidadeEnsino"
  | "curso"
  | "situacaoSau"
>;

export type NumericField = Extract<
  CsvField,
  "reprovacaoPorFalta" | "reprovacaoPorNota"
>;

export type Filters = Partial<Record<StringField, string>>;

export interface MetricResult {
  id: string;
  label: string;
  value: string | number;
  hint?: string;
}

export interface MetricDef {
  id: string;
  label: string;
  hint?: string;
  compute: (rows: CsvRow[]) => string | number;
  format?: "number" | "percent";
}

export type ChartKind = "bar" | "barHorizontal" | "pie" | "line";

export interface ChartDef {
  id: string;
  title: string;
  kind: ChartKind;
  groupBy: CsvField;
  aggregate: "count" | "sum";
  valueField?: NumericField;
  topN?: number;
  description?: string;
}
