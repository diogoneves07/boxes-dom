import DOMNodeBoxElementFragment from "./element-fragment";

export function cloneElement<T extends Node>(el: T): T;

export function cloneElement<T extends DOMNodeBoxElementFragment>(el: T): T;
export default function cloneElement<
  T extends Node | DOMNodeBoxElementFragment
>(el: T, deep?: boolean): T {
  if (el instanceof Node) {
    return el.cloneNode(deep) as T;
  } else {
    const elementFragment = new DOMNodeBoxElementFragment();
    elementFragment.childNodes = el.childNodes.map((node) =>
      cloneElement(node)
    );
    return elementFragment as T;
  }
}
