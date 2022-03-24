import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { debounce } from "../index";

describe("test debounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should run once", () => {
    const mock = vi.fn(() => console.log("executed"));
    const debouncedFunction = debounce(mock, 1000, true);
    for (let i = 0; i < 100; i++) {
      debouncedFunction();
    }
    expect(mock).toHaveBeenCalledTimes(1);
  });
});
