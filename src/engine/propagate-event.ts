import { DOMNodeBox, DOMNodeBoxEvents } from "../types/dom-node-box";
import isArray from "../utilities/is-array";

export function propagateForBoxesChildren(
  parentNodeBox: DOMNodeBox,
  callbackfn: (box: DOMNodeBox) => void
) {
  const boxesChildren: DOMNodeBox[] = [];
  const values = parentNodeBox.get();

  const content = isArray(values) ? values : [values];

  content.forEach((box: any) => {
    if (box && box.type && box.type === "dom-node") {
      callbackfn(box);
      boxesChildren.push(box);
    }
  });

  boxesChildren.forEach((box) => {
    propagateForBoxesChildren(box, callbackfn);
  });
}
export function propagateEventForBoxesChildren(
  parentNodeBox: DOMNodeBox,
  event: DOMNodeBoxEvents
) {
  propagateForBoxesChildren(parentNodeBox, (box) => {
    if (box.type && box.type === "dom-node") {
      (box as DOMNodeBox).emit(event);
    }
  });
}
