import { NormalBox } from "../../../boxes/src/main";
import hasOwnProperty from "../utilities/hasOwnProperty";
import { DOMNodeBox } from "./../types/dom-node-box";
import { removeNode } from "./manipulate-dom-methods";
import runInRaf from "./run-in-raf";

let uniqueKey = 0;

export default function unrender(values: any[]) {
  const run = (value: any) => {
    if (value instanceof Text) {
      runInRaf(`${++uniqueKey}Html.unrender`, () => {
        removeNode(value, value?.parentElement);
      });
    } else if (hasOwnProperty(value, "isBox")) {
      if ((value as NormalBox).wrappers.has("dom-node")) {
        (value as DOMNodeBox).unrender();
      } else {
        run((value as NormalBox).get());
      }
    }
  };

  Array.isArray(values) ? values.forEach(run) : run(values);
}
