import { DOMNodeBox, DOMNodeBoxFragment } from "../types/dom-node-box";
import hasOwnProperty from "../utilities/hasOwnProperty";
import { addAllNecessaryObservers } from "./add-all-necessary-observers";
import isDOMOrBoxValue from "./is-dom-or-box-value";
import { appendNodes } from "./manipulate-dom-methods";
import { useTextNode } from "./use-text-node";

/** Useful to identify the root box of the current process. */
let BOX_ROOT: DOMNodeBox | DOMNodeBoxFragment | undefined;

/** Organizes the box's DOM tree. */
export default function organizeNodesForDOM(
  box: DOMNodeBox | DOMNodeBoxFragment
) {
  if (!BOX_ROOT) {
    BOX_ROOT = box;
    box.treeEmit("@beforeCreate");
  }

  const DOMNodeBoxData = box.__DOMNodeBoxData;

  const dataIntoBoxes = box.get();

  let element = box.el;
  const contents = Array.isArray(dataIntoBoxes)
    ? dataIntoBoxes
    : [dataIntoBoxes];

  addAllNecessaryObservers(box);

  const newContent: any[] = [];
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

    if (value === box) {
      throw new Error(
        "Boxes: Circular reference. The box cannot have herself as a child!"
      );
    }

    if (
      hasOwnProperty(value, "isBox") &&
      (value as DOMNodeBox).wrappers.has("dom-node")
    ) {
      const boxChild = value as DOMNodeBox;
      const boxChildContent = boxChild.get();

      if (
        typeof boxChildContent === "number" ||
        typeof boxChildContent === "string"
      ) {
        const newBoxChildContent = useTextNode(boxChildContent);
        boxChild.__DOMNodeBoxData.contents = [newBoxChildContent];
        appendNodes(boxChild.el, newBoxChildContent);
        boxChild.__DOMNodeBoxData.nodesOrganized = true;
        addAllNecessaryObservers(boxChild);
      } else if (
        (boxChildContent && hasOwnProperty(boxChildContent, "isBox")) ||
        Array.isArray(boxChildContent)
      ) {
        organizeNodesForDOM(boxChild);
      } else {
        boxChild.__DOMNodeBoxData.nodesOrganized = true;
        boxChild.__DOMNodeBoxData.contents = [];

        addAllNecessaryObservers(boxChild);
      }

      appendNodes(element, boxChild.el);
    } else {
      if (
        hasOwnProperty(value, "isBox") &&
        !(value as DOMNodeBox).wrappers.has("dom-node")
      ) {
        const boxesValues = value.getDataInBoxes("dom-node");
        if (Array.isArray(boxesValues)) {
          for (const bV of boxesValues) {
            loopCalback(bV);
          }
        } else {
          loopCalback(value.getDataInBoxes("dom-node"));
        }
        return;
      }
      value = useTextNode(value);
      if (!isDOMOrBoxValue(value)) {
        // TODO Melhorar menssagem!
        throw new Error("Value ruim para DOM!!!");
      }

      if (value && value instanceof Text) {
        appendNodes(element, value);
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
    box.treeEmit("@created");
  }

  return element;
}
