import { DOMNodeBox } from "../types/dom-node-boxes";
import getElement from "../utilities/get-element";
import beforeMountRitual from "./before-mount-ritual";
import beforeUnmountRitual from "./before-unmount-ritual";
import organizeDOMBNodes from "./organize-domb-nodes";
import insertNodeInDOM from "./insert-node-in-dom";
import mountedRitual from "./mounted-ritual";
import runInRaf from "./run-in-raf";
import unmountRitual from "./unmounted-ritual";
import manipulateDOM from "./manipulate-dom";
import { removeNode } from "./manipulate-dom-methods";
import { InsertNodePosition } from "../types/insert-node-position";
import getDOMNodeBoxInternalData from "./get-dom-node-box-internal-data";
import { getNodeClones } from "./manager-nodes-clones";

const DOMNodeBoxProps: Partial<DOMNodeBox> = {
  getEls(this: DOMNodeBox) {
    const els = [this.el];
    const clones = getNodeClones(this.el);
    if (clones) {
      els.push(...([...clones] as any));
    }
    return els;
  },

  forceUpdate(this: DOMNodeBox) {
    manipulateDOM(this);
    return this;
  },
  render(
    this: DOMNodeBox,
    elementOrSelector: Node | string = document.body,
    insertPosition: InsertNodePosition
  ) {
    const DOMNodeBoxData = getDOMNodeBoxInternalData(this);
    if (!DOMNodeBoxData.nodesOrganized) {
      organizeDOMBNodes(this);
    }

    runInRaf(() => {
      const element = this.el;
      const parentEl = getElement(elementOrSelector);

      if (element && parentEl) {
        beforeMountRitual(this);
        insertNodeInDOM(parentEl, element, insertPosition);

        mountedRitual(this);
      }
    }, `render${this.id}`);

    return this;
  },

  unrender(this: DOMNodeBox) {
    runInRaf(() => {
      const element = this.el;
      if (element) {
        beforeUnmountRitual(this);
        removeNode(element, element.parentElement);
        unmountRitual(this);
      }
    }, `unrender${this.id}`);

    return this;
  },
};

export default DOMNodeBoxProps;
