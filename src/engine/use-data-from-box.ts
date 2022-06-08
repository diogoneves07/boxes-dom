import { Box, DOMNodeBox } from "../types/dom-node-box";

function isAnotherTypeOfBox(value: any) {
  return (value as Box).isBox && (value as any).type !== "dom-node";
}
function forwardEventToParentBox(box: Box, parentBox: DOMNodeBox): any {
  const content = box.get();

  const fn = (e: any) => {
    parentBox.emit("@changed");

    /* 
      Removes the event right after its triggered 
      because if the box needs the value of the other one 
      it will attach another listener
    */
    e.off();
  };

  box.on("@changed", fn);

  /* 
    Removes the listener right after the box changes its value,
    this avoids memory leak 
  */
  parentBox.on("@changed", () => {
    box.off("@changed", fn);
  });

  return useDataFromBox(content, parentBox);
}
export function useDataFromBox(arrayOrBox: any, parentBox: DOMNodeBox) {
  if (!Array.isArray(arrayOrBox)) {
    if (isAnotherTypeOfBox(arrayOrBox)) {
      return forwardEventToParentBox(arrayOrBox, parentBox);
    }
    return arrayOrBox;
  }
  return arrayOrBox.map((value) => {
    if (isAnotherTypeOfBox(value)) {
      return forwardEventToParentBox(value, parentBox) as any;
    }
    return value;
  });
}
