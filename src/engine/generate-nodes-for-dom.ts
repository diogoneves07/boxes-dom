import { DOMNodeBox } from "../types/dom-node-box";

export default function generateNodesForDOM(box: DOMNodeBox) {
  const DOMNodeBoxData = box.__DOMNodeBoxData;
  const content = DOMNodeBoxData.content as any[];
  let element = box.el;

  box.emit("@beforeCreate");

  content.forEach((value: any) => {
    if (value === undefined || value === null) {
      return;
    }

    const nodeName = value.tagName || value.nodeName;

    if (nodeName && nodeName === "#text") {
      element.appendChild(value);
    } else {
      const v = generateNodesForDOM(value);
      if (v) {
        element.appendChild(v);
      }
    }
  });

  box.emit("@created");

  DOMNodeBoxData.nodesGenerated = true;

  return element;
}
