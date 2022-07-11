import { NormalBox } from "../../../boxes/src/main";
import { DOMNodeBox } from "../types/dom-node-box";
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
/**
 * Sets attributes to the box element
 * @param box
 * The box.
 * @param attributesBox
 * The box that stores and manages the attributes.
 */
export default function setAttributesToBoxElement(
  box: DOMNodeBox,
  attributesBox: NormalBox
) {
  const DOMNodeBoxData = box.__DOMNodeBoxData;

  let lastAttributesAdded = DOMNodeBoxData.attributes
    ? DOMNodeBoxData.attributes.lastAttributesAdded
    : undefined;

  const data = attributesBox.getDataInBoxes("dom-node");

  const newAttributes = organizeAttributes(normalizeDataInBoxes(data));

  if (lastAttributesAdded) {
    lastAttributesAdded.forEach((_attrValue, attrName) => {
      // Removes attributes that will not be used.
      if (!newAttributes.has(attrName)) {
        box.el.removeAttribute(attrName);
      }
    });
  }

  runInRaf(`${box.id}attrs`, () => {
    newAttributes.forEach((attrValue, attrName) => {
      if (
        attrName !== "null" &&
        attrName !== "undefined" &&
        attrValue !== "null" &&
        attrValue !== "undefined"
      ) {
        const attrCurrentValue =
          lastAttributesAdded && lastAttributesAdded.get(attrName);

        if (attrCurrentValue !== attrValue) {
          box.el.setAttribute(attrName, attrValue);
        }
      }
    });
  });
  return newAttributes;
}
