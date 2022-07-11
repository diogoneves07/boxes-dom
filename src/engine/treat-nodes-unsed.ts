import {
  DOMNodeBox,
  DOMNodeBoxFragment,
  ElementFragment,
} from "../types/dom-node-box";
import hasOwnProperty from "../utilities/hasOwnProperty";
import beforeUnmountRitual from "./before-unmount-ritual";
import { removeNode } from "./manipulate-dom-methods";
import unmountRitual from "./unmounted-ritual";

const reusableTextNodes: Text[] = [];

export function getReusableTextNode(value: string | number) {
  const h = reusableTextNodes.shift();
  if (h) {
    h.textContent = value.toString();
    return h;
  }
  return false;
}
export function removeNodesUnsed(
  nodes: Set<any>,
  parent: Node | ElementFragment
) {
  for (const node of nodes) {
    if (node instanceof Text) {
      reusableTextNodes.push(node);
      // TextNode
      removeNode(node, parent);
    } else if (hasOwnProperty(node, "isBox")) {
      const nodeBox = node as DOMNodeBox | DOMNodeBoxFragment;
      beforeUnmountRitual(nodeBox);

      removeNode(nodeBox.el, parent);

      unmountRitual(nodeBox);
    }
  }
}
