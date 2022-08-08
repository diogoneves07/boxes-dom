import { lEmitMoved, lEmitAfterMove } from "./easy-emiters";
import { DOMNodeBox, DOMNodeBoxFragment } from "../types/dom-node-boxes";
import DOMNodeBoxElementFragment from "./element-fragment";
import runInNextRaf from "./run-in-next-raf";

export default function movedRitual(
  box: DOMNodeBox | DOMNodeBoxFragment,
  props: {
    parent: DOMNodeBox | DOMNodeBoxFragment;
    el: Node | DOMNodeBoxElementFragment;
  }
) {
  lEmitMoved(null, {
    props,
  });

  runInNextRaf(() => {
    lEmitAfterMove(null, {
      props,
    });
  }, `${box.id}"@moved @afterMove"`);
}
