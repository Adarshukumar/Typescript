// Lesson 30 — typing a real API (Express-style). Author: Adarsh
// Install: npm i express && npm i -D @types/express
// This lesson shows the SHAPES; wire it up when you run a server.

import type { Request, Response, NextFunction } from "express";

// Domain types first — everything downstream flows from these
interface Task {
  id: number;
  title: string;
  done: boolean;
}

// Typed request body: extend Request via declaration merging
declare module "express-serve-static-core" {
  interface Request {
    user?: { id: number; name: string };
  }
}

// Route handlers get full typing
function getTasks(req: Request, res: Response<Task[]>): void {
  const tasks: Task[] = [{ id: 1, title: "learn TS", done: false }];
  res.json(tasks);            // res.json is typed to Task[]!
}

// Typed middleware: attach the user, next() checked
function auth(req: Request, res: Response, next: NextFunction): void {
  req.user = { id: 1, name: "Adarsh" };
  next();
}

// Async handler wrapper — never write try/catch in every route again
type AsyncHandler = (req: Request, res: Response) => Promise<void>;
function wrap(handler: AsyncHandler): AsyncHandler {
  return async (req, res) => {
    try { await handler(req, res); }
    catch (err) { res.status(500).json({ error: String(err) }); }
  };
}

// Discriminated union responses (lesson 22 pattern) in an API context:
type ApiResult<T> = { ok: true; data: T } | { ok: false; status: number; error: string };
const ok = <T,>(data: T): ApiResult<T> => ({ ok: true, data });
const fail = (status: number, error: string): ApiResult<never> => ({ ok: false, status, error });

// In real code:  app.get("/tasks", auth, wrap(getTasks));

console.log(JSON.stringify(ok<Task[]>([{ id: 1, title: "ship it", done: false }])));

// Practice: type a POST /tasks handler with a Partial<Task> body.
