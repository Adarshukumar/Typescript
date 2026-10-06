// Lesson 25 — conditional types: IF/ELSE for the type system. Author: Adarsh
// Syntax: A extends B ? X : Y

type IsString<T> = T extends string ? true : false;
type A = IsString<"hi">;    // true
type B = IsString<42>;      // false
const a: A = true;
const b: B = false;

// Nested = else-if chains
type TypeName<T> =
  T extends string  ? "string"  :
  T extends number  ? "number"  :
  T extends boolean ? "boolean" :
  T extends object  ? "object"  : "other";
type C = TypeName<Date>;    // "object"

// distributive conditionals: applied to UNIONS one member at a time
type ToArray<T> = T extends unknown ? T[] : never;
type D = ToArray<string | number>;   // string[] | number[]  (NOT (string|number)[])
// block distribution with [T] if you want the union treated whole:
type One<T> = [T] extends [unknown] ? T[] : never;
type E = One<string | number>;       // (string | number)[]

// infer — "capture" a piece of the type while matching
type ElementType<T> = T extends (infer U)[] ? U : never;
type F = ElementType<string[]>;      // string

type ReturnTypeOf<T> = T extends (...args: never[]) => infer R ? R : never;
function f() { return 42; }
type G = ReturnTypeOf<typeof f>;     // number

// unwrap promise types
type Awaited2<T> = T extends Promise<infer V> ? V : T;
type H = Awaited2<Promise<string>>;  // string

// extract function params
type Params<T> = T extends (...args: infer P) => unknown ? P : never;
type I = Params<typeof f>;           // []

// practical: MessageOf extracts message field from matching variants
type Message = { message: string } | { error: string } | null;
type MessageOf<T> = T extends { message: infer M } ? M : never;
type J = MessageOf<Message>;         // string

console.log(a, b, C, D.length, F, G, H, I.length, J);

// Practice: Flatten<T> that unwraps nested arrays recursively.
