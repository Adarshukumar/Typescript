// Lesson 13 — optionality and immutability. Author: Adarsh
interface Config {
  host: string;
  port?: number;               // Config without port is fine
  readonly apiKey: string;     // set once, never again
}

const cfg: Config = { host: "localhost", apiKey: "secret" };
console.log(cfg.port ?? 8080);      // handle missing with ?? (nullish coalescing)

// ExactOptionalPropertyTypes note: ? means "missing OR undefined" by default.
const cfg2: Config = { host: "h", port: undefined, apiKey: "k" };  // allowed by default

// readonly on arrays and objects
const nums: readonly number[] = [1, 2, 3];
// nums.push(4);   // ERROR — use spread to make new arrays
const more = [...nums, 4];

// Deep readonly with the built-in utility
type Point = { x: number; y: number };
const origin: Readonly<Point> = { x: 0, y: 0 };
// origin.x = 5;   // ERROR

// as const — everything becomes readonly AND literal-typed
const COLORS = ["red", "green", "blue"] as const;   // readonly ["red", ...]
const AXIS = { x: 0, y: 0 } as const;               // { readonly x: 0; ... }
type Color = (typeof COLORS)[number];               // "red" | "green" | "blue"

// readonly is a compile-time promise, not runtime freezing
// (Object.freeze is the runtime equivalent — different tool!)

console.log(cfg, more, origin, COLORS, AXIS, Color.length);

// Practice: make an immutable settings object with as const; try mutating it.
