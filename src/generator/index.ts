import type { Modifier } from "../types";

const _formatModifier = (
  be: string,
  modifiers: Modifier | Modifier[],
): string => {
  if (typeof modifiers === "string") return ` ${be}--${modifiers}`;

  if (Array.isArray(modifiers)) {
    return modifiers.reduce(
      (acc: string, curr) => acc + _formatModifier(be, curr),
      "",
    );
  }

  return Object.keys(modifiers).reduce((acc, curr) => {
    if (modifiers[curr]) return acc + _formatModifier(be, curr);
    return acc;
  }, "");
};

/**
 * Generate Block Element Modifier string
 * @typedef {string | Record<string, boolean>} Modifier
 * @method
 * @param name {string} Block name
 * @return {generateBEM~string}
 * @example
 * generateBEM("facil-button")() // "facil-button"
 * generateBEM("facil-button")("block") // "facil-button__block"
 * @category Generator
 * @version v0.3.0
 */
export const generateBEM = (name: string) => {
  /**
   * @param {Modifier | Modifier[]} elementOrModifiers=
   * @param {Modifier | Modifier[]} modifiers=
   */
  return (
    elementOrModifiers?: Modifier | Modifier[],
    modifiers?: Modifier | Modifier[],
  ): string => {
    if (elementOrModifiers && typeof elementOrModifiers !== "string") {
      modifiers = elementOrModifiers;
      elementOrModifiers = "";
    }
    const be = elementOrModifiers ? `${name}__${elementOrModifiers}` : name;
    return modifiers ? be + _formatModifier(be, modifiers) : be;
  };
};
