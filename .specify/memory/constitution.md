<!--
Sync Impact Report
- Version change: 1.0.0 → 1.1.0
- Modified principles:
	- None
- Added principles:
	- VI. Angular 21 LTS Frontend in Docker (MANDATORY)
- Added sections:
	- None
- Removed sections:
	- None
- Templates requiring updates:
	- ✅ .specify/templates/plan-template.md
	- ✅ .specify/templates/spec-template.md
	- ✅ .specify/templates/tasks-template.md
	- ✅ .specify/templates/commands/*.md (not present, no update required)
	- ✅ README.md and docs/quickstart.md (not present, no update required)
- Follow-up TODOs:
	- None
-->

# DSW02-Practica01 Constitution

## Core Principles

### I. Spring Boot 3 + Java 17 Baseline (MANDATORY)
All backend services MUST use Spring Boot 3 and Java 17 as the runtime baseline. New code
MUST follow layered architecture boundaries (controller, service, repository, model/dto) and
MUST preserve backward compatibility inside a feature branch unless an explicit migration is
approved in the specification. Rationale: a fixed platform baseline reduces integration drift
and keeps build/runtime behavior predictable across local and CI environments.

### II. Basic Authentication by Default
All HTTP endpoints beyond health checks MUST require HTTP Basic authentication via Spring
Security. Credentials MUST be externalized through environment variables or secret managers;
hardcoded credentials are prohibited. Role and access requirements MUST be explicitly stated in
each feature specification. Rationale: security posture is non-optional and must be enforced
consistently from the first increment.

### III. PostgreSQL Persistence with Docker Runtime
Persistent relational data MUST use PostgreSQL. Local development and integration testing MUST
run PostgreSQL through Docker (Docker Compose preferred), including reproducible service names,
ports, and seed/migration execution. Application startup MUST fail fast with explicit error
messages when database connectivity is unavailable. Rationale: consistent containerized data
infrastructure minimizes environment-specific bugs and onboarding friction.

### IV. Swagger/OpenAPI as Contract Documentation
Every REST endpoint MUST be represented in OpenAPI and exposed through Swagger UI. API docs MUST
be updated within the same pull request as endpoint changes, including auth requirements,
request/response schemas, and error codes. No endpoint is considered complete until it is
visible and accurate in Swagger. Rationale: API contracts must remain discoverable and
verifiable for consumers and reviewers.

### V. Quality Gates and Test Discipline
Every feature MUST include automated tests proportional to risk: unit tests for business logic,
integration tests for repository and security behavior, and API-level tests for critical flows.
CI MUST fail on test or build failures; merging with failing quality gates is prohibited.
Rationale: enforceable quality gates prevent regressions in authentication, persistence, and API
contracts.

### VI. Angular 21 LTS Frontend in Docker (MANDATORY)
Any user-facing web frontend in this repository MUST use Angular 21 LTS. The frontend MUST be
runnable through Docker for local development and integration flows, either as a dedicated
container or as part of Docker Compose. Frontend container configuration MUST define reproducible
ports, environment wiring to backend APIs, and production-grade build steps. Rationale: locking
framework version and container runtime prevents frontend/toolchain drift and ensures consistent
execution across machines and CI.

## Technical Standards

- Build tooling MUST use Maven Wrapper (`./mvnw`) where available.
- Database schema changes MUST be versioned through migrations (e.g., Flyway or Liquibase).
- Runtime configuration MUST come from environment variables or profile-based configuration.
- Docker artifacts MUST define explicit image tags and non-default credentials for production.
- Frontend projects MUST use Angular 21 LTS and define a Dockerfile (or Compose service) for
	deterministic local/CI execution.
- Sensitive values MUST NOT be committed to source control.

## Delivery Workflow & Review Gates

1. Specifications MUST define authentication scope, PostgreSQL impact, and Swagger updates.
2. Plans MUST include a constitution check proving stack, security, DB, and docs alignment.
3. Tasks MUST include explicit work items for security config, Dockerized Postgres, migrations,
   and OpenAPI updates.
4. Pull requests that include frontend scope MUST include evidence of Angular 21 LTS alignment
	and working Dockerized frontend startup.
5. Pull requests MUST include evidence of passing tests and an updated Swagger surface.
6. Reviewer approval MUST reject any change that violates a MUST-level constitutional rule.

## Governance
This constitution overrides conflicting local practices for this repository.

Amendment procedure:
1. Propose change with rationale and impacted principles/sections.
2. Obtain maintainer approval in a tracked pull request.
3. Update dependent templates and guidance documents in the same change.
4. Record a Sync Impact Report at the top of this file.

Versioning policy:
- MAJOR: incompatible governance changes or principle removal/redefinition.
- MINOR: new principle/section or materially expanded mandatory guidance.
- PATCH: clarifications, wording, typo fixes, non-semantic refinements.

Compliance review expectations:
- Every plan and pull request MUST include a constitution compliance check.
- Violations of MUST statements block merge until resolved or constitution is amended.
- Compliance evidence (tests, docs, config) MUST be auditable in repository artifacts.

**Version**: 1.1.0 | **Ratified**: 2026-02-25 | **Last Amended**: 2026-03-19
