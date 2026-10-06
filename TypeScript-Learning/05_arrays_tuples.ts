// Lesson 05 — arrays and tuples in depth. Author: Adarsh
const nums: number[] = [3, 1, 4];

// All the array methods are fully typed
const doubled = nums.map((n) => n * 2);       // number[]
const big = nums.filter((n) => n > 2);        // number[]
const total = nums.reduce((a, b) => a + b, 0); // number

// Readonly arrays: no mutation allowed
const frozen: readonly number[] = [1, 2, 3];
// frozen.push(4);  // ERROR: Property 'push' does not exist on readonly
const copy = [...frozen, 4];   // spread into a normal array instead

// Tuples: fixed shape — great for coordinates, key-value pairs, returns
const pt: [number, number] = [10, 20];
const [x, y] = pt;

// Named tuple elements — self-documenting
const size: [width: number, height: number] = [1920, 1080];

// Optional tuple element
const idOrPair: [number, string?] = [1];

// Tuples from function returns
function minMax(vals: number[]): [number, number] {
  return [Math.min(...vals), Math.max(...vals)];
}
const [lo, hi] = minMax([5, 2, 9]);
console.log(doubled, big, total, copy, x + y, size[0], idOrPair.length, lo, hi);

// Practice: write a function returning [avg, count] for a number array.
