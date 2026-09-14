## Why

This repository is currently empty aside from OpenSpec/Claude tooling scaffolding — there is no application code, build tooling, or project structure yet. Before any feature work on the `usecase-task-breakdown` frontend can begin, the repo needs a working, conventional foundation (framework, tooling, folder layout, quality gates) that all future changes build on top of.

## What Changes

- Scaffold a React + TypeScript single-page app using Vite as the build tool.
- Add Tailwind CSS for styling and a base design token/theme setup.
- Add client-side routing (React Router) with a minimal route structure (e.g. home/dashboard placeholder).
- Add code quality tooling: ESLint, Prettier, and TypeScript strict mode, wired into npm scripts.
- Add a testing setup: Vitest + React Testing Library, with one smoke test.
- Establish a conventional `src/` folder structure (components, routes/pages, hooks, lib/api, types, styles).
- Add environment config handling (`.env.example`, typed env access).
- Add baseline `README.md` documenting setup, scripts, and folder conventions.
- Add `.gitignore`, `.nvmrc`/engines field, and npm as the package manager.

## Capabilities

### New Capabilities
- `project-scaffolding`: The base frontend project — build tooling, folder structure, linting/formatting, testing setup, and routing skeleton that all future features are built on.

### Modified Capabilities
- (none — repository has no existing capabilities)

## Impact

- **Affected code**: Entire repository (currently empty); creates `package.json`, `src/`, `public/`, config files (`vite.config.ts`, `tsconfig.json`, `.eslintrc`/`eslint.config.js`, `tailwind.config.ts`, `postcss.config.js`, `vitest.config.ts`).
- **Dependencies introduced**: react, react-dom, react-router-dom, vite, typescript, tailwindcss, eslint, prettier, vitest, @testing-library/react.
- **Systems**: None external — this is a local scaffold with no backend integration yet. No breaking changes since there is no existing app to break.
