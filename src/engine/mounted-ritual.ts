import { DOMNodeBox, DOMNodeBoxFragment } from "../types/dom-node-box";
import runInNextRaf from "./run-in-next-raf";
export default function mountedRitual(box: DOMNodeBox | DOMNodeBoxFragment) {
  box.treeEmit("@mounted");
  runInNextRaf(`${box.id}"@afterMount @effect"`, () => {
    box.treeEmit("@afterMount");
    box.treeEmit("@effect");
  });
}
