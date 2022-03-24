import { isFalsey } from "../checker";

export const clamp = (n: number, min: number, max: number): number => {
  return Math.min(max, Math.max(min, n));
};

export const random = (min: number, max: number): number => {
  return Math.floor(Math.random() * max + min);
};

// Credits: https://stackoverflow.com/a/149099/6820538
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
