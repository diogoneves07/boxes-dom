import { DOMNodeBox } from "../types/dom-node-boxes";
export default function removeDOMListeners(box: DOMNodeBox) {
  box.treeEmit("@__remove-all-dom-listener");
  box.emit("@__remove-all-dom-listener");
}
