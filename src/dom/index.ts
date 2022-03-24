import { Func } from "../types";

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

export const getElement = (event: Event, htmlAttribute: string) => {
  const { currentTarget = document.body } = event;
  let { target } = event;
  while (target !== currentTarget) {
    if (target && (target as HTMLElement).hasAttribute(htmlAttribute))
      return target;
    target = (target as HTMLElement).parentNode;
  }
  if (target && (target as HTMLElement).hasAttribute(htmlAttribute))
    return target;
  return null;
};

export const on = (
  element: Element | HTMLElement | Document | Window,
  event: keyof DocumentEventMap,
  handler: Func,
) => {
  if (element && event) {
    element.addEventListener(event, handler, false);
  }
};

export const off = (
  element: Element | HTMLElement | Document | Window,
  event: keyof DocumentEventMap,
  handler: Func,
) => {
  if (element && event) {
    element.removeEventListener(event, handler, false);
  }
};
