import { LAZY_BOXES_TO_UPDATE } from "./lazy-update-boxes";
import { DOMNodeBox, DOMNodeBoxFragment } from "../types/dom-node-boxes";
import manipulateDOM from "./manipulate-dom";
import hasOwnProperty from "../utilities/hasOwnProperty";
import getDOMNodeBoxInternalData from "./get-dom-node-box-internal-data";

/** Forwards the box to be updated according to the isElementIntersecting property. */
export default function beforeManipulateDOM(
  b: DOMNodeBox | DOMNodeBoxFragment
) {
  if (hasOwnProperty(b, "isBoxFragment")) {
    manipulateDOM(b);
    return;
  }
  const box = b as DOMNodeBox;
  const DOMNodeBoxData = getDOMNodeBoxInternalData(box);

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
