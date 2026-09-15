## ADDED Requirements

### Requirement: Add Task Entry Point
The `TaskListPage` SHALL provide an "Add Task" action that opens `TaskFormModal` in create mode with empty Name and Description fields and no Status control.

#### Scenario: Opening the create form
- **WHEN** the user activates "Add Task"
- **THEN** `TaskFormModal` opens with empty Name and Description fields, and no Status field is shown

### Requirement: Task Creation Submission
Submitting the create form SHALL send the entered Name and Description to `useCreateTask()`, close the modal on success, and rely on the resulting `['tasks']` refetch to display the new task.

#### Scenario: Submit with only Name
- **WHEN** the user fills in only the Name field and submits
- **THEN** the task is created, the modal closes, and the task appears in the list with `Pending` status

#### Scenario: Submit with Name and Description
- **WHEN** the user fills in both Name and Description and submits
- **THEN** the task is created with both values saved as entered

### Requirement: Field-Level Validation Error Display
When a create submission returns a `400` validation response, `TaskFormModal` SHALL render each field-level error inline next to its corresponding field, keep the modal open, and SHALL NOT treat the submission as successful.

#### Scenario: Empty Name submitted
- **WHEN** the user submits the form with an empty Name field
- **THEN** an inline error is shown on the Name field, the modal remains open, and no task is added to the list

#### Scenario: Name or Description exceeds length limit
- **WHEN** the user submits a Name over 200 characters or a Description over 2000 characters
- **THEN** an inline error is shown on the offending field, the modal remains open, and no task is added to the list
