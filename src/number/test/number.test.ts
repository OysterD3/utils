import { describe, expect, it } from "vitest";
import { clamp, formatMoney } from "../index";

describe("test clamp", () => {
  it("should return true", () => {
    expect(clamp(200, 0, 100)).toBe(100);
    expect(clamp(-50, 0, 100)).toBe(0);
  });
});

describe("test formatMoney", () => {
  it("should return RM2,000.00", () => {
    expect(formatMoney({ prefix: "RM" })(2000)).toBe("RM2,000.00");
  });
});
