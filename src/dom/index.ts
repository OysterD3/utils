import { Func } from "../types";

/**
 * Get value by attribute from DOM
 * @method
 * @param event {Event}
 * @param htmlAttribute {string}
 * @return {string?}
 * @example
 * // Vue.js
 * <ul @click="handleClick">
 *   <li data-id="1">1</li> // click target
 *   <li data-id="2">2</li>
 * </ul>
 *
 * <script>
 *   export default {
 *     methods: {
 *       handleClick(e) {
 *         const data = getAttribute(e, "data-id") // "1"
 *       }
 *     }
 *   }
 * </script>
 * @category DOM
 * @version v0.1.0
 */
export const getAttribute = (
  event: Event,
  htmlAttribute: string,
): null | string => {
  const { currentTarget = document.body } = event;
  let { target } = event;
  while (target !== currentTarget) {
    if (target && (target as HTMLElement).hasAttribute(htmlAttribute))
      return (target as HTMLElement).getAttribute(htmlAttribute);
    target = (target as HTMLElement).parentNode;
  }
  if (target && (target as HTMLElement).hasAttribute(htmlAttribute))
    return (target as HTMLElement).getAttribute(htmlAttribute);
  return null;
};

/**
 * Get DOM element by attribute from DOM
 * @method
 * @param event {Event}
 * @param htmlAttribute {string}
 * @return {HTMLElement?}
 * @example
 * // Vue.js
 * <ul @click="handleClick">
 *   <li data-id="1">1</li> // click target
 *   <li data-id="2">2</li>
 * </ul>
 *
 * <script>
 *   export default {
 *     methods: {
 *       handleClick(e) {
 *         const data = getAttribute(e, "data-id") // <li>
 *       }
 *     }
 *   }
 * </script>
 * @category DOM
 * @version v0.1.0
 */
export const getElement = (
  event: Event,
  htmlAttribute: string,
): HTMLElement | null => {
  const { currentTarget = document.body } = event;
  let { target } = event;
  while (target !== currentTarget) {
    if (target && (target as HTMLElement).hasAttribute(htmlAttribute))
      return target as HTMLElement;
    target = (target as HTMLElement).parentNode;
  }
  if (target && (target as HTMLElement).hasAttribute(htmlAttribute))
    return target as HTMLElement;
  return null;
};

/**
 * Shorthand to add event listener
 * @method
 * @param element {Element | HTMLElement | Document | Window}
 * @param event {DocumentEventMap}
 * @param handler {Func}
 * @example
 * function say() {
 *   console.log("Hey mama!")
 * }
 * on(window, "click", say)
 * @category DOM
 * @version v0.1.0
 */
export const on = (
  element: Element | HTMLElement | Document | Window,
  event: keyof DocumentEventMap,
  handler: Func,
) => {
  if (element && event) {
    element.addEventListener(event, handler, false);
  }
};

/**
 * Shorthand to remove event listener
 * @method
 * @param element {Element | HTMLElement | Document | Window}
 * @param event {DocumentEventMap}
 * @param handler {Func}
 * @example
 * function say() {
 *   console.log("Hey mama!")
 * }
 * on(window, "click", say)
 * @category DOM
 * @version v0.1.0
 */
export const off = (
  element: Element | HTMLElement | Document | Window,
  event: keyof DocumentEventMap,
  handler: Func,
) => {
  if (element && event) {
    element.removeEventListener(event, handler, false);
  }
};
