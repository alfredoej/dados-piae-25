import type { CsvField } from "@/types";

export const headerMapping: Record<string, CsvField> = {
  "ANO SITUACAO": "anoSituacao",
  "MES SITUACAO": "mesSituacao",
  "ANO INICIO BENEFICIO": "anoInicioBeneficio",
  "TIPO BENEFICIO": "tipoBeneficio",
  "NOME ACADEMICO": "nomeAcademico",
  "UNIDADE ENSINO": "unidadeEnsino",
  UNIDADE: "unidadeEnsino",
  CURSO: "curso",
  "SITUACAO SAU": "situacaoSau",
  "REPROVACAO POR FALTA": "reprovacaoPorFalta",
  "REPROVACAO POR NOTA": "reprovacaoPorNota",
};

export function normalizeHeader(raw: string): string {
  return raw.replace(/\s+/g, " ").trim().toUpperCase();
}

export function mapHeader(raw: string): CsvField | undefined {
  return headerMapping[normalizeHeader(raw)];
}
