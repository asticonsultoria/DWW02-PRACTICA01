# Implementation Plan: Frontend CRUD de Empleados

**Branch**: `001-angular-empleados-crud` | **Date**: 2026-03-19 | **Spec**: [/specs/001-angular-empleados-crud/spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-angular-empleados-crud/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Construir un frontend Angular 21 LTS para gestionar el CRUD de empleados sobre el backend
existente, con autenticacion Basic Auth desde UI y credenciales persistidas en localStorage.
El frontend ofrecera listado, alta, edicion y eliminacion, aplicando validaciones de formulario,
politica de ultima escritura gana y manejo de errores sin reintentos automaticos. Para entorno
integrado se ejecutara en Docker como artefacto estatico servido por Nginx, conectado al backend
en Docker Compose.

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: Java 17 (backend existente) y TypeScript 5 + Angular 21 LTS (frontend)  
**Primary Dependencies**: Angular 21, Angular Router, Reactive Forms, RxJS, HttpClient, Nginx para serving estatico  
**Storage**: PostgreSQL en backend (existente) y localStorage para credenciales de sesion en frontend  
**Testing**: Angular unit/component tests para UI y servicios HTTP; validacion manual E2E sobre Docker Compose integrado  
**Target Platform**: Navegadores modernos y runtime Linux con contenedores Docker
**Project Type**: Full-stack (backend existente + nuevo frontend Angular)  
**Performance Goals**: Feedback de error por backend no disponible en <=2 segundos; operaciones CRUD exitosas visibles en UI tras refresco  
**Constraints**: Sin reintentos automaticos, sin logout explicito en esta entrega, politica de ultima escritura gana  
**Scale/Scope**: Una entidad (Empleado), 1 modulo principal CRUD, uso interno de baja concurrencia (operacion de equipo)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] Uses Spring Boot 3 + Java 17 without introducing incompatible runtime/tooling.
- [x] Enforces HTTP Basic authentication for all protected endpoints.
- [x] Uses PostgreSQL and defines Docker-based local/integration execution.
- [x] Includes migration strategy for schema changes (Flyway/Liquibase or equivalent).
- [x] Commits OpenAPI/Swagger updates for all endpoint contract changes.
- [x] If frontend scope exists, uses Angular 21 LTS and provides Dockerized frontend runtime.
- [x] Defines build/test quality gates that block merge on failures.

**Post-Design Re-check (after Phase 1)**

- [x] research.md define decisiones de autenticacion, concurrencia, manejo de errores y Docker/Nginx.
- [x] data-model.md describe entidades de UI y reglas de validacion alineadas al contrato de empleados.
- [x] contracts/frontend-ui-contract.md define rutas de UI, contrato de consumo API y comportamiento de sesion.
- [x] quickstart.md documenta ejecucion integrada frontend-backend en Docker Compose.
- [x] No hay violaciones constitucionales activas.

## Project Structure

### Documentation (this feature)

```text
specs/001-angular-empleados-crud/
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
├── controller/
├── service/
├── repository/
├── model/
└── dto/

src/main/resources/
├── application.yml
└── db/migration/

src/test/java/com/example/empleados/
├── unit/
├── integration/
└── api/

docker/
└── docker-compose.yml

frontend/
├── src/
├── package.json
├── nginx.conf
└── Dockerfile
```

**Structure Decision**: Se mantiene backend sin cambios estructurales y se agrega un proyecto
frontend independiente en carpeta frontend para separar responsabilidades UI. El servicio frontend
se integrara al docker-compose existente con imagen de build estatico servida por Nginx.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |
