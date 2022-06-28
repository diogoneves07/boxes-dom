import { DOMNodeBox } from "../types/dom-node-box";
import runInNextRaf from "./run-in-next-raf";
export default function unmountRitual(box: DOMNodeBox) {
  box.treeEmit("@unmounted");
  box.emit("@unmounted");

  runInNextRaf(`${box.id}@afterUnmount`, () => {
    box.treeEmit("@afterUnmount");
    box.emit("@afterUnmount");
  });
}
