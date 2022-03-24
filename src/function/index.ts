// Credits: https://www.educative.io/edpresso/how-to-use-the-debounce-function-in-javascript
export const debounce = (
  func: (...args: any) => any,
  wait: number,
  immediate: boolean,
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
