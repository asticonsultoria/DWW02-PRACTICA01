# Data Model - CRUD de Empleados

## Entity: Empleado
- Description: Registro de empleado gestionado por el CRUD.

### Fields
- `clavePrefijo` (string, PK compuesto)
  - Required: yes
  - Constraints: fixed value `EMP`
- `claveNumero` (integer, PK compuesto)
  - Required: yes
  - Constraints: autoincremental, unique dentro del prefijo
- `clave` (string derivado)
  - Required: yes
  - Constraints: formato `EMP-<claveNumero>`, único y no editable por cliente
- `nombre` (string)
  - Required: yes
  - Constraints: length 1..100
- `direccion` (string)
  - Required: yes
  - Constraints: length 1..100
- `telefono` (string)
  - Required: yes
  - Constraints: length 1..100

## Relationships
- No relaciones con otras entidades en este alcance.

## Validation Rules
- Rechazar creación cuando la solicitud incluye `clave`.
- Generar `clave` en backend con formato `EMP-` + autonumérico secuencial.
- Rechazar creación/actualización con campos obligatorios vacíos.
- Rechazar creación/actualización cuando `nombre`, `direccion` o `telefono` exceden 100 caracteres.
- Rechazar operaciones de lectura/actualización/eliminación si `clave` no cumple patrón `EMP-[0-9]+`.
- Rechazar operaciones de lectura/actualización/eliminación para `clave` inexistente con respuesta 404.

## State Transitions
- `NON_EXISTENT -> ACTIVE`: al crear empleado válido.
- `ACTIVE -> ACTIVE`: al actualizar empleado existente con datos válidos.
- `ACTIVE -> NON_EXISTENT`: al eliminar empleado existente.

## Persistence Mapping
- Table: `empleado`
- Primary Key: compuesta (`clave_prefijo`, `clave_numero`)
- Columns:
  - `clave_prefijo` varchar(3) not null default 'EMP'
  - `clave_numero` bigint not null
  - `clave` varchar(32) generated/stored or assembled at application layer
  - `nombre` varchar(100) not null
  - `direccion` varchar(100) not null
  - `telefono` varchar(100) not null
