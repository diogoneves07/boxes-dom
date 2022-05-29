import { DOMNodeBox, DOMNodeBoxEvents } from "./../types/dom-node-box";
import { propagateEventForBoxesChildren } from "./propagate-event-for-nodes-children";
type Events = Extract<
  DOMNodeBoxEvents,
  "@afterMount" | "@afterUpdate" | "@effect" | "@afterUnmount"
>;
const BOXES_WAITING: Partial<Record<Events, DOMNodeBox[]>> = {};
const events: string[] = "@afterMount @afterUpdate @effect @afterUnmount".split(
  " "
);
let setTimeoutId = 0;
function run() {
  setTimeoutId = setTimeout(() => {
    const animationFrameId = window.requestAnimationFrame(() => {
      events.forEach((key) => {
        const k = key as Events;
        const a = BOXES_WAITING[k];
        if (a) {
          a.forEach((box) => {
            box.emit(k);
            propagateEventForBoxesChildren(box, k);
          });
          a.length = 0;
        }
      });

      window.cancelAnimationFrame(animationFrameId);
      clearTimeout(setTimeoutId);
      setTimeoutId = 0;
    });
  }, 0);
}
export default function callAfterRendered(box: DOMNodeBox, type: Events) {
  if (!BOXES_WAITING[type]) {
    BOXES_WAITING[type] = [];
  }
  if (BOXES_WAITING[type]?.includes(box)) {
    return;
  }

  BOXES_WAITING[type]?.push(box);

  if (!setTimeoutId) {
    run();
  }
}
