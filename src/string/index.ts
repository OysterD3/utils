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
 * you can check out https://www.npmjs.com/package/slugify
 */
// Credits: https://stackoverflow.com/questions/1053902/how-to-convert-a-title-to-a-url-slug-in-jquery#comment34216351_1054862
export const slugify = (str: string): string => {
  return str
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[-]+/g, "-")
    .replace(/[^\w-]+/g, "");
};
