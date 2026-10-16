# Week 2 Express API Assignment

A beginner-friendly Node.js and Express REST API for managing tasks. It includes a health check, CRUD endpoints, request validation, and JSON error responses.

## Requirements

- Node.js 24
- pnpm

## Setup

From the repository root, install the workspace dependencies:

```bash
pnpm install
```

## Run the API

```bash
PORT=5000 pnpm --filter @workspace/api-server run dev
```

The `dev` script builds the Express server and then starts it. The API base path is `/api`, so the local health check is `http://localhost:5000/api/healthz`.

In Replit, start the configured **API Server** workflow; Replit supplies the server port automatically.

## Endpoints

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/api/healthz` | Check that the server is running |
| `GET` | `/api/tasks` | List all tasks |
| `GET` | `/api/tasks/:id` | Get one task |
| `POST` | `/api/tasks` | Create a task |
| `PATCH` | `/api/tasks/:id` | Update one or more task fields |
| `DELETE` | `/api/tasks/:id` | Delete a task |

### Create a task

Send a JSON request to `POST /api/tasks`:

```json
{
  "title": "Finish Week 2 assignment",
  "description": "Practice Express and REST endpoints"
}
```

`title` is required. `description` defaults to an empty string, and `completed` defaults to `false`.

### Example with curl

```bash
curl http://localhost:5000/api/tasks

curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Study Express","description":"Build a REST API"}'
```

## Project layout

- `artifacts/api-server/src/app.ts` — Express app and middleware
- `artifacts/api-server/src/routes/` — health and task API routes
- `artifacts/api-server/package.json` — API server scripts and dependencies
- `pnpm-workspace.yaml` and the root `package.json` — workspace configuration

The task data is stored in memory and resets whenever the server restarts.
