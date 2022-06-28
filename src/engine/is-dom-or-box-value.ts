import hasTextContent from "../utilities/has-text-content";

export default function isDOMOrBoxValue(value: any) {
  return typeof value === "string" ||
    typeof value === "number" ||
    (value && (value.isBox || hasTextContent(value)))
    ? true
    : false;
}
