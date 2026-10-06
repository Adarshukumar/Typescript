// Lesson 03 — the basic types. Author: Adarsh
let age: number = 21;
let name: string = "Adarsh";
let isLearning: boolean = true;
let nothing: null = null;
let notYet: undefined = undefined;
let big: bigint = 9007199254740993n;
let sym: symbol = Symbol("id");

// Annotations are optional when TS can infer (see lesson 04) —
// but explicit annotations document public code:
let score: number = 91;

// number covers ints and floats alike
let price: number = 49.99;

// Arrays: two syntaxes, same thing
let skills: string[] = ["python", "ts"];
let scores: Array<number> = [88, 91];

// Tuples: fixed length, fixed types per slot
let point: [number, number] = [3, 7];

// Functions return values; annotate the return too
function double(n: number): number {
  return n * 2;
}

console.log(age, name, isLearning, score, price, skills, scores, point, double(21));

// Practice: declare a tuple [name: string, score: number] and log it.
