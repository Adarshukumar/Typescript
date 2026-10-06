// Lesson 19 — utility types I: Pick, Omit, and friends. Author: Adarsh
interface Student {
  id: number;
  name: string;
  age: number;
  email: string;
  city: string;
}

// Pick<T, K> — keep ONLY the chosen keys
type StudentCard = Pick<Student, "id" | "name">;
const card: StudentCard = { id: 1, name: "Adarsh" };

// Omit<T, K> — everything EXCEPT the chosen keys
type PublicProfile = Omit<Student, "email" | "age">;
const profile: PublicProfile = { id: 1, name: "Adarsh", city: "Delhi" };

// They're built from mapped types (lesson 24). Roughly:
//   Pick   -> { [K in keyof T as K extends keys ? K : never]: T[K] }
//   Omit   -> Pick<T, Exclude<keyof T, K>>

// Related helpers:
type JustName = { name: string };
type WithAge = JustName & { age: number };          // intersection compose

// Readonly<T> — all props immutable (lesson 13)
type FrozenStudent = Readonly<Student>;

// Record<K, V> — object with known keys, each mapping to V
type Grades = Record<"math" | "science", number>;
const grades: Grades = { math: 91, science: 88 };
const byId: Record<number, Student> = { 1: { id: 1, name: "Adarsh", age: 21, email: "e", city: "Delhi" } };

// NonNullable<T> — remove null and undefined from a union
type MaybeName = string | null | undefined;
type SafeName = NonNullable<MaybeName>;   // string

console.log(card, profile, grades, Object.keys(byId), grades.math);

// Practice: from a Product interface build Summary = Pick<...> + discount field.
