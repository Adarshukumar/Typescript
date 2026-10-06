// Lesson 18 — generic constraints: "T must be able to...". Author: Adarsh
// `extends` on a type parameter = a requirement T must satisfy.
function logLength<T extends { length: number }>(item: T): T {
  console.log("length is", item.length);   // safe: T always has .length
  return item;
}
logLength("hello");        // string has length
logLength([1, 2]);         // arrays have length
// logLength(42);          // ERROR: number has no length

// keyof constraint: K must be a key of T — the "safe property access" pattern
function getProp<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];         // fully typed: result is T[K], not `any`!
}
const user = { name: "Adarsh", age: 21, city: "Delhi" };
const age = getProp(user, "age");      // inferred type: number
const city = getProp(user, "city");    // string
// getProp(user, "email");            // ERROR: "email" is not a key

// Multiple constrained params
function merge<A extends object, B extends object>(a: A, b: B): A & B {
  return { ...a, ...b };
}
const merged = merge({ name: "Adarsh" }, { age: 21 });
console.log(merged.name, merged.age);

// Constraining to specific shapes
interface HasId { id: number }
function findById<T extends HasId>(items: T[], id: number): T | undefined {
  return items.find((item) => item.id === id);
}
console.log(findById([{ id: 1, name: "a" }, { id: 2, name: "b" }], 2));

console.log(age, city);

// Practice: pluck<T, K extends keyof T>(items: T[], key: K): T[K][].
