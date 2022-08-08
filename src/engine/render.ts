import { InsertNodePosition } from "./../types/insert-node-position";
import { DOMNodeBoxContent } from "../types/dom-node-boxes";
import Fragment from "./fragment";
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
  targetElement: HTMLElement | string = document.body,
  insertPosition?: InsertNodePosition
) {
  Fragment(values).render(targetElement, insertPosition);
}
