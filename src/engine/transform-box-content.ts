import isArray from "../utilities/is-array";

export function transformValueBeforeGet(content: any) {
  const run = (value: any) => {
    if (value && value.nodeName === "#text") {
      return value.isContentNumber
        ? parseFloat(value.textContent)
        : value.textContent;
    }

    return value;
  };

  return content[1] ? content.map(run) : run(content[0]);
}
export function transformValueAfterGet(content: any) {
  const run = (value: any) => {
    if (typeof value === "string" || typeof value === "number") {
      const node = document.createTextNode(value.toString());
      (node as any).isContentNumber = typeof value === "number";
      return node;
    }
    return value;
  };

  return isArray(content) ? content.map(run) : [run(content)];
}
