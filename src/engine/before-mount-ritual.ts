import { DOMNodeBox } from "../types/dom-node-box";
export default function beforeMountRitual(box: DOMNodeBox) {
  box.emit("@beforeMount");
  box.treeEmit("@beforeMount");
}
