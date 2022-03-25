/**
 * https://www.educative.io/edpresso/how-to-use-the-debounce-function-in-javascript
 * @method
 * @param func {Function} The function to invoke
 * @param wait {number} The timeout in millisecond
 * @param immediate {boolean=} Invoke function immediately
 * @category Function
 * @version v0.1.0
 */
export const debounce = (
  func: (...args: any) => any,
  wait: number,
  immediate?: boolean,
): ((this: any, ...args: any) => void) => {
  let timeout: NodeJS.Timeout | null;
  return function executedFunction(this: any, ...args: any) {
    const self = this;

    const later = () => {
      timeout = null;
      if (!immediate) func.apply(self, args);
    };

    const callNow = immediate && !timeout;

    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(later, wait);

    if (callNow) func.apply(self, args);
  };
};
