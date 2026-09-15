## ADDED Requirements

### Requirement: Task List Loading State
The `TaskListPage` SHALL show a visible loading indicator while the task list request is in flight.

#### Scenario: List request in flight
- **WHEN** `useTasks()` reports its loading state as true
- **THEN** the page shows a loading indicator instead of an empty or partially-rendered list

### Requirement: Task List Error State
The `TaskListPage` SHALL show a visible error state when the task list request fails, instead of a blank screen.

#### Scenario: List request fails
- **WHEN** `useTasks()` reports an error
- **THEN** the page shows an error message instead of a blank screen or a stuck loading indicator

### Requirement: Task List Empty State
The `TaskListPage` SHALL show an explicit empty-state message when no tasks exist.

#### Scenario: No tasks exist
- **WHEN** `useTasks()` resolves with an empty array
- **THEN** the page shows the message "No tasks yet — add one to get started" instead of a blank list

### Requirement: Task List Rendering
The `TaskListPage` SHALL render each fetched task's name and status as a plain list item when tasks exist. Full card-style presentation (creation date, status badges) is delivered by a later change.

#### Scenario: Tasks exist
- **WHEN** `useTasks()` resolves with one or more tasks
- **THEN** each task's name and status are visible on the page, and a newly created task appears in this list after creation
