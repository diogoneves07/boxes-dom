/**
 * Converts to camelCase the string.
 */
export function toCamelCase(string: string): string {
  const rmsPrefix = /^-ms-/;
  const rdashAlpha = /-([a-z])/g;
  return string
    .replace(rmsPrefix, "ms-")
    .replace(rdashAlpha, (_all: string, letter: string): string => {
      return letter.toUpperCase();
    });
}
