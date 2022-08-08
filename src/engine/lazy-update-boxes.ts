import { lGetDataInBoxes } from "../../../boxes/src/main";
import { DOMNodeBox } from "../types/dom-node-boxes";
import getDOMNodeBoxInternalData from "./get-dom-node-box-internal-data";
import runInRaf from "./run-in-raf";
import updateDOMNodeBox from "./update-dom-node-box";

/*
 * This module is responsible for reserving a short period to update the necessary boxes that are not
 * visible in the viewport.
 * */

const TIME_LIMIT = 20;

export const LAZY_BOXES_TO_UPDATE: Set<DOMNodeBox> = new Set();

function lazyUpdateBox(lastTime: number) {
  const boxIterator = LAZY_BOXES_TO_UPDATE.values().next();

  if (boxIterator.done) return;

  const box = boxIterator.value;

  LAZY_BOXES_TO_UPDATE.delete(box);

  const DOMNodeBoxData = getDOMNodeBoxInternalData(box);

  if (DOMNodeBoxData.contents) {
    DOMNodeBoxData.isWaitingElementIntersectingToUpdate = false;
    updateDOMNodeBox(box, lGetDataInBoxes(box)("dom-node"));
  }
  if (Date.now() - lastTime < TIME_LIMIT) {
    lazyUpdateBox(lastTime);
  }
}

setInterval(() => {
  if (LAZY_BOXES_TO_UPDATE.size > 0) {
    runInRaf(() => {
      const lastTime = Date.now();
      lazyUpdateBox(lastTime);
    }, "lazyUpdateBox");
  }
}, 200 /* 200: Fast enough to not disturb the user and slow enough to prioritize more important tasks. */);
