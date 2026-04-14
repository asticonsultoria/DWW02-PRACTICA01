# Implementation Plan: CRUD de Empleados

**Branch**: `001-crud-empleados` | **Date**: 2026-02-26 | **Spec**: [/specs/001-crud-empleados/spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-crud-empleados/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Implementar un backend CRUD de empleados con los campos `nombre`, `dirección` y `teléfono` en
entrada, generando la `clave` en backend con formato `EMP-` + autonumérico como identificador
primario compuesto lógico (`prefijo` + `secuencia`). El sistema aplicará validación de longitud
máxima de 100 caracteres para campos textuales, autenticación HTTP Basic, persistencia en
PostgreSQL ejecutado con Docker y documentación API en Swagger/OpenAPI. El enfoque técnico usa
arquitectura por capas de Spring Boot 3 + Java 17 con migraciones versionadas y pruebas
unitarias/integración para validar reglas de negocio, generación de clave, persistencia y
seguridad.

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: Java 17  
**Primary Dependencies**: Spring Boot 3.x, Spring Web, Spring Data JPA, Spring Security,
springdoc-openapi, Bean Validation, PostgreSQL JDBC driver  
**Storage**: PostgreSQL 15+ en Docker Compose (dev/integration), con migraciones Flyway  
**Testing**: JUnit 5, Spring Boot Test, MockMvc, pruebas integración con DB de Docker Compose  
**Target Platform**: Linux server con contenedores Docker
**Project Type**: backend web-service REST  
**Performance Goals**: p95 < 2s en operaciones CRUD bajo carga normal (≤ 100 req/min)  
**Constraints**: Validación estricta de longitudes, credenciales por variables de entorno,
`clave` no aceptada desde cliente en creación, Swagger actualizado por PR  
**Scale/Scope**: CRUD de una entidad (`Empleado`) para uso interno autenticado, sin paginación
en esta iteración

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] Uses Spring Boot 3 + Java 17 without introducing incompatible runtime/tooling.
- [x] Enforces HTTP Basic authentication for all protected endpoints.
- [x] Uses PostgreSQL and defines Docker-based local/integration execution.
- [x] Includes migration strategy for schema changes (Flyway/Liquibase or equivalent).
- [x] Commits OpenAPI/Swagger updates for all endpoint contract changes.
- [x] Defines build/test quality gates that block merge on failures.

**Post-Design Re-check (after Phase 1)**

- [x] `research.md` defines security, migrations, API error contract, and test strategy.
- [x] `data-model.md` enforces domain constraints (`clave` autogenerada `EMP-<n>` + longitudes máximas).
- [x] `contracts/empleados.openapi.yaml` specifies CRUD endpoints + Basic Auth + validation rules.
- [x] `quickstart.md` documents Docker PostgreSQL startup and verification workflow.
- [x] No constitutional violations detected; no exception justification required.

## Project Structure

### Documentation (this feature)

```text
specs/001-crud-empleados/
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
src/main/java/com/example/empleados/
├── config/
│   ├── SecurityConfig.java
│   └── OpenApiConfig.java
├── controller/
│   └── EmpleadoController.java
├── service/
│   ├── EmpleadoService.java
│   ├── ClaveGeneratorService.java
│   └── impl/EmpleadoServiceImpl.java
├── repository/
│   └── EmpleadoRepository.java
├── model/
│   ├── EmpleadoId.java
│   └── Empleado.java
├── dto/
│   ├── EmpleadoRequest.java
│   └── EmpleadoResponse.java
└── exception/
  ├── ApiExceptionHandler.java
  └── ResourceNotFoundException.java

src/main/resources/
├── application.yml
└── db/migration/
  └── V1__create_empleado_table.sql

src/test/java/com/example/empleados/
├── unit/
├── integration/
└── api/

docker/
└── docker-compose.yml
```

**Structure Decision**: Se adopta estructura única backend Spring por capas para minimizar
complejidad, facilitar trazabilidad de validaciones de dominio y separar claramente contratos API
(controller/dto) de persistencia (repository/model).

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |
