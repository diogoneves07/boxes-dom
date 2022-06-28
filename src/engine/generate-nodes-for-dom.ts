import { DOMNodeBox } from "../types/dom-node-box";
import hasTextContent from "../utilities/has-text-content";
import isDOMOrBoxValue from "./is-dom-or-box-value";
import { beforeAddIntersectionObserver } from "./observe-all-boxes";
import { transformDOMNodeBoxValue } from "./transform-dom-node-box-contents";
let BOX_ROOT: DOMNodeBox | undefined;
export default function generateNodesForDOM(box: DOMNodeBox) {
  if (!BOX_ROOT) {
    BOX_ROOT = box;
    box.emit("@beforeCreate");
    box.treeEmit("@beforeCreate");
  }
  const DOMNodeBoxData = box.__DOMNodeBoxData;

  const dataIntoBoxes = box.get();

  let element = box.el;
  const contents = Array.isArray(dataIntoBoxes)
    ? dataIntoBoxes
    : [dataIntoBoxes];
  const newContent: any[] = [];

  beforeAddIntersectionObserver(box);

  for (const item of contents) {
    let value = item;

    if (item === box) {
      throw new Error("Referncia ciclicar");
      return;
    }
    if (item === undefined || item === null) {
      continue;
    }
    if (item.isBox && !(item as DOMNodeBox).wrappers.has("dom-node")) {
      value = item.getDataInBoxes("dom-node");
    }
    if (item.isBox) {
      const boxChild = value as DOMNodeBox;
      const boxChildContent = boxChild.get();
      if (
        typeof boxChildContent === "number" ||
        typeof boxChildContent === "string"
      ) {
        const newBoxChildContent = transformDOMNodeBoxValue(boxChildContent);
        boxChild.__DOMNodeBoxData.contents = [newBoxChildContent];
        boxChild.el.appendChild(newBoxChildContent);
        element.appendChild(boxChild.el);
        DOMNodeBoxData.nodesGenerated = true;
        beforeAddIntersectionObserver(boxChild);
      } else {
        const nodesForDOM = generateNodesForDOM(boxChild);
        if (nodesForDOM) {
          element.appendChild(boxChild.el);
        }
      }
    } else {
      value = transformDOMNodeBoxValue(item);
      if (!isDOMOrBoxValue(value)) {
        throw new Error("Value ruim para DOM!!!");
      }
      if (value && hasTextContent(value)) {
        element.appendChild(value);
      }
    }

    newContent.push(value);
  }

  DOMNodeBoxData.contents = newContent;

  DOMNodeBoxData.nodesGenerated = true;

  if (BOX_ROOT === box) {
    BOX_ROOT = undefined;
    box.emit("@created");
    box.treeEmit("@created");
  }

  return element;
}
