import type { NestedObject, NonNullish, Nullable } from "../types";

/**
 * @param value {any}
 * @returns {any}
 */
export const deepClone = <T>(value: T): T => {
  if (Array.isArray(value)) return [...value] as unknown as T;
  if (typeof value === "object")
    return Object.keys(value).reduce((acc, key) => {
      const temp = (value as never)[key];
      (acc as never)[key] = deepClone(temp);
      return acc;
    }, {} as T);
  return value;
};

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
