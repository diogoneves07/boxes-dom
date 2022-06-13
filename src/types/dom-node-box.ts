import {
  NormalBox,
  NormalBoxEvents,
  NormalBoxEvent,
} from "../../../../diogo07/boxes/src/main";

type DOMNodeBoxConfig = {
  type: DOMNodeBox;
  event: Required<NormalBoxEvent & DOMNodeBoxEvent>;
  eventsList: DOMNodeBoxEvents;
};

export type DOMNodeBoxEvents =
  | NormalBoxEvents
  | keyof WindowEventMap
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
  | "@effect";

export type DOMNodeBoxEvent = {
  readonly DOMEvent?: Event;
};

export type DOMNodeBoxInternalData = {
  isDOMNodeRemoved: boolean;
  isInDOM: boolean;
  nodesGenerated: boolean;
  content?: any[];
  DOMListenersCallbackfns?: Record<string, (() => void) | null>;
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

export type InsertNodePosition = "before" | "after";

export interface DOMNodeBox
  extends NormalBox<DOMNodeBoxContent, DOMNodeBoxConfig> {
  __DOMNodeBoxData: DOMNodeBoxInternalData;
  el: Element;
  attrs: (attributes: TemplateStringsArray, ...args: any[]) => DOMNodeBox;
  type: "dom-node";
  render(element?: Element, insertPosition?: InsertNodePosition): DOMNodeBox;
  render<K extends keyof HTMLElementTagNameMap>(
    selectors?: K,
    insertPosition?: InsertNodePosition
  ): DOMNodeBox;
  render<K extends keyof SVGElementTagNameMap>(
    selectors?: K,
    insertPosition?: InsertNodePosition
  ): DOMNodeBox;
  render(selectors: string, insertPosition?: InsertNodePosition): DOMNodeBox;
  unrender(): DOMNodeBox;
}
