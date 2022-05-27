import { transformValueAfterGet } from "./transform-box-content";
import hasTextContent from "../utilities/has-text-content";
import generateNodesForDOM from "./generate-nodes-for-dom";
import { removeNodesUnsed } from "./remove-nodes-unsed";
import isArray from "../utilities/is-array";
import { DOMNodeBox } from "../types/dom-node-box";
import beforeMountRitual from "./before-mount-ritual";
import mountedRitual from "./mounted-ritual";

export default function updateDOMNodeBox(box: DOMNodeBox) {
  if (!box.__DOMNodeBoxData) {
    return;
  }
  const DOMNodeBoxData = box.__DOMNodeBoxData;
  const element = box.el;
  const newContent = box.get();

  const content = (isArray(newContent) ? newContent : [newContent]) as any[];

  if (DOMNodeBoxData.content) {
    const previousContent = transformValueAfterGet(DOMNodeBoxData.content);

    DOMNodeBoxData.content = content
      .filter((value: any) => value !== null)
      .map((value: any, index: number) => {
        if (
          hasTextContent(previousContent[index]) &&
          (typeof value === "string" || typeof value === "number")
        ) {
          if (previousContent[index].textContent !== value) {
            previousContent[index].textContent = value;
          }
          return previousContent[index];
        }

        if (
          value.type === "dom-node" &&
          !(value as DOMNodeBox).__DOMNodeBoxData.isInDOM
        ) {
          generateNodesForDOM(value);
        }

        return value;
      });
    DOMNodeBoxData.content = transformValueAfterGet(DOMNodeBoxData.content);
    box.emit("@beforeUpdate");

    const childNodes = [].slice.call(element.childNodes) as Node[];

    (DOMNodeBoxData.content as any[]).forEach((value, index) => {
      const newNode = value.textContent ? value : value.el;
      const isInTheCorrectposition = childNodes[index] !== newNode;
      const nodeBox = value as DOMNodeBox;

      if (newNode.parentNode && isInTheCorrectposition) {
        if (nodeBox.__DOMNodeBoxData.isInDOM) {
          beforeMountRitual(nodeBox);
          element.insertBefore(newNode, childNodes[index]);
          childNodes.splice(index, 1);
          mountedRitual(nodeBox);

          return;
        }
      }

      if (nodeBox.type === "dom-node" && !nodeBox.__DOMNodeBoxData.isInDOM) {
        beforeMountRitual(nodeBox);
        if (index === 0) {
          element.insertBefore(
            newNode,
            element.firstChild ? element.firstChild : null
          );
        } else {
          element.insertBefore(newNode, childNodes[index]);
        }

        mountedRitual(nodeBox);
      }
    });
    removeNodesUnsed(DOMNodeBoxData.content as any[], previousContent);
  } else {
    DOMNodeBoxData.content = transformValueAfterGet(content);
  }
  box.emit("@updated");
}
