import DOMNodeBoxElementFragment from "./element-fragment";
import { isNodeOfDOMNodeBox } from "./manager-box-nodes";

export default function getItemNodes(el: Node | DOMNodeBoxElementFragment) {
  if (el instanceof DOMNodeBoxElementFragment) {
    return [...el.childNodes] as Node[];
  }
  const nodes: Node[] = [];
  el.childNodes.forEach((node) => {
    if (isNodeOfDOMNodeBox(node)) {
      nodes.push(node);
    }
  });
  return nodes;
}
