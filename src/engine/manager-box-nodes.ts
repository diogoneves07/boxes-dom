import { DOMNodeBoxFragment, DOMNodeBox } from "./../types/dom-node-boxes";
import DOMNodeBoxElementFragment from "./element-fragment";

const NODES_CHILD_OF_BOXES = new Map<
  Node | DOMNodeBoxElementFragment,
  | {
      parentBox?: DOMNodeBox | DOMNodeBoxFragment;
      originalNode?: Node | DOMNodeBoxElementFragment;
    }
  | undefined
>();

export function isNodeOfDOMNodeBox(node: Node | DOMNodeBoxElementFragment) {
  return NODES_CHILD_OF_BOXES.has(node) ? true : false;
}
export function defineNode(node: Node | DOMNodeBoxElementFragment) {
  if (!NODES_CHILD_OF_BOXES.has(node)) {
    NODES_CHILD_OF_BOXES.set(node, undefined);
  }
}
export function deleteNode(node: Node | DOMNodeBoxElementFragment) {
  NODES_CHILD_OF_BOXES.delete(node);
}
export function defineNodeParentBox(
  node: Node | DOMNodeBoxElementFragment,
  parentBox: DOMNodeBox | DOMNodeBoxFragment
) {
  const has = NODES_CHILD_OF_BOXES.get(node);
  if (has) {
    has.parentBox = parentBox;
  } else {
    NODES_CHILD_OF_BOXES.set(node, { parentBox });
  }
}

export function defineOriginalNode(
  node: Node | DOMNodeBoxElementFragment,
  originalNode: Node | DOMNodeBoxElementFragment
) {
  const has = NODES_CHILD_OF_BOXES.get(node);
  if (has) {
    has.originalNode = originalNode;
  } else {
    NODES_CHILD_OF_BOXES.set(node, { originalNode });
  }
}

export function getOriginalNode(node: Node | DOMNodeBoxElementFragment) {
  const has = NODES_CHILD_OF_BOXES.get(node);
  return (has && has.originalNode) || node;
}

export function getNodeParentBox(node: Node | DOMNodeBoxElementFragment) {
  const has = NODES_CHILD_OF_BOXES.get(node);
  return has && has.parentBox;
}
