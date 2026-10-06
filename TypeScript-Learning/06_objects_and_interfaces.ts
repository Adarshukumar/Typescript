// Lesson 06 — objects and interfaces. Author: Adarsh
interface Student {
  name: string;
  age: number;
  city?: string;               // optional property (may be undefined)
  readonly id: number;         // cannot be reassigned after creation
  greet(): string;             // method syntax
}

const adarsh: Student = {
  name: "Adarsh",
  age: 21,
  id: 1,
  greet() { return `Hi, I'm ${this.name}`; },
};
// adarsh.id = 2;    // ERROR: cannot assign to readonly
// adarsh.email = …  // ERROR: unknown property on a fresh literal

// Excess property checking only bites OBJECT LITERALS, not variables:
const extra = { name: "Riya", age: 20, id: 2, greet: () => "", hobby: "art" };
const asStudent: Student = extra;   // allowed — variable, not fresh literal

// Interfaces can extend
interface Senior extends Student {
  thesis: string;
}

// Interfaces describe shapes — including function shapes
interface Comparator<T> {
  (a: T, b: T): number;
}
const byAge: Comparator<Student> = (a, b) => a.age - b.age;

console.log(adarsh.greet(), byAge(adarsh, asStudent));

// Practice: interface Car { make; year; drive(): string } — build 2 objects.
