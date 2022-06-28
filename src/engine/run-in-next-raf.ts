import runInRaf from "./run-in-raf";

let callbacksfn: Map<any, Function> = new Map();
let frameOpen: boolean = true;
export default function runInNextRaf(key: any, callbackfn: Function) {
  callbacksfn.set(key, callbackfn);
  if (frameOpen === true) {
    setTimeout(() => {
      frameOpen = false;
      callbacksfn.forEach((callbackfn, k) => {
        runInRaf(k, callbackfn);
      });
      callbacksfn.clear();
      frameOpen = true;
    }, 0);
  }
}
