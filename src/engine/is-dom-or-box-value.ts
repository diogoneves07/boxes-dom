import { isBox } from "../../../boxes/src/main";

export default function isDOMOrBoxValue(value: any) {
  return typeof value === "string" ||
    typeof value === "number" ||
    (value && (isBox(value) || value instanceof Text))
    ? true
    : false;
}
