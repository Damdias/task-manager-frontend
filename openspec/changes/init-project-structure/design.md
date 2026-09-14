## Context

The `frontend` repository for `usecase-task-breakdown` currently contains only OpenSpec/Claude workflow scaffolding — no `package.json`, no source tree, no build tooling. There is no existing convention to follow, so this design fixes the initial stack and structure that every future frontend change will build on. No tech stack was mandated by the requester beyond "frontend repo," so choices below favor a mainstream, low-friction, widely-documented stack over novelty.

## Goals / Non-Goals

**Goals:**
- Stand up a buildable, runnable, lintable, testable React/TypeScript SPA with zero application features yet.
- Establish folder structure and naming conventions future changes will follow.
- Wire up dev ergonomics: fast dev server, type checking, linting/formatting, a test runner, and npm scripts for each.
- Keep the setup minimal — no state management library, API client, or UI component library until a real feature requires one.

**Non-Goals:**
- No actual application features (task breakdown UI, API integration) — this change is scaffolding only.
- No CI/CD pipeline configuration (can follow in a separate change once hosting/CI provider is decided).
- No component library or design system beyond Tailwind base styles.
- No authentication, backend integration, or environment-specific deployment config.

## Decisions

- **Framework: React + TypeScript + Vite** (over Next.js). Rationale: this is a pure frontend repo with no stated need for SSR/SSG or API routes; Vite gives a faster, simpler dev loop for a client-only SPA. If server rendering or API routes become necessary later, migrating to Next.js is a contained follow-up change, not a rewrite of app logic.
- **Styling: Tailwind CSS** (over CSS Modules or styled-components). Rationale: fastest to scaffold consistent UI without hand-rolling a design system, widely adopted, pairs well with utility-first component composition.
- **Routing: React Router**. Rationale: de facto standard for client-side routing in non-Next React apps; only added once more than one route exists, kept minimal here (one placeholder route).
- **Testing: Vitest + React Testing Library** (over Jest). Rationale: Vitest shares Vite's config/transform pipeline, avoiding duplicate build config and being noticeably faster; RTL is the standard for component-behavior testing.
- **Linting/Formatting: ESLint (flat config) + Prettier**, TypeScript in `strict` mode. Rationale: catch errors early, keep formatting non-negotiable and automated rather than debated in review.
- **Package manager: npm**. Rationale: zero extra tooling to install, ships with Node; can be revisited if the team has an existing preference (pnpm/yarn) — flagged as an open question below.
- **Folder structure**: `src/{components,pages,hooks,lib,types,styles}` — a conventional, shallow layout. Rationale: easy to navigate for a fresh repo; avoids premature feature-based modularization before there are enough features to justify it.

## Risks / Trade-offs

- [Vite/SPA chosen without confirmed hosting/SEO requirements] → If SSR or SEO later becomes a hard requirement, migrating routing/data-fetching to Next.js requires rework. Mitigation: keep route/page components free of Vite-specific APIs where reasonably possible.
- [No component library] → Early UI work may feel slower without prebuilt components. Mitigation: intentional — avoids adopting a dependency before UI needs are known.
- [npm chosen without team confirmation] → If the team standardizes on pnpm/yarn elsewhere, lockfile/tooling would need to be redone. Mitigation: cheap to change now, before any dependency graph exists.

## Migration Plan

Not applicable — this is a greenfield scaffold with no existing app or users to migrate. Rollback, if needed, is simply reverting the commit(s) that introduce the scaffold since no other code depends on it yet.

## Open Questions

- Should the package manager be npm, pnpm, or yarn — is there an existing convention on the backend/other repos in this org to match?
- Will this frontend need SSR/SEO in the near term (which would favor Next.js over Vite)?
- Is there an existing design system, brand palette, or component library (internal or third-party) this should align with instead of bare Tailwind?
