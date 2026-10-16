import { Router, type IRouter } from "express";

type Task = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
};

const router: IRouter = Router();

// This simple in-memory store is useful for a beginner assignment.
// Data resets whenever the server restarts.
let tasks: Task[] = [];
let nextTaskId = 1;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseTaskId(value: string): number | undefined {
  if (!/^\d+$/.test(value)) {
    return undefined;
  }

  const id = Number(value);
  return Number.isSafeInteger(id) && id > 0 ? id : undefined;
}

router.get("/tasks", (_req, res) => {
  res.json(tasks);
});

router.get("/tasks/:id", (req, res) => {
  const id = parseTaskId(req.params.id);
  if (id === undefined) {
    res.status(400).json({ error: "Task ID must be a positive integer" });
    return;
  }

  const task = tasks.find((item) => item.id === id);
  if (!task) {
    res.status(404).json({ error: "Task not found" });
    return;
  }

  res.json(task);
});

router.post("/tasks", (req, res) => {
  const body: unknown = req.body;
  if (!isRecord(body)) {
    res.status(400).json({ error: "Request body must be a JSON object" });
    return;
  }

  if (typeof body.title !== "string" || body.title.trim().length === 0) {
    res.status(400).json({ error: "Title is required and cannot be empty" });
    return;
  }

  if (body.description !== undefined && typeof body.description !== "string") {
    res.status(400).json({ error: "Description must be a string" });
    return;
  }

  if (body.completed !== undefined && typeof body.completed !== "boolean") {
    res.status(400).json({ error: "Completed must be a boolean" });
    return;
  }

  const task: Task = {
    id: nextTaskId++,
    title: body.title.trim(),
    description:
      typeof body.description === "string" ? body.description.trim() : "",
    completed: typeof body.completed === "boolean" ? body.completed : false,
    createdAt: new Date().toISOString(),
  };

  tasks.push(task);
  res.status(201).json(task);
});

router.patch("/tasks/:id", (req, res) => {
  const id = parseTaskId(req.params.id);
  if (id === undefined) {
    res.status(400).json({ error: "Task ID must be a positive integer" });
    return;
  }

  const task = tasks.find((item) => item.id === id);
  if (!task) {
    res.status(404).json({ error: "Task not found" });
    return;
  }

  const body: unknown = req.body;
  if (!isRecord(body)) {
    res.status(400).json({ error: "Request body must be a JSON object" });
    return;
  }

  const hasTitle = Object.hasOwn(body, "title");
  const hasDescription = Object.hasOwn(body, "description");
  const hasCompleted = Object.hasOwn(body, "completed");

  if (!hasTitle && !hasDescription && !hasCompleted) {
    res.status(400).json({
      error: "Provide at least one field to update: title, description, or completed",
    });
    return;
  }

  if (
    hasTitle &&
    (typeof body.title !== "string" || body.title.trim().length === 0)
  ) {
    res.status(400).json({ error: "Title cannot be empty" });
    return;
  }

  if (hasDescription && typeof body.description !== "string") {
    res.status(400).json({ error: "Description must be a string" });
    return;
  }

  if (hasCompleted && typeof body.completed !== "boolean") {
    res.status(400).json({ error: "Completed must be a boolean" });
    return;
  }

  if (hasTitle && typeof body.title === "string") {
    task.title = body.title.trim();
  }
  if (hasDescription && typeof body.description === "string") {
    task.description = body.description.trim();
  }
  if (hasCompleted && typeof body.completed === "boolean") {
    task.completed = body.completed;
  }

  res.json(task);
});

router.delete("/tasks/:id", (req, res) => {
  const id = parseTaskId(req.params.id);
  if (id === undefined) {
    res.status(400).json({ error: "Task ID must be a positive integer" });
    return;
  }

  const taskIndex = tasks.findIndex((item) => item.id === id);
  if (taskIndex === -1) {
    res.status(404).json({ error: "Task not found" });
    return;
  }

  tasks = tasks.filter((item) => item.id !== id);
  res.status(204).end();
});

export default router;
