/**
 * Check value is undefined, null, empty string, empty set,
 * empty map, empty array, empty object, negative value and of course false
 * @method
 * @param val {any} The value to inspect
 * @return {boolean}
 * @example
 * isFalsey(0) // false
 * isFalsey(-1) // true
 * isFalsey(false) // true
 * @category Checker
 * @version v0.1.0
 */
export const isFalsey = (val: any): boolean => {
  if (val instanceof Map || val instanceof Set) {
    return val.size === 0;
  }
  if (Object.prototype.toString.call(val) === "[object Object]") {
    return Object.keys(val).length === 0;
  }
  if (Array.isArray(val)) {
    return val.length === 0;
  }
  return (
    val === undefined ||
    val === null ||
    val === "" ||
    val <= -1 ||
    val === false
  );
};

/**
 * Check value is object
 * @method
 * @param val {any} The value to inspect
 * @return {boolean}
 * @example
 * isObject({}) // true
 * isObject([]) // false
 * @category Checker
 * @version v0.1.0
 */
export const isObject = (val: any): boolean =>
  val !== null && typeof val === "object" && !Array.isArray(val);

/**
 * Check both value are equal
 * @method
 * @param val1 {any} The value to inspect
 * @param val2 {any} The value to compare
 * @return {boolean}
 * @example
 * isEqual([1], [1]) // true
 * isEqual([1], [2]) // false
 * @category Checker
 * @version v0.1.0
 */
export const isEqual = (val1: any, val2: any): boolean => {
  // Credits: https://dmitripavlutin.com/how-to-compare-objects-in-javascript
  if (isObject(val1) && isObject(val2)) {
    const keys1 = Object.keys(val1);
    const keys2 = Object.keys(val2);

    if (keys1.length !== keys2.length) return false;

    for (const key of keys1) {
      const v1 = val1[key];
      const v2 = val2[key];
      const areObjects = isObject(v1) && isObject(v2);
      if ((areObjects && !isEqual(v1, v2)) || (!areObjects && v1 !== v2)) {
        return false;
      }
    }

    return true;
  }
  if (Array.isArray(val1) && Array.isArray(val2)) {
    if (val1.length !== val2.length) return false;

    const set1 = new Set(val1);
    const set2 = new Set(val2);
    return val1.every((v) => set2.has(v)) && val2.every((v) => set1.has(v));
  }
  return val1 === val2;
};
