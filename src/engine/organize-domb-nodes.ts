import { lEmitBeforeCreate, lEmitCreated } from "./easy-emiters";

import { isBox, lGetDataInBoxes } from "../../../boxes/src/main";
import { ReuseDOMNodeBox } from "./reuse-dom-node-box";
import { DOMNodeBox, DOMNodeBoxFragment } from "../types/dom-node-boxes";
import { addAllNecessaryObservers } from "./add-all-necessary-observers";
import isDOMOrBoxValue from "./is-dom-or-box-value";
import { useTextNode } from "./use-text-node";
import { appendNodesForElAndEachClone } from "./make-clones-tree";
import invokeCallbacksInBoxesValues from "./invoke-callbacks-in-boxes-values";
import transformBoxesReuse from "./transform-boxes-reuse";
import getDOMNodeBoxInternalData from "./get-dom-node-box-internal-data";

/** Useful to identify the root box of the current process. */
let BOX_ROOT: DOMNodeBox | DOMNodeBoxFragment | undefined;

function transformBoxContents(box: DOMNodeBox | DOMNodeBoxFragment) {
  const currentValues = box.get();
  const values =
    Array.isArray(currentValues) && currentValues.length === 1
      ? currentValues[0]
      : currentValues;
  let newContents: any;

  switch (typeof values) {
    case "object":
    case "function":
      if (box.itemsType.has("function")) {
        newContents = invokeCallbacksInBoxesValues(currentValues);
      }

      if (newContents || box.hasBoxesReuse) {
        newContents = transformBoxesReuse(newContents || currentValues);
      }
      if (newContents) {
        box.normalize(() => newContents);
      }
      return newContents || currentValues;
    default:
      return currentValues;
  }
}
/** Organizes the box's DOM tree. */
export default function organizeDOMBNodes(
  box: DOMNodeBox | DOMNodeBoxFragment
) {
  if (!BOX_ROOT) {
    BOX_ROOT = box;
    box.subtree(() => lEmitBeforeCreate());
  }

  const DOMNodeBoxData = getDOMNodeBoxInternalData(box);

  const element = box.el;

  const contentsNormalized = transformBoxContents(box);

  const contents = Array.isArray(contentsNormalized)
    ? contentsNormalized
    : [contentsNormalized];

  const newContent: any[] = [];

  addAllNecessaryObservers(box);

  const loopCalback = (v: any) => {
    if (Array.isArray(v)) {
      for (const bestValue of v) {
        loopCalback(bestValue);
      }
      return;
    }

    let value = v;

    if (value === undefined || value === null) {
      return;
    }

    if (value instanceof ReuseDOMNodeBox) {
      appendNodesForElAndEachClone(element, value.el);
    } else if (isBox(value) && (value as DOMNodeBox).wrappers.has("dom-node")) {
      const boxChild = value as DOMNodeBox | DOMNodeBoxFragment;
      const boxChildData = getDOMNodeBoxInternalData(boxChild);
      const boxChildElement = boxChild.el;

      if (boxChildData.nodesOrganized) {
        appendNodesForElAndEachClone(element, boxChildElement);

        return;
      }
      const boxChildContent = boxChild.get();

      if (
        typeof boxChildContent === "number" ||
        typeof boxChildContent === "string"
      ) {
        const newBoxChildContent = useTextNode(boxChildContent);
        boxChildData.contents = [newBoxChildContent];

        appendNodesForElAndEachClone(boxChildElement, newBoxChildContent);
        addAllNecessaryObservers(boxChild);

        boxChildData.nodesOrganized = true;
      } else if (
        (boxChildContent && isBox(boxChildContent)) ||
        Array.isArray(boxChildContent)
      ) {
        organizeDOMBNodes(boxChild);
      } else {
        addAllNecessaryObservers(boxChild);
        boxChildData.nodesOrganized = true;
        boxChildData.contents = [];
      }

      appendNodesForElAndEachClone(element, boxChildElement);
    } else {
      if (isBox(value) && !(value as DOMNodeBox).wrappers.has("dom-node")) {
        const boxesValues = lGetDataInBoxes(value)("dom-node");
        if (Array.isArray(boxesValues)) {
          for (const bV of boxesValues) {
            loopCalback(bV);
          }
        } else {
          loopCalback(lGetDataInBoxes(value)("dom-node"));
        }

        return;
      }

      value = useTextNode(value);

      if (!isDOMOrBoxValue(value)) {
        // TODO Melhorar menssagem!
        throw new Error("Value ruim para DOM!!!");
      }

      if (value && value instanceof Text) {
        appendNodesForElAndEachClone(element, value);
      }
    }

    newContent.push(value);
  };

  for (const item of contents) {
    loopCalback(item);
  }

  DOMNodeBoxData.contents = newContent;
  DOMNodeBoxData.nodesOrganized = true;

  if (BOX_ROOT === box) {
    BOX_ROOT = undefined;

    box.subtree(() => lEmitCreated());
  }
}
