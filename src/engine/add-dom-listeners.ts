import { DOMNodeBoxEventMap } from "./../types/dom-node-box";
import { DOMNodeBox } from "../types/dom-node-box";
import isDOMListener from "./is-dom-listener";

export function addDOMListeners(box: DOMNodeBox, listenerAddedType: string) {
  if (!isDOMListener(listenerAddedType)) {
    return;
  }
  const element = box.el;

  const emitDOMEvent = (e: Event) => {
    box.emit(listenerAddedType, null, {
      props: {
        DOMEvent: e,
      },
    });
  };

  const listenerRemovedCallbackfn = (
    e: DOMNodeBoxEventMap["@listenerRemoved"]
  ) => {
    if (e.listenerRemoved.eventName === listenerAddedType) {
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

  box.on("@listenerRemoved", listenerRemovedCallbackfn);
  // box.on("@__remove-all-dom-listener", removeAllDomListenerCallbackfn);

  element.addEventListener(listenerAddedType, emitDOMEvent);
}
