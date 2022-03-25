import { isFalsey } from "../checker";

/**
 * Clamps n within the min and max number
 * @method
 * @param n {number} The number to clamp
 * @param min {number} The minimum number
 * @param max {number} The maximum number
 * @return {number} Returns the clamped number
 * @example
 * clamp(-100, 0, 100) // 0
 * clamp(200, 0, 100) // 100
 * @category Number
 * @version v0.1.0
 */
export const clamp = (n: number, min: number, max: number): number => {
  return Math.min(max, Math.max(min, n));
};

/**
 * Randomize number between the min and max number
 * @method
 * @param min {number} The minimum number
 * @param max {number} The maximum number
 * @return {number} Returns the random number
 * @category Number
 * @version v0.1.0
 */
export const random = (min: number, max: number): number => {
  return Math.floor(Math.random() * max + min);
};

/**
 * Format to a standard money string. Credits: https://stackoverflow.com/a/149099/6820538
 * @method
 * @category Number
 * @version v0.1.0
 */
export const formatMoney = ({
  prefix = null,
  suffix = null,
  decimalCount = 2,
  decimal = ".",
  thousands = ",",
}: {
  prefix?: null | string;
  suffix?: null | string;
  decimalCount?: number;
  decimal?: string;
  thousands?: string;
}): ((amount: string | number) => string | undefined) => {
  return (amount: string | number): string | undefined => {
    if (typeof amount === "string" && !isNaN(parseFloat(amount))) {
      amount = parseFloat(amount);
    } else if (typeof amount === "string") {
      return amount;
    }
    if (!isFalsey(amount)) {
      const findDecimal = amount.toString().split(".");
      if (findDecimal.length > 1 && findDecimal[1].length > decimalCount) {
        return amount.toString();
      }
    }
    try {
      decimalCount = Math.abs(decimalCount);
      decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

      const negativeSign = amount < 0 ? "-" : "";

      const i = parseInt(
        (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)),
      ).toString();
      const j = i.length > 3 ? i.length % 3 : 0;

      return (
        negativeSign +
        (prefix ?? "") +
        (j ? i.substring(0, j) + thousands : "") +
        i.substring(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
        (decimalCount
          ? decimal +
            Math.abs(Number(amount) - Number(i))
              .toFixed(decimalCount)
              .slice(2)
          : "") +
        (suffix ?? "")
      );
    } catch (e) {
      console.log(e);
    }
  };
};
