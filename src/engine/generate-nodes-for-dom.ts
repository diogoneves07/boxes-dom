import { DOMNodeBox } from "../types/dom-node-box";

export default function generateNodesForDOM(box: DOMNodeBox) {
  box.emit("@beforeCreate");

  const DOMNodeBoxData = box.__DOMNodeBoxData;
  const content = DOMNodeBoxData.content as any[];
  let element = box.el;

  content.forEach((value: any) => {
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
  return element;
}
