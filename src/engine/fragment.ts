import { CreateBoxType } from "../../../boxes/src/main";

import { DOMNodeBoxFragment } from "../types/dom-node-boxes";
import DOMNodeBoxProps from "./dom-node-box-props";
import DOMNodeBoxElementFragment from "./element-fragment";
import CreateDOMNodeBoxData from "./create-dom-node-box-data";
import { DOM_NODE_BOX_INTERNAL_DATA } from "./dom-node-boxes-symbols";

const FRAGMENT_WRAPPERS = new Set<string>([
  "normal",
  "dom-node",
  "dom-node-fragment",
]);

export default function Fragment(...args: any[]) {
  const fragment = CreateBoxType(
    "dom-node-fragment",
    DOMNodeBoxProps,
    FRAGMENT_WRAPPERS
  ) as unknown as DOMNodeBoxFragment;

  (fragment as any)[DOM_NODE_BOX_INTERNAL_DATA] = CreateDOMNodeBoxData();

  fragment.el = new DOMNodeBoxElementFragment();
  fragment.isBoxFragment = true;

  fragment(...args);

  return fragment;
}
