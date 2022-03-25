import type { Dictionary } from "../types";

/**
 * Convert an array to an object
 * @method
 * @param arr {Array<T>} The array to convert
 * @param key {string=} The key as object's key
 * @return {Record<string, T>}
 *
 * @example
 * toObject([{ id: 1 , value: "foo" }, { id: 2, value: "bar" }], "id")
 * // {"1": { id: 1 , value: "foo" }, "2": { id: 2, value: "bar" }}
 * @category Array
 * @version v0.1.0
 */
export const toObject = <T>(
  arr: Array<T>,
  key?: string | boolean,
): Dictionary<T> => {
  return arr.reduce((acc, each: T | Dictionary<T>, idx) => {
    if (!each) return acc;
    if (key === true) {
      acc[idx] = each as T;
    } else if (key && (each as Dictionary<T>)[key]) {
      acc[(each as never)[key]] = each as T;
    } else {
      acc[JSON.stringify(each)] = each as T;
    }
    return acc;
  }, {} as Dictionary<T>);
};

/**
 * Unique array's elements
 * @method
 * @param arr {Array<T>} The array to be uniquefy
 * @return {Array<T>} The unique array
 *
 * @example
 * uniqueArray([1, 1, 2, 2])
 * // [1, 2]
 * @category Array
 * @version v0.1.0
 */
export const uniqueArray = <T>(arr: T[]): T[] => [...new Set(arr)];

/**
 * Unique array of object's elements by key
 * @method
 * @param arr {Array<T>} The array of object to be uniquefy
 * @param key {string} The key to inspect
 * @return {Array<T>} The unique array of object
 * @example
 * uniqueArray([{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 2, y: 2 }])
 * // [{ x: 1, y: 1}, { x: 2, y: 2 }]
 * @category Array
 * @version v0.1.0
 */
export const uniqueArrayByKey = <T extends Record<string, any>>(
  arr: T[],
  key: string,
): T[] => [...new Map(arr.map((v) => [v[key], v])).values()];

/**
 * Move an element to provided index
 * @method
 * @param arr {Array<T>} The array to modify
 * @param from {number} The index of the element
 * @param to {number} The index of destination
 * @return {Array<T>}
 * @example
 * move([1, 2, 3, 4], 0, 3)
 * // [2, 3, 4, 1]
 * @category Array
 * @version v0.1.0
 */
export const move = <T>(arr: T[], from: number, to: number): T[] => {
  arr.splice(to, 0, arr.splice(from, 1)[0]);
  return arr;
};

/**
 * Cartesian product of multiple arrays
 *
 * Credits: https://gist.github.com/ssippe/1f92625532eef28be6974f898efb23ef#gistcomment-3530882
 * @method
 * @param sets {...T[][]} The array(s) to be combine
 * @return {T[][]} Two-dimensional array of combination
 * @example
 * cartesian([1,2],[10,20],[100,200,300])
 * // [ [ 1, 10, 100 ],
 // [ 1, 10, 200 ],
 // [ 1, 10, 300 ],
 // [ 1, 20, 200 ],
 // [ 1, 20, 300 ],
 // [ 2, 10, 100 ],
 // [ 1, 20, 100 ],
 // [ 2, 10, 200 ],
 // [ 2, 10, 300 ],
 // [ 2, 20, 100 ],
 // [ 2, 20, 200 ],
 // [ 2, 20, 300 ] ]
 * @category Array
 * @version v0.1.0
 */
export const cartesian = <T>(...sets: T[][]): T[][] =>
  sets.reduce<T[][]>(
    (accSets, set) =>
      accSets.flatMap((accSet) => set.map((value) => [...accSet, value])),
    [[]],
  );

/**
 * Get the difference of two array
 * @method
 * @param left {T[]} The array to inspect
 * @param right {T[]} The array to exclude
 * @param key {string} The key to inspect
 * @return {T[]} The excluded array of item
 * @example
 * differenceBy([{ x: 1 }, { x: 2 }], [{ x: 2 }, { x: 3 }], "x")
 * // [{ x: 1 }]
 * @category Array
 * @version v0.1.0
 */
export const differenceBy = <T>(left: T[], right: T[], key: string): T[] => {
  return left.filter(
    (v) => !right.some((x) => (x as any)[key] === (v as any)[key]),
  );
};

/**
 * Get the difference of two array of object
 * @method
 * @param left {T[]} The array to inspect
 * @param right {T[]} The array to exclude
 * @return {T[]} The excluded array of item
 * @example
 * difference([1, 2], [2, 3])
 * // [1]
 * @category Array
 * @version v0.1.0
 */
export const difference = <T>(left: T[], right: T[]): T[] => {
  return left.filter((v) => !right.some((x) => x === v));
};
