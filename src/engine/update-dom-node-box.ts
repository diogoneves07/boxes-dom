import hasTextContent from "../utilities/has-text-content";
import generateNodesForDOM from "./generate-nodes-for-dom";
import { removeNodesUnsed } from "./remove-nodes-unsed";
import { DOMNodeBox } from "../types/dom-node-box";
import beforeMountRitual from "./before-mount-ritual";
import mountedRitual from "./mounted-ritual";
import isDOMOrBoxValue from "./is-dom-or-box-value";
import runInNextRaf from "./run-in-next-raf";
import { afterUpdate } from "./observe-all-boxes";
import movedRitual from "./moved-ritual";

function emitUpdatedEvents(box: DOMNodeBox) {
  if (box.el.isConnected) {
    box.emit("@updated");
    runInNextRaf(`${box.id}"@afterUpdate @effect"`, () => {
      afterUpdate(box);
      box.emit("@afterUpdate");
      box.emit("@effect");
    });
  }
}
let CURRENT_ELEMENT: Element;
let CURRENT_BOX: DOMNodeBox;
let CURRENT_CHILD_NODES: NodeListOf<ChildNode>;
function organizeDOMNodes(value: any, index: number) {
  const newNode = hasTextContent(value) ? value : value.el;
  const isNotCorrectPosition = CURRENT_CHILD_NODES[index] !== newNode;
  const nodeBox = value as DOMNodeBox;
  const isNodeBox = nodeBox.isBox && nodeBox.wrappers.has("dom-node");

  if (
    newNode.parentNode &&
    isNotCorrectPosition &&
    (newNode as HTMLElement).isConnected
  ) {
    isNodeBox && nodeBox.emit("@beforeMove");
    CURRENT_ELEMENT.insertBefore(newNode, CURRENT_ELEMENT.childNodes[index]);
    isNodeBox && movedRitual(nodeBox);
    return;
  }

  if (
    (isNodeBox && !nodeBox.el.isConnected) ||
    !(newNode as Node).isConnected
  ) {
    isNodeBox && CURRENT_BOX.el.isConnected && beforeMountRitual(nodeBox);
    CURRENT_ELEMENT.insertBefore(newNode, CURRENT_ELEMENT.childNodes[index]);
    isNodeBox && CURRENT_BOX.el.isConnected && mountedRitual(nodeBox);
  }
}
export default function updateDOMNodeBox(box: DOMNodeBox, newContent: any) {
  const DOMNodeBoxData = box.__DOMNodeBoxData;
  const element = box.el;
  const nContent = (
    Array.isArray(newContent) ? newContent : [newContent]
  ) as any[];

  const previousContent = DOMNodeBoxData.contents as any[];
  const previousContentSet = new Set(previousContent);

  const previousContentLength = previousContent.length;
  let indexLastTextNodeReused = -1;

  CURRENT_ELEMENT = element;
  CURRENT_BOX = box;

  if (box.el.isConnected) {
    box.emit("@beforeUpdate");
  }

  let cleanContent: any[] = [];
  let nContentLength = nContent.length;
  for (let index = 0; index < nContentLength; index++) {
    let value = nContent[index];

    if (!isDOMOrBoxValue(value)) {
      continue;
    }

    if (typeof value === "number" || typeof value === "string") {
      let addNewTextNode = true;
      while (indexLastTextNodeReused < previousContentLength) {
        indexLastTextNodeReused++;
        if (
          previousContent[indexLastTextNodeReused] &&
          hasTextContent(previousContent[indexLastTextNodeReused])
        ) {
          previousContent[indexLastTextNodeReused].textContent = value;
          value = previousContent[indexLastTextNodeReused];

          addNewTextNode = false;

          break;
        }
      }

      if (addNewTextNode) {
        value = document.createTextNode(value.toString());
      }
    } else if (
      value &&
      value.wrappers === "dom-node" &&
      !(value.el as Element).isConnected
    ) {
      generateNodesForDOM(value);
    }
    previousContentSet.delete(value);
    cleanContent.push(value);
  }

  DOMNodeBoxData.contents = cleanContent;

  removeNodesUnsed(previousContentSet);

  CURRENT_CHILD_NODES = CURRENT_ELEMENT.childNodes;

  const length = cleanContent.length;
  for (let index = 0; index < length; index++) {
    const value = cleanContent[index];
    if (value && value.isBox && value !== previousContent[index]) {
      (value as DOMNodeBox).emit("@changedPosition");
    }
    organizeDOMNodes(value, index);
  }

  emitUpdatedEvents(box);
}
