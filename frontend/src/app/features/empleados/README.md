# Modulo Empleados

Este modulo implementa CRUD de empleados contra el backend existente.

## Reglas funcionales

- Politica de concurrencia: ultima escritura gana.
- Fallo de red/backend: sin reintentos automaticos.
- Sesion: Basic Auth persistida en localStorage.
- No hay logout explicito en esta entrega.
