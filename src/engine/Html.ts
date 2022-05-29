import { InsertNodePosition } from "./../types/dom-node-box";
import { DOMNodeBoxProps } from "./dom-node-box-props";
import Box from "../../../../diogo07/boxes/src/main";
import updateDOMNodeBox from "./update-dom-node-box";
import { DOMNodeBox } from "../types/dom-node-box";

function updateBox(box: DOMNodeBox) {
  box.on("@change", () => {
    updateDOMNodeBox(box);
  });
}

function createElements<T = "one">(
  tags: keyof HTMLElementTagNameMap | keyof HTMLElementDeprecatedTagNameMap
): T extends "one" ? DOMNodeBox : DOMNodeBox[];

function createElements<T = "one">(
  tags: TemplateStringsArray
): T extends "one" ? DOMNodeBox : DOMNodeBox[];

function createElements<T = "one">(
  tags: string
): T extends "one" ? DOMNodeBox : DOMNodeBox[];
function createElements<T = "one">(
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
        box.__DOMNodeBoxData = {
          isDOMNodeRemoved: false,
          isInDOM: false,
        };

        updateBox(box);

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

createElements.render = (
  boxes: DOMNodeBox[],
  elementOrSelector?: HTMLElement | string,
  insertPosition?: InsertNodePosition
) => {
  const b = insertPosition ? boxes.reverse() : boxes;
  b.forEach((box) => {
    box.render(elementOrSelector as any, insertPosition);
  });
  return createElements;
};
const Html = createElements;

// Type force
export default Html as typeof Html;
