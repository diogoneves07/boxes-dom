import hasTextContent from "../utilities/has-text-content";
import { DOMNodeBox } from "../types/dom-node-box";
import beforeUnmountRitual from "./before-unmount-ritual";
import unmountRitual from "./unmounted-ritual";

export function removeNodesUnsed(nodes: Set<any>) {
  for (const node of nodes) {
    if (hasTextContent(node)) {
      (node as Text).remove();
    } else if ((node as DOMNodeBox).el) {
      const nodeBox = node as DOMNodeBox;

      beforeUnmountRitual(nodeBox);
      nodeBox.el.remove();
      unmountRitual(nodeBox);
    }
  }
}
