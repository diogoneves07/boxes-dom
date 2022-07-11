import { DOM_NODE_BOX_WRAPPER } from "./dom-node-box-wrapper";
import getElement from "../utilities/get-element";
import { DOMNodeBox } from "../types/dom-node-box";
import Box from "../../../boxes/src/main";
import removeBreakLinesChars from "../utilities/remove-break-liles-chars";
import removeWhitespaces from "../utilities/remove-whitespaces";
import DOMNodeBoxProps from "./dom-node-box-props";
import { addAllNecessaryObservers } from "./add-all-necessary-observers";

function createDOMNodeBox() {
  let currentElementBox = Box() as unknown as DOMNodeBox;
  Object.setPrototypeOf(currentElementBox, DOMNodeBoxProps);
  currentElementBox.wrappers = DOM_NODE_BOX_WRAPPER;
  currentElementBox.__DOMNodeBoxData = {
    nodesOrganized: true,
    isWaitingElementIntersectingToUpdate: true,
  };
  return currentElementBox;
}
function convertElementsToBox(parentElement: HTMLElement) {
  let count = 0;
  let parentElementBox = createDOMNodeBox();

  parentElementBox.el = parentElement as HTMLElement;

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
        removeWhitespaces;
        if (
          currentElement.textContent &&
          removeWhitespaces(
            removeBreakLinesChars(currentElement.textContent)
          ).trim()
        ) {
          parentElementBox(currentElement.textContent);
          DOMNodeContents.push(currentElement);
        }
        break;
    }

    count++;
    currentElement = parentElement.childNodes.item(count);
  }
  parentElementBox.__DOMNodeBoxData.contents = DOMNodeContents;

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
  elementOrSelector: HTMLElement | string,
  cloneNode: boolean = false
) {
  const parentElement = getElement(elementOrSelector);

  if (!parentElement) return false;
  const newBoxes = convertElementsToBox(
    (cloneNode ? parentElement.cloneNode(true) : parentElement) as HTMLElement
  );

  return newBoxes;
}
