/** Observes the elements that enter the viewport and update their boxes (if necessary). */

import { DOMNodeBox } from "../types/dom-node-boxes";
import beforeManipulateDOM from "./before-manipulate-dom";
import getDOMNodeBoxInternalData from "./get-dom-node-box-internal-data";
import { getNodeParentBox } from "./manager-box-nodes";
import runInRaf from "./run-in-raf";

const ENTRIES_MAP = new Map<Element, IntersectionObserverEntry>();

function loopEntriesMap() {
  ENTRIES_MAP.forEach((entry, target) => {
    if (!entry.isIntersecting) return;

    const box = getNodeParentBox(target) as DOMNodeBox;

    if (!box) return;

    const DOMNodeBoxData = getDOMNodeBoxInternalData(box);

    DOMNodeBoxData.isElementIntersecting = entry.isIntersecting;

    if (DOMNodeBoxData.isWaitingElementIntersectingToUpdate) {
      beforeManipulateDOM(box);
    }
  });
  ENTRIES_MAP.clear();
}
export const INTERSECTION_OBSERVER = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      ENTRIES_MAP.set(entry.target, entry);
    }
    runInRaf(loopEntriesMap, "loopEntriesMap");
  },
  {
    rootMargin: "30%",
  }
);

export function addIntersectionObserver(element: Element) {
  INTERSECTION_OBSERVER.observe(element);
}
