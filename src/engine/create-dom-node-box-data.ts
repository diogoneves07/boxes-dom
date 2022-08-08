import { DOMNodeBoxInternalData } from "../types/dom-node-box-internal-data";

export default function CreateDOMNodeBoxData(): DOMNodeBoxInternalData {
  return {
    nodesOrganized: false,
    isWaitingElementIntersectingToUpdate: false,
  };
}
