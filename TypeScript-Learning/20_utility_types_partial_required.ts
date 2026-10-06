// Lesson 20 — utility types II: Partial, Required, and friends. Author: Adarsh
interface DraftPost {
  title: string;
  body: string;
  tags: string[];
}

// Partial<T> — every property becomes optional. Perfect for update payloads.
function updatePost(id: number, changes: Partial<DraftPost>): DraftPost {
  const base: DraftPost = { title: "untitled", body: "", tags: [] };
  return { ...base, ...changes };
}
console.log(updatePost(1, { title: "TS notes" }));
console.log(updatePost(2, { tags: ["ts", "notes"], body: "…" }));

// Required<T> — the opposite: every property becomes required
type CompletePost = Required<DraftPost>;

// ReturnType<T> — extract what a function gives back
function createUser(name: string, age: number) {
  return { name, age, active: true };
}
type User = ReturnType<typeof createUser>;   // { name: string; age: number; active: boolean }
const u: User = { name: "Adarsh", age: 21, active: true };

// Parameters<T> — extract a function's parameter list as a tuple
type CreateArgs = Parameters<typeof createUser>;   // [name: string, age: number]
const args: CreateArgs = ["Riya", 20];
const u2 = createUser(...args);

// Awaited<T> — unwrap a Promise's value type (async code)
async function fetchName(): Promise<string> { return "Adarsh"; }
type Name = Awaited<ReturnType<typeof fetchName>>;   // string
const name: Name = "Adarsh";

// Exclude / Extract — filter unions
type Keys = "a" | "b" | "c";
type WithoutB = Exclude<Keys, "b">;          // "a" | "c"
type OnlyVowels = Extract<Keys, "a" | "c">; // "a" | "c"

console.log(u, u2, name, WithoutB);

// Practice: type Patch = Partial<Post> & { id: number } for a PATCH endpoint.
