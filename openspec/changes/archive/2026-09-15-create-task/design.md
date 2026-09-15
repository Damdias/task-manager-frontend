## Context

The frontend has only generic scaffolding (Vite, TS, Tailwind, Router, ESLint/Prettier, Vitest) — no HTTP client, no data-fetching layer, and no task UI. ADR-0004 already fixed the intended stack (Vite + TS + Tailwind + TanStack Query + Axios) and the rule that `hooks/` is the sole network boundary — no component calls Axios/React Query directly. This change is the first to actually build against that architecture, so it has to lay the foundation (client, types, query setup) as well as deliver the user-visible slice (US-01: create a task, and just enough list rendering to see it).

The backend is ahead of the frontend for `GET /api/tasks` (returns `[]` from a real SQLite-backed endpoint) but has no `POST /api/tasks` yet — that's a separate, backend-repo change not covered here. This design treats the create endpoint as a contract (per PRD §6) that the frontend codes against, without depending on its delivery timeline to be built or tested in isolation (mocked at the Axios layer in tests).

## Goals / Non-Goals

**Goals:**
- Stand up `api/client.ts`, `api/tasks.ts`, `types/task.ts`, and `QueryClientProvider` wiring — the reusable foundation every later feature (2–6) builds on.
- Deliver `useTasks`/`useCreateTask` and a bare `TaskListPage` + `TaskFormModal` sufficient to satisfy US-01's acceptance criteria end-to-end once the backend `POST` exists.
- Follow the exact query-key convention (`['tasks']`) and invalidate-on-success pattern from architecture.md so later features don't need to rework this.

**Non-Goals:**
- Full `TaskCard`/`StatusBadge` list presentation (Feature 2) — bare rendering (name + status text) is enough to prove a created task appears.
- Filtering, edit, status-change, delete (Features 3–6).
- Building or mocking the backend `POST /api/tasks` endpoint itself — out of this (frontend) repo's OpenSpec store.

## Decisions

**1. `TaskFormModal` is built create-only now, structured for reuse in Feature 4 (edit).**
Alternative considered: a separate `CreateTaskModal` component, refactored into a shared form later. Rejected — architecture.md explicitly names `TaskFormModal` as "shared create/edit form"; building the create-only path with a `mode: 'create' | 'edit'` prop from the start avoids a near-term rewrite when Feature 4 lands.

**2. `TaskListPage` renders tasks as a plain list (name + status), not `TaskCard`.**
Alternative: build `TaskCard`/`StatusBadge` now since the page needs to render something. Rejected — those components are Feature 2's explicit deliverable with their own acceptance criteria (creation-date display, status badge styling). Pulling them in early blurs feature boundaries and duplicates work when Feature 2 formalizes them. A plain list satisfies US-01's "task is created and visible" need without pre-building Feature 2.

**3. Error parsing lives in `api/client.ts` as a shared helper, not per-hook.**
Matches architecture.md §8.3: "Axios instance centralizes the API base URL and surfaces backend error payloads to the UI via a shared error-parsing helper." One helper normalizes the PRD §6 error shape (`{ message, errors }`) into a typed object hooks/components can consume, so Features 4/5 reuse it instead of re-parsing `AxiosError` themselves.

**4. `useCreateTask` invalidates `['tasks']` wholesale rather than patching the cache.**
Matches architecture.md's explicit "no manual cache patching" convention. At this dataset size (NFR2/NFR5 — small, single-user) a full refetch is cheap and keeps every mutation hook symmetric.

## Risks / Trade-offs

- **[Risk]** Backend `POST /api/tasks` doesn't exist yet, so the create flow can't be manually verified end-to-end until that lands → **Mitigation:** build `TaskFormModal`/`useCreateTask` against the PRD §6 contract, unit-test with a mocked Axios response, and re-verify manually once the backend change ships.
- **[Risk]** Bare list rendering (Decision 2) may look like a throwaway that gets rewritten in Feature 2 → **Mitigation:** keep the rendering logic minimal (a `<ul>` of names/status) so there's nothing costly to discard; the loading/error/empty-state logic in `TaskListPage` (the actual reusable part) carries forward unchanged.
- **[Risk]** Introducing `QueryClientProvider` in `App.tsx` touches the composition root shared with the existing placeholder `Home` route → **Mitigation:** additive change only (wrap existing router in the provider), no existing route behavior changes.

## Open Questions

- None blocking. The backend `POST /api/tasks` timeline is tracked separately (backend repo) and doesn't block writing or unit-testing this frontend slice, only end-to-end manual verification.
