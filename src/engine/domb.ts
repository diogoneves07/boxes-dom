import { DOMNodeBox } from "./../types/dom-node-boxes";
import toDOMNodeBox from "./to-dom-node-box";

const DIV_FOR_CONVERT = document.createElement("div");
export default function DOMB<El extends Node = Element>(
  htmlText: TemplateStringsArray | string,
  ...args: any[]
): DOMNodeBox<El> {
  let text = htmlText;

  if (Array.isArray(htmlText)) {
    const values: any[] = [];
    (htmlText as TemplateStringsArray).raw.forEach((value, index) => {
      values.push(value, args[index] || "");
    });
    text = values.join("");
  }
  DIV_FOR_CONVERT.innerHTML = text.toString().trim();
  const childNodes = DIV_FOR_CONVERT.childNodes;
  let box: DOMNodeBox<El> | false;

  if (childNodes.length !== 1) {
    throw new Error("Boxes: Mult elements host.");
  }
  box = toDOMNodeBox(childNodes[0]) as any;

  DIV_FOR_CONVERT.innerHTML = "";
  return box as unknown as DOMNodeBox<El>;
}
