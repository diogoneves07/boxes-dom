import { DOMNodeBox, DOMNodeBoxFragment } from "../types/dom-node-box";
export default function beforeMountRitual(
  box: DOMNodeBox | DOMNodeBoxFragment
) {
  box.treeEmit("@beforeMount");
}
