import DOMNodeBoxElementFragment from "./element-fragment";

export default function useOnlyDOMNodes(
  element: Node | DOMNodeBoxElementFragment,
  callbackfn: (el: Node) => void
) {
  if (element instanceof DOMNodeBoxElementFragment) {
    for (const child of element.childNodes) {
      useOnlyDOMNodes(child, callbackfn);
    }
    return;
  }

  callbackfn(element);
}
