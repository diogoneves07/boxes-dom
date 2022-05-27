import { DOMNodeBox, DOMNodeBoxEvents } from "../types/dom-node-box";

export function propagateForBoxesChildren(
  nodeBox: DOMNodeBox,
  callbackfn: (box: DOMNodeBox) => void
) {
  const boxesChildren: DOMNodeBox[] = [];
  const content = nodeBox.__DOMNodeBoxData.content;
  if (content) {
    content.forEach((box: any) => {
      if (box.type && box.type === "dom-node") {
        callbackfn(box);
        boxesChildren.push(box);
      }
    });
    boxesChildren.forEach((box) => {
      propagateForBoxesChildren(box, callbackfn);
    });
  }
}

export function propagateEventForBoxesChildren(
  nodeBox: DOMNodeBox,
  event: DOMNodeBoxEvents
) {
  propagateForBoxesChildren(nodeBox, (box) => {
    if (box.type && box.type === "dom-node") {
      (box as DOMNodeBox).emit(event);
    }
  });
}
