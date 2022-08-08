import DOMNodeBoxElementFragment from "./element-fragment";

export default function isElementInUse(
  el: Node | DOMNodeBoxElementFragment
): boolean {
  if (el instanceof Node) {
    return el.parentElement || el.childNodes[0] ? true : false;
  }

  return el && isElementInUse(el.childNodes[0]);
}
