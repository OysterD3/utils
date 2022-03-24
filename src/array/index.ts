import type { Dictionary } from "../types";

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

export const uniqueArray = <T>(arr: T[]): T[] => [...new Set(arr)];

export const uniqueArrayByKey = <T extends Record<string, any>>(
  arr: T[],
  key: string,
): T[] => [...new Map(arr.map((v) => [v[key], v])).values()];

export const move = <T>(arr: T[], from: number, to: number): T[] => {
  arr.splice(to, 0, arr.splice(from, 1)[0]);
  return arr;
};

/**
 * Credits: https://gist.github.com/ssippe/1f92625532eef28be6974f898efb23ef#gistcomment-3530882
 */
export const cartesian = <T>(...sets: T[][]): T[][] =>
  sets.reduce<T[][]>(
    (accSets, set) =>
      accSets.flatMap((accSet) => set.map((value) => [...accSet, value])),
    [[]],
  );

export const differenceBy = <T>(left: T[], right: T[], key: string): T[] => {
  return left.filter(
    (v) => !right.some((x) => (x as any)[key] === (v as any)[key]),
  );
};

export const difference = <T>(left: T[], right: T[]): T[] => {
  return left.filter((v) => !right.some((x) => x === v));
};
