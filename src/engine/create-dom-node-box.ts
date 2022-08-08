import { DOM_NODE_BOX_WRAPPER } from "./dom-node-box-wrapper";
import { CreateBoxType } from "../../../boxes/src/main";

import { DOMNodeBox } from "../types/dom-node-boxes";
import DOMNodeBoxProps from "./dom-node-box-props";
import CreateDOMNodeBoxData from "./create-dom-node-box-data";
import { DOM_NODE_BOX_INTERNAL_DATA } from "./dom-node-boxes-symbols";

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
    const box = CreateBoxType(
      "dom-node",
      DOMNodeBoxProps,
      DOM_NODE_BOX_WRAPPER
    ) as unknown as DOMNodeBox;

    (box as any)[DOM_NODE_BOX_INTERNAL_DATA] = CreateDOMNodeBoxData();
    box.el = document.createElement(tagName);

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
