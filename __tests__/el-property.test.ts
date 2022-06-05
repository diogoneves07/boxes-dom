import Html from "./../src/engine/Html";

test("Check element in box", () => {
  const box = Html`button`(0);

  expect(box.el.tagName.toLowerCase()).toBe("button");
  expect(box.el.nodeType).toBe(1);
});
