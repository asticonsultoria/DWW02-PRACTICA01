# Phase 0 Research - Frontend CRUD de Empleados

## Decision 1: Arquitectura de frontend
- Decision: Implementar una aplicacion Angular 21 LTS de una sola pagina con modulo principal de Empleados.
- Rationale: simplifica navegacion, reduce complejidad para un alcance CRUD unico y alinea con constitucion.
- Alternatives considered:
  - Multiples microfrontends: descartado por sobrecoste para una sola entidad.
  - Renderizado server-side: descartado por no ser requisito funcional del alcance.

## Decision 2: Estrategia de autenticacion
- Decision: Solicitar credenciales en login y persistirlas en localStorage para enviar Authorization Basic en cada llamada.
- Rationale: responde a clarificacion aprobada y permite continuidad de sesion entre recargas.
- Alternatives considered:
  - Credenciales solo en memoria: descartado por no cumplir decision de clarificacion.
  - Logout explicito obligatorio: descartado en este alcance por decision de clarificacion.

## Decision 3: Manejo de errores de red y backend
- Decision: Fallar inmediatamente cada operacion cuando backend no responda, sin reintentos automaticos.
- Rationale: evita operaciones duplicadas y cumple regla funcional aclarada.
- Alternatives considered:
  - Reintentos automaticos: descartado por decision de clarificacion.
  - Cola offline: descartado por complejidad y por no ser requisito de negocio.

## Decision 4: Concurrencia funcional
- Decision: Aplicar politica de ultima escritura gana sin advertencias de conflicto en UI.
- Rationale: minimiza logica adicional en frontend y respeta decision aclarada.
- Alternatives considered:
  - Deteccion de conflictos con versionado: descartado por no requerido.
  - Bloqueo pesimista: descartado por complejidad operativa.

## Decision 5: Contrato de datos y validacion
- Decision: Consumir endpoints existentes /api/empleados y validar en cliente campos requeridos antes de invocar API.
- Rationale: reduce viajes innecesarios y mantiene coherencia con validaciones backend.
- Alternatives considered:
  - Validar solo en backend: descartado por peor experiencia de usuario.
  - Transformaciones amplias de payload: descartado para evitar desalineacion con contrato.

## Decision 6: Dockerizacion de frontend
- Decision: Construir frontend en imagen multi-stage y servir estaticos con Nginx como servicio frontend en Docker Compose.
- Rationale: reproducibilidad en CI/local, menor consumo que servidor de desarrollo y comportamiento estable.
- Alternatives considered:
  - Usar ng serve en contenedor: descartado para entornos integrados estables.
  - Ejecutar frontend fuera de compose: descartado por menor reproducibilidad.

## Decision 7: Estrategia de pruebas
- Decision: Pruebas unitarias/componentes para formularios y servicio HTTP + validacion manual integrada con backend en Docker Compose.
- Rationale: balancea cobertura funcional con costo de implementacion para primer incremento.
- Alternatives considered:
  - Solo pruebas manuales: descartado por calidad insuficiente.
  - E2E completa desde inicio: diferido para siguiente iteracion.
