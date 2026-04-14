# Tasks: CRUD de Empleados

**Input**: Design documents from `/specs/001-crud-empleados/`  
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Incluidas por requerimiento explícito de calidad y validación de seguridad, persistencia y generación de clave.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Inicializar proyecto y configuración base.

- [X] T001 Inicializar proyecto Maven Spring Boot en pom.xml
- [X] T002 Crear estructura base en src/main/java/com/example/empleados
- [X] T003 Configurar Maven Wrapper y comando de build estándar
- [X] T004 [P] Agregar dependencias OpenAPI/Swagger en pom.xml
- [X] T005 [P] Configurar archivo base en src/main/resources/application.yml

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Preparar seguridad, persistencia y generación de clave antes de historias.

**⚠️ CRITICAL**: No iniciar historias hasta completar esta fase.

- [X] T006 Crear Docker Compose PostgreSQL en docker/docker-compose.yml
- [X] T007 [P] Configurar datasource por variables de entorno en src/main/resources/application.yml
- [X] T008 [P] Crear migración con PK compuesta (`clave_prefijo`, `clave_numero`) en src/main/resources/db/migration/V1__create_empleado_table.sql
- [X] T009 [P] Implementar seguridad Basic Auth en src/main/java/com/example/empleados/config/SecurityConfig.java
- [X] T010 [P] Implementar configuración OpenAPI en src/main/java/com/example/empleados/config/OpenApiConfig.java
- [X] T011 Crear modelo de clave compuesta en src/main/java/com/example/empleados/model/EmpleadoId.java
- [X] T012 Crear entidad Empleado con clave compuesta en src/main/java/com/example/empleados/model/Empleado.java
- [X] T013 [P] Crear repositorio en src/main/java/com/example/empleados/repository/EmpleadoRepository.java
- [X] T014 [P] Crear DTOs base (sin `clave` en create request) en src/main/java/com/example/empleados/dto/EmpleadoRequest.java y src/main/java/com/example/empleados/dto/EmpleadoResponse.java
- [X] T015 Implementar generador de clave `EMP-<n>` en src/main/java/com/example/empleados/service/ClaveGeneratorService.java
- [X] T016 Implementar excepciones base en src/main/java/com/example/empleados/exception/ResourceNotFoundException.java
- [X] T017 Implementar manejador global de errores en src/main/java/com/example/empleados/exception/ApiExceptionHandler.java

**Checkpoint**: Fundación lista para desarrollar historias.

---

## Phase 3: User Story 1 - Registrar y listar empleados (Priority: P1) 🎯 MVP

**Goal**: Alta y listado de empleados con `clave` autogenerada.

**Independent Test**: Crear empleado sin enviar `clave` y verificar respuesta/listado con `EMP-<n>`.

### Tests for User Story 1

- [X] T018 [P] [US1] Prueba de contrato GET/POST en src/test/java/com/example/empleados/api/EmpleadoApiContractTest.java
- [X] T019 [P] [US1] Prueba integración alta/listado en src/test/java/com/example/empleados/integration/EmpleadoRepositoryIntegrationTest.java
- [X] T020 [P] [US1] Prueba unitaria de generación secuencial de clave en src/test/java/com/example/empleados/unit/ClaveGeneratorServiceTest.java
- [X] T021 [P] [US1] Prueba de rechazo o ignorado de `clave` enviada por cliente en src/test/java/com/example/empleados/api/EmpleadoCreateKeyInjectionTest.java

### Implementation for User Story 1

- [X] T022 [US1] Crear interfaz de servicio en src/main/java/com/example/empleados/service/EmpleadoService.java
- [X] T023 [US1] Implementar alta/listado con generación `EMP-<n>` en src/main/java/com/example/empleados/service/impl/EmpleadoServiceImpl.java
- [X] T024 [US1] Implementar POST /api/empleados (request sin `clave`) en src/main/java/com/example/empleados/controller/EmpleadoController.java
- [X] T025 [US1] Implementar GET /api/empleados en src/main/java/com/example/empleados/controller/EmpleadoController.java
- [X] T026 [US1] Aplicar validaciones de campos (1..100) en src/main/java/com/example/empleados/dto/EmpleadoRequest.java
- [X] T027 [US1] Documentar alta/listado y clave autogenerada en src/main/java/com/example/empleados/controller/EmpleadoController.java

**Checkpoint**: US1 completo y demostrable como MVP.

---

## Phase 4: User Story 2 - Actualizar datos de empleado (Priority: P2)

**Goal**: Actualizar `nombre`, `dirección` y `teléfono` por `clave`.

**Independent Test**: Actualizar registro existente identificado por `EMP-<n>`.

### Tests for User Story 2

