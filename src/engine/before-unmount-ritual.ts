import { DOMNodeBox } from "../types/dom-node-box";
export default function beforeUnmountRitual(box: DOMNodeBox) {
  box.treeEmit("@beforeUnmount");
  box.emit("@beforeUnmount");
}
