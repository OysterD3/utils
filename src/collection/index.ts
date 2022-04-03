import type { NestedObject, NonNullish, Nullable } from "../types";

/**
 * Deep clone object or array
 * @method
 * @param value {T}
 * @param hasFunctionOrUndefinedValue {boolean?}
 * @returns {T}
 * @example
 * const obj = { foo: { bar: 1 } }
 * const clone = deepClone(obj)
 * clone.foo.bar = 2;
 * console.log(obj.foo.bar) // 1
 * @category Collection
 * @version v0.1.0
 */
export const deepClone = <T>(
  value: T,
  hasFunctionOrUndefinedValue = false,
): T => {
  if (Array.isArray(value)) return [...value] as unknown as T;
  if (typeof value === "object" && hasFunctionOrUndefinedValue)
    return Object.keys(value).reduce((acc, key) => {
      const temp = (value as never)[key];
      (acc as never)[key] = deepClone(temp);
      return acc;
    }, {} as T);
  if (typeof value === "object" && !hasFunctionOrUndefinedValue)
    return JSON.parse(JSON.stringify(value));
  return value;
};

/**
 * Check if key exist from provided path
 * @method
 * @param obj {Record<string, any>}
 * @param path {string}
 * @returns {boolean}
 * @example
 * has({ foo: { bar: 1 } }, "foo.bar") // true
 * has({ foo: { bar: 1 } }, "bar") // false
 * @category Collection
 * @version v0.1.0
 */
export const has = (obj: NestedObject, path: string): boolean => {
  return (
    path
      .split(".")
      .reduce((curr: NestedObject | NonNullish | Nullable<never>, key) => {
        return curr && (curr as NestedObject)[key]
          ? (curr as NestedObject)[key]
          : undefined;
      }, obj) !== undefined
  );
};

/**
 * Get value from provided path, if not found, return default value if any
 * @method
 * @param obj {Record<string, any>}
 * @param path {string}
 * @param defaultValue {T=}
 * @returns {boolean}
 * @example
 * get({ foo: { bar: 1 } }, "foo.bar") // 1
 * get({ foo: { bar: 1 } }, "bar", null) // null
 * get({ foo: { bar: 1 } }, "bar") // undefined
 * @category Collection
 * @version v0.1.0
 */
export const get = <T>(
  obj: NestedObject,
  path: string,
  defaultValue?: T,
): T => {
  return path
    .split(".")
    .reduce((curr: NestedObject | NonNullish | Nullable<T>, key) => {
      return curr && (curr as NestedObject)[key]
        ? (curr as NestedObject)[key]
        : defaultValue;
    }, obj) as unknown as T;
};
