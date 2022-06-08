import { DOMNodeBox, DOMNodeBoxEvents } from "./../types/dom-node-box";
import { propagateEventForBoxesChildren } from "./propagate-event";
type Events = Extract<
  DOMNodeBoxEvents,
  "@afterMount" | "@afterUpdate" | "@effect" | "@afterUnmount"
>;
const BOXES_WAITING: Record<Events, DOMNodeBox[]> = {
  "@afterMount": [],
  "@afterUpdate": [],
  "@afterUnmount": [],
  "@effect": [],
};
const events: string[] = Object.keys(BOXES_WAITING);

let timeoutNotCalled = true;
function run() {
  const setTimeoutId = setTimeout(() => {
    const animationFrameId = window.requestAnimationFrame(() => {
      /**
       * * The loop below was written this way because at each execution the array
       * * may contain new items at the end as a side effect.
       */
      (function loop() {
        let thereWasSideEffect = false;
        events.forEach((key) => {
          const k = key as Events;
          const a = BOXES_WAITING[k];
          let count = 0;
          let length = a.length;

          while (count < length) {
            const box = a[count];
            box.emit(k);
            propagateEventForBoxesChildren(box, k);

            count++;
          }
          const hasEffect = length < a.length;
          if (hasEffect) {
            thereWasSideEffect = true;

            // Removes items that have already been traversed
            a.splice(0, length);
          } else {
            // Removes items from the array without deleting it
            a.length = 0;
          }
        });
        if (thereWasSideEffect) {
          // Wait to resolve side effect
          const id = setTimeout(() => {
            loop();
            clearTimeout(id);
          }, 0);
        }
      })();
      // * Important to set the new value here after looping through the arrays.
      timeoutNotCalled = true;

      window.cancelAnimationFrame(animationFrameId);
    });

    clearTimeout(setTimeoutId);
  }, 0);
}
export default function callAfterRendered(box: DOMNodeBox, type: Events) {
  BOXES_WAITING[type].push(box);

  if (timeoutNotCalled) {
    run();
    timeoutNotCalled = false;
  }
}
