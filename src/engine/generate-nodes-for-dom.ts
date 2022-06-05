import isArray from "../utilities/is-array";
import { DOMNodeBox } from "../types/dom-node-box";

function append(
  node: HTMLElement | Text,
  parent: (HTMLElement | Text)[] | HTMLElement
) {
  if (Array.isArray(parent)) {
    return parent.push(node);
  }

  return parent.appendChild(node);
}

export default function generateNodesForDOM(box: DOMNodeBox) {
  if (!box || !box.__DOMNodeBoxData.content) return false;

  const DOMNodeBoxData = box.__DOMNodeBoxData;
  const content = DOMNodeBoxData.content as any[];
  let element = box.el;

  box.emit("@beforeCreate");
  content.forEach((value: any) => {
    if (typeof value === "undefined" || value === null) {
      return;
    }

    const nodeName = value.tagName || value.nodeName;

    if (nodeName) {
      if (nodeName === "#text") {
        append(value, element);
      } else {
        const v = generateNodesForDOM(value);
        if (v) {
          append(v, element);
        }
      }
    } else {
      if (isArray(value)) {
        value.forEach((v: DOMNodeBox) => {
          append(generateNodesForDOM(v) as HTMLElement, element);
        });
      } else {
        append(generateNodesForDOM(value) as HTMLElement, element);
      }
    }
  });

  box.emit("@created");

  DOMNodeBoxData.nodesGenerated = true;

  return element;
}
