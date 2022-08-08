import { HookEventFactory } from "../../../boxes/src/engine/hook-event";
import { DOMNodeBoxEvent, DOMNodeBoxEventMap } from "./../types/dom-node-boxes";

export const HookEvent = HookEventFactory<
  DOMNodeBoxEventMap,
  DOMNodeBoxEvent
>();
