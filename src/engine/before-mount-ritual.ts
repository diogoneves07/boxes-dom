import { lEmitBeforeMount } from "./easy-emiters";
import { DOMNodeBox, DOMNodeBoxFragment } from "../types/dom-node-boxes";
export default function beforeMountRitual(
  box: DOMNodeBox | DOMNodeBoxFragment
) {
  box.subtree(() => lEmitBeforeMount());
}
