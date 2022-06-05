import { transformValueAfterGet } from "./transform-box-content";
import hasTextContent from "../utilities/has-text-content";
import generateNodesForDOM from "./generate-nodes-for-dom";
import { removeNodesUnsed } from "./remove-nodes-unsed";
import isArray from "../utilities/is-array";
import { DOMNodeBox } from "../types/dom-node-box";
import beforeMountRitual from "./before-mount-ritual";
import mountedRitual from "./mounted-ritual";
import callAfterRendered from "./call-after-rendered";

function emitUpdatedEvents(box: DOMNodeBox) {
  if (box.__DOMNodeBoxData.isInDOM) {
    box.emit("@updated");
    callAfterRendered(box, "@afterUpdate");
    callAfterRendered(box, "@effect");
  }
}

export default function updateDOMNodeBox(box: DOMNodeBox) {
  if (!box.__DOMNodeBoxData) {
    return;
  }
  const DOMNodeBoxData = box.__DOMNodeBoxData;
  const newContent = box.get();

  if (!DOMNodeBoxData.content) {
    DOMNodeBoxData.content = transformValueAfterGet(newContent);
    emitUpdatedEvents(box);

    return;
  }

  const element = box.el;
  const isInDOM = DOMNodeBoxData.isInDOM;
  const content = (isArray(newContent) ? newContent : [newContent]) as any[];
  const previousContent = transformValueAfterGet(DOMNodeBoxData.content);

  DOMNodeBoxData.content = content
    .filter((value: any) => value !== null)
    .map((value: any, index: number) => {
      if (
        previousContent[index] !== undefined &&
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
  if (isInDOM) {
    box.emit("@beforeUpdate");
  }

  const childNodes = [].slice.call(element.childNodes) as Node[];

  (DOMNodeBoxData.content as any[]).forEach((value, index) => {
    const newNode = value.textContent ? value : value.el;
    const isNotCorrectPosition = childNodes[index] !== newNode;
    const nodeBox = value as DOMNodeBox;
    const isNodeBox = nodeBox.type === "dom-node";
    if (
      newNode.parentNode &&
      isNotCorrectPosition &&
      ((newNode as HTMLElement).isConnected || nodeBox.__DOMNodeBoxData.isInDOM)
    ) {
      isInDOM && isNodeBox && beforeMountRitual(nodeBox);
      element.insertBefore(newNode, childNodes[index]);
      childNodes.splice(index, 1);

      isInDOM && isNodeBox && mountedRitual(nodeBox);

      return;
    }

    if (
      (nodeBox.type === "dom-node" && !nodeBox.__DOMNodeBoxData.isInDOM) ||
      !(newNode as Node).isConnected
    ) {
      isNodeBox && isInDOM && beforeMountRitual(nodeBox);
      if (index === 0) {
        element.insertBefore(
          newNode,
          element.firstChild ? element.firstChild : null
        );
      } else {
        element.insertBefore(newNode, element.childNodes[index] || null);
      }

      isNodeBox && isInDOM && mountedRitual(nodeBox);
    }
  });
  removeNodesUnsed(DOMNodeBoxData.content as any[], previousContent);

  emitUpdatedEvents(box);
}
