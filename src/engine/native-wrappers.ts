import { DOMNodeBox } from "../types/dom-node-boxes";
import {
  hasBoxes,
  Wrap,
  NormalBox,
  NormalBoxEventMap,
  SecretBox,
  lOnChanged,
} from "../../../boxes/src/main";
import getDOMNodeBoxInternalData from "./get-dom-node-box-internal-data";
import setAttributesToBoxElement from "./set-attributes-to-box-element";
import getItemNodes from "./get-item-nodes";
const boxType = "dom-node";
/**
 * Manage box element attributes.
 * @param attributes
 * The attributes to be managed.
 */
export const lAttrs = Wrap(
  (b) =>
    (attributes: TemplateStringsArray, ...args: any[]) => {
      const box = b as DOMNodeBox;
      const DOMNodeBoxData = getDOMNodeBoxInternalData(box);

      const values: any[] = [];

      if (Array.isArray(attributes)) {
        (attributes as TemplateStringsArray).raw.forEach((value, index) => {
          values.push(value, args[index] || "");
        });
      }

      let attributesBox: NormalBox;

      if (DOMNodeBoxData.attributes) {
        // Removes last @changed callbackfn
        const removeOnSubtreeChange =
          DOMNodeBoxData.attributes.removeOnSubtreeChange;

        if (removeOnSubtreeChange) {
          removeOnSubtreeChange();
        }
      }

      const onSubtreeChange = (e: NormalBoxEventMap["@changed"]) => {
        if (!e.target.wrappers.has("dom-node")) {
          if (DOMNodeBoxData.attributes) {
            setAttributesToBoxElement(box);
          }
        }
      };

      attributesBox = SecretBox(values);
      let removeOnSubtreeChange: Function | undefined;
      if (hasBoxes(attributesBox, "dom-node")) {
        removeOnSubtreeChange = attributesBox.subtree(() => {
          lOnChanged(onSubtreeChange);
        });
      }

      DOMNodeBoxData.attributes = {
        box: attributesBox,
        onSubtreeChange,
        removeOnSubtreeChange,
      };
      setAttributesToBoxElement(box);

      return box;
    },
  boxType
);

export const lGetChildNodes = Wrap(
  (box) => () => getItemNodes((box as DOMNodeBox).el),
  boxType
);
