export default function isDOMListener(eventName: string) {
  const prefix = eventName.substring(0, 1);

  switch (prefix) {
    case "@":
    case "*":
    case "+":
      return;

    default:
      return true;
  }
}
