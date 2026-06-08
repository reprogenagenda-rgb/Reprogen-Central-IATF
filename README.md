# Reprogen Central — Central de Análises Reprodutivas

Ferramenta web de análise reprodutiva bovina/bubalina para a equipe **Reprogen**.  
Lê dados da nuvem (Supabase) ou de planilhas Concept Plus locais, aplica a regra de **IATF vigente** e exporta relatórios.

---

## Funcionalidades

| Recurso | Descrição |
|---------|-----------|
| **Conectar ao Supabase** | Lê eventos enviados pelo app de campo em tempo real |
| **Importar Concept Plus** | Importa planilha XLSX local com detecção automática de colunas |
| **Regra IATF Vigente** | Para cada matriz: última IATF = vigente · DG dessa IATF = status atual |
| **KPIs em tempo real** | Total · Prenha · DG Pend · Vazia · por fazenda |
| **Gráfico de status** | Doughnut com percentuais |
| **Por fazenda** | Barras de progresso por fazenda |
| **Tabela filtrada** | Filtros por fazenda / status / lote / ID |
| **Export Concept Plus** | XLSX com aba de dados + aba de auditoria |
| **Export JSON** | Backup completo dos eventos |

---

## Como usar

### Opção 1 — Nuvem (Supabase)

1. Cole a **Project URL** do Supabase (ex.: `https://xxxxx.supabase.co`)
2. Cole a **Anon Key** (formato `eyJ...` — aba Legacy no painel Supabase)
3. Defina a fazenda (opcional — vazio = todas)
4. Clique **📊 Carregar Dados**

### Opção 2 — Planilha Concept Plus (offline)

1. Clique **📂 Selecionar Planilha XLSX**
2. Escolha a planilha (qualquer aba com `ID VISUAL`)
3. A Central detecta os cabeçalhos automaticamente (linhas 1–15)
4. Aplica a regra de IATF vigente e exibe os resultados

> A planilha pode estar no formato Reprogen padrão (6 abas) ou em qualquer formato
> que tenha `ID VISUAL`, `DATA IATF` e `DG` como cabeçalhos.

### Exportar

- **⬇ Concept Plus XLSX** — exporta no padrão Reprogen (2 abas: dados + dashboard)
- **⬇ JSON Backup** — exporta todos os eventos em JSON

---

## Deploy no GitHub Pages

```
1. Crie um repositório público no GitHub
2. Faça upload do arquivo central.html
3. Settings → Pages → Source: main / root → Save
4. Acesse: https://SEU-USUARIO.github.io/REPOSITÓRIO/central.html
```

---

## Mapeamento de colunas

A Central detecta automaticamente as seguintes colunas (por aliases):

| Campo | Aliases aceitos |
|-------|----------------|
| ID Visual | `ID VISUAL`, `N MATRIZ`, `NUMERO`, `BRINCO`, `MATRIZ` |
| Data IATF | `DATA IATF`, `DATA IA`, `DT IA`, `DATA INSEMINACAO` |
| DG 30-60 | `DG`, `DG 30-60`, `RESULTADO DG`, `DIAGNOSTICO` |
| DG Final | `DG FINAL`, `DIAGNOSTICO FINAL` |
| Touro | `TOURO`, `REPRODUTOR`, `NOME TOURO` |
| Fazenda | `PROPRIEDADE`, `FAZENDA` |
| Lote | `LOTE`, `GRUPO`, `LOTE BIOLOGICO` |
| Inseminador | `INSEMINADOR`, `TECNICO`, `OPERADOR` |

---

## Normalização de DG

| Valor na planilha | Interpretado como |
|-------------------|-------------------|
| `1`, `PRENHA`, `GESTANTE`, `P` | Prenha |
| `0`, `VAZIA`, `N`, `V` | Vazia |
| `0D`, `DESCARTE` | Vazia (descarte) |
| ` `, `SDG`, `FALTOU`, `N VEIO` | Pendente |

---

## Regra IATF Vigente

Para cada matriz, a **IATF vigente** é a mais recente por `DATA IATF`.  
O status é derivado do DG daquela IATF:

```
última IATF → DG associado → STATUS
                prenha      → PRENHA
                vazia       → VAZIA
                branco      → DG PENDENTE
sem IATF                    → SEM IATF
```

---

## Stack técnico

- **HTML5 + CSS3 + JavaScript ES5** — sem dependências de build
- **SheetJS (cdnjs)** — leitura e escrita de XLSX
- **Chart.js (cdnjs)** — gráfico de status
- **Supabase REST API** — leitura de eventos via XHR

---

## Versão

`central.html v1.1` — import Concept Plus + vigente reconstruction + Supabase sync
