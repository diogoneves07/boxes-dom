import { DOMNodeBox } from "../types/dom-node-box";

export function addDOMListeners(box: DOMNodeBox) {
  const element = box.el;
  const listeners = box.listeners;

  if (listeners) {
    if (!box.__DOMNodeBoxData.easyRemoveDOMListeners) {
      box.__DOMNodeBoxData.easyRemoveDOMListeners = [];
    }

    const easyRemoveDOMListeners = box.__DOMNodeBoxData.easyRemoveDOMListeners;

    Object.keys(listeners).forEach((type) => {
      const prefix = type.substring(0, 1);
      switch (prefix) {
        case "@":
        case "*":
        case "+":
          break;

        default:
          function fn(e: Event) {
            if (listeners[type] && listeners[type].length > 0) {
              box.emit(type, null, {
                props: {
                  DOMEvent: e,
                },
              });
            } else {
              noObserver();
            }
          }
          const easyRemoveFn = () => {
            element.removeEventListener(type, fn);
          };

          easyRemoveDOMListeners.push(easyRemoveFn);

          const noObserver = () => {
            const index = easyRemoveDOMListeners.indexOf(easyRemoveFn);

            if (index > -1) {
              easyRemoveDOMListeners.splice(index, 1);
            }
            element.removeEventListener(type, fn);
          };

          element.addEventListener(type, fn);
          break;
      }
    });
  }
}
