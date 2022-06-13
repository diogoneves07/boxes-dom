import { InsertNodePosition } from "./../types/dom-node-box";
import { DOMNodeBoxProps } from "./dom-node-box-props";
import Box from "../../../../diogo07/boxes/src/main";
import updateDOMNodeBox from "./update-dom-node-box";
import { DOMNodeBox } from "../types/dom-node-box";
import isArray from "../utilities/is-array";
import removeWhitespaces from "../utilities/remove-whitespaces";
import removeBreakLinesChars from "../utilities/remove-break-liles-chars";
import { transformValueAfterGet } from "./transform-value-after-get";
import { addDOMListeners } from "./add-dom-listeners";
import concatArrays from "../utilities/concat-arrays";
import normalizeBoxesValues from "./normalize-boxes-values";
import insertNodeInDOM from "./insert-node-in-dom";

function onChanges(box: DOMNodeBox) {
  const DOMNodeBoxData = box.__DOMNodeBoxData;

  box.on("@normalize", () => {
    box.normalize((values) => normalizeBoxesValues(values as any[]));
  });

  box.on("@deepChanges", (e) => {
    if (e.hasChanged("dom-node")) {
      const dataIntoBoxes = box.useDataIntoBoxes("dom-node");
      if (DOMNodeBoxData.content) {
        updateDOMNodeBox(box, transformValueAfterGet(dataIntoBoxes));
      }
    }
  });
  box.on("@changed", () => {
    const dataIntoBoxes = box.useDataIntoBoxes("dom-node");
    if (DOMNodeBoxData.content) {
      updateDOMNodeBox(box, transformValueAfterGet(dataIntoBoxes));
    }
  });

  box.on("@beforeCreate", () => {
    if (!DOMNodeBoxData.content) {
      const dataIntoBoxes = box.useDataIntoBoxes("dom-node");
      const content = isArray(dataIntoBoxes)
        ? concatArrays(dataIntoBoxes)
        : dataIntoBoxes;

      updateDOMNodeBox(box, transformValueAfterGet(content));
    }
  });
  box.on("@eventAdded @eventRemoved", () => {
    addDOMListeners(box);
  });
}

function initDOMNodeBoxData() {
  return {
    isDOMNodeRemoved: false,
    isInDOM: false,
    nodesGenerated: false,
  };
}
function Html<T = "one">(
  tags: keyof HTMLElementTagNameMap | keyof HTMLElementDeprecatedTagNameMap
): T extends "one" ? DOMNodeBox : DOMNodeBox[];

function Html<T = "one">(
  tags: TemplateStringsArray,
  ...args: string[]
): T extends "one" ? DOMNodeBox : DOMNodeBox[];

function Html<T = "one">(
  tags: string
): T extends "one" ? DOMNodeBox : DOMNodeBox[];

function Html<T = "one">(
  tags:
    | TemplateStringsArray
    | string
    | (HTMLElementTagNameMap | HTMLElementDeprecatedTagNameMap),
  ...args: string[]
): T extends "one" ? DOMNodeBox : DOMNodeBox[] {
  let allTags: string = "";
  if ((tags as TemplateStringsArray).raw) {
    (tags as TemplateStringsArray).forEach((value, index) => {
      allTags = allTags + value + (args[index] || "");
    });
  } else {
    allTags = tags as string;
  }
  const boxes: DOMNodeBox[] = [];

  allTags.split(" ").forEach((tag) => {
    const tagName = tag as string;
    const tagsAmount = parseFloat(tagName);

    const t = tagsAmount
      ? tagName.substring(tagsAmount.toString().length)
      : tagName;
    const length = tagsAmount || 1;
    let count = 0;

    while (count < length) {
      const box = Box() as unknown as DOMNodeBox;

      Object.assign(box, DOMNodeBoxProps);

      box.__DOMNodeBoxData = initDOMNodeBoxData();

      onChanges(box);

      box.el = document.createElement(t);

      boxes.push(box);

      count++;
    }
  });

  return (boxes[1] ? boxes : boxes[0]) as any;
}
Html.render = (
  boxes: (DOMNodeBox | Function)[] | (DOMNodeBox | Function)[][],
  elementOrSelector?: HTMLElement | string,
  insertPosition?: InsertNodePosition
) => {
  let onlyBoxes = normalizeBoxesValues(boxes) as (DOMNodeBox | string)[];

  (insertPosition === "after" ? onlyBoxes.reverse() : onlyBoxes).forEach(
    (item) => {
      if (typeof item === "string") {
        const parentEl =
          (typeof elementOrSelector === "string"
            ? document.querySelector(elementOrSelector)
            : elementOrSelector) || document.body;

        window.requestAnimationFrame(() => {
          insertNodeInDOM(
            parentEl as Element,
            document.createTextNode(item),
            insertPosition
          );
        });
      } else {
        item.render(elementOrSelector as any, insertPosition);
      }
    }
  );
  return Html;
};

function createSimpleBox() {
  let currentElementBox = Box() as unknown as DOMNodeBox;
  Object.assign(currentElementBox, DOMNodeBoxProps);
  currentElementBox.type = "dom-node";
  currentElementBox.__DOMNodeBoxData = initDOMNodeBoxData();
  return currentElementBox;
}
function convertElementsToBox(parentElement: HTMLElement) {
  let count = 0;
  let parentElementBox = createSimpleBox();
  const data = parentElementBox.__data;
  const DOMNodeBoxData = parentElementBox.__DOMNodeBoxData;
  parentElementBox.el = parentElement as HTMLElement;

  DOMNodeBoxData.isInDOM = parentElementBox.el.isConnected;
  DOMNodeBoxData.nodesGenerated = true;
  let currentElement = parentElement.childNodes.item(count);
  while (currentElement) {
    let value;
    switch (currentElement.nodeType) {
      case 1:
        value = convertElementsToBox(currentElement as HTMLElement);

        break;
      case 3:
        removeWhitespaces;
        if (
          currentElement.textContent &&
          removeWhitespaces(
            removeBreakLinesChars(currentElement.textContent)
          ).trim()
        ) {
          value = currentElement.textContent;
        }
        break;
    }
    if (value) {
      if (data.content) {
        if (isArray(data.content)) {
          data.content.push(value);
        } else {
          data.content = [data.content, value];
        }
      } else {
        data.content = value;
      }
    }

    count++;
    currentElement = parentElement.childNodes.item(count);
  }
  DOMNodeBoxData.content = transformValueAfterGet(data.content);
  onChanges(parentElementBox);
  return parentElementBox;
}
Html.toBoxes = (
  elementOrSelector?: HTMLElement | string,
  cloneNode: boolean = false
) => {
  const parentElement =
    typeof elementOrSelector === "string"
      ? document.querySelector(elementOrSelector)
      : elementOrSelector;

  if (!parentElement) return false;
  return convertElementsToBox(
    (cloneNode ? parentElement.cloneNode(true) : parentElement) as HTMLElement
  );
};

export default Html;
