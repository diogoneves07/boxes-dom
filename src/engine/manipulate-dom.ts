import { lGetDataInBoxes } from "../../../boxes/src/main";

import { DOMNodeBox, DOMNodeBoxFragment } from "../types/dom-node-boxes";
import getDOMNodeBoxInternalData from "./get-dom-node-box-internal-data";
import runInRaf from "./run-in-raf";
import updateDOMNodeBox from "./update-dom-node-box";
export default function manipulateDOM(box: DOMNodeBox | DOMNodeBoxFragment) {
  const DOMNodeBoxData = getDOMNodeBoxInternalData(box);
  if (DOMNodeBoxData.contents) {
    runInRaf(() => {
      updateDOMNodeBox(box, lGetDataInBoxes(box)("dom-node"));
    }, `manipulateDOM${box.id}`);
  }
}
