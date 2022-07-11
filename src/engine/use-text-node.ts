import { getReusableTextNode } from "./treat-nodes-unsed";

export function useTextNode(value: string | number) {
  const t = getReusableTextNode(value);
  if (t) {
    return t;
  }
  return document.createTextNode(value.toString());
}
