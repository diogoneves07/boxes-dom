import { DOMNodeBox, InsertNodePosition } from "../types/dom-node-box";
import beforeMountRitual from "./before-mount-ritual";
import beforeUnmountRitual from "./before-unmount-ritual";
import generateNodesForDOM from "./generate-nodes-for-dom";
import mountedRitual from "./mounted-ritual";
import unmountRitual from "./unmounted-ritual";
export const DOMNodeBoxProps: Partial<DOMNodeBox> = {
  render(
    this: DOMNodeBox,
    elementOrSelector: HTMLElement | string = document.body,
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

    if (element && parentEl) {
      beforeMountRitual(this);
      switch (insertPosition) {
        case "before":
          if (parentEl.parentElement) {
            parentEl.parentElement.insertBefore(element, parentEl);
          }
          break;
        case "after":
          if (parentEl.parentElement) {
            parentEl.parentElement.insertBefore(element, parentEl.nextSibling);
          }
          break;
        default:
          parentEl.appendChild(element);
          break;
      }
      mountedRitual(this);
    }

    return this;
  },

  unrender(this: DOMNodeBox) {
    const element = this.el;
    if (element) {
      beforeUnmountRitual(this);
      element.remove();
      unmountRitual(this);
    }
    return this;
  },
};
