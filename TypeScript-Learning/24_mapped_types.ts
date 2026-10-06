// Lesson 24 — mapped types: build types by TRANSFORMING other types. Author: Adarsh
type User = { id: number; name: string; email: string };

// Basic map: iterate keys, keep the value types
type Clone<T> = { [K in keyof T]: T[K] };
type SameUser = Clone<User>;   // identical to User

// Add modifiers while mapping
type MyReadonly<T> = { readonly [K in keyof T]: T[K] };
type MyPartial<T> = { [K in keyof T]?: T[K] };
type MyRequired<T> = { [K in keyof T]-?: T[K] };   // -? removes optionality

// How Partial/Readonly actually work in TS's core:
//   type Partial<T> = { [K in keyof T]?: T[K] | undefined }

// Key remapping with `as` (TS 4.1+): rename keys while mapping
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};
type UserGetters = Getters<User>;
// { getId: () => number; getName: () => string; getEmail: () => string }
const g: UserGetters = {
  getId: () => 1, getName: () => "Adarsh", getEmail: () => "a@b.c",
};

// Filter keys during mapping
type OnlyStrings<T> = { [K in keyof T as T[K] extends string ? K : never]: T[K] };
type StringProps = OnlyStrings<User>;   // { name: string; email: string }

// Mapped over unions too
type Nullable<T> = { [K in keyof T]: T[K] | null };
const n: Nullable<User> = { id: null, name: "Adarsh", email: null };

console.log(g.getId(), String(Object.keys(StringProps).length));

// Practice: Nullable except id — remap so id stays non-null.
