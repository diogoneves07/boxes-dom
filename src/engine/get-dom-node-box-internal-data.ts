import { AnyBox } from "../../../boxes/src/main";

import { DOMNodeBoxInternalData } from "../types/dom-node-box-internal-data";
import { DOM_NODE_BOX_INTERNAL_DATA } from "./dom-node-boxes-symbols";

/**
 * The data necessary for the functioning of the library.
 * */
export default function getDOMNodeBoxInternalData(box: AnyBox) {
  return (box as any)[DOM_NODE_BOX_INTERNAL_DATA] as DOMNodeBoxInternalData;
}
