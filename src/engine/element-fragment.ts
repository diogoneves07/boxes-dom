export default class DOMNodeBoxElementFragment {
  isConnected: boolean;
  childNodes: (
    | Text
    | Element
    | Node
    | SVGElement
    | DOMNodeBoxElementFragment
  )[];
  constructor() {
    this.isConnected = false;
    this.childNodes = [];
    return this;
  }
}
