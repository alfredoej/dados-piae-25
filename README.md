# PIAE 2025 · Dashboard Analítico

Aplicação **100% front-end** (React + TypeScript + Vite + Tailwind + Papa Parse + Apache ECharts) para análise local de dados do PIAE. O CSV é processado inteiramente no navegador — sem backend, sem banco, sem `localStorage`.

## Requisitos

- Node.js 18 ou superior
- npm 9+ (ou pnpm/yarn equivalentes)

## Instalação

```bash
npm install
```

## Execução em desenvolvimento

```bash
npm run dev
```

A aplicação abre em `http://localhost:5173`.

## Build de produção

```bash
npm run build
npm run preview
```

## Uso

1. Abra a aplicação no navegador.
2. Clique em **Escolher arquivo CSV** (ou arraste o arquivo para a área de upload).
3. Selecione o `.csv` (ou outro arquivo com o mesmo schema).
4. O dashboard é renderizado automaticamente com KPIs, gráficos e tabela analítica.
5. Use os filtros globais para refinar a análise.
6. Alterne entre modo claro/escuro pelo botão no cabeçalho.

## Colunas esperadas no CSV

| Cabeçalho            | Campo interno         | Tipo   |
|----------------------|-----------------------|--------|
| ANO SITUACAO         | anoSituacao           | string |
| MES SITUACAO         | mesSituacao           | string |
| ANO INICIO BENEFICIO | anoInicioBeneficio    | string |
| TIPO BENEFICIO       | tipoBeneficio         | string |
| NOME ACADEMICO       | nomeAcademico         | string |
| UNIDADE ENSINO       | unidadeEnsino         | string |
| CURSO                | curso                 | string |
| SITUACAO SAU         | situacaoSau           | string |
| REPROVACAO POR FALTA | reprovacaoPorFalta    | int    |
| REPROVACAO POR NOTA  | reprovacaoPorNota     | int    |


## Arquitetura

Cinco camadas independentes, todas configuráveis:

1. **Ingestão** — `src/features/upload/`
2. **Validação de schema** — `src/config/columns.schema.ts`
3. **Normalização** — `src/config/headerMapping.ts` + `src/utils/parseCsv.ts`
4. **Cálculo de indicadores** — `src/config/metrics.config.ts` + `src/utils/aggregate.ts`
5. **Renderização** — `src/features/dashboard/` + `src/config/charts.config.ts`

Para adicionar um novo KPI ou gráfico, basta incluir uma entrada nos arquivos de `config/` — nenhum componente React precisa ser alterado.
