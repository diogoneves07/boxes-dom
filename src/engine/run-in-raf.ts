let callbacksfn: Map<any, Function> = new Map();
let frameOpen: boolean = true;

/** Calls the callback before repainting. */
export default function runInRaf(key: any, callbackfn: Function) {
  callbacksfn.set(key, callbackfn);

  if (frameOpen) {
    frameOpen = false;
    window.requestAnimationFrame(() => {
      callbacksfn.forEach((callbackfn) => {
        callbackfn();
      });

      callbacksfn.clear();
      frameOpen = true;
    });
  }
}
