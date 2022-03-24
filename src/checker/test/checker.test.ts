import { describe, expect, it } from "vitest";
import { deepClone } from "../../collection";
import { isEqual, isFalsey, isObject } from "../index";

describe("test isFalsey", () => {
  it("should return false", () => {
    expect(isFalsey(0)).toBe(false);
  });
  it("should return true", () => {
    expect(isFalsey([])).toBe(true);
    expect(isFalsey(-1)).toBe(true);
    expect(isFalsey(-2)).toBe(true);
    expect(isFalsey({})).toBe(true);
    expect(isFalsey(new Set())).toBe(true);
    expect(isFalsey(new Map())).toBe(true);
    expect(isFalsey("")).toBe(true);
    expect(isFalsey(null)).toBe(true);
    expect(isFalsey(undefined)).toBe(true);
  });
});

describe("test isObject", () => {
  it("should return true", () => {
    expect(isObject({})).toBe(true);
  });

  it("should return false", () => {
    expect(isObject([1, 2, 3])).toBe(false);
    expect(isObject([{ x: 1 }])).toBe(false);
  });
});

describe("test isEqual", () => {
  const obj = {
    foo: 1,
    bar: {
      baz: 2,
    },
  };

  it("should return true", () => {
    const clone = deepClone(obj);
    expect(isEqual(obj, clone)).toBe(true);
    const arr1 = [1, 2, 3];
    const arr2 = [1, 2, 3];
    expect(isEqual(arr1, arr2)).toBe(true);
  });

  it("should return false", () => {
    const clone = deepClone(obj);
    clone.bar.baz = 4;
    expect(isEqual(obj, clone)).toBe(false);
  });

  it("should return true even orders different", () => {
    const arr1 = [1, 2, 3];
    const arr2 = [1, 3, 2];
    expect(isEqual(arr1, arr2)).toBe(true);
  });
});
