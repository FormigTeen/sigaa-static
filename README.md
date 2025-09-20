# Static SIGAA UFBA

API estática do SIGAA da UFBA com interface simples, construída em Astro + React. Exponde endpoints públicos em JSON com dados de cursos, componentes curriculares (disciplinas), programas e turmas (seções), facilitando o consumo por desenvolvedores e entusiastas sem depender de scraping em tempo real.

## Visão Geral

- Objetivo: disponibilizar uma API de leitura (somente GET) com dados estáticos do SIGAA/UFBA.
- Como funciona: durante o build, a aplicação lê uma fonte de dados JSON definida por `PUBLIC_SOURCE_URL` e publica endpoints estáticos em `/api/v1/*`.
- Hospedagem: por ser estático, pode ser publicado no GitHub Pages, Netlify, Vercel (modo estático) ou qualquer host de arquivos estáticos.

## Endpoints (API v1)

- `GET /api/v1/index.json`: links dos demais endpoints.
- `GET /api/v1/courses.json`: lista de cursos (componentes curriculares) com URLs úteis.
- `GET /api/v1/course/[code].json`: detalhes de um curso pelo código.
- `GET /api/v1/course/[code]/sections.json`: turmas (seções) de um curso pelo código.
- `GET /api/v1/programs.json`: lista de programas (grades/estruturas).
- `GET /api/v1/program/[code].json`: detalhes de um programa pelo código.
- `GET /api/v1/sections.json`: todas as turmas (seções) disponíveis.

Obs.: os caminhos reais podem incluir um prefixo se `BASE_URL`/`PUBLIC_BASE_URL` apontarem para um subcaminho (ex.: GitHub Pages em `/<owner>/<repo>`).

## Requisitos

- Node.js 18+ (recomendado)
- npm (ou pnpm/yarn, se preferir)

## Como rodar localmente

1. Instale dependências:
   - `npm install`
2. Configure o ambiente:
   - Copie `.env.example` para `.env` e ajuste as variáveis conforme necessário.
   - Principais variáveis:
     - `BASE_URL`: URL base do site (usada pelo Astro para gerar URLs canônicas). Ex.: `http://localhost:4321` ou `https://<owner>.github.io/<repo>`.
     - `PUBLIC_BASE_URL`: URL base exposta ao cliente. Deve refletir a URL pública que servirá o site.
     - `PUBLIC_SOURCE_URL`: URL do JSON com os dados estáticos (fonte). Caso não definida, um valor padrão é usado (ver `src/utils/config.ts`).
3. Inicie o servidor de desenvolvimento:
   - `npm run dev`
4. Acesse:
   - Interface: `http://localhost:4321`
   - Endpoints: `http://localhost:4321/api/v1/index.json` (e demais rotas listadas acima)

## Build e publicação

- Build de produção: `npm run build` (saída em `dist/`).
- Pré-visualização do build: `npm run preview`.
- Publicação: sirva o conteúdo de `dist/` em qualquer host de arquivos estáticos.
- GitHub Pages: ajuste `BASE_URL`/`PUBLIC_BASE_URL` para incluir o subcaminho do repositório quando necessário.

## Estrutura do Projeto (resumo)

- `src/pages/`: rotas da aplicação (inclui `api/v1/*`).
- `src/spa/`: componentes React da interface.
- `src/utils/`: utilitários (config, carregamento dos dados, helpers de links).
- `public/`: ativos estáticos (imagens, ícones, etc.).
- `dist/`: saída de build estático.

## Como Contribuir

Contribuições são muito bem-vindas! Você pode ajudar de diversas formas:

1. Abra uma issue descrevendo bugs, dúvidas ou sugestões de melhoria.
2. Envie um pull request com correções, melhorias de documentação ou novos endpoints/ajustes.
3. Melhore a fonte de dados ou o pipeline que gera o `PUBLIC_SOURCE_URL`.

Passo a passo para PRs:

- Faça um fork do repositório.
- Crie um branch descritivo a partir da `main` (ex.: `feat/novo-endpoint` ou `docs/melhora-readme`).
- Faça commits claros e objetivos.
- Abra o PR explicando o contexto, o que foi alterado e como testar.

## Repositórios Relacionados

- SIGAA CLI (outro repositório): https://github.com/FormigTeen/sigaa-cli
- Static SIGAA UFBA (repositório do site/API): https://github.com/FormigTeen/sigaa-static

---

Qualquer dúvida ou sugestão, fique à vontade para abrir uma issue.
