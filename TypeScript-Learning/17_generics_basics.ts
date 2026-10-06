// Lesson 17 — generics: types as parameters. Author: Adarsh
// Without generics you'd write this once per type. With them, ONCE forever.
function first<T>(items: T[]): T | undefined {
  return items[0];
}
console.log(first([1, 2, 3]), first(["a", "b"]));   // number | undefined, string | undefined

// T is just a name — T, U, V or descriptive names
function pair<K, V>(key: K, value: V): [K, V] {
  return [key, value];
}
console.log(pair("age", 21));

// Generic interfaces and classes
interface Box<T> {
  value: T;
  replace(newValue: T): Box<T>;
}
const box: Box<number> = {
  value: 1,
  replace(v) { return { value: v, replace: this.replace }; },
};

class Stack<T> {
  #items: T[] = [];
  push(item: T): void { this.#items.push(item); }
  pop(): T | undefined { return this.#items.pop(); }
  get size(): number { return this.#items.length; }
}
const s = new Stack<string>();
s.push("a"); s.push("b");
console.log(s.pop(), s.size);

// Type inference means you rarely write <T> at call sites
const n = first([10, 20]);     // TS infers T = number

// Default type parameters
type Result<T = void> = { ok: boolean; data?: T };
const r: Result = { ok: true };

console.log(n, box.value, r);

// Practice: generic function last<T>(items: T[]): T | undefined.
