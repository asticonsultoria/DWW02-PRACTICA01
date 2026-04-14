# Phase 0 Research - CRUD de Empleados

## Decision 1: Formato de `clave` como identificador de negocio
- Decision: `clave` será autogenerada por el sistema con formato `EMP-<n>`, donde `n` es consecutivo numérico incremental por prefijo.
- Rationale: evita colisiones por entrada manual, simplifica la API de creación (sin `clave` en request) y conserva legibilidad operativa.
- Alternatives considered:
  - Clave alfanumérica enviada por cliente: descartada por riesgo de duplicados/conflictos.
  - UUID: descartada por menor usabilidad operativa.
  - Secuencia sin prefijo: descartada para mantener la semántica requerida (`EMP-`).

## Decision 2: Estrategia de migraciones
- Decision: usar Flyway con script inicial `V1__create_empleado_table.sql`.
- Rationale: integración estándar con Spring Boot 3, versionado explícito y ejecución automática al iniciar.
- Alternatives considered:
  - Liquibase: válida, pero más compleja para el alcance MVP.
  - SQL manual sin herramienta: descartada por baja trazabilidad.

## Decision 3: Patrón de errores API
- Decision: usar respuestas de error consistentes con payload `{timestamp, status, error, message, path}`.
- Rationale: facilita consumo por clientes y trazabilidad en pruebas.
- Alternatives considered:
  - Errores por defecto de Spring: descartados por inconsistencia entre validación y excepciones de negocio.

## Decision 4: Seguridad de endpoints
- Decision: proteger `/api/empleados/**` con HTTP Basic y exponer `/actuator/health` como público.
- Rationale: cumple constitución (Basic Auth por defecto) y mantiene endpoint mínimo de salud sin credenciales.
- Alternatives considered:
  - Proteger también health: descartado para evitar fricción operativa básica.
  - JWT/OAuth2: descartado por no requerido en este alcance.

## Decision 5: Documentación de contrato
- Decision: mantener contrato OpenAPI 3.0 en `contracts/empleados.openapi.yaml` y reflejarlo en Swagger UI.
- Rationale: separa contrato verificable de implementación y favorece revisión temprana.
- Alternatives considered:
  - Solo anotaciones en código: descartado por menor visibilidad de cambios de contrato en diseño.

## Decision 6: Pruebas mínimas requeridas
- Decision: incluir pruebas unitarias de servicio, pruebas API con MockMvc y pruebas de integración de repositorio contra PostgreSQL en Docker Compose.
- Rationale: cubre validación de negocio, seguridad y persistencia real según constitución.
- Alternatives considered:
  - Solo unit tests: descartado por no validar integración DB y seguridad.
  - Solo tests manuales: descartado por no cumplir quality gates.
