import {
  lEmitUpdated,
  lEmitAfterUpdate,
  lEmitEffect,
  lEmitBeforeUpdate,
  lEmitChangedPosition,
  lEmitBeforeMove,
} from "./easy-emiters";
import { isBox } from "../../../boxes/src/main";

import { DOMNodeBox, DOMNodeBoxFragment } from "../types/dom-node-boxes";
import organizeDOMBNodes from "./organize-domb-nodes";
import { removeNodesUnsed } from "./treat-nodes-unsed";
import beforeMountRitual from "./before-mount-ritual";
import mountedRitual from "./mounted-ritual";
import isDOMOrBoxValue from "./is-dom-or-box-value";
import runInNextRaf from "./run-in-next-raf";
import movedRitual from "./moved-ritual";
import hasOwnProperty from "../utilities/hasOwnProperty";
import { prependNodes, insertNodesAfter } from "./manipulate-dom-methods";
import { useTextNode } from "./use-text-node";
import DOMNodeBoxElementFragment from "./element-fragment";
import cloneElement from "./clone-element";
import {
  registryElClone,
  forEachNodeClone,
  forElAndEachClone,
} from "./manager-nodes-clones";
import { ReuseDOMNodeBox } from "./reuse-dom-node-box";
import getDOMNodeBoxInternalData from "./get-dom-node-box-internal-data";

function emitUpdatedEvents(box: DOMNodeBox | DOMNodeBoxFragment) {
  lEmitUpdated(box)();
  runInNextRaf(() => {
    lEmitAfterUpdate(box)();
    lEmitEffect(box)();
  }, `${box.id}"@afterUpdate @effect"`);
}

function insertNode(
  box: DOMNodeBox | DOMNodeBoxFragment,
  node: Node | DOMNodeBoxElementFragment,
  index: number,
  cleanContent: any[]
) {
  forElAndEachClone(box.el, (el: Node | DOMNodeBoxElementFragment) => {
    const isBoxEl = box.el === el;
    const useNode = isBoxEl ? node : cloneElement(node);

    if (index === 0 || !cleanContent[0]) {
      prependNodes(el, useNode);
    } else {
      const childIndex = cleanContent.length - 1;

      const previousNode = isBoxEl
        ? cleanContent[childIndex]
        : el.childNodes[childIndex];

      insertNodesAfter(
        el,
        hasOwnProperty(previousNode, "el") ? previousNode.el : previousNode,
        useNode
      );
    }

    if (!isBoxEl) {
      registryElClone(node, useNode as Node);
    }
  });
}

export default function updateDOMNodeBox(
  box: DOMNodeBox | DOMNodeBoxFragment,
  newContent: any
) {
  const DOMNodeBoxData = getDOMNodeBoxInternalData(box);
  const nContent = (
    Array.isArray(newContent) ? newContent : [newContent]
  ) as any[];

  const previousContent = DOMNodeBoxData.contents as any[];

  const nodesUnsed = new Set(previousContent);

  lEmitBeforeUpdate(box)();

  let cleanContent: any[] = [];
  let nContentLength = nContent.length;
  const run = (item: any, index: number) => {
    let value = item;

    if (!isDOMOrBoxValue(value) && !(value instanceof ReuseDOMNodeBox)) {
      if (Array.isArray(value)) {
        value.forEach(run);
      }
      return;
    }

    if (typeof value === "string" || typeof value === "number") {
      if (previousContent[index] instanceof Text) {
        previousContent[index].textContent = value.toString();
        value = previousContent[index];
      } else {
        value = useTextNode(value);
      }

      if (!(value as Text).isConnected) {
        insertNode(box, value as Text, index, cleanContent);
      } else {
        forEachNodeClone(value, (c) => {
          c.textContent = (value as Text).textContent;
        });
      }
    } else if (
      (isBox(value) && (value as DOMNodeBox).wrappers.has("dom-node")) ||
      value instanceof ReuseDOMNodeBox
    ) {
      const changedPosition = value !== previousContent[index];
      const isReuseDOMNodeBox = value instanceof ReuseDOMNodeBox;
      const boxChild = (isReuseDOMNodeBox ? value.box : value) as
        | DOMNodeBox
        | DOMNodeBoxFragment;

      const boxChildElement = isReuseDOMNodeBox ? value.el : boxChild.el;

      const moveEventsProps = changedPosition
        ? {
            parent: box,
            el: boxChildElement,
          }
        : false;

      if (changedPosition) {
        lEmitChangedPosition(boxChild)(null, {
          props: moveEventsProps as any,
        });
      }

      if (!boxChildElement.isConnected) {
        organizeDOMBNodes(boxChild);
        beforeMountRitual(boxChild);
        insertNode(box, boxChildElement, index, cleanContent);
        mountedRitual(boxChild);
      } else if (
        changedPosition &&
        cleanContent[cleanContent.length - 1] !== previousContent[index - 1]
      ) {
        lEmitBeforeMove(boxChild)(null, {
          props: moveEventsProps as any,
        });

        insertNode(box, boxChildElement, index, cleanContent);

        movedRitual(boxChild, moveEventsProps as any);
      }
    }
    nodesUnsed.delete(value);
    cleanContent.push(value);
  };

  for (let index = 0; index < nContentLength; index++) {
    run(nContent[index], index);
  }

  DOMNodeBoxData.contents = cleanContent;

  removeNodesUnsed(nodesUnsed, box);

  emitUpdatedEvents(box);
}
