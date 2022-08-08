export default function runInNode(
  node: Node,
  props: string | Record<string, any>,
  ...values: any
) {
  const isValuesArray = Array.isArray(values);
  if (typeof props === "string") {
    if (typeof (node as any)[props] === "function") {
      if (isValuesArray) {
        (node as any)[props](...values);
      } else {
        (node as any)[props](values);
      }
    } else {
      (node as any)[props] = isValuesArray ? values[0] : values;
    }
  } else {
    Object.keys(props).forEach((key) => {
      runInNode(node, key, props[key]);
    });
  }
}
