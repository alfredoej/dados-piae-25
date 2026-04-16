import Papa from "papaparse";
import type {
  CsvField,
  CsvRow,
  ParseResult,
  ValidationIssue,
} from "@/types";
import { mapHeader } from "@/config/headerMapping";
import {
  numericFields,
  requiredFields,
  stringFields,
} from "@/config/columns.schema";

const stringFieldSet: ReadonlySet<CsvField> = new Set(stringFields);
const numericFieldSet: ReadonlySet<CsvField> = new Set(numericFields);

function toInt(raw: unknown, rowIdx: number, field: CsvField): {
  value: number;
  issue?: ValidationIssue;
} {
  if (raw === null || raw === undefined || raw === "") {
    return { value: 0 };
  }
  const str = String(raw).trim().replace(",", ".");
  if (str === "") return { value: 0 };
  const n = Number(str);
  if (!Number.isFinite(n)) {
    return {
      value: 0,
      issue: {
        row: rowIdx,
        field,
        message: `Valor "${raw}" não é numérico`,
      },
    };
  }
  return { value: Math.trunc(n) };
}

export async function parseCsvFile(file: File): Promise<ParseResult> {
  return new Promise((resolve, reject) => {
    Papa.parse<Record<string, unknown>>(file, {
      header: true,
      skipEmptyLines: "greedy",
      transformHeader: (h) => h.replace(/\s+/g, " ").trim(),
      complete: (result) => {
        try {
          resolve(processParsed(result.data, file.name, result.meta.fields));
        } catch (err) {
          reject(err);
        }
      },
      error: (err) => reject(err),
    });
  });
}

function processParsed(
  raw: Record<string, unknown>[],
  fileName: string,
  headers: string[] | undefined,
): ParseResult {
  const issues: ValidationIssue[] = [];
  const headerToField = new Map<string, CsvField>();

  (headers ?? []).forEach((h) => {
    const field = mapHeader(h);
    if (field) headerToField.set(h, field);
  });

  const presentFields = new Set(headerToField.values());
  const missing = requiredFields.filter((f) => !presentFields.has(f));
  if (missing.length > 0) {
    throw new Error(
      `Colunas obrigatórias ausentes no CSV: ${missing.join(", ")}`,
    );
  }

  const rows: CsvRow[] = [];
  let invalidRows = 0;

  raw.forEach((record, idx) => {
    const rowNumber = idx + 2;
    const out: Record<string, unknown> = {};
    let rowValid = true;

    for (const [rawHeader, field] of headerToField) {
      const value = record[rawHeader];
      if (stringFieldSet.has(field)) {
        const str = value == null ? "" : String(value).trim();
        out[field] = str;
      } else if (numericFieldSet.has(field)) {
        const { value: n, issue } = toInt(value, rowNumber, field);
        if (issue) {
          issues.push(issue);
          rowValid = false;
        }
        out[field] = n;
      }
    }

    const hasAnyString = stringFields.some(
      (f) => String(out[f] ?? "").length > 0,
    );
    if (!hasAnyString) {
      invalidRows += 1;
      issues.push({ row: rowNumber, message: "Linha completamente vazia" });
      return;
    }

    if (!rowValid) invalidRows += 1;
    rows.push(out as unknown as CsvRow);
  });

  return {
    rows,
    invalidRows,
    totalRows: raw.length,
    issues,
    fileName,
    processedAt: new Date(),
  };
}
