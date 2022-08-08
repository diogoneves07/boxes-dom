import { getReusableTextNode } from "./treat-nodes-unsed";

export function useTextNode(value: string | number) {
  return (
    getReusableTextNode(value) || document.createTextNode(value.toString())
  );
}
