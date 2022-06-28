import { NormalBox, BoxEventMap } from "../../../boxes/src/main";
type AllDOMEvent = WindowEventMap & DocumentEventMap & ElementEventMap;
export type LifeCycleEvents =
  | "@beforeCreate"
  | "@beforeCreate[tree]"
  | "@created"
  | "@created[tree]"
  | "@beforeMount"
  | "@beforeMount[tree]"
  | "@mounted"
  | "@mounted[tree]"
  | "@afterMount"
  | "@afterMount[tree]"
  | "@beforeUpdate"
  | "@beforeUpdate[tree]"
  | "@updated"
  | "@updated[tree]"
  | "@afterUpdate"
  | "@afterUpdate[tree]"
  | "@beforeUnmount"
  | "@beforeUnmount[tree]"
  | "@unmounted"
  | "@unmounted[tree]"
  | "@afterUnmount"
  | "@afterUnmount[tree]"
  | "@effect"
  | "@effect[tree]"
  | "@changedPosition"
  | "@changedPosition[tree]"
  | "@beforeMove"
  | "@beforeMove[tree]"
  | "@moved"
  | "@moved[tree]"
  | "@afterMove"
  | "@afterMove[tree]";

export type DOMNodeBoxEvents =
  | keyof BoxEventMap
  | keyof AllDOMEvent
  | LifeCycleEvents;

type EventMap = BoxEventMap<DOMNodeBox, DOMNodeBoxEventMap>;
type DOMEvents = {
  [K in keyof AllDOMEvent]: EventMap["*"] & {
    /** The object of the DOM event that was tiggered. */
    DOMEvent: AllDOMEvent[K];
  };
};

export interface DOMNodeBoxEventMap
  extends DOMEvents,
    Record<LifeCycleEvents, EventMap["*"]>,
    EventMap {}

export type DOMNodeBoxInternalData = {
  /** Indicates whether nodes have been generated.*/
  nodesGenerated: boolean;
  /** The box contents */
  contents?: any[];
  /** Stores properties related to attributes being managed. */
  attributes?: {
    box: NormalBox;
    onTreeChangeCallback: Function;
    lastAttributesAdded: Map<string, string>;
  };
  isElementIntersecting?: boolean;
  isWaitingElementIntersectingToUpdate?: boolean;
  intersectionObserverAdded?: boolean;
};

type DOMNodeBoxContent =
  | string
  | number
  | DOMNodeBox
  | null
  | undefined
  | NormalBox
  | Function
  | (string | number | null | undefined | DOMNodeBox | Function)[];

export type InsertNodePosition = "before" | "after" | "inside";

export interface DOMNodeBox
  extends NormalBox<DOMNodeBoxContent, DOMNodeBoxEventMap> {
  /**
   * The data necessary for the functioning of the library.
   * @protected
   * */
  __DOMNodeBoxData: DOMNodeBoxInternalData;

  /** The DOM element that the box represents. */
  el: Element;

  /**
   * Manage box element attributes.
   * @param attributes
   * The attributes to be managed.
   */
  attrs: (attributes: TemplateStringsArray, ...args: any[]) => DOMNodeBox;
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
    targetElement?: Element,
    insertPosition?: InsertNodePosition
  ): DOMNodeBox;
  render<K extends keyof HTMLElementTagNameMap>(
    selectors?: K,
    insertPosition?: InsertNodePosition
  ): DOMNodeBox;
  render<K extends keyof SVGElementTagNameMap>(
    selectors?: K,
    insertPosition?: InsertNodePosition
  ): DOMNodeBox;
  render(selectors: string, insertPosition?: InsertNodePosition): DOMNodeBox;

  /**
   *  Unrenders the element and its tree from the DOM.
   */
  unrender(): DOMNodeBox;
}
