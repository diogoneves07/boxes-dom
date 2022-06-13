import { DOMNodeBox } from "../types/dom-node-box";
export default function normalizeBoxesValues(
  values: (DOMNodeBox | Function)[] | (DOMNodeBox | Function)[][] | Function
): DOMNodeBox | DOMNodeBox[] {
  const wasArray = Array.isArray(values);

  const fn = (currentValues: any[]) => {
    let array: (DOMNodeBox | (() => DOMNodeBox))[] = [];

    currentValues.forEach((item) => {
      let value: any = item;
      if (typeof item === "function" && !(item as any).isBox) {
        value = item();
      }

      Array.isArray(value) ? array.push(...value) : array.push(value);
    });
    return array;
  };
  const boxes = fn(fn(wasArray ? values : [values]));

  return !wasArray && !boxes[1]
    ? (boxes[0] as DOMNodeBox)
    : (boxes as DOMNodeBox[]);
}
