import { LifeCycleEventList } from "./life-cycle-event-list";
import { NormalBox, NormalBoxEventMap, Boxes } from "../../../boxes/src/main";
import DOMNodeBoxElementFragment from "../engine/element-fragment";
import { DOMNodeBoxProps } from "./dom-node-box-props";

type AllDOMEvent = WindowEventMap &
  DocumentEventMap &
  ElementEventMap &
  SVGElementEventMap;

export interface DOMNodeBoxEvent {
  /** The name(type) of the event. */
  eventName: keyof DOMNodeBoxEventMap;
  /** The data emitted through the event. */
  data: any | null;
  /** The box listening to the event. */
  box: DOMNodeBox | DOMNodeBoxFragment;
  /** The box that triggered the event. */
  target: DOMNodeBox | DOMNodeBoxFragment;

  flag: "[normal]" | "[all]" | "[items]" | "[tree]";

  /** Removes event listener.*/
  off(): void;
}

type NormalEvents = {
  [K in keyof NormalBoxEventMap]: DOMNodeBoxEvent;
};
type DOMEvents = {
  [K in keyof AllDOMEvent]: DOMNodeBoxEvent & {
    /** The object of the DOM event that was tiggered. */
    DOMEvent: AllDOMEvent[K];
  };
};
type LifeCycleEvents = {
  [K in LifeCycleEventList]: DOMNodeBoxEvent;
};
export interface DOMNodeBoxEventMap<
  Box extends DOMNodeBox | DOMNodeBoxFragment = DOMNodeBox | DOMNodeBoxFragment
> extends NormalEvents,
    LifeCycleEvents,
    DOMEvents {
  "@beforeGet": DOMNodeBoxEvent & {
    contents: ReturnType<NormalBox["get"]>;
  };
  "@listenerAdded": DOMNodeBoxEvent & {
    /** An object with added event-related properties. */
    added: {
      /** The name(type) of the event. */
      name: keyof DOMNodeBoxEventMap<Box>;
      /** The callbackfn. */
      fn: Function;
    };
  };

  "@listenerRemoved": DOMNodeBoxEvent & {
    /** An object with removed event-related properties. */
    removed: {
      /** The name(type) of the event. */
      name: keyof DOMNodeBoxEventMap<Box>;
      /** The callbackfn. */
      fn: Function;
    };
  };
  "@changedPosition": DOMNodeBoxEvent & {
    el: Box["el"];
    parent: Box;
  };
  "@beforeMove": DOMNodeBoxEvent & {
    el: Box["el"];
    parent: Box;
  };

  "@moved": DOMNodeBoxEvent & {
    el: Box["el"];
    parent: Box;
  };

  "@afterMove": DOMNodeBoxEvent & {
    el: Box["el"];
    parent: Box;
  };

  "*": DOMNodeBoxEvent;
}

export type DOMNodeBoxContent =
  | string
  | number
  | DOMNodeBox
  | null
  | undefined
  | NormalBox
  | Function
  | (string | number | null | undefined | DOMNodeBox | Function)[];

export interface DOMNodeBox<El extends any = Element>
  extends DOMNodeBoxProps<El>,
    Boxes<any, DOMNodeBoxEventMap<DOMNodeBox>> {}

export interface DOMNodeBoxFragment
  extends DOMNodeBoxProps<DOMNodeBoxElementFragment>,
    Boxes<any, DOMNodeBoxEventMap<DOMNodeBoxFragment>> {
  isBoxFragment: true;
}
