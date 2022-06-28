import { DOMNodeBox } from "../types/dom-node-box";
import runInNextRaf from "./run-in-next-raf";
export default function movedRitual(box: DOMNodeBox) {
  box.emit("@moved");
  runInNextRaf(`${box.id}"@afterMount @effect"`, () => {
    box.emit("@afterMove");
  });
}
