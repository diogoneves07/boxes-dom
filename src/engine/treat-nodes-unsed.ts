import { isBox } from "../../../boxes/src/main";

import { DOMNodeBox, DOMNodeBoxFragment } from "../types/dom-node-boxes";
import beforeUnmountRitual from "./before-unmount-ritual";
import getDOMNodeBoxInternalData from "./get-dom-node-box-internal-data";
import { removeNode } from "./manipulate-dom-methods";
import { ReuseDOMNodeBox } from "./reuse-dom-node-box";
import unmountRitual from "./unmounted-ritual";

const reusableTextNodes: Text[] = [];

export function getReusableTextNode(value: string | number) {
  const h = reusableTextNodes.shift();
  if (h) {
    h.textContent = value.toString();
    return h;
  }
  return false;
}
function runToBox(
  box: DOMNodeBox | DOMNodeBoxFragment,
  el: (DOMNodeBox | DOMNodeBoxFragment)["el"],
  elParent: (DOMNodeBox | DOMNodeBoxFragment)["el"]
) {
  beforeUnmountRitual(box);

  removeNode(el, elParent, true);

  unmountRitual(box);
}
export function removeNodesUnsed(
  nodesAndBoxes: Set<any>,
  box: DOMNodeBox | DOMNodeBoxFragment
) {
  for (const item of nodesAndBoxes) {
    if (item instanceof Text) {
      reusableTextNodes.push(item);

      removeNode(item, box.el);
    } else if (isBox(item)) {
      const boxChild = item as DOMNodeBox | DOMNodeBoxFragment;
      const el = boxChild.el;

      getDOMNodeBoxInternalData(boxChild).isBoxInUse = false;

      runToBox(boxChild, el, box.el);
    } else if (item instanceof ReuseDOMNodeBox) {
      runToBox(item.box, item.el, box.el);
    }
  }
}
