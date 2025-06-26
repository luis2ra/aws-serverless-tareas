# Tareas Serverless en AWS con DynamoDB

Este proyecto es una API simple y serverless para crear y consultar tareas por usuario, utilizando:

- AWS Lambda
- DynamoDB (claves compuestas)
- API Gateway (HTTP API)
- Serverless Framework

## 🧱 Arquitectura

- `POST /tareas`: crea una tarea asociada a un usuario, usando `PK = usuario` y `SK = fecha#id`.
- `GET /tareas?usuario=...&fecha=...`: consulta las tareas de un usuario, con filtro opcional por fecha.

## 🚀 Despliegue

### 1. Instalar dependencias

```bash
npm install
