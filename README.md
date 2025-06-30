# 🧠 Proyecto Serverless Tareas

Este proyecto es una aplicación backend construida con **AWS Lambda**, **DynamoDB**, y **Serverless Framework**. Se enfoca en aplicar buenas prácticas modernas de arquitectura en la nube y está organizado en ramas (`branches`) para representar etapas progresivas de aprendizaje y desarrollo profesional.

---

## 📦 Objetivo del Proyecto

Simular un sistema de gestión de tareas por usuario donde:

- Las tareas se crean mediante API REST.
- Se almacenan en DynamoDB.
- La arquitectura evoluciona hacia un sistema **desacoplado, escalable y event-driven**.
- Se integran progresivamente componentes como **SQS, SNS, PostgreSQL/Aurora, Terraform y pruebas automatizadas**.

---

## 🚀 Funcionalidades actuales

- Crear tareas a través de API REST (`/tareas`, método `POST`)
- Consultar tareas por usuario y fecha (`/tareas`, método `GET`)
- Encolado de tareas en AWS SQS desde la función `crearTarea`
- Procesamiento asíncrono de tareas con Lambda `procesarTarea`
- Persistencia final en DynamoDB
- Publicación de evento SNS al procesar tareas
- Notificación mediante Lambda suscrita al topic SNS

---

## 🧱 Estructura del Proyecto

```
.
├── src/
│   ├── handlers/
│   │   ├── crearTarea.js
│   │   ├── listarTareas.js
│   │   ├── notificarTarea.js
│   │   ├── procesarTarea.js
│   ├── utils/
│   │   └── dynamoClient.js
│   └── events/
├── serverless.yml
├── README.md
├── package.json
└── .gitignore
```

## 🚧 Roadmap de Ramas (Progresión Técnica)

| Rama | Descripción | Habilidades y Tecnologías |
|------|-------------|----------------------------|
| `main` | Proyecto base inicial | Lambda, DynamoDB, Serverless Framework |
| `base/estructura-refactorizada` | Refactor de estructura de carpetas y código modular | Clean code, reutilización de clientes, escalabilidad |
| `feature/01-sqs-async-processing` | Agrega cola SQS + Lambda consumidora | AWS SQS, Event-driven architecture, asincronía |
| `feature/02-sns-notifications` | Publicación de eventos a SNS + Lambda suscrita | SNS, fan-out, patrones de notificación |
| `feature/03-alembic-terraform-db` | Introduce Terraform + Alembic para PostgreSQL | Infraestructura como código, migraciones |
| `feature/aurora-postgresql` | Sustituye DynamoDB por Aurora PostgreSQL | RDS, SQL, conexiones seguras desde Lambda |
| `feature/serverless-plugins-monitoring` | Plugins Serverless y observabilidad | Prune, Logs, métricas y trazas |
| `feature/testing-coverage` | Pruebas unitarias con mocks | Vitest o Jest, testing de funciones Lambda |
| `feature/domain-events-payloads` | Payloads enriquecidos por tipo de evento | Domain-driven design, arquitectura limpia |

## 🔧 Comandos de Uso

### 📍 Instalación

```bash
npm install
```

### 🧪 Ejecutar localmente

```bash
serverless offline start
```

### 🧪 Crear tarea (POST)

```bash
curl -X POST http://localhost:3000/tareas \
  -H "Content-Type: application/json" \
  -d '{"usuario": "luis", "descripcion": "leer documentación"}'
```

### 🧪 Listar tareas por usuario (GET)

```bash
curl "http://localhost:3000/tareas?usuario=luis"
```

### 🧪 Filtrar por fecha

```bash
curl "http://localhost:3000/tareas?usuario=luis&fecha=2025-06-26"
```

## ✅ Próximo paso

→ Crear la rama `feature/03-alembic-terraform-db` e integrar Terraform y Alembic para bases de datos relacionales.

## 🧠 Skills cubiertos

- ✅ AWS Lambda + API Gateway
- ✅ DynamoDB (NoSQL)
- ✅ Arquitectura event-driven (SQS/SNS)
- ✅ Arquitectura event-driven (SQS/SNS con fan-out)
- ⏳ Infraestructura como código
- ⏳ PostgreSQL + Aurora + Alembic
- ⏳ Testing
- ✅ Organización profesional por ramas

## ✍️ Autor

Luis Altuve  
Este proyecto forma parte de un roadmap técnico enfocado en aplicar a posiciones como **Backend Developer Cloud / Serverless Engineer**.