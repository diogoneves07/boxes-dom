import getElement from "../utilities/get-element";
import { DOMNodeBox, InsertNodePosition } from "./../types/dom-node-box";
import insertNodeInDOM from "./insert-node-in-dom";
import normalizeBoxesValues from "./normalize-boxes-values";
import runInRaf from "./run-in-raf";
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
  values:
    | (DOMNodeBox | Function | string)[]
    | (DOMNodeBox | Function | string)[][],
  targetElement?: HTMLElement | string,
  insertPosition?: InsertNodePosition
) {
  let boxes = normalizeBoxesValues(values) as (DOMNodeBox | string)[];

  const parentEl = getElement(targetElement) || document.body;

  (insertPosition === "after" ? boxes.reverse() : boxes).forEach(
    (item, index) => {
      if (typeof item === "string") {
        runInRaf(`${index}Html.render`, () => {
          insertNodeInDOM(
            parentEl,
            document.createTextNode(item),
            insertPosition
          );
        });
      } else {
        item.render(targetElement as any, insertPosition);
      }
    }
  );
}
