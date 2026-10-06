// Lesson 08 — typing functions. Author: Adarsh
// Parameter types + return type
function add(a: number, b: number): number { return a + b; }

// Arrow functions — the same, just shaped differently
const mul = (a: number, b: number): number => a * b;

// Optional and default parameters
function greet(name: string, greeting = "Hello", excited?: boolean): string {
  return `${greeting}, ${name}${excited ? "!" : "."}`;
}
console.log(greet("Adarsh"), greet("Riya", "Namaste", true));

// Rest parameters are typed as arrays
function total(...nums: number[]): number {
  return nums.reduce((a, b) => a + b, 0);
}
console.log(total(1, 2, 3, 4));

// this parameter (classic OOP style)
interface Counter { count: number; bump(): void }
const c: Counter = {
  count: 0,
  bump(this: Counter) { this.count += 1; },
};
c.bump(); c.bump();

// void vs never:
//   void  -> "returns nothing useful" (callers shouldn't use the result)
//   never -> "never returns at all" (throws, infinite loop)
function fail(msg: string): never {
  throw new Error(msg);
}
function log(msg: string): void {
  console.log("[log]", msg);
}

// Call signatures on type aliases (function types)
type MathOp = (a: number, b: number) => number;
const div: MathOp = (a, b) => a / b;

console.log(add(1, 2), mul(2, 3), total(), c.count, div(9, 3));

// Practice: type a formatName(first: string, last?: string): string function.
