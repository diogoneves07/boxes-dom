import { DOMNodeBox } from "./../types/dom-node-box";
export default function removeDOMListeners(box: DOMNodeBox) {
  box.treeEmit("@__remove-all-dom-listener");
  box.emit("@__remove-all-dom-listener");
}
