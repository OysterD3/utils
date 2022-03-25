/**
 * Set Cookies
 * @method
 * @param key {string} The Cookies key
 * @param value {string} The Cookies value
 * @param duration {number=} The Cookies duration
 *
 * @category Browser
 * @version v0.1.0
 */
export const setCookie = (key: string, value: any, duration?: number): void => {
  let expires = "; expires=Mon, 30 Dec 2030 16:00:00 GMT";
  if (duration) {
    const date = new Date();
    date.setSeconds(duration);
    expires = `; expires=${date.toUTCString()}`;
  }
  document.cookie = `${key}=${value || ""}${expires}; path=/; SameSite=Strict`;
};

/**
 * Get Cookies value by key
 * @method
 * @param key {string} The Cookies key
 * @return {string} The Cookies value
 * @category Browser
 * @version v0.1.0
 */
export const getCookie = (key: string): string => {
  return (
    document.cookie
      .split("; ")
      .find((el) => el.startsWith(key))
      ?.split("=")[1] || ""
  );
};

/**
 * Delete Cookies value by key
 * @method
 * @param key {string} The Cookies key
 * @param domain {boolean=} To delete a Cookies that bound to the domain
 * @category Browser
 * @version v0.1.0
 */
export const deleteCookie = (key: string, domain?: boolean): void => {
  let d;
  if (domain) {
    d = window.location.hostname.substring(
      window.location.hostname.indexOf(".") + 1,
    );
  }
  document.cookie = `${key}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT; ${
    d ? `domain=${d}` : ""
  }`;
};
