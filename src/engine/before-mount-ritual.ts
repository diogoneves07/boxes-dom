import { DOMNodeBox } from "../types/dom-node-box";
import { propagateEventForBoxesChildren } from "./propagate-event";
export default function beforeMountRitual(box: DOMNodeBox) {
  box.emit("@beforeMount");
  propagateEventForBoxesChildren(box, "@beforeMount");
}
