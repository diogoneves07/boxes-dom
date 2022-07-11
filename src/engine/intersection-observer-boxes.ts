import { DOMNodeBox } from "../types/dom-node-box";
import beforeManipulateDOM from "./before-manipulate-dom";
import runInRaf from "./run-in-raf";

/** Observes the elements that enter the viewport and update their boxes (if necessary). */

const ENTRIES_MAP = new Map<Element, IntersectionObserverEntry>();

function loopEntriesMap() {
  ENTRIES_MAP.forEach((entry, target) => {
    if (!entry.isIntersecting) return;

    const box = (target as any).__boxes__parentBox as DOMNodeBox;

    if (!box) return;

    const DOMNodeBoxData = box.__DOMNodeBoxData;

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
    runInRaf("loopEntriesMap", loopEntriesMap);
  },
  {
    rootMargin: "30%",
  }
);
