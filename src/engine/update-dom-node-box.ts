import { ElementFragment } from "./../types/dom-node-box";
import { DOMNodeBox, DOMNodeBoxFragment } from "../types/dom-node-box";

import organizeNodesForDOM from "./organize-nodes-for-dom";
import { removeNodesUnsed } from "./treat-nodes-unsed";
import beforeMountRitual from "./before-mount-ritual";
import mountedRitual from "./mounted-ritual";
import isDOMOrBoxValue from "./is-dom-or-box-value";
import runInNextRaf from "./run-in-next-raf";
import movedRitual from "./moved-ritual";
import hasOwnProperty from "../utilities/hasOwnProperty";
import { prependNodes, insertNodesAfter } from "./manipulate-dom-methods";
import { useTextNode } from "./use-text-node";

function emitUpdatedEvents(box: DOMNodeBox | DOMNodeBoxFragment) {
  if (box.el.isConnected) {
    box.emit("@updated");
    runInNextRaf(`${box.id}"@afterUpdate @effect"`, () => {
      box.emit("@afterUpdate");
      box.emit("@effect");
    });
  }
}

export default function updateDOMNodeBox(
  box: DOMNodeBox | DOMNodeBoxFragment,
  newContent: any
) {
  const DOMNodeBoxData = box.__DOMNodeBoxData;
  const element = box.el;
  const nContent = (
    Array.isArray(newContent) ? newContent : [newContent]
  ) as any[];

  const previousContent = DOMNodeBoxData.contents as any[];
  const nodesUnsed = new Set(previousContent);

  if (box.el.isConnected) {
    box.emit("@beforeUpdate");
  }

  let cleanContent: any[] = [];
  let nContentLength = nContent.length;

  const insertNode = (node: Node | ElementFragment, index: number) => {
    if (index === 0) {
      prependNodes(element, node);
    } else {
      const previousValue = cleanContent[index - 1];

      insertNodesAfter(
        element,
        hasOwnProperty(previousValue, "isBox")
          ? previousValue.el
          : previousValue,
        node
      );
    }
  };
  const run = (item: any, index: number) => {
    let value = item;

    if (!isDOMOrBoxValue(value)) {
      if (Array.isArray(value)) value.forEach(run);

      return;
    }

    if (typeof value === "string" || typeof value === "number") {
      if (previousContent[index] instanceof Text) {
        previousContent[index].textContent = value.toString();
        value = previousContent[index];
      } else {
        value = useTextNode(value);
      }
      insertNode(value as Text, index);
    } else if (
      hasOwnProperty(value, "isBox") &&
      (value as DOMNodeBox).wrappers.has("dom-node")
    ) {
      const boxChild = value as DOMNodeBox | DOMNodeBoxFragment;
      const changedPosition = boxChild !== previousContent[index];
      if (changedPosition) {
        boxChild.emit("@changedPosition");
      }

      if (!boxChild.el.isConnected) {
        organizeNodesForDOM(boxChild);
        beforeMountRitual(boxChild);
        insertNode(boxChild.el, index);
        mountedRitual(boxChild);
      } else if (
        changedPosition &&
        cleanContent[index - 1] !== previousContent[index - 1]
      ) {
        boxChild.emit("@beforeMove");
        insertNode(boxChild.el, index);
        movedRitual(boxChild);
      }
    }

    // Removes items that are in the new item collection.
    nodesUnsed.delete(value);

    cleanContent.push(value);
  };

  for (let index = 0; index < nContentLength; index++) {
    run(nContent[index], index);
  }

  DOMNodeBoxData.contents = cleanContent;

  removeNodesUnsed(nodesUnsed, box.el);

  emitUpdatedEvents(box);
}
