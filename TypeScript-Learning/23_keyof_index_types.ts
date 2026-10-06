// Lesson 23 — keyof, typeof, and indexed access. Author: Adarsh
const config = {
  host: "localhost",
  port: 8080,
  debug: true,
};

// typeof on a VALUE gives its TYPE (type-level only!)
type Config = typeof config;      // { host: string; port: number; debug: boolean }

// keyof gives the union of keys
type ConfigKey = keyof Config;    // "host" | "port" | "debug"
const k: ConfigKey = "port";

// Indexed access: pull a type OUT of another type
type Port = Config["port"];        // number
type HostOrPort = Config["host" | "port"];   // string | number

// The famous safe-getter pattern (from lesson 18)
function get<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
console.log(get(config, "port"));   // typed as number

// Array element types via indexed access
const names = ["adarsh", "riya"] as const;
type Name = (typeof names)[number];   // "adarsh" | "riya"

// Extracting types from classes and functions
class User { constructor(public name: string) {} }
type UserInstance = InstanceType<typeof User>;
const u: UserInstance = new User("Adarsh");

// keyof with generics — constrain to "any key of T" everywhere
function keys<T>(obj: T): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[];
}
console.log(keys(config));   // ("host" | "port" | "debug")[]

// Practice: type EventMap = { click: MouseEvent; key: KeyboardEvent }
// then type Handler<K extends keyof EventMap> = (e: EventMap[K]) => void.
