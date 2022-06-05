import { DOMNodeBox, DOMNodeBoxEvents } from "../types/dom-node-box";

// Keeps crates temporarily to avoid recursion
const AVOIDING_NODE_BOX_RECURSION: DOMNodeBox[] = [];

export function propagateForBoxesChildren(
  nodeBox: DOMNodeBox,
  callbackfn: (box: DOMNodeBox) => void
) {
  const boxesChildren: DOMNodeBox[] = [];
  const content = nodeBox.__DOMNodeBoxData.content;

  if (!content) {
    return;
  }
  if (AVOIDING_NODE_BOX_RECURSION.includes(nodeBox)) {
    throw new Error(
      "boxes-dom: There are boxes containing itself this cause recursion!"
    );
  }
  nodeBox && AVOIDING_NODE_BOX_RECURSION.push(nodeBox);

  content.forEach((box: any) => {
    if (box && box.type && box.type === "dom-node") {
      callbackfn(box);

      boxesChildren.push(box);
    }
  });

  boxesChildren.forEach((box) => {
    propagateForBoxesChildren(box, callbackfn);
  });
  if (AVOIDING_NODE_BOX_RECURSION[0] === nodeBox) {
    // Remove items from array after looping through main box
    AVOIDING_NODE_BOX_RECURSION.length = 0;
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
