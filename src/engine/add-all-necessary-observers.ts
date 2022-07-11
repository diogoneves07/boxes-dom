import { INTERSECTION_OBSERVER } from "./intersection-observer-boxes";
import {
  DOMNodeBoxEventMap,
  DOMNodeBox,
  DOMNodeBoxFragment,
} from "./../types/dom-node-box";
import lazyLoopValues from "../utilities/lazy-loop-values";
import runInNextRaf from "./run-in-next-raf";
import { addDOMListeners } from "./add-dom-listeners";
import beforeManipulateDOM from "./before-manipulate-dom";
import hasOwnProperty from "../utilities/hasOwnProperty";

let calledRaf = false;
const BOXES_WAITING_OBSERVER = new Set<DOMNodeBox>();

/** Listens for changes in the box tree. */
function onTreeChange(e: DOMNodeBoxEventMap["@changed"]) {
  if (e.box === e.triggerBox || !e.triggerBox.wrappers.has("dom-node")) {
    beforeManipulateDOM(e.box as DOMNodeBox);
  }
}
/** Adds the new event listener to the element (if it is a DOM event). */
function onListenerAdded(e: any) {
  const box = e.box as DOMNodeBox;
  addDOMListeners(box, e.listenerAdded.eventName);
}

/**
 * Inserts box in lazy update Map.
 *
 * * This forces the box to go through the update process
 * * as soon as its element is in the viewport or when
 * * it's its time to lazy update.
 */

export function addAllNecessaryObservers(b: DOMNodeBox | DOMNodeBoxFragment) {
  if (hasOwnProperty(b, "isBoxFragment")) {
    b.treeOn("@changed", onTreeChange);
    return;
  }
  const box = b as DOMNodeBox;
  BOXES_WAITING_OBSERVER.add(box);

  if (!calledRaf) {
    runInNextRaf(BOXES_WAITING_OBSERVER, () => {
      lazyLoopValues(
        BOXES_WAITING_OBSERVER,
        (b) => {
          const DOMNodeBoxData = b.__DOMNodeBoxData;

          if (!DOMNodeBoxData.allNecessaryObserversAdded) {
            /** Inserts the necessary observers to manage the box and its DOM element.*/

            DOMNodeBoxData.allNecessaryObserversAdded = true;
            (b.el as any).__boxes__parentBox = b;
            INTERSECTION_OBSERVER.observe(b.el);

            const listeners = b.getListeners();
            if (listeners) {
              listeners.forEach((_v, key) => {
                addDOMListeners(b, key);
              });
            }

            b.on("@listenerAdded", onListenerAdded);
            b.treeOn("@changed", onTreeChange);
          }
        },
        40
      );
    });

    calledRaf = true;
  }
}
