import { DOMNodeBox } from "./../types/dom-node-boxes";
import cloneElement from "./clone-element";
import { appendNodes } from "./manipulate-dom-methods";
import { registryElClone, forEachClone } from "./manager-nodes-clones";
import { isNodeOfDOMNodeBox } from "./manager-box-nodes";
import DOMNodeBoxElementFragment from "./element-fragment";

export function cloneChildren(el: DOMNodeBox["el"], elClone: DOMNodeBox["el"]) {
  el.childNodes.forEach((child) => {
    if (isNodeOfDOMNodeBox(child)) {
      const childClone = cloneElement(child);
      registryElClone(child, childClone);
      appendNodes(elClone, childClone);

      if (child.childNodes.length > childClone.childNodes.length) {
        cloneChildren(child as any, childClone as any);
      }
    }
  });
}

export function appendNodesForElAndEachClone(
  parent: Node | DOMNodeBoxElementFragment,
  nodes: Node | DOMNodeBoxElementFragment
) {
  forEachClone(parent, (parentClone) => {
    const childClone = cloneElement(nodes);
    registryElClone(nodes, childClone);
    appendNodes(parentClone, childClone);

    if (nodes.childNodes.length > childClone.childNodes.length) {
      cloneChildren(nodes as any, childClone as any);
    }
  });

  appendNodes(parent, nodes);
}
