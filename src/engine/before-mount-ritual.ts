import { DOMNodeBox } from "../types/dom-node-box";
import { addDOMListeners } from "./add-dom-listeners";
import {
  propagateEventForBoxesChildren,
  propagateForBoxesChildren,
} from "./propagate-event-for-nodes-children";
export default function beforeMountRitual(box: DOMNodeBox) {
  box.emit("@beforeMount");
  propagateEventForBoxesChildren(box, "@beforeMount");
  addDOMListeners(box);
  propagateForBoxesChildren(box, addDOMListeners);
}
