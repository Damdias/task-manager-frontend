## Why

US-01 ("Create a task") is the first real feature in the build order (PRD §11, implementation-plan.md Feature 1), but the frontend currently has only generic Vite/React/Tailwind/Router scaffolding — no API client, no task types, no data-fetching hooks, and no task UI at all. Nothing exists yet to let a user create a task or see it appear anywhere, so this change also has to cover the Feature 0 frontend groundwork (Axios client, `useTasks`, a bare list page) that Feature 1 depends on, since it was never built.

## What Changes

- Add the Axios instance (`api/client.ts`) and `api/tasks.ts` (`getTasks`, `createTask`) per ADR-0004's hooks-as-network-boundary rule — no component calls Axios/React Query directly.
- Add `types/task.ts` mirroring the backend `TaskDto` / `CreateTaskRequest` (PRD §6).
- Install and wire up TanStack Query (`QueryClientProvider` in `App.tsx`); adopt the query key convention `['tasks']` for the list.
- Add `useTasks()` and `useCreateTask()` hooks; the create mutation invalidates `['tasks']` on success.
- Add `TaskListPage` (bare): renders fetched tasks, loading state, error state, and the "No tasks yet — add one to get started" empty state (US-02 AC, needed here only so a created task is visible — full `TaskCard`/`StatusBadge` display is out of scope, deferred to Feature 2).
- Add `TaskFormModal` (create mode only): Name (required, 1–200 chars) and Description (optional, ≤2000 chars) fields; Status is not editable here.
- Wire an "Add Task" action on `TaskListPage` that opens the modal and submits via `useCreateTask`.
- Render field-level `400` validation errors (PRD §6 error shape) inline on the form.

Out of scope for this change: filtering, edit, status transitions, delete, and the polished `TaskCard`/`StatusBadge` list display — those belong to later features (2–6) per implementation-plan.md.

## Capabilities

### New Capabilities
- `task-data-access`: Axios client, task types, and the TanStack Query hooks (`useTasks`, `useCreateTask`) that back all task screens — the network boundary per ADR-0004.
- `task-list-view`: the task list page — fetching, loading/error/empty states, and rendering created tasks (bare display; full card UI is a later change).
- `task-create`: the create-task form and flow — validation, submission, and surfacing field-level errors from the API.

### Modified Capabilities
(none — `project-scaffolding` provides the base tooling this builds on but its requirements are unchanged)

## Impact

- **Frontend code:** `src/api/`, `src/types/task.ts`, `src/hooks/`, `src/components/TaskForm/`, `src/pages/TaskListPage.tsx`, `App.tsx` (add `QueryClientProvider` and route).
- **Dependencies:** adds `@tanstack/react-query` and `axios` (not yet in `package.json`).
- **Backend dependency (external, not built by this change):** requires `GET /api/tasks` (exists) and `POST /api/tasks` (does not exist yet — backend only has the bare `GET` from its walking-skeleton state). This change's UI can be built and unit-tested against a mocked API regardless, but end-to-end create will not work until the backend adds `POST /api/tasks` with validation (its own Feature 1 slice, out of scope here since this is the frontend-only OpenSpec store).
