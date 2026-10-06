// Lesson 22 — discriminated unions: TS's best modeling tool. Author: Adarsh
// Pattern: every variant has a shared literal "tag" field.

type NetworkState =
  | { status: "idle" }
  | { status: "loading"; startedAt: number }
  | { status: "success"; data: string[] }
  | { status: "error"; message: string };

function render(state: NetworkState): string {
  switch (state.status) {
    case "idle":    return "nothing yet";
    case "loading": return `loading since ${state.startedAt}`;
    case "success": return state.data.join(", ");      // .data exists ONLY here
    case "error":   return `failed: ${state.message}`;
  }
}

// Exhaustiveness: switch covers all variants — no default needed, and if you
// add a variant later the compiler shows exactly which function to update.

// Real-world: API results
type ApiResult<T> =
  | { ok: true; value: T }
  | { ok: false; error: string };

function parseNumber(raw: string): ApiResult<number> {
  const n = Number(raw);
  return Number.isNaN(n) ? { ok: false, error: "not a number" } : { ok: true, value: n };
}

const r1 = parseNumber("42");
const r2 = parseNumber("nope");
if (r1.ok) console.log("got", r1.value);        // only .value when ok
if (!r2.ok) console.log("failed:", r2.error);   // only .error when !ok

// Compare with throwing exceptions or null-checks — callers CAN'T ignore
// the error variant. The type forces you to handle both sides.

console.log(
  render({ status: "loading", startedAt: Date.now() }),
  render({ status: "success", data: ["ts", "js"] }),
);

// Practice: model Result<T,E> for a login() with 3 failure reasons.
