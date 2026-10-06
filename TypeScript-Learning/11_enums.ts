// Lesson 11 — enums (and their modern alternatives). Author: Adarsh
// Numeric enum: auto-numbered from 0
enum Direction {
  Up,        // 0
  Down,      // 1
  Left,      // 2
  Right,     // 3
}
console.log(Direction.Up, Direction[1]);   // 0 'Down' — reverse mapping works

// String enums — better logs, safer serialization
enum Level {
  Beginner = "BEGINNER",
  Advanced = "ADVANCED",
}
console.log(Level.Advanced);

// Const enums: erased entirely at compile time, zero runtime cost
const enum Fast {
  A = 1,
  B = 2,
}
console.log(Fast.A + Fast.B);   // compiles to just: 3

// Modern alternative #1 — const object with as const (plain JS!)
const Status = {
  Draft: "draft",
  Published: "published",
} as const;
type Status = (typeof Status)[keyof typeof Status];   // "draft" | "published"
function publish(s: Status) { return `now ${s}`; }
console.log(publish(Status.Published));

// Why prefer as const objects? No special TS runtime, works with JS interop,
// and no reverse-mapping surprises. Enums still fine for old codebases.

// Practice: build a Weeks const object + union type from it, loop it.
