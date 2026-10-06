// Lesson 04 — type inference: TS is always watching. Author: Adarsh
let count = 10;              // inferred as number — no annotation needed
count += 5;                  // fine
// count = "ten";           // ERROR: string not assignable to number

const name = "Adarsh";       // inferred as the LITERAL type "Adarsh" (const!)
// const narrows: you can't ever change it, so TS uses the exact value type

let role = "student";        // let -> widened to `string`

// Inference works on returns too
function sum(a: number, b: number) {
  return a + b;              // inferred return type: number
}

// Arrays infer from contents
const mixed = [1, "two", 3]; // (string | number)[]

// Object literals infer per-property
const me = { name: "Adarsh", age: 21 };
// me.city = "Delhi";       // ERROR: 'city' does not exist

// Rule of thumb: annotate function parameters and public APIs,
// let inference handle locals. Don't write types TS already knows.

console.log(count, name, role, sum(1, 2), mixed, me);

// Practice: hover each declaration in your editor and read the inferred type.
