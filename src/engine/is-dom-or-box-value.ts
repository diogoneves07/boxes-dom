import hasOwnProperty from "../utilities/hasOwnProperty";

export default function isDOMOrBoxValue(value: any) {
  return typeof value === "string" ||
    typeof value === "number" ||
    (value && (hasOwnProperty(value, "isBox") || value instanceof Text))
    ? true
    : false;
}
