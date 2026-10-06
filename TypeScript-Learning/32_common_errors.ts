// Lesson 32 — the errors everyone hits (and their fixes). Author: Adarsh

// 1) TS2304: Cannot find name 'process'/'window'/...
//    -> lib config: add "types": ["node"] or the right @types package

// 2) TS2339: Property 'x' does not exist on type 'Y'
//    -> usually narrowing needed, or the type is a union (lesson 22)

// 3) TS7006: Parameter 'x' implicitly has an 'any' type
//    -> annotate the parameter; noImplicitAny is doing its job

// 4) TS2322: Type 'X' is not assignable to type 'Y'
//    -> read the DIFF in the message; often readonly/optional mismatch

// 5) "Object is possibly 'null' / 'undefined'"
//    -> narrow first: if (v) / v?.x / v ?? default — never as-forged

// 6) import fails but types are missing for a JS package
//    -> npm i -D @types/<pkg>, or write a small .d.ts (lesson 29)

// 7) The 'as const' forgot-it moment:
const arr = ["a", "b"];
// type is string[] — arr[0] is string, not "a". Fix: ["a","b"] as const

// 8) circular type references with interfaces — break the cycle with
//    a shared third type or use type + import type

// 9) "Type instantiation is excessively deep" — your mapped/conditional
//    type went recursive on a huge union; simplify or split it.

// 10) enum vs as-const object confusion — prefer `as const` objects (lesson 11)

// My debugging order:
// 1. hover the value in the editor   2. read the full error (bottom half!)
// 3. check the tsconfig              4. reduce to a tiny repro file

console.log("error decoding manual complete");

// Practice: intentionally trigger 3 of these and read every word of each error.
