import { DOMNodeBox, DOMNodeBoxFragment } from "../types/dom-node-box";
import runInNextRaf from "./run-in-next-raf";
export default function unmountRitual(box: DOMNodeBox | DOMNodeBoxFragment) {
  box.nodesEmit("@unmounted");
  box.emit("@unmounted");

  runInNextRaf(`${box.id}@afterUnmount`, () => {
    box.nodesEmit("@afterUnmount");
    box.emit("@afterUnmount");
  });
}
