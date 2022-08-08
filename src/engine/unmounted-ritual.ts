import { lEmitUnmounted, lEmitAfterUnmount } from "./easy-emiters";
import { DOMNodeBox, DOMNodeBoxFragment } from "../types/dom-node-boxes";
import runInNextRaf from "./run-in-next-raf";
export default function unmountRitual(box: DOMNodeBox | DOMNodeBoxFragment) {
  box.nodes(() => {
    lEmitUnmounted();
  });

  lEmitUnmounted(box)();

  runInNextRaf(() => {
    box.nodes(() => lEmitAfterUnmount());
    lEmitAfterUnmount(box)();
  }, `${box.id}@afterUnmount`);
}
