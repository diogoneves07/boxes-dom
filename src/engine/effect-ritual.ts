import { DOMNodeBox } from "./../types/dom-node-box";
import callAfterRendered from "./call-after-rendered";

export default function effectRitual(box: DOMNodeBox) {
  callAfterRendered(box, "@effect");
}
