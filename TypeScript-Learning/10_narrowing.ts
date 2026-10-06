// Lesson 10 — narrowing: teaching the compiler control flow. Author: Adarsh
// TS "follows" your ifs and understands types inside each branch.

function describe(v: string | number | boolean) {
  if (typeof v === "string") return `text: ${v.toUpperCase()}`;
  if (typeof v === "number") return `num: ${v.toFixed(2)}`;
  return `bool: ${v ? "yes" : "no"}`;
}

// truthiness narrowing — null/undefined/""/0 all fall through
function greetName(name: string | null) {
  if (name) return `hi ${name}`;      // here name is string, not null/""
  return "hi stranger";
}

// equality narrowing
function cmp(a: string | number, b: string | number) {
  if (a === b) return a;      // both branches same type now
  return `${a} vs ${b}`;
}

// in operator narrowing (checks object property existence)
type Bird = { fly: () => void };
type Fish = { swim: () => void };
function move(animal: Bird | Fish) {
  if ("fly" in animal) return "flying";
  return "swimming";
}

// instanceof narrowing
function sizeOf(x: Date | RegExp) {
  if (x instanceof Date) return x.getTime();
  return x.source.length;
}

// assignment narrowing — type follows every assignment
let val: string | number;
val = "ts";
val.toUpperCase();      // TS knows: string
val = 42;
val.toFixed(1);         // TS knows: number

// control-flow analysis even works after early returns
function firstChar(s: string | null): string {
  if (s === null) return "";
  return s[0];           // narrowed to string
}

console.log(describe(true), greetName(null), move({ swim: () => {} }), cmp(1, 1));

// Practice: write area(shape: Circle | Square) narrowing on a 'kind' field.
