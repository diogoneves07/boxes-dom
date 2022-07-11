import { DOM_NODE_BOX_WRAPPER } from "./dom-node-box-wrapper";
import Box from "../../../boxes/src/main";

import { DOMNodeBox } from "../types/dom-node-box";
import DOMNodeBoxProps from "./dom-node-box-props";

/**
 * Creates the boxes responsible for managing the DOM node and its tree.
 * @param tags
 * The HTML tags that will be transformed into elements for the DOM.
 *
 * @example
 * const button = Html`button`// buttonBox;
 * const buttons = Html`2button` // [buttonBox, buttonBox];
 */
type TagsMap = HTMLElementTagNameMap & HTMLElementDeprecatedTagNameMap;

function createDOMNodeBOX<Tag extends keyof TagsMap, A extends number>(
  tagName: Tag
): DOMNodeBox<TagsMap[Tag]>;

function createDOMNodeBOX<El extends Element = Element>(
  tagName: string
): DOMNodeBox<El>;

function createDOMNodeBOX<Tag extends keyof TagsMap, A extends number>(
  tagName: Tag,
  amount: number
): DOMNodeBox<TagsMap[Tag]>[];
function createDOMNodeBOX(
  tagName: string,
  amount?: number
): DOMNodeBox | DOMNodeBox[] {
  let boxes: DOMNodeBox[] | undefined;
  let count = amount || 1;
  while (count--) {
    const box = Box() as unknown as DOMNodeBox;

    Object.setPrototypeOf(box, DOMNodeBoxProps);

    box.__DOMNodeBoxData = {
      nodesOrganized: false,
      isWaitingElementIntersectingToUpdate: true,
    };
    box.el = document.createElement(tagName);
    box.wrappers = DOM_NODE_BOX_WRAPPER;

    if (amount === 1) {
      return box;
    }
    if (!boxes) {
      boxes = [];
    }
    boxes.push(box);
  }

  return (
    (boxes as DOMNodeBox[])[1] ? boxes : (boxes as DOMNodeBox[])[0]
  ) as any;
}

export default createDOMNodeBOX;
