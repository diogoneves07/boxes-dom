import { InsertNodePosition } from "./insert-node-position";

export interface DOMNodeBoxProps<El extends any = Element> {
  /** The DOM element that the box represents. */
  el: El;

  getEls(): El[];

  /**
   * Renders the box and its tree in the DOM.
   * @param targetElement
   * The element or element selector where the box will be rendered.
   *
   * The default value is: `document.body`
   * @param insertPosition
   * The position where the box should be rendered.
   *
   * The default value is: `inside`
   *
   */
  render(
    targetElement?: Node | string,
    insertPosition?: InsertNodePosition
  ): this;
  render(targetElement?: Node, insertPosition?: InsertNodePosition): this;

  render<K extends keyof HTMLElementTagNameMap>(
    selectors?: K,
    insertPosition?: InsertNodePosition
  ): this;

  render<K extends keyof SVGElementTagNameMap>(
    selectors?: K,
    insertPosition?: InsertNodePosition
  ): this;

  render(selectors: string, insertPosition?: InsertNodePosition): this;

  /**
   *  Unrenders the element and its tree from the DOM.
   */
  unrender(): this;

  forceUpdate(): this;
}
