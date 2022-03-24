import { describe, expect, it } from "vitest";
import {
  cartesian,
  difference,
  differenceBy,
  move,
  toObject,
  uniqueArray,
  uniqueArrayByKey,
} from "../index";

const arrayOfObject = [
  {
    id: 1,
    value: "foo",
  },
  {
    id: 2,
    value: "bar",
  },
  {
    id: 3,
    value: "baz",
  },
];

describe("test toObject", () => {
  it("should be an object with id as key", () => {
    const result = toObject<{ id: number; value: string }>(arrayOfObject, "id");
    expect(result["1"].id).toBe(1);
    expect(result["1"].value).toBe("foo");

    expect(result[1].id).toBe(1);
    expect(result[1].value).toBe("foo");
  });

  it("should be an object with index as key", () => {
    const result = toObject<{ id: number; value: string }>(arrayOfObject, true);
    expect(result["0"].id).toBe(1);
    expect(result["0"].value).toBe("foo");
  });

  it("should be an object with stringify object as key", () => {
    const result = toObject<{ id: number; value: string }>(arrayOfObject);
    expect(result[JSON.stringify({ id: 1, value: "foo" })].id).toBe(1);
    expect(result[JSON.stringify({ id: 1, value: "foo" })].value).toBe("foo");
  });
});

describe("test uniqueArray", () => {
  it("should be unique", () => {
    const arr1 = [1, 2, 3];
    const arr2 = [2, 3, 4, 5];
    const result = uniqueArray<number>([...arr1, ...arr2]);
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  it("should be an object with index as key", () => {
    const arr1 = [
      { x: 1, y: 1 },
      { x: 2, y: 1 },
    ];
    const arr2 = [
      { x: 2, y: 2 },
      { x: 3, y: 2 },
    ];
    const result = uniqueArrayByKey<{ x: number; y: number }>(
      [...arr1, ...arr2],
      "x",
    );
    expect(result).toEqual([
      { x: 1, y: 1 },
      { x: 2, y: 2 },
      { x: 3, y: 2 },
    ]);
  });
});

describe("test move", () => {
  const arr = [1, 2, 3, 4];

  it("should return true", () => {
    const result = move([1, 2, 3, 4], 0, 3);
    expect(result).toEqual([2, 3, 4, 1]);
  });

  it("should not modify original array", () => {
    move([1, 2, 3, 4], 0, 3);
    expect(arr).toEqual([1, 2, 3, 4]);
  });
});

describe("test cartesian", () => {
  it("should return [[1, 10], [2, 10]]", () => {
    expect(cartesian([1, 2], [10])).toEqual([
      [1, 10],
      [2, 10],
    ]);
  });
  it("should return [[1, 10], [1, 20], [2, 10], [2, 20]]", () => {
    expect(cartesian([1, 2], [10, 20])).toEqual([
      [1, 10],
      [1, 20],
      [2, 10],
      [2, 20],
    ]);
  });
});

describe("test differenceBy", () => {
  it("should return [{x: 1}]", () => {
    expect(
      differenceBy([{ x: 1 }, { x: 2 }], [{ x: 2 }, { x: 3 }], "x"),
    ).toEqual([{ x: 1 }]);
  });
});

describe("test difference", () => {
  it("should return [1]", () => {
    expect(difference([1, 2], [2, 3])).toEqual([1]);
  });
});
