import { NormalBox, BoxEventMap, Boxes } from "../../../boxes/src/main";
type AllDOMEvent = WindowEventMap & DocumentEventMap & ElementEventMap;
export type LifeCycleEvents =
  | "@beforeCreate"
  | "@created"
  | "@beforeMount"
  | "@mounted"
  | "@afterMount"
  | "@beforeUpdate"
  | "@updated"
  | "@afterUpdate"
  | "@beforeUnmount"
  | "@unmounted"
  | "@afterUnmount"
  | "@effect"
  | "@changedPosition"
  | "@beforeMove"
  | "@moved"
  | "@afterMove";

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
  nodesOrganized: boolean;
  /** The box contents */
  contents?: any[];
  /** Stores properties related to attributes being managed. */
  attributes?: {
    box: NormalBox;
    onTreeChangeCallback: Function;
    lastAttributesAdded: Map<string, string>;
  };
  isElementIntersecting?: boolean;
  isWaitingElementIntersectingToUpdate: boolean;
  allNecessaryObserversAdded?: boolean;
};

export type DOMNodeBoxContent =
  | string
  | number
  | DOMNodeBox
  | null
  | undefined
  | NormalBox
  | Function
  | (string | number | null | undefined | DOMNodeBox | Function)[];

export type InsertNodePosition = "before" | "after" | "inside";

export interface DOMNodeBox<El extends Element = Element>
  extends Boxes<any, DOMNodeBoxEventMap> {
  /**
   * The data necessary for the functioning of the library.
   * @protected
   * */
  __DOMNodeBoxData: DOMNodeBoxInternalData;

  /** The DOM element that the box represents. */
  el: El;

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

  forceUpdate(): DOMNodeBox;
}
export interface ElementFragment {
  childNodes: (Text | Node | ElementFragment)[];
  isConnected: boolean;
}

type F = Boxes<any, DOMNodeBoxEventMap> & Omit<DOMNodeBox, "attrs" | "el">;
export interface DOMNodeBoxFragment extends F {
  el: ElementFragment;
  attrs: null;
  isBoxFragment: true;
}
