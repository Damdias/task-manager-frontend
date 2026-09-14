## 1. Project Initialization

- [x] 1.1 Initialize `package.json` with `npm create vite@latest . -- --template react-ts` (or equivalent manual setup)
- [x] 1.2 Add `.gitignore` (node_modules, dist, .env, editor/OS files)
- [x] 1.3 Add `.nvmrc` and an `engines` field in `package.json` pinning the Node version
- [x] 1.4 Verify `npm install` succeeds and `npm run dev` serves the default Vite page

## 2. TypeScript Configuration

- [x] 2.1 Enable `strict: true` and related strict flags in `tsconfig.json`
- [x] 2.2 Add path aliases if needed (e.g. `@/*` → `src/*`) in `tsconfig.json` and `vite.config.ts`
- [x] 2.3 Add `npm run typecheck` script (`tsc --noEmit`)

## 3. Styling (Tailwind CSS)

- [x] 3.1 Install and initialize Tailwind CSS (v4, via `@tailwindcss/vite` — no separate PostCSS/Autoprefixer needed, v4 handles both internally)
- [x] 3.2 ~~Configure `tailwind.config.ts` content paths~~ — Tailwind v4 auto-detects content from project files; no config file needed (documented in README)
- [x] 3.3 Add Tailwind directives to a base stylesheet under `src/styles/` (`@import "tailwindcss";` — v4 syntax)
- [x] 3.4 Verify a Tailwind utility class renders correctly in the app

## 4. Routing

- [x] 4.1 Install `react-router-dom`
- [x] 4.2 Set up a router with a single placeholder home route
- [x] 4.3 Create `src/pages/Home.tsx` as the placeholder landing page

## 5. Source Folder Structure

- [x] 5.1 Create `src/components/`, `src/pages/`, `src/hooks/`, `src/lib/`, `src/types/`, `src/styles/`
- [x] 5.2 Add a `.gitkeep` or minimal placeholder file in any empty folders so structure is committed
- [x] 5.3 Move/rename default Vite scaffold files (`App.tsx`, `main.tsx`) to match the conventions in design.md

## 6. Linting and Formatting

- [x] 6.1 Install and configure ESLint (flat config) for TypeScript + React
- [x] 6.2 Install and configure Prettier, including an `.prettierrc` and `.prettierignore`
- [x] 6.3 Ensure ESLint and Prettier don't conflict (e.g. `eslint-config-prettier`)
- [x] 6.4 Add `npm run lint` and `npm run format` (and a `format:check` for CI) scripts
- [x] 6.5 Run lint and format against the scaffolded code and fix any violations

## 7. Testing

- [x] 7.1 Install Vitest, React Testing Library, and jsdom
- [x] 7.2 Add `vitest.config.ts` (or extend `vite.config.ts`) with the jsdom environment
- [x] 7.3 Add `npm run test` script
- [x] 7.4 Write one smoke test that renders the placeholder home page and asserts it displays

## 8. Environment Configuration

- [x] 8.1 Add `.env.example` documenting any environment variables the app reads
- [x] 8.2 Add a small typed helper (e.g. `src/lib/env.ts`) for reading `import.meta.env` values

## 9. Documentation

- [x] 9.1 Write `README.md` covering: prerequisites, install, `npm run dev/build/lint/format/test/typecheck`, and folder structure
- [x] 9.2 Document the stack decisions briefly (link to `design.md` for full rationale)

## 10. Verification

- [x] 10.1 Run `npm run typecheck`, `npm run lint`, `npm run test`, and `npm run build` and confirm all pass cleanly
- [x] 10.2 Load the dev server and confirm the placeholder home page + Tailwind styles serve correctly (verified via HTTP/HTML/CSS transform output — no browser tool available in this session to visually screenshot)
