import Html from "./../src/engine/Html";

test("Check type property valuex", () => {
  const box = Html`button`(0);
  expect(box.type).toBe("dom-node");
});
