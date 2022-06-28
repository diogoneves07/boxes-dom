import { DOMNodeBoxEventMap } from "./../types/dom-node-box";

import { LAZY_BOXES_TO_UPDATE } from "./lazy-update-boxes";
import { DOMNodeBox } from "../types/dom-node-box";
import { addDOMListeners } from "./add-dom-listeners";
import manipulateDOM from "./manipulate-dom";

const intersectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((o) => {
    const box = intersectionObserverBoxes.get(o.target);
    if (box) {
      const DOMNodeBoxData = box.__DOMNodeBoxData;

      DOMNodeBoxData.isElementIntersecting = o.isIntersecting;
      if (
        o.isIntersecting &&
        DOMNodeBoxData.isWaitingElementIntersectingToUpdate
      ) {
        beforeManipulateDOM(box);
      }
    }
  });
});
const intersectionObserverBoxes: Map<Element, DOMNodeBox> = new Map();

function beforeManipulateDOM(box: DOMNodeBox) {
  const DOMNodeBoxData = box.__DOMNodeBoxData;

  let isElementIntersecting = DOMNodeBoxData.isElementIntersecting;

  if (isElementIntersecting) {
    DOMNodeBoxData.isWaitingElementIntersectingToUpdate = false;
    LAZY_BOXES_TO_UPDATE.delete(box);
    manipulateDOM(box);
  } else {
    DOMNodeBoxData.isWaitingElementIntersectingToUpdate = true;
    LAZY_BOXES_TO_UPDATE.add(box);
  }
}

function onTreeChange(e: DOMNodeBoxEventMap["@changed[tree]"]) {
  if (!e.triggerBox.wrappers.has("dom-node")) {
    beforeManipulateDOM(e.box as DOMNodeBox);
  }
}
function onChange(e: any) {
  const box = e.box as DOMNodeBox;
  const DOMNodeBoxData = box.__DOMNodeBoxData;
  if (DOMNodeBoxData.contents) {
    beforeManipulateDOM(box);
  }
}
function onListenerAdded(e: any) {
  const box = e.box as DOMNodeBox;
  addDOMListeners(box, e.listenerAdded.eventName);
}

export function beforeAddIntersectionObserver(box: DOMNodeBox) {
  if (!box.__DOMNodeBoxData.intersectionObserverAdded) {
    beforeManipulateDOM(box);
  }
}
export function afterUpdate(box: DOMNodeBox) {
  const DOMNodeBoxData = box.__DOMNodeBoxData;
  if (!DOMNodeBoxData.intersectionObserverAdded) {
    DOMNodeBoxData.intersectionObserverAdded = true;

    const listeners = box.getListeners();
    if (listeners) {
      listeners.forEach((_v, key) => {
        addDOMListeners(box, key);
      });
    }

    intersectionObserverBoxes.set(box.el, box);
    intersectionObserver.observe(box.el);

    box.on("@listenerAdded", onListenerAdded);
    box.on("@changed[tree]", onTreeChange);
    box.on("@changed", onChange);
  }
}
