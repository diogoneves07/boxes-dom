import { DOM_NODE_BOX_WRAPPER } from "./dom-node-box-wrapper";
import Box, { hasBoxes, NormalBox, BoxEventMap } from "../../../boxes/src/main";

import { DOMNodeBox, InsertNodePosition } from "../types/dom-node-box";
import getElement from "../utilities/get-element";
import applyAttributes from "./apply-attributes";
import beforeMountRitual from "./before-mount-ritual";
import beforeUnmountRitual from "./before-unmount-ritual";
import generateNodesForDOM from "./generate-nodes-for-dom";
import insertNodeInDOM from "./insert-node-in-dom";
import mountedRitual from "./mounted-ritual";
import normalizeBoxesValues from "./normalize-boxes-values";
import runInRaf from "./run-in-raf";
import unmountRitual from "./unmounted-ritual";

export const DOMNodeBoxProps: Partial<DOMNodeBox> = {
  wrappers: DOM_NODE_BOX_WRAPPER,
  attrs(this: DOMNodeBox, attributes: TemplateStringsArray, ...args: any[]) {
    const DOMNodeBoxData = this.__DOMNodeBoxData;

    const values: any[] = [];

    attributes.raw.forEach((value, index) => {
      values.push(value, args[index] || "");
    });

    let attributesBox: NormalBox;

    if (DOMNodeBoxData.attributes) {
      // Removes last deep changes callback
      DOMNodeBoxData.attributes.box.off(
        "@changed[tree]",
        DOMNodeBoxData.attributes.onTreeChangeCallback
      );
    }

    const onTreeChangeCallback = (e: BoxEventMap["@changed[tree]"]) => {
      if (!e.triggerBox.wrappers.has("dom-node")) {
        if (DOMNodeBoxData.attributes) {
          DOMNodeBoxData.attributes.lastAttributesAdded = applyAttributes(
            this,
            attributesBox
          );
        }
      }
    };

    attributesBox = Box(values);
    DOMNodeBoxData.attributes = {
      box: Box(values),
      onTreeChangeCallback,
      lastAttributesAdded: applyAttributes(this, attributesBox),
    };
    (attributesBox as any).diogo = 9;
    if (hasBoxes(attributesBox, "dom-node")) {
      attributesBox.on("@changed[tree]", onTreeChangeCallback);
    }

    return this;
  },
  render(
    this: DOMNodeBox,
    elementOrSelector: Element | string = document.body,
    insertPosition: InsertNodePosition
  ) {
    const DOMNodeBoxData = this.__DOMNodeBoxData;
    if (this.el.isConnected) {
      this.unrender();
    }

    if (!DOMNodeBoxData.nodesGenerated) {
      this.normalize((values) => normalizeBoxesValues(values as any[]));

      generateNodesForDOM(this);
    }

    runInRaf(`render${this.id}`, () => {
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
    const element = this.el;
    if (element) {
      runInRaf(`unrender${this.id}`, () => {
        beforeUnmountRitual(this);
        element.remove();
        unmountRitual(this);
      });
    }
    return this;
  },
};
