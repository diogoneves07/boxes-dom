import { DOMNodeBox, DOMNodeBoxFragment } from "../types/dom-node-boxes";
export default function beforeUnmountRitual(
  box: DOMNodeBox | DOMNodeBoxFragment
) {
  box.itemsEmit("@beforeUnmount");
  box.emit("@beforeUnmount");
}
