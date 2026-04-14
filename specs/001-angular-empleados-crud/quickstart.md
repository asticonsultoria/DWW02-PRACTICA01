# Quickstart - Frontend CRUD de Empleados

## Prerrequisitos
- Docker y Docker Compose
- Backend de empleados disponible en este repositorio
- Puerto 80 libre para frontend y 8080 para backend

## 1) Verificar estructura esperada
- Carpeta frontend con proyecto Angular 21 LTS.
- Dockerfile de frontend con build multi-stage y runtime Nginx.
- docker/docker-compose.yml con servicios postgres, backend y frontend.

## 2) Configurar endpoint de API para frontend
Definir variable de entorno para URL base de backend usada por frontend.
Ejemplo recomendado en compose: http://backend:8080

## 3) Levantar entorno integrado
Comando:
- docker compose -f docker/docker-compose.yml up --build -d

Resultado esperado:
- frontend disponible en http://localhost
- backend disponible en http://localhost:8080
- swagger backend en http://localhost:8080/swagger-ui/index.html

Validar conectividad con script:
- sh docker/scripts/smoke-frontend-backend.sh

## 4) Flujo funcional minimo
1. Abrir frontend y registrar credenciales Basic Auth.
2. Ver listado de empleados.
3. Crear empleado valido.
4. Editar empleado.
5. Eliminar empleado.

## 5) Verificaciones de comportamiento
- Si backend esta caido, frontend muestra error inmediato sin reintentos.
- Si backend responde 401/403, frontend solicita nuevas credenciales.
- Operaciones concurrentes aplican ultima escritura gana.
- No existe logout explicito en esta entrega; sesion persiste en localStorage.

## 6) Apagado del entorno
Comando:
- docker compose -f docker/docker-compose.yml down

Opcional limpieza de volumenes:
- docker compose -f docker/docker-compose.yml down -v
