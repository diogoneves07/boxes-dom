import { DOMNodeBoxFragment, DOMNodeBox } from "../types/dom-node-boxes";
import cloneElement from "./clone-element";
import { registryElClone } from "./manager-nodes-clones";
export class ReuseDOMNodeBox {
  el: DOMNodeBox["el"] | DOMNodeBoxFragment["el"];
  box: DOMNodeBox | DOMNodeBoxFragment;
  constructor(box: DOMNodeBox | DOMNodeBoxFragment) {
    this.box = box;
    this.el = cloneElement(box.el);
    registryElClone(box.el, this.el);
    return this;
  }
}
