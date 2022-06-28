export default function insertNodeInDOM(
  parentEl: Element,
  node: Node,
  insertPosition: "before" | "after" | "inside" = "inside"
) {
  switch (insertPosition) {
    case "before":
      if (parentEl.parentElement) {
        parentEl.parentElement.insertBefore(node, parentEl);
      }
      break;
    case "after":
      if (parentEl.parentElement) {
        parentEl.parentElement.insertBefore(node, parentEl.nextSibling);
      }
      break;
    default:
      parentEl.appendChild(node);
      break;
  }
}
