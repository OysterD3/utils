import { describe, it, expect } from "vitest";
import { generateBEM } from "../index";

describe("test bem", () => {
  it("should generate proper bem", () => {
    const bem = generateBEM("facil-button");
    const disabled = true;
    const primary = false;
    expect(bem()).toBe("facil-button");
    expect(bem("block")).toBe("facil-button__block");
    expect(bem("block", ["disabled", "primary"])).toBe(
      "facil-button__block facil-button__block--disabled facil-button__block--primary",
    );
    expect(bem(["disabled", "primary"])).toBe(
      "facil-button facil-button--disabled facil-button--primary",
    );
    expect(bem("block", { disabled, primary })).toBe(
      "facil-button__block facil-button__block--disabled",
    );
  });
});
