import { NormalBox } from "../../../boxes/src/main";

export type DOMNodeBoxInternalData = {
  /** Indicates whether nodes have been generated.*/
  nodesOrganized: boolean;
  /** The box contents */
  contents?: any[];
  /** Stores properties related to attributes being managed. */
  attributes?: {
    box: NormalBox;
    onSubtreeChange?: Function;
    lastAttributesAdded?: Map<string, string>;
    removeOnSubtreeChange?: Function;
  };
  isElementIntersecting?: boolean;
  isWaitingElementIntersectingToUpdate: boolean;
  allNecessaryObserversAdded?: boolean;
  isBoxInUse?: boolean;
};
