import { DOMNodeBoxContent } from "./../types/dom-node-box";
import { DOMNodeBox } from "../types/dom-node-box";
import concatArrays from "../utilities/concat-arrays";
import hasOwnProperty from "../utilities/hasOwnProperty";

function invokeCallbacks(item: any) {
  let values: any = item;
  if (typeof item === "function" && !hasOwnProperty(item, "isBox")) {
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
export default function invokeCallbacksInBoxesValues(
  values: DOMNodeBoxContent | DOMNodeBoxContent[]
): DOMNodeBox | DOMNodeBox[] {
  const result = invokeCallbacks(values);

  return Array.isArray(result) ? concatArrays(concatArrays(result)) : result;
}
