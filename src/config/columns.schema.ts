import type { CsvField, NumericField, StringField } from "@/types";

export const stringFields: readonly StringField[] = [
  "anoSituacao",
  "mesSituacao",
  "anoInicioBeneficio",
  "tipoBeneficio",
  "nomeAcademico",
  "unidadeEnsino",
  "curso",
  "situacaoSau",
] as const;

export const numericFields: readonly NumericField[] = [
  "reprovacaoPorFalta",
  "reprovacaoPorNota",
] as const;

export const requiredFields: readonly CsvField[] = [
  ...stringFields,
  ...numericFields,
] as const;

export const fieldLabels: Record<CsvField, string> = {
  anoSituacao: "Ano Situação",
  mesSituacao: "Mês Situação",
  anoInicioBeneficio: "Ano Início Benefício",
  tipoBeneficio: "Tipo Benefício",
  nomeAcademico: "Nome Acadêmico",
  unidadeEnsino: "Unidade de Ensino",
  curso: "Curso",
  situacaoSau: "Situação SAU",
  reprovacaoPorFalta: "Reprovação por Falta",
  reprovacaoPorNota: "Reprovação por Nota",
};
