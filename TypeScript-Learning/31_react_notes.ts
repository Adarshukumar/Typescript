// Lesson 31 — TypeScript + React cheat notes. Author: Adarsh
// (Reference shapes — for when you write your first React+TS app.)

import type { ReactNode, FormEvent, ChangeEvent } from "react";

// Props: interface or type — both fine
interface ButtonProps {
  label: string;
  variant?: "primary" | "ghost";      // literal unions instead of strings!
  onClick: () => void;
  children?: ReactNode;
}

// State typing: useState infers from the initial value
//   const [count, setCount] = useState(0);        // number
//   const [user, setUser] = useState<User|null>(null);   // nullable objects

// Events: use React's event types, not DOM ones
function onSubmit(e: FormEvent<HTMLFormElement>): void { e.preventDefault(); }
function onType(e: ChangeEvent<HTMLInputElement>): void { console.log(e.target.value); }

// Hooks with generics
//   const [tab, setTab] = useState<"home" | "profile">("home");
//   const ref = useRef<HTMLDivElement>(null);
//   useEffect(() => {...}, []);           // returns void | destructor only!

// Common rules I learned the hard way:
// - type props top-down: children components get narrow prop types
// - never type useState as any — model the union instead
// - event handlers: use the specific React event type per element
// - for API data, type the fetch result and let inference flow down

type Status = "idle" | "loading" | "error";   // component state machines
const status: Status = "idle";

console.log(status, typeof onSubmit, typeof onType);

// Practice: interface Card { title: string; footer?: ReactNode } and a
// component signature: function Card(props: CardProps): JSX.Element.
