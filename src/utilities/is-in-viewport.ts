export default function isInViewport(element: Element) {
  const { top, left, bottom, right } = element.getBoundingClientRect();

  return (
    top >= 0 &&
    left >= 0 &&
    bottom <= window.innerHeight &&
    right <= window.innerWidth
  );
}
