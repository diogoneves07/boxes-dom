import { LAZY_BOXES_TO_UPDATE } from "./lazy-update-boxes";
import { DOMNodeBox, DOMNodeBoxFragment } from "./../types/dom-node-box";
import manipulateDOM from "./manipulate-dom";
import hasOwnProperty from "../utilities/hasOwnProperty";

/** Forwards the box to be updated according to the isElementIntersecting property. */
export default function beforeManipulateDOM(
  b: DOMNodeBox | DOMNodeBoxFragment
) {
  if (hasOwnProperty(b, "isBoxFragment")) {
    manipulateDOM(b);
    return;
  }
  const box = b as DOMNodeBox;
  const DOMNodeBoxData = box.__DOMNodeBoxData;

  let isElementIntersecting = DOMNodeBoxData.isElementIntersecting;

  if (isElementIntersecting) {
    DOMNodeBoxData.isWaitingElementIntersectingToUpdate = false;
    LAZY_BOXES_TO_UPDATE.delete(box);
    manipulateDOM(box);
  } else {
    DOMNodeBoxData.isWaitingElementIntersectingToUpdate = true;
    LAZY_BOXES_TO_UPDATE.add(box);
  }
}
