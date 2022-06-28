import { DOMNodeBox } from "../types/dom-node-box";
import runInNextRaf from "./run-in-next-raf";
export default function mountedRitual(box: DOMNodeBox) {
  box.emit("@mounted");
  box.treeEmit("@mounted");
  runInNextRaf(`${box.id}"@afterMount @effect"`, () => {
    box.emit("@afterMount");
    box.emit("@effect");
    box.treeEmit("@afterMount");
    box.treeEmit("@effect");
  });
}
