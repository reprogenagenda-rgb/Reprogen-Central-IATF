# REPROGEN CENTRAL V1.3 — Importador Concept Plus Inteligente

## Objetivo
Central preparada para GitHub Pages com importação de planilha Concept Plus pronta, pré-validação, conversão para eventos auditáveis e envio para Supabase.

## Arquivos da pasta
- `index.html`: Central V1.3 completa.
- `manifest.json`: configuração PWA.
- `service-worker.js`: cache básico para GitHub Pages.
- `icons/`: ícones simples do app.
- `SQL_SUPABASE_REPROGEN_EVENTOS_V1_3.sql`: tabela e políticas temporárias de teste.

## Ordem de teste
1. Subir a pasta `reprogen-central-v1-3` em um repositório GitHub.
2. Ativar GitHub Pages.
3. Abrir a Central pelo link publicado.
4. Informar Project URL e publishable/anon key do Supabase.
5. Testar conexão.
6. Importar uma planilha Concept Plus pronta.
7. Conferir a prévia: linhas, eventos, IATF, matrizes únicas e alertas.
8. Clicar em “Usar prévia na análise local” para conferir KPIs antes de gravar.
9. Clicar em “Enviar eventos válidos ao Supabase”.
10. Clicar em “Carregar Nuvem” para validar que os eventos ficaram no banco.

## Critério de aprovação
- Importa XLSX sem travar.
- Identifica cabeçalho mesmo com pequenas variações.
- Conta IATF por DATA IA.
- Conta matrizes únicas por ID animal.
- DG vazio/SDG/FALTOU não vira vazia.
- DG FINAL tem prioridade.
- Evento duplicado não duplica porque `evento_id` é chave primária.

## Atenção
A importação XLSX usa SheetJS via CDN. Para uso 100% offline da Central, a próxima V1.3.1 deve embutir a biblioteca XLSX no HTML.
Nunca colocar `service_role` no HTML. Use publishable/anon key com RLS adequada.
