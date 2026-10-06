// Lesson 01 — why TypeScript? Author: Adarsh
// JS runs this happily and the bug ships to production:
//   const user = { name: "Adarsh" };
//   console.log(user.nam);   // undefined — typo, no warning!
// TypeScript catches it BEFORE the code runs.

const user = { name: "Adarsh" };
// console.log(user.nam);  // ERROR: Property 'nam' does not exist. Did you mean 'name'?
console.log(user.name);

// TS = JavaScript + a type layer that is ERASED at runtime.
// The browser still runs plain JS; types only help at dev time.

function greet(name: string): string {
  return `Hello, ${name}!`;
}
console.log(greet("Adarsh"));
// greet(42);  // ERROR: Argument of type 'number' is not assignable to 'string'

// Refactoring example: rename a field and the compiler finds every use.
// That confidence is the whole point.

// Practice: write add(a: number, b: number): number and try passing a string.
