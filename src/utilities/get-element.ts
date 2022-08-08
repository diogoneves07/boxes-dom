export default function getElement(
  elementOrSelector: Node | string | undefined | null
) {
  if (!elementOrSelector) {
    return null;
  }
  const element =
    typeof elementOrSelector === "string"
      ? document.querySelector(elementOrSelector)
      : elementOrSelector;

  return typeof element === "object" ? element : null;
}
