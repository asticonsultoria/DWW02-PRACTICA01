# Escenario Kubernetes con Minikube

Este escenario levanta en Minikube:
- `postgres` (estado persistente)
- `backend` Spring Boot
- `frontend` Angular + Nginx
- `ingress` con dominio local `empleados.local`

## 1) Prerrequisitos

- Minikube
- kubectl
- Docker

## 2) Iniciar Minikube y habilitar Ingress

```bash
minikube start --cpus=4 --memory=8192
minikube addons enable ingress
```

## 3) Construir imagenes dentro del Docker de Minikube

```bash
eval "$(minikube -p minikube docker-env)"
docker build -t empleados-backend:local ./backend
docker build -t empleados-frontend:local ./frontend
```

## 4) Desplegar recursos

```bash
kubectl apply -k k8s/minikube
kubectl get pods -n empleados-staging -w
```

Cuando todos los pods esten en `Running`/`Ready`, continua con el host local.

## 5) Asociar dominio local al IP de Minikube

```bash
echo "$(minikube ip) empleados.local" | sudo tee -a /etc/hosts
```

## 6) Verificar

```bash
curl http://empleados.local/actuator/health
```

Abre en navegador:
- `http://empleados.local`

Credenciales basicas por defecto:
- usuario: `admin`
- password: `admin123`

## 7) Comandos utiles

Ver recursos:

```bash
kubectl get all -n empleados-staging
kubectl get ingress -n empleados-staging
```

Ver logs:

```bash
kubectl logs -f deployment/backend -n empleados-staging
kubectl logs -f deployment/frontend -n empleados-staging
kubectl logs -f deployment/postgres -n empleados-staging
```

Eliminar escenario:

```bash
kubectl delete -k k8s/minikube
```

## 8) Ajustes recomendados para staging

- Cambiar secretos en `secrets.yaml` antes de exponer el entorno.
- Sustituir imagenes `:local` por imagenes versionadas en un registry.
- Agregar `requests/limits` de CPU y memoria por contenedor.
- Configurar HPA para backend si esperas carga variable.
