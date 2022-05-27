import { DOMNodeBox } from "../types/dom-node-box";
import {
  propagateEventForBoxesChildren,
  propagateForBoxesChildren,
} from "./propagate-event-for-nodes-children";
export default function mountedRitual(box: DOMNodeBox) {
  box.__DOMNodeBoxData.isInDOM = true;
  propagateForBoxesChildren(box, (box) => {
    box.__DOMNodeBoxData.isInDOM = true;
  });
  box.emit("@mounted");
  propagateEventForBoxesChildren(box, "@mounted");
}
