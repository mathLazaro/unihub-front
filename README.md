# Frontend

Aplicação web construída com React, TypeScript e Vite.

## Stack

- **React** + **TypeScript**
- **Vite** — build tool e dev server
- **Tailwind CSS** — estilização
- **TanStack Query** — cache, sincronização e gerenciamento de estado do servidor
- **Axios** — cliente HTTP
- **React Router** — roteamento
- **Radix UI** — componentes acessíveis (modais, dialogs)
- **Phosphor Icons** — ícones

## Pré-requisitos

- [Node.js](https://nodejs.org/) 18 ou superior
- npm 9 ou superior

## Instalação

```bash
# Clone o repositório
git clone <url-do-repositorio>
cd <nome-do-projeto>

# Instale as dependências
npm install
```

## Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com base no `.env.example`:

```bash
cp .env.example .env
```

```env
VITE_API_URL=http://localhost:3000
```

## Executando o projeto

```bash
# Ambiente de desenvolvimento
npm run dev

# Build de produção
npm run build

# Preview do build de produção
npm run preview
```

A aplicação ficará disponível em `http://localhost:5173` por padrão.

## Estrutura do projeto

```
src/
├── assets/             # Imagens, ícones e arquivos estáticos
├── components/         # Componentes reutilizáveis (Input, Select, Button, Modal...)
├── contexts/           # Contextos React (ex: AuthContext)
├── hooks/              # Hooks customizados (ex: usePosts, useFeed)
├── layouts/            # Layouts de página (ex: InternalLayout)
├── pages/              # Páginas/rotas da aplicação
├── services/           # Comunicação com a API (ex: posts.service.ts)
├── types/              # Tipos e interfaces TypeScript
├── utils/              # Funções utilitárias (ex: timeAgo)
├── App.tsx
└── main.tsx
```

## Autenticação

O token JWT é armazenado no `localStorage` e decodificado no front através do `AuthProvider` (`contexts/AuthContext.tsx`), que expõe os dados do usuário autenticado via hook `useAuth()`:

```tsx
const { user, isAuthenticated } = useAuth();
```

## Consumo da API

As chamadas HTTP são centralizadas na pasta `services/`, usando uma instância configurada do Axios com interceptor de autenticação (`services/api.ts`).

O gerenciamento de cache e sincronização de dados do servidor é feito com **TanStack Query**. Os hooks de cada recurso ficam em `hooks/` (ex: `usePosts.ts`, `useFeed.ts`).

## Componentes principais

| Componente | Descrição |
|---|---|
| `Input` | Campo de texto estilizável, com suporte a ícone, variantes e tamanhos |
| `Select` | Campo de seleção customizado |
| `Button` | Botão com variantes de estilo, tamanho e cor |
| `Modal` | Modal acessível baseado em Radix UI |
| `PostInput` | Formulário de criação/edição de post (modo `inline` ou `modal`) |
| `Feed` | Lista de posts com scroll infinito |
| `PostCard` | Card de exibição de um post |

## Scripts disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera o build de produção |
| `npm run preview` | Visualiza o build de produção localmente |
| `npm run lint` | Executa o linter |

## Convenções

- Componentes em **PascalCase** (`PostCard.tsx`)
- Hooks customizados prefixados com `use` (`useFeed.ts`)
- Estilos utilitários via Tailwind; classes customizadas em arquivos `.css` ao lado do componente quando necessário
- Cores e tokens de design definidos em `@theme` (ver `src/index.css`)


## Documentação Adicional

- [Mapeamento de Validações (Frontend)](./VALIDACOES.md): Guia com as validações operando na entrada de dados, regras e máscaras.
- [Guia de Apresentação: IHC e Acessibilidade](./IHC_ACESSIBILIDADE.md): Documento explicando como os conceitos de usabilidade de Jakob Nielsen e conformidade WCAG/WAI-ARIA estão aplicados no projeto.