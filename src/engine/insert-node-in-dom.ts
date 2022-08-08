import DOMNodeBoxElementFragment from "./element-fragment";
import { appendNodes, insertNodesBefore } from "./manipulate-dom-methods";

export default function insertNodeInDOM(
  parentEl: Node,
  node: Node | DOMNodeBoxElementFragment,
  insertPosition: "before" | "after" | "inside" = "inside"
) {
  switch (insertPosition) {
    case "before":
      if (parentEl.parentElement) {
        insertNodesBefore(parentEl.parentElement, parentEl, node);
      }
      break;
    case "after":
      if (parentEl.parentElement) {
        insertNodesBefore(parentEl.parentElement, parentEl.nextSibling, node);
      }
      break;
    default:
      appendNodes(parentEl, node);
      break;
  }
}
