import { transformValueAfterGet } from "./transform-value-after-get";
import hasTextContent from "../utilities/has-text-content";
import generateNodesForDOM from "./generate-nodes-for-dom";
import { removeNodesUnsed } from "./remove-nodes-unsed";
import isArray from "../utilities/is-array";
import { DOMNodeBox } from "../types/dom-node-box";
import beforeMountRitual from "./before-mount-ritual";
import mountedRitual from "./mounted-ritual";
import callAfterRendered from "./call-after-rendered";
import concatArrays from "../utilities/concat-arrays";

function emitUpdatedEvents(box: DOMNodeBox) {
  if (box.__DOMNodeBoxData.isInDOM) {
    box.emit("@updated");
    callAfterRendered(box, "@afterUpdate");
    callAfterRendered(box, "@effect");
  }
}
let requestAnimationFrameId = -1;

export default function updateDOMNodeBox(box: DOMNodeBox, newContent: any) {
  const DOMNodeBoxData = box.__DOMNodeBoxData;
  const isInDOM = DOMNodeBoxData.isInDOM;

  const element = box.el;

  const content = concatArrays(
    (isArray(newContent) ? newContent : [newContent]) as any[]
  );

  const previousContent = transformValueAfterGet(DOMNodeBoxData.content);
  DOMNodeBoxData.content = content
    .filter((value: any) => value !== null)
    .map((value: any, index: number) => {
      if (
        hasTextContent(value) &&
        previousContent[index] !== undefined &&
        previousContent[index] !== null &&
        hasTextContent(previousContent[index])
      ) {
        const lastTextContent = previousContent[index].textContent;
        if (
          lastTextContent !== value &&
          lastTextContent !== value.textContent
        ) {
          previousContent[index].textContent = value.textContent;
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

  window.cancelAnimationFrame(requestAnimationFrameId);

  requestAnimationFrameId = window.requestAnimationFrame(() => {
    if (isInDOM) {
      box.emit("@beforeUpdate");
    }

    const childNodes = [].slice.call(element.childNodes) as Node[];

    (DOMNodeBoxData.content as any[]).forEach((value, index) => {
      const newNode = hasTextContent(value) ? value : value.el;
      const isNotCorrectPosition = childNodes[index] !== newNode;
      const nodeBox = value as DOMNodeBox;
      const isNodeBox = nodeBox.type === "dom-node";

      if (
        newNode.parentNode &&
        isNotCorrectPosition &&
        (newNode as HTMLElement).isConnected
      ) {
        isNodeBox && beforeMountRitual(nodeBox);
        element.insertBefore(newNode, element.childNodes[index]);
        childNodes.splice(index, 1);

        isNodeBox && mountedRitual(nodeBox);

        return;
      }

      if (
        (nodeBox.type === "dom-node" && !nodeBox.__DOMNodeBoxData.isInDOM) ||
        !(newNode as Node).isConnected
      ) {
        isNodeBox && isInDOM && beforeMountRitual(nodeBox);
        element.insertBefore(newNode, element.childNodes[index] || null);

        isNodeBox && isInDOM && mountedRitual(nodeBox);
      }
    });

    removeNodesUnsed(DOMNodeBoxData.content as any[], previousContent);

    emitUpdatedEvents(box);
  });
}
