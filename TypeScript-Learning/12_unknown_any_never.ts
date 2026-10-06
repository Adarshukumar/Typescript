// Lesson 12 — unknown vs any vs never. Author: Adarsh
// any  = "turn OFF checking" — dangerous, infectious
// unknown = "type-safe any" — must narrow before use
// never = "impossible value" — bottom of the type world

// any: escapes ALL checks (avoid in new code)
let a: any = 42;
a.toUpperCase();      // compiles... runtime boom. This is the danger.

// unknown: accepts anything but must be PROVEN before use
function parse(json: string): unknown {
  return JSON.parse(json);
}
const data = parse('{"n": 5}');
// data.n;                      // ERROR: data is unknown
if (typeof data === "object" && data !== null && "n" in data) {
  console.log((data as { n: number }).n);   // narrowed + asserted
}

// never appears in unreachable branches — useful in exhaustive checks
type Shape =
  | { kind: "circle"; r: number }
  | { kind: "square"; s: number };

function area(s: Shape): number {
  switch (s.kind) {
    case "circle": return Math.PI * s.r ** 2;
    case "square": return s.s ** 2;
    default: {
      const _exhaustive: never = s;   // adding a new kind breaks this line
      return _exhaustive;
    }
  }
}
console.log(area({ kind: "circle", r: 2 }));

// Fun never fact: string & number = never (no value is both)
// type Impossible = string & number;

// Practice: write safeParse returning unknown, narrow to {q: string}.
