# Usecase Task Breakdown — Frontend

React + TypeScript single-page app, built with Vite.

## Stack

- **React 19** + **TypeScript** (strict mode)
- **Vite** — dev server and build tool
- **Tailwind CSS v4** — styling (via `@tailwindcss/vite`, zero-config content detection)
- **React Router** — client-side routing
- **ESLint** + **Prettier** — linting and formatting
- **Vitest** + **React Testing Library** — testing

See [`openspec/changes/init-project-structure/design.md`](openspec/changes/init-project-structure/design.md) for the rationale behind these choices.

## Prerequisites

- Node.js version pinned in [`.nvmrc`](.nvmrc) (`nvm use`)
- npm (ships with Node)

## Getting started

```bash
npm install
cp .env.example .env   # then fill in values
npm run dev
```

The app is served at the URL printed in the terminal (defaults to `http://localhost:5173`).

## Scripts

| Command                | Description                              |
| ---------------------- | ---------------------------------------- |
| `npm run dev`          | Start the local dev server with HMR      |
| `npm run build`        | Type-check and build for production      |
| `npm run preview`      | Preview the production build locally     |
| `npm run typecheck`    | Run TypeScript in check-only mode        |
| `npm run lint`         | Run ESLint                               |
| `npm run format`       | Format the codebase with Prettier        |
| `npm run format:check` | Check formatting without writing changes |
| `npm run test`         | Run the test suite once with Vitest      |

## Project structure

```
src/
  components/   Reusable UI components
  pages/        Route-level page components
  hooks/        Custom React hooks
  lib/          Framework-agnostic utilities (e.g. env access)
  types/        Shared TypeScript types and ambient declarations
  styles/       Global stylesheet (Tailwind entrypoint)
```

Import from `src/` using the `@/` path alias, e.g. `import Home from '@/pages/Home'`.

## Environment variables

Documented in [`.env.example`](.env.example). Copy it to `.env` (git-ignored) and fill in real values. Access them in code via the typed helper in `src/lib/env.ts` rather than `import.meta.env` directly.
