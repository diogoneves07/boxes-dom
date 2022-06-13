import { DOMNodeBox } from "../types/dom-node-box";
import { propagateEventForBoxesChildren } from "./propagate-event";

export default function generateNodesForDOM(box: DOMNodeBox) {
  box.emit("@beforeCreate");
  propagateEventForBoxesChildren(box, "@beforeCreate");

  const DOMNodeBoxData = box.__DOMNodeBoxData;
  const content = DOMNodeBoxData.content as any[];
  let element = box.el;
  content.forEach((item: any) => {
    const value = item;
    if (value === undefined || value === null) {
      return;
    }

    const nodeName = value.tagName || value.nodeName;

    if (nodeName && nodeName === "#text") {
      element.appendChild(value);
    } else {
      const nodesForDOM = generateNodesForDOM(value);
      if (nodesForDOM) {
        element.appendChild(nodesForDOM);
      }
    }
  });

  DOMNodeBoxData.nodesGenerated = true;
  box.emit("@created");
  propagateEventForBoxesChildren(box, "@created");

  return element;
}
