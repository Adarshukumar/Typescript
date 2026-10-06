# TypeScript Cheatsheet — by Adarsh

## Basic types
```ts
let n: number; let s: string; let b: boolean;
let arr: number[];              // or Array<number>
let ro: readonly number[];      // no mutation
let t: [string, number];        // tuple
let u: string | number;         // union
let lit: "sm" | "md" | "lg";    // literal union
let big: bigint; let sym: symbol;
```

## Objects
```ts
interface User {
  name: string;
  age?: number;          // optional
  readonly id: number;   // immutable
  greet(): string;
}
type Pair<T> = { key: string; value: T };
```

## Functions
```ts
const f = (a: number, b = 2, ...rest: number[]): number => a + b + rest.length;
type Op = (a: number, b: number) => number;   // function type
// overloads: signature; signature; implementation
```

## Narrowing toolbox
```ts
typeof x === "string"    "fly" in obj    x instanceof Date
if (x) {}                x != null       switch (x.kind) {}
```

## Classes
```ts
class A {
  constructor(public x: number, private y = 0, readonly z?: string) {}
  static count = 0;
  get sum() { return this.x + this.y; }
}
abstract class S { abstract area(): number }
```

## Generics
```ts
function first<T>(a: T[]): T | undefined
function get<T, K extends keyof T>(o: T, k: K): T[K]
class Box<T> { value!: T }
```

## Utility types
```ts
Partial<T>  Required<T>  Readonly<T>  Pick<T, K>  Omit<T, K>
Record<K, V>  Exclude<U, M>  Extract<U, M>  NonNullable<T>
ReturnType<F>  Parameters<F>  Awaited<P>  InstanceType<C>
```

## Type-level magic
```ts
keyof T                 // union of keys
typeof value            // type of a value (type position only)
T["key"]                // indexed access
{ [K in keyof T]?: T[K] }             // mapped
T extends U ? X : Y                   // conditional
T extends [infer F, ...rest: any[]]   // infer
type Corner = `${V}-${H}`             // template literal
```

## Assertions & guards
```ts
x as HTMLDivElement       // trust-me cast
function isCat(p): p is Cat { return "meow" in p }
function assertDef<T>(v: T|null): asserts v is T { if (!v) throw … }
const t = { a: 1 } satisfies Config     // check without widening
```

## tsconfig must-haves
```json
{ "strict": true, "noEmit": true, "target": "ES2022",
  "module": "ES2022", "moduleResolution": "bundler" }
```

## Run
```bash
npx tsx lesson.ts      # run directly
npx tsc -p .           # check whole project
```

— Adarsh
