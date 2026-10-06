// Lesson 27 — modules, imports, and export styles. Author: Adarsh
// One file = one module. Everything not exported stays private.

// export styles:
export const VERSION = "1.0";                  // named export
export type Student = { name: string };        // exporting a TYPE
export default class Classroom { }             // default export (one per file)

// in another file you'd write:
//   import Classroom, { VERSION, type Student } from "./27_modules.js";
//   import * as mod from "./27_modules.js";
// `import type` / `type` modifier: imports erased at compile time
import type { Student as S } from "./27_modules.js";
const s: S = { name: "Adarsh" };

// Re-exporting
//   export { Student } from "./types.js";
//   export * from "./utils.js";

// Common patterns:
//   types.ts      — all shared types, nothing else
//   index.ts      — barrel: re-exports the public API of a folder

// CommonJS interop (Node's older system):
//   import fs from "fs";          // works with esModuleInterop: true
//   import * as path from "path";

// Namespaces (legacy — avoid in new code; modules won):
//   namespace Legacy { export const x = 1; }
//   Legacy.x

// Side-effect import:
//   import "./polyfills.js";      // runs the file, imports nothing

console.log(VERSION, s.name);

// Practice: split a Student type + greet() into types.ts and utils.ts,
// import both into a main.ts.
