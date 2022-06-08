import { DOMNodeBox, DOMNodeBoxEvents } from "../types/dom-node-box";

export function propagateForBoxesChildren(
  parentNodeBox: DOMNodeBox,
  callbackfn: (box: DOMNodeBox) => void
) {
  const boxesChildren: DOMNodeBox[] = [];
  const content = parentNodeBox.__DOMNodeBoxData.content as any[];

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
