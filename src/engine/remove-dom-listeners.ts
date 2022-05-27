import { DOMNodeBox } from "./../types/dom-node-box";
export default function removeDOMListeners(box: DOMNodeBox) {
  const easyRemoveDOMListeners = box.__DOMNodeBoxData.easyRemoveDOMListeners;
  if (easyRemoveDOMListeners) {
    easyRemoveDOMListeners.forEach((callbackfn) => {
      callbackfn();
    });
    easyRemoveDOMListeners.length = 0;
  }
}
