import { describe, expect, it } from "vitest";
import { deepClone, get, has } from "../index";

const obj = {
  foo: 1,
  bar: {
    baz: 2,
  },
};

describe("test deepClone", () => {
  it("should not modify original object", () => {
    const clone = deepClone<{ foo: number; bar: { baz: number } }>(obj);
    clone.foo = 4;
    expect(obj.foo).toBe(1);
    expect(clone.foo).toBe(4);
  });

  it("should not modify original nested value", () => {
    const clone = deepClone<{ foo: number; bar: { baz: number } }>(obj);
    clone.bar.baz = 4;
    expect(obj.bar.baz).toBe(2);
    expect(clone.bar.baz).toBe(4);
  });
});

describe("test has", () => {
  it("should be true", () => {
    expect(has(obj, "foo")).toBe(true);
    expect(has(obj, "bar.baz")).toBe(true);
  });
  it("should be false", () => {
    expect(has(obj, "baz")).toBe(false);
  });
});

describe("test get", () => {
  it("should be 1", () => {
    expect(get(obj, "foo")).toBe(1);
  });
  it("should be 2", () => {
    expect(get(obj, "bar.baz")).toBe(2);
  });
  it("should be an object", () => {
    expect(get(obj, "bar")).toEqual({ baz: 2 });
  });
  it("should be null", () => {
    expect(get(obj, "baz", null)).toBeNull();
  });
});
