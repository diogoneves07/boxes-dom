import Box from "../../../../diogo07/boxes/src/main";

import { DOMNodeBoxProps } from "./dom-node-box-props";
import { DOMNodeBox } from "../types/dom-node-box";

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
  let stringTags: string = "";
  if ((tags as TemplateStringsArray).raw) {
    (tags as TemplateStringsArray).forEach((value, index) => {
      stringTags = stringTags + value + (args[index] || "");
    });
  } else {
    stringTags = tags as string;
  }
  const boxes: DOMNodeBox[] = [];
  const allTags = stringTags.split(" ");

  for (const tag of allTags) {
    const tagName = tag as string;
    const tagsAmount = parseFloat(tagName);

    const t = tagsAmount
      ? tagName.substring(tagsAmount.toString().length)
      : tagName;

    const length = tagsAmount || 1;
    let count = length;

    while (count--) {
      const box = Box() as unknown as DOMNodeBox;

      Object.assign(box, DOMNodeBoxProps);

      box.__DOMNodeBoxData = {
        nodesGenerated: false,
      };
      box.el = document.createElement(t);

      boxes.push(box);
    }
  }

  return (boxes[1] ? boxes : boxes[0]) as any;
}

export default Html;
