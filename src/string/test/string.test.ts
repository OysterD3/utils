import { describe, expect, it } from "vitest";
import { slugify, truncate } from "../index";

describe("test truncate", () => {
  it("should truncate if more than 3 words", () => {
    expect(truncate("abcd", 3)).toBe("abc");
  });

  it("should have ellipsis", () => {
    expect(truncate("abcd", 3, "...")).toBe("abc...");
  });
});

describe("test slugify", () => {
  it("should return this-is-an-url", () => {
    expect(slugify("THIS- IS AN    URL")).toBe("this-is-an-url");
  });
});
