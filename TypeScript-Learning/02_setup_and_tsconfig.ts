// Lesson 02 — setup and tsconfig. Author: Adarsh
// Install once:  npm i -g typescript
// Check:         tsc --version

// Two ways to run TS:
//   1) Compile then run:   tsc file.ts  ->  file.js  ->  node file.js
//   2) Run directly:       npx tsx file.ts          (great for learning)

// tsconfig.json controls the compiler. Key flags I use everywhere:
//   "strict": true                  <- ALWAYS. The whole point of TS.
//   "target": "ES2022"              <- how new the emitted JS is
//   "noEmit": true                  <- type-check only, don't write files
//   "noUnusedLocals": true          <- catches dead code
//   "noImplicitReturns": true       <- every path must return

// Run a whole project check with:   tsc -p .
// Most editors (VS Code) check as you type — errors show instantly.

const msg: string = "tsconfig is the project's type rulebook";
console.log(msg);

// Practice: add "noUnusedLocals": true to tsconfig, declare an unused
// variable, and watch the compiler complain.
