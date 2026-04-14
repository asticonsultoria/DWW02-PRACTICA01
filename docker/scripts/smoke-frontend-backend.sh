#!/bin/sh
set -eu

FRONTEND_URL="${FRONTEND_URL:-http://localhost}"
BACKEND_URL="${BACKEND_URL:-http://localhost:8080}"

curl -fsS "$FRONTEND_URL" >/dev/null
curl -fsS "$BACKEND_URL/actuator/health" >/dev/null

echo "Smoke test OK: frontend y backend disponibles"
