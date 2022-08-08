import { lGetDataInBoxes } from "../../../boxes/src/main";
import { DOMNodeBox, DOMNodeBoxFragment } from "../types/dom-node-boxes";
import getDOMNodeBoxInternalData from "./get-dom-node-box-internal-data";
import { forElAndEachNodeClone } from "./manager-nodes-clones";
import runInRaf from "./run-in-raf";

const PREFIX_TO_SPLIT_ATTRS = " \\";

function organizeAttributes(attributes: string) {
  const newAttributes = new Map<string, string>();
  attributes
    .trim()
    .split(PREFIX_TO_SPLIT_ATTRS)
    .forEach((item) => {
      const v = item.split("=");
      if (v[1]) {
        newAttributes.set(v[0].trim(), v[1].trim());
      } else if (v[0].trim()) {
        newAttributes.set(v[0].trim(), "true");
      }
    });
  return newAttributes;
}
function normalizeDataInBoxes(data: any) {
  let attributes = "";

  (data as any[]).forEach((item) => {
    if (Array.isArray(item)) {
      attributes = attributes + item.join(" ");
    } else {
      attributes = attributes + item;
    }
  });
  return attributes;
}
function removeLastStyle(element: Element, lastStyle: string) {
  lastStyle.replace(/.*?:/g, (key) => {
    const property = key.substring(0, key.length - 1).trim() as any;
    (element as HTMLElement).style[property] = "";
    return "";
  });
}
function removesAttributesNotUsed(
  box: DOMNodeBox | DOMNodeBoxFragment,
  lastAttributesAdded: Map<string, string>,
  newAttributes: Map<string, string>
) {
  lastAttributesAdded.forEach((attrValue, attrName) => {
    // Removes attributes that will not be used.
    if (!newAttributes.has(attrName)) {
      forElAndEachNodeClone(box.el, (el) => {
        if (el instanceof Element) {
          if (attrName === "style") {
            attrValue && removeLastStyle(el, attrValue);
          } else {
            el.removeAttribute(attrName);
          }
        }
      });
    }
  });
}
/**
 * Sets attributes to the box element
 * @param box
 * The box.
 * @param attributesBox
 * The box that stores and manages the attributes.
 */
export default function setAttributesToBoxElement(
  box: DOMNodeBox | DOMNodeBoxFragment
) {
  const DOMNodeBoxData = getDOMNodeBoxInternalData(box);
  if (!DOMNodeBoxData.attributes) {
    return;
  }
  const attributesBox = DOMNodeBoxData.attributes.box;

  let lastAttributesAdded = DOMNodeBoxData.attributes
    ? DOMNodeBoxData.attributes.lastAttributesAdded
    : undefined;

  const data = lGetDataInBoxes(attributesBox)("dom-node");

  const newAttributes = organizeAttributes(normalizeDataInBoxes(data));

  if (lastAttributesAdded) {
    removesAttributesNotUsed(box, newAttributes, lastAttributesAdded);
  }

  runInRaf(() => {
    newAttributes.forEach((attrValue, attrName) => {
      if (
        attrName !== "null" &&
        attrName !== "undefined" &&
        attrValue !== "null" &&
        attrValue !== "undefined"
      ) {
        const attrCurrentValue =
          lastAttributesAdded && lastAttributesAdded.get(attrName);

        forElAndEachNodeClone(box.el, (el) => {
          if (el instanceof Element) {
            if (attrCurrentValue !== attrValue || !el.hasAttribute(attrName)) {
              if (attrName === "style" && el.hasAttribute(attrName)) {
                attrCurrentValue && removeLastStyle(el, attrCurrentValue);
                (el as HTMLElement).style.cssText += attrValue;
              } else {
                el.setAttribute(attrName, attrValue);
              }
            }
          }
        });
      }
    });

    if (DOMNodeBoxData.attributes) {
      DOMNodeBoxData.attributes.lastAttributesAdded = newAttributes;
    }
  }, `${box.id}attrs`);

  return newAttributes;
}
