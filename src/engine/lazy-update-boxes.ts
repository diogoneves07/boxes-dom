import { DOMNodeBox } from "./../types/dom-node-box";
import normalizeBoxesValues from "./normalize-boxes-values";
import runInRaf from "./run-in-raf";
import updateDOMNodeBox from "./update-dom-node-box";

const TIME_LIMIT = 20;

export const LAZY_BOXES_TO_UPDATE: Set<DOMNodeBox> = new Set();

function lazyUpdateBox(lastTime: number) {
  const boxIterator = LAZY_BOXES_TO_UPDATE.values().next();

  if (boxIterator.done) return;
  const box = boxIterator.value;

  LAZY_BOXES_TO_UPDATE.delete(box);
  const DOMNodeBoxData = box.__DOMNodeBoxData;
  if (DOMNodeBoxData.contents) {
    box.normalize((values) => normalizeBoxesValues(values as any[]));
    updateDOMNodeBox(box, box.getDataInBoxes("dom-node"));
  }
  if (Date.now() - lastTime < TIME_LIMIT) {
    lazyUpdateBox(lastTime);
  }
}

setInterval(() => {
  if (LAZY_BOXES_TO_UPDATE.size > 0) {
    runInRaf("lazyUpdateBox", () => {
      const lastTime = Date.now();
      lazyUpdateBox(lastTime);
    });
  }
}, 200);
