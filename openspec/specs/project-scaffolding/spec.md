# project-scaffolding Specification

## Purpose

TBD - defines the baseline project scaffolding for the frontend: build tooling, type checking, linting/formatting, test runner, base routing, source layout conventions, environment configuration, and project documentation.

## Requirements

### Requirement: Application build and dev server
The system SHALL provide a Vite-based React + TypeScript project that runs a local dev server and produces a production build.

#### Scenario: Start local dev server
- **WHEN** a developer runs `npm run dev`
- **THEN** a local dev server starts and serves the app with hot module reload

#### Scenario: Produce production build
- **WHEN** a developer runs `npm run build`
- **THEN** a production-optimized build is emitted with no build errors

### Requirement: Type checking
The system SHALL enforce TypeScript strict-mode type checking across the codebase.

#### Scenario: Type check passes on clean code
- **WHEN** a developer runs `npm run typecheck` on the scaffolded codebase
- **THEN** the command exits successfully with zero type errors

#### Scenario: Type check fails on type error
- **WHEN** a source file contains a type error
- **THEN** `npm run typecheck` exits with a non-zero status and reports the error location

### Requirement: Linting and formatting
The system SHALL provide ESLint and Prettier configuration enforced via npm scripts.

#### Scenario: Lint passes on clean code
- **WHEN** a developer runs `npm run lint` on the scaffolded codebase
- **THEN** the command exits successfully with zero lint errors

#### Scenario: Format check enforces style
- **WHEN** a developer runs the format-check script on a file with inconsistent formatting
- **THEN** the command reports the file as needing formatting

### Requirement: Test runner
The system SHALL provide a Vitest + React Testing Library setup with at least one passing smoke test.

#### Scenario: Run test suite
- **WHEN** a developer runs `npm run test`
- **THEN** the smoke test executes and passes, confirming the test pipeline works end to end

### Requirement: Base routing
The system SHALL provide client-side routing via React Router with at least one placeholder route.

#### Scenario: Load default route
- **WHEN** a user loads the app's root URL
- **THEN** the app renders the placeholder home page without errors

### Requirement: Conventional source layout
The system SHALL organize source code under `src/` using a fixed set of top-level folders: `components`, `pages`, `hooks`, `lib`, `types`, `styles`.

#### Scenario: New code has a defined home
- **WHEN** a developer adds a new UI component, page, hook, or utility
- **THEN** there is an existing folder under `src/` matching that code's category

### Requirement: Environment configuration
The system SHALL support typed environment variable access with a documented example file.

#### Scenario: Missing env example
- **WHEN** a developer clones the repo and inspects the root
- **THEN** a `.env.example` file documents all environment variables the app reads

### Requirement: Project documentation
The system SHALL include a README documenting setup steps, available npm scripts, and folder conventions.

#### Scenario: New contributor onboarding
- **WHEN** a new contributor opens `README.md`
- **THEN** they find install, dev, build, lint, and test commands, plus a description of the `src/` folder layout
