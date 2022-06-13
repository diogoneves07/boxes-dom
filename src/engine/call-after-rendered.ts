import { DOMNodeBox, DOMNodeBoxEvents } from "./../types/dom-node-box";
import { propagateEventForBoxesChildren } from "./propagate-event";
type Events = Extract<
  DOMNodeBoxEvents,
  "@afterMount" | "@afterUpdate" | "@effect" | "@afterUnmount"
>;
const BOXES_WAITING: (() => void)[] = [];

let timeoutNotCalled = true;
function run() {
  const setTimeoutId = setTimeout(() => {
    const animationFrameId = window.requestAnimationFrame(() => {
      const array = BOXES_WAITING.slice();

      timeoutNotCalled = true;
      BOXES_WAITING.length = 0;

      array.forEach((callbackfn) => {
        callbackfn();
      });

      window.cancelAnimationFrame(animationFrameId);
    });

    clearTimeout(setTimeoutId);
  }, 0);
}
export default function callAfterRendered(box: DOMNodeBox, type: Events) {
  BOXES_WAITING.push(() => {
    box.emit(type);
    propagateEventForBoxesChildren(box, type);
  });

  if (timeoutNotCalled) {
    run();
    timeoutNotCalled = false;
  }
}
