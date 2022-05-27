import { DOMNodeBox } from "../types/dom-node-box";
import {
  propagateEventForBoxesChildren,
  propagateForBoxesChildren,
} from "./propagate-event-for-nodes-children";
import removeDOMListeners from "./remove-dom-listeners";
export default function unmountRitual(box: DOMNodeBox) {
  box.__DOMNodeBoxData.isInDOM = false;
  propagateForBoxesChildren(box, (b) => {
    b.__DOMNodeBoxData.isInDOM = false;
  });
  removeDOMListeners(box);
  propagateEventForBoxesChildren(box, "@unmounted");
  box.emit("@unmounted");
}
