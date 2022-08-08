import {
  lOnListenerRemoved,
  NormalBoxEventMap,
  WrapEmit,
} from "../../../boxes/src/main";
import { DOMNodeBox, DOMNodeBoxFragment } from "../types/dom-node-boxes";
import isDOMListener from "./is-dom-listener";
import { forElAndEachNodeClone } from "./manager-nodes-clones";
import useOnlyDOMNodes from "./use-only-dom-nodes";

function addListener(
  box: DOMNodeBox | DOMNodeBoxFragment,
  listenerAddedType: string,
  element: Node
) {
  const emitDOMEvent = (DOMEvent: Event) => {
    WrapEmit(listenerAddedType)(box)(null, {
      props: {
        DOMEvent,
      },
    });
  };

  const listenerRemovedCallbackfn = (
    e: NormalBoxEventMap["@listenerRemoved"]
  ) => {
    if (e.removed.name === listenerAddedType) {
      DOM_LISTENERS_ADDED.delete(e.target.id + listenerAddedType);

      element.removeEventListener(listenerAddedType, emitDOMEvent);
      e.off();
      // box.off("@__remove-all-dom-listener", removeAllDomListenerCallbackfn);
    }
  };
  /*const removeAllDomListenerCallbackfn = (e: NormalBoxEvent) => {
      element.removeEventListener(listenerAddedType, emitDOMEvent);
      e.off();
      box.off("listenerRemoved", listenerRemovedCallbackfn);
    };*/

  lOnListenerRemoved(listenerRemovedCallbackfn);

  // box.on("@__remove-all-dom-listener", removeAllDomListenerCallbackfn);
  element.addEventListener(listenerAddedType, emitDOMEvent);
}
const DOM_LISTENERS_ADDED = new Set<string>();
export function addDOMListeners(
  box: DOMNodeBox | DOMNodeBoxFragment,
  listenerAddedType: string
) {
  if (
    !isDOMListener(listenerAddedType) ||
    DOM_LISTENERS_ADDED.has(box.id + listenerAddedType)
  ) {
    return;
  }

  DOM_LISTENERS_ADDED.add(box.id + listenerAddedType);

  forElAndEachNodeClone(box.el, (el) => {
    useOnlyDOMNodes(el, (element) => {
      addListener(box, listenerAddedType, element);
    });
  });
}
