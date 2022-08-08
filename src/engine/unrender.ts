import { isBox, NormalBox } from "../../../boxes/src/main";

import { DOMNodeBox } from "../types/dom-node-boxes";
import { removeNode } from "./manipulate-dom-methods";
import runInRaf from "./run-in-raf";

export default function unrender(values: any[]) {
  const run = (value: any) => {
    if (value instanceof Text) {
      runInRaf(() => {
        removeNode(value, value?.parentElement);
      });
    } else if (isBox(value)) {
      if ((value as NormalBox).wrappers.has("dom-node")) {
        (value as DOMNodeBox).unrender();
      } else {
        run((value as NormalBox).get());
      }
    }
  };

  Array.isArray(values) ? values.forEach(run) : run(values);
}
