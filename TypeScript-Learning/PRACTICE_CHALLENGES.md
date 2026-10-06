# 30 TypeScript Challenges — by Adarsh

Mark `[x]` when solved. Type-first: NO `any` allowed anywhere. — Adarsh

## Warm-up (01-08)
- [ ] 01. Type a `formatName(first, last?)` that always returns "First LAST".
- [ ] 02. Union: `let id: string | number` — write `normalize(id): string`.
- [ ] 03. Literal type `Direction` with a `move(d: Direction): [number, number]`.
- [ ] 04. Readonly coords — make every mutation a compile error.
- [ ] 05. Tuple swap: `[a, b]` -> `[b, a]` fully typed.
- [ ] 06. Type a `safeDivide(a, b): number | null`.
- [ ] 07. `as const` object of week days + union type from it.
- [ ] 08. Narrow `string | null` through 3 functions without `as`.

## Types & shapes (09-16)
- [ ] 09. Discriminated union `Shape` (circle/square/triangle) + exhaustive `area()`.
- [ ] 10. `ApiResult<T>` with `ok: true/false` variants; handle both.
- [ ] 11. Interface `Vehicle` extended by `Car` and `Bike`; array mixing both.
- [ ] 12. Type guard `isAdmin(u: User): u is AdminUser`.
- [ ] 13. Generic `Stack<T>` with push/pop/peek + size.
- [ ] 14. Generic `paginate<T>(items, page, per): { data: T[]; total: number }`.
- [ ] 15. `getProp<T, K extends keyof T>` — prove it returns `T[K]`.
- [ ] 16. Function overloads: `parse("1") -> number` and `parse("a") -> string`.

## Type-level (17-24)
- [ ] 17. `MyPick<T, K>` — reimplement Pick with mapped types.
- [ ] 18. `MyOmit<T, K>` — combine mapped + conditional + Exclude.
- [ ] 19. `DeepReadonly<T>` — recurse into nested objects.
- [ ] 20. `Flatten<T>` — `string[][] -> string[]` with infer.
- [ ] 21. `Head<T>` / `Tail<T>` for tuple types.
- [ ] 22. `Length<T>` — `typeof` a tuple -> its length as literal.
- [ ] 23. `EventNames` — template literal: `on${Capitalize<...>}`.
- [ ] 24. `Paths<T>` — dot-notation keys of a nested object ("user.name").

## Real-world (25-30)
- [ ] 25. Type a fetch wrapper: `api.get<T>(url): Promise<ApiResult<T>>`.
- [ ] 26. Typed form state: `errors: Partial<Record<keyof Form, string>>`.
- [ ] 27. State machine type: "idle | loading | success(data) | error(msg)".
- [ ] 28. Typed event emitter class (on/emit with per-event payload).
- [ ] 29. Module split: types.ts + utils.ts + main.ts importing each other.
- [ ] 30. Find and fix 5 type bugs planted in a teammate's file (make a
       friend's file buggy first — best exercise there is).

Done? Read the type-challenges folder next door and climb the difficulty
ladder for real. — Adarsh
