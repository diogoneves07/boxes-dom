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
import { useDataFromBox } from "./use-data-from-box";

function emitUpdatedEvents(box: DOMNodeBox) {
  if (box.__DOMNodeBoxData.isInDOM) {
    box.emit("@updated");
    callAfterRendered(box, "@afterUpdate");
    callAfterRendered(box, "@effect");
  }
}
export default function updateDOMNodeBox(box: DOMNodeBox) {
  const DOMNodeBoxData = box.__DOMNodeBoxData;
  const newContent = useDataFromBox(box.get(), box);
  const isInDOM = DOMNodeBoxData.isInDOM;

  if (!isInDOM) {
    return;
  }

  const element = box.el;

  const content = concatArrays(
    (isArray(newContent) ? newContent : [newContent]) as any[]
  );

  const previousContent = transformValueAfterGet(DOMNodeBoxData.content);
  DOMNodeBoxData.content = content
    .filter((value: any) => value !== null)
    .map((value: any, index: number) => {
      if (
        previousContent[index] !== undefined &&
        previousContent[index] !== null &&
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
}
