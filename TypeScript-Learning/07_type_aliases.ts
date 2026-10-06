// Lesson 07 — type aliases vs interfaces. Author: Adarsh
type ID = string | number;           // aliases can hold UNIONS (interfaces can't)
type Point = { x: number; y: number };
type Callback<T> = (value: T) => void;

interface Person { name: string }
interface Employee { salary: number }

// Both can extend/compose, but differently:
interface Staff extends Person, Employee {}           // interface extends
type StaffT = Person & Employee;                       // type intersects (&)

// Rule of thumb:
// - object shapes in public APIs -> interface (nicer error msgs, extensible)
// - unions, primitives, tuples, utilities -> type alias
type Status = "idle" | "loading" | "error";   // literal union — type only
type Pair = [string, number];                  // tuple type — type only

let s: Status = "loading";
let p: Pair = ["age", 21];
let id: ID = 42;
id = "abc";   // both branches valid

console.log(s, p, id);

// Declaration merging: interfaces merge automatically, aliases error on dup.
interface Windowish { title: string }
interface Windowish { width: number }   // merged into one type!

const w: Windowish = { title: "t", width: 100 };
console.log(w);

// Practice: alias Result<T> = { ok: true; value: T } | { ok: false; error: string }.
