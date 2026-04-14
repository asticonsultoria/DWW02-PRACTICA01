# Frontend UI Contract - Empleados

## UI Routes
- /login
  - Purpose: captura de credenciales para Basic Auth.
  - Access: publico.
- /empleados
  - Purpose: listado, alta, edicion y eliminacion de empleados.
  - Access: requiere credenciales cargadas.

## Session Contract
- Credenciales se guardan en localStorage tras login exitoso.
- Cada request protegido incluye header Authorization: Basic <base64(username:password)>.
- No existe accion de logout explicito en esta entrega.
- Si backend devuelve 401 o 403, UI debe solicitar nuevas credenciales.

## API Consumption Contract
- GET /api/empleados
  - Response 200: arreglo de EmpleadoView.
- POST /api/empleados
  - Body: EmpleadoCreateInput.
  - Response 201: EmpleadoView creado con clave autogenerada.
- PUT /api/empleados/{clave}
  - Body: EmpleadoUpdateInput.
  - Response 200: EmpleadoView actualizado.
- DELETE /api/empleados/{clave}
  - Response 204: sin contenido.

## Error Contract Handling
- 400: mostrar errores de validacion al usuario.
- 401/403: mover a captura de credenciales.
- 404 en edit/delete: notificar que el registro ya no existe.
- 409: mostrar conflicto funcional sin reintento.
- 5xx/network error: mostrar error inmediato sin retry.

## Concurrency Behavior
- Politica funcional: ultima escritura gana sin advertencia de conflicto.

## Docker Runtime Contract
- Servicio frontend se sirve como build estatico con Nginx.
- Servicio frontend debe leer variable de entorno para URL base de backend.
- Docker Compose integrado incluye frontend + backend + postgres.
