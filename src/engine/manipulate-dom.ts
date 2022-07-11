import { DOMNodeBox, DOMNodeBoxFragment } from "./../types/dom-node-box";
import invokeCallbacksInBoxesValues from "./invoke-callbacks-in-boxes-values";
import runInRaf from "./run-in-raf";
import updateDOMNodeBox from "./update-dom-node-box";
export default function manipulateDOM(box: DOMNodeBox | DOMNodeBoxFragment) {
  const DOMNodeBoxData = box.__DOMNodeBoxData;
  if (DOMNodeBoxData.contents) {
    runInRaf(`manipulateDOM${box.id}`, () => {
      box.normalize((values) => invokeCallbacksInBoxesValues(values as any[]));
      updateDOMNodeBox(box, box.getDataInBoxes("dom-node"));
    });
  }
}
