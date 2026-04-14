# Data Model - Frontend CRUD de Empleados

## Entity: EmpleadoView
- Description: Representacion de empleado mostrada en la tabla y formularios de edicion.

### Fields
- clave (string)
  - Required: yes
  - Constraints: patron esperado EMP-[0-9]+, solo lectura en UI
- nombre (string)
  - Required: yes
  - Constraints: longitud 1..100
- direccion (string)
  - Required: yes
  - Constraints: longitud 1..100
- telefono (string)
  - Required: yes
  - Constraints: longitud 1..100

## Entity: EmpleadoCreateInput
- Description: Datos de alta enviados desde formulario de creacion.

### Fields
- nombre (string)
  - Required: yes
  - Constraints: longitud 1..100
- direccion (string)
  - Required: yes
  - Constraints: longitud 1..100
- telefono (string)
  - Required: yes
  - Constraints: longitud 1..100

## Entity: EmpleadoUpdateInput
- Description: Datos de actualizacion enviados en edicion.

### Fields
- nombre (string)
  - Required: yes
  - Constraints: longitud 1..100
- direccion (string)
  - Required: yes
  - Constraints: longitud 1..100
- telefono (string)
  - Required: yes
  - Constraints: longitud 1..100

## Entity: SessionCredentials
- Description: Credenciales Basic Auth persistidas para llamadas API.

### Fields
- username (string)
  - Required: yes
  - Constraints: no vacio
- password (string)
  - Required: yes
  - Constraints: no vacio
- encodedAuthorization (string)
  - Required: yes
  - Constraints: esquema Basic base64

## Entity: UiOperationState
- Description: Estado de ejecucion y errores para feedback de UX.

### Fields
- loading (boolean)
  - Required: yes
- successMessage (string)
  - Required: no
- errorMessage (string)
  - Required: no
- lastErrorCode (number)
  - Required: no

## Relationships
- EmpleadoView se genera desde respuesta API y alimenta listado/edicion.
- EmpleadoCreateInput y EmpleadoUpdateInput se transforman en request body hacia backend.
- SessionCredentials se usa para agregar Authorization en todas las llamadas protegidas.

## Validation Rules
- Formulario bloquea submit si nombre, direccion o telefono estan vacios.
- Formulario bloquea submit si nombre, direccion o telefono exceden 100 caracteres.
- Campo clave no editable desde UI.
- Ante 401 o 403 se solicita reingreso de credenciales.
- Ante error de red/backend no hay reintentos automaticos.

## State Transitions
- UNAUTHENTICATED -> AUTHENTICATED: login exitoso con credenciales validas.
- AUTHENTICATED -> AUTHENTICATED: operaciones CRUD exitosas.
- AUTHENTICATED -> AUTHENTICATION_STALE: backend responde 401/403 por credenciales invalidas u obsoletas.
- AUTHENTICATION_STALE -> AUTHENTICATED: reingreso exitoso de credenciales.
