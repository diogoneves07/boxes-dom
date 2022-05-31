import { transformValueBeforeGet } from "./transform-box-content";
import hasTextContent from "../utilities/has-text-content";
import isArray from "../utilities/is-array";
import { DOMNodeBox } from "../types/dom-node-box";
import beforeUnmountRitual from "./before-unmount-ritual";
import unmountRitual from "./unmounted-ritual";

export function removeNodesUnsed(newBoxContent: any[], lastBoxContent: any[]) {
  let n = transformValueBeforeGet(newBoxContent);
  let l = transformValueBeforeGet(lastBoxContent);

  const run = (value: Text | DOMNodeBox) => {
    if (!value) {
      return;
    }

    const hasChild = isArray(n) ? n.includes(value) : value === n;

    if (!hasChild) {
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
  };
  if (isArray(l)) {
    n = isArray(n) ? n : [n];
    l.forEach(run);
  } else {
    run(l);
  }
}
