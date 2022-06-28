import { DOMNodeBox } from "../types/dom-node-box";
import concatArrays from "../utilities/concat-arrays";

function invokeCallbacks(item: any) {
  let values: any = item;
  if (typeof item === "function" && !(item as any).isBox) {
    values = item();
  }
  if (Array.isArray(values)) {
    const length = values.length;
    for (let index = 0; index < length; index++) {
      values[index] = invokeCallbacks(values[index]);
    }
  }
  return values;
}
export default function normalizeBoxesValues(
  values:
    | (DOMNodeBox | Function | string)[]
    | (DOMNodeBox | Function | string)[][]
    | Function
): DOMNodeBox | DOMNodeBox[] {
  const result = invokeCallbacks(values);
  return Array.isArray(result) ? concatArrays(concatArrays(result)) : result;
}
