// Lesson 09 — union types and literal types. Author: Adarsh
// A union says: exactly ONE of these types.
let id: string | number;
id = 42;          // ok
id = "abc";       // ok
// id = true;     // ERROR

// With unions you can only use the SHARED members until you narrow:
function show(v: string | number) {
  // v.toUpperCase();          // ERROR: not on number
  if (typeof v === "string") return v.toUpperCase();   // narrowed
  return v.toFixed(1);                                  // narrowed to number
}

// Literal types: a type of ONE exact value
let direction: "up" | "down" | "left" | "right";
direction = "up";
// direction = "sideways";   // ERROR

// Literal unions replace string-magic: compiler checks every usage!
type Size = "sm" | "md" | "lg";
function price(size: Size): number {
  return { sm: 9, md: 19, lg: 29 }[size];
}
console.log(price("md"));
// price("xl");  // ERROR — caught before running. This is the superpower.

// Literal booleans and numbers
type One = 1;
const one: One = 1;

// Mixing with null — a very common real-world union
function findUser(name: string): { name: string } | null {
  return name === "adarsh" ? { name } : null;
}
const found = findUser("adarsh");
if (found) console.log(found.name);   // narrowed to non-null

console.log(show(3.14159), show("ts"), direction, one);

// Practice: type Role = "admin" | "user" | "guest" and a canEdit(role) fn.
