import DOMNodeBoxElementFragment from "./element-fragment";
import { defineOriginalNode, getOriginalNode } from "./manager-box-nodes";
import useOnlyDOMNodes from "./use-only-dom-nodes";

const CLONES_OF_EACH_NODE = new Map<
  Node | DOMNodeBoxElementFragment,
  Set<Node | DOMNodeBoxElementFragment>
>();

export function registryElClone(
  el: Node | DOMNodeBoxElementFragment,
  clone: Node | DOMNodeBoxElementFragment
) {
  if (el instanceof DOMNodeBoxElementFragment) {
    el.childNodes.forEach((item, index) =>
      registryElClone(item, (clone as unknown as any[])[index])
    );
  }

  const originalNode = getOriginalNode(el);
  const has = CLONES_OF_EACH_NODE.get(originalNode);
  const c = clone as Node;
  defineOriginalNode(c, originalNode);
  if (has) {
    has.add(c);
  } else {
    CLONES_OF_EACH_NODE.set(originalNode, new Set<Node>().add(c));
  }
}
export function removeNodeClone(el: Node, clone: Node) {
  const has = CLONES_OF_EACH_NODE.get(el);
  if (has) {
    has.delete(clone);
    if (has.size === 0) {
      CLONES_OF_EACH_NODE.delete(el);
    }
    return has;
  }

  return false;
}

export function getNodeClones(el: Node | DOMNodeBoxElementFragment) {
  return CLONES_OF_EACH_NODE.get(el);
}

export function forEachClone(
  el: Node | DOMNodeBoxElementFragment,
  callbackfn: (item: Node | DOMNodeBoxElementFragment) => void
) {
  const n = getNodeClones(el);

  if (n) {
    for (const item of n) {
      callbackfn(item);
    }
  }
}
export function forEachNodeClone(
  el: Node | DOMNodeBoxElementFragment,
  callbackfn: (item: Node) => void
) {
  if (el instanceof Node) {
    forEachClone(el, callbackfn as any);
  } else {
    useOnlyDOMNodes(el, (node) => {
      forElAndEachNodeClone(node, callbackfn);
    });
  }
}

export function forElAndEachClone(
  el: Node | DOMNodeBoxElementFragment,
  callbackfn: (item: Node | DOMNodeBoxElementFragment) => void
) {
  callbackfn(el);
  forEachClone(el, callbackfn);
}

export function forElAndEachNodeClone(
  el: Node | DOMNodeBoxElementFragment,
  callbackfn: (item: Node) => void
) {
  if (el instanceof Node) {
    callbackfn(el);
    forEachClone(el, callbackfn as any);
  } else {
    useOnlyDOMNodes(el, (node) => {
      forElAndEachNodeClone(node, callbackfn);
    });
  }
}
