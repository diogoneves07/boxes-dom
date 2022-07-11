import { NormalBox } from "../../../boxes/src/main";
import getElement from "../utilities/get-element";
import hasOwnProperty from "../utilities/hasOwnProperty";
import {
  DOMNodeBox,
  DOMNodeBoxContent,
  InsertNodePosition,
} from "./../types/dom-node-box";
import insertNodeInDOM from "./insert-node-in-dom";
import invokeCallbacksInBoxesValues from "./invoke-callbacks-in-boxes-values";
import runInRaf from "./run-in-raf";
import { useTextNode } from "./use-text-node";
let uniqueKey = 0;
/**
 * Renders the values and its tree in the DOM.
 * @param values
 * The values ​​to be rendered.
 * @param targetElement
 * The element or element selector where the box will be rendered.
 *
 * The default value is: `document.body`
 * @param insertPosition
 * The position where the box should be rendered.
 *
 * The default value is: `inside`
 *
 */
export default function render(
  values: DOMNodeBoxContent | DOMNodeBoxContent[],
  targetElement?: HTMLElement | string,
  insertPosition?: InsertNodePosition
) {
  const allBoxes = invokeCallbacksInBoxesValues(values) as (
    | DOMNodeBox
    | string
  )[];

  const parentEl = getElement(targetElement) || document.body;
  const boxes = insertPosition === "after" ? allBoxes.reverse() : allBoxes;

  const run = (value: any) => {
    if (typeof value === "string") {
      runInRaf(`${++uniqueKey}Html.render`, () => {
        insertNodeInDOM(parentEl, useTextNode(value), insertPosition);
      });
    } else if (hasOwnProperty(value, "isBox")) {
      if ((value as NormalBox).wrappers.has("dom-node")) {
        value.render(targetElement as any, insertPosition);
      } else {
        const contents = (value as NormalBox).get();

        Array.isArray(contents) ? contents.forEach(run) : run(contents);
      }
    }
  };
  Array.isArray(boxes) ? boxes.forEach(run) : run(boxes);
}
