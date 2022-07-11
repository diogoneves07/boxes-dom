import { DOMNodeBoxFragment } from "./../types/dom-node-box";
import Box from "../../../../diogo07/boxes/src/main";

import DOMNodeBoxProps from "./dom-node-box-props";

const FRAGMENT_WRAPPERS = new Set<string>([
  "normal",
  "dom-node",
  "dom-node-fragment",
]);

export class DOMNodeBoxElementFragment {
  isConnected: boolean;
  childNodes: (
    | Text
    | Element
    | Node
    | SVGElement
    | DOMNodeBoxElementFragment
  )[];
  constructor() {
    this.isConnected = false;
    this.childNodes = [];
    return this;
  }
}

export default function Fragment(...args: any[]) {
  const fragment = Box(...args) as unknown as DOMNodeBoxFragment;

  Object.setPrototypeOf(fragment, DOMNodeBoxProps);

  fragment.__DOMNodeBoxData = {
    nodesOrganized: false,
    isWaitingElementIntersectingToUpdate: true,
  };

  fragment.el = new DOMNodeBoxElementFragment();
  fragment.attrs = null;
  fragment.isBoxFragment = true;
  fragment.wrappers = FRAGMENT_WRAPPERS;

  return fragment;
}
