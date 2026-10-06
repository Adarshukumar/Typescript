// Lesson 29 — declaration files (.d.ts) and DefinitelyTyped. Author: Adarsh
// .d.ts files describe types WITHOUT code — pure interface.

// my-lib.d.ts (what a library author ships):
declare module "my-lib" {
  export interface Options { retries?: number; timeoutMs?: number }
  export function connect(url: string, opts?: Options): Promise<void>;
}

// Using it:
//   import { connect } from "my-lib";
//   connect("wss://x", { retries: 3 });   // fully typed, zero JS from my-lib

// Ambient declarations — things that exist in the runtime environment:
declare const process: { env: Record<string, string | undefined> };
declare function alert(msg: string): void;   // browsers have this

// Most packages ship types in the package itself ("types" field in
// package.json). For the ones that don't, the community has them:
//   npm i -D @types/lodash     (DefinitelyTyped — thousands of packages)

// Ambient module for a JS file without types:
declare module "./legacy-widget.js" {
  export function render(el: HTMLElement): void;
}

// triple-slash directives (rarely needed manually):
//   /// <reference types="vite/client" />   in vite projects

// Writing your own .d.ts when a tiny lib has none — declare the functions
// you actually use, honestly typed. Don't fake `any` for everything.

const env = process.env.NODE_ENV ?? "development";
console.log("env:", env);

// Practice: write math-utils.d.ts declaring add(a,b) and then import it.
