import { isBox } from "../../../boxes/src/main";

import { DOMNodeBoxFragment, DOMNodeBox } from "../types/dom-node-boxes";
import getDOMNodeBoxInternalData from "./get-dom-node-box-internal-data";
import { ReuseDOMNodeBox } from "./reuse-dom-node-box";

const reusableMap = new Set<DOMNodeBox | DOMNodeBoxFragment>();
export default function transformBoxesReuse(values: any) {
  if (Array.isArray(values)) {
    const length = values.length;
    for (let index = 0; index < length; index++) {
      const item = values[index];
      if (
        item &&
        isBox(item) &&
        (item as DOMNodeBox).wrappers.has("dom-node")
      ) {
        const isBoxInUse = getDOMNodeBoxInternalData(item).isBoxInUse;
        if (isBoxInUse || reusableMap.has(item)) {
          values[index] = new ReuseDOMNodeBox(item);
        } else {
          getDOMNodeBoxInternalData(item).isBoxInUse = true;
        }
        reusableMap.add(item);
      }
    }
    reusableMap.clear();
  }
  return values;
}
