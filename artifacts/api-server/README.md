# Week 2 Express Tasks API

A small REST API for practicing Express routes, request validation, and CRUD operations.

## Run the server

From the project root:

```bash
PORT=5000 pnpm --filter @workspace/api-server run dev
```

In the Replit preview, the API is available under `/api`. The server port is provided automatically when the API workflow starts.

## Endpoints

| Method | Path | What it does |
| --- | --- | --- |
| `GET` | `/api/healthz` | Check that the server is running |
| `GET` | `/api/tasks` | List all tasks |
| `GET` | `/api/tasks/:id` | Get one task |
| `POST` | `/api/tasks` | Create a task |
| `PATCH` | `/api/tasks/:id` | Update one or more task fields |
| `DELETE` | `/api/tasks/:id` | Delete a task |

### Task fields

Each task has an `id`, `title`, `description`, `completed`, and `createdAt`.

Create a task by sending JSON:

```json
{
  "title": "Finish Week 2 assignment",
  "description": "Practice Express and REST endpoints"
}
```

`title` is required. `description` defaults to an empty string, and `completed` defaults to `false`.

### Example requests

```bash
curl http://localhost:5000/api/tasks

curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Study Express","description":"Build a REST API"}'

curl -X PATCH http://localhost:5000/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'

curl -X DELETE http://localhost:5000/api/tasks/1
```

The API returns JSON error messages for invalid input and missing tasks. Tasks are stored in memory, so they reset when the server restarts.
