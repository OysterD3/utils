export type Dictionary<TValue> = {
  [key: string | number]: TValue;
};

export type NonNullish = string | number | boolean | object | NonNullish[];

export type Nullable<T> = T | null | undefined;

export type NestedObject = {
  [key: string]: NestedObject | Nullable<never> | NonNullish;
};

export interface Func {
  (): void;
}

export type Modifier = string | { [modifier: string]: boolean };
