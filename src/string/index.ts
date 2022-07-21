/**
 * Truncate string if exceed specific length, pad end with ellipsis if any
 * @method
 * @param str {string} The string to truncate
 * @param length {number=} The maximum number of characters
 * @param ellipsis {string=} The string pad at the end
 * @return {string} Returns truncated string
 * @example
 * truncate("abcd", 3) // "abc"
 * truncate("abcd", 3, "...") // "abc..."
 * @category String
 * @version v0.1.0
 */
export const truncate = (
  str: string,
  length = 100,
  ellipsis?: string,
): string => {
  if (str.length > length)
    return ellipsis
      ? `${str.substring(0, length)}${ellipsis}`
      : str.substring(0, length);
  return str;
};

/**
 * To slugify simple string, if you want to handle complex string,
 * you can check out https://www.npmjs.com/package/slugify.
 * Credits: https://stackoverflow.com/questions/1053902/how-to-convert-a-title-to-a-url-slug-in-jquery#comment34216351_1054862
 * @method
 * @param str {string} The string to slugify
 * @return {string} Returns slugified string
 * @example
 * slugify("THIS- IS AN    URL") // "this-is-an-url"
 * @category String
 * @version v0.1.0
 */
export const slugify = (str: string): string => {
  return str
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[-]+/g, "-")
    .replace(/[^\w-]+/g, "");
};

/**
 * Capitalize provided string
 * @method
 * @param str {string} The string to be capitalized
 * @example
 * capitalize("Lorem ipsum dolor sit amet") // "Lorem Ipsum Dolor Sit Amet"
 * @category String
 * @version v0.3.0
 */
export const capitalize = (str: string): string => {
  return str
    .split(" ")
    .map((v) => v.charAt(0).toUpperCase() + v.substring(1))
    .join(" ");
};
