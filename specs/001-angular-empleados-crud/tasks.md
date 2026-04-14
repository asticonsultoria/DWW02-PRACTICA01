# Tasks: Frontend CRUD de Empleados

**Input**: Design documents from `/specs/001-angular-empleados-crud/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/frontend-ui-contract.md, quickstart.md

**Tests**: Se incluyen tareas de pruebas porque el plan define pruebas unitarias/componentes Angular y verificacion integrada en Docker Compose.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Inicializar el proyecto frontend Angular 21 LTS y su estructura base.

- [X] T001 Crear workspace Angular 21 LTS en frontend/angular.json y frontend/package.json
- [X] T002 Crear configuracion TypeScript y build en frontend/tsconfig.json y frontend/tsconfig.app.json
- [X] T003 [P] Definir scripts npm de build/test/lint/start en frontend/package.json
- [X] T004 [P] Crear estructura base de aplicacion en frontend/src/main.ts y frontend/src/app/app.routes.ts
- [X] T005 [P] Crear estilos y layout base en frontend/src/styles.css y frontend/src/app/app.component.html

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Preparar infraestructura transversal de autenticacion, API y manejo de errores para todas las historias.

**CRITICAL**: Ninguna historia de usuario debe iniciar antes de completar esta fase.

- [X] T006 Configurar modelo de entorno y URL de API en frontend/src/environments/environment.ts
- [X] T007 [P] Implementar modelos compartidos de dominio y estado en frontend/src/app/core/models/empleado.models.ts
- [X] T008 [P] Implementar servicio de sesion con localStorage para Basic Auth en frontend/src/app/core/services/auth-session.service.ts
- [X] T009 [P] Implementar interceptor HTTP para Authorization Basic en frontend/src/app/core/interceptors/auth.interceptor.ts
- [X] T010 [P] Implementar interceptor de errores fail-fast sin retry en frontend/src/app/core/interceptors/error.interceptor.ts
- [X] T011 Implementar pagina de login y captura de credenciales en frontend/src/app/features/login/login.component.ts
- [X] T012 Implementar guard de rutas para proteger /empleados en frontend/src/app/core/guards/auth.guard.ts
- [X] T013 Registrar providers de HttpClient e interceptores en frontend/src/app/app.config.ts

**Checkpoint**: Base de autenticacion, comunicacion API y errores lista; ya se puede implementar cada historia.

---

## Phase 3: User Story 1 - Consultar y registrar empleados (Priority: P1) MVP

**Goal**: Permitir listado de empleados y alta desde la UI autenticada.

**Independent Test**: Login valido, carga de lista y creacion de empleado reflejada inmediatamente en la tabla.

### Tests for User Story 1

- [X] T014 [P] [US1] Crear pruebas unitarias de auth-session para persistencia localStorage en frontend/src/app/core/services/auth-session.service.spec.ts
- [X] T015 [P] [US1] Crear pruebas del interceptor auth para header Basic en frontend/src/app/core/interceptors/auth.interceptor.spec.ts
- [X] T016 [P] [US1] Crear pruebas de login component para 401/403 y guardado de credenciales en frontend/src/app/features/login/login.component.spec.ts
- [X] T017 [P] [US1] Crear pruebas de empleado service para GET/POST y errores 400/5xx en frontend/src/app/features/empleados/services/empleado-api.service.spec.ts

### Implementation for User Story 1

- [X] T018 [P] [US1] Implementar cliente API de empleados (GET y POST) en frontend/src/app/features/empleados/services/empleado-api.service.ts
- [X] T019 [P] [US1] Implementar componente de tabla/listado de empleados en frontend/src/app/features/empleados/components/empleado-list.component.ts
- [X] T020 [P] [US1] Implementar formulario reactivo de alta con validaciones 1..100 en frontend/src/app/features/empleados/components/empleado-create-form.component.ts
- [X] T021 [US1] Implementar pagina contenedora de empleados con carga inicial y mensajes UI en frontend/src/app/features/empleados/empleados-page.component.ts
- [X] T022 [US1] Configurar rutas /login y /empleados en frontend/src/app/app.routes.ts
- [X] T023 [US1] Integrar manejo de 401/403 para solicitar nuevas credenciales en frontend/src/app/features/login/login.component.ts

**Checkpoint**: US1 funcional de forma independiente (consultar y registrar empleados).

---

## Phase 4: User Story 2 - Editar y eliminar empleados (Priority: P2)

**Goal**: Completar operaciones de actualizacion y eliminacion sobre empleados existentes.

**Independent Test**: Editar y eliminar un empleado desde UI autenticada, validando persistencia y desaparicion en lista.

### Tests for User Story 2

- [X] T024 [P] [US2] Crear pruebas del cliente API para PUT/DELETE y 404 en frontend/src/app/features/empleados/services/empleado-api.service.spec.ts
- [X] T025 [P] [US2] Crear pruebas del formulario de edicion con validaciones en frontend/src/app/features/empleados/components/empleado-edit-form.component.spec.ts
- [X] T026 [P] [US2] Crear pruebas del flujo de eliminacion con confirmacion en frontend/src/app/features/empleados/components/empleado-list.component.spec.ts

### Implementation for User Story 2

- [X] T027 [P] [US2] Extender cliente API para PUT y DELETE por clave en frontend/src/app/features/empleados/services/empleado-api.service.ts
- [X] T028 [P] [US2] Implementar formulario reactivo de edicion de empleado en frontend/src/app/features/empleados/components/empleado-edit-form.component.ts
- [X] T029 [US2] Implementar accion de actualizar empleado en la pagina de empleados en frontend/src/app/features/empleados/empleados-page.component.ts
- [X] T030 [US2] Implementar accion de eliminar con confirmacion en frontend/src/app/features/empleados/components/empleado-list.component.ts
- [X] T031 [US2] Implementar mensajes de no encontrado y errores 400/404 en frontend/src/app/features/empleados/empleados-page.component.ts
- [X] T032 [US2] Documentar politica de concurrencia ultima escritura gana en frontend/src/app/features/empleados/README.md

**Checkpoint**: US2 funcional de forma independiente (editar y eliminar empleados).

---

## Phase 5: User Story 3 - Ejecutar frontend en Docker integrado al backend (Priority: P3)

**Goal**: Desplegar el frontend como build estatico en Nginx dentro de Docker Compose junto al backend.

**Independent Test**: Levantar compose integrado y ejecutar CRUD desde navegador contra backend contenedorizado.

### Tests for User Story 3

- [X] T033 [P] [US3] Crear script de smoke test de conectividad frontend-backend en docker/scripts/smoke-frontend-backend.sh
- [X] T034 [P] [US3] Crear checklist de verificacion integrada en specs/001-angular-empleados-crud/quickstart.md

### Implementation for User Story 3

- [X] T035 [P] [US3] Crear Dockerfile multi-stage de frontend Angular + Nginx en frontend/Dockerfile
- [X] T036 [P] [US3] Configurar Nginx para SPA y proxy/env runtime en frontend/nginx.conf
- [X] T037 [US3] Integrar servicio frontend en docker/docker-compose.yml
- [X] T038 [US3] Configurar inyeccion de URL de API para runtime docker en frontend/docker-entrypoint.sh
- [X] T039 [US3] Actualizar quickstart de ejecucion integrada en specs/001-angular-empleados-crud/quickstart.md

**Checkpoint**: US3 funcional de forma independiente (frontend dockerizado e integrado al backend).

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Endurecer calidad transversal, documentacion final y validacion de entrega.

- [X] T040 [P] Ejecutar y ajustar lint/frontend quality gates en frontend/package.json
- [X] T041 [P] Consolidar mensajes de error y exito reutilizables en frontend/src/app/shared/components/feedback-banner.component.ts
- [X] T042 Verificar cumplimiento FR-014 fail-fast y FR-016 sin logout en frontend/src/app/core/interceptors/error.interceptor.ts
- [ ] T043 Ejecutar validacion completa de quickstart en specs/001-angular-empleados-crud/quickstart.md
- [X] T044 Actualizar documentacion de frontend y docker en frontend/README.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: sin dependencias.
- **Phase 2 (Foundational)**: depende de Phase 1 y bloquea todas las historias.
- **Phase 3 (US1)**: depende de Phase 2.
- **Phase 4 (US2)**: depende de Phase 2 y reutiliza componentes de US1.
- **Phase 5 (US3)**: depende de Phase 2 y de artefacto build frontend de US1/US2.
- **Phase 6 (Polish)**: depende de las historias que se quieran incluir en la entrega final.

### User Story Dependencies

- **US1 (P1)**: inicia justo despues de Foundational; es el MVP.
- **US2 (P2)**: depende de base comun y extiende flujo CRUD de US1.
- **US3 (P3)**: depende de que el frontend ya implemente CRUD y build de produccion.

### Within Each User Story

- Pruebas primero y en estado fallido antes de implementar.
- Servicios API antes de componentes de pagina.
- Componentes antes de integracion de rutas/compose.
- Validar criterio independiente de cada historia antes de avanzar.

---

## Parallel Opportunities

- Setup en paralelo: T003, T004, T005.
- Foundational en paralelo: T007, T008, T009, T010.
- US1 tests en paralelo: T014, T015, T016, T017.
- US1 implementacion en paralelo: T018, T019, T020.
- US2 tests en paralelo: T024, T025, T026.
- US2 implementacion en paralelo: T027, T028.
- US3 en paralelo: T033, T034, T035, T036.
- Polish en paralelo: T040, T041.

---

## Parallel Example: User Story 1

```bash
# Tests en paralelo (US1)
T014 auth-session.service.spec.ts
T015 auth.interceptor.spec.ts
T016 login.component.spec.ts
T017 empleado-api.service.spec.ts

