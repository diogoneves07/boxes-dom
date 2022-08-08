import { toCamelCase } from "./to-camel-case";

/**
 * Converts CSS string rules to object.
 */
export default function CSSStringRulesToObject(
  CSSStringRules: string
): Record<string, string> {
  const CSSProperties = `${CSSStringRules};`.split(";");
  const styleObject: Record<string, string> = {};
  for (const value of CSSProperties) {
    const property = value;
    const propertyIndex = property.indexOf(":") + 1;
    const propertyName = property.substring(0, propertyIndex - 1);
    if (propertyName) {
      styleObject[toCamelCase(propertyName.trim())] = property
        .substring(propertyIndex, property.length)
        .trim();
    }
  }

  return styleObject;
}
