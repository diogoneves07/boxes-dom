import { DOM_NODE_BOX_WRAPPER } from "./dom-node-box-wrapper";
import { CreateBoxType } from "../../../boxes/src/main";

import getElement from "../utilities/get-element";
import { DOMNodeBox } from "../types/dom-node-boxes";
import removeBreakLinesChars from "../utilities/remove-break-liles-chars";
import removeWhitespaces from "../utilities/remove-whitespaces";
import DOMNodeBoxProps from "./dom-node-box-props";
import { addAllNecessaryObservers } from "./add-all-necessary-observers";
import { DOM_NODE_BOX_INTERNAL_DATA } from "./dom-node-boxes-symbols";
import getDOMNodeBoxInternalData from "./get-dom-node-box-internal-data";
import { defineNode } from "./manager-box-nodes";

function createDOMNodeBox() {
  const box = CreateBoxType(
    "dom-node",
    DOMNodeBoxProps,
    DOM_NODE_BOX_WRAPPER
  ) as unknown as DOMNodeBox;

  (box as any)[DOM_NODE_BOX_INTERNAL_DATA] = {
    nodesOrganized: true,
    isWaitingElementIntersectingToUpdate: false,
  };
  return box;
}
function convertElementsToBox(parentElement: HTMLElement) {
  let count = 0;
  let parentElementBox = createDOMNodeBox();

  parentElementBox.el = parentElement as HTMLElement;

  defineNode(parentElement);

  let currentElement = parentElement.childNodes.item(count);
  const DOMNodeContents: any = [];

  while (currentElement) {
    switch (currentElement.nodeType) {
      case 1:
        const value = convertElementsToBox(currentElement as HTMLElement);
        parentElementBox(value);
        DOMNodeContents.push(value);
        break;
      case 3:
        if (
          currentElement.textContent &&
          removeWhitespaces(
            removeBreakLinesChars(currentElement.textContent)
          ).trim()
        ) {
          defineNode(currentElement);

          parentElementBox(currentElement.textContent);
          DOMNodeContents.push(currentElement);
        }
        break;
    }

    count++;
    currentElement = parentElement.childNodes.item(count);
  }
  getDOMNodeBoxInternalData(parentElementBox).contents = DOMNodeContents;

  addAllNecessaryObservers(parentElementBox);
  return parentElementBox;
}
/**
 * Converts a DOM element to a box.
 *
 * @param elementOrSelector
 * The element.
 * @param cloneNode
 * If `true` should use a clone of the element using the `elementOrSelector.cloneNode(true)` method.
 */
export default function toDOMNodeBox(
  elementOrSelector: Node | string,
  cloneNode: boolean = false
) {
  const parentElement = getElement(elementOrSelector);

  if (!parentElement) return false;
  const newBoxes = convertElementsToBox(
    (cloneNode ? parentElement.cloneNode(true) : parentElement) as HTMLElement
  );

  return newBoxes;
}
