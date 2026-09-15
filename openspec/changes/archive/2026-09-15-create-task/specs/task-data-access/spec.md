## ADDED Requirements

### Requirement: Task Type Definitions
The system SHALL define TypeScript types under `types/task.ts` that mirror the backend `TaskDto` and `CreateTaskRequest` shapes (PRD §6), including `id`, `name`, `description` (nullable), `status`, `createdDate`, and `completedDate` (nullable).

#### Scenario: Type matches API contract
- **WHEN** a `GET /api/tasks` response is received
- **THEN** each item can be assigned to the `Task` type without a cast or type error

### Requirement: Configured API Client
The system SHALL provide a single Axios instance (`api/client.ts`) configured with the API base URL, used by all task API calls, and a shared helper that parses backend error responses (`{ message, errors }`, PRD §6) into a typed error object.

#### Scenario: Validation error is parsed
- **WHEN** a request receives a `400` response with a `{ message, errors: { name: ["Name is required."] } }` body
- **THEN** the shared error helper returns an object exposing the top-level message and a per-field error map that callers can render without re-parsing the raw Axios error

### Requirement: Task List Query Hook
The system SHALL provide a `useTasks()` hook that fetches the task list via `GET /api/tasks` using TanStack Query under the query key `['tasks']`.

#### Scenario: Hook fetches the list
- **WHEN** a component calls `useTasks()`
- **THEN** a `GET /api/tasks` request is issued and the resolved array is returned as the hook's `data`

#### Scenario: Query key matches convention
- **WHEN** `useTasks()` is called with no filter
- **THEN** the underlying query is registered under the key `['tasks']`

### Requirement: Task Creation Mutation Hook
The system SHALL provide a `useCreateTask()` hook that submits `POST /api/tasks` with a `CreateTaskRequest` body and invalidates the `['tasks']` query on success.

#### Scenario: Successful creation refreshes the list
- **WHEN** `useCreateTask()`'s mutate function resolves successfully
- **THEN** the `['tasks']` query is invalidated so the list refetches, and no manual cache patch is performed

#### Scenario: Failed creation does not invalidate
- **WHEN** `useCreateTask()`'s mutate function rejects (e.g. a `400` validation error)
- **THEN** the `['tasks']` query is not invalidated and the parsed error is available to the caller
