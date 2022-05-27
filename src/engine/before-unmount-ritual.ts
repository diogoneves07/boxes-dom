import { DOMNodeBox } from "../types/dom-node-box";
import { propagateEventForBoxesChildren } from "./propagate-event-for-nodes-children";
export default function beforeUnmountRitual(box: DOMNodeBox) {
  propagateEventForBoxesChildren(box, "@beforeUnmount");
  box.emit("@beforeUnmount");
}
