import DOMNodeBoxElementFragment from "./element-fragment";
import { defineNode, deleteNode } from "./manager-box-nodes";

function getParentElement(
  node: Node | DOMNodeBoxElementFragment | undefined
): Node | false | null {
  if (node instanceof Node) {
    return node.parentElement;
  } else if (node) {
    for (const child of node.childNodes) {
      const parentElement = getParentElement(child);
      if (parentElement || parentElement === null) {
        return parentElement;
      }
    }
  }

  return false;
}

export function prependNodes(
  parent: Node | DOMNodeBoxElementFragment,
  nodes: Node | DOMNodeBoxElementFragment
) {
  insertNodesBefore(parent, parent.childNodes[0], nodes);
}
export function appendNodes(
  parent: Node | DOMNodeBoxElementFragment,
  nodes: Node | DOMNodeBoxElementFragment
) {
  if (parent instanceof Node) {
    if (nodes instanceof Node) {
      defineNode(nodes);
      parent.appendChild(nodes);
      return;
    }

    for (const node of nodes.childNodes) {
      appendNodes(parent, node);
      if (!nodes.isConnected) {
        nodes.isConnected = true;
      }
    }
    return;
  }
  const lastNode = parent.childNodes[parent.childNodes.length - 1];
  if (Array.isArray(nodes)) {
    parent.childNodes.push(...nodes);
  } else {
    parent.childNodes.push(nodes);
  }

  const parentElement = getParentElement(lastNode);
  if (parentElement) {
    appendNodes(parentElement, nodes);
  }
}
function getNextSibling(
  elementFragment: DOMNodeBoxElementFragment
): Node | null {
  const childNodes = elementFragment.childNodes;
  const lastValue = childNodes[childNodes.length - 1];
  if (lastValue instanceof Node) {
    return lastValue;
  } else if (lastValue instanceof DOMNodeBoxElementFragment) {
    return getNextSibling(lastValue);
  }
  return null;
}
export function insertNodesAfter(
  parent: Node | DOMNodeBoxElementFragment,
  child: Node | DOMNodeBoxElementFragment | null,
  newNodes: Node | DOMNodeBoxElementFragment
) {
  let nextSibling: Node | null = null;
  if (child instanceof Node) {
    nextSibling = child.nextSibling;
  } else if (child) {
    nextSibling = getNextSibling(child);
    nextSibling = nextSibling && nextSibling.nextSibling;
  }

  insertNodesBefore(parent, nextSibling, newNodes);
}
export function insertNodesBefore(
  parent: Node | DOMNodeBoxElementFragment,
  child: Node | DOMNodeBoxElementFragment | null,
  newNodes: Node | DOMNodeBoxElementFragment
) {
  if (parent instanceof Node) {
    if (newNodes instanceof Node) {
      if (child instanceof Node || !child) {
        defineNode(newNodes);
        parent.insertBefore(newNodes, child);
        return;
      }
      insertNodesBefore(parent, child.childNodes[0], newNodes);
      return;
    }

    for (const newNode of newNodes.childNodes) {
      insertNodesBefore(parent, child, newNode);
      if (!newNodes.isConnected) {
        newNodes.isConnected = true;
      }
    }

    return;
  }

  const changeNodePositionIndex = parent.childNodes.indexOf(newNodes);

  if (changeNodePositionIndex > -1) {
    parent.childNodes.splice(changeNodePositionIndex, 1);
  }

  const index = parent.childNodes.indexOf(child as any);
  let sibling: Node | DOMNodeBoxElementFragment;

  if (index > -1) {
    sibling = parent.childNodes[index];

    parent.childNodes.splice(Math.max(0, index), 0, newNodes);
  } else {
    sibling = parent.childNodes[parent.childNodes.length - 1];

    parent.childNodes.push(newNodes);
  }

  const parentElement = getParentElement(sibling);

  if (parentElement) {
    insertNodesBefore(parentElement, child, newNodes);
  }
}

function organizeChildNodes(node: Node, parent: DOMNodeBoxElementFragment) {
  const length = parent.childNodes.length;
  for (let index = 0; index < length; index++) {
    const n = parent.childNodes[index];
    if (n === node) {
      parent.childNodes.splice(index, 1);

      return;
    }
  }
}
export function removeNode(
  node: Node | Element | Text | DOMNodeBoxElementFragment,
  parent: Node | DOMNodeBoxElementFragment | null,
  cleanNode?: boolean
) {
  if (node instanceof Node) {
    if (parent && !(parent instanceof Node)) {
      organizeChildNodes(node, parent);
    }
    if ((node as any).remove) {
      if (cleanNode) node.textContent = "";
      deleteNode(node);
      (node as any).remove();
    } else if (node.parentElement) {
      if (cleanNode) node.textContent = "";
      deleteNode(node);
      node.parentElement.removeChild(node);
    }
    return;
  }

  const length = node.childNodes.length;
  for (let index = 0; index < length; index++) {
    const n = node.childNodes[index];
    removeNode(n, parent);
    node.childNodes.splice(index, 1);
    if (node.isConnected) {
      node.isConnected = false;
    }
  }
}
