import { lOnChanged, NormalBoxEventMap } from "../../../boxes/src/main";

import { DOMNodeBox, DOMNodeBoxFragment } from "../types/dom-node-boxes";
import lazyLoopValues from "../utilities/lazy-loop-values";
import runInNextRaf from "./run-in-next-raf";
import beforeManipulateDOM from "./before-manipulate-dom";
import hasOwnProperty from "../utilities/hasOwnProperty";
import setAttributesToBoxElement from "./set-attributes-to-box-element";
import { forElAndEachNodeClone } from "./manager-nodes-clones";
import { defineNodeParentBox, getNodeParentBox } from "./manager-box-nodes";
import { addIntersectionObserver } from "./manager-intersection-observer";
import getDOMNodeBoxInternalData from "./get-dom-node-box-internal-data";

/** Listens for changes in the box tree. */
function onSubtreeChange(e: NormalBoxEventMap["@changed"]) {
  const { target, box } = e;
  const parents = target.parents;

  if (
    box === target ||
    (parents &&
      !target.wrappers.has("dom-node") &&
      parents.includes(box as any))
  ) {
    if (box.wrappers.has("dom-node")) {
      beforeManipulateDOM(box as DOMNodeBox);
    }
  }
}

let calledRaf = false;
const BOXES_WAITING_OBSERVER = new Set<DOMNodeBox | DOMNodeBoxFragment>();
export function addAllNecessaryObservers(box: DOMNodeBox | DOMNodeBoxFragment) {
  setAttributesToBoxElement(box);

  BOXES_WAITING_OBSERVER.add(box);

  if (!calledRaf) {
    runInNextRaf(() => {
      lazyLoopValues(
        BOXES_WAITING_OBSERVER,
        (item) => {
          if (hasOwnProperty(item, "isBoxFragment")) {
            item.subtree(() => {
              lOnChanged(onSubtreeChange);
            });
            return;
          }
          const b = item as DOMNodeBox;
          const DOMNodeBoxData = getDOMNodeBoxInternalData(b);

          if (!DOMNodeBoxData.allNecessaryObserversAdded) {
            /** Inserts the necessary observers to manage the box and its DOM element.*/

            DOMNodeBoxData.allNecessaryObserversAdded = true;
            forElAndEachNodeClone(b.el, (item) => {
              if (item instanceof Element && !getNodeParentBox(item)) {
                defineNodeParentBox(item, b);
                addIntersectionObserver(item);
              }
            });
            b.subtree(() => {
              lOnChanged(onSubtreeChange);
            });
          }
        },
        40
      );
    }, BOXES_WAITING_OBSERVER);

    calledRaf = true;
  }
}
