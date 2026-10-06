// Lesson 26 — template literal types: string types with patterns. Author: Adarsh
// Combine literal unions into every possible combination:
type Vertical = "top" | "bottom";
type Horizontal = "left" | "right";
type Corner = `${Vertical}-${Horizontal}`;
// "top-left" | "top-right" | "bottom-left" | "bottom-right"
const c: Corner = "top-left";

// String manipulation built-ins:
type Upper = Uppercase<"hello">;     // "HELLO"
type Lower = Lowercase<"WORLD">;     // "world"
type Cap = Capitalize<"adarsh">;     // "Adarsh"
type Unc = Uncapitalize<"Adarsh">;   // "adarsh"

// Event names — the classic real-world use
type Method = "get" | "post" | "put" | "delete";
type Route = `/${string}`;
type HandlerKey = `${Method} ${Route}`;
// "get /${string}" | "post /${string}" | ...
function route(key: HandlerKey, fn: () => void): void {
  console.log("registered", key);
}
route("get /users", () => {});

// Pattern matching with infer (string parsing at the type level!)
type ExtractAction<T> = T extends `${infer _Prefix}:${infer Action}` ? Action : never;
type Act = ExtractAction<"click:submit">;   // "submit"

// Validate against a pattern
type Hex = `#${string}`;
const color: Hex = "#ff0000";
// const bad: Hex = "ff0000";   // ERROR

// Props like onChange/onFocus generated from a base list
type Prop = "change" | "focus" | "blur";
type Handlers = { [K in `on${Capitalize<Prop>}`]: () => void };
const h: Handlers = { onChange: () => {}, onFocus: () => {}, onBlur: () => {} };

console.log(c, Upper, Cap, Act, color, Object.keys(h).length);

// Practice: type CSSVar = `--${string}` and a setVar(name: CSSVar, v: string).
