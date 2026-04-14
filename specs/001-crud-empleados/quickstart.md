# Quickstart - CRUD de Empleados

## Prerrequisitos
- Java 17
- Maven Wrapper (`./mvnw`)
- Docker y Docker Compose

## 1) Levantar PostgreSQL
```bash
mkdir -p docker
cat > docker/docker-compose.yml <<'YAML'
services:
  postgres:
    image: postgres:15
    container_name: empleados-postgres
    environment:
      POSTGRES_DB: empleadosdb
      POSTGRES_USER: empleados
      POSTGRES_PASSWORD: empleados
    ports:
      - "5432:5432"
    volumes:
      - empleados_pg_data:/var/lib/postgresql/data
volumes:
  empleados_pg_data:
YAML

docker compose -f docker/docker-compose.yml up -d
```

## 2) Variables de entorno
```bash
export APP_BASIC_USER=admin
export APP_BASIC_PASSWORD=admin123
export SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/empleadosdb
export SPRING_DATASOURCE_USERNAME=empleados
export SPRING_DATASOURCE_PASSWORD=empleados
```

## 3) Ejecutar la aplicación
```bash
./mvnw spring-boot:run
```

## 4) Verificar endpoints
- Swagger UI: `http://localhost:8080/swagger-ui/index.html`
- Health: `http://localhost:8080/actuator/health`

### Ejemplo crear empleado
```bash
curl -u "$APP_BASIC_USER:$APP_BASIC_PASSWORD" \
  -H "Content-Type: application/json" \
  -X POST http://localhost:8080/api/empleados \
  -d '{
    "nombre":"Ana Gómez",
    "direccion":"Calle Principal 123",
    "telefono":"555-0101"
  }'
```

La API responde con `clave` autogenerada con formato `EMP-<n>`.

## 5) Ejecutar pruebas
```bash
./mvnw test
```

## 6) Detener PostgreSQL
```bash
docker compose -f docker/docker-compose.yml down
```
