import { useTextNode } from "./use-text-node";

export function transformDOMNodeBoxValue(value: any) {
  if (typeof value === "string" || typeof value === "number") {
    const node = useTextNode(value);
    return node;
  }
  return value;
}
export function transformDOMNodeBoxContent(contents: any) {
  if (Array.isArray(contents)) {
    const length = contents.length;
    for (let index = 0; index < length; index++) {
      contents[index] = transformDOMNodeBoxValue(contents[index]);
    }
    return contents;
  }

  return [transformDOMNodeBoxValue(contents)];
}
