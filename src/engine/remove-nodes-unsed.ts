import hasTextContent from "../utilities/has-text-content";
import { DOMNodeBox } from "../types/dom-node-box";
import beforeUnmountRitual from "./before-unmount-ritual";
import unmountRitual from "./unmounted-ritual";

export function removeNodesUnsed(newBoxContent: any[], lastBoxContent: any[]) {
  let n = newBoxContent;
  let l = lastBoxContent;

  l.forEach((value: Text | DOMNodeBox) => {
    const hasChild = n.includes(value);

    if (hasChild) {
      return;
    }

    if (hasTextContent(value)) {
      (value as Text).remove();
    } else if ((value as DOMNodeBox).el) {
      const nodeBox = value as DOMNodeBox;

      beforeUnmountRitual(nodeBox);
      nodeBox.el.remove();
      unmountRitual(nodeBox);
    }
  });
}
