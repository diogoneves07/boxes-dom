import { DOM_NODE_BOX_WRAPPER } from "./dom-node-box-wrapper";
import getElement from "../utilities/get-element";
import { DOMNodeBoxProps } from "./dom-node-box-props";
import { DOMNodeBox } from "../types/dom-node-box";
import Box from "../../../boxes/src/main";
import removeBreakLinesChars from "../utilities/remove-break-liles-chars";
import removeWhitespaces from "../utilities/remove-whitespaces";
import { transformDOMNodeBoxContent } from "./transform-dom-node-box-contents";

function createSimpleBox() {
  let currentElementBox = Box() as unknown as DOMNodeBox;
  Object.assign(currentElementBox, DOMNodeBoxProps);
  currentElementBox.wrappers = DOM_NODE_BOX_WRAPPER;
  currentElementBox.__DOMNodeBoxData = {
    nodesGenerated: false,
  };
  return currentElementBox;
}
function convertElementsToBox(parentElement: HTMLElement) {
  let count = 0;
  let parentElementBox = createSimpleBox();
  const data = parentElementBox.__data;
  const DOMNodeBoxData = parentElementBox.__DOMNodeBoxData;
  parentElementBox.el = parentElement as HTMLElement;

  DOMNodeBoxData.nodesGenerated = true;
  let currentElement = parentElement.childNodes.item(count);
  while (currentElement) {
    let value;
    switch (currentElement.nodeType) {
      case 1:
        value = convertElementsToBox(currentElement as HTMLElement);

        break;
      case 3:
        removeWhitespaces;
        if (
          currentElement.textContent &&
          removeWhitespaces(
            removeBreakLinesChars(currentElement.textContent)
          ).trim()
        ) {
          value = currentElement.textContent;
        }
        break;
    }
    if (value) {
      if (data.contents) {
        if (Array.isArray(data.contents)) {
          data.contents.push(value);
        } else {
          data.contents = [data.contents, value];
        }
      } else {
        data.contents = value;
      }
    }

    count++;
    currentElement = parentElement.childNodes.item(count);
  }
  DOMNodeBoxData.contents = transformDOMNodeBoxContent(
    Array.isArray(data.contents) ? data.contents.slice() : data.contents
  );
  return parentElementBox;
}
/**
 * Converts a DOM element to a box.
 *
 * @param elementOrSelector
 * The element.
 * @param cloneNode
 * If true should use a clone of the element using the `elementOrSelector.cloneNode(true)` method.
 */
export default function convertToBoxes(
  elementOrSelector: HTMLElement | string,
  cloneNode: boolean = false
) {
  const parentElement = getElement(elementOrSelector);

  if (!parentElement) return false;
  return convertElementsToBox(
    (cloneNode ? parentElement.cloneNode(true) : parentElement) as HTMLElement
  );
}
