import { DOMNodeBox, DOMNodeBoxFragment } from "../types/dom-node-box";
export default function beforeUnmountRitual(
  box: DOMNodeBox | DOMNodeBoxFragment
) {
  box.nodesEmit("@beforeUnmount");
  box.emit("@beforeUnmount");
}
