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

function onChanges(box: DOMNodeBox) {
  box.on("@changed", () => {
    updateDOMNodeBox(box);
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
  tags: TemplateStringsArray
): T extends "one" ? DOMNodeBox : DOMNodeBox[];

function Html<T = "one">(
  tags: string
): T extends "one" ? DOMNodeBox : DOMNodeBox[];

function Html<T = "one">(
  tags:
    | TemplateStringsArray
    | string
    | (HTMLElementTagNameMap | HTMLElementDeprecatedTagNameMap)
): T extends "one" ? DOMNodeBox : DOMNodeBox[] {
  const boxes: DOMNodeBox[] = [];
  tags
    .toString()
    .split(" ")
    .forEach((tagName) => {
      const tagsAmount = parseFloat(tagName);
      const length = tagsAmount || 1;
      let count = 0;
      while (count < length) {
        const box = Box() as unknown as DOMNodeBox;

        Object.assign(box, DOMNodeBoxProps);
        box.type = "dom-node";
        box.__DOMNodeBoxData = initDOMNodeBoxData();

        onChanges(box);

        const t = tagsAmount
          ? tagName.substring(tagsAmount.toString().length)
          : tagName;
        box.el = document.createElement(t);

        boxes.push(box);

        count++;
      }
    });

  return (boxes[1] ? boxes : boxes[0]) as any;
}

Html.render = (
  boxes: DOMNodeBox[],
  elementOrSelector?: HTMLElement | string,
  insertPosition?: InsertNodePosition
) => {
  const b = insertPosition === "after" ? boxes.slice().reverse() : boxes;
  b.forEach((box) => {
    box.render(elementOrSelector as any, insertPosition);
  });
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
