# Implementation Plan: [FEATURE]

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link]
**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

[Extract from feature spec: primary requirement + technical approach from research]

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: [Java 17 for backend (MANDATORY), TypeScript + Angular 21 LTS for frontend when present]  
**Primary Dependencies**: [Spring Boot 3.x, Spring Security, Spring Data JPA, OpenAPI/Swagger, Angular 21 LTS]  
**Storage**: [PostgreSQL via Docker/Compose for local and integration environments]  
**Testing**: [JUnit 5, Spring Boot Test, integration tests with PostgreSQL containerized runtime]  
**Target Platform**: [Linux server / container runtime, browser clients for frontend]
**Project Type**: [backend web-service or full-stack (backend + Angular frontend)]  
**Performance Goals**: [domain-specific, e.g., 1000 req/s, 10k lines/sec, 60 fps or NEEDS CLARIFICATION]  
**Constraints**: [domain-specific, e.g., <200ms p95, <100MB memory, offline-capable or NEEDS CLARIFICATION]  
**Scale/Scope**: [domain-specific, e.g., 10k users, 1M LOC, 50 screens or NEEDS CLARIFICATION]

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [ ] Uses Spring Boot 3 + Java 17 without introducing incompatible runtime/tooling.
- [ ] Enforces HTTP Basic authentication for all protected endpoints.
- [ ] Uses PostgreSQL and defines Docker-based local/integration execution.
- [ ] Includes migration strategy for schema changes (Flyway/Liquibase or equivalent).
- [ ] Commits OpenAPI/Swagger updates for all endpoint contract changes.
- [ ] If frontend scope exists, uses Angular 21 LTS and provides Dockerized frontend runtime.
- [ ] Defines build/test quality gates that block merge on failures.

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
src/main/java/.../
├── config/
├── controller/
├── service/
├── repository/
├── model/
└── dto/

src/main/resources/
├── application.yml
└── db/migration/

src/test/java/.../
├── unit/
├── integration/
└── api/

docker/
└── docker-compose.yml

frontend/
├── src/
├── package.json
└── Dockerfile
```

**Structure Decision**: [Document the selected structure and reference the real
directories captured above]

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
