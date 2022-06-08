import { DOMNodeBox } from "../types/dom-node-box";
import callAfterRendered from "./call-after-rendered";
import {
  propagateEventForBoxesChildren,
  propagateForBoxesChildren,
} from "./propagate-event";
export default function mountedRitual(box: DOMNodeBox) {
  box.__DOMNodeBoxData.isInDOM = true;
  propagateForBoxesChildren(box, (box) => {
    box.__DOMNodeBoxData.isInDOM = true;
  });
  box.emit("@mounted");
  propagateEventForBoxesChildren(box, "@mounted");
  callAfterRendered(box, "@afterMount");
  callAfterRendered(box, "@effect");
}