# Implementacion en paralelo (US1)
T018 empleado-api.service.ts
T019 empleado-list.component.ts
T020 empleado-create-form.component.ts
```

## Parallel Example: User Story 2

```bash
# Tests en paralelo (US2)
T024 empleado-api.service.spec.ts
T025 empleado-edit-form.component.spec.ts
T026 empleado-list.component.spec.ts

# Implementacion en paralelo (US2)
T027 empleado-api.service.ts
T028 empleado-edit-form.component.ts
```

## Parallel Example: User Story 3

```bash
# Contenedorizacion en paralelo (US3)
T035 frontend/Dockerfile
T036 frontend/nginx.conf
T033 docker/scripts/smoke-frontend-backend.sh
```

---

## Implementation Strategy

### MVP First (US1 only)

1. Completar Phase 1.
2. Completar Phase 2.
3. Completar Phase 3 (US1).
4. Validar criterio independiente de US1 con login + listado + alta.
5. Demostrar MVP antes de continuar.

### Incremental Delivery

1. Entrega 1: Setup + Foundational + US1.
2. Entrega 2: US2 (CRUD completo).
3. Entrega 3: US3 (dockerizacion integrada).
4. Entrega 4: Polish transversal.

### Parallel Team Strategy

1. Equipo completo en Phase 1 y Phase 2.
2. Luego dividir:
   - Dev A: US1
   - Dev B: US2
   - Dev C: US3
3. Integrar en Phase 6 con quality gates.

---

## Notes

- Todas las tareas siguen formato checklist obligatorio con ID secuencial y rutas de archivo.
- Marcador [P] indica tareas potencialmente paralelizables sin conflicto de archivos.
- Marcadores [US1]/[US2]/[US3] se aplican solo en fases de historias de usuario.
- La estrategia respeta decisiones aclaradas: localStorage, fail-fast sin retries, ultima escritura gana, Nginx en Docker Compose y sin logout explicito.