- [X] T028 [P] [US2] Prueba de contrato PUT en src/test/java/com/example/empleados/api/EmpleadoUpdateApiContractTest.java
- [X] T029 [P] [US2] Prueba integración de actualización en src/test/java/com/example/empleados/integration/EmpleadoUpdateIntegrationTest.java
- [X] T030 [P] [US2] Prueba unitaria validaciones de actualización en src/test/java/com/example/empleados/unit/EmpleadoServiceUpdateTest.java

### Implementation for User Story 2

- [X] T031 [P] [US2] Crear DTO de actualización en src/main/java/com/example/empleados/dto/EmpleadoUpdateRequest.java
- [X] T032 [US2] Implementar actualización por `clave` en src/main/java/com/example/empleados/service/impl/EmpleadoServiceImpl.java
- [X] T033 [US2] Implementar PUT /api/empleados/{clave} en src/main/java/com/example/empleados/controller/EmpleadoController.java
- [X] T034 [US2] Documentar actualización en src/main/java/com/example/empleados/controller/EmpleadoController.java

**Checkpoint**: US2 completo sin degradar US1.

---

## Phase 5: User Story 3 - Consultar por clave y eliminar empleado (Priority: P3)

**Goal**: Consulta y eliminación por clave con validación de patrón.

**Independent Test**: Consultar y eliminar usando `EMP-<n>`; rechazar patrón inválido.

### Tests for User Story 3

- [X] T035 [P] [US3] Prueba de contrato GET/DELETE por clave en src/test/java/com/example/empleados/api/EmpleadoByClaveApiContractTest.java
- [X] T036 [P] [US3] Prueba integración consulta/eliminación en src/test/java/com/example/empleados/integration/EmpleadoDeleteIntegrationTest.java
- [X] T037 [P] [US3] Prueba unitaria not-found en src/test/java/com/example/empleados/unit/EmpleadoServiceNotFoundTest.java
- [X] T038 [P] [US3] Prueba API de patrón inválido `clave` en src/test/java/com/example/empleados/api/EmpleadoInvalidKeyPatternTest.java

### Implementation for User Story 3

- [X] T039 [US3] Implementar búsqueda por clave en src/main/java/com/example/empleados/service/impl/EmpleadoServiceImpl.java
- [X] T040 [US3] Implementar eliminación por clave en src/main/java/com/example/empleados/service/impl/EmpleadoServiceImpl.java
- [X] T041 [US3] Implementar GET /api/empleados/{clave} en src/main/java/com/example/empleados/controller/EmpleadoController.java
- [X] T042 [US3] Implementar DELETE /api/empleados/{clave} en src/main/java/com/example/empleados/controller/EmpleadoController.java
- [X] T043 [US3] Documentar consulta/eliminación y patrón `EMP-<n>` en src/main/java/com/example/empleados/controller/EmpleadoController.java

**Checkpoint**: US3 completo y CRUD cerrado.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Cerrar consistencia de contrato, calidad y operación.

- [X] T044 [P] Sincronizar contrato OpenAPI en specs/001-crud-empleados/contracts/empleados.openapi.yaml
- [X] T045 [P] Actualizar quickstart en specs/001-crud-empleados/quickstart.md
- [X] T046 Endurecer payload/códigos de error en src/main/java/com/example/empleados/exception/ApiExceptionHandler.java
- [X] T047 Añadir prueba de fail-fast sin DB en src/test/java/com/example/empleados/integration/StartupFailFastIntegrationTest.java
- [X] T048 Ejecutar suite completa de pruebas en src/test/java/com/example/empleados
- [X] T049 Ejecutar validación manual de quickstart en specs/001-crud-empleados/quickstart.md

---

## Dependencies & Execution Order

### Phase Dependencies

- Phase 1: sin dependencias.
- Phase 2: depende de Phase 1 y bloquea historias.
- Phases 3, 4, 5: dependen de Phase 2.
- Phase 6: depende de historias seleccionadas.

### User Story Dependencies

- **US1**: inicia tras fundación.
- **US2**: usa base de servicio/controlador creada en US1.
- **US3**: usa base de servicio/controlador creada en US1.

### Within Each User Story

- Primero tests (deben fallar).
- Luego implementación de servicio.
- Después endpoints.
- Finalmente documentación de contrato.

---

## Parallel Opportunities

- Setup: T004, T005.
- Foundational: T007, T008, T009, T010, T013, T014.
- US1: T018, T019, T020, T021.
- US2: T028, T029, T030, T031.
- US3: T035, T036, T037, T038.
- Polish: T044, T045.

---

## Notes

- Todas las tareas mantienen formato checklist y ruta de archivo.
- Tareas sin etiqueta `[USx]` pertenecen a setup/foundation/polish.
- La clave `EMP-<n>` se considera regla transversal de dominio y contrato.
