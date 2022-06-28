import { DOMNodeBox } from "./../types/dom-node-box";
import normalizeBoxesValues from "./normalize-boxes-values";
import runInRaf from "./run-in-raf";
import updateDOMNodeBox from "./update-dom-node-box";
export default function manipulateDOM(box: DOMNodeBox) {
  const DOMNodeBoxData = box.__DOMNodeBoxData;
  if (DOMNodeBoxData.contents) {
    runInRaf(`manipulateDOM${box.id}`, () => {
      box.normalize((values) => normalizeBoxesValues(values as any[]));
      updateDOMNodeBox(box, box.getDataInBoxes("dom-node"));
    });
  }
}
