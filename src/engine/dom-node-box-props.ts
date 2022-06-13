import Box from "../../../boxes/src/main";

import { DOMNodeBox, InsertNodePosition } from "../types/dom-node-box";
import beforeMountRitual from "./before-mount-ritual";
import beforeUnmountRitual from "./before-unmount-ritual";
import generateNodesForDOM from "./generate-nodes-for-dom";
import insertNodeInDOM from "./insert-node-in-dom";
import mountedRitual from "./mounted-ritual";
import unmountRitual from "./unmounted-ritual";

export const DOMNodeBoxProps: Partial<DOMNodeBox> = {
  type: "dom-node",
  attrs(this: DOMNodeBox, attributes: TemplateStringsArray, ...args: any[]) {
    const values: any[] = [];

    attributes.raw.forEach((value, index) => {
      values.push(value, args[index] || "");
    });

    const prefixToSplitAttrs = " \\";

    let lastAttributesAdded: string[][] | false = false;
    let requestAnimationFrameId = -1;
    const box = Box(values);

    box.on("@deepChanges", (e) => {
      if (e.hasChanged("dom-node")) {
        return;
      }

      window.cancelAnimationFrame(requestAnimationFrameId);

      const data = box.useDataIntoBoxes("dom-node");

      requestAnimationFrameId = window.requestAnimationFrame(() => {
        if (lastAttributesAdded) {
          lastAttributesAdded.forEach((attr) => {
            this.el.removeAttribute(attr[0]);
          });
        }

        let allAttributes: string = "";
        (data as any[]).forEach((item) => {
          if (Array.isArray(item)) {
            allAttributes = allAttributes + item.join(" ");
          } else {
            allAttributes = allAttributes + item;
          }
        });
        lastAttributesAdded = allAttributes
          .trim()
          .split(prefixToSplitAttrs)

          .map((item) => {
            return item.split("=").map((v) => v.trim());
          });

        lastAttributesAdded.forEach((attr) => {
          if (
            attr[0] !== "null" &&
            attr[0] !== "undefined" &&
            attr[1] !== "null" &&
            attr[1] !== "undefined"
          ) {
            this.el.setAttribute(attr[0], attr[1] || "true");
          }
        });
      });
    });

    return this;
  },
  render(
    this: DOMNodeBox,
    elementOrSelector: Element | string = document.body,
    insertPosition: InsertNodePosition
  ) {
    const DOMNodeBoxData = this.__DOMNodeBoxData;
    if (DOMNodeBoxData.isInDOM) {
      this.unrender();
    }

    if (!DOMNodeBoxData.nodesGenerated) {
      generateNodesForDOM(this);
    }
    const element = this.el;
    const parentEl =
      typeof elementOrSelector === "string"
        ? document.querySelector(elementOrSelector)
        : elementOrSelector;

    if (!element || !parentEl) {
      return this;
    }

    window.requestAnimationFrame(() => {
      beforeMountRitual(this);
      insertNodeInDOM(parentEl, element, insertPosition);
      mountedRitual(this);
    });

    return this;
  },

  unrender(this: DOMNodeBox) {
    const element = this.el;
    if (element) {
      window.requestAnimationFrame(() => {
        beforeUnmountRitual(this);
        element.remove();
        unmountRitual(this);
      });
    }
    return this;
  },
};
