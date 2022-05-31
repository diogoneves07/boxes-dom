import { DOMNodeBox } from "./../types/dom-node-box";
export default function removeDOMListeners(box: DOMNodeBox) {
  const DOMListenersCallbackfns = box.__DOMNodeBoxData.DOMListenersCallbackfns;
  if (DOMListenersCallbackfns) {
    Object.keys(DOMListenersCallbackfns).forEach((key) => {
      const callbackfn = DOMListenersCallbackfns[key];
      if (callbackfn) {
        callbackfn();
      }
      DOMListenersCallbackfns[key] = null;
    });
  }
}
