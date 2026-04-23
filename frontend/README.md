# Frontend Empleados

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=asticonsultoria_DWW02-PRACTICA01&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=asticonsultoria_DWW02-PRACTICA01)

Aplicacion Angular 21 LTS para CRUD de empleados con autenticacion Basic Auth.

## Scripts

- npm start
- npm run build
- npm test
- npm run lint
- npm run e2e:open
- npm run e2e:run

## E2E con Cypress

- Ejecutar interfaz interactiva: npm run e2e:open
- Ejecutar en headless: npm run e2e:run

## Docker

El build de Angular se sirve como estaticos con Nginx.

- docker compose -f docker/docker-compose.yml up --build -d
