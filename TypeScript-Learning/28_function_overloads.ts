// Lesson 28 — function overloads. Author: Adarsh
// Overloads: multiple signatures, ONE implementation.
// Callers see only the overload signatures.

function createDate(timestamp: number): Date;
function createDate(year: number, month: number, day: number): Date;
function createDate(a: number, b?: number, c?: number): Date {
  return b !== undefined && c !== undefined
    ? new Date(a, b - 1, c)     // months are 0-indexed in JS
    : new Date(a);
}

const fromTs = createDate(1728100000000);
const fromYMD = createDate(2026, 10, 5);
console.log(fromTs.toISOString().slice(0, 10), fromYMD.toDateString());

// The classic example: typed event emitter
type Listener<T> = (payload: T) => void;
class Emitter {
  on(event: "login", cb: Listener<{ user: string }>): void;
  on(event: "error", cb: Listener<string>): void;
  on(event: string, cb: Listener<unknown>): void {   // implementation signature
    // wiring here
  }
}
const em = new Emitter();
em.on("login", (p) => console.log(p.user));   // p is { user: string }
em.on("error", (msg) => console.log(msg));    // msg is string

// Overload rules:
// - most specific signatures FIRST
// - implementation signature must be compatible with all overloads
// - the implementation itself is NOT callable externally

// Sometimes a union parameter is simpler than overloads:
//   function pad(n: number | string): string  <- prefer this when logic is shared

// Practice: overload parseInput(v: string): string[] | v: number: number[].
