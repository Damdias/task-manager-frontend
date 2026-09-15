## 1. Dependencies & Query Setup

- [x] 1.1 Add `axios` and `@tanstack/react-query` to `package.json`
- [x] 1.2 Add `VITE_API_BASE_URL` to `.env.example` and read it via `src/lib/env.ts`
- [x] 1.3 Wrap the app in `QueryClientProvider` in `App.tsx` (additive — existing `Home` route keeps working)

## 2. Task Types

- [x] 2.1 Create `src/types/task.ts`: `Task`, `TaskStatus`, `CreateTaskRequest` mirroring `TaskDto`/`CreateTaskRequest` (PRD §6)

## 3. API Client (task-data-access)

- [x] 3.1 Create `src/api/client.ts`: Axios instance with base URL from env
- [x] 3.2 Add a shared error-parsing helper in `client.ts` that normalizes `{ message, errors }` 400 responses into a typed `ApiError`
- [x] 3.3 Create `src/api/tasks.ts`: `getTasks()` (`GET /api/tasks`) and `createTask(payload)` (`POST /api/tasks`)

## 4. Query Hooks (task-data-access)

- [x] 4.1 Create `src/hooks/useTasks.ts` — `useQuery` under key `['tasks']` wrapping `getTasks()`
- [x] 4.2 Create `src/hooks/useCreateTask.ts` — `useMutation` wrapping `createTask()`, invalidates `['tasks']` on success
- [x] 4.3 Unit test both hooks with a mocked `api/tasks` module (success and error paths)

## 5. Task List Page (task-list-view)

- [x] 5.1 Create `src/pages/TaskListPage.tsx` using `useTasks()`
- [x] 5.2 Implement loading state
- [x] 5.3 Implement error state
- [x] 5.4 Implement empty-state message ("No tasks yet — add one to get started")
- [x] 5.5 Render fetched tasks as a plain list (name + status) when present
- [x] 5.6 Wire `TaskListPage` into the router, replacing/alongside the placeholder `Home` route
- [x] 5.7 Unit test all four states (loading, error, empty, populated) with mocked `useTasks`

## 6. Create Task Form (task-create)

- [x] 6.1 Create `src/components/TaskForm/TaskFormModal.tsx` with a `mode: 'create' | 'edit'` prop (only `create` wired up in this change); Name and Description fields, no Status field
- [x] 6.2 Add "Add Task" action on `TaskListPage` that opens `TaskFormModal` in create mode
- [x] 6.3 Wire submit to `useCreateTask()`; close the modal and clear fields on success
- [x] 6.4 Render field-level errors from `ApiError` inline per field on a failed (400) submission; keep the modal open
- [x] 6.5 Unit test: submit with only Name, submit with Name+Description, empty-Name error path, over-length error path

## 7. Verification

- [x] 7.1 Run `npm run typecheck`, `npm run lint`, `npm run test`, and `npm run build` — all pass
- [ ] 7.2 Manually verify against a running backend once `POST /api/tasks` exists: create a task via the UI, confirm it appears in the list; submit an empty Name and confirm the inline error appears without creating a task
