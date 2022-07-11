import Box, { hasBoxes, NormalBox, BoxEventMap } from "../../../boxes/src/main";

import { DOMNodeBox, InsertNodePosition } from "../types/dom-node-box";
import getElement from "../utilities/get-element";
import setAttributesToBoxElement from "./set-attributes-to-box-element";
import beforeMountRitual from "./before-mount-ritual";
import beforeUnmountRitual from "./before-unmount-ritual";
import organizeNodesForDOM from "./organize-nodes-for-dom";
import insertNodeInDOM from "./insert-node-in-dom";
import mountedRitual from "./mounted-ritual";
import invokeCallbacksInBoxesValues from "./invoke-callbacks-in-boxes-values";
import runInRaf from "./run-in-raf";
import unmountRitual from "./unmounted-ritual";
import manipulateDOM from "./manipulate-dom";
import { removeNode } from "./manipulate-dom-methods";

const DOMNodeBoxProps: Partial<DOMNodeBox> = {
  attrs(this: DOMNodeBox, attributes: TemplateStringsArray, ...args: any[]) {
    const DOMNodeBoxData = this.__DOMNodeBoxData;

    const values: any[] = [];

    attributes.raw.forEach((value, index) => {
      values.push(value, args[index] || "");
    });

    let attributesBox: NormalBox;

    if (DOMNodeBoxData.attributes) {
      // Removes last @changed callbackfn
      DOMNodeBoxData.attributes.box.treeOff(
        "@changed",
        DOMNodeBoxData.attributes.onTreeChangeCallback
      );
    }

    const onTreeChangeCallback = (e: BoxEventMap["@changed"]) => {
      if (!e.triggerBox.wrappers.has("dom-node")) {
        if (DOMNodeBoxData.attributes) {
          DOMNodeBoxData.attributes.lastAttributesAdded =
            setAttributesToBoxElement(this, attributesBox);
        }
      }
    };

    attributesBox = Box(values);
    DOMNodeBoxData.attributes = {
      box: attributesBox,
      onTreeChangeCallback,
      lastAttributesAdded: setAttributesToBoxElement(this, attributesBox),
    };

    if (hasBoxes(attributesBox, "dom-node")) {
      attributesBox.treeOn("@changed", onTreeChangeCallback);
    }
    return this;
  },
  forceUpdate(this: DOMNodeBox) {
    manipulateDOM(this);
    return this;
  },
  render(
    this: DOMNodeBox,
    elementOrSelector: Element | string = document.body,
    insertPosition: InsertNodePosition
  ) {
    runInRaf(`render${this.id}`, () => {
      const DOMNodeBoxData = this.__DOMNodeBoxData;
      if (this.el.isConnected) {
        this.unrender();
      }

      if (!DOMNodeBoxData.nodesOrganized) {
        this.normalize((values) =>
          invokeCallbacksInBoxesValues(values as any[])
        );

        organizeNodesForDOM(this);
      }

      const element = this.el;
      const parentEl = getElement(elementOrSelector);

      if (element && parentEl) {
        beforeMountRitual(this);
        insertNodeInDOM(parentEl, element, insertPosition);
        mountedRitual(this);
      }
    });

    return this;
  },

  unrender(this: DOMNodeBox) {
    runInRaf(`unrender${this.id}`, () => {
      const element = this.el;
      if (element) {
        beforeUnmountRitual(this);
        removeNode(element, element.parentElement);
        unmountRitual(this);
      }
    });

    return this;
  },
};

Object.assign(DOMNodeBoxProps, Object.getPrototypeOf(Box()));

export default DOMNodeBoxProps;
