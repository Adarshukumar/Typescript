// Lesson 21 — custom type guards + assertions. Author: Adarsh
// A type guard is a function whose RETURN TYPE tells TS what it proved.

// User-defined guard: `x is Cat`
interface Cat { meow(): void }
interface Dog { bark(): void }

function isCat(pet: Cat | Dog): pet is Cat {
  return "meow" in pet;              // your proof logic
}

function petSound(pet: Cat | Dog): string {
  return isCat(pet) ? "meow" : "bark";   // narrowed automatically
}

// Assertion function: `asserts x is X` — throws if wrong
function assertDefined<T>(value: T | null | undefined): asserts value is T {
  if (value === null || value === undefined) {
    throw new Error("expected a value!");
  }
}

function processName(name: string | null): string {
  assertDefined(name);
  return name.toUpperCase();     // TS knows: NOT null from here on
}

// `satisfies` — check against a type WITHOUT widening (TS 4.9+)
type Theme = Record<string, string>;
const dark = {
  bg: "#111",
  fg: "#eee",
} satisfies Theme;              // checked AND keeps literal types
// const bad = { bg: 123 } satisfies Theme;  // ERROR

// as (assertion) — "trust me, compiler". Use rarely:
const el = document.getElementById("root") as HTMLDivElement | null;
const len = (JSON.parse('[1,2]') as number[]).length;

// Guard vs assertion: guard = evidence at runtime; as = promise with no proof.
console.log(petSound({ bark: () => {} }), processName("adarsh"), dark.bg, len);

// Practice: write isDateString(v: unknown): v is string (use a regex).
