import { describe, expect, test } from "vitest";
import { createResource } from "../src/index.js";
import { mergeProps, Show, Switch, Match } from "../src/server/rendering.js";
import { resolveSSRNode } from "dom-expressions/src/server.js";

describe("resolveSSRNode", () => {
  test("should resolve a string node", () => {
    expect(resolveSSRNode("Hello World")).toBe("Hello World");
  });

  test("should resolve a null or boolean node", () => {
    expect(resolveSSRNode(null)).toBe("");
    expect(resolveSSRNode(false)).toBe("");
  });

  test("should resolve an array of nodes", () => {
    const nodes = ["<div>", "<span>", "</span>", "</div>"];
    expect(resolveSSRNode(nodes)).toBe("<div><!--!$--><span><!--!$--></span><!--!$--></div>");
  });

  test("should resolve an object with 't' property", () => {
    const node = { t: "<div>Text</div>" };
    expect(resolveSSRNode(node)).toBe("<div>Text</div>");
  });

  test("should resolve a function node", () => {
    const fn = () => "dynamic content";
    expect(resolveSSRNode(fn)).toBe("dynamic content");
  });
});

describe("createResource", () => {
  test("should return initial value immediately if provided", () => {
    const [data] = createResource(() => Promise.resolve("test"), { initialValue: "loading" });
    expect(data()).toBe("loading");
  });

  test("should handle a promise and update the value", async () => {
    const [data, { refetch }] = createResource(
      () => new Promise(resolve => setTimeout(() => resolve("Success!"), 10))
    );

    // Initially, data should be undefined, and loading should be true
    expect(data()).toBeUndefined();
    expect(data.loading).toBe(true);

    await new Promise(r => setTimeout(r, 20)); // Wait for the promise to resolve

    // After resolution, data should have the new value, and loading should be false
    expect(data()).toBe("Success!");
    expect(data.loading).toBe(false);
  });
});

describe("server mergeProps", () => {
  test("preserves properties that shadow Object.prototype methods (toString, valueOf)", () => {
    expect(mergeProps({ toString: 1 }).toString).toBe(1);
    expect(mergeProps({ valueOf: 42 }).valueOf).toBe(42);
    expect(mergeProps({ hasOwnProperty: true }).hasOwnProperty).toBe(true);
  });

  test("last source wins for Object.prototype-shadowing keys", () => {
    expect(mergeProps({ toString: 1 }, { toString: 2 }).toString).toBe(2);
    expect((mergeProps({ toString: 2 }, { toString: undefined }) as any).toString).toBe(2);
  });

  test("still skips __proto__ and constructor to match client behaviour", () => {
    const evil = JSON.parse('{"__proto__":{"evil":true}}');
    mergeProps(evil);
    expect(({} as any).evil).toBeUndefined();

    const withCtor = mergeProps({ constructor: "custom" });
    expect(withCtor.constructor).toBe(Object);
  });

  test("deduplication still works: first source wins when key already added", () => {
    const props = mergeProps({ a: 1 }, { a: 2, b: 3 });
    expect(props.a).toBe(2);
    expect(props.b).toBe(3);
  });
});

// A zero-arg function child is treated as a static value rather than a render-prop
// (see solidjs/solid#1508), since there's nothing for it to receive as an argument.
// The client (packages/solid/src/render/flow.ts) gates on `child.length > 0` before
// invoking it as a render-prop; the server implementation needs to agree, or markup
// rendered with renderToString can diverge from what hydration on the client produces.
describe("Show with a zero-arg function child", () => {
  test("is treated like a plain value, same as ErrorBoundary's fallback", () => {
    function staticChild() {
      return "static content";
    }
    expect(Show({ when: true, children: staticChild as any })).toBe(staticChild as any);
  });

  test("a render-prop (arity > 0) is still invoked with the value", () => {
    expect(Show({ when: "hello", keyed: true, children: (item: any) => `got ${item}` })).toBe(
      "got hello"
    );
    // non-keyed: the render-prop receives an accessor, not the raw value
    expect(Show({ when: "hello", children: (item: any) => `got ${item()}` })).toBe("got hello");
  });
});

describe("Switch/Match with a zero-arg function child", () => {
  test("is treated like a plain value, same as ErrorBoundary's fallback", () => {
    function staticChild() {
      return "static content";
    }
    const result = Switch({
      children: Match<unknown>({ when: true, children: staticChild as any })
    });
    expect(result).toBe(staticChild as any);
  });

  test("a render-prop (arity > 0) is still invoked with the value", () => {
    const keyedResult = Switch({
      children: Match<unknown>({
        when: "hello",
        keyed: true,
        children: (item: any) => `got ${item}`
      })
    });
    expect(keyedResult).toBe("got hello");
    // non-keyed: the render-prop receives an accessor, not the raw value
    const result = Switch({
      children: Match<unknown>({ when: "hello", children: (item: any) => `got ${item()}` })
    });
    expect(result).toBe("got hello");
  });
});
