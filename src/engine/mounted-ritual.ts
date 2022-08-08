import { lEmitMounted, lEmitAfterMount, lEmitEffect } from "./easy-emiters";
import { DOMNodeBox, DOMNodeBoxFragment } from "../types/dom-node-boxes";
import runInNextRaf from "./run-in-next-raf";
export default function mountedRitual(box: DOMNodeBox | DOMNodeBoxFragment) {
  box.subtree(() => lEmitMounted());

  runInNextRaf(() => {
    box.subtree(() => {
      lEmitAfterMount();
      lEmitEffect();
    });
  }, `${box.id}"@afterMount @effect"`);
}
