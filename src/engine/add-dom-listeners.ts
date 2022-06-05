import { EVENTS_PREFIX } from "../../../boxes/src/globals";
import { DOMNodeBox } from "../types/dom-node-box";

export function addDOMListeners(box: DOMNodeBox) {
  const element = box.el;
  const listeners = box.listeners as Exclude<typeof box.listeners, undefined>;

  if (!box.__DOMNodeBoxData.DOMListenersCallbackfns) {
    box.__DOMNodeBoxData.DOMListenersCallbackfns = {};
  }

  const DOMListenersCallbackfns = box.__DOMNodeBoxData.DOMListenersCallbackfns;

  Object.keys(listeners).forEach((type) => {
    if (DOMListenersCallbackfns[type]) {
      return;
    }
    const prefix = type.substring(0, 1);

    switch (prefix) {
      case EVENTS_PREFIX.lib:
      case EVENTS_PREFIX.broadcast:
      case EVENTS_PREFIX.user:
        return;

      default:
        const emitDOMEvent = (e: Event) => {
          if (listeners[type] && listeners[type].length > 0) {
            box.emit(type, null, {
              props: {
                DOMEvent: e,
              },
            });
          } else {
            noObserver();
          }
        };
        const noObserver = () => {
          DOMListenersCallbackfns[type] = null;
          element.removeEventListener(type, emitDOMEvent);
        };

        DOMListenersCallbackfns[type] = () => {
          element.removeEventListener(type, emitDOMEvent);
        };

        element.addEventListener(type, emitDOMEvent);
        break;
    }
  });
}
